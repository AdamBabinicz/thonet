
export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  category: 'heritage' | 'biography' | 'interactive' | 'timeline';
}

// Placeholder images - replace with actual comic-style Thonet images
export const imageData: ImageData[] = [
  {
    id: 'thonet-chair-1',
    src: '/api/placeholder/400/400',
    alt: 'Klasyczne krzesło Thonet w stylu komiksowym',
    title: 'Krzesło Nr. 14',
    description: 'Kultowe krzesło Thonet w komiksowej stylizacji',
    category: 'heritage'
  },
  {
    id: 'thonet-workshop',
    src: '/api/placeholder/400/400',
    alt: 'Warsztat Thonet w stylu komiksowym',
    title: 'Warsztat Mistrza',
    description: 'Proces tworzenia mebli w XIX wieku',
    category: 'interactive'
  },
  {
    id: 'michael-thonet',
    src: '/api/placeholder/400/400',
    alt: 'Michael Thonet w stylu komiksowym',
    title: 'Michael Thonet',
    description: 'Portret założyciela firmy',
    category: 'biography'
  },
  {
    id: 'bentwood-process',
    src: '/api/placeholder/400/400',
    alt: 'Proces gięcia drewna w stylu komiksowym',
    title: 'Gięcie Drewna',
    description: 'Rewolucyjna technika produkcji',
    category: 'timeline'
  }
];

export const getImagesByCategory = (category: ImageData['category']) => {
  return imageData.filter(img => img.category === category);
};
