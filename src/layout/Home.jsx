import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. مكون الخلفية المتحركة
const HeartsBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -50, x: Math.random() * 100 + "%", opacity: 0 }}
                animate={{
                    y: "110vh",
                    opacity: [0, 0.5, 0],
                    scale: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: Math.random() * 5 + 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                }}
                className="absolute text-pink-500/30 text-2xl"
            >
                ❤️
            </motion.div>
        ))}
    </div>
);

// 2. مكون شاشة القفل (البوابة)
const LoveGate = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const correctPassword = "1234";

    const handleChange = (e) => {
        const val = e.target.value.toLowerCase();
        setPassword(val);
        if (val === correctPassword) {
            setTimeout(() => onUnlock(), 500); // تأخير بسيط لشعور أجمل بالانتقال
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, filter: "blur(15px)" }}
            className="z-20 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[45px] w-[340px] shadow-2xl text-center"
        >
            <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping"></div>
                <img
                    src="https://via.placeholder.com/150" // استبدلها بصورتك
                    alt="Couple"
                    className="relative w-full h-full rounded-full object-cover border-2 border-pink-400/50"
                />
            </div>

            <h2 className="text-white text-3xl font-bold mb-2">جاهزة؟ 🤔</h2>
            <p className="text-pink-100/60 text-sm mb-8">كل الي هنا هيفضل بيني وبينك طول العمر ❤️</p>

            <input
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="l o v e الباسورد"
                className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 text-white text-center tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:tracking-normal placeholder:text-white/20"
            />
        </motion.div>
    );
};

// 3. المكون الأساسي اللي هيتجمع فيه كل شيء
const LoveExperience = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    return (
        <div className="relative min-h-screen w-full bg-[#0d0415] flex items-center justify-center overflow-hidden font-sans">
            <HeartsBackground />

            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <LoveGate key="gate" onUnlock={() => setIsUnlocked(true)} />
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="z-10 text-center px-6"
                    >
                        <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 font-serif italic mb-4">
                            أنا بحبك ❤️
                        </h1>
                        <p className="text-pink-100/80 text-lg max-w-md">
                            هنا نبدأ فصل جديد من حكايتنا، شكراً لإنك موجودة في حياتي..
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoveExperience;