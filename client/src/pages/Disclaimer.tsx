import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield, Info, FileText } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Disclaimer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Important information regarding the use of Paybills.ng services
            </p>
          </div>

          <div className="space-y-8">
            
            {/* General Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  General Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The information provided on Paybills.ng is for general informational purposes only. 
                  While we strive to keep the information up to date and correct, we make no representations 
                  or warranties of any kind, express or implied, about the completeness, accuracy, 
                  reliability, suitability, or availability of the website or the information, 
                  products, services, or related graphics contained on the website.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Any reliance you place on such information is therefore strictly at your own risk. 
                  In no event will we be liable for any loss or damage including without limitation, 
                  indirect or consequential loss or damage, or any loss or damage whatsoever arising 
                  from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Service Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  While we strive to maintain 99.9% uptime, Paybills.ng cannot guarantee uninterrupted 
                  service availability. System maintenance, network issues, or third-party service 
                  disruptions may occasionally affect service accessibility.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We are not responsible for delays or failures in bill payments, airtime purchases, 
                  or other transactions caused by third-party service providers, network issues, 
                  or circumstances beyond our reasonable control.
                </p>
              </CardContent>
            </Card>

            {/* Financial Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Financial Services Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Paybills.ng is a payment service provider and not a financial institution. 
                  We do not provide banking services, investment advice, or financial planning services. 
                  All financial transactions are processed through licensed financial institutions and payment processors.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Users are responsible for verifying the accuracy of all transaction details before 
                  processing payments. While we implement robust security measures, users should 
                  also take appropriate precautions to protect their account information and funds.
                </p>
              </CardContent>
            </Card>

            {/* Software Activation Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Software Activation Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our software activation services are provided for legitimate software that you own. 
                  Users must ensure they have valid licenses for all software they attempt to activate. 
                  Paybills.ng is not responsible for any misuse of activation services.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Software activation success depends on various factors including software version, 
                  system configuration, and license validity. We do not guarantee successful activation 
                  in all cases and recommend consulting with software vendors for official support.
                </p>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card>
              <CardHeader>
                <CardTitle>External Links and Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our website may contain links to external websites or integrate with third-party services. 
                  We do not control the content, privacy policies, or practices of these external sites. 
                  Users access third-party content at their own risk, and we disclaim any responsibility 
                  for such external content or services.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <p className="text-center text-gray-600 dark:text-gray-300">
                  If you have questions about this disclaimer, please contact our support team at{' '}
                  <a href="mailto:support@paybills.ng" className="text-green-600 hover:underline">
                    support@paybills.ng
                  </a>
                </p>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Last updated: January 25, 2025
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}