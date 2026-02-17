from fastapi import APIRouter, status, HTTPException
from model import StartupApplication
from database import profile_collection

router = APIRouter()

# --- STARTUP PROFILE ROUTES ---

@router.post("/startup")
def submit_startup(startup: StartupApplication):
    # Check if email already exists to prevent duplicates
    if profile_collection.find_one({"email": startup.email}):
        raise HTTPException(
            status_code=400, 
            detail="Application with this email already exists."
        )

    data = startup.model_dump()
    result = profile_collection.insert_one(data)

    return {
        "message": "Startup application submitted successfully",
        "id": str(result.inserted_id)
    }


@router.get("/startup/by-email/{email}")
def get_startup_by_email(email: str):
    startup = profile_collection.find_one({"email": email})

    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")

    startup["_id"] = str(startup["_id"])
    return startup


@router.put("/startup")
def update_startup(data: StartupApplication):
    # Exclude unset fields prevents wiping data if the frontend misses a field
    update_data = data.model_dump(exclude_unset=True)

    result = profile_collection.update_one(
        {"email": data.email},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Startup not found")

    return {"message": "Startup updated successfully"}


@router.delete("/startup/{email}")
def delete_startup(email: str):
    result = profile_collection.delete_one({"email": email})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Startup not found")

    return {"message": "Startup deleted successfully"}