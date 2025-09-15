import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@user/context/UserContext';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const UpdatePassword = () => {

    const { t } = useTranslation();

    const updatePasswordSchema = z.object({
        current_password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
    }).refine((data) => data.password === data.password_confirmation, {
        path:['password_confirmation'], message: t('validation:password.mismatch'),
    });
    const { updatePassword } = useUser();
    const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        }
    });

    const onSubmit = async (data) => {

        try {
            const response = await updatePassword(data);
            toast.success(response.message)
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
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b pb-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground">Update Password</h2>
                <p className="text-sm text-muted-foreground">
                    Change your account password. Make sure it is strong and secure.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                    <Label htmlFor="current_password" className="text-sm font-medium">
                        Current Password
                    </Label>
                    <Controller
                        name="current_password"
                        control={control}
                        render={({ field }) => (
                        <PasswordInput
                            {...field}
                            id="current_password"
                            className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                            placeholder="Enter your current password"
                        />
                        )}
                    />
                    {errors.current_password && (
                        <p className="text-sm text-red-500 mt-1">{errors.current_password.message}</p>
                    )}
                </div>

                <div className="space-y-1">
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
                            className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                            placeholder="Enter your new password"
                        />
                        )}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-1">
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
                            className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                            placeholder="Re-enter your new password"
                        />
                        )}
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
                    )}
                </div>

                {errors.root && (
                    <p className="text-sm text-red-500 mt-1">{errors.root.message}</p>
                )}

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePassword;
