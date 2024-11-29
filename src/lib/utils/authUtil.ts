import { goto } from '$app/navigation';

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
