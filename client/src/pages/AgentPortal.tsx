import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield,
  UserPlus,
  LogIn,
  Chrome,
  ArrowLeft
} from 'lucide-react';

export default function AgentPortal() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const agentBenefits = [
    {
      icon: DollarSign,
      title: 'Earn Commission',
      description: 'Get up to 15% commission on every transaction from your referrals'
    },
    {
      icon: Users,
      title: 'Build Your Network',
      description: 'Invite customers and grow your business network'
    },
    {
      icon: TrendingUp,
      title: 'Track Performance',
      description: 'Monitor your earnings and performance with detailed analytics'
    },
    {
      icon: Shield,
      title: 'Trusted Platform',
      description: 'Work with Nigeria\'s most trusted fintech platform'
    }
  ];

  const handleGoogleAuth = () => {
    // Implement Google OAuth flow
    console.log('Google authentication for agents');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Return to Home Button */}
      <div className="container mx-auto px-4 pt-4">
        <Link href="/">
          <Button variant="outline" className="flex items-center space-x-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Agent Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our agent network and earn money by helping customers with their digital payment needs
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Why Become an Agent?
                </h2>
                <div className="space-y-6">
                  {agentBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">2,500+</div>
                    <div className="text-blue-100">Active Agents</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">₦5M+</div>
                    <div className="text-green-100">Paid Out Monthly</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="lg:pl-8">
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isLoginMode ? 'Agent Login' : 'Join as Agent'}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isLoginMode 
                      ? 'Access your agent dashboard' 
                      : 'Start earning as a Paybills.ng agent'
                    }
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Google OAuth Button */}
                  <Button
                    onClick={handleGoogleAuth}
                    className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
                    variant="outline"
                  >
                    <Chrome className="w-5 h-5 mr-3" />
                    {isLoginMode ? 'Login' : 'Sign up'} with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  {/* Traditional Login/Signup Options */}
                  <div className="space-y-4">
                    <Link href={isLoginMode ? "/agent/login" : "/agent/register"}>
                      <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                        {isLoginMode ? (
                          <>
                            <LogIn className="w-5 h-5 mr-2" />
                            Agent Login
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5 mr-2" />
                            Register as Agent
                          </>
                        )}
                      </Button>
                    </Link>

                    <div className="text-center">
                      <button
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {isLoginMode 
                          ? "Don't have an agent account? Register here" 
                          : "Already an agent? Login here"
                        }
                      </button>
                    </div>
                  </div>

                  {/* Agent Requirements */}
                  {!isLoginMode && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Agent Requirements:
                      </h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Valid Nigerian ID (NIN/BVN)</li>
                        <li>• Active bank account</li>
                        <li>• Smartphone with internet access</li>
                        <li>• Basic understanding of digital payments</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Support */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need help? Contact our agent support team
                </p>
                <Link href="/contact">
                  <Button variant="link" className="text-blue-600 hover:text-blue-700">
                    Get Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Agent Success Stories */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Adebayo O.",
                  location: "Lagos",
                  earnings: "₦150,000/month",
                  story: "I started as a part-time agent and now earn more than my main job!"
                },
                {
                  name: "Fatima A.",
                  location: "Abuja",
                  earnings: "₦80,000/month",
                  story: "Perfect side hustle while studying. Flexible hours and good income."
                },
                {
                  name: "Chinedu E.",
                  location: "Port Harcourt",
                  earnings: "₦200,000/month",
                  story: "Built a network of 500+ customers. The platform makes it so easy!"
                }
              ].map((story, index) => (
                <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {story.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-semibold text-gray-900 dark:text-white">{story.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{story.location}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {story.earnings}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      "{story.story}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}