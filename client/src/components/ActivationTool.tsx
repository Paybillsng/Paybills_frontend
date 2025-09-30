import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ActivationTool() {
  const [confirmationId, setConfirmationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(1);
  const { toast } = useToast();

  const handleActivate = async () => {
    if (!confirmationId.trim()) {
      toast({
        title: "Missing Confirmation ID",
        description: "Please enter a valid confirmation ID to activate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate activation process
    setTimeout(() => {
      if (freeUsesRemaining > 0) {
        setFreeUsesRemaining(prev => prev - 1);
        toast({
          title: "Activation Successful! 🎉",
          description: `Product activated successfully. ${freeUsesRemaining - 1} free activations remaining.`,
        });
      } else {
        toast({
          title: "Free Limit Reached",
          description: "Please purchase activation credits to continue. Only ₦1,500 per activation!",
          variant: "destructive",
        });
      }
      setIsLoading(false);
      setConfirmationId('');
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
            Free Software Activation
          </CardTitle>
        </div>
        <CardDescription className="text-base text-gray-600 dark:text-gray-300">
          Get your confirmation ID for microsoft office and windows.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Free Usage Counter */}
        <div className="flex justify-center">
          <Badge variant={freeUsesRemaining > 0 ? "default" : "secondary"} className="text-sm px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            {freeUsesRemaining > 0 ? `${freeUsesRemaining} Free Activations Left` : 'Free Limit Reached'}
          </Badge>
        </div>

        {/* Activation Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="confirmationId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmation ID / Product Key
            </label>
            <Input
              id="confirmationId"
              type="text"
              placeholder="Enter your installation ID Here..."
              value={confirmationId}
              onChange={(e) => setConfirmationId(e.target.value)}
              className="text-center font-mono text-lg tracking-wider"
              disabled={isLoading}
            />
          </div>

          <Button 
            onClick={handleActivate}
            disabled={isLoading || !confirmationId.trim()}
            className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Activate Now {freeUsesRemaining === 0 ? '(₦1,500)' : '(Free)'}
              </>
            )}
          </Button>
        </div>

        <Separator />

        {/* Pricing Information */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">Premium Activation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unlimited activations for guests</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">₦1,500</div>
              <div className="text-sm text-gray-500">per activation</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">Instant Activation</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Immediate product activation</p>
          </div>
          <div className="space-y-2">
            <Shield className="w-8 h-8 text-green-600 mx-auto" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">100% Genuine</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Authentic licensing only</p>
          </div>
          <div className="space-y-2">
            <Zap className="w-8 h-8 text-green-600 mx-auto" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">24/7 Support</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Always here to help</p>
          </div>
        </div>

        {freeUsesRemaining === 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Free Limit Reached</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Ready for more? Get unlimited activations for just ₦1,500 per confirmation ID!
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}