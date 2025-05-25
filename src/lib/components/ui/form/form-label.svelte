<script lang="ts">
<<<<<<< HEAD
	import type { Label as LabelPrimitive } from "bits-ui";
	import { getFormControl } from "formsnap";
	import { cn } from "$lib/utils.js";
	import { Label } from "$lib/components/ui/label/index.js";

	type $$Props = LabelPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export { className as class };

	const { labelAttrs } = getFormControl();
</script>

<Label {...$labelAttrs} class={cn("data-[fs-error]:text-destructive", className)} {...$$restProps}>
	<slot {labelAttrs} />
</Label>
=======
	import type { WithoutChild } from "bits-ui";
	import * as FormPrimitive from "formsnap";
	import { Label } from "$lib/components/ui/label/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.LabelProps> = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
	{#snippet child({ props })}
		<Label {...props} class={cn("data-[fs-error]:text-destructive", className)}>
			{@render children?.()}
		</Label>
	{/snippet}
</FormPrimitive.Label>
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
