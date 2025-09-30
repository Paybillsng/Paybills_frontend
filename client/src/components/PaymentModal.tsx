import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import { paymentService } from '@/lib/paymentProviders';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  metadata?: Record<string, any>;
  onSuccess?: (transactionRef: string) => void;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  description, 
  metadata,
  onSuccess 
}: PaymentModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [email, setEmail] = useState('user@example.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [showPaymentLink, setShowPaymentLink] = useState(false);

  const paymentProviders = [
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Pay with cards, bank transfer, USSD',
      icon: CreditCard,
      fees: '1.5% + NGN 15',
      isAvailable: true,
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Multiple payment options',
      icon: Smartphone,
      fees: '1.4% + NGN 20',
      isAvailable: true,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handlePayment = async () => {
    if (!selectedProvider) {
      toast({
        title: "Provider Required",
        description: "Please select a payment provider",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const reference = `PB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const paymentData = {
        email,
        amount,
        currency: 'NGN',
        reference,
        callback_url: `${window.location.origin}/payment/callback`,
        metadata: {
          ...metadata,
          description,
          user_id: 'demo-user-id', // This would come from auth context
        },
      };

      const response = await paymentService.initializePayment(selectedProvider, paymentData);

      if (response.status) {
        setPaymentUrl(response.data.authorization_url);
        setShowPaymentLink(true);
        
        toast({
          title: "Payment Initialized",
          description: "Click the payment link to complete your transaction",
        });

        // In a real app, you would redirect to the payment URL
        // window.location.href = response.data.authorization_url;
        
        // For demo purposes, simulate success after 3 seconds
        setTimeout(() => {
          onSuccess?.(reference);
          setIsProcessing(false);
          setShowPaymentLink(false);
          onClose();
          
          toast({
            title: "Payment Successful",
            description: `Your payment of ${formatCurrency(amount)} was successful`,
          });
        }, 3000);
        
      } else {
        throw new Error(response.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Payment initialization failed",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const selectedProviderData = paymentProviders.find(p => p.id === selectedProvider);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            {t('Complete Payment')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-semibold">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Description</span>
              <span className="text-sm">{description}</span>
            </div>
          </div>

          {!showPaymentLink ? (
            <>
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              {/* Payment Provider Selection */}
              <div className="space-y-2">
                <Label>Select Payment Method</Label>
                <div className="space-y-2">
                  {paymentProviders.map((provider) => {
                    const Icon = provider.icon;
                    return (
                      <div
                        key={provider.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedProvider === provider.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        } ${!provider.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => provider.isAvailable && setSelectedProvider(provider.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <div>
                              <h4 className="font-medium">{provider.name}</h4>
                              <p className="text-sm text-muted-foreground">{provider.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-xs">
                              {provider.fees}
                            </Badge>
                            {!provider.isAvailable && (
                              <Badge variant="destructive" className="text-xs ml-1">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fee Information */}
              {selectedProviderData && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Transaction fee: {selectedProviderData.fees} will be charged by {selectedProviderData.name}
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            /* Payment Link Display */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Link Generated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click the link below to complete your payment securely
                </p>
                <Button
                  onClick={() => window.open(paymentUrl, '_blank')}
                  className="w-full"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Open Payment Page
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
            {!showPaymentLink && (
              <Button
                onClick={handlePayment}
                disabled={!selectedProvider || isProcessing}
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}