import { Github, Linkedin, Mail } from 'lucide-react';

// WhatsApp Business number — local: 0334-4443671, international (wa.me): 92 334 4443671
export const whatsappNumber = '923344443671';

// Custom SVG Icons
export const FiverrIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.25 3.5A2.25 2.25 0 1 1 18.5 5.75 2.25 2.25 0 0 1 16.25 3.5zM15 8.5v1.5h-3.5V20.5H8.25v-10.5H6v-1.5h2.25V6.25A2.75 2.75 0 0 1 11 3.5h4v1.5h-4a1.25 1.25 0 0 0-1.25 1.25V8.5H15z" />
  </svg>
);

export const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.53 0-3.03-.41-4.34-1.18l-.31-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </svg>
);

// Contact Information
export const contactInfo = {
  email: 'shehrozshafiq03@gmail.com',
  phone: '+92-321-4261477',
  location: 'Pakistan',
  name: 'Shehroz Shafiq',
  title: 'Full-Stack Developer',
  initials: 'SS',
};

// Social Links
export const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/shehroz03',
    color: 'hover:text-[#2E2E2E]',
    handle: '@shehroz03',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/chshehrozshafiq',
    color: 'hover:text-[#0077B5]',
    handle: 'chshehrozshafiq',
  },
  {
    name: 'Upwork',
    icon: UpworkIcon,
    url: 'https://www.upwork.com/freelancers/shehrozshafiq?viewMode=1',
    color: 'hover:text-[#14A800]',
    handle: 'Shehroz S.',
  },
  {
    name: 'Fiverr',
    icon: FiverrIcon,
    url: 'https://www.fiverr.com/scrapingmaster1',
    color: 'hover:text-[#1DBF73]',
    handle: 'scrapingmaster1',
  },
  {
    name: 'WhatsApp',
    icon: WhatsAppIcon,
    url: `https://wa.me/${whatsappNumber}`,
    color: 'hover:text-[#25D366]',
    handle: '+92 334 4443671',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:shehrozshafiq03@gmail.com',
    color: 'hover:text-[#4A90E2]',
    handle: 'shehrozshafiq03@gmail.com',
  },
];
