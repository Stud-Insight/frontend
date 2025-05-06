<script lang="ts" context="module">
    import { z } from "zod";

    const regexName = /^(?:[A-ZÀ-Ý][a-zà-ÿ]+(?:-[A-ZÀ-Ý][a-zà-ÿ]+)?\s?)+$/;
    export const userFormSchema = z.object({
        name: z.string()
            .min(2).max(100)
            .regex(regexName, "Prénom(s) invalide(s) : doit commencer par une majuscule, peut contenir des accents et au plus un tiret"),
        lastname: z.string()
            .min(2).max(100)
            .regex(regexName, "Nom(s) invalide(s) : chacun doit commencer par une majuscule, peut contenir des accents et au plus un tiret"),
        birthDate: z.date()
            .min(new Date(1900, 0, 1), { message: "Date de naissance invalide (trop ancienne)" })
            .max(new Date(), { message: "Date de naissance invalide (dans le futur)" }),
        email: z.string().email(),
    });
    export type UserFormSchema = typeof userFormSchema;

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
	import Calendar from "$lib/components/ui/calendar/calendar.svelte";
	import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover/index.js";
	import { format } from 'date-fns';
	import { fr } from 'date-fns/locale'; // Importation de l'objet de locale

	export let data: SuperValidated<Infer<UserFormSchema>>;

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

	$: formattedDate = $formData.birthDate ? format($formData.birthDate, 'dd/MM/yyyy', { locale: fr }) : '';
</script>

<div>Coucou c'est un formulaire CreateUser</div>
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
            </Form.Field>
			<Form.Field {form} name="birthDate">
				<Form.Control>
					{#snippet children({ props })}
					<Form.Label>Date de naissance</Form.Label>
					<Popover>
						<PopoverTrigger>
							<Input {...props} placeholder="JJ/MM/AAAA" value={formattedDate} />
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="single"
								locale={fr}
								firstDayOfWeek={1}
								onSelect={(date: Date | undefined) => {
									if (date) {
										$formData.birthDate = date;
									}
								}}
								defaultDate={$formData.birthDate}
							/>
						</PopoverContent>
					</Popover>
					{/snippet}
				</Form.Control>
				<Form.Description>Format : JJ/MM/AAAA</Form.Description>
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