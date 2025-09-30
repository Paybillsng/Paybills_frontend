import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import KYCComponent from '@/components/KYCComponent';
import { Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function KYCVerification() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  KYC Verification
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Verify your identity to unlock higher transaction limits and premium features
              </p>
            </div>

            {/* Basic KYC Status Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span>Basic Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">₦50,000</p>
                    <p className="text-sm text-green-600">Daily transaction limit</p>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Active
                    </Badge>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Verification Progress</span>
                        <span>33%</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                    <Clock className="w-5 h-5" />
                    <span>Standard Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">₦200,000</p>
                    <p className="text-sm text-green-600">Daily transaction limit</p>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      Available
                    </Badge>
                    <div className="mt-3">
                      <p className="text-xs text-gray-600">Requires government ID & selfie</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
                    <AlertCircle className="w-5 h-5" />
                    <span>Premium Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-purple-600">₦1,000,000</p>
                    <p className="text-sm text-purple-600">Daily transaction limit</p>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      Premium
                    </Badge>
                    <div className="mt-3">
                      <p className="text-xs text-gray-600">Full documentation required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <KYCComponent />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}