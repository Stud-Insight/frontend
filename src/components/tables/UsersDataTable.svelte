<script lang="ts">
    import {
        createSvelteTable,
        FlexRender
    } from '$lib/components/ui/data-table/index.js';
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type ColumnFiltersState, type PaginationState, type RowSelectionState, type SortingState, type VisibilityState } from '@tanstack/table-core';
    import { columns, type User } from './usersColumns';

    const data: User[] = [
        {
            "id": "67d9448f2491968b25a562e1",
            "name": "admin",
            "email": "admin@example.com",
            "activationDate": "2025-03-18T10:01:51.542Z",
            "lastLogin": "2025-03-20T09:26:46.011Z",
            "roles": [
                "67d9431020b3adf8fdac99f2"
            ]
        },
        {
            "id": "67d9448f2491968b25a562e1",
            "name": "Martin Patrick",
            "email": "martin.patrick@example.com",
            "activationDate": "2024-02-18T10:01:51.542Z",
            "lastLogin": "2024-03-12T09:26:46.011Z",
            "roles": [
                "67d9431020b3adf8fdac99f2"
            ]
        },
    ];

    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
    let sorting = $state<SortingState>([]);
    let columnFilters = $state<ColumnFiltersState>([]);
    let columnVisibility = $state<VisibilityState>({});
    let rowSelection = $state<RowSelectionState>({});

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination = updater(pagination);
            } else {
                pagination = updater;
            }
        },
        onSortingChange: (updater) => {
            if (typeof updater === 'function') {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
        },
        onColumnFiltersChange: (updater) => {
            if (typeof updater === 'function') {
                columnFilters = updater(columnFilters);
            } else {
                columnFilters = updater;
            }
        },
        onColumnVisibilityChange: (updater) => {
            if (typeof updater === 'function') {
                columnVisibility = updater(columnVisibility);
            } else {
                columnVisibility = updater;
            }
        },
        onRowSelectionChange: (updater) => {
            if (typeof updater === 'function') {
                rowSelection = updater(rowSelection);
            } else {
                rowSelection = updater;
            }
        },
        state: {
            get pagination() {
                return pagination;
            },
            get sorting() {
                return sorting;
            },
            get columnFilters() {
                return columnFilters;
            },
            get columnVisibility() {
                return columnVisibility;
            },
            get rowSelection() {
                return rowSelection;
            }
        }
    });
    
</script>

<div class="w-full">
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
                            Aucune donnée.
                        </Table.Cell>
                    </Table.Row>
                {/if}
            </Table.Body>
        </Table.Root>
    </div>

    <!-- Contrôles de pagination -->
    <div class="flex items-center justify-end space-x-2 pt-4">
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
</div>
