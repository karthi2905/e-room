import { NextResponse } from 'next/server';

export async function GET() {
    const hasKey = !!process.env.OPENAI_API_KEY;
    const keyPreview = process.env.OPENAI_API_KEY
        ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...`
        : 'NOT SET';

    return NextResponse.json({
        hasKey,
        keyPreview,
        allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
    });
}
