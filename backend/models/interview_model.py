from pydantic import BaseModel

class InterviewRequest(BaseModel):
    answer: str
    role: str
    difficulty: str
    interview_type: str