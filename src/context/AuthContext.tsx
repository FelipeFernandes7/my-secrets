import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

import { parseUser } from "../helpers/utils";
import { auth, database } from "../services";
import { onValue, ref, set } from "firebase/database";

type AuthProps = {
  children: ReactNode;
};

export type User = {
  name: string | null;
  avatar: string | null;
  uid: string;
};

type AuthContextType = {
  user: User | null;
  loadingAuth: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string,
    avatar?: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({
          name: displayName ?? "unknown",
          avatar: photoURL,
          uid,
        });
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  async function signInWithGoogle() {
    const user = await signInWithPopup(auth, googleProvider);
    const parsedUser = parseUser(user);
    setUser(parsedUser);
  }

  async function signInWithGithub() {
    const user = await signInWithPopup(auth, githubProvider);
    const parsedUser = parseUser(user);
    setUser(parsedUser);
  }

  async function signIn(email: string, password: string) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const parsedUser = parseUser(user);
    setUser(parsedUser);
  }

  async function signUpWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string,
    avatar?: string
  ) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userRef = ref(database, `users/${user.user.uid}`);
    await set(userRef, {
      name: displayName,
      avatar: avatar || null,
      uid: user.user.uid,
    });
    const parsedUser = {
      name: displayName,
      avatar: null,
      uid: user.user.uid,
    };
    setUser(parsedUser);
  }

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    if (!user) return;

    const noteRef = ref(database, `users/${user?.uid}`);

    const getData = onValue(noteRef, (snapshot) => {
      const data: User = {
        uid: user.uid,
        avatar: snapshot.val()?.avatar,
        name: snapshot.val()?.name,
      };
      setUser(data);
    });

    return () => {
      getData();
    };
  }, [user?.uid]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        signIn,
        signInWithGoogle,
        signUpWithEmailAndPassword,
        logOut,
        signInWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
