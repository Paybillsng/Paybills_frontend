import React, { useState } from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  BookOpen,
  TrendingUp,
  Shield,
  Smartphone,
  CreditCard,
  ArrowRight,
  Eye,
  MessageCircle
} from 'lucide-react';
import { Link } from 'wouter';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  comments: number;
  featured: boolean;
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Complete Guide to Digital Payments in Nigeria 2025',
      excerpt: 'Everything you need to know about digital payments, from mobile money to online banking, and how to stay secure.',
      content: '',
      author: 'Paybills Team',
      date: '2025-01-25',
      readTime: '8 min read',
      category: 'guides',
      tags: ['digital payments', 'security', 'nigeria', 'fintech'],
      views: 2340,
      comments: 45,
      featured: true
    },
    {
      id: '2',
      title: 'How to Secure Your Online Transactions',
      excerpt: 'Essential security tips to protect yourself when making online payments and managing your digital wallet.',
      content: '',
      author: 'Security Team',
      date: '2025-01-24',
      readTime: '6 min read',
      category: 'security',
      tags: ['security', 'tips', 'online safety'],
      views: 1890,
      comments: 32,
      featured: true
    },
    {
      id: '3',
      title: 'Understanding Cryptocurrency and Digital Assets',
      excerpt: 'A beginner-friendly introduction to cryptocurrency, blockchain technology, and digital asset management.',
      content: '',
      author: 'Crypto Team',
      date: '2025-01-23',
      readTime: '10 min read',
      category: 'crypto',
      tags: ['cryptocurrency', 'blockchain', 'digital assets'],
      views: 3210,
      comments: 67,
      featured: false
    },
    {
      id: '4',
      title: 'Best Practices for Bill Payment Management',
      excerpt: 'Learn how to organize and automate your bill payments for better financial management.',
      content: '',
      author: 'Finance Team',
      date: '2025-01-22',
      readTime: '5 min read',
      category: 'tips',
      tags: ['bill payment', 'finance', 'automation'],
      views: 1560,
      comments: 28,
      featured: false
    },
    {
      id: '5',
      title: 'Mobile Banking vs Traditional Banking in Nigeria',
      excerpt: 'Comparing the advantages and disadvantages of mobile banking versus traditional banking methods.',
      content: '',
      author: 'Banking Team',
      date: '2025-01-21',
      readTime: '7 min read',
      category: 'banking',
      tags: ['mobile banking', 'traditional banking', 'comparison'],
      views: 2100,
      comments: 41,
      featured: false
    },
    {
      id: '6',
      title: 'Software Licensing: What You Need to Know',
      excerpt: 'Understanding software licenses, genuine products, and how to avoid counterfeit software.',
      content: '',
      author: 'Software Team',
      date: '2025-01-20',
      readTime: '6 min read',
      category: 'software',
      tags: ['software', 'licensing', 'genuine products'],
      views: 1750,
      comments: 35,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'guides', label: 'Guides', count: blogPosts.filter(p => p.category === 'guides').length },
    { id: 'security', label: 'Security', count: blogPosts.filter(p => p.category === 'security').length },
    { id: 'tips', label: 'Tips', count: blogPosts.filter(p => p.category === 'tips').length },
    { id: 'banking', label: 'Banking', count: blogPosts.filter(p => p.category === 'banking').length },
    { id: 'software', label: 'Software', count: blogPosts.filter(p => p.category === 'software').length },
    { id: 'crypto', label: 'Crypto', count: blogPosts.filter(p => p.category === 'crypto').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guides': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'tips': return 'bg-blue-100 text-blue-800';
      case 'banking': return 'bg-purple-100 text-purple-800';
      case 'software': return 'bg-orange-100 text-orange-800';
      case 'crypto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Paybills Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Stay updated with the latest insights, tips, and news about digital payments and fintech in Nigeria
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            {selectedCategory === 'all' && featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-all cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-green-600 transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="group-hover:text-green-600">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.label} Articles`}
              </h2>
              
              {filteredPosts.length > 0 ? (
                <div className="grid gap-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getCategoryColor(post.category)}>
                                {post.category}
                              </Badge>
                              {post.featured && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{post.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-48">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                              Read Article
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search terms or selecting a different category
                  </p>
                </div>
              )}
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest fintech insights, security tips, and platform updates delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email address"
                    className="flex-1"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
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