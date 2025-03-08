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
