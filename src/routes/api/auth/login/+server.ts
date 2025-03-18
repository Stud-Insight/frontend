import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request, cookies }) => {
    let response;
    try {
        const { email, password } = await request.json();

        response = await fetch(`${env.API_ENDPOINT}/auth/login`, {
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
    } catch (error: any) {
        console.error(error);
        return json(
            { error: 'An error occurred while logging in', stack: error.stack, api: env, response: response },
            { status: 500 },
        );
    }
};
