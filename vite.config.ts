import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react()]
})

/*
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        secure: false,
        changeOrigin: true,
        //rewrite: (path) => path
      },
      "/docs": "http://localhost:8001",
      "/openapi.json": "http://localhost:8001"
    }
  }
})
*/