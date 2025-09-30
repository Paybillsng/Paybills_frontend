import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail } from 'lucide-react';
import { forgotPasswordSchema } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordData {
  email: string;
}

export function ForgotPassword() {
  const { toast } = useToast();

  const form = useForm<ForgotPasswordData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Sending...</span>
            </div>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Send Reset Link
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login">
              <Button variant="link" className="px-0 text-sm font-medium">
                Sign in
              </Button>
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
