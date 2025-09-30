import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Smartphone, Wifi, Zap } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

export function RecentTransactions() {
  const { transactions } = useWallet();
  const recentTransactions = transactions.slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'airtime': return <Smartphone className="w-5 h-5 text-primary" />;
      case 'data': return <Wifi className="w-5 h-5 text-primary" />;
      case 'electricity': return <Zap className="w-5 h-5 text-warning" />;
      default: return <Smartphone className="w-5 h-5 text-primary" />;
    }
  };

  return (
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
            recentTransactions.map((transaction) => (
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
            ))
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
  );
}
