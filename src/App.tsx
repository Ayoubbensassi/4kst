import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Tv, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Play,
  Globe,
  CreditCard,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Clock,
  Activity,
  Award,
  Laptop,
  Flame,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const ICON_MAP: Record<string, React.FC<any>> = {
  Tv, Smartphone, Monitor, ShieldCheck, Zap, Headphones, CheckCircle2,
  ChevronDown, Star, Play, Globe, CreditCard, MessageCircle, Menu, X,
  ArrowRight, ChevronRight, Clock, Activity, Award, Laptop, Flame, Apple
};
const getIcon = (name: string): React.FC<any> => ICON_MAP[name] || Monitor;

const NavItem: React.FC<{ href: string; children: React.ReactNode; isLight: boolean; onClick?: () => void }> = ({ href, children, isLight, onClick }) => (
  <a 
    href={href} 
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
    className={`text-sm font-semibold transition-colors duration-500 ${isLight ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'}`}
  >
    {children}
  </a>
);

const StatCard: React.FC<{ value: string; label: string; isLight: boolean }> = ({ value, label, isLight }) => (
  <div className={`p-8 rounded-2xl border transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5'}`}>
    <div className={`text-4xl font-bold font-display mb-1 ${isLight ? 'text-blue-600' : 'text-primary'}`}>{value}</div>
    <div className={`text-sm font-bold uppercase tracking-widest opacity-40`}>{label}</div>
  </div>
);

