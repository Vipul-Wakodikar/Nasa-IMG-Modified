import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load and parse .env file
dotenv.config({ path: './src/.env' });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      dotenv: 'dotenv', // Resolve dotenv package
      '@env': './.env',  // Resolve .env file
    },
  },
});
