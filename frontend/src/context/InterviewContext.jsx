import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [role, setRole] = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Senior");
  const [interviewType, setInterviewType] = useState("Technical");

  const [scores, setScores] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  return (
    <InterviewContext.Provider
      value={{
        role,
        setRole,

        difficulty,
        setDifficulty,

        interviewType,
        setInterviewType,

        scores,
        setScores,

        feedbacks,
        setFeedbacks,

        questionsAnswered,
        setQuestionsAnswered,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};