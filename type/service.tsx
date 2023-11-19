/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para los Servicios de la Base de Datos
@date 16/11/23 19:30
*/
import type {Dispatch} from 'react';
import type {Authentication} from './auth';
import type FirebasePrototype from './firebase';
import type ApplicationPrototype from './application';
import type ResourcePrototype from './resource';
import type ReducerInput from './reducer';

/** Prototipo para la Definición del Objeto con los Servicios Esenciales de la Aplicación */
type Service = {
    /** Contenedor con los Servicios de Firebase */
    firebase?: FirebasePrototype,
    /** Contenedor con la Información General de la Aplicación */
    application?: ApplicationPrototype,
    /** Contenedor con los Recursos Esenciales de la Aplicación */
    asset?: ResourcePrototype,
    /** Referencía a la Instancía para realizar el Callback en la Mutación del Objeto */
    dispatcher?: Dispatch<ReducerInput>,
    /** Contenedor con los Parámetros Esenciales para la Autenticación de la Aplicación */
    authentication?: Authentication
};

export default Service;