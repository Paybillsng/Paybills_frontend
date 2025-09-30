import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dice6, AlertTriangle } from 'lucide-react';
import { bettingSchema } from '@/lib/validation';
import { bettingPlatforms } from '@/lib/mockData';
import { useWallet } from '@/hooks/useWallet';

interface BettingFormData {
  platform: string;
  username: string;
  amount: number;
  ageConfirmation: boolean;
}

export function BettingForm() {
  const [showAgeConfirmation, setShowAgeConfirmation] = useState(false);
  const { purchaseService, isLoading } = useWallet();

  const form = useForm<BettingFormData>({
    resolver: yupResolver(bettingSchema.extend({
      ageConfirmation: yup.boolean().oneOf([true], 'You must confirm you are 18 or older'),
    })),
    defaultValues: {
      platform: '',
      username: '',
      amount: undefined,
      ageConfirmation: false,
    },
  });

  const onSubmit = async (data: BettingFormData) => {
    if (!showAgeConfirmation) {
      setShowAgeConfirmation(true);
      return;
    }

    try {
      const serviceData = {
        type: 'betting',
        provider: data.platform,
        amount: data.amount,
        recipient: data.username,
        metadata: { 
          username: data.username,
          platform: data.platform 
        },
      };

      await purchaseService(serviceData);
      form.reset();
      setShowAgeConfirmation(false);
    } catch (error) {
      // Error handling is done in the useWallet hook
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Dice6 className="w-6 h-6 mr-2" />
          Fund Betting Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Age Restriction:</strong> You must be 18 years or older to use betting services.
            Gambling can be addictive. Please gamble responsibly.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform */}
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Betting Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bettingPlatforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.code}>
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Betting Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your betting username"
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

            {showAgeConfirmation && (
              <FormField
                control={form.control}
                name="ageConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm that I am 18 years of age or older and understand the risks of gambling.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full btn-error" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <Dice6 className="w-4 h-4 mr-2" />
                  {showAgeConfirmation ? 'Fund Wallet' : 'Continue'}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
