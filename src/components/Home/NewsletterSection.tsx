
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your API
    toast({
      title: "Thank you for subscribing!",
      description: "Check your inbox soon for exclusive offers.",
    });
    
    setEmail('');
  };

  return (
    <section className="py-20 bg-navy-lightest">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-navy-dark">Join Our Community</h2>
            <p className="text-navy-medium mt-2">
              Subscribe to receive updates, exclusive offers, and babywearing tips.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow px-4 py-3 border border-navy-medium/20 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-light/30"
            />
            <Button 
              type="submit"
              className="bg-navy-light hover:bg-navy-light/90 text-white py-3 px-6"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-center text-navy-medium text-xs mt-4">
            By subscribing, you agree to our Privacy Policy. We never spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
