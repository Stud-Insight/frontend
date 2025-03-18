import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
        const { email, firstName, lastName } = await request.json();
        console.log('cled')
        const response = await fetch('http://localhost:8081/account/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, firstName, lastName })
        });
        return json({ success: true });
}