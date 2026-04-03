"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Role = "admin" | "viewer";

type RoleContextType = {
  role: Role;
  setRole: (role: Role) => void;
  mounted: boolean;
};

const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("viewer");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage AFTER mount
  useEffect(() => {
    function loadRole() {
      const savedRole = localStorage.getItem("role") as Role | null;

      if (savedRole) {
        setRoleState(savedRole);
      }
    }

    loadRole();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ✅ Update + persist
  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, mounted }}>
      {children}
    </RoleContext.Provider>
  );
}

// Hook
export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}
