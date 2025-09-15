import USER_ROUTES from "@user/routes/path";
import UpdatePassword from '@user/components/passwords/UpdatePassword';
import ForgotPassword from '@user/components/passwords/ForgotPassword';
import PasswordReset from '@user/components/passwords/PasswordReset';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';
import VerifyEmail from '@user/components/mails/VerifyEmail';
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import UserPage from "../pages/UserPage";

export const protectedUserRoutes  = [

    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: USER_ROUTES.USER,
                element: <UserPage />,
            },
        
            {
                path: USER_ROUTES.UPDATE_PASSWORD,
                element: <UpdatePassword />,
            },

            {
                path: USER_ROUTES.SEND_VERIFY_EMAIL,
                element: <SendVerifyEmail />,
            },
        
            {
                path: USER_ROUTES.VERIFY_EMAIL,
                element: <VerifyEmail />,
            },
        ]
    },
];

export const publicUserRoutes = [
  {
    path: USER_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: USER_ROUTES.PASSWORD_RESET,
    element: <PasswordReset />,
  },
];