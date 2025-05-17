from config import db
from sqlalchemy import Enum, Time

class Slot(db.Model):
    __tablename__ = "slot"  # Use lowercase for consistency

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dayofweek = db.Column(Enum("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), nullable=False)
    starttime = db.Column(Time, nullable=False)
    endtime = db.Column(Time, nullable=False)