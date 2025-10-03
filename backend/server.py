from fastapi import FastAPI, APIRouter
from fastapi.responses import Response, JSONResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import asyncio
import time
from fluid_generator import FluidDynamicsGenerator


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize fluid dynamics generator
fluid_generator = FluidDynamicsGenerator(width=1920, height=1080)


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Fluid Dynamics Endpoints
@api_router.get("/fluid-frame")
async def get_fluid_frame(t: float = None):
    """Get a single fluid dynamics frame as base64 encoded image"""
    try:
        if t is None:
            t = time.time() * 0.5  # Auto-increment based on server time
        
        # Generate frame
        frame_b64 = fluid_generator.generate_frame_base64(t, format='PNG')
        
        return JSONResponse({
            "status": "success",
            "frame": frame_b64,
            "timestamp": t
        })
    except Exception as e:
        logger.error(f"Error generating fluid frame: {e}")
        return JSONResponse({
            "status": "error", 
            "message": str(e)
        }, status_code=500)

@api_router.get("/fluid-stream")
async def get_fluid_stream():
    """Get fluid dynamics parameters for real-time streaming"""
    try:
        current_time = time.time() * 0.3
        frame_b64 = fluid_generator.generate_frame_base64(current_time, format='JPEG')
        
        return JSONResponse({
            "status": "success",
            "frame": frame_b64,
            "timestamp": current_time,
            "next_frame_delay": 100  # milliseconds
        })
    except Exception as e:
        logger.error(f"Error in fluid stream: {e}")
        return JSONResponse({
            "status": "error",
            "message": str(e)
        }, status_code=500)

@api_router.get("/fluid-config")
async def get_fluid_config():
    """Get fluid dynamics configuration"""
    return JSONResponse({
        "width": fluid_generator.width,
        "height": fluid_generator.height,
        "device": str(fluid_generator.device),
        "animation_speed": 0.3,
        "color_scheme": "ai_theme"
    })

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
