from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload_routes import router as upload_router
from routes.interview_routes import router as interview_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-interview-coach-self-ten.vercel.app",
        "https://ai-interview-coach-bmdss0r2e-shweta-gund-s-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(interview_router)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}