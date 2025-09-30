import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function PlatformAnalytics() {
  const analyticsData = [
    {
      title: 'Platform Growth',
      metrics: [
        { label: 'User Growth', value: 75, change: '+15.3%', color: 'bg-success' },
        { label: 'Revenue Growth', value: 85, change: '+22.1%', color: 'bg-primary' },
        { label: 'Transaction Volume', value: 60, change: '+8.7%', color: 'bg-warning' },
      ]
    },
    {
      title: 'System Health',
      metrics: [
        { label: 'API Status', status: 'Operational', color: 'success' },
        { label: 'Database', status: 'Healthy', color: 'success' },
        { label: 'Payment Gateway', status: 'Degraded', color: 'warning' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {analyticsData.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.title === 'Platform Growth' ? (
                section.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className="text-sm font-medium text-success">{metric.change}</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))
              ) : (
                section.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${
                        metric.color === 'success' ? 'bg-success' : 
                        metric.color === 'warning' ? 'bg-warning' : 'bg-destructive'
                      } rounded-full`}></div>
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                    </div>
                    <Badge 
                      variant={metric.color === 'success' ? 'default' : 'secondary'}
                      className={
                        metric.color === 'success' ? 'bg-success text-white' :
                        metric.color === 'warning' ? 'bg-warning text-white' : ''
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
