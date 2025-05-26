
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const { data: wrap, isLoading } = useQuery({
    queryKey: ['wrap', id],
    queryFn: async () => {
      if (!id) throw new Error('No wrap ID provided');
      
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
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
  
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Set default color when wrap data loads
  useEffect(() => {
    if (wrap?.colors && wrap.colors.length > 0 && !selectedColor) {
      setSelectedColor(wrap.colors[0]);
    }
  }, [wrap?.colors, selectedColor]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!wrap) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h2 className="font-serif text-2xl mb-4 text-charcoal">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${wrap.name} (${selectedColor}) x ${quantity} added to your cart.`,
    });
  };

  // Sort images by display_order
  const sortedImages = wrap.wrap_images?.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)) || [];
  const images = sortedImages.length > 0 ? sortedImages.map(img => img.image_url) : ['/placeholder.svg'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/products" className="text-gray-500 hover:text-teal flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden bg-white">
                <img 
                  src={images[0]} 
                  alt={wrap.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-square overflow-hidden bg-white cursor-pointer"
                    >
                      <img 
                        src={image} 
                        alt={`${wrap.name} view ${idx + 1}`} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div className="bg-white p-8">
              {wrap.is_new && (
                <span className="inline-block bg-teal text-white text-xs px-3 py-1 rounded mb-4">
                  New
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">{wrap.name}</h1>
              
              <div className="flex items-baseline mb-6">
                <span className="font-bold text-2xl text-charcoal">
                  ${Number(wrap.price).toFixed(2)}
                </span>
                {wrap.original_price && (
                  <span className="ml-3 text-gray-400 line-through text-lg">
                    ${Number(wrap.original_price).toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {wrap.description}
              </p>
              
              <div className="space-y-6">
                {/* Color Selection */}
                {wrap.colors && wrap.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 text-charcoal">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {wrap.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border transition-colors ${
                            selectedColor === color
                              ? 'border-teal bg-teal/10 text-teal'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Material & Size */}
                <div className="grid grid-cols-2 gap-4">
                  {wrap.material && (
                    <div>
                      <h3 className="font-medium mb-1 text-charcoal">Material</h3>
                      <p className="text-gray-600 text-sm">{wrap.material}</p>
                    </div>
                  )}
                  {wrap.size && (
                    <div>
                      <h3 className="font-medium mb-1 text-charcoal">Size</h3>
                      <p className="text-gray-600 text-sm">{wrap.size}</p>
                    </div>
                  )}
                </div>
                
                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-3 text-charcoal">Quantity</h3>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300"
                    >
                      -
                    </button>
                    <div className="w-14 h-10 flex items-center justify-center border-y border-gray-300 bg-white">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!wrap.in_stock}
                    className="w-full py-6 bg-teal hover:bg-teal/90 text-white font-medium"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {wrap.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
                
                {/* Additional Information */}
                <div className="text-sm text-gray-600 pt-4 border-t">
                  <p className="mb-1">Free shipping on orders over $100</p>
                  <p>30-day returns policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
