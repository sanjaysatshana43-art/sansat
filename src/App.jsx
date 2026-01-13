import { LanguageProvider } from './hooks/useLanguage'
import { CartProvider } from './hooks/useCart'
import { AppProvider } from './hooks/useApp'
import { ToastProvider, useToast } from './hooks/useToast'
import { useReveal } from './hooks/useReveal'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import { ProductSection } from './components/ProductCard'
import StorySection from './components/StorySection'
import ProcessSection from './components/ProcessSection'
import OrderSection from './components/OrderSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import MobileSticky from './components/MobileSticky'
import Toast from './components/Toast'

function AppContent() {
  // Enable scroll reveal animations
  useReveal();

  const { toast, hideToast } = useToast();

  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <Marquee />
      <ProductSection />
      <StorySection />
      <ProcessSection />
      <OrderSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <MobileSticky />
      <Toast
        show={toast.show}
        message={toast.message}
        icon={toast.icon}
        onHide={hideToast}
      />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <CartProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </CartProvider>
      </LanguageProvider>
    </AppProvider>
  )
}

export default App
