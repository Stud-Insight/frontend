<script lang="ts">
    import { buttonVariants } from '$lib/components/ui/button';
    import * as Dialog from '$lib/components/ui/dialog';
    import Icon from '@iconify/svelte';
</script>

<Dialog.Root>
    <Dialog.Trigger class={`bg-lime-500 hover:bg-lime-500 hover:bg-opacity-90 text-white hover:text-white ${buttonVariants({ variant: 'default' })}`}>
        <Icon icon="fa6-solid:file-csv" width="512" height="512" />
        <span>Importer un CSV</span>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Utilisation d'un fichier CSV</Dialog.Title>
            <Dialog.Description>
                Déposer un fichier CSV contenant des utilisateurs dans un format valide
                pour les importer dans la base de données de Stud'Insight.
            </Dialog.Description>
            <div>
                Coming soon...
            </div>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
