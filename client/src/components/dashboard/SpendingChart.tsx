import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function SpendingChart() {
  const spendingData = [
    { category: 'Airtime & Data', percentage: 45, color: 'bg-primary' },
    { category: 'Utilities', percentage: 35, color: 'bg-warning' },
    { category: 'Education', percentage: 20, color: 'bg-success' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {spendingData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </div>
                <span className="text-sm font-medium">{item.percentage}%</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
