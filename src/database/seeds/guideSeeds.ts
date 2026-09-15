/**
 * OneHelp — Survival Guide Seed Data
 */

export interface GuideSeed {
  title: string;
  category: string;
  content_path: string;
  language?: string;
  icon_name?: string;
}

export const SEED_GUIDES: GuideSeed[] = [
  { title: 'CPR & First Aid', category: 'medical', content_path: 'guides/cpr.md', icon_name: 'heart-pulse' },
  { title: 'Earthquake Safety', category: 'earthquake', content_path: 'guides/earthquake.md', icon_name: 'waves' },
  { title: 'Flood Escape', category: 'flood', content_path: 'guides/flood.md', icon_name: 'cloud-rain' },
  { title: 'Fire Evacuation', category: 'fire', content_path: 'guides/fire_escape.md', icon_name: 'flame' },
  { title: 'Choking Response', category: 'medical', content_path: 'guides/choking.md', icon_name: 'alert-circle' },
  { title: 'Road Accident Response', category: 'medical', content_path: 'guides/road_accident.md', icon_name: 'car' },
  { title: 'Snakebite First Aid', category: 'medical', content_path: 'guides/snakebite.md', icon_name: 'alert-triangle' },
  { title: 'Heat Stroke Response', category: 'medical', content_path: 'guides/heatstroke.md', icon_name: 'thermometer' },
  { title: 'Drowning Rescue', category: 'survival', content_path: 'guides/drowning.md', icon_name: 'life-buoy' },
  { title: 'Cyclone Preparedness', category: 'disaster', content_path: 'guides/cyclone.md', icon_name: 'wind' },
];
