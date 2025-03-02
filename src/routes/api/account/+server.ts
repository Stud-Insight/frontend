import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request }) => {
    const { email, firstName, lastName } = await request.json();

    await fetch(`${env.API_ENDPOINT}/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName })
    });

    return json({ success: true });
};
