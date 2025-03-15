// shareComponents/LifeStageBadge.tsx
import { Milestone } from '../constants/types';

export const LifeStageBadge = ({ milestone, index }: { milestone: Milestone, index: number }) => {
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

    // Get appropriate SVG icon based on milestone
    const renderLifeStageIcon = () => {
        const iconColor = color.text;
        const limitedIndex = Math.min(7, Math.max(0, index % 8));
        
        switch (limitedIndex) {
            // Baby/toddler
            case 0:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="9" r="5" />
                        <path d="M8 9h8" />
                        <path d="M12 14v7" />
                        <path d="M9 18h6" />
                        <circle cx="10" cy="7" r="1" />
                        <circle cx="14" cy="7" r="1" />
                    </svg>
                );
            // Child
            case 1:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M9 8h6" />
                        <path d="M10 6h.01" />
                        <path d="M14 6h.01" />
                        <path d="M12 13v8" />
                        <path d="M8 18h8" />
                        <path d="M8 21h8" />
                    </svg>
                );
            // Teenager
            case 2:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M10 5h.01" />
                        <path d="M14 5h.01" />
                        <path d="M9 11c-.72 1.5-1 3-1 5 0 2 1 3 2 3" />
                        <path d="M15 11c.72 1.5 1 3 1 5 0 2-1 3-2 3" />
                        <path d="M12 14v4" />
                        <path d="M9 22h6" />
                    </svg>
                );
            // Young adult
            case 3:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="6" r="4" />
                        <path d="M10 4h.01" />
                        <path d="M14 4h.01" />
                        <path d="M12 10v8" />
                        <path d="M8 14l4-1 4 1" />
                        <path d="M9 22h6" />
                    </svg>
                );
            // Adult
            case 4:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="3" />
                        <path d="M12 8v10" />
                        <path d="M8 16h8" />
                        <path d="M7 20h10" />
                        <path d="M7 12h10" />
                    </svg>
                );
            // Middle-aged
            case 5:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="3" />
                        <path d="M10 3.5h.01" />
                        <path d="M14 3.5h.01" />
                        <path d="M12 8v9" />
                        <path d="M9 12h6" />
                        <path d="M17 21v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v1" />
                    </svg>
                );
            // Older adult
            case 6:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="3" />
                        <path d="M12 8v8" />
                        <path d="M9 11h6" />
                        <path d="M8 22l2-6" />
                        <path d="M16 22l-2-6" />
                    </svg>
                );
            // Elderly/sage
            case 7:
            default:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="3" />
                        <path d="M10 3h.01" />
                        <path d="M14 3h.01" />
                        <path d="M12 8v7" />
                        <path d="M9 12h6" />
                        <path d="M8 22c0-4.4 3.6-8 8-8" />
                        <path d="M17 16l2 3" />
                    </svg>
                );
        }
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
                
                {/* Days count as small text at the bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: color.text
                }}>
                    {milestone.days.toString().length > 4
                        ? milestone.days.toString().substring(0, 2) + 'K'
                        : Math.floor(milestone.days / 1000) + 'K'}
                </div>
                
                {/* Life stage icon */}
                {renderLifeStageIcon()}
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