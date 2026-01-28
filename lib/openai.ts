import { GoogleGenerativeAI } from '@google/generative-ai';

export interface MeetingSummary {
    summary: string;
    keyPoints: string[];
    actionItems: string[];
    participants?: string[];
    duration?: string;
}

export async function generateMeetingSummary(
    transcript: string,
    meetingName: string = 'Meeting'
): Promise<MeetingSummary> {
    try {
        // Check for Gemini API key first (free alternative)
        if (process.env.GEMINI_API_KEY) {
            return await generateWithGemini(transcript, meetingName);
        }

        // Fallback to OpenAI if configured
        if (process.env.OPENAI_API_KEY) {
            return await generateWithOpenAI(transcript, meetingName);
        }

        throw new Error('No AI API key configured. Please add GEMINI_API_KEY (free) or OPENAI_API_KEY to .env.local');
    } catch (error) {
        console.error('Error generating meeting summary:', error);
        throw error;
    }
}

async function generateWithGemini(transcript: string, meetingName: string): Promise<MeetingSummary> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // Use gemini-pro which is available in stable API
    const model = genAI.getGenerativeModel({
        model: 'gemini-pro',
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
        }
    });

    const prompt = `You are an AI meeting assistant. Analyze this meeting transcript and provide a structured summary.

Meeting: ${meetingName}

Transcript:
${transcript}

Please provide your response in this exact JSON format:
{
  "summary": "A concise 2-3 sentence summary of the meeting",
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "actionItems": ["action item 1", "action item 2"]
}

Only return the JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        // Extract JSON from response (Gemini sometimes adds markdown)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? jsonMatch[0] : text;
        const parsed = JSON.parse(jsonText);

        return {
            summary: parsed.summary || 'No summary available',
            keyPoints: parsed.keyPoints || [],
            actionItems: parsed.actionItems || [],
        };
    } catch (parseError) {
        return {
            summary: text,
            keyPoints: [],
            actionItems: [],
        };
    }
}

async function generateWithOpenAI(transcript: string, meetingName: string): Promise<MeetingSummary> {
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || '',
    });

    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `You are an AI meeting assistant. Analyze meeting transcripts and provide:
1. A concise summary (2-3 sentences)
2. Key points discussed (bullet points)
3. Action items

Format as JSON: {"summary": "...", "keyPoints": [...], "actionItems": [...]}`,
            },
            {
                role: 'user',
                content: `Meeting: ${meetingName}\n\nTranscript:\n${transcript}`,
            },
        ],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0].message.content || '{}';

    try {
        const parsed = JSON.parse(content);
        return {
            summary: parsed.summary || 'No summary available',
            keyPoints: parsed.keyPoints || [],
            actionItems: parsed.actionItems || [],
        };
    } catch (parseError) {
        return {
            summary: content,
            keyPoints: [],
            actionItems: [],
        };
    }
}

export async function generateQuickSummary(transcript: string): Promise<string> {
    try {
        if (process.env.GEMINI_API_KEY) {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const result = await model.generateContent(
                `Summarize this meeting transcript in 2-3 sentences:\n\n${transcript}`
            );
            const response = await result.response;
            return response.text();
        }

        return 'No AI API key configured. Please add GEMINI_API_KEY (free) to your .env.local file.';
    } catch (error) {
        console.error('Error generating quick summary:', error);
        return 'Error generating summary.';
    }
}
