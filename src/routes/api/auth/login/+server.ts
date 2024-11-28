import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    console.log("détection d'une requête POST");
    try {
        const { email, password } = await request.json();
        console.log("on analyse les données de la requête POST et on envoie à http://localhost:8080/auth/login");

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log(response);

        if (!response.ok) {
            return json(
                { error: 'Invalid credentials' },
                { status: response.status }
            );
        }

        const { accessToken } = await response.json();
        console.log("accessToken: ", accessToken);

        cookies.set('accessToken', accessToken, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60 // 15 minutes
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
