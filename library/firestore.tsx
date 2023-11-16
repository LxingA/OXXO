/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de los Servicios de Firebase como BackEnd para la Aplicación
@date 14/11/23 16:15
*/
import {initializeApp} from 'firebase/app';
import {initializeAppCheck} from 'firebase/app-check';
import {ReCaptchaV3Provider} from 'firebase/app-check';
import {fetchAndActivate,getRemoteConfig} from 'firebase/remote-config';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {initializeFirestore,persistentLocalCache,persistentMultipleTabManager} from 'firebase/firestore';
import type {FirebaseOptions} from 'firebase/app';
import type {FirebaseServices} from '../type/firestore';

/** Objeto con la Configuración Inicial para Firebase */
const configuration: FirebaseOptions = {
    apiKey: import.meta.env.SGlobAppParamFirestoreAPIKey,
    appId: import.meta.env.SGlobAppParamFirestoreAppID,
    projectId: import.meta.env.SGlobAppParamFirestoreProjectID,
    authDomain: import.meta.env.SGlobAppParamFirestoreAuthDomain,
    storageBucket: import.meta.env.SGlobAppParamFirestoreStorageDomain,
    messagingSenderId: import.meta.env.SGlobAppParamFirestoreMessagingSenderID
};

/** Funcionalidad para la Inicialización de Firebase en la Aplicación */
const Firebase = async(): Promise<FirebaseServices> => {
    const {app} = (initializeAppCheck(initializeApp(configuration),{
        provider: (new ReCaptchaV3Provider(import.meta.env.SGlobAppParamFirestoreAppCheckerReCaptchaV3Key))
    }));
    /** Referencía a la Inicialización de Firestore para la Aplicación */
    const Firestore = initializeFirestore(app,{
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
        })
    });;
    /** Contenedor con los Servicios Instanciados de Firebase para la Aplicación */
    const services: FirebaseServices = {
        storage: getStorage(app),
        authentication: getAuth(app),
        database: Firestore,
        parameters: getRemoteConfig(app)
    };
    (await fetchAndActivate(services["parameters"]));
    return services;
};

export default Firebase;