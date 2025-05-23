import React from "react";

const Contact = () => {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate async submit
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
    console.log("Contact Form submitted:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-0 flex flex-col md:flex-row">
        {/* Left Section: Contact Info */}
        <div className="md:w-1/2 w-full bg-cyan-800 text-white rounded-l-lg p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="mb-6 text-blue-100 text-lg">
            We’d love to hear from you! Reach out with any questions or
            feedback.
          </p>
          <div className="mb-4">
            <div className="font-semibold">Email:</div>
            <div>info@knmbursary.org</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Phone:</div>
            <div>+27 12 345 6789</div>
          </div>
          <div>
            <div className="font-semibold">Address:</div>
            <div>123 Main Street, Pretoria, South Africa</div>
          </div>
        </div>
        {/* Right Section: Contact Form */}
        <div className="md:w-1/2 w-full p-8">
          <h3 className="text-2xl font-bold mb-1 text-center text-cyan-700">
            Contact Us
          </h3>
          <p className="text-center text-gray-500 mb-6">
            Send us a message and we’ll get back to you soon!
          </p>
          {submitted ? (
            <div className="text-cyan-600 text-center font-semibold">
              Thank you for contacting us. We will get back to you soon!
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  className={`w-full px-3 py-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className={`w-full px-3 py-2 border rounded ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  className={`w-full px-3 py-2 border rounded ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  style={{ resize: "none" }}
                  disabled={loading}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 transition cursor-pointer flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
