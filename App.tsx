import React, { useState, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import CV from './pages/CV';
import Contact from './pages/Contact';
import SearchModal from './components/SearchModal';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Simple Error Boundary to catch animation crashes
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.children; // Fallback: try to render children without the crash context if possible, or just a simple reset
    }
    return this.props.children;
  }
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <HashRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 origin-left z-50"
          style={{ scaleX }}
        />
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
          <Navbar onSearchClick={() => setIsSearchOpen(true)} />
          <main className="flex-grow w-full max-w-5xl mx-auto px-6">
            <AnimatedRoutes />
          </main>
          <Footer />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;