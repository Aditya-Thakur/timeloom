// utils/lifeStatistics.ts
/**
 * Utility functions to calculate various life statistics based on days lived
 */

interface LifeStatistics {
    heartbeats: number;
    breaths: number;
    steps: number;
    words: number;
    sleepDays: number;
    sunrises: number;
    moonCycles: number;
  }
  
  /**
   * Calculate various life statistics based on birth date and days lived
   * @param dateOfBirth - Birth date in YYYY-MM-DD format
   * @param daysLived - Number of days the person has lived
   * @returns Object with various life statistics
   */
  export const calculateLifeStatistics = (daysLived: number): LifeStatistics => {
    // Constants for calculations
    const AVG_HEARTBEATS_PER_DAY = 100000; // ~70 beats per minute
    const AVG_BREATHS_PER_DAY = 20000; // ~14 breaths per minute
    const AVG_STEPS_PER_DAY = 7000; // Average steps per day
    const AVG_WORDS_PER_DAY = 16000; // Average words spoken per day
    const AVG_SLEEP_HOURS_PER_DAY = 8; // Average sleep hours per day
    const MOON_CYCLE_DAYS = 29.53; // Average lunar cycle in days
    
    // Calculate approximate heartbeats
    const heartbeats = Math.round(daysLived * AVG_HEARTBEATS_PER_DAY);
    
    // Calculate approximate breaths
    const breaths = Math.round(daysLived * AVG_BREATHS_PER_DAY);
    
    // Calculate approximate steps walked
    // Adjust for early childhood - assume no walking before 1 year
    const walkingAdjustment = Math.max(0, daysLived - 365) / daysLived;
    const steps = Math.round(daysLived * AVG_STEPS_PER_DAY * walkingAdjustment);
    
    // Calculate approximate words spoken
    // Adjust for early childhood - assume limited speech before 2 years
    const speechAdjustment = Math.max(0, daysLived - (365 * 2)) / daysLived;
    const words = Math.round(daysLived * AVG_WORDS_PER_DAY * speechAdjustment);
    
    // Calculate approximate days spent sleeping
    const sleepDays = Math.round(daysLived * (AVG_SLEEP_HOURS_PER_DAY / 24));
    
    // Calculate number of sunrises witnessed
    const sunrises = daysLived;
    
    // Calculate number of full moon cycles
    const moonCycles = Math.floor(daysLived / MOON_CYCLE_DAYS);
    
    return {
      heartbeats,
      breaths,
      steps,
      words,
      sleepDays,
      sunrises,
      moonCycles
    };
  };
  
  /**
   * Estimate the number of full years the person has lived
   * @param daysLived - Number of days the person has lived
   * @returns Number of full years
   */
  export const estimateYearsLived = (daysLived: number): number => {
    return Math.floor(daysLived / 365.25);
  };
  
  /**
   * Estimate the person's generation based on birth year
   * @param birthYear - Year of birth
   * @returns String representing the person's generation
   */
  export const estimateGeneration = (birthYear: number): string => {
    if (birthYear >= 2013) return "Gen Alpha";
    if (birthYear >= 1997) return "Gen Z";
    if (birthYear >= 1981) return "Millennial";
    if (birthYear >= 1965) return "Gen X";
    if (birthYear >= 1946) return "Baby Boomer";
    if (birthYear >= 1928) return "Silent Generation";
    return "Greatest Generation";
  };
  
  /**
   * Calculate the number of leap years the person has lived through
   * @param birthYear - Year of birth
   * @param currentYear - Current year
   * @returns Number of leap years
   */
  export const calculateLeapYears = (birthYear: number, currentYear: number): number => {
    let count = 0;
    
    for (let year = birthYear; year <= currentYear; year++) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        count++;
      }
    }
    
    return count;
  };
  
  /**
   * Calculate interesting astronomical statistics
   * @param daysLived - Number of days the person has lived
   * @returns Object with astronomical statistics
   */
  export const calculateAstronomicalStats = (daysLived: number): { 
    earthOrbits: number, 
    earthRotations: number,
    distanceTraveledAroundSun: number // in million km
  } => {
    // Constants
    const EARTH_ORBIT_DAYS = 365.25; // Days for Earth to orbit Sun
    const EARTH_CIRCUMFERENCE_MILLION_KM = 940; // Earth's orbit circumference in million km
    
    const earthOrbits = daysLived / EARTH_ORBIT_DAYS;
    const earthRotations = daysLived; // One rotation per day
    const distanceTraveledAroundSun = earthOrbits * EARTH_CIRCUMFERENCE_MILLION_KM;
    
    return {
      earthOrbits: Math.floor(earthOrbits * 100) / 100, // Round to 2 decimal places
      earthRotations: Math.floor(earthRotations),
      distanceTraveledAroundSun: Math.floor(distanceTraveledAroundSun)
    };
  };