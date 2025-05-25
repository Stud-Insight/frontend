<script lang="ts">
	import * as FormPrimitive from "formsnap";
<<<<<<< HEAD
	import { cn } from "$lib/utils.js";

	type $$Props = FormPrimitive.LegendProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<FormPrimitive.Legend
	{...$$restProps}
	class={cn("data-[fs-error]:text-destructive text-sm font-medium leading-none", className)}
	let:legendAttrs
>
	<slot {legendAttrs} />
</FormPrimitive.Legend>
=======
	import type { WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.LegendProps> = $props();
</script>

<FormPrimitive.Legend
	bind:ref
	class={cn("data-[fs-error]:text-destructive text-sm font-medium leading-none", className)}
	{...restProps}
/>
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