const FeatureRow: React.FC<{ icon: any; title: string; desc: string; isLight: boolean }> = ({ icon: Icon, title, desc, isLight }) => (
  <div className="flex gap-4 items-start">
    <div className={`p-3 rounded-xl shrink-0 ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
      <Icon size={20} />
    </div>
    <div>
      <h4 className={`font-bold text-base mb-1 ${isLight ? 'text-black' : 'text-white'}`}>{title}</h4>
      <p className={`text-sm leading-relaxed opacity-50 ${isLight ? 'text-black' : 'text-white'}`}>{desc}</p>
    </div>
  </div>
);

const PricingCard: React.FC<{ plan: string; duration: string; price: string; originalPrice: string; discount: string; features: string[]; popular?: boolean; isLight: boolean; whatsapp: string }> = ({ plan, duration, price, originalPrice, discount, features, popular = false, isLight, whatsapp }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-8 rounded-2xl relative flex flex-col gap-6 transition-all duration-700 border ${
      popular 
        ? 'border-blue-600 shadow-xl ring-1 ring-blue-600' 
        : (isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5')
    }`}
  >
    {discount && (
      <div className="absolute top-4 left-4 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
        {discount}
      </div>
    )}
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap">
        <Star size={10} fill="currentColor" /> Le Plus Populaire
      </div>
    )}
    <div className="text-center pt-4">
      <h3 className={`text-2xl font-bold ${isLight ? 'text-black' : 'text-white'}`}>{plan}</h3>
      <p className="text-sm opacity-40 font-medium">{duration}</p>
    </div>
    <div className="text-center">
      <div className="text-sm opacity-30 line-through font-bold">{originalPrice}€</div>
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-5xl font-black ${isLight ? 'text-black' : 'text-white'}`}>{price}</span>
        <span className={`text-2xl font-bold ${isLight ? 'text-black' : 'text-white'}`}>€</span>
      </div>
      <p className="text-xs opacity-40 font-bold uppercase tracking-widest mt-1">Paiement unique</p>
    </div>
    <ul className="space-y-3 flex-grow py-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-60">
          <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <a 
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Bonjour, je souhaite commander le pack ${plan}`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-4 rounded-xl font-bold text-sm text-center transition-all duration-300 ${
        popular 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : (isLight ? 'bg-white border border-black/10 text-black hover:bg-black/5' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10')
      }`}
    >
      Commander Maintenant
    </a>
  </motion.div>
);

const BlogCard = ({ image, category, time, title, date, isLight }: { image: string; category: string; time: string; title: string; date: string; isLight: boolean }) => (
  <div className={`rounded-2xl overflow-hidden border transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5'}`}>
    <img src={image} alt={title} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
        <span className="px-2 py-1 bg-black/5 rounded">{category}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {time}</span>
      </div>
      <h4 className={`font-bold text-base leading-tight line-clamp-2 ${isLight ? 'text-black' : 'text-white'}`}>{title}</h4>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs opacity-40 font-bold">{date}</span>
        <a href="#" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">Lire <ChevronRight size={14} /></a>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer, isLight }: { question: string; answer: string; isLight: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border rounded-xl transition-all duration-700 mb-3 ${isLight ? 'bg-white border-black/5' : 'bg-white/5 border-white/5'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>{question}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} opacity-40`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className={`px-6 pb-5 text-sm leading-relaxed opacity-50 ${isLight ? 'text-black' : 'text-white'}`}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    ['#0a0a0a', '#0a0a0a', '#f8fafc']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    ['#ffffff', '#ffffff', '#000000']
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [isLight, setIsLight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'installation' | 'blog' | 'contact' | 'abonnements' | 'admin'>(
    location.pathname === '/admin' ? 'admin' : 'home'
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setCurrentPage('admin');
    } else if (currentPage === 'admin') {
      setCurrentPage('home');
    }
  }, [location.pathname]);

  const goTo = (page: typeof currentPage) => {
    if (page !== 'admin' && location.pathname === '/admin') navigate('/');
    setCurrentPage(page);
  };

  // CMS State
  const [cmsContent, setCmsContent] = useState(() => {
    const DEFAULT_CMS = {
      global: {
        whatsapp: "33680521483",
        email: "support@4kstream.fr",
        brandName: "4KSTREAM"
      },
      hero: {
        title: "Meilleur Abonnement IPTV France 2025 -",
        subtitle: "IPTV Smarters Pro 4K",
        highlight: "Expérience TV Compatible avec Tous les Appareils",
        desc: "Profitez du meilleur abonnement IPTV en France avec plus de 22 000 chaînes, films et séries en qualité 4K/8K. IPTV stable, activation immédiate et support 24/7.",
        image: "https://images.unsplash.com/photo-1462331940026-bfe3675fbed2?q=80&w=2000&auto=format&fit=crop"
      },
      features: [
        { title: "IPTV Stable", desc: "99.9% de disponibilité" },
        { title: "Qualité 4K/8K", desc: "Image Ultra HD" },
        { title: "Support 24/7", desc: "Assistance 7j/7" }
      ],
      whyUs: {
        title: "Abonnements IPTV France : Fiabilité, qualité 4K et activation immédiate",
        desc: "Sur Abonnements IPTV France, trouvez votre abonnement IPTV au meilleur rapport qualité-prix. Notre IPTV abonnement dédié au marché français offre des chaînes, films et séries en HD/8K, un service France IPTV stable et un support 7j/7.",
        points: [
          { title: "Meilleur abonnement IPTV premium", desc: "Packs optimisés pour IPTV France : large sélection de chaînes FR/UE/UK/USA/AF, VOD mise à jour et compatibilité multi-appareils." },
          { title: "Travail garanti & support", desc: "Activation rapide, assistance en français et garantie de disponibilité pour chaque France IPTV abonnement." }
        ],
        stats: [
          { value: "100%", label: "Qualité IPTV" },
          { value: "31k+", label: "Abonnés Satisfaits" },
          { value: "22k+", label: "Chaînes TV" },
          { value: "4.9", label: "Note Google" }
        ]
      },
      howItWorks: [
        { title: "Choisir", desc: "Sélectionnez le forfait qui correspond à vos besoins." },
        { title: "Payer", desc: "Effectuez votre paiement en toute sécurité." },
        { title: "Profiter", desc: "Recevez vos accès et commencez à regarder immédiatement." }
      ],
      pricing: [
        { plan: "Bronze", duration: "3 mois", price: "22.99", originalPrice: "39.99", discount: "-43%", features: ["+ 22 000 chaînes", "+ 60 000 films et séries", "Qualité 4K/HD/SD", "Compatibilité IPTV Smarters", "Mises à jour gratuites", "Netflix, Disney, Apple et plus", "AntiFreeze 10.0", "TV en Replay", "Assistance 24/7"] },
        { plan: "Silver", duration: "6 mois", price: "34.99", originalPrice: "54.99", discount: "-38%", features: ["+ 22 000 chaînes", "+ 100 000 films et séries", "Qualité SD/HD/4K", "Compatibilité totale", "Mises à jour gratuites", "Netflix, Disney, Apple et plus", "AntiFreeze 10.0", "TV en Replay", "Assistance 24/7"] },
        { plan: "Gold", duration: "12 mois", price: "44.99", originalPrice: "64.99", discount: "-31%", popular: true, features: ["+ 22 000 chaînes", "+ 150 000 films et séries", "Qualité SD/HD/4K/8K", "Compatibilité totale", "Mises à jour gratuites", "Netflix, Disney, Apple et plus", "AntiFreeze 10.0", "TV en Replay", "Assistance 24/7"] },
        { plan: "Diamond", duration: "24 mois", price: "74.99", originalPrice: "89.99", discount: "-17%", features: ["+ 22 000 chaînes", "+ 150 000 films et séries", "Qualité SD/HD/4K/8K", "Compatibilité totale", "Mises à jour gratuites", "Netflix, Disney, Apple et plus", "AntiFreeze 10.0", "TV en Replay", "Assistance VIP 24/7"] }
      ],
      images: {
        testimonial1: "https://picsum.photos/seed/whatsapp1/400/800",
        testimonial2: "https://picsum.photos/seed/whatsapp2/400/800",
        testimonial3: "https://picsum.photos/seed/whatsapp3/400/800",
        testimonial4: "https://picsum.photos/seed/whatsapp4/400/800",
        blogHome1: "https://picsum.photos/seed/guide1/800/500",
        blogHome2: "https://picsum.photos/seed/guide2/800/500",
        blogHome3: "https://picsum.photos/seed/guide3/800/500",
        blog1: "https://picsum.photos/seed/iptv1/800/600",
        blog2: "https://picsum.photos/seed/iptv2/800/600",
        blog3: "https://picsum.photos/seed/iptv3/800/600",
        blog4: "https://picsum.photos/seed/iptv4/800/600",
        blog5: "https://picsum.photos/seed/iptv5/800/600",
        blog6: "https://picsum.photos/seed/iptv6/800/600",
      },
      icons: {
        heroFeature1: "Activity",
        heroFeature2: "Globe",
        heroFeature3: "Headphones",
        whyUsPoint1: "Award",
        whyUsPoint2: "Activity",
        howItWorks1: "CreditCard",
        howItWorks2: "ShieldCheck",
        howItWorks3: "Play",
        keyFeature1: "Tv",
        keyFeature2: "Zap",
        keyFeature3: "Monitor",
        keyFeature4: "Activity",
        keyFeature5: "ShieldCheck",
        keyFeature6: "MessageCircle",
        compat1: "Monitor",
        compat2: "Smartphone",
        compat3: "Flame",
        compat4: "Laptop",
        compat5: "Tv",
        compat6: "Monitor",
      }
    };

    const saved = localStorage.getItem('4kstream_cms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Robust deep merge for essential sections
        return {
          ...DEFAULT_CMS,
          ...parsed,
          global: { ...DEFAULT_CMS.global, ...(parsed.global || {}) },
          whyUs: { ...DEFAULT_CMS.whyUs, ...(parsed.whyUs || {}) },
          hero: { ...DEFAULT_CMS.hero, ...(parsed.hero || {}) },
          images: { ...DEFAULT_CMS.images, ...(parsed.images || {}) },
          icons: { ...DEFAULT_CMS.icons, ...(parsed.icons || {}) },
        };
      } catch (e) {
        console.error("Error parsing CMS content from localStorage", e);
        return DEFAULT_CMS;
      }
    }
    return DEFAULT_CMS;
  });

  useEffect(() => {
    localStorage.setItem('4kstream_cms', JSON.stringify(cmsContent));
  }, [cmsContent]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (currentPage === 'home') {
        setIsLight(latest > 0.08);
      } else {
        setIsLight(true);
      }
    });
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYProgress, currentPage]);

  useEffect(() => {
    if (currentPage !== 'home') {
      setIsLight(true);
      window.scrollTo(0, 0);
    } else {
      setIsLight(window.scrollY > 100);
    }
  }, [currentPage]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        backgroundColor: currentPage === 'home' ? backgroundColor : '#f8fafc', 
        color: currentPage === 'home' ? textColor : '#000000' 
      }}
      className="min-h-screen transition-colors duration-700 ease-in-out"
    >


      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'py-4' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto px-8 flex items-center justify-between transition-all duration-500 ${isScrolled || currentPage !== 'home' ? (isLight ? 'bg-white/80 backdrop-blur-xl py-3 px-8 rounded-full shadow-sm border border-black/5' : 'bg-black/40 backdrop-blur-xl py-3 px-8 rounded-full border border-white/5') : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goTo('home')}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${isLight ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
              <Play size={14} fill="currentColor" />
            </div>
            <span className={`text-xl font-black font-display tracking-tighter transition-colors duration-500`}>
              {(cmsContent.global?.brandName || "4KSTREAM").split(' ')[0]}<span className={isLight ? 'text-blue-600' : 'text-primary'}>{(cmsContent.global?.brandName || "4K STREAM").split(' ').slice(1).join(' ')}</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavItem href="#" isLight={isLight} onClick={() => goTo('home')}>Accueil</NavItem>
            <NavItem href="#" isLight={isLight} onClick={() => goTo('abonnements')}>Abonnements</NavItem>
            <NavItem href="#" isLight={isLight} onClick={() => goTo('installation')}>Installation</NavItem>
            <NavItem href="#" isLight={isLight} onClick={() => goTo('blog')}>Blog</NavItem>
            <NavItem href="#" isLight={isLight} onClick={() => goTo('contact')}>Contact</NavItem>
          </nav>

          <div className="hidden md:block">
            <a 
              href={`https://wa.me/${cmsContent.global.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-3 rounded-lg font-bold text-sm transition-all duration-500 bg-blue-600 text-white hover:bg-blue-700`}
            >
              Commander
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`fixed inset-0 z-[60] flex flex-col p-10 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-dark'}`}
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-4"><X size={32} /></button>
            </div>
            <nav className="flex flex-col gap-8 mt-10">
              <a href="#" className="text-4xl font-bold font-display" onClick={() => { goTo('home'); setIsMobileMenuOpen(false); }}>Accueil</a>
              <a href="#" className="text-4xl font-bold font-display" onClick={() => { goTo('abonnements'); setIsMobileMenuOpen(false); }}>Abonnements</a>
              <a href="#" className="text-4xl font-bold font-display" onClick={() => { goTo('installation'); setIsMobileMenuOpen(false); }}>Installation</a>
              <a href="#" className="text-4xl font-bold font-display" onClick={() => { goTo('blog'); setIsMobileMenuOpen(false); }}>Blog</a>
              <a href="#" className="text-4xl font-bold font-display" onClick={() => { goTo('contact'); setIsMobileMenuOpen(false); }}>Contact</a>
              <a 
                href="https://wa.me/33680521483"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 py-5 rounded-xl font-bold text-lg text-center bg-blue-600 text-white`}
              >
                Commander
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <section id="accueil" className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-8 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white/80`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>Service IPTV #1 en France 2025</span>
              <div className="flex gap-0.5 ml-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#fbbf24" className="text-amber-400" />)}
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black font-display leading-[1.1] tracking-tighter relative"
            >
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] -z-10 rounded-full scale-150 opacity-50" />
              {cmsContent.hero.title} <br />
              {cmsContent.hero.subtitle}
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl font-bold font-display text-blue-500"
            >
              {cmsContent.hero.highlight}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-base md:text-lg opacity-60 leading-relaxed"
            >
              {cmsContent.hero.desc}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <button 
                onClick={() => goTo('abonnements')}
                className={`w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700`}
              >
                Voir les Abonnements
              </button>
              <a 
                href={`https://wa.me/${cmsContent.global.whatsapp}?text=24 trial please`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-base border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2`}
              >
                Essai Gratuit 24h
              </a>
            </motion.div>

            {/* Hero Feature Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto"
            >
              {[
                { icon: getIcon(cmsContent.icons.heroFeature1), ...cmsContent.features[0] },
                { icon: getIcon(cmsContent.icons.heroFeature2), ...cmsContent.features[1] },
                { icon: getIcon(cmsContent.icons.heroFeature3), ...cmsContent.features[2] },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-4 text-left">
                  <div className="p-3 rounded-xl bg-blue-600/20 text-blue-500">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <div className="text-base font-bold">{f.title}</div>
                    <div className="text-xs opacity-40 uppercase tracking-widest font-bold">{f.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Second Section (White Background) */}
        <section className="py-32 px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Meilleur Abonnement IPTV Premium
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display leading-tight ${isLight ? 'text-black' : 'text-white'}`}>
                {cmsContent.whyUs.title}
              </h2>
              <p className={`text-sm leading-relaxed opacity-60 ${isLight ? 'text-black' : 'text-white'}`}>
                {cmsContent.whyUs.desc}
              </p>

              <div className="space-y-8 pt-4">
                <FeatureRow 
                  isLight={isLight}
                  icon={getIcon(cmsContent.icons.whyUsPoint1)}
                  title={cmsContent.whyUs.points[0].title}
                  desc={cmsContent.whyUs.points[0].desc}
                />
                <FeatureRow 
                  isLight={isLight}
                  icon={getIcon(cmsContent.icons.whyUsPoint2)}
                  title={cmsContent.whyUs.points[1].title}
                  desc={cmsContent.whyUs.points[1].desc}
                />
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Profitez d'un abonnement IPTV stable avec une image HD/8K dès aujourd'hui !</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Rejoignez nos milliers d'IPTV abonnés satisfaits !</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:pl-10">
              {cmsContent.whyUs.stats.map((stat: any, i: number) => (
                <StatCard key={i} isLight={isLight} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="offres" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Nos Offres IPTV
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Choisissez le forfait IPTV qui vous convient</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Des forfaits IPTV flexibles, en HD/4K/8K, compatibles avec tous les appareils. <br />
                Profitez du meilleur du streaming avec notre abonnement IPTV France.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cmsContent.pricing.map((pack: any, i: number) => (
                <PricingCard 
                  key={i}
                  isLight={isLight}
                  whatsapp={cmsContent.global.whatsapp}
                  plan={pack.plan} 
                  duration={pack.duration}
                  price={pack.price} 
                  originalPrice={pack.originalPrice}
                  discount={pack.discount}
                  popular={pack.popular}
                  features={pack.features} 
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 opacity-40 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2"><ShieldCheck size={14} /> Paiement 100% Sécurisé</div>
              <div className="flex items-center gap-2"><Zap size={14} /> Activation Instantanée</div>
              <div className="flex items-center gap-2"><CreditCard size={14} /> Plusieurs modes de paiement</div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Fonctionnalités
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Pourquoi choisir 4K STREAM ?</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Découvrez pourquoi notre abonnement IPTV France est le choix préféré de milliers d'utilisateurs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: getIcon(cmsContent.icons.keyFeature1), title: "+20 000 Chaînes", desc: "Accédez à un catalogue immense de chaînes mondiales en direct." },
                { icon: getIcon(cmsContent.icons.keyFeature2), title: "Qualité 4K/HD", desc: "Diffusion ultra fluide en haute définition sans aucune latence." },
                { icon: getIcon(cmsContent.icons.keyFeature3), title: "Tous Appareils", desc: "Compatible avec Smart TV, Android, iOS, PC, MAG et plus encore." },
                { icon: getIcon(cmsContent.icons.keyFeature4), title: "99.9% Uptime", desc: "Nos serveurs garantissent une stabilité maximale 24h/24 et 7j/7." },
                { icon: getIcon(cmsContent.icons.keyFeature5), title: "Paiement Sécurisé", desc: "Vos transactions sont protégées par les meilleurs protocoles de sécurité." },
                { icon: getIcon(cmsContent.icons.keyFeature6), title: "Support WhatsApp 24/7", desc: "Une équipe dédiée pour vous aider à tout moment de la journée." },
              ].map((f, i) => (
                <div key={i} className={`p-8 rounded-2xl border flex flex-col gap-6 transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5 backdrop-blur-sm'}`}>
                  <div className={`p-4 rounded-xl shrink-0 w-fit ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                    <f.icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className={`font-bold text-base ${isLight ? 'text-black' : 'text-white'}`}>{f.title}</h4>
                    <p className={`text-sm leading-relaxed opacity-50 ${isLight ? 'text-black' : 'text-white'}`}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`py-32 px-8 transition-colors duration-700 ${isLight ? 'bg-blue-50/50' : 'bg-black/20'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Processus
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Comment ça marche ?</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Commencez à profiter de votre abonnement IPTV en 3 étapes simples.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-current opacity-10 -translate-y-12 z-0" />
              
              {[
                { step: "01", icon: getIcon(cmsContent.icons.howItWorks1), title: cmsContent.howItWorks[0].title, desc: cmsContent.howItWorks[0].desc },
                { step: "02", icon: getIcon(cmsContent.icons.howItWorks2), title: cmsContent.howItWorks[1].title, desc: cmsContent.howItWorks[1].desc },
                { step: "03", icon: getIcon(cmsContent.icons.howItWorks3), title: cmsContent.howItWorks[2].title, desc: cmsContent.howItWorks[2].desc },
              ].map((s, i) => (
                <div key={i} className="relative z-10 text-center space-y-6">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isLight ? 'bg-white border-blue-600 text-blue-600' : 'bg-dark border-primary text-primary'}`}>
                    <s.icon size={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold opacity-30 uppercase tracking-widest">Étape {s.step}</div>
                    <h4 className={`font-bold text-xl ${isLight ? 'text-black' : 'text-white'}`}>{s.title}</h4>
                    <p className={`text-sm leading-relaxed opacity-50 ${isLight ? 'text-black' : 'text-white'}`}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compatibility Section */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-3xl mx-auto mb-20 space-y-4">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Compatibilité
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Compatible Avec Tous Vos Appareils</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Accédez instantanément à plus de 22 000 chaînes, films et séries en qualité <br />
                HD & 8K sur tous vos appareils.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { icon: getIcon(cmsContent.icons.compat1), name: "Smart TV", desc: "Samsung, LG, Sony, etc." },
                { icon: getIcon(cmsContent.icons.compat2), name: "Android / iOS", desc: "Smartphones & Tablettes" },
                { icon: getIcon(cmsContent.icons.compat3), name: "Fire Stick", desc: "Amazon Fire TV" },
                { icon: getIcon(cmsContent.icons.compat4), name: "PC / Mac", desc: "Windows & macOS" },
                { icon: getIcon(cmsContent.icons.compat5), name: "IPTV Smarters Pro", desc: "Application recommandée" },
                { icon: getIcon(cmsContent.icons.compat6), name: "MAG / Formuler", desc: "Box Android TV" },
              ].map((d, i) => (
                <div key={i} className={`p-6 rounded-2xl border transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5'}`}>
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600">
                    <d.icon size={24} />
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLight ? 'text-black' : 'text-white'}`}>{d.name}</div>
                  <div className="text-[10px] opacity-40 font-bold">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
              <div className="space-y-6">
                <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                  Témoignages
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Avis de nos IPTV Abonnés</h2>
                <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                  Découvrez ce que nos clients pensent de notre abonnement IPTV France.
                </p>
              </div>
              <div className={`p-8 rounded-2xl border flex items-center justify-between transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-sm' : 'bg-white/5 border-white/5'}`}>
                <div className="space-y-1">
                  <div className={`text-4xl font-bold ${isLight ? 'text-blue-600' : 'text-primary'}`}>4.9</div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#fbbf24" className="text-amber-400" />)}
                  </div>
                  <div className="text-xs opacity-40 font-bold uppercase tracking-widest">Basé sur 31k+ avis</div>
                </div>
                <div className="w-px h-12 bg-current opacity-10" />
                <div className="text-right">
                  <div className="text-sm font-bold opacity-40">Note Google</div>
                  <div className="text-sm font-bold">Excellent</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-3xl overflow-hidden border border-black/5 shadow-lg">
                  <img src={cmsContent.images[`testimonial${i}` as keyof typeof cmsContent.images]} alt="Avis Client" className="w-full" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-center mt-12 text-sm font-bold opacity-40">
              Rejoignez plus de <span className="text-blue-600">31 000+ abonnés</span> satisfaits de notre service IPTV France
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/5 text-primary'}`}>
                Blog & Actualités
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Guides et Conseils IPTV</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Découvrez nos articles pour tout savoir sur l'IPTV, les meilleures pratiques et <br />
                comment optimiser votre expérience de streaming.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCard 
                isLight={isLight}
                image={cmsContent.images.blogHome1}
                category="Guide"
                time="5 min"
                title="Meilleur IPTV Abonnement en France 2025 - Guide Complet"
                date="15 janv. 2025"
              />
              <BlogCard 
                isLight={isLight}
                image={cmsContent.images.blogHome2}
                category="Qualité"
                time="4 min"
                title="Service IPTV Stable et Fiable - Comment Reconnaître la Qualité"
                date="12 janv. 2025"
              />
              <BlogCard 
                isLight={isLight}
                image={cmsContent.images.blogHome3}
                category="Tutoriel"
                time="8 min"
                title="IPTV Smarters Pro - Guide d'Installation Complet 2025"
                date="10 janv. 2025"
              />
            </div>
            <div className="text-center mt-12">
              <button className={`px-8 py-3 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${isLight ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'}`}>
                Voir tous les articles
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Globe size={20} />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold font-display ${isLight ? 'text-black' : 'text-white'}`}>Questions Fréquentes</h2>
              <p className={`text-sm opacity-50 leading-relaxed ${isLight ? 'text-black' : 'text-white'}`}>
                Tout ce que vous devez savoir sur les meilleurs abonnements IPTV en France.
              </p>
            </div>
            <div className="space-y-1">
              <FAQItem 
                isLight={isLight}
                question="Qu'est-ce qu'un abonnement IPTV ?" 
                answer="L'IPTV (Internet Protocol Television) est un service qui diffuse des chaînes de télévision via Internet plutôt que par les méthodes traditionnelles (câble ou satellite). Cela permet une plus grande flexibilité et l'accès à des milliers de chaînes mondiales." 
              />
              <FAQItem 
                isLight={isLight}
                question="Comment installer IPTV sur ma Smart TV ?" 
                answer="L'installation est simple. Vous pouvez utiliser des applications comme IPTV Smarters Pro, IBO Player ou SET IPTV. Nous fournissons un guide étape par étape lors de votre commande." 
              />
              <FAQItem 
                isLight={isLight}
                question="Quels appareils sont compatibles avec IPTV Smarters Pro ?" 
                answer="IPTV Smarters Pro est compatible avec Android (Box, Smartphones, Tablettes), iOS, Firestick, Windows et macOS." 
              />
              <FAQItem 
                isLight={isLight}
                question="Le service IPTV est-il stable ?" 
                answer="Oui, nous utilisons des serveurs haute performance with une technologie anti-freeze 10.0 pour garantir une stabilité de 99.9% sans coupures." 
              />
              <FAQItem 
                isLight={isLight}
                question="Comment puis-je payer mon abonnement ?" 
                answer="Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et les crypto-monnaies pour une sécurité maximale." 
              />
              <FAQItem 
                isLight={isLight}
                question="Proposez-vous un essai gratuit ?" 
                answer="Oui, nous proposons un essai gratuit de 24h pour vous permettre de tester la qualité de nos services avant de vous engager." 
              />
              <FAQItem 
                isLight={isLight}
                question="Combien d'appareils peuvent utiliser mon abonnement ?" 
                answer="Par défaut, un abonnement est pour un seul appareil. Cependant, nous proposons des options multi-écrans si vous souhaitez utiliser le service sur plusieurs appareils simultanément." 
              />
              <FAQItem 
                isLight={isLight}
                question="Offrez-vous un support client ?" 
                answer="Absolument. Notre équipe de support est disponible 24/7 via WhatsApp et email pour vous aider en cas de besoin." 
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 px-8">
          <div className={`max-w-7xl mx-auto p-16 md:p-24 rounded-[3rem] text-center space-y-10 relative overflow-hidden bg-blue-600 text-white`}>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">Prêt à Profiter du Meilleur Abonnement IPTV en <br /> France ?</h2>
              <p className="text-sm opacity-80 max-w-2xl mx-auto">Commandez votre IPTV abonnement France maintenant et rejoignez nos <br /> milliers d'IPTV abonnés satisfaits !</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => goTo('abonnements')}
                  className={`w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-sm transition-all bg-white text-blue-600 hover:bg-white/90 flex items-center justify-center gap-2`}
                >
                  Voir les Abonnements <ArrowRight size={16} />
                </button>
                <a 
                  href={`https://wa.me/${cmsContent.global.whatsapp}?text=24 trial please`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-sm border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2`}
                >
                  Essai Gratuit 24h
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
        ) : currentPage === 'abonnements' ? (
          <AbonnementsPage isLight={isLight} pricing={cmsContent.pricing} global={cmsContent.global} />
        ) : currentPage === 'installation' ? (
          <InstallationPage isLight={isLight} />
        ) : currentPage === 'blog' ? (
          <BlogPage isLight={isLight} images={cmsContent.images} />
        ) : currentPage === 'admin' ? (
          <AdminPage 
            content={cmsContent} 
            onChange={setCmsContent} 
            isAuthenticated={isAdminAuthenticated} 
            onLogin={() => setIsAdminAuthenticated(true)}
            onLogout={() => setIsAdminAuthenticated(false)}
          />
        ) : (
          <ContactPage isLight={isLight} global={cmsContent.global} />
        )}
      </main>

      {/* Footer */}
      <footer className={`pt-32 pb-16 px-8 border-t transition-colors duration-700 ${isLight ? 'bg-white border-black/5' : 'bg-dark border-white/5'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Play size={14} fill="currentColor" className="text-white" />
              </div>
              <span className="text-xl font-black font-display tracking-tighter">
                {(cmsContent.global?.brandName || "4KSTREAM").split(' ')[0]}<span className="text-blue-600">{(cmsContent.global?.brandName || "4K STREAM").split(' ').slice(1).join(' ')}</span>
              </span>
            </div>
            <p className="text-sm opacity-40 leading-relaxed">
              Le service IPTV n°1 en France. Qualité 4K/8K, stabilité garantie et support client réactif.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 opacity-40">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:opacity-50 transition-opacity">Accueil</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Abonnements</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Installation</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 opacity-40">Légal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:opacity-50 transition-opacity">Conditions</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Confidentialité</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Remboursement</a></li>
              <li><button onClick={() => navigate('/admin')} className="text-[10px] italic opacity-20 hover:opacity-100 transition-opacity">Admin</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-8 opacity-40">Contact</h4>
            <p className="text-sm opacity-40 mb-6">Besoin d'aide ? Contactez-nous 24/7.</p>
            <a 
              href={`https://wa.me/${cmsContent.global.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all bg-blue-600 text-white hover:bg-blue-700`}
            >
              <MessageCircle size={18} /> WhatsApp Support
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-current opacity-10 flex flex-col md:row items-center justify-between gap-6 text-xs font-bold uppercase tracking-widest">
          <p>© 2025 Abonnements IPTV France. Tous droits réservés.</p>
          <div className="flex items-center gap-8">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Crypto</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href={`https://wa.me/${cmsContent.global.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl bg-[#25D366] text-white`}
      >
        <MessageCircle size={28} />
      </motion.a>
    </motion.div>
  );
}

const BlogPage = ({ isLight, images }: { isLight: boolean; images: any }) => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  
  const filters = ["Tous", "Guide", "Qualité", "Tutoriel", "Compatibilité", "Comparatif", "Chaînes"];
  
  const posts = [
    {
      category: "Guide",
      time: "5 min",
      title: "Meilleur IPTV Abonnement en France 2025 - Guide Complet",
      excerpt: "Découvrez comment choisir le meilleur abonnement IPTV en France. Comparatif des offres, critères de qualité et conseils d'experts pour un streaming...",
      date: "15 janv. 2025",
      image: images?.blog1 || "https://picsum.photos/seed/iptv1/800/600"
    },
    {
      category: "Qualité",
      time: "4 min",
      title: "Service IPTV Stable et Fiable - Comment Reconnaître la Qualité",
      excerpt: "Apprenez à identifier un service IPTV de qualité. Stabilité, fiabilité et performance : les secrets d'un streaming sans interruption.",
      date: "12 janv. 2025",
      image: images?.blog2 || "https://picsum.photos/seed/iptv2/800/600"
    },
    {
      category: "Tutoriel",
      time: "6 min",
      title: "IPTV Smarters Pro - Guide d'Installation Complet 2025",
      excerpt: "Tutoriel complet pour installer et configurer IPTV Smarters Pro. L'application référence pour profiter de votre abonnement IPTV sur tous vos appareils.",
      date: "10 janv. 2025",
      image: images?.blog3 || "https://picsum.photos/seed/iptv3/800/600"
    },
    {
      category: "Compatibilité",
      time: "3 min",
      title: "Top 5 des Boîtiers IPTV Compatibles 4K en 2025",
      excerpt: "Quels sont les meilleurs boîtiers pour votre abonnement IPTV ? Test et avis sur les modèles Formuler, Nvidia Shield et Apple TV.",
      date: "08 janv. 2025",
      image: images?.blog4 || "https://picsum.photos/seed/iptv4/800/600"
    },
    {
      category: "Comparatif",
      time: "7 min",
      title: "Abonnement IPTV vs Câble Classique : Le Match Final",
      excerpt: "Pourquoi de plus en plus de Français passent à l'IPTV ? Économies, choix de chaînes et flexibilité : on compare tout pour vous.",
      date: "05 janv. 2025",
      image: images?.blog5 || "https://picsum.photos/seed/iptv5/800/600"
    },
    {
      category: "Chaînes",
      time: "4 min",
      title: "Liste des Chaînes Sportives Incluses dans l'Abonnement 4KSTREAM",
      excerpt: "Ne manquez aucun match. Découvrez la liste complète des chaînes de sport disponibles en Full HD et 4K sur notre service.",
      date: "02 janv. 2025",
      image: images?.blog6 || "https://picsum.photos/seed/iptv6/800/600"
    }
  ];

  const filteredPosts = activeFilter === "Tous" 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  return (
    <div className="pt-40 pb-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-widest">
            Blog IPTV
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display leading-tight tracking-tighter text-black">
            Les Meilleurs Abonnements IPTV 2025 : Guides et Comparatifs
          </h1>
          <p className="text-sm opacity-60 leading-relaxed max-w-2xl mx-auto text-black">
            Découvrez France IPTV abonnement, IPTV Smarters Pro et les meilleurs services IPTV compatibles 4K. Guides d'installation pour tous les appareils et boîtier IPTV.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-black/5 text-black/60 hover:text-black hover:border-black/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPosts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-md text-[10px] font-bold text-black uppercase">{post.category}</span>
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                    <Clock size={10} /> {post.time}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow space-y-4">
                <h3 className="text-lg font-bold text-black leading-tight hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm opacity-50 text-black leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-4 mt-auto border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{post.date}</span>
                  <button className="text-xs font-bold text-black flex items-center gap-1 hover:text-blue-600 transition-colors">
                    Lire <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AbonnementsPage = ({ isLight, pricing, global }: { isLight: boolean; pricing: any[]; global: any }) => {
  return (
    <div className="pt-40 pb-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-widest">
            Nos Forfaits
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tighter text-black">
            Choisissez Votre Abonnement
          </h1>
          <p className="text-sm opacity-60 leading-relaxed text-black max-w-2xl mx-auto">
            Des forfaits flexibles et sans engagement. Profitez de la meilleure qualité IPTV en France avec une activation immédiate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricing.map((card: any, i: number) => (
            <PricingCard 
              key={i}
              isLight={isLight}
              whatsapp={global.whatsapp}
              plan={card.plan}
              duration={card.duration}
              price={card.price}
              originalPrice={card.originalPrice}
              discount={card.discount}
              features={card.features}
              popular={card.popular}
            />
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm text-center space-y-6">
          <h2 className="text-2xl font-bold text-black">Plus de Détails sur nos Abonnements</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <h4 className="font-bold text-blue-600 text-sm italic">Activation Rapide</h4>
              <p className="text-xs opacity-50 font-medium">Votre abonnement est activé automatiquement juste après votre paiement.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-600 text-sm italic">Service Anti-Freeze</h4>
              <p className="text-xs opacity-50 font-medium">Nous utilisons des serveurs haut de gamme avec la technologie AntiFreeze 10.0.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-600 text-sm italic">Compatibilité Totale</h4>
              <p className="text-xs opacity-50 font-medium">Supporte Smart TV, Android, iOS, MAG, Firestick, PC et plus encore.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = ({ content, onChange, isAuthenticated, onLogin, onLogout }: any) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      onLogin();
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-black/5"
        >
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl font-black font-display tracking-tight">Espace Admin</h2>
            <p className="text-xs opacity-50 font-bold uppercase tracking-widest">Accès réservé aux administrateurs</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-5 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
            <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              Se Connecter <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const updateGlobal = (field: string, value: string) => {
    onChange({ ...content, global: { ...content.global, [field]: value } });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...content, stats: newStats });
  };

  const updateHero = (field: string, value: string) => {
    onChange({ ...content, hero: { ...content.hero, [field]: value } });
  };

  const updateHow = (index: number, field: string, value: string) => {
    const newSteps = [...content.howItWorks];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange({ ...content, howItWorks: newSteps });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChange({ ...content, features: newFeatures });
  };

  const updateWhyUs = (field: string, value: any) => {
    onChange({ ...content, whyUs: { ...content.whyUs, [field]: value } });
  };

  const updateWhyUsPoint = (index: number, field: string, value: string) => {
    const newPoints = [...content.whyUs.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    onChange({ ...content, whyUs: { ...content.whyUs, points: newPoints } });
  };

  const updateWhyUsStat = (index: number, field: string, value: string) => {
    const newStats = [...content.whyUs.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...content, whyUs: { ...content.whyUs, stats: newStats } });
  };

  const updatePricing = (index: number, field: string, value: string) => {
    const newPricing = [...content.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    onChange({ ...content, pricing: newPricing });
  };

  const updatePricingFeature = (packIndex: number, featureIndex: number, value: string) => {
    const newPricing = [...content.pricing];
    newPricing[packIndex].features[featureIndex] = value;
    onChange({ ...content, pricing: newPricing });
  };

  const updateImage = (key: string, value: string) => {
    onChange({ ...content, images: { ...content.images, [key]: value } });
  };

  const updateIcon = (key: string, value: string) => {
    onChange({ ...content, icons: { ...content.icons, [key]: value } });
  };

  return (
    <div className="pt-32 pb-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black font-display tracking-tighter text-black">Dashboard CMS</h1>
            <p className="text-sm opacity-50 font-medium">Gestion intégrale des contenus de 4K STREAM</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all"
          >
            Déconnexion
          </button>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['hero', 'whyUs', 'pricing', 'process', 'contact', 'images', 'icons'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-black/40 hover:text-black font-display'
              }`}
            >
              {tab === 'hero' ? 'Accueil' : tab === 'whyUs' ? 'Avantages' : tab === 'pricing' ? 'Forfaits' : tab === 'process' ? 'Étapes' : tab === 'contact' ? 'Global & Contact' : tab === 'images' ? '🖼 Images' : '🎨 Icônes'}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-sm max-w-5xl">
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold mb-4">Section Accueil</h3>
              <div className="grid gap-6 text-black">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Titre Principal</label>
                    <input type="text" value={content.hero.title} onChange={(e) => updateHero('title', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Sous-titre</label>
                    <input type="text" value={content.hero.subtitle} onChange={(e) => updateHero('subtitle', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Titre en Bleu</label>
                  <input type="text" value={content.hero.highlight} onChange={(e) => updateHero('highlight', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">URL Image de fond (Galaxy)</label>
                  <input type="text" value={content.hero.image} onChange={(e) => updateHero('image', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Paragraphe de Description</label>
                  <textarea rows={4} value={content.hero.desc} onChange={(e) => updateHero('desc', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>

                <div className="pt-8 space-y-4">
                  <h4 className="font-bold text-sm">Cartes de caractéristiques (Hero)</h4>
                  <div className="grid md:grid-cols-3 gap-4 font-black">
                    {content.features.map((f: any, i: number) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 border border-black/5 space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase opacity-40">Titre {i+1}</label>
                          <input type="text" value={f.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase opacity-40">Description {i+1}</label>
                          <input type="text" value={f.desc} onChange={(e) => updateFeature(i, 'desc', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whyUs' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold mb-4">Section Pourquoi Nous ?</h3>
              <div className="grid gap-6 text-black">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Titre de la section</label>
                  <input type="text" value={content.whyUs.title} onChange={(e) => updateWhyUs('title', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Description de la section</label>
                  <textarea rows={3} value={content.whyUs.desc} onChange={(e) => updateWhyUs('desc', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {content.whyUs.points.map((p: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-black/5 space-y-3">
                      <h4 className="font-bold text-xs">Point Clé {i+1}</h4>
                      <input type="text" value={p.title} onChange={(e) => updateWhyUsPoint(i, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm" placeholder="Titre" />
                      <textarea value={p.desc} onChange={(e) => updateWhyUsPoint(i, 'desc', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm" placeholder="Description" rows={2} />
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-widest opacity-40">Statistiques de Réassurance</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {content.whyUs.stats.map((s: any, i: number) => (
                      <div key={i} className="p-3 rounded-xl border border-black/5 bg-slate-50">
                        <input type="text" value={s.value} onChange={(e) => updateWhyUsStat(i, 'value', e.target.value)} className="w-full px-2 py-1 rounded bg-white border border-black/10 text-sm font-bold mb-2" />
                        <input type="text" value={s.label} onChange={(e) => updateWhyUsStat(i, 'label', e.target.value)} className="w-full px-2 py-1 rounded bg-white border border-black/10 text-[10px]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-12">
              <h3 className="text-xl font-bold mb-4">Gestion des Abonnements</h3>
              <div className="grid gap-8">
                {content.pricing.map((pack: any, i: number) => (
                  <div key={i} className="p-8 rounded-3xl border border-black/5 bg-slate-50/50 space-y-6 text-black">
                    <div className="flex items-center justify-between border-b border-black/5 pb-4">
                      <h4 className="font-bold text-xl text-blue-600">Pack {pack.plan} ({pack.duration})</h4>
                      <input type="text" value={pack.price} onChange={(e) => updatePricing(i, 'price', e.target.value)} className="w-24 px-4 py-2 rounded-lg border border-black/10 text-right font-bold" />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Prix d'origine</label>
                        <input type="text" value={pack.originalPrice} onChange={(e) => updatePricing(i, 'originalPrice', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Texte Réduction</label>
                        <input type="text" value={pack.discount} onChange={(e) => updatePricing(i, 'discount', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm" />
                      </div>
                      <div className="space-y-2 flex items-center gap-2 pt-6">
                        <input type="checkbox" checked={pack.popular} onChange={(e) => updatePricing(i, 'popular', e.target.checked)} className="w-5 h-5 rounded accent-blue-600" />
                        <label className="text-xs font-bold uppercase tracking-widest">Étoile "Populaire"</label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Bénéfices / Lignes (Features)</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {pack.features.map((feat: string, fi: number) => (
                          <input key={fi} type="text" value={feat} onChange={(e) => updatePricingFeature(i, fi, e.target.value)} className="px-4 py-2 rounded-lg border border-black/5 text-xs bg-white" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold mb-4">Étapes (Comment ça marche)</h3>
              <div className="grid grid-cols-1 gap-6 text-black">
                {content.howItWorks.map((step: any, i: number) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-black/5 flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shrink-0">{i+1}</div>
                    <div className="flex-grow grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Titre de l'étape</label>
                        <input type="text" value={step.title} onChange={(e) => updateHow(i, 'title', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Description</label>
                        <input type="text" value={step.desc} onChange={(e) => updateHow(i, 'desc', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold mb-4">Paramètres Globaux</h3>
              <div className="grid md:grid-cols-2 gap-8 text-black">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Nom de la Marque</label>
                  <input type="text" value={content.global.brandName} onChange={(e) => updateGlobal('brandName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Numéro WhatsApp (Format: 336... sans +)</label>
                  <input type="text" value={content.global.whatsapp} onChange={(e) => updateGlobal('whatsapp', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm font-mono" />
                  <p className="text-[10px] text-blue-600">Note: Utilisé pour tous les liens WhatsApp du site.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Adresse Email Support</label>
                  <input type="text" value={content.global.email} onChange={(e) => updateGlobal('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm font-mono" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-10 text-black">
              <h3 className="text-xl font-bold">Gestion des Images</h3>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">Témoignages (4 images)</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Témoignage {i}</label>
                      <div className="flex gap-3 items-start">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-slate-100">
                          <img src={content.images?.[`testimonial${i}`]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <input
                          type="text"
                          value={content.images?.[`testimonial${i}`] || ''}
                          onChange={(e) => updateImage(`testimonial${i}`, e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-4 py-3 rounded-xl border border-black/10 text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">Blog Accueil (3 images)</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Article Accueil {i}</label>
                      <div className="rounded-xl overflow-hidden border border-black/10 bg-slate-100 h-28">
                        <img src={content.images?.[`blogHome${i}`]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={content.images?.[`blogHome${i}`] || ''}
                        onChange={(e) => updateImage(`blogHome${i}`, e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-xl border border-black/10 text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">Page Blog (6 articles)</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Article Blog {i}</label>
                      <div className="rounded-xl overflow-hidden border border-black/10 bg-slate-100 h-24">
                        <img src={content.images?.[`blog${i}`]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={content.images?.[`blog${i}`] || ''}
                        onChange={(e) => updateImage(`blog${i}`, e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-xl border border-black/10 text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'icons' && (
            <div className="space-y-10 text-black">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">Gestion des Icônes</h3>
                  <p className="text-xs opacity-40 mt-1">Icônes disponibles: Tv, Smartphone, Monitor, ShieldCheck, Zap, Headphones, Play, Globe, CreditCard, MessageCircle, Clock, Activity, Award, Laptop, Flame, Apple, Star, ArrowRight</p>
                </div>
              </div>

              {[
                {
                  label: "Cartes Hero (Section Accueil)",
                  items: [
                    { key: 'heroFeature1', label: 'Carte 1' },
                    { key: 'heroFeature2', label: 'Carte 2' },
                    { key: 'heroFeature3', label: 'Carte 3' },
                  ]
                },
                {
                  label: "Points Clés (Section Avantages)",
                  items: [
                    { key: 'whyUsPoint1', label: 'Point 1' },
                    { key: 'whyUsPoint2', label: 'Point 2' },
                  ]
                },
                {
                  label: "Étapes (Comment ça marche)",
                  items: [
                    { key: 'howItWorks1', label: 'Étape 1' },
                    { key: 'howItWorks2', label: 'Étape 2' },
                    { key: 'howItWorks3', label: 'Étape 3' },
                  ]
                },
                {
                  label: "Fonctionnalités Clés (6 cartes)",
                  items: [
                    { key: 'keyFeature1', label: 'Carte 1' },
                    { key: 'keyFeature2', label: 'Carte 2' },
                    { key: 'keyFeature3', label: 'Carte 3' },
                    { key: 'keyFeature4', label: 'Carte 4' },
                    { key: 'keyFeature5', label: 'Carte 5' },
                    { key: 'keyFeature6', label: 'Carte 6' },
                  ]
                },
                {
                  label: "Compatibilité Appareils (6 cartes)",
                  items: [
                    { key: 'compat1', label: 'Smart TV' },
                    { key: 'compat2', label: 'Android/iOS' },
                    { key: 'compat3', label: 'Fire Stick' },
                    { key: 'compat4', label: 'PC/Mac' },
                    { key: 'compat5', label: 'IPTV Smarters' },
                    { key: 'compat6', label: 'MAG/Formuler' },
                  ]
                },
              ].map((group) => (
                <div key={group.label} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">{group.label}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {group.items.map(({ key, label }) => {
                      const IconComp = getIcon(content.icons?.[key] || 'Monitor');
                      return (
                        <div key={key} className="p-4 rounded-xl bg-slate-50 border border-black/5 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <IconComp size={20} />
                            </div>
                            <span className="text-xs font-bold opacity-60">{label}</span>
                          </div>
                          <select
                            value={content.icons?.[key] || 'Monitor'}
                            onChange={(e) => updateIcon(key, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-black/10 text-xs font-mono bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                          >
                            {['Tv','Smartphone','Monitor','ShieldCheck','Zap','Headphones','Play','Globe','CreditCard','MessageCircle','Clock','Activity','Award','Laptop','Flame','Apple','Star','ArrowRight','ChevronRight'].map(name => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 rounded-2xl bg-black text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">Système Dynamic-CMS Actif</p>
            <p className="text-[10px] opacity-50 uppercase tracking-widest mt-1">Sauvegarde automatique dans localStorage</p>
          </div>
          <button 
            onClick={() => {
              if (window.confirm("Voulez-vous tout réinitialiser ?")) {
                localStorage.removeItem('4kstream_cms');
                window.location.reload();
              }
            }}
            className="px-6 py-2 rounded-lg bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            Réinitialiser Site
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ isLight, global }: { isLight: boolean; global: any }) => {
  return (
    <div className="pt-40 pb-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-widest">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tighter text-black">
            Contactez-Nous
          </h1>
          <p className="text-sm opacity-60 leading-relaxed text-black">
            Notre équipe est disponible 24h/24 pour répondre à toutes vos questions concernant nos services IPTV.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm space-y-8">
            <h3 className="text-xl font-bold text-black">Envoyez-nous un Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Nom complet</label>
                  <input type="text" placeholder="Votre nom" className="w-full px-5 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Adresse email</label>
                  <input type="email" placeholder="votre@email.com" className="w-full px-5 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">Sujet</label>
                <input type="text" placeholder="Le sujet de votre message" className="w-full px-5 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">Message</label>
                <textarea rows={6} placeholder="Votre message..." className="w-full px-5 py-3 rounded-xl border border-black/10 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all" />
              </div>
              <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                Envoyer le Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-black">Informations de Contact</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MessageCircle, title: "WhatsApp", info: `+${(global?.whatsapp || "33680521483").substring(0, 2)} ${(global?.whatsapp || "33680521483").substring(2, 3)} ${(global?.whatsapp || "33680521483").substring(3, 5)} ${(global?.whatsapp || "33680521483").substring(5, 7)} ${(global?.whatsapp || "33680521483").substring(7, 9)} ${(global?.whatsapp || "33680521483").substring(9, 11)}`, sub: "Réponse rapide sous 15 minutes", link: `https://wa.me/${global?.whatsapp || "33680521483"}` },
                { icon: Globe, title: "Email", info: global?.email || "support@4kstream.fr", sub: "Réponse sous 24 heures", link: `mailto:${global?.email || "support@4kstream.fr"}` },
                { icon: Clock, title: "Horaires", info: "24h/24 - 7j/7", sub: "Support disponible en permanence" },
                { icon: Award, title: "Service", info: "France & Europe", sub: "Service disponible dans toute l'Europe" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 mt-0.5 hover:underline decoration-2 underline-offset-2 transition-all">{item.info}</a>
                    ) : (
                      <p className="text-xs font-bold text-blue-600 mt-0.5">{item.info}</p>
                    )}
                    <p className="text-[10px] opacity-40 font-bold mt-1 uppercase leading-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] text-white space-y-4">
              <h4 className="font-bold">Support Prioritaire WhatsApp</h4>
              <p className="text-sm opacity-80 leading-relaxed">Pour une réponse immédiate, contactez-nous directement sur WhatsApp. Notre équipe répond en moins de 15 minutes.</p>
              <a 
                href={`https://wa.me/${global.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-white text-blue-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <MessageCircle size={18} /> Ouvrir WhatsApp
              </a>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-40">FAQ Rapide</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="opacity-40">Délai de réponse :</span>
                  <span>Sous 15 minutes via WhatsApp</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="opacity-40">Activation :</span>
                  <span>Immédiate après paiement</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="opacity-40">Support technique :</span>
                  <span>Configuration à distance possible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const InstallationPage = ({ isLight }: { isLight: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);

  const devices = [
    { name: "IPTV Smarters Pro", icon: Play },
    { name: "Smart TV (Samsung/LG)", icon: Tv },
    { name: "Android (Smartphone/Tablette)", icon: Smartphone },
    { name: "iPhone / iPad", icon: Apple },
    { name: "Amazon Fire Stick", icon: Flame },
    { name: "TiviMate", icon: Monitor },
    { name: "PC / Mac", icon: Laptop },
  ];

  const steps = [
    [
      "Téléchargez IPTV Smarters Pro depuis le Play Store, App Store ou le site officiel.",
      "Ouvrez l'application et sélectionnez \"Login with Xtream Codes API\".",
      "Entrez vos identifiants de connexion (fournis par email après achat) :",
      "URL du serveur : Fourni dans votre email de confirmation",
      "Nom d'utilisateur : Votre nom d'utilisateur",
      "Mot de passe : Votre mot de passe",
      "Cliquez sur \"Ajouter Utilisateur\" pour vous connecter.",
      "Profitez de plus de 10 000 chaînes en qualité 4K !"
    ],
    [
      "Accédez au store de votre Smart TV (Samsung Apps ou LG Content Store).",
      "Recherchez \"Smart IPTV\" ou \"IPTV Smarters\".",
      "Téléchargez et installez l'application.",
      "Ouvrez l'application et notez l'adresse MAC affichée.",
      "Rendez-vous sur le site de l'application et entrez votre liste M3U.",
      "Ou utilisez la méthode Xtream Codes avec vos identifiants.",
      "Redémarrez l'application pour charger les chaînes.",
      "Votre IPTV est maintenant configuré sur votre Smart TV !"
    ],
    [
      "Ouvrez le Google Play Store sur votre appareil Android.",
      "Recherchez \"IPTV Smarters Pro\" ou \"TiviMate\".",
      "Téléchargez et installez l'application de votre choix.",
      "Lancez l'application et choisissez \"Xtream Codes API\".",
      "Entrez vos identifiants de connexion fournis par email.",
      "Attendez le chargement de la liste des chaînes.",
      "Organisez vos chaînes favorites si souhaité.",
      "Profitez de votre IPTV partout avec vous !"
    ],
    [
      "Ouvrez l'App Store sur votre iPhone ou iPad.",
      "Recherchez \"IPTV Smarters\" ou \"GSE Smart IPTV\".",
      "Téléchargez et installez l'application.",
      "Ouvrez l'application et accédez aux paramètres.",
      "Sélectionnez \"Ajouter une playlist\" puis \"API Xtream Codes\".",
      "Entrez l'URL du serveur, votre nom d'utilisateur et mot de passe.",
      "Sauvegardez et attendez le chargement.",
      "Vos chaînes IPTV sont maintenant disponibles sur iOS !"
    ],
    [
      "Sur votre Fire Stick, allez dans Paramètres > Ma Fire TV > Options pour développeurs.",
      "Activez \"Applications de sources inconnues\".",
      "Téléchargez l'application \"Downloader\" depuis l'Amazon Appstore.",
      "Ouvrez Downloader et entrez l'URL de IPTV Smarters Pro.",
      "Téléchargez et installez l'APK.",
      "Lancez IPTV Smarters Pro depuis vos applications.",
      "Entrez vos identifiants Xtream Codes.",
      "Profitez de l'IPTV sur votre Fire Stick !"
    ],
    [
      "Téléchargez TiviMate depuis le Google Play Store ou APK.",
      "Lancez l'application et sélectionnez \"Ajouter une playlist\".",
      "Choisissez \"Xtream Codes\" comme type de playlist.",
      "Entrez l'URL du serveur fourni dans votre email.",
      "Ajoutez votre nom d'utilisateur et mot de passe.",
      "Cliquez sur \"Suivant\" pour valider la connexion.",
      "Personnalisez l'interface selon vos préférences.",
      "TiviMate offre une expérience IPTV premium !"
    ],
    [
      "Téléchargez VLC Media Player depuis le site officiel.",
      "Installez VLC sur votre ordinateur Windows ou Mac.",
      "Ouvrez VLC et allez dans Média > Ouvrir un flux réseau.",
      "Collez l'URL M3U fournie dans votre email de confirmation.",
      "Cliquez sur \"Lire\" pour commencer le streaming.",
      "Alternative : Utilisez IPTV Smarters pour Windows/Mac.",
      "Téléchargez depuis le site officiel et installez.",
      "Connectez-vous avec vos identifiants Xtream Codes."
    ]
  ];

  return (
    <div className="pt-40 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-black font-display leading-tight tracking-tighter ${isLight ? 'text-black' : 'text-white'}`}>
            IPTV Smarters Pro : Compatible avec Tous les Appareils et Boîtier IPTV
          </h1>
          <p className={`text-sm md:text-base opacity-60 leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-black' : 'text-white'}`}>
            Guide d'installation IPTV compatible Smart TV, Fire Stick, Android, iOS et boîtier IPTV. Profitez d'une expérience TV 4K sur tous les appareils avec notre abonnement IPTV fiable.
          </p>
        </div>

        {/* Device Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {devices.map((device, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === i 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : (isLight ? 'bg-white border border-black/5 text-black/60 hover:text-black hover:border-black/10' : 'bg-white/5 border border-white/5 text-white/60 hover:text-white hover:border-white/10')
              }`}
            >
              <device.icon size={16} />
              {device.name}
            </button>
          ))}
        </div>

        {/* Guide Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-4xl mx-auto p-10 rounded-3xl border transition-all duration-700 ${isLight ? 'bg-white border-black/5 shadow-xl' : 'bg-white/5 border-white/5 backdrop-blur-md'}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-blue-600/10 text-blue-600">
              {React.createElement(devices[activeTab].icon, { size: 32 })}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-black' : 'text-white'}`}>Installer IPTV sur {devices[activeTab].name}</h2>
              <p className="text-sm opacity-40 font-medium">Guide étape par étape pour configurer votre IPTV</p>
            </div>
          </div>

          <div className="space-y-4">
            {steps[activeTab].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <p className={`text-sm md:text-base font-medium leading-relaxed pt-1 ${isLight ? 'text-black/80' : 'text-white/80'}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-2xl border ${isLight ? 'bg-blue-50/50 border-blue-100' : 'bg-blue-600/5 border-blue-600/10'}`}>
            <p className={`text-sm font-medium ${isLight ? 'text-black/60' : 'text-white/60'}`}>
              <span className="font-bold text-blue-600">Besoin d'aide ?</span> Notre équipe de support est disponible 24/7 via <a href="https://wa.me/33680521483" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">WhatsApp</a> pour vous accompagner dans l'installation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};



