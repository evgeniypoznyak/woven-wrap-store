
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/Products/ProductCard';

const FeaturedProducts = () => {
  const { data: wraps = [] } = useQuery({
    queryKey: ['featured-wraps'],
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
        .eq('is_featured', true)
        .eq('in_stock', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  // Transform database wraps to match the Product interface
  const featuredProducts = wraps.map(wrap => ({
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
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-wrap-charcoal/70">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
