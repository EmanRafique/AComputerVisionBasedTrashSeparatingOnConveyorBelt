from sqlalchemy import func, DateTime
from sqlalchemy.orm import relationship
from config import db

class Purchase(db.Model):
    __tablename__ = 'purchase'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userid = db.Column(db.Integer, db.ForeignKey("user.id"), index=True, nullable=False)
    totalcost = db.Column(db.Float, nullable=False)
    purchasedate = db.Column(DateTime, nullable=False, default=func.now())
    zoneid = db.Column(db.Integer, db.ForeignKey("zone.id"), index=True, nullable=False)

    user = db.relationship("User", back_populates="purchases")
    zone = db.relationship("Zone", back_populates="purchases")
    barcode_strips = db.relationship("BarcodeStrip", back_populates="purchase")
