from config import db

class UserZone(db.Model):
    __tablename__ = "userzone"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    zoneid = db.Column(db.Integer, db.ForeignKey("zone.id"), nullable=False)

    user = db.relationship("User", back_populates="user_zones")
    zone = db.relationship("Zone", back_populates="user_zones")