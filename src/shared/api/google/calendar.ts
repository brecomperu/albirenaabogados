import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

let calendarInstance: any = null;

/**
 * Lazy initialization for Google Calendar client using Application Default Credentials (ADC)
 */
async function getCalendarClient() {
  if (calendarInstance) return calendarInstance;

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    calendarInstance = google.calendar({ version: 'v3', auth: authClient as any });
    return calendarInstance;
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
    throw error;
  }
}

export const GoogleMeetingService = {
  /**
   * Create a Google Calendar event with a Meet link
   */
  async createMeeting(params: {
    summary: string;
    description: string;
    start: string; // ISO string
    end: string;   // ISO string
    attendees: string[];
  }) {
    // Note: Environment variables are optional when using GoogleAuth/ADC in GCP/Firebase environments
    // but you need `gcloud auth application-default login` for local development.
    
    try {
      const calendar = await getCalendarClient();
      
      const event = {
        summary: params.summary,
        description: params.description,
        start: {
          dateTime: params.start,
          timeZone: 'America/Lima',
        },
        end: {
          dateTime: params.end,
          timeZone: 'America/Lima',
        },
        attendees: params.attendees.map(email => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      };

      const response = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
        conferenceDataVersion: 1,
      });

      return {
        hangoutLink: response.data.hangoutLink,
        eventId: response.data.id,
      };
    } catch (error) {
      console.error('Error creating Google Meeting:', error);
      // In case of authentication errors, provide a helpful hint
      if (error instanceof Error && error.message.includes('Could not load the default credentials')) {
        console.warn('HINT: For local development, run: gcloud auth application-default login');
      }
      throw error;
    }
  }
};
