from config import db
from sqlalchemy import Enum
from sqlalchemy.orm import relationship
from Model.Purchase import Purchase
from Model.UserZone import UserZone

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, index=True)
    password = db.Column(db.String(100), nullable=False)
    phonenumber = db.Column(db.String(11), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    role = db.Column(Enum('user', 'driver', 'operator', 'collector', 'admin', name='user_roles'), nullable=True)
    status = db.Column(Enum('active', 'inactive', name='user_status'), nullable=False, server_default='active')
    rank = db.Column(db.Float, nullable=True)
    profile = db.Column(db.Text, nullable=True)


    # Move the import inside the model
    purchases = relationship("Purchase", back_populates="user", cascade="all, delete-orphan")
    user_zones = db.relationship("UserZone", back_populates="user")
    complaints = db.relationship("Complaint", back_populates="user")
