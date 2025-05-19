
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const product = products.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h2 className="font-serif text-2xl mb-4">Product Not Found</h2>
          <p className="text-wrap-charcoal/70 mb-6">
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
      description: `${product.name} (${selectedColor}) x ${quantity} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/products" className="text-wrap-charcoal/60 hover:text-wrap-burgundy flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-wrap-sand">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-square overflow-hidden rounded-lg bg-wrap-sand cursor-pointer"
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${idx + 1}`} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div>
              {product.isNew && (
                <span className="inline-block bg-wrap-sage text-white text-xs px-2 py-1 rounded mb-3">
                  New
                </span>
              )}
              
              <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.name}</h1>
              
              <div className="flex items-baseline mb-4">
                <span className="font-medium text-xl text-wrap-charcoal">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-wrap-charcoal/60 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-wrap-charcoal/80 mb-6">
                {product.description}
              </p>
              
              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md transition-colors ${
                          selectedColor === color
                            ? 'border-wrap-burgundy bg-wrap-burgundy/5 text-wrap-burgundy'
                            : 'border-wrap-charcoal/20 hover:border-wrap-charcoal/40'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Material & Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Material</h3>
                    <p className="text-wrap-charcoal/80 text-sm">{product.material}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Size</h3>
                    <p className="text-wrap-charcoal/80 text-sm">{product.size}</p>
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-wrap-charcoal/20 rounded-l-md"
                    >
                      -
                    </button>
                    <div className="w-14 h-10 flex items-center justify-center border-y border-wrap-charcoal/20 bg-white">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-wrap-charcoal/20 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full py-6 bg-wrap-burgundy hover:bg-wrap-burgundy/90 text-white font-medium rounded-md"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
                
                {/* Additional Information */}
                <div className="text-sm text-wrap-charcoal/70 pt-2">
                  <p>Free shipping on orders over $100</p>
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
