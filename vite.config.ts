/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de Vite en la Aplicación
@date 14/11/23 16:15
*/
import {defineConfig} from 'vite';
import React from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [React()],
    server: {
        port: 4710,
        strictPort: true
    },
    build: {
        outDir: "static"
    },
    envPrefix: "SGlobAppParam"
});