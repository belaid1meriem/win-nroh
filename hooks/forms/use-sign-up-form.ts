import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/providers/session-provider';
import { type TFunction } from 'i18next';
import { AuthApiError } from '@supabase/supabase-js';

const createSignUpSchema = (t: TFunction) => z
  .object({
    name: z.string().min(2, t('validation.name.min')),
    email: z.string().email(t('validation.email.invalid')),
    password: z.string().min(8, t('validation.password.min')),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t('validation.password.match'),
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

function getAuthErrorMessage(error: unknown, t: TFunction) {
  if (error instanceof AuthApiError) {
    switch (error.code) {
      case 'user_already_exists':
      case 'email_exists':
        return t('signup.errors.email_exists');
      default:
        return t('signup.errors.generic');
    }
  }
  return t('signup.errors.generic');
}

export function useSignUpForm() {
  const { t } = useTranslation('auth');
  const { signUp } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpSchema = createSignUpSchema(t);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(
    async ({ name, email, password }) => {
      setError(null);
      setLoading(true);

      try {
        await signUp(email, password, name);
      } catch (error) {
        const message = getAuthErrorMessage(error, t);
        setError(message);
      } finally {
        setLoading(false);
      }
    }
  );

  return {
    control,
    errors,
    onSubmit,
    loading,
    error,
  };
}

export { Controller };