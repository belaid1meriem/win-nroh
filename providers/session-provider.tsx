import React, { createContext, useContext, useState } from 'react';

interface SessionContextValue {
  session: string | null;
  signIn: () => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);

  return (
    <SessionContext.Provider
      value={{
        session,
        signIn: () => setSession('fake-session-token'),
        signOut: () => setSession(null),
      }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}