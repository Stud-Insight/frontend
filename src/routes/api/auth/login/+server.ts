import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { email, password } = await request.json();

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            return new Response(response.body);
        }

        const { accessToken, refreshToken, sessionMaxAge } = await response.json();

        cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: sessionMaxAge
        });

        cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: sessionMaxAge
        });

        return json({ success: true });
    } catch (error) {
        console.error(error);
        return json(
            { error: 'An error occurred while logging in' },
            { status: 500 }
        );
    }
};
