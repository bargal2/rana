import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardsData = [
    { id: 1, frontIcon: "❤️", text: "بحبك", backContent: "أنتي أجمل حاجة حصلتلي", color: "from-pink-500" },
    { id: 2, frontIcon: "✨", text: "بموت فيكي", backContent: "ضحكتك هي السبب اللي بيخليني أبتسم كل يوم", color: "from-purple-500" },
    { id: 3, frontIcon: "🔒", text: "بعشقك", backContent: "قلبي ملكك لوحدك، للأبد", color: "from-red-500" },
];

const LoveCards = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 bg-[#030014] overflow-hidden">
            {/* إضاءة خلفية متحركة */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="z-10 text-center mb-24"
            >
                <div className="inline-block px-4 py-1 mb-6 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-md">
                    <span className="text-pink-400 text-xs tracking-[0.4em] uppercase font-bold">Secret Feelings</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
                    رسائل من <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">قلبي</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    كل كارت يحمل سراً صغيراً .. اضغطي لتكتشفي ما وراء الكلمات
                </p>
            </motion.div>

            <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl px-4">
                {cardsData.map((card, index) => (
                    <LoveCard key={card.id} card={card} index={index} />
                ))}
            </div>
            
            <footer className="mt-24 z-10 opacity-30 text-white tracking-[1em] text-[10px] uppercase">
                Forever & Always
            </footer>
        </section>
    );
};

const LoveCard = ({ card, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group relative w-full h-[450px] [perspective:1500px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-700 shadow-2xl"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ y: -10 }}
            >
                {/* الواجهة الأمامية (Front) */}
                <div 
                    className="absolute inset-0 w-full h-full rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                        {/* أيقونة عائمة خلف النص */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] opacity-[0.03] select-none pointer-events-none">
                            {card.frontIcon}
                        </div>
                        
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-8xl mb-8 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                        >
                            {card.frontIcon}
                        </motion.div>
                        
                        <h3 className="text-4xl font-black text-white mb-2">{card.text}</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full mb-8" />
                        
                        <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-[0.4em] uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                            Open to see
                        </div>
                    </div>
                </div>

                {/* الواجهة الخلفية (Back) */}
                <div 
                    className="absolute inset-0 w-full h-full rounded-[3rem] border border-pink-500/30 overflow-hidden bg-[#0a051a]"
                    style={{ 
                        transform: "rotateY(180deg)", 
                        backfaceVisibility: "hidden" 
                    }}
                >
                    {/* خلفية تدرج لوني متحركة */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`} />
                    
                    <div className="relative flex flex-col items-center justify-center h-full p-10 text-center">
                        <div className="mb-8 opacity-20">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21M14.017 21H10.017M14.017 21H18.017C19.1216 21 20.017 20.1046 20.017 19V5C20.017 3.89543 19.1216 3 18.017 3H5.01701C3.91244 3 3.01701 3.89543 3.01701 5V19C3.01701 20.1046 3.91244 21 5.01701 21H10.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                        <p className="text-2xl md:text-3xl font-medium text-pink-50 font-arabic leading-relaxed mb-10">
                            {card.backContent}
                        </p>
                        
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-pink-500 font-serif italic text-xl">Love, You</span>
                            <div className="h-[2px] w-8 bg-pink-500/40" />
                        </div>
                        
                        {/* إضاءة في الزاوية */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${card.color} to-transparent rounded-full blur-3xl opacity-50`} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoveCards;