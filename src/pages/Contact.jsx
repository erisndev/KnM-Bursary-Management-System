import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../../environment";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitError("");
  };

  const sendEmail = async (params) => {
    if (typeof window !== "undefined" && window.emailjs) {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      return await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        params,
      );
    }
    throw new Error("EmailJS not loaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      await sendEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        to_name: "KNP Bursary Team",
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    s.async = true;
    document.head.appendChild(s);
    return () => {
      if (document.head.contains(s)) document.head.removeChild(s);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-semibold text-xs uppercase tracking-wider rounded-full">
            Contact
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about our bursary program? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white dark:bg-slate-900/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-xl font-bold mb-8 relative z-10">
                Contact Information
              </h2>
              <div className="space-y-6 relative z-10">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: "011-462-6269",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "info@knpbursary.co.za",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Address",
                    value: "150 Bryanston Drive",
                    sub: "Sandton, 2191, Johannesburg",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-violet-200">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                      {item.sub && (
                        <p className="text-sm text-violet-200">{item.sub}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-8 transition-colors duration-300">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {submitError}
                      </p>
                    </div>
                  )}
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Your full name",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        htmlFor={f.id}
                      >
                        {f.label}
                      </label>
                      <input
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors ${errors[f.id] ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
                        type={f.type}
                        id={f.id}
                        name={f.id}
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors[f.id] && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors[f.id]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors resize-none ${errors.message ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-slate-700"}`}
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
