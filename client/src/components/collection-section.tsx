import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  collectionData,
  CollectionItem,
  CollectionImage,
} from "@/data/collection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CollectionModal({
  item,
  onOpenChange,
}: {
  item: CollectionItem;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  const currentImage: CollectionImage = item.images[currentImageIndex];

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-[95vw] h-[90vh] flex flex-col">
        <DialogHeader className="pr-10">
          <DialogTitle className="text-2xl font-serif text-primary">
            {t(item.titleKey)}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 overflow-y-auto pr-4 flex-grow">
          <div className="relative w-full h-full min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={currentImage.src}
                alt={`${t(item.titleKey)} - widok ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            {item.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                  onClick={prevImage}
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                  onClick={nextImage}
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>
          <div className="space-y-4">
            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
              {t(item.descriptionKey)}
            </DialogDescription>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground">
                {t("collection_section.modal_image_description")}
              </h4>
              <p className="text-muted-foreground">
                {t(currentImage.descriptionKey)}
              </p>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground">
                {t("collection_section.modal_year")}
              </h4>
              <p className="text-muted-foreground">{t(item.yearKey)}</p>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground">
                {t("collection_section.modal_notes")}
              </h4>
              <p className="text-muted-foreground italic">{t(item.notesKey)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const INITIAL_ITEMS_COUNT = 3;

export function CollectionSection() {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] =
    useState(INITIAL_ITEMS_COUNT);

  const showMoreItems = () => {
    setVisibleItemsCount(collectionData.length);
  };

  const showLessItems = () => {
    setVisibleItemsCount(INITIAL_ITEMS_COUNT);
  };

  const isExpanded = visibleItemsCount === collectionData.length;

  return (
    <>
      <section
        id="collection"
        className="py-20 bg-background"
        aria-labelledby="collection-title"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2
              id="collection-title"
              className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-serif"
            >
              {t("collection_section.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("collection_section.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {collectionData.slice(0, visibleItemsCount).map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Zobacz szczegóły: ${t(item.titleKey)}`}
                >
                  <img
                    src={item.images[0].src}
                    alt={t(item.titleKey)}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold font-serif">
                      {t(item.titleKey)}
                    </h3>
                    <div className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      <span>{t("collection_section.button_text")}</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {collectionData.length > INITIAL_ITEMS_COUNT && (
            <div className="text-center mt-12">
              <Button onClick={isExpanded ? showLessItems : showMoreItems}>
                {isExpanded
                  ? t("collection_section.show_less_button")
                  : t("collection_section.show_more_button")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <CollectionModal
          item={selectedItem}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedItem(null);
            }
          }}
        />
      )}
    </>
  );
}
