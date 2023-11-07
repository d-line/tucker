import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, loginUser } from "../helpers/api";

type User = {
  id: string
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (password: string) => Promise<void>;
  signup: (password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ id: data.id});
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (password: string) => {
    const data = await loginUser(password);
    if (data) {
      setUser({ id: data.id });
      setIsLoggedIn(true);
    }
  };

  const signup = async (password: string) => {};

  const logout = async () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
