
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProductDeconstruction() {
  const { t } = useTranslation();
  const [isExploded, setIsExploded] = useState(false);

  const toggleDeconstruction = () => {
    setIsExploded(!isExploded);
    
    // Announce to screen readers
    const message = isExploded ? t('aria.chairReassembled') : t('aria.chairExploded');
    const announcement = document.querySelector('[data-testid="aria-announcements"]');
    if (announcement) {
      announcement.textContent = message;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  };

  const parts = [
    { id: 'backrest', x: isExploded ? -80 : 0, y: isExploded ? -60 : 0, label: 'Oparcie' },
    { id: 'seat', x: isExploded ? 80 : 0, y: isExploded ? -20 : 0, label: 'Siedzisko' },
    { id: 'legs', x: isExploded ? -60 : 0, y: isExploded ? 80 : 0, label: 'Nogi' },
    { id: 'frame', x: isExploded ? 60 : 0, y: isExploded ? 80 : 0, label: 'Stelaż' },
  ];

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg" data-testid="module-product-deconstruction">
      <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-deconstruction-title">
        {t('interactiveModules.productDeconstruction.title')}
      </h3>
      <p className="text-muted-foreground mb-8" data-testid="text-deconstruction-description">
        {t('interactiveModules.productDeconstruction.description')}
      </p>

      <div className="relative bg-muted rounded-lg p-8 mb-8 min-h-[500px] flex items-center justify-center overflow-visible">
        <div className="relative w-80 h-80" data-testid="chair-model">
          
          {/* Backrest - curved bentwood */}
          <motion.div
            animate={{
              x: parts[0].x,
              y: parts[0].y,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 15,
              stiffness: 80,
            }}
            className="absolute top-8 left-1/2 transform -translate-x-1/2"
            data-testid="chair-part-backrest"
          >
            <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
              <defs>
                <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D2B48C" />
                  <stop offset="50%" stopColor="#DEB887" />
                  <stop offset="100%" stopColor="#BC9A6A" />
                </linearGradient>
              </defs>
              {/* Main curved backrest */}
              <path 
                d="M 20 140 Q 20 20 60 10 Q 100 20 100 140 Q 95 145 85 145 L 35 145 Q 25 145 20 140" 
                fill="url(#woodGrad)" 
                stroke="#8B4513" 
                strokeWidth="2"
              />
              {/* Wood grain lines */}
              <path d="M 25 30 Q 60 25 95 30" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M 30 50 Q 60 45 90 50" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M 35 70 Q 60 65 85 70" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.5"/>
            </svg>
          </motion.div>

          {/* Seat - round with cane weave */}
          <motion.div
            animate={{
              x: parts[1].x,
              y: parts[1].y,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 15,
              stiffness: 80,
            }}
            className="absolute top-32 left-1/2 transform -translate-x-1/2"
            data-testid="chair-part-seat"
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
              <defs>
                <radialGradient id="seatGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5DEB3" />
                  <stop offset="70%" stopColor="#DEB887" />
                  <stop offset="100%" stopColor="#CD853F" />
                </radialGradient>
              </defs>
              {/* Seat base */}
              <circle cx="50" cy="50" r="45" fill="url(#seatGrad)" stroke="#8B4513" strokeWidth="3"/>
              {/* Cane weave pattern */}
              <g opacity="0.6">
                {[...Array(8)].map((_, i) => (
                  <line 
                    key={`h${i}`}
                    x1="10" 
                    y1={15 + i * 10} 
                    x2="90" 
                    y2={15 + i * 10} 
                    stroke="#D2B48C" 
                    strokeWidth="1.5"
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line 
                    key={`v${i}`}
                    x1={15 + i * 10} 
                    y1="10" 
                    x2={15 + i * 10} 
                    y2="90" 
                    stroke="#DEB887" 
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* Front legs */}
          <motion.div
            animate={{
              x: parts[2].x,
              y: parts[2].y,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 15,
              stiffness: 80,
            }}
            className="absolute top-44 left-1/2 transform -translate-x-1/2"
            data-testid="chair-part-legs"
          >
            <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-lg">
              {/* Left front leg */}
              <rect x="15" y="10" width="8" height="100" rx="4" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="2"/>
              {/* Right front leg */}
              <rect x="77" y="10" width="8" height="100" rx="4" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="2"/>
              {/* Cross brace */}
              <rect x="15" y="80" width="70" height="6" rx="3" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="1"/>
              {/* Wood grain on legs */}
              <line x1="19" y1="15" x2="19" y2="105" stroke="#A0522D" strokeWidth="0.5" opacity="0.7"/>
              <line x1="81" y1="15" x2="81" y2="105" stroke="#A0522D" strokeWidth="0.5" opacity="0.7"/>
            </svg>
          </motion.div>

          {/* Back legs and frame */}
          <motion.div
            animate={{
              x: parts[3].x,
              y: parts[3].y,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 15,
              stiffness: 80,
            }}
            className="absolute top-36 left-1/2 transform -translate-x-1/2"
            data-testid="chair-part-frame"
          >
            <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-lg">
              {/* Left back leg */}
              <rect x="25" y="0" width="8" height="120" rx="4" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="2"/>
              {/* Right back leg */}
              <rect x="87" y="0" width="8" height="120" rx="4" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="2"/>
              {/* Seat support ring */}
              <ellipse cx="60" cy="40" rx="35" ry="8" fill="none" stroke="#8B4513" strokeWidth="4"/>
              {/* Back cross support */}
              <rect x="25" y="60" width="70" height="6" rx="3" fill="url(#woodGrad)" stroke="#8B4513" strokeWidth="1"/>
              {/* Wood grain on back legs */}
              <line x1="29" y1="5" x2="29" y2="115" stroke="#A0522D" strokeWidth="0.5" opacity="0.7"/>
              <line x1="91" y1="5" x2="91" y2="115" stroke="#A0522D" strokeWidth="0.5" opacity="0.7"/>
            </svg>
          </motion.div>

        </div>

        {/* Component Labels */}
        <motion.div
          animate={{
            opacity: isExploded ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          data-testid="component-labels"
        >
          <div className="absolute top-4 left-8 bg-background text-foreground px-3 py-2 rounded-md text-sm shadow-lg border font-medium">
            Oparcie z giętego drewna
          </div>
          <div className="absolute top-28 right-8 bg-background text-foreground px-3 py-2 rounded-md text-sm shadow-lg border font-medium">
            Siedzisko z plecionki
          </div>
          <div className="absolute bottom-16 left-8 bg-background text-foreground px-3 py-2 rounded-md text-sm shadow-lg border font-medium">
            Nogi przednie
          </div>
          <div className="absolute bottom-16 right-8 bg-background text-foreground px-3 py-2 rounded-md text-sm shadow-lg border font-medium">
            Stelaż tylny
          </div>
        </motion.div>
      </div>

      <div className="text-center">
        <button
          onClick={toggleDeconstruction}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          aria-expanded={isExploded}
          aria-describedby="chair-description"
          data-testid="button-deconstruct"
        >
          {isExploded
            ? t('interactiveModules.productDeconstruction.reassembleButton')
            : t('interactiveModules.productDeconstruction.startButton')
          }
        </button>
        <p id="chair-description" className="text-sm text-muted-foreground mt-4" data-testid="text-chair-description">
          {t('interactiveModules.productDeconstruction.helpText')}
        </p>
      </div>
    </div>
  );
}
