import { useState, useEffect } from 'react';
import { WalletData, TransactionData } from '../types';
import { mockAPI } from '../lib/mockData';
import { useToast } from '@/hooks/use-toast';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadWalletData();
    loadTransactions();
  }, []);

  const loadWalletData = async () => {
    try {
      const walletData = await mockAPI.getWallet();
      setWallet(walletData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    }
  };

  const loadTransactions = async () => {
    try {
      const transactionData = await mockAPI.getTransactions();
      setTransactions(transactionData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      });
    }
  };

  const fundWallet = async (amount: number, method: string) => {
    setIsLoading(true);
    try {
      const response = await mockAPI.fundWallet(amount, method);
      
      // Update wallet balance
      if (wallet) {
        setWallet({
          ...wallet,
          balance: wallet.balance + amount,
        });
      }
      
      toast({
        title: "Wallet Funded",
        description: `Your wallet has been funded with ₦${amount.toLocaleString()}`,
      });
      
      // Reload transactions to show the new funding transaction
      await loadTransactions();
      
      return response;
    } catch (error) {
      toast({
        title: "Funding Failed",
        description: error instanceof Error ? error.message : "Failed to fund wallet",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseService = async (serviceData: any) => {
    setIsLoading(true);
    try {
      let response;
      
      switch (serviceData.type) {
        case 'airtime':
          response = await mockAPI.purchaseAirtime(serviceData);
          break;
        case 'data':
          response = await mockAPI.purchaseData(serviceData);
          break;
        case 'utility':
          response = await mockAPI.payUtility(serviceData);
          break;
        case 'education':
          response = await mockAPI.purchaseEducationPin(serviceData);
          break;
        case 'betting':
          response = await mockAPI.fundBettingWallet(serviceData);
          break;
        case 'software':
          response = await mockAPI.purchaseSoftware(serviceData);
          break;
        default:
          throw new Error('Invalid service type');
      }
      
      // Update wallet balance
      if (wallet) {
        setWallet({
          ...wallet,
          balance: wallet.balance - serviceData.amount,
          totalSpent: wallet.totalSpent + serviceData.amount,
        });
      }
      
      toast({
        title: "Purchase Successful",
        description: `Your ${serviceData.type} purchase was successful!`,
      });
      
      // Reload transactions
      await loadTransactions();
      
      return response;
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Purchase failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    wallet,
    transactions,
    isLoading,
    fundWallet,
    purchaseService,
    refreshData: () => {
      loadWalletData();
      loadTransactions();
    },
  };
}
