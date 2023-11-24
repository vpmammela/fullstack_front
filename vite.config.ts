import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react()]
})

/*
// NÄMÄ ASETUKSET SITTEN KUN SAADAAN DOCKER TOIMIMAAN

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
        changeOrigin: true,
        //rewrite: (path) => path +
      },
      "/docs": "http://localhost:8000",
      "/openapi.json": "http://localhost:8000"
    }
  }
})
*/