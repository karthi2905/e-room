'use server';

import { generateMeetingSummary, generateQuickSummary, type MeetingSummary } from '@/lib/openai';

export async function generateSummaryAction(
    transcript: string,
    meetingName: string
): Promise<{ success: boolean; data?: MeetingSummary; error?: string }> {
    try {
        const summary = await generateMeetingSummary(transcript, meetingName);
        return { success: true, data: summary };
    } catch (error) {
        console.error('Error in generateSummaryAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate summary',
        };
    }
}

export async function generateQuickSummaryAction(
    transcript: string
): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
        const summary = await generateQuickSummary(transcript);
        return { success: true, data: summary };
    } catch (error) {
        console.error('Error in generateQuickSummaryAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate summary',
        };
    }
}
