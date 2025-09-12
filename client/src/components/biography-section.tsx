import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

export function BiographySection() {
  const { t } = useTranslation();

  return (
    <section
      id="biography"
      className="py-20 bg-card"
      aria-labelledby="biography-title"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              id="biography-title"
              className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6 font-serif"
              data-testid="text-biography-title"
            >
              {t("biography.title")}
            </h2>
            <p
              className="text-xl text-muted-foreground leading-relaxed"
              data-testid="text-biography-description"
            >
              {t("biography.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3
                  className="text-2xl font-semibold text-card-foreground"
                  data-testid="text-early-years-title"
                >
                  {t("biography.earlyYearsTitle")}
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-early-years-description"
                >
                  {t("biography.earlyYearsText")}
                </p>
              </div>

              <div className="space-y-4">
                <h3
                  className="text-2xl font-semibold text-card-foreground"
                  data-testid="text-breakthrough-title"
                >
                  {t("biography.breakthroughTitle")}
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-breakthrough-description"
                >
                  {t("biography.breakthroughText")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/13.avif"
                  alt="Warsztat stolarski z tradycyjnymi narzędziami i meblami z giętego drewna"
                  className="w-full h-auto"
                  data-testid="img-workshop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 p-4 bg-black/50 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white max-w-xs">
                    <Info className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-sm font-semibold">
                      {t("biography.workshopImageNotice")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
