from Model.User import User
from Model.PickupRequest import PickupRequests
from Model.UserZone import UserZone
from Model.Zone import  Zone
from Model.Truck import Truck
from Model.TruckAssignment import TruckAssignment
from Model.ZoneCoordinate import ZoneCoordinate
from datetime import datetime
from Model.Truckschedule import TruckSchedule
from  config import db
from flask_sqlalchemy import SQLAlchemy
from Model.Slot import Slot
from shapely.geometry import Point, Polygon
from flask import jsonify
from decimal import Decimal

class DriverController:
    @staticmethod
    def GetDriverInfo(driverid):
        try:
            # 🔍 Get active driver
            driver = User.query.filter_by(id=driverid, status="active").first()
            if not driver:
                return jsonify({"message": "No active driver found with this ID or the account is deleted"}), 404

            # 🚛 Get assigned truck
            assigned_truck = TruckAssignment.query.filter_by(driverid=driver.id).first()
            if not assigned_truck:
                return jsonify({"message": "No truck is assigned to this driver"}), 404

            # 🚚 Get truck details
            truck = Truck.query.filter_by(id=assigned_truck.truckid).first()
            if not truck:
                return jsonify({"message": "No truck information found"}), 404

            # 📍 Get assigned zone
            zone = Zone.query.filter_by(id=assigned_truck.zoneid).first()
            if not zone:
                return jsonify({"message": "No zone assigned to this driver"}), 404

            zone_name = f"{zone.start_point} to {zone.end_point}"

            return jsonify({
                "driver_name": driver.name,
                "truck_number": truck.licensenumber,
                "zone_name": zone_name
            })

        except Exception as e:
            return jsonify({"message": str(e)}), 500

    @staticmethod
    def FetchZone(driverid):
        driver = User.query.filter_by(id=driverid, status="active").first()
        if not driver:
            return jsonify({"message": "No active driver found with this ID or the account is deleted"}), 404

        assigned_truck = TruckAssignment.query.filter_by(driverid=driver.id).first()
        if not assigned_truck:
            return jsonify({"message": "No truck is assigned to this driver"}), 404

        zone_coordinates = ZoneCoordinate.query.filter_by(zoneid=assigned_truck.zoneid).all()
        if not zone_coordinates:
            return jsonify({"message": "Error fetching zone coordinates"}), 404

        # Convert zone_coordinates into a serializable format
        coordinates_list = [{"latitude": coord.latitude, "longitude": coord.longitude} for coord in zone_coordinates]

        return jsonify({
            "zone_id": assigned_truck.zoneid,
            "zone_coordinates": coordinates_list
        }), 200


    @staticmethod
    def UpdateDriverLatLong(data):
        driver_id = data.get("driver_Id")
        latitude = data.get("lat")
        longitude = data.get("lng")

        print(f"🔍 Driver ID: {driver_id}, Lat: {latitude}, Lng: {longitude}")

        if not all([driver_id, latitude, longitude]):
            print("❗ Missing data")
            return jsonify({"status": "error", "message": "Missing data"}), 400

        user = User.query.filter_by(id=driver_id).first()

        if user:
            print("✅ Driver found. Updating...")
            user.lat = Decimal(str(latitude))
            user.lng = Decimal(str(longitude))
            db.session.commit()
            return jsonify({"status": "success", "message": "Location updated"}), 200
        else:
            print("❌ Driver not found")
            return jsonify({"status": "error", "message": "Driver not found"}), 404 @ staticmethod

    @staticmethod
    def CheckZone(lat, lng):
        """Check which zone the given coordinates belong to."""
        # Ensure lat/lng are valid numbers
        try:
            lat = float(lat)
            lng = float(lng)
        except (ValueError, TypeError) as e:
            print(f"Invalid lat/lng values: {lat}, {lng}. Error: {e}")
            return None

        # Skip processing if lat/lng are 0 (or near 0) to avoid processing invalid coordinates
        if lat == 0.0 or lng == 0.0:
            print(f"Skipping invalid coordinate: ({lat}, {lng})")
            return None

        zones = ZoneCoordinate.query.all()  # Fetch all zones from DB
        print("Actual zone coordinates: ", zones)

        zone_dict = {}  # Dictionary to group coordinates by zone_id

        for zone in zones:
            # Group by zone_id using the latitude and longitude columns
            if zone.zone_id not in zone_dict:
                zone_dict[zone.zone_id] = []
            try:
                zone_dict[zone.zone_id].append((float(zone.latitude), float(zone.longitude)))
            except ValueError as e:
                print(f"Error converting zone coordinate lat/lng to float: {e}")

        for zone_id, coordinates in zone_dict.items():
            print(f"Checking Zone {zone_id} with coordinates: {coordinates}")
            if len(coordinates) < 3:
                print(f"Zone {zone_id} has insufficient points to form a polygon!")
                continue

            # Ensure the polygon is closed (first and last point are the same)
            if coordinates[0] != coordinates[-1]:
                coordinates.append(coordinates[0])

            polygon = Polygon(coordinates)  # Create a polygon object

            point = Point(lat, lng)

            # Check if the point intersects with the polygon or is within a small buffer
            if polygon.intersects(point) or polygon.buffer(0.0001).intersects(point):
                print(f"Point ({lat}, {lng}) is inside Zone {zone_id}")
                return zone_id

        print(f"Point ({lat}, {lng}) does not belong to any zone.")
        return None

    @staticmethod
    def FetchRequests(driver_id):
        """Fetch users whose location falls inside the zone assigned to this driver."""
        print(f"[DEBUG] FetchRequests called with driver_id: {driver_id}")

        # Step 1: Get assigned truck and zone
        print("[DEBUG] Fetching truck assignment for driver...")
        assignment = TruckAssignment.query.filter_by(driverid=driver_id).first()
        if not assignment:
            print("[ERROR] No truck assignment found for driver_id:", driver_id)
            return jsonify({"message": "No truck assignment found for this driver."}), 404

        zoneid = assignment.zoneid
        print(f"[DEBUG] Truck assignment found. Zone ID: {zoneid}")

        if not zoneid:
            print("[ERROR] Truck is assigned but no zone attached.")
            return jsonify({"message": "No zone assigned to this driver's truck."}), 404

        # Step 2: Get zone polygon coordinates
        print("[DEBUG] Fetching zone coordinates...")
        zone_coords = ZoneCoordinate.query.filter_by(zoneid=zoneid).all()
        coordinates = [(float(coord.latitude), float(coord.longitude)) for coord in zone_coords]

        print(f"[DEBUG] {len(coordinates)} coordinates fetched for zone.")

        if len(coordinates) < 3:
            print("[ERROR] Not enough coordinates to form a valid zone polygon.")
            return jsonify({"message": "Assigned zone has insufficient coordinates."}), 400

        # Ensure polygon is closed
        if coordinates[0] != coordinates[-1]:
            print("[DEBUG] Closing the polygon by adding starting point to end.")
            coordinates.append(coordinates[0])
        else:
            print("[DEBUG] Polygon already closed.")

        polygon = Polygon(coordinates)
        print("[DEBUG] Polygon created successfully.")

        # Step 3: Fetch users and filter by zone
        print("[DEBUG] Fetching users with role='user'...")
        users = User.query.filter_by(role="user").all()
        print(f"[DEBUG] {len(users)} users fetched.")

        results = []

        for user in users:
            if user.latitude and user.longitude:
                point = Point(float(user.latitude), float(user.longitude))
                if polygon.intersects(point) or polygon.buffer(0.0001).intersects(point):
                    print(f"[DEBUG] User {user.id} ({user.name}) is inside the zone.")
                    results.append({
                        "user_id": user.id,
                        "name": user.name,
                        "address": user.address,
                        "latitude": Decimal(user.latitude),
                        "longitude": Decimal(user.longitude),
                        "zone_id": zoneid
                    })
                else:
                    print(f"[DEBUG] User {user.id} ({user.name}) is NOT inside the zone.")
            else:
                print(f"[WARNING] User {user.id} ({user.name}) has missing latitude/longitude.")

        print(f"[DEBUG] {len(results)} users found inside the zone.")

        return jsonify(results), 200

    # @staticmethod
    # def TodaysPickup(data):
    #     try:
    #         driver_id = data['driverid']
    #         driver = User.query.filter_by(id=driver_id, role="driver").first()
    #         if not driver:
    #             return {"message": "No such driver found"}
    #
    #         truck_assign = TruckAssignment.query.filter_by(driverid=driver_id).first()
    #         if not truck_assign:
    #             return {"message": "No truck is assigned to this driver"}
    #
    #         truck_zone = truck_assign.zoneid
    #         print(f"Truck assigned to driver {driver_id} is in zone {truck_zone}")
    #
    #         today_day = datetime.now().strftime('%A')
    #         print(f"Today is {today_day}")
    #
    #         pickup_requests = PickupRequests.query.filter_by(pickupday=today_day).all()
    #         print(f"Total pickups scheduled for today ({today_day}): {len(pickup_requests)}")
    #
    #         filtered_pickups = []
    #         for pickup in pickup_requests:
    #             print(f"Checking pickup {pickup.id} for user {pickup.userid} in zone {truck_zone}")
    #
    #             user_zone = UserZone.query.filter_by(userid=pickup.userid, zoneid=truck_zone).first()
    #             if user_zone:
    #                 if pickup.status != "completed":
    #                     print(f"Pickup {pickup.id} for user {pickup.userid} matches the truck's zone.")
    #                     filtered_pickups.append({
    #                         "id":pickup.id,
    #                         "pickup_Satus": pickup.status,
    #                         "address": pickup.address,
    #                         "pickup_day": pickup.pickupday,
    #                     })
    #             else:
    #                 print(f"Pickup {pickup.id} for user {pickup.userid} does not match the truck's zone.")
    #
    #         if filtered_pickups:
    #             return {"pickup_requests": filtered_pickups}
    #         else:
    #             return {"message": "No pickup requests match today's day and the assigned truck's zone"}
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 500
    # @staticmethod
    # def CompletedPickupRequest(data):
    #     try:
    #         driver_id = data.get('driverid')
    #         if not driver_id:
    #             return {"message": "Driver ID is required"}, 400
    #
    #         driver = User.query.filter_by(id=driver_id, role="driver").first()
    #         if not driver:
    #             return {"message": "No such driver found"}, 404
    #
    #         if driver.status == "inactive":
    #             return {"message": "Driver is inactive"}, 403
    #
    #         truck_assign = TruckAssignment.query.filter_by(driverid=driver_id).first()
    #         if not truck_assign:
    #             return {"message": "No truck is assigned to this driver"}, 404
    #
    #         truck_zone = truck_assign.zoneid
    #
    #         today_day = datetime.now().strftime('%A')
    #
    #         pickup_requests = PickupRequests.query.filter_by(pickupday=today_day).all()
    #
    #         filtered_pickups = [
    #             {
    #                 "ID": pickup.id,
    #                 "Pickup Status": pickup.status,
    #                 "Address": pickup.address,
    #                 "Pickup Day": pickup.pickupday,
    #             }
    #             for pickup in pickup_requests
    #             if UserZone.query.filter_by(userid=pickup.userid, zoneid=truck_zone).first()
    #                and pickup.status == "completed"
    #             ]
    #         if filtered_pickups:
    #             return {"pickup_requests": filtered_pickups}, 200
    #         else:
    #             return {"message": "No completed pickup requests found for today"}, 404
    #
    #     except Exception as e:
    #         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
    # @staticmethod
    # def NewPickupsOfZone(data):
    #     try:
    #         driver_id = data.get("driverid")
    #         if not driver_id:
    #             return {"message": "Driver ID is required"}, 400
    #
    #         driver = User.query.filter_by(id=driver_id, role="driver").first()
    #         if not driver:
    #             return {"message": "No driver found with this ID"}, 404
    #
    #         if driver.status == "inactive":
    #             return {"message": "Driver is inactive"}, 403
    #
    #         truck_assignment = TruckAssignment.query.filter_by(driverid=driver_id).first()
    #         if not truck_assignment:
    #             return {"message": "No truck assigned to this driver"}, 404
    #
    #         assigned_zone = truck_assignment.zoneid
    #
    #         today_date = datetime.now().date()
    #
    #         scheduled_pickups_subquery = db.session.query(TruckSchedule.pickuprequestid).subquery()
    #
    #         new_pickups = (
    #             db.session.query(PickupRequests)
    #             .join(UserZone, PickupRequests.userid == UserZone.userid)
    #             .filter(
    #                 UserZone.zoneid == assigned_zone,
    #                 PickupRequests.status == "pending",
    #                 db.func.date(PickupRequests.createdat) == today_date,
    #                 ~PickupRequests.id.in_(scheduled_pickups_subquery)
    #             )
    #             .all()
    #         )
    #         if not new_pickups:
    #             return {"message": "No new pickup requests for today in this zone"}, 404
    #
    #         pickup_list = [
    #             {
    #                 "Pickup Address": pickup.address,
    #                 "Request Id": pickup.id,
    #                 "Created At": pickup.createdat.strftime('%Y-%m-%d %H:%M:%S')
    #             }
    #             for pickup in new_pickups
    #         ]
    #         return {"new_pickups": pickup_list}, 200
    #
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
    # @staticmethod
    # def UpdatePickupStatus(data):
    #     try:
    #         pickupid = data.get('pickupid')
    #         if not pickupid:
    #             return {"message": "Pickup ID is required", "status": "error"}
    #
    #         pickup = PickupRequests.query.filter_by(id=pickupid).first()
    #
    #         if pickup:
    #             pickup.status = "completed"
    #             db.session.commit()
    #             return {"message": "Pickup status updated successfully", "status": "completed"}
    #         else:
    #             return {"message": "Pickup request not found", "status": "error"}
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 500
    # @staticmethod
    # def DriverTodaysPickup(data):
    #     try:
    #         Driver_id = data.get("driverid")
    #         if not Driver_id:
    #             return {"message": "Driver ID not provided"}, 400
    #
    #         # driver = User.query.filter_by(id=Driver_id, role="driver").first()
    #         # if not driver:
    #         #     return {"message": "No such driver found"}, 404
    #         #
    #         # if driver.status == "inactive":
    #         #     return {"message":"Driver in inactive"},404
    #
    #         today_day = datetime.now().strftime('%A')
    #
    #         truck_assignment = TruckAssignment.query.filter_by(driverid=Driver_id).first()
    #         if not truck_assignment:
    #             return {"message": "No truck is assigned to this driver"}, 404
    #
    #         driver_truck = truck_assignment.truckid
    #
    #         pickups_for_truck = TruckSchedule.query.filter_by(truckid=driver_truck).all()
    #         if not pickups_for_truck:
    #             return {"message": "No pickups assigned to this truck"}, 404
    #
    #         filter_list = []
    #         for schedule in pickups_for_truck:
    #             pickup_request = PickupRequests.query.filter_by(id=schedule.pickuprequestid, pickupday=today_day,
    #                                                             ).first()
    #             if pickup_request:
    #                 filter_list.append({
    #                     "id": pickup_request.id,
    #                     "pickupaddress": pickup_request.address,
    #                     "status": pickup_request.status,
    #                     "SequenceNumber": schedule.sequencenumber
    #                 })
    #
    #         if not filter_list:
    #             return {"message": "No pickup requests for today"}, 404
    #
    #         return {"Driver route": filter_list}, 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 500
    # @staticmethod
    # def DriverTodaysPendingPickup(data):
    #     try:
    #         Driver_id = data.get("driverid")
    #         if not Driver_id:
    #             return {"message": "Driver ID not provided"}, 400
    #
    #         today_day = datetime.now().strftime('%A')
    #
    #         truck_assignment = TruckAssignment.query.filter_by(driverid=Driver_id).first()
    #         if not truck_assignment:
    #             return {"message": "No truck is assigned to this driver"}, 404
    #
    #         driver_truck = truck_assignment.truckid
    #
    #         truck = Truck.query.filter_by(id=driver_truck).first()
    #         if not truck:
    #             return {"message": "Truck details not found"}, 404
    #
    #         pickups_for_truck = TruckSchedule.query.filter_by(truckid=driver_truck).all()
    #         if not pickups_for_truck:
    #             return {"message": "No pickups assigned to this truck"}, 404
    #
    #         filter_list = []
    #         for schedule in pickups_for_truck:
    #             pickup_request = PickupRequests.query.filter_by(
    #                 id=schedule.pickuprequestid,
    #                 pickupday=today_day,
    #                 status="pending"
    #             ).first()
    #
    #             if pickup_request:
    #                 driver = User.query.filter(User.id == Driver_id, User.role == 'driver').first()
    #                 if not driver:
    #                     return {"message": "Driver details not found"}, 404
    #
    #                 filter_list.append({
    #                     "id": pickup_request.id,
    #                     "driver_name": driver.name,
    #                     "driver_profile": driver.profile,
    #                     "license_number": truck.licensenumber,
    #                     "pickup_address": pickup_request.address,
    #                     "status": pickup_request.status,
    #                     "Sequence_number": schedule.sequencenumber
    #                 })
    #
    #         if not filter_list:
    #             return {"message": "No pickup requests for today"}, 404
    #
    #         return filter_list, 200
    #
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 500
    #
    # @staticmethod
    # def UpdatePickupStatus(data):
    #     pickup_id = data.get("pickupId")
    #
    #     if not pickup_id:
    #         return jsonify({"success": False, "message": "Invalid pickup ID"}), 400
    #
    #     # Find the current "next" pickup
    #     pickup = PickupRequests.query.filter_by(id=pickup_id, status="next").first()
    #
    #     if not pickup:
    #         # If no pickup with status "next" exists, set the first pending one as "next"
    #         next_pickup = PickupRequests.query.filter_by(status="pending").order_by(PickupRequests.id.asc()).first()
    #         if next_pickup:
    #             next_pickup.status = "next"
    #             db.session.commit()
    #             pickup = next_pickup  # Treat this as the new "next" pickup
    #
    #     # Mark the "next" pickup as completed
    #     if pickup and pickup.status == "next":
    #         pickup.status = "completed"
    #         db.session.commit()
    #
    #         # Promote the next pending pickup to "next"
    #         next_pickup = PickupRequests.query.filter_by(status="pending").order_by(PickupRequests.id.asc()).first()
    #         if next_pickup:
    #             next_pickup.status = "next"
    #             db.session.commit()
    #
    #         return jsonify({"success": True, "message": "Pickup status updated successfully"}), 200
    #
    #     return jsonify({"success": False, "message": "No pending pickups available"}), 404
    #
    # @staticmethod
    # def HandlePickupRequests(data):
    #     try:
    #         action = data.get("action")
    #         driver_id = data.get("driverid")
    #
    #         if not action:
    #             return jsonify({"message": "Action type not provided"}), 400
    #
    #         if action == "fetch":
    #             if not driver_id:
    #                 return jsonify({"message": "Driver ID not provided"}), 400
    #
    #             today_day = datetime.now().strftime('%A')
    #
    #             # Get the truck assigned to this driver
    #             truck_assignment = TruckAssignment.query.filter_by(driverid=driver_id).first()
    #             if not truck_assignment:
    #                 return jsonify({"message": "No truck is assigned to this driver"}), 404
    #
    #             truck = Truck.query.filter_by(id=truck_assignment.truckid).first()
    #             if not truck:
    #                 return jsonify({"message": "Truck details not found"}), 404
    #
    #             # Fetch pickup schedules assigned to this truck
    #             pickups_for_truck = (
    #                 db.session.query(PickupRequests, TruckSchedule)
    #                 .join(TruckSchedule, TruckSchedule.pickuprequestid == PickupRequests.id)
    #                 .filter(
    #                     TruckSchedule.truckid == truck.id,
    #                     PickupRequests.pickupday == today_day,
    #                     PickupRequests.status.in_(["pending", "next"])
    #                 )
    #                 .order_by(TruckSchedule.sequencenumber.asc())
    #                 .all()
    #             )
    #
    #             if not pickups_for_truck:
    #                 return jsonify({"message": "No pickups assigned to this truck"}), 404
    #
    #             filter_list = []
    #             for pickup_request, schedule in pickups_for_truck:
    #                 driver = User.query.filter_by(id=driver_id, role="driver").first()
    #                 if not driver:
    #                     return jsonify({"message": "Driver details not found"}), 404
    #
    #                 filter_list.append({
    #                     "id": pickup_request.id,
    #                     "driver_name": driver.name,
    #                     "driver_profile": driver.profile,
    #                     "license_number": truck.licensenumber,
    #                     "pickup_address": pickup_request.address,
    #                     "status": pickup_request.status,
    #                     "sequence_number": schedule.sequencenumber
    #                 })
    #
    #             if not filter_list:
    #                 return jsonify({"message": "No pickup requests for today"}), 404
    #
    #             # Ensure at least one pickup is marked as "next"
    #             if not any(pickup["status"] == "next" for pickup in filter_list):
    #                 first_pending = min(filter_list, key=lambda x: x["sequence_number"], default=None)
    #                 if first_pending:
    #                     PickupRequests.query.filter_by(id=first_pending["id"]).update({"status": "next"})
    #                     db.session.commit()
    #                     first_pending["status"] = "next"
    #
    #             return jsonify(filter_list), 200
    #
    #         elif action == "update":
    #             driver_id = data.get("driverid")
    #             pickup_id = data.get("pickupId")
    #
    #             if not driver_id:
    #                 return jsonify({"success": False, "message": "Driver ID not provided"}), 400
    #
    #             if not pickup_id:
    #                 return jsonify({"success": False, "message": "Invalid pickup ID"}), 400
    #
    #             # Verify driver assignment
    #             truck_assignment = TruckAssignment.query.filter_by(driverid=driver_id).first()
    #             if not truck_assignment:
    #                 return jsonify({"message": "No truck is assigned to this driver"}), 404
    #
    #             # Get truck details
    #             truck = Truck.query.filter_by(id=truck_assignment.truckid).first()
    #             if not truck:
    #                 return jsonify({"message": "Truck details not found"}), 404
    #
    #             # Ensure the pickup request belongs to this driver's truck
    #             pickup = PickupRequests.query.filter_by(id=pickup_id, status="next").first()
    #
    #             if not pickup:
    #                 return jsonify({"success": False, "message": "No valid pickup request found"}), 404
    #
    #             # Mark the current pickup as completed
    #             pickup.status = "completed"
    #             db.session.commit()
    #
    #             # Fetch the next pickup for this driver's truck
    #             next_pickup = (
    #                 db.session.query(PickupRequests)
    #                 .join(TruckSchedule, TruckSchedule.pickuprequestid == PickupRequests.id)
    #                 .filter(
    #                     TruckSchedule.truckid == truck.id,
    #                     PickupRequests.status == "pending"
    #                 )
    #                 .order_by(TruckSchedule.sequencenumber.asc())
    #                 .first()
    #             )
    #
    #             if next_pickup:
    #                 next_pickup.status = "next"
    #                 db.session.commit()
    #                 return jsonify({"success": True, "message": "Pickup updated, next pickup assigned"}), 200
    #
    #             return jsonify({"success": True, "message": "Pickup updated, no more pickups left"}), 200
    #
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({"error": str(e)}), 500
    #
    # @staticmethod
    # def DriverTodaysCompletedPickup(driverid):
    #     try:
    #         if not driverid:
    #             return {"message": "Driver ID not provided"}, 400
    #
    #         today_day = datetime.now().strftime('%A')
    #
    #         truck_assignment = TruckAssignment.query.filter_by(driverid=driverid).first()
    #         if not truck_assignment:
    #             return {"message": "No truck is assigned to this driver"}, 404
    #
    #         driver_truck = truck_assignment.truckid
    #
    #         pickups_for_truck = TruckSchedule.query.filter_by(truckid=driver_truck).all()
    #         if not pickups_for_truck:
    #             return {"message": "No pickups assigned to this truck"}, 404
    #
    #         filter_list = []
    #         for schedule in pickups_for_truck:
    #             pickup_request = PickupRequests.query.filter_by(id=schedule.pickuprequestid, pickupday=today_day,
    #                                                             status="completed").first()
    #             if pickup_request:
    #                 filter_list.append({
    #                     "id": pickup_request.id,
    #                     "pickupaddress": pickup_request.address,
    #                     "status": pickup_request.status
    #                 })
    #
    #         if not filter_list:
    #             return {"message": "No pickup requests for today"}, 404
    #
    #         return filter_list, 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 500
    # @staticmethod
    # def AutoSchedulePickup(data):
    #     Driver_id = data.get("driverid")
    #     pickup_request_id = data["pickuprequestid"]
    #     new_sequence_number = data.get("sequencenumber")
    #
    #     if not Driver_id:
    #         return {"Message": "Driver ID not provided"}, 400
    #
    #     driver = User.query.filter_by(id=Driver_id, role="driver").first()
    #     if not driver:
    #         return {"Message": "No such driver found"}, 404
    #
    #     if driver.status == "inactive":
    #         return {"message":"Driver in inactive"}, 404
    #
    #     pickup_request = PickupRequests.query.filter_by(id=pickup_request_id).first()
    #     if not pickup_request:
    #         return {"Message": "No such Pickup Request Id found"}, 404
    #
    #     user_zone = UserZone.query.filter_by(userid=pickup_request.userid).first()
    #     if not user_zone:
    #         return {"Message": "No zone selected by user for pickup"}, 404
    #
    #     truck_assign = TruckAssignment.query.filter_by(zoneid=user_zone.zoneid, driverid=Driver_id).first()
    #     if not truck_assign:
    #         return {"Message": "No truck is assigned to this driver in the user's selected zone"}, 404
    #
    #     if user_zone.zoneid != truck_assign.zoneid:
    #         return {"Message": "This pickup request is not assigned to the given driver"}, 400
    #
    #     today_day = datetime.now().strftime('%A').lower()
    #
    #     if pickup_request.pickupday.strip().lower() != today_day:
    #         return {"Message": "This pickup request is not for today's pickup"}, 400
    #
    #     with db.session.no_autoflush:
    #         all_schedules = TruckSchedule.query.join(PickupRequests,
    #                         TruckSchedule.pickuprequestid == PickupRequests.id).filter(
    #             TruckSchedule.truckid == truck_assign.truckid,
    #             PickupRequests.pickupday == today_day
    #         ).order_by(TruckSchedule.sequencenumber).all()
    #
    #         if new_sequence_number < 1 or new_sequence_number > len(all_schedules) + 1:
    #             return {
    #                 "Message": f"Invalid sequence number. Please provide a number between 1 and {len(all_schedules) + 1}."
    #             }, 400
    #         existing_schedule = next((s for s in all_schedules if s.pickuprequestid == pickup_request_id), None)
    #
    #         if existing_schedule:
    #             current_sequence_number = existing_schedule.sequencenumber
    #
    #             if current_sequence_number != new_sequence_number:
    #                 if new_sequence_number < current_sequence_number:
    #                     for schedule in all_schedules:
    #                         if new_sequence_number <= schedule.sequencenumber < current_sequence_number:
    #                             schedule.sequencenumber += 1
    #                             db.session.add(schedule)
    #
    #                 existing_schedule.sequencenumber = new_sequence_number
    #                 db.session.add(existing_schedule)
    #
    #         else:
    #             for schedule in all_schedules:
    #                 if schedule.sequencenumber >= new_sequence_number:
    #                     schedule.sequencenumber += 1
    #                     db.session.add(schedule)
    #
    #             new_schedule = TruckSchedule(
    #                 truckid=truck_assign.truckid,
    #                 pickuprequestid=pickup_request.id,
    #                 sequencenumber=new_sequence_number
    #             )
    #             db.session.add(new_schedule)
    #             all_schedules.append(new_schedule)
    #
    #         available_slots = Slot.query.filter_by(dayofweek=today_day).order_by(Slot.starttime).all()
    #
    #         if len(available_slots) < len(all_schedules):
    #             return {
    #                 "Message": "Insufficient slots available for today's schedule. Please add more slots or adjust pickup requests."
    #             }, 400
    #
    #         for schedule in all_schedules:
    #             try:
    #                 slot_id = available_slots[schedule.sequencenumber - 1].id
    #                 schedule.scheduleid = slot_id
    #                 db.session.add(schedule)
    #             except IndexError:
    #                 print(f"Error: Sequence number {schedule.sequencenumber} exceeds available slots.")
    #                 return {
    #                     "Message": f"Cannot assign a slot to sequence number {schedule.sequencenumber}. "
    #                                f"Please check slot availability and sequence numbers."
    #                 }, 500
    #         for schedule in all_schedules:
    #             if schedule.scheduleid is None:
    #                 print(f"Error: Schedule ID is still NULL for sequence {schedule.sequencenumber}")
    #                 return {
    #                     "Message": "Slot assignment failed for one or more schedules. Please review slot configurations."
    #                 }, 500
    #
    #     db.session.commit()
    #     return {"Message": "Pickup request is added and switched successfully"}
    #
    #
    #
    #
    #
