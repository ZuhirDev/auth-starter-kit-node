import React, { useMemo } from "react";
import Datatable from "@/components/datatable/Datatable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPermissionService, deletePermissionService, updatePermissionService } from "@admin/permission/services/permissionService";
import { toast } from "sonner";

const PermissionTable = () => {
    const remote = "/permissions";
    const navigate = useNavigate();

    const columns = useMemo(() => [
        {
            id: "name",
            accessorKey: "name",
            header: "Nombre",
            cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
        },
        {
            id: "resource",
            accessorKey: "resource",
            header: "Resource",
            cell: ({ row }) => <span className="font-medium">{row.original.resource}</span>,
        },
        {
            id: "description",
            accessorKey: "description",
            header: "Description",
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
                remote={remote}
                onCreateRow={handleCreatePermission}
                onUpdateRow={handleUpdatePermission}
                onDeleteRow={handleDeletePermission}
                options={{
                    tableName: 'Permissions',
                    showAddButton: true,
                }}
                renderRowActions={({ row, table }) => (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => table.setEditingRow(row)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
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
