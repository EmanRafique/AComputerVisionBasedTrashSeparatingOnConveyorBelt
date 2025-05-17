from config import db
from sqlalchemy.orm import relationship

class Zone(db.Model):
    __tablename__ = "zone"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_point = db.Column(db.String(255), nullable=False)
    end_point = db.Column(db.String(255), nullable=False)

    user_zones = db.relationship("UserZone", back_populates="zone")
    purchases = db.relationship("Purchase", back_populates="zone")
    coordinates = db.relationship("ZoneCoordinate", back_populates="zone", cascade="all, delete-orphan")  # ✅ Added relationship
