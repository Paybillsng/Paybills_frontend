export interface UserData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  userType: 'regular' | 'agent' | 'admin';
  isActive: boolean;
  twoFactorEnabled: boolean;
  referralCode?: string;
  referredBy?: string;
}

export interface WalletData {
  id: string;
  userId: string;
  balance: number;
  totalEarnings: number;
  totalSpent: number;
}

export interface TransactionData {
  id: string;
  userId: string;
  type: 'airtime' | 'data' | 'electricity' | 'cable' | 'education' | 'betting' | 'software';
  serviceProvider?: string;
  amount: number;
  fee: number;
  status: 'pending' | 'success' | 'failed';
  reference: string;
  metadata?: any;
  description?: string;
  createdAt: string;
}

export interface ServiceData {
  id: string;
  name: string;
  category: string;
  provider: string;
  isActive: boolean;
  minimumAmount?: number;
  maximumAmount?: number;
  fee: number;
  feeType: 'fixed' | 'percentage';
  metadata?: any;
}

export interface NotificationData {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'transaction' | 'security' | 'promotion' | 'system';
  isRead: boolean;
  metadata?: any;
  createdAt: string;
}

export interface AuthContextType {
  user: UserData | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  verifyOTP: (code: string) => Promise<void>;
  verify2FA: (code: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralCode?: string;
}

export interface WalletContextType {
  wallet: WalletData | null;
  transactions: TransactionData[];
  fundWallet: (amount: number, method: string) => Promise<void>;
  purchaseService: (serviceData: PurchaseServiceData) => Promise<void>;
  isLoading: boolean;
}

export interface PurchaseServiceData {
  type: string;
  provider: string;
  amount: number;
  recipient: string;
  metadata?: any;
}

export interface NetworkProvider {
  id: string;
  name: string;
  code: string;
  icon: string;
  isActive: boolean;
}

export interface DataPlan {
  id: string;
  name: string;
  size: string;
  price: number;
  validity: string;
  provider: string;
}

export interface UtilityProvider {
  id: string;
  name: string;
  type: 'electricity' | 'cable';
  code: string;
  icon: string;
  isActive: boolean;
}

export interface EducationPin {
  id: string;
  name: string;
  examBody: string;
  price: number;
  isActive: boolean;
}

export interface BettingPlatform {
  id: string;
  name: string;
  code: string;
  icon: string;
  minimumAmount: number;
  maximumAmount: number;
  isActive: boolean;
}

export interface SoftwareProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  isActive: boolean;
}

export interface MicrosoftActivationData {
  installationIds: string[];
  screenshot?: File;
  confirmationId?: string;
}

export interface AgentData {
  totalCommission: number;
  pendingCommission: number;
  totalTransactions: number;
  monthlyVolume: number;
}

export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  totalTransactions: number;
  failedTransactions: number;
  userGrowth: number;
  revenueGrowth: number;
  transactionGrowth: number;
}
