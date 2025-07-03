import * as yup from 'yup';

export const contactFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
});

export const bookingFormSchema = yup.object({
  pickup: yup
    .string()
    .required('Pickup location is required')
    .min(3, 'Pickup location must be at least 3 characters'),
  destination: yup
    .string()
    .required('Destination is required')
    .min(3, 'Destination must be at least 3 characters'),
  datetime: yup
    .string()
    .required('Date and time is required'),
  passengers: yup
    .number()
    .required('Number of passengers is required')
    .min(1, 'At least 1 passenger required')
    .max(3, 'Maximum 3 passengers allowed'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number')
});

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
});

export type ContactFormData = yup.InferType<typeof contactFormSchema>;
export type BookingFormData = yup.InferType<typeof bookingFormSchema>;
export type LoginFormData = yup.InferType<typeof loginFormSchema>;
export type ForgotPasswordData = yup.InferType<typeof forgotPasswordSchema>;
