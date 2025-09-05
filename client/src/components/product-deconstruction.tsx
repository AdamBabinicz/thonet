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
    { id: 'backrest', x: isExploded ? -60 : 0, y: isExploded ? -40 : 0, label: 'Oparcie' },
    { id: 'seat', x: isExploded ? 60 : 0, y: isExploded ? -10 : 0, label: 'Siedzisko' },
    { id: 'leg-left', x: isExploded ? -50 : 0, y: isExploded ? 60 : 0, label: 'Nogi lewe' },
    { id: 'leg-right', x: isExploded ? 50 : 0, y: isExploded ? 60 : 0, label: 'Nogi prawe' },
  ];

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg" data-testid="module-product-deconstruction">
      <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-deconstruction-title">
        {t('interactiveModules.productDeconstruction.title')}
      </h3>
      <p className="text-muted-foreground mb-8" data-testid="text-deconstruction-description">
        {t('interactiveModules.productDeconstruction.description')}
      </p>

      <div className="relative bg-muted rounded-lg p-8 mb-8 min-h-[400px] flex items-center justify-center overflow-visible">
        <div className="relative w-64 h-64" data-testid="chair-model">
          {/* Chair Parts */}
          {parts.map((part, index) => {
            if (index === 0) {
              // Backrest - curved bentwood style
              return (
                <motion.div
                  key={part.id}
                  animate={{
                    x: part.x,
                    y: part.y,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                  data-testid={`chair-part-${part.id}`}
                >
                  <div className="w-20 h-36 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-lg relative overflow-hidden">
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-32 border-2 border-amber-500 rounded-full opacity-30"></div>
                  </div>
                </motion.div>
              );
            } else if (index === 1) {
              // Seat - circular with cane pattern
              return (
                <motion.div
                  key={part.id}
                  animate={{
                    x: part.x,
                    y: part.y,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className="absolute top-28 left-1/2 transform -translate-x-1/2"
                  data-testid={`chair-part-${part.id}`}
                >
                  <div className="w-28 h-6 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full shadow-lg relative">
                    <div className="absolute inset-1 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full opacity-80"></div>
                    <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"></div>
                    {/* Cane weave pattern */}
                    <div className="absolute inset-2 grid grid-cols-6 gap-0.5">
                      {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="bg-yellow-300 rounded-full opacity-40"></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            } else if (index === 2) {
              // Left legs - front and back
              return (
                <motion.div
                  key={part.id}
                  animate={{
                    x: part.x,
                    y: part.y,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className="absolute top-32 left-16"
                  data-testid={`chair-part-${part.id}`}
                >
                  <div className="relative">
                    {/* Front left leg */}
                    <div className="w-4 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-md absolute"></div>
                    {/* Back left leg */}
                    <div className="w-4 h-28 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-md absolute -top-4 -left-1"></div>
                    {/* Wood grain effect */}
                    <div className="w-4 h-24 absolute rounded-full opacity-30">
                      <div className="h-full w-0.5 bg-amber-500 absolute left-1"></div>
                      <div className="h-full w-0.5 bg-amber-500 absolute right-1"></div>
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              // Right legs - front and back
              return (
                <motion.div
                  key={part.id}
                  animate={{
                    x: part.x,
                    y: part.y,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className="absolute top-32 right-16"
                  data-testid={`chair-part-${part.id}`}
                >
                  <div className="relative">
                    {/* Front right leg */}
                    <div className="w-4 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-md absolute"></div>
                    {/* Back right leg */}
                    <div className="w-4 h-28 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-md absolute -top-4 left-1"></div>
                    {/* Wood grain effect */}
                    <div className="w-4 h-24 absolute rounded-full opacity-30">
                      <div className="h-full w-0.5 bg-amber-500 absolute left-1"></div>
                      <div className="h-full w-0.5 bg-amber-500 absolute right-1"></div>
                    </div>
                  </div>
                </motion.div>
              );
            }
          })}
        </div>

        {/* Component Labels */}
        <motion.div
          animate={{
            opacity: isExploded ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 pointer-events-none"
          data-testid="component-labels"
        >
          <div className="absolute top-0 left-4 bg-background text-foreground px-3 py-1 rounded-md text-sm shadow-lg border font-medium">
            Oparcie
          </div>
          <div className="absolute top-20 right-4 bg-background text-foreground px-3 py-1 rounded-md text-sm shadow-lg border font-medium">
            Siedzisko
          </div>
          <div className="absolute bottom-8 left-4 bg-background text-foreground px-3 py-1 rounded-md text-sm shadow-lg border font-medium">
            Nogi lewe
          </div>
          <div className="absolute bottom-8 right-4 bg-background text-foreground px-3 py-1 rounded-md text-sm shadow-lg border font-medium">
            Nogi prawe
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
