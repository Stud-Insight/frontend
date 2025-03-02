import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request }) => {
    const { password, activationToken } = await request.json();

    await fetch(`${env.API_ENDPOINT}/auth/activate/${activationToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    return json({ success: true });
};
