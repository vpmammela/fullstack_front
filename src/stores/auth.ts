import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type AuthStore = {
  auth: boolean;
  csrfToken: string | null;
  login: (credentials: string[][]) => Promise<void>;
  logout: () => Promise<void>;
};


const useAuthStore = create(persist<AuthStore>((set) => ({
    auth: false,
    csrfToken: null,
    login: async (credentials: string[][]) => {
      // fetch request from backend
      const response = await fetch("https://localhost:8001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(credentials)
      })

      const { csrf_token } = await response.json()
      if(csrf_token){
        set({csrfToken: csrf_token, auth: true})
      }
    },
    logout: async () => set(() => ({ auth: false })) 
}), {
    name: "auth-store", 
    storage: createJSONStorage(() => sessionStorage)
}));

export default useAuthStore;