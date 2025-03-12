// types.ts - Contains all shared interfaces and types
export interface Milestone {
  id: string;
  days: number;
  date: string;
  isPast: boolean;
  daysUntil?: number;
  description?: string;
}

export interface MilestonesData {
  echoesOfTime: Milestone[];
  rhythmsOfUniverse: Milestone[];
  momentsOfSignificance: Milestone[];
  currentDays: number;
  hasSpecialMilestone: boolean;
}

export interface RhythmMilestone {
  id: string;
  title: string;
  description: string;
  cycle: string;
  iconType: 'daily' | 'monthly' | 'yearly' | 'cosmic' | 'biological' | 'technological' | 'social' | 'creative';
  tags: string[];
  goals: string[];
}

export interface RhythmsOfUniverseTimelineProps {
  milestones: RhythmMilestone[];
}

// Climate data type for milestone displays
export interface ClimateData {
  shortDescription: string;
  longDescription: string;
  source: string;
  sourceUrl: string;
}

// Climate projection for future climate events
export interface ClimateProjection {
  year: number;
  description: string;
  consequences: string[];
  source: string;
}

// Action type for climate recommendations
export interface ClimateAction {
  text: string;
  impact: "Low" | "Medium" | "High";
  badge: string;
}

// Recommendation type for climate action suggestions
export interface ClimateActionRecommendation {
  id: number;
  title: string;
  description: string;
  actions: ClimateAction[];
  category: "lifestyle" | "home" | "community";
}

// Badge type for gamification system
export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  dateEarned?: string;
  isEarned: boolean;
}

// Climate quiz results
export interface ClimateQuizResults {
  transportation: "car" | "public" | "active";
  diet: "meat" | "mixed" | "plant";
  energy: "high" | "medium" | "low";
  waste: "high" | "medium" | "low";
  community: "active" | "inactive";
}

// For climate overlay on existing milestones
export interface ClimateOverlay {
  year: number;
  co2Level: number;
  temperatureChange: number;
  seaLevelRise: number;
  majorEvents: string[];
}