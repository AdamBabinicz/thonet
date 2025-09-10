import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ProductDeconstruction } from "./product-deconstruction";
import { ProcessSimulation } from "./process-simulation";

export function InteractiveModulesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="interactive-modules"
      className="py-20 bg-background"
      aria-labelledby="interactive-modules-title"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="interactive-modules-title"
            className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-serif"
            data-testid="text-modules-title"
          >
            {t("interactiveModules.title")}
          </h2>
          <p
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            data-testid="text-modules-description"
          >
            {t("interactiveModules.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductDeconstruction />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProcessSimulation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
