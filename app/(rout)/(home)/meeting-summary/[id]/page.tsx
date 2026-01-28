'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call } from '@stream-io/video-react-sdk';
import Loader from '@/components/Loader';
import MeetingSummaryComponent from '@/components/MeetingSummaryComponent';
import { ArrowLeft, Calendar, Clock, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MeetingSummaryPage = () => {
    const params = useParams();
    const router = useRouter();
    const meetingId = params.id as string;
    const { endedCalls, isLoading } = useGetCalls();
    const [meeting, setMeeting] = useState<Call | null>(null);
    const [transcript, setTranscript] = useState<string>('');

    useEffect(() => {
        if (endedCalls && meetingId) {
            const foundMeeting = endedCalls.find((call) => call.id === meetingId);
            setMeeting(foundMeeting || null);

            // For demo purposes, generate a sample transcript
            // In production, you'd fetch the actual transcript from the meeting
            if (foundMeeting) {
                const sampleTranscript = `Meeting discussion about ${foundMeeting.state?.custom?.meetingName || 'the project'}. 
        The team discussed various topics including project progress, upcoming deadlines, and resource allocation. 
        Key decisions were made regarding the timeline and responsibilities were assigned to team members.
        Action items were identified and next steps were outlined for the team to follow.`;
                setTranscript(sampleTranscript);
            }
        }
    }, [endedCalls, meetingId]);

    if (isLoading) return <Loader />;

    if (!meeting) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-2xl font-bold text-white">Meeting Not Found</h1>
                <Button onClick={() => router.push('/previous')} className="bg-blue-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Previous Meetings
                </Button>
            </div>
        );
    }

    const meetingName = meeting.state?.custom?.meetingName || meeting.state?.custom?.description || 'Meeting';
    const startTime = meeting.state?.startsAt ? new Date(meeting.state.startsAt) : null;
    const endTime = meeting.state?.endedAt ? new Date(meeting.state.endedAt) : null;
    const duration = startTime && endTime
        ? Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60)
        : 0;

    return (
        <section className="flex size-full flex-col gap-6 text-white">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => router.push('/previous')}
                    variant="ghost"
                    className="hover:bg-dark-3"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">{meetingName}</h1>
                    <p className="text-gray-400 mt-1">Meeting Summary & Analytics</p>
                </div>
            </div>

            {/* Meeting Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-dark-1/40 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-1/20">
                            <Calendar className="w-5 h-5 text-blue-1" />
                        </div>
                        <span className="text-sm text-gray-400">Date</span>
                    </div>
                    <p className="text-lg font-semibold">
                        {startTime?.toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-dark-1/40 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-1/20">
                            <Clock className="w-5 h-5 text-purple-1" />
                        </div>
                        <span className="text-sm text-gray-400">Duration</span>
                    </div>
                    <p className="text-lg font-semibold">{duration} minutes</p>
                </div>

                <div className="bg-dark-1/40 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-orange-1/20">
                            <Users className="w-5 h-5 text-orange-1" />
                        </div>
                        <span className="text-sm text-gray-400">Participants</span>
                    </div>
                    <p className="text-lg font-semibold">
                        {meeting.state?.participantCount || 0}
                    </p>
                </div>

                <div className="bg-dark-1/40 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-green-500/20">
                            <Video className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-sm text-gray-400">Status</span>
                    </div>
                    <p className="text-lg font-semibold">Completed</p>
                </div>
            </div>

            {/* Meeting Times */}
            <div className="bg-dark-1/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Meeting Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Started At</p>
                        <p className="text-lg font-semibold">
                            {startTime?.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Ended At</p>
                        <p className="text-lg font-semibold">
                            {endTime?.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* AI Summary */}
            <MeetingSummaryComponent
                transcript={transcript}
                meetingName={meetingName}
            />
        </section>
    );
};

export default MeetingSummaryPage;
