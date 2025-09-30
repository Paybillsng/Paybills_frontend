import React from 'react';
import PublicNavigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Target, Award, Heart, Zap, Shield } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "Adebayo Johnson",
      role: "Chief Executive Officer",
      description: "Former Goldman Sachs executive with 15+ years in fintech",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Funmi Adebayo", 
      role: "Chief Technology Officer",
      description: "Ex-Google engineer specializing in payment systems",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Chidi Okafor",
      role: "Head of Operations", 
      description: "Banking expert with deep knowledge of Nigerian financial landscape",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Bank-grade security protocols protect every transaction"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant payments and real-time transaction processing"
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "24/7 support and user-friendly design for all Nigerians"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Award-winning platform trusted by millions"
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
              About Paybills.ng
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing digital payments in Nigeria, making financial services 
              accessible, secure, and affordable for everyone.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-8 lg:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Target className="w-12 h-12 text-green-600 mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To democratize financial services across Nigeria by providing a secure, 
                  fast, and affordable digital payment platform that empowers individuals 
                  and businesses to thrive in the digital economy.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                  alt="Team collaboration"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=600&h=400&fit=crop" 
                  alt="easy...reliable platform"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2020 by a team of experienced fintech professionals and Nigerian banking experts, 
                  Paybills.ng emerged from a simple observation: Nigerians deserved better digital payment solutions.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  What started as a bill payment platform has evolved into a comprehensive fintech ecosystem, 
                  serving millions of users across Nigeria with everything from utility payments to software purchases.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Today, we process over ₦50 billion in transactions annually and continue to innovate 
                  with new services that meet the evolving needs of Nigerian consumers and businesses.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <value.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>



          {/* Statistics */}
          <div className="bg-green-600 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Impact by Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5M+</div>
                <div className="text-green-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₦50B+</div>
                <div className="text-green-100">Transactions Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-green-100">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-green-100">Customer Support</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of Nigerians who trust Paybills.ng for their digital payment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Using Paybills.ng
              </a>
              <a 
                href="/contact"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}