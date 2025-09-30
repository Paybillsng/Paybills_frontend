import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      services: "Services",
      wallet: "Wallet",
      transactions: "Transactions",
      profile: "Profile",
      settings: "Settings",
      notifications: "Notifications",
      referrals: "Referrals",
      logout: "Logout",
      
      // Authentication
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Phone Number",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      signUp: "Sign Up",
      verifyAccount: "Verify Account",
      enterOTP: "Enter OTP",
      resendOTP: "Resend OTP",
      
      // Dashboard
      welcomeBack: "Welcome back",
      totalBalance: "Total Balance",
      totalEarnings: "Total Earnings",
      totalSpent: "Total Spent",
      quickActions: "Quick Actions",
      recentTransactions: "Recent Transactions",
      spendingChart: "Spending Chart",
      
      // Services
      airtimeData: "Airtime & Data",
      utilities: "Utilities",
      education: "Education",
      betting: "Betting",
      software: "Software",
      microsoftActivation: "Microsoft Activation",
      
      // Wallet
      fundWallet: "Fund Wallet",
      walletBalance: "Wallet Balance",
      availableBalance: "Available Balance",
      
      // Transactions
      transactionHistory: "Transaction History",
      amount: "Amount",
      status: "Status",
      date: "Date",
      reference: "Reference",
      successful: "Successful",
      pending: "Pending",
      failed: "Failed",
      
      // Common
      submit: "Submit",
      cancel: "Cancel",
      continue: "Continue",
      back: "Back",
      next: "Next",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
    }
  },
  ha: {
    translation: {
      // Navigation (Hausa)
      dashboard: "Dashboard",
      services: "Sabis-sabis",
      wallet: "Jakan Kudi",
      transactions: "Cinikin Kudi",
      profile: "Bayani",
      settings: "Saiti",
      notifications: "Sanarwa",
      referrals: "Jagoranci",
      logout: "Fita",
      
      // Authentication (Hausa)
      login: "Shiga",
      register: "Yi Rajista",
      email: "Imel",
      password: "Kalmar Sirri",
      confirmPassword: "Tabbatar da Kalmar Sirri",
      firstName: "Sunan Farko",
      lastName: "Sunan Karshe",
      phoneNumber: "Lambar Waya",
      forgotPassword: "Ka manta da kalmar sirri?",
      signIn: "Shiga",
      signUp: "Yi Rajista",
      verifyAccount: "Tabbatar da Akaunt",
      enterOTP: "Shigar da OTP",
      resendOTP: "Sake aika OTP",
      
      // Dashboard (Hausa)
      welcomeBack: "Maraba da dawo",
      totalBalance: "Jimlar Kudi",
      totalEarnings: "Jimlar Riba",
      totalSpent: "Jimlar Kashe",
      quickActions: "Ayyuka masu sauri",
      recentTransactions: "Cinikin Kudi na baya-bayan nan",
      spendingChart: "Taswirar Kashe Kudi",
      
      // Services (Hausa)
      airtimeData: "Airtime da Data",
      utilities: "Sabis na Gida",
      education: "Ilimi",
      betting: "Caca",
      software: "Software",
      microsoftActivation: "Microsoft Activation",
      
      // Wallet (Hausa)
      fundWallet: "Cika Jakan Kudi",
      walletBalance: "Ma'aunin Jakan Kudi",
      availableBalance: "Kudin da ke Akwai",
      
      // Transactions (Hausa)
      transactionHistory: "Tarihin Cinikin Kudi",
      amount: "Adadi",
      status: "Matsayi",
      date: "Kwanan Wata",
      reference: "Lamba",
      successful: "Ya yi Nasara",
      pending: "Yana Jira",
      failed: "Ya kasa",
      
      // Common (Hausa)
      submit: "Tura",
      cancel: "Soke",
      continue: "Ci gaba",
      back: "Koma baya",
      next: "Na gaba",
      loading: "Ana lodi...",
      error: "Kuskure",
      success: "Nasara",
      warning: "Gargadi",
      info: "Bayani",
    }
  },
  yo: {
    translation: {
      // Navigation (Yoruba)
      dashboard: "Dashboard",
      services: "Awọn iṣẹ",
      wallet: "Apamọ owo",
      transactions: "Iṣowo",
      profile: "Profaili",
      settings: "Eto",
      notifications: "Iwifunni",
      referrals: "Itọkasi",
      logout: "Jade",
      
      // Authentication (Yoruba)
      login: "Wọle",
      register: "Forukọsilẹ",
      email: "Imeeli",
      password: "Ọrọ igbaniwọle",
      confirmPassword: "Jẹrisi ọrọ igbaniwọle",
      firstName: "Orukọ akọkọ",
      lastName: "Orukọ idile",
      phoneNumber: "Nọmba foonu",
      forgotPassword: "Ṣe o gbagbe ọrọ igbaniwọle?",
      signIn: "Wọle",
      signUp: "Forukọsilẹ",
      verifyAccount: "Jẹrisi akaunto",
      enterOTP: "Tẹ OTP sii",
      resendOTP: "Tun fi OTP ranṣẹ",
      
      // Dashboard (Yoruba)
      welcomeBack: "Kaabo pada",
      totalBalance: "Lapapọ owó",
      totalEarnings: "Lapapọ ere",
      totalSpent: "Lapapọ ti o na",
      quickActions: "Awọn iṣe iyara",
      recentTransactions: "Awọn iṣowo aipẹ",
      spendingChart: "Tabuleka inawo",
      
      // Services (Yoruba)
      airtimeData: "Airtime ati Data",
      utilities: "Awọn iṣẹ ile",
      education: "Ẹkọ",
      betting: "Ibọsí",
      software: "Software",
      microsoftActivation: "Microsoft Activation",
      
      // Wallet (Yoruba)
      fundWallet: "Fun apamọ owo",
      walletBalance: "Iwọntunwọnsi apamọ owo",
      availableBalance: "Owó to wa",
      
      // Transactions (Yoruba)
      transactionHistory: "Itan iṣowo",
      amount: "Iye owo",
      status: "Ipo",
      date: "Ọjọ",
      reference: "Itọkasi",
      successful: "Aṣeyọri",
      pending: "N duro",
      failed: "Kuna",
      
      // Common (Yoruba)
      submit: "Firanṣẹ",
      cancel: "Fagilee",
      continue: "Tẹsiwaju",
      back: "Pada",
      next: "Tókàn",
      loading: "N gbe...",
      error: "Aṣiṣe",
      success: "Aṣeyọri",
      warning: "Ikilọ",
      info: "Alaye",
    }
  },
  ig: {
    translation: {
      // Navigation (Igbo)
      dashboard: "Dashboard",
      services: "Ọrụ",
      wallet: "Akpa ego",
      transactions: "Azụmahịa",
      profile: "Profaịlụ",
      settings: "Ntọala",
      notifications: "Ọkwa",
      referrals: "Ntụaka",
      logout: "Pụọ",
      
      // Authentication (Igbo)
      login: "Banye",
      register: "Debanye aha",
      email: "Ozi ịntanetị",
      password: "Okwu nzuzo",
      confirmPassword: "Kwere okwu nzuzo",
      firstName: "Aha mbụ",
      lastName: "Aha nna",
      phoneNumber: "Nọmba ekwentị",
      forgotPassword: "Chefuru okwu nzuzo?",
      signIn: "Banye",
      signUp: "Debanye aha",
      verifyAccount: "Kwenye akaụntụ",
      enterOTP: "Tinye OTP",
      resendOTP: "Zigharịa OTP",
      
      // Dashboard (Igbo)
      welcomeBack: "Nnọọ ka ị lọta",
      totalBalance: "Mkpokọta ego",
      totalEarnings: "Mkpokọta uru",
      totalSpent: "Mkpokọta nke emefuru",
      quickActions: "Omume ngwa ngwa",
      recentTransactions: "Azụmahịa ndị ọhụrụ",
      spendingChart: "Chaatị ego emefuru",
      
      // Services (Igbo)
      airtimeData: "Airtime na Data",
      utilities: "Ọrụ ụlọ",
      education: "Agụmakwụkwọ",
      betting: "Ígba chaa chaa",
      software: "Software",
      microsoftActivation: "Microsoft Activation",
      
      // Wallet (Igbo)
      fundWallet: "Tinye ego n'akpa",
      walletBalance: "Ego dị n'akpa",
      availableBalance: "Ego dị njikere",
      
      // Transactions (Igbo)
      transactionHistory: "Akụkọ azụmahịa",
      amount: "Ego ole",
      status: "Ọnọdụ",
      date: "Ụbọchị",
      reference: "Ntụaka",
      successful: "Ga nke ọma",
      pending: "Na-eche",
      failed: "Dara ada",
      
      // Common (Igbo)
      submit: "Ziga",
      cancel: "Kagbuo",
      continue: "Gaa n'ihu",
      back: "Laghachi azụ",
      next: "Ọzọ",
      loading: "Na-ebu...",
      error: "Njehie",
      success: "Ihe ịga nke ọma",
      warning: "Ịdọ aka na ntị",
      info: "Ozi",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;