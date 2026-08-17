import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signOut as authSignOut,
  signInWithEmail as authSignInWithEmail,
  signUp as authSignUp,
  getSession,
  subscribeToAuthChanges,
  resetPasswordForEmail,
  updatePassword as authUpdatePassword,
} from '@/services/auth-service';
import type { Session, AuthResponse } from '@supabase/supabase-js';

interface SessionContextValue {
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>,
  updatePassword: (newPassword: string) => Promise<void>,
  changePassword: (newPassword: string, currentPassword: string) => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const subscription = subscribeToAuthChanges((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await authSignOut();
    if (error) throw error;
  }


  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await authSignInWithEmail(email, password);
    if(error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) : Promise<void> => {
    const { error } = await authSignUp(email, password, fullName);
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await resetPasswordForEmail(email)
    if (error) throw error
  }

  const updatePassword = async (password: string) => {
    const { data, error } = await authUpdatePassword(password)
    if (error) throw error
  }
  const changePassword = async (newPassword: string, currentPassword: string) => {
    const { data, error } = await authUpdatePassword(newPassword, currentPassword)
    if (error) throw error
  }
  return (
    <SessionContext.Provider value={{ session, isLoading, signOut, signInWithEmail, signUp, resetPassword, updatePassword, changePassword }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}