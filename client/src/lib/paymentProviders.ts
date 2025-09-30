// Payment provider integrations for Nigerian payment gateways
import { z } from 'zod';

export interface PaystackConfig {
  publicKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface FlutterwaveConfig {
  publicKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaymentProvider {
  name: string;
  initializePayment: (data: PaymentInitData) => Promise<PaymentInitResponse>;
  verifyPayment: (reference: string) => Promise<PaymentVerificationResponse>;
}

export interface PaymentInitData {
  email: string;
  amount: number;
  currency: string;
  reference: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export interface PaymentInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaymentVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
  };
}

// Paystack Provider
export class PaystackProvider implements PaymentProvider {
  name = 'Paystack';
  private config: PaystackConfig;

  constructor(config: PaystackConfig) {
    this.config = config;
  }

  async initializePayment(data: PaymentInitData): Promise<PaymentInitResponse> {
    const response = await fetch(`${this.config.baseUrl}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount * 100, // Convert to kobo
        currency: data.currency || 'NGN',
        reference: data.reference,
        callback_url: data.callback_url,
        metadata: data.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.statusText}`);
    }

    return await response.json();
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    const response = await fetch(`${this.config.baseUrl}/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Paystack verification error: ${response.statusText}`);
    }

    return await response.json();
  }
}

// Flutterwave Provider
export class FlutterwaveProvider implements PaymentProvider {
  name = 'Flutterwave';
  private config: FlutterwaveConfig;

  constructor(config: FlutterwaveConfig) {
    this.config = config;
  }

  async initializePayment(data: PaymentInitData): Promise<PaymentInitResponse> {
    const response = await fetch(`${this.config.baseUrl}/v3/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: data.reference,
        amount: data.amount,
        currency: data.currency || 'NGN',
        redirect_url: data.callback_url,
        customer: {
          email: data.email,
        },
        customizations: {
          title: 'Paybills.ng',
          description: 'Payment for services',
        },
        meta: data.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Flutterwave API error: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Transform Flutterwave response to match our interface
    return {
      status: result.status === 'success',
      message: result.message,
      data: {
        authorization_url: result.data.link,
        access_code: result.data.link,
        reference: data.reference,
      },
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    const response = await fetch(`${this.config.baseUrl}/v3/transactions/${reference}/verify`, {
      headers: {
        'Authorization': `Bearer ${this.config.secretKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Flutterwave verification error: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Transform Flutterwave response to match our interface
    return {
      status: result.status === 'success',
      message: result.message,
      data: {
        id: result.data.id,
        status: result.data.status,
        reference: result.data.tx_ref,
        amount: result.data.amount,
        gateway_response: result.data.processor_response,
        paid_at: result.data.created_at,
        created_at: result.data.created_at,
        channel: result.data.payment_type,
        currency: result.data.currency,
        customer: {
          id: result.data.customer.id,
          email: result.data.customer.email,
          customer_code: result.data.customer.customer_code || '',
        },
      },
    };
  }
}

// Payment service factory
export class PaymentService {
  private providers: Map<string, PaymentProvider> = new Map();

  addProvider(name: string, provider: PaymentProvider) {
    this.providers.set(name, provider);
  }

  getProvider(name: string): PaymentProvider | undefined {
    return this.providers.get(name);
  }

  async initializePayment(providerName: string, data: PaymentInitData): Promise<PaymentInitResponse> {
    const provider = this.getProvider(providerName);
    if (!provider) {
      throw new Error(`Payment provider ${providerName} not found`);
    }
    return await provider.initializePayment(data);
  }

  async verifyPayment(providerName: string, reference: string): Promise<PaymentVerificationResponse> {
    const provider = this.getProvider(providerName);
    if (!provider) {
      throw new Error(`Payment provider ${providerName} not found`);
    }
    return await provider.verifyPayment(reference);
  }
}

// Initialize payment service
export const paymentService = new PaymentService();

// Setup providers when API keys are available
export const setupPaymentProviders = () => {
  if (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY && import.meta.env.VITE_PAYSTACK_SECRET_KEY) {
    const paystackProvider = new PaystackProvider({
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      secretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY,
      baseUrl: 'https://api.paystack.co',
    });
    paymentService.addProvider('paystack', paystackProvider);
  }

  if (import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY && import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY) {
    const flutterwaveProvider = new FlutterwaveProvider({
      publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      secretKey: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY,
      baseUrl: 'https://api.flutterwave.com',
    });
    paymentService.addProvider('flutterwave', flutterwaveProvider);
  }
};