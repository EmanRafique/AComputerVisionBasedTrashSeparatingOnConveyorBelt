from config import db
from sqlalchemy import func, Enum, TIMESTAMP, Column

class TruckAssignment(db.Model):
    __tablename__ = "truckassignment"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    truckid = db.Column(db.Integer, db.ForeignKey("truck.id"), nullable=False, index=True)
    zoneid = db.Column(db.Integer, db.ForeignKey("zone.id"), nullable=False, index=True)
    collectorid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)
    driverid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)
    assignmentdate = db.Column(db.Date, nullable=False, server_default=func.current_date())
    status = db.Column(Enum('active', 'inactive', name='assignment_status'), nullable=False, server_default='active')
    expiration_date = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.current_timestamp(),
        server_onupdate=func.current_timestamp()
    )

    collector = db.relationship("User", foreign_keys=[collectorid], backref="collector_assignments")
    driver = db.relationship("User", foreign_keys=[driverid], backref="driver_assignments")
    zone = db.relationship("Zone", backref="truck_assignments")
    truck = db.relationship(
        "Truck",
        backref="assignments",
        overlaps="truck_assignments,assigned_truck"
    )