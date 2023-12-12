# Welcome to my personal project 

orignal source = https://images.nasa.gov

### please follow below steps to configure the project

1. Node version = v20.3.1 & React version = 18.2.0 
to make sure the project run in your local environment please install above versions of node and React
2. get a secret key by signing up from the link https://api.nasa.gov
3. create a .env file within src folder and add below key value pair
```
 VITE_APOD_APIURL=https://api.nasa.gov/planetary/apod?api_key=
 VITE_NASA_SECRET_KEY=/*enter the key that you will get after signingup*/
```
4. please note that vite.config.js should look like below

```
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
```
