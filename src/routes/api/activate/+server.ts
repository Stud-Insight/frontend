import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
        const { password,  validationToken } = await request.json();
        console.log('cled')
        const response = await fetch(`http://localhost:8081/auth/activate/${validationToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        return json({ success: true });
}