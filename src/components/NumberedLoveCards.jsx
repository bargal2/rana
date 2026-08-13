import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NumberedLoveCards = () => {
    const cards = [
        { id: 1, text: "محبتش", subText: "البداية كانت عندك", color: "from-pink-500/20" },
        { id: 2, text: "ولا بحب", subText: "الحاضر كله ليكي", color: "from-purple-500/20" },
        { id: 3, text: "ولا هحب حد", subText: "المستقبل محجوز باسمك", color: "from-blue-500/20" },
        { id: 4, text: "زي ما حبيتك يا اجمل حاجة في حياتي ❤️", subText: "النهاية السعيدة", color: "from-red-500/20" },
    ];

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 bg-[#05010d] overflow-hidden font-sans">

            {/* إضاءات سينمائية في الخلفية */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="z-10 text-center mb-20 px-6"
            >
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-pink-500 text-xs tracking-[0.5em] uppercase font-bold mb-4 block"
                >
                    Exclusive for You
                </motion.span>
                <h2 className="text-5xl md:text-7xl font-black text-white font-arabic mb-6">
                    اكتشفي <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500">الحكاية</span>
                </h2>
                <p className="text-white/40 text-sm md:text-base font-arabic tracking-widest uppercase">
                    افتحي الكروت بالترتيب من 01 إلى 04
                </p>
            </motion.div>

            {/* شبكة الكروت المطورة */}
            <div className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-5xl px-8">
                {cards.map((card, index) => (
                    <CardItem key={card.id} card={card} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                className="mt-20 text-white text-[10px] tracking-[1em] uppercase"
            >
                Handcrafted with Love
            </motion.div>
        </section>
    );
};

const CardItem = ({ card, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group relative h-72 w-full cursor-pointer [perspective:2000px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
            >
                {/* الوجه الأمامي: تصميم Glassmorphism احترافي */}
                <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/10 rounded-[45px] flex items-center justify-center overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group-hover:border-pink-500/50 transition-colors"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    {/* رقم خلفي عملاق باهت */}
                    <span className="absolute -right-4 -bottom-8 text-[12rem] font-black text-white/[0.02] select-none uppercase">
                        {card.id}
                    </span>

                    <div className="flex flex-col items-center relative z-10">
                        <div className="relative">
                            <motion.span
                                className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
                            >
                                {card.id.toString().padStart(2, '0')}
                            </motion.span>
                            {/* خط نيون تحت الرقم */}
                            <motion.div
                                layoutId={`line-${card.id}`}
                                className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-2 shadow-[0_0_10px_#ec4899]"
                            />
                        </div>
                        <p className="mt-6 text-white/20 text-[10px] tracking-[0.6em] uppercase font-bold group-hover:text-pink-400 transition-colors">
                            Click to unlock
                        </p>
                    </div>
                </div>

                {/* الوجه الخلفي: تصميم عاطفي وفخم */}
                <div
                    className={`absolute inset-0 w-full h-full bg-[#0a0514] border-2 border-pink-500/20 rounded-[45px] flex flex-col items-center justify-center p-10 overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]`}
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {/* توهج داخلي ملون */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} to-transparent opacity-40`} />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="text-pink-500/40 mb-4 uppercase tracking-[0.3em] text-[10px] font-bold">
                            {card.subText}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl md:text-3xl font-arabic font-bold text-white text-center leading-[1.6] drop-shadow-2xl"
                        >
                            {card.text}
                        </motion.p>

                        <div className="mt-8 flex gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-1 w-1 rounded-full bg-pink-500/30" />
                            ))}
                        </div>
                    </div>

                    {/* شعاع ضوئي متحرك */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rotate-45 blur-3xl pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
};

export default NumberedLoveCards;