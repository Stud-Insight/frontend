import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    console.log("eled")
    if (!locals.user) {
        throw redirect(302, '/');
    }
    
    return {
        user: locals.user
    };
};
