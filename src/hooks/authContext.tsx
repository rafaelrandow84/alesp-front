import useAuth from "@/hooks/useAuth";
import { createContext, useContext } from "react";

type AuthenticationContextType = ReturnType<typeof useAuth>;
export const AuthenticationContext = createContext(
  null as AuthenticationContextType
);

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthenticationContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export const SessionProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthenticationContext.Provider value={auth}>
      {children}
    </AuthenticationContext.Provider>
  );
};
