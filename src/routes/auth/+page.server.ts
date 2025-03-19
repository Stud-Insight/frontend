import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    console.log("HELLOOOOOOOOOO " + locals.user)
    if (locals.user) {
        console.log("Je redirect !!!")
        throw redirect(302, '/dashboard')
    }
};