import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {

  const [technicalQuestions, setTechnicalQuestions] = useState([]);

  const [hrQuestions, setHrQuestions] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        technicalQuestions,
        setTechnicalQuestions,
        hrQuestions,
        setHrQuestions,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};