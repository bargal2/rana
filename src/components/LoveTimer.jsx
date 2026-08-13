import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveTimer = () => {
    // التاريخ المحدد: 14 أبريل 2026
    const startDate = new Date('2026-04-14T00:00:00');
    
    const [timeLeft, setTimeLeft] = useState({
        years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            
            // في حال كان التاريخ المطلوب في المستقبل
            if (now < startDate) {
                setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            let hours = now.getHours() - startDate.getHours();
            let minutes = now.getMinutes() - startDate.getMinutes();
            let seconds = now.getSeconds() - startDate.getSeconds();

            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }
            if (hours < 0) {
                hours += 24;
                days--;
            }
            if (days < 0) {
                // جلب عدد أيام الشهر السابق لخصم الأيام بدقة
                const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += previousMonth.getDate();
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }

            setTimeLeft({ years, months, days, hours, minutes, seconds });
        };

        updateTimer(); // تشغيل فوري لتفادي التأخير لمدة ثانية
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label, shouldAnimate = false }) => (
        <div className="relative group w-full">
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 md:p-6 w-full h-28 md:h-36 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="relative overflow-hidden h-10 md:h-14 w-full flex justify-center items-center">
                    {shouldAnimate ? (
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={value}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-t from-pink-500 to-white"
                            >
                                {value.toString().padStart(2, '0')}
                            </motion.span>
                        </AnimatePresence>
                    ) : (
                        <span className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-t from-pink-500 to-white">
                            {value.toString().padStart(2, '0')}
                        </span>
                    )}
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-pink-300/60 font-medium mt-1 md:mt-2">
                    {label}
                </span>
            </div>
        </div>
    );

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 bg-[#030014] overflow-hidden font-sans">

            {/* 1. التاريخ العلوي (Luxury Badge) */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-20 mb-10 flex items-center gap-4"
            >
                <div className="h-[1px] w-8 bg-pink-500/50" />
                <div className="px-6 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-md flex items-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                    <span className="text-pink-500 text-xs italic font-serif">Since</span>
                    <span className="text-white font-mono text-xs md:text-sm tracking-[0.3em] font-bold">14/04/2026</span>
                </div>
                <div className="h-[1px] w-8 bg-pink-500/50" />
            </motion.div>

            {/* 2. العنوان الرئيسي */}
            <div className="text-center mb-12 z-10">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-7xl font-light text-white leading-tight"
                >
                    <span className="font-serif italic text-pink-600 drop-shadow-[0_0_15px_rgba(219,39,119,0.4)]">..</span> حكايتنا <span className="font-serif italic text-pink-600 drop-shadow-[0_0_15px_rgba(219,39,119,0.4)]">بدأت منذ</span>
                </motion.h2>
            </div>

            {/* 3. حاوية العداد (مقسمة لسطرين: فوق وتحت) */}
            <div className="z-10 w-full max-w-3xl flex flex-col gap-4 md:gap-6">
                {/* الصف العلوي: السنين، الشهور، الأيام */}
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                    <TimeUnit value={timeLeft.years} label="Years" />
                    <TimeUnit value={timeLeft.months} label="Months" />
                    <TimeUnit value={timeLeft.days} label="Days" />
                </div>

                {/* الصف السفلي: الساعات، الدقائق، الثواني */}
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Mins" />
                    <TimeUnit value={timeLeft.seconds} label="Secs" shouldAnimate={true} />
                </div>
            </div>

            {/* 4. رسالة تذييل */}
            <motion.p
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-14 text-white text-[10px] uppercase tracking-[0.6em] font-thin"
            >
                Every Second Matters With You
            </motion.p>

            {/* الخلفية المضيئة */}
            <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-900/20 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-pink-900/15 rounded-full blur-[180px] pointer-events-none" />
        </section>
    );
};

export default LoveTimer;