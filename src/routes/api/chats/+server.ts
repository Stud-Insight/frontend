//import { json } from '@sveltejs/kit';
//import type { RequestHandler } from './$types';

//export const POST: RequestHandler = async ({ request, cookies }) => {
//        const { email, firstName, lastName } = await request.json();
//        console.log('cled')
//        const response = await fetch('http://localhost:8080/account/create-user', {
//          method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify({ email, firstName, lastName })
//        });
//        return json({ success: true });
//}