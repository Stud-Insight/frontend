<script lang="ts">
    type ButtonType = 'default' | 'cas';

    interface SubmitButtonProps {
        type: ButtonType;
    }

    let { type }: SubmitButtonProps = $props();
</script>

{#if type == 'default'}
    <button type="submit" class="py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
        Se connecter
    </button>
{:else if type == 'cas'}
    <button type="button" class="flex flex-row justify-center items-center space-x-1 py-2 px-4 bg-[#4BC2BC] hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
        <span>Se connecter via l'UM</span>
        <div class="h-7 w-7 bg-cas-logo bg-cover"></div>
    </button>
{/if}