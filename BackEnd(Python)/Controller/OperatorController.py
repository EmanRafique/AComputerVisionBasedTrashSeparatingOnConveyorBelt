from Model.User import User
from Model.Barcode import Barcode
from Model.BarcodeStrip import BarcodeStrip
from Model.Purchase import Purchase
from Model.Zone import Zone
from Model.ZoneCoordinate import ZoneCoordinate
from config import db
from flask import request
from sqlalchemy.exc import SQLAlchemyError

class OperatorController:
    @staticmethod
    def FetchDetailsByQR(qr_code):
        try:
            # Directly use qr_code as it's passed as an argument from the route
            print("Received QR Code:", qr_code)

            # Query the Barcode table using the provided QR code
            barcode_record = Barcode.query.filter_by(barcode=qr_code).first()
            if not barcode_record:
                print("Error: QR not found.")
                return {"message": "QR not found."}, 404

            # Query the related BarcodeStrip, Purchase, User, and Zone records
            barcode_strip = BarcodeStrip.query.get(barcode_record.stripid)
            if not barcode_strip:
                print("Error: QR strip not found.")
                return {"message": "QR strip not found."}, 404

            purchase = Purchase.query.get(barcode_strip.purchaseid)
            if not purchase:
                print("Error: Purchase record not found.")
                return {"message": "Purchase record not found."}, 404

            user = User.query.get(purchase.userid)
            if not user:
                print("Error: User not found.")
                return {"message": "User not found."}, 404

            zone = Zone.query.get(purchase.zoneid)
            if not zone:
                print("Error: Zone not found.")
                return {"message": "Zone not found."}, 404

            # Query the ZoneCoordinate records
            zone_coords = ZoneCoordinate.query.filter_by(zoneid=zone.id).all()
            coordinates = [
                {"latitude": coord.latitude, "longitude": coord.longitude}
                for coord in zone_coords
            ]

            # Prepare the response with all the details
            qr_info = {
                "User_Name": user.name,
                "PhoneNumber": user.phonenumber,
                "Latitude": user.latitude,
                "Longitude": user.longitude,
                "Zone_Name": f"{zone.start_point} to {zone.end_point}",
                "Zone_Coordinates": coordinates,
                "QR_Type": barcode_strip.type
            }

            return {"message": "QR code data fetched successfully.", "details": qr_info}, 200

        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Database error: {str(e)}")
            return {"error": "Database error", "details": str(e)}, 500

        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {"error": "Unexpected error occurred", "details": str(e)}, 500

