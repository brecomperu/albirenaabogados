import { NextRequest, NextResponse } from 'next/server';
import { GoogleMeetingService } from '@/shared/api/google/calendar';

export async function POST(req: NextRequest) {
  try {
    const { summary, description, start, end, attendees } = await req.json();

    const meeting = await GoogleMeetingService.createMeeting({
      summary,
      description,
      start,
      end,
      attendees,
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      meetLink: meeting.hangoutLink,
      eventId: meeting.eventId,
    });
  } catch (error: any) {
    console.error('API Error (Google Meet):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
