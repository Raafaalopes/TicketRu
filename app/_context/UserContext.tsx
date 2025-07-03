// app/_context/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Usuario {
  nome: string;
  email: string;
  categoria: string;
}

interface ContextType {
  usuario: Usuario | null;
  setUsuario: (u: Usuario | null) => void;
}

const UserContext = createContext<ContextType>({
  usuario: null,
  setUsuario: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch("/api/me"); // Rota para retornar dados do token
        const data = await res.json();
        if (res.ok) setUsuario(data);
      } catch {
        setUsuario(null);
      }
    };

    fetchUsuario();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
