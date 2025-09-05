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
    { id: 'backrest', x: isExploded ? -40 : 0, y: isExploded ? -30 : 0, label: 'Oparcie' },
    { id: 'seat', x: isExploded ? 40 : 0, y: isExploded ? -20 : 0, label: 'Siedzisko' },
    { id: 'leg-left', x: isExploded ? -30 : 0, y: isExploded ? 40 : 0, label: 'Noga lewa' },
    { id: 'leg-right', x: isExploded ? 30 : 0, y: isExploded ? 50 : 0, label: 'Noga prawa' },
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
        <div className="relative w-48 h-48" data-testid="chair-model">
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
              className={`absolute bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg ${
                index === 0 ? 'w-16 h-32 top-0 left-1/2 transform -translate-x-1/2' :
                index === 1 ? 'w-24 h-4 top-20 left-1/2 transform -translate-x-1/2' :
                index === 2 ? 'w-3 h-20 top-24 left-6' :
                'w-3 h-20 top-24 right-6'
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 pointer-events-none"
          data-testid="component-labels"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md border">
            Oparcie
          </div>
          <div className="absolute top-16 right-0 transform translate-x-12 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md border">
            Siedzisko
          </div>
          <div className="absolute bottom-4 left-0 transform -translate-x-8 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md border">
            Nogi
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-8 bg-background text-foreground px-2 py-1 rounded text-xs shadow-md border">
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
