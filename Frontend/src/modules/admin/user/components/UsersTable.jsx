import React, { useMemo, useRef } from "react";
import Datatable from "@/components/datatable/Datatable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createUserService, deleteUserService, updateUserService } from "../services/adminUserService";
import { useUserPermissions } from "@user/hooks/useUserPermissions";
import useModal from "@/hooks/useModal";
import UserManager from "./UserManager";
import { useTranslation } from "react-i18next";

const UsersTable = () => {
  const navigate = useNavigate();
  const refTable = useRef(null);
  const { hasPermission } = useUserPermissions();
  const { isOpen, open, close, data } = useModal();
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
      id: "email",
      accessorKey: "email",
      header: t('user:email'),
    },
    {
      id: "email_verified_at",
      accessorKey: "email_verified_at",
      header: t('user:verified'),
      editable: false,
      cell: ({ row }) =>
        row.original.email_verified_at ? (
          <Badge variant="outline" className="text-green-600 border-green-600">
            {t('user:verified')}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-red-600 border-red-600">
            {t('user:notVerified')}
          </Badge>
        ),
    },    
    {
      id: "is2FAVerified",
      accessorKey: "is2FAVerified",
      header: t('user:2fa'),
      editable: false,
      cell: ({ row }) =>
        row.original.is2FAVerified ? (
          <Badge variant="outline" className="text-green-600 border-green-600">
            {t('user:verified')}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-red-600 border-red-600">
            {t('user:notVerified')}
          </Badge>
        ),
    },
  ], [navigate]);

  const closeUserManager = () => {
    close();
    refTable.current?.refresh();
  };

  const handleDeleteUsers = async (id) => {
    try {
      const response = await deleteUserService({ id });
      toast.success(response?.message);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const handleCreateUsers = async (data) => {
    try {
      const response = await createUserService(data);
      toast.success(response?.message);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const handleUpdateUsers = async (data) => {
    try {
      const response = await updateUserService(data);
      toast.success(response?.message);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="p-6">
      <Datatable
        ref={refTable}
        columns={columns}
        remote={'/users/datatable'}
        onCreateRow={handleCreateUsers}
        onUpdateRow={handleUpdateUsers}
        onDeleteRow={handleDeleteUsers}
        options={{
          tableName: 'Users',
          showAddButton: true,
          createRequiredPermission: 'create:manage_users',
        }}
        renderRowActions={({ row, table }) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline" 
              disabled={!hasPermission('update:manage_users')}
              onClick={() => open(row.original) }
            >
              <Edit className="mr-1.5 h-3 w-3" />
              {t('user:manage')}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={!hasPermission('delete:manage_users')}
              onClick={() => table.deleteRow(row)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}            
      />

      { isOpen && (
        <UserManager 
          open={isOpen}
          user={data}
          close={closeUserManager}
        />
      )}
    </div>
  );
};

export default UsersTable;
