import { UtilitiesForm } from '@/components/services/UtilitiesForm';

export default function Utilities() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Utility Bills</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pay your electricity, cable TV, and other utility bills quickly and securely
          </p>
        </div>

        {/* Form */}
        <UtilitiesForm />

        {/* Supported Providers */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Supported Providers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Electricity</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>EKEDC</li>
                <li>IKEDC</li>
                <li>PHED</li>
                <li>AEDC</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cable TV</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>DStv</li>
                <li>GOtv</li>
                <li>StarTimes</li>
                <li>MyTV</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Instant Payment</li>
                <li>Receipt Generation</li>
                <li>Payment History</li>
                <li>Auto-renewal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Support</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>24/7 Help</li>
                <li>Refund Protection</li>
                <li>Payment Tracking</li>
                <li>Customer Care</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
