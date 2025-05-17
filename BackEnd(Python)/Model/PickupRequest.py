from config import db
from sqlalchemy import Enum, func

class PickupRequests(db.Model):
    __tablename__ = "pickuprequest"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    address = db.Column(db.String(255), nullable=False)
    phonenumber = db.Column(db.String(11), nullable=False)
    pickupday = db.Column(Enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'), nullable=False)
    status = db.Column(Enum("pending", "next", "completed", name="pickupstatus"), nullable=False, server_default="pending")
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    completed_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    userid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)

    user = db.relationship("User", backref="pickup_requests")
