import { t } from "#utils/i18n/index.js";

export const hasPermission = (permissionName, permissionResource) => {
  return (req, res, next) => {

    if(!req.user.effectivePermissions || !req.user.effectivePermissions.has(`${permissionName}:${permissionResource}`)) {
      return res.status(403).json({ message: t('permission:forbidden') });
    }

    next();
  };
};
