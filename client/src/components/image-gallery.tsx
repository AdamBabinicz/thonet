
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover filter saturate-150 contrast-110"
                style={{
                  filter: 'contrast(1.2) saturate(1.3) brightness(1.1)',
                  imageRendering: 'crisp-edges'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm opacity-90">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
