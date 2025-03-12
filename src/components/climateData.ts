// climateData.ts
import { ClimateData, ClimateProjection, ClimateActionRecommendation } from './types';

// Historical and projected CO2 levels (ppm)
// Data approximated from NOAA and IPCC projections
export const co2Levels: Record<number, number> = {
  1960: 317,
  1970: 326,
  1980: 339,
  1990: 354,
  2000: 369,
  2010: 389,
  2020: 412,
  2030: 437, // Projection
  2040: 463, // Projection
  2050: 490, // Projection
  2060: 517, // Projection
  2070: 545, // Projection
  2080: 574, // Projection
  2090: 604, // Projection
  2100: 635, // Projection
};

// Global temperature anomalies (°C relative to pre-industrial levels)
export const temperatureAnomalies: Record<number, number> = {
  1960: 0.3,
  1970: 0.4,
  1980: 0.5,
  1990: 0.7,
  2000: 0.9,
  2010: 1.1,
  2020: 1.2,
  2030: 1.5, // Projection
  2040: 1.8, // Projection
  2050: 2.2, // Projection
  2060: 2.5, // Projection
  2070: 2.9, // Projection
  2080: 3.2, // Projection
  2090: 3.5, // Projection
  2100: 3.9, // Projection
};

// Sea level rise (cm, relative to year 2000)
export const seaLevelRise: Record<number, number> = {
  1960: -10,
  1970: -8,
  1980: -6,
  1990: -3,
  2000: 0,
  2010: 3,
  2020: 8,
  2030: 14, // Projection
  2040: 22, // Projection
  2050: 32, // Projection
  2060: 44, // Projection
  2070: 58, // Projection
  2080: 74, // Projection
  2090: 92, // Projection
  2100: 110, // Projection
};

// Major climate events - historical and projected
export const majorClimateEvents: Record<number, string[]> = {
  1990: ["Second IPCC Assessment Report"],
  1992: ["Rio Earth Summit"],
  1997: ["Kyoto Protocol adopted"],
  2005: ["Kyoto Protocol enters into force"],
  2012: ["Arctic sea ice reaches record low"],
  2015: ["Paris Agreement adopted"],
  2018: ["IPCC Special Report on Global Warming of 1.5°C"],
  2020: ["COVID-19 temporarily reduces emissions"],
  2023: ["Record high global temperatures"],
  2030: ["Projected deadline for emissions reduction targets"],
  2050: ["Net zero emissions target for many countries"],
};

// Climate impact descriptions by age range
export const climateImpactsByAge: Record<string, ClimateData> = {
  "birth-10": {
    shortDescription: "CO₂ levels rising as you grow",
    longDescription: "During your early years, atmospheric CO₂ concentrations continued to rise steadily. These are the foundational years when the climate system you'll experience throughout your life is being shaped.",
    source: "NOAA Global Monitoring Laboratory",
    sourceUrl: "https://gml.noaa.gov/ccgg/trends/"
  },
  "10-20": {
    shortDescription: "Increasing extreme weather events",
    longDescription: "Your teenage years coincided with a period of increasingly frequent extreme weather events globally, including more intense hurricanes, floods, and wildfires, linked to rising global temperatures.",
    source: "IPCC Sixth Assessment Report",
    sourceUrl: "https://www.ipcc.ch/report/ar6/wg1/"
  },
  "20-30": {
    shortDescription: "Critical climate policy decisions",
    longDescription: "During your twenties, crucial climate policies were being debated and implemented globally. These decisions will shape the climate trajectory for the rest of your life and future generations.",
    source: "United Nations Framework Convention on Climate Change",
    sourceUrl: "https://unfccc.int/"
  },
  "30-50": {
    shortDescription: "Accelerating climate impacts",
    longDescription: "Middle age coincides with a period where climate impacts are becoming more pronounced and disruptive to global systems, including food production, water availability, and ecosystem health.",
    source: "NASA Global Climate Change",
    sourceUrl: "https://climate.nasa.gov/"
  },
  "50+": {
    shortDescription: "Witnessing major climate transformations",
    longDescription: "In your later years, you're witnessing climate transformations that will define the planet for centuries to come. Your generation bridges the pre-climate crisis world and the climate-altered future.",
    source: "World Meteorological Organization",
    sourceUrl: "https://public.wmo.int/en"
  }
};

