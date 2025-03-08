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