import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { otpSchema } from '@/lib/validation';

interface OTPData {
  code: string;
}

export function OTPVerification() {
  const { verifyOTP, isLoading } = useAuth();
  const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<OTPData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Update form value
    const fullCode = newCodes.join('');
    form.setValue('code', fullCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OTPData) => {
    try {
      await verifyOTP(data.code);
    } catch (error) {
      // Error handling is done in the AuthContext
      setCodes(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    // Simulate resend functionality
    console.log('Resending OTP code...');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={() => (
            <FormItem>
              <div className="flex justify-center space-x-3">
                {codes.map((code, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full btn-success"
          disabled={isLoading || codes.join('').length !== 6}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify OTP
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-muted-foreground mb-2">Didn't receive a code?</p>
          <Button
            type="button"
            variant="link"
            onClick={handleResend}
            className="text-primary hover:text-primary/80"
          >
            Resend Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
