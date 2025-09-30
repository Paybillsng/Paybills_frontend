import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Wifi, 
  Zap, 
  GraduationCap, 
  Dice6, 
  Laptop, 
  ArrowRight,
  Star,
  Monitor
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'airtime-data',
      title: 'Airtime & Data',
      description: 'Buy airtime and data bundles for all Nigerian networks',
      icon: Smartphone,
      href: '/airtime-data',
      color: 'primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      features: ['All Networks', 'Instant Delivery', 'Best Rates'],
    },
    {
      id: 'utilities',
      title: 'Utilities',
      description: 'Pay for electricity, cable TV, and other utility bills',
      icon: Zap,
      href: '/utilities',
      color: 'warning',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      features: ['Electricity Bills', 'Cable TV', 'Quick Payment'],
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Purchase WAEC, NECO, JAMB, and other educational pins',
      icon: GraduationCap,
      href: '/education',
      color: 'success',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      features: ['WAEC', 'NECO', 'JAMB'],
    },
    {
      id: 'betting',
      title: 'Betting',
      description: 'Fund your betting wallets across major platforms',
      icon: Dice6,
      href: '/betting',
      color: 'destructive',
      bgColor: 'bg-destructive/10',
      textColor: 'text-destructive',
      features: ['All Platforms', 'Instant Credit', '18+ Only'],
    },
    {
      id: 'software',
      title: 'Software',
      description: 'Purchase licensed software, antivirus, and productivity tools',
      icon: Laptop,
      href: '/software',
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      features: ['Licensed Software', 'Instant Delivery', 'Support Included'],
    },
    {
      id: 'microsoft',
      title: 'Microsoft Activation',
      description: 'Activate Microsoft products with our automated tool',
      icon: Monitor,
      href: '/ms-activation',
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      features: ['Office 365', 'Windows', 'Automated'],
    },
  ];

  const popularServices = ['airtime-data', 'utilities', 'software', 'microsoft'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our wide range of digital services and utilities. 
            Fast, secure, and reliable payments for all your needs.
          </p>
        </div>

        {/* Popular Services */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Popular Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services
              .filter(service => popularServices.includes(service.id))
              .map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.id} href={service.href}>
                    <Card className="card-hover group cursor-pointer border-2 hover:border-primary transition-all duration-200">
                      <CardHeader>
                        <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                          <Icon className={`w-8 h-8 ${service.textColor}`} />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, index) => (
                              <span
                                key={index}
                                className="text-xs bg-muted px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* All Services */}
        <div>
          <h2 className="text-xl font-semibold mb-6">All Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isPopular = popularServices.includes(service.id);
              
              return (
                <Link key={service.id} href={service.href}>
                  <Card className="card-hover group cursor-pointer relative">
                    {isPopular && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                        <Icon className={`w-8 h-8 ${service.textColor}`} />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-muted px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to help you with any questions or issues.
            </p>
            <Button variant="outline">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
