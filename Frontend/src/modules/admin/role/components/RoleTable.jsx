import React, { useMemo, useRef, useState } from "react";
import Datatable from "@/components/datatable/Datatable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { addPermissionToRoleService, createRoleService, deleteRoleService, removePermissionToRoleService, updateRoleService } from "@admin/role/services/roleService";
import useModal from "@/hooks/useModal";
import PermissionManager from "@admin/permission/components/PermissionManager";
import { useUserPermissions } from "@/modules/user/hooks/useUserPermissions";

const RoleTable = () => {

    const refTable = useRef(null);
    const { isOpen, open, close, data } = useModal();
    const { hasPermission } = useUserPermissions();

    const closeRoleManager = () => {
        close();
        refTable.current?.refresh();
    };

    const columns = useMemo(
        () => [
        {
            id: "id",
            accessorKey: "id",
            header: "ID",
            hiddenByDefault: true,
            cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
        },            
        {
            id: "name",
            accessorKey: "name",
            header: "Nombre",
            cell: ({ row }) => (
            <span className="font-medium">{row.original.name}</span>
            ),
        },
        {
            id: "description",
            accessorKey: "description",
            header: "Descripción",
            cell: ({ row }) => (
            <span className="font-medium">{row.original.description}</span>
            ),
        },
        {
            id: "permissions",
            accessorKey: "permissions",
            header: "Permisos",
            editable: false,
            cell: ({ row }) => (
            <span className="font-medium">{row.original.permissions.length}</span>
            ),
        },
        ],
        []
    );

    const handleDeleteRole = async (id) => {
        try {
        const response = await deleteRoleService({ id });
        toast.success(response?.message);
        } catch (error) {
        console.log("Error", error);
        }
    };

    const handleCreateRole = async (data) => {
        try {
        const response = await createRoleService(data);
        toast.success(response?.message);
        } catch (error) {
        console.log("Error", error);
        }
    };

    const handleUpdateRole = async (data) => {
        try {
        const response = await updateRoleService(data);
        toast.success(response?.message);
        } catch (error) {
        console.log("Error", error);
        }
    };

    const handlePermissionManager = async ({ id, permissionsToAdd, permissionsToRemove }) => {

        try {
            if (permissionsToAdd.length > 0) {
                const add = await addPermissionToRoleService({ id , permissionIds: permissionsToAdd });
                toast.success(add?.message);
            }

            if (permissionsToRemove.length > 0) {
                const remove = await removePermissionToRoleService({ id , permissionIds: permissionsToRemove });
                toast.success(remove?.message);
            }
        } catch (error) {
            console.log("Error", error);
        }        
    }

    return (
        <div className="p-6">
            <Datatable
                ref={refTable}
                columns={columns}
                remote={'/roles/datatable'}
                onCreateRow={handleCreateRole}
                onUpdateRow={handleUpdateRole}
                onDeleteRow={handleDeleteRole}
                options={{
                    tableName: "Roles",
                    showAddButton: true,
                    createRequiredPermission: 'create:manage_roles'
                }}
                renderRowActions={({ row, table }) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!hasPermission("update:manage_roles")}                        
                        onClick={() => table.setEditingRow(row)}
                        title="Editar"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!hasPermission("update:manage_roles")}
                        onClick={() => open(row.original)}
                        title="Ver permisos"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!hasPermission("delete:manage_roles")}                        
                        onClick={() => table.deleteRow(row)}
                        title="Eliminar"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                </div>
                )}
            />

            <PermissionManager 
                open={isOpen}
                onClose={closeRoleManager}
                entity={data}
                title={`${data?.name}`}
                description={'Assign or remove permissions for this role.'}
                onSave={handlePermissionManager}
            />
        </div>
    );
};

export default RoleTable;
