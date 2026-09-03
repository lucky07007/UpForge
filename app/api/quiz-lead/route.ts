import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, upforge_quiz_name, upforge_quiz_score, upforge_quiz_total, upforge_quiz_completed_at } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_TOKEN) {
      return NextResponse.json({ success: false, message: 'HUBSPOT_ACCESS_TOKEN not set' }, { status: 500 });
    }

    const completedTimestamp = new Date(upforge_quiz_completed_at).getTime();

    const properties = {
      email,
      upforge_quiz_name,
      upforge_quiz_score: String(upforge_quiz_score),
      upforge_quiz_total: String(upforge_quiz_total),
      upforge_quiz_completed_at: completedTimestamp
    };

    // 1. Create contact
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ properties })
    });

    const data = await response.json();

    // 2. Agar contact already exists (409), to update by email
    if (response.status === 409) {
      const updateRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties })
      });

      const updateData = await updateRes.json();
      return NextResponse.json({ success: true, updated: true, data: updateData });
    }

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, created: true, data });
  } catch (error: any) {
    console.error('HubSpot Route Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
