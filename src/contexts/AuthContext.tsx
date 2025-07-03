import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  joinDate?: string;
  preferences?: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginAttempts: number;
  lastLoginTime: Date | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('tukgo_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('tukgo_user');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for too many failed attempts
      if (loginAttempts >= 3) {
        return { success: false, message: 'Too many failed attempts. Please try again later.' };
      }
      
      // Mock authentication - in real app, this would be an API call
      if (email === 'demo@tukgo.com' && password === 'demo123') {
        const userData: User = {
          id: '1',
          email: 'demo@tukgo.com',
          name: 'Demo User',
          phone: '+91 9876543210',
          avatar: undefined,
          joinDate: new Date().toISOString(),
          preferences: {
            notifications: true,
            darkMode: false,
            language: 'en'
          }
        };
        
        setUser(userData);
        setLoginAttempts(0);
        setLastLoginTime(new Date());
        
        const storageKey = rememberMe ? 'tukgo_user_persistent' : 'tukgo_user';
        localStorage.setItem(storageKey, JSON.stringify(userData));
        localStorage.setItem('tukgo_last_login', new Date().toISOString());
        
        return { success: true, message: 'Login successful!' };
      } else {
        setLoginAttempts(prev => prev + 1);
        return { success: false, message: 'Invalid email or password. Try demo@tukgo.com / demo123' };
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginAttempts(prev => prev + 1);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLoginAttempts(0);
    setLastLoginTime(null);
    localStorage.removeItem('tukgo_user');
    localStorage.removeItem('tukgo_user_persistent');
    localStorage.removeItem('tukgo_last_login');
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password reset
      if (email === 'demo@tukgo.com') {
        return { success: true, message: 'Password reset instructions sent to your email.' };
      } else {
        return { success: false, message: 'Email not found in our records.' };
      }
    } catch (err) {
      console.error('Password reset error:', err);
      return { success: false, message: 'Failed to send reset email. Please try again.' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password change (in real app, verify current password first)
      if (currentPassword === 'demo123') {
        // In real app, hash the new password and update in backend
        return { success: true, message: 'Password changed successfully!' };
      } else {
        return { success: false, message: 'Current password is incorrect.' };
      }
    } catch (err) {
      console.error('Password change error:', err);
      return { success: false, message: 'Failed to change password. Please try again.' };
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('tukgo_user', JSON.stringify(updatedUser));
      
      return { success: true, message: 'Profile updated successfully!' };
    } catch (err) {
      console.error('Profile update error:', err);
      return { success: false, message: 'Failed to update profile. Please try again.' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginAttempts,
    lastLoginTime,
    login,
    logout,
    updateProfile,
    resetPassword,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
