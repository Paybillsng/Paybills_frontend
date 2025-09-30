import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

export function WalletCard() {
  const { wallet } = useWallet();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
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
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Wallet Balance</h3>
        <p className="text-2xl font-bold">
          {showBalance ? formatCurrency(wallet?.balance || 0) : '****'}
        </p>
        <p className="text-sm text-success mt-1">+₦2,500 this week</p>
      </CardContent>
    </Card>
  );
}
