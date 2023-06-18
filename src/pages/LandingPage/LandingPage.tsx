// ** components
import HeroSection from './components/HeroSection/HeroSection';
import ProductFeatures from './components/ProductFeatures/ProductFeatures';
import ContactSection from './components/ContactSection/ContactSection';
import IntroSection from './components/IntroSection/IntroSection';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <ProductFeatures />
      <ContactSection />
    </div>
  );
};

export default LandingPage;
