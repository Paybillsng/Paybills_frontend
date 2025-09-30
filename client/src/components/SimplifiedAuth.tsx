import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  Eye, 
  EyeOff, 
  Lock, 
  User,
  CreditCard,
  Chrome,
  Facebook,
  MessageCircle
} from 'lucide-react';

interface SimplifiedAuthProps {
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onSuccess?: () => void;
}

export default function SimplifiedAuth({ mode, onModeChange, onSuccess }: SimplifiedAuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '',
    password: '',
    referralCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, 2000);
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    // Handle social auth
  };

  const handlePhoneAuth = () => {
    console.log('Phone authentication');
    // Handle phone auth
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">
          {mode === 'login' ? 'Welcome Back' : 'Join Paybills.ng'}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          {mode === 'login' 
            ? 'Sign in to your account to continue' 
            : 'Create your account in seconds'
          }
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Social Auth */}
        <div className="space-y-3">
          <p className="text-sm text-center text-gray-600">Quick {mode === 'login' ? 'sign in' : 'sign up'} with:</p>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialAuth('google')}
              className="flex items-center space-x-2"
            >
              <Chrome className="w-4 h-4" />
              <span>Google</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handlePhoneAuth}
              className="flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </Button>
          </div>

          {/* WhatsApp & Facebook for social */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialAuth('whatsapp')}
              className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 border-green-200"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600">WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialAuth('facebook')}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">Facebook</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 123 456 7890"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <Label htmlFor="referral">Referral Code (Optional)</Label>
              <Input
                id="referral"
                type="text"
                placeholder="Enter referral code for bonus"
                value={formData.referralCode}
                onChange={(e) => handleInputChange('referralCode', e.target.value)}
              />
              {formData.referralCode && (
                <Badge className="mt-2 bg-green-100 text-green-800">
                  ₦100 welcome bonus available!
                </Badge>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          {mode === 'login' && (
            <Button variant="link" className="text-sm text-green-600">
              Forgot your password?
            </Button>
          )}
          
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button 
              variant="link" 
              onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
              className="p-0 h-auto text-green-600 font-semibold"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </Button>
          </p>

          {mode === 'signup' && (
            <p className="text-xs text-gray-500 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-green-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}