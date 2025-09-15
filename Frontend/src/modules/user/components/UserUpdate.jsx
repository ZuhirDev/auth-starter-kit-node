import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { useUser } from '../context/UserContext';


const UserUpdate = () => {

    const { t } = useTranslation();
    const { update } = useUser();
    const { user } = useAuth();
    const userUpdateSchema = z.object({
      name: z.string().optional(),
    });

    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting, dirtyFields } } = useForm({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            name:  user.name || '',
        }
    });

    const onSubmit = async (data) => {

      const changedFields = {};

      Object.keys(dirtyFields).forEach(field => {
          changedFields[field] = data[field];
      });

      try {
        const response = await update(changedFields);
        toast.success(response?.message);

        reset({
          name: response.data.name || '',
        });

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b pb-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground">Update Information</h2>
        <p className="text-sm text-muted-foreground">
          Keep your profile up to date to ensure accurate information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">First Name</Label>
            <FormInput
              name="name"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your first name"
              error={errors.name}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdate
