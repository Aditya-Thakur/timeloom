// MilestoneCalculator.ts
import { MilestonesData, Milestone } from './types';

export function calculateMilestones(dob: string): MilestonesData {
  const birthDate = new Date(dob);
  const today = new Date();

  // Milestone types
  const echoesOfTime: Milestone[] = []; // 1,000s days
  const rhythmsOfUniverse: Milestone[] = []; // 1,111s days
  const momentsOfSignificance: Milestone[] = []; // Major life milestones

  // Calculate 1,000s of days
  for (let i = 1; i <= 40; i++) {
    const daysToAdd = i * 1000;
    const milestoneDate = new Date(birthDate);
    milestoneDate.setDate(birthDate.getDate() + daysToAdd);

    if (milestoneDate <= today) {
      echoesOfTime.push({
        id: `echo-${i}`,
        days: daysToAdd,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: true
      });
    } else {
      echoesOfTime.push({
        id: `echo-${i}`,
        days: daysToAdd,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: false,
        daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  }

  // Calculate 1,111s of days
  for (let i = 1; i <= 9; i++) {
    const daysToAdd = i * 1111;
    const milestoneDate = new Date(birthDate);
    milestoneDate.setDate(birthDate.getDate() + daysToAdd);

    if (milestoneDate <= today) {
      rhythmsOfUniverse.push({
        id: `rhythm-${i}`,
        days: daysToAdd,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: true
      });
    } else {
      rhythmsOfUniverse.push({
        id: `rhythm-${i}`,
        days: daysToAdd,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: false,
        daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  }

  // Calculate significant moments
  const significantDays = [
    { days: 1000, description: "Cute Little Kid 🎈" },
    { days: 2000, description: "Curious Explorer 🌍" },
    { days: 5000, description: "Confident Achiever 🚀" },
    { days: 10000, description: "Life Navigator 🌟" },
    { days: 15000, description: "Seasoned Dreamer 🌠" },
    { days: 20000, description: "Wisdom Collector 📖" },
    { days: 25000, description: "Legend in the Making 🏆" },
    { days: 30000, description: "Timeless Voyager ⏳" }
  ];

  significantDays.forEach((milestone, index) => {
    const milestoneDate = new Date(birthDate);
    milestoneDate.setDate(birthDate.getDate() + milestone.days);

    if (milestoneDate <= today) {
      momentsOfSignificance.push({
        id: `significant-${index}`,
        days: milestone.days,
        description: milestone.description,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: true
      });
    } else {
      momentsOfSignificance.push({
        id: `significant-${index}`,
        days: milestone.days,
        description: milestone.description,
        date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPast: false,
        daysUntil: Math.ceil((milestoneDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  });

  // Check for Easter Eggs
  const ageInDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const hasSpecialMilestone = [12345, 23456, 42000, 10101, 20202].includes(ageInDays);

  return {
    echoesOfTime,
    rhythmsOfUniverse,
    momentsOfSignificance,
    currentDays: ageInDays,
    hasSpecialMilestone
  };
}
