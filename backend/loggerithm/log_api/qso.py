from fastapi import Request, APIRouter, Query
from ..models.qso import QSO
from ..schemas.qso import QSOCreate
from ..limiter import limiter

router = APIRouter(prefix="/qso", tags=["QSOs"])

@router.post("/log")
@limiter.limit("60/minute")
async def log_qso(request: Request, data: QSOCreate):
    """
    Submits a full QSO log to the backend to be stored on the database.
    
    Sending requires authentication by logging in through the `/users` system. Unauthenticated users will be rejected from submitting a log. 
    
    When submitting a contact log, the following information is required:
    
    * Callsign of contacted individual
    * Callsign of the station operator
    * Station callsign (which will be the same as the callsign operator **if and only if** the station and operator callsign are the same, or the operator is acting under their callsign, and not under another station)
    * Timestamp of the log (which is automatically produced and sent)
    * Frequency (in kHz, ie. 14700)
    * Band of operation (ie. 20 meters or 20m)
    * Mode of operation (ie. RTTY, SSB, CW)
    * Rst sent (nullable, required in some cases)
    * Rst received  (nullable, required in some cases)
    * Radio (nullable, not required)
    * Power (nullable, not required)
    * Comments (nullable, not required)
    * Parks (nullable, not required, unless submitting a POTA log)
    * Parks from, or park-to-park contacts (nullable, not required)
    * Event (nullable, not required, automaticlly generated)
    * Event region (nullable, not required)
    * Event operators (nullable, not required)
    
    It is important to remember that QSOs are not protected from being edited by other users. 
    
    Submitted QSOs may be edited through the `/qso/update/{id}` route provided by this API, which provides an easily accessible way for users to edit logs after the fact.
    """
    
    
    qso = QSO(
        callsign=data.callsign,
        operator_callsign=data.operator_callsign,
        station_callsign=data.station_callsign,
        timestamp=data.timestamp,
        frequency=data.freq,
        band=data.band,
        mode=data.mode,
        rst_sent=data.rst_sent,
        rst_receive=data.rst_receive,
        radio=data.radio,
        power=data.power,
        comments=data.comments,
        parks=data.parks,
        parks_from=data.parks_from,
        event=data.event,
        event_region=data.region,
        event_operators=data.operators
    )
    
    return {"message": "Logged QSO!"}

@router.get("/list")
@limiter.limit("30/minute")
async def get_qsos(
        request: Request, 
        callsign: str | None = Query(None),
        operator_callsign: str | None = Query(None),
        station_callsign: str | None = Query(None),
        band: str | None = Query(None),
        mode: str | None = Query(None),
        event: str | None = Query(None),
    ):
    """
    Get the list of QSOs with an optional query parameter to index specific QSOs as necessary. 
    
    This **does not** include full detail, which should instead be referred to with `/detail/{id}` for full details of a QSO. This route only provides surface level information for searching/indexing purposes, and for scanning through quickly.
    """
    
    return {"message": "Got QSOs!"}

@router.post("/update/{id}")
@limiter.limit("20/minute")
async def update_qso(request: Request, data):
    """
    Submit parameters for an updated QSO. This will update the QSO to reflect the changed parameters. 
    
    All QSOs may be edited by any user logged into the system. Users not logged in will be rejected. 
    
    Updated QSOs work as to overwrite the current data. When a QSO is updated, the QSO's `lastupdated` field will be changed to the current timestamp of the request. This reflects the most recent change, but does not record who changed it. 
    """
    
    return {"message": "Updated QSO!"}

@router.post("/delete/{id}")
@limiter.limit("10/minute")
async def delete_qso(request: Request, data):
    """
    This endpoint is to be used very limitedly. 
    
    QSOs which are deleted will be removed from the database. This action is, subsequently, irreversible. Once a QSO is deleted it may not be restored. 
    """
    
    return {"message": "Deleted QSO!"}

@router.get("/detail/{id}")
@limiter.limit("30/minute")
async def detail_qso(request: Request, data):
    """
    Request the details of a QSO. 
    
    This returns all of the information related to a QSO, and also provides any of the nullable fields. This is to be primarily accessed by first searching up QSOs to look through, and then clicking on them to view the full information regarding the QSO.
    
    This includes all related timestamps, who submitted the QSO, and who was contacted.
    """
        
    return {"message": "Detailed QSO"}