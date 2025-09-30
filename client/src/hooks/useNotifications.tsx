import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  isRead: boolean;
  userId: string;
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  socket: Socket | null;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
  userId?: string;
}

export function NotificationProvider({ children, userId }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    if (!userId) return;

    // Initialize socket connection
    const newSocket = io(window.location.origin, {
      query: { userId },
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to notification server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from notification server');
    });

    // Listen for new notifications
    newSocket.on('new_notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Show toast notification
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default',
      });
    });

    // Listen for transaction updates
    newSocket.on('transaction_update', (data: any) => {
      const notification: Notification = {
        id: `tx_${data.transactionId}_${Date.now()}`,
        title: 'Transaction Update',
        message: `Your ${data.type} transaction is now ${data.status}`,
        type: data.status === 'success' ? 'success' : data.status === 'failed' ? 'error' : 'info',
        timestamp: new Date(),
        isRead: false,
        userId: data.userId,
        metadata: { transactionId: data.transactionId, type: data.type },
      };

      setNotifications(prev => [notification, ...prev]);
      
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default',
      });
    });

    // Listen for wallet updates
    newSocket.on('wallet_update', (data: any) => {
      const notification: Notification = {
        id: `wallet_${Date.now()}`,
        title: 'Wallet Update',
        message: `Your wallet balance has been updated. New balance: ₦${data.balance.toLocaleString()}`,
        type: 'info',
        timestamp: new Date(),
        isRead: false,
        userId: data.userId,
        metadata: { balance: data.balance, type: 'wallet_update' },
      };

      setNotifications(prev => [notification, ...prev]);
    });

    // Listen for system announcements
    newSocket.on('system_announcement', (data: any) => {
      const notification: Notification = {
        id: `system_${Date.now()}`,
        title: data.title || 'System Announcement',
        message: data.message,
        type: data.type || 'info',
        timestamp: new Date(),
        isRead: false,
        userId,
        metadata: { type: 'system_announcement' },
      };

      setNotifications(prev => [notification, ...prev]);
      
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default',
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, toast]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    socket,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}