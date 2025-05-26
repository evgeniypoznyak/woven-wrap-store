
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-lightest text-navy-dark">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-semibold text-navy-dark">
              WovenElegance
            </Link>
            <p className="mt-4 text-sm text-navy-medium">
              Premium woven wraps crafted with love for you and your little one.
              Sustainable materials, ethical production, timeless design.
            </p>
          </div>
          
          {/* Shop Links */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4 text-navy-dark">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/category/cotton" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  Cotton Wraps
                </Link>
              </li>
              <li>
                <Link to="/products/category/linen" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  Linen Blends
                </Link>
              </li>
              <li>
                <Link to="/products/category/silk" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  Silk Wraps
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4 text-navy-dark">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-navy-medium hover:text-navy-light transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4 text-navy-dark">Stay Connected</h3>
            <p className="text-sm text-navy-medium mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-navy-medium/20 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-1 focus:ring-navy-light"
                required
              />
              <button 
                type="submit" 
                className="bg-navy-light text-white px-4 py-2 rounded-r-md text-sm hover:bg-navy-light/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-navy-medium/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-navy-medium">
            © {new Date().getFullYear()} WovenElegance. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-navy-medium hover:text-navy-light">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-navy-medium hover:text-navy-light">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-xs text-navy-medium hover:text-navy-light">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
