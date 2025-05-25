import { userFormSchema } from "$components/forms/CreateUser.svelte";
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
 return {
  form: await superValidate(zod(userFormSchema)),
 };
};

export const actions: Actions = {
 default: async (event) => {
  const form = await superValidate(event, zod(userFormSchema));
  if (!form.valid) {
   return fail(400, {
    form,
   });
  }
  return {
   form,
  };
 },
};