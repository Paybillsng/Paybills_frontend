import React, { useState } from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { UnifiedPaymentModal } from '@/components/UnifiedPaymentModal';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Trophy, 
  DollarSign, 
  Calendar, 
  Clock,
  Search,
  Star,
  TrendingUp,
  Zap,

  Target,
  AlertTriangle,
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle
} from 'lucide-react';

export default function Betting() {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const { toast } = useToast();

  const bettingPlatforms = [
    {
      id: 'bet9ja',
      name: 'Bet9ja',
      icon: '🎲',
      minAmount: 100,
      maxAmount: 500000,
      fee: '₦50',
      popular: true,
      description: 'Nigeria\'s premier sports betting platform'
    },
    {
      id: 'sportybet',
      name: 'SportyBet',
      icon: '⚽',
      minAmount: 100,
      maxAmount: 1000000,
      fee: '₦50',
      popular: true,
      description: 'Fast and reliable sports betting'
    },
    {
      id: 'nairabit',
      name: 'NairaBet',
      icon: '🏆',
      minAmount: 100,
      maxAmount: 500000,
      fee: '₦30',
      popular: false,
      description: 'Local favorite with great odds'
    },
    {
      id: '1xbet',
      name: '1xBet',
      icon: '🎯',
      minAmount: 200,
      maxAmount: 2000000,
      fee: '₦75',
      popular: true,
      description: 'International betting with diverse options'
    },
    {
      id: 'betking',
      name: 'BetKing',
      icon: '👑',
      minAmount: 100,
      maxAmount: 500000,
      fee: '₦40',
      popular: false,
      description: 'King of Nigerian betting'
    },
    {
      id: 'betway',
      name: 'Betway',
      icon: '🌟',
      minAmount: 100,
      maxAmount: 1000000,
      fee: '₦60',
      popular: true,
      description: 'Global betting excellence'
    }
  ];

  const filteredPlatforms = bettingPlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlatform || !amount || !username) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedPlatformData = filteredPlatforms.find(p => p.id === selectedPlatform);
    const fee = parseInt(selectedPlatformData?.fee.replace('₦', '') || '0');
    const totalAmount = parseInt(amount) + fee;

    setPaymentData({
      amount: totalAmount,
      description: `Betting wallet funding for ${selectedPlatformData?.name} - ${username}`,
      service: 'Betting',
      metadata: {
        platform: selectedPlatform,
        platformName: selectedPlatformData?.name,
        username,
        baseAmount: parseInt(amount),
        serviceFee: fee
      }
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (orderId: string) => {
    toast({
      title: "Payment Successful!",
      description: `Your betting wallet has been funded. Order ID: ${orderId}`,
      variant: "default",
    });
    setAmount('');
    setUsername('');
    setSelectedPlatform('');
    setShowPaymentModal(false);
    setPaymentData(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Betting Wallet Funding
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Fund your betting accounts instantly across Nigeria's top betting platforms
              </p>
            </div>

            {/* Age Warning */}
            <Alert className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Age Restriction:</strong> You must be 18+ to use betting services. 
                Gambling can be addictive - please gamble responsibly.
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Platform Selection */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Search */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-green-600" />
                      <span>Search Betting Platforms</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search for betting platforms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredPlatforms.map((platform) => (
                    <Card
                      key={platform.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlatform === platform.id
                          ? 'ring-2 ring-green-500 border-green-500 bg-green-50 dark:bg-green-950'
                          : 'hover:border-green-300'
                      }`}
                      onClick={() => setSelectedPlatform(platform.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{platform.icon}</div>
                            <div>
                              <h3 className="font-semibold text-lg">{platform.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {platform.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            {platform.popular && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Popular
                              </Badge>
                            )}
                            {selectedPlatform === platform.id && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Min Amount:</span>
                            <span className="font-medium">{formatCurrency(platform.minAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Max Amount:</span>
                            <span className="font-medium">{formatCurrency(platform.maxAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Service Fee:</span>
                            <span className="font-medium text-green-600">{platform.fee}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPlatforms.length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No platforms found</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try adjusting your search terms
                    </p>
                  </div>
                )}
              </div>

              {/* Funding Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <span>Fund Wallet</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="platform">Selected Platform</Label>
                        <Input
                          id="platform"
                          value={selectedPlatform ? filteredPlatforms.find(p => p.id === selectedPlatform)?.name : ''}
                          placeholder="Select a platform first"
                          readOnly
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>

                      <div>
                        <Label htmlFor="username">Betting Username/ID</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your betting username"
                          required
                          disabled={!selectedPlatform}
                        />
                      </div>

                      <div>
                        <Label htmlFor="amount">Amount (₦)</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          required
                          disabled={!selectedPlatform}
                          min={selectedPlatform ? filteredPlatforms.find(p => p.id === selectedPlatform)?.minAmount : 100}
                          max={selectedPlatform ? filteredPlatforms.find(p => p.id === selectedPlatform)?.maxAmount : 1000000}
                        />
                        {selectedPlatform && (
                          <p className="text-xs text-gray-500 mt-1">
                            Min: {formatCurrency(filteredPlatforms.find(p => p.id === selectedPlatform)?.minAmount || 100)} | 
                            Max: {formatCurrency(filteredPlatforms.find(p => p.id === selectedPlatform)?.maxAmount || 1000000)}
                          </p>
                        )}
                      </div>

                      {selectedPlatform && amount && (
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                            Transaction Summary
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span>{formatCurrency(parseInt(amount) || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Service Fee:</span>
                              <span>{filteredPlatforms.find(p => p.id === selectedPlatform)?.fee}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-2 border-t border-green-200 dark:border-green-800">
                              <span>Total:</span>
                              <span>{formatCurrency((parseInt(amount) || 0) + parseInt(filteredPlatforms.find(p => p.id === selectedPlatform)?.fee.replace('₦', '') || '0'))}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!selectedPlatform || !amount || !username}
                      >
                        Fund Wallet
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Betting History
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Responsible Gambling
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Star className="w-4 h-4 mr-2" />
                      Rate Platforms
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Responsible Gambling Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Responsible Gambling</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">Safety Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Only bet what you can afford to lose</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Set daily/weekly spending limits</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Take regular breaks from betting</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Never chase your losses</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">Get Help</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                        <p className="font-medium text-blue-800 dark:text-blue-200">24/7 Help Line</p>
                        <p className="text-blue-600 dark:text-blue-300">Call: 0800-HELP-NOW (Free)</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                        <p className="font-medium text-purple-800 dark:text-purple-200">Online Support</p>
                        <p className="text-purple-600 dark:text-purple-300">Visit: responsiblegambling.ng</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                        <p className="font-medium text-orange-800 dark:text-orange-200">Self-Exclusion</p>
                        <p className="text-orange-600 dark:text-orange-300">Tools available for self-control</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
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
      
      <Footer />
    </div>
  );
}