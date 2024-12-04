<script lang="ts">
    type AlertType = 'info' | 'success' | 'warning' | 'error';

    interface AlertProps {
        children: any;
        type: AlertType;
    }
    let { children, type }: AlertProps = $props();
</script>

{#if type === 'info'}
    <div class="text-blue p-2 bg-blue bg-opacity-20 border-blue border-2 rounded-lg">
        {@render children()}
    </div>
{/if}

{#if type === 'success'}
    <div class="text-green p-2 bg-green bg-opacity-20 border-green border-2 rounded-lg">
        {@render children()}
    </div>
{/if}

{#if type === 'warning'}
    <div class="text-yellow p-2 bg-yellow bg-opacity-20 border-yellow border-2 rounded-lg">
        {@render children()}
    </div>
{/if}

{#if type === 'error'}
    <div class="text-red p-2 bg-red bg-opacity-20 border-red border-2 rounded-lg">
        {@render children()}
    </div>
{/if}