import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import LoveTimer from '../components/LoveTimer';
import LoveCards from '../components/LoveCards';
import NumberedLoveCards from '../components/NumberedLoveCards';
import FloatingGallery from '../components/FloatingGallery';
import RomanticFooter from '../components/RomantiFooter';

const SurpriseContent = () => {
    return (
        // أضفنا w-full و bg لتجنب أي مساحات بيضاء أو سوداء مفاجئة
        <div className="w-full min-h-screen bg-[#0d0415]">
            <Hero />
            <LoveTimer />
            <LoveCards />
            <NumberedLoveCards />
            <FloatingGallery />
            <RomanticFooter />
        </div>
    );
};

export default SurpriseContent;