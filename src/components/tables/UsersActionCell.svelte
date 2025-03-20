<script lang="ts">
    import Ellipsis from '@lucide/svelte/icons/ellipsis';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import Icon from '@iconify/svelte';

    let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
                <span class="sr-only">Plus d'infos</span>
                <Ellipsis />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
            <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
                <Icon icon="tabler:copy" width="24" height="24" />
                <span>Copier l'ID unique</span>
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <Icon icon="akar-icons:edit" width="24" height="24" />
            <span>Modifier</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item >
            <Icon icon="tabler:trash" width="24" height="24" color="red" />
            <span class="text-red">Supprimer</span>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
