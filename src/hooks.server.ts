import { error, type RequestEvent } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

const MY_API_BASE_URL = 'http://localhost:8080';
const PROXY_PATH = '/api';

// This is a workaround for the lack of support for duplex requests in the RequestInit type
interface ExtendedRequestInit extends RequestInit {
    duplex?: string;
}

interface DecodedAccessToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

const proxyRequest = async (event: RequestEvent) => {
    const strippedPath = event.url.pathname.substring(PROXY_PATH.length);
    const proxiedUrl = new URL(`${MY_API_BASE_URL}${strippedPath}${event.url.search}`);

    const headers = new Headers(event.request.headers);
    headers.delete('connection');

    const requestInit: ExtendedRequestInit = {
        method: event.request.method,
        headers
    };
    
    if (event.request.method !== 'GET' && event.request.method !== 'HEAD') {
        requestInit.body = event.request.body;
        requestInit.duplex = 'half';
    }

    try {
        const response = await fetch(proxiedUrl.toString(), requestInit);
        if (!response.ok) {
            throw error(response.status, `API Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        console.error(`Error proxying request to ${proxiedUrl}:`, err);
        throw error(500, 'Internal Server Error');
    }
};

const handleProxy = async (event: RequestEvent) => {

    if (event.url.pathname === '/api/auth/login') {
        return null; // Permet au reste de la logique de SvelteKit de gérer cette route
    }

    if (event.url.pathname.startsWith(PROXY_PATH)) {
        console.log("détection d'une requête proxy");
        if (event.request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                }
            });
        }

        console.log("proxying request");
        return await proxyRequest(event);
    }
    return null;
};

const handleAuth = async (event: RequestEvent) => {
    const accessToken = event.cookies.get('accessToken');
    console.log('[HANDLE AUTH] accessToken: ', accessToken);

    if (accessToken) {
        try {
            const decoded = jwt.decode(accessToken) as DecodedAccessToken;
            event.locals.user = {
                id: decoded?.id,
                firstName: decoded?.firstName,
                lastName: decoded?.lastName,
                email: decoded?.email,
                roles: decoded?.roles
            };
        } catch (err) {
            console.error('Failed to decode accessToken', err);
        }
    }
};

export const handle = async ({ event, resolve }) => {
    // Handle proxy requests (disabled for now)
    //const proxyResponse = await handleProxy(event);
    //if (proxyResponse) return proxyResponse;

    // Handle authentication
    await handleAuth(event);

    return resolve(event);
};
