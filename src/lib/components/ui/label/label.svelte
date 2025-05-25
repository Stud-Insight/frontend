<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

<<<<<<< HEAD
	type $$Props = LabelPrimitive.Props;
	type $$Events = LabelPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root
=======
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className
	)}
<<<<<<< HEAD
	{...$$restProps}
	on:mousedown
>
	<slot />
</LabelPrimitive.Root>
=======
	{...restProps}
/>
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
