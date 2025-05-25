<script lang="ts" context="module">
    import { z } from "zod";
 
    export const formSchema = z.object({
    group: z.enum(["groupe 1", "groupe 2", "groupe 3"], {
        required_error: "Vous devez choisir un groupe"
    })
    });
    
    export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
    import { browser } from "$app/environment";
    import * as Form from "$lib/components/ui/form";
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { Input } from "$lib/components/ui/input";
    import SuperDebug, { type SuperValidated, type Infer, superForm} from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    
    export let data: SuperValidated<Infer<FormSchema>>;
    
    const form = superForm(data, {
     validators: zodClient(formSchema),
    });
    
    const { form: formData, enhance } = form;

    //const groups = [{id:"g1", label:"Groupe 1"}, {id:"g2", label:"Groupe 2"}, {id:"g3", label:"Groupe 3"}]
   </script>
    
   <form method="POST" use:enhance>
    <Form.Field {form} name="group">
        <Form.Description>Choisir un gruope</Form.Description>
        <RadioGroup.Root bind:value={$formData.group}>
            <div>
                <Form.Control let:attrs>
                    <RadioGroup.Item value="groupe 1" {...attrs} />
                    <Form.Label>Groupe 1</Form.Label>
                </Form.Control>
            </div>
            <div>
                <Form.Control let:attrs>
                    <RadioGroup.Item value="groupe 2" {...attrs} />
                    <Form.Label>Groupe 2</Form.Label>
                </Form.Control>
            </div>
            <div>
                <Form.Control let:attrs>
                    <RadioGroup.Item value="groupe 3" {...attrs} />
                    <Form.Label>Groupe 3</Form.Label>
                </Form.Control>
            </div>
            <RadioGroup.Input name="group" />
        </RadioGroup.Root>
     <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
    {#if browser}
        <SuperDebug data={$formData} />
    {/if}
   </form>