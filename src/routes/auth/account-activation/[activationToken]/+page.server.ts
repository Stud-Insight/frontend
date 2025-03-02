import { env } from '$env/dynamic/private';

export const load = async ({ params }) => {
    const activationToken = params.activationToken;

    const response = await fetch(`${env.API_ENDPOINT}/auth/activate/check/${activationToken}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401 || response.status === 400) {
        return { activationToken: null };
    }

    return { activationToken };
};