import { 
  type User, 
  type InsertUser, 
  type Wallet, 
  type InsertWallet, 
  type Transaction, 
  type InsertTransaction,
  type Service,
  type InsertService,
  type Referral,
  type InsertReferral,
  type AgentCommission,
  type InsertAgentCommission,
  type Notification,
  type InsertNotification
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  // Wallet operations
  getWallet(userId: string): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  updateWallet(userId: string, updates: Partial<Wallet>): Promise<Wallet | undefined>;

  // Transaction operations
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | undefined>;
  getAllTransactions(): Promise<Transaction[]>;

  // Service operations
  getService(id: string): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, updates: Partial<Service>): Promise<Service | undefined>;
  getAllServices(): Promise<Service[]>;

  // Referral operations
  getReferral(id: string): Promise<Referral | undefined>;
  getReferralsByUser(userId: string): Promise<Referral[]>;
  createReferral(referral: InsertReferral): Promise<Referral>;
  updateReferral(id: string, updates: Partial<Referral>): Promise<Referral | undefined>;

  // Agent commission operations
  getAgentCommissions(agentId: string): Promise<AgentCommission[]>;
  createAgentCommission(commission: InsertAgentCommission): Promise<AgentCommission>;
  updateAgentCommission(id: string, updates: Partial<AgentCommission>): Promise<AgentCommission | undefined>;

  // Notification operations
  getNotification(id: string): Promise<Notification | undefined>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: string, updates: Partial<Notification>): Promise<Notification | undefined>;
  deleteNotification(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private wallets: Map<string, Wallet>;
  private transactions: Map<string, Transaction>;
  private services: Map<string, Service>;
  private referrals: Map<string, Referral>;
  private agentCommissions: Map<string, AgentCommission>;
  private notifications: Map<string, Notification>;

  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.transactions = new Map();
    this.services = new Map();
    this.referrals = new Map();
    this.agentCommissions = new Map();
    this.notifications = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = { 
      ...user, 
      ...updates, 
      updatedAt: new Date().toISOString()
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Wallet operations
  async getWallet(userId: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.userId === userId,
    );
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const wallet: Wallet = { 
      ...insertWallet, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async updateWallet(userId: string, updates: Partial<Wallet>): Promise<Wallet | undefined> {
    const wallet = Array.from(this.wallets.values()).find(w => w.userId === userId);
    if (!wallet) return undefined;
    
    const updatedWallet: Wallet = { 
      ...wallet, 
      ...updates, 
      updatedAt: new Date().toISOString()
    };
    this.wallets.set(wallet.id, updatedWallet);
    return updatedWallet;
  }

  // Transaction operations
  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      createdAt: new Date().toISOString()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction: Transaction = { ...transaction, ...updates };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  // Service operations
  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category,
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService: Service = { ...service, ...updates };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  // Referral operations
  async getReferral(id: string): Promise<Referral | undefined> {
    return this.referrals.get(id);
  }

  async getReferralsByUser(userId: string): Promise<Referral[]> {
    return Array.from(this.referrals.values()).filter(
      (referral) => referral.referrerId === userId,
    );
  }

  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const id = randomUUID();
    const referral: Referral = { 
      ...insertReferral, 
      id,
      createdAt: new Date().toISOString()
    };
    this.referrals.set(id, referral);
    return referral;
  }

  async updateReferral(id: string, updates: Partial<Referral>): Promise<Referral | undefined> {
    const referral = this.referrals.get(id);
    if (!referral) return undefined;
    
    const updatedReferral: Referral = { ...referral, ...updates };
    this.referrals.set(id, updatedReferral);
    return updatedReferral;
  }

  // Agent commission operations
  async getAgentCommissions(agentId: string): Promise<AgentCommission[]> {
    return Array.from(this.agentCommissions.values()).filter(
      (commission) => commission.agentId === agentId,
    );
  }

  async createAgentCommission(insertCommission: InsertAgentCommission): Promise<AgentCommission> {
    const id = randomUUID();
    const commission: AgentCommission = { 
      ...insertCommission, 
      id,
      createdAt: new Date().toISOString()
    };
    this.agentCommissions.set(id, commission);
    return commission;
  }

  async updateAgentCommission(id: string, updates: Partial<AgentCommission>): Promise<AgentCommission | undefined> {
    const commission = this.agentCommissions.get(id);
    if (!commission) return undefined;
    
    const updatedCommission: AgentCommission = { ...commission, ...updates };
    this.agentCommissions.set(id, updatedCommission);
    return updatedCommission;
  }

  // Notification operations
  async getNotification(id: string): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      (notification) => notification.userId === userId,
    );
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = { 
      ...insertNotification, 
      id,
      createdAt: new Date().toISOString()
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async updateNotification(id: string, updates: Partial<Notification>): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    
    const updatedNotification: Notification = { ...notification, ...updates };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteNotification(id: string): Promise<boolean> {
    return this.notifications.delete(id);
  }
}

export const storage = new MemStorage();
