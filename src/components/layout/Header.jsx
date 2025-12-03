import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Impact", href: "/impact" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AYDF</h1>
              <p className="text-xs text-gray-600">
                Arni Youth Development Foundation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/donate" className="btn btn-primary">
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary w-full mt-4"
            >
              Donate Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
