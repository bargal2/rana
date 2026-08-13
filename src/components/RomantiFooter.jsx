import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveMemory = () => {
    const [isOpen, setIsOpen] = useState(false);

    const memories = [
        { id: 1, img: "1.jpg", text: "بحبك يا نور عيني ❤️", size: "tall" },
        { id: 4, img: "4.jpg", text: "عمري ما كنت مبسوط زي ما انا معاكي ❤️", size: "tall" },
        { id: 6, img: "2.jpg", text: "يا مالكه قلبي ❤️", size: "small" },
    ];

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isOpen]);

    return (
        <section className="relative min-h-[600px] w-full flex items-center justify-center bg-[#05010d] overflow-hidden font-sans">
            
            {/* تأثيرات الإضاءة الخلفية */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            {/* الزر الرئيسي بالكلمة الجديدة */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        exit={{ scale: 0, opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 0.8 }}
                        className="z-10 flex flex-col items-center"
                    >
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-pink-400 text-[10px] tracking-[0.8em] uppercase mb-8 font-bold"
                        >
                            — Click to open —
                        </motion.span>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="relative group cursor-pointer"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-100 transition duration-500"></div>
                            
                            <div className="relative px-14 py-7 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-5 shadow-2xl">
                                <span className="text-white text-xl md:text-5xl font-black font-arabic tracking-tight">
                                    أجمل حكاية في <span className="text-pink-500 italic drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">عُمري</span>
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-4xl"
                                >
                                    ✨
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* نافذة الألبوم الغامرة */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#05010d]/98 backdrop-blur-3xl overflow-y-auto pt-28 pb-20 px-6"
                    >
                        {/* زر الإغلاق */}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed top-8 right-8 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl z-[110]"
                        >
                            ✕
                        </motion.button>

                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="max-w-6xl mx-auto text-center mb-24"
                        >
                            <h3 className="text-white text-4xl md:text-7xl font-black font-arabic mb-6">
                                ذكريات <span className="text-pink-500">لا تُنسى</span> 🎞️
                            </h3>
                            <div className="h-[2px] w-24 bg-pink-500 mx-auto rounded-full shadow-[0_0_15px_#ec4899]" />
                        </motion.div>

                        {/* شبكة الصور الاحترافية */}
                        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
                            {memories.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="break-inside-avoid group relative"
                                >
                                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 transition-all hover:border-pink-500/50 hover:shadow-2xl">
                                        <div className="relative overflow-hidden rounded-[1.8rem]">
                                            <img
                                                src={item.img}
                                                alt="Memory"
                                                className="w-full h-auto object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="mt-6 px-4">
                                            <p className="text-white/90 text-center font-arabic font-bold text-xl md:text-2xl leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* الرسالة الختامية */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mt-32 text-center"
                        >
                            <h4 className="text-pink-500/80 font-arabic text-3xl italic animate-pulse">
                                — دمتِ لي عُمراً جميلاً —
                            </h4>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default InteractiveMemory;