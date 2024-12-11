import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../account/account-validation/$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
        const { password,  validationToken } = await request.json();
        console.log('cled')
        const response = await fetch(`http://localhost:8080/auth/activate/${validationToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        return json({ success: true });
}