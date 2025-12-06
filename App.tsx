
import React, { useState, useEffect, Suspense } from 'react';
import { PenTool, Keyboard, Shield, Zap, Layers, Menu, X, Star, Feather } from 'lucide-react';
import TypeMode from './components/TypeMode';
// import DrawMode from './components/DrawMode'; // Lazy loaded below
import ColorPicker from './components/ColorPicker';
import Toast from './components/Toast';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './components/InfoPages';
import Blog from './components/Blog';
import { TabMode, SignatureColor, ToastMessage, AppView } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { FONTS, BLOG_POSTS } from './constants';
import { useTranslation } from './hooks/useTranslation';

const DrawMode = React.lazy(() => import('./components/DrawMode'));

function App() {
  // Localization
  const { t } = useTranslation();

  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use persistent state for Generator
  const [activeTab, setActiveTab] = useLocalStorage<TabMode>('sc_active_tab', 'type');
  const [text, setText] = useLocalStorage<string>('sc_text', '');
  const [color, setColor] = useLocalStorage<SignatureColor>('sc_color', '#0f172a'); // Default to Midnight
  
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Router Logic: Handle Initial Load & PopState
  useEffect(() => {
      const handleRoute = () => {
          const path = window.location.pathname;
          
          if (path === '/' || path === '') {
              setCurrentView('home');
          } else if (path === '/about') {
              setCurrentView('about');
          } else if (path === '/contact') {
              setCurrentView('contact');
          } else if (path === '/privacy') {
              setCurrentView('privacy');
          } else if (path === '/terms') {
              setCurrentView('terms');
          } else if (path === '/blog') {
              setCurrentView('blog');
          } else if (path.startsWith('/blog/')) {
              const slug = path.split('/blog/')[1];
              if (slug) {
                  setActiveBlogSlug(slug);
                  setCurrentView('blog-post');
              } else {
                  setCurrentView('blog');
              }
          } else {
              setCurrentView('home');
          }
      };

      // Handle initial load
      handleRoute();

      // Handle browser back/forward
      const onPopState = (event: PopStateEvent) => {
          if (event.state) {
              if (event.state.view) setCurrentView(event.state.view);
              if (event.state.slug) setActiveBlogSlug(event.state.slug);
              else setActiveBlogSlug(null);
          } else {
              handleRoute();
          }
      };

      window.addEventListener('popstate', onPopState);
      return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Dynamic SEO & Title Management Engine
  useEffect(() => {
    // Localization of Title (Simple Append)
    const baseTitle = t('app_title');
    const baseUrl = "https://handwrittensignaturegenerator.org";
    
    let title = baseTitle;
    let description = t('app_description');
    let path = "/";
    let articleData = null;
    let ogImage = "https://ui-avatars.com/api/?name=Sign+Craft&background=0f172a&color=fff&size=512";

    switch (currentView) {
        case 'home':
            if (activeTab === 'draw') {
                title = `Draw Signature Online - Realistic Handwriting Pad | SignCraft`;
            } else {
                title = `Type Your Signature Online - Free Generator | SignCraft`;
            }
            path = "/";
            break;
        case 'about':
            title = "About Us - SignCraft Mission & Privacy";
            path = "/about";
            break;
        case 'contact':
            title = "Contact Us - SignCraft Support";
            path = "/contact";
            break;
        case 'privacy':
            title = "Privacy Policy - SignCraft";
            path = "/privacy";
            break;
        case 'terms':
            title = "Terms & Conditions - SignCraft";
            path = "/terms";
            break;
        case 'blog':
            title = "SignCraft Blog - Digital Identity & Productivity Tips";
            path = "/blog";
            break;
        case 'blog-post':
            if (activeBlogSlug) {
                const post = BLOG_POSTS.find(p => p.slug === activeBlogSlug);
                if (post) {
                    title = `${post.title} | SignCraft Blog`;
                    description = post.summary;
                    path = `/blog/${activeBlogSlug}`;
                    if (post.image) ogImage = post.image;
                    
                    // Safe Date Parsing
                    let safeDate = new Date().toISOString().split('T')[0];
                    try {
                        safeDate = new Date(post.date).toISOString().split('T')[0];
                    } catch (e) {
                        console.warn("Date parsing error", e);
                    }

                    // Article Structured Data
                    articleData = {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "description": post.summary,
                        "image": post.image || "https://ui-avatars.com/api/?name=SC&background=0f172a&color=fff&size=1024",
                        "datePublished": safeDate,
                        "author": {
                            "@type": "Organization",
                            "name": post.author
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "SignCraft",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://ui-avatars.com/api/?name=Sign+Craft&background=0f172a&color=fff&size=512"
                            }
                        }
                    };
                }
            }
            break;
    }

    // Update Document Title
    document.title = title;

    // Helper to update or create meta tag safely
    const updateMeta = (name: string, content: string, property?: string) => {
        try {
            let element: Element | null = null;
            if (name) element = document.querySelector(`meta[name="${name}"]`);
            if (!element && property) element = document.querySelector(`meta[property="${property}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                if (name) element.setAttribute('name', name);
                if (property) element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content || '');
        } catch (e) {
            console.error('Error updating meta tag', e);
        }
    };

    updateMeta('description', description);
    updateMeta('', title, 'og:title');
    updateMeta('', description, 'og:description');
    updateMeta('', baseUrl + (path === '/' ? '' : path), 'og:url');
    updateMeta('', ogImage, 'og:image');

    // Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', baseUrl + (path === '/' ? '' : path));

    // Handle Article Schema Injection
    try {
        const existingSchema = document.getElementById('json-ld-article');
        if (existingSchema) existingSchema.remove();

        if (articleData) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'json-ld-article';
            script.text = JSON.stringify(articleData);
            document.head.appendChild(script);
        }
    } catch (e) {
        console.warn('Error injecting schema', e);
    }

  }, [currentView, activeTab, activeBlogSlug, t]);

  const handleNavigate = (view: AppView, slug?: string) => {
      // If we are already on this view/slug, do nothing
      if (view === currentView && slug === activeBlogSlug) return;
      
      setCurrentView(view);
      if (slug) setActiveBlogSlug(slug);
      else setActiveBlogSlug(null);
      
      setIsMobileMenuOpen(false);
      
      // Push State
      let path = '/';
      if (view !== 'home') path = `/${view}`;
      if (view === 'blog-post' && slug) path = `/blog/${slug}`;
      
      try {
          // Check for blob protocol to avoid SecurityError in preview environments
          if (window.location.protocol !== 'blob:') {
             window.history.pushState({ view, slug }, '', path);
          }
          window.scrollTo(0, 0);
      } catch (e) {
          // Fallback if pushState fails
          console.warn('Navigation state update failed:', e);
      }
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ id: Date.now().toString(), message, type });
  };

  const NavLink = ({ view, label }: { view: AppView, label: string }) => (
      <button 
        onClick={() => handleNavigate(view)}
        className={`text-sm font-medium transition-colors ${currentView === view ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
      >
        {label}
      </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => handleNavigate('home')} className="flex items-center space-x-2 group">
            <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Feather size={20} />
            </div>
            <span className="text-xl font-serif-display font-semibold tracking-tight text-slate-900">SignCraft</span>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink view="home" label={t('nav_home')} />
            <NavLink view="blog" label={t('nav_blog')} />
            <NavLink view="about" label={t('nav_about')} />
            <NavLink view="contact" label={t('nav_contact')} />
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-5 duration-200 overflow-y-auto max-h-[80vh]">
                <div className="flex flex-col p-4 space-y-2">
                    <button onClick={() => handleNavigate('home')} className="text-left font-medium text-slate-700 py-2 border-b border-gray-50">{t('nav_home')}</button>
                    <button onClick={() => handleNavigate('blog')} className="text-left font-medium text-slate-700 py-2 border-b border-gray-50">{t('nav_blog')}</button>
                    <button onClick={() => handleNavigate('about')} className="text-left font-medium text-slate-700 py-2 border-b border-gray-50">{t('nav_about')}</button>
                    <button onClick={() => handleNavigate('contact')} className="text-left font-medium text-slate-700 py-2 border-b border-gray-50">{t('nav_contact')}</button>
                </div>
            </div>
        )}
      </header>

      <main className="flex-grow px-4 sm:px-6 py-8 sm:py-12 bg-[#F8F9FA]">
        {currentView === 'home' ? (
            <div className="max-w-4xl mx-auto">
              {/* Hero */}
              <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-full mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-700">{t('rating_label')}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif-display font-medium text-slate-900 leading-tight">
                  {t('hero_title')}
                </h1>
                <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed px-4">
                  {t('hero_subtitle')}
                </p>
              </div>

              {/* Main App Container */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden relative">
                
                {/* Tab Switcher */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab('type')}
                    className={`flex-1 py-4 sm:py-5 text-sm font-medium transition-all relative flex items-center justify-center space-x-2 ${
                      activeTab === 'type' ? 'text-slate-900 bg-white' : 'text-slate-400 bg-gray-50 hover:text-slate-600'
                    }`}
                  >
                    <Keyboard size={18} />
                    <span>{t('tab_type')}</span>
                    {activeTab === 'type' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('draw')}
                    className={`flex-1 py-4 sm:py-5 text-sm font-medium transition-all relative flex items-center justify-center space-x-2 ${
                      activeTab === 'draw' ? 'text-slate-900 bg-white' : 'text-slate-400 bg-gray-50 hover:text-slate-600'
                    }`}
                  >
                    <PenTool size={18} />
                    <span>{t('tab_draw')}</span>
                    {activeTab === 'draw' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />
                    )}
                  </button>
                </div>

                {/* Workspace */}
                <div className="p-4 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] flex flex-col items-center">
                  
                  {/* Color Picker (Global) */}
                  <div className="mb-8">
                    <ColorPicker selectedColor={color} onColorChange={setColor} />
                    <p className="text-center text-xs text-slate-300 mt-2">{t('label_color')}</p>
                  </div>

                  {/* Modes */}
                  <div className="w-full relative">
                    {/* Render TypeMode but keep it mounted to preserve state */}
                    <div className={activeTab === 'type' ? 'block' : 'hidden'}>
                         <TypeMode text={text} setText={setText} color={color} onShowToast={showToast} />
                    </div>
                    
                    {/* Render DrawMode but keep it mounted to preserve canvas state */}
                    <div className={activeTab === 'draw' ? 'block' : 'hidden'}>
                        <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-slate-400">Loading Drawing Pad...</div>}>
                            <DrawMode color={color} isVisible={activeTab === 'draw'} onShowToast={showToast} />
                        </Suspense>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Content Section - Magazine Layout */}
              <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 max-w-5xl mx-auto px-2">
                  <div className="md:col-span-4">
                      <h2 className="text-2xl font-serif-display font-medium mb-6">{t('seo_why_title')}</h2>
                      <p className="text-slate-500 leading-relaxed text-sm">
                          {t('seo_why_desc')}
                      </p>
                  </div>
                  <div className="md:col-span-8 flex flex-col justify-center space-y-6">
                      <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-slate-900"><Shield size={20} /></div>
                          <div>
                              <h3 className="font-semibold text-slate-900 text-sm mb-1">{t('feature_privacy')}</h3>
                              <p className="text-slate-500 text-xs leading-relaxed">{t('feature_privacy_desc')}</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-slate-900"><Zap size={20} /></div>
                          <div>
                              <h3 className="font-semibold text-slate-900 text-sm mb-1">{t('feature_vector')}</h3>
                              <p className="text-slate-500 text-xs leading-relaxed">{t('feature_vector_desc')}</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-slate-900"><Layers size={20} /></div>
                          <div>
                              <h3 className="font-semibold text-slate-900 text-sm mb-1">{t('feature_ink')}</h3>
                              <p className="text-slate-500 text-xs leading-relaxed">{t('feature_ink_desc')}</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              {/* How to Steps - Cards */}
              <div className="mt-20 border-t border-gray-200 pt-16">
                  <h2 className="text-center text-2xl font-serif-display font-medium mb-12">{t('how_to_title')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                          { title: t('step_1_title'), desc: t('step_1_desc') },
                          { title: t('step_2_title'), desc: t('step_2_desc') },
                          { title: t('step_3_title'), desc: t('step_3_desc') }
                      ].map((step, i) => (
                          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                              <span className="text-4xl font-serif-display text-gray-100 font-bold mb-4 block">0{i+1}</span>
                              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>

               {/* SEO Footer - Keyword Injection for Fonts */}
               <div className="mt-20 border-t border-gray-200 pt-10 pb-4 text-center">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-4">{t('supported_styles_title')}</p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-3xl mx-auto">
                      {FONTS.map(f => (
                          <span key={f.name} className="text-[10px] text-gray-400 font-light hover:text-gray-600 transition-colors cursor-default">
                              {f.name} Signature
                          </span>
                      ))}
                  </div>
               </div>
            </div>
        ) : (
            <div className="mt-4 sm:mt-8">
                {currentView === 'blog' && <Blog view='blog' activeSlug={null} onNavigate={handleNavigate} onShowToast={showToast} />}
                {currentView === 'blog-post' && <Blog view='blog-post' activeSlug={activeBlogSlug} onNavigate={handleNavigate} onShowToast={showToast} />}
                
                {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
                {currentView === 'contact' && <ContactPage onNavigate={handleNavigate} />}
                {currentView === 'privacy' && <PrivacyPage onNavigate={handleNavigate} />}
                {currentView === 'terms' && <TermsPage onNavigate={handleNavigate} />}
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10 mt-12">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                            <Feather size={16} />
                        </div>
                        <span className="text-lg font-serif-display font-semibold tracking-tight text-slate-900">SignCraft</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {t('footer_tagline')}
                    </p>
                </div>

                {/* Product Links */}
                <div>
                    <h4 className="font-serif-display font-medium text-slate-900 mb-6">{t('footer_product')}</h4>
                    <ul className="space-y-3">
                        <li><button onClick={() => handleNavigate('home')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_home')}</button></li>
                        <li><button onClick={() => handleNavigate('blog')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_blog')}</button></li>
                        <li><button onClick={() => setActiveTab('draw')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('tab_draw')}</button></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-serif-display font-medium text-slate-900 mb-6">{t('footer_company')}</h4>
                    <ul className="space-y-3">
                        <li><button onClick={() => handleNavigate('about')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_about')}</button></li>
                        <li><button onClick={() => handleNavigate('contact')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_contact')}</button></li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="font-serif-display font-medium text-slate-900 mb-6">{t('footer_legal')}</h4>
                    <ul className="space-y-3">
                        <li><button onClick={() => handleNavigate('privacy')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_privacy')}</button></li>
                        <li><button onClick={() => handleNavigate('terms')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{t('nav_terms')}</button></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-400">
                    © 2025 handwrittensignaturegenerator.org. {t('footer_rights')}
                </p>
                <div className="flex gap-4">
                    <span className="text-xs text-gray-300">{t('footer_privacy_arch')}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-300">{t('footer_no_ai')}</span>
                </div>
            </div>
        </div>
      </footer>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
