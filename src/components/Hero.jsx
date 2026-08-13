import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    // الرسالة الجديدة مقسمة لأسطر واضحة
    const lines = [
        "مش عارف أبدأ الكلام منين، بس حبيت أعملك حاجة بسيطة تفضل ذكرى حلوة عندك.",
        "الأول كل سنة وأنتي طيبة يا أحلى رنونة في الدنيا، وسنة جديدة سعيدة عليكِ تحققي فيها كل اللي تتمنيه. أه صحيح دي حاجة صغيرة من قيمتك يعني بس ماينفعش أعدي يوم زي ده من غير ما أعملك فيه أي حاجة، وإن شاء الله تتعوض، وعاوز أقولك إنك من الناس اللي وجودها فارق معايا جداً مع إننا مبنتكلمش يعني 🙂.",
        "ودايماً بفضل فاكر الهبل بتاعك والهزار والضحك على الحاجات العبيطة 🙃 بس منكرش إنها من أحسن الأيام.. وعارف إنك عديتيلي كتير ووقفتي معايا كتير مقدرش أنسى حاجة زي دي ولا أنكرها.",
        "وطبعاً منسيتش تفاصيل الأيام اللي بتجمعنا، الكلام العشوائي، الضحك على حاجات ملهاش لازمة، والمواقف الصغيرة اللي ممكن ننساها بعد فترة بس وقتها بتبقى أحلى حاجة في اليوم.. ولا نسيت المصايب اللي كانت بتحصل 🤦🏻‍♂️",
        "يمكن مش دايماً بعرف أقول الكلام الصح أو بعك بالكلام على طول، وممكن أوقات أكون ساكت أو مش بعرف أوضح اللي جوايا، بس ده مش معناه إن وجودك مش فارق معايا.",
        "بالعكس… إنتي أكتر واحدة الذكريات ما بينا بفضل فاكرها ومينفعش تتنسى، ومهما الأيام أخدتنا فين، أتمنى إن الذكريات الحلوة دي تفضل دايماً موجودة.",
        "وأهم حاجة… متنسيش إن في حد كان مبسوط جداً إنك كنتي جزء من أيامه اللي هو أنا 😁",
        "المهم إن كل سنة وأنتي طيبة يا رنونتيييييي ❤️✨"
    ];

    // نص السطر الكامل مجتمعاً لغرض حساب الكتابة التدريجية
    const fullText = lines.join("\n\n");

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        // بدء الكتابة بعد تأخير بسيط (0.5 ثانية) لظهور الصفحة
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < fullText.length) {
                    setDisplayedText(fullText.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30); // سرعة الكتابة (كل 30 مللي ثانية ينزل حرف)

            return () => clearInterval(interval);
        }, 500);

        return () => clearTimeout(startTimeout);
    }, [fullText]);

    return (
        <motion.section
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden text-white bg-[#030014] selection:bg-purple-500/30"
        >
            {/* 1. الخلفية */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1.2, filter: 'blur(10px)' }}
                    animate={{ scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000"
                    className="w-full h-full object-cover opacity-60 scale-110"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/80 via-transparent to-[#030014]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            </div>

            {/* 2. المحتوى الرئيسي */}
            <motion.div style={{ y: y1, opacity }} className="z-20 flex flex-col items-center text-center px-4 max-w-xl mx-auto w-full">
                
                {/* الشارة */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3 px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner flex items-center gap-2"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-pink-200/70">
                        رسالة من القلب
                    </span>
                </motion.div>

                {/* الاسم */}
                <motion.h1
                    initial={{ letterSpacing: "0.3em", filter: "blur(10px)", opacity: 0 }}
                    animate={{ letterSpacing: "0.05em", filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="text-4xl md:text-7xl font-black leading-none mb-4"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-t from-gray-400 via-white to-white drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
                        Rana
                    </span>
                </motion.h1>

                {/* صندوق الرسالة المزود بتأثير الكتابة الحية ومؤشر الكتابة (Cursor) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    dir="rtl"
                    className="w-full text-sm md:text-base font-normal text-white/90 bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-md max-h-[35vh] overflow-y-auto text-right dir-rtl shadow-2xl whitespace-pre-line leading-relaxed"
                >
                    {displayedText}
                    {/* مؤشر ينبض يشبه مؤشر الكتابة */}
                    <span className="inline-block w-1.5 h-4 ml-1 bg-pink-500 animate-pulse align-middle" />
                </motion.div>
            </motion.div>

            {/* 3. زر التمرير */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 z-20"
            >
                <button 
                    onClick={scrollToNext}
                    className="group flex flex-col items-center gap-2 transition-all duration-300"
                >
                    <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white">إكتشف المزيد</span>
                    <div className="w-[22px] h-[36px] border-[1.5px] border-white/20 rounded-full p-1 flex justify-center">
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-1.5 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"
                        />
                    </div>
                </button>
            </motion.div>
        </motion.section>
    );
};

export default Hero;