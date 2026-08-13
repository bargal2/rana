import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveGate = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const correctPassword = "rana"; // كلمة المرور الجديدة

    const handleInput = (e) => {
        const val = e.target.value.toLowerCase().trim(); // تحويل للأصغر لتجنب أخطاء الكبيتال
        setPassword(val);
        
        // التحقق من الكلمة بالكامل
        if (val === correctPassword) {
            setTimeout(() => onUnlock(), 1000);
        }
    };

    return (
        <div className="relative min-h-[500px] flex items-center justify-center">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ 
                        opacity: 0, 
                        scale: 1.5, 
                        filter: "blur(40px)",
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
                    }}
                    className="relative"
                >
                    {/* 1. الإضاءة المحيطية (Ambient Aura) */}
                    <div className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/5 to-transparent blur-3xl opacity-50" />

                    {/* 2. الهيكل الكريستالي (The Crystal Vault) */}
                    <div className="relative w-80 md:w-96 aspect-[3/4] rounded-[3rem] border border-white/20 bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.4)] flex flex-col items-center justify-between p-10 overflow-hidden">
                        
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-pink-500/50 to-transparent" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-purple-500/50 to-transparent" />

                        {/* 3. الصورة (The Core) */}
                        <div className="relative mt-4">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-white/10 rounded-full" 
                            />
                            <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500">
                                <div className="w-full h-full rounded-full bg-[#0d0d0f] p-1">
                                    <img 
                                        src="your-photo.jpg" 
                                        alt="Avatar" 
                                        className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. النصوص (Typography) */}
                        <div className="text-center z-10">
                            <h2 className="text-white text-2xl font-light tracking-[0.3em] uppercase mb-2">
                                Private <span className="font-bold text-pink-500">Access</span>
                            </h2>
                            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
                                Identity Verification Required
                            </p>
                        </div>

                        {/* 5. حقل الإدخال النصي (تم تعديله ليدعم الكلمة كاملة) */}
                        <div className="w-full space-y-8">
                            <div className="relative flex justify-center">
                                <motion.div 
                                    animate={password.length > 0 ? { borderColor: "#ec4899" } : {}}
                                    className="w-full h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden"
                                >
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={handleInput}
                                        placeholder="Enter Key"
                                        className="w-full h-full bg-transparent text-center text-xl text-white focus:outline-none font-light tracking-[0.5em] placeholder:tracking-normal placeholder:text-white/10"
                                        autoFocus
                                    />
                                    {password.length === 0 && (
                                        <div className="absolute right-6 w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                                    )}
                                </motion.div>
                            </div>
                            
                            <p className="text-white/20 text-center text-[9px] tracking-[0.4em] uppercase font-medium">
                                Security Code: S _ _ _
                            </p>
                        </div>

                        {/* 6. تأثير النجاح */}
                        <AnimatePresence>
                            {password === correctPassword && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 bg-pink-600/20 backdrop-blur-md flex flex-col items-center justify-center z-20"
                                >
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4"
                                    >
                                        <span className="text-white text-2xl">✓</span>
                                    </motion.div>
                                    <span className="text-white text-[10px] tracking-[0.5em] uppercase font-black">Authorized</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                    {/* عناصر زينة متطايرة */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-700" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoveGate;