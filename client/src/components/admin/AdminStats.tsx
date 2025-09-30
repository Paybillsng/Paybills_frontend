import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          {changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={`text-sm mt-1 ${
            changeType === 'positive' ? 'text-success' : 'text-destructive'
          }`}>
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+234 this week',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Total Revenue',
      value: '₦45.2M',
      change: '+12.5% this month',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-success" />,
    },
    {
      title: 'Transactions',
      value: '89,432',
      change: '4,321 today',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-6 h-6 text-warning" />,
    },
    {
      title: 'Failed Transactions',
      value: '1,234',
      change: '1.38% failure rate',
      changeType: 'negative' as const,
      icon: <TrendingDown className="w-6 h-6 text-destructive" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
