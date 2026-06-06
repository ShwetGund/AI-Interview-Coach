from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import model

router = APIRouter()


class InterviewStartRequest(BaseModel):
    role: str
    difficulty: str
    interview_type: str


@router.post("/interview/start")
async def start_interview(data: InterviewStartRequest):

    prompt = f"""
You are an expert interviewer.

Role: {data.role}
Difficulty: {data.difficulty}
Interview Type: {data.interview_type}

Generate ONLY the first interview question.

Rules:
- Return only one interview question.
- Do not return score.
- Do not return feedback.
- Do not return explanation.
- Do not return greetings.
"""

    try:
        response = model.generate_content(prompt)

        return {
            "question": response.text.strip()
        }

    except Exception as e:
        return {
            "question": f"Error generating question: {str(e)}"
        }