import { Router } from "express";
import { storage } from "./storage";
import fs from 'fs';
import path from 'path';
import { ESDCodesScraper } from './esdcodes-scraper';
import { z } from "zod";
import { ProductScraper } from "./scraper";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { softwareProducts } from "@shared/schema";
import ws from "ws";
import * as schema from "@shared/schema";

// Initialize database connection
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

const router = Router();

// User routes
router.get("/api/users", async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const user = await storage.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

router.put("/api/users/:id", async (req, res) => {
  try {
    const updates = req.body;
    const user = await storage.updateUser(req.params.id, updates);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Software product routes - Load from JSON file with authentic images
// Load the products data at the top level to avoid repeated file reads
let cachedProducts = null;

// Clear cache function
function clearProductsCache() {
  cachedProducts = null;
  console.log('Products cache cleared');
}

function loadProducts() {
  // Clear cache to force reload updated images
  cachedProducts = null;
  if (cachedProducts) return cachedProducts;
  
  try {
    const rootDir = process.cwd();
    const productsPath = path.join(rootDir, 'server', 'software-products-authentic.json');
    
    if (fs.existsSync(productsPath)) {
      const productsData = fs.readFileSync(productsPath, 'utf8');
      cachedProducts = JSON.parse(productsData);
      console.log(`Loaded ${cachedProducts.length} software products with authentic images`);
      return cachedProducts;
    }
    
    // Try alternative paths
    const altPaths = [
      path.join(rootDir, 'software-products-authentic.json'),
      path.join(__dirname, '../software-products-authentic.json'),
      path.join(__dirname, 'software-products-authentic.json')
    ];
    
    for (const altPath of altPaths) {
      if (fs.existsSync(altPath)) {
        const productsData = fs.readFileSync(altPath, 'utf8');
        cachedProducts = JSON.parse(productsData);
        console.log(`Loaded ${cachedProducts.length} software products from ${altPath}`);
        return cachedProducts;
      }
    }
    
    throw new Error('Products file not found in any expected location');
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}

router.get('/api/software/products', (req, res) => {
  try {
    const products = loadProducts();
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products available' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error serving software products:', error);
    res.status(500).json({ error: 'Failed to load products', details: error.message });
  }
});

// Cart functionality for software store
router.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  // In a real app, this would use user sessions/database
  res.json({ success: true, message: 'Product added to cart' });
});

router.get('/api/cart', (req, res) => {
  // In a real app, this would get cart from user session/database
  res.json({ items: [], total: 0 });
});

// Placeholder endpoint to close the legacy section
router.get('/api/software/count', (req, res) => {
  try {
    const products = loadProducts();
    res.json({ count: products.length, message: 'Authentic products loaded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count products' });
  }
});

// Product search functionality  
router.get('/api/software/search', (req, res) => {
  try {
    const { q } = req.query;
    const products = loadProducts();
    
    if (!q) {
      return res.json(products);
    }
    
    const searchQuery = q.toString().toLowerCase();
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// ESDCodes scraper endpoints
router.get('/api/software/scrape-esdcodes', async (req, res) => {
  try {
    const { maxProducts = 50 } = req.query;
    const scraper = new ESDCodesScraper();
    
    console.log(`Starting ESDCodes scraping for up to ${maxProducts} products...`);
    const scrapedProducts = await scraper.scrapeAllProducts(Number(maxProducts));
    
    // Convert to our internal format
    const formattedProducts = scrapedProducts.map((product, index) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      originalDescription: product.description.substring(0, 50) + '...',
      price: product.price,
      priceAmount: product.priceAmount,
      imageUrl: product.imageUrl || getReliableImageUrl(product.title),
      category: product.category,
      source: 'esdcodes',
      inStock: product.availability,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    console.log(`Successfully scraped ${formattedProducts.length} products from ESDCodes`);
    res.json({
      success: true,
      count: formattedProducts.length,
      products: formattedProducts
    });
  } catch (error) {
    console.error('ESDCodes scraping error:', error);
    res.status(500).json({ 
      error: 'Failed to scrape ESDCodes products', 
      details: error.message 
    });
  }
});

// Helper function to get reliable image URLs
function getReliableImageUrl(productTitle: string): string {
  const titleLower = productTitle.toLowerCase();
  
  if (titleLower.includes('windows 11')) {
    return 'https://img.icons8.com/color/200/windows-11.png';
  }
  if (titleLower.includes('windows 10')) {
    return 'https://img.icons8.com/color/200/windows-10.png';
  }
  if (titleLower.includes('office')) {
    return 'https://img.icons8.com/color/200/microsoft-office-2019.png';
  }
  if (titleLower.includes('photoshop')) {
    return 'https://cdn.worldvectorlogo.com/logos/photoshop-cc.svg';
  }
  if (titleLower.includes('illustrator')) {
    return 'https://cdn.worldvectorlogo.com/logos/illustrator-cc.svg';
  }
  if (titleLower.includes('norton')) {
    return 'https://cdn.worldvectorlogo.com/logos/norton-1.svg';
  }
  if (titleLower.includes('kaspersky')) {
    return 'https://img.icons8.com/color/200/kaspersky.png';
  }
  if (titleLower.includes('mcafee')) {
    return 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/mcafee.svg';
  }
  if (titleLower.includes('corel')) {
    return 'https://cdn.worldvectorlogo.com/logos/coreldraw-2021.svg';
  }
  if (titleLower.includes('adobe')) {
    return 'https://img.icons8.com/color/200/adobe-creative-cloud.png';
  }
  
  return 'https://img.icons8.com/color/200/software.png';
}

// Update products database with scraped data
router.post('/api/software/update-from-scrape', async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Products array is required' });
    }
    
    // Save to JSON file
    const rootDir = process.cwd();
    const productsPath = path.join(rootDir, 'server', 'software-products-authentic.json');
    
    // Backup existing file
    const backupPath = path.join(rootDir, 'server', 'software-products-backup.json');
    if (fs.existsSync(productsPath)) {
      fs.copyFileSync(productsPath, backupPath);
    }
    
    // Write new products
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    // Clear cache to reload new products
    clearProductsCache();
    
    console.log(`Updated software products database with ${products.length} products`);
    res.json({
      success: true,
      message: `Successfully updated ${products.length} products`,
      backupCreated: true
    });
  } catch (error) {
    console.error('Error updating products database:', error);
    res.status(500).json({ 
      error: 'Failed to update products database', 
      details: error.message 
    });
  }
});

// Service type validation
router.get('/api/services/types', (req, res) => {
  const serviceTypes = [
    'utilities',
    'airtime',
    'data',
    'betting',
    'education',
    'software'
  ];
  res.json(serviceTypes);
});

// Notification routes
router.get('/api/notifications/:userId', async (req, res) => {
  try {
    const notifications = await storage.getNotifications(req.params.userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

router.post('/api/notifications', async (req, res) => {
  try {
    const notification = await storage.createNotification(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create notification' });
  }
});

router.delete("/api/notifications/:id", async (req, res) => {
  try {
    const deleted = await storage.deleteNotification(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

// Authentication routes
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simple mock authentication
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // In production, you would verify the password hash
    if (password !== "password") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token: "mock-jwt-token",
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

router.post("/api/auth/register", async (req, res) => {
  try {
    const userData = req.body;
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Create user
    const user = await storage.createUser(userData);
    
    // Create wallet for user
    await storage.createWallet({
      userId: user.id,
      balance: "0.00",
      totalEarnings: "0.00",
      totalSpent: "0.00",
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      user: userWithoutPassword,
      token: "mock-jwt-token",
    });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
});

// Service purchase endpoints
router.post("/api/services/purchase/airtime", async (req, res) => {
  try {
    const { userId, network, phoneNumber, amount, metadata } = req.body;
    
    // Simulate airtime purchase
    const transaction = await storage.createTransaction({
      userId,
      type: "airtime",
      serviceProvider: network,
      amount: amount.toString(),
      fee: (amount * 0.01).toString(), // 1% fee
      status: "success",
      reference: `AT${Date.now()}`,
      metadata,
      description: `${network} Airtime - ${phoneNumber}`,
    });
    
    // Update wallet balance
    const wallet = await storage.getWallet(userId);
    if (wallet) {
      await storage.updateWallet(userId, {
        balance: (parseFloat(wallet.balance) - amount - (amount * 0.01)).toString(),
        totalSpent: (parseFloat(wallet.totalSpent) + amount).toString(),
      });
    }
    
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ error: "Airtime purchase failed" });
  }
});

router.post("/api/services/purchase/data", async (req, res) => {
  try {
    const { userId, network, phoneNumber, planId, amount, metadata } = req.body;
    
    const transaction = await storage.createTransaction({
      userId,
      type: "data",
      serviceProvider: network,
      amount: amount.toString(),
      fee: (amount * 0.01).toString(),
      status: "success",
      reference: `DT${Date.now()}`,
      metadata: { ...metadata, planId },
      description: `${network} Data Bundle - ${phoneNumber}`,
    });
    
    const wallet = await storage.getWallet(userId);
    if (wallet) {
      await storage.updateWallet(userId, {
        balance: (parseFloat(wallet.balance) - amount - (amount * 0.01)).toString(),
        totalSpent: (parseFloat(wallet.totalSpent) + amount).toString(),
      });
    }
    
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ error: "Data purchase failed" });
  }
});

router.post("/api/services/purchase/utility", async (req, res) => {
  try {
    const { userId, provider, accountNumber, amount, metadata } = req.body;
    
    const transaction = await storage.createTransaction({
      userId,
      type: provider.includes("ekedc") || provider.includes("ikedc") ? "electricity" : "cable",
      serviceProvider: provider,
      amount: amount.toString(),
      fee: (amount * 0.02).toString(), // 2% fee for utilities
      status: "success",
      reference: `UT${Date.now()}`,
      metadata: { ...metadata, accountNumber },
      description: `${provider} Bill Payment - ${accountNumber}`,
    });
    
    const wallet = await storage.getWallet(userId);
    if (wallet) {
      await storage.updateWallet(userId, {
        balance: (parseFloat(wallet.balance) - amount - (amount * 0.02)).toString(),
        totalSpent: (parseFloat(wallet.totalSpent) + amount).toString(),
      });
    }
    
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ error: "Utility payment failed" });
  }
});

router.post("/api/services/fund-wallet", async (req, res) => {
  try {
    const { userId, amount, method } = req.body;
    
    const transaction = await storage.createTransaction({
      userId,
      type: "wallet_funding",
      serviceProvider: method,
      amount: amount.toString(),
      fee: "0.00",
      status: "success",
      reference: `FW${Date.now()}`,
      metadata: { method },
      description: `Wallet Funding via ${method}`,
    });
    
    const wallet = await storage.getWallet(userId);
    if (wallet) {
      await storage.updateWallet(userId, {
        balance: (parseFloat(wallet.balance) + amount).toString(),
        totalEarnings: (parseFloat(wallet.totalEarnings) + amount).toString(),
      });
    }
    
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ error: "Wallet funding failed" });
  }
});

// Microsoft activation
router.post("/api/services/microsoft-activation", async (req, res) => {
  try {
    const { installationIds } = req.body;
    
    // Simulate Microsoft activation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    res.json({
      confirmationId: "123456-789012-345678-901234",
      installationIds,
    });
  } catch (error) {
    res.status(400).json({ error: "Microsoft activation failed" });
  }
});

export default router;
