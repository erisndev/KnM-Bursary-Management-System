import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api, { APIError } from "@/services/api";
import { storeAuthData } from "@/services/auth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message, { id: "auth-redirect" });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true); setErrors({});
    try {
      const data = await api.auth.login(form);
      storeAuthData({ token: data.token, userId: data.user?.id, applicationId: data.user?.applicationId });
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof APIError) {
        const msg = error.status === 401 ? "Invalid email or password" : error.message;
        setErrors({ api: msg }); toast.error(msg);
      } else { setErrors({ api: "An unexpected error occurred" }); toast.error("An unexpected error occurred"); }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-700 via-indigo-800 to-blue-900 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <Link to="/"><img src="./Logo.png" alt="KNP Bursary" className="h-12 w-auto mb-12 brightness-0 invert" /></Link>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
            Welcome Back to
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">KNP Bursary</span>
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed max-w-md">
            Access your dashboard to track your application status, manage documents, and stay updated on your bursary journey.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-4 right-4"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to="/"><img src="./Logo.png" alt="KNP Bursary" className="h-10 w-auto mx-auto mb-4 dark:brightness-0 dark:invert" /></Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {errors.api && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{errors.api}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input id="email" type="email" value={form.email} onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors.email ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
                    placeholder="you@example.com" disabled={loading} autoComplete="email" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input id="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors.password ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
                    placeholder="Enter your password" disabled={loading} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                <div className="flex justify-end mt-1.5">
                  <Link to="/forgot-password" className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium">Forgot password?</Link>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium">Sign up</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-6">
            <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
