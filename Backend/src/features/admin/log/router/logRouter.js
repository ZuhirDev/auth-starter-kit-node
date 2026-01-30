import express from 'express';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const logRouter = ({ logController }) => {
    const router = express.Router();

    router.get('/datatable', hasPermission('read', 'manage_logs'), logController.datatable);

    return router;
}

export default logRouter;