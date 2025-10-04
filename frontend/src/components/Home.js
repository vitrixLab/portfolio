import React, { useState, useEffect, useRef } from 'react';
import { projects, techStack, personalInfo } from '../data/mockData';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code, Cloud, Zap, Building } from 'lucide-react';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. I'll get back to you soon.",
      duration: 3000,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-white/10 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-[#00FFD1]">
            {personalInfo.name}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Enhanced Background */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-blue-900/30 to-cyan-900/50 z-0"></div>
        
        {/* Hero Content */}
        <div className={`relative z-10 max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#00FFD1] drop-shadow-lg">{personalInfo.title.split(' ')[0]} {personalInfo.title.split(' ')[1]} {personalInfo.title.split(' ')[2]}</span>
            <br />
            <span className="text-white drop-shadow-lg">{personalInfo.title.split('&')[1]}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {personalInfo.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 hover:scale-105 font-semibold px-8 py-3 text-lg border-0 rounded-none min-h-[56px] shadow-xl transition-all duration-300"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white hover:text-black hover:scale-105 font-semibold px-8 py-3 text-lg rounded-none min-h-[56px] shadow-xl transition-all duration-300"
            >
              Get In Touch
              <Mail className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats with Enhanced Styling */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-[#00FFD1] drop-shadow-lg">{personalInfo.experience}</div>
              <div className="text-white/80">Experience</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-[#00FFD1] drop-shadow-lg">{personalInfo.projectsCompleted}</div>
              <div className="text-white/80">Projects</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-[#00FFD1] drop-shadow-lg">{personalInfo.clientsSatisfied}</div>
              <div className="text-white/80">Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-[#00FFD1]">Me</span>
            </h2>
            <div className="w-24 h-1 bg-[#00FFD1] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-white/85 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
                  <span>Specialized in cloud-native architecture design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
                  <span>Expert in enterprise system integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
                  <span>AI/ML pipeline optimization specialist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00FFD1] rounded-full"></div>
                  <span>DevOps and CI/CD automation expert</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-[#00FFD1]">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Location:</span>
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Email:</span>
                  <span className="text-[#00FFD1]">{personalInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className="text-green-400">{personalInfo.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-[#00FFD1]">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-[#00FFD1] mx-auto mb-6"></div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Showcase of enterprise-grade cloud solutions and AI integrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id}
                className={`bg-black border border-white/20 hover:border-[#00FFD1]/50 transition-all duration-500 hover:transform hover:scale-[1.02] group cursor-pointer`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[#00FFD1]/20 text-[#00FFD1] border-0">
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white/70">
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-[#00FFD1] transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-white/60 mb-2">Duration: {project.duration}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-white/10 text-white/90 border-0 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4 bg-white/10" />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[#00FFD1]">Key Highlights:</h4>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#00FFD1] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-white/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="mt-4 w-full bg-transparent border-[#00FFD1]/50 text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black transition-all duration-300 rounded-none"
                  >
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills/Tech Stack Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="text-[#00FFD1]">Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-[#00FFD1] mx-auto mb-6"></div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Comprehensive technology stack spanning cloud infrastructure, enterprise integration, and AI solutions
            </p>
          </div>
          
          <div className="space-y-12">
            {techStack.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-semibold mb-6 text-[#00FFD1] flex items-center">
                  {categoryIndex === 0 && <Cloud className="mr-3 h-6 w-6" />}
                  {categoryIndex === 1 && <Building className="mr-3 h-6 w-6" />}
                  {categoryIndex === 2 && <Zap className="mr-3 h-6 w-6" />}
                  {categoryIndex === 3 && <Code className="mr-3 h-6 w-6" />}
                  {category.category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-[#00FFD1]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-2xl mb-2">{tech.icon}</div>
                      <h4 className="font-semibold text-white group-hover:text-[#00FFD1] transition-colors duration-300">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-white/60 mt-1">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-[#00FFD1]">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-[#00FFD1] mx-auto mb-6"></div>
            <p className="text-lg text-white/70">
              Ready to discuss your next cloud architecture project? Let's build something amazing together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[#00FFD1]">Let's Connect</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                I'm always excited to discuss new opportunities and challenging projects. Whether you need cloud architecture consultation, enterprise integration, or AI-powered solutions, I'm here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <a href="mailto:soojidano@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5 text-[#00FFD1]" />
                  </a>
                  <a href="mailto:soojidano@gmail.com" target="_blank" rel="noopener noreferrer">
                    <span>{personalInfo.email}</span>
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <a href="https://github.com/vitrixLab" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 text-[#00FFD1]" />
                  </a>
                  <a href="https://github.com/vitrixLab" target="_blank" rel="noopener noreferrer">
                    <span>github.com/vitrixlab</span>
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <a href="www.linkedin.com/in/jasondano" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 text-[#00FFD1]" />
                  </a>
                  <a href="www.linkedin.com/in/jasondano" target="_blank" rel="noopener noreferrer">
                    <span>linkedin.com/in/jasondano</span>
                  </a>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
                <Input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                <Input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] rounded-none"
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-black border-white/30 text-white focus:border-[#00FFD1] focus:ring-[#00FFD1] resize-none rounded-none"
                  placeholder="Tell me about your project requirements..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-semibold py-3 rounded-none min-h-[56px]"
              >
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/60 mb-4 md:mb-0">
              © 2025 {personalInfo.name}. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com/vitrixLab" target="_blank" rel="noopener noreferrer">
                <button className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300">
                  <Github className="h-5 w-5" />
                </button>
              </a>
              <a href="www.linkedin.com/in/jasondano" target="_blank" rel="noopener noreferrer">
                <button className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                </button>
              </a>
              <a href="mailto:soojidano@gmail.com" target="_blank" rel="noopener noreferrer">
                <button className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300">
                  <Mail className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
