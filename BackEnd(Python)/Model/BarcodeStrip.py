from config import db
from datetime import datetime
from sqlalchemy import Enum

class BarcodeStrip(db.Model):
    __tablename__ = 'barcodestrip'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    purchaseid = db.Column(db.Integer, db.ForeignKey("purchase.id"), nullable=False)
    type = db.Column(Enum('recyclable', 'nonrecyclable'), nullable=False)  # ✅ Store type here
    strippath = db.Column(db.Text, nullable=False, default='[]')

    purchase = db.relationship("Purchase", back_populates="barcode_strips")
    barcodes = db.relationship("Barcode", back_populates="barcode_strip")

