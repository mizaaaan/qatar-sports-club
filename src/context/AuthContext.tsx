"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/lib/types";
import { INITIAL_USERS } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  switchRole: (role: Role) => void;
  login: (email: string) => boolean;
  logout: () => void;
  allUsers: User[];
  canApprove: boolean;
  canSign: boolean;
  canManageUsers: boolean;
  canAccessReports: boolean;
  canAccessAuditLogs: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to President so the demo showcases executive powers right away, but easily switchable!
  const [user, setUser] = useState<User | null>(INITIAL_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem("qsc_user_id");
    if (savedUserId) {
      const found = INITIAL_USERS.find((u) => u.id === savedUserId);
      if (found) {
        setUser(found);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const switchRole = (newRole: Role) => {
    const foundUser = INITIAL_USERS.find((u) => u.role === newRole) || INITIAL_USERS[0];
    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem("qsc_user_id", foundUser.id);
  };

  const login = (email: string) => {
    const found = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      setIsAuthenticated(true);
      localStorage.setItem("qsc_user_id", found.id);
      return true;
    }
    // Default to first user if email not matched for quick testing
    setUser(INITIAL_USERS[0]);
    setIsAuthenticated(true);
    localStorage.setItem("qsc_user_id", INITIAL_USERS[0].id);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("qsc_user_id");
  };

  const role = user?.role || "management_member";

  const canApprove = [
    "president",
    "vice_president",
    "general_manager",
    "department_manager",
    "hr_manager",
    "admin_officer",
    "super_admin",
  ].includes(role);

  const canSign = ["president", "vice_president", "general_manager", "super_admin"].includes(role);
  const canManageUsers = ["super_admin", "president", "general_manager"].includes(role);
  const canAccessReports = ["president", "vice_president", "board_member", "general_manager", "super_admin"].includes(role);
  const canAccessAuditLogs = ["super_admin", "president", "general_manager"].includes(role);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        login,
        logout,
        allUsers: INITIAL_USERS,
        canApprove,
        canSign,
        canManageUsers,
        canAccessReports,
        canAccessAuditLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
