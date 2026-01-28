import { Call } from '@stream-io/video-react-sdk';

export interface MeetingStats {
    totalMeetings: number;
    totalDuration: number;
    averageDuration: number;
    totalParticipants: number;
    averageParticipants: number;
    meetingsThisWeek: number;
    meetingsThisMonth: number;
}

export interface MeetingTrend {
    date: string;
    count: number;
    duration: number;
}

export function calculateMeetingStats(meetings: Call[]): MeetingStats {
    if (!meetings || meetings.length === 0) {
        return {
            totalMeetings: 0,
            totalDuration: 0,
            averageDuration: 0,
            totalParticipants: 0,
            averageParticipants: 0,
            meetingsThisWeek: 0,
            meetingsThisMonth: 0,
        };
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let totalDuration = 0;
    let totalParticipants = 0;
    let meetingsThisWeek = 0;
    let meetingsThisMonth = 0;

    meetings.forEach((meeting) => {
        // Calculate duration (if meeting has ended)
        const startTime = meeting.state?.startsAt;
        const endTime = meeting.state?.endedAt;

        if (startTime && endTime) {
            const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60); // minutes
            totalDuration += duration;
        }

        // Count participants
        const participants = meeting.state?.members?.length || 0;
        totalParticipants += participants;

        // Count meetings this week/month
        if (startTime) {
            const meetingDate = new Date(startTime);
            if (meetingDate >= weekAgo) meetingsThisWeek++;
            if (meetingDate >= monthAgo) meetingsThisMonth++;
        }
    });

    return {
        totalMeetings: meetings.length,
        totalDuration: Math.round(totalDuration),
        averageDuration: Math.round(totalDuration / meetings.length),
        totalParticipants,
        averageParticipants: Math.round(totalParticipants / meetings.length),
        meetingsThisWeek,
        meetingsThisMonth,
    };
}

export function getMeetingTrends(meetings: Call[], days: number = 7): MeetingTrend[] {
    const trends: { [key: string]: { count: number; duration: number } } = {};
    const now = new Date();

    // Initialize last N days
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        trends[dateStr] = { count: 0, duration: 0 };
    }

    // Populate with actual data
    meetings.forEach((meeting) => {
        const startTime = meeting.state?.startsAt;
        if (startTime) {
            const meetingDate = new Date(startTime);
            const dateStr = meetingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (trends[dateStr]) {
                trends[dateStr].count++;

                const endTime = meeting.state?.endedAt;
                if (endTime) {
                    const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60);
                    trends[dateStr].duration += duration;
                }
            }
        }
    });

    return Object.entries(trends).map(([date, data]) => ({
        date,
        count: data.count,
        duration: Math.round(data.duration),
    }));
}

export function getTopMeetingTimes(meetings: Call[]): { hour: number; count: number }[] {
    const hourCounts: { [key: number]: number } = {};

    // Initialize all hours
    for (let i = 0; i < 24; i++) {
        hourCounts[i] = 0;
    }

    meetings.forEach((meeting) => {
        const startTime = meeting.state?.startsAt;
        if (startTime) {
            const hour = new Date(startTime).getHours();
            hourCounts[hour]++;
        }
    });

    return Object.entries(hourCounts)
        .map(([hour, count]) => ({ hour: parseInt(hour), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6); // Top 6 hours
}

export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
