import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

type ChairPart =
  | "backLegsAndFrame"
  | "innerArch"
  | "seat"
  | "frontLegs"
  | "supportRing";

export function ProductDeconstruction() {
  const { t } = useTranslation();
  const [isExploded, setIsExploded] = useState(false);

  const toggleDeconstruction = () => {
    setIsExploded((prev) => !prev);
  };

  const getPartStyle = (part: ChairPart) => {
    const commonTransition = "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
    if (!isExploded) {
      return {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
        transition: commonTransition,
      };
    }

    const transforms: Record<ChairPart, string> = {
      backLegsAndFrame: "translate3d(-150px, -180px, 0) rotate(-15deg)",
      seat: "translate3d(250px, -250px, 0) rotate(15deg)",
      innerArch: "translate3d(0px, 165px, 0) rotate(0deg)", // Obniżony o 50%
      supportRing: "translate3d(-150px, 200px, 0) rotate(10deg)",
      frontLegs: "translate3d(150px, 200px, 0) rotate(10deg)",
    };
    return {
      transform: transforms[part],
      transition: commonTransition,
    };
  };

  return (
    <div
      className="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex flex-col border h-full"
      aria-labelledby="deconstruction-title"
    >
      <h3
        id="deconstruction-title"
        className="text-2xl font-semibold text-gray-900 mb-4"
      >
        {t("interactiveModules.productDeconstruction.title")}
      </h3>
      <p className="text-gray-600 mb-6">
        {t("interactiveModules.productDeconstruction.description")}
      </p>

      <div className="relative bg-gray-100 rounded-lg p-4 sm:p-8 mb-6 flex-grow min-h-[400px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        <svg
          viewBox="-400 -450 800 900"
          className="w-full h-full max-w-[450px] max-h-[450px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient
              id="bentWoodGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#c5a075" />
              <stop offset="50%" stopColor="#8b5e34" />
              <stop offset="100%" stopColor="#5a3d24" />
            </linearGradient>
            <linearGradient
              id="frontLegsGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d3b592" />
              <stop offset="50%" stopColor="#9c7247" />
              <stop offset="100%" stopColor="#6b4e30" />
            </linearGradient>
            <filter
              id="woodShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="6"
                dy="9"
                stdDeviation="6"
                floodColor="#000000"
                floodOpacity="0.2"
              />
            </filter>
            <pattern
              id="caningPattern"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(45)"
            >
              <rect width="10" height="10" fill="#f3e2c7" />
              <path d="M0 5 H10 M5 0 V10" stroke="#d4a574" strokeWidth="0.6" />
              <path
                d="M0 0 L10 10 M0 10 L10 0"
                stroke="#d4a574"
                strokeWidth="0.4"
                opacity="0.6"
              />
            </pattern>
          </defs>

          <g
            style={{
              ...getPartStyle("backLegsAndFrame"),
              transitionDelay: "0ms",
            }}
            filter="url(#woodShadow)"
          >
            <path
              d="M -90 270 C -80 160, -120 -180, 0 -180 C 120 -180, 80 160, 90 270"
              stroke="url(#bentWoodGrad)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          <g
            style={{ ...getPartStyle("innerArch"), transitionDelay: "150ms" }}
            filter="url(#woodShadow)"
          >
            <path
              d="M -58 -90 C -45 -140, 45 -140, 58 -90"
              stroke="url(#bentWoodGrad)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          <g
            style={{ ...getPartStyle("supportRing"), transitionDelay: "200ms" }}
            filter="url(#woodShadow)"
          >
            <ellipse
              cx="0"
              cy="145"
              rx="90"
              ry="32"
              stroke="url(#bentWoodGrad)"
              strokeWidth="15"
              fill="none"
            />
          </g>

          <g
            style={{ ...getPartStyle("frontLegs"), transitionDelay: "100ms" }}
            filter="url(#woodShadow)"
          >
            <path
              d="M -95 280 C -95 180, -90 100, -85 50"
              stroke="url(#frontLegsGrad)"
              strokeWidth="17"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 95 280 C 95 180, 90 100, 85 50"
              stroke="url(#frontLegsGrad)"
              strokeWidth="17"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          <g
            style={{ ...getPartStyle("seat"), transitionDelay: "50ms" }}
            filter="url(#woodShadow)"
          >
            <ellipse
              cx="0"
              cy="50"
              rx="105"
              ry="50"
              fill="url(#caningPattern)"
              stroke="url(#bentWoodGrad)"
              strokeWidth="16"
            />
          </g>
        </svg>

        <AnimatePresence>
          {isExploded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.8, duration: 0.5 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-[9%] left-[10%] text-center">
                <div className="bg-amber-100/95 text-amber-900 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs sm:text-sm shadow-lg border border-amber-200 font-medium whitespace-nowrap">
                  {t("interactiveModules.productDeconstruction.backFrameLabel")}
                </div>
              </div>
              <div className="absolute top-[15%] right-[10%] text-center">
                <div className="bg-amber-100/95 text-amber-900 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs sm:text-sm shadow-lg border border-amber-200 font-medium whitespace-nowrap">
                  {t("interactiveModules.productDeconstruction.seatLabel")}
                </div>
              </div>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center">
                <div className="bg-amber-100/95 text-amber-900 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs sm:text-sm shadow-lg border border-amber-200 font-medium whitespace-nowrap">
                  {t("interactiveModules.productDeconstruction.innerArchLabel")}
                </div>
              </div>
              <div className="absolute bottom-[10%] left-[10%] text-center">
                <div className="bg-amber-100/95 text-amber-900 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs sm:text-sm shadow-lg border border-amber-200 font-medium whitespace-nowrap">
                  {t("interactiveModules.productDeconstruction.ringLabel")}
                </div>
              </div>
              <div className="absolute bottom-[5%] right-[10%] text-center">
                <div className="bg-amber-100/95 text-amber-900 px-2 py-1 md:px-3 md:py-2 rounded-md text-xs sm:text-sm shadow-lg border border-amber-200 font-medium whitespace-nowrap">
                  {t("interactiveModules.productDeconstruction.frontLegsLabel")}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-auto pt-4">
        <button
          onClick={toggleDeconstruction}
          className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95"
        >
          {isExploded
            ? t("interactiveModules.productDeconstruction.reassembleButton")
            : t("interactiveModules.productDeconstruction.startButton")}
        </button>
        <p className="text-sm text-gray-600 mt-3 px-4">
          {t("interactiveModules.productDeconstruction.helpText")}
        </p>
      </div>
    </div>
  );
}
