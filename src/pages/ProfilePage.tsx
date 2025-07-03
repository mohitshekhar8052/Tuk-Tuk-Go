import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Edit3, Save, X, LogOut } from 'lucide-react';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../components/LoadingSpinner';
import { Alert } from '../components/ErrorBoundary';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSubmitStatus({ type: null, message: '' });
    reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        setIsEditing(false);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
            {/* Header Section */}
            <div className="bg-indigo-900 dark:bg-gray-900 text-white p-6 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mr-4">
                    <User className="text-indigo-900" size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-indigo-200">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center"
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {submitStatus.type && (
                <div className="mb-6">
                  <Alert
                    type={submitStatus.type}
                    message={submitStatus.message}
                    onClose={() => setSubmitStatus({ type: null, message: '' })}
                  />
                </div>
              )}

              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <User className="text-gray-400 dark:text-gray-500 mr-3" size={20} />
                      <span className="text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Mail className="text-gray-400 dark:text-gray-500 mr-3" size={20} />
                      <span className="text-gray-900 dark:text-white">{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Phone className="text-gray-400 dark:text-gray-500 mr-3" size={20} />
                      <span className="text-gray-900 dark:text-white">{user.phone || 'Not provided'}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleEdit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
                  >
                    <Edit3 className="mr-2" size={20} />
                    Edit Profile
                  </button>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        id="name"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email'
                          }
                        })}
                        type="email"
                        id="email"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
                    >
                      {isUpdating ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2" size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
                    >
                      <X className="mr-2" size={20} />
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-indigo-900 mb-2">0</div>
              <div className="text-gray-600">Total Rides</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-indigo-900 mb-2">₹0</div>
              <div className="text-gray-600">Amount Spent</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-indigo-900 mb-2">0</div>
              <div className="text-gray-600">Favorite Routes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
