from fastapi import Request, APIRouter
from ..limiter import limiter

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/{id}", description="Fetch the details of a specified user. User ids are not unique and are session limited. If the server restarts, the user ids will also be reset.")
@limiter.limit("60/minute")
async def get_user(request: Request, data):
    return {"message": "Fetched user!"}

@router.get("/me", description="Returns the details of the currently logged in user and the connected session. This includes id and name of the user logged in.")
@limiter.limit("40/minute")
async def get_me(request: Request):
    return {"message": "Got you!"}

@router.get("/operator/me", description="Identical to the `/me` route, this fetches the operator state for the user and displays it.")
@limiter.limit("40/minute")
async def get_operator_me(request: Request):
    return {"message": "Got your operator state!"}

@router.post("/end", description="End the current client-sided session for the user logged in.")
@limiter.limit("5/minute")
async def end_session(request: Request):
    return {"message": "Ended session"}

@router.post("/login", description="Login and begin your latest session to start logging contacts into the system.")
@limiter.limit("5/minute")
async def login(request: Request, data):
    return {"message": "Logged in"}

@router.post("/operator/update", description="Update the client's operator configuration to be displayed to the rest of the clients using the software.")
@limiter.limit("40/minute")
async def update_operator(request: Request, data):
    return {"message": "Updated operator"}

@router.get("/operators", description="Fetch the list of current operators in the session. This will return each operator and their current state.")
@limiter.limit("30/minute")
async def get_operators(request: Request):
    return {"message": "Fetched operators"}