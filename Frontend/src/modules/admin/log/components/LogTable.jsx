import Datatable from '@/components/datatable/Datatable';
import { Badge } from '@/components/ui/badge';
import React, { useMemo } from 'react'

const LogTable = () => {

    const columns = useMemo(() => [
        {
            id: "user",
            accessorKey: "user_id",
            header: "User",
            cell: ({ row }) => <span className="font-medium">{row.original.user_id}</span>,
        },
        {
            id: "module",
            accessorKey: "module",
            header: "Module",
            cell: ({ row }) => <span className="font-medium">{row.original.module}</span>,
        },
        {
            id: "action",
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => <span className="font-medium">{row.original.action}</span>,
        },
        {
            id: "targetId",
            accessorKey: "target_id",
            header: "Target ID",
            cell: ({ row }) => <span className="font-medium">{row.original.target_id || "-"}</span>,
        },
        {
            id: "status",
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;

                let badgeClass = "capitalize border-gray-300 text-gray-600";

                if (status === "success") {
                badgeClass = "text-green-600 border-green-600";
                } else if (status === "error") {
                badgeClass = "text-red-600 border-red-600";
                } else if (status === "denied") {
                badgeClass = "text-yellow-600 border-yellow-600";
                }

                return (
                <Badge variant="outline" className={`${badgeClass} capitalize`}>
                    {status}
                </Badge>
                );
            },
        },
        {
            id: "ip",
            accessorKey: "ip_address",
            header: "IP Address",
            cell: ({ row }) => <span className="font-medium">{row.original.ip_address || "-"}</span>,
        },
        {
            id: "createdAt",
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => <span className="font-medium">{new Date(row.original.createdAt).toLocaleString()}</span>,
        },
    ], []);

    return (
        <div className="p-6">
            <Datatable
                columns={columns}
                remote={'/logs/datatable'}
                initialSorting={[{id: 'createdAt', desc: true}]}   
                options={{
                    tableName: 'Logs',
                }}
            />
        </div>
    );
}

export default LogTable
