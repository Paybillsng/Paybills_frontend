import React, { useState } from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Smartphone,
  Users,
  Settings,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'wouter';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account on Paybills.ng?',
      answer: 'Creating an account is simple! Click the "Sign Up" button on our homepage, provide your email address, phone number, and create a secure password. You\'ll receive a verification code via SMS to confirm your account. Once verified, you can start using all our services immediately.',
      category: 'account',
      tags: ['signup', 'registration', 'account creation'],
      helpful: 245,
      notHelpful: 12
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including bank transfers, debit cards (Visa, Mastercard, Verve), USSD codes, mobile money (from MTN, Glo, Airtel, 9mobile), and direct bank account debits. All payments are processed securely through our encrypted payment gateway.',
      category: 'payments',
      tags: ['payment methods', 'cards', 'bank transfer', 'mobile money'],
      helpful: 189,
      notHelpful: 8
    },
    {
      id: '3',
      question: 'Is my personal and financial information secure?',
      answer: 'Absolutely! We use bank-level 256-bit SSL encryption to protect all your data. We\'re PCI DSS compliant and follow strict data protection protocols. Your financial information is never stored on our servers - it\'s processed securely through our certified payment partners.',
      category: 'security',
      tags: ['security', 'privacy', 'encryption', 'data protection'],
      helpful: 312,
      notHelpful: 5
    },
    {
      id: '4',
      question: 'How long does it take to process bill payments?',
      answer: 'Most bill payments are processed instantly! Electricity bills typically reflect within 5-15 minutes, airtime and data are credited immediately, while cable TV subscriptions activate within 10-30 minutes. In rare cases, it may take up to 24 hours due to provider delays.',
      category: 'bills',
      tags: ['bill payment', 'processing time', 'electricity', 'airtime', 'cable tv'],
      helpful: 156,
      notHelpful: 23
    },
    {
      id: '5',
      question: 'Can I get a refund if my transaction fails?',
      answer: 'Yes! If your transaction fails but your account was debited, we automatically process a refund within 24-48 hours. For manual refund requests, contact our customer support with your transaction reference. Refunds typically take 3-5 business days to reflect in your account.',
      category: 'refunds',
      tags: ['refunds', 'failed transactions', 'customer support'],
      helpful: 98,
      notHelpful: 7
    },
    {
      id: '6',
      question: 'What software licenses do you offer?',
      answer: 'We offer genuine licenses for Microsoft Office, Windows OS, antivirus software (Norton, McAfee, Kaspersky), Adobe Creative Suite, and various productivity tools. All our software is 100% genuine with proper licensing documentation and full customer support.',
      category: 'software',
      tags: ['software', 'licenses', 'microsoft', 'antivirus', 'genuine'],
      helpful: 134,
      notHelpful: 15
    },
    {
      id: '7',
      question: 'How do I become an agent?',
      answer: 'To become an agent, visit our Agent Portal and complete the registration form. You\'ll need to provide business information, valid ID, and bank account details. After verification (usually 24-48 hours), you\'ll receive your agent dashboard with commission structure and marketing materials.',
      category: 'agent',
      tags: ['agent', 'registration', 'commission', 'business'],
      helpful: 87,
      notHelpful: 9
    },
    {
      id: '8',
      question: 'What are your transaction limits?',
      answer: 'Daily limits vary by verification level: Basic accounts have ₦50,000 daily limit, KYC Level 1 has ₦200,000, and KYC Level 2 has ₦1,000,000. Single transaction limits are ₦500,000 for most services. Complete KYC verification to increase your limits.',
      category: 'limits',
      tags: ['transaction limits', 'kyc', 'verification', 'daily limits'],
      helpful: 203,
      notHelpful: 18
    },
    {
      id: '9',
      question: 'Can I use Paybills.ng outside Nigeria?',
      answer: 'Paybills.ng is designed specifically for Nigerian services and requires a Nigerian phone number for registration. However, Nigerians living abroad can use our services with a valid Nigerian phone number and local bank account.',
      category: 'location',
      tags: ['international', 'nigeria', 'abroad', 'phone number'],
      helpful: 76,
      notHelpful: 12
    },
    {
      id: '10',
      question: 'How do I contact customer support?',
      answer: 'Our customer support is available 24/7! You can reach us via: Live chat on our website, WhatsApp at +234 123 456 7890, email at support@paybills.ng, or call our hotline at 0700-PAYBILLS. Average response time is under 2 minutes.',
      category: 'support',
      tags: ['customer support', 'contact', 'live chat', 'phone', 'email'],
      helpful: 167,
      notHelpful: 4
    },
    {
      id: '11',
      question: 'What is KYC and why do I need it?',
      answer: 'KYC (Know Your Customer) is a verification process required by Nigerian financial regulations. It helps prevent fraud and increases your transaction limits. Level 1 requires basic information and phone verification, Level 2 requires ID documents and address verification.',
      category: 'kyc',
      tags: ['kyc', 'verification', 'identity', 'regulations', 'limits'],
      helpful: 145,
      notHelpful: 11
    },
    {
      id: '12',
      question: 'How do I fund my wallet?',
      answer: 'You can fund your wallet through: Bank transfer to your dedicated account number, debit card payment, USSD transfer, mobile money, or visit any of our agent locations. Funding is instant for most methods and your wallet balance updates immediately.',
      category: 'wallet',
      tags: ['wallet funding', 'bank transfer', 'debit card', 'ussd', 'agents'],
      helpful: 198,
      notHelpful: 13
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle, count: faqItems.length },
    { id: 'account', label: 'Account & Registration', icon: Users, count: faqItems.filter(item => item.category === 'account').length },
    { id: 'payments', label: 'Payments & Methods', icon: CreditCard, count: faqItems.filter(item => item.category === 'payments').length },
    { id: 'security', label: 'Security & Privacy', icon: Shield, count: faqItems.filter(item => item.category === 'security').length },
    { id: 'bills', label: 'Bill Payments', icon: Smartphone, count: faqItems.filter(item => item.category === 'bills').length },
    { id: 'software', label: 'Software & Licenses', icon: Settings, count: faqItems.filter(item => item.category === 'software').length },
    { id: 'support', label: 'Customer Support', icon: MessageCircle, count: faqItems.filter(item => item.category === 'support').length }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'account': return 'bg-blue-100 text-blue-800';
      case 'payments': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'bills': return 'bg-purple-100 text-purple-800';
      case 'software': return 'bg-orange-100 text-orange-800';
      case 'support': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Find answers to common questions about Paybills.ng services, payments, and account management
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Browse by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className={`w-full justify-between ${selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-2" />
                            <span>{category.label}</span>
                          </div>
                          <Badge variant="secondary" className="ml-1">
                            {category.count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Still Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Live Chat
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Items */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === 'all' 
                      ? `All Questions (${filteredItems.length})` 
                      : `${categories.find(c => c.id === selectedCategory)?.label} (${filteredItems.length})`
                    }
                  </h2>
                </div>

                {filteredItems.length > 0 ? (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(item.id)}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getCategoryColor(item.category)}>
                                  {item.category}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg leading-relaxed">
                                {item.question}
                              </CardTitle>
                            </div>
                            <Button variant="ghost" size="sm">
                              {expandedItems.includes(item.id) ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        
                        {expandedItems.includes(item.id) && (
                          <CardContent>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag, index) => (
                                  <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Was this helpful?</span>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Yes ({item.helpful})
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    No ({item.notHelpful})
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No questions found</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Try adjusting your search terms or selecting a different category
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                )}

                {/* Didn't Find Answer */}
                <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Didn't find what you're looking for?</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our customer support team is here to help you 24/7
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/contact">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start Live Chat
                        </Button>
                      </Link>
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}