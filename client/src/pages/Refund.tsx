import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';

export default function Refund() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Refund Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Understanding our refund process and eligibility criteria
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Overview */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Our Commitment to You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  At Paybills.ng, we stand behind our services. If you experience issues with any 
                  transaction or service, we're committed to resolving it fairly and promptly. 
                  This policy outlines when refunds are available and how to request them.
                </p>
              </CardContent>
            </Card>

            {/* Eligible Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Refund-Eligible Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600">Bill Payments</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Electricity bills (failed transactions)</li>
                      <li>• Cable TV subscriptions (service not activated)</li>
                      <li>• Internet bills (payment not reflected)</li>
                      <li>• Water bills (failed processing)</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600">Digital Services</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Airtime/Data (not credited within 24 hours)</li>
                      <li>• Software licenses (invalid keys provided)</li>
                      <li>• Educational pins (incorrect or invalid)</li>
                      <li>• Betting wallet funding (failed transfers)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Refund Processing Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">1-3 Days</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Request Review & Approval
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">3-5 Days</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Bank Processing Time
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">5-7 Days</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total Processing Time
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                    Refund timelines may vary depending on your bank and payment method used
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How to Request */}
            <Card>
              <CardHeader>
                <CardTitle>How to Request a Refund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Required Information</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Transaction ID or reference number</li>
                      <li>• Date and time of transaction</li>
                      <li>• Amount paid</li>
                      <li>• Description of the issue</li>
                      <li>• Supporting evidence (screenshots, receipts)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Contact Methods</h4>
                    <div className="space-y-3">
                      <Link href="/contact">
                        <Button className="w-full justify-start" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Support
                        </Button>
                      </Link>
                      <Button className="w-full justify-start" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call: +234-800-PAYBILLS
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>• Refund requests must be made within 30 days of the original transaction</p>
                  <p>• Successful transactions that were completed as intended are not eligible for refunds</p>
                  <p>• Processing fees may apply for certain refund types</p>
                  <p>• Refunds are processed to the original payment method used</p>
                  <p>• Digital products that have been successfully delivered cannot be refunded</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Need Help with a Refund?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our customer support team is ready to assist you with any refund requests or questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button variant="outline">
                      View FAQ
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
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