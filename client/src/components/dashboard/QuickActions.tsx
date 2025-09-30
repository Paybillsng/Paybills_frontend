import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Wifi, Zap, Plus } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      href: '/airtime-data',
      icon: Smartphone,
      label: 'Buy Airtime',
      color: 'primary',
    },
    {
      href: '/airtime-data',
      icon: Wifi,
      label: 'Buy Data',
      color: 'success',
    },
    {
      href: '/utilities',
      icon: Zap,
      label: 'Pay Bills',
      color: 'warning',
    },
    {
      href: '/wallet',
      icon: Plus,
      label: 'Fund Wallet',
      color: 'blue',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-center space-y-2 hover:bg-${action.color}/5 hover:border-${action.color} group`}
                >
                  <Icon className={`w-6 h-6 text-${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
