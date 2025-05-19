
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import BenefitsSection from '@/components/Home/BenefitsSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import NewsletterSection from '@/components/Home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent={true} />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <BenefitsSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
