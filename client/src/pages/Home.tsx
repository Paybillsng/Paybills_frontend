import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import ActivationTool from '@/components/ActivationTool';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import NotificationSystem from '@/components/NotificationSystem';
import {
  CreditCard,
  Smartphone,
  Zap,
  GraduationCap,
  Dice6,
  Tv,
  Wifi,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  Laptop,
  Monitor,
  Users,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Main service categories based on your design
  const mainServices = [
    {
      id: 'electricity',
      title: 'Electricity',
      icon: Zap,
      href: '/utilities',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      id: 'airtime',
      title: 'Airtime',
      icon: Smartphone,
      href: '/airtime-data',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'cable-tv',
      title: 'Cable TV',
      icon: Tv,
      href: '/utilities',
      bgColor: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600'
    },
    {
      id: 'internet',
      title: 'Internet',
      icon: Wifi,
      href: '/utilities',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      href: '/education',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'betting',
      title: 'Betting',
      icon: Dice6,
      href: '/betting',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    }
  ];

  const stats = [
    { icon: Users, value: '500K+', label: 'Active Users' },
    { icon: TrendingUp, value: '₦10B+', label: 'Transactions Processed' },
    { icon: Award, value: '99.9%', label: 'Uptime' },
    { icon: Globe, value: '36', label: 'States Covered' }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-orange-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-green-500 logo-pulse logo-bounce">
                <CreditCard className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold transition-all duration-300 group-hover:text-green-100">Paybills.ng</span>
                <span className="text-xs text-orange-100 transition-all duration-300 group-hover:text-green-200">easy...reliable</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <Link href="/services">
                  <span className="text-sm font-medium hover:text-white/80 transition-colors">Personal</span>
                </Link>
                <Link href="/software">
                  <span className="text-sm font-medium hover:text-white/80 transition-colors">Software Store</span>
                </Link>
                <Link href="/agent">
                  <span className="text-sm font-medium hover:text-white/80 transition-colors">Agent</span>
                </Link>
              </nav>
              
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-9 h-9 text-white hover:bg-white/20"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/20">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-green-600 hover:bg-white/90">Sign Up</Button>
                </Link>
                <NotificationSystem />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/20"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                <Link href="/services">
                  <span className="text-white hover:text-white/80 transition-colors">Personal</span>
                </Link>
                <Link href="/software">
                  <span className="text-white hover:text-white/80 transition-colors">Commerce</span>
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-white text-red-500 hover:bg-white/90">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for a service"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-center bg-gray-100 dark:bg-gray-800 border-0 rounded-full"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Power Up Your{' '}
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Digital Life!</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              <span className="font-semibold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">easy</span>...
              <span className="font-semibold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">reliable</span> financial services
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {mainServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.id} href={service.href}>
                  <Card className={`${service.bgColor} ${service.hoverColor} text-white cursor-pointer transition-all duration-200 hover:scale-105 h-24 flex items-center justify-center`}>
                    <CardContent className="flex items-center space-x-4 p-6">
                      <Icon className="w-8 h-8" />
                      <span className="text-xl font-semibold">{service.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Featured Software Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Software & <span className="text-primary">Digital Tools</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Professional software licenses and activation services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/software">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Laptop className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Software Store</h3>
                    <p className="text-muted-foreground mb-4">
                      Licensed software, antivirus & productivity tools with instant delivery
                    </p>
                    <Badge variant="secondary">100% Genuine</Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/ms-activation">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Microsoft Activation</h3>
                    <p className="text-muted-foreground mb-4">
                      Activate Microsoft products with our automated tool
                    </p>
                    <Badge variant="secondary">Automated Process</Badge>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Free Activation Tool */}
          <div className="mb-16">
            <ActivationTool />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-primary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of Nigerians who trust Paybills.ng for their digital payments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="px-8">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/software">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse Software
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}