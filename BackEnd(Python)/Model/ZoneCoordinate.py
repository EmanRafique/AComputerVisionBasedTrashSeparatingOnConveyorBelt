from config import db
from sqlalchemy.orm import relationship

class ZoneCoordinate(db.Model):
    __tablename__ = 'zonecoordinate'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    zoneid = db.Column(db.Integer, db.ForeignKey('zone.id', ondelete="CASCADE"), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    sequence = db.Column(db.Integer, nullable=False)

    zone = relationship("Zone", back_populates="coordinates")  # ✅ Add relationship for bidirectional access

    def __repr__(self):
        return f"<ZoneCoordinate {self.zoneid} - {self.sequence}>"
