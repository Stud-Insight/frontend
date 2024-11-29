import { goto } from '$app/navigation';
import type { RequestEvent } from '@sveltejs/kit';

export const logout = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });

        if (response.ok) {
            goto('/auth/login');
        } else {
            console.error('Failed to logout:', await response.json());
        }
    } catch (err) {
        console.error('Error during logout:', err);
    }
};

export const clearAuth = (event: RequestEvent) => {
    event.locals.user = undefined;
    event.cookies.delete('accessToken', { path: '/' });
    event.cookies.delete('refreshToken', { path: '/' });
};