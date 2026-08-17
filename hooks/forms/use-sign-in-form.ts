import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/providers/session-provider';
import { type TFunction } from 'i18next';
import { AuthApiError } from '@supabase/supabase-js';

// Create a function that returns the schema with translations
const createSignInSchema = (t: TFunction) => z.object({
  email: z.string().email(t('validation.email.invalid')),
  password: z.string().min(8, t('validation.password.min')),
});

type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;

function getAuthErrorMessage(
  error: unknown,
  t: TFunction
) {
  if (error instanceof AuthApiError) {
    switch (error.code) {
      case 'invalid_credentials':
        return t('signin.errors.invalid_credentials');
      case 'email_not_confirmed':
        return t('signin.errors.email_not_confirmed');
      default:
        return t('signin.errors.generic');
    }
  }
  return t('signin.errors.generic');
}

export function useSignInForm() {
  const { t } = useTranslation('auth');
  const { signInWithEmail } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInSchema = createSignInSchema(t);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      const message = getAuthErrorMessage(error, t);
      setError(message);
    } finally {
      setLoading(false);
    }
  });

  return { control, errors, onSubmit, loading, error };
}

export { Controller };