import { AdminStats } from '@/components/admin/AdminStats';
import { UserManagement } from '@/components/admin/UserManagement';
import { PlatformAnalytics } from '@/components/admin/PlatformAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';

export default function AdminDashboard() {
  const systemAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'High Transaction Volume',
      message: 'Transaction volume is 150% above normal. Consider scaling resources.',
      time: '2 minutes ago',
    },
    {
      id: '2',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Routine maintenance scheduled for Sunday 2:00 AM - 4:00 AM.',
      time: '1 hour ago',
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully.',
      time: '3 hours ago',
    },
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      href: '/admin/users',
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Analytics',
      description: 'View detailed platform analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'success',
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      href: '/admin/settings',
      icon: Settings,
      color: 'warning',
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Clock className="w-5 h-5 text-primary" />;
    }
  };

  const getAlertBadge = (type: string) => {
    const variants = {
      warning: 'secondary',
      success: 'default',
      info: 'secondary',
    };
    
    return (
      <Badge 
        variant={variants[type as keyof typeof variants] as any}
        className={type === 'success' ? 'bg-success text-white' : type === 'warning' ? 'bg-warning text-white' : ''}
      >
        {type}
      </Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, transactions, and platform analytics
          </p>
        </div>

        {/* Admin Stats */}
        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent User Activity */}
          <div className="lg:col-span-2">
            <UserManagement />
          </div>

          {/* Quick Actions & System Alerts */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link key={index} href={action.href}>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer group">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 bg-${action.color}/10 rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 text-${action.color}`} />
                            </div>
                            <div>
                              <h3 className="font-medium">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Alerts</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">{alert.title}</h4>
                          {getAlertBadge(alert.type)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Platform Analytics Preview */}
            <PlatformAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}
