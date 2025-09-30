import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Wallet, Calendar } from 'lucide-react';

interface AgentStatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

function AgentStatCard({ title, value, change, icon }: AgentStatCardProps) {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-success mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}

export function AgentDashboard() {
  const stats = [
    {
      title: 'Total Commission',
      value: '₦45,230',
      change: '+₦2,340 this week',
      icon: <Wallet className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Pending Commission',
      value: '₦8,500',
      change: '12 transactions',
      icon: <TrendingUp className="w-6 h-6 text-warning" />,
    },
    {
      title: 'Total Customers',
      value: '234',
      change: '+18 this month',
      icon: <Users className="w-6 h-6 text-success" />,
    },
    {
      title: 'Monthly Volume',
      value: '₦1.2M',
      change: '+15% from last month',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <AgentStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
