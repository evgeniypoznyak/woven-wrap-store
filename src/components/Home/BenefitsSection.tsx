
import { ShieldCheck, RefreshCw, Heart, Package } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-wrap-burgundy" />,
      title: "Safe & Secure",
      description: "Our wraps undergo rigorous safety testing to ensure they support you and your baby securely."
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-wrap-burgundy" />,
      title: "Versatile Use",
      description: "Multiple carrying positions adapt to you and your growing child's needs from newborn to toddler."
    },
    {
      icon: <Heart className="h-12 w-12 text-wrap-burgundy" />,
      title: "Bonding Time",
      description: "Babywearing promotes attachment and allows you to stay close while keeping your hands free."
    },
    {
      icon: <Package className="h-12 w-12 text-wrap-burgundy" />,
      title: "Ethically Made",
      description: "Fair trade practices and artisan partnerships ensure ethical production of every wrap."
    }
  ];

  return (
    <section className="section-padding bg-wrap-cream">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-wrap-burgundy font-medium tracking-wider text-sm">WHY CHOOSE US</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">The Benefits of Our Woven Wraps</h2>
          <p className="text-wrap-charcoal/80 mt-4">
            Discover why parents around the world choose our premium woven wraps for their babywearing journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">{benefit.title}</h3>
              <p className="text-wrap-charcoal/80 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
