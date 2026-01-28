'use client';

import { useTranscription } from '@/hooks/useTranscription';
import { Mic, MicOff, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface MeetingTranscriptionProps {
    meetingName?: string;
}

const MeetingTranscription = ({ meetingName = 'Meeting' }: MeetingTranscriptionProps) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const { transcript, transcriptionLines, isListening, error, clearTranscript, getFullTranscript } = useTranscription(isEnabled);

    const toggleTranscription = () => {
        setIsEnabled(!isEnabled);
    };

    const downloadTranscript = () => {
        const fullTranscript = getFullTranscript();
        const blob = new Blob([`${meetingName} Transcript\n\n${fullTranscript}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${meetingName}-transcript.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4">
            {/* Caption Display */}
            {isEnabled && transcript && (
                <div className="bg-black/90 backdrop-blur-sm rounded-lg px-6 py-3 mb-3 border border-gray-700">
                    <p className="text-white text-center text-lg leading-relaxed">
                        {transcript}
                    </p>
                </div>
            )}

            {/* Control Bar */}
            <div className="bg-dark-1/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-dark-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTranscription}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isEnabled
                                ? 'bg-blue-1 text-white hover:bg-blue-1/80'
                                : 'bg-dark-3 text-gray-400 hover:bg-dark-2'
                            }`}
                    >
                        {isEnabled ? (
                            <>
                                <Mic className="w-4 h-4" />
                                <span>Live Captions ON</span>
                            </>
                        ) : (
                            <>
                                <MicOff className="w-4 h-4" />
                                <span>Enable Captions</span>
                            </>
                        )}
                    </button>

                    {isListening && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-400">Listening...</span>
                        </div>
                    )}

                    {error && (
                        <span className="text-sm text-red-400">{error}</span>
                    )}
                </div>

                {isEnabled && transcriptionLines.length > 0 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={downloadTranscript}
                            className="p-2 rounded-lg bg-dark-3 text-gray-400 hover:bg-dark-2 hover:text-white transition-all"
                            title="Download transcript"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            onClick={clearTranscript}
                            className="p-2 rounded-lg bg-dark-3 text-gray-400 hover:bg-dark-2 hover:text-red-400 transition-all"
                            title="Clear transcript"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-400 ml-2">
                            {transcriptionLines.length} lines
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeetingTranscription;
