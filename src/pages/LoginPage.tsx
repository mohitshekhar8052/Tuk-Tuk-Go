import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Truck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen flex bg-transparent">
      {/* Left Side - Animated Character & Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-amber-500 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-amber-300 rounded-full blur-xl"></div>
        </div>

        {/* Modern Electric Auto Rickshaw */}
        <div className="flex flex-col items-center justify-center w-full px-8 relative z-10">
          <motion.div
            className="relative mb-8"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Electric Auto Rickshaw Image */}
            <div className="relative w-[500px] h-96">
              <img
                src="public/animations/bg2.png"
                alt="Electric Auto Rickshaw"
                className="w-full h-full object-contain"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(59, 130, 246, 0.3)) brightness(1.1)',
                  backgroundColor: 'transparent',
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
              
              {/* Animated Status Badges */}
              <motion.div
                className="absolute top-4 left-8 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-green-400"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>100% Charged</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-4 right-8 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-blue-400"
                animate={{
                  scale: [1, 1.05, 1],
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>GPS Active</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-emerald-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌱</span>
                  <span>Zero Emission</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-4 bg-amber-500 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg border-2 border-amber-400"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-white">⚡</span>
                  <span>Ready</span>
                </div>
              </motion.div>

              {/* Floating particles effect around the image */}
              <motion.div
                className="absolute top-20 left-4 w-2 h-2 bg-green-400 rounded-full opacity-60"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
              />
              <motion.div
                className="absolute bottom-24 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-32 right-20 w-1 h-1 bg-amber-400 rounded-full opacity-60"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl font-bold text-white text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Hop on the <span className="text-amber-400">Tuk-Tuk Go</span>
          </motion.h1>
          <motion.p 
            className="text-indigo-200 text-center text-xl max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Your urban adventure starts here! Log in to discover the most authentic way to explore Gorakhpur's hidden gems.
          </motion.p>
          <motion.div
            className="flex items-center justify-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-indigo-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Ready to ride</span>
            </div>
            <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
            <div className="flex items-center space-x-2 text-indigo-200">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm">50+ drivers online</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Modern Login Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 bg-gradient-to-br from-gray-50/50 via-white/80 to-gray-100/50 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-sm relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-20 h-20 bg-indigo-500/5 dark:bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-20 w-16 h-16 bg-amber-500/5 dark:bg-indigo-500/5 rounded-full blur-xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
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

          {/* Modern Glass Card Container */}
          <motion.div 
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8"
            variants={itemVariants}
          >
            {/* Header */}
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-900 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to continue your journey
              </p>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div className="space-y-3 mb-6" variants={itemVariants}>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div className="relative mb-6" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
                  Or continue with email
                </span>
              </div>
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
            <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-5" variants={itemVariants}>
              {/* Email Field with Icon */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${
                    errors.email ? 'border-red-500 ring-2 ring-red-200' : ''
                  }`}
                  placeholder="Email or username"
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field with Icon */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-12 pr-12 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 ${
                    errors.password ? 'border-red-500 ring-2 ring-red-200' : ''
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 dark:text-amber-400 hover:text-indigo-500 dark:hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-amber-500 dark:to-amber-600 hover:from-indigo-700 hover:to-indigo-900 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting || isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>

              {/* SSO Option */}
              <button
                type="button"
                className="w-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-4 px-6 rounded-xl bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                Sign in with SSO
              </button>
            </motion.form>

            {/* Sign Up Link */}
            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-indigo-600 dark:text-amber-400 hover:text-indigo-500 dark:hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div className="mt-6 p-4 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 rounded-xl" variants={itemVariants}>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center">
              <span className="mr-2">🎯</span>
              Demo Credentials
            </h4>
            <div className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
              <p><strong>Email:</strong> demo@tukgo.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
