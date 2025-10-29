import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { APIError } from '@/services/api';
import { storeAuthData } from '@/services/auth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Show message from navigation state (from ProtectedRoute)
  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message, { id: 'auth-redirect' });
      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const validate = () => {
    const errs = {};
    if (!form.email) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Email is invalid';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    }
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const data = await api.auth.login(form);
      
      // Store auth data
      storeAuthData({
        token: data.token,
        userId: data.user?.id,
        applicationId: data.user?.applicationId,
      });

      toast.success('Login successful!');
      
      // Redirect to the page they tried to access or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 401) {
          setErrors({ api: 'Invalid email or password' });
          toast.error('Invalid email or password');
        } else if (error.status === 408) {
          setErrors({ api: error.message });
          toast.error(error.message);
        } else {
          setErrors({ api: error.message });
          toast.error(error.message);
        }
      } else {
        setErrors({ api: 'An unexpected error occurred' });
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="border rounded-lg shadow-lg p-8 bg-white">
          <h2 className="text-3xl text-cyan-700 font-bold text-center">
            Welcome Back!
          </h2>
          <p className="text-md text-cyan-700 font-semibold mb-8 text-center">
            Please login to your account.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {errors.api && (
              <div className="text-red-500 text-center text-sm mb-2 bg-red-50 border border-red-200 rounded p-3">
                {errors.api}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Enter your email"
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <div className="mb-1 mt-1 text-sm flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-cyan-700 hover:text-cyan-500"
                >
                  Forgot Password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-4">
              Don't have an Account?{' '}
              <Link
                to="/register"
                className="text-cyan-700 hover:text-cyan-500"
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
