import React, { useState } from 'react';
import { Section } from './components/ui/Section';
import { Button } from './components/ui/Button';
import { Logo } from './components/ui/Logo';
import { DashboardGraphic } from './components/visuals/DashboardGraphic';
import { CreativeGraphic } from './components/visuals/CreativeGraphic';
import { TrainingGraphic } from './components/visuals/TrainingGraphic';
import { ArchitectureGraphic } from './components/visuals/ArchitectureGraphic';
import { AnimatedCounter } from './components/ui/AnimatedCounter';
import { TestimonialSlider, TestimonialData } from './components/ui/TestimonialSlider';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { SolutionsSection } from './components/ui/SolutionsSection';
import { HeroServicesGrid } from './components/ui/HeroServicesGrid';
import { ArrowRight, Check, Copy, ArrowDown, Instagram, Sparkles, Database, Layout, Brain, Cpu, ChevronRight, Menu, X } from 'lucide-react';

const testimonials: TestimonialData[] = [
  {
    id: 1,
    quote: "Aitoma didn't just automate our workflow; they completely redesigned how we think about client data. It feels like the company gained 20 IQ points overnight.",
    author: "James Dolan",
    role: "CTO",
    company: "VentureFlow"
  },
  {
    id: 2,
    quote: "The training modules were a game changer. Our team went from fearing AI to building their own custom GPTs in two weeks. Adoption is at an all-time high.",
    author: "Elena Rodriguez",
    role: "Head of Ops",
    company: "ScaleUp Inc."
  },
  {
    id: 3,
    quote: "We've seen a 300% increase in content velocity without adding headcount. The creative intelligence system preserves our voice perfectly across every channel.",
    author: "Marcus Chen",
    role: "Director of Product",
    company: "Nexus"
  }
];

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll detection for navbar blur effect with throttling
  React.useEffect(() => {
    let ticking = false;
    const scrollThreshold = 50; // Trigger after 50px scroll
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          setIsScrolled(scrollY > scrollThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@aitoma.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const services = [
    {
      id: "operations",
      number: "01",
      title: "Intelligent Operations",
      tagline: "Systems that think while you work.",
      description: "AI-powered operations running in the background—handling lead flow, client communication, and workflow orchestration autonomously.",
      deliverables: ["Self-managing CRMs", "Autonomous scheduling", "Real-time dashboards", "Predictive planning"],
      outcome: "Your business, but self-aware.",
      cta: "Explore Operations",
      graphic: <DashboardGraphic />
    },
    {
      id: "creative",
      number: "02",
      title: "Creative Systems",
      tagline: "Content that evolves with your brand.",
      description: "AI-driven creative engines that generate, personalize, and scale content without losing your brand voice.",
      deliverables: ["Brand Voice Dev", "Adaptive Systems", "Video & Copy Gen", "Campaign Intel"],
      outcome: "Creativity at speed of thought.",
      cta: "See Creative Systems",
      graphic: <CreativeGraphic />
    },
    {
      id: "training",
      number: "03",
      title: "Training & Adoption",
      tagline: "Teaching your team to think with AI.",
      description: "Custom workshops, playbooks, and hands-on enablement to help teams use AI confidently, ethically, and strategically.",
      deliverables: ["Dept Onboarding", "Custom GPT Creation", "Literacy Workshops", "Change Management"],
      outcome: "AI fluency, not just tools.",
      cta: "Build AI Fluency",
      graphic: <TrainingGraphic />
    },
    {
      id: "architecture",
      number: "04",
      title: "Custom Architecture",
      tagline: "Bespoke AI built for your workflow.",
      description: "Proprietary AI systems—from predictive models to internal copilots—tailored to how your business actually operates.",
      deliverables: ["Custom GPTs", "Predictive Analytics", "Knowledge Systems", "Decision Support"],
      outcome: "Intelligence that fits like a glove.",
      cta: "Build Custom AI",
      graphic: <ArchitectureGraphic />
    }
  ];

  return (
    <div className="min-h-screen bg-[#EAEAEA] text-[#0A0A0A] selection:bg-black selection:text-white cursor-none font-sans">
      <CustomCursor />
      
      {/* Top Header - Logo and CTA */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[1000] pt-4 md:pt-8 pb-4 md:pb-8 transition-all duration-300 ease-in-out ${
          isScrolled ? 'border-b border-gray-200/50 navbar-scrolled' : ''
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
          {/* Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
            <div className="cursor-pointer w-32 md:w-48 lg:w-56 pb-1 md:pb-3" onClick={() => window.scrollTo(0,0)}>
              <Logo className="w-full h-auto" />
            </div>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex ml-auto items-center">
            <Button 
              variant="accent" 
              size="sm" 
              onClick={() => window.open('https://cal.com/aitoma.ai/45discovery-aitoma', '_blank', 'noopener,noreferrer')}
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="text-black" />
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[2000] bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="w-32">
              <Logo className="w-full h-auto" />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Close menu"
            >
              <X size={24} className="text-black" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
            <Button
              variant="accent"
              size="lg"
              className="w-full max-w-[280px] mx-auto justify-center min-h-[48px] touch-manipulation"
              onClick={() => {
                setIsMenuOpen(false);
                window.open('https://cal.com/aitoma.ai/45discovery-aitoma', '_blank', 'noopener,noreferrer');
              }}
            >
              Book Consultation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full max-w-[280px] mx-auto justify-center min-h-[48px] touch-manipulation"
              onClick={() => scrollToSection('services')}
            >
              View Our Solutions
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Section className="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-start pt-20 md:pt-24 lg:pt-28 relative">
        <div className="max-w-[1400px] mx-auto text-center space-y-6 md:space-y-8 relative z-10 w-full px-6 md:px-12 lg:px-20">

            {/* Intelligence Lab Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform cursor-default mx-auto subhead">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
              INTELLIGENCE LAB
            </div>
            
            {/* Headline */}
            <div className="space-y-4 md:space-y-6 pt-2 md:pt-3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-black">
                Designing intelligence, <br className="hidden md:block" />
                <span className="text-gray-400">not just installing it.</span>
              </h1>
            </div>

            {/* What We Do Separator */}
            <div className="pt-6 md:pt-8 pb-4 md:pb-6">
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-[0.15em] subhead">
                  What We Do
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Services Grid Preview */}
            <HeroServicesGrid 
              services={[
                { id: 'operations', number: '01', title: 'Intelligent Operations', subtitle: 'Self-managing systems' },
                { id: 'creative', number: '02', title: 'Creative Systems', subtitle: 'AI-powered creation' },
                { id: 'training', number: '03', title: 'Training & Adoption', subtitle: 'Human-AI integration' },
                { id: 'architecture', number: '04', title: 'Custom Architecture', subtitle: 'Tailored intelligence' }
              ]}
            />

            {/* CTAs Below Services */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-8 justify-center items-center">
              <Button size="lg" onClick={() => scrollToSection('services')} icon={<ArrowRight size={18} />} className="w-full sm:w-auto min-w-[280px] justify-center">
                Explore Our Approach
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => window.open('https://cal.com/aitoma.ai/45discovery-aitoma', '_blank', 'noopener,noreferrer')} 
                className="w-full sm:w-auto min-w-[280px] justify-center"
              >
                Book a Consultation
              </Button>
            </div>
        </div>
      </Section>

      {/* Problem Statement / Philosophy */}
      <Section id="philosophy" className="">
        <ScrollReveal>
          <div className="w-full space-y-12 md:space-y-16">
            <div className="text-center space-y-6 md:space-y-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 px-3 py-1.5 rounded-full subhead">The Paradox</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                Most businesses have access to more intelligence than ever before, yet they are
                <span className="text-gray-400 block mt-2 md:mt-3">less intelligent in how they operate.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Drowning in tech", subtitle: "Starving for thinking", icon: <Database className="w-6 h-6"/> },
                { title: "Automating tasks", subtitle: "Ignoring systems", icon: <Cpu className="w-6 h-6"/> },
                { title: "Chasing efficiency", subtitle: "Losing intelligence", icon: <Brain className="w-6 h-6"/> }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 150} threshold={0.2}>
                  <div className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between h-full min-h-[200px]">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                      <p className="text-sm md:text-base text-gray-500 group-hover:translate-x-1 transition-transform delay-75 subhead">{item.subtitle}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* About Section - Bento Layout */}
      <Section className="">
        <ScrollReveal threshold={0.1}>
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 border border-gray-200 shadow-sm w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
              <div className="space-y-8 md:space-y-10">
                <ScrollReveal delay={100}>
                  <div className="space-y-4 md:space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 subhead">Who We Are</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">We're architects of intelligence.</h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
                      Aitoma is an intelligence lab for modern businesses. We don't build AI tools and walk away. We partner with companies to architect intelligent systems into every layer of their operation.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { title: "Think like designers", desc: "Creative, intentional solutions" },
                    { title: "Build like engineers", desc: "Precise, robust systems" },
                    { title: "Operate like partners", desc: "Long-term collaboration" }
                  ].map((p, i) => (
                    <ScrollReveal key={i} delay={200 + i * 100} direction="left">
                      <div className="flex flex-col items-start gap-3 p-5 md:p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-default border border-transparent hover:border-gray-100 group h-full">
                        <div className="w-10 h-10 rounded-full bg-[#EAEAEA] text-black flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-300">{i+1}</div>
                        <div>
                          <h4 className="text-base md:text-lg font-bold group-hover:text-black transition-colors">{p.title}</h4>
                          <p className="text-sm text-gray-500">{p.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <ScrollReveal delay={300} className="h-full">
                <div className="relative h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-[#EAEAEA] rounded-2xl overflow-hidden group">
                   <div className="absolute inset-0 flex items-center justify-center p-8">
                      {/* Abstract System Vis */}
                      <div className="relative w-full h-full max-w-sm max-h-sm flex items-center justify-center">
                        <div className="absolute inset-0 border border-dashed border-gray-400 rounded-full animate-spin-slow opacity-30"></div>
                        <div className="absolute inset-4 border border-dashed border-gray-400 rounded-full animate-spin-slow opacity-30" style={{animationDirection: 'reverse', animationDuration: '15s'}}></div>
                        
                        <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center z-10 relative">
                           <Sparkles size={32} className="text-black" />
                        </div>

                        {/* Orbiting Elements */}
                        {[0, 1, 2, 3].map((_, i) => (
                          <div key={i} className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: `${20 + i * 5}s` }}>
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full shadow-lg"></div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Services Section - Redesigned */}
      <Section id="services" className="">
        <SolutionsSection services={services} />
      </Section>

      {/* Process Section */}
      <Section id="process" className="bg-[#EAEAEA]">
        <ScrollReveal>
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">How We Build</h2>
            <div className="w-16 md:w-20 h-1 bg-black rounded-full"></div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
           {[
             { step: "01", title: "Discover", desc: "Map your system" },
             { step: "02", title: "Design", desc: "Architect solutions" },
             { step: "03", title: "Develop", desc: "Build & integrate" },
             { step: "04", title: "Deploy", desc: "Launch & monitor" },
             { step: "05", title: "Evolve", desc: "Optimize & scale" }
           ].map((s, i) => (
             <ScrollReveal key={i} delay={i * 100} direction="up" distance={30} className="h-full">
               <div className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[180px] md:min-h-[200px] h-full">
                  <div className="flex justify-between items-start">
                     <span className="font-mono text-xs md:text-sm text-gray-400">/{s.step}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-black transition-colors"></div>
                  </div>
                  <div>
                     <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 group-hover:translate-x-1 transition-transform">{s.title}</h4>
                     <p className="text-sm md:text-base text-gray-500 group-hover:translate-x-1 transition-transform delay-75">{s.desc}</p>
                  </div>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </Section>

      {/* Results Bento Grid */}
      <Section id="results" className="">
        <div className="bg-white rounded-2xl border-t border-b border-gray-200 p-6 md:p-8 lg:p-12 w-full">
          <ScrollReveal>
            <div className="mb-8 md:mb-12 lg:mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
               <div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2 md:mb-3 subhead">Social Proof</span>
                 <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Intelligence at Work</h3>
               </div>
               <p className="text-base md:text-lg text-gray-500 max-w-xs text-right hidden md:block">Measurable impact from systems designed for intelligence.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[minmax(200px,auto)]">
           {/* Stat 1 */}
           <ScrollReveal delay={100} className="h-full">
             <div className="bg-[#F8F9FA] p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="text-gray-500 font-medium text-sm flex justify-between items-center">
                    Efficiency
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-black tracking-tighter">
                     <AnimatedCounter end={500} suffix="+" />
                   </div>
                   <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">Hours Saved / Mo</div>
                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-black w-[85%] rounded-full"></div>
                   </div>
                </div>
             </div>
           </ScrollReveal>

           {/* Testimonial Slider */}
           <div className="md:col-span-2 row-span-1 lg:row-span-1">
             <ScrollReveal delay={200} className="h-full">
               <TestimonialSlider testimonials={testimonials} className="h-full rounded-2xl" />
             </ScrollReveal>
           </div>

           {/* Stat 2 */}
           <ScrollReveal delay={300} className="h-full">
             <div className="bg-[#F8F9FA] p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="text-gray-500 font-medium text-sm flex justify-between items-center">
                    Content Scale
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-black tracking-tighter">
                     <AnimatedCounter end={10} suffix="x" />
                   </div>
                   <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">Output Velocity</div>
                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-black w-[92%] rounded-full"></div>
                   </div>
                </div>
             </div>
           </ScrollReveal>

            {/* Stat 3 */}
           <ScrollReveal delay={400} className="h-full md:col-span-2 lg:col-span-2">
             <div className="bg-[#F8F9FA] p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="flex justify-between items-start">
                    <div className="text-gray-500 font-medium text-sm">Adoption Rate</div>
                    <div className="px-2 py-1 bg-white rounded text-xs font-bold text-black border border-gray-100">Top 1%</div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                   <div>
                       <div className="text-5xl md:text-6xl font-medium mb-2 text-black tracking-tighter">
                         <AnimatedCounter end={95} suffix="%" />
                       </div>
                       <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Team Utilization</div>
                   </div>
                   <div className="h-16 flex items-end gap-1 pb-1">
                      {[30, 45, 35, 60, 55, 75, 65, 90, 85, 95].map((h, i) => (
                          <div key={i} style={{height: `${h}%`}} className="flex-1 bg-gray-200 rounded-sm hover:bg-black transition-colors duration-300"></div>
                      ))}
                   </div>
                </div>
             </div>
           </ScrollReveal>

           {/* Stat 4 */}
           <ScrollReveal delay={500} className="h-full md:col-span-2 lg:col-span-2">
             <div className="bg-[#0A0A0A] p-5 md:p-6 lg:p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-800 group h-full text-white">
                <div className="text-gray-400 font-medium text-sm flex justify-between items-center">
                    Cost Reduction
                    <ArrowDown size={16} className="text-white" />
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-white tracking-tighter">
                     <AnimatedCounter end={40} suffix="%" />
                   </div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-4">OpEx Savings</div>
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-full bg-gray-800 rounded-full h-2">
                         <div className="bg-white h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                   </div>
                </div>
             </div>
           </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="contact" className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-100 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <ScrollReveal>
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
             <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
               Ready to design <br />
               <span className="text-gray-400">intelligence?</span>
             </h2>
             <p className="text-base md:text-lg lg:text-xl text-gray-500">Let's architect something extraordinary together.</p>
             
             <div className="pt-4 md:pt-8 flex flex-col items-center gap-6 md:gap-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[280px] justify-center"
                  onClick={() => window.open('https://cal.com/aitoma.ai/45discovery-aitoma', '_blank', 'noopener,noreferrer')}
                >
                  Book Consultation
                </Button>
             </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Footer */}
      <footer className="bg-[#EAEAEA] py-12 md:py-16 px-6 md:px-12 lg:px-20 border-t border-gray-200">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center md:items-start gap-3">
               <Logo className="w-32 md:w-36 h-auto" />
               <p className="text-sm md:text-base text-gray-500">Designing intelligence, not just installing it.</p>
            </div>
            
            <div className="flex gap-4 md:gap-6">
               <a 
                 href="https://www.instagram.com/aitoma.ai?igsh=MWgzeXN0cDE0eTd2ZQ==" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                 aria-label="Follow us on Instagram"
               >
                 <Instagram size={18} className="md:w-5 md:h-5" />
               </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm md:text-base text-gray-500">
               <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
               <span>© 2024 Aitoma Intelligence Lab</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;