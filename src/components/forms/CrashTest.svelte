<script lang="ts" context="module">
    import { z } from "zod";

    const regexName = /^(?:[A-ZÀ-Ý][a-zà-ÿ]+(?:-[A-ZÀ-Ý][a-zà-ÿ]+)?\s?)+$/;
    export const userFormSchema = z.object({
        name: z.string()
            .min(2).max(100)
            .regex(regexName, "Prénom(s) invalide(s)"),
        lastname: z.string()
            .min(2).max(100)
            .regex(regexName, "Nom(s) invalide(s)"),
        birthDate: z.string()
            .regex(/^([0-9]{1,2})[\/]([0-9]{1,2})[\/]([0-9]{4})$/, "Format invalide : JJ/MM/AAAA")
            .refine((date) => checkDate(date), "Date invalide"),
        email: z.string().email(),
    });
    export type UserFormSchema = typeof userFormSchema;

    function checkDate(d: string): boolean {
        const splitDate = d.split(/[\/]/);
        if (splitDate.length !== 3) return false;

        const [dayStr, monthStr, yearStr] = splitDate;
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

        const date = new Date(year, month - 1, day);

        // vérifie que la date est valide
        if (!(date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day)) return false;

        // vérifie les limites temporelles
        const now = new Date();
        const minDate = new Date(1900, 0, 1);

        return date <= now && date >= minDate;
    }

    // mettre en majuscule la première lettre de chaque mot
    export function formatName(value: string): string {
        return value
            .split(/\s+/)
            .map(word => word
                    .split('-')
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                    .join('-'))
            .join(' ');
    }
</script>

<script lang="ts">
    import {
        type Infer,
        type SuperValidated,
        superForm
    } from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";
    import { browser } from "$app/environment";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import Input from '$lib/components/ui/input/input.svelte';

    export let data: SuperValidated<Infer<UserFormSchema>> = {
        id: '',
        valid: false,
        posted: false,
        errors: {},
        data: {
            name: '',
            lastname: '',
            birthDate: '',
            email: ''
        }
    };

    const form = superForm(data, {
        validators: zodClient(userFormSchema),
    });

    const { form: formData, enhance, validate } = form;

    $: if ($formData.name !== undefined) {
        $formData.name = formatName($formData.name);
    }

    $: if ($formData.lastname !== undefined) {
        $formData.lastname = formatName($formData.lastname);
    }
</script>

<div class="grid min-w-[25vw] max-w-[50vw] items-center gap-1.5" >
    <Card.Root style="background-color: #f4f4f5;">
        <Card.Header>
            <Card.Title>Création d'utilisateur</Card.Title>
        </Card.Header>
        <Card.Content>
            <p>Ce formulaire permet la création d'un utilisateur</p>
        <Separator class="my-4"/>
        <form method="POST" class="space-y-8" use:enhance id="summary-form">

            <Form.Field {form} name="name">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Prénom</Form.Label>
                    <Input {...props} bind:value={$formData.name} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Doit commencer par une majuscule, peut contenir des accents et au plus un tiret</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="lastname">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Nom</Form.Label>
                    <Input {...props} bind:value={$formData.lastname} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Chacun doit commencer par une majuscule, peut contenir des accents et au plus un tiret</Form.Description>
                <Form.FieldErrors />
            </Form.Field><Form.Field {form} name="birthDate">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Date de naissance</Form.Label>
                    <br>
                    <Input {...props} bind:value={$formData.birthDate} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Format : JJ/MM/AAAA</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="email">
                <Form.Control>
                    {#snippet children({ props })}
                    <Form.Label>Email</Form.Label>
                    <Input {...props} bind:value={$formData.email} />
                    {/snippet}
                </Form.Control>
                <Form.Description>Email de l'encadrant</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button>Enregistrer</Form.Button>
        </form>
        </Card.Content>
        <Card.Footer>
            {#if browser}
                <SuperDebug data={$formData} />
            {/if}
        </Card.Footer>
    </Card.Root>
</div>