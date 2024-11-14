<script lang="ts">
    import Spinner from "../ui/Spinner.svelte";

    type ButtonType = 'default' | 'cas' | 'account-recovery';

    interface SubmitButtonProps {
        type: ButtonType;
        loading?: boolean;
    }

    let { type, loading }: SubmitButtonProps = $props();
</script>

{#if type == 'default'}
    <button type="submit" class="py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
        Se connecter
    </button>
{:else if type == 'cas'}
    <button type="button" class="flex flex-row justify-center items-center space-x-1 py-2 px-4 bg-[#4BC2BC] hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
        {#if loading}
            <Spinner />
        {/if}
        <span>Se connecter via l'UM</span>
        <div class="h-7 w-7 bg-cas-logo bg-cover"></div>
    </button>
{:else if type == 'account-recovery'}
    <button type="submit" class="py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white rounded-lg drop-shadow-sm select-none">
        Envoyer un mail
    </button>
{/if}