import { motion } from 'framer-motion';

const HeartsBackground = () => {
    // زيادة عدد القلوب لتغطية الشاشة بشكل غني
    const hearts = Array.from({ length: 25 });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* إضافة طبقة إضاءة خافتة في الخلفية (Vignette) لتعزيز الأجواء */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-purple-900/10" />

            {hearts.map((_, i) => {
                // توليد خصائص عشوائية لكل قلب لزيادة الواقعية
                const size = Math.random() * (30 - 10) + 10; // أحجام مختلفة
                const duration = Math.random() * 10 + 10;    // سرعات متفاوتة
                const delay = Math.random() * 10;           // تأخير عشوائي
                const blurValue = Math.random() > 0.7 ? 'blur(2px)' : 'blur(0px)'; // قلوب خارج التركيز (Bokeh)

                return (
                    <motion.div
                        key={i}
                        initial={{
                            y: "-10vh",
                            x: `${Math.random() * 100}%`,
                            opacity: 0,
                            rotate: 0,
                            scale: 0
                        }}
                        animate={{
                            y: "110vh",
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%` // حركة متعرجة (Swaying)
                            ],
                            opacity: [0, 0.7, 0.7, 0], // ظهور واختفاء تدريجي
                            rotate: [0, 45, -45, 90],  // دوران ناعم أثناء السقوط
                            scale: [0.5, 1, 0.8]      // نبض خفيف
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            ease: "easeInOut", // حركة أنعم من الـ linear
                            delay: delay,
                        }}
                        style={{
                            fontSize: size,
                            filter: `drop-shadow(0 0 10px rgba(236, 72, 153, 0.4)) ${blurValue}`,
                        }}
                        className="absolute text-pink-500/40 select-none"
                    >
                        ❤️
                    </motion.div>
                );
            })}

            {/* تأثير إضافي: لمعان عشوائي (Stars) */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
};

export default HeartsBackground;