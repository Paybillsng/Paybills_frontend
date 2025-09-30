import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import { OTPVerification } from '@/components/auth/OTPVerification';

export default function VerifyPhone() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify Phone Number</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to your phone number.
              Please enter it below to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OTPVerification />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
