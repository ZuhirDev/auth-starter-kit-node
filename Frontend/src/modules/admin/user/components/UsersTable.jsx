import React, { useMemo } from "react";
import Datatable from "@/components/datatable/Datatable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createUserService, deleteUserService, updateUserService } from "../services/adminUserService";

const UsersTable = () => {
  const remote = "/users";
  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      id: "naadfame",
      accessorKey: "naadfme",
      header: "Nombre",
      cell: ({ row }) => <span className="font-medium">{console.log(row.original)}</span>,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Correo electrónico",
    },
    {
      id: "email_verified_at",
      accessorKey: "email_verified_at",
      header: "Verificado",
      cell: ({ row }) =>
        row.original.email_verified_at ? (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Verified
          </Badge>
        ) : (
          <Badge variant="outline" className="text-red-600 border-red-600">
            No Verified
          </Badge>
        ),
    },    
    {
      id: "is2FAVerified",
      accessorKey: "is2FAVerified",
      header: "2FA",
      cell: ({ row }) =>
        row.original.is2FAVerified ? (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Verified
          </Badge>
        ) : (
          <Badge variant="outline" className="text-red-600 border-red-600">
            No Verified
          </Badge>
        ),
    },
  ], [navigate]);

  
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
        columns={columns}
        remote={remote}
        onCreateRow={handleCreateUsers}
        onUpdateRow={handleUpdateUsers}
        onDeleteRow={handleDeleteUsers}
        options={{
          tableName: 'Users',
          showAddButton: true,
        }}
        renderRowActions={({ row, table }) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => alert("Hacer componente para la edicion de Users") }
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

export default UsersTable;
