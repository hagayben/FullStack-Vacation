import { jwtDecode } from "jwt-decode";
import { authStore } from "../redux/AuthState";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<{
    id: string;
    role: number;
  } | null>(null);

  useEffect(() => {
    const token = authStore.getState().token;
    if (token) {
      setUser(jwtDecode<{ user: { id: string; role: number } }>(token).user);
    }

    const x = authStore.subscribe(() => {
      const token = authStore.getState().token;
      if(token){
        setUser(jwtDecode<{ user: { id: string; role: number } }>(token).user);
      }
    });

    return x;
  }, []);

  return user;
};
