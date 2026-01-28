'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TranscriptionLine {
    text: string;
    timestamp: Date;
    isFinal: boolean;
}

export function useTranscription(isEnabled: boolean) {
    const [currentTranscript, setCurrentTranscript] = useState<string>('');
    const [transcriptionLines, setTranscriptionLines] = useState<TranscriptionLine[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);
    const restartTimeoutRef = useRef<any>(null);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // Ignore errors during cleanup
            }
            recognitionRef.current = null;
        }
        if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
            restartTimeoutRef.current = null;
        }
        setIsListening(false);
    }, []);

    useEffect(() => {
        // Check if browser supports speech recognition
        if (typeof window === 'undefined') return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Speech recognition not supported. Use Chrome or Edge.');
            return;
        }

        if (!isEnabled) {
            cleanup();
            return;
        }

        const recognition = new SpeechRecognition();

        // Optimized settings for accuracy and speed
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';

                    // Add to transcription lines
                    setTranscriptionLines(prev => [
                        ...prev,
                        {
                            text: transcript.trim(),
                            timestamp: new Date(),
                            isFinal: true,
                        }
                    ]);
                } else {
                    interimTranscript += transcript;
                }
            }

            // Update current transcript with interim or final
            if (finalTranscript) {
                setCurrentTranscript('');
            } else {
                setCurrentTranscript(interimTranscript);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);

            if (event.error === 'no-speech') {
                // Silently restart
                restartTimeoutRef.current = setTimeout(() => {
                    if (isEnabled && recognitionRef.current) {
                        try {
                            recognition.start();
                        } catch (e) {
                            // Ignore if already started
                        }
                    }
                }, 100);
            } else if (event.error !== 'aborted') {
                setError(`Error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            if (isEnabled) {
                // Auto-restart for continuous recognition
                restartTimeoutRef.current = setTimeout(() => {
                    try {
                        recognition.start();
                    } catch (e) {
                        console.error('Error restarting recognition:', e);
                    }
                }, 100);
            } else {
                setIsListening(false);
            }
        };

        recognitionRef.current = recognition;

        try {
            recognition.start();
        } catch (e) {
            console.error('Error starting recognition:', e);
            setError('Failed to start speech recognition');
        }

        return cleanup;
    }, [isEnabled, cleanup]);

    const clearTranscript = () => {
        setCurrentTranscript('');
        setTranscriptionLines([]);
    };

    const getFullTranscript = () => {
        return transcriptionLines.map(line => line.text).join(' ');
    };

    return {
        currentTranscript,
        transcriptionLines,
        isListening,
        error,
        clearTranscript,
        getFullTranscript,
    };
}
