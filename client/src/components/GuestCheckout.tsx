import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Wallet, 
  Bitcoin, 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  ExternalLink,
  Copy,
  QrCode,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

interface GuestInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface GuestCheckoutProps {
  cartItems: CartItem[];
  total: number;
  guestInfo: GuestInfo;
  setGuestInfo: (info: GuestInfo) => void;
  onClose: () => void;
  onOrderComplete: (orderId: string) => void;
}

export default function GuestCheckout({ 
  cartItems, 
  total, 
  guestInfo, 
  setGuestInfo, 
  onClose,
  onOrderComplete 
}: GuestCheckoutProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [exchangeRates, setExchangeRates] = useState({
    usd_ngn: 1650,
    btc_usd: 65000,
    eth_usd: 2850,
    usdt_usd: 1.0,
    pi_usd: 0.4
  });
  const [ratesLoading, setRatesLoading] = useState(false);
  const { toast } = useToast();

  // Mock crypto addresses for demo
  const cryptoAddresses = {
    bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereum: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_ethereum: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_tron: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    usdt_bsc: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_polygon: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_avalanche: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_arbitrum: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_optimism: '0x742d35cc6b7c0532356b2c1f2d35cd1e2a233d3b',
    usdt_solana: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    pi: 'GCKFBEIYTKQZC6IFRSLK7KUFQMJ4W7B2TXUQ5B3RFBDTQWGUVLZF3CKE'
  };

  const usdtNetworks = [
    { id: 'ethereum', name: 'Ethereum (ERC-20)', fee: 'High', time: '2-5 min' },
    { id: 'tron', name: 'Tron (TRC-20)', fee: 'Low', time: '1-3 min' },
    { id: 'bsc', name: 'BNB Smart Chain (BEP-20)', fee: 'Low', time: '1-3 min' },
    { id: 'polygon', name: 'Polygon (MATIC)', fee: 'Very Low', time: '1-2 min' },
    { id: 'avalanche', name: 'Avalanche (AVAX-C)', fee: 'Low', time: '1-3 min' },
    { id: 'arbitrum', name: 'Arbitrum One', fee: 'Low', time: '1-5 min' },
    { id: 'optimism', name: 'Optimism', fee: 'Low', time: '1-5 min' },
    { id: 'solana', name: 'Solana (SPL)', fee: 'Very Low', time: '30s-2 min' }
  ];

  // Fetch live exchange rates
  const fetchExchangeRates = async () => {
    setRatesLoading(true);
    try {
      // In a real implementation, you would use multiple API sources for redundancy
      const responses = await Promise.allSettled([
        // Free tier APIs for crypto prices
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,pi&vs_currencies=usd'),
        fetch('https://api.exchangerate-api.com/v4/latest/USD') // For USD/NGN rate
      ]);

      let newRates = { ...exchangeRates };

      // Process crypto prices
      if (responses[0].status === 'fulfilled') {
        const cryptoData = await responses[0].value.json();
        if (cryptoData.bitcoin?.usd) newRates.btc_usd = cryptoData.bitcoin.usd;
        if (cryptoData.ethereum?.usd) newRates.eth_usd = cryptoData.ethereum.usd;
        if (cryptoData.tether?.usd) newRates.usdt_usd = cryptoData.tether.usd;
        if (cryptoData.pi?.usd) newRates.pi_usd = cryptoData.pi.usd;
      }

      // Process USD/NGN rate - fallback to 1650 if API fails
      if (responses[1].status === 'fulfilled') {
        const fxData = await responses[1].value.json();
        if (fxData.rates?.NGN) {
          newRates.usd_ngn = fxData.rates.NGN;
        }
      }

      setExchangeRates(newRates);
      
      // Rates updated silently in background
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      toast({
        title: "Rate Update Failed",
        description: "Using cached rates. Manual refresh recommended.",
        variant: "destructive",
      });
    } finally {
      setRatesLoading(false);
    }
  };

  // Auto-fetch rates on component mount
  React.useEffect(() => {
    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleGuestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestInfo.email || !guestInfo.firstName || !guestInfo.lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'paystack') {
        // Initialize Paystack payment
        const paystackData = {
          email: guestInfo.email,
          amount: total * 100, // Paystack expects amount in kobo
          currency: 'NGN',
          reference: 'PSK-' + Date.now(),
          customer: {
            email: guestInfo.email,
            first_name: guestInfo.firstName,
            last_name: guestInfo.lastName,
            phone: guestInfo.phone
          },
          metadata: {
            cart_items: cartItems,
            payment_method: 'paystack'
          }
        };

        // In a real implementation, you would call your backend to initialize Paystack
        // For demo purposes, we'll simulate the process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Paystack Payment Initialized",
          description: "Redirecting to Paystack payment page...",
          variant: "default",
        });
        
        // Simulate successful payment
        setTimeout(() => {
          const orderId = 'PSK-' + Date.now();
          onOrderComplete(orderId);
        }, 1000);
        
      } else {
        // Crypto or Pi Network payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const orderId = (paymentMethod === 'pi' ? 'PI-' : 'CRYPTO-') + Date.now();
        
        toast({
          title: "Payment Confirmed!",
          description: `${paymentMethod === 'pi' ? 'Pi Network' : 'Cryptocurrency'} payment received. Order ID: ${orderId}`,
          variant: "default",
        });
        
        onOrderComplete(orderId);
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Address copied successfully",
      variant: "default",
    });
  };

  const formatTotal = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCryptoEquivalent = (ngnAmount: number) => {
    // Convert NGN to USD first
    const usdAmount = ngnAmount / exchangeRates.usd_ngn;
    
    // Then convert USD to selected cryptocurrency
    const rates = {
      bitcoin: usdAmount / exchangeRates.btc_usd,
      ethereum: usdAmount / exchangeRates.eth_usd, 
      usdt: usdAmount / exchangeRates.usdt_usd,
      pi: usdAmount / exchangeRates.pi_usd
    };
    
    const amount = rates[selectedCrypto as keyof typeof rates] || 0;
    return selectedCrypto === 'usdt' ? amount.toFixed(2) : amount.toFixed(6);
  };

  const getCurrentAddress = () => {
    if (selectedCrypto === 'usdt') {
      return cryptoAddresses[`usdt_${selectedNetwork}` as keyof typeof cryptoAddresses];
    }
    return cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses];
  };

  const getNetworkFeeColor = (fee: string) => {
    switch (fee) {
      case 'Very Low': return 'text-green-600';
      case 'Low': return 'text-green-500';
      case 'High': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-2xl font-bold">Guest Checkout</h2>
            </div>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of 2
            </Badge>
          </div>

          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Guest Information Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    We'll send your software keys to this email address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGuestInfoSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={guestInfo.firstName}
                          onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={guestInfo.lastName}
                          onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{item.price}</p>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-lg font-bold text-primary">
                          {formatTotal(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="paystack" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Card/Bank
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex items-center gap-2">
                        <Bitcoin className="w-4 h-4" />
                        Crypto
                      </TabsTrigger>
                      <TabsTrigger value="pi" className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Pi Network
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="paystack" className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">Paystack Payment</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Pay with cards, bank transfer, or USSD
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span>Amount (NGN):</span>
                            <span className="font-bold">{formatTotal(total)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>USD Equivalent:</span>
                            <span>${(total / exchangeRates.usd_ngn).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Exchange Rate:</span>
                            <span>₦{exchangeRates.usd_ngn.toLocaleString()}/USD</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                            <CreditCard className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                            <div className="text-xs">Debit/Credit Cards</div>
                          </div>
                          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                            <DollarSign className="w-6 h-6 mx-auto mb-1 text-green-500" />
                            <div className="text-xs">Bank Transfer</div>
                          </div>
                        </div>

                        <div className="text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 p-3 rounded">
                          <div className="font-medium mb-1">Secure Nigerian Payment</div>
                          <div>Powered by Paystack • Instant delivery • NGN transactions</div>
                        </div>


                      </div>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4">
                      <div className="space-y-3">
                        <Label>Select Cryptocurrency</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={selectedCrypto === 'bitcoin' ? 'default' : 'outline'}
                            onClick={() => setSelectedCrypto('bitcoin')}
                            className="flex items-center gap-2"
                          >
                            <Bitcoin className="w-4 h-4" />
                            Bitcoin
                          </Button>
                          <Button
                            variant={selectedCrypto === 'ethereum' ? 'default' : 'outline'}
                            onClick={() => setSelectedCrypto('ethereum')}
                            className="flex items-center gap-2"
                          >
                            <div className="w-4 h-4 bg-blue-500 rounded-full" />
                            Ethereum
                          </Button>
                          <Button
                            variant={selectedCrypto === 'usdt' ? 'default' : 'outline'}
                            onClick={() => setSelectedCrypto('usdt')}
                            className="flex items-center gap-2 col-span-2"
                          >
                            <div className="w-4 h-4 bg-green-500 rounded-full" />
                            USDT (Tether)
                          </Button>
                        </div>
                      </div>

                      {/* USDT Network Selection */}
                      {selectedCrypto === 'usdt' && (
                        <div className="space-y-3">
                          <Label>Select USDT Network</Label>
                          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                            {usdtNetworks.map((network) => (
                              <Button
                                key={network.id}
                                variant={selectedNetwork === network.id ? 'default' : 'outline'}
                                onClick={() => setSelectedNetwork(network.id)}
                                className="flex items-center justify-between p-3 h-auto"
                              >
                                <div className="text-left">
                                  <div className="font-medium">{network.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Fee: <span className={getNetworkFeeColor(network.fee)}>{network.fee}</span> • 
                                    Time: {network.time}
                                  </div>
                                </div>
                                {selectedNetwork === network.id && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">Amount to Send:</span>
                          <span className="font-bold">
                            {getCryptoEquivalent(total)} {selectedCrypto === 'usdt' ? 'USDT' : selectedCrypto.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">NGN Equivalent:</span>
                          <span className="text-sm">{formatTotal(total)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-gray-500">USD Equivalent:</span>
                          <span className="text-xs">${(total / exchangeRates.usd_ngn).toFixed(2)}</span>
                        </div>
                        


                        {selectedCrypto === 'usdt' && (
                          <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                            <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Network: {usdtNetworks.find(n => n.id === selectedNetwork)?.name}
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              Fee: <span className={getNetworkFeeColor(
                                usdtNetworks.find(n => n.id === selectedNetwork)?.fee || 'Low'
                              )}>
                                {usdtNetworks.find(n => n.id === selectedNetwork)?.fee}
                              </span> • 
                              Est. Time: {usdtNetworks.find(n => n.id === selectedNetwork)?.time}
                            </div>
                          </div>
                        )}
                        
                        <Label className="text-sm">Send to this address:</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            value={getCurrentAddress()}
                            readOnly
                            className="text-xs font-mono"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard(getCurrentAddress())}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>

                        {selectedCrypto === 'usdt' && (
                          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">
                              <strong>Important:</strong> Only send USDT tokens on the {usdtNetworks.find(n => n.id === selectedNetwork)?.name} network. 
                              Sending on the wrong network will result in permanent loss of funds.
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="pi" className="space-y-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">π</span>
                          </div>
                          <div>
                            <h3 className="font-medium">Pi Network Payment</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Pay with Pi cryptocurrency
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className="font-bold">{getCryptoEquivalent(total)} PI</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>NGN Equivalent:</span>
                            <span>{formatTotal(total)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>USD Equivalent:</span>
                            <span>${(total / exchangeRates.usd_ngn).toFixed(2)}</span>
                          </div>
                        </div>



                        <div className="mt-3">
                          <Label className="text-sm">Pi Wallet Address:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={cryptoAddresses.pi}
                              readOnly
                              className="text-xs font-mono"
                            />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => copyToClipboard(cryptoAddresses.pi)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-200 dark:border-purple-800">
                          <div className="text-sm text-purple-700 dark:text-purple-300">
                            <strong>Note:</strong> Pi Network transactions are processed through the Pi blockchain. 
                            Ensure your Pi Wallet app is updated and connected to mainnet.
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-700 dark:text-blue-300">Secure Payment</p>
                        <p className="text-blue-600 dark:text-blue-400">
                          Your payment is secured by blockchain technology. 
                          Software keys will be delivered instantly to your email.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {paymentMethod === 'paystack' ? 'Initializing Paystack...' : 
                         paymentMethod === 'pi' ? 'Processing Pi Payment...' : 
                         'Processing Crypto Payment...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {paymentMethod === 'paystack' ? 'Pay with Paystack' : 
                         paymentMethod === 'pi' ? 'Pay with Pi Network' : 
                         'Confirm Crypto Payment'}
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Customer Information Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>Review your details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Name:</Label>
                    <p className="font-medium">{guestInfo.firstName} {guestInfo.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Email:</Label>
                    <p className="font-medium">{guestInfo.email}</p>
                  </div>
                  {guestInfo.phone && (
                    <div>
                      <Label className="text-sm text-gray-600">Phone:</Label>
                      <p className="font-medium">{guestInfo.phone}</p>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-4">
                    <Label className="text-sm text-gray-600">Order Total:</Label>
                    <p className="text-xl font-bold text-primary">{formatTotal(total)}</p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Edit Information
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}