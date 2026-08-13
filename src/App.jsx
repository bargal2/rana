import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeartsBackground from './components/HeartsBackground';
import SurpriseContent from './layout/SurpriseContent';
import LoveGate from './components/LoveGate';

// 🎵 استيراد ملف الصوت مباشرة ليتم ضغطه وتحزيمه صح في الـ Build
import songFile from './assets/song.mp3'; 

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);

  // لقطة كسر حماية المتصفح مع أي لمسة للأسفل
  const handleUserInteraction = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          // إذا لم تفتح البوابة بعد، أوقفه مؤقتاً لفك الحظر فقط
          if (!isUnlocked) {
            audioRef.current.pause();
          } else {
            setIsPlaying(true);
          }
        })
        .catch(() => {});
    }
  };

  // تشغيل الصوت فوراً عند فتح البوابة
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log("المتصفح يحتاج تفاعل إضافي:", error);
          const playOnTouch = () => {
            if (audioRef.current) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                window.removeEventListener('click', playOnTouch);
                window.removeEventListener('touchstart', playOnTouch);
              }).catch(() => {});
            }
          };
          window.addEventListener('click', playOnTouch);
          window.addEventListener('touchstart', playOnTouch);
        });
    }
  }, [isUnlocked]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <main 
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      className="relative min-h-screen w-full bg-[#0d0415] flex flex-col items-center justify-center overflow-hidden font-sans select-none"
    >
      <HeartsBackground />

      {/* 🎵 عنصر الصوت مستورد كمتغير وليس كمسار نصي لتفادي أخطاء السيرفر */}
      <audio 
        ref={audioRef} 
        src={songFile} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="auto"
        loop
      />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <LoveGate key="gate" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <SurpriseContent key="content" />
        )}
      </AnimatePresence>

      {/* 🎵 مشغل الصوت البيضاوي */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 15 }}
            className="fixed bottom-6 left-0 w-full z-50 px-4 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-[360px] bg-black/45 backdrop-blur-2xl border border-white/10 py-3 px-5 rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col gap-2 pointer-events-auto">
              
              {/* شريط التقدم */}
              <div className="w-full flex items-center gap-2 px-1">
                <span className="text-white/40 text-[9px] tabular-nums min-w-[20px]">
                  {formatTime(currentTime)}
                </span>
                
                <div 
                  onClick={handleProgressClick}
                  className="h-[2px] flex-1 bg-white/10 relative cursor-pointer group rounded-full"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-300 rounded-full transition-all duration-100" 
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  ></div>
                </div>

                <span className="text-white/40 text-[9px] tabular-nums min-w-[20px] text-right">
                  {formatTime(duration)}
                </span>
              </div>

              {/* الصف الرئيسي */}
              <div className="flex items-center justify-between w-full px-1">
                
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="flex items-end gap-[2px] h-3.5 w-3.5 flex-shrink-0 mb-0.5">
                    {[...Array(3)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-[2px] bg-pink-400 rounded-full transition-all duration-300`}
                        style={{ 
                          animation: isPlaying ? `pulse 0.6s infinite alternate` : 'none',
                          animationDelay: `${i * 0.15}s`,
                          height: isPlaying ? `${Math.random() * 100}%` : '3px'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex flex-col min-w-0">
                    <p className="text-white text-[11px] font-medium truncate">انت حبيبي 😍</p>
                    <p className="text-white/40 text-[9px] truncate">الصوت الأصلي - suzan_dorra</p>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button 
                    onClick={() => { if(audioRef.current) audioRef.current.currentTime = 0 }} 
                    className="text-white/50 hover:text-white active:scale-90 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                  </button>

                  <button 
                    onClick={togglePlay} 
                    className="w-8 h-8 rounded-full bg-white text-black hover:bg-pink-50 active:scale-90 flex items-center justify-center transition-all shadow-md"
                  >
                    {isPlaying ? (
                      <svg className="w-3.5 h-3.5 pl-[1px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <button 
                    onClick={() => { if(audioRef.current) audioRef.current.currentTime += 10 }} 
                    className="text-white/50 hover:text-white active:scale-90 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 18l8.5-6L5 6zm9-12v12l8.5-6z"/>
                    </svg>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0% { height: 3px; }
          100% { height: 14px; }
        }
      `}</style>
    </main>
  );
}

export default App;