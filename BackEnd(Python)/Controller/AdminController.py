from Model.User import User
from Model.UserZone import UserZone
from Model.Complaint import Complaint
from Model.TruckAssignment import  TruckAssignment
from Model.Slot import  Slot
from Model.Zone import Zone
from Model.Purchase import Purchase
from Model.PickupRequest import PickupRequests
from Model.BarcodeStrip import BarcodeStrip
from Model.Barcode import Barcode
from Model.Truckschedule import TruckSchedule
from Model.Truck import Truck
from Model.TrashItems import TrashItems
from Model.Category import Category
from Model.ZoneCoordinate import ZoneCoordinate
from config import db
import os
from flask import Blueprint, jsonify, request, current_app
from sqlalchemy.exc import SQLAlchemyError
import re
import uuid
from collections import defaultdict
from sqlalchemy import func,or_
from datetime import datetime
import logging
from werkzeug.utils import secure_filename
from config import app

UPLOAD_Image = r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\static\EmployeeProfile"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff', 'ico', 'heic', 'svg'}
app.config['UPLOAD_Image'] = UPLOAD_Image

admin_bp = Blueprint('admin_bp', __name__)
class AdminController:
    import os
    print(os.path.exists(
        r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\static\EmployeeProfile\profile_63_20250329211347_05f7866f81.jpg"))

    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @staticmethod
    def UpdateEmployeeInfo():
        try:
            # Get form data
            employeeId = request.form.get("id")
            name = request.form.get("name")
            Phonenumber = request.form.get("phonenumber")
            Password = request.form.get("password")
            Role = request.form.get("role")
            profile_image = request.files.get("profile_image")

            # Validate employee ID
            if not employeeId:
                return jsonify({"error": "Employee ID is required."}), 400

            # Check if user exists
            user = User.query.filter_by(id=employeeId, status="active").first()
            if not user:
                return jsonify({"error": "No active employee found with this ID."}), 404

            if Phonenumber:
                user.phonenumber = Phonenumber
            if Password:
                user.password = Password
            if Role:
                user.role = Role

            # Handle profile image
            if profile_image:
                if not AdminController.allowed_file(profile_image.filename):
                    return jsonify(
                        {"error": "Invalid file type. Allowed types are: " + ', '.join(ALLOWED_EXTENSIONS)}), 400

                unique_id = uuid.uuid4().hex[:10]
                timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                filename = f"profile_{employeeId}_{timestamp}_{unique_id}.jpg"

                os.makedirs(app.config['UPLOAD_Image'], exist_ok=True)

                # Define file path
                file_path = os.path.join(app.config['UPLOAD_Image'], filename)

                # Save file
                try:
                    profile_image.save(file_path)
                    user.profile = f"EmployeeProfile/{filename}"
                    print(f"✅ Image saved at: {file_path}")  # Debug print
                except Exception as e:
                    return jsonify({"error": "Failed to save profile image.", "details": str(e)}), 500

            # Commit changes
            db.session.commit()
            return jsonify({"message": "Employee info updated successfully.", "profile_image": user.profile}), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
        except Exception as e:
            return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500
    @staticmethod
    def GetEmployeeById(id):
        try:
            if not id:
                return {"error": "Missing ID"}, 400

            getEmployee = User.query.filter_by(id=id).first()

            if not getEmployee:
                return {"error": "Employee not found"}, 404

            return {
                "id": getEmployee.id,
                "profile": getEmployee.profile,
                "name": getEmployee.name,
                "email": getEmployee.email,
                "password": getEmployee.password,
                "role": getEmployee.role,
                "address": getEmployee.address,
                "phonenumber": getEmployee.phonenumber,
                "status": getEmployee.status,
                "rank": getEmployee.rank
            }, 200
        except Exception as e:
            return {"error": str(e)}, 500

    # @staticmethod
    # def UpdateEmployeeInfo():
    #     try:
    #         employeeId = request.form.get("id")
    #         Email = request.form.get("email")
    #         Name = request.form.get("name")
    #         Phonenumber = request.form.get("phonenumber")
    #         Password = request.form.get("password")
    #         Role = request.form.get("role")
    #         profile_image = request.files.get("profile_image")
    #
    #         if not employeeId:
    #             return jsonify({"error": "Employee ID is required."}), 400
    #
    #         user = User.query.filter_by(id=employeeId, status="active").first()
    #
    #         if user:
    #             if Email and Email != user.email:
    #                 return jsonify({"error": "Email cannot be changed."}), 400
    #
    #             if Name and Name != user.name:
    #                 return jsonify({"error": "Name cannot be changed."}), 400
    #
    #             if Phonenumber:
    #                 user.phonenumber = Phonenumber
    #             if Password:
    #                 user.password = Password
    #             if Role:
    #                 user.role = Role
    #
    #             if profile_image:
    #                 filename = f"profile_{employeeId}.jpg"
    #                 file_path = os.path.join("EmployeeProfile", filename)
    #                 os.makedirs("EmployeeProfile", exist_ok=True)
    #                 profile_image.save(file_path)
    #                 user.profile = file_path
    #
    #             db.session.commit()
    #             return jsonify({"message": "Employee info updated successfully."}), 200
    #         else:
    #             return jsonify({"error": "No active employee found with this ID."}), 404
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return jsonify({"error": "Database error occurred.", "details": str(e)}), 500
    #     except Exception as e:
    #         return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500
    #
    #
    #     except Exception as e:
    #         return jsonify(
    #             {"error": "An unexpected error occurred during updating employee info.", "details": str(e)}), 500

    @staticmethod
    def AddEmployee(data):
        try:
            email = data.get("email")
            phonenumber = str(data.get("phonenumber"))
            password = data.get("password")
            name = data.get("name")
            role = data.get("role", "").lower()
            status = data.get("status", "active")
            address = data.get("address")

            # Email Validation
            email_regex = r"(^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$)"
            if not re.match(email_regex, email):
                return {"message": "Invalid email format."}, 400

            # Check for Duplicate Email
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                return {"message": "Email already exists. Please use a different email."}, 400

            # Phone Number Validations
            if not phonenumber:
                return {"message": "Phone Number is required."}, 400
            if '-' in phonenumber:
                return {"message": "Phone number should not contain dashes."}, 400
            if not phonenumber.startswith("03"):
                return {"message": "Phone number must start with '03'."}, 400
            if len(phonenumber) != 11:
                return {"message": "Phone number must be exactly 11 digits long."}, 400

            # Role Validation
            valid_roles = ["collector", "driver", "operator"]
            if role not in valid_roles:
                return {"message": "Invalid role entered."}, 400

            # Address Validation
            if not address:
                return {"message": "Address is required."}, 400

            # Create New Employee
            new_employee = User(
                name=name,
                email=email,
                password=password,
                phonenumber=phonenumber,
                role=role,
                status=status,
                address=address
            )
            db.session.add(new_employee)
            db.session.commit()

            return {"message": "Employee added successfully.", "id": new_employee.id}, 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"message": f"Database error occurred: {str(e)}"}, 500

        except Exception as e:
            return {"message": f"Failed to add employee. {str(e)}"}, 500

    @staticmethod
    def allowed_file(filename):
        """Check if the file has a valid extension."""
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @admin_bp.route("/uploadImage", methods=["POST"])
    def uploadImage():
        try:
            # Get employee ID and profile image from form-data
            employee_id = request.form.get("employeeId")
            profile_image = request.files.get("profile_image")

            if not employee_id:
                return jsonify({"error": "Employee ID is required."}), 400

            # Validate image
            if not profile_image:
                return jsonify({"error": "No profile image found."}), 400
            if not AdminController.allowed_file(profile_image.filename):
                return jsonify({
                    "error": f"Invalid file format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
                }), 400

            # Check if user exists
            user = User.query.filter_by(id=employee_id).first()
            if not user:
                return jsonify({"error": "User not found."}), 404

            # Generate unique filename
            ext = os.path.splitext(profile_image.filename)[1]  # Extract file extension
            unique_filename = f"{employee_id}_{uuid.uuid4().hex}{ext}"  # Example: 123_4f5d6c7a8b9.png

            # Define full path
            image_path = os.path.join(app.config['UPLOAD_Image'], unique_filename)

            # Save image to path
            profile_image.save(image_path)

            # Update user's profile in DB
            user.profile = f"static/EmployeeProfile/{unique_filename}"
            db.session.commit()

            return jsonify({
                "message": "Profile image uploaded successfully.",
                "image_url": user.profile
            }), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": "Database error.", "details": str(e)}), 500

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500

    # @staticmethod
    # def allowed_file(filename):
    #     """Check if the file has a valid extension."""
    #     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    #
    # @admin_bp.route("/uploadImage", methods=["POST"])
    # def uploadImage():
    #     try:
    #         # Get employee ID and profile image from form-data
    #         employee_id = request.form.get("employeeId")
    #         profile_image = request.files.get("profile_image")
    #
    #         if not employee_id:
    #             return jsonify({"error": "Employee ID is required."}), 400
    #
    #         # Validate image
    #         if not profile_image:
    #             return jsonify({"error": "No profile image found."}), 400
    #         if not AdminController.allowed_file(profile_image.filename):
    #             return jsonify({"error": "Invalid file format. Allowed: png, jpg, jpeg."}), 400
    #
    #         user = User.query.filter_by(id=employee_id).first()
    #         if not user:
    #             return jsonify({"error": "User not found."}), 404
    #
    #         filename = secure_filename(f"{employee_id}_{profile_image.filename}")
    #         image_path = os.path.join(app.config['UPLOAD_Image'], filename)
    #
    #         profile_image.save(image_path)
    #
    #         user.profile = f"static/EmployeeProfile/{filename}"
    #         db.session.commit()
    #
    #         return jsonify({"message": "Profile image uploaded successfully."}), 200
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return jsonify({"error": "Database error.", "details": str(e)}), 500
    #
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500

    @staticmethod
    def AllPickups():
        try:
            pickups = PickupRequests.query.all()
            user_pickups = defaultdict(lambda: {
                "User ID": None,
                "Phone Number": None,
                "Location": None,
                "Pickup Days": set(),
                "Pickup Dates": set(),
                "Completion Dates": set(),
                "Status": set()
            })

            for pickup in pickups:
                user_data = user_pickups[pickup.userid]
                user_data["User ID"] = pickup.userid
                user_data["Phone Number"] = pickup.phonenumber
                user_data["Location"] = pickup.address

                user_data["Pickup Days"].add(pickup.pickupday)
                user_data["Pickup Dates"].add(pickup.created_at.strftime('%Y-%m-%d %H:%M:%S'))

                user_data["Completion Dates"].add(
                    pickup.completed_at.strftime('%Y-%m-%d %H:%M:%S') if pickup.completed_at else "Not completed"
                )

                user_data["Status"].add(pickup.status)

            result = [
                {
                    "User ID": data["User ID"],
                    "Phone Number": data["Phone Number"],
                    "Location": data["Location"],
                    "Pickup Days": sorted(data["Pickup Days"]),
                    "Pickup Dates": sorted(data["Pickup Dates"]),
                    "Completion Dates": sorted(data["Completion Dates"]),
                    "Status": ", ".join(data["Status"])
                }
                for data in user_pickups.values()
            ]
            return result, 200

        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching pickup requests: {str(e)}"}, 500
    @staticmethod
    def AllCompletedPickups():
        try:
            pickups = PickupRequests.query.filter_by(status="completed").all()

            if not pickups:
                return {"message": "No completed pickups yet."}, 200
            return [
                {
                    "User ID": pickup.userid,
                    "Location": pickup.address,
                    "Complition Date": pickup.completed_at,
                    "Status": pickup.status
                }
                for pickup in pickups
            ]
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while showing all completed pickup requests: {str(e)}"}, 500
    @staticmethod
    def AllPendingPickups():
        try:
            pickups = PickupRequests.query.filter_by(status="pending").all()
            return [{"User ID": pickup.userid,
                     "Location": pickup.address,
                     "Pickup Date": pickup.created_at,
                     "Status": pickup.status} for pickup in pickups]
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred to show all pending pickup requests: {str(e)}"}, 500
    @staticmethod
    def ShowAllEmployee():
        try:
            users = User.query.filter(
                or_(
                    User.role == "driver",
                    User.role == "collector",
                    User.role == "operator"
                )
            ).all()
            return [
                {
                    "id":user.id,
                    "name": user.name,
                    "email": user.email,
                    "phonenumber": user.phonenumber,
                    "role": user.role,
                    "address": user.address,
                    "status": user.status,
                    "profile":user.profile
                }
                for user in users
            ]
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred to show all employees: {str(e)}"}, 500

    @staticmethod
    def ArchiveEmployee(data):
        try:
            employee_name = data.get('name')
            employee_email = data.get('email')
            employee_role = data.get('role')

            if not employee_name or not employee_email or not employee_role:
                return {"error": "All fields (name, email, role) are required"}, 400

            employee = User.query.filter_by(name=employee_name,
                                            email=employee_email, role=employee_role).first()
            if not employee:
                return {"error": "Employee not found"}, 404

            if employee.status == "inactive":
                return {"message": "This employee is already inactive"}, 400

            employee.status = "inactive"

            db.session.commit()

            return {"message": "Employee marked as inactive successfully"}, 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while marking employee as inactive: {str(e)}"}, 500

    # @staticmethod
    # def ShowTruckAssignments():
    #     try:
    #         truck_assignments = TruckAssignment.query.filter_by(status="active").all()
    #
    #         if not truck_assignments:
    #             return jsonify({"message": "No active truck assignments found"}), 404
    #
    #         result = [
    #             {
    #                 "Truck_ID": truck.truckid,
    #                 "Truck": truck.licensenumber,
    #                 "Zone_ID": truck.zoneid,
    #                 "Zone_name":zone.start_point + zone.end_point,
    #                 "Collector_ID": truck.collectorid,
    #                 "Collector_name":user.name,
    #                 "Driver_ID": truck.driverid,
    #                 "Driver_name":user.name,
    #                 "Assignment Date": str(truck.assignmentdate)
    #             }
    #             for truck in truck_assignments
    #         ]
    #
    #         return jsonify({"Active Truck Assignments": result}), 200
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return jsonify({"error": f"Database error: {str(e)}"}), 500
    #     except Exception as e:
    #         return jsonify({"error": f"An unexpected error occurred while fetching truck assignments: {str(e)}"}), 500

    @staticmethod
    def ShowTruckAssignments():
        try:
            truck_assignments = TruckAssignment.query.filter_by(status="active").all()
            print("🚚 Active Truck Assignments:", truck_assignments)  # Log the raw assignments

            if not truck_assignments:
                return jsonify({"message": "No active truck assignments found"}), 404

            result = []
            for assignment in truck_assignments:
                # Fetch related records
                truck = Truck.query.filter_by(id=assignment.truckid).first()
                zone = Zone.query.filter_by(id=assignment.zoneid).first()
                collector = User.query.filter_by(id=assignment.collectorid, role='collector').first()
                driver = User.query.filter_by(id=assignment.driverid, role='driver').first()

                # Validate existence
                if not all([truck, zone, collector, driver]):
                    continue  # Skip incomplete assignments

                # Append to result list
                result.append({
                    "ID": assignment.id,
                    "Truck_ID": assignment.truckid,
                    "Truck": truck.licensenumber,
                    "Zone_ID": assignment.zoneid,
                    "Zone_name": zone.start_point + " to " + zone.end_point,
                    "Collector_ID": assignment.collectorid,
                    "Collector_name": collector.name,
                    "Driver_ID": assignment.driverid,
                    "Driver_name": driver.name,
                    "Assignment_Date": str(assignment.assignmentdate)
                })

            print("🚚 Result:", result)  # Log the formatted result

            return jsonify({"Active_Truck_Assignments": result}), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": f"Database error: {str(e)}"}), 500
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred while fetching truck assignments: {str(e)}"}), 500

    @staticmethod
    def AddTruckAssigment(data):
        try:
            print("🚀 Received Data:", data)
            truckid = data.get("truckid")
            zoneid = data.get("zoneid")
            driverid = data.get("driverid")
            collectorid = data.get("collectorid")

            truck_exists = Truck.query.filter_by(id=truckid).first()
            if not truck_exists:
                return {"Message": f"Truck ID {truckid} does not exist."}, 400

            zone_exists = Zone.query.filter_by(id=zoneid).first()
            if not zone_exists:
                return {"Message": f"Zone ID {zoneid} does not exist."}, 400

            collector_exists = User.query.filter_by(id=collectorid, role='collector', status='active').first()
            if not collector_exists:
                return {"Message": f"Collector ID {collectorid} does not exist or is not active."}, 400

            driver_exists = User.query.filter_by(id=driverid, role='driver', status='active').first()
            if not driver_exists:
                return {"Message": f"Driver ID {driverid} does not exist or is not active."}, 400

            truck_assigned = TruckAssignment.query.filter_by(truckid=truckid, status='active').first()
            if truck_assigned:
                return {"Message": f"Truck ID {truckid} is already assigned and active."}, 400

            driver_assigned = TruckAssignment.query.filter_by(driverid=driverid, status='active').first()
            if driver_assigned:
                return {"Message": f"Driver ID {driverid} is already assigned and active."}, 400

            collector_assigned = TruckAssignment.query.filter_by(collectorid=collectorid, status='active').first()
            if collector_assigned:
                return {"Message": f"Collector ID {collectorid} is already assigned and active."}, 400

            zone_assigned = TruckAssignment.query.filter_by(zoneid=zoneid, status='active').first()
            if zone_assigned:
                return {"Message": f"Zone ID {zoneid} is already assigned and active."}, 400

            new_assignment = TruckAssignment(
                truckid=truckid,
                zoneid=zoneid,
                driverid=driverid,
                collectorid=collectorid,
                assignmentdate=func.current_date(),
                status='active'
            )

            db.session.add(new_assignment)
            db.session.commit()

            return {"Message": "Truck assignment added successfully."}, 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500

        except Exception as e:
            return {"error": f"An unexpected error occurred while adding truck assignment: {str(e)}"}, 500

    @staticmethod
    def ChangeTruckAssignment(data):
        try:
            if not Truck.query.filter_by(id=data["truckid"]).first():
                return {"Message": f"Truck ID {data['truckid']} does not exist."}, 400

            if not Zone.query.filter_by(id=data["zoneid"]).first():
                return {"Message": f"Zone ID {data['zoneid']} does not exist."}, 400

            if not User.query.filter_by(id=data["collectorid"], role='collector', status='active').first():
                return {"Message": f"Collector ID {data['collectorid']} does not exist or is not active."}, 400

            if not User.query.filter_by(id=data["driverid"], role='driver', status='active').first():
                return {"Message": f"Driver ID {data['driverid']} does not exist or is not active."}, 400

            active_assignments = TruckAssignment.query.filter(
                or_(
                    TruckAssignment.truckid == data["truckid"],
                    TruckAssignment.zoneid == data["zoneid"],
                    TruckAssignment.driverid == data["driverid"],
                    TruckAssignment.collectorid == data["collectorid"]
                ),
                TruckAssignment.status == 'active'
            ).all()

            for assignment in active_assignments:
                assignment.status = 'inactive'

            new_assignment = TruckAssignment(
                truckid=data["truckid"],
                zoneid=data["zoneid"],
                driverid=data["driverid"],
                collectorid=data["collectorid"],
                assignmentdate=func.current_date(),
                status='active'
            )
            db.session.add(new_assignment)
            db.session.commit()

            return {"Message": "Previous active assignments marked inactive, new assignment added successfully."}, 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"Message": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"Message": f"Unexpected error: {str(e)}"}, 500
    @staticmethod
    def CheckAssigmentByDate(data):
        try:
            date = datetime.strptime(data["assignmentdate"], "%Y-%m-%d").date()
        except ValueError:
            return {"Message Invalid date formate , date formate YY-MM-DD"}, 404

        Trucks = TruckAssignment.query.filter_by(assignmentdate=data["assignmentdate"]).all()
        if Trucks:
            return [{"Truck ID": truck.truckid, "Zone ID": truck.zoneid, "Driver ID": truck.driverid,
                     "Collector ID": truck.collectorid,"Expiration Date": truck.expiration_date, "Status": truck.status,} for truck in Trucks], 200
        return {"Message": "No  Truck Staff Assigment for this Date"}, 404
    @staticmethod
    def InactiveTruckAssigments(data):
        try:
            Trucks = TruckAssignment.query.filter_by(status=data["status"]).all()
            if Trucks:
                return [{"Truck ID": truck.truckid, "Zone ID": truck.zoneid, "Driver ID": truck.driverid,
                         "Collector ID": truck.collectorid, "Status": truck.status,
                         "Assigment Date": truck.assignmentdate,"Expiration Date":truck.expiration_date}
                        for truck in Trucks], 200
            return {"Message": "Staff is not changed  on the Truck "}, 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred to show inactive truck assignment: {str(e)}"}, 500

    @staticmethod
    def AllBarcodeStripsPurchased():
        try:
            # Fetch all purchases
            purchases = db.session.query(
                Purchase.id.label("purchaseid"),
                Purchase.userid,
                Purchase.totalcost,
                Purchase.purchasedate,  # Correct column name
                Purchase.zoneid
            ).all()

            # Fetch all barcode strips
            barcode_strips = db.session.query(
                BarcodeStrip.purchaseid,
                BarcodeStrip.type,
                BarcodeStrip.strippath
            ).all()

            # Group barcode strips by purchase ID
            barcode_data = {}
            total_strips_purchased = 0  # Variable to track total strips purchased by all users
            for strip in barcode_strips:
                if strip.purchaseid not in barcode_data:
                    barcode_data[strip.purchaseid] = {
                        "Strips": [],
                        "Recyclable Count": 0,
                        "Non-Recyclable Count": 0
                    }

                # Append the strip details
                barcode_data[strip.purchaseid]["Strips"].append({
                    "Type": strip.type,
                    "Strip Path": strip.strippath
                })

                # Increment counts based on type
                if strip.type.lower() == "recyclable":
                    barcode_data[strip.purchaseid]["Recyclable Count"] += 1
                elif strip.type.lower() == "nonrecyclable":
                    barcode_data[strip.purchaseid]["Non-Recyclable Count"] += 1

                # Increment the total strips count
                total_strips_purchased += 1

            # Merge purchases and barcode data
            merged_purchases = []
            for purchase in purchases:
                strips_data = barcode_data.get(purchase.purchaseid, {})

                merged_purchase = {
                    "User ID": purchase.userid,
                    "Purchase Date": purchase.purchasedate.strftime('%a, %d %b %Y %H:%M:%S GMT'),
                    "Zone ID": purchase.zoneid,
                    "Total Cost": purchase.totalcost,
                    "Recyclable Count": strips_data.get("Recyclable Count", 0),
                    "Non-Recyclable Count": strips_data.get("Non-Recyclable Count", 0),
                    "Purchases": strips_data.get("Recyclable Count", 0) + strips_data.get("Non-Recyclable Count", 0),
                    "Strips": strips_data.get("Strips", [])
                }

                # Fetch the user's name
                user = db.session.query(User.name).filter(User.id == purchase.userid).first()
                merged_purchase["User Name"] = user.name if user else "Unknown User"

                # Add the merged purchase to the final list
                merged_purchases.append(merged_purchase)

            # Add total strips purchased at the end
            merged_purchases.append({
                "Total Strips Purchased": total_strips_purchased
            })

            # Return the merged purchases directly as a list
            return merged_purchases, 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    @staticmethod
    def AllComplaints():
        try:
            complaints = Complaint.query.all()

            result = [{
                "User ID": complaint.UserId,
                "User Name": complaint.user.name if complaint.user else "Unknown",
                "Ticket Number": complaint.TicketNumber,
                "Resolution Date": complaint.ResolutionDate,
                "Admin Response": complaint.AdminResponse,
                "Reason": complaint.ComplaintDescription,
                "Status": complaint.Status,
                "Complaint Date": complaint.ComplaintDate.strftime('%Y-%m-%d') if complaint.ComplaintDate else None
                # ✅ Fetch only date
            } for complaint in complaints]

            total_complaints = len(complaints)
            result.append({
                "Total Complaints": total_complaints
            })

            return result

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching complaints: {str(e)}"}, 500

    # @staticmethod
    # def CompletedComplaints():
    #     try:
    #         completed_complaints = Complaint.query.filter_by(Status="closed").all()
    #
    #         result = [{
    #             "User ID": complaint.Userid,
    #             "User Name": complaint.user.name if complaint.user else "Unknown",
    #             "Reason": complaint.ComplaintDescription,
    #             "Status": complaint.Status,
    #             "Date": complaint.ComplaintDate
    #         } for complaint in completed_complaints]
    #
    #         total_completed = len(completed_complaints)
    #         result.append({
    #             "Total Completed Complaints": total_completed
    #         })
    #         return result
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": f"Database error: {str(e)}"}, 500
    #     except Exception as e:
    #         return {"error": f"An unexpected error occurred while fetching completed complaints: {str(e)}"}, 500
    # @staticmethod
    # def PendingComplaints():
    #     try:
    #         pending_complaints = Complaint.query.filter_by(Status="review").all()
    #
    #         result = [{
    #             "User ID": complaint.Userid,
    #             "User Name": complaint.user.name if complaint.user else "Unknown",
    #             "Reason": complaint.ComplaintDescription,
    #             "Status": complaint.Status,
    #             "Date": complaint.ComplaintDate
    #         } for complaint in pending_complaints]
    #
    #         total_pending = len(pending_complaints)
    #         result.append({
    #             "Total Pending Complaints": total_pending
    #         })
    #
    #         return result
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": f"Database error: {str(e)}"}, 500
    #     except Exception as e:
    #         return {"error": f"An unexpected error occurred while fetching pending complaints: {str(e)}"}, 500
    @staticmethod
    def ComplaintResponse(data):
        try:
            ticket_number = data["ticketnumber"]
            Complaint_response = data["ComplaintResponse"]
            complaint = Complaint.query.filter_by(TicketNumber=ticket_number).first()
            if complaint:
                if (complaint.Status == "review"):
                    complaint.AdminResponse = Complaint_response;
                    complaint.Status = "closed"
                    complaint.ResolutionDate = datetime.now()
                    db.session.commit()
                    return {"message": "Complaint response added sucessfully"}, 201
            else:
                return {"message": "No complaint  register against this ticket number"}
        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    @staticmethod
    def AllTrucks():
        try:
            trucks = Truck.query.all()

            result = [
                {
                    "id": truck.id,
                    "licensenumber": truck.licensenumber,
                    "model": truck.model,
                    "status": truck.status
                }
                for truck in trucks
            ]

            return result  # ✅ Return plain data (NO jsonify here)

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}  # ✅ Return a dict (NO jsonify here)

        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching trucks: {str(e)}"}  # ✅ Return a dict

    from flask import jsonify

    @staticmethod
    def FetchAvaliableTrucks():
        try:
            # Get a subquery of truck IDs with active assignments
            assigned_truck_ids = db.session.query(TruckAssignment.truckid).filter(
                TruckAssignment.status == 'active'  # Assuming active assignments have status 'active'
            ).distinct().subquery()

            # Query trucks that are not assigned to active assignments
            trucks = Truck.query.filter(~Truck.id.in_(assigned_truck_ids)).all()

            # Create a result list of dictionaries for each truck
            result = [
                {
                    "id": truck.id,
                    "licensenumber": truck.licensenumber,
                    "model": truck.model,
                    "status": truck.status
                }
                for truck in trucks
            ]

            # Return the trucks data
            return result  # Return the list of trucks

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500

        except Exception as e:
            # Return the error message as a dict
            return {"error": f"An unexpected error occurred while fetching trucks: {str(e)}"}, 500

    @staticmethod
    def AddTruck(data):
        try:
            newTruck = Truck(
                licensenumber=data["licensenumber"],
                model=data["model"],
                chassisnumber=data["chassisnumber"],
                status = data["status"]
            )
            db.session.add(newTruck)
            db.session.commit()
            return f"Truck added successfully"
        except SQLAlchemyError as e:
            db.session.rollback()  
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"Failed to add truck: {str(e)}"}, 500

    @staticmethod
    def ActiveToInactiveTruck(truckid):
        try:
            truck = Truck.query.filter_by(id=truckid).first()  # ✅ Corrected truck ID filter
            if not truck:
                return {"error": "No record found"}, 404  # ✅ Proper return format with 404 status

            if truck.status == "inactive":
                return {"error": "Truck is already inactive"}, 400  # ✅ Fixed return type

            truck.status = "inactive"  # ✅ Fixed variable name
            db.session.commit()

            return {"message": f"Truck {truck.licensenumber} is now Inactivated"}  # ✅ Using correct field name

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error occurred: {str(e)}"}, 500  # ✅ Proper return format

        except Exception as e:
            return {"error": f"Failed to inactivate truck: {str(e)}"}, 500  # ✅ Proper return format

    @staticmethod
    def InactiveToActiveTruck(truckid):
        try:
            truck = Truck.query.filter_by(id=truckid).first()  # ✅ Fetch truck by ID
            if not truck:
                return {"error": "No record found"}, 404  # ✅ Proper return format with 404 status

            if truck.status == "active":
                return {"error": "Truck is already active"}, 400  # ✅ Prevent duplicate activation

            truck.status = "active"  # ✅ Update status
            db.session.commit()

            return {"message": f"Truck {truck.licensenumber} is now Activated"}  # ✅ Success message

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error occurred: {str(e)}"}, 500  # ✅ Handle DB errors

        except Exception as e:
            return {"error": f"Failed to activate truck: {str(e)}"}, 500  # ✅ Handle unexpected errors

    @staticmethod
    def AllZones():
        try:
            zones = Zone.query.all()

            result = [{
                "Zone ID": zone.id,
                "Start Point":zone.start_point,
                "End Point":zone.end_point
            } for zone in zones]

            return result, 200
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching zones: {str(e)}"}, 500

    @staticmethod
    def FetchAvaliableZones():
        try:
            # Only exclude zones with *active* assignments
            assigned_zone_ids = db.session.query(TruckAssignment.zoneid).filter_by(
                status='active').distinct().subquery()

            zones = Zone.query.filter(~Zone.id.in_(assigned_zone_ids)).all()

            result = [{
                "Zone ID": zone.id,
                "Start Point": zone.start_point,
                "End Point": zone.end_point
            } for zone in zones]

            return result, 200
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching zones: {str(e)}"}, 500

    @staticmethod
    def GetZoneDetails(data):
        try:
            start = data.get("start")
            end = data.get("end")

            if not start or not end:
                return {"error": "Start and end points are required"}, 400

            zone = Zone.query.filter_by(start_point=start, end_point=end).first()

            if not zone:
                return {"error": "Zone not found"}, 404

            result = {
                "Zone ID": zone.id,
                "Start Point": zone.start_point,
                "End Point": zone.end_point
            }
            return result, 200

        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    @staticmethod
    def AddZone(data):
        try:
            # Validate required fields
            print("Received Data:", data)
            if "start_point" not in data or "end_point" not in data or "coordinates" not in data:
                return {"error": "Start point, end point, and coordinates are required"}, 400

            # Format start and end points
            start = " ".join(word.capitalize() for word in data["start_point"].strip().split())
            end = " ".join(word.capitalize() for word in data["end_point"].strip().split())
            coordinates = data["coordinates"]  # List of {latitude, longitude} dicts

            # Check for existing zone
            existing_zone = Zone.query.filter(
                func.lower(Zone.start_point) == func.lower(start),
                func.lower(Zone.end_point) == func.lower(end)
            ).first()

            if existing_zone:
                return {"error": "Zone already exists"}, 400

            # Create new Zone
            new_zone = Zone(start_point=start, end_point=end)
            db.session.add(new_zone)
            db.session.commit()  # Commit to get the zone ID

            print(f"New Zone ID: {new_zone.id}")  # Confirm ID

            # Validate and add ZoneCoordinates
            for seq, coord in enumerate(coordinates, start=1):
                latitude = coord.get('latitude')
                longitude = coord.get('longitude')

                # Validate types
                if not isinstance(latitude, (float, int)) or not isinstance(longitude, (float, int)):
                    db.session.rollback()
                    return {"error": f"Invalid latitude/longitude at point {seq}"}, 400

                # Validate range
                if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
                    db.session.rollback()
                    return {"error": f"Latitude or longitude out of bounds at point {seq}"}, 400

                print(f"Sequence: {seq}, Latitude: {latitude}, Longitude: {longitude}")

                # Create ZoneCoordinate
                new_coord = ZoneCoordinate(
                    zoneid=new_zone.id,
                    latitude=latitude,
                    longitude=longitude,
                    sequence=seq
                )
                db.session.add(new_coord)

            db.session.commit()  # Final commit for coordinates

            return {"message": "New Zone and coordinates added successfully"}, 201

        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Database error: {str(e)}")
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected error: {str(e)}")
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    # @staticmethod
    # def AddZone(data):
    #     try:
    #         if "start_point" not in data or "end_point" not in data:
    #             return {"error": "Start and End points are required"}, 400
    #
    #         start = " ".join(word.capitalize() for word in data["start_point"].strip().split())
    #         end = " ".join(word.capitalize() for word in data["end_point"].strip().split())
    #
    #         existing_zone = Zone.query.filter(
    #             func.lower(Zone.start_point) == func.lower(start),
    #             func.lower(Zone.end_point) == func.lower(end)
    #         ).first()
    #
    #         if existing_zone:
    #             return {"error": "Zone already exists"}, 400
    #
    #         NewZone = Zone(start_point=start, end_point=end)
    #         db.session.add(NewZone)
    #         db.session.commit()
    #
    #         return {"message": "New Zone added successfully"}, 201
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         return {"error": f"Database error: {str(e)}"}, 500
    #     except Exception as e:
    #         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
    @staticmethod
    def ShowSlots():
        try:
            slots = Slot.query.all()
            return [
                {
                    "Day": slot.dayofweek,
                    "Start_Time": slot.starttime.strftime("%H:%M:%S"),
                    "End_Time": slot.endtime.strftime("%H:%M:%S")
                }
                for slot in slots
            ]
        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback the transaction in case of an error
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred to show slots: {str(e)}"}, 500
    @staticmethod
    def AllTruckSchedules():
        try:
            truck_schedules = db.session.query(
                TruckSchedule,
                Truck.licensenumber.label('truck_license_number'),
                PickupRequests.pickupday.label('pickup_day'),
                Slot.starttime.label('slot_start_time'),
                PickupRequests.address.label('pickup_address')
            ).join(
                Truck, Truck.id == TruckSchedule.truckid
            ).join(
                PickupRequests, PickupRequests.id == TruckSchedule.pickuprequestid
            ).join(
                Slot, Slot.id == TruckSchedule.scheduleid  # Join Slot on scheduleid from TruckSchedule
            ).filter(
                PickupRequests.status != 'completed'  # Filter out completed pickups
            ).all()

            # Prepare the list of truck schedules with relevant details
            result = [{
                "Truck Number": truck_schedule.truck_license_number,
                "Pickup Address": truck_schedule.pickup_address,
                "Pickup Day": truck_schedule.pickup_day,
                "Time": truck_schedule.slot_start_time.strftime("%H:%M:%S") if truck_schedule.slot_start_time else None,
                # Convert time to string format
                "Sequence Number": truck_schedule.TruckSchedule.sequencenumber
            } for truck_schedule in truck_schedules]

            total_schedules = len(truck_schedules)
            result.append({
                "Total Truck Schedules": total_schedules
            })

            return result

        except SQLAlchemyError as e:
            db.session.rollback()  # Rollback in case of an error
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching truck schedules: {str(e)}"}, 500
    @staticmethod
    def SearchTruckSchedules(data):
        try:
            truck_id = data.get("id")

            if not truck_id:
                return {"error": "Truck ID is required"}, 400

            truck_schedules = TruckSchedule.query.filter_by(truckid=truck_id).all()

            if not truck_schedules:
                return {"message": "No schedules found for the given truck"}, 404

            result = []
            for schedule in truck_schedules:
                truck = Truck.query.filter_by(id=schedule.truckid).first()
                pickup_request = PickupRequests.query.filter_by(id=schedule.pickuprequestid).first()
                slot = Slot.query.filter_by(id=schedule.scheduleid).first()

                if pickup_request and pickup_request.status == 'completed':
                    continue

                pickup_day = (
                    str(pickup_request.pickupday)
                    if pickup_request and pickup_request.pickupday else None
                )
                start_time = (
                    str(slot.starttime)
                    if slot and slot.starttime else None
                )

                result.append({
                    "Truck License Number": truck.licensenumber if truck else None,
                    "Pickup Address": pickup_request.address if pickup_request else None,
                    "Pickup Day": pickup_day,
                    "Time": start_time,
                    "Sequence Number": schedule.sequencenumber
                })

            total_schedules = len(result)
            result.append({
                "Total Truck Schedules": total_schedules
            })

            return result

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred while fetching truck schedules: {str(e)}"}, 500

    @staticmethod
    def ShowDrivers():
        try:
            drivers = User.query.filter_by(role="Driver").where(User.status == "active").all()
            return [{"id": driver.id, "name": driver.name, "email": driver.email} for driver in drivers]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500
        except Exception as e:
            return f"Failed to show drivers. {str(e)}", 500

    @staticmethod
    def FetchAvaliableDrivers():
        try:
            assigned_ids = db.session.query(TruckAssignment.driverid).filter(
                TruckAssignment.status == 'active'
            ).subquery()

            drivers = User.query.filter_by(role="driver", status="active") \
                .filter(~User.id.in_(assigned_ids)).all()

            return [
                {"id": driver.id, "name": driver.name, "email": driver.email}
                for driver in drivers
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500
        except Exception as e:
            return f"Failed to show drivers. {str(e)}", 500

    @staticmethod
    def ShowCollectors():
        try:
            collectors = User.query.filter_by(role="Collector").where(User.status == "active").all()
            return [
                {"id": collector.id, "name": collector.name, "email": collector.email}
                for collector in collectors
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500
        except Exception as e:
            return f"Failed to show collectors. {str(e)}", 500

    @staticmethod
    def FetchAvaliableCollectors():
        try:
            # Subquery: Get IDs of collectors who are assigned and active in TruckAssignment
            assigned_ids = db.session.query(TruckAssignment.collectorid).filter(
                TruckAssignment.status == 'active'
            ).subquery()

            # Main query: Get collectors who are active but not assigned (not in assigned_ids)
            collectors = User.query.filter_by(role="collector", status="active") \
                .filter(~User.id.in_(assigned_ids)).all()

            return [
                {"id": collector.id, "name": collector.name, "email": collector.email}
                for collector in collectors
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500
        except Exception as e:
            return f"Failed to show collectors. {str(e)}", 500

    @staticmethod
    def ShowOperators():
        try:
            operators = User.query.filter_by(role="Operator").where(User.status == "active").all()
            return [
                {"id": operator.id, "name": operator.name, "email": operator.email}
                for operator in operators
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500
        except Exception as e:
            return f"Failed to show operators. {str(e)}", 500

    @staticmethod
    def InactiveUsers():
        try:
            Users = User.query.filter_by(status='inactive').all()
            return [{"User Email ": user.email, "User Name": user.name, "User Id ": user.id}
                    for user in Users]
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500

        except Exception as e:
            return f"Failed to show inactive users. {str(e)}", 500
    @staticmethod
    def ShowOnlyUsers():
        try:
            users = User.query.filter_by(role="user").all()

            return [{
                "User ID": user.id,
                "Name": user.name,
                "Email": user.email,
                "Phone Number": user.phonenumber,
                "Address": user.address,
                "Status": user.status,
                "Rank": user.rank,
            } for user in users]

        except SQLAlchemyError as e:
            db.session.rollback()
            return {"error": f"Database error occurred: {str(e)}"}, 500

        except Exception as e:
            return {"error": f"Failed to show users. {str(e)}"}, 500
    @staticmethod
    def ActiveToInactiveUser(email):
        try:
            user = User.query.filter_by(email=email).first()
            if not user:
                raise ValueError("no record found")
            if user.status == "inactive":
                raise ValueError("User is Inactive already")

            user.status = "inactive"
            db.session.commit()
            return f"{user.name} account is now In-activated"
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Database error occurred: {str(e)}", 500

        except Exception as e:
            return f"Failed to inactive user. {str(e)}", 500
    @staticmethod
    def AllUserZones():
        try:
            userzones = UserZone.query.all()
            return [{"username ": userzone.userid, "userZone ": userzone.zoneid} for userzone in userzones]
        except SQLAlchemyError as e:
            return {"error": f"Database error: {str(e)}"}, 500
        except Exception as e:
            return {"error": f"An unexpected error occurred to show all user zones: {str(e)}"}, 500

    @staticmethod
    def RankingUser(barcode):
        try:
            # Debug: Print the received barcode
            print(f"Received barcode: {barcode}")

            # Extract the barcode ID (first part before the first '-')
            barcode_id = barcode.split("-")[0]
            print(f"Extracted barcode ID: {barcode_id}")

            # Fetch the Barcode record using the extracted barcode ID
            check = Barcode.query.filter_by(id=int(barcode_id)).first()
            print(f"Barcode record fetched: {check}")

            if not check:
                return {"message": "Barcode not found"}, 404

            # Fetch the related TrashItems using barcode ID
            trashData = TrashItems.query.filter_by(barcodeid=check.id).all()
            print(f"Trash items fetched: {trashData}")

            if not trashData:
                return {"message": "No trash items found for this barcode"}, 404

            total_items = len(trashData)
            print(f"Total trash items: {total_items}")

            # Define category name groups
            recyclable_names = ["Bottle", "Glass", "Metal", "Paper", "PaperCup"]
            non_recyclable_names = ["CigarettesButt", "PlasticBag", "Straw", "PlasticCup"]
            organic_names = ["Organic"]

            # Fetch all categories and map by name
            categories = Category.query.all()
            print(f"Categories fetched: {categories}")

            category_map = {cat.name: cat.id for cat in categories}
            print(f"Category map: {category_map}")

            # Get category ID sets
            recyclable_ids = {category_map[name] for name in recyclable_names if name in category_map}
            non_recyclable_ids = {category_map[name] for name in non_recyclable_names if name in category_map}
            organic_ids = {category_map[name] for name in organic_names if name in category_map}

            # Filter items into groups based on category
            recyclable_items = [
                {"id": item.id, "categoryid": item.categoryid, "barcode_id": item.barcodeid}
                for item in trashData if item.categoryid in recyclable_ids
            ]
            non_recyclable_items = [
                {"id": item.id, "categoryid": item.categoryid, "barcode_id": item.barcodeid}
                for item in trashData if item.categoryid in non_recyclable_ids
            ]
            organic_items = [
                {"id": item.id, "categoryid": item.categoryid, "barcode_id": item.barcodeid}
                for item in trashData if item.categoryid in organic_ids
            ]

            total_recyclable_items = len(recyclable_items)
            total_non_recyclable_items = len(non_recyclable_items)
            total_organic_items = len(organic_items)

            print(f"Recyclable items: {recyclable_items}")
            print(f"Non-recyclable items: {non_recyclable_items}")
            print(f"Organic items: {organic_items}")

            # Determine the percentage of recyclable items
            recyclable_percentage = (total_recyclable_items / total_items) * 100
            print(f"Recyclable percentage: {recyclable_percentage}%")

            # Get the barcode type (recyclable or non-recyclable)
            barcode_type = barcode.split("-")[-1].lower()  # Last part of barcode

            # Check the barcode type and adjust rank accordingly
            rank_change = 0

            if barcode_type == "recyclable":
                # If the barcode is recyclable and the trash items are highly recyclable (e.g., 9/10)
                if recyclable_percentage >= 90:
                    rank_change = 10  # Add 10% to the rank
                print(f"Recyclable barcode detected. Rank change: {rank_change}%")
            elif barcode_type == "non-recyclable":
                # If the barcode is non-recyclable and a significant portion of the items are recyclable
                if recyclable_percentage >= 70:
                    # Subtract percentage based on the number of recyclable items
                    rank_change = -(recyclable_percentage // 10)  # Example: 7/10 = -7%
                print(f"Non-recyclable barcode detected. Rank change: {rank_change}%")

            # Fetch the BarcodeStrip for this barcode
            BarcodeData = BarcodeStrip.query.filter_by(id=check.stripid).first()
            print(f"Barcode strip fetched: {BarcodeData}")

            if not BarcodeData:
                return {"message": "Barcode strip not found"}, 404

            # Fetch purchase details for the barcode
            purchasedetail = Purchase.query.filter_by(id=BarcodeData.purchaseid).first()
            print(f"Purchase detail fetched: {purchasedetail}")

            if not purchasedetail:
                return {"message": "Purchase record not found"}, 404

            # Fetch the user related to the purchase
            user = User.query.filter_by(id=purchasedetail.userid).first()
            print(f"User fetched: {user}")

            if not user:
                return {"message": "User not found"}, 404

            previous_rank = user.rank if user.rank is not None else 0
            print(f"Previous rank: {previous_rank}")

            # Update rank with the calculated rank change
            updated_rank = previous_rank + rank_change
            updated_rank = min(100, max(0, updated_rank))  # Ensure rank stays within 0-100

            # Update the user's rank
            user.rank = updated_rank
            db.session.commit()

            print(f"Updated rank: {updated_rank}")

            return {
                "name": user.name,
                "barcode": barcode,
                "rank_percentage": recyclable_percentage,
                "previous_rank": previous_rank,
                "change_in_rank": rank_change,
                "updated_rank": updated_rank,
                "total_items": total_items,
                "total_recyclable_items": total_recyclable_items,
                "total_non_recyclable_items": total_non_recyclable_items,
                "total_organic_items": total_organic_items,
                "recyclable_items": recyclable_items,
                "non_recyclable_items": non_recyclable_items,
                "organic_items": organic_items,
            }, 200

        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return {"message": "Error in ranking logic", "details": str(e)}, 500

    # @staticmethod
    # def RankingUser(barcode):
    #     check = Barcode.query.filter_by(barcode=barcode).first()
    #     if not check:
    #         return {"message": "Invalid Barcode"}, 404
    #
    #     trashData = TrashItems.query.filter_by(barcodeid=check.id).all()
    #     if not trashData:
    #         return {"message": "No trash items found for this barcode"}, 404
    #
    #     total_items = len(trashData)
    #
    #     recyclable_items = [
    #         {
    #             "id": item.id,
    #             "categoryid": item.categoryid,
    #             "barcode_id": item.barcodeid,
    #         }
    #         for item in trashData if item.categoryid in [1, 2, 3, 4, 5]
    #     ]
    #     total_recyclable_items = len(recyclable_items)
    #
    #     if total_items == 0:
    #         return {"message": "No trash items found", "rank_percentage": 0}, 200
    #
    #     rank_percentage = (total_recyclable_items / total_items) * 100
    #
    #     BarcodeData = BarcodeStrip.query.filter_by(id=check.stripid).first()
    #     if not BarcodeData:
    #         return {"message": "Barcode strip not found"}, 404
    #
    #     purchasedetail = Purchase.query.filter_by(id=BarcodeData.purchaseid).first()
    #     if not purchasedetail:
    #         return {"message": "Purchase record not found"}, 404
    #
    #     user = User.query.filter_by(id=purchasedetail.userid).first()
    #     if not user:
    #         return {"message": "User not found"}, 404
    #
    #     previous_rank = user.rank if user.rank is not None else 0
    #
    #     # Calculate how much to adjust the rank by
    #     if 20 <= rank_percentage < 40:
    #         change_in_rank = -70
    #     elif 40 <= rank_percentage < 60:
    #         change_in_rank = -5
    #     elif 60 <= rank_percentage < 80:
    #         change_in_rank = 0
    #     elif 80 <= rank_percentage <= 100:
    #         change_in_rank = 5
    #     else:
    #         change_in_rank = 0  # for < 20%
    #
    #     updated_rank = max(0, previous_rank + change_in_rank)
    #
    #     # Only now update the user rank
    #     user.rank = updated_rank
    #     db.session.commit()
    #
    #     return {
    #         "name": user.name,
    #         "barcode": barcode,
    #         "rank_percentage": rank_percentage,
    #         "previous_rank": previous_rank,
    #         "change_in_rank": change_in_rank,
    #         "updated_rank": updated_rank,
    #         "total_items": total_items,
    #         "total_recyclable_items": total_recyclable_items,
    #         "recyclable_items": recyclable_items,
    #     }, 200

    @staticmethod
    def GetUserRank():
        try:
            ranks = User.query.filter_by(status='active', role="user").all()
            if not ranks:
                return {"message": "No active users found"}, 404
            return [
                {
                    "name": rank.name,
                    "email": rank.email,
                    "rank": rank.rank,
                } for rank in ranks
            ]
        except Exception as e:
            print(f"Error fetching user ranks: {e}")
            return {"message": "Internal Server Error", "details": str(e)}, 500