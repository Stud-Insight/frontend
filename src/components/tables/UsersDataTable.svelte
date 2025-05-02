<script lang="ts">
	import { onMount } from 'svelte';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
    import { Skeleton } from '$lib/components/ui/skeleton';
    import Icon from '@iconify/svelte';
	import {
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import { columns, type User } from './usersColumns';

    let usersData = $state<User[]>([]);
    let isLoading = $state(true);
    let error = $state<string | null>(null);

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let globalFilter = $state<string>('');
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});


    onMount(async () => {
        isLoading = true;
        error = null;
        usersData = [];

        try {
            const response = await fetch('http://localhost:8080/account/');

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errBody = await response.json();
                    errorMsg = errBody.message || errBody.error || errorMsg;
                } catch (e) { }
                throw new Error(errorMsg);
            }

            const fetchedData = await response.json();

            let usersArray: any[];
            if (Array.isArray(fetchedData)) {
                usersArray = fetchedData;
            } else if (fetchedData && typeof fetchedData === 'object' && Array.isArray(fetchedData.data)) {
                usersArray = fetchedData.data;
                console.log('Accès via fetchedData.data');
            } else if (fetchedData && typeof fetchedData === 'object' && Array.isArray(fetchedData.users)) {
                 usersArray = fetchedData.users;
                 console.log('Accès via fetchedData.users');
            } else {
                 console.error("Format de réponse inattendu du backend :", fetchedData);
                 throw new Error("Format de données invalide reçu du serveur.");
            }

            usersData = usersArray.map((backendUser: any) => ({
                id: backendUser._id,
                name: `${backendUser.firstName || ''} ${backendUser.lastName || ''}`.trim(),
                email: backendUser.email,
                activationDate: backendUser.activationDate,
                lastLogin: backendUser.lastLogin,
                roles: backendUser.roles?.map((role: any) => typeof role === 'object' && role !== null ? role.name : role) || [],
            }));

        } catch (err: any) {
            console.error("Failed to fetch or process users:", err); // Message d'erreur plus précis
            error = err.message || "An unknown error occurred while fetching users.";
        } finally {
            isLoading = false;
        }
    });

	const table = createSvelteTable({
		get data() {
			return usersData;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			pagination = typeof updater === 'function' ? updater(pagination) : updater;
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
		},
		onGlobalFilterChange: (updater) => {
			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
		},
		onRowSelectionChange: (updater) => {
			rowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
		},
		state: {
			get pagination() { return pagination; },
			get sorting() { return sorting; },
			get columnFilters() { return columnFilters; },
			get globalFilter() { return globalFilter; },
			get columnVisibility() { return columnVisibility; },
			get rowSelection() { return rowSelection; }
		}
	});
</script>

<div class="w-full">
	<div class="flex items-center py-4">
		<Input
			placeholder="Rechercher par nom ou email..."
			value={globalFilter}
			oninput={(event) => table.setGlobalFilter(event.currentTarget.value)}
			class="max-w-sm"
            disabled={isLoading || !!error}
		/>
	</div>

	{#if isLoading}
        <div class="rounded-md border p-4">
            <div class="space-y-3">
                <Skeleton class="h-8 w-full" />
                <Skeleton class="h-5 w-[80%]" />
                <Skeleton class="h-5 w-[70%]" />
                <Skeleton class="h-5 w-[85%]" />
            </div>
        </div>
	{:else if error}
        <div class="flex items-center space-x-2 rounded-md border border-destructive p-4 text-destructive">
            <Icon icon="mdi:alert-circle" class="h-5 w-5" />
            <div>
                <p class="font-medium">Erreur</p>
                <p class="text-sm">{error}</p>
            </div>
        </div>
	{:else}
        <div class="rounded-md border">
            <Table.Root>
                <Table.Header>
                    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                        <Table.Row>
                            {#each headerGroup.headers as header (header.id)}
                                <Table.Head class="[&:has([role=checkbox])]:pl-3">
                                    {#if !header.isPlaceholder}
                                        <FlexRender
                                            content={header.column.columnDef.header}
                                            context={header.getContext()}
                                        />
                                    {/if}
                                </Table.Head>
                            {/each}
                        </Table.Row>
                    {/each}
                </Table.Header>
                <Table.Body>
                    {#if table.getRowModel().rows.length > 0}
                        {#each table.getRowModel().rows as row (row.id)}
                            <Table.Row data-state={row.getIsSelected() ? 'selected' : ''}>
                                {#each row.getVisibleCells() as cell (cell.id)}
                                    <Table.Cell class="[&:has([role=checkbox])]:pl-3">
                                        <FlexRender
                                            content={cell.column.columnDef.cell}
                                            context={cell.getContext()}
                                        />
                                    </Table.Cell>
                                {/each}
                            </Table.Row>
                        {/each}
                    {:else}
                        <Table.Row>
                            <Table.Cell colspan={columns.length} class="h-24 text-center">
                                Aucun utilisateur trouvé.
                            </Table.Cell>
                        </Table.Row>
                    {/if}
                </Table.Body>
            </Table.Root>
        </div>

        <div class="flex items-center justify-end space-x-2 pt-4">
            <div class="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} sur{' '}
                {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
            </div>
            <Button
                variant="outline"
                size="sm"
                onclick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Précédent
            </Button>
            <Button
                variant="outline"
                size="sm"
                onclick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Suivant
            </Button>
        </div>
	{/if}
</div>