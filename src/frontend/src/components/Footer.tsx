import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import SocialMediaLinks from './SocialMediaLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'koshambari'
  );

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/generated/koshambari-logo.dim_400x400.png"
                alt="Koshambari"
                className="h-12 w-12 rounded-full"
              />
              <span className="font-serif text-2xl font-bold text-primary">Koshambari</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium Indian fashion and jewellery for the modern woman. Elegant sarees, western dresses, and 18 karat gold jewellery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground transition-colors hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>contact@koshambari.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <SocialMediaLinks />
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center space-x-1">
            <span>© {currentYear} Koshambari. Built with</span>
            <Heart className="h-4 w-4 fill-primary text-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
