import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { email, firstName, lastName } = await request.json();

    const response = await fetch('http://localhost:8080/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName })
    });

    return json({ success: true });
};
