import { Github, Linkedin, Mail } from 'lucide-react';

// Custom SVG Icons
export const FiverrIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.5 6.5c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm-4.5 0h-1v5h1v2h-1v5h-1v-5h-1v-2h1v-5h-1v-2h2v2zm3.5 2h1v10h-1v-10zm-6.5 0h1v10h-1v-10zm13 7.5c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5v7z" />
  </svg>
);

export const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

// Contact Information
export const contactInfo = {
  email: 'shehrozshafiq03@gmail.com',
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
    url: 'https://www.upwork.com/freelancers/~01f611eabb374e757e?viewMode=1',
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
    name: 'Email',
    icon: Mail,
    url: 'mailto:shehrozshafiq03@gmail.com',
    color: 'hover:text-[#4A90E2]',
    handle: 'shehrozshafiq03@gmail.com',
  },
];
