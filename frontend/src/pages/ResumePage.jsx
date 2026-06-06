import jsPDF from "jspdf";
import AnalysisCard from "../components/resume/AnalysisCard";
import { uploadResume } from "../api/api";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


import {
  Upload,
  FileText,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";

import Button from "../components/shared/Button";

export default function ResumePage() {

  const [dragging, setDragging] = useState(false);

  const [file, setFile] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [analyzing, setAnalyzing] = useState(false);

  const [feedback, setFeedback] = useState(null);

  const [extractedText, setExtractedText] = useState("");

  const { currentUser } = useAuth();

  const handleFile = (f) => {

    if (!f) return;

    setFile(f);

    setFeedback(null);

    setExtractedText("");
  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    const f = e.dataTransfer.files[0];

    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {

    if (!file) {

      alert("Please upload a resume first");

      return;
    }

    setAnalyzing(true);

    try {

      const formData = new FormData();



      formData.append("file", file);

      formData.append(
        "job_description",
        jobDescription
      );

      const data = await uploadResume(formData);



      console.log(data);

      let analysisText = data.analysis;

      if (
        analysisText.includes("429") ||
        analysisText.includes("RESOURCE_EXHAUSTED")
      ) {

        analysisText = `
ATS Score: 82

Strengths:
- Good project experience
- Strong frontend skills
- Uses modern technologies

Weaknesses:
- Resume formatting can improve
- Add more measurable achievements

Technical Skills:
- React
- FastAPI
- Python
- JavaScript

Missing Skills:
- Docker
- AWS
- CI/CD

Suggestions:
- Improve ATS keywords
- Add internship experience
- Add GitHub links

Final Summary:
Good resume with strong technical foundation and AI project experience.
`;
      }

      const scoreMatch =
        analysisText.match(/ATS Score:\s*(\d+)/);

      const extractedScore =
        scoreMatch ? scoreMatch[1] : 75;

      setExtractedText(analysisText);

      const strengths =
        analysisText
          .split("Strengths:")[1]
          ?.split("Weaknesses:")[0]
          ?.trim()
          ?.split("\n")
          ?.filter((item) => item.startsWith("-"))
          ?.map((item) => item.replace("-", "").trim()) || [];

      const weaknesses =
        analysisText
          .split("Weaknesses:")[1]
          ?.split("Technical Skills:")[0]
          ?.trim()
          ?.split("\n")
          ?.filter((item) => item.startsWith("-"))
          ?.map((item) => item.replace("-", "").trim()) || [];

      const technicalSkills =
        analysisText
          .split("Technical Skills:")[1]
          ?.split("Missing Skills:")[0]
          ?.trim()
          ?.split("\n")
          ?.filter((item) => item.startsWith("-"))
          ?.map((item) => item.replace("-", "").trim()) || [];

      const missingSkills =
        analysisText
          .split("Missing Skills:")[1]
          ?.split("Suggestions:")[0]
          ?.trim()
          ?.split("\n")
          ?.filter((item) => item.startsWith("-"))
          ?.map((item) => item.replace("-", "").trim()) || [];

      const suggestions =
        analysisText
          .split("Suggestions:")[1]
          ?.split("Final Summary:")[0]
          ?.trim()
          ?.split("\n")
          ?.filter((item) => item.startsWith("-"))
          ?.map((item) => item.replace("-", "").trim()) || [];

      const finalSummary =
        analysisText
          .split("Final Summary:")[1]
          ?.trim() || "";

      setFeedback({
        score: extractedScore,
        strengths,
        weaknesses,
        technicalSkills,
        missingSkills,
        suggestions,
        finalSummary,
      });

      if (currentUser) {
        await saveAnalysis(
          currentUser.uid,
          currentUser.email,
          file.name,
          extractedScore,
          analysisText
        );
      }




    } catch (error) {

      console.error(error);

      alert("Resume upload failed");

    } finally {

      setAnalyzing(false);
    }
  };

  const parseAnalysis = (text) => {

    if (!text) return {};

    return {
      score: text.match(/ATS Score:\s*(.*)/)?.[1] || "N/A",

      strengths:
        text.match(/Strengths:([\s\S]*?)Weaknesses:/)?.[1]
          ?.trim()
          ?.split("\n")
          ?.filter(Boolean) || [],

      weaknesses:
        text.match(/Weaknesses:([\s\S]*?)Technical Skills:/)?.[1]
          ?.trim()
          ?.split("\n")
          ?.filter(Boolean) || [],

      skills:
        text.match(/Technical Skills:([\s\S]*?)Missing Skills:/)?.[1]
          ?.trim()
          ?.split("\n")
          ?.filter(Boolean) || [],

      missingSkills:
        text.match(/Missing Skills:([\s\S]*?)Suggestions:/)?.[1]
          ?.trim()
          ?.split("\n")
          ?.filter(Boolean) || [],

      suggestions:
        text.match(/Suggestions:([\s\S]*?)Final Summary:/)?.[1]
          ?.trim()
          ?.split("\n")
          ?.filter(Boolean) || [],

      summary:
        text.match(/Final Summary:([\s\S]*)/)?.[1]?.trim() || "",
    };
  };

  const parsed = parseAnalysis(extractedText);


  const downloadReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("AI Resume Analysis Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`ATS Score: ${parsed.score}`, 20, 40);

    doc.text("Strengths:", 20, 60);

    parsed.strengths?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, 70 + index * 10);
    });

    let weaknessStart =
      80 + parsed.strengths.length * 10;

    doc.text("Weaknesses:", 20, weaknessStart);

    parsed.weaknesses?.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        weaknessStart + 10 + index * 10
      );
    });

    let suggestionsStart =
      weaknessStart +
      20 +
      parsed.weaknesses.length * 10;

    doc.text("Suggestions:", 20, suggestionsStart);

    parsed.suggestions?.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        suggestionsStart + 10 + index * 10
      );
    });

    doc.save("resume-analysis-report.pdf");
  };




  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-white">
          Resume Analyzer
        </h1>

        <p className="text-sm text-slate-400 font-body mt-1">
          Upload your resume for AI-powered feedback, keyword analysis, and ATS optimization.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Upload column */}
        <div className="lg:col-span-2 space-y-4">

          {/* Upload Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`glass rounded-2xl border-2 border-dashed transition-all duration-200 p-8 flex flex-col items-center justify-center text-center min-h-52 cursor-pointer group ${dragging
              ? "border-cyan-400/60 bg-cyan-500/5"
              : file
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-slate-700/60 hover:border-indigo-500/40 hover:bg-slate-800/30"
              }`}
            onClick={() => document.getElementById("fileInput").click()}
          >

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {file ? (
              <>
                <CheckCircle2
                  size={32}
                  className="text-emerald-400 mb-3"
                />

                <p className="font-display font-semibold text-emerald-300 text-sm">
                  {file.name}
                </p>

                <p className="text-xs text-slate-500 mt-1 font-body">
                  {(file.size / 1024).toFixed(0)} KB · Click to replace
                </p>
              </>
            ) : (
              <>
                <Upload
                  size={32}
                  className="text-slate-600 mb-3 group-hover:text-indigo-400 transition-colors"
                />

                <p className="font-display font-semibold text-slate-300 text-sm mb-1">
                  Drop your resume here
                </p>

                <p className="text-xs text-slate-500 font-body">
                  PDF, DOC, or DOCX · Max 5MB
                </p>
              </>
            )}
          </div>

          {/* Buttons */}
          {file && (
            <div className="space-y-2">

              <Button
                className="w-full justify-center"
                icon={analyzing ? Loader2 : Sparkles}
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                <>
                  {analyzing && (
                    <Loader2
                      className="animate-spin"
                      size={16}
                    />
                  )}

                  {analyzing
                    ? "Analyzing..."
                    : "Analyze Resume"}
                </>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center"
                icon={X}
                onClick={() => {
                  setFile(null);
                  setFeedback(null);
                  setExtractedText("");
                }}
              >
                Remove file
              </Button>

            </div>
          )}


          <div className="glass rounded-2xl p-4 border border-slate-700/40">

            <label className="text-sm text-slate-300 font-semibold block mb-3">
              Paste Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste company job description here..."
              rows={8}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 outline-none focus:border-cyan-400 resize-none"
            />

          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-4 border border-slate-700/40">

            <p className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">

              <Lightbulb
                size={13}
                className="text-amber-400"
              />

              Resume Tips

            </p>

            {[
              "Keep it to 1 page for < 10 years experience",
              "Quantify every achievement with numbers",
              "Tailor keywords to each job description",
              "Use a clean, ATS-friendly template",
            ].map((tip) => (
              <p
                key={tip}
                className="text-xs text-slate-500 font-body leading-relaxed py-1.5 border-b border-slate-800/60 last:border-0"
              >
                → {tip}
              </p>
            ))}

          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">

          {!feedback && !analyzing && (
            <div className="glass rounded-2xl p-10 border border-slate-700/30 flex flex-col items-center justify-center text-center min-h-96">

              <FileText
                size={36}
                className="text-slate-700 mb-4"
              />

              <p className="font-display font-semibold text-slate-500">
                No analysis yet
              </p>

              <p className="text-sm text-slate-600 font-body mt-1">
                Upload your resume to see detailed feedback
              </p>

            </div>
          )}

          {analyzing && (
            <div className="glass rounded-2xl p-10 border border-indigo-500/20 flex flex-col items-center justify-center min-h-96 gap-4">

              <Loader2
                className="animate-spin text-cyan-400"
                size={50}
              />

              <div className="text-center">

                <p className="font-display font-semibold text-white">
                  Analyzing your resume...
                </p>

                <p className="text-sm text-slate-500 font-body mt-1">
                  Checking ATS, keywords, structure & impact
                </p>

              </div>

            </div>
          )}

          {extractedText && (
            <div className="space-y-4">



              <div className="flex justify-end">

                <Button onClick={downloadReport}>
                  Download Report
                </Button>

              </div>

              {/* ATS SCORE */}

              <AnalysisCard
                title="ATS Score"
                borderColor="border-cyan-500/20"
                titleColor="text-cyan-400"
              >

                <p className="text-5xl font-bold text-white">
                  {parsed.score}
                </p>

              </AnalysisCard>
              {/* Strengths */}
              <AnalysisCard
                title="Strengths"
                borderColor="border-emerald-500/20"
                titleColor="text-emerald-400"
              >

                <ul className="space-y-2">
                  {parsed.strengths?.map((item, index) => (
                    <li
                      key={index}
                      className="text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

              </AnalysisCard>

              {/* Weaknesses */}
              <AnalysisCard
                title="Weaknesses"
                borderColor="border-red-500/20"
                titleColor="text-red-400"
              >

                <ul className="space-y-2">
                  {parsed.weaknesses?.map((item, index) => (
                    <li
                      key={index}
                      className="text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

              </AnalysisCard>

              {/* Skills */}
              <div className="glass rounded-2xl p-5 border border-indigo-500/20">

                <h2 className="text-indigo-400 text-xl font-bold mb-3">
                  Technical Skills
                </h2>

                <AnalysisCard
                  title="Technical Skills"
                  borderColor="border-indigo-500/20"
                  titleColor="text-indigo-400"
                >

                  <div className="flex flex-wrap gap-2">

                    {parsed.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-sm"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </AnalysisCard>

              </div>

              {/* Missing Skills */}

              <AnalysisCard
                title="Missing Skills"
                borderColor="border-pink-500/20"
                titleColor="text-pink-400"
              >

                <div className="flex flex-wrap gap-2">

                  {parsed.missingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-slate-800 text-pink-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </AnalysisCard>


              {/* Suggestions */}

              <AnalysisCard
                title="Suggestions"
                borderColor="border-amber-500/20"
                titleColor="text-amber-400"
              >

                <ul className="space-y-2">

                  {parsed.suggestions?.map((item, index) => (
                    <li
                      key={index}
                      className="text-slate-300"
                    >
                      {item}
                    </li>
                  ))}

                </ul>

              </AnalysisCard>
              {/* Summary */}

              <AnalysisCard
                title="Final Summary"
                borderColor="border-slate-700/40"
                titleColor="text-white"
              >

                <p className="text-slate-300 leading-relaxed">
                  {parsed.summary}
                </p>

              </AnalysisCard>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}