import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, Users, Database, Bell } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: January 25, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-green-600" />
                Information We Collect
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Full name, email address, and phone number</li>
                  <li>• Date of birth and government-issued ID for verification</li>
                  <li>• Bank account details and payment information</li>
                  <li>• Address and location data</li>
                </ul>
                
                <h3 className="font-semibold mb-3 mt-6">Transaction Information</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Payment history and transaction records</li>
                  <li>• Service usage patterns and preferences</li>
                  <li>• Device information and IP addresses</li>
                  <li>• Communication records with customer support</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-green-600" />
                How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Service Delivery</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Process payments and transactions</li>
                    <li>• Verify your identity and prevent fraud</li>
                    <li>• Provide customer support</li>
                    <li>• Send transaction confirmations</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Service Improvement</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Analyze usage patterns</li>
                    <li>• Develop new features</li>
                    <li>• Personalize your experience</li>
                    <li>• Conduct security monitoring</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-green-600" />
                Data Protection & Security
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="mb-4">
                  We implement industry-leading security measures to protect your personal information:
                </p>
                <ul className="space-y-2">
                  <li>• <strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256</li>
                  <li>• <strong>Access Controls:</strong> Strict role-based access to customer data</li>
                  <li>• <strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
                  <li>• <strong>Compliance:</strong> PCI DSS Level 1 certified and CBN licensed</li>
                  <li>• <strong>Regular Audits:</strong> Third-party security assessments and penetration testing</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Information Sharing
              </h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold">Service Providers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    With trusted partners who help us operate our platform (payment processors, banks, etc.)
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">Legal Requirements</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When required by law, court order, or to protect our rights and safety
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-semibold">Business Transfers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    In connection with mergers, acquisitions, or sales of company assets
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Bell className="w-6 h-6 mr-2 text-green-600" />
                Your Rights & Choices
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Access & Correction</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Request access to your personal data and correct any inaccuracies
                  </p>
                  
                  <h4 className="font-semibold mb-2">Data Deletion</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Request deletion of your account and associated data
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Communication Preferences</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Control marketing communications and notification settings
                  </p>
                  
                  <h4 className="font-semibold mb-2">Data Portability</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Request a copy of your data in a portable format
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="space-y-2">
                <li>• Provide our services and support your account</li>
                <li>• Comply with legal and regulatory requirements</li>
                <li>• Resolve disputes and enforce our agreements</li>
                <li>• Prevent fraud and ensure platform security</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Transaction records are typically retained for 7 years as required by Nigerian financial regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p>Required for basic platform functionality</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p>Help us understand usage patterns</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Preference Cookies</h4>
                    <p>Remember your settings and preferences</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <p className="mb-4">
                  If you have questions about this Privacy Policy or want to exercise your rights:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@paybills.ng</p>
                  <p><strong>Phone:</strong> +234 123 456 7890</p>
                  <p><strong>Address:</strong> 123 Victoria Island, Lagos State, Nigeria</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices 
                or applicable laws. We will notify you of significant changes through:
              </p>
              <ul className="space-y-2">
                <li>• Email notifications to your registered address</li>
                <li>• In-app notifications and banners</li>
                <li>• Updates posted on our website</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Continued use of our services after policy updates constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}