import { supabase } from '@/supabase/supabase';
import {
  AuthResponse,
  AuthError,
  AuthTokenResponsePassword,
  OAuthResponse,
  UserResponse,
  Session,
  AuthChangeEvent,
  Subscription,
} from '@supabase/supabase-js';
import * as Linking from 'expo-linking'; 

const PROVIDERS = ['google'] as const;

export const signUp = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: Linking.createURL('welcome'),
    },
  })
}


export const signOut = async () : Promise<{ error: AuthError | null }> => {
    return await supabase.auth.signOut();
}

// export const signInWithProvider = async (provider: typeof PROVIDERS[number]) : Promise<OAuthResponse> => {
//     return await supabase.auth.signInWithOAuth({ provider });
// }

export const signInWithEmail = async (email: string, password: string) : Promise<AuthTokenResponsePassword> => {
    return await supabase.auth.signInWithPassword({ email, password });
}

export const resetPasswordForEmail = async (email: string): Promise<{ data: {} | null; error: AuthError | null }> => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'winnroh://update-password',
  });
}

export const updatePassword = async (
  newPassword: string,
  currentPassword?: string
): Promise<UserResponse> => {
  return await supabase.auth.updateUser({
    password: newPassword,
    ...(currentPassword ? { current_password: currentPassword } : {}),
  });
}

export const getSession = async (): Promise<{ data: { session: Session | null }; error: AuthError | null }> => {
  return await supabase.auth.getSession();
}

export const subscribeToAuthChanges = (
  callback: (event: AuthChangeEvent, session: Session | null) => void
): Subscription => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}