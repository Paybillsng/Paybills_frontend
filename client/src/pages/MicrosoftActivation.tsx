import { MicrosoftActivation as MicrosoftActivationComponent } from '@/components/services/MicrosoftActivation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function MicrosoftActivation() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Microsoft Activation Tool</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Generate confirmation IDs for Microsoft product activation
          </p>
        </div>

        {/* How it works */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p><strong>How it works:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Find your Microsoft product's Installation ID</li>
                <li>Enter the Installation ID in the fields below (8 groups of 9 digits)</li>
                <li>Click "Generate Confirmation ID" to get your activation code</li>
                <li>Use the Confirmation ID to activate your Microsoft product</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>

        {/* Tool */}
        <MicrosoftActivationComponent />

        {/* FAQ */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">Where do I find my Installation ID?</h4>
              <p className="text-muted-foreground mt-1">
                The Installation ID is displayed when you attempt to activate your Microsoft product by phone. 
                It consists of 8 groups of 9 digits each.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Is this service legitimate?</h4>
              <p className="text-muted-foreground mt-1">
                Yes, this is a legitimate Microsoft activation service that generates valid confirmation IDs 
                for properly licensed Microsoft products.
              </p>
            </div>
            <div>
              <h4 className="font-medium">What products are supported?</h4>
              <p className="text-muted-foreground mt-1">
                This tool supports most Microsoft products including Windows, Office, and other Microsoft software 
                that use phone activation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
