// This is a helper file to seed initial projects
// You can call this from the browser console after logging in

export const initialProjects = [
  {
    title: 'SOCIALVIBING.ONLINE',
    subtitle: 'Social Media Analytics Dashboard',
    description: 'A comprehensive social media analytics platform that provides real-time insights and automation for content creators and brands.',
    image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNjM3NzM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redis'],
    features: [
      'Real-time data synchronization across multiple social platforms',
      'AI-powered content recommendations and scheduling',
      'Advanced analytics with custom reporting',
      'Team collaboration tools and workflow automation',
      'RESTful API for third-party integrations',
    ],
    liveUrl: 'https://socialvibing.online',
    githubUrl: '#',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'TOUR EASE',
    subtitle: 'Travel Booking Mobile Application',
    description: 'A modern travel booking app built with Flutter, featuring integrated maps, payment processing, and real-time availability.',
    image: 'https://images.unsplash.com/photo-1673515335048-ace62cf73a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBib29raW5nJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3MTc1MjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Stripe'],
    features: [
      'Cross-platform mobile app (iOS & Android)',
      'Interactive map-based destination browsing',
      'Secure payment processing with multiple gateways',
      'Real-time booking and availability management',
      'Offline mode with local data caching',
    ],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'SCHOLARIQ',
    subtitle: 'AI-Powered Scholarship Platform',
    description: 'An intelligent scholarship discovery platform that uses web scraping and machine learning to match students with relevant opportunities.',
    image: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxNzUyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['React Native', 'Python', 'PostgreSQL', 'Beautiful Soup', 'FastAPI', 'ML'],
    features: [
      'Automated scholarship data scraping from 500+ sources',
      'AI-powered matching algorithm based on student profiles',
      'Admin dashboard for content management',
      'Email notifications and deadline reminders',
      'Advanced search and filtering capabilities',
    ],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-green-500 to-green-600',
  },
];

// To use this, run in the browser console after logging in:
// const seedProjects = async () => {
//   const { projectsAPI } = await import('./lib/api');
//   const { initialProjects } = await import('./lib/seed-projects');
//   const token = localStorage.getItem('auth_token');
//   for (const project of initialProjects) {
//     await projectsAPI.create(project, token);
//   }
//   console.log('Projects seeded successfully!');
// };
// seedProjects();
