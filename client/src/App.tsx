import { Switch, Route } from "wouter";
import PublicNavigation from "./components/Navigation";
import { AdvancedAnalytics } from "./components/analytics/AdvancedAnalytics";
import { AuthProvider } from "./context/AuthContext";
import { useTranslation } from 'react-i18next';

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyPhone from "./pages/VerifyPhone";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import Services from "./pages/Services";
import AirtimeData from "./pages/AirtimeData";
import Utilities from "./pages/Utilities";
import Education from "./pages/Education";
import Betting from "./pages/Betting";
import Software from "./pages/Software";
import MicrosoftActivation from "./pages/MicrosoftActivation";
import Referral from "./pages/Referral";
import Notifications from "./pages/Notifications";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentPortal from "./pages/AgentPortal";
import AgentOverride from "./pages/agent/AgentOverride";
import AgentWithdraw from "./pages/agent/AgentWithdraw";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import NotFound from "@/pages/not-found";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import KYCVerification from "./pages/KYCVerification";
import Rewards from "./pages/Rewards";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Disclaimer from "./pages/Disclaimer";
import Refund from "./pages/Refund";
import Help from "./pages/Help";
import ScrapeManagement from "./pages/ScrapeManagement";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // For demo purposes, always show content with navigation
  return (
    <div className="flex min-h-screen bg-background">
      <PublicNavigation />
      <main className="flex-1 lg:ml-64">
        <div className="lg:p-8 p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  // Public routes without navigation
  return <div className="min-h-screen bg-background">{children}</div>;
}

function AppRoutes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={() => <PublicRoute><Home /></PublicRoute>} />
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>
      <Route path="/register">
        <PublicRoute>
          <Register />
        </PublicRoute>
      </Route>
      <Route path="/verify-phone">
        <PublicRoute>
          <VerifyPhone />
        </PublicRoute>
      </Route>
      <Route path="/forgot-password">
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      </Route>

      {/* Protected Routes */}
      <Route path="/dashboard" component={() => <ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/2fa" component={() => <ProtectedRoute><TwoFactorAuth /></ProtectedRoute>} />
      <Route path="/profile" component={() => <ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" component={() => <ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/wallet" component={() => <ProtectedRoute><Wallet /></ProtectedRoute>} />
      <Route path="/transactions" component={() => <ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/services" component={() => <ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/airtime-data" component={() => <ProtectedRoute><AirtimeData /></ProtectedRoute>} />
      <Route path="/utilities" component={() => <ProtectedRoute><Utilities /></ProtectedRoute>} />
      <Route path="/education" component={() => <ProtectedRoute><Education /></ProtectedRoute>} />
      <Route path="/betting" component={() => <ProtectedRoute><Betting /></ProtectedRoute>} />
      
      {/* Public Software Page */}
      <Route path="/software" component={() => <PublicRoute><Software /></PublicRoute>} />
      
      {/* Information Pages */}
      <Route path="/about" component={() => <PublicRoute><About /></PublicRoute>} />
      <Route path="/contact" component={() => <PublicRoute><Contact /></PublicRoute>} />
      <Route path="/privacy" component={() => <PublicRoute><Privacy /></PublicRoute>} />
      <Route path="/terms" component={() => <PublicRoute><Terms /></PublicRoute>} />
      <Route path="/kyc" component={() => <ProtectedRoute><KYCVerification /></ProtectedRoute>} />
      <Route path="/rewards" component={() => <ProtectedRoute><Rewards /></ProtectedRoute>} />
      <Route path="/blog" component={() => <PublicRoute><Blog /></PublicRoute>} />
      <Route path="/faq" component={() => <PublicRoute><FAQ /></PublicRoute>} />
      <Route path="/disclaimer" component={() => <PublicRoute><Disclaimer /></PublicRoute>} />
      <Route path="/refund" component={() => <PublicRoute><Refund /></PublicRoute>} />
      <Route path="/help" component={() => <PublicRoute><Help /></PublicRoute>} />
      <Route path="/ms-activation" component={() => <ProtectedRoute><MicrosoftActivation /></ProtectedRoute>} />
      <Route path="/referrals" component={() => <ProtectedRoute><Referral /></ProtectedRoute>} />
      <Route path="/notifications" component={() => <ProtectedRoute><Notifications /></ProtectedRoute>} />

      {/* Agent Routes */}
      <Route path="/agent" component={() => <PublicRoute><AgentPortal /></PublicRoute>} />
      <Route path="/agent/portal" component={() => <PublicRoute><AgentPortal /></PublicRoute>} />
      <Route path="/agent/dashboard" component={() => <ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
      <Route path="/agent/override" component={() => <ProtectedRoute><AgentOverride /></ProtectedRoute>} />
      <Route path="/agent/withdraw" component={() => <ProtectedRoute><AgentWithdraw /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" component={() => <ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" component={() => <ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/analytics" component={() => <ProtectedRoute><AdvancedAnalytics /></ProtectedRoute>} />
      <Route path="/admin/scrape" component={() => <ProtectedRoute><ScrapeManagement /></ProtectedRoute>} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
