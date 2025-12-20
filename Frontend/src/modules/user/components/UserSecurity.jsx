import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import Disable2FA from '@auth/components/2FA/Disable2FA';
import Enable2FA from '@auth/components/2FA/Enable2FA';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ShieldCheck, ShieldOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const UserSecurity = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <section>
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            {t('user:emailVerificationTitle')}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            {t('user:emailVerificationDescription')}
          </p>
        </div>
        <div className="space-y-4">
          {user?.email_verified_at ? (
            <Alert variant="success" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <AlertTitle>{t('user:emailVerifiedTitle')}</AlertTitle>
                <AlertDescription>
                  {t('user:emailVerifiedDescription', { email: user.email })}
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            <>
              <Alert variant="destructive" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <AlertTitle>{t('user:emailNotVerifiedTitle')}</AlertTitle>
                  <AlertDescription>{t('user:emailNotVerifiedDescription')}</AlertDescription>
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
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            {t('user:twoFATitle')}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            {t('user:twoFADescription')}
          </p>
        </div>
        <div className="space-y-4">
          {user?.is2FAVerified ? (
            <>
              <Alert variant="success" className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <AlertTitle>{t('user:twoFAEnabledTitle')}</AlertTitle>
                  <AlertDescription>{t('user:twoFAEnabledDescription')}</AlertDescription>
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
                  <AlertTitle>{t('user:twoFADisabledTitle')}</AlertTitle>
                  <AlertDescription>{t('user:twoFADisabledDescription')}</AlertDescription>
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
