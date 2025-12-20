import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Key, Info, CheckCircle2, Mail } from "lucide-react"
import {  getAllRolesService } from "@admin/role/services/roleService"
import { assignPermissionsToUserService, assignRolesToUserService, removePermissionsToUserService, removeRolesToUserService, } from "@admin/user/services/adminUserService"
import { PermissionManagerContent } from "@admin/permission/components/PermissionManager"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const UserManager = ({ open, close, user }) => {
  const [activeTab, setActiveTab] = useState("roles");
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [originalSelectedRoles, setOriginalSelectedRoles] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return
    const fetchData = async () => {
      try {
        const response = await getAllRolesService()
        setAllRoles(response.data)
      } catch (error) {
        console.log("Error", error)
      }
    }
    fetchData()
  }, [open])

  useEffect(() => {
    if (user && allRoles.length > 0) {
      const userRolesSet = new Set(user.roles.map((r) => r.id || r))
      const initial = {}
      allRoles.forEach((role) => {
        initial[role.id] = userRolesSet.has(role.id)
      })
      setSelectedRoles(initial)
      setOriginalSelectedRoles(initial)
    }
  }, [user, allRoles])

  const toggleRole = (roleId) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
    }))
  }

  const handleSave = async () => {
    const rolesToAdd = []
    const rolesToRemove = []

    Object.entries(selectedRoles).forEach(([id, selected]) => {
      const wasSelected = originalSelectedRoles[id] || false
      if (selected && !wasSelected) rolesToAdd.push(id)
      if (!selected && wasSelected) rolesToRemove.push(id)
    })

    try {
      if (rolesToAdd.length > 0) {
        const res = await assignRolesToUserService({ id: user.id, roleIds: rolesToAdd })
        toast.success(res.message)
      }

      if (rolesToRemove.length > 0) {
        const res = await removeRolesToUserService({ id: user.id, roleIds: rolesToRemove })
        toast.success(res.message)
      }

    } catch (err) {
      console.error(err)
    }
  }

  const handlePermissionManager = async ({ id, permissionsToAdd, permissionsToRemove }) => {

    try {
      if (permissionsToAdd.length > 0) {
        const add = await assignPermissionsToUserService({ id , permissionIds: permissionsToAdd });
        toast.success(add?.message);
      }

      if (permissionsToRemove.length > 0) {
        const remove = await removePermissionsToUserService({ id , permissionIds: permissionsToRemove });
        toast.success(remove?.message);
      }

    } catch (error) {
      console.log("Error", error);
    }        
  }

  const selectedCount = Object.values(selectedRoles).filter(Boolean).length

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-5xl max-h-[90vh] bg-background border-border text-foreground overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-semibold mb-1">
                {user.name}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-400 border-green-500/20"
            >
              {t('common:active')}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v)}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0">
            <TabsTrigger
                value="roles"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
                <Shield className="h-4 w-4 mr-2" />
                {t('roles:roles')}
                <Badge
                    variant="outline"
                    className="ml-2 bg-muted border-border"
                >
                    {selectedCount}
                </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
                <Key className="h-4 w-4 mr-2" />
                {t('roles:permissions')}
                <Badge
                  variant="outline"
                  className="ml-2 bg-muted border-border"
                >
                  {user.permissions?.length || 0}
                </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="roles"
            className="flex-1 overflow-y-auto mt-0 pt-6 pr-2 -mr-2 flex flex-col"
          >
            <div className="space-y-3 pb-4 flex-1">
              {allRoles.map((role) => {
                const isSelected = selectedRoles[role.id] || false
                return (
                  <div
                    key={role.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary/50 bg-primary/10"
                        : "border-border bg-background hover:bg-muted/50"
                    }`}
                    onClick={() => toggleRole(role.id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRole(role.id)}
                      className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-base text-foreground">{role.name}</h4>
                        <Badge variant="outline" className="text-xs text-foreground/70 border-border/30">
                          {role.permissions.length} {t('roles:permissions').toLowerCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-border pt-4 mt-auto">
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t('common:saveChanges')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent
            value="permissions"
            className="flex-1 overflow-y-auto mt-0 pt-6 pr-2 -mr-2"
          >
            <PermissionManagerContent 
              entity={user}
              title={t('permission:permissions')}
              description={t('permission:descriptionPermissionUser')}
              onSave={handlePermissionManager}
            />          
          </TabsContent>
        </Tabs>

      </DialogContent>
    </Dialog>
  )
}

export default UserManager
