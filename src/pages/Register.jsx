import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { APIError } from "@/services/api";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Register = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isStrongPassword = (p) => p.length >= 8 && p.length <= 128 && /(?=.*[a-z])/.test(p) && /(?=.*[A-Z])/.test(p) && /(?=.*\d)/.test(p) && /(?=.*[@$!%*?&])/.test(p);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    else if (form.firstName.length < 2) e.firstName = "At least 2 characters";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    else if (form.lastName.length < 2) e.lastName = "At least 2 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (!isStrongPassword(form.password)) e.password = "8+ chars with upper, lower, number & special char";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    return e;
  };

  const handleChange = (e) => { const { id, value } = e.target; setForm({ ...form, [id]: value }); setErrors({ ...errors, [id]: undefined }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(); setErrors(v);
    if (Object.keys(v).length === 0) {
      setLoading(true);
      try {
        await api.auth.register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
        toast.success("Account created! Please sign in."); navigate("/login");
      } catch (error) {
        if (error instanceof APIError) { const msg = error.status === 409 ? "Email already exists" : error.message; setErrors({ api: msg }); toast.error(msg); }
        else { setErrors({ api: "An unexpected error occurred" }); toast.error("An unexpected error occurred"); }
      } finally { setLoading(false); }
    }
  };

  const passwordChecks = [
    { label: "8+ chars", met: form.password.length >= 8 },
    { label: "Upper & lower", met: /(?=.*[a-z])(?=.*[A-Z])/.test(form.password) },
    { label: "Number", met: /(?=.*\d)/.test(form.password) },
    { label: "Special char", met: /(?=.*[@$!%*?&])/.test(form.password) },
  ];

  const inputCls = (field) => `w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors[field] ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-violet-800 to-fuchsia-900 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <Link to="/"><img src="./Logo.png" alt="KNP Bursary" className="h-12 w-auto mb-12 brightness-0 invert" /></Link>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
            Start Your
            <span className="block bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Bursary Journey</span>
          </h1>
          <p className="text-lg text-violet-100 leading-relaxed max-w-md">Create your account to access bursary opportunities, submit applications, and track your progress.</p>
          <div className="mt-8 space-y-3">
            {["Free to create an account", "Simple application process", "Real-time status tracking"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-violet-100">
                <svg className="w-5 h-5 text-cyan-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="absolute top-4 right-4"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-6">
            <Link to="/"><img src="./Logo.png" alt="KNP Bursary" className="h-10 w-auto mx-auto mb-4 dark:brightness-0 dark:invert" /></Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in your details to get started</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {errors.api && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg"><p className="text-sm text-red-600 dark:text-red-400 text-center">{errors.api}</p></div>}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="firstName">First Name</label>
                  <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input id="firstName" type="text" className={inputCls("firstName")} placeholder="John" value={form.firstName} onChange={handleChange} disabled={loading} autoComplete="given-name" /></div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="lastName">Last Name</label>
                  <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input id="lastName" type="text" className={inputCls("lastName")} placeholder="Doe" value={form.lastName} onChange={handleChange} disabled={loading} autoComplete="family-name" /></div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="email">Email Address</label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input id="email" type="email" className={inputCls("email")} placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={loading} autoComplete="email" /></div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input id="password" type={showPassword ? "text" : "password"} className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors.password ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`} placeholder="Create a strong password" value={form.password} onChange={handleChange} disabled={loading} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                {form.password && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {passwordChecks.map((c, i) => (
                      <span key={i} className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full ${c.met ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${c.met ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`} />{c.label}
                      </span>
                    ))}
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors.confirmPassword ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`} placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} disabled={loading} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {loading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account...</span> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{" "}<Link to="/login" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium">Sign in</Link>
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

export default Register;
