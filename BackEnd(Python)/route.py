from config import app, db
from flask import Flask, request, jsonify, Blueprint
from Controller.UserController import UserController
from Controller.UserController import user_bp
from Controller.AdminController import admin_bp
from Controller.AdminController import AdminController
from Controller.CollectorController import CollectorController
from Controller.DriverController import  DriverController
from Controller.OperatorController import OperatorController
from Controller.DetectionController import DetectionController
from sqlalchemy.exc import SQLAlchemyError
import os
import traceback
from flask import send_from_directory
output_dir = r"C:\Users\PROFESSIONAL\PycharmProjects\BackEnd\Images"
os.makedirs(output_dir, exist_ok=True)

###############    USER CONTROLLER    ################

@app.errorhandler(Exception)
def handle_exception(e):
    print("🔥 ERROR TRACEBACK:")
    traceback.print_exc()
    return jsonify({"error": str(e)}), 500


@app.route("/addUser", methods=["POST"])
def addUser():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        response = UserController.AddUser(data)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/addAddress/<int:id>", methods=["POST", "GET"])
def addAddress(id):
    try:
        response = UserController.AddAddress(id)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500


@app.route("/saveLocation", methods=["POST"])
def saveLocation():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        response = UserController.SaveLocation(data)  # Pass data correctly
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/userLogin", methods=["OPTIONS", "POST"])
def userLogin():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400
        if not data.get("email") or not data.get("password"):
            return jsonify({"message": "Email and password are required"}), 400

        response, status_code = UserController.UserLogin(data)
        return jsonify(response), status_code

    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/getUserById/<int:id>", methods=["GET"])
def getUserById(id):
    try:
        return UserController.GetUserById(id)
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/getUserZone/<int:id>", methods=["GET"])
def getUserZone(id):
    try:
        response, status_code = UserController.GetUserZone(id)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/forgetPassword", methods=["POST"])
def forgetPassword():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        response, status_code = UserController.ForgetPassword(data)
        return jsonify(response), status_code

    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/resetPassword", methods=["POST"])
def resetPassword():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        response, status_code = UserController.ResetPassword(data)
        return jsonify(response), status_code

    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/deleteAccount", methods=["POST"])
def deleteAccount():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        response, status_code = UserController.DeleteAccount(data)
        return jsonify(response), status_code

    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/addBarcodeStrip" , methods = ["POST"])
def addBarcodeStrip():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400
        response =  UserController.AddBarcodeStrip(data)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/addPickup", methods=["POST"])
def addPickup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error" :"No Data Provided"})
        response = UserController.AddPickup((data))
        return response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/viewSchedule", methods=["GET"])
def viewSchedule():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400
        result, status_code = UserController.ViewSchedule(data)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/viewPendingSchedule/<int:id>", methods=["GET"])
def viewPendingSchedule(id):
    try:
        if not id:
            return jsonify({"message": "User ID is required"}), 400

        result, status_code = UserController.ViewPendingSchedule(id)
        return jsonify(result), status_code

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/viewCompletedSchedule/<int:id>", methods=["GET"])
def viewCompletedSchedule(id):
    try:
        if not id:
            return jsonify({"message": "User ID is required"}), 400

        result, status_code = UserController.ViewCompletedSchedule(id)
        return jsonify(result), status_code

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/registerComplaint", methods = ["POST"])
def registerComplaint():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error" :"No Data Provided"})
        response = UserController.RegisterComplaint(data)
        return response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showComplaintStatus/<int:id>", methods=["GET"])
def showComplaintstatus(id):
    try:
        response = UserController.ShowComplaintStatus(id)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showPendingComplaints/<int:id>", methods = ["GET"])
def showPendingComplaints(id):
    try:
        response = UserController.ShowPendingComplaints(id)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showCompletedComplaints/<int:id>", methods = ["GET"])
def showCompletedComplaints(id):
    try:
        response = UserController.ShowCompletedComplaints(id)
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/ticketNumberDetails/<int:ticket_number>", methods=["GET"])
def ticketNumberDetails(ticket_number):
    try:
        response = UserController.TicketNumberDetails(ticket_number)
        return jsonify(response)
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

################    Admin Controller      #############

@app.route("/allPickups" , methods = ["GET"])
def allPickups():
    try:
        return jsonify (AdminController.AllPickups())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allCompletedPickups" , methods = ["GET"])
