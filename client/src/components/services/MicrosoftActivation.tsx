import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, CheckCircle, Monitor } from 'lucide-react';
import { microsoftActivationSchema } from '@/lib/validation';
import { mockAPI } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface MicrosoftActivationData {
  installationIdA: string;
  installationIdB: string;
  installationIdC: string;
  installationIdD: string;
  installationIdE: string;
  installationIdF: string;
  installationIdG: string;
  installationIdH: string;
  screenshot?: File;
}

export function MicrosoftActivation() {
  const [confirmationId, setConfirmationId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<MicrosoftActivationData>({
    resolver: yupResolver(microsoftActivationSchema),
    defaultValues: {
      installationIdA: '',
      installationIdB: '',
      installationIdC: '',
      installationIdD: '',
      installationIdE: '',
      installationIdF: '',
      installationIdG: '',
      installationIdH: '',
    },
  });

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string, fieldName: string) => {
    if (value.length <= 9) {
      form.setValue(fieldName as keyof MicrosoftActivationData, value);
      
      // Auto-tab to next field when current is full
      if (value.length === 9 && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const onSubmit = async (data: MicrosoftActivationData) => {
    setIsLoading(true);
    try {
      const installationIds = [
        data.installationIdA,
        data.installationIdB,
        data.installationIdC,
        data.installationIdD,
        data.installationIdE,
        data.installationIdF,
        data.installationIdG,
        data.installationIdH,
      ];

      const response = await mockAPI.generateMicrosoftConfirmationId(installationIds);
      setConfirmationId(response.confirmationId);
      
      toast({
        title: "Confirmation ID Generated",
        description: "Your Microsoft activation confirmation ID has been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate confirmation ID. Please check your installation IDs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'installationIdA', label: 'Field A' },
    { name: 'installationIdB', label: 'Field B' },
    { name: 'installationIdC', label: 'Field C' },
    { name: 'installationIdD', label: 'Field D' },
    { name: 'installationIdE', label: 'Field E' },
    { name: 'installationIdF', label: 'Field F' },
    { name: 'installationIdG', label: 'Field G' },
    { name: 'installationIdH', label: 'Field H' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Monitor className="w-6 h-6 mr-2 text-blue-500" />
          Microsoft Activation Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertDescription>
            Enter your Microsoft product installation ID to generate a confirmation ID for activation.
            Each field should contain exactly 9 digits.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Installation ID Fields */}
            <div>
              <label className="block text-sm font-medium mb-4">Installation ID</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof MicrosoftActivationData}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          {field.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={9}
                            placeholder="000000000"
                            className="text-center font-mono"
                            {...formField}
                            onChange={(e) => handleInputChange(index, e.target.value, field.name)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Screenshot Upload */}
            <FormField
              control={form.control}
              name="screenshot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Screenshot (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Generate Button */}
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: '#0078d4', color: 'white' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <Monitor className="w-4 h-4 mr-2" />
                  Generate Confirmation ID
                </>
              )}
            </Button>

            {/* Confirmation ID Result */}
            {confirmationId && (
              <Alert className="bg-success/10 border-success">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold text-success">Confirmation ID Generated:</p>
                    <div className="font-mono text-lg text-center p-4 bg-background rounded border">
                      {confirmationId}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Copy this ID and use it to activate your Microsoft product
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
