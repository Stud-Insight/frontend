<script lang="ts">
	import * as Button from "$lib/components/ui/button/index.js";

<<<<<<< HEAD
	type $$Props = Button.Props;
	type $$Events = Button.Events;
</script>

<Button.Root type="submit" on:click on:keydown {...$$restProps}>
	<slot />
</Button.Root>
=======
	let { ref = $bindable(null), ...restProps }: Button.Props = $props();
</script>

<Button.Root bind:ref type="submit" {...restProps} />
>>>>>>> 18ac060678c5dcec50bcfbcb5c0ec1533fe4ff06
