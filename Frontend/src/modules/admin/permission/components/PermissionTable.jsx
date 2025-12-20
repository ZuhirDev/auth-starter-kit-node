import React, { useMemo } from "react";
import Datatable from "@/components/datatable/Datatable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPermissionService, deletePermissionService, updatePermissionService } from "@admin/permission/services/permissionService";
import { toast } from "sonner";
import { useUserPermissions } from "@user/hooks/useUserPermissions";
import { useTranslation } from "react-i18next";

const PermissionTable = () => {
    const navigate = useNavigate();
    const { hasPermission } = useUserPermissions();
    const { t } = useTranslation();

    const columns = useMemo(() => [
        {
            id: "id",
            accessorKey: "id",
            header: t('common:id'),
            hiddenByDefault: true,
            cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
        },        
        {
            id: "name",
            accessorKey: "name",
            header: t('common:name'),
            cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
        },
        {
            id: "resource",
            accessorKey: "resource",
            header: t('permission:resource'),
            cell: ({ row }) => <span className="font-medium">{row.original.resource}</span>,
        },
        {
            id: "description",
            accessorKey: "description",
            header: t('permission:description'),
            cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
        },
    ], [navigate]);

    const handleDeletePermission = async (id) => {
        try {
            const response = await deletePermissionService({ id });
            toast.success(response?.message);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleCreatePermission = async (data) => {
        try {
            const response = await createPermissionService(data);
            toast.success(response?.message);

        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleUpdatePermission = async (data) => {
        try {
            const response = await updatePermissionService(data);
            toast.success(response?.message);

        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <div className="p-6">
            <Datatable
                columns={columns}
                remote={'/permissions/datatable'}
                onCreateRow={handleCreatePermission}
                onUpdateRow={handleUpdatePermission}
                onDeleteRow={handleDeletePermission}
                options={{
                    tableName: 'Permissions',
                    showAddButton: true,
                    createRequiredPermission: 'create:manage_permissions',
                }}
                renderRowActions={({ row, table }) => (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={!hasPermission("update:manage_permissions")}
                            onClick={() => table.setEditingRow(row)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={!hasPermission("delete:manage_permissions")}
                            onClick={() => table.deleteRow(row)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}            
            />
        </div>
    );
};

export default PermissionTable;
