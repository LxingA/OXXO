/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de Vite en la Aplicación
@date 14/11/23 16:15
*/
import {defineConfig} from 'vite';
import {readFileSync} from 'fs';
import Directory from 'path';
import React from '@vitejs/plugin-react';
/** Obtención del Puerto Local para el Escucha del Entorno de Desarrollo de la Aplicación */
const local = readFileSync(Directory["join"](__dirname,"/port.sc"));

export default defineConfig({
    plugins: [React()],
    server: {
        port: Number(local["toString"]("utf8")),
        strictPort: true
    },
    build: {
        outDir: "static"
    },
    envPrefix: "SGlobAppParam"
});