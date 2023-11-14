/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipos para la Definición de los Objetos en Contexto de Firestore
@date 14/11/23 17:00
*/
import type {RemoteConfig} from 'firebase/remote-config';
import type {FirebaseStorage} from 'firebase/storage';
import type {Firestore} from 'firebase/firestore';
import type {Auth} from 'firebase/auth';

/** Prototipo para el Objeto con los Servicios Inicializados de Firebase */
export type FirebaseServices = {
    /** Integración de Remote Config de Firebase para los Parametros Dínamicos */
    parameters: RemoteConfig,
    /** Integración de Cloud Storage de Firebase para el Almenamiento de la Aplicación */
    storage: FirebaseStorage,
    /** Integración de Firestore de Firebase para la Base de Datos de la Aplicación */
    database: Firestore,
    /** Integración de Auth Identity Platform de Firebase para la Autenticación de la Aplicación */
    authentication: Auth
};