/*
@author LxingA
@project OXXO
@name Help Desk
@description Configuración Inicial de la Aplicación
@date 14/11/23 16:15
*/
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Firebase from './lib/firestore';

/** Inicializar la Aplicación OXXO Help Desk */
Firebase()["then"](services => createRoot(document["getElementById"]("root") as HTMLElement)["render"](
    <p>Hola Mundo</p>
));