import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@error/pages/NotFoundPage';
import authRouter from '@auth/routes/router';
import {publicUserRoutes, protectedUserRoutes } from '@user/routes/router';
import LandingPage from '@landing/pages/LandingPage';
import MAIN_ROUTES from './path';
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';


const router = createBrowserRouter([

    {
        path: MAIN_ROUTES.HOME,
        element: <PublicLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },

            ...authRouter,
            ...publicUserRoutes,

        ]
    },
    
    {
        path: '',
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            ...protectedUserRoutes,
        ]
    },

    {
        path: '*',
        element: <NotFoundPage />
    }
]);

export default router;