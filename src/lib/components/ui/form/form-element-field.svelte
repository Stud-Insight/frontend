<<<<<<< HEAD
<script lang="ts" context="module">
	import type { FormPathLeaves, SuperForm } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = FormPathLeaves<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>">
	import type { HTMLAttributes } from "svelte/elements";
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils.js";

	type $$Props = FormPrimitive.ElementFieldProps<T, U> & HTMLAttributes<HTMLElement>;

	export let form: SuperForm<T>;
	export let name: U;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<FormPrimitive.ElementField {form} {name} let:constraints let:errors let:tainted let:value>
	<div class={cn("space-y-2", className)}>
		<slot {constraints} {errors} {tainted} {value} />
	</div>
=======
<script lang="ts" module>
	import type { FormPathLeaves as _FormPathLeaves } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = _FormPathLeaves<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends _FormPathLeaves<T>">
	import * as FormPrimitive from "formsnap";
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children: childrenProp,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> &
		FormPrimitive.ElementFieldProps<T, U> = $props();
</script>

<FormPrimitive.ElementField {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<div bind:this={ref} class={cn("space-y-2", className)} {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</div>
	{/snippet}
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
</FormPrimitive.ElementField>
