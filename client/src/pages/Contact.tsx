import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      detail: "+234 123 456 7890",
      hours: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions",
      detail: "support@paybills.ng",
      hours: "Response within 2 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help when you need it",
      detail: "Available on website",
      hours: "24/7 Available"
    },
    {
      icon: HeadphonesIcon,
      title: "WhatsApp",
      description: "Chat with us on WhatsApp",
      detail: "+234 123 456 7890",
      hours: "Mon-Fri 8AM-8PM"
    }
  ];

  const offices = [
    {
      city: "Lagos Office",
      address: "123 Victoria Island, Lagos State",
      phone: "+234 123 456 7890",
      email: "lagos@paybills.ng"
    },
    {
      city: "Abuja Office", 
      address: "456 Central Business District, Abuja",
      phone: "+234 123 456 7891",
      email: "abuja@paybills.ng"
    },
    {
      city: "Port Harcourt Office",
      address: "789 GRA Phase 1, Port Harcourt",
      phone: "+234 123 456 7892",
      email: "portharcourt@paybills.ng"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:p-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions? Need support? We're here to help 24/7. 
              Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <method.icon className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{method.description}</p>
                  <p className="font-semibold text-green-600 mb-1">{method.detail}</p>
                  <p className="text-sm text-gray-500">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Office Info */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 2 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+234 123 456 7890" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="What is this regarding?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Describe your issue or question in detail..."
                    rows={5}
                  />
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-green-600 mb-3">{office.city}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Business Hours */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-semibold">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        📞 Emergency Support: 24/7 Available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Quick answers to common questions. For more detailed help, visit our 
                <a href="/help" className="text-green-600 hover:underline ml-1">Help Center</a>.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">How do I reset my password?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Click "Forgot Password" on the login page and follow the instructions sent to your email.
                  </p>
                  
                  <h4 className="font-semibold mb-2">Are transactions secure?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Yes, we use bank-grade encryption and are PCI DSS compliant for maximum security.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    We accept debit cards, bank transfers, USSD, and mobile money payments.
                  </p>
                  
                  <h4 className="font-semibold mb-2">How long do transactions take?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Most transactions are processed instantly. Bank transfers may take 5-30 minutes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}