// Future climate projections based on milestone dates
export const futureClimateProjections: ClimateProjection[] = [
  {
    year: 2030,
    description: "If current trends continue, global warming will likely reach 1.5°C above pre-industrial levels, causing more frequent extreme weather events.",
    consequences: [
      "More intense and frequent heatwaves",
      "Loss of 70-90% of coral reefs",
      "Sea ice-free Arctic summers occurring once every decade"
    ],
    source: "IPCC Special Report on Global Warming of 1.5°C"
  },
  {
    year: 2050,
    description: "Under moderate emission scenarios, many regions will experience significant climate shifts, affecting agriculture, water resources, and biodiversity.",
    consequences: [
      "Up to 15% decline in crop yields in some regions",
      "Over 1 billion people experiencing water scarcity",
      "30-50% of species at increased risk of extinction"
    ],
    source: "IPCC Sixth Assessment Report"
  },
  {
    year: 2080,
    description: "Without substantial mitigation efforts, sea levels may rise by over 60cm, threatening coastal communities worldwide.",
    consequences: [
      "Hundreds of millions of people exposed to coastal flooding",
      "Permanent loss of some low-lying coastal areas",
      "Increasing migration due to uninhabitable regions"
    ],
    source: "NASA Sea Level Change Portal"
  },
  {
    year: 2100,
    description: "End-of-century projections show dramatic changes to Earth systems, with temperature increases between 2-4°C under moderate scenarios.",
    consequences: [
      "Significant reduction in global food production",
      "Widespread ecosystem collapse in vulnerable regions",
      "Annual economic losses estimated at 5-20% of global GDP"
    ],
    source: "Stern Review on the Economics of Climate Change"
  }
];

// Climate action recommendations
export const climateActionRecommendations: ClimateActionRecommendation[] = [
  {
    id: 1,
    title: "Reduce Carbon Footprint",
    description: "Make changes to reduce your personal carbon emissions",
    actions: [
      { text: "Eat less meat (especially beef)", impact: "High", badge: "Plant Power" },
      { text: "Drive less & choose public transit or biking", impact: "High", badge: "Green Commuter" },
      { text: "Reduce air travel or purchase carbon offsets", impact: "High", badge: "Climate Traveler" }
    ],
    category: "lifestyle"
  },
  {
    id: 2,
    title: "Energy Efficiency",
    description: "Reduce energy consumption at home",
    actions: [
      { text: "Switch to energy-efficient lighting", impact: "Medium", badge: "Energy Saver" },
      { text: "Improve home insulation", impact: "High", badge: "Efficient Home" },
      { text: "Use energy-efficient appliances", impact: "Medium", badge: "Smart Consumer" }
    ],
    category: "home"
  },
  {
    id: 3,
    title: "Waste Reduction",
    description: "Minimize waste production and increase recycling",
    actions: [
      { text: "Compost food waste", impact: "Medium", badge: "Waste Warrior" },
      { text: "Eliminate single-use plastics", impact: "Medium", badge: "Plastic Fighter" },
      { text: "Practice proper recycling", impact: "Medium", badge: "Recycling Pro" }
    ],
    category: "lifestyle"
  },
  {
    id: 4,
    title: "Community Action",
    description: "Engage with others for broader impact",
    actions: [
      { text: "Participate in local climate initiatives", impact: "High", badge: "Community Champion" },
      { text: "Contact elected officials about climate policies", impact: "High", badge: "Climate Advocate" },
      { text: "Support climate-focused organizations", impact: "Medium", badge: "Climate Supporter" }
    ],
    category: "community"
  },
  {
    id: 5,
    title: "Resource Conservation",
    description: "Conserve water and other natural resources",
    actions: [
      { text: "Install water-saving fixtures", impact: "Medium", badge: "Water Guardian" },
      { text: "Grow native plants in your garden", impact: "Medium", badge: "Ecosystem Protector" },
      { text: "Purchase sustainable products", impact: "Medium", badge: "Mindful Consumer" }
    ],
    category: "home"
  }
];

