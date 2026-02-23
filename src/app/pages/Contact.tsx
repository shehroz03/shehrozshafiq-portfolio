import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Footer } from '../components/Footer';
import { fadeInUp, scaleIn } from '../utils/animations';
import { api } from '../lib/supabase';
import { contactInfo, socialLinks } from '../data/contact';

export function Contact() {
  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactInfo.location,
      href: null,
    },
  ];

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Formspree payload
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      // 1) Send to Formspree
      const response = await fetch('https://formspree.io/f/xkovpprb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Formspree submission failed');
      }

      // 2) Keep logic for local admin panel tracking
      await api.submitContact(data);

      setStatus('success');
      form.reset();
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  // Show GitHub, LinkedIn, Upwork, and Fiverr
  const sidebarSocials = socialLinks.filter(s =>
    s.name === 'GitHub' || s.name === 'LinkedIn' || s.name === 'Upwork' || s.name === 'Fiverr'
  );

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2E2E2E] mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-[#6B7280]">
                Have a project in mind or want to collaborate? I'd love to hear from you.
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={scaleIn}
                className="lg:col-span-2"
              >
                <div
                  className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200/50"
                  style={{
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">Send Me a Message</h2>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-[#2E2E2E]"
                      >
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="bg-[#F7F7F7] border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2] transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-[#2E2E2E]"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-[#F7F7F7] border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2] transition-all"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-[#2E2E2E]"
                      >
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={6}
                        required
                        className="bg-[#F7F7F7] border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2] resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {/* Status Messages */}
                    {status === 'success' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-600 text-sm font-medium mt-2 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Thanks! Your message has been sent.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </form>
                </div>
              </motion.div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                {/* Contact Cards */}
                {contactCards.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: 'easeOut'
                          }
                        }
                      }}
                      className="bg-white rounded-2xl p-6 border border-gray-200/50"
                      style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2E2E2E] mb-1">{info.label}</h3>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-[#6B7280] hover:text-[#4A90E2] transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-[#6B7280]">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Social Links */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                        ease: 'easeOut'
                      }
                    }
                  }}
                  className="bg-white rounded-2xl p-6 border border-gray-200/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <h3 className="font-semibold text-[#2E2E2E] mb-4">Connect on Social</h3>
                  <div className="flex gap-3">
                    {sidebarSocials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-[#6B7280] ${social.color} transition-all hover:scale-110`}
                          style={{
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          }}
                          aria-label={social.name}
                        >
                          <Icon className="w-6 h-6" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.5,
                        ease: 'easeOut'
                      }
                    }
                  }}
                  className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
                  style={{
                    boxShadow: '0 8px 30px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <h3 className="font-bold text-lg">Available for Work</h3>
                  </div>
                  <p className="text-sm text-white/90">
                    I'm currently open to freelance projects and full-time opportunities.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}