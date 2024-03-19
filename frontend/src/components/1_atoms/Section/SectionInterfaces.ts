import { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  marginBottom?: boolean;
  isHeroSection?: boolean;
}
