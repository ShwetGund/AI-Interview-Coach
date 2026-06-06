from fastapi import APIRouter
from models.interview_model import InterviewRequest
from services.gemini_service import evaluate_interview_answer

router = APIRouter()

@router.post("/interview/chat")
@router.post("/interview/start")
def interview_chat(data: InterviewRequest):

    result = evaluate_interview_answer(
        data.answer,
        data.role,
        data.difficulty,
        data.interview_type
    )

    return {
        "response": result
    }