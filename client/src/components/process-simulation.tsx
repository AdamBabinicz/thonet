import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProcessSimulation() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const steps = [
    {
      number: 1,
      titleKey: 'interactiveModules.processSimulation.step1Title',
      descriptionKey: 'interactiveModules.processSimulation.step1Description',
    },
    {
      number: 2,
      titleKey: 'interactiveModules.processSimulation.step2Title',
      descriptionKey: 'interactiveModules.processSimulation.step2Description',
    },
    {
      number: 3,
      titleKey: 'interactiveModules.processSimulation.step3Title',
      descriptionKey: 'interactiveModules.processSimulation.step3Description',
    },
    {
      number: 4,
      titleKey: 'interactiveModules.processSimulation.step4Title',
      descriptionKey: 'interactiveModules.processSimulation.step4Description',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev === 4 ? 1 : prev + 1);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const announceToScreenReader = (message: string) => {
    const announcement = document.querySelector('[data-testid="aria-announcements"]');
    if (announcement) {
      announcement.textContent = message;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAutoPlay = () => {
    const newState = !isAutoPlaying;
    setIsAutoPlaying(newState);
    announceToScreenReader(
      newState ? t('aria.autoplayStarted') : t('aria.autoplayStopped')
    );
  };

  // Update screen reader when step changes
  useEffect(() => {
    const currentStepData = steps[currentStep - 1];
    const description = t(currentStepData.descriptionKey);
    announceToScreenReader(description);
  }, [currentStep, t]);

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg" data-testid="module-process-simulation">
      <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-simulation-title">
        {t('interactiveModules.processSimulation.title')}
      </h3>
      <p className="text-muted-foreground mb-8" data-testid="text-simulation-description">
        {t('interactiveModules.processSimulation.description')}
      </p>

      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            animate={{
              opacity: currentStep === step.number ? 1 : 0.3,
              scale: currentStep === step.number ? 1 : 0.9,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
            className={`flex items-center p-4 bg-muted rounded-lg ${
              currentStep === step.number ? 'ring-2 ring-primary' : ''
            }`}
            data-testid={`process-step-${step.number}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 ${
              currentStep === step.number
                ? 'bg-primary text-primary-foreground'
                : index === 1
                ? 'bg-secondary text-secondary-foreground'
                : index === 2
                ? 'bg-accent text-accent-foreground'
                : 'bg-primary text-primary-foreground'
            }`}>
              {step.number}
            </div>
            <div>
              <h4 className="font-medium text-card-foreground" data-testid={`text-step-${step.number}-title`}>
                {t(step.titleKey)}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`text-step-${step.number}-description`}>
                {t(step.descriptionKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('interactiveModules.processSimulation.previousStep')}
          data-testid="button-process-prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === 4}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('interactiveModules.processSimulation.nextStep')}
          data-testid="button-process-next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={toggleAutoPlay}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          aria-label={isAutoPlaying ? t('interactiveModules.processSimulation.stopAutoplay') : t('interactiveModules.processSimulation.autoplay')}
          data-testid="button-process-auto"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isAutoPlaying ? 'Stop' : 'Autoplay'}
        </button>
      </div>

      <div className="mt-4">
        <div
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
          data-testid="text-process-status"
        >
          {t('interactiveModules.processSimulation.stepStatus', {
            current: currentStep,
            total: 4,
            description: t(steps[currentStep - 1].titleKey)
          })}
        </div>
      </div>
    </div>
  );
}
