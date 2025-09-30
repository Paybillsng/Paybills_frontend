import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { TwoFactorAuth as TwoFactorAuthComponent } from '@/components/auth/TwoFactorAuth';

export default function TwoFactorAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
            <CardDescription>
              Enter the 6-digit code from your authenticator app to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TwoFactorAuthComponent />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
