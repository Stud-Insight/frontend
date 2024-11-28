import { error, type RequestEvent } from "@sveltejs/kit";

const MY_API_BASE_URL = 'http://localhost:8080';
const PROXY_PATH = '/api';

interface ExtendedRequestInit extends RequestInit {
    duplex?: string;
}

async function proxyRequest(event: RequestEvent) {
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
}

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith(PROXY_PATH)) {
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

        return await proxyRequest(event);
    }
    return resolve(event);
};