import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    console.log("eled")
    console.log(locals.user?.roles[0].name)
    if (!locals.user || !(locals.user?.roles.map((role) => role.name).includes("ADMIN"))) {
        throw redirect(302, '/');
    }
    
    return {
        user: locals.user
    };
};
