
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: wraps = [], isLoading } = useQuery({
    queryKey: ['wraps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wraps')
        .select(`
          *,
          wrap_images (
            id,
            image_url,
            display_order
          )
        `)
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Get unique categories from the database
  const categories = [
    { id: 'all', name: 'All Products' },
    ...Array.from(new Set(wraps.map(wrap => wrap.category).filter(Boolean)))
      .map(category => ({ id: category, name: category }))
  ];
  
  const filteredProducts = selectedCategory && selectedCategory !== 'all' 
    ? wraps.filter(wrap => wrap.category === selectedCategory)
    : wraps;

  // Transform database wraps to match the Product interface
  const transformedProducts = filteredProducts.map(wrap => ({
    id: wrap.id,
    name: wrap.name,
    description: wrap.description || '',
    price: Number(wrap.price),
    originalPrice: wrap.original_price ? Number(wrap.original_price) : undefined,
    images: wrap.wrap_images?.map(img => img.image_url) || ['/placeholder.svg'],
    colors: wrap.colors || [],
    material: wrap.material || '',
    size: wrap.size || '',
    category: wrap.category || '',
    inStock: wrap.in_stock || false,
    isNew: wrap.is_new || false,
    isFeatured: wrap.is_featured || false
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wrap-burgundy"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          {transformedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {transformedProducts.map((product) => (
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
