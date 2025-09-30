import { WithdrawCommission } from '@/components/agent/WithdrawCommission';

export default function AgentWithdraw() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Withdraw Commission</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Withdraw your earned commissions to your bank account
          </p>
        </div>

        {/* Withdrawal Form */}
        <WithdrawCommission />

        {/* Withdrawal History */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Recent Withdrawals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="font-medium">GTBank - 0123456789</p>
                <p className="text-sm text-muted-foreground">Jan 10, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₦25,000</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                  Completed
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="font-medium">Access Bank - 9876543210</p>
                <p className="text-sm text-muted-foreground">Jan 5, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₦15,000</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">
                  Processing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Withdrawal Terms</h3>
          <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
            <li>• Minimum withdrawal amount: ₦5,000</li>
            <li>• Processing time: 24-48 hours</li>
            <li>• Maximum daily withdrawal: ₦500,000</li>
            <li>• Bank charges may apply</li>
            <li>• 2FA verification required for all withdrawals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
