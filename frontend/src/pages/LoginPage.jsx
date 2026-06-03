import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login Successful!");

            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020c2b]">
          <div className="w-full max-w-lg bg-[#071738] border border-slate-700 rounded-3xl p-10">

            <h1 className="text-5xl font-bold text-white text-center mb-4">
              Welcome Back
            </h1>

            <p className="text-slate-400 text-center mb-8">
              Login to continue your AI Interview journey
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white outline-none"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white outline-none"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-6 text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-400"
              >
                Signup
              </Link>
            </p>

          </div>
        </div>



    );
}