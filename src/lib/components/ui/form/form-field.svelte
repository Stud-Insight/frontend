<<<<<<< HEAD
<script lang="ts" context="module">
	import type { FormPath, SuperForm } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import type { HTMLAttributes } from "svelte/elements";
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils.js";

	type $$Props = FormPrimitive.FieldProps<T, U> & HTMLAttributes<HTMLElement>;

	export let form: SuperForm<T>;
	export let name: U;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<FormPrimitive.Field {form} {name} let:constraints let:errors let:tainted let:value>
	<div class={cn("space-y-2", className)}>
		<slot {constraints} {errors} {tainted} {value} />
	</div>
=======
<script lang="ts" module>
	import type { FormPath as _FormPath } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = _FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends _FormPath<T>">
	import * as FormPrimitive from "formsnap";
	import type { WithoutChildren, WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children: childrenProp,
		...restProps
	}: FormPrimitive.FieldProps<T, U> &
		WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<FormPrimitive.Field {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<div bind:this={ref} class={cn("space-y-2", className)} {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</div>
	{/snippet}
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
</FormPrimitive.Field>
