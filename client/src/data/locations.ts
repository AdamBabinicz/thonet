export interface LocationData {
  id: string;
  coords: [number, number];
  titleKey: string;
  descriptionKey: string;
}

export const locationsData: LocationData[] = [
  {
    id: "boppard",
    coords: [50.231, 7.592],
    titleKey: "locations.boppard.title",
    descriptionKey: "locations.boppard.description",
  },
  {
    id: "vienna",
    coords: [48.208, 16.373],
    titleKey: "locations.vienna.title",
    descriptionKey: "locations.vienna.description",
  },
  {
    id: "radomsko",
    coords: [51.069, 19.444],
    titleKey: "locations.radomsko.title",
    descriptionKey: "locations.radomsko.description",
  },
  {
    id: "cafe-central",
    coords: [48.21, 16.365],
    titleKey: "locations.cafe_central.title",
    descriptionKey: "locations.cafe_central.description",
  },
];
