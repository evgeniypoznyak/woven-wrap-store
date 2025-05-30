
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    (isScrolled || !transparent) 
      ? 'bg-white shadow-sm py-3' 
      : 'bg-white py-3'
  }`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-teal">
            WOVEN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-charcoal hover:text-teal transition-colors font-medium">
              SHOP
            </Link>
            <Link to="/learn" className="text-charcoal hover:text-teal transition-colors font-medium">
              LEARN
            </Link>
            <Link to="/quiz" className="text-charcoal hover:text-teal transition-colors font-medium">
              QUIZ
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-charcoal hover:text-teal transition-colors font-medium">
                ADMIN
              </Link>
            )}
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-charcoal hover:text-teal">
                      <Shield className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-charcoal hover:text-teal"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-charcoal hover:text-teal">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Shopping Bag Button */}
            <Button variant="ghost" size="icon" className="relative text-charcoal hover:text-teal">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-charcoal" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 animate-fade-in">
            <div className="container-custom flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-charcoal hover:text-teal transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                SHOP
              </Link>
              <Link
                to="/learn"
                className="text-charcoal hover:text-teal transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                LEARN
              </Link>
              <Link
                to="/quiz"
                className="text-charcoal hover:text-teal transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                QUIZ
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-charcoal hover:text-teal transition-colors py-2"
                  onClick={toggleMenu}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
              {user ? (
                <button
                  className="flex items-center space-x-2 text-charcoal hover:text-teal transition-colors py-2"
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 text-charcoal hover:text-teal transition-colors py-2"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
