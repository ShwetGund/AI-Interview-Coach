from services.gemini_service import analyze_resume
from fastapi import APIRouter, UploadFile, File, Form
import fitz


router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):

    pdf_bytes = await file.read()

    pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")

    extracted_text = ""

    for page in pdf_document:
        extracted_text += page.get_text()

    # AI ANALYSIS
    ai_feedback = analyze_resume(
    extracted_text,
    job_description
)

    return {
        "message": "Resume analyzed successfully",
        "filename": file.filename,
        "analysis": ai_feedback
    }