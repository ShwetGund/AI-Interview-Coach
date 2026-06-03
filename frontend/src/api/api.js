//const API_BASE_URL = "http://127.0.0.1:8000";

const API_BASE_URL = "https://ai-interview-coach-049x.onrender.com";

export const uploadResume = async (formData) => {

  const response = await fetch(
    `${API_BASE_URL}/upload-resume`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload resume");
  }

  return response.json();
};