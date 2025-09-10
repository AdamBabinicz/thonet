import { motion } from "framer-motion";
import { Zap, CheckCircle, Globe, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const aiImages = {
  mainChair: "/2.avif",
  revolution: "/6.avif",
  democratization: "/7.avif",
  globalImpact: "/8.avif",
};

export function HeritageSection() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const heritageItems = [
    {
      icon: Zap,
      titleKey: "heritage.technologicalRevolution.title",
      descriptionKey: "heritage.technologicalRevolution.description",
      slug: "technological-revolution",
      iconColor: "text-white",
      backgroundImage: aiImages.revolution,
    },
    {
      icon: CheckCircle,
      titleKey: "heritage.democratization.title",
      descriptionKey: "heritage.democratization.description",
      slug: "design-democratization",
      iconColor: "text-white",
      backgroundImage: aiImages.democratization,
    },
    {
      icon: Globe,
      titleKey: "heritage.globalImpact.title",
      descriptionKey: "heritage.globalImpact.description",
      slug: "global-impact",
      iconColor: "text-white",
      backgroundImage: aiImages.globalImpact,
    },
  ];

  const chairStats = [
    { labelKey: "heritage.chair14.yearIntroduced", value: "1859" },
    { labelKey: "heritage.chair14.numberProduced", value: "50+ milionów" },
    { labelKey: "heritage.chair14.numberOfParts", value: "6 elementów" },
    { labelKey: "heritage.chair14.assemblyTime", value: "30 minut" },
  ];

  const createLocalizedArticlePath = (articleSlug: string) => {
    const heritagePath = t("routes.heritage");
    const translatedSlug = t(`routes.heritage_slugs.${articleSlug}`);
    return `/${currentLanguage}/${heritagePath}/${translatedSlug}`;
  };

  return (
    <section
      id="heritage"
      className="py-20 bg-card"
      aria-labelledby="heritage-title"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              id="heritage-title"
              className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6 font-serif"
              data-testid="text-heritage-title"
            >
              {t("heritage.title")}
            </h2>
            <p
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              data-testid="text-heritage-description"
            >
              {t("heritage.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {heritageItems.map((item, index) => (
              <Link
                key={index}
                href={createLocalizedArticlePath(item.slug)}
                className="focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-4 focus:ring-offset-card rounded-lg block h-full group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative rounded-lg overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-4 bg-cover bg-center text-white min-h-[300px] h-full cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.backgroundImage})`,
                  }}
                  data-testid={`heritage-item-${index}`}
                >
                  <div className="absolute inset-0 p-4 bg-black/50 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="text-white max-w-xs">
                      <Info className="w-8 h-8 mx-auto mb-3" />
                      <p className="text-sm font-semibold">
                        {t("heritage.aiImageNotice")}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-4 transition-opacity duration-300 group-hover:opacity-0">
                    <div
                      className={`w-16 h-16 bg-white/10 rounded-full flex items-center justify-center`}
                    >
                      <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <h3
                      className="text-xl font-semibold"
                      data-testid={`text-heritage-${index}-title`}
                    >
                      {t(item.titleKey)}
                    </h3>
                    <p
                      className="text-white/80"
                      data-testid={`text-heritage-${index}-description`}
                    >
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-muted rounded-xl"
            data-testid="chair-14-showcase"
          >
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-8">
                <h3
                  className="text-2xl font-semibold text-card-foreground mb-4"
                  data-testid="text-chair-14-title"
                >
                  {t("heritage.chair14.title")}
                </h3>
                <p
                  className="text-muted-foreground mb-6"
                  data-testid="text-chair-14-description"
                >
                  {t("heritage.chair14.description")}
                </p>
                <div className="space-y-3 text-sm border-t border-border pt-6">
                  {chairStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                      data-testid={`chair-stat-${index}`}
                    >
                      <span className="text-muted-foreground">
                        {t(stat.labelKey)}
                      </span>
                      <span className="font-medium text-lg text-card-foreground">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full h-full min-h-[400px] group">
                <img
                  src={aiImages.mainChair}
                  alt={t("heritage.chair14.title")}
                  className="absolute inset-0 w-full h-full object-cover md:rounded-r-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 p-4 bg-black/50 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white max-w-xs">
                    <Info className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-sm font-semibold">
                      {t("heritage.aiImageNotice")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
