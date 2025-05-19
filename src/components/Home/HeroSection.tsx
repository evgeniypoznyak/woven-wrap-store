
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-wrap-cream">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6 pt-16 md:pt-0">
          <span className="text-wrap-burgundy font-medium tracking-wider text-sm">PREMIUM BABY CARRIERS</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            Embrace Your Little One With <span className="text-wrap-burgundy">Handcrafted</span> Comfort
          </h1>
          <p className="text-wrap-charcoal/80 text-lg max-w-lg">
            Our luxurious woven wraps are designed to keep your baby close while supporting 
            your body. Made with sustainable materials and timeless patterns.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              className="bg-wrap-burgundy hover:bg-wrap-burgundy/90 text-white rounded-md px-8 py-6"
              asChild
            >
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-wrap-charcoal/30 text-wrap-charcoal hover:bg-wrap-sand/30 rounded-md px-8 py-6"
              asChild
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative flex items-center justify-center order-first md:order-last">
          <div className="relative z-10 w-full h-full max-h-[80vh] overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
              alt="Mother carrying baby in a woven wrap" 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          <div className="absolute -bottom-8 -left-8 w-3/4 h-3/4 bg-wrap-sage/20 rounded-2xl z-0"></div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white py-8">
        <div className="container-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Eco-Friendly", description: "Sustainable materials" },
            { title: "Handcrafted", description: "Made with love" },
            { title: "Supportive", description: "Ergonomic design" },
            { title: "Beautiful", description: "Timeless patterns" }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h3 className="font-serif font-medium text-lg">{feature.title}</h3>
              <p className="text-wrap-charcoal/70 text-sm mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
