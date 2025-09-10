import React, { lazy } from "react";
import {
  User,
  Cpu,
  Award,
  Clock,
  Map as MapIcon,
  BookOpen,
} from "lucide-react";

export interface SectionConfig {
  id: string;
  component: React.LazyExoticComponent<React.FC<{}>>;
  labelKey: string;
  Icon: React.ElementType;
}

export const homeSections: SectionConfig[] = [
  {
    id: "biography",
    component: lazy(() =>
      import("@/components/biography-section").then((m) => ({
        default: m.BiographySection,
      }))
    ),
    labelKey: "navigation.biography",
    Icon: User,
  },
  {
    id: "collection",
    component: lazy(() =>
      import("@/components/collection-section").then((m) => ({
        default: m.CollectionSection,
      }))
    ),
    labelKey: "navigation.collection",
    Icon: BookOpen,
  },
  {
    id: "interactive-modules",
    component: lazy(() =>
      import("@/components/interactive-modules-section").then((m) => ({
        default: m.InteractiveModulesSection,
      }))
    ),
    labelKey: "navigation.interactiveModules",
    Icon: Cpu,
  },
  {
    id: "heritage",
    component: lazy(() =>
      import("@/components/heritage-section").then((m) => ({
        default: m.HeritageSection,
      }))
    ),
    labelKey: "navigation.heritage",
    Icon: Award,
  },
  {
    id: "timeline",
    component: lazy(() =>
      import("@/components/timeline-section").then((m) => ({
        default: m.TimelineSection,
      }))
    ),
    labelKey: "navigation.timeline",
    Icon: Clock,
  },
  {
    id: "map",
    component: lazy(() =>
      import("@/components/map-section").then((m) => ({
        default: m.MapSection,
      }))
    ),
    labelKey: "navigation.map",
    Icon: MapIcon,
  },
];
