import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  User, 
  Phone, 
  CreditCard,
  Building,
  Camera,
  FileText
} from 'lucide-react';

interface KYCTier {
  level: 1 | 2 | 3;
  name: string;
  limit: string;
  requirements: string[];
  benefits: string[];
}

const kycTiers: KYCTier[] = [
  {
    level: 1,
    name: 'Basic',
    limit: '₦50,000/day',
    requirements: ['Phone verification', 'Email verification'],
    benefits: ['Basic bill payments', 'Airtime purchases', 'Basic wallet features', 'Money transfers']
  },
  {
    level: 2,
    name: 'Standard',
    limit: '₦200,000/day',
    requirements: ['Government ID (NIN/Passport)', 'Address verification', 'Selfie verification'],
    benefits: ['All Tier 1 benefits', 'Software purchases', 'Higher limits', '2% cashback']
  },
  {
    level: 3,
    name: 'Premium',
    limit: '₦1,000,000/day',
    requirements: ['Bank statement', 'Utility bill', 'Income verification'],
    benefits: ['All previous benefits', 'Investment products', 'Priority support', '5% cashback', 'VIP features']
  }
];

export default function KYCComponent() {
  const [currentTier, setCurrentTier] = useState<1 | 2 | 3>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(2);

  const getKYCProgress = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return 33;
      case 2: return 66;
      case 3: return 100;
      default: return 0;
    }
  };

  const getTierColor = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3: return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = (type: string) => {
    // Handle file upload
    console.log(`Uploading ${type}`);
  };

  const handleKYCSubmit = () => {
    setIsVerifying(true);
    // Simulate KYC processing
    setTimeout(() => {
      setCurrentTier(selectedTier);
      setIsVerifying(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Current KYC Status */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              KYC Verification Status
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Status */}
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
              <div>
                <p className="font-semibold text-lg">Current Tier: {kycTiers[currentTier - 1].name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Transaction limit: {kycTiers[currentTier - 1].limit}</p>
                <p className="text-xs text-green-600 mt-1">
                  ✓ Phone verification complete • ✓ Email verification complete
                </p>
              </div>
              <Badge className={getTierColor(currentTier)}>
                Tier {currentTier} Active
              </Badge>
            </div>
            
            {/* Basic Information Display */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600">Current Benefits</h4>
                <ul className="space-y-1">
                  {kycTiers[currentTier - 1].benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600">Next Tier Benefits</h4>
                <ul className="space-y-1">
                  {currentTier < 3 ? kycTiers[currentTier].benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  )) : (
                    <li className="text-sm flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>You have the highest tier!</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall KYC Progress</span>
                <span className="font-semibold">{getKYCProgress(currentTier)}%</span>
              </div>
              <Progress value={getKYCProgress(currentTier)} className="h-3" />
              <p className="text-xs text-gray-500">
                {currentTier === 1 ? 'Complete Standard tier to increase your limits to ₦200,000/day' : 
                 currentTier === 2 ? 'Complete Premium tier to unlock VIP features and ₦1,000,000/day limits' :
                 'You have completed all KYC tiers and unlocked all features!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Tiers Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        {kycTiers.map((tier) => (
          <Card 
            key={tier.level}
            className={`cursor-pointer transition-all ${
              selectedTier === tier.level 
                ? 'ring-2 ring-green-500 border-green-500' 
                : 'hover:shadow-lg'
            } ${currentTier >= tier.level ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : ''}`}
            onClick={() => setSelectedTier(tier.level)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  {tier.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {currentTier >= tier.level && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <Badge className={getTierColor(tier.level)}>
                    Tier {tier.level}
                  </Badge>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">{tier.limit}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {tier.requirements.map((req, index) => (
                      <li key={index} className="text-sm flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KYC Upgrade Form */}
      {selectedTier > currentTier && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to {kycTiers[selectedTier - 1].name} Tier</CardTitle>
            <p className="text-gray-600">
              Complete the requirements below to upgrade your account
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Personal Information */}
              {selectedTier >= 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Personal Information</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nin">National Identification Number (NIN)</Label>
                      <Input id="nin" placeholder="Enter your NIN" />
                    </div>
                    <div>
                      <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                      <Input id="bvn" placeholder="Enter your BVN" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Home Address</Label>
                      <Input id="address" placeholder="Enter your full address" />
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="Enter your occupation" />
                    </div>
                  </div>
                </div>
              )}

              {/* Document Upload */}
              {selectedTier >= 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Document Verification</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Government ID</p>
                      <p className="text-xs text-gray-500 mb-3">Upload your NIN slip, passport, or driver's license</p>
                      <Button size="sm" variant="outline" onClick={() => handleFileUpload('id')}>
                        Upload ID
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Selfie Verification</p>
                      <p className="text-xs text-gray-500 mb-3">Take a clear selfie for verification</p>
                      <Button size="sm" variant="outline" onClick={() => handleFileUpload('selfie')}>
                        Take Selfie
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Premium Tier Requirements */}
              {selectedTier === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Financial Information</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Bank Statement</p>
                      <p className="text-xs text-gray-500 mb-3">Last 3 months bank statement</p>
                      <Button size="sm" variant="outline" onClick={() => handleFileUpload('statement')}>
                        Upload Statement
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Utility Bill</p>
                      <p className="text-xs text-gray-500 mb-3">Recent utility bill for address verification</p>
                      <Button size="sm" variant="outline" onClick={() => handleFileUpload('utility')}>
                        Upload Bill
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="income">Monthly Income Range</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select income range</option>
                      <option value="50-100k">₦50,000 - ₦100,000</option>
                      <option value="100-300k">₦100,000 - ₦300,000</option>
                      <option value="300-500k">₦300,000 - ₦500,000</option>
                      <option value="500k+">₦500,000+</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button 
                  onClick={handleKYCSubmit}
                  disabled={isVerifying}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying Documents...
                    </>
                  ) : (
                    `Submit for ${kycTiers[selectedTier - 1].name} Tier Verification`
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Verification typically takes 24-48 hours. You'll be notified once complete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}