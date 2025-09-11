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
      className="bg-card py-20"
      aria-labelledby="heritage-title"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2
              id="heritage-title"
              className="font-serif text-3xl font-bold text-card-foreground mb-6 lg:text-4xl"
              data-testid="text-heritage-title"
            >
              {t("heritage.title")}
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground"
              data-testid="text-heritage-description"
            >
              {t("heritage.description")}
            </p>
          </motion.div>

          <div className="mb-24 grid gap-8 md:grid-cols-3">
            {heritageItems.map((item, index) => (
              <Link
                key={index}
                href={createLocalizedArticlePath(item.slug)}
                className="group block h-full focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-4 focus:ring-offset-card rounded-lg"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex h-full min-h-[300px] cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg bg-cover bg-center p-8 text-center text-white transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.backgroundImage})`,
                  }}
                  data-testid={`heritage-item-${index}`}
                >
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50">
                    <div className="max-w-xs text-white">
                      <Info className="mx-auto mb-3 h-8 w-8" />
                      <p className="text-sm font-semibold">
                        {t("heritage.aiImageNotice")}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-4 transition-opacity duration-300 group-hover:opacity-0">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/10`}
                    >
                      <item.icon className={`h-8 w-8 ${item.iconColor}`} />
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
            className="rounded-xl bg-muted"
            data-testid="chair-14-showcase"
          >
            <div className="grid items-center gap-0 md:grid-cols-2">
              <div className="p-8">
                <h3
                  className="mb-4 text-2xl font-semibold text-card-foreground"
                  data-testid="text-chair-14-title"
                >
                  {t("heritage.chair14.title")}
                </h3>
                <p
                  className="mb-6 text-muted-foreground"
                  data-testid="text-chair-14-description"
                >
                  {t("heritage.chair14.description")}
                </p>
                <div className="space-y-3 border-t border-border pt-6 text-sm">
                  {chairStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                      data-testid={`chair-stat-${index}`}
                    >
                      <span className="text-muted-foreground">
                        {t(stat.labelKey)}
                      </span>
                      <span className="text-lg font-medium text-card-foreground">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="group relative h-full w-full min-h-[400px]">
                <img
                  src={aiImages.mainChair}
                  alt={t("heritage.chair14.title")}
                  className="absolute inset-0 h-full w-full object-cover md:rounded-r-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50">
                  <div className="max-w-xs text-white">
                    <Info className="mx-auto mb-3 h-8 w-8" />
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
