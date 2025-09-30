import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PaymentModal } from '@/components/PaymentModal';
import { useTranslation } from 'react-i18next';
import { 
  Wallet, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Smartphone, 
  Wifi, 
  Zap, 
  Plus,
  ArrowRight,
  Eye,
  EyeOff,
  CreditCard
} from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Dashboard() {
  const { t } = useTranslation();
  const [showBalance, setShowBalance] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock data for demo
  const wallet = { balance: 15750.50, totalEarnings: 45230.75, totalSpent: 29480.25 };
  const transactions = [
    { id: '1', type: 'airtime', provider: 'MTN', amount: 1500, status: 'success', date: '2025-01-24' },
    { id: '2', type: 'electricity', provider: 'EKEDC', amount: 5000, status: 'success', date: '2025-01-23' },
    { id: '3', type: 'data', provider: 'Airtel', amount: 2500, status: 'pending', date: '2025-01-23' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const recentTransactions = transactions.slice(0, 3);
  const successRate = transactions.length > 0 
    ? (transactions.filter(t => t.status === 'success').length / transactions.length) * 100 
    : 100;

  const spendingData = [
    { category: 'Airtime & Data', percentage: 45, color: 'bg-primary' },
    { category: 'Utilities', percentage: 35, color: 'bg-warning' },
    { category: 'Education', percentage: 20, color: 'bg-success' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <Card className="fintech-gradient text-white border-none">
          <CardContent className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getGreeting()}, Demo User!
            </h1>
            <p className="text-blue-100">
              Here's what's happening with your account today.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Wallet Balance */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                aria-label="Toggle balance visibility"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('totalBalance')}</h3>
            <p className="text-2xl font-bold">
              {showBalance ? formatCurrency(wallet?.balance || 0) : '****'}
            </p>
            <p className="text-sm text-success mt-1">+₦2,500 this week</p>
          </CardContent>
        </Card>

        {/* Total Transactions */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('transactions')}</h3>
            <p className="text-2xl font-bold">{transactions.length}</p>
            <p className="text-sm text-primary mt-1">23 this month</p>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Success Rate</h3>
            <p className="text-2xl font-bold">{successRate.toFixed(1)}%</p>
            <p className="text-sm text-success mt-1">Excellent performance</p>
          </CardContent>
        </Card>

        {/* Referral Earnings */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[hsl(var(--gold))]" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Referral Earnings</h3>
            <p className="text-2xl font-bold">₦15,430</p>
            <p className="text-sm text-[hsl(var(--gold))] mt-1">12 referrals</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Link href="/transactions">
                  <Button variant="ghost" size="sm">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => {
                    const getIcon = (type: string) => {
                      switch (type) {
                        case 'airtime': return <Smartphone className="w-5 h-5 text-primary" />;
                        case 'data': return <Wifi className="w-5 h-5 text-primary" />;
                        case 'electricity': return <Zap className="w-5 h-5 text-warning" />;
                        default: return <Smartphone className="w-5 h-5 text-primary" />;
                      }
                    };

                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                            {getIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                          <Badge 
                            variant={transaction.status === 'success' ? 'default' : 'destructive'}
                            className={transaction.status === 'success' ? 'bg-success text-white' : ''}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No transactions yet</p>
                    <Link href="/services">
                      <Button className="mt-4">Make your first transaction</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Spending Chart */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/airtime-data">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary group"
                  >
                    <Smartphone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Buy Airtime</span>
                  </Button>
                </Link>
                <Link href="/airtime-data">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-success/5 hover:border-success group"
                  >
                    <Wifi className="w-6 h-6 text-success group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Buy Data</span>
                  </Button>
                </Link>
                <Link href="/utilities">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-warning/5 hover:border-warning group"
                  >
                    <Zap className="w-6 h-6 text-warning group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Pay Bills</span>
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue/5 hover:border-blue group"
                  >
                    <Plus className="w-6 h-6 text-[hsl(var(--blue))] group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Fund Wallet</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spendingData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
