import re
from Model.User import User
from Model.Zone import Zone
from Model.Purchase import Purchase
from Model.UserZone import UserZone
from config import db, app
from flask import jsonify, current_app, request, Blueprint,Response, send_file, Flask
from datetime import datetime
from Model.Complaint import Complaint
from Model.ZoneCoordinate import ZoneCoordinate
from Model.PickupRequest import PickupRequests
from Model.BarcodeStrip import BarcodeStrip
from Model.Barcode import Barcode
from werkzeug.utils import secure_filename
from sqlalchemy import func, DateTime
from werkzeug.security import check_password_hash
from sqlalchemy.exc import SQLAlchemyError
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from PyPDF2 import PdfMerger
import random
import os
import uuid
import qrcode
import requests
from requests.utils import quote
from fpdf import FPDF
from geopy.distance import geodesic
from shapely.geometry import Point, Polygon
from PIL import Image, ImageDraw, ImageFont

UPLOAD_FOLDER = r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\static\profile_pics"
Strips_FOLDER = r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\static\qrcodes"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff', 'ico', 'heic', 'svg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

user_bp = Blueprint('user_bp', __name__)

GOOGLE_MAPS_API_KEY = "AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE"

class UserController:
    @staticmethod
    def AddBarcodeStrip(data):
        try:
            print("API hit")
            print(data)

            required_fields = ["userid", "zoneid", "strips"]
            for field in required_fields:
                if field not in data:
                    return {"error": f"Missing required field: {field}"}, 400

            user_id = data.get("userid")
            zone_id = data.get("zoneid")
            strips = data.get("strips")

            if not isinstance(strips, list) or not all(isinstance(s, dict) for s in strips):
                return {"error": "Invalid strips format. Must be a list of objects with 'count' and 'type'."}, 400

            strip_counts = [s.get("count") for s in strips]
            barcode_types = [s.get("type") for s in strips]

            if not all(isinstance(count, int) and count >= 0 for count in strip_counts):
                return {"error": "Each strip count must be a positive integer."}, 400
            if not all(isinstance(t, str) for t in barcode_types):
                return {"error": "Each strip type must be a string."}, 400

            user = User.query.filter_by(id=user_id, status="active").first()
            if not user or user.role != "user":
                return {"error": "Invalid user or insufficient permissions."}, 403

            zone = Zone.query.filter_by(id=zone_id).first()
            if not zone:
                return {"error": "Zone not found."}, 400

            cost_per_strip = 100.0
            total_cost = sum(strip_counts) * cost_per_strip
            new_purchase = Purchase(userid=user_id, totalcost=total_cost, purchasedate=datetime.utcnow(),
                                    zoneid=zone_id)
            db.session.add(new_purchase)
            db.session.commit()

            barcode_strip_ids = []
            image_paths = []

            for strip in strips:
                barcode_type = strip["type"]
                strip_count = strip["count"]

                for _ in range(strip_count):
                    new_strip = BarcodeStrip(purchaseid=new_purchase.id, type=barcode_type, strippath="")
                    db.session.add(new_strip)
                    db.session.flush()

                    barcode_strip_ids.append(new_strip.id)

                    for i in range(10):
                        new_barcode = Barcode(stripid=new_strip.id, type=barcode_type, barcode="pending", imagepath="")
                        db.session.add(new_barcode)
                        db.session.flush()

                        barcode_data = f"{new_barcode.id}-{user_id}-{new_strip.id}-{zone_id}-{barcode_type}"
                        image_name = f"barcode_{new_strip.id}_{i}"
                        image_path = UserController.GenerateBarcodeImage(barcode_data, image_name)

                        if image_path:
                            new_barcode.barcode = barcode_data
                            new_barcode.imagepath = image_path
                            db.session.add(new_barcode)
                        else:
                            print(f"Error: Image generation failed for {barcode_data}")

                    db.session.commit()

                    image_response = UserController.GenerateStripImage(new_strip.id)
                    if "image_path" in image_response:
                        new_strip.strippath = image_response["image_path"]
                        db.session.commit()
                        image_paths.append(new_strip.strippath)

                        # Generate the final PDF path with username, strip ID, and current time
            current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
            pdf_filename = f"{user.id}_{current_time}.pdf"  # Assuming the first strip ID for filename

            # After generating all strip PDFs, merge them into one
            final_pdf_path = UserController.MergeStripImagesToPDF(image_paths, pdf_filename)
            return {
                "User ID": user_id,
                "Total Strips Purchased": sum(strip_counts),
                "Total Cost": total_cost,
                "barcode_strip_ids": barcode_strip_ids,
                "final_pdf": final_pdf_path["merged_pdf_path"].replace("\\", "/")  # Normalize the path
            }
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return {"error": str(e)}, 500
    @staticmethod
    def MergeStripImagesToPDF(image_paths, output_filename):
        try:
            images = []

            for path in image_paths:
                if os.path.exists(path):
                    img = Image.open(path).convert('RGB')
                    images.append(img)
                else:
                    print(f"File not found: {path}")

            if not images:
                return {"error": "No valid images to merge."}

            output_dir = os.path.join("static", "user_pdfs")
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, output_filename)

            # Save first image and append the rest
            images[0].save(output_path, save_all=True, append_images=images[1:])
            print(f"Merged PDF saved to: {output_path}")

            return {"merged_pdf_path": output_path}
        except Exception as e:
            return {"error": str(e)}

    def GenerateBarcodeImage(barcode_data, image_name):
        try:
            image_name_with_ext = image_name + ".png"
            relative_image_path = os.path.join('static', 'barcodes', image_name_with_ext)  # Ensure correct subdirectory
            full_image_path = os.path.join(current_app.root_path, relative_image_path)

            os.makedirs(os.path.dirname(full_image_path), exist_ok=True)

            # Generate QR code
            qr = qrcode.make(barcode_data)
            qr = qr.convert("RGB")

            # Load font
            try:
                font = ImageFont.truetype("arial.ttf", 18)
            except:
                font = ImageFont.load_default()

            # Dummy image just to calculate text size
            dummy_img = Image.new("RGB", (1, 1))
            draw_dummy = ImageDraw.Draw(dummy_img)
            text_bbox = draw_dummy.textbbox((0, 0), barcode_data, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]

            # Create new image with space for text
            new_width = max(qr.width, text_width + 10)
            new_height = qr.height + text_height + 15
            new_img = Image.new("RGB", (new_width, new_height), "white")

            # Paste QR code
            qr_x = (new_width - qr.width) // 2
            new_img.paste(qr, (qr_x, 0))

            # # Draw text below QR
            # draw = ImageDraw.Draw(new_img)
            # text_x = (new_width - text_width) // 2
            # text_y = qr.height + 5
            # draw.text((text_x, text_y), barcode_data, font=font, fill="black")

            # Save image
            new_img.save(full_image_path)
            print(f"QR Code saved to: {full_image_path}")
            return relative_image_path

        except Exception as e:
            print(f"Error generating QR code: {str(e)}")
            return None

    @staticmethod
    def GenerateStripImage(stripid):
        try:
            barcodes = Barcode.query.filter_by(stripid=stripid).all()
            if not barcodes or len(barcodes) != 10:
                return {"error": "Invalid strip ID or strip does not contain exactly 10 barcodes"}, 400

            # Create output path
            relative_img_path = os.path.join('static', 'barcode_strips', f"strip_{stripid}.png")
            full_img_path = os.path.join(current_app.root_path, relative_img_path)
            os.makedirs(os.path.dirname(full_img_path), exist_ok=True)

            # Configuration
            cols = 2
            rows = 5
            cell_width = 200
            cell_height = 150
            padding = 20

            # Total image size
            total_width = cols * cell_width + padding * (cols + 1)
            total_height = rows * cell_height + padding * (rows + 1)

            strip_image = Image.new("RGB", (total_width, total_height), "white")
            draw = ImageDraw.Draw(strip_image)

            try:
                font = ImageFont.truetype("arial.ttf", 12)
            except:
                font = ImageFont.load_default()

            # Loop through barcodes and draw each
            for idx, barcode in enumerate(barcodes):
                col = idx % cols
                row = idx // cols

                x = padding + col * (cell_width + padding)
                y = padding + row * (cell_height + padding)

                # Fix the image path
                barcode_img_path = os.path.join(current_app.root_path, barcode.imagepath)  # Adjust path here

                if not barcode_img_path.endswith(".png"):
                    barcode_img_path += ".png"

                print(f"📸 Looking for barcode image at: {barcode_img_path}")  # Debug log

                if os.path.exists(barcode_img_path):
                    barcode_img = Image.open(barcode_img_path)
                    barcode_img = barcode_img.resize((100, 100))
                    strip_image.paste(barcode_img, (x, y))

                    # Draw barcode text below image
                    text = barcode.barcode
                    text_bbox = draw.textbbox((0, 0), text, font=font)  # Use `textbbox` here
                    text_width = text_bbox[2] - text_bbox[0]
                    text_height = text_bbox[3] - text_bbox[1]
                    text_x = x + (100 - text_width) // 2 + 30
                    text_y = y + 100 + 5
                    draw.text((text_x, text_y), text, fill="black", font=font)
                else:
                    print(f"❌ Image not found at: {barcode_img_path}")  # Debug log
                    draw.text((x, y), "Image Not Found", fill="red", font=font)

            # Save the strip image
            strip_image.save(full_img_path)
            print(f"Barcode strip image saved to: {full_img_path}")
            return {"message": "Image strip generated successfully", "image_path": relative_img_path}

        except FileNotFoundError as fnf_error:
            print(f"File not found error: {fnf_error}")
            return {"error": "File not found"}, 404
        except Exception as e:
            print(f"Error generating barcode strip image: {str(e)}")
            return {"error": str(e)}, 500

    @staticmethod
    def GetDownloadStripDetails(userId):
        try:
            if not userId:
                return {"error": "User ID is missing"}, 404

            # Get the user details
            user = User.query.get(userId)
            if not user:
                return {"error": "User not found"}, 404

            user_pdf_dir = os.path.join(current_app.root_path, "static", "user_pdfs")
            print("uSER DRI",user_pdf_dir)

            # Ensure the 'user_pdfs' directory exists
            if not os.path.exists(user_pdf_dir):
                print(f"❌ Error: No PDF directory found at {user_pdf_dir}")
                return {"error": "No PDF directory found"}, 404

            # Find PDFs that match the user (only looking in the user_pdfs folder)
            matching_pdfs = [
                f for f in os.listdir(user_pdf_dir)
                if f.startswith(str(userId)) and f.endswith(".pdf")
            ]
            print("matching pdf ", matching_pdfs)
            if not matching_pdfs:
                print(f"❌ Error: No PDFs found for user {userId} in {user_pdf_dir}")
                return {"error": "No PDFs found for this user"}, 404

            # Sort to get the latest PDF based on the timestamp (by part of the filename)
            matching_pdfs.sort(key=lambda x: x.split('_')[-1].split('.')[0], reverse=True)

            # The most recent PDF will be the first in the sorted list
            latest_pdf = matching_pdfs[0]
            final_pdf_path = os.path.join(user_pdf_dir, latest_pdf)

            print(f"📄 Looking for PDF at: {final_pdf_path}")
            if os.path.exists(final_pdf_path):
                print("PDF found, sending the file")
                return send_file(
                    os.path.abspath(final_pdf_path),
                    as_attachment=True,
                    mimetype="application/pdf",
                    download_name=latest_pdf  # Use the filename as the download name
                )
            else:
                print(f"❌ PDF not found at: {final_pdf_path}")
                return {"error": "PDF not found"}, 404

        except Exception as e:
            print(f"❌ Exception: {e}")
            return {"error": str(e)}, 500

    def GenerateStripPDF(stripid):
        try:
            barcodes = Barcode.query.filter_by(stripid=stripid).all()
            if not barcodes or len(barcodes) != 10:
                return {"error": "Invalid strip ID or strip does not contain exactly 10 barcodes"}, 400

            strip = BarcodeStrip.query.get(stripid)
            purchase = Purchase.query.get(strip.purchaseid)
            user = User.query.get(purchase.userid)

            username = secure_filename(user.name if user.name else f"user_{user.id}")
            timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
            filename = f"{username}_strip_{stripid}_{timestamp}.pdf"

            relative_pdf_path = os.path.join('static', 'barcode_strips', filename)  # Correct relative path
            full_pdf_path = os.path.join(current_app.root_path, relative_pdf_path)
            os.makedirs(os.path.dirname(full_pdf_path), exist_ok=True)

            # Setup PDF canvas
            c = canvas.Canvas(full_pdf_path, pagesize=letter)
            c.setTitle(f"Barcode Strip {stripid}")

            # Layout config (as before)
            barcode_width, barcode_height = 100, 100
            margin_x = 40
            margin_y = -300
            spacing_x = 250
            spacing_y = 100
            total_barcode_height = (5 * barcode_height) + (4 * spacing_y)
            start_y = 792 - total_barcode_height - margin_y

            for idx, barcode in enumerate(barcodes):
                col = idx % 2
                row = idx // 2
                x = margin_x + col * spacing_x
                y = start_y + (row * spacing_y)

                barcode_full_path = os.path.join(current_app.root_path, barcode.imagepath)  # Ensure correct full path
                if not barcode_full_path.endswith(".png"):
                    barcode_full_path += ".png"

                if os.path.exists(barcode_full_path):
                    try:
                        barcode_img = ImageReader(barcode_full_path)
                        c.drawImage(barcode_img, x, y, width=barcode_width, height=barcode_height)
                    except Exception as img_error:
                        print(f"Error loading barcode image: {barcode_full_path} - {img_error}")
                        c.drawString(x, y, "Image Load Error")
                else:
                    print(f"Barcode image not found: {barcode_full_path}")
                    c.drawString(x, y, "Image Not Found")

                # Draw barcode text below the image
                text_y_offset = 5  # pixels below the barcode image
                text_font_size = 14  # make this bigger if needed
                c.setFont("Helvetica-Bold", text_font_size)
                text_x = x
                text_y = y - text_y_offset
                c.drawString(text_x, text_y, barcode.barcode)

            c.save()
            print(f"PDF generated successfully: {full_pdf_path}")
            return {"message": "PDF generated successfully", "pdf_path": relative_pdf_path}

        except Exception as e:
            print(f"Error generating PDF: {str(e)}")
            return {"error": str(e)}, 500

    @staticmethod
    def SaveQRStripImage(barcode_values, strip_id):
        try:
            barcode_dir = os.path.join(current_app.root_path, 'static', 'qrcodes')
            os.makedirs(barcode_dir, exist_ok=True)

            strip_path = os.path.join(barcode_dir, f"barcode_strip_{strip_id}.png")
            print(f"🔹 Attempting to save barcode strip at: {strip_path}")

            strip_width, strip_height = 1800, 2000  # Keep existing size
            barcode_width, barcode_height = 700, 300  # Keep barcode size
            spacing_y = 80  # Keep vertical spacing
            col_count, row_count = 2, 5  # Keep grid size

            strip_image = Image.new("RGB", (strip_width, strip_height), "white")
            draw = ImageDraw.Draw(strip_image)

            try:
                font = ImageFont.truetype("arial.ttf", 24)
            except:
                font = None

            # ✅ Dynamically calculate horizontal centering
            total_barcode_width = (barcode_width * col_count) + 50  # 50px space between columns
            margin_x = (strip_width - total_barcode_width) // 2  # Centered horizontally

            x_positions = [margin_x, margin_x + barcode_width + 50]  # Updated centering
            margin_y = (strip_height - ((barcode_height + spacing_y) * row_count)) // 2  # Centered vertically
            y_positions = [margin_y + (i * (barcode_height + spacing_y)) for i in range(row_count)]

            print(f"🔹 Barcode values received: {barcode_values}")

            missing_barcodes = []
            index = 0
            for barcode_value in barcode_values[:10]:
                barcode_value_clean = barcode_value.split("-")[0]
                temp_barcode_path = os.path.join(barcode_dir, f"barcode_{barcode_value_clean}.png")

                # Debugging
                print(f"Looking for barcode image: {temp_barcode_path}")

                if not os.path.exists(temp_barcode_path):
                    missing_barcodes.append(barcode_value)
                    print(f"❌ Missing barcode image: {barcode_value}")
                    continue

                print(f"✅ Found barcode image: {temp_barcode_path}")
                barcode_img = Image.open(temp_barcode_path).resize((barcode_width, barcode_height))
                barcode_img = barcode_img.convert("RGB")

                col = index % col_count
                row = index // col_count
                x, y = x_positions[col], y_positions[row]

                strip_image.paste(barcode_img, (x, y))
                print(f"📌 Pasted barcode at ({x}, {y})")

                index += 1

            if missing_barcodes:
                print(f"❌ Missing barcode images: {missing_barcodes}")

            strip_image.save(strip_path)
            print(f"✅ Barcode strip saved successfully: {strip_path}")
            return strip_path

        except Exception as e:
            print(f"❌ Exception while generating barcode strip: {e}")


    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @user_bp.route("/updateUserProfile", methods=["POST"])
    def updateUserProfile():
        try:
            data = request.form
            User_id = data.get("id")
            Email = data.get("email")
            Name = data.get("name")
            Phonenumber = data.get("phonenumber")
            Password = data.get("password")
            profile_image = request.files.get("profile_image")

            if not User_id or not Email:
                return jsonify({"error": "ID and email are required."}), 400

            # Validate Email
            email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
            if not re.match(email_regex, Email):
                return jsonify({"error": "Invalid email format."}), 400

            # Check if user exists
            user = User.query.filter_by(id=User_id, email=Email, status="active").first()
            if not user:
                return jsonify({"error": "No active user found with this ID or email."}), 404

            # Validate Phone Number
            if Phonenumber:
                if '-' in Phonenumber:
                    return jsonify({"error": "Phone number should not contain dashes."}), 400
                if not Phonenumber.startswith("03"):
                    return jsonify({"error": "Phone number must start with '03'."}), 400
                if len(Phonenumber) != 11 or not Phonenumber.isdigit():
                    return jsonify({"error": "Phone number must be exactly 11 digits and only digits."}), 400
                user.phonenumber = Phonenumber

            # Update other fields
            if Name:
                user.name = Name
            if Password:
                user.password = Password

            # Handle profile image
            if profile_image:
                if not UserController.allowed_file(profile_image.filename):
                    allowed_types = ', '.join(ALLOWED_EXTENSIONS)
                    return jsonify({"error": f"Invalid file format. Allowed: {allowed_types}"}), 400

                # Generate unique filename
                ext = os.path.splitext(profile_image.filename)[1]
                final_filename = f"profile_{User_id}_{uuid.uuid4().hex[:8]}{ext}"

                # Define and save the file
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], final_filename)
                profile_image.save(image_path)

                # Update user profile path
                user.profile = f"static/profile_pics/{final_filename}"

            db.session.commit()
            return jsonify({"message": "Your profile has been updated successfully."}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500

    # @staticmethod
    # def allowed_file(filename):
    #     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    #
    # @user_bp.route("/updateUserProfile", methods=["POST"])
    # def updateUserProfile():
    #     try:
    #         data = request.form
    #         User_id = data.get("id")
    #         Email = data.get("email")
    #         Name = data.get("name")
    #         Phonenumber = data.get("phonenumber")
    #         Address = data.get("address")
    #         Password = data.get("password")
    #         profile_image = request.files.get("profile_image")
    #
    #         if not User_id or not Email:
    #             return jsonify({"error": "ID and email are required."}), 400
    #
    #         # Validate Email
    #         email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    #         if not re.match(email_regex, Email):
    #             return jsonify({"error": "Invalid email format."}), 400
    #
    #         # Check if user exists
    #         user = User.query.filter_by(id=User_id, email=Email, status="active").first()
    #         if not user:
    #             return jsonify({"error": "No active user found with this ID or email."}), 404
    #
    #         # Validate Phone Number
    #         if Phonenumber:
    #             if '-' in Phonenumber:
    #                 return jsonify({"error": "Phone number should not contain dashes."}), 400
    #             if not Phonenumber.startswith("03"):
    #                 return jsonify({"error": "Phone number must start with '03'."}), 400
    #             if len(Phonenumber) != 11 or not Phonenumber.isdigit():
    #                 return jsonify({"error": "Phone number must be exactly 11 digits and only digits."}), 400
    #             user.phonenumber = Phonenumber
    #
    #         # Update other fields
    #         if Name:
    #             user.name = Name
    #         if Address:
    #             user.address = Address
    #         if Password:
    #             user.password = Password
    #
    #         # Handle profile image
    #         if profile_image:
    #             if not UserController.allowed_file(profile_image.filename):
    #                 allowed_types = ', '.join(ALLOWED_EXTENSIONS)
    #                 return jsonify({"error": f"Invalid file format. Allowed: {allowed_types}"}), 400
    #
    #             # Generate unique filename
    #             ext = os.path.splitext(profile_image.filename)[1]
    #             final_filename = f"profile_{User_id}_{uuid.uuid4().hex[:8]}{ext}"
    #
    #             # Define and save the file
    #             image_path = os.path.join(app.config['UPLOAD_FOLDER'], final_filename)
    #             profile_image.save(image_path)
    #
    #             # Update user profile path
    #             user.profile = f"static/profile_pics/{final_filename}"
    #
    #         db.session.commit()
    #         return jsonify({"message": "Your profile has been updated successfully."}), 200
    #
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500

    @staticmethod
    def GetLatLong(address):
        try:
            response = requests.get(
                'https://nominatim.openstreetmap.org/search',
                params={
                    'q': address,
                    'format': 'json',
                    'addressdetails': 1,
                    'limit': 1,
                },
                headers={'User-Agent': 'GreenBeltApp/1.0'}
            )
            response.raise_for_status()
            data = response.json()

            # No result found
            if not data:
                return None, None

            latitude = data[0]['lat']
            longitude = data[0]['lon']
            return latitude, longitude

        except Exception as e:
            print(f"Error in geocoding: {e}")
            return None, None

    @staticmethod
    def AddUser(data):
        try:
            email = data.get("email")
            name = data.get("name")
            password = data.get("password")
            role = data.get("role", "user")

            # Check for missing fields
            required_fields = {
                "email": email,
                "name": name,
                "password": password,
            }
            missing_fields = [field for field, value in required_fields.items() if not value]
            if missing_fields:
                return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

            # Validate email format
            email_regex = r"(^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$)"
            if not re.match(email_regex, email):
                return jsonify({"error": "Invalid email format."}), 400

            # Check if email already exists
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                return jsonify({"error": "Email already exists."}), 400

            new_user = User(
                name=name.strip(),
                email=email.lower(),
                password=password,
                role=role,
                rank=100
            )

            db.session.add(new_user)
            db.session.commit()
            db.session.refresh(new_user)  # Ensures ID is available

            return jsonify({
                "message": "User added successfully.",
                "id": new_user.id,
            }), 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": f"Database error occurred: {str(e)}"}), 500
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 50

    @staticmethod
    def SaveLocation(data):
        try:
            user_id = data.get("id")
            latitude = data.get("latitude")
            longitude = data.get("longitude")

            if not user_id or not latitude or not longitude:
                return jsonify({"error": "Missing required fields"}), 400

            user = User.query.get(user_id)
            if not user:
                return jsonify({"error": "User not found"}), 404

            user.latitude = latitude
            user.longitude = longitude
            db.session.commit()

            return jsonify({"message": "Location saved successfully"}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": f"Database error occurred: {str(e)}"}), 500
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    @staticmethod
    def UserLogin(data):
        try:
            email = data.get("email")
            password = data.get("password")

            user = User.query.filter_by(email=email).first()
            if not user:
                return {"message": "User not found."}, 404

            if user.status != 'active':
                return {"message": "Account no longer exists."}, 403

            if user.password != password:
                return {"message": "Invalid credentials."}, 401

            return {
                "message": "Login successful.",
                "userData": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
            }, 200

        except Exception as e:
            return {"message": "An unexpected error occurred.", "details": str(e)}, 500


    @staticmethod
    def AddAddress(id):
        try:
            if not id:
                return {"message": "User ID is required."}, 400

            user = User.query.filter_by(id=id).first()
            if not user:
                return {"message": "User not found."}, 404

            if request.method == "GET":
                if user.latitude and user.longitude:
                    return jsonify({
                        "latitude": user.latitude,
                        "longitude": user.longitude
                    }), 200
                else:
                    return {"message": "No address saved for this user."}, 404

            elif request.method == "POST":
                data = request.get_json()
                latitude = data.get("latitude")
                longitude = data.get("longitude")

                if latitude is None or longitude is None:
                    return {"message": "Latitude and longitude are required."}, 400

                user.latitude = latitude
                user.longitude = longitude
                db.session.commit()

                return {"message": "Location saved successfully."}, 200

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

    @staticmethod
    def GetUserZone(id):
        try:
            if not id:
                return {"message": "User ID is required."}, 400

            # Fetch user details from the database
            user = User.query.filter_by(id=id).first()
            if not user:
                return {"message": "User not found."}, 404

            # Validate user location
            if not user.latitude or not user.longitude:
                return {"message": "User location is not available."}, 400

            user_location = Point(user.latitude, user.longitude)

            # Fetch all zones
            zones = Zone.query.all()
            if not zones:
                return {"message": "No zones found."}, 404

            # Iterate through each zone and its markers
            for zone in zones:
                # Fetch all markers for this zone
                markers = ZoneCoordinate.query.filter_by(zoneid=zone.id).all()
                if not markers:
                    continue  # Skip zones with no markers

                # Create a polygon from marker coordinates
                marker_points = [(marker.latitude, marker.longitude) for marker in markers]
                if len(marker_points) < 3:
                    continue  # Polygon requires at least 3 points

                zone_polygon = Polygon(marker_points)

                # Check if user location is inside the zone polygon
                if zone_polygon.contains(user_location):
                    return {
                        "userid": user.id,
                        "name": user.name,
                        "email": user.email,
                        "address": user.address,
                        "latitude": user.latitude,
                        "longitude": user.longitude,
                        "zone": f"{zone.start_point} to {zone.end_point}",
                    }, 200

            return {"message": "User location does not belong to any zone."}, 404

        except Exception as e:
            return {"error": "Failed to determine zone.", "details": str(e)}, 500

    @staticmethod
    def GetUserById(id):
        try:
            # Validate the ID
            if not id:
                return jsonify({"error": "Missing ID"}), 400

            # Fetch user by primary key
            getUser = User.query.get(id)

            if not getUser:
                return jsonify({"error": "User not found"}), 404

            # Construct response without sensitive data (like password)
            user_data = {
                "id": getUser.id,
                "profile": getUser.profile,
                "name": getUser.name,
                "email": getUser.email,
                "role": getUser.role,
                "address": getUser.address,
                "password": getUser.password,
                "phonenumber": getUser.phonenumber,
                "status": getUser.status,
                "rank": getUser.rank,
            }

            return jsonify(user_data), 200

        except Exception as e:
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

    @staticmethod
    def ForgetPassword(data):
        try:
            email = data.get("email")
            phonenumber = data.get("phonenumber")

            email_regex = r"(^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$)"
            if not re.match(email_regex, email):
                return {"message": "Invalid email format."}, 400

            check_email = User.query.filter_by(email=email).first()
            if not check_email:
                return {"message": "User not found."}, 404

            if check_email.phonenumber != phonenumber:
                return {"message": "Invalid credentials."}, 401

            if check_email.status != 'active':
                return {"message": "This account no longer exists."}, 403

            return {
                "message": "Verified.",
                "userData": {
                    "id": check_email.id,
                    "name": check_email.name,
                    "email": check_email.email,
                    "role": check_email.role
                }
            }, 200

        except Exception as e:
            return {"message": "An unexpected error occurred.", "details": str(e)}, 500

    @staticmethod
    def ResetPassword(data):
        try:
            User_id = data.get("id")
            NewPassword = data.get("password")
            ConfirmPassword = data.get("confirm_password")

            if not User_id or not NewPassword or not ConfirmPassword:
                return {"error": "All fields are required."}, 400

            if NewPassword != ConfirmPassword:
                return {"error": "Passwords do not match."}, 400

            user = User.query.filter_by(id=User_id, status="active").first()
            if not user:
                return {"error": "No active user found with this ID."}, 404

            user.password = NewPassword  # Directly updating without hashing
            db.session.commit()

            return {"message": "Your password has been updated successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": "An unexpected error occurred.", "details": str(e)}, 500
    @staticmethod
    def DeleteAccount(data):
        try:
            id = data.get("id")  # Get user ID from data

            if not id:
                return {"error": "Id is required."}, 400

            user = User.query.filter_by(id=id, status="active").first()
            if not user:
                return {"error": "No active user found with this ID."}, 404

            user.status = "inactive"  # Correct way to update status
            db.session.commit()

            return {"message": "Account successfully deactivated."}, 200

        except Exception as e:
            return {"error": str(e)}, 500  # Handle unexpected errors

    @staticmethod
    def RegisterComplaint(data):
        try:
            User_id = data.get("userid")
            complaint = data.get("description")

            if not User_id or not complaint:
                return {"message": "User ID, complaint description."}, 400

            user = User.query.filter_by(id=User_id, status="active").first()
            if not user:
                return {"message": "No active user found with this user ID."}, 404

            # pickup_request = PickupRequests.query.filter_by(userid=User_id, status="pending").first()
            # if not pickup_request:
            #     return {
            #         "message": "No active pickup requests found. Register a pickup request first."
            #     }, 400

            new_complaint = Complaint(
                UserId=User_id,
                ComplaintDescription=complaint,
                TicketNumber=UserController.GenerateTicketNumber(),
            )
            db.session.add(new_complaint)
            db.session.commit()

            return {
                "message": "Complaint registered successfully",
                "User Name": user.name,
                "Ticket Number": new_complaint.TicketNumber,
            }, 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": "Database error occurred.", "details": str(e)}, 500
        except Exception as e:
            return {"error": "Failed to register complaint.", "details": str(e)}, 500

    @staticmethod
    def ShowComplaintStatus(id):
        try:
            complaints = Complaint.query.filter_by(UserId=id).order_by(Complaint.ComplaintDate.desc()).all()

            if complaints:
                return jsonify([
                    {
                        "complaint_date": complaint.ComplaintDate.strftime('%Y-%m-%d'),
                        "complaint_time": complaint.ComplaintDate.strftime('%H:%M:%S'),
                        "complaint_reason": complaint.ComplaintDescription,
                        "status": complaint.Status,
                        "ticket_number": complaint.TicketNumber,
                        "estimated_resolution_date": complaint.ResolutionDate.strftime(
                            '%Y-%m-%d %H:%M:%S') if complaint.ResolutionDate else "Not yet estimated",
                        "admin_response": complaint.AdminResponse or "No response yet"
                    }
                    for complaint in complaints
                ]), 200
            else:
                return jsonify([]), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
        except Exception as e:
            return jsonify(
                {"error": "An unexpected error occurred while fetching complaint status.", "details": str(e)}), 500
    @staticmethod
    def ShowPendingComplaints(id):
        try:
            complaints = Complaint.query.filter_by(UserId=id, Status="review").order_by(
                Complaint.ComplaintDate.desc()).all()

            if complaints:
                pending_complaints = [
                    {
                        "complaint_date": complaint.ComplaintDate.strftime('%Y-%m-%d'),
                        "complaint_time": complaint.ComplaintDate.strftime('%H:%M:%S'),
                        "complaint_reason": complaint.ComplaintDescription,
                        "status": complaint.Status,
                        "ticket_number": complaint.TicketNumber,
                        "estimated_resolution_date": complaint.ResolutionDate.strftime(
                            '%Y-%m-%d %H:%M:%S') if complaint.ResolutionDate else "Not yet estimated",
                        "admin_response": complaint.AdminResponse or "No response yet"
                    }
                    for complaint in complaints
                ]
                return jsonify(pending_complaints), 200
            else:
                return jsonify({"message": "No Pending Requests Found"}), 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
        except Exception as e:
            return jsonify({"error": "Failed to fetch pending complaints.", "details": str(e)}), 500

    @staticmethod
    def ShowCompletedComplaints(id):
        try:
            complaints = Complaint.query.filter_by(UserId=id, Status="closed").order_by(
                Complaint.ComplaintDate.desc()).all()

            if complaints:
                completed_complaints = [
                    {
                        "complaint_date": complaint.ComplaintDate.strftime('%Y-%m-%d'),
                        "complaint_time": complaint.ComplaintDate.strftime('%H:%M:%S'),
                        "complaint_reason": complaint.ComplaintDescription,
                        "status": complaint.Status,
                        "ticket_number": complaint.TicketNumber,
                        "estimated_resolution_date": complaint.ResolutionDate.strftime(
                            '%Y-%m-%d %H:%M:%S') if complaint.ResolutionDate else "Not yet estimated",
                        "admin_response": complaint.AdminResponse or "No response yet"
                    }
                    for complaint in complaints
                ]
                return jsonify(completed_complaints), 200
            else:
                return jsonify({"message": "No Completed Requests Found"}), 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
        except Exception as e:
            return jsonify({"error": "Failed to fetch completed complaints.", "details": str(e)}), 500
    @staticmethod
    def TicketNumberDetails(ticket_number):  # ✅ Now takes ticketnumber as argument
        try:
            complaint = Complaint.query.filter_by(TicketNumber=ticket_number).first()

            if complaint:
                return {
                    "Complaint Date": complaint.ComplaintDate.strftime('%Y-%m-%d'),
                    "Complaint Time": complaint.ComplaintDate.strftime('%H:%M:%S'),
                    "Complaint Reason": complaint.ComplaintDescription,
                    "Status": complaint.Status,
                    "Ticket Number": complaint.TicketNumber,
                    "Estimated ResolutionDate": complaint.ResolutionDate.strftime('%Y-%m-%d %H:%M:%S')
                    if complaint.ResolutionDate else "Not yet estimated",
                    "Admin Response": complaint.AdminResponse or "No response yet"
                }
            else:
                return {"error": "Invalid Ticket Number"}, 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": "Database error occurred.", "details": str(e)}, 500
        except Exception as e:
            return {"error": "Failed to show ticket number details.", "details": str(e)}, 500
    @staticmethod
    def GenerateTicketNumber():
        try:
            while True:
                ticket_number = str(random.randint(10000, 99999))
                existing_ticket = Complaint.query.filter_by(TicketNumber=ticket_number).first()
                if existing_ticket is None:
                    return ticket_number
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
        except Exception as e:
            return jsonify({"error": "Failed to generate ticket number.", "details": str(e)}), 500



    # @staticmethod
    # def AddPickup(data):
    #     try:
    #         required_fields = ["address", "phonenumber", "zoneId", "pickupdays", "id"]
    #         if not all(field in data for field in required_fields):
    #             return {"Message": "Incomplete Information Provided for Pickup request"}, 400
    #
    #         # Validate user
    #         user = User.query.get(data["id"])
    #         if not user:
    #             return {"Message": "No User Found with this ID"}, 404
    #
    #         if user.status != "active":
    #             return {"Message": "User is inactive. Cannot place a pickup request."}, 403
    #
    #         zone_id = data.get("zoneId")
    #         if not zone_id:
    #             return {"Message": "Zone ID is required"}, 400
    #
    #         zone = Zone.query.get(zone_id)  # Fix: Ensure zoneId is used correctly
    #         if not zone:
    #             return {"Message": f"No Zone Found with ID {zone_id}"}, 404
    #
    #         # Check if user already has this zone assigned
    #         existing_user_zone = UserZone.query.filter_by(userid=user.id, zoneid=zone.id).first()
    #         if not existing_user_zone:
    #             new_user_zone = UserZone(userid=user.id, zoneid=zone.id)
    #             db.session.add(new_user_zone)
    #             db.session.commit()
    #
    #         # Validate pickup days
    #         pickup_days = data.get("pickupdays", [])
    #         if isinstance(pickup_days, str):
    #             pickup_days = [pickup_days]  # Convert single string to list
    #
    #         valid_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    #         filtered_days = list(set(pickup_days))  # Remove duplicates
    #
    #         for day in filtered_days:
    #             if day not in valid_days:
    #                 return {"Message": f"Invalid pickup day: {day}"}, 400
    #
    #             newpickup = PickupRequests(
    #                 userid=user.id,
    #                 address=data["address"],
    #                 phonenumber=data["phonenumber"],
    #                 pickupday=day
    #             )
    #             db.session.add(newpickup)
    #
    #         db.session.commit()
    #
    #         return {"Message": "Pickup requests placed successfully."}, 201
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": "Database error occurred.", "details": str(e)}, 500
    #
    #     except Exception as e:
    #         return {"error": "Failed to add pickup.", "details": str(e)}, 500
    #
    # @staticmethod
    # def ViewSchedule(data):
    #     try:
    #         User_id = data.get("userid")
    #         user = User.query.filter_by(id=User_id, status="active").first()
    #         if user:
    #             if user.role != "user":
    #                 return {"message": "Only users with the role 'user' can view schedules."}, 403
    #
    #             pickup_requests = PickupRequests.query.filter_by(userid=User_id).all()
    #             user_details = {
    #                 "id": user.id,
    #                 "name": user.name,
    #                 "email": user.email,
    #                 "role": user.role,
    #                 "status": user.status
    #             }
    #             pickups = [
    #                 {
    #                     "pickup_address": pickup.address,
    #                     "pickup_day": pickup.pickupday,
    #                     "status": pickup.status
    #                 }
    #                 for pickup in pickup_requests
    #             ]
    #             return {
    #                 "user_details": user_details,
    #                 "schedule": pickups
    #             }, 200
    #         return {"message": "No active user found with this user ID."}, 404
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": "Database error occurred.", "details": str(e)}, 500
    #     except Exception as e:
    #         return {"error": "An unexpected error occurred.", "details": str(e)}, 500
    #
    # @staticmethod
    # def ViewPendingSchedule(id):
    #     try:
    #         user = User.query.filter_by(id=id, status="active").first()
    #
    #         pickup_requests = PickupRequests.query.filter_by(userid=id, status="pending") \
    #             .order_by(PickupRequests.created_at.desc()).all()  # Sort by latest first
    #
    #         user_details = {
    #             "id": user.id,
    #             "name": user.name,
    #             "email": user.email,
    #             "role": user.role,
    #             "status": user.status
    #         }
    #
    #         pickups = [
    #             {
    #                 "pickup_address": pickup.address,
    #                 "pickup_day": pickup.pickupday,
    #                 "status": pickup.status
    #             }
    #             for pickup in pickup_requests
    #         ]
    #
    #         if not pickups:
    #             return {
    #                 "user_details": user_details,
    #                 "message": "No pending pickups found for this user."
    #             }, 200
    #
    #         return {
    #             "user_details": user_details,
    #             "schedule": pickups
    #         }, 200
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": "Database error occurred.", "details": str(e)}, 500
    #     except Exception as e:
    #         return {"error": "An unexpected error occurred.", "details": str(e)}, 500
    # @staticmethod
    # def ViewCompletedSchedule(id):
    #     try:
    #         user = User.query.filter_by(id=id, status="active").first()
    #
    #         pickup_requests = PickupRequests.query.filter_by(userid=id, status="completed") \
    #             .order_by(PickupRequests.created_at.desc()).all()
    #
    #         user_details = {
    #             "id": user.id,
    #             "name": user.name,
    #             "email": user.email,
    #             "role": user.role,
    #             "status": user.status
    #         }
    #
    #         pickups = [
    #             {
    #                 "pickup_address": pickup.address,
    #                 "pickup_day": pickup.pickupday,
    #                 "status": pickup.status
    #             }
    #             for pickup in pickup_requests
    #         ]
    #
    #         if not pickups:
    #             return {
    #                 "user_details": user_details,
    #                 "message": "No completed pickups found."
    #             }, 200
    #
    #         return {
    #             "user_details": user_details,
    #             "schedule": pickups
    #         }, 200
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": "Database error occurred.", "details": str(e)}, 500
    #     except Exception as e:
    #         return {"error": "An unexpected error occurred.", "details": str(e)}, 500


    # @staticmethod
    # def RegisterComplaint(data):
    #     try:
    #         User_id = data.get("userid")
    #         complaint = data.get("description")
    #         # zoneid = data.get("zoneid")
    #
    #         if not User_id or not complaint:
    #             return {"message": "User ID, complaint description, and zone ID are required."}, 400
    #
    #         user = db.session.query(User, UserZone).join(UserZone, User.id == UserZone.userid).filter(
    #             User.id == User_id, User.status == "active").first()
    #
    #         if not user:
    #             return {"message": "No active user found with this user ID."}, 404
    #
    #         user, user_zone = user
    #
    #         pickup_request = PickupRequests.query.filter_by(userid=User_id, status="pending").first()
    #         if not pickup_request:
    #             return {
    #                 "message": "No active pickup requests found. Register a pickup request first."
    #             }, 400
    #
    #         existing_complaint = Complaint.query.filter_by(UserId=User_id).first()
    #         if existing_complaint:
    #             return {"message": "You already have a registered complaint for this zone."}, 400
    #
    #         # existing_complaint = Complaint.query.filter_by(UserId=User_id, zoneid=zoneid).first()
    #         # if existing_complaint:
    #         #     return {"message": "You already have a registered complaint for this zone."}, 400
    #
    #         # zone = Zone.query.get(zoneid)
    #         # if not zone:
    #         #     return {"message": "Invalid zone ID. Please provide a valid zone."}, 400
    #
    #         new_complaint = Complaint(
    #             UserId=User_id,
    #             ComplaintDescription=complaint,
    #             TicketNumber=UserController.GenerateTicketNumber(),
    #             # zoneid=zoneid
    #         )
    #         db.session.add(new_complaint)
    #         db.session.commit()
    #
    #         return {
    #             "message": "Complaint registered successfully",
    #             "User Name": user.name,
    #             "Ticket Number": new_complaint.TicketNumber,
    #             # "Zone": f"{zone.start_point} to {zone.end_point}"
    #         }, 201
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": "Database error occurred.", "details": str(e)}, 500
    #     except Exception as e:
    #         return {"error": "Failed to register complaint.", "details": str(e)}, 500