import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function TimelineSection() {
  const { t } = useTranslation();

  const timelineEvents = [
    {
      year: "1796",
      titleKey: "timeline.1796.title",
      descriptionKey: "timeline.1796.description",
    },
    {
      year: "1819",
      titleKey: "timeline.1819.title",
      descriptionKey: "timeline.1819.description",
    },
    {
      year: "1841",
      titleKey: "timeline.1841.title",
      descriptionKey: "timeline.1841.description",
    },
    {
      year: "1850",
      titleKey: "timeline.1850.title",
      descriptionKey: "timeline.1850.description",
    },
    {
      year: "1859",
      titleKey: "timeline.1859.title",
      descriptionKey: "timeline.1859.description",
    },
    {
      year: "1871",
      titleKey: "timeline.1871.title",
      descriptionKey: "timeline.1871.description",
    },
  ];

  const getEventColor = (index: number) => {
    const colors = [
      "bg-primary text-primary-foreground",
      "bg-secondary text-secondary-foreground",
      "bg-accent text-accent-foreground",
      "bg-primary text-primary-foreground",
      "bg-secondary text-secondary-foreground",
      "bg-accent text-accent-foreground",
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      id="timeline"
      className="py-20 bg-background"
      aria-labelledby="timeline-title"
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
              id="timeline-title"
              className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-serif"
              data-testid="text-timeline-title"
            >
              {t("timeline.title")}
            </h2>
            <p
              className="text-xl text-muted-foreground leading-relaxed"
              data-testid="text-timeline-description"
            >
              {t("timeline.description")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border -translate-x-px"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  viewport={{ once: true }}
                  className="relative flex items-start group"
                  data-testid={`timeline-event-${event.year}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`flex-shrink-0 w-16 h-16 ${getEventColor(
                      index
                    )} rounded-full flex items-center justify-center font-bold text-sm z-10`}
                  >
                    {event.year}
                  </motion.div>
                  <div className="ml-8">
                    <h3
                      className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary"
                      data-testid={`text-timeline-${event.year}-title`}
                    >
                      {t(event.titleKey)}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      data-testid={`text-timeline-${event.year}-description`}
                    >
                      {t(event.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
