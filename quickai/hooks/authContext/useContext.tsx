"use client";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface IUser {
  username: string,
  email: string,
}

interface AuthContextType {
  user: IUser | null,
  isLogin: boolean,
  setUserState: (userData: IUser) => void,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));  // restore user on page refresh
  }, []);

  const setUserState = (userData: IUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("StudentResults");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={
        {
             user,
             isLogin: !!user, 
             setUserState, 
             logout 
         }
    }>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}