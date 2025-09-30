import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserCheck, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerOverrideData {
  customerPhone: string;
  isOverrideActive: boolean;
}

export function CustomerOverride() {
  const [isOverrideActive, setIsOverrideActive] = useState(false);
  const { toast } = useToast();

  const form = useForm<CustomerOverrideData>({
    defaultValues: {
      customerPhone: '',
      isOverrideActive: false,
    },
  });

  const onSubmit = async (data: CustomerOverrideData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsOverrideActive(data.isOverrideActive);
      
      toast({
        title: data.isOverrideActive ? "Override Activated" : "Override Deactivated",
        description: data.isOverrideActive 
          ? `You can now act on behalf of ${data.customerPhone}`
          : "Customer override has been deactivated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer override",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="w-6 h-6 mr-2" />
          Customer Override
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Agent Feature:</strong> This allows you to perform transactions on behalf of customers.
            Use this feature responsibly and only with customer consent.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+234 800 123 4567"
                      disabled={isOverrideActive}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isOverrideActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Act on behalf of customer
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Toggle to enable/disable customer override mode
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isOverrideActive && (
              <Alert className="bg-success/10 border-success">
                <UserCheck className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Override mode is active. You are now acting on behalf of{' '}
                  <strong>{form.watch('customerPhone')}</strong>
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Update Override
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
