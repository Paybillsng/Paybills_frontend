import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Gift, 
  Copy, 
  Share2, 
  Trophy,
  Star,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Referral() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode || 'PAY123456';
  const referralLink = `https://paybills.ng/register?ref=${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Paybills.ng',
        text: 'Join me on Paybills.ng for easy bill payments and earn rewards!',
        url: referralLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const referralStats = {
    totalReferrals: 12,
    totalEarnings: 15430,
    thisMonth: 2340,
    pendingRewards: 500,
  };

  const recentReferrals = [
    { name: 'John Doe', date: '2024-01-15', status: 'completed', reward: 500 },
    { name: 'Jane Smith', date: '2024-01-12', status: 'completed', reward: 500 },
    { name: 'Mike Johnson', date: '2024-01-10', status: 'pending', reward: 500 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Refer & Earn</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Invite friends to Paybills.ng and earn ₦500 for each successful referral
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Referrals</h3>
              <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Earnings</h3>
              <p className="text-2xl font-bold text-success">{formatCurrency(referralStats.totalEarnings)}</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">This Month</h3>
              <p className="text-2xl font-bold text-warning">{formatCurrency(referralStats.thisMonth)}</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending Rewards</h3>
              <p className="text-2xl font-bold text-blue-500">{formatCurrency(referralStats.pendingRewards)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Your Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Referral Code</label>
                <div className="flex">
                  <Input
                    value={referralCode}
                    readOnly
                    className="font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={handleCopyCode}
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Referral Link</label>
                <div className="flex">
                  <Input
                    value={referralLink}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleShare} className="w-full btn-primary">
                <Share2 className="w-4 h-4 mr-2" />
                Share Referral Link
              </Button>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Share Your Code</h4>
                    <p className="text-sm text-muted-foreground">Send your referral code or link to friends and family</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">They Sign Up</h4>
                    <p className="text-sm text-muted-foreground">Your friend creates an account using your referral code</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">First Transaction</h4>
                    <p className="text-sm text-muted-foreground">They complete their first transaction of ₦1,000 or more</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium">Earn Rewards</h4>
                    <p className="text-sm text-muted-foreground">You both earn ₦500 credited to your wallets</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {recentReferrals.length > 0 ? (
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Referred on {new Date(referral.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(referral.reward)}</p>
                      <Badge 
                        variant={referral.status === 'completed' ? 'default' : 'secondary'}
                        className={referral.status === 'completed' ? 'bg-success text-white' : ''}
                      >
                        {referral.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start referring friends to earn rewards!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
