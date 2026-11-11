from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from . import Base

class Park(Base):
    __tablename__ = "parks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    
    parkid: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        unique=True
    )