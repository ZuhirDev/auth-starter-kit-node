import { useAuth } from "@auth/context/AuthContext";

export const useUserPermissions = () => {
  const { user } = useAuth();

  const permissions = user?.effectivePermissions || [];

  const hasPermission = (perm) => permissions.includes(perm);

  return { permissions, hasPermission };
};
