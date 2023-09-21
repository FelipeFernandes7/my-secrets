import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: UserProps | null;
  signed: boolean;
  loadingAuth: boolean;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
      setLoadingAuth(false);
    } else {
      setUser(null);
      setLoadingAuth(false);
    }
  });

  useEffect(() => {
    unsub();

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
