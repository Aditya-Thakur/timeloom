// UpdatedCombinedShareImage.tsx - Revised layout based on sketch
import { forwardRef, ForwardedRef, useState, useEffect } from 'react';
import { MilestonesData } from './constants/types';
import { calculateLifeStatistics } from './utils/lifeStatistics';
import { getClimateDataForYear } from './constants/climateData';
import { Milestone } from './constants/types';
interface CombinedShareImageProps {
    milestones: MilestonesData;
    dateOfBirth: string;
}
interface MilestoneProgressBarProps {
    nextMilestone: Milestone;
    currentDays: number;
}
interface StatItemProps {
    icon: string;
    value: number;
    label: string;
    formatter: (val: number) => string;
}

const UpdatedCombinedShareImage = forwardRef<HTMLDivElement, CombinedShareImageProps>(
    ({ milestones, dateOfBirth }, ref: ForwardedRef<HTMLDivElement>) => {
        const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
        const birthDate = new Date(dateOfBirth);
        const birthYear = birthDate.getFullYear();
        const currentYear = new Date().getFullYear();

        // Calculate statistics for the user's life
        const lifeStats = calculateLifeStatistics(milestones.currentDays);

        // Get climate data for visualization
        const birthClimateData = getClimateDataForYear(birthYear);
        const currentClimateData = getClimateDataForYear(currentYear);
        const projectedClimateData = getClimateDataForYear(2050);

        // Determine next upcoming milestone
        const upcomingMilestone = milestones.momentsOfSignificance
            .filter(m => !m.isPast)
            .sort((a, b) => a.daysUntil! - b.daysUntil!)[0];

        // Get past milestones for badges
        const pastMilestones = milestones.momentsOfSignificance
            .filter(m => m.isPast)
            .slice(0, 3);

        // Generate tech advancements based on birth year
        const getTechAdvancements = () => {
            const techs = [];

            if (birthYear <= 1990) techs.push('World Wide Web (1990)');
            if (birthYear <= 1992) techs.push('SMS Text Messaging (1992)');
            if (birthYear <= 1996) techs.push('DVDs (1996)');
            if (birthYear <= 1998) techs.push('Google Search (1998)');
            if (birthYear <= 2001) techs.push('Wikipedia (2001)');
            if (birthYear <= 2004) techs.push('Facebook (2004)');
            if (birthYear <= 2007) techs.push('iPhone (2007)');
            if (birthYear <= 2008) techs.push('App Store (2008)');
            if (birthYear <= 2009) techs.push('Bitcoin (2009)');
            if (birthYear <= 2010) techs.push('iPad (2010)');
            if (birthYear <= 2011) techs.push('Voice Assistants (2011)');
            if (birthYear <= 2012) techs.push('4G Networks (2012)');
            if (birthYear <= 2015) techs.push('Smart Watches (2015)');
            if (birthYear <= 2016) techs.push('Virtual Reality (2016)');
            if (birthYear <= 2020) techs.push('5G Networks (2020)');
            if (birthYear <= 2022) techs.push('Mainstream AI Tools (2022)');
            if (birthYear <= 2023) techs.push('Generative AI (2023)');

            // Return up to 5 techs, prioritizing the most recent ones
            return techs.slice(-5);
        };

        const techAdvancements = getTechAdvancements();

        useEffect(() => {
            const fetchUnsplashImage = async () => {
                try {
                    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
                    if (!accessKey) {
                        console.error("Unsplash API key not found");
                        return;
                    }

                    // Fetch a curated image that works well with overlay text
                    const response = await fetch(
                        `https://api.unsplash.com/photos/random?query=cosmos,starry,gradient&orientation=portrait&client_id=${accessKey}`
                    );

                    if (!response.ok) {
                        throw new Error(`Unsplash API error: ${response.status}`);
                    }

                    const data = await response.json();
                    setBackgroundImage(data.urls.regular);
                } catch (error) {
                    console.error("Error fetching Unsplash image:", error);
                }
            };

            fetchUnsplashImage();
        }, []);

        return (
            <div
                ref={ref}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '900px',
                    boxSizing: 'border-box',
                    padding: '24px',
                    backgroundColor: '#1a1a2e', // Dark blue fallback
                    backgroundImage: backgroundImage
                        ? `linear-gradient(to bottom, rgba(26, 26, 46, 0.85), rgba(40, 40, 80, 0.9)), url(${backgroundImage})`
                        : 'linear-gradient(to bottom, #1a1a2e, #16213e)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    border: '2px solid #30305a',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'Arial, sans-serif',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: '16px'
                }}
            >
                {/* Header - Title, Days Count, and Achievement Badges Combined */}
                <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.7), rgba(81, 45, 168, 0.4))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                color: '#b19cd9'
                            }}>
                                LIFE JOURNEY
                            </div>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                margin: '4px 0',
                                color: '#fff',
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                                {milestones.currentDays.toLocaleString()}
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                margin: '0',
                                color: '#e0e0fa'
                            }}>
                                days on Earth & counting
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: '8px'
                    }}>
                        {pastMilestones.map((milestone, index) => (
                            <LifeStageBadge
                                key={index}
                                milestone={milestone}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Life Statistics Section - Horizontal Layout */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 60, 0.8)',
                    padding: '16px',
                    borderRadius: '10px',
                }}>
                    <h3 style={{
                        fontSize: '14px',
                        margin: '0 0 12px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#bb86fc',
                        textAlign: 'center'
                    }}>
                        Life in Numbers
                    </h3>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: '12px'
                    }}>
                        <StatItem
                            icon="❤️"
                            value={lifeStats.heartbeats}
                            label="Heartbeats"
                            formatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                        />

                        <StatItem
                            icon="🫁"
                            value={lifeStats.breaths}
                            label="Breaths"
                            formatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                        />

                        <StatItem
                            icon="👣"
                            value={lifeStats.steps}
                            label="Steps"
                            formatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                        />

                        <StatItem
                            icon="🌙"
                            value={lifeStats.moonCycles}
                            label="Moon Cycles"
                            formatter={(val: number) => val.toLocaleString()}
                        />

                        <StatItem
                            icon="🌅"
                            value={lifeStats.sunrises}
                            label="Sunrises"
                            formatter={(val: number) => val.toLocaleString()}
                        />
                    </div>
                </div>

                {/* Tech Evolution and Climate Data Side by Side */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    height: '250px'
                }}>
                    {/* Tech Evolution - Left aligned */}
                    <div style={{
                        flex: '1',
                        backgroundColor: 'rgba(40, 40, 70, 0.8)',
                        padding: '16px',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{
                            fontSize: '14px',
                            margin: '0 0 12px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#bb86fc',
                            textAlign: 'center'
                        }}>
                            Tech Evolution
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {techAdvancements.map((tech, index) => (
                                <div key={index} style={{
                                    backgroundColor: 'rgba(187, 134, 252, 0.2)',
                                    color: '#e0e0fa',
                                    fontSize: '12px',
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    textAlign: 'left'
                                }}>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Climate Evolution with Graph - Right side */}
                    <div style={{
                        flex: '1',
                        backgroundColor: 'rgba(30, 30, 60, 0.8)',
                        padding: '16px',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{
                            fontSize: '14px',
                            margin: '0 0 12px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#03dac6',
                            textAlign: 'center'
                        }}>
                            Climate Evolution
                        </h3>

                        {/* Climate Graph Visualization */}
                        <div style={{
                            flex: 1,
                            position: 'relative',
                            marginBottom: '8px'
                        }}>
                            {/* Graph axes */}
                            <div style={{
                                position: 'absolute',
                                left: '30px',
                                top: '10px',
                                bottom: '20px',
                                width: '1px',
                                backgroundColor: 'rgba(255, 255, 255, 0.3)'
                            }} />
                            <div style={{
                                position: 'absolute',
                                left: '30px',
                                right: '10px',
                                bottom: '20px',
                                height: '1px',
                                backgroundColor: 'rgba(255, 255, 255, 0.3)'
                            }} />

                            {/* Y-axis labels */}
                            <div style={{
                                position: 'absolute',
                                left: '0',
                                top: '10px',
                                fontSize: '8px',
                                color: '#03dac6'
                            }}>
                                CO₂
                            </div>

                            {/* X-axis labels */}
                            <div style={{
                                position: 'absolute',
                                left: '30px',
                                right: '10px',
                                bottom: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '8px',
                                color: 'rgba(255, 255, 255, 0.7)'
                            }}>
                                <span>{birthYear}</span>
                                <span>{currentYear}</span>
                                <span>2050</span>
                            </div>

                            {/* Graph lines - CO₂ */}
                            <svg
                                style={{
                                    position: 'absolute',
                                    left: '30px',
                                    right: '10px',
                                    top: '10px',
                                    bottom: '20px',
                                    overflow: 'visible'
                                }}
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d={`M 0,${100 - (birthClimateData.co2 / 600) * 100} 
                      L 50,${100 - (currentClimateData.co2 / 600) * 100} 
                      L 100,${100 - (projectedClimateData.co2 / 600) * 100}`}
                                    fill="none"
                                    stroke="#03dac6"
                                    strokeWidth="2"
                                />

                                {/* Data points */}
                                <circle cx="0" cy={100 - (birthClimateData.co2 / 600) * 100} r="2" fill="#03dac6" />
                                <circle cx="50" cy={100 - (currentClimateData.co2 / 600) * 100} r="2" fill="#03dac6" />
                                <circle cx="100" cy={100 - (projectedClimateData.co2 / 600) * 100} r="2" fill="#03dac6" />
                            </svg>

                            {/* Graph lines - Sea Level */}
                            <svg
                                style={{
                                    position: 'absolute',
                                    left: '30px',
                                    right: '10px',
                                    top: '10px',
                                    bottom: '20px',
                                    overflow: 'visible'
                                }}
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d={`M 0,${100 - ((birthClimateData.seaLevel + 20) / 120) * 100} 
                      L 50,${100 - ((currentClimateData.seaLevel + 20) / 120) * 100} 
                      L 100,${100 - ((projectedClimateData.seaLevel + 20) / 120) * 100}`}
                                    fill="none"
                                    stroke="#cf6679"
                                    strokeWidth="2"
                                />

                                {/* Data points */}
                                <circle cx="0" cy={100 - ((birthClimateData.seaLevel + 20) / 120) * 100} r="2" fill="#cf6679" />
                                <circle cx="50" cy={100 - ((currentClimateData.seaLevel + 20) / 120) * 100} r="2" fill="#cf6679" />
                                <circle cx="100" cy={100 - ((projectedClimateData.seaLevel + 20) / 120) * 100} r="2" fill="#cf6679" />
                            </svg>
                        </div>

                        {/* Legend */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                            marginTop: '4px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '10px',
                                color: '#03dac6'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '2px',
                                    backgroundColor: '#03dac6',
                                    marginRight: '4px'
                                }} />
                                CO₂
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '10px',
                                color: '#cf6679'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '2px',
                                    backgroundColor: '#cf6679',
                                    marginRight: '4px'
                                }} />
                                Sea Level
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Milestone Progress Bar */}
                {upcomingMilestone && (
                    <div style={{
                        padding: '16px',
                        backgroundColor: 'rgba(50, 50, 80, 0.8)',
                        borderRadius: '10px',
                        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h3 style={{
                            fontSize: '14px',
                            margin: '0 0 8px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#03dac6',
                            textAlign: 'center'
                        }}>
                            Next Milestone
                        </h3>

                        <MilestoneProgressBar
                            nextMilestone={upcomingMilestone}
                            currentDays={milestones.currentDays}
                        />
                    </div>
                )}

                {/* Branding Footer */}
                <div style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#a0a0d0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
                        marginRight: '6px'
                    }}></div>
                    <span style={{ fontWeight: 'bold' }}>TimeLoom</span>
                </div>
            </div>
        );
    }
);

const LifeStageBadge = ({ milestone, index }: { milestone: Milestone, index: number }) => {
    // Badge colors corresponding to different milestone stages
    const badgeColors = [
        { bg: '#bb86fc', border: '#9d4edd', text: '#fff' }, // Purple
        { bg: '#03dac6', border: '#018786', text: '#000' }, // Teal
        { bg: '#ff7597', border: '#cf6679', text: '#000' }, // Pink
    ];

    const color = badgeColors[index % badgeColors.length];

    // Get badge name based on milestone days
    const getBadgeName = () => {
        if (milestone.days === 1000) return 'Early Journeyer';
        if (milestone.days === 2000) return 'Young Explorer';
        if (milestone.days === 5000) return 'Path Finder';
        if (milestone.days === 10000) return 'Life Navigator';
        if (milestone.days === 15000) return 'Season Voyager';
        if (milestone.days === 20000) return 'Wisdom Keeper';
        if (milestone.days === 25000) return 'Time Weaver';
        if (milestone.days === 30000) return 'Legacy Creator';
        return milestone.description || 'Milestone Achieved';
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: color.bg,
                border: `2px solid ${color.border}`,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color.text,
                fontSize: '20px',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Badge background pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 70% 70%, transparent 65%, rgba(255, 255, 255, 0.15) 65%)`
                }}></div>

                {milestone.days.toString().length > 4
                    ? milestone.days.toString().substring(0, 2) + 'K'
                    : Math.floor(milestone.days / 1000) + 'K'}
            </div>
            <div style={{
                marginTop: '4px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#e0e0fa',
                textAlign: 'center',
                maxWidth: '80px'
            }}>
                {getBadgeName()}
            </div>
        </div>
    );
};



const StatItem = ({ icon, value, label, formatter }: StatItemProps) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
        minWidth: '80px'
    }}>
        <span style={{
            fontSize: '18px',
            marginBottom: '4px'
        }}>
            {icon}
        </span>
        <span style={{
            fontWeight: 'bold',
            color: '#e0e0fa',
            fontSize: '14px'
        }}>
            {formatter(value)}
        </span>
        <span style={{
            color: '#a0a0d0',
            fontSize: '10px'
        }}>
            {label}
        </span>
    </div>
);

const MilestoneProgressBar = ({ nextMilestone, currentDays }: MilestoneProgressBarProps) => {
    // Calculate progress percentage
    const totalDaysToNextMilestone = nextMilestone.days;
    const progress = (currentDays / totalDaysToNextMilestone) * 100;

    // Format the milestone description nicely
    const getMilestoneTitle = () => {
        return nextMilestone.description || `${nextMilestone.days.toLocaleString()}-Day Milestone`;
    };

    // Calculate days remaining
    const daysRemaining = nextMilestone.daysUntil || 0;
    const percentComplete = Math.min(Math.round(progress), 99); // Cap at 99% for visibility

    return (
        <div>
            <div style={{
                textAlign: 'center',
                marginBottom: '8px',
            }}>
                <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#e0e0fa',
                    marginBottom: '4px'
                }}>
                    {getMilestoneTitle()}
                </div>

                <div style={{
                    fontSize: '12px',
                    color: '#b0b0e0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span>{currentDays.toLocaleString()} days done</span>
                    <span style={{ color: '#6c6c9c' }}>•</span>
                    <span>{daysRemaining.toLocaleString()} days left</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div style={{
                height: '16px',
                backgroundColor: 'rgba(3, 218, 198, 0.15)',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                padding: '2px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
                {/* Progress Fill */}
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, #03dac6, #018786)',
                    borderRadius: '6px',
                    position: 'relative',
                }}>
                    {/* Animated pulse effect */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '10px',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7))',
                        animation: 'pulse 1.5s infinite',
                    }}></div>
                </div>

                {/* Percentage Text */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: progress > 50 ? '#fff' : '#018786',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textShadow: progress > 50 ? '0 1px 1px rgba(0,0,0,0.3)' : 'none',
                }}>
                    {percentComplete}% Complete
                </div>
            </div>

            {/* Progress Scale */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                color: '#a0a0d0',
                marginTop: '6px'
            }}>
                <span>0 days</span>
                <span style={{ color: '#b3b3e0' }}>{(totalDaysToNextMilestone / 2).toLocaleString()}</span>
                <span>{totalDaysToNextMilestone.toLocaleString()} days</span>
            </div>
        </div>
    );
};

UpdatedCombinedShareImage.displayName = 'UpdatedCombinedShareImage';

export default UpdatedCombinedShareImage;