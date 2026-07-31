'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { COMPANY } from '@/app/lib/constants';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const SERVICES_OPTIONS = [
  'Building Construction',
  'House Construction',
  'Commercial Construction',
  'Interior Design',
  'Renovation',
  'Waterproofing',
  'Painting',
  'Other',
];

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass =
    'w-full px-6 py-4 min-h-[52px] rounded-2xl border border-gray-200 text-dark text-[16px] bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder-gray-400 shadow-sm';

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-brand-light to-[#EEF2F7] py-16 md:py-20 lg:py-24"
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <AnimatedSection>
          <SectionHeader
            badge="Get In Touch"
            title="Contact"
            highlight="Us"
            description="Ready to start your project? Reach out for a free consultation and quote. We respond within 24 hours."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left - Contact Info */}
          <AnimatedSection variant="slideLeft">
            <div className="space-y-6">
              {/* CTA Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={COMPANY.callLink}
                  className="group flex items-center gap-4 p-8 lg:p-10 rounded-[20px] border border-gray-200 bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform bg-gradient-to-br from-secondary to-secondary-light"
                  >
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-500 mb-1">Call Us</p>
                    <p className="font-bold text-dark text-[16px] font-display">
                      {COMPANY.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-8 lg:p-10 rounded-[20px] border border-gray-200 bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500 group-hover:scale-110 transition-transform">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-500 mb-1">WhatsApp</p>
                    <p className="font-bold text-dark text-[16px] font-display">Chat Now</p>
                  </div>
                </a>
              </div>

              {/* Address */}
              <div
                className="p-8 lg:p-10 rounded-[20px] border border-gray-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start gap-4 mb-6">
                  <MapPin size={24} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-dark text-[18px] mb-2 font-display">Our Office</h4>
                    <p className="text-gray-600 text-[16px] leading-relaxed">{COMPANY.address.full}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={24} className="text-secondary mt-0.5 shrink-0" />
                  <div className="w-full">
                    <h4 className="font-bold text-dark text-[18px] mb-2 font-display">Business Hours</h4>
                    <div className="space-y-1">
                      {COMPANY.businessHours.map((h) => (
                        <div key={h.day} className="flex justify-between gap-6 text-[16px] text-gray-600">
                          <span>{h.day}</span>
                          <span className="font-medium text-dark">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div
                className="rounded-[20px] overflow-hidden border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.678!2d77.2496!3d10.5892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM1JzIxLjEiTiA3N8KwMTQnNTguNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="240"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GRN Construction Location"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Form */}
          <AnimatedSection variant="slideRight">
            <div
              className="rounded-[2rem] border border-primary/10 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.10)] md:p-12"
            >
              {!submitted ? (
                <>
                  <h3 className="text-[24px] font-bold text-dark font-display mb-2">
                    Get a Free Quote
                  </h3>
                  <p className="text-gray-500 text-[16px] mb-8">
                    Fill the form and we&apos;ll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[14px] font-bold text-gray-600 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ravi Kumar"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-bold text-gray-600 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-600 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ravi@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-600 mb-2">
                        Service Required *
                      </label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-600 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your project - location, size, budget, timeline..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`inline-flex min-h-[48px] lg:min-h-[52px] items-center justify-center gap-3 rounded-[14px] px-8 py-4 font-semibold transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] w-full text-[18px] ${
                        loading 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_8px_24px_rgba(26,107,124,0.2)] hover:shadow-[0_12px_32px_rgba(26,107,124,0.3)] hover:-translate-y-1'
                      }`}
                      whileHover={loading ? {} : { scale: 1.01 }}
                      whileTap={loading ? {} : { scale: 0.99 }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" className="opacity-25"/>
                            <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" className="opacity-75"/>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-gradient-to-br from-primary/10 to-primary/20"
                  >
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark font-display mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <a
                    href={COMPANY.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={16} />
                    Also Chat on WhatsApp
                  </a>
                </motion.div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
