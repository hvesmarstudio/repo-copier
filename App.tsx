import React, { useState, useEffect } from 'react';
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
import { ArrowRight, Check, Copy, ArrowDown, Menu, X, Linkedin, Twitter, Github, Sparkles, Database, Layout, Brain, Cpu, ChevronRight } from 'lucide-react';

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
      setMobileMenuOpen(false);
    }
  };

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
    <div className="min-h-screen bg-[#EAEAEA] text-[#0A0A0A] selection:bg-[#0A4DD3] selection:text-white cursor-none font-sans">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#EAEAEA]/80 backdrop-blur-xl border-b border-gray-200/50 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="cursor-pointer z-50 w-32" onClick={() => window.scrollTo(0,0)}>
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-gray-200/50 shadow-sm">
            <button onClick={() => scrollToSection('philosophy')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all duration-300">Philosophy</button>
            <button onClick={() => scrollToSection('services')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all duration-300">Solutions</button>
            <button onClick={() => scrollToSection('process')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all duration-300">Process</button>
            <button onClick={() => scrollToSection('results')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all duration-300">Results</button>
          </div>

          <div className="hidden md:block">
             <Button variant="accent" size="sm" onClick={() => scrollToSection('contact')}>Book Consultation</Button>
          </div>

          <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#EAEAEA] flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col gap-8 text-center">
            <button onClick={() => scrollToSection('philosophy')} className="text-4xl font-display font-medium text-gray-800 hover:text-black">Philosophy</button>
            <button onClick={() => scrollToSection('services')} className="text-4xl font-display font-medium text-gray-800 hover:text-black">Solutions</button>
            <button onClick={() => scrollToSection('process')} className="text-4xl font-display font-medium text-gray-800 hover:text-black">Process</button>
            <button onClick={() => scrollToSection('results')} className="text-4xl font-display font-medium text-gray-800 hover:text-black">Results</button>
            <div className="pt-8">
               <Button variant="accent" className="w-full text-lg py-6" onClick={() => scrollToSection('contact')}>Book Consultation</Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Section className="min-h-[70vh] flex flex-col justify-center pt-32 pb-12 md:pt-40 relative">
        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-xs font-semibold tracking-wider hover:scale-105 transition-transform cursor-default mx-auto">
              <span className="w-2 h-2 rounded-full bg-[#0A4DD3] animate-pulse"></span>
              INTELLIGENCE LAB
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium leading-[0.95] tracking-tight text-black">
                Designing intelligence, <br className="hidden md:block" />
                <span className="text-gray-400">not just installing it.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                We architect AI systems that transform how modern businesses operate, create, and grow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('services')} icon={<ArrowRight size={18} />}>
                Explore Our Approach
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection('contact')}>
                Book a Consultation
              </Button>
            </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 hidden md:block">
          <ArrowDown size={20} />
        </div>
      </Section>

      {/* Problem Statement / Philosophy */}
      <Section id="philosophy" className="">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 px-3 py-1 rounded-full">The Paradox</span>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight">
                Most businesses have access to more intelligence than ever before, yet they are
                <span className="text-gray-400 block mt-2">less intelligent in how they operate.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Drowning in tech", subtitle: "Starving for thinking", icon: <Database className="w-6 h-6"/> },
                { title: "Automating tasks", subtitle: "Ignoring systems", icon: <Cpu className="w-6 h-6"/> },
                { title: "Chasing efficiency", subtitle: "Losing intelligence", icon: <Brain className="w-6 h-6"/> }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 150} threshold={0.2}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between h-full min-h-[200px]">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                      <p className="text-gray-500 group-hover:translate-x-1 transition-transform delay-75">{item.subtitle}</p>
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
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-8">
                <ScrollReveal delay={100}>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Who We Are</span>
                    <h2 className="text-4xl md:text-5xl font-medium leading-tight">We're architects of intelligence.</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                      Aitoma is an intelligence lab for modern businesses. We don't build AI tools and walk away. We partner with companies to architect intelligent systems into every layer of their operation.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Think like designers", desc: "Creative, intentional solutions" },
                    { title: "Build like engineers", desc: "Precise, robust systems" },
                    { title: "Operate like partners", desc: "Long-term collaboration" }
                  ].map((p, i) => (
                    <ScrollReveal key={i} delay={200 + i * 100} direction="left">
                      <div className="flex flex-col items-start gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-default border border-transparent hover:border-gray-100 group h-full">
                        <div className="w-10 h-10 rounded-full bg-[#EAEAEA] text-black flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-300">{i+1}</div>
                        <div>
                          <h4 className="font-bold group-hover:text-black transition-colors">{p.title}</h4>
                          <p className="text-sm text-gray-500">{p.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <ScrollReveal delay={300} className="h-full">
                <div className="relative h-full min-h-[350px] bg-[#EAEAEA] rounded-3xl overflow-hidden group">
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

      {/* Services Section - Tabbed Interface */}
      <Section id="services" className="">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Our Solutions</h2>
             <p className="text-gray-500 md:max-w-xs text-right hidden md:block">Select a capability to explore how we can help.</p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 h-auto min-h-[750px] lg:h-[600px]">
            {/* Tabs List - Mobile Horizontal Scroll / Desktop Vertical List */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:pr-2 no-scrollbar snap-x pb-4 lg:pb-0 h-auto lg:h-full">
               {services.map((service, index) => (
                 <button 
                   key={service.id}
                   onClick={() => setActiveService(index)}
                   className={`text-left p-6 rounded-3xl transition-all duration-300 group relative overflow-hidden flex-shrink-0 lg:flex-shrink flex flex-col justify-center border min-w-[85vw] lg:min-w-0 snap-center ${
                     activeService === index 
                       ? 'bg-[#0A0A0A] text-white border-[#0A4DD3] shadow-xl scale-[1.02]' 
                       : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50 hover:text-black hover:border-gray-200'
                   }`}
                 >
                   <div className="flex items-baseline justify-between w-full mb-1">
                      <span className={`text-6xl md:text-7xl font-display font-bold ${activeService === index ? 'text-white' : 'text-gray-300 group-hover:text-gray-400'}`}>
                        {service.number}
                      </span>
                      {activeService === index && (
                        <ArrowRight className="animate-pulse text-[#0A4DD3]" size={24} />
                      )}
                   </div>
                   <h3 className={`text-3xl md:text-4xl font-display font-bold leading-tight ${activeService === index ? 'text-white' : 'text-gray-800'}`}>
                     {service.title}
                   </h3>
                   {/* Active Indicator Line */}
                   {activeService === index && (
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-[#0A4DD3]"></div>
                   )}
                 </button>
               ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-200 shadow-sm relative overflow-hidden h-[850px] lg:h-full">
              {services.map((service, index) => (
                 <div 
                   key={service.id}
                   className={`absolute inset-0 p-6 md:p-10 w-full h-full transition-all duration-500 ease-in-out ${
                     activeService === index ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                   }`}
                 >
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                      {/* Text Content */}
                      <div className="flex flex-col justify-center h-full order-2 lg:order-1 space-y-6">
                         <div className="space-y-6">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-[#0A4DD3]">
                               {service.tagline}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-medium leading-tight">
                              {service.description}
                            </h3>
                            <div className="grid grid-cols-1 gap-3 pt-2">
                               {service.deliverables.slice(0, 4).map((d, i) => (
                                 <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#0A4DD3] shrink-0">
                                      <Check size={12} />
                                    </div>
                                    {d}
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="pt-8 mt-auto lg:mt-0">
                            <div className="text-xs text-gray-400 font-bold mb-3 uppercase flex items-center gap-2">
                                Outcome: <span className="text-[#0A0A0A]">{service.outcome}</span>
                            </div>
                            <Button variant="primary" className="w-full justify-between group">
                               {service.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                            </Button>
                         </div>
                      </div>

                      {/* Graphic Area */}
                      <div className="bg-[#F8F9FA] rounded-3xl border border-gray-100 overflow-hidden relative order-1 lg:order-2 h-[250px] lg:h-full w-full shadow-inner">
                         {service.graphic}
                      </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section id="process" className="bg-[#EAEAEA]">
        <ScrollReveal>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">How We Build</h2>
            <div className="w-16 h-1 bg-black rounded-full"></div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
           {[
             { step: "01", title: "Discover", desc: "Map your system" },
             { step: "02", title: "Design", desc: "Architect solutions" },
             { step: "03", title: "Develop", desc: "Build & integrate" },
             { step: "04", title: "Deploy", desc: "Launch & monitor" },
             { step: "05", title: "Evolve", desc: "Optimize & scale" }
           ].map((s, i) => (
             <ScrollReveal key={i} delay={i * 100} direction="up" distance={30} className="h-full">
               <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[180px] h-full">
                  <div className="flex justify-between items-start">
                     <span className="font-mono text-xs text-gray-400">/{s.step}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#0A4DD3] transition-colors"></div>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold mb-1 group-hover:translate-x-1 transition-transform">{s.title}</h4>
                     <p className="text-gray-500 text-xs group-hover:translate-x-1 transition-transform delay-75">{s.desc}</p>
                  </div>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </Section>

      {/* Promise Section */}
      <Section className="py-20 flex items-center justify-center text-center">
         <ScrollReveal>
           <div className="max-w-4xl space-y-6">
              <h2 className="text-3xl md:text-5xl font-medium text-gray-400 cursor-default">We don't just make your business faster.</h2>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-black cursor-default inline-block">We make it <span className="underline decoration-4 decoration-[#0A0A0A] underline-offset-8">smarter</span>.</h2>
           </div>
         </ScrollReveal>
      </Section>

      {/* Results Bento Grid */}
      <Section id="results" className="bg-white rounded-t-[3rem] border-t border-gray-200">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
             <div>
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Social Proof</span>
               <h3 className="text-3xl md:text-5xl font-medium">Intelligence at Work</h3>
             </div>
             <p className="text-lg text-gray-500 max-w-xs text-right hidden md:block">Measurable impact from systems designed for intelligence.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
           {/* Stat 1 */}
           <ScrollReveal delay={100} className="h-full">
             <div className="bg-[#F8F9FA] p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="text-gray-500 font-medium text-sm flex justify-between items-center">
                    Efficiency
                    <div className="w-2 h-2 rounded-full bg-[#0A4DD3]"></div>
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-black tracking-tighter">
                     <AnimatedCounter end={500} suffix="+" />
                   </div>
                   <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">Hours Saved / Mo</div>
                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-[#0A4DD3] w-[85%] rounded-full"></div>
                   </div>
                </div>
             </div>
           </ScrollReveal>

           {/* Testimonial Slider */}
           <div className="md:col-span-2 row-span-1 lg:row-span-1">
             <ScrollReveal delay={200} className="h-full">
               <TestimonialSlider testimonials={testimonials} className="h-full rounded-[2rem]" />
             </ScrollReveal>
           </div>

           {/* Stat 2 */}
           <ScrollReveal delay={300} className="h-full">
             <div className="bg-[#F8F9FA] p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="text-gray-500 font-medium text-sm flex justify-between items-center">
                    Content Scale
                    <div className="w-2 h-2 rounded-full bg-[#0A4DD3]"></div>
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-black tracking-tighter">
                     <AnimatedCounter end={10} suffix="x" />
                   </div>
                   <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">Output Velocity</div>
                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-[#0A4DD3] w-[92%] rounded-full"></div>
                   </div>
                </div>
             </div>
           </ScrollReveal>

            {/* Stat 3 */}
           <ScrollReveal delay={400} className="h-full md:col-span-2 lg:col-span-2">
             <div className="bg-[#F8F9FA] p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full">
                <div className="flex justify-between items-start">
                    <div className="text-gray-500 font-medium text-sm">Adoption Rate</div>
                    <div className="px-2 py-1 bg-white rounded text-xs font-bold text-[#0A4DD3] border border-gray-100">Top 1%</div>
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
                          <div key={i} style={{height: `${h}%`}} className="flex-1 bg-gray-200 rounded-sm hover:bg-[#0A4DD3] transition-colors duration-300"></div>
                      ))}
                   </div>
                </div>
             </div>
           </ScrollReveal>

           {/* Stat 4 */}
           <ScrollReveal delay={500} className="h-full md:col-span-2 lg:col-span-2">
             <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-800 group h-full text-white">
                <div className="text-gray-400 font-medium text-sm flex justify-between items-center">
                    Cost Reduction
                    <ArrowDown size={16} className="text-[#0A4DD3]" />
                </div>
                <div>
                   <div className="text-5xl md:text-6xl font-medium mb-2 text-white tracking-tighter">
                     <AnimatedCounter end={40} suffix="%" />
                   </div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-4">OpEx Savings</div>
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-full bg-gray-800 rounded-full h-2">
                         <div className="bg-[#0A4DD3] h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                   </div>
                </div>
             </div>
           </ScrollReveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="contact" className="min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-100 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <ScrollReveal>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
               Ready to design <br />
               <span className="text-gray-400">intelligence?</span>
             </h2>
             <p className="text-xl text-gray-500">Let's architect something extraordinary together.</p>
             
             <div className="pt-8 flex flex-col items-center gap-6">
                <div 
                  className="group relative inline-flex items-center gap-4 text-3xl md:text-5xl font-medium cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={handleCopyEmail}
                >
                   <span className="border-b-2 border-black/10 group-hover:border-black transition-colors pb-1">hello@aitoma.ai</span>
                   <div className="bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                   </div>
                   {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm bg-black text-white px-3 py-1 rounded-full animate-fade-in-up">
                        Copied!
                      </span>
                   )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
                   <Button variant="primary" size="lg" className="w-full sm:w-auto">Start the Conversation</Button>
                   <Button variant="outline" size="lg" className="w-full sm:w-auto">Download Capabilities</Button>
                </div>
             </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Footer */}
      <footer className="bg-[#EAEAEA] py-12 px-6 border-t border-gray-200">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
               <Logo className="w-24 opacity-80" />
               <p className="text-sm text-gray-500">Designing intelligence, not just installing it.</p>
            </div>
            
            <div className="flex gap-6">
               {[Linkedin, Twitter, Github].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-500">
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