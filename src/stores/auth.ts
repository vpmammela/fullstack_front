import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import loginService from "../services/auth"


interface LoginCredentials {
  username: string;
  password: string;
}

type AuthStore = {
  isAuth: boolean;
  //csrfToken: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create(persist<AuthStore>((set) => ({
    isAuth: false,
    //csrfToken: null,
    login: async (credentials: LoginCredentials) => {

      try {
        const {csrf_token} = await loginService(credentials);
        //const {csrf_token} = await loginService(new URLSearchParams(credentials))
        if(csrf_token){
          set({isAuth: true})
        }
      } catch(e) {
        console.log("Error with login in authStore", e)
        throw new Error("Login failed")
      }

    },
    logout: () => {
      return set(() => ({
        isAuth: false
      }))
    }

}), {
    name: "auth-store", 
    storage: createJSONStorage(() => sessionStorage)
}));

export default useAuthStore;

/*
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import loginService from "../services/auth"


interface LoginCredentials {
  username: string;
  password: string;
}

type AuthStore = {
  isAuth: boolean;
  //csrfToken: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create(persist<AuthStore>((set) => ({
    isAuth: false,
    //csrfToken: null,
    login: async (credentials: LoginCredentials) => {

      try {
        const {csrf_token} = await loginService(credentials)
        if(csrf_token){
          set({isAuth: true})
        }
      } catch(e) {
        console.log("Error with login in authStore", e)
        throw new Error("Login failed")
      }

    },
    logout: () => {
      return set(() => ({
        isAuth: false
      }))
    }

}), {
    name: "auth-store", 
    storage: createJSONStorage(() => sessionStorage)
}));

export default useAuthStore;
*/