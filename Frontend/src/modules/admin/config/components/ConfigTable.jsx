import Datatable from '@/components/datatable/Datatable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateConfigService } from '@admin/config/services/configService';
import { useUserPermissions } from '@user/hooks/useUserPermissions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React, { useMemo } from 'react'
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

const ConfigTable = () => {

    const { hasPermission } = useUserPermissions();

    const columns = useMemo(() => [
        {
            id: "key",
            accessorKey: "key",
            header: "Key",
            editable: false,
            cell: ({ row }) => <span className="font-medium">{row.original.key}</span>,
        },
        {
            id: "value",
            accessorKey: "value",
            header: "Value",
            editable: true,
            cell: ({ row }) => (
                <Badge variant={row.original.value ? "default" : "destructive"}>
                    {row.original.value ? "Yes" : "No"}
                </Badge>
            ),
            editComponent: ({ value, onChange }) => (
                <Select
                    value={value ? "true" : "false"}
                    onValueChange={(val) => onChange(val === "true")}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                </Select>
            ),
        },
        {
            id: "description",
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
        },
        {
            id: "isPublic",
            accessorKey: "isPublic",
            header: "Public",
            editable: true,
            cell: ({ row }) => (
                <Badge variant={row.original.isPublic ? "default" : "destructive"}>
                    {row.original.isPublic ? "Yes" : "No"}
                </Badge>
            ),
            editComponent: ({ value, onChange }) => (
                <Select
                    value={value ? "true" : "false"}
                    onValueChange={(val) => onChange(val === "true")}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                </Select>
            ),
        },
        {
            id: "createdAt",
            accessorKey: "createdAt",
            header: "Created At",
            editable: false,
            cell: ({ row }) => <span className="font-medium">{new Date(row.original.createdAt).toLocaleString()}</span>,
        },
    ], []);

    const handleUpdatePermission = async (data) => {
        try {
            const response = await updateConfigService(data);
            toast.success(response?.message);

        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <div className="p-6">
            <Datatable
                columns={columns}
                remote={'/config/datatable'}
                onUpdateRow={handleUpdatePermission}
                options={{
                    tableName: 'Config',
                }}
                renderRowActions={({ row, table }) => (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={!hasPermission("update:manage_config")}
                            onClick={() => table.setEditingRow(row)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                )}                 
            />
        </div>
    );
}

export default ConfigTable
