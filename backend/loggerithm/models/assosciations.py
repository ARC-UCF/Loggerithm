from sqlalchemy import Column, ForeignKey, Table

from . import Base

qso_parks = Table(
    "qso_parks",
    Base.metadata,
    Column(
        "qso_id",
        ForeignKey("qsos.id"),
        primary_key=True
    ),
    Column(
        "park_id",
        ForeignKey("parks.id"),
        primary_key=True
    ),
)

qso_parks_from = Table(
    "qso_parks_from",
    Base.metadata,
    Column(
        "qso.id",
        ForeignKey("qsos.id"),
        primary_key=True
    ),
    Column(
        "park.id",
        ForeignKey("parks.id"),
        primary_key=True
    )
)