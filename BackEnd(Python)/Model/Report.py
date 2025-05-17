from config import db
from sqlalchemy import func

class Report(db.Model):
    __tablename__ = "dailyreport"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_data = db.Column(db.String(30),db.ForeignKey("category.id"), nullable=False, index=True)
    report_date = db.Column(db.DateTime,nullable=False, server_default=func.now())
    total_trash = db.Column(db.Float, nullable = False)
    zone_batch = db.Column(db.String(255), nullable=False)

    type = db.relationship("Category", back_populates="category_report")
