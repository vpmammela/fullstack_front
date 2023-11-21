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
        //const response = await fetch("https://localhost:8001/api/v1/auth/login", {
        const response = await fetch("https://fullstack-backend-w94q.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(credentials)
      })

      const res = await response.json()
      console.log(res)
      if(res.csrf_token){
        set({csrfToken: res.csrf_token, auth: true})
      }
      // Laitetaan toistaiseksi jotain auth-storeen, että se kirjautuu aina sisään.
      // Tässä detail on esimerkiksi virheilmoituksesta saatu {"detail": "user not found"} jos backend ei palauta csrf_tokenia
      else {
        set({csrfToken: res.detail, auth: true})
      }
    },
    logout: async () => set(() => ({ auth: false })) 
}), {
    name: "auth-store", 
    storage: createJSONStorage(() => sessionStorage)
}));

export default useAuthStore;