'use client';

import { useTranscription } from '@/hooks/useTranscription';

interface LiveCaptionsProps {
    isEnabled: boolean;
    meetingName?: string;
}

const LiveCaptions = ({ isEnabled, meetingName = 'Meeting' }: LiveCaptionsProps) => {
    const { currentTranscript, transcriptionLines, isListening, error, getFullTranscript } = useTranscription(isEnabled);

    // Don't show anything if not enabled
    if (!isEnabled) return null;

    // Show error if any
    if (error) {
        return (
            <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 max-w-2xl px-4">
                <div className="bg-red-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-red-500/50">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                </div>
            </div>
        );
    }

    // Show captions only if there's text
    if (!currentTranscript && transcriptionLines.length === 0) {
        return (
            <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 max-w-2xl px-4">
                <div className="bg-blue-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-blue-500/50">
                    <p className="text-blue-300 text-sm text-center flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        Listening... Start speaking
                    </p>
                </div>
            </div>
        );
    }

    // Get last 2 final transcripts + current interim
    const recentLines = transcriptionLines.slice(-2);

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 max-w-3xl w-full px-4">
            <div className="bg-black/80 backdrop-blur-md rounded-xl px-6 py-4 border border-gray-700/50 shadow-2xl">
                {/* Recent final transcripts */}
                {recentLines.map((line, index) => (
                    <p
                        key={index}
                        className="text-gray-400 text-base leading-relaxed mb-1 text-center"
                    >
                        {line.text}
                    </p>
                ))}

                {/* Current interim transcript */}
                {currentTranscript && (
                    <p className="text-white text-lg font-medium leading-relaxed text-center">
                        {currentTranscript}
                    </p>
                )}

                {/* Listening indicator */}
                {isListening && (
                    <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-gray-700/50">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Live</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveCaptions;