// Climate fun facts that can be displayed at different milestones
export const climateFunFacts: string[] = [
  "The average person in the US generates about 16 tons of CO₂ annually - that's equivalent to driving a car around the Earth's equator 1.6 times!",
  "If the Greenland Ice Sheet were to melt completely, global sea levels would rise by about 7 meters (23 feet).",
  "A single tree can absorb up to 48 pounds of CO₂ per year and sequester 1 ton of CO₂ by the time it reaches 40 years old.",
  "The ocean absorbs about 30% of the CO₂ that humans release into the atmosphere, leading to ocean acidification.",
  "Earth's temperature has risen by approximately 1.1°C since the pre-industrial era (1850-1900).",
  "The last decade (2011-2020) was the warmest on record.",
  "The Arctic is warming at more than twice the rate of the global average.",
  "Renewable energy costs have fallen dramatically - solar PV costs declined by about 85% between 2010 and 2020.",
  "Climate change is causing shifts in the timing of seasonal events, with spring arriving earlier in many regions.",
  "More than 1 million species are at risk of extinction due to climate change and other human activities.",
  "The Paris Agreement aims to limit global warming to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels.",
  "Approximately 8 million metric tons of plastic enter our oceans each year, affecting marine ecosystems.",
  "Climate change is expected to increase the frequency and intensity of extreme weather events like hurricanes, floods, and droughts."
];

// Get climate data for a specific year
export function getClimateDataForYear(year: number): {
  co2: number;
  temperature: number;
  seaLevel: number;
  events: string[];
} {
  // Find the closest year in our dataset
  const years = Object.keys(co2Levels).map(Number);
  const closestYear = years.reduce((prev, curr) => 
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  
  return {
    co2: co2Levels[closestYear] || 0,
    temperature: temperatureAnomalies[closestYear] || 0,
    seaLevel: seaLevelRise[closestYear] || 0,
    events: majorClimateEvents[year] || []
  };
}

// Get climate impact based on a person's age
export function getClimateImpactByAge(age: number): ClimateData {
  if (age < 10) return climateImpactsByAge["birth-10"];
  if (age < 20) return climateImpactsByAge["10-20"];
  if (age < 30) return climateImpactsByAge["20-30"];
  if (age < 50) return climateImpactsByAge["30-50"];
  return climateImpactsByAge["50+"];
}

// Get future projection based on a future year
export function getFutureProjection(year: number): ClimateProjection | null {
  // Find the closest future projection
  const projections = futureClimateProjections.sort((a, b) => a.year - b.year);
  
  // Return null if the year is before all projections
  if (year < projections[0].year) return null;
  
  // Find the projection with the closest year
  for (let i = 0; i < projections.length; i++) {
    if (i === projections.length - 1 || 
        (year >= projections[i].year && year < projections[i+1].year)) {
      return projections[i];
    }
  }
  
  return projections[projections.length - 1]; // Return the last one if beyond all projections
}

// Get random climate fun fact
export function getRandomClimateFact(): string {
  const randomIndex = Math.floor(Math.random() * climateFunFacts.length);
  return climateFunFacts[randomIndex];
}

// Filter recommendations based on a lifestyle quiz
export function getPersonalizedRecommendations(
  quizResults: {
    transportation: string;
    diet: string;
    energy: string;
    waste: string;
    community: string;
  }
): ClimateActionRecommendation[] {
  let recommendations: ClimateActionRecommendation[] = [];
  
  // Add transportation recommendations
  if (quizResults.transportation === 'car') {
    recommendations.push(climateActionRecommendations[0]); // Carbon footprint
  }
  
  // Add energy recommendations
  if (quizResults.energy === 'high') {
    recommendations.push(climateActionRecommendations[1]); // Energy efficiency
  }
  
  // Add waste recommendations
  if (quizResults.waste === 'high') {
    recommendations.push(climateActionRecommendations[2]); // Waste reduction
  }
  
  // Add community recommendations
  if (quizResults.community === 'inactive') {
    recommendations.push(climateActionRecommendations[3]); // Community action
  }
  
  // Always include resource conservation
  recommendations.push(climateActionRecommendations[4]);
  
  // If no specific recommendations were added, give all of them
  if (recommendations.length <= 1) {
    recommendations = [...climateActionRecommendations];
  }
  
  return recommendations;
}