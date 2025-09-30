import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // All searchable content across the platform
  const searchableContent: SearchResult[] = [
    // Main pages
    {
      id: 'home',
      title: 'Home',
      description: 'Main dashboard with all services and quick access',
      url: '/',
      category: 'Main',
      keywords: ['dashboard', 'main', 'overview', 'services']
    },
    {
      id: 'software',
      title: 'Software',
      description: 'Browse and purchase software licenses and activations',
      url: '/software',
      category: 'Services',
      keywords: ['software', 'licenses', 'activation', 'windows', 'office', 'microsoft']
    },
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Complete identity verification for higher limits',
      url: '/kyc',
      category: 'Account',
      keywords: ['kyc', 'verification', 'identity', 'documents', 'limits']
    },
    {
      id: 'rewards',
      title: 'Rewards & Referrals',
      description: 'Earn cashback and refer friends for bonuses',
      url: '/rewards',
      category: 'Rewards',
      keywords: ['cashback', 'referral', 'rewards', 'bonuses', 'earn']
    },
    
    // Service pages
    {
      id: 'betting',
      title: 'Betting Wallet Funding',
      description: 'Fund your betting accounts on major platforms',
      url: '/betting',
      category: 'Services',
      keywords: ['betting', 'sportybet', 'bet9ja', 'nairabit', '1xbet', 'gambling']
    },
    {
      id: 'airtime',
      title: 'Airtime & Data',
      description: 'Buy airtime and data for all Nigerian networks',
      url: '/airtime-data',
      category: 'Services',
      keywords: ['airtime', 'data', 'mtn', 'glo', 'airtel', '9mobile', 'recharge']
    },
    {
      id: 'utilities',
      title: 'Utility Bills',
      description: 'Pay electricity, water and other utility bills',
      url: '/utilities',
      category: 'Services',
      keywords: ['electricity', 'bills', 'utility', 'phcn', 'nepa', 'water']
    },
    {
      id: 'education',
      title: 'Education Payments',
      description: 'Pay for educational services and courses',
      url: '/education',
      category: 'Services',
      keywords: ['education', 'school', 'university', 'courses', 'tuition']
    },
    
    // Information pages
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about Paybills.ng and our mission',
      url: '/about',
      category: 'Information',
      keywords: ['about', 'company', 'mission', 'team', 'story']
    },
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Get help and contact customer support',
      url: '/contact',
      category: 'Support',
      keywords: ['contact', 'support', 'help', 'customer service', 'assistance']
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Latest insights, tips, and news about digital payments and fintech',
      url: '/blog',
      category: 'Information',
      keywords: ['blog', 'news', 'insights', 'tips', 'articles', 'fintech']
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Frequently asked questions and answers about our services',
      url: '/faq',
      category: 'Support',
      keywords: ['faq', 'questions', 'answers', 'help', 'common issues', 'support']
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Our privacy policy and data protection practices',
      url: '/privacy',
      category: 'Legal',
      keywords: ['privacy', 'policy', 'data', 'protection', 'gdpr']
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      description: 'Terms and conditions for using our platform',
      url: '/terms',
      category: 'Legal',
      keywords: ['terms', 'conditions', 'legal', 'agreement', 'service']
    },
    
    // Agent and account pages
    {
      id: 'agent',
      title: 'Become an Agent',
      description: 'Join our agent network and earn commissions',
      url: '/agent',
      category: 'Business',
      keywords: ['agent', 'commission', 'business', 'earn', 'network']
    },
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'Manage your wallet balance and transactions',
      url: '/wallet',
      category: 'Account',
      keywords: ['wallet', 'balance', 'fund', 'withdraw', 'money']
    },
    {
      id: 'transactions',
      title: 'Transaction History',
      description: 'View your complete transaction history',
      url: '/transactions',
      category: 'Account',
      keywords: ['transactions', 'history', 'payments', 'receipts']
    },
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your account profile and settings',
      url: '/profile',
      category: 'Account',
      keywords: ['profile', 'settings', 'account', 'personal', 'edit']
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'View and manage your notifications',
      url: '/notifications',
      category: 'Account',
      keywords: ['notifications', 'alerts', 'messages', 'updates']
    }
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Search logic
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = searchableContent.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...item.keywords
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });

    // Sort by relevance (title matches first, then description, then keywords)
    filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 3 : 0;
      const aDesc = a.description.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
      const aKeywords = a.keywords.some(k => k.includes(query.toLowerCase())) ? 1 : 0;
      
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 3 : 0;
      const bDesc = b.description.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
      const bKeywords = b.keywords.some(k => k.includes(query.toLowerCase())) ? 1 : 0;

      return (bTitle + bDesc + bKeywords) - (aTitle + aDesc + aKeywords);
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 results
  }, [query]);

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToRecentSearches = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleResultClick = (result: SearchResult) => {
    addToRecentSearches(query);
    setIsOpen(false);
    setQuery('');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Services': return 'bg-green-100 text-green-800';
      case 'Account': return 'bg-blue-100 text-blue-800';
      case 'Information': return 'bg-purple-100 text-purple-800';
      case 'Legal': return 'bg-gray-100 text-gray-800';
      case 'Support': return 'bg-orange-100 text-orange-800';
      case 'Business': return 'bg-yellow-100 text-yellow-800';
      case 'Rewards': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="w-9 h-9 text-white hover:bg-green-500"
      >
        <Search className="w-4 h-4" />
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anything on Paybills.ng..."
                  className="border-0 focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Ctrl+K
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {query.trim().length < 2 ? (
                // Recent searches and suggestions
                <div className="p-4 space-y-4">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Recent Searches
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearRecentSearches}
                          className="text-xs"
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer"
                            onClick={() => setQuery(search)}
                          >
                            <span className="text-sm">{search}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Quick Access
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['software', 'betting', 'blog', 'faq', 'airtime', 'kyc'].map(item => {
                        const result = searchableContent.find(s => s.id === item);
                        return result ? (
                          <Link key={item} href={result.url} onClick={() => setIsOpen(false)}>
                            <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                              <p className="font-medium text-sm">{result.title}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                {result.description}
                              </p>
                            </div>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                // Search results
                <div className="divide-y">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-sm">{result.title}</h3>
                              <Badge className={`text-xs ${getCategoryColor(result.category)}`}>
                                {result.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {result.description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <span>{result.url}</span>
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                // No results
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try different keywords or check spelling
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}