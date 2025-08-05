import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { log } from 'console';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // This is a placeholder for your actual backend authentication
  const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;

  try {
    // Create a token to authorize the request to your backend
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ email: "forkan" })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);
    let formData = {
      email,
      password,
      confirm_password: password
    };

    // Make a request to your backend with the token
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      return NextResponse.json({ error: 'API base URL is not set' }, { status: 500 });
    }
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json({
        message: errorData.message || 'Validation failed',
        errors: errorData.errors || {},
      }, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    console.log('Login successful:', data);
    const userToken = data.data?.access_token || data?.token;

    if (!userToken) {
      return NextResponse.json({ error: 'Token not provided by backend' }, { status: 500 });
    }

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('currentUser', userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
