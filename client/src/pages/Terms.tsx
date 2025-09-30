import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, CreditCard, Shield, Users, Gavel } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: January 25, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border-l-4 border-green-600">
                <p>
                  By accessing or using Paybills.ng ("Platform"), you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using or accessing this platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Account Registration & Eligibility
              </h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Eligibility Requirements</h3>
                <ul className="space-y-2">
                  <li>• Must be at least 18 years old or the age of majority in your jurisdiction</li>
                  <li>• Must be a Nigerian resident or have a valid Nigerian identification</li>
                  <li>• Must provide accurate and complete registration information</li>
                  <li>• Must not be prohibited from using financial services under Nigerian law</li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6">Account Security</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="mb-2">You are responsible for:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Maintaining the confidentiality of your account credentials</li>
                    <li>• All activities that occur under your account</li>
                    <li>• Immediately notifying us of any unauthorized use</li>
                    <li>• Using strong passwords and enabling two-factor authentication</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-green-600" />
                Services & Payments
              </h2>
              
              <h3 className="text-lg font-semibold mb-3">Available Services</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bill Payment Services</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Electricity bill payments</li>
                    <li>• Airtime and data purchases</li>
                    <li>• Cable TV subscriptions</li>
                    <li>• Internet service payments</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Digital Products</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Software licenses</li>
                    <li>• Educational payments</li>
                    <li>• Gaming and betting</li>
                    <li>• Digital gift cards</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Payment Terms</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <ul className="space-y-2">
                  <li>• All payments are processed in Nigerian Naira (₦)</li>
                  <li>• Service fees are clearly displayed before transaction completion</li>
                  <li>• Transactions are generally processed instantly but may take up to 30 minutes</li>
                  <li>• Failed transactions are automatically refunded within 24-48 hours</li>
                  <li>• You are responsible for ensuring sufficient account balance</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
                Prohibited Activities
              </h2>
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border-l-4 border-red-600">
                <p className="mb-4">The following activities are strictly prohibited:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Financial Misconduct</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Money laundering or fraud</li>
                      <li>• Unauthorized access to accounts</li>
                      <li>• Chargebacks or payment disputes in bad faith</li>
                      <li>• Using stolen payment methods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Platform Abuse</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Creating multiple accounts</li>
                      <li>• Attempting to hack or exploit vulnerabilities</li>
                      <li>• Interfering with other users' accounts</li>
                      <li>• Using automated scripts or bots</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                Liability & Disclaimers
              </h2>
              
              <h3 className="text-lg font-semibold mb-3">Service Availability</h3>
              <p className="mb-4">
                While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. 
                We may temporarily suspend services for maintenance, security updates, or due to circumstances beyond our control.
              </p>

              <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="mb-3">
                  Paybills.ng shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to:
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Loss of profits, data, or business opportunities</li>
                  <li>• Third-party service failures or delays</li>
                  <li>• Technical issues with payment processors or banks</li>
                  <li>• Damages exceeding the amount of fees paid in the last 12 months</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality on Paybills.ng are owned by us and protected by Nigerian and international copyright, trademark, and other intellectual property laws.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">You may not:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Copy, modify, or distribute our content without permission</li>
                  <li>• Use our trademarks or logos without authorization</li>
                  <li>• Reverse engineer or attempt to extract source code</li>
                  <li>• Create derivative works based on our platform</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy & Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>, 
                which forms part of these Terms of Service.
              </p>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-sm">
                  By using our services, you consent to the collection and use of your information 
                  as described in our Privacy Policy and in compliance with Nigerian data protection laws.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Gavel className="w-6 h-6 mr-2 text-green-600" />
                Dispute Resolution
              </h2>
              
              <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
              <p className="mb-4">
                For any disputes or issues, first contact our customer support team at support@paybills.ng 
                or +234 123 456 7890. We will make every effort to resolve issues within 48 hours.
              </p>

              <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm">
                  These Terms of Service are governed by the laws of the Federal Republic of Nigeria. 
                  Any disputes that cannot be resolved through customer support will be subject to 
                  the jurisdiction of Nigerian courts.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Account Termination</h2>
              
              <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
              <p className="mb-4">
                You may terminate your account at any time by contacting customer support. 
                Upon termination, you remain liable for all charges incurred before termination.
              </p>

              <h3 className="text-lg font-semibold mb-3">Termination by Us</h3>
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border-l-4 border-orange-600">
                <p className="mb-2">We may suspend or terminate your account for:</p>
                <ul className="text-sm space-y-1">
                  <li>• Violation of these Terms of Service</li>
                  <li>• Suspected fraudulent or illegal activity</li>
                  <li>• Failure to pay fees or charges</li>
                  <li>• Extended periods of inactivity (12+ months)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective 
                immediately upon posting on our website. We will notify users of significant changes through:
              </p>
              <ul className="space-y-2 mb-4">
                <li>• Email notifications</li>
                <li>• In-app announcements</li>
                <li>• Website banners</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm">
                  Your continued use of the platform after changes constitutes acceptance of the new terms. 
                  If you disagree with changes, you must discontinue use of our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <p className="mb-4">For questions about these Terms of Service, contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@paybills.ng</p>
                  <p><strong>Phone:</strong> +234 123 456 7890</p>
                  <p><strong>Address:</strong> 123 Victoria Island, Lagos State, Nigeria</p>
                  <p><strong>Business Hours:</strong> Monday-Friday, 8AM-8PM WAT</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}