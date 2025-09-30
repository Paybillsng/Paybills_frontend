import { CustomerOverride } from '@/components/agent/CustomerOverride';

export default function AgentOverride() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Override</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Perform transactions on behalf of your customers with proper authorization
          </p>
        </div>

        {/* Override Form */}
        <CustomerOverride />

        {/* Guidelines */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Agent Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Before Using Override</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Always get explicit customer consent</li>
                <li>• Verify customer identity properly</li>
                <li>• Explain all transaction details</li>
                <li>• Provide transaction receipts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security Best Practices</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Never share override access</li>
                <li>• Log out after each session</li>
                <li>• Report suspicious activities</li>
                <li>• Keep customer data confidential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
