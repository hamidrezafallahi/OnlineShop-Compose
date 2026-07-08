import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${baseUrl}api/Identity/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!data.isSuccess) {
      return NextResponse.json(data, { status: 400 });
    }

    const cookieStore = await cookies();

    // access token (اختیاری HttpOnly)
    cookieStore.set("candyAccess", data.data.accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    // refresh token (مهم)
    cookieStore.set("candyRefresh", data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      isSuccess: true,
      data: {
        accessToken: data.data.accessToken,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false },
      { status: 500 }
    );
  }
}
