import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import FormInput from '@/components/FormInput'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import AUTH_ROUTES from '@auth/routes/paths'
import { useAuth } from '@auth/context/AuthContext'

const RegisterPage = () => {

  const { t } = useTranslation();
  const registerSchema = z.object({
    name: z.string(),
    email: z.email(t('validation:email')),
    password: z.string().min(8, t('validation:password.min', { min: 8 })),
    password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
  }).refine((data) => data.password === data.password_confirmation, {
    path:['password_confirmation'], message: t('validation:password.mismatch'),
  });

  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await authRegister(formData);

      reset();
      navigate('/login');
    }catch (error) {

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
  <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
    <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

    <div className="w-full max-w-2xl px-6 md:px-8">

      <Card className="border border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-card-dark/95 dark:border-primary/20">
        <CardContent className="p-8 md:p-12">
          <div className="mb-4 self-start">
            <Link
              to={AUTH_ROUTES.HOME}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors dark:text-muted-foreground-dark dark:hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 text-center mb-8 px-4 md:px-0">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">
              Create your account
            </CardTitle>
            <CardDescription className="dark:text-muted-foreground-dark max-w-lg text-sm md:text-base">
              Set up your account now to explore personalized features, stay secure, and manage everything with ease.
            </CardDescription>
          </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">

                <div className="grid gap-2">
                  <Label htmlFor="name" className="dark:text-white">Name</Label>
                  <FormInput
                    name="name"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your name"
                    error={errors.name}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="dark:text-white">Email</Label>
                  <FormInput
                    name="email"
                    type="email"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your email"
                    error={errors.email}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="dark:text-white">Password</Label>
                  <FormInput
                    name="password"
                    type="password"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Create a password"
                    error={errors.password}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation" className="dark:text-white">Confirm Password</Label>
                  <FormInput
                    name="password_confirmation"
                    type="password"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Confirm your password"
                    error={errors.password_confirmation}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="sm" className="font-medium">
                  Submit
                </Button>
              </div>
            </form>
          
        </CardContent>
      </Card>
    </div>
  </div>
)

}

export default RegisterPage;
