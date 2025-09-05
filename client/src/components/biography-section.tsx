import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function BiographySection() {
  const { t } = useTranslation();

  return (
    <section id="biography" className="py-20 bg-card">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6" data-testid="text-biography-title">
              {t('biography.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-biography-description">
              {t('biography.description')}
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
                <h3 className="text-2xl font-semibold text-card-foreground" data-testid="text-early-years-title">
                  {t('biography.earlyYearsTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-early-years-description">
                  {t('biography.earlyYearsText')}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-card-foreground" data-testid="text-breakthrough-title">
                  {t('biography.breakthroughTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-breakthrough-description">
                  {t('biography.breakthroughText')}
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
              <img
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Warsztat stolarski z tradycyjnymi narzędziami i meblami z giętego drewna"
                className="rounded-lg shadow-lg w-full h-auto"
                data-testid="img-workshop"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
