import { RhythmMilestone } from "./types";

// constants.ts
export const LOADING_FACTS: string[] = [
  "A million seconds is about 11.5 days, while a billion seconds is about 31.7 years!",
  "The average human heart beats 2.5 billion times in a lifetime.",
  "If you're 30 years old, you've spent about 10 years sleeping.",
  "Your 10,000th day occurs when you're about 27.4 years old.",
  "Every second, about 4 babies are born worldwide."
];

export const rhythmMilestones: RhythmMilestone[] = [
  {
    id: "daily-cycle",
    title: "Daily Rhythms",
    description: "The 24-hour cycle that governs human biology and behavior, synchronized with Earth's rotation.",
    cycle: "24 hours",
    iconType: "daily",
    tags: ["Circadian Rhythm", "Sleep-Wake Cycle", "Earth Rotation"],
    goals: [
      "Align daily activities with natural light cycles",
      "Maintain consistent sleep-wake patterns",
      "Honor the body's natural energy fluctuations"
    ]
  },
  {
    id: "lunar-cycle",
    title: "Lunar Cycles",
    description: "The 29.5-day journey of the Moon around Earth, affecting tides, light, and possibly biological rhythms.",
    cycle: "29.5 days",
    iconType: "monthly",
    tags: ["Moon Phases", "Tidal Forces", "Lunar Influence"],
    goals: [
      "Observe monthly emotional patterns",
      "Connect activities to moon phases",
      "Understand tidal influences on natural systems"
    ]
  },
  {
    id: "seasonal-cycle",
    title: "Seasonal Rhythms",
    description: "The annual cycle of seasons resulting from Earth's tilted axis during its orbit around the Sun.",
    cycle: "365.25 days",
    iconType: "yearly",
    tags: ["Solstice", "Equinox", "Climate Patterns"],
    goals: [
      "Adapt lifestyle to seasonal changes",
      "Celebrate solstices and equinoxes",
      "Harmonize with seasonal food and activities"
    ]
  },
  {
    id: "biological-rhythm",
    title: "Biological Rhythms",
    description: "Internal cycles that regulate bodily functions from cellular repair to hormonal fluctuations.",
    cycle: "Various",
    iconType: "biological",
    tags: ["Hormone Cycles", "Ultradian Rhythms", "Cellular Regeneration"],
    goals: [
      "Support natural hormonal cycles",
      "Respect ultradian work-rest cycles (90-120 minutes)",
      "Optimize physical performance based on biological timing"
    ]
  },
  {
    id: "tech-cycles",
    title: "Technology Cycles",
    description: "The rhythmic patterns of technological innovation, adoption, and obsolescence.",
    cycle: "18-24 months",
    iconType: "technological",
    tags: ["Innovation Cycles", "Digital Rhythms", "Tech Evolution"],
    goals: [
      "Find balance between tech adoption and digital wellness",
      "Recognize patterns in information consumption",
      "Create sustainable technology habits"
    ]
  },
  {
    id: "cosmic-cycles",
    title: "Cosmic Cycles",
    description: "Vast astronomical cycles from planetary orbits to galactic rotations that shape our universe.",
    cycle: "Billions of years",
    iconType: "cosmic",
    tags: ["Galactic Year", "Stellar Lifecycles", "Cosmic Expansion"],
    goals: [
      "Gain perspective through cosmic timescales",
      "Appreciate our place in universal rhythms",
      "Connect daily life to larger celestial patterns"
    ]
  },
  {
    id: "social-rhythms",
    title: "Social Rhythms",
    description: "Collective patterns of human interaction, from daily commutes to annual holidays and celebrations.",
    cycle: "Daily to Generational",
    iconType: "social",
    tags: ["Cultural Patterns", "Celebrations", "Social Interactions"],
    goals: [
      "Create meaningful personal and family rituals",
      "Participate in community celebrations",
      "Balance social engagement with solitude"
    ]
  },
  {
    id: "creative-cycles",
    title: "Creative Cycles",
    description: "The natural ebbs and flows of creativity, inspiration, and artistic expression.",
    cycle: "Variable",
    iconType: "creative",
    tags: ["Inspiration Waves", "Creative Flow", "Artistic Seasons"],
    goals: [
      "Honor periods of creative incubation",
      "Recognize and utilize peak creative times",
      "Build sustainable creative practices"
    ]
  }
];