/**
 * Ce fichier contient des fonctions utilitaires liées à l'authentification.
 * Il comprend des fonctions pour la déconnexion, la suppression des jetons d'authentification,
 * et la vérification des rôles utilisateurs.
 */
import { goto } from '$app/navigation';
import type { User } from '$lib/interfaces/User';
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

export const isAdmin = (user: User) => {
    return user?.roles.some((role) => role.name === 'ADMIN');
}