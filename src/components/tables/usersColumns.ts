import { Checkbox } from "$lib/components/ui/checkbox";
import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import UsersActionCell from './UsersActionCell.svelte';
import { Row } from "$lib/components/ui/table";

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}

export type User = {
    id: string;
    name: string;
    email: string;
    activationDate: string;
    lastLogin: string;
    roles: string[];
}

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            renderComponent(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
                onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
                'aria-label': 'Select all',
                class: "data-[state=checked]:bg-blue"
            }),
        cell: ({ row }) =>
            renderComponent(Checkbox, {
                checked: row.getIsSelected(),
                onCheckedChange: (value) => row.toggleSelected(!!value),
                'aria-label': 'Select row',
                class: "data-[state=checked]:bg-blue"
            }),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'name',
        header: 'Nom'
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => row.getValue('email')
    },
    {
        accessorKey: 'activationDate',
        header: 'Date d\'activation',
        cell: ({ row }) => formatDate(row.getValue('activationDate'))
    },
    {
        accessorKey: 'lastLogin',
        header: 'Dernière connexion',
        cell: ({ row }) => formatDate(row.getValue('lastLogin'))
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