
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">New Arrivals</h1>
            
            {/* Filter and Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <span className="text-gray-500">{transformedProducts.length} products</span>
              </div>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          {transformedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {transformedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
