import uuid
import os
import cv2
from flask import request, jsonify
from datetime import datetime
from ultralytics import YOLO
from Model.Barcode import  Barcode
from Model.TrashItems import TrashItems
from Model.Category import Category
from config import db

model = YOLO(r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\TrainedModel\best.pt")

output_dir = r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\Images"
os.makedirs(output_dir, exist_ok=True)
class DetectionController:
    @staticmethod
    def DetectObjects():
        try:
            if 'image' not in request.files:
                return jsonify({"error": "No image file provided"}), 400

            image_file = request.files['image']

            if not image_file.content_type.startswith('image/'):
                return jsonify({"error": "File is not a valid image"}), 400

            unique_filename = f"{uuid.uuid4()}_{image_file.filename}"
            image_path = os.path.join(output_dir, unique_filename)
            image_file.save(image_path)

            image = cv2.imread(image_path)

            results = model(image)

            detections = []
            for result in results[0].boxes:
                box = result.xyxy[0].tolist()
                score = result.conf[0].item()
                label = model.names[int(result.cls[0])]

                category = Category.query.filter_by(name=label).first()
                if category:
                    new_trash_item = TrashItems(
                        categoryid=category.id,
                        detectiondate=datetime.utcnow(),
                        weight=0.0,
                        path = image_path
                    )
                    db.session.add(new_trash_item)
                    db.session.commit()

                detections.append({
                    "label": label,
                    "confidence": score,
                    "box": {
                        "x1": box[0],
                        "y1": box[1],
                        "x2": box[2],
                        "y2": box[3]
                    }
                })
            for detection in detections:
                x1, y1, x2, y2 = map(int, detection["box"].values())
                label = detection["label"]
                confidence = detection["confidence"]

                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

                cv2.putText(
                    image,
                    f"{label} ({confidence:.2f})",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (0, 255, 0),
                    2
                )
            processed_image_path = os.path.join(output_dir, f"processed_{unique_filename}")
            cv2.imwrite(processed_image_path, image)
            return jsonify({
                "detections": detections,
                "processed_image_url": f"/processed_images/{os.path.basename(processed_image_path)}"
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def ProcessedVideo():
        try:
            print("Checking if video file and barcode are provided...")

            if 'video' not in request.files:
                print("No video file in request.")
                return jsonify({"error": "No video file provided"}), 400

            if 'barcode' not in request.form:
                print("No barcode provided in request.")
                return jsonify({"error": "No barcode provided"}), 400

            barcode_value = request.form['barcode']
            print(f"Barcode received: {barcode_value}")

            # Validate barcode
            barcode_entry = Barcode.query.filter_by(barcode=barcode_value).first()
            if not barcode_entry:
                print("Invalid barcode provided.")
                return jsonify({"error": "Invalid barcode"}), 404

            barcode_id = barcode_entry.id

            video_file = request.files['video']
            print(f"Video file received: {video_file.filename}")

            if not video_file.content_type.startswith('video/'):
                print(f"Invalid video file type: {video_file.content_type}")
                return jsonify({"error": "File is not a valid video"}), 400

            unique_filename = f"{uuid.uuid4()}_{video_file.filename}"
            video_path = os.path.join(output_dir, unique_filename)
            print(f"Saving video to: {video_path}")
            video_file.save(video_path)

            video_capture = cv2.VideoCapture(video_path)
            if not video_capture.isOpened():
                print(f"Failed to open video: {video_path}")
                return jsonify({"error": "Failed to open video"}), 500

            frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
            frame_rate = int(video_capture.get(cv2.CAP_PROP_FPS))
            print(f"Video opened: {frame_count} frames, {frame_rate} FPS")

            frames_output_dir = os.path.join(output_dir, f"frames_{uuid.uuid4()}")
            os.makedirs(frames_output_dir, exist_ok=True)
            print(f"Frames will be saved to: {frames_output_dir}")

            # Mapping model output to actual DB category names
            CLASS_NAME_MAP = {
                "bottle": "Bottle",
                "glass": "Glass",
                "metal": "Metal",
                "paper": "Paper",
                "papercup": "PaperCup",
                "organic": "Organic",
                "cigarettesbutt": "CigarettesButt",
                "plasticbag": "PlasticBag",
                "straw": "Straw",
                "plasticcup": "PlasticCup"
            }

            detections = []
            frame_idx = 0

            while True:
                ret, frame = video_capture.read()
                if not ret:
                    print(f"End of video reached. Processed {frame_idx} frames.")
                    break

                if frame_idx % frame_rate == 0:
                    print(f"Processing frame {frame_idx}...")
                    results = model(frame)

                    for result in results[0].boxes:
                        box = result.xyxy[0].tolist()
                        score = result.conf[0].item()
                        raw_label = model.names[int(result.cls[0])].lower().replace(" ", "")
                        label = CLASS_NAME_MAP.get(raw_label)

                        if not label:
                            print(f"Unrecognized model output class: {raw_label}")
                            continue  # skip unrecognized classes

                        print(f"Detected {label} with confidence {score:.2f} at box {box}")

                        category = Category.query.filter_by(name=label).first()
                        if category:
                            new_trash_item = TrashItems(
                                categoryid=category.id,
                                detectiondate=datetime.utcnow(),
                                weight=0.0,
                                barcodeid=barcode_id
                            )
                            db.session.add(new_trash_item)
                            db.session.commit()

                        detections.append({
                            "label": label,
                            "confidence": score,
                            "box": {
                                "x1": box[0],
                                "y1": box[1],
                                "x2": box[2],
                                "y2": box[3]
                            }
                        })
                        x1, y1, x2, y2 = map(int, box)
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv2.putText(
                            frame,
                            f"{label} ({score:.2f})",
                            (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            (0, 255, 0),
                            2
                        )

                    frame_filename = f"frame_{frame_idx}.jpg"
                    cv2.imwrite(os.path.join(frames_output_dir, frame_filename), frame)
                    print(f"Saved frame {frame_idx} to {frame_filename}")

                frame_idx += 1

            video_capture.release()
            print("Video processing complete.")

            return jsonify({
                "message": "Video processed successfully",
                "barcode": barcode_value,
                "detections": detections,
                "processed_frames_dir": frames_output_dir
            })

        except Exception as e:
            print(f"Error processing video: {str(e)}")
            return jsonify({"error": str(e)}), 500

    # @staticmethod
    # def ProcessedVideo():
    #     try:
    #         print("Checking if video file and barcode are provided...")
    #
    #         if 'video' not in request.files:
    #             print("No video file in request.")
    #             return jsonify({"error": "No video file provided"}), 400
    #
    #         if 'barcode' not in request.form:
    #             print("No barcode provided in request.")
    #             return jsonify({"error": "No barcode provided"}), 400
    #
    #         barcode_value = request.form['barcode']
    #         print(f"Barcode received: {barcode_value}")
    #
    #         # Validate barcode
    #         barcode_entry = Barcode.query.filter_by(barcode=barcode_value).first()
    #         if not barcode_entry:
    #             print("Invalid barcode provided.")
    #             return jsonify({"error": "Invalid barcode"}), 404
    #
    #         barcode_id = barcode_entry.id
    #
    #         video_file = request.files['video']
    #         print(f"Video file received: {video_file.filename}")
    #
    #         if not video_file.content_type.startswith('video/'):
    #             print(f"Invalid video file type: {video_file.content_type}")
    #             return jsonify({"error": "File is not a valid video"}), 400
    #
    #         unique_filename = f"{uuid.uuid4()}_{video_file.filename}"
    #         video_path = os.path.join(output_dir, unique_filename)
    #         print(f"Saving video to: {video_path}")
    #         video_file.save(video_path)
    #
    #         video_capture = cv2.VideoCapture(video_path)
    #         if not video_capture.isOpened():
    #             print(f"Failed to open video: {video_path}")
    #             return jsonify({"error": "Failed to open video"}), 500
    #
    #         frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
    #         frame_rate = int(video_capture.get(cv2.CAP_PROP_FPS))
    #         print(f"Video opened: {frame_count} frames, {frame_rate} FPS")
    #
    #         frames_output_dir = os.path.join(output_dir, f"frames_{uuid.uuid4()}")
    #         os.makedirs(frames_output_dir, exist_ok=True)
    #         print(f"Frames will be saved to: {frames_output_dir}")
    #
    #         detections = []
    #         frame_idx = 0
    #
    #         while True:
    #             ret, frame = video_capture.read()
    #             if not ret:
    #                 print(f"End of video reached. Processed {frame_idx} frames.")
    #                 break
    #
    #             if frame_idx % frame_rate == 0:
    #                 print(f"Processing frame {frame_idx}...")
    #                 results = model(frame)
    #
    #                 for result in results[0].boxes:
    #                     box = result.xyxy[0].tolist()
    #                     score = result.conf[0].item()
    #                     label = model.names[int(result.cls[0])]
    #
    #                     print(f"Detected {label} with confidence {score:.2f} at box {box}")
    #
    #                     category = Category.query.filter_by(name=label).first()
    #                     if category:
    #                         new_trash_item = TrashItems(
    #                             categoryid=category.id,
    #                             detectiondate=datetime.utcnow(),
    #                             weight=0.0,
    #                             barcodeid=barcode_id,
    #                             # path=video_path
    #                         )
    #                         db.session.add(new_trash_item)
    #                         db.session.commit()
    #
    #                     detections.append({
    #                         "label": label,
    #                         "confidence": score,
    #                         "box": {
    #                             "x1": box[0],
    #                             "y1": box[1],
    #                             "x2": box[2],
    #                             "y2": box[3]
    #                         }
    #                     })
    #                     x1, y1, x2, y2 = map(int, box)
    #                     cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    #                     cv2.putText(
    #                         frame,
    #                         f"{label} ({score:.2f})",
    #                         (x1, y1 - 10),
    #                         cv2.FONT_HERSHEY_SIMPLEX,
    #                         0.5,
    #                         (0, 255, 0),
    #                         2
    #                     )
    #                 frame_filename = f"frame_{frame_idx}.jpg"
    #                 cv2.imwrite(os.path.join(frames_output_dir, frame_filename), frame)
    #                 print(f"Saved frame {frame_idx} to {frame_filename}")
    #
    #             frame_idx += 1
    #
    #         video_capture.release()
    #         print("Video processing complete.")
    #
    #         return jsonify({
    #             "message": "Video processed successfully",
    #             "barcode": barcode_value,
    #             "detections": detections,
    #             "processed_frames_dir": frames_output_dir
    #         })
    #
    #     except Exception as e:
    #         print(f"Error processing video: {str(e)}")
    #         return jsonify({"error": str(e)}), 500

