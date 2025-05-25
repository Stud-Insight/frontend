<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

<<<<<<< HEAD
	type $$Props = DialogPrimitive.TitleProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Title
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Title>
=======
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...restProps}
/>
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
