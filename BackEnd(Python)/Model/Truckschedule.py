from config import db

class TruckSchedule(db.Model):
    __tablename__ = "truckschedule"  # Consistent naming

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    truckid = db.Column(db.Integer, db.ForeignKey("truck.id"), nullable=False, index=True)  # Ensure lowercase 'truck'
    scheduleid = db.Column(db.Integer, db.ForeignKey("slot.id"), nullable=False, index=True)  # Ensure lowercase 'slot'
    sequencenumber = db.Column(db.Integer, nullable=False)
    pickuprequestid = db.Column(db.Integer, db.ForeignKey("pickuprequest.id"), nullable=False, index=True)  # Ensure lowercase

    # Relationships
    truck = db.relationship("Truck", backref="truckschedules")
    schedule = db.relationship("Slot", backref="truckschedules")  # Ensure this matches the Slot model
    pickuprequest = db.relationship("PickupRequests", backref="truckschedules")
