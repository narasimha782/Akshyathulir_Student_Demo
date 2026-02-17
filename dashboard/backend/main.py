from fastapi import FastAPI
from routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# define allowed origins
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # <--- ADD THIS (Vite's default port)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes with the /api prefix
app.include_router(router, prefix="/api", tags=["Project API"])

# Fixes the "GET / 404 Not Found" error
@app.get("/")
def home():
    return {"message": "Server is running correctly!"}