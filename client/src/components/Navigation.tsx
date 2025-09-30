import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTheme } from '@/components/ThemeProvider';
import NotificationSystem from '@/components/NotificationSystem';
import GlobalSearch from '@/components/GlobalSearch';
import {
  Menu,
  X,
  Home,
  Laptop,
  Sun,
  Moon,
  CreditCard,
  Smartphone,
  Zap,
  GraduationCap,
  Users,
  Monitor,
  Shield,
  Gift,
  Info,
  Phone,
  UserPlus,
  HelpCircle
} from 'lucide-react';

export default function PublicNavigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/software', label: 'Software', icon: Monitor },
    { href: '/blog', label: 'Blog', icon: Users },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/kyc', label: 'KYC Verification', icon: Shield },
    { href: '/rewards', label: 'Rewards', icon: Gift },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/agent', label: 'Become Agent', icon: UserPlus },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      {/* Mobile Navigation Header */}
      <header className="lg:hidden bg-orange-600 dark:bg-orange-700 border-b border-orange-500 dark:border-orange-600 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-green-500 logo-pulse">
              <CreditCard className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white transition-all duration-300 group-hover:text-green-100">Paybills.ng</span>
              <span className="text-xs text-orange-100 transition-all duration-300 group-hover:text-green-200">easy...reliable</span>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 text-white hover:bg-orange-500"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <LanguageSwitcher />
            
            <GlobalSearch />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 text-white hover:bg-orange-500"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-orange-500 dark:bg-orange-600 border-t border-orange-400 dark:border-orange-500">
            <nav className="p-4 space-y-2">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-orange-600 text-white'
                      : 'text-white hover:bg-orange-400'
                  }`}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-green-500 group-hover:shadow-lg logo-pulse">
              <CreditCard className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-green-500 group-hover:to-orange-500">Paybills.ng</div>
              <div className="text-xs text-gray-500 transition-all duration-300 group-hover:text-green-600 group-hover:font-medium">easy...reliable</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Public Pages
          </div>
          
          {publicNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-950 dark:to-green-950 text-orange-600 dark:text-orange-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </aside>
    </>
  );
}