import { Checkbox } from "$lib/components/ui/checkbox";
import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import UsersActionCell from './UsersActionCell.svelte';

export type User = {
    id: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    email: string;
};

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            renderComponent(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
                onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
                'aria-label': 'Select all'
            }),
        cell: ({ row }) =>
            renderComponent(Checkbox, {
                checked: row.getIsSelected(),
                onCheckedChange: (value) => row.toggleSelected(!!value),
                'aria-label': 'Select row'
            }),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'lastName',
        header: 'Nom'
    },
    {
        accessorKey: 'firstName',
        header: 'Prénom'
    },
    {
        accessorKey: 'birthDate',
        header: 'Date de naissance'
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => row.getValue('email')
    },
    {
        id: 'actions',
        header: '',
        enableHiding: false,
        enableSorting: false,
        cell: ({ row }) => {
            const user: User = row.original;
            return renderComponent(UsersActionCell, { id: user.id, user });
        }
    }
];