<script>
    import DialogUploadCSV from "$components/dialog/DialogUploadCSV.svelte";
    import UsersDataTable from "$components/tables/UsersDataTable.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { renderComponent } from "$lib/components/ui/data-table";
    import Icon from "@iconify/svelte";
</script>

<div class="flex flex-col space-y-4 p-16">
    <div class="flex flex-row justify-between">
        <h1 class="font-bold text-xl">Utilisateurs</h1>
        <div class="">
            <DialogUploadCSV />
            <Button class="bg-blue hover:bg-opacity-90">
                <Icon icon="cuida:user-add-outline" width="24" height="24" />
                <span>Ajouter un utilisateur</span>
            </Button>
        </div>
    </div>
    <UsersDataTable />
</div>