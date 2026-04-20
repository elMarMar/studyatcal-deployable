"use client"
import { useState } from "react";
import { useAuth } from "../api/auth/AuthContext";
import { useRouter } from 'next/navigation';

function LoginForm() {
const { login, loginWithGoogle } = useAuth();
const router = useRouter();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateCreds = (field: any) => (e: any) =>
    setCreds({ ...creds, [field]: e.target.value });

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await login(creds.email, creds.password);
      setSuccess("Signup successful! You can now log in.");
    } catch (err: any) {
      setError(err?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-[#FFFDEE] rounded-xl border border-[#123175] border-2 w-full max-w-md px-11 py-12 shadow-2xl">
        <button className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-blue-900/10 hover:text-blue-900 transition-colors"
          onClick={() => router.push("/")}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h1 className="text-center text-[28px] font-nunito text-[#123175] font-bold mb-2">
          Welcome back!
        </h1>
        <p className="text-center text-md font-hind-guntur text-slate-400 mb-8">
          Log in to get started
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-[11px] font-medium uppercase tracking-widest text-[#123175] mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="you@berkeley.edu"
            onChange={updateCreds("email")}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-[11px] font-medium uppercase tracking-widest text-[#123175] mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            onChange={updateCreds("password")}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
            disabled={loading}
          />
        </div>

        <button
          className="w-full p-2.5 bg-[#EF9F27] hover:bg-[#F1AD46] font-hind-guntur text-white text-md font-bold rounded-xl transition"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Loging in..." : "Login"}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button
          className="w-full py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-white bg-amber-50 text-slate-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2.5 transition"
          onClick={loginWithGoogle}
          disabled={loading}
        >
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Log in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;