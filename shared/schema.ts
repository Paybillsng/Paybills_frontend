import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number"),
  profilePicture: text("profile_picture"),
  isEmailVerified: boolean("is_email_verified").default(false),
  isPhoneVerified: boolean("is_phone_verified").default(false),
  kycStatus: text("kyc_status").default("pending"), // pending, verified, rejected
  userType: text("user_type").default("regular"), // regular, agent, admin
  isActive: boolean("is_active").default(true),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  referralCode: text("referral_code"),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => users.id),
  balance: decimal("balance", { precision: 15, scale: 2 }).default("0.00"),
  totalEarnings: decimal("total_earnings", { precision: 15, scale: 2 }).default("0.00"),
  totalSpent: decimal("total_spent", { precision: 15, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // airtime, data, electricity, cable, education, betting, software
  serviceProvider: text("service_provider"), // MTN, GLO, EKEDC, DStv, etc.
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  fee: decimal("fee", { precision: 15, scale: 2 }).default("0.00"),
  status: text("status").notNull(), // pending, success, failed
  reference: text("reference").notNull(),
  metadata: json("metadata"), // service-specific data
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // airtime, data, utilities, education, betting, software
  provider: text("provider").notNull(),
  isActive: boolean("is_active").default(true),
  minimumAmount: decimal("minimum_amount", { precision: 15, scale: 2 }),
  maximumAmount: decimal("maximum_amount", { precision: 15, scale: 2 }),
  fee: decimal("fee", { precision: 15, scale: 2 }).default("0.00"),
  feeType: text("fee_type").default("fixed"), // fixed, percentage
  metadata: json("metadata"), // service-specific configuration
});

export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: text("referrer_id").notNull().references(() => users.id),
  referredId: text("referred_id").notNull().references(() => users.id),
  status: text("status").default("pending"), // pending, completed
  earnings: decimal("earnings", { precision: 15, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agentCommissions = pgTable("agent_commissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: text("agent_id").notNull().references(() => users.id),
  transactionId: text("transaction_id").notNull().references(() => transactions.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 5, scale: 2 }).notNull(), // commission rate percentage
  status: text("status").default("pending"), // pending, paid
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // transaction, security, promotion, system
  isRead: boolean("is_read").default(false),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Software products table for scraped data
export const softwareProducts = pgTable("software_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  originalDescription: text("original_description"),
  price: text("price").notNull(),
  priceAmount: decimal("price_amount", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  source: text("source").notNull().default('esdcodes'),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWalletSchema = createInsertSchema(wallets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
});

export const insertAgentCommissionSchema = createInsertSchema(agentCommissions).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertSoftwareProductSchema = createInsertSchema(softwareProducts).omit({
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Wallet = typeof wallets.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type AgentCommission = typeof agentCommissions.$inferSelect;
export type InsertAgentCommission = z.infer<typeof insertAgentCommissionSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type SoftwareProduct = typeof softwareProducts.$inferSelect;
export type InsertSoftwareProduct = z.infer<typeof insertSoftwareProductSchema>;
