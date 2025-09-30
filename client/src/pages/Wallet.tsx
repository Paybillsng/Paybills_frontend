import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet as WalletIcon, 
  Plus, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Smartphone,
  Building2,
  History
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { walletFundingSchema } from '@/lib/validation';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';

interface WalletFundingData {
  amount: number;
  method: string;
}

export default function Wallet() {
  const { wallet, transactions, fundWallet, isLoading } = useWallet();
  const [showBalance, setShowBalance] = useState(true);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);

  const form = useForm<WalletFundingData>({
    resolver: yupResolver(walletFundingSchema),
    defaultValues: {
      amount: undefined,
      method: '',
    },
  });

  const onSubmit = async (data: WalletFundingData) => {
    try {
      await fundWallet(data.amount, data.method);
      form.reset();
      setIsFundingModalOpen(false);
    } catch (error) {
      // Error handling is done in the useWallet hook
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const fundingMethods = [
    { value: 'bank', label: 'Bank Transfer', icon: Building2 },
    { value: 'card', label: 'Debit Card', icon: CreditCard },
    { value: 'ussd', label: 'USSD', icon: Smartphone },
  ];

  const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  const recentTransactions = transactions.slice(0, 5);

  if (isLoading && !wallet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton type="card" count={3} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your wallet balance and view transaction history</p>
          </div>
          
          <Dialog open={isFundingModalOpen} onOpenChange={setIsFundingModalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Fund Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Fund Your Wallet</DialogTitle>
                <DialogDescription>
                  Choose your preferred funding method and amount
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select funding method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fundingMethods.map((method) => {
                              const Icon = method.icon;
                              return (
                                <SelectItem key={method.value} value={method.value}>
                                  <div className="flex items-center">
                                    <Icon className="w-4 h-4 mr-2" />
                                    {method.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => form.setValue('amount', amount)}
                          className="text-xs"
                        >
                          ₦{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Fund Wallet
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-primary" />
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
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Available Balance</h3>
              <p className="text-4xl font-bold mb-4">
                {showBalance ? formatCurrency(wallet?.balance || 0) : '****'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-lg font-semibold text-success">
                    {showBalance ? formatCurrency(wallet?.totalEarnings || 0) : '****'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-semibold text-muted-foreground">
                    {showBalance ? formatCurrency(wallet?.totalSpent || 0) : '****'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">This Month</h3>
              <p className="text-2xl font-bold text-success mb-2">+₦15,430</p>
              <p className="text-sm text-muted-foreground">23 transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Wallet Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => {
                  const isCredit = transaction.type === 'wallet_funding';
                  const Icon = isCredit ? TrendingUp : TrendingDown;
                  
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isCredit ? 'bg-success/10' : 'bg-primary/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${isCredit ? 'text-success' : 'text-primary'}`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${isCredit ? 'text-success' : 'text-foreground'}`}>
                          {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
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
                  <p className="text-muted-foreground">No wallet activity yet</p>
                  <Button className="mt-4" onClick={() => setIsFundingModalOpen(true)}>
                    Fund your wallet to get started
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
