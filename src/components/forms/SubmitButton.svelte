<script lang="ts">
    import Icon from "@iconify/svelte";

    type ButtonType = 'default' | 'cas' | 'account-recovery' | 'account-validation';

    interface SubmitButtonProps {
        type: ButtonType;
        loading?: boolean;
    }

    let { type, loading = false }: SubmitButtonProps = $props();
</script>

{#if type == 'default'}
<button type="submit" class="flex flex-row justify-center text-center space-x-2 py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
    {#if loading}
        <Icon icon="svg-spinners:ring-resize" font-size={20} />
    {/if}
    <span>Se connecter</span>
    </button>
{:else if type == 'cas'}
    <button type="button" class="flex flex-row justify-center items-center space-x-1 py-2 px-4 bg-[#4BC2BC] hover:bg-opacity-85 transition-all ease-in-out font-bold text-white w-full rounded-lg drop-shadow-sm select-none">
        {#if loading}
            <Icon icon="svg-spinners:ring-resize" font-size={20} />
        {/if}
        <span>Se connecter via l'UM</span>
        <div class="h-7 w-7 bg-cas-logo bg-cover"></div>
    </button>
{:else if type == 'account-recovery'}
    <button type="submit" class="py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white rounded-lg drop-shadow-sm select-none">
        Envoyer un mail
    </button>
{:else if type == 'account-validation'}
    <button type="submit" class="py-2 px-4 bg-blue hover:bg-opacity-85 transition-all ease-in-out font-bold text-white rounded-lg drop-shadow-sm select-none">
        Valider
    </button>
{/if}