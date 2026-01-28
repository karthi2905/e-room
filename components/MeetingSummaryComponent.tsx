'use client';

import { useState } from 'react';
import { generateSummaryAction } from '@/actions/ai.actions';
import { Sparkles, Download, Copy, Check, Loader2 } from 'lucide-react';
import type { MeetingSummary } from '@/lib/openai';

interface MeetingSummaryComponentProps {
    transcript: string;
    meetingName: string;
}

const MeetingSummaryComponent = ({ transcript, meetingName }: MeetingSummaryComponentProps) => {
    const [summary, setSummary] = useState<MeetingSummary | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerateSummary = async () => {
        if (!transcript || transcript.trim().length < 50) {
            setError('Transcript is too short. Please ensure the meeting has enough content.');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            const result = await generateSummaryAction(transcript, meetingName);

            if (result.success && result.data) {
                setSummary(result.data);
            } else {
                setError(result.error || 'Failed to generate summary');
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!summary) return;

        const text = `
${meetingName} - AI Summary

Summary:
${summary.summary}

Key Points:
${summary.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Action Items:
${summary.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}
    `.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!summary) return;

        const text = `
${meetingName} - AI Summary
Generated on: ${new Date().toLocaleString()}

Summary:
${summary.summary}

Key Points:
${summary.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Action Items:
${summary.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Full Transcript:
${transcript}
    `.trim();

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${meetingName}-summary.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-1" />
                    AI Meeting Summary
                </h2>

                {!summary && (
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-1 text-white rounded-lg hover:bg-blue-1/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Summary</span>
                            </>
                        )}
                    </button>
                )}

                {summary && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-2 bg-dark-3 text-white rounded-lg hover:bg-dark-2 transition-all"
                            title="Copy summary"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span className="text-sm">Copy</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-2 bg-dark-3 text-white rounded-lg hover:bg-dark-2 transition-all"
                            title="Download summary"
                        >
                            <Download className="w-4 h-4" />
                            <span className="text-sm">Download</span>
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
                    <p className="text-red-400 text-sm">{error}</p>
                    <p className="text-gray-400 text-xs mt-2">
                        Make sure you have added your OpenAI API key to .env.local
                    </p>
                </div>
            )}

            {summary && (
                <div className="space-y-6">
                    {/* Summary */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
                        <p className="text-gray-300 leading-relaxed">{summary.summary}</p>
                    </div>

                    {/* Key Points */}
                    {summary.keyPoints.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Key Points</h3>
                            <ul className="space-y-2">
                                {summary.keyPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-1 font-bold">•</span>
                                        <span className="text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Items */}
                    {summary.actionItems.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Action Items</h3>
                            <ul className="space-y-2">
                                {summary.actionItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-orange-1 font-bold">{index + 1}.</span>
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {!summary && !isGenerating && !error && (
                <div className="text-center py-8">
                    <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">
                        Click "Generate Summary" to create an AI-powered summary of this meeting
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Requires OpenAI API key in .env.local
                    </p>
                </div>
            )}
        </div>
    );
};

export default MeetingSummaryComponent;
