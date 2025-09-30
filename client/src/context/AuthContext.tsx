import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const BASE_URL = "https://paybill-web.onrender.com";
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "agent" | "admin";
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // check auth on load
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAuthResponse = (data: any) => {
    const { access, user: apiUser } = data;
    const userData: User = {
      id: apiUser.id,
      email: apiUser.email,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
      role: apiUser.role,
    };
    setAccessToken(access);
    setUser(userData);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // The refresh token is in an HttpOnly cookie, so we just need to hit the refresh endpoint.
        // The browser will send the cookie automatically.
        const response = await fetch(`${BASE_URL}/v1/auth/refresh/`, {
          method: "POST",
          credentials: "include", // Important to send cookies
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          handleAuthResponse(data);
        }
      } catch (error) {
        // Not logged in
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/v1/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: "include", // Important for receiving cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      handleAuthResponse(data);
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    const payload = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      password: data.password,
      password2: data.confirmPassword,
      referral_code: data.referralCode || undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/v1/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).flat().join(" ");
        throw new Error(errorMessage || "Registration failed");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // Invalidate the refresh token on the server
    fetch(`${BASE_URL}/v1/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
    setLocation("/");
  };

  const value = {
    user,
    accessToken,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
