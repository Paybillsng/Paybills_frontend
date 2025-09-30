import React, { useState, useEffect } from 'react';
import { Bell, X, Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'subscription_expiry' | 'cashback' | 'referral' | 'kyc' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  expiryDate?: Date;
  productName?: string;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demo - in real app, fetch from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'subscription_expiry',
        title: 'Subscription Expiring Soon',
        message: 'Your DSTV Premium subscription expires in 3 days. Renew now to avoid interruption.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        actionRequired: true,
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        productName: 'DSTV Premium'
      },
      {
        id: '2',
        type: 'cashback',
        title: 'Cashback Earned',
        message: 'You earned ₦150 cashback on your electricity bill payment.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        read: false
      },
      {
        id: '3',
        type: 'referral',
        title: 'Referral Bonus',
        message: 'Your referral John Doe made their first purchase. You earned ₦500!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: '4',
        type: 'kyc',
        title: 'KYC Verification Required',
        message: 'Complete your KYC to unlock higher transaction limits and premium features.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        actionRequired: true
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'subscription_expiry':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'cashback':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'referral':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'kyc':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'subscription_expiry':
        return 'bg-orange-100 text-orange-800';
      case 'cashback':
        return 'bg-green-100 text-green-800';
      case 'referral':
        return 'bg-blue-100 text-blue-800';
      case 'kyc':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-80 sm:max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-950' : ''
                  }`}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-xs sm:text-sm leading-tight">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 leading-tight">
                        {notification.message}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Badge className={`text-xs ${getNotificationBadgeColor(notification.type)}`}>
                            {notification.type.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs self-start sm:self-auto"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      
                      {notification.actionRequired && (
                        <div className="mt-2 sm:mt-3">
                          {notification.type === 'subscription_expiry' ? (
                            <Button size="sm" className="w-full text-xs sm:text-sm bg-orange-600 hover:bg-orange-700">
                              Renew {notification.productName}
                            </Button>
                          ) : notification.type === 'kyc' ? (
                            <Button size="sm" className="w-full text-xs sm:text-sm bg-red-600 hover:bg-red-700">
                              Complete KYC
                            </Button>
                          ) : (
                            <Button size="sm" className="w-full text-xs sm:text-sm">
                              Take Action
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}