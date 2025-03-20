<script lang="ts" context="module">
    import { z } from "zod";
    export const summaryFormSchema = z.object({
        title: z.string().min(2).max(100),      // titre
        supervisor : z.string().max(100),       // nom du superviseur
        email: z.string().email(),              // email du superviseur
        content: z.string().min(50).max(5000)   // description
    });
    export type SummaryFormSchema = typeof summaryFormSchema;
</script>

<script lang="ts">
    import { 
        type Infer, 
        type SuperValidated,
        superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { browser } from "$app/environment";

	import { zodClient } from "sveltekit-superforms/adapters";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import { Content } from "$lib/components/ui/popover";
    import { Field } from "formsnap";

    export let data: SuperValidated<Infer<SummaryFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(summaryFormSchema),
    });

    const { form: formData, enhance } = form;
</script>

<div class="grid min-w-[25vw] max-w-[50vw] items-center gap-1.5" >
    <Card.Root style="background-color: #f4f4f5;">
        <Card.Header>
            <Card.Title>Formulaire de résumé</Card.Title>
        </Card.Header>
        <Card.Content>
            <p>Ce formulaire permet la génération la page de présentation d'un sujet</p>
        <Separator class="my-4"/>
        <form method="POST" class="space-y-8" use:enhance id="summary-form">
            <Form.Field {form} name="title">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Titre</Form.Label>
                    <Input {...props} bind:value={$formData.title} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Titre du sujet (maximum 100 caractère)</Form.Description>
            </Form.Field>
            <Form.Field {form} name="supervisor">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Encadrant</Form.Label>
                    <Input {...props} bind:value={$formData.supervisor} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Nom de l'encadrant</Form.Description>
            </Form.Field>
            <Form.Field {form} name="email">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Email</Form.Label>
                    <Input {...props} bind:value={$formData.email} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Email de l'encadrant</Form.Description>
            </Form.Field>
            <Form.Field {form} name="content">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Description</Form.Label>
                    <Textarea {...props} bind:value={$formData.content} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Description du sujet (entre 50 et 5000 caractères)</Form.Description>
            </Form.Field>
            <Form.Button>Enregistrer</Form.Button>
        </form>
    </Card.Content>
        <!-- <Card.Footer>
            {#if browser}
                <SuperDebug data={$formData} />
            {/if}
        </Card.Footer> -->
    </Card.Root>
</div>

<!-- 
            <Form.FieldErrors {form} name="email" class="text-red-500" />
             -->