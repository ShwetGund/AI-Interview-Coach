import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Load Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(resume_text, job_description):

    if not job_description:
        job_description = "No job description provided."

    prompt = f"""
You are an Expert ATS Resume Analyzer and Technical Interview Coach.

Analyze the resume against the job description.

Return the response EXACTLY in the following format:

ATS Score:
<score>

Strengths:
- point 1
- point 2
- point 3

Weaknesses:
- point 1
- point 2
- point 3

Missing Skills:
- skill 1
- skill 2
- skill 3

Improvement Suggestions:
- suggestion 1
- suggestion 2
- suggestion 3

Technical Skills Found:
- skill 1
- skill 2
- skill 3

Final Summary:
<summary>

Resume:
{resume_text}

Job Description:
{job_description}
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return f"ERROR: {str(e)}"
    
def evaluate_interview_answer(
    answer,
    role,
    difficulty,
    interview_type
):

    prompt = f"""
You are a Senior AI Interviewer.

Role: {role}
Difficulty: {difficulty}
Interview Type: {interview_type}

Candidate Answer:
{answer}

Evaluate the answer and return EXACTLY in this format:

Score:
<number out of 100>

Feedback:
<detailed feedback>

Next Question:
<next interview question>

Rules:
- Score honestly.
- If answer is nonsense, random text, or irrelevant, give a low score.
- Ask only ONE next question.
- Keep feedback professional.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return f"ERROR: {str(e)}"