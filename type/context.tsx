/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipos para la Definición de los Objetos para los Contextos de la Aplicación
@date 14/11/23 21:30
*/
import type {FirebaseServices} from './firestore';
import type Application from './application';

/** Definición del Objeto para el Contexto Global de la Aplicación */
export type Global = {
    /** Contenedor con los Objetos Inicializados de Firebase */
    firebase?: FirebaseServices,
    /** Información de la Aplicación */
    application?: Application
};