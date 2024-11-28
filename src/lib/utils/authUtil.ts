import { goto } from "$app/navigation";

export const fetchWithAuth = async (url: RequestInfo | URL, options: RequestInit) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        }
    });

    // si le token est invalide, on essaye de le rafraîchir
    if (response.status === 401) {
        const refreshResponse = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        });

        if (refreshResponse.ok) {
            const { accessToken: newAccessToken } = await refreshResponse.json();
            localStorage.setItem('accessToken', newAccessToken);

            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
            });
        }
    }

    return response;
};

export const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    localStorage.removeItem('accessToken');
    await goto('/auth/login');
};