import React from 'react';
import { Link } from 'wouter';
import { 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Smartphone,
  Laptop,
  Zap
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home', icon: CreditCard },
    { href: '/software', label: 'Software Store', icon: Laptop },
    { href: '/services', label: 'Services', icon: Smartphone },
    { href: '/about', label: 'About Us', icon: Users },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy', icon: Shield },
    { href: '/terms', label: 'Terms of Service', icon: FileText },
    { href: '/refund', label: 'Refund Policy', icon: FileText },
    { href: '/disclaimer', label: 'Disclaimer', icon: FileText },
  ];

  const supportLinks = [
    { href: '/blog', label: 'Blog & News', icon: ExternalLink },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/contact', label: 'Contact Us', icon: Phone },
    { href: '/help', label: 'Help Center', icon: HelpCircle },
  ];

  const services = [
    'Airtime & Data',
    'Electricity Bills',
    'Cable TV Subscription',
    'Internet Bills',
    'Educational Payments',
    'Betting & Gaming'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center border-2 border-white">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">Paybills.ng</div>
                <div className="text-sm text-orange-300 font-medium">easy...reliable</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted digital payment platform for all Nigerian bill payments, 
              software purchases, and financial services. Fast, secure, and reliable.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+234 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@paybills.ng</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm">{link.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-300 text-sm flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-green-400" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <div className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <div className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-3">
                <a 
                  href="https://facebook.com/paybills.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com/paybills_ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/paybills.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/company/paybills-ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made in Nigeria with ❤️</span>
              <div className="w-6 h-4 bg-green-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Paybills.ng. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Licensed by CBN</span>
              <span>•</span>
              <span>SSL Secured</span>
              <span>•</span>
              <span>PCI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}