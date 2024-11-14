<script lang="ts">
    import Icon from "@iconify/svelte";

    interface TextParams {
        text: string
    };

    let { text }: TextParams = $props()
</script>

<div class="flex flex-row justify-center space-x-2 rounded-md bg-light-gray p-2">
    <span class="text-gray mt-1">
        <Icon icon="mdi:information" font-size={18} />
    </span>
    <p class="text-dark-gray">
        {text}
    </p>
</div>