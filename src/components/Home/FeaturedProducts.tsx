
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/Products/ProductCard';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-wrap-burgundy font-medium tracking-wider text-sm">OUR COLLECTION</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">Featured Wraps</h2>
          </div>
          <Button 
            variant="link" 
            className="text-wrap-burgundy font-medium mt-4 md:mt-0 p-0 hover:text-wrap-burgundy/80"
            asChild
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
