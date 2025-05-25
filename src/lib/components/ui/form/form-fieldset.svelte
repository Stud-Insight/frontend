<<<<<<< HEAD
<script lang="ts" context="module">
	import type { FormPath, SuperForm } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils.js";

	type $$Props = FormPrimitive.FieldsetProps<T, U>;

	export let form: SuperForm<T>;
	export let name: U;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<FormPrimitive.Fieldset
	{form}
	{name}
	let:constraints
	let:errors
	let:tainted
	let:value
	class={cn("space-y-2", className)}
>
	<slot {constraints} {errors} {tainted} {value} />
</FormPrimitive.Fieldset>
=======
<script lang="ts" module>
	import type { FormPath as _FormPath } from "sveltekit-superforms";
	type T = Record<string, unknown>;
	type U = _FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends _FormPath<T>">
	import * as FormPrimitive from "formsnap";
	import type { WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		...restProps
	}: WithoutChild<FormPrimitive.FieldsetProps<T, U>> = $props();
</script>

<FormPrimitive.Fieldset bind:ref {form} {name} class={cn("space-y-2", className)} {...restProps} />
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
