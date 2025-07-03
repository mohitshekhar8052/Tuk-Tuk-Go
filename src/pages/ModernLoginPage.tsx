import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { loginFormSchema, LoginFormData } from '../utils/validationSchemas';
import LoadingSpinner from '../components/LoadingSpinner';
import { Alert } from '../components/ErrorBoundary';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await login(data.email, data.password, false);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Redirect after successful login
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Animated Character & Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-400 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cyan-400 rounded-full blur-xl"></div>
        </div>

        {/* Animated Auto Rickshaw Character */}
        <div className="flex flex-col items-center justify-center w-full px-12 relative z-10">
          <motion.div
            className="relative mb-8"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Auto Rickshaw Illustration */}
            <div className="w-80 h-80 relative">
              {/* Body */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-3xl rounded-b-lg shadow-2xl">
                {/* Windshield */}
                <div className="absolute top-2 left-4 right-4 h-16 bg-gradient-to-b from-cyan-200 to-cyan-300 rounded-t-2xl opacity-80"></div>
                {/* Stripes */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-green-500"></div>
                <div className="absolute top-1/2 mt-3 left-0 right-0 h-2 bg-green-500"></div>
              </div>
              
              {/* Wheels */}
              <motion.div 
                className="absolute bottom-12 left-16 w-12 h-12 bg-gray-800 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute bottom-12 right-16 w-12 h-12 bg-gray-800 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
              </motion.div>
              
              {/* Driver */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-amber-600 rounded-t-full"></div>
              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-200 rounded-full"></div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold text-white text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Welcome to <span className="text-amber-400">Tuk-Tuk Go</span>
          </motion.h1>
          <motion.p 
            className="text-purple-200 text-center text-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Your journey begins with a single login. Experience the city like never before.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 bg-white dark:bg-gray-900"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo (shown only on small screens) */}
          <motion.div 
            className="lg:hidden text-center mb-8"
            variants={itemVariants}
          >
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <Truck className="text-amber-500" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                Tuk-Tuk<span className="text-amber-500">Go</span>
              </div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center lg:text-left mb-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              TUK-TUK GO
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Express login via Google and Facebook
            </p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div className="space-y-3 mb-6" variants={itemVariants}>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div className="flex mb-6" variants={itemVariants}>
            <button className="flex-1 py-2 text-center border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium">
              Log in
            </button>
            <button className="flex-1 py-2 text-center border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Sign up
            </button>
          </motion.div>

          {/* Error Alert */}
          {submitStatus.type && (
            <motion.div className="mb-6" variants={itemVariants}>
              <Alert
                type={submitStatus.type}
                message={submitStatus.message}
                onClose={() => setSubmitStatus({ type: null, message: '' })}
              />
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4" variants={itemVariants}>
            {/* Email Field */}
            <div>
              <input
                {...register('email')}
                type="email"
                className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="email or username"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <span className="text-sm">Show</span>
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Logging in...
                </div>
              ) : (
                'Log in'
              )}
            </button>

            {/* SSO Option */}
            <button
              type="button"
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Log in with SSO
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 dark:text-amber-400 hover:text-purple-500 dark:hover:text-amber-300 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </motion.form>

          {/* Demo Credentials */}
          <motion.div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg" variants={itemVariants}>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Demo Credentials</h4>
            <div className="text-sm text-amber-700 dark:text-amber-200">
              <p><strong>Email:</strong> demo@tukgo.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
