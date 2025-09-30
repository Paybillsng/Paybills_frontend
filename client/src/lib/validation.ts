import * as yup from 'yup';

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export const microsoftActivationSchema = yup.object({
  installationIdA: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdB: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdC: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdD: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdE: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdF: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdG: yup.string().required('Required').length(9, 'Must be 9 digits'),
  installationIdH: yup.string().required('Required').length(9, 'Must be 9 digits'),
});

export const otpSchema = yup.object({
  code: yup
    .string()
    .required('OTP code is required')
    .length(6, 'OTP must be 6 digits'),
});

export const twoFactorSchema = yup.object({
  code: yup
    .string()
    .required('2FA code is required')
    .length(6, '2FA code must be 6 digits'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: yup.boolean().default(false),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  referralCode: yup.string().optional(),
});

export const profileUpdateSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number'),
});

// Service validation schemas
export const airtimeSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(50, 'Minimum amount is ₦50')
    .max(10000, 'Maximum amount is ₦10,000'),
  network: yup
    .string()
    .required('Network provider is required')
    .oneOf(['mtn', 'glo', 'airtel', '9mobile'], 'Invalid network provider'),
});

export const dataSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number'),
  dataPlan: yup
    .string()
    .required('Data plan is required'),
  network: yup
    .string()
    .required('Network provider is required')
    .oneOf(['mtn', 'glo', 'airtel', '9mobile'], 'Invalid network provider'),
});

export const utilitySchema = yup.object({
  meterNumber: yup
    .string()
    .required('Meter number is required')
    .min(10, 'Invalid meter number'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(100, 'Minimum amount is ₦100')
    .max(50000, 'Maximum amount is ₦50,000'),
  provider: yup
    .string()
    .required('Utility provider is required'),
  customerName: yup
    .string()
    .required('Customer name is required'),
});

export const educationSchema = yup.object({
  examType: yup
    .string()
    .required('Exam type is required')
    .oneOf(['waec', 'neco', 'nabteb', 'jamb'], 'Invalid exam type'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(1000, 'Minimum amount is ₦1,000'),
  candidateName: yup
    .string()
    .required('Candidate name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number'),
});

export const bettingSchema = yup.object({
  platform: yup
    .string()
    .required('Betting platform is required')
    .oneOf(['bet9ja', 'sportybet', 'betking', 'nairabet'], 'Invalid betting platform'),
  username: yup
    .string()
    .required('Username is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(100, 'Minimum amount is ₦100')
    .max(100000, 'Maximum amount is ₦100,000'),
});

export const walletFundingSchema = yup.object({
  amount: yup
    .number()
    .required('Amount is required')
    .min(100, 'Minimum amount is ₦100')
    .max(500000, 'Maximum amount is ₦500,000'),
  paymentMethod: yup
    .string()
    .required('Payment method is required')
    .oneOf(['card', 'bank_transfer', 'ussd'], 'Invalid payment method'),
});

export const agentWithdrawSchema = yup.object({
  amount: yup
    .number()
    .required('Amount is required')
    .min(1000, 'Minimum withdrawal is ₦1,000'),
  bankName: yup
    .string()
    .required('Bank name is required'),
  accountNumber: yup
    .string()
    .required('Account number is required')
    .matches(/^\d{10}$/, 'Account number must be 10 digits'),
  accountName: yup
    .string()
    .required('Account name is required'),
});