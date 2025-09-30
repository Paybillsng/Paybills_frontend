import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  CheckCircle, 
  Shield, 
  Gift, 
  Settings as SettingsIcon,
  Trash2,
  Bookmark
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';

export default function Notifications() {
  const { notifications, isLoading, markAsRead, unreadCount } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'security':
        return <Shield className="w-5 h-5 text-warning" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-primary" />;
      case 'system':
        return <SettingsIcon className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-muted/50';
    
    switch (type) {
      case 'transaction':
        return 'bg-success/10 border-success/20';
      case 'security':
        return 'bg-warning/10 border-warning/20';
      case 'promotion':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-background border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton type="list" count={5} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bell className="w-8 h-8 mr-3" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-3">
                  {unreadCount} unread
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your account activity and important alerts</p>
          </div>
          
          <Button variant="outline">
            Mark all as read
          </Button>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get browser notifications</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${getNotificationColor(notification.type, notification.isRead)} ${
                      !notification.isRead ? 'border-l-4' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! We'll notify you when something important happens.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
