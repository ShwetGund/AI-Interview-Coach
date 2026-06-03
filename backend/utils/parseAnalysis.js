export const parseAnalysis = (text) => {

  if (!text) return {};

  return {
    score:
      text.match(/ATS Match Percentage:\s*(.*)/)?.[1] || "N/A",

    strengths:
      text.match(/Resume Strengths:([\s\S]*?)Resume Weaknesses:/)?.[1]
        ?.trim()
        ?.split("\n")
        ?.filter(Boolean) || [],

    weaknesses:
      text.match(/Resume Weaknesses:([\s\S]*?)Improvement Suggestions:/)?.[1]
        ?.trim()
        ?.split("\n")
        ?.filter(Boolean) || [],

    suggestions:
      text.match(/Improvement Suggestions:([\s\S]*?)Final Hiring Chances:/)?.[1]
        ?.trim()
        ?.split("\n")
        ?.filter(Boolean) || [],
  };
};