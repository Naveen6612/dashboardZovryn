"use client";

import { createContext, useContext, useState } from "react";

type Role = "admin" | "viewer";

type RoleContextType = {
  role: Role;
  setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType>({
  role: "viewer",
  setRole: () => {},
});

function getRoleFromCookie(): Role | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|; )role=(admin|viewer)(?:;|$)/);
  return match ? (match[1] as Role) : null;
}

function setRoleCookie(role: Role) {
  document.cookie = `role=${role}; path=/; sameSite=lax`;
}

function getInitialRole(): Role {
  if (typeof window === "undefined") {
    return "viewer";
  }

  const saved = localStorage.getItem("role") as Role | null;
  const cookieRole = getRoleFromCookie();

  if (saved === "admin" || saved === "viewer") {
    return saved;
  }

  if (cookieRole === "admin" || cookieRole === "viewer") {
    return cookieRole;
  }

  return "viewer";
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(getInitialRole);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
    setRoleCookie(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
