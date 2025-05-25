<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
<<<<<<< HEAD
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...$$restProps}>
	<slot />
=======
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
	{...restProps}
>
	{@render children?.()}
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
</div>
