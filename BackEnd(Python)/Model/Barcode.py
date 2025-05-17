from config import db
from sqlalchemy import Enum
from datetime import datetime  # ✅ Import datetime for timestamp

class Barcode(db.Model):
    __tablename__ = 'barcode'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    barcode = db.Column(db.String(50), nullable=False, unique=True)
    stripid = db.Column(db.Integer, db.ForeignKey("barcodestrip.id"), index=True, nullable=False)
    isvalid = db.Column(Enum('valid', 'invalid'), nullable=False, server_default='valid')
    type = db.Column(Enum('recyclable', 'nonrecyclable'), nullable=False)
    imagepath = db.Column(db.String(255), default="")
    Is_Scannable = db.Column(db.Integer, default=0, nullable=False)

    # ✅ New column to store scan time (nullable by default)
    scanned_at = db.Column(db.DateTime, nullable=True)

    barcode_strip = db.relationship("BarcodeStrip", back_populates="barcodes")

