import { EducationForm } from '@/components/services/EducationForm';

export default function Education() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education Services</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Purchase examination pins and educational services from various exam bodies
          </p>
        </div>

        {/* Form */}
        <EducationForm />

        {/* Exam Bodies Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">Available Exam Bodies</h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
              <li>• WAEC - West African Examinations Council</li>
              <li>• NECO - National Examinations Council</li>
              <li>• JAMB - Joint Admissions and Matriculation Board</li>
              <li>• NABTEB - National Business and Technical Examinations Board</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Service Features</h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
              <li>• Instant PIN delivery</li>
              <li>• Valid and verified PINs</li>
              <li>• 24/7 customer support</li>
              <li>• Secure payment processing</li>
            </ul>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Current Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <h4 className="font-medium">WAEC</h4>
              <p className="text-2xl font-bold text-primary">₦1,500</p>
              <p className="text-sm text-muted-foreground">Result Checker</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <h4 className="font-medium">NECO</h4>
              <p className="text-2xl font-bold text-primary">₦1,000</p>
              <p className="text-sm text-muted-foreground">Result Checker</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <h4 className="font-medium">JAMB</h4>
              <p className="text-2xl font-bold text-primary">₦3,500</p>
              <p className="text-sm text-muted-foreground">Registration PIN</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <h4 className="font-medium">NABTEB</h4>
              <p className="text-2xl font-bold text-primary">₦1,200</p>
              <p className="text-sm text-muted-foreground">Result Checker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
