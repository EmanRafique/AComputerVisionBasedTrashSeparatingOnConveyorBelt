from flask import request, Flask, jsonify
from Model.User import User
from Model.TruckAssignment import TruckAssignment
from Model.Barcode import Barcode
from math import radians, cos, sin, asin, sqrt
import easyocr
import cv2
import numpy as np
from config import db
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

class CollectorController:

    @staticmethod
    def haversine(lat1, lon1, lat2, lon2):
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * asin(sqrt(a))
        r = 6371
        meter_distance = c * r * 1000
        return meter_distance

    @staticmethod
    def ScanBarcode(data):
        barcode = data.get("barcode")
        collector_id = data.get("collectorid")

        if not barcode:
            return jsonify({"error": "No QR provided"}), 400

        parts = barcode.split("-")
        if len(parts) < 2:
            return jsonify({"error": "Invalid QR format"}), 400

        user_id = parts[1]

        barcode_entry = Barcode.query.filter_by(barcode=barcode).first()
        if not barcode_entry:
            return jsonify({"error": "No such QR found"}), 404

        if barcode_entry.isvalid == "invalid":
            return jsonify({"error": "QR is already used"}), 400

        scan_result = CollectorController.Is_Scannable(user_id, collector_id, barcode)
        if not scan_result["status"]:
            return jsonify({"error": scan_result["message"]}), 400
        if barcode_entry.Is_Scannable == 1:
            barcode_entry.isvalid = "invalid"
            barcode_entry.scanned_at = datetime.now()
            db.session.commit()

            return jsonify({"message": "QR scanned successfully"}), 200

    @staticmethod
    def Is_Scannable(user_id, collector_id, barcode_value):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"status": False, "message": "User not found"}

        barcode = Barcode.query.filter_by(barcode=barcode_value).first()
        if not barcode:
            return {"status": False, "message": "Barcode not found"}

        if barcode.Is_Scannable == 0:
            user_lat, user_lng = user.latitude, user.longitude

            assigned_collector = TruckAssignment.query.filter_by(
                collectorid=collector_id, status="active"
            ).first()
            print(f"Looking for collector id {collector_id}, found: {assigned_collector}")

            if not assigned_collector:
                return {"status": False, "message": "Collector not assigned"}

            driver_id = assigned_collector.driverid
            driver_user = User.query.filter_by(id=driver_id).first()

            if not driver_user:
                return {"status": False, "message": "Driver not found"}

            driver_lat, driver_lng = driver_user.latitude, driver_user.longitude
            user_lat = float(user.latitude)
            driver_lat = float(driver_user.latitude)
            user_lng = float(user.longitude)
            driver_lng = float(driver_user.longitude)

            distance = CollectorController.haversine(user_lat, user_lng, driver_lat, driver_lng)
            if distance < 15:
                barcode.Is_Scannable = 1
                db.session.commit()
                return {"status": True, "message": "Barcode marked as scannable"}
            else:
                return {"status": False, "message": "Too far from driver"}

        return {"status": False, "message": "Barcode already scanned"}