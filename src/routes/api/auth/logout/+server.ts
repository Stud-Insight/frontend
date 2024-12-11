import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

export const POST = async ({ cookies }) => {
    try {
        // Workaround to get the refreshToken cookie because credentials: 'include' doesn't work with SvelteKit
        const cookieHeader = cookies
            .getAll()
            .map(({ name, value }) => name === 'refreshToken' && `${name}=${value}`)
            .join('; ');

        const response = await fetch(env.API_ENDPOINT + '/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
        });

        if (!response.ok) {
            console.error('Backend logout failed:', response.statusText);
            return json({ error: 'Failed to logout' }, { status: 500 });
        }

        cookies.delete('accessToken', { path: '/' });
        cookies.delete('refreshToken', { path: '/' });

        return json({ success: true });
    } catch (err) {
        console.error('Error during logout:', err);
        return json({ error: 'An error occurred while logging out' }, { status: 500 });
    }
};
