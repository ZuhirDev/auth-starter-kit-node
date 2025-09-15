import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import Disable2FA from '@auth/components/2FA/Disable2FA';
import Enable2FA from '@auth/components/2FA/Enable2FA';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ShieldCheck, ShieldOff } from 'lucide-react';

const UserSecurity = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <section>
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Email Verification</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Make sure your email address is verified so we can reach you securely and provide important account updates.
          </p>
        </div>
        <div className="space-y-4">
          {user?.email_verified_at ? (
            <Alert variant="success" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <AlertTitle>Your email is verified</AlertTitle>
                <AlertDescription>
                  You will receive important updates at <strong>{user.email}</strong>
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            <>
              <Alert variant="destructive" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <AlertTitle>Email not verified</AlertTitle>
                  <AlertDescription>
                    Please verify your email to ensure secure communication.
                  </AlertDescription>
                </div>
              </Alert>
              <div className="mt-4">
                <SendVerifyEmail />
              </div>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Two-Factor Authentication (2FA)</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Add an extra layer of protection to your account by enabling two-factor authentication.
          </p>
        </div>
        <div className="space-y-4">
          {user?.google2fa_enabled ? (
            <>
              <Alert variant="success" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <AlertTitle>2FA is enabled</AlertTitle>
                  <AlertDescription>
                    Your account is protected with two-factor authentication.
                  </AlertDescription>
                </div>
              </Alert>
              <div className="mt-4">
                <Disable2FA />
              </div>
            </>
          ) : (
            <>
              <Alert variant="destructive" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <ShieldOff className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <AlertTitle>2FA is disabled</AlertTitle>
                  <AlertDescription>
                    We strongly recommend enabling 2FA to enhance your account security.
                  </AlertDescription>
                </div>
              </Alert>
              <div className="mt-4">
                <Enable2FA />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserSecurity;
