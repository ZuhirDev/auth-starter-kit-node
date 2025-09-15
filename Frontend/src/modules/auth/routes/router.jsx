
import AUTH_ROUTES from '@auth/routes/paths';
import LoginPage from '@auth/pages/LoginPage';
import RegisterPage from '@auth/pages/RegisterPage';

const router = [

    {
    path: AUTH_ROUTES.REGISTER,
    element: <RegisterPage />,
    },

    {
    path: AUTH_ROUTES.LOGIN,
    element: <LoginPage />,
    },
];

export default router;