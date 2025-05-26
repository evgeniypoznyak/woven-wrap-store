
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const categories = [
    {
      name: 'EASY-WRAP',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=easy-wrap'
    },
    {
      name: 'DUET',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=duet'
    },
    {
      name: 'WRAPS',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=wraps'
    },
    {
      name: 'RING SLINGS',
      image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=ring-slings'
    },
    {
      name: 'BUCKLE CARRIERS',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=buckle-carriers'
    },
    {
      name: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400',
      link: '/products?category=accessories'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Shop By Category</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={category.link}
              className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square"
            >
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white px-4 py-2 rounded">
                  <span className="font-medium text-charcoal text-sm md:text-base">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
