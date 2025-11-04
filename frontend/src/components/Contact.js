import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // reCAPTCHA site key - use environment variable in production
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  const URL_API_V1_TESTEMAIL = process.env.URL_API_V1_TESTEMAIL || 'https://vitrixlab.pythonanywhere.com/api/v1/test-email';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setCaptchaToken(token);
    // Clear reCAPTCHA error when user completes it
    if (errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: '' }));
    }
  };

  const handleRecaptchaError = () => {
    setErrors(prev => ({ 
      ...prev, 
      recaptcha: 'Failed to load reCAPTCHA. Please refresh the page.' 
    }));
  };

  const handleRecaptchaExpire = () => {
    setCaptchaToken(null);
    setErrors(prev => ({ 
      ...prev, 
      recaptcha: 'reCAPTCHA expired. Please verify again.' 
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    if (!captchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Prepare form data with reCAPTCHA token
      const submissionData = {
        ...formData,
        'g-recaptcha-response': captchaToken,
        timestamp: new Date().toISOString()
      };
  
      console.log('Form submission data:', submissionData);
  
      // POST request to your PythonAnywhere Flask backend
      const response = await fetch(URL_API_V1_TESTEMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || 'Message sent successfully! I\'ll get back to you soon.');
  
        // Reset form and reCAPTCHA
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
  
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to send message. Please try again or contact me directly at soojidano@gmail.com.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      const response = await fetch(URL_API_V1_TESTEMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'me@example.com',
          subject: 'Hello from frontend',
          body: 'This is a test email sent via POST from frontend'
        })
      });
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  };
  
  return (
    <section id="contact" className="py-20 px-6 bg-white/[0.02]">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-[#00FFD1]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-[#00FFD1] mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Ready to discuss your next cloud architecture project? Let's build something amazing together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="body__logo flex items-center gap-0 mb-6">
              <img 
                loading="lazy" 
                src="https://i.postimg.cc/TYxBnr17/soojidano-logo-hero-3.jpg" 
                alt="SooJi Dano Logo"
                className="h-64 w-auto"
              />
            </div>
            <h3 className="text-xl font-semibold mb-6 text-[#00FFD1]">Let's Connect</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              I'm always excited to discuss new opportunities and challenging projects. Whether you need cloud architecture consultation, enterprise integration, or AI-powered solutions, I'm here to help.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#00FFD1] flex-shrink-0" />
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#00FFD1] transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Github className="h-5 w-5 text-[#00FFD1] flex-shrink-0" />
                <a 
                  href="https://github.com/vitrixLab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#00FFD1] transition-colors"
                >
                  github.com/vitrixlab
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-[#00FFD1] flex-shrink-0" />
                <a 
                  href="https://linkedin.com/in/jasondano" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#00FFD1] transition-colors"
                >
                  linkedin.com/in/jasondano
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          {/* <form onSubmit={handleFormSubmit} className="space-y-6"> */}
          <form onSubmit={handleTestEmail} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">
                Name {errors.name && <span className="text-red-400 ml-1">*</span>}
              </Label>
              <Input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none transition-colors ${
                  errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email {errors.email && <span className="text-red-400 ml-1">*</span>}
              </Label>
              <Input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none transition-colors ${
                  errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                placeholder="your.email@company.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            {/* Message Field */}
            <div>
              <Label htmlFor="message" className="text-white mb-2 block">
                Message {errors.message && <span className="text-red-400 ml-1">*</span>}
              </Label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className={`bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] resize-none rounded-none transition-colors ${
                  errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                placeholder="Tell me about your project requirements, timeline, and any specific challenges you're facing..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* reCAPTCHA Component */}
            <div className="transform scale-95 origin-left">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                onError={handleRecaptchaError}
                onExpired={handleRecaptchaExpire}
                theme="dark"
              />
              {errors.recaptcha && (
                <p className="text-red-400 text-sm mt-2">{errors.recaptcha}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-semibold py-3 rounded-none min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {/* Submit Error */}
            {errors.submit && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 px-3 rounded border border-red-400/30">
                {errors.submit}
              </p>
            )}

            {/* Success Message Placeholder */}
            {!errors.submit && isSubmitting && (
              <p className="text-[#00FFD1] text-sm text-center bg-[#00FFD1]/10 py-2 px-3 rounded border border-[#00FFD1]/30">
                Sending your message...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
