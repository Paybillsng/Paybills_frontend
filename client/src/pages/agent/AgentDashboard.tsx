import { AgentDashboard as AgentDashboardComponent } from '@/components/agent/AgentDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  ArrowRight,
  Calendar,
  Award
} from 'lucide-react';
import { Link } from 'wouter';

export default function AgentDashboard() {
  const recentCustomers = [
    { name: 'John Doe', phone: '08012345678', lastTransaction: '2024-01-15', amount: 5000 },
    { name: 'Jane Smith', phone: '08087654321', lastTransaction: '2024-01-14', amount: 2500 },
    { name: 'Mike Johnson', phone: '08011223344', lastTransaction: '2024-01-13', amount: 7500 },
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your agent activities and track commissions</p>
          </div>
          
          <div className="flex space-x-3">
            <Link href="/agent/override">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Customer Override
              </Button>
            </Link>
            <Link href="/agent/withdraw">
              <Button className="btn-primary">
                <TrendingUp className="w-4 h-4 mr-2" />
                Withdraw Commission
              </Button>
            </Link>
          </div>
        </div>

        {/* Agent Status */}
        <Card className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-6 h-6 text-primary" />
                  <Badge variant="default" className="bg-primary text-white">
                    Active Agent
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold">Agent Level: Gold</h2>
                <p className="text-muted-foreground">5% commission rate on all transactions</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next level at</p>
                <p className="text-lg font-semibold">₦2M monthly volume</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <AgentDashboardComponent />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Recent Customers
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(customer.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(customer.lastTransaction).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Commission Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Monthly Commission Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium">Airtime & Data</p>
                    <p className="text-sm text-muted-foreground">45% of total</p>
                  </div>
                  <p className="font-semibold text-success">₦18,450</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div>
                    <p className="font-medium">Utilities</p>
                    <p className="text-sm text-muted-foreground">35% of total</p>
                  </div>
                  <p className="font-semibold text-warning">₦14,280</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div>
                    <p className="font-medium">Other Services</p>
                    <p className="text-sm text-muted-foreground">20% of total</p>
                  </div>
                  <p className="font-semibold text-primary">₦8,140</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/agent/override">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Users className="w-6 h-6" />
                  <span>Customer Override</span>
                </Button>
              </Link>
              
              <Link href="/agent/withdraw">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <TrendingUp className="w-6 h-6" />
                  <span>Withdraw Commission</span>
                </Button>
              </Link>
              
              <Link href="/transactions">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Calendar className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
