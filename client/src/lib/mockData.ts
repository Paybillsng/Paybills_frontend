import { UserData, WalletData, TransactionData, ServiceData, NotificationData, NetworkProvider, DataPlan, UtilityProvider, EducationPin, BettingPlatform, SoftwareProduct } from '../types';

// User data
export const mockUser: UserData = {
  id: '1',
  username: 'zainab_abubakar',
  email: 'zainab@email.com',
  firstName: 'Zainab',
  lastName: 'Abubakar',
  phoneNumber: '+2348012345678',
  profilePicture: undefined,
  isEmailVerified: true,
  isPhoneVerified: true,
  kycStatus: 'verified',
  userType: 'regular',
  isActive: true,
  twoFactorEnabled: true,
  referralCode: 'ZAB123456',
  referredBy: undefined,
};

// Wallet data
export const mockWallet: WalletData = {
  id: '1',
  userId: '1',
  balance: 125750.00,
  totalEarnings: 200000.00,
  totalSpent: 74250.00,
};

// Transaction data
export const mockTransactions: TransactionData[] = [
  {
    id: '1',
    userId: '1',
    type: 'airtime',
    serviceProvider: 'MTN',
    amount: 1000,
    fee: 25,
    status: 'success',
    reference: 'TXN001',
    description: 'MTN Airtime Purchase',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '1',
    type: 'electricity',
    serviceProvider: 'EKEDC',
    amount: 5500,
    fee: 100,
    status: 'success',
    reference: 'TXN002',
    description: 'EKEDC Electricity Bill',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    userId: '1',
    type: 'cable',
    serviceProvider: 'DStv',
    amount: 21700,
    fee: 200,
    status: 'failed',
    reference: 'TXN003',
    description: 'DStv Premium Subscription',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

// Network providers
export const networkProviders: NetworkProvider[] = [
  { id: '1', name: 'MTN', code: 'mtn', icon: '📱', isActive: true },
  { id: '2', name: 'Glo', code: 'glo', icon: '🌐', isActive: true },
  { id: '3', name: 'Airtel', code: 'airtel', icon: '📶', isActive: true },
  { id: '4', name: '9mobile', code: '9mobile', icon: '📞', isActive: true },
];

// Data plans
export const dataPlans: DataPlan[] = [
  { id: '1', name: '500MB', size: '500MB', price: 250, validity: '30 days', provider: 'mtn' },
  { id: '2', name: '1GB', size: '1GB', price: 450, validity: '30 days', provider: 'mtn' },
  { id: '3', name: '2GB', size: '2GB', price: 900, validity: '30 days', provider: 'mtn' },
  { id: '4', name: '5GB', size: '5GB', price: 1800, validity: '30 days', provider: 'mtn' },
  { id: '5', name: '10GB', size: '10GB', price: 3500, validity: '30 days', provider: 'mtn' },
];

// Utility providers
export const utilityProviders: UtilityProvider[] = [
  { id: '1', name: 'EKEDC', type: 'electricity', code: 'ekedc', icon: '⚡', isActive: true },
  { id: '2', name: 'IKEDC', type: 'electricity', code: 'ikedc', icon: '⚡', isActive: true },
  { id: '3', name: 'PHED', type: 'electricity', code: 'phed', icon: '⚡', isActive: true },
  { id: '4', name: 'DStv', type: 'cable', code: 'dstv', icon: '📺', isActive: true },
  { id: '5', name: 'GOtv', type: 'cable', code: 'gotv', icon: '📺', isActive: true },
  { id: '6', name: 'StarTimes', type: 'cable', code: 'startimes', icon: '📺', isActive: true },
];

// Education pins
export const educationPins: EducationPin[] = [
  { id: '1', name: 'WAEC Result Checker', examBody: 'WAEC', price: 1500, isActive: true },
  { id: '2', name: 'NECO Result Checker', examBody: 'NECO', price: 1000, isActive: true },
  { id: '3', name: 'JAMB PIN', examBody: 'JAMB', price: 3500, isActive: true },
  { id: '4', name: 'NABTEB Result Checker', examBody: 'NABTEB', price: 1200, isActive: true },
];

// Betting platforms
export const bettingPlatforms: BettingPlatform[] = [
  { id: '1', name: 'Bet9ja', code: 'bet9ja', icon: '🎲', minimumAmount: 100, maximumAmount: 100000, isActive: true },
  { id: '2', name: 'SportyBet', code: 'sportybet', icon: '⚽', minimumAmount: 100, maximumAmount: 100000, isActive: true },
  { id: '3', name: 'NairaBet', code: 'nairabet', icon: '🏆', minimumAmount: 100, maximumAmount: 100000, isActive: true },
  { id: '4', name: '1xBet', code: '1xbet', icon: '🎯', minimumAmount: 100, maximumAmount: 100000, isActive: true },
];

// Software products
export const softwareProducts: SoftwareProduct[] = [
  {
    id: '1',
    name: 'Microsoft Office 365',
    category: 'Productivity',
    description: 'Complete office suite with Word, Excel, PowerPoint, and more',
    price: 15000,
    features: ['1TB OneDrive Storage', 'Desktop and Mobile Apps', 'Premium Templates'],
    image: '/api/placeholder/300/200',
    isActive: true,
  },
  {
    id: '2',
    name: 'Norton Antivirus Plus',
    category: 'Security',
    description: 'Advanced antivirus protection for your devices',
    price: 8500,
    features: ['Real-time Protection', 'Firewall', 'Password Manager'],
    image: '/api/placeholder/300/200',
    isActive: true,
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    category: 'Design',
    description: 'Complete creative suite for designers and content creators',
    price: 25000,
    features: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
    image: '/api/placeholder/300/200',
    isActive: true,
  },
];

// Notifications
export const mockNotifications: NotificationData[] = [
  {
    id: '1',
    userId: '1',
    title: 'Transaction Successful',
    message: 'Your MTN airtime purchase of ₦1,000 was successful',
    type: 'transaction',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '1',
    title: 'Security Alert',
    message: 'New login detected from Lagos, Nigeria',
    type: 'security',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    userId: '1',
    title: 'Referral Bonus',
    message: 'You earned ₦500 from a successful referral!',
    type: 'promotion',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Mock API functions
export const mockAPI = {
  // Authentication
  login: async (credentials: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (credentials.email === 'zainab@email.com' && credentials.password === 'password') {
      return { user: mockUser, token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { user: { ...mockUser, ...userData }, token: 'mock-jwt-token' };
  },

  verifyOTP: async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (code === '123456') {
      return { verified: true };
    }
    throw new Error('Invalid OTP code');
  },

  verify2FA: async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (code === '123456') {
      return { verified: true };
    }
    throw new Error('Invalid 2FA code');
  },

  // Wallet operations
  getWallet: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockWallet;
  },

  fundWallet: async (amount: number, method: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      reference: `FW${Date.now()}`,
      amount,
      method,
    };
  },

  // Transactions
  getTransactions: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTransactions;
  },

  purchaseAirtime: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      success: true,
      reference: `AT${Date.now()}`,
      ...data,
    };
  },

  purchaseData: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      success: true,
      reference: `DT${Date.now()}`,
      ...data,
    };
  },

  payUtility: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 4000));
    return {
      success: true,
      reference: `UT${Date.now()}`,
      ...data,
    };
  },

  purchaseEducationPin: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      pin: '1234567890',
      reference: `ED${Date.now()}`,
      ...data,
    };
  },

  fundBettingWallet: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return {
      success: true,
      reference: `BT${Date.now()}`,
      ...data,
    };
  },

  purchaseSoftware: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      licenseKey: 'XXXX-XXXX-XXXX-XXXX',
      reference: `SW${Date.now()}`,
      ...data,
    };
  },

  generateMicrosoftConfirmationId: async (installationIds: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      confirmationId: '123456-789012-345678-901234',
      installationIds,
    };
  },

  // Notifications
  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications;
  },

  markNotificationAsRead: async (notificationId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
};
