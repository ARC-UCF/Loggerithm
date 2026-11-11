from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, Field

class QSOCreate(BaseModel):
    """
    Database schema for verifying incoming information to ensure it matches the model for our backend. 
    
    This is our information verification point, and will verify incoming information where we point it to ensure the information is acceptable before passing it into the Loggerithm database and backend. Should this otherwise not occur, we can error and specify we encountered an issue with the incoming data.
    """
    
    
    callsign: str = Field(min_length=3, max_length=20)
    operator_callsign: str = Field(min_length=3, max_length=20)
    station_callsign: str = Field(min_length=3, max_length=20)
    
    timestamp: datetime
    
    freq: float = Field(gt=0)
    band: str = Field(min_length=1, max_length=10)
    mode: str = Field(min_length=1, max_length=10)
    
    rst_sent: str = Field(min_length=1, max_length=10)
    rst_receive: str = Field(min_length=1, max_length=10)
    
    radio: str | None = Field(default=None, max_length=100)
    power: float | None = Field(default=None, gt=0)
    comments: str | None = None
    
    parks: list[str] = Field(default_factory=list)
    parks_from: list[str] = Field(default_factory=list)
    
    event: str = Field(min_length=1, max_length=50)
    region: str | None = None
    operators: str | None = None
    