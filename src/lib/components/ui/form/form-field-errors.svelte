<script lang="ts">
	import * as FormPrimitive from "formsnap";
<<<<<<< HEAD
	import { cn } from "$lib/utils.js";

	type $$Props = FormPrimitive.FieldErrorsProps & {
		errorClasses?: string | undefined | null;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let errorClasses: $$Props["class"] = undefined;
</script>

<FormPrimitive.FieldErrors
	class={cn("text-destructive text-sm font-medium", className)}
	{...$$restProps}
	let:errors
	let:fieldErrorsAttrs
	let:errorAttrs
>
	<slot {errors} {fieldErrorsAttrs} {errorAttrs}>
		{#each errors as error}
			<div {...errorAttrs} class={cn(errorClasses)}>{error}</div>
		{/each}
	</slot>
=======
	import type { WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		errorClasses,
		children: childrenProp,
		...restProps
	}: WithoutChild<FormPrimitive.FieldErrorsProps> & {
		errorClasses?: string | undefined | null;
	} = $props();
</script>

<FormPrimitive.FieldErrors
	bind:ref
	class={cn("text-destructive text-sm font-medium", className)}
	{...restProps}
>
	{#snippet children({ errors, errorProps })}
		{#if childrenProp}
			{@render childrenProp({ errors, errorProps })}
		{:else}
			{#each errors as error (error)}
				<div {...errorProps} class={cn(errorClasses)}>{error}</div>
			{/each}
		{/if}
	{/snippet}
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
</FormPrimitive.FieldErrors>
