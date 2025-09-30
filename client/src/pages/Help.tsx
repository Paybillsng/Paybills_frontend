import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  Book,
  Video,
  FileText,
  Users,
  Headphones,
  ExternalLink
} from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of using Paybills.ng",
      topics: [
        "Creating your account",
        "Verifying your phone number", 
        "Setting up your profile",
        "Understanding the dashboard"
      ]
    },
    {
      title: "Bill Payments",
      icon: FileText,
      description: "Everything about paying your bills",
      topics: [
        "Electricity bill payments",
        "Cable TV subscriptions",
        "Internet bill payments",
        "Water bill payments"
      ]
    },
    {
      title: "Airtime & Data",
      icon: Phone,
      description: "Buy airtime and data for all networks",
      topics: [
        "MTN airtime and data",
        "Glo airtime and data",
        "Airtel and 9mobile",
        "Bulk airtime purchases"
      ]
    },
    {
      title: "Software Store",
      icon: Video,
      description: "Purchase and activate software licenses",
      topics: [
        "Microsoft Office activation",
        "Windows license keys",
        "Antivirus software",
        "Professional software tools"
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7",
      response: "Immediate",
      action: "Start Chat",
      href: "/contact"
    },
    {
      title: "Email Support", 
      description: "Send us a detailed message about your issue",
      icon: Mail,
      availability: "24/7",
      response: "Within 2 hours",
      action: "Send Email",
      href: "mailto:support@paybills.ng"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our support agents",
      icon: Phone,
      availability: "8AM - 10PM",
      response: "Immediate",
      action: "Call Now",
      href: "tel:+2348000PAYBILLS"
    }
  ];

  const quickActions = [
    { title: "Check Transaction Status", description: "Track your recent payments", icon: Clock },
    { title: "Report a Problem", description: "Something not working right?", icon: HelpCircle },
    { title: "Account Settings", description: "Update your profile information", icon: Users },
    { title: "Security Settings", description: "Manage your account security", icon: Headphones }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of Paybills.ng
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help topics, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <action.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse Help Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {helpCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <category.icon className="w-6 h-6 mr-3 text-green-600" />
                      {category.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                          <span className="text-sm">{topic}</span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Articles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Get Direct Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <channel.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle>{channel.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{channel.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Availability:</span>
                        <Badge variant="secondary">{channel.availability}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Response:</span>
                        <Badge variant="outline">{channel.response}</Badge>
                      </div>
                    </div>
                    <Link href={channel.href}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        {channel.action}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular FAQs */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Popular Questions</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Quick answers to the most frequently asked questions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">How do I reset my password?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Go to login page and click "Forgot Password" to receive reset instructions
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Why was my transaction declined?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Common reasons include insufficient funds, network issues, or incorrect details
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">How long do refunds take?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Refunds typically process within 3-5 business days to your original payment method
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/faq">
                  <Button variant="outline" className="w-full">
                    View All FAQs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Emergency Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 dark:text-red-300 mb-4">
                For urgent issues like unauthorized transactions or account security concerns:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Hotline
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Priority Chat
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}