'use client';

import { useRouter } from 'next/navigation';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
        useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const [isRecordingsLoading, setIsRecordingsLoading] = useState(false);
    const { toast } = useToast();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            if (!callRecordings) return;

            setIsRecordingsLoading(true);

            try {
                // Fetch all recordings in parallel for speed
                const callData = await Promise.all(
                    callRecordings.map((meeting) => meeting.queryRecordings())
                );

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);


                // Process names after fetching all
                const recordingCounts: { [key: string]: number } = {};
                const allRecordings: any[] = [];

                // We need to map recordings back to their meetings to get names
                // Since efficient mapping is tricky with flatMap, we iterate again or structure differently.
                // Let's stick to a simplified parallel fetch processing:

                await Promise.all(callRecordings.map(async (call) => {
                    const { recordings } = await call.queryRecordings();
                    if (recordings.length > 0) {
                        const meetingName = call.state?.custom?.meetingName ||
                            call.state?.custom?.description ||
                            'Meeting';

                        recordings.forEach(recording => {
                            // Track count for this meeting
                            if (!recordingCounts[meetingName]) {
                                recordingCounts[meetingName] = 0;
                            }
                            recordingCounts[meetingName]++;

                            // Create display name with count
                            const count = recordingCounts[meetingName];
                            const displayName = count > 1
                                ? `${meetingName} - Meeting Record ${count}`
                                : `${meetingName} - Meeting Record`;

                            allRecordings.push({
                                ...recording,
                                displayName,
                                meetingName
                            });
                        });
                    }
                }));

                setRecordings(allRecordings);
            } catch (error) {
                toast({ title: 'Try again later' });
            } finally {
                setIsRecordingsLoading(false);
            }
        };

        if (type === 'recordings') {
            fetchRecordings();
        }
    }, [type, callRecordings, toast]);

    if (isLoading || (type === 'recordings' && isRecordingsLoading)) return <Loader />;

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                    ? '/icons/upcoming.svg'
                                    : '/icons/recordings.svg'
                        }
                        title={
                            type === 'recordings'
                                ? (meeting as any).displayName || 'Recording'
                                : (meeting as Call).state?.custom?.meetingName ||
                                (meeting as Call).state?.custom?.description ||
                                'No Description'
                        }
                        date={
                            (meeting as Call).state?.startsAt && (meeting as Call).state?.endedAt
                                ? `${new Date((meeting as Call).state.startsAt!).toLocaleString()} - ${new Date((meeting as Call).state.endedAt!).toLocaleTimeString()}`
                                : (meeting as Call).state?.startsAt?.toLocaleString() ||
                                (meeting as CallRecording).start_time?.toLocaleString()
                        }
                        isPreviousMeeting={type === 'ended'}
                        isRecording={type === 'recordings'}
                        link={
                            type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                        }
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : type === 'ended' ? 'View Summary' : 'Start'}
                        handleClick={
                            type === 'recordings'
                                ? () => router.push(`${(meeting as CallRecording).url}`)
                                : type === 'ended'
                                    ? () => router.push(`/meeting-summary/${(meeting as Call).id}`)
                                    : () => router.push(`/meeting/${(meeting as Call).id}`)
                        }
                    />
                ))
            ) : (
                <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
            )}
        </div>
    );
};

export default CallList;
