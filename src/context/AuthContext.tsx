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
  handleInfoUser: ({ name, email, uid, avatar }: UserProps) => void;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
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
        avatar: user.photoURL,
      });
      setLoadingAuth(false);
    } else {
      setUser(null);
      setLoadingAuth(false);
    }
  });

  function handleInfoUser({ name, email, uid, avatar }: UserProps) {
    setUser({
      uid,
      name,
      email,
      avatar: avatar || null,
    });
  }

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
        handleInfoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
