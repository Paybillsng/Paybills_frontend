import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GraduationCap } from 'lucide-react';
import { educationSchema } from '@/lib/validation';
import { educationPins } from '@/lib/mockData';
import { useWallet } from '@/hooks/useWallet';

interface EducationFormData {
  examBody: string;
  pinType: string;
  quantity: number;
}

export function EducationForm() {
  const { purchaseService, isLoading } = useWallet();

  const form = useForm<EducationFormData>({
    resolver: yupResolver(educationSchema),
    defaultValues: {
      examBody: '',
      pinType: '',
      quantity: 1,
    },
  });

  const selectedExamBody = form.watch('examBody');
  const availablePins = educationPins.filter(pin => pin.examBody === selectedExamBody);

  const onSubmit = async (data: EducationFormData) => {
    try {
      const selectedPin = educationPins.find(pin => pin.id === data.pinType);
      const totalAmount = (selectedPin?.price || 0) * data.quantity;

      const serviceData = {
        type: 'education',
        provider: data.examBody,
        amount: totalAmount,
        recipient: 'user',
        metadata: { 
          pinType: data.pinType,
          quantity: data.quantity,
          examBody: data.examBody 
        },
      };

      await purchaseService(serviceData);
      form.reset();
    } catch (error) {
      // Error handling is done in the useWallet hook
    }
  };

  const examBodies = ['WAEC', 'NECO', 'JAMB', 'NABTEB'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="w-6 h-6 mr-2" />
          Buy Education Pins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam Body */}
              <FormField
                control={form.control}
                name="examBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Body</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Exam Body" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {examBodies.map((body) => (
                          <SelectItem key={body} value={body}>
                            {body}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pin Type */}
              <FormField
                control={form.control}
                name="pinType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!selectedExamBody}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Pin Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availablePins.map((pin) => (
                          <SelectItem key={pin.id} value={pin.id}>
                            {pin.name} - ₦{pin.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="1"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full btn-success" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Buy Pin(s)
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
