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
            return json(
                { error: 'Invalid credentials' },
                { status: response.status }
            );
        }

        const { access, refresh } = await response.json();
        console.log(access, refresh);

        cookies.set('accessToken', access.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: refresh.maxAge // On fait en sorte que la durée de vie de l'accessToken soit la même que celle du refreshToken
        });

        cookies.set('refreshToken', refresh.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: refresh.maxAge
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
