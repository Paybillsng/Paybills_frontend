import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Target,
  Zap,
  Globe
} from 'lucide-react';

// Mock data for advanced analytics
const transactionTrendData = [
  { month: 'Jan', transactions: 12847, revenue: 45200000, users: 8432 },
  { month: 'Feb', transactions: 14523, revenue: 51800000, users: 9876 },
  { month: 'Mar', transactions: 13956, revenue: 48900000, users: 9234 },
  { month: 'Apr', transactions: 16789, revenue: 58700000, users: 10567 },
  { month: 'May', transactions: 18234, revenue: 62400000, users: 11234 },
  { month: 'Jun', transactions: 19876, revenue: 67800000, users: 12156 },
];

const serviceDistributionData = [
  { name: 'Airtime & Data', value: 41, revenue: 18500000, transactions: 45231, color: '#0088FE' },
  { name: 'Utilities', value: 35, revenue: 15800000, transactions: 23156, color: '#00C49F' },
  { name: 'Education', value: 14, revenue: 6200000, transactions: 12890, color: '#FFBB28' },
  { name: 'Betting', value: 7, revenue: 3100000, transactions: 5432, color: '#FF8042' },
  { name: 'Software', value: 3, revenue: 1400000, transactions: 2723, color: '#8884d8' },
];

const hourlyTransactionData = [
  { hour: '00', transactions: 234 },
  { hour: '01', transactions: 156 },
  { hour: '02', transactions: 89 },
  { hour: '03', transactions: 67 },
  { hour: '04', transactions: 45 },
  { hour: '05', transactions: 78 },
  { hour: '06', transactions: 234 },
  { hour: '07', transactions: 456 },
  { hour: '08', transactions: 678 },
  { hour: '09', transactions: 890 },
  { hour: '10', transactions: 1123 },
  { hour: '11', transactions: 1234 },
  { hour: '12', transactions: 1456 },
  { hour: '13', transactions: 1345 },
  { hour: '14', transactions: 1234 },
  { hour: '15', transactions: 1123 },
  { hour: '16', transactions: 998 },
  { hour: '17', transactions: 876 },
  { hour: '18', transactions: 754 },
  { hour: '19', transactions: 632 },
  { hour: '20', transactions: 510 },
  { hour: '21', transactions: 388 },
  { hour: '22', transactions: 266 },
  { hour: '23', transactions: 234 },
];

const userGrowthData = [
  { month: 'Jan', newUsers: 1247, totalUsers: 12847, retention: 68 },
  { month: 'Feb', newUsers: 1534, totalUsers: 14381, retention: 72 },
  { month: 'Mar', newUsers: 1298, totalUsers: 15679, retention: 70 },
  { month: 'Apr', newUsers: 1876, totalUsers: 17555, retention: 75 },
  { month: 'May', newUsers: 2134, totalUsers: 19689, retention: 78 },
  { month: 'Jun', newUsers: 2345, totalUsers: 22034, retention: 80 },
];

const geographicData = [
  { state: 'Lagos', users: 8432, percentage: 32, color: '#0088FE' },
  { state: 'Abuja', users: 5234, percentage: 20, color: '#00C49F' },
  { state: 'Kano', users: 3456, percentage: 13, color: '#FFBB28' },
  { state: 'Port Harcourt', users: 2876, percentage: 11, color: '#FF8042' },
  { state: 'Ibadan', users: 2234, percentage: 8, color: '#8884d8' },
  { state: 'Others', users: 4189, percentage: 16, color: '#82ca9d' },
];

export function AdvancedAnalytics() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [selectedChart, setSelectedChart] = useState('transactions');

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

  const exportReport = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting analytics report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            {t('Advanced Analytics')}
          </h2>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">+12.5%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Revenue Growth</h3>
              <p className="text-2xl font-bold">{formatCurrency(67800000)}</p>
              <p className="text-sm text-muted-foreground">vs last period</p>
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
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">+8.3%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
              <p className="text-2xl font-bold">{formatNumber(22034)}</p>
              <p className="text-sm text-muted-foreground">Monthly active users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-warning" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">+15.2%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Transaction Volume</h3>
              <p className="text-2xl font-bold">{formatNumber(19876)}</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">+2.1%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
              <p className="text-2xl font-bold">98.7%</p>
              <p className="text-sm text-muted-foreground">Transaction success</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <LineChartIcon className="w-5 h-5 mr-2" />
                Transaction Trends
              </CardTitle>
              <Select value={selectedChart} onValueChange={setSelectedChart}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    selectedChart === 'revenue' ? formatCurrency(Number(value)) : formatNumber(Number(value)),
                    name
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey={selectedChart}
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2" />
              Service Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hourly Transaction Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Hourly Transaction Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyTransactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [formatNumber(Number(value)), 'Transactions']} />
                <Bar dataKey="transactions" fill="#8884d8" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((location, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{location.state}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(location.users)}
                      </span>
                      <Badge variant="secondary">{location.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={location.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth & Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            User Growth & Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'retention' ? `${value}%` : formatNumber(Number(value)),
                  name === 'newUsers' ? 'New Users' : name === 'totalUsers' ? 'Total Users' : 'Retention Rate'
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="newUsers" fill="#8884d8" name="New Users" />
              <Line yAxisId="left" type="monotone" dataKey="totalUsers" stroke="#82ca9d" name="Total Users" />
              <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#ff7300" name="Retention Rate" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}