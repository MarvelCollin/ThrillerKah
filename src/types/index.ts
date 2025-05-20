export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface AnimatedItemProps {
  index: number;
  revealed: boolean;
  delay?: number;
  children: React.ReactNode;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
} 