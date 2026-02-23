import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { useSocialMediaLinks } from '@/hooks/useSocialMedia';

export default function SocialMediaLinks() {
  const { data: socialMedia } = useSocialMediaLinks();

  // Default values if not set
  const facebookUrl = socialMedia?.facebookUrl || 'https://facebook.com';
  const instagramUrl = socialMedia?.instagramUrl || 'https://instagram.com';
  const whatsappUrl = socialMedia?.whatsappUrl || 'https://wa.me/919876543210';

  return (
    <div className="flex space-x-4">
      {facebookUrl && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
        >
          <SiFacebook className="h-5 w-5" />
        </a>
      )}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
        >
          <SiInstagram className="h-5 w-5" />
        </a>
      )}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
        >
          <SiWhatsapp className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
