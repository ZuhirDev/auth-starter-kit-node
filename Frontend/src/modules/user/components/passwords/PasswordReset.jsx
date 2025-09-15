import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@user/context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import AUTH_ROUTES from '@/modules/auth/routes/paths';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';

const PasswordReset = () => {

    const { t } = useTranslation();
    const passwordResetSchema = z.object({
        token: z.string().min(1, t('validation:token')),
        email: z.email(t('validation:email')),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
    }).refine((data) => data.password === data.password_confirmation, {
        path:['password_confirmation'], message: t('validation:password.mismatch'),
    });
    
    const { passwordReset } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            password: '',
            password_confirmation: '',          
        }
    });

    const data = {
        token: params.get('token'),
        email: params.get('email'),
    }

    const onSubmit = async (data) => {

        try {
            const response = await passwordReset(data);
            toast.success(response?.message);
            reset();
            navigate(AUTH_ROUTES.LOGIN);
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
                <h2 className="text-2xl font-bold tracking-tight">Reset Your Password</h2>
                <p className="text-sm text-muted-foreground max-w-sm">Create a new password for your account</p>
                </div>

                <div className="space-y-4">
                <FormInput
                    name="token"
                    type="hidden"
                    register={register}
                    disabled={isSubmitting}
                    value={data.token}
                    error={errors.token}
                />

                <div className="grid gap-1">
                    <Label htmlFor="email" className="text-sm font-medium">
                    Email
                    </Label>
                    <FormInput
                    name="email"
                    type="email"
                    register={register}
                    disabled={true}
                    placeholder="Email"
                    defaultValue={data.email}
                    error={errors.email}
                    className="rounded-lg bg-muted/50"
                    />
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="password" className="text-sm font-medium">
                    New Password
                    </Label>
                    <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <PasswordInput
                        {...field}
                        id="password"
                        className="rounded-lg bg-muted/50"
                        placeholder="Create a strong password"
                        />
                    )}
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="password_confirmation" className="text-sm font-medium">
                    Confirm New Password
                    </Label>
                    <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                        <PasswordInput
                        {...field}
                        id="password_confirmation"
                        className="rounded-lg bg-muted/50"
                        placeholder="Re-enter your new password"
                        />
                    )}
                    />
                    {errors.password_confirmation && (
                    <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
                    )}
                </div>

                {errors.root && <p className="text-sm text-red-500 mt-1">{errors.root.message}</p>}
                </div>

                <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                size="lg"
                >
                {isSubmitting ? 'Loading...' : 'Reset Password'}
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    );

}

export default PasswordReset;