def allCompletedPickups():
    try:
        return jsonify (AdminController.AllCompletedPickups())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allPendingPickups" , methods = ["GET"])
def allPendingPickups():
    try:
        return jsonify (AdminController.AllPendingPickups())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showAllEmployee", methods=["GET"])
def showAllEmployee():
    try:
        return jsonify(AdminController.ShowAllEmployee())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/getEmployeeById/<int:id>", methods=["GET"])
def getEmployeeById(id):
    try:
        response, status_code = AdminController.GetEmployeeById(id)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/addEmployee", methods=["POST"])
def addEmployee():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        # Directly return the response from AddEmployee without jsonify again
        return AdminController.AddEmployee(data)
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/archiveEmployee", methods=["POST"])
def archiveEmployee():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error":"No input data provided"}),400
        return jsonify(AdminController.ArchiveEmployee(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/updateEmployeeInfo", methods=["POST"])
def updateEmployeeInfo():
    try:
        response = AdminController.UpdateEmployeeInfo()
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showTruckAssigments")
def showTruckAssigment():
    try:
        response = AdminController.ShowTruckAssignments()
        return response
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/addTruckAssigment" , methods = ["POST"])
def addTruckAssigment():
    try:
        data = request.get_json()
        return jsonify(AdminController.AddTruckAssigment(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/changeTruckAssignment", methods=["POST"])
def changeTruckAssignment():
    try:
        data = request.get_json()
        return AdminController.ChangeTruckAssignment(data)
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/checkAssigmentByDate" , methods = ["GET"])
def checkAssigmentByDate():
    try:
        data = request.get_json()
        return jsonify(AdminController.CheckAssigmentByDate(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/inactiveTruckAssigments" , methods = ["GET"])
def inactiveTruckAssigments():
    try:
        data = request.get_json()

        return jsonify(AdminController.InactiveTruckAssigments(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allBarcodeStripsPurchased" , methods = ["GET"])
def allBarcodeStripsPurchased():
    try:
        return jsonify(AdminController.AllBarcodeStripsPurchased())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allComplaints", methods=["GET"])
def allComplaints():
    try:
        # Call the static method AllComplaints from the AdminController
        return jsonify(AdminController.AllComplaints())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/completedComplaints", methods=["GET"])
def completedComplaints():
    try:
        return jsonify(AdminController.CompletedComplaints())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/pendingComplaints", methods=["GET"])
def pendingComplaints():
    try:
        return jsonify(AdminController.PendingComplaints())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500


@app.route("/complaintResponse" , methods = ["POST"])
def complaintResponse():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        return jsonify(AdminController.ComplaintResponse(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allTrucks", methods=["GET"])
def allTrucks():
    try:
        data = AdminController.AllTrucks()  # Now it returns a dict/list
        return jsonify(data), 200  # ✅ Properly wrap response here
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/fetchAvaliableTrucks", methods=["GET"])
def fetchAvaliableTrucks():
    try:
        data = AdminController.FetchAvaliableTrucks()  # Now it returns only the data, not a tuple
        if isinstance(data, dict) and "error" in data:
            return jsonify(data), 500
        return jsonify(data), 200  # Return the data properly wrapped in a JSON response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500



@app.route("/addTruck", methods=["POST"])
def addTruck():
    try:
        data = request.get_json()
        RESPONSE = AdminController.AddTruck(data)
        return RESPONSE
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500


@app.route("/activeToInactiveTruck", methods=["POST"])
def activeToInactiveTruck():
    try:
        data = request.get_json()
        truckid = data.get("truckid")  # ✅ Extract truck ID from request data

        if not truckid:
            return jsonify({"error": "Truck ID is required"}), 400  # ✅ Validation check

        response = AdminController.ActiveToInactiveTruck(truckid)  # ✅ Pass truckid properly
        return jsonify(response)  # ✅ Properly return response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/inactiveToActiveTruck", methods=["POST"])
def inactiveToActiveTruck():
    try:
        data = request.get_json()
        truckid = data.get("truckid")  # ✅ Extract truck ID

        if not truckid:
            return jsonify({"error": "Truck ID is required"}), 400  # ✅ Validation check

        response = AdminController.InactiveToActiveTruck(truckid)  # ✅ Call controller function
        return jsonify(response)  # ✅ Properly return response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

        ##########      TRUCK ASSIGNMENT     ##############

                ##########      ZONE     ##############
@app.route("/allZones", methods=["GET"])
def allZones():
    try:
        return jsonify(AdminController.AllZones())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/fetchAvaliableZones", methods=["GET"])
def fetchAvaliableZones():
    try:
        return jsonify(AdminController.FetchAvaliableZones())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/getZoneDetails", methods=["POST"])
def getZoneDetails():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body is missing"}), 400

        response, status_code = AdminController.GetZoneDetails(data)
        return jsonify(response), status_code

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/addZone", methods=["POST"])
def addZone():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        return jsonify(AdminController.AddZone(data))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

                ##########      SLOT     ##############

@app.route("/showSlots")
def showSlots():
    try:
        return jsonify(AdminController.ShowSlots())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

        ##########      TRUCK SCHEDULE     ##############

@app.route("/allTruckSchedules", methods=["GET"])
def allTruckSchedules():
    try:
        return jsonify(AdminController.AllTruckSchedules())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/searchTruckSchedule", methods=["GET"])
def searchTruckSchedule():
    try:
        data = request.get_json()

        if not data or "id" not in data:
            return jsonify({"error": "Truck Schedule ID is required"}), 400

        response = AdminController.SearchTruckSchedules(data)
        return  response

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showDrivers")
def showDrivers():
    try:
        return jsonify(AdminController.ShowDrivers())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/fetchAvaliableDrivers")
def fetchAvaliableDrivers():
    try:
        return jsonify(AdminController.FetchAvaliableDrivers())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showCollectors")
def showCollectors():
    try:
        return jsonify(AdminController.ShowCollectors())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/fetchAvaliableCollectors")
def fetchAvaliableCollectors():
    try:
        return jsonify(AdminController.FetchAvaliableCollectors())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showOperators")
def showOperators():
    try:
        return jsonify(AdminController.ShowOperators())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

                 ##########      USER     ##############
@app.route("/inactiveUsers")
def inactiveUsers():
    try:
        return jsonify(AdminController.InactiveUsers())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/showOnlyUsers" )
def showOnlyUsers():
    try:
        return jsonify(AdminController.ShowOnlyUsers())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/activeToInactiveUser", methods=["POST"])
def activeToInactiveUser():
    try:
        data = request.get_json()
        email = data["email"]
        if not email:
            return f"email is required"
        return jsonify(AdminController.ActiveToInactiveUser(email))
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/allUserZones")
def allUserZones():
    try:
        return jsonify(AdminController.AllUserZones())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

############################# Collector Controller############################
@app.route("/scanBarcode", methods=["POST"])
def scanBarcode():
    try:
        data = request.get_json()
        return CollectorController.ScanBarcode(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

############################# Operator Controller############################

# @app.route("/fetchDetailsByQR", methods=["GET"])
# def fetchDetailsByQR():
#     try:
#         result, status_code = OperatorController.FetchDetailsByQR()
#         return jsonify(result), status_code
#     except Exception as e:
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route("/fetchDetailsByQR/<qr_code>", methods=["GET"])
def fetchDetailsByQR(qr_code):
    try:
        result, status_code = OperatorController.FetchDetailsByQR(qr_code)
        return jsonify(result), status_code
    except Exception as e:
        app.logger.error(f"Error occurred while fetching details by QR: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

######################  Driver Controller ###############

@app.route('/getDriverInfo/<int:driverid>', methods=['GET'])
def getDriverInfo(driverid):
    try:
        return DriverController.GetDriverInfo(driverid)
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/fetchZone/<int:driverid>', methods=['GET'])
def fetchZone(driverid):
    try:
        return DriverController.FetchZone(driverid)
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/updateDriverLatLong', methods=['POST'])
def updateDriverLatLong():
    try:
        data = request.get_json()
        return DriverController.UpdateDriverLatLong(data)
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/checkZone', methods=['POST'])
def checkZone():
    try:
        data = request.get_json()
        lat = data.get("lat")
        lng = data.get("lng")
        return DriverController.CheckZone(lat, lng)
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/fetchRequests/<int:driver_id>', methods=['GET'])
def fetchRequests(driver_id):
    try:
        return DriverController.FetchRequests(driver_id)
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

#
# @app.route("/todaysPickup", methods=["GET"])
# def todaysPickup():
#     try:
#         data = request.get_json()
#         if data:
#             return jsonify(DriverController.TodaysPickup(data))
#     except Exception as e:
#         return jsonify({
#             "message": "An unexpected error occurred.",
#             "details": str(e)
#         }), 500
#
# @app.route("/completedPickupRequest" , methods = ["GET"])
# def completedPickupRequest():
#     try:
#         data = request.get_json()
#         if data:
#             return jsonify (DriverController.CompletedPickupRequest(data))
#     except Exception as e:
#         return jsonify({
#             "message": "An unexpected error occurred.",
#             "details": str(e)
#         }), 500
#
# @app.route("/newPickupsOfZone",methods = ["GET"])
# def newPickupsOfZone():
#     try:
#         data = request.get_json()
#         return jsonify(DriverController.NewPickupsOfZone(data))
#     except Exception as e:
#         return jsonify({
#             "message": "An unexpected error occurred.",
#             "details": str(e)
#         }), 500
#
# @app.route('/updatePickupStatus', methods=['POST'])
# def updatePickupStatus():
#     try:
#         data = request.get_json()
#         result = DriverController.UpdatePickupStatus(data)
#         return result
#     except Exception as e:
#         return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500
#
# @app.route('/handlePickupRequests', methods=['POST'])
# def handlePickupRequests():
#     try:
#         data = request.get_json()
#         result = DriverController.HandlePickupRequests(data)
#         return result
#     except Exception as e:
#         return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500
#
# @app.route("/getDownloadStripDetails/<int:userId>", methods=["GET"])
# def getDownloadStripDetails(userId):
#     try:
#         return UserController.GetDownloadStripDetails(userId)  # Calling the updated function
#     except Exception as e:
#         return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500
#
#
# @app.route("/driverTodaysPickup", methods = ["GET"])
# def driverTodaysPickup():
#     try:
#         data = request.get_json()
#         return jsonify (DriverController.DriverTodaysPickup(data))
#     except Exception as e:
#         return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500
#
# @app.route("/driverTodaysPendingPickup", methods = ["POST"])
# def driverTodaysPendingPickup():
#     try:
#         data = request.get_json()
#         return jsonify(DriverController.DriverTodaysPendingPickup(data))
#     except Exception as e:
#         return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500
#
# @app.route("/driverTodaysCompletedPickup/<int:driverid>", methods=["GET"])
# def driverTodaysCompletedPickup(driverid):
#     try:
#         response, status_code = DriverController.DriverTodaysCompletedPickup(driverid)
#         return jsonify(response), status_code
#     except Exception as e:
#         return jsonify({"message": "An unexpected error occurred.", "details": str(e)}), 500

@app.route("/autoSchedulePickup", methods = ["POST"])
def autoSchedulePickup():
    data = request.get_json()
    return jsonify(DriverController.AutoSchedulePickup(data))

@app.route("/rankingUser", methods=['POST'])
def rankingUser():
    try:
        data = request.get_json()
        if not data or "barcode" not in data:
            return jsonify({"message": "Barcode is required"}), 400

        response_data, status_code = AdminController.RankingUser(data["barcode"])
        return jsonify(response_data), status_code

    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

@app.route("/getUserRank")
def getUserRank():
    try:
        return jsonify(AdminController.GetUserRank())
    except Exception as e:
        return jsonify({
            "message": "An unexpected error occurred.",
            "details": str(e)
        }), 500

############# Detection Controller ############
@app.route("/detectObjects", methods=['POST'])
def detectObjects():
    try:
        return  DetectionController.DetectObjects()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500

@app.route('/processedImages/<filename>')
def processedImage(filename):
    try:

        return send_from_directory(output_dir, filename)
    except FileNotFoundError:

        return jsonify({"error": f"File '{filename}' not found"}), 404

@app.route("/processedVideo", methods=["POST"])
def processedVideo():
    try:
        print("Processing video...")
        result = DetectionController.ProcessedVideo()
        print(f"Processed video result: {result}")  # Log the result if any
        return result
    except Exception as e:
        print(f"Error processing video: {str(e)}")  # Log the error
        return jsonify({"message": f"An error occurred: {str(e)}", "status": "error"}), 500


app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(admin_bp, url_prefix="/admin")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)

