import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import GlobalSearch from '@/components/GlobalSearch';
import { 
  CreditCard, 
  Sun, 
  Moon, 
  Home,
  Info,
  Phone,
  HelpCircle
} from 'lucide-react';

export default function StandaloneSoftwareNav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-orange-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-green-500 group-hover:shadow-lg logo-pulse logo-bounce">
              <CreditCard className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold transition-all duration-300 group-hover:text-green-100 group-hover:scale-105">Paybills.ng</span>
              <span className="text-xs text-orange-100 transition-all duration-300 group-hover:text-green-200 group-hover:font-medium">easy...reliable</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <div className="flex items-center space-x-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                <Home className="w-4 h-4" />
                <span>Main Site</span>
              </div>
            </Link>
            <Link href="/about">
              <div className="flex items-center space-x-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                <Info className="w-4 h-4" />
                <span>About</span>
              </div>
            </Link>
            <Link href="/contact">
              <div className="flex items-center space-x-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </div>
            </Link>
            <Link href="/help">
              <div className="flex items-center space-x-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </div>
            </Link>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <GlobalSearch />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 text-white hover:bg-white/20"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-orange-600 hover:bg-white/90">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}