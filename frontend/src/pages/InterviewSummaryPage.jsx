import { useContext } from "react";
import { InterviewContext } from "../context/InterviewContext";
import { Link } from "react-router-dom";

export default function InterviewSummaryPage() {

    const {
        role,
        difficulty,
        interviewType,
        scores,
        feedbacks,
        questionsAnswered,
    } = useContext(InterviewContext);
    const averageScore =
        scores.length > 0
            ? Math.round(
                scores.reduce((a, b) => a + b, 0) /
                scores.length
            )
            : 0;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Interview Summary
                </h1>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-slate-900 p-6 rounded-2xl">
                        <h2 className="text-xl font-semibold mb-4">
                            Interview Details
                        </h2>

                        <p>
                            <strong>Role:</strong> {role}
                        </p>

                        <p>
                            <strong>Difficulty:</strong> {difficulty}
                        </p>

                        <p>
                            <strong>Type:</strong> {interviewType}
                        </p>

                        <p>
                            <strong>Questions Answered:</strong>{" "}
                            {scores.length}
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl">
                        <h2 className="text-xl font-semibold mb-4">
                            Performance
                        </h2>

                        <div className="text-6xl font-bold text-cyan-400">
                            {averageScore}
                        </div>

                        <p className="text-slate-400 mt-2">
                            Average Score / 100
                        </p>
                    </div>

                </div>

                <div className="bg-slate-900 p-6 rounded-2xl mt-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Feedback Summary
                    </h2>

                    <div className="space-y-4">

                        {feedbacks.length === 0 ? (
                            <p>No feedback available.</p>
                        ) : (
                            feedbacks.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-slate-700 rounded-xl p-4"
                                >
                                    <h3 className="font-semibold text-cyan-400 mb-2">
                                        Question {index + 1}
                                    </h3>

                                    <p className="text-slate-300">
                                        {item}
                                    </p>
                                </div>
                            ))
                        )}

                    </div>

                </div>

                <div className="mt-8">

                    <Link
                        to="/interview"
                        className="px-6 py-3 rounded-xl bg-cyan-500 text-white"
                    >
                        Start New Interview
                    </Link>

                </div>

            </div>

        </div>
    );
}