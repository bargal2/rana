import React from 'react';
import { motion } from 'framer-motion';

const FloatingGallery = () => {
    const photoData = [
        { id: 1, img: "1.jpg", text: "بحبك يا نور عيني ❤️", date: "Forever" },
        { id: 2, img: "2.jpg", text: "كل لحظة في عمري بتمنى تكون معاكي ❤️", date: "Always" },
        { id: 3, img: "3.jpg", text: "كل سنة واحنا مع بعض ❤️", date: "Together" },
        { id: 4, img: "4.jpg", text: "عمري ما كنت مبسوط زي ما انا معاكي ❤️", date: "Happy" },
    ];

    return (
        <section className="relative min-h-screen w-full bg-[#030014] py-24 px-6 overflow-hidden font-sans">

            {/* إضاءات خلفية سينمائية هادئة */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />

            {/* العنوان الرئيسي الاحترافي */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-24 z-10 relative"
            >
                <motion.span
                    initial={{ letterSpacing: "0.2em", opacity: 0 }}
                    whileInView={{ letterSpacing: "0.6em", opacity: 0.5 }}
                    className="text-white text-[10px] uppercase font-bold mb-4 block"
                >
                    Our Visual Journey
                </motion.span>
                <h2 className="text-5xl md:text-8xl font-black text-white font-arabic mb-6 tracking-tight">
                    حياتي باختصار <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-white to-purple-500">هنا</span>
                </h2>
                <div className="h-[2px] w-24 bg-pink-500 mx-auto rounded-full shadow-[0_0_20px_#ec4899]" />
            </motion.div>

            {/* شبكة الكاردات بنظام الـ Bento Box المطور */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {photoData.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: index * 0.15 }}
                        whileHover={{ y: -20, rotateY: 5 }}
                        className="group relative"
                    >
                        {/* الإطار المضيء الخلفي */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[45px] opacity-0 group-hover:opacity-40 blur-xl transition duration-700" />

                        <div className="relative bg-[#0a051a]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-4 h-full overflow-hidden shadow-2xl">

                            {/* حاوية الصورة بتأثير الـ Mask */}
                            <div className="relative overflow-hidden rounded-[32px] h-[420px] w-full">
                                <motion.img
                                    src={photo.img}
                                    alt="Moment"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                />

                                {/* طبقة تظليل ذكية */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a051a] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                                {/* تاريخ أو كلمة عائمة فوق الصورة */}
                                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                    <span className="text-white/60 text-[9px] uppercase tracking-[0.3em]">{photo.date}</span>
                                </div>
                            </div>

                            {/* النص الرومنسي بتصميم Typography فخم */}
                            <div className="mt-8 mb-4 px-2">
                                <p className="text-white font-arabic text-2xl font-bold leading-relaxed tracking-wide group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-white transition-all duration-500">
                                    {photo.text}
                                </p>
                                <div className="h-1 w-0 group-hover:w-full bg-pink-500/30 transition-all duration-700 mt-4 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* قلوب سينمائية (أكثر هدوءاً ورقياً) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/20"
                        initial={{
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: 0
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.4, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            {/* رسالة تذييل ناعمة */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                className="mt-32 text-center text-white text-[10px] tracking-[1.5em] uppercase font-thin"
            >
                Endless Love Story
            </motion.div>
        </section>
    );
};

export default FloatingGallery;