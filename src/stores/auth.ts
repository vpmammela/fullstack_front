import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAccount, loginService, logoutUser } from "../services/auth"


interface LoginCredentials {
  username: string;
  password: string;
}

type AuthStore = {
  isAuth: boolean;
  role: string | null;
  email: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  account: () => Promise<void>;
};

const useAuthStore = create(persist<AuthStore>((set, get) => ({
    isAuth: false,
    role: null,
    email: null,
    login: async (credentials: LoginCredentials) => {

      try {
        await loginService(credentials);
        get().account();
        set({isAuth: true});
      } catch(e) {
        console.log("Error with login in authStore", e)
        throw new Error("Login failed")
      }

    },
    logout: async () => {
      try {
        await logoutUser();
        set({isAuth: false});
      } catch(e) {
        console.log("Error in logout");
      }
    },
    account: async () => {
      try {
        const account = await getAccount();
        set({role: account.role, email: account.email, isAuth: true});
      } catch(e) {
        set({isAuth: false, role: null, email: null});
        console.log(e);

        throw new Error("Unable to get userdata, logged out?");
      }
    }
}), {
    name: "auth-store", 
    storage: createJSONStorage(() => sessionStorage)
}));

export default useAuthStore;
