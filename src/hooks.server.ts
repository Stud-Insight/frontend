import { type RequestEvent } from '@sveltejs/kit';
import { clearAuth } from '$utils/authUtil';
import { env } from '$env/dynamic/private'
import jwt from 'jsonwebtoken';

interface DecodedAccessToken extends jwt.JwtPayload {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

const handleAuth = async (event: RequestEvent) => {
    const refreshToken = event.cookies.get('refreshToken');
    let accessToken = event.cookies.get('accessToken');

    if (accessToken && refreshToken) {
        try {
            const decoded = jwt.decode(accessToken) as DecodedAccessToken;

            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < now) {
                console.log(`[🔐] Access Token expired, refreshing...`);

                const refreshResponse = await fetch(env.API_ENDPOINT + '/auth/refresh', {
                    method: 'POST',
                    headers: {
                        Cookie: event.request.headers.get('cookie') || ''
                    },
                    credentials: 'include'
                });

                if (!refreshResponse.ok) {
                    console.error('[🔐] Refresh failed. Clearing session.');
                    clearAuth(event);
                    return;
                }

                const data = await refreshResponse.json();
                const sessionMaxAge = data.sessionMaxAge;
                accessToken = data.accesToken;

                if (!accessToken) {
                    console.error('[🔐] No Access Token received from backend when refreshing. Clearing session.');
                    clearAuth(event);
                    return;
                }

                event.cookies.set('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: sessionMaxAge
                });
            }

            const newDecoded = jwt.decode(accessToken) as DecodedAccessToken;
            event.locals.user = {
                id: newDecoded?.id,
                firstName: newDecoded?.firstName,
                lastName: newDecoded?.lastName,
                email: newDecoded?.email,
                roles: newDecoded?.roles
            };
        } catch (err) {
            console.error('[🔐] Failed to decode Access Token. Clearing session:', err);
            clearAuth(event);
        }
    } else {
        clearAuth(event);
    }
};

export const handle = async ({ event, resolve }) => {
    await handleAuth(event);
    return resolve(event);
};
