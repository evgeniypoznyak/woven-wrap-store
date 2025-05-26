
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Sale/Save Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-teal text-white text-xs px-3 py-1 rounded font-medium">
              SAVE {discountPercentage}%
            </div>
          )}
          
          {product.isNew && !hasDiscount && (
            <div className="absolute top-3 left-3 bg-teal text-white text-xs px-3 py-1 rounded font-medium">
              Sale
            </div>
          )}
          
          {/* Lock icon for bundles/premium items */}
          <div className="absolute top-3 right-3">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-medium text-charcoal mb-1 group-hover:text-teal transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="font-medium text-charcoal">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Only on MOBYWRAP.COM text for special items */}
          {product.isFeatured && (
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
              Only on WovenElegance.com
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
