import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Smartphone } from 'lucide-react';
import { airtimeSchema, dataSchema } from '@/lib/validation';
import { networkProviders, dataPlans } from '@/lib/mockData';
import { UnifiedPaymentModal } from '@/components/UnifiedPaymentModal';
import { useToast } from '@/hooks/use-toast';

interface AirtimeDataFormData {
  serviceType: 'airtime' | 'data';
  network: string;
  phoneNumber: string;
  amount?: number;
  plan?: string;
}

export function AirtimeDataForm() {
  const [serviceType, setServiceType] = useState<'airtime' | 'data'>('airtime');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<AirtimeDataFormData>({
    resolver: yupResolver(serviceType === 'airtime' ? airtimeSchema : dataSchema),
    defaultValues: {
      serviceType: 'airtime',
      network: '',
      phoneNumber: '',
      amount: undefined,
      plan: undefined,
    },
  });

  const selectedNetwork = form.watch('network');
  const availablePlans = dataPlans.filter(plan => plan.provider === selectedNetwork);

  const onSubmit = async (data: AirtimeDataFormData) => {
    try {
      const selectedPlan = data.serviceType === 'data' ? availablePlans.find(p => p.id === data.plan) : null;
      const amount = data.serviceType === 'airtime' ? data.amount! : selectedPlan?.price || 0;
      const networkName = networkProviders.find(n => n.code === data.network)?.name || data.network;

      setPaymentData({
        amount,
        description: `${data.serviceType === 'airtime' ? 'Airtime' : 'Data'} purchase for ${data.phoneNumber}`,
        service: 'Airtime & Data',
        metadata: {
          serviceType: data.serviceType,
          network: data.network,
          networkName,
          phoneNumber: data.phoneNumber,
          plan: selectedPlan ? { id: selectedPlan.id, name: selectedPlan.name, size: selectedPlan.size } : null
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
      description: `Your ${serviceType} purchase has been processed. Order ID: ${orderId}`,
      variant: "default",
    });
    form.reset();
    setShowPaymentModal(false);
    setPaymentData(null);
  };

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Smartphone className="w-6 h-6 mr-2" />
          Buy Airtime & Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Type Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={serviceType === 'airtime' ? 'default' : 'outline'}
                  onClick={() => {
                    setServiceType('airtime');
                    form.setValue('serviceType', 'airtime');
                  }}
                  className="w-full"
                >
                  Airtime
                </Button>
                <Button
                  type="button"
                  variant={serviceType === 'data' ? 'default' : 'outline'}
                  onClick={() => {
                    setServiceType('data');
                    form.setValue('serviceType', 'data');
                  }}
                  className="w-full"
                >
                  Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Network */}
              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {networkProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.code}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="08012345678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {serviceType === 'airtime' && (
              <>
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
                            placeholder="1000"
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

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quick Select</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => form.setValue('amount', amount)}
                        className="text-xs p-2"
                      >
                        ₦{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {serviceType === 'data' && selectedNetwork && (
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Data Plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availablePlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - ₦{plan.price} ({plan.validity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Purchase {serviceType === 'airtime' ? 'Airtime' : 'Data'}
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
