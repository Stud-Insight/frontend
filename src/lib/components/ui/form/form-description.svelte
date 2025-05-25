<script lang="ts">
	import * as FormPrimitive from "formsnap";
<<<<<<< HEAD
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLSpanElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn("text-muted-foreground text-sm", className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
=======
	import type { WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description
	bind:ref
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
