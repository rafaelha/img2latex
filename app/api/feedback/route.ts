import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const feedbackData = await request.json();
    const key = `feedback:${Date.now()}:${Math.random().toString(36).substring(7)}`;
    
    await kv.set(key, JSON.stringify(feedbackData));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing feedback:', error);
    return NextResponse.json({ error: 'Failed to store feedback' }, { status: 500 });
  }
}