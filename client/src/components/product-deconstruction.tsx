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
    { id: 'backrest', x: isExploded ? -20 : 0, y: isExploded ? -10 : 0, label: 'Oparcie' },
    { id: 'seat', x: isExploded ? 20 : 0, y: isExploded ? -15 : 0, label: 'Siedzisko' },
    { id: 'leg-left', x: isExploded ? -15 : 0, y: isExploded ? 20 : 0, label: 'Noga lewa' },
    { id: 'leg-right', x: isExploded ? 15 : 0, y: isExploded ? 25 : 0, label: 'Noga prawa' },
  ];

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg" data-testid="module-product-deconstruction">
      <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-deconstruction-title">
        {t('interactiveModules.productDeconstruction.title')}
      </h3>
      <p className="text-muted-foreground mb-8" data-testid="text-deconstruction-description">
        {t('interactiveModules.productDeconstruction.description')}
      </p>

      <div className="relative bg-muted rounded-lg p-8 mb-8 min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="relative" data-testid="chair-model">
          {/* Chair Parts */}
          {parts.map((part, index) => (
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
              className={`absolute bg-gradient-to-br from-primary to-accent rounded-lg ${
                index === 0 ? 'w-16 h-40 top-0 left-1/2 transform -translate-x-1/2' :
                index === 1 ? 'w-32 h-4 top-28 left-1/2 transform -translate-x-1/2' :
                index === 2 ? 'w-2 h-24 top-32 left-8' :
                'w-2 h-24 top-32 right-8'
              }`}
              data-testid={`chair-part-${part.id}`}
            />
          ))}
        </div>

        {/* Component Labels */}
        <motion.div
          animate={{
            opacity: isExploded ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          data-testid="component-labels"
        >
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md">
            Oparcie
          </div>
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md">
            Siedzisko
          </div>
          <div className="absolute bottom-16 left-8 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md">
            Nogi
          </div>
          <div className="absolute bottom-16 right-8 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md">
            Stelaż
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
