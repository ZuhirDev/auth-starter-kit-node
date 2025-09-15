import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAuth } from '@auth/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Verify2FA = () => {

  const { t } = useTranslation();
  const navigate = useNavigate()
  const FormSchema = z.object({
    otp: z.string().min(6,t('validation:otp.min', { min: 6 })).max(6, t('validation:otp.max', { max: 6 })),
  });

  const { verify2FA } = useAuth();
  const form = useForm({
      resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await verify2FA(data); 
      toast.success(response?.message);
      
    }catch (error) {
      const { errors: responseErrors, message: generalMessage } = error.response?.data || {};

      if (responseErrors) {
        Object.keys(responseErrors).forEach((key) => {
          form.setError(key, { type: 'manual', message: responseErrors[key] });
        });
      }

      if (generalMessage) {
        form.setError('root', {
          type: 'manual',
          message: generalMessage,
        });
      }      

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    
    }
  }

  return (
    <>
        <Dialog open >
          <DialogContent>
            <DialogTitle>
              2FA Verification
            </DialogTitle>
            <DialogDescription>
              Please enter the code to verify your two-factor authentication.
            </DialogDescription>
    
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your device.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors?.root && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.root.message}</p>
                )}    
 
                <Button 
                  className="w-full py-3 rounded-md  focus:outline-none text-md"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    </>
  );
}

export default Verify2FA;
