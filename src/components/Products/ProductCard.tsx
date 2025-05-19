
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          {product.isNew && (
            <span className="inline-block bg-wrap-sage text-white text-xs px-2 py-1 rounded mb-2">
              New
            </span>
          )}
          
          <h3 className="font-serif text-lg font-medium mb-1 group-hover:text-wrap-burgundy transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-baseline">
            <span className="font-medium text-wrap-charcoal">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-wrap-charcoal/60 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
