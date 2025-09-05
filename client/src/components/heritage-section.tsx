import { motion } from "framer-motion";
import { Zap, CheckCircle, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeritageSection() {
  const { t } = useTranslation();

  const heritageItems = [
    {
      icon: Zap,
      titleKey: 'heritage.technologicalRevolution.title',
      descriptionKey: 'heritage.technologicalRevolution.description',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: CheckCircle,
      titleKey: 'heritage.democratization.title',
      descriptionKey: 'heritage.democratization.description',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      icon: Globe,
      titleKey: 'heritage.globalImpact.title',
      descriptionKey: 'heritage.globalImpact.description',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
    },
  ];

  const chairStats = [
    { labelKey: 'heritage.chair14.yearIntroduced', value: '1859' },
    { labelKey: 'heritage.chair14.numberProduced', value: '50+ milionów' },
    { labelKey: 'heritage.chair14.numberOfParts', value: '6 elementów' },
    { labelKey: 'heritage.chair14.assemblyTime', value: '30 minut' },
  ];

  return (
    <section id="heritage" className="py-20 bg-card">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6" data-testid="text-heritage-title">
              {t('heritage.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto" data-testid="text-heritage-description">
              {t('heritage.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {heritageItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center space-y-4"
                data-testid={`heritage-item-${index}`}
              >
                <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground" data-testid={`text-heritage-${index}-title`}>
                  {t(item.titleKey)}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-heritage-${index}-description`}>
                  {t(item.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-muted rounded-xl p-8"
            data-testid="chair-14-showcase"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-4" data-testid="text-chair-14-title">
                  {t('heritage.chair14.title')}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid="text-chair-14-description">
                  {t('heritage.chair14.description')}
                </p>
                <div className="space-y-2 text-sm">
                  {chairStats.map((stat, index) => (
                    <div key={index} className="flex justify-between" data-testid={`chair-stat-${index}`}>
                      <span className="text-muted-foreground">{t(stat.labelKey)}</span>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Słynne krzesło Thonet No. 14 w eleganckiej aranżacji"
                  className="rounded-lg shadow-lg w-full h-auto"
                  data-testid="img-chair-14"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
