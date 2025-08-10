
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, format, topic, difficulty, type } = body.data;
    const token = req.cookies.get('currentUser').value;
    const data = {
      subject,
      format,
      topic,
      difficulty,
      type
    }

    console.log(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quiz-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ subject, format, topic, difficulty, type }),
    });

    const responseText = await response.text();
    // Clean the response to ensure it is valid JSON
    const cleanedResponse = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
      const data = JSON.parse(cleanedResponse);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Original response text:', responseText);
      return NextResponse.json({ message: 'Error parsing quiz data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ message: 'Error generating quiz' }, { status: 500 });
  }
}
