import Datatable from '@/components/datatable/Datatable';
import { Badge } from '@/components/ui/badge';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';

const LogTable = () => {
    const { t }  = useTranslation();

    const columns = useMemo(() => [
        {
            id: "user",
            accessorKey: "user_id",
            header: t('log:user'),
            cell: ({ row }) => <span className="font-medium">{row.original.user_id}</span>,
        },
        {
            id: "module",
            accessorKey: "module",
            header: t('log:module'),
            cell: ({ row }) => <span className="font-medium">{row.original.module}</span>,
        },
        {
            id: "action",
            accessorKey: "action",
            header: t('log:action'),
            cell: ({ row }) => <span className="font-medium">{row.original.action}</span>,
        },
        {
            id: "targetId",
            accessorKey: "target_id",
            header: t('log:targetId'),
            cell: ({ row }) => <span className="font-medium">{row.original.target_id || "-"}</span>,
        },
        {
            id: "status",
            accessorKey: "status",
            header: t('log:status'),
            cell: ({ row }) => {
                let status = row.original.status;

                let badgeClass = "capitalize border-gray-300 text-gray-600";

                if (status === "success") {
                    status = t('common:statusSuccess')
                    badgeClass = "text-green-600 border-green-600";
                } else if (status === "error") {
                    status = t('common:statusError')
                    badgeClass = "text-red-600 border-red-600";
                } else if (status === "denied") {
                    status = t('common:statusDenied')
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
            header: t('log:ipAddress'),
            cell: ({ row }) => <span className="font-medium">{row.original.ip_address || "-"}</span>,
        },
        {
            id: "createdAt",
            accessorKey: "createdAt",
            header: t('log:createdAt'),
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
