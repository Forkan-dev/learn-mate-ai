
import { log } from 'console';
import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder for your actual data fetching logic.
// In a real app, you would fetch this from a database.
const subjects = [
  {
    name: 'Mathematics',
    description: 'Numbers, equations, and problem solving',
    icon: 'FiBook',
    color: 'blue',
  },
  {
    name: 'Science',
    description: 'Discover the wonders of our world',
    icon: 'FaFlask',
    color: 'green',
  },
  {
    name: 'English',
    description: 'Reading, writing, and literature',
    icon: 'FiPenTool',
    color: 'purple',
  },
  {
    name: 'History',
    description: 'Journey through time and cultures',
    icon: 'FaLandmark',
    color: 'orange',
  },
];

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get('currentUser').value;
  const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subjects?type=home`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return NextResponse.json(backendResponse);
}
