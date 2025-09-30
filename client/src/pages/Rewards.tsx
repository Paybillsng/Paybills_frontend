import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CashbackReferralSystem from '@/components/CashbackReferralSystem';
import { Gift } from 'lucide-react';

export default function Rewards() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Gift className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Rewards & Referrals</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Earn cashback on every transaction and get rewards for referring friends
              </p>
            </div>

            <CashbackReferralSystem />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}