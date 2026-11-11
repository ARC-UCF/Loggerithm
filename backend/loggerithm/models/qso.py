from __future__ import annotations
from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from . import Base
from .assosciations import qso_parks, qso_parks_from
from .parks import Park

class QSO(Base):
    """
    Basic QSO model for structuring data and data requirements. Refer to QSO schema in order to look for data validation as it relates to verifying information for inputs.
    
    This includes all information which the QSO data model will have, such as the id for the contact, the callsign contacted, the operator, and the station used, among other such information. 
    
    Use the assosciated database access functions and features to retreive data from the database.
    """
    
    __tablename__ = "qsos"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    callsign: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )
    
    operator_callsign: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )
    
    station_callsign: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )
    
    timestamp: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )
    
    frequency: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )
    
    band: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )
    
    mode: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )
    
    rst_sent: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True
    )
    
    rst_receive: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True
    )
    
    radio: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )
    
    power: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )
    
    comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )
    
    parks: Mapped[list[Park]] = relationship(
        secondary=qso_parks
    )
    
    parks_from: Mapped[list[Park]] = relationship(
        secondary=qso_parks_from
    )
    
    event: Mapped[str] = mapped_column(String(50), nullable=False)
    event_region: Mapped[str | None] = mapped_column(String(10), nullable=True)
    event_operators: Mapped[str | None] = mapped_column(String(10), nullable=True)
    