import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Zap } from 'lucide-react';
import { utilitySchema } from '@/lib/validation';
import { utilityProviders } from '@/lib/mockData';
import { UnifiedPaymentModal } from '@/components/UnifiedPaymentModal';
import { useToast } from '@/hooks/use-toast';

interface UtilityFormData {
  provider: string;
  accountNumber: string;
  amount: number;
}

export function UtilitiesForm() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<UtilityFormData>({
    resolver: yupResolver(utilitySchema),
    defaultValues: {
      provider: '',
      accountNumber: '',
      amount: undefined,
    },
  });

  const onSubmit = async (data: UtilityFormData) => {
    try {
      const selectedProvider = utilityProviders.find(p => p.code === data.provider);
      
      setPaymentData({
        amount: data.amount,
        description: `${selectedProvider?.name || data.provider} payment for ${data.accountNumber}`,
        service: 'Utility Bills',
        metadata: {
          provider: data.provider,
          providerName: selectedProvider?.name,
          accountNumber: data.accountNumber
        }
      });
      setShowPaymentModal(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please check your form data and try again",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    toast({
      title: "Payment Successful!",
      description: `Your utility bill payment has been processed. Order ID: ${orderId}`,
      variant: "default",
    });
    form.reset();
    setShowPaymentModal(false);
    setPaymentData(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="w-6 h-6 mr-2" />
          Pay Utility Bills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Provider */}
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utility Provider</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {utilityProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.code}>
                            {provider.name} ({provider.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Number */}
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account/Meter Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter account or meter number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
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

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Pay Bill
            </Button>
          </form>
        </Form>

        {paymentData && (
          <UnifiedPaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
            amount={paymentData.amount}
            description={paymentData.description}
            service={paymentData.service}
            metadata={paymentData.metadata}
          />
        )}
      </CardContent>
    </Card>
  );
}
