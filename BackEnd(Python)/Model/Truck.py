from config import db
from sqlalchemy import func, Enum


class Truck(db.Model):
    __tablename__ = "truck"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    licensenumber = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    chassisnumber = db.Column(db.String(50), nullable=False)
    status = db.Column(Enum('active', 'inactive', name='truck_status'), nullable=False, server_default='active')

    truck_assignments = db.relationship(
        "TruckAssignment",
        backref="assigned_truck",
        cascade="all, delete-orphan",
        overlaps="assignments,truck"
    )