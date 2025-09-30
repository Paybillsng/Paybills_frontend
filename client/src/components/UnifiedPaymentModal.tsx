import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Wallet, 
  Bitcoin, 
  Shield, 
  CheckCircle, 
  Copy,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';

interface UnifiedPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
  amount: number;
  description: string;
  service: string;
  metadata?: any;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
}

export function UnifiedPaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description,
  service,
  metadata = {},
  customerEmail = '',
  customerPhone = '',
  customerName = ''
}: UnifiedPaymentModalProps) {
  // Only show crypto options for software store
  const isSoftwareStore = service === 'Software' || service === 'Software Store' || service?.toLowerCase().includes('software');
  
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [isProcessing, setIsProcessing] = useState(false);
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
      const responses = await Promise.allSettled([
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,pi&vs_currencies=usd'),
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
      ]);

      let newRates = { ...exchangeRates };

      if (responses[0].status === 'fulfilled') {
        const cryptoData = await responses[0].value.json();
        if (cryptoData.bitcoin?.usd) newRates.btc_usd = cryptoData.bitcoin.usd;
        if (cryptoData.ethereum?.usd) newRates.eth_usd = cryptoData.ethereum.usd;
        if (cryptoData.tether?.usd) newRates.usdt_usd = cryptoData.tether.usd;
        if (cryptoData.pi?.usd) newRates.pi_usd = cryptoData.pi.usd;
      }

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
        description: "Using cached rates",
        variant: "destructive",
      });
    } finally {
      setRatesLoading(false);
    }
  };

  // Auto-fetch rates on component mount
  React.useEffect(() => {
    if (isOpen) {
      fetchExchangeRates();
    }
  }, [isOpen]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCryptoEquivalent = (ngnAmount: number) => {
    const usdAmount = ngnAmount / exchangeRates.usd_ngn;
    
    const rates = {
      bitcoin: usdAmount / exchangeRates.btc_usd,
      ethereum: usdAmount / exchangeRates.eth_usd, 
      usdt: usdAmount / exchangeRates.usdt_usd,
      pi: usdAmount / exchangeRates.pi_usd
    };
    
    const cryptoAmount = rates[selectedCrypto as keyof typeof rates] || 0;
    return selectedCrypto === 'usdt' ? cryptoAmount.toFixed(2) : cryptoAmount.toFixed(6);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'paystack') {
        // Initialize Paystack payment
        const paystackData = {
          email: customerEmail || 'user@example.com',
          amount: amount * 100, // Paystack expects amount in kobo
          currency: 'NGN',
          reference: `PSK_${service}_${Date.now()}`,
          customer: {
            email: customerEmail || 'user@example.com',
            name: customerName || 'Customer',
            phone: customerPhone || ''
          },
          metadata: {
            ...metadata,
            service,
            description,
            payment_method: 'paystack'
          }
        };

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: "Paystack Payment Initialized",
          description: "Redirecting to payment page...",
          variant: "default",
        });
        
        // Simulate successful payment
        setTimeout(() => {
          const orderId = `PSK_${service}_${Date.now()}`;
          onSuccess(orderId);
          onClose();
        }, 1000);
        
      } else {
        // Crypto or Pi Network payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const orderId = `${paymentMethod === 'pi' ? 'PI' : 'CRYPTO'}_${service}_${Date.now()}`;
        
        toast({
          title: "Payment Confirmed!",
          description: `${paymentMethod === 'pi' ? 'Pi Network' : 'Cryptocurrency'} payment received. Order ID: ${orderId}`,
          variant: "default",
        });
        
        onSuccess(orderId);
        onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Secure Payment
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Amount Summary */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(amount)}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Service: {service} • {description}
              </div>
            </div>

            {/* Payment Methods */}
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className={`grid w-full ${isSoftwareStore ? 'grid-cols-3' : 'grid-cols-1'}`}>
                <TabsTrigger value="paystack" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card/Bank
                </TabsTrigger>
                {isSoftwareStore && (
                  <TabsTrigger value="crypto" className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4" />
                    Crypto
                  </TabsTrigger>
                )}
                {isSoftwareStore && (
                  <TabsTrigger value="pi" className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Pi Network
                  </TabsTrigger>
                )}
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
                      <span className="font-bold">{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>USD Equivalent:</span>
                      <span>${(amount / exchangeRates.usd_ngn).toFixed(2)}</span>
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
                    <div>Powered by Paystack • Instant processing • NGN transactions</div>
                  </div>


                </div>
              </TabsContent>

              {isSoftwareStore && (
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
                      {getCryptoEquivalent(amount)} {selectedCrypto === 'usdt' ? 'USDT' : selectedCrypto.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">NGN Equivalent:</span>
                    <span className="text-sm">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">USD Equivalent:</span>
                    <span className="text-xs">${(amount / exchangeRates.usd_ngn).toFixed(2)}</span>
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
              )}

              {isSoftwareStore && (
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
                      <span className="font-bold">{getCryptoEquivalent(amount)} PI</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>NGN Equivalent:</span>
                      <span>{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>USD Equivalent:</span>
                      <span>${(amount / exchangeRates.usd_ngn).toFixed(2)}</span>
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
              )}
            </Tabs>

            {/* Payment Button */}
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}