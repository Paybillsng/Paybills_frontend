import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

interface ConnectedUser {
  userId: string;
  socketId: string;
  connectedAt: Date;
}

export class WebSocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, ConnectedUser> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : "*",
        methods: ["GET", "POST"]
      },
      path: '/socket.io'
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle user authentication/identification
      socket.on('authenticate', (data: { userId: string }) => {
        const { userId } = data;
        
        // Store user connection
        this.connectedUsers.set(userId, {
          userId,
          socketId: socket.id,
          connectedAt: new Date(),
        });

        // Join user to their personal room
        socket.join(`user_${userId}`);
        
        console.log(`User ${userId} authenticated and joined personal room`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        // Remove user from connected users
        for (const [userId, user] of this.connectedUsers.entries()) {
          if (user.socketId === socket.id) {
            this.connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected`);
            break;
          }
        }
      });

      // Handle real-time transaction updates
      socket.on('subscribe_transaction_updates', (data: { userId: string }) => {
        socket.join(`transactions_${data.userId}`);
      });

      // Handle wallet balance updates
      socket.on('subscribe_wallet_updates', (data: { userId: string }) => {
        socket.join(`wallet_${data.userId}`);
      });
    });
  }

  // Send notification to specific user
  public sendNotificationToUser(userId: string, notification: any) {
    this.io.to(`user_${userId}`).emit('new_notification', notification);
  }

  // Send transaction update to user
  public sendTransactionUpdate(userId: string, transactionData: any) {
    this.io.to(`user_${userId}`).emit('transaction_update', transactionData);
    this.io.to(`transactions_${userId}`).emit('transaction_update', transactionData);
  }

  // Send wallet update to user
  public sendWalletUpdate(userId: string, walletData: any) {
    this.io.to(`user_${userId}`).emit('wallet_update', walletData);
    this.io.to(`wallet_${userId}`).emit('wallet_update', walletData);
  }

  // Send system announcement to all users
  public sendSystemAnnouncement(announcement: any) {
    this.io.emit('system_announcement', announcement);
  }

  // Send notification to all agents
  public sendNotificationToAgents(notification: any) {
    // Get all agent user IDs (this would come from your user management system)
    // For now, we'll emit to a general agents room
    this.io.to('agents').emit('agent_notification', notification);
  }

  // Send notification to admins
  public sendNotificationToAdmins(notification: any) {
    this.io.to('admins').emit('admin_notification', notification);
  }

  // Get connected users count
  public getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  // Check if user is online
  public isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Get all connected users
  public getConnectedUsers(): ConnectedUser[] {
    return Array.from(this.connectedUsers.values());
  }

  // Send payment status update
  public sendPaymentStatusUpdate(userId: string, paymentData: any) {
    const notification = {
      id: `payment_${paymentData.reference}_${Date.now()}`,
      title: 'Payment Update',
      message: `Your payment of ₦${paymentData.amount.toLocaleString()} is ${paymentData.status}`,
      type: paymentData.status === 'success' ? 'success' : paymentData.status === 'failed' ? 'error' : 'info',
      timestamp: new Date(),
      isRead: false,
      userId,
      metadata: paymentData,
    };

    this.sendNotificationToUser(userId, notification);
  }

  // Send service purchase confirmation
  public sendServicePurchaseConfirmation(userId: string, serviceData: any) {
    const notification = {
      id: `service_${serviceData.type}_${Date.now()}`,
      title: 'Service Purchase Confirmed',
      message: `Your ${serviceData.type} purchase of ₦${serviceData.amount.toLocaleString()} was successful`,
      type: 'success',
      timestamp: new Date(),
      isRead: false,
      userId,
      metadata: serviceData,
    };

    this.sendNotificationToUser(userId, notification);
  }

  // Send referral commission notification
  public sendReferralCommissionNotification(userId: string, commissionData: any) {
    const notification = {
      id: `referral_${commissionData.referralId}_${Date.now()}`,
      title: 'Referral Commission Earned',
      message: `You earned ₦${commissionData.amount.toLocaleString()} from your referral`,
      type: 'success',
      timestamp: new Date(),
      isRead: false,
      userId,
      metadata: commissionData,
    };

    this.sendNotificationToUser(userId, notification);
  }

  // Send KYC status update
  public sendKYCStatusUpdate(userId: string, kycData: any) {
    const notification = {
      id: `kyc_${userId}_${Date.now()}`,
      title: 'KYC Status Update',
      message: `Your KYC verification is now ${kycData.status}`,
      type: kycData.status === 'verified' ? 'success' : kycData.status === 'rejected' ? 'error' : 'info',
      timestamp: new Date(),
      isRead: false,
      userId,
      metadata: kycData,
    };

    this.sendNotificationToUser(userId, notification);
  }
}

// Global WebSocket service instance
let wsService: WebSocketService | null = null;

export const initializeWebSocket = (server: HTTPServer): WebSocketService => {
  if (!wsService) {
    wsService = new WebSocketService(server);
  }
  return wsService;
};

export const getWebSocketService = (): WebSocketService | null => {
  return wsService;
};