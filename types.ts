export interface Service {
  id: string;
  badge: string;
  tagline: string;
  title: string;
  description: string;
  deliverables: string[];
  outcome: string;
  cta: string;
}

export interface Metric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
