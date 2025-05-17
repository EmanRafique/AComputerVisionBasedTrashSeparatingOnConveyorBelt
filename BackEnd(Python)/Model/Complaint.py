from config import db
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey, func
from sqlalchemy.orm import relationship

class Complaint(db.Model):
    __tablename__ = 'complaint'

    id = Column(Integer, primary_key=True, autoincrement=True)
    UserId = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    ComplaintDescription = Column(Text, nullable=False)
    TicketNumber = Column(String(50), nullable=False, unique=True)
    ComplaintDate = Column(DateTime, server_default=func.now(), nullable=False)
    ResolutionDate = Column(DateTime, nullable=True)
    AdminResponse = Column(Text, nullable=True)
    Status = Column(Enum('review', 'closed'), server_default='review', nullable=True)
    # zoneid = Column(Integer, ForeignKey("zone.id", ondelete="CASCADE"), nullable=False)

    user = relationship('User', back_populates='complaints')
    # zone = relationship('Zone', back_populates='complaints')

