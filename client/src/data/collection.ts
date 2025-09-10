export interface CollectionImage {
  src: string;
  descriptionKey: string;
}

export interface CollectionItem {
  id: string;
  titleKey: string;
  descriptionKey: string; // To będzie teraz ogólny opis przedmiotu
  yearKey: string;
  notesKey: string;
  images: CollectionImage[]; // Zmiana z string[] na CollectionImage[]
}

export const collectionData: CollectionItem[] = [
  {
    id: "chair-no-14",
    titleKey: "collection.chair_no_14.title",
    descriptionKey: "collection.chair_no_14.description",
    yearKey: "collection.chair_no_14.year",
    notesKey: "collection.chair_no_14.notes",
    images: [
      {
        src: "/collection/6.avif",
        descriptionKey: "collection.chair_no_14.image1_desc",
      },
      {
        src: "/collection/8.avif",
        descriptionKey: "collection.chair_no_14.image2_desc",
      },
      {
        src: "/collection/7.avif",
        descriptionKey: "collection.chair_no_14.image3_desc",
      },
    ],
  },
  {
    id: "rocking-chair-no-10",
    titleKey: "collection.rocking_chair_no_10.title",
    descriptionKey: "collection.rocking_chair_no_10.description",
    yearKey: "collection.rocking_chair_no_10.year",
    notesKey: "collection.rocking_chair_no_10.notes",
    images: [
      {
        src: "/collection/1.avif",
        descriptionKey: "collection.rocking_chair_no_10.image1_desc",
      },
      {
        src: "/collection/3.avif",
        descriptionKey: "collection.rocking_chair_no_10.image2_desc",
      },
    ],
  },
  {
    id: "a-811-armchair",
    titleKey: "collection.a_811_armchair.title",
    descriptionKey: "collection.a_811_armchair.description",
    yearKey: "collection.a_811_armchair.year",
    notesKey: "collection.a_811_armchair.notes",
    images: [
      {
        src: "/collection/9.avif",
        descriptionKey: "collection.a_811_armchair.image1_desc",
      },
      {
        src: "/collection/18.avif",
        descriptionKey: "collection.a_811_armchair.image2_desc",
      },
    ],
  },
  {
    id: "kneeler",
    titleKey: "collection.kneeler.title",
    descriptionKey: "collection.kneeler.description",
    yearKey: "collection.kneeler.year",
    notesKey: "collection.kneeler.notes",
    images: [
      {
        src: "/collection/14.avif",
        descriptionKey: "collection.kneeler.image1_desc",
      },
      {
        src: "/collection/21.avif",
        descriptionKey: "collection.kneeler.image2_desc",
      },
    ],
  },
  {
    id: "cradle",
    titleKey: "collection.cradle.title",
    descriptionKey: "collection.cradle.description",
    yearKey: "collection.cradle.year",
    notesKey: "collection.cradle.notes",
    images: [
      {
        src: "/collection/19.avif",
        descriptionKey: "collection.cradle.image1_desc",
      },
      {
        src: "/collection/2.avif",
        descriptionKey: "collection.cradle.image2_desc",
      },
      {
        src: "/collection/10.avif",
        descriptionKey: "collection.cradle.image3_desc",
      },
    ],
  },
  {
    id: "hall-tree",
    titleKey: "collection.hall_tree.title",
    descriptionKey: "collection.hall_tree.description",
    yearKey: "collection.hall_tree.year",
    notesKey: "collection.hall_tree.notes",
    images: [
      {
        src: "/collection/15.avif",
        descriptionKey: "collection.hall_tree.image1_desc",
      },
    ],
  },
  {
    id: "cafe-table",
    titleKey: "collection.cafe_table.title",
    descriptionKey: "collection.cafe_table.description",
    yearKey: "collection.cafe_table.year",
    notesKey: "collection.cafe_table.notes",
    images: [
      {
        src: "/collection/12.avif",
        descriptionKey: "collection.cafe_table.image1_desc",
      },
    ],
  },
];
