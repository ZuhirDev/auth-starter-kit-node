import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Logo from '@/assets/img/landing-1.webp'
import { PasswordInput } from '@/components/ui/password-input';
import { ArrowLeft } from 'lucide-react';
import AUTH_ROUTES from '@auth/routes/paths';
import USER_ROUTES from '@user/routes/path';
import MAIN_ROUTES from '@/routes/path';
import Google from '@auth/components/oAuth/Google';

const LoginPage = () => {
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.email(t('validation:email')),
    password: z.string().min(8, t('validation:password.min', { min: 8 })),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@admin.es',
      password: '11111111',
    },
  });

  const onSubmit = async (data) => {

    try {
      const response = await login(data);
      reset();
      navigate(MAIN_ROUTES.DASHBOARD);
    } catch (error) {
      const { errors: responseErrors, message: generalMessage } = error.response?.data || {};

      if (responseErrors) {
        Object.keys(responseErrors).forEach((key) => {
          setError(key, { type: 'manual', message: responseErrors[key] });
        });
      }

      if (generalMessage) {
        setError('root', {
          type: 'manual',
          message: generalMessage,
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <Card className="w-full max-w-5xl overflow-hidden border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
          <div>
            <Link
              to={AUTH_ROUTES.HOME}
              className="inline-flex p-5 items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 p-8 md:p-12">
              <header className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
                <p className="text-sm text-muted-foreground">Please enter your credentials</p>
              </header>

              <section className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <FormInput
                    name="email"
                    type="email"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your email"
                    error={errors.email}
                    className="bg-muted/50"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to={USER_ROUTES.FORGOT_PASSWORD}
                      className="text-sm text-primary hover:text-primary/90 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <PasswordInput {...field} className="rounded-lg bg-muted/50" placeholder="Password" />
                    )}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>
              </section>

              {errors.root && (
                <p className="text-sm text-red-500 mt-1">{errors.root.message}</p>
              )}

              <section className="space-y-4">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                  size="lg"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>

                <div className="flex items-center justify-between gap-4">
                  <div className="h-px flex-1 bg-muted" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="h-px flex-1 bg-muted" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Google />
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don’t have an account?{' '}
                  <Link
                    to={AUTH_ROUTES.REGISTER}
                    className="text-primary hover:text-primary/90 transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </section>
            </form>
          </div>

          <aside className="relative hidden md:block bg-muted max-w-sm md:max-w-lg rounded-xl overflow-hidden mr-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-xl" />
            <img
              src={Logo}
              alt="Login visual"
              className="absolute inset-0 h-full w-full object-cover rounded-xl dark:brightness-[0.6] dark:contrast-125 transition-all duration-500"
            />
          </aside>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
