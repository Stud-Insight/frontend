<script>
    import DialogCreateNewUser from "$components/dialog/DialogCreateNewUser.svelte";
    import DialogUploadCSV from "$components/dialog/DialogUploadCSV.svelte";
    import UsersDataTable from "$components/tables/UsersDataTable.svelte";
</script>

<div class="flex flex-col space-y-4 p-16">
    <div class="flex flex-row justify-between">
        <h1 class="font-bold text-xl">Utilisateurs</h1>
        <div class="">
            <DialogUploadCSV />
            <DialogCreateNewUser />
        </div>
    </div>
    <UsersDataTable />
</div>