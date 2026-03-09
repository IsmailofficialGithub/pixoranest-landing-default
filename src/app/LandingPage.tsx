"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Mic, 
  Share2, 
  Bot, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Globe, 
  Shield, 
  Zap,
  Play,
  BarChart3,
  Users,
  ChevronRight,
  Sparkles,
  Command,
  Layout,
  Cpu,
  Activity
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Helper for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Smooth Scroll Hook ---
const useSmoothScroll = (targetId: string) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return handleClick;
};

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', id: 'services' },
    { name: 'Reseller', id: 'reseller' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'mailto:info@pixoranest.ai', isExternal: true },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3 flex items-center justify-between",
        scrolled ? "glass shadow-2xl shadow-[#4f39f6]/10 border-[#4f39f6]/10" : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
            <img src="/assets/logo.png" alt="Pixoranest Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Pixora<span className="text-[#a78bfa]">nest</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.isExternal ? link.id : `#${link.id}`}
              className="text-sm font-medium text-slate-300 hover:text-[#a78bfa] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-sm font-medium text-white transition-all active:scale-95">
            Log In
          </button>
          <button className="bg-[#4f39f6] hover:bg-[#4f39f6]/90 px-6 py-2 rounded-full text-sm font-medium text-white shadow-lg shadow-[#4f39f6]/20 transition-all active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 glass rounded-2xl p-6 md:hidden border-white/10 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.isExternal ? link.id : `#${link.id}`}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-[#a78bfa] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full bg-white/5 py-3 rounded-xl font-medium text-white border border-white/10">Log In</button>
              <button className="w-full bg-[#4f39f6] py-3 rounded-xl font-medium text-white shadow-lg shadow-[#4f39f6]/20">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero-title span", { 
        opacity: 0, 
        y: 40, 
        stagger: 0.1, 
        duration: 0.8,
      }, "-=0.4")
      .from(".hero-description", { opacity: 0, y: 20, duration: 0.6 }, "-=0.6")
      .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-users", { opacity: 0, x: -20, duration: 0.6 }, "-=0.4")
      .from(".hero-dashboard", { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" }, "-=1");

    // Float animation for background elements
    gsap.to(".bg-float-1", { y: 30, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".bg-float-2", { y: -40, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    gsap.to(".bg-float-3", { scale: 1.1, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-mesh opacity-50" />
      <div className="bg-float-1 absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#4f39f6]/20 blur-[120px]" />
      <div className="bg-float-2 absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-500/15 blur-[100px]" />
      <div className="bg-float-3 absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] rounded-full bg-orange-400/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4f39f6]/10 border border-[#4f39f6]/20 text-[#a78bfa] text-xs font-semibold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Next Generation AI Platform</span>
          </div>
          
          <h1 className="hero-title text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 font-display">
            <span className="block italic">Scale Without</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4f39f6] via-[#f97316] to-[#fbbf24]">Limits or Human</span>
            <span className="block">Intervention.</span>
          </h1>
          
          <p className="hero-description text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
            Deploy autonomous AI voice agents and WhatsApp automation that works 24/7 to capture, nurture, and close leads on autopilot.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 animate-up">
            <button className="group relative px-8 py-4 bg-[#4f39f6] rounded-2xl font-bold text-white shadow-xl shadow-[#4f39f6]/30 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden text-lg">
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f39f6] to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-4 glass border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
              <Play className="w-4 h-4 text-orange-400 group-hover:fill-orange-400 group-hover:text-orange-400 transition-all" /> Watch Demo
            </button>
          </div>

          <div className="hero-users mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">500+ Businesses</div>
              <div className="text-slate-500 leading-none">Trust Pixoranest AI</div>
            </div>
          </div>
        </div>

        <div className="hero-dashboard relative group">
          {/* Dashboard Preview Mockup */}
          <div className="relative z-10 glass rounded-3xl p-2 border-white/20 shadow-2xl backdrop-blur-3xl group-hover:translate-y-[-10px] transition-transform duration-500">
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-slate-900 relative">
              <img 
                src="/assets/hero_dashboard.png" 
                alt="AI Dashboard" 
                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/1200x800/0f172a/6366f1?text=Dashboard+Preview" }}
              />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -right-8 glass p-4 rounded-2xl border-white/20 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Conversion rate</div>
                    <div className="text-lg font-bold text-white">+124%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 -left-12 glass p-4 rounded-2xl border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#4f39f6]/20 p-2 rounded-lg">
                    <Users className="w-4 h-4 text-[#a78bfa]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Agents</div>
                    <div className="text-lg font-bold text-white">42 Online</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Backglow */}
          <div className="absolute inset-0 bg-[#4f39f6]/20 pointer-events-none blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  );
};

// --- Services ---
const services = [
  {
    title: "CallOrbit AI",
    tagline: "Ultra-Realistic AI Voice Agents",
    description: "Cold calling and inbound support that sounds exactly like a top-tier sales rep. Zero latency, 100% emotional intelligence.",
    icon: <Mic className="w-6 h-6" />,
    color: "indigo",
    image: "/assets/callorbit.png",
    features: ["Sub-500ms Response Time", "Custom Voice Cloning", "Direct CRM Integration", "Multi-Language Support"]
  },
  {
    title: "LeadNest Automation",
    tagline: "Next-Gen WhatsApp Campaigns",
    description: "Automate your entire WhatsApp marketing funnel. From broadcast to lead qualification, all on autopilot.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "orange",
    image: "/assets/leadnest.png",
    features: ["Official API Access", "Visual Flow Builder", "Smart Keyword Triggers", "Automated Follow-ups"]
  },
  {
    title: "EcoConnect Hub",
    tagline: "Social Media Distribution",
    description: "Post once, reach everywhere. Scale your brand across all social platforms with AI-optimized scheduling.",
    icon: <Share2 className="w-6 h-6" />,
    color: "purple",
    image: "/assets/ecoconnect.png",
    features: ["Cross-Platform Posting", "AI Caption Generation", "Analytics Dashboard", "Engagement Metrics"]
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  return (
    <div className="group relative service-card">
      <div className="glass rounded-[32px] overflow-hidden border-white/10 hover:border-[#4f39f6]/30 transition-all duration-500 flex flex-col h-full">
        {/* Card Header Illustration */}
        <div className="aspect-[1.5/1] overflow-hidden bg-slate-900 relative">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/800x600/0b081a/4f39f6?text=Solution+Preview" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
             <div className={cn(
              "p-3 rounded-2xl shadow-xl",
              service.color === "indigo" ? "bg-[#4f39f6] shadow-[#4f39f6]/20" : 
              service.color === "orange" ? "bg-orange-500 shadow-orange-500/20" : "bg-purple-600 shadow-purple-500/20"
            )}>
              {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-6 h-6 text-white" })}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white leading-none">{service.title}</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">{service.tagline}</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 flex flex-col flex-grow">
          <p className="text-slate-400 mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-3 mb-8">
            {service.features.map(feature => (
              <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className={cn(
                  "w-4 h-4 flex-shrink-0",
                  service.color === "orange" ? "text-orange-400" : "text-emerald-400"
                )} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button className="w-full py-4 rounded-xl border border-white/10 group-hover:bg-white/5 transition-all font-bold text-white flex items-center justify-center gap-2 group/btn active:scale-95">
              Explore Solution <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Feature Grid Pillar ---
const features = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Self-Learning Loop",
    desc: "Our AI agents learn from every interaction, automatically refining their scripts to maximize conversion.",
    gradient: "from-[#4f39f6] to-cyan-400",
    image: "/assets/learning_loop.png"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Grade",
    desc: "Built with SOC2 compliance and high-availability architecture for the world's most demanding brands.",
    gradient: "from-purple-500 to-pink-500",
    image: "/assets/enterprise.png"
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Deep Attribution",
    desc: "Track every call, every message, and every click. Know exactly where your revenue is coming from.",
    gradient: "from-amber-400 to-orange-500",
    image: "/assets/attribution.png"
  }
];

// --- Cinematic Section ---
const CinematicVision = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    gsap.to(".parallax-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.from(".vision-content", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[50vh] min-h-[400px] md:h-screen md:min-h-[800px] overflow-hidden flex items-center justify-center">
      <div className="parallax-bg absolute inset-0 -top-[30%] h-[160%] w-full -z-10">
        <img 
          src="/assets/cinematic_vision.png" 
          alt="Future Vision" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center vision-content relative z-10">
        <h2 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase font-display italic">
          Powering the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300">New Age</span> of Intelligence.
        </h2>
        <p className="text-xl lg:text-3xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
          While others follow, we build the foundations for autonomous enterprise growth. Scale beyond limits with Pixoranest.
        </p>
      </div>
    </section>
  );
};

// --- Testimonials ---
const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO, TechFlow",
    text: "Pixoranest didn't just automate our calls; it transformed our entire sales culture. Our revenue tripled in 4 months.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Sarah Chen",
    role: "Marketing Lead, GloScale",
    text: "The WhatsApp automation is scarily efficient. It qualified more leads in a week than our human team did in a month.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, NovaScale",
    text: "The white-label reseller program is a game changer. We launched our AI agency in 48 hours using their tech.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-up">
           <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 font-display">
            Built for <span className="text-gradient">Innovators.</span>
          </h2>
          <p className="text-xl text-slate-400">Trusted by the fastest growing companies in the ecosystem.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass p-10 rounded-[40px] border-white/10 hover:border-white/20 transition-all duration-500 group animate-up">
              <div className="flex gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Reseller Banner ---
const ResellerSection = () => {
  return (
    <section id="reseller" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#4f39f6]/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[40px] p-8 lg:p-16 border-[#4f39f6]/20 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4f39f6]/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4f39f6]/10 border border-[#4f39f6]/20 text-[#a78bfa] text-xs font-semibold mb-6 uppercase tracking-wider">
                Partnership Program
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight font-display">
                Your Brand, Our Tech. <br />
                <span className="text-gradient">Unlimited Growth.</span>
              </h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Join our white-label reseller program and offer premium AI communication tools under your own brand name and domain.
              </p>
              
              <ul className="space-y-4 mb-10">
                {["Full White Label Branding", "Dedicated Partner Portal", "Bulk Tier Pricing", "API & Webhook Access"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-[#4f39f6]/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#4f39f6]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black hover:bg-slate-200 transition-all shadow-xl shadow-white/10 active:scale-95">
                Apply for Reseller Access
              </button>
            </div>

            <div className="relative reseller-image">
              <div className="glass rounded-3xl p-4 border-white/10 rotate-2 lg:rotate-6 hover:rotate-0 transition-transform duration-500">
                 <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/assets/reseller.png" 
                      alt="Reseller Portal" 
                      className="w-full h-auto opacity-90 animate-up"
                    />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md-col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
                <img src="/assets/logo.png" alt="Pixoranest Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Pixoranest</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              The world's most advanced autonomous AI communication platform. Empowering businesses to automate growth with empathy and intelligence.
            </p>
            <div className="flex gap-4">
              {[Share2, Users, Globe, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4">
              {["CallOrbit", "LeadNest", "EcoConnect", "Custom Agents"].map(item => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-[#a78bfa] transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Reseller Program", "Privacy Policy", "Terms of Service"].map(item => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-[#a78bfa] transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Pixoranest AI. All rights reserved. Precision engineered in the cloud.
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</a>
             <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Security</a>
             <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---
export default function LandingPage() {
  const mainRef = useRef(null);

  useGSAP(() => {
    // Scroll triggered animations for sections
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      gsap.from(section.querySelectorAll('.animate-up'), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Specific animation for service cards
    gsap.from(".service-card", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#services",
        start: "top 70%",
      }
    });

    // Parallax effect for mesh backgrounds
    gsap.to(".bg-mesh", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen bg-slate-950 selection:bg-indigo-500/30">
      <Navbar />
      
      <main>
        <Hero />

        {/* Floating Pillars / Trust Bar */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div 
                  key={i}
                  className="group relative animate-up"
                >
                  <div 
                    className={cn("absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 blur-xl px-4 py-4 rounded-[32px] -z-10", f.gradient)}
                  />
                  
                  <div className="glass h-full p-8 rounded-[32px] border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden relative group/card">
                    {/* Background Illustration */}
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 -z-10 opacity-20 group-hover/card:scale-110 group-hover/card:opacity-30 transition-all duration-700 pointer-events-none">
                      <img src={f.image} alt="" className="w-full h-full object-contain" />
                    </div>

                    <div className={cn("mb-6 p-4 rounded-2xl bg-slate-900/50 border border-white/5 relative group-hover:scale-110 transition-transform duration-500 shadow-2xl w-fit")}>
                       <div className={cn("text-transparent bg-clip-text bg-gradient-to-br", f.gradient)}>
                        {f.icon}
                       </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-3 font-display">{f.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">{f.desc}</p>
                    
                    {/* Decorative Bottom Gradient */}
                    <div className={cn("absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-50", f.gradient)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-up">
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 font-display">
                Complete <span className="text-gradient">End-to-End</span> Automation
              </h2>
              <p className="text-xl text-slate-400">
                A unified ecosystem of AI solutions designed to handle every stage of your customer journey automatically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        <ResellerSection />

        <CinematicVision />

        <Testimonials />

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#4f39f6]/10 blur-[120px] translate-y-1/2 translate-x-1/2" />
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center glass p-12 lg:p-20 rounded-[48px] border-white/10 animate-up">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 font-display">
              Ready to automate <br /> your future?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join the hundreds of forward-thinking businesses scaling with Pixoranest. Setup in minutes, scale to infinity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="px-12 py-5 bg-[#4f39f6] text-white rounded-2xl font-black text-lg shadow-2xl shadow-[#4f39f6]/40 hover:scale-[1.05] transition-all active:scale-95">
                  Get Started Now
               </button>
               <a href="mailto:info@pixoranest.ai" className="px-12 py-5 glass border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center">
                  Contact Sales
               </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
