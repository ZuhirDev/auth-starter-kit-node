import React from 'react';
import { useUser } from '@user/context/UserContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {

  const { t } = useTranslation();
  const forgotPasswordSchema = z.object({
    email: z.email(t('validation:email')),
  });

  const { forgotPassword } = useUser(); 
  const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {  
    try {
        const response = await forgotPassword(data);
        toast.success(response.message);
        reset();
    } catch (error) {
        const { errors: responseErrors, message: generalMessage } = error.response?.data;

        if(responseErrors) {
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
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <Card className="w-full max-w-lg overflow-hidden border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-8 md:p-12">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Forgot Password</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Enter your email address and we will send instructions to reset your password.
              </p>
            </div>

            <div className="space-y-4">
              <FormInput
                name="email"
                type="email"
                register={register}
                disabled={isSubmitting}
                placeholder="Email"
                error={errors.email}
                className="rounded-lg bg-muted/50"
              />

              {errors.root && (
                <p className="text-sm text-destructive text-center bg-destructive/10 py-2 px-4 rounded-lg">
                  {errors.root.message}
                </p>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              size="lg"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
