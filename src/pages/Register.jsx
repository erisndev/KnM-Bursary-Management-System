import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { APIError } from '@/services/api';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      password.length <= 128 &&
      /(?=.*[a-z])/.test(password) &&
      /(?=.*[A-Z])/.test(password) &&
      /(?=.*\d)/.test(password) &&
      /(?=.*[@$!%*?&])/.test(password)
    );
  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (form.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (form.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!isStrongPassword(form.password)) {
      newErrors.password =
        'Password must be 8-128 characters and include uppercase, lowercase, number, and special character (@$!%*?&)';
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      
      try {
        await api.auth.register({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        });
        
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } catch (error) {
        if (error instanceof APIError) {
          if (error.status === 409) {
            setErrors({ api: 'Email already exists' });
            toast.error('Email already exists');
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="border rounded-lg shadow-lg p-8 bg-white">
          <h2 className="text-3xl text-cyan-700 font-bold text-center">
            Create an Account
          </h2>
          <p className="text-md text-cyan-700 font-semibold mb-8 text-center">
            Let's start the journey together.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {errors.api && (
              <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded p-3">
                {errors.api}
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
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
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <p className="text-center">
              Already have an Account?{' '}
              <Link to="/login" className="text-cyan-700 hover:text-cyan-500">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
