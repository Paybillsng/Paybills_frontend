import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Banknote, AlertTriangle, Shield } from 'lucide-react';
import { agentWithdrawSchema } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';

interface WithdrawCommissionData {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  twoFactorCode: string;
}

export function WithdrawCommission() {
  const { toast } = useToast();

  const form = useForm<WithdrawCommissionData>({
    resolver: yupResolver(agentWithdrawSchema),
    defaultValues: {
      amount: undefined,
      bankName: '',
      accountNumber: '',
      accountName: '',
      twoFactorCode: '',
    },
  });

  const onSubmit = async (data: WithdrawCommissionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Withdrawal Requested",
        description: `Your withdrawal request for ₦${data.amount.toLocaleString()} has been submitted and will be processed within 24 hours.`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to process withdrawal request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nigerianBanks = [
    'Access Bank',
    'Zenith Bank',
    'GTBank',
    'First Bank',
    'UBA',
    'Fidelity Bank',
    'Sterling Bank',
    'Union Bank',
    'Ecobank',
    'FCMB',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Banknote className="w-6 h-6 mr-2" />
          Withdraw Commission
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Minimum Withdrawal:</strong> ₦5,000. Withdrawals are processed within 24 hours.
            Ensure your account details are correct to avoid delays.
          </AlertDescription>
        </Alert>

        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Available Commission</h3>
          <p className="text-2xl font-bold text-primary">₦45,230.00</p>
          <p className="text-sm text-muted-foreground mt-1">Pending: ₦8,500.00</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">₦</span>
                      <Input
                        type="number"
                        placeholder="5000"
                        className="pl-8"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nigerianBanks.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0123456789"
                        maxLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Account holder name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twoFactorCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    2FA Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit 2FA code"
                      maxLength={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full btn-primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <Banknote className="w-4 h-4 mr-2" />
                  Withdraw Commission
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
