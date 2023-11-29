import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'


// START WITH https://localhost:5173

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        //target: "https://backend.onrender.com"
        secure: false,
        changeOrigin: true,
        //rewrite: (path) => path +
      },
      "/docs": "http://localhost:8000",
      "/openapi.json": "http://localhost:8000"
    }
  }
})
