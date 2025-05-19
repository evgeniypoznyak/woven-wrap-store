
import { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cotton', name: 'Cotton' },
    { id: 'linen', name: 'Linen Blends' },
    { id: 'silk', name: 'Silk Blends' },
    { id: 'wool', name: 'Wool Blends' },
    { id: 'hemp', name: 'Hemp' },
  ];
  
  const filteredProducts = selectedCategory && selectedCategory !== 'all' 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center mb-12">
            <Package className="h-12 w-12 text-wrap-burgundy mb-4" />
            <h1 className="font-serif text-3xl md:text-4xl mb-2">Our Collection</h1>
            <p className="text-wrap-charcoal/70 max-w-2xl">
              Explore our carefully crafted woven wraps designed for comfort, style, and functionality.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full
                  ${selectedCategory === category.id 
                    ? 'bg-wrap-burgundy text-white hover:bg-wrap-burgundy/90' 
                    : 'border-wrap-charcoal/20 hover:border-wrap-burgundy hover:text-wrap-burgundy'}
                `}
                onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-wrap-charcoal/70">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
