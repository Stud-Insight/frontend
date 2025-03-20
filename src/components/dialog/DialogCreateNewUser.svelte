<script lang="ts">
    import { buttonVariants } from '$lib/components/ui/button';
    import * as Dialog from '$lib/components/ui/dialog';
    import Icon from '@iconify/svelte';

</script>

<Dialog.Root>
    <Dialog.Trigger class={`bg-blue hover:bg-blue hover:bg-opacity-90 text-white hover:text-white ${buttonVariants({ variant: 'outline' })}`}>
        <Icon icon="cuida:user-add-outline" width="24" height="24" />
        <span>Ajouter un utilisateur</span>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Création d'un utilisateur</Dialog.Title>
            <Dialog.Description>
                Euh jsp un formulaire quoi
            </Dialog.Description>
            <div>
                Coming soon...
            </div>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
