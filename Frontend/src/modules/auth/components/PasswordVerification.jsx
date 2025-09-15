import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import FormInput from '@/components/FormInput';

const PasswordVerification = ({ isOpen, onClose, onVerify }) => {
    
    const { t } = useTranslation();
    const PasswordVerificationSchema = z.object({
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
    });

    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(PasswordVerificationSchema),
    });

    const handleClose = () => onClose();

    const onSubmit = async (data) => {
        try {
            await onVerify(data);
            reset();
        } catch (err) {
            setError("password", { type: "manual", message: err.message });
        }
    };


    return(
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Security Verification
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Please enter your password to access confidential information.
                </DialogDescription>

                <form onSubmit={handleSubmit(onSubmit)} className='py-2' >
                    <FormInput
                        name="password"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder="Password"
                        error={errors.password}
                    />

                    <div className="flex justify-center pt-4">
                        <Button
                            disabled={isSubmitting}
                            variant="outline"
                            className="w-full p-3 bg-primary text-white rounded-lg focus:outline-none"
                        >
                            {isSubmitting ? 'Loading...' : 'Verify'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default PasswordVerification;
