/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipos para la Definición de los Objetos para los Contextos de la Aplicación
@date 14/11/23 21:30
*/
import {Dispatch} from 'react';
import type {FirebaseServices} from './firestore';
import type Application from './application';
import type Input from './reducer';
import type User from './user';

/** Definición del Objeto para el Contexto Global de la Aplicación */
export type Global = {
    /** Contenedor con los Objetos Inicializados de Firebase */
    firebase?: FirebaseServices,
    /** Información de la Aplicación */
    application?: Application,
    /** Información del Usuario en la Sesión Actual */
    user?: User,
    /** Referencía al Callback para la Mutación del Estado del Contexto */
    dispatcher?: Dispatch<Input>
};