import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { PiMedal } from "react-icons/pi";
import { LuGraduationCap, LuHandshake } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import GridBackground from "@/components/ui/GridBackground";

/* ── inline contact form (was a separate page) ── */
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../../environment";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: undefined }); setSubmitError(""); };

  const sendEmail = async (params) => {
    if (typeof window !== "undefined" && window.emailjs) {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      return await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    }
    throw new Error("EmailJS not loaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setLoading(true); setSubmitError("");
    try {
      await sendEmail({ name: form.name, email: form.email, message: form.message, to_name: "KNP Bursary Team" });
      setSubmitted(true); setForm({ name: "", email: "", message: "" });
    } catch { setSubmitError("Failed to send message. Please try again later."); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    s.async = true; document.head.appendChild(s);
    return () => { if (document.head.contains(s)) document.head.removeChild(s); };
  }, []);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
        <button onClick={() => setSubmitted(false)} className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg"><p className="text-sm text-red-600 dark:text-red-400">{submitError}</p></div>}
      {[
        { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
        { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      ].map((f) => (
        <div key={f.id}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor={f.id}>{f.label}</label>
          <input className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors[f.id] ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
            type={f.type} id={f.id} name={f.id} placeholder={f.placeholder} value={form[f.id]} onChange={handleChange} disabled={loading} />
          {errors[f.id] && <p className="text-red-500 text-xs mt-1.5">{errors[f.id]}</p>}
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="message">Message</label>
        <textarea className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors resize-none ${errors.message ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
          id="message" name="message" rows={5} placeholder="How can we help you?" value={form.message} onChange={handleChange} disabled={loading} />
        {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
        {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</> : <><Send className="w-4 h-4" />Send Message</>}
      </button>
    </form>
  );
};

/* ── helper: scroll to section without changing URL ── */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

/* ── main page ── */
const Home = () => {
  useEffect(() => {
    // If someone navigated here with a hash, scroll to it once
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      setTimeout(() => scrollToSection(hash), 120);
      // Clean the URL so the # doesn't stay visible
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <>
      {/* ======================== HERO ======================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('./hero.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-violet-900/50 to-indigo-900/60" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-white dark:bg-slate-900/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            Applications Now Open for 2025
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Unlock Your
            <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Academic Potential</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Find and apply for bursaries that match your goals. We connect deserving students with life-changing educational funding.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 text-center">
              Get Started — It's Free ✨
            </Link>
            <button onClick={() => scrollToSection("how-to-apply")} className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 text-center">
              Learn How It Works
            </button>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/60 text-sm">
            <div className="flex items-center gap-2"><FiCheckCircle className="text-emerald-400" /><span>100% Free</span></div>
            <div className="flex items-center gap-2"><FiCheckCircle className="text-cyan-400" /><span>Quick Application</span></div>
            <div className="flex items-center gap-2"><FiCheckCircle className="text-violet-400" /><span>Track Progress</span></div>
          </div>
        </div>
      </section>

      {/* ======================== ABOUT ======================== */}
      <section id="about" className="relative py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-semibold text-xs uppercase tracking-wider rounded-full">About Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Empowering Students Through Education</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">KNP Bursary is dedicated to bridging the gap between talented students and educational funding opportunities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "500+", label: "Students Funded", desc: "Helping students achieve their academic dreams.", gradient: "from-violet-500 to-indigo-500" },
              { stat: "R2M+", label: "Bursaries Awarded", desc: "Millions in funding distributed to students.", gradient: "from-cyan-500 to-blue-500" },
              { stat: "95%", label: "Success Rate", desc: "Of funded students complete their qualifications.", gradient: "from-emerald-500 to-teal-500" },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden text-center p-8 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 group hover:shadow-xl transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`} />
                <div className={`text-4xl font-extrabold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>{item.stat}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.label}</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== BURSARY TYPES ======================== */}
      <section className="relative py-20 sm:py-28 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-semibold text-xs uppercase tracking-wider rounded-full">Opportunities</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Explore Types of Bursaries</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">We offer various bursary categories to support students from all backgrounds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <PiMedal className="text-2xl" />, title: "Merit-Based", text: "Awarded based on academic or extracurricular achievements.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/40", border: "border-violet-200 dark:border-violet-800" },
              { icon: <LuGraduationCap className="text-2xl" />, title: "Need-Based", text: "Designed to assist students with financial needs.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40", border: "border-blue-200 dark:border-blue-800" },
              { icon: <LuHandshake className="text-2xl" />, title: "Community Service", text: "For students committed to community service and outreach.", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40", border: "border-emerald-200 dark:border-emerald-800" },
              { icon: <FaRegStar className="text-2xl" />, title: "Athletic", text: "Supporting student athletes pursuing higher education.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40", border: "border-amber-200 dark:border-amber-800" },
              { icon: <HiOutlineLightningBolt className="text-2xl" />, title: "Innovation", text: "Encouraging students in technology and entrepreneurship.", color: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-100 dark:bg-fuchsia-900/40", border: "border-fuchsia-200 dark:border-fuchsia-800" },
              { icon: <CgFileDocument className="text-2xl" />, title: "Research", text: "Funding for students engaged in research projects.", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40", border: "border-rose-200 dark:border-rose-800" },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 ${item.bg} ${item.border} border rounded-xl flex items-center justify-center mb-4 ${item.color}`}>{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW TO APPLY ======================== */}
      <section id="how-to-apply" className="relative py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold text-xs uppercase tracking-wider rounded-full">How to Apply</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Your Path to Funding</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Follow these simple steps to submit your bursary application.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { no: "1", title: "Create Account", desc: "Sign up for free and set up your student profile in minutes.", color: "from-violet-500 to-indigo-500" },
              { no: "2", title: "Fill Application", desc: "Complete the multi-step application form with your details.", color: "from-cyan-500 to-blue-500" },
              { no: "3", title: "Upload Documents", desc: "Attach required documents to support your application.", color: "from-emerald-500 to-teal-500" },
              { no: "4", title: "Track Status", desc: "Monitor your application status through your dashboard.", color: "from-amber-500 to-orange-500" },
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                {index < 3 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 dark:from-slate-700 to-transparent" />}
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl font-bold text-white">{step.no}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/register" className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md shadow-violet-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5">
              Start Your Application
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="relative py-20 sm:py-28 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold text-xs uppercase tracking-wider rounded-full">Testimonials</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Hear From Our Students</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Real stories from students who have benefited from our bursary program.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "The KNP Bursary App made it so easy to find and apply for funding. I received updates every step of the way!", profile: "./student1.jpg", name: "Thabo Mokoena", uni: "University of Cape Town" },
              { quote: "Thanks to this app, I discovered bursaries I never knew existed. The application process was simple and stress-free.", profile: "./student2.jpg", name: "Ayanda Nkosi", uni: "University of Limpopo" },
              { quote: "I loved how the dashboard helped me track my application status. I felt supported throughout my journey.", profile: "./student3.jpg", name: "Naledi Dlamini", uni: "University of Johannesburg" },
              { quote: "The reminders and document upload feature made sure I never missed a deadline. Highly recommended!", profile: "./student4.jpg", name: "Sipho Khumalo", uni: "University of Pretoria" },
              { quote: "With the KNP Bursary App, I could focus on my studies while the app handled the admin. It changed my life!", profile: "./student5.jpg", name: "Zanele Mthembu", uni: "University of Stellenbosch" },
              { quote: "The entire process was seamless. From application to approval, everything was transparent and well-organized.", profile: "./student6.jpg", name: "Ferdinand Morena", uni: "University of Limpopo" },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">"{item.quote}"</p>
                <div className="flex items-center gap-3">
                  <img loading="lazy" src={item.profile} alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-violet-100 dark:border-violet-900" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.uni}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CONTACT (was a separate page) ======================== */}
      <section id="contact" className="relative py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider rounded-full">Contact</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Have questions about our bursary program? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white dark:bg-slate-900/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-bold mb-8 relative z-10">Contact Information</h3>
                <div className="space-y-6 relative z-10">
                  {[
                    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "011-462-6269" },
                    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "info@knpbursary.co.za" },
                    { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "150 Bryanston Drive", sub: "Sandton, 2191, Johannesburg" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white dark:bg-slate-900/10 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-sm text-violet-200">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                        {item.sub && <p className="text-sm text-violet-200">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-8 transition-colors duration-300">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== CTA ======================== */}
      <section className="py-24 bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-violet-100 mb-10 max-w-2xl mx-auto">Join hundreds of students who have already secured funding for their education. Your future starts here.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-violet-800 font-bold rounded-xl hover:bg-gray-50 dark:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5">Create Free Account</Link>
            <button onClick={() => scrollToSection("contact")} className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white dark:bg-slate-900/10 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
