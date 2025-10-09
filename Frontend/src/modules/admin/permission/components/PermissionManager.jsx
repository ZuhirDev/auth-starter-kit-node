import { useEffect, useState, useMemo } from "react"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2 } from "lucide-react"
import { getAllPermissionsService } from "@admin/permission/services/permissionService"

const groupPermissionsByResource = (permissions) => {
  return permissions.reduce((acc, permission) => {
    const { resource } = permission
    if (!acc[resource]) acc[resource] = []
    acc[resource].push(permission)
    return acc
  }, {})
}

export const PermissionManagerContent = ({ entity, title, description, onSave }) => {
  const [allPermissions, setAllPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState({})
  const [originalSelectedPermissions, setOriginalSelectedPermissions] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await getAllPermissionsService()
      setAllPermissions(response.data)
    }
    fetchPermissions()
  }, [])

  useEffect(() => {
    if (entity && allPermissions.length > 0) {
      const permIds = new Set(entity.permissions?.map((p) => p.id))
      const initialSelected = {}
      allPermissions.forEach((perm) => {
        initialSelected[perm.id] = permIds.has(perm.id)
      })
      setSelectedPermissions(initialSelected)
      setOriginalSelectedPermissions(initialSelected)
    }
  }, [entity, allPermissions])

  const grouped = useMemo(() => {
    const filtered = allPermissions.filter((perm) =>
      perm.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (perm.description && perm.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    return groupPermissionsByResource(filtered)
  }, [allPermissions, searchTerm])

  const togglePermission = (permId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permId]: !prev[permId],
    }))
  }

  const toggleGroup = (resource) => {
    const allSelected = grouped[resource].every((p) => selectedPermissions[p.id])
    const updated = { ...selectedPermissions }
    grouped[resource].forEach((p) => {
      updated[p.id] = !allSelected
    })
    setSelectedPermissions(updated)
  }

  const isGroupFullySelected = (resource) => grouped[resource].every((p) => selectedPermissions[p.id])

  const handleSave = async () => {
    const permissionsToAdd = []
    const permissionsToRemove = []

    Object.entries(selectedPermissions).forEach(([permId, isSelected]) => {
      const wasSelected = originalSelectedPermissions[permId] || false
      if (isSelected && !wasSelected) permissionsToAdd.push(permId)
      if (!isSelected && wasSelected) permissionsToRemove.push(permId)
    })

    onSave?.({ id: entity.id, permissionsToAdd, permissionsToRemove })
  }

  const totalPermissions = allPermissions.length
  const selectedCount = Object.values(selectedPermissions).filter(Boolean).length

  if (!entity) return null

  return (
    <div className="flex max-h-[90vh] flex-col overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              Manage
              <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-sm capitalize text-primary">
                {title}
              </span>
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          </div>
        </div>
        <div className="self-start rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary sm:self-auto flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {selectedCount} / {totalPermissions}
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by resource, name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 bg-muted/50 pl-10 border-border focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="space-y-4 pb-4">
          {Object.entries(grouped).map(([resource, permissions]) => {
            const selectedInGroup = permissions.filter((p) => selectedPermissions[p.id]).length
            const isFullySelected = isGroupFullySelected(resource)

            return (
              <div
                key={resource}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`group-${resource}`}
                      checked={isFullySelected}
                      onCheckedChange={() => toggleGroup(resource)}
                    />
                    <label
                      htmlFor={`group-${resource}`}
                      className="cursor-pointer select-none text-base font-semibold capitalize"
                    >
                      {resource.replace(/_/g, " ")}
                    </label>
                  </div>
                  <div
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      isFullySelected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {selectedInGroup} / {permissions.length}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-9">
                  {permissions.map((perm) => {
                    const isChecked = !!selectedPermissions[perm.id]
                    return (
                      <div
                        key={perm.id}
                        className={`flex items-start gap-3 rounded-lg border p-3 transition-all ${
                          isChecked
                            ? "border-primary/30 bg-primary/5"
                            : "border-transparent bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <Checkbox
                          id={perm.id}
                          checked={isChecked}
                          onCheckedChange={() => togglePermission(perm.id)}
                        />
                        <div className="min-w-0 flex-1">
                          <label htmlFor={perm.id} className="block cursor-pointer select-none text-sm font-medium">
                            {perm.name}
                          </label>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {perm?.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <DialogFooter className="mt-2 border-t border-border pt-4">
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <Button onClick={handleSave} className="flex-1 sm:flex-none">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogFooter>
    </div>
  )
}

const PermissionManager = ({ open, onClose, ...props }) => {
  if (typeof open === "boolean") {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden">
          <PermissionManagerContent {...props} />
        </DialogContent>
      </Dialog>
    )
  }

  return <PermissionManagerContent {...props} />
}

export default PermissionManager
