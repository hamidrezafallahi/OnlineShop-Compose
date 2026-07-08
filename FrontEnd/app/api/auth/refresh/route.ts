// app/api/auth/refresh/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
    try {
        const cookieStore = await cookies();

        const refreshToken =
            cookieStore.get("candyRefresh")?.value;

        const accessToken =
            cookieStore.get("candyAccess")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Refresh token not found",
                },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${BASE_URL}api/Identity/refresh-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken,
                    refreshToken,
                }),
            }
        );
        const data = await response.json();
        if (!response.ok || !data?.isSuccess) {
            cookieStore.delete("candyAccess");
            cookieStore.delete("candyRefresh");

            return NextResponse.json(
                {
                    success: false,
                    message: "Refresh failed",
                },
                { status: 401 }
            );
        }

        const newAccessToken =
            data.data.accessToken;

        const newRefreshToken =
            data.data.refreshToken;

        // access token جدید
        cookieStore.set("candyAccess", newAccessToken, {
            httpOnly: false, // چون client لازم دارد بخواند
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60, // 1h
        });

        // refresh token جدید
        cookieStore.set(
            "candyRefresh",
            newRefreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30d
            }
        );

        return NextResponse.json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error("REFRESH ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
