import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  users: number;
  revenue: number;
  transactions: number;
  growth: number;
}

interface ServiceAnalytics {
  name: string;
  revenue: number;
  transactions: number;
  growth: number;
  percentage: number;
}

const mockAnalyticsData: AnalyticsData[] = [
  { period: 'Jan 2024', users: 12847, revenue: 45200000, transactions: 89432, growth: 12.5 },
  { period: 'Dec 2023', users: 11420, revenue: 40150000, transactions: 78901, growth: 8.3 },
  { period: 'Nov 2023', users: 10567, revenue: 37890000, transactions: 71234, growth: 15.2 },
  { period: 'Oct 2023', users: 9234, revenue: 32500000, transactions: 65678, growth: 9.7 },
];

const serviceAnalytics: ServiceAnalytics[] = [
  { name: 'Airtime & Data', revenue: 18500000, transactions: 45231, growth: 15.3, percentage: 41 },
  { name: 'Utilities', revenue: 15800000, transactions: 23156, growth: 8.7, percentage: 35 },
  { name: 'Education', revenue: 6200000, transactions: 12890, growth: 22.1, percentage: 14 },
  { name: 'Betting', revenue: 3100000, transactions: 5432, growth: -5.2, percentage: 7 },
  { name: 'Software', revenue: 1400000, transactions: 2723, growth: 45.6, percentage: 3 },
];

const topPerformingAgents = [
  { name: 'Agent John Doe', transactions: 1234, commission: 125000, growth: 18.5 },
  { name: 'Agent Jane Smith', transactions: 987, commission: 98700, growth: 12.3 },
  { name: 'Agent Mike Johnson', transactions: 756, commission: 75600, growth: 9.8 },
  { name: 'Agent Sarah Wilson', transactions: 654, commission: 65400, growth: 15.2 },
];

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const currentData = mockAnalyticsData[0];
  const previousData = mockAnalyticsData[1];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-success" />;
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-success';
    if (growth < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const exportReport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting analytics report as ${format.toUpperCase()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive platform performance and user analytics
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportReport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Analytics Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Primary Metric</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="transactions">Transactions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center space-x-1">
                  {getGrowthIcon(currentData.growth)}
                  <span className={`text-sm font-medium ${getGrowthColor(currentData.growth)}`}>
                    {Math.abs(currentData.growth)}%
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                <p className="text-2xl font-bold">{formatCurrency(currentData.revenue)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  vs {formatCurrency(previousData.revenue)} last period
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">11.8%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
                <p className="text-2xl font-bold">{formatNumber(currentData.users)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  +{currentData.users - previousData.users} new users
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-warning" />
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">13.4%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Transactions</h3>
                <p className="text-2xl font-bold">{formatNumber(currentData.transactions)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(currentData.transactions / 30)} per day average
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">1.2%</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
                <p className="text-2xl font-bold">98.7%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(currentData.transactions * 0.013)} failed transactions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serviceAnalytics.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(service.transactions)} transactions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(service.revenue)}</p>
                        <div className="flex items-center space-x-1">
                          {getGrowthIcon(service.growth)}
                          <span className={`text-sm ${getGrowthColor(service.growth)}`}>
                            {Math.abs(service.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={service.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Agents */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingAgents.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {agent.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(agent.commission)}</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{agent.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Uptime</span>
                  <Badge className="bg-success text-white">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Performance</span>
                  <Badge className="bg-success text-white">Excellent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge variant="secondary" className="bg-warning text-white">Degraded</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Service</span>
                  <Badge className="bg-success text-white">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily Active Users</span>
                  <span className="font-semibold">8,432</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Session Duration</span>
                  <span className="font-semibold">12:34</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="font-semibold">23.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mobile Users</span>
                  <span className="font-semibold">76.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Volume</span>
                  <span className="font-semibold">{formatCurrency(currentData.revenue * 2.3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Fee Revenue</span>
                  <span className="font-semibold">{formatCurrency(currentData.revenue * 0.05)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Agent Commissions</span>
                  <span className="font-semibold">{formatCurrency(currentData.revenue * 0.12)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Revenue</span>
                  <span className="font-semibold">{formatCurrency(currentData.revenue * 0.83)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
