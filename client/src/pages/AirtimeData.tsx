import { AirtimeDataForm } from '@/components/services/AirtimeDataForm';

export default function AirtimeData() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Airtime & Data</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Purchase airtime and data bundles for all major Nigerian networks
          </p>
        </div>

        {/* Form */}
        <AirtimeDataForm />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Instant Delivery</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Your airtime and data will be delivered instantly to the recipient's phone number.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Best Rates</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              We offer competitive rates and no hidden fees for all network providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
