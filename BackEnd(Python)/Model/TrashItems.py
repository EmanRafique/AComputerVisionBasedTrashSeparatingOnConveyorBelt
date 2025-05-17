from config import db
from sqlalchemy import func

class TrashItems(db.Model):
    __tablename__ = "trashitems"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    categoryid = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False, index=True)
    weight = db.Column(db.Float, nullable=False)
    detectiondate = db.Column(db.DateTime, nullable=False, server_default=func.now())
    barcodeid = db.Column(db.Integer,db.ForeignKey("barcode.id"), nullable=True, index=True)

    detection_category = db.relationship('Category', backref='detections')

