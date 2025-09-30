import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gift, 
  Users, 
  DollarSign, 
  Share2, 
  Copy, 
  Star,
  TrendingUp,
  Award,
  Wallet,
  RefreshCw
} from 'lucide-react';

interface CashbackTier {
  name: string;
  rate: number;
  minAmount: number;
  color: string;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  thisMonthEarnings: number;
}

interface CashbackTransaction {
  id: string;
  date: Date;
  service: string;
  amount: number;
  cashback: number;
  rate: number;
}

const cashbackTiers: CashbackTier[] = [
  { name: 'Bronze', rate: 1, minAmount: 0, color: 'bg-orange-100 text-orange-800' },
  { name: 'Silver', rate: 2, minAmount: 50000, color: 'bg-gray-100 text-gray-800' },
  { name: 'Gold', rate: 3, minAmount: 200000, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Platinum', rate: 5, minAmount: 500000, color: 'bg-purple-100 text-purple-800' }
];

export default function CashbackReferralSystem() {
  const [activeTab, setActiveTab] = useState<'cashback' | 'referral'>('cashback');
  const [userTier, setUserTier] = useState(0);
  const [monthlySpent, setMonthlySpent] = useState(125000);
  const [referralCode, setReferralCode] = useState('PAYBILLS-USER123');
  const [copied, setCopied] = useState(false);
  
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 45000,
    pendingEarnings: 5000,
    thisMonthEarnings: 12500
  });

  const [recentCashbacks, setRecentCashbacks] = useState<CashbackTransaction[]>([
    {
      id: '1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      service: 'DSTV Premium',
      amount: 15000,
      cashback: 450,
      rate: 3
    },
    {
      id: '2', 
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      service: 'Electricity Bill',
      amount: 25000,
      cashback: 750,
      rate: 3
    },
    {
      id: '3',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      service: 'Airtime Purchase',
      amount: 5000,
      cashback: 150,
      rate: 3
    }
  ]);

  useEffect(() => {
    // Determine user tier based on monthly spending
    const tier = cashbackTiers.findIndex(tier => monthlySpent >= tier.minAmount);
    setUserTier(Math.max(0, tier));
  }, [monthlySpent]);

  const getCurrentTier = () => cashbackTiers[userTier];
  const getNextTier = () => cashbackTiers[userTier + 1];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Paybills.ng',
        text: `Use my referral code ${referralCode} to get started with Paybills.ng and earn cashback on all your payments!`,
        url: `https://paybills.ng/register?ref=${referralCode}`
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const progress = (monthlySpent / nextTier.minAmount) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <Button
          variant={activeTab === 'cashback' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('cashback')}
          className="flex-1"
        >
          <Gift className="w-4 h-4 mr-2" />
          Cashback
        </Button>
        <Button
          variant={activeTab === 'referral' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('referral')}
          className="flex-1"
        >
          <Users className="w-4 h-4 mr-2" />
          Referrals
        </Button>
      </div>

      {/* Cashback Tab */}
      {activeTab === 'cashback' && (
        <div className="space-y-6">
          
          {/* Current Tier Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Your Cashback Tier</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={getCurrentTier().color}>
                      {getCurrentTier().name} Tier
                    </Badge>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {getCurrentTier().rate}% Cashback
                    </p>
                    <p className="text-sm text-gray-600">
                      Monthly spent: {formatCurrency(monthlySpent)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Award className="w-12 h-12 text-yellow-500 ml-auto" />
                  </div>
                </div>

                {getNextTier() && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress to {getNextTier().name} Tier</span>
                      <span>{Math.round(getProgressToNextTier())}%</span>
                    </div>
                    <Progress value={getProgressToNextTier()} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Spend {formatCurrency(getNextTier().minAmount - monthlySpent)} more to unlock {getNextTier().rate}% cashback
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cashback Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Cashback Tiers</CardTitle>
              <p className="text-gray-600">Higher spending unlocks better cashback rates</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cashbackTiers.map((tier, index) => (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      index === userTier 
                        ? 'border-green-500 bg-green-50 dark:bg-green-950' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <Badge className={tier.color}>
                        {tier.name}
                      </Badge>
                      <p className="text-2xl font-bold mt-2">{tier.rate}%</p>
                      <p className="text-sm text-gray-600">
                        Min: {formatCurrency(tier.minAmount)}
                      </p>
                      {index === userTier && (
                        <Badge className="mt-2 bg-green-600 text-white">
                          Current Tier
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Cashbacks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Cashbacks</span>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCashbacks.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.service}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.date.toLocaleDateString()} • {transaction.rate}% cashback
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +{formatCurrency(transaction.cashback)}
                      </p>
                      <p className="text-sm text-gray-600">
                        on {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Referral Tab */}
      {activeTab === 'referral' && (
        <div className="space-y-6">
          
          {/* Referral Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
                    <p className="text-sm text-gray-600">Total Referrals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{referralStats.activeReferrals}</p>
                    <p className="text-sm text-gray-600">Active This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(referralStats.totalEarnings)}</p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(referralStats.pendingEarnings)}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Code Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Referral Code</CardTitle>
              <p className="text-gray-600">
                Earn ₦500 for every friend who joins and makes their first transaction
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    value={referralCode} 
                    readOnly 
                    className="flex-1 font-mono"
                  />
                  <Button 
                    variant="outline" 
                    onClick={copyReferralCode}
                    className="flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </Button>
                  <Button 
                    onClick={shareReferralCode}
                    className="flex items-center space-x-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Referral Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• You earn ₦500 when your friend joins</li>
                    <li>• Your friend gets ₦100 welcome bonus</li>
                    <li>• Earn 2% commission on their transactions for 3 months</li>
                    <li>• Both get exclusive access to special promotions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>This Month's Top Referrers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Adebayo J.', referrals: 25, earnings: 18500 },
                  { name: 'Funmi A.', referrals: 18, earnings: 13200 },
                  { name: 'Chidi O.', referrals: 15, earnings: 10800 },
                  { name: 'You', referrals: referralStats.activeReferrals, earnings: referralStats.thisMonthEarnings },
                  { name: 'Kemi L.', referrals: 7, earnings: 5100 }
                ].map((user, index) => (
                  <div 
                    key={user.name} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-green-50 dark:bg-green-950 border border-green-200' : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.referrals} referrals</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">
                      {formatCurrency(user.earnings)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}