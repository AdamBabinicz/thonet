import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAriaLive } from "@/hooks/useAriaLive";

export function ProcessSimulation() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const { announce } = useAriaLive();

  const steps = [
    {
      number: 1,
      titleKey: "interactiveModules.processSimulation.step1Title",
      descriptionKey: "interactiveModules.processSimulation.step1Description",
    },
    {
      number: 2,
      titleKey: "interactiveModules.processSimulation.step2Title",
      descriptionKey: "interactiveModules.processSimulation.step2Description",
    },
    {
      number: 3,
      titleKey: "interactiveModules.processSimulation.step3Title",
      descriptionKey: "interactiveModules.processSimulation.step3Description",
    },
    {
      number: 4,
      titleKey: "interactiveModules.processSimulation.step4Title",
      descriptionKey: "interactiveModules.processSimulation.step4Description",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev === 4 ? 1 : prev + 1));
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

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
    announce(newState ? t("aria.autoplayStarted") : t("aria.autoplayStopped"));
  };

  useEffect(() => {
    const currentStepData = steps[currentStep - 1];
    const description = t(currentStepData.descriptionKey);
    announce(description);
  }, [currentStep, t, announce]);

  const woodVariants = {
    initial: {
      opacity: 0,
      pathLength: 0,
      d: "M 50 200 L 150 200",
    },
    animate: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    bent: {
      d: "M 50 200 C 50 100, 150 100, 150 200",
      transition: { type: "spring", duration: 1.5, bounce: 0.3 },
    },
    straight: {
      d: "M 50 200 L 150 200",
      transition: { type: "spring", duration: 1.5, bounce: 0.3 },
    },
    finished: {
      stroke: "#8b5e34",
      transition: { duration: 0.5 },
    },
    raw: {
      stroke: "#b9936c",
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="bg-card rounded-xl p-6 sm:p-8 shadow-lg h-full"
      data-testid="module-process-simulation"
      aria-labelledby="simulation-title"
    >
      <h3
        id="simulation-title"
        className="text-2xl font-semibold text-card-foreground mb-4"
        data-testid="text-simulation-title"
      >
        {t("interactiveModules.processSimulation.title")}
      </h3>
      <p
        className="text-muted-foreground mb-6"
        data-testid="text-simulation-description"
      >
        {t("interactiveModules.processSimulation.description")}
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative bg-muted rounded-lg p-4 min-h-[300px] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 220" className="w-full h-full">
            <defs>
              <linearGradient id="woodGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a1662f" />
                <stop offset="50%" stopColor="#b9936c" />
                <stop offset="100%" stopColor="#a1662f" />
              </linearGradient>
            </defs>
            <AnimatePresence>
              {currentStep >= 1 && (
                <motion.path
                  key="wood"
                  stroke="url(#woodGradient)"
                  strokeWidth="15"
                  strokeLinecap="round"
                  fill="none"
                  variants={woodVariants}
                  initial="initial"
                  animate={[
                    "animate",
                    currentStep >= 4 ? "finished" : "raw",
                    currentStep >= 3 ? "bent" : "straight",
                  ]}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep === 2 && (
                <motion.g
                  key="steam"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(10)].map((_, i) => (
                    <motion.path
                      key={i}
                      className="stroke-gray-600 dark:stroke-gray-200"
                      d={`M ${60 + i * 8} 190 Q ${55 + i * 8} 150, ${
                        60 + i * 8
                      } 110`}
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        y: -40,
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        },
                      }}
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep === 3 && (
                <motion.g
                  key="mold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.rect
                    x="30"
                    y="80"
                    width="140"
                    height="20"
                    rx="5"
                    fill="hsl(var(--border))"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 80, opacity: 1, transition: { delay: 0.2 } }}
                    exit={{ y: 60, opacity: 0 }}
                  />
                  <motion.rect
                    x="30"
                    y="200"
                    width="140"
                    height="20"
                    rx="5"
                    fill="hsl(var(--border))"
                    initial={{ y: 220, opacity: 0 }}
                    animate={{ y: 200, opacity: 1, transition: { delay: 0.2 } }}
                    exit={{ y: 220, opacity: 0 }}
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        <div>
          <div className="space-y-4 mb-6">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                animate={{
                  opacity: currentStep === step.number ? 1 : 0.4,
                  scale: currentStep === step.number ? 1 : 0.95,
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`flex items-start p-3 rounded-lg ${
                  currentStep === step.number ? "bg-muted" : ""
                }`}
                data-testid={`process-step-${step.number}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 transition-colors duration-300 ${
                    currentStep === step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {step.number}
                </div>
                <div>
                  <h4
                    className="font-medium text-card-foreground"
                    data-testid={`text-step-${step.number}-title`}
                  >
                    {t(step.titleKey)}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t(
                "interactiveModules.processSimulation.previousStep"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 4}
              className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t("interactiveModules.processSimulation.nextStep")}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleAutoPlay}
              className="px-4 py-2 flex-1 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              aria-label={
                isAutoPlaying
                  ? t("interactiveModules.processSimulation.stopAutoplay")
                  : t("interactiveModules.processSimulation.autoplay")
              }
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
