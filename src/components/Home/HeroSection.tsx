import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-cream">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
        {/* Image */}
        <div className="relative flex items-center justify-center order-first">
          <div className="relative z-10 w-full h-full max-h-[80vh] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
              alt="Mother carrying baby in a woven wrap" 
              className="w-full h-full object-cover object-center rounded-lg" 
            />
            {/* Overlay text on image */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
              <div className="text-center text-white">
                <p className="text-sm font-medium tracking-wider mb-2">WARMTH IN BLOOM</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">WAFFLE KNIT<br />COLLECTION</h2>
                <Button 
                  className="bg-white text-charcoal hover:bg-gray-100 px-8 py-3"
                  asChild
                >
                  <Link to="/products">SHOP</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6 pt-16 md:pt-0">
          <span className="text-teal font-medium tracking-wider text-sm">PREMIUM BABY CARRIERS</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal">
            Embrace Your Little One With <span className="text-teal">Handcrafted</span> Comfort
          </h1>
          <p className="text-gray-600 text-lg max-w-lg">
            Our luxurious woven wraps are designed to keep your baby close while supporting 
            your body. Made with sustainable materials and timeless patterns.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              className="bg-teal hover:bg-teal/90 text-white rounded-md px-8 py-6"
              asChild
            >
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button 
              className="bg-teal hover:bg-teal/90 text-white rounded-md px-8 py-6"
              asChild
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
