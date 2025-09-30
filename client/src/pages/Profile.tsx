import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { User, Camera, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { profileUpdateSchema } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileUpdateData>({
    resolver: yupResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const onSubmit = async (data: ProfileUpdateData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getKYCStatusBadge = (status: string) => {
    const variants = {
      verified: 'default',
      pending: 'secondary',
      rejected: 'destructive',
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any} className={status === 'verified' ? 'bg-success text-white' : ''}>
        {status}
      </Badge>
    );
  };

  if (!user) return null;

  const userInitials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      aria-label="Change profile picture"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                    <p className="text-muted-foreground">@{user.username}</p>
                    <Badge variant="outline" className="mt-2 capitalize">
                      {user.userType}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Email Status</span>
                      <div className="flex items-center space-x-2">
                        {user.isEmailVerified ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm">{user.isEmailVerified ? 'Verified' : 'Unverified'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Phone Status</span>
                      <div className="flex items-center space-x-2">
                        {user.isPhoneVerified ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm">{user.isPhoneVerified ? 'Verified' : 'Unverified'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">KYC Status</span>
                      <div className="flex items-center space-x-2">
                        {getKYCStatusIcon(user.kycStatus)}
                        {getKYCStatusBadge(user.kycStatus)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">2FA Status</span>
                      <div className="flex items-center space-x-2">
                        {user.twoFactorEnabled ? (
                          <Shield className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm">{user.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-4">
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Saving...</span>
                            </div>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
                        <p className="mt-1 text-sm">{user.firstName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                        <p className="mt-1 text-sm">{user.lastName}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                      <p className="mt-1 text-sm">{user.email}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                      <p className="mt-1 text-sm">{user.phoneNumber}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                      <p className="mt-1 text-sm">@{user.username}</p>
                    </div>

                    {user.referralCode && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Referral Code</Label>
                        <p className="mt-1 text-sm font-mono">{user.referralCode}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* KYC Section */}
            {user.kycStatus !== 'verified' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Complete your identity verification to unlock all features and increase your transaction limits.
                    </p>
                    <Button variant="outline">
                      Start Verification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
