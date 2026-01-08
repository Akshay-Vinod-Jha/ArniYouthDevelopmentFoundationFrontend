import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              <h3 className="text-xl font-bold text-white">AYDF</h3>
            </div>
            <p className="text-sm mb-4">
              Arni Youth Development Foundation - Building a better tomorrow for
              rural communities through healthcare, education, and sustainable
              development.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/17JdPExo7m/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/aydf_2025?igsh=NzZqZ2JmNXoyMTUy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="hover:text-primary transition-colors"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/impact"
                  className="hover:text-primary transition-colors"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog & News
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/donate"
                  className="hover:text-primary transition-colors"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  to="/membership"
                  className="hover:text-primary transition-colors"
                >
                  Become a Member
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="hover:text-primary transition-colors"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Shantinath Agro Agencies, Mahur Road, Arni, District:
                  Yavatmal, Maharashtra - 445103
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href="tel:+919955545050"
                  className="hover:text-primary transition-colors"
                >
                  +91 99555 45050
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:contact@aydf.org"
                  className="hover:text-primary transition-colors"
                >
                  contact@aydf.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Arni Youth Development Foundation.
            All rights reserved.
          </p>
          <p className="mt-2">
            <span className="text-primary">❤️</span> Made with love for rural
            communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
