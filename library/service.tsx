/*
@author LxingA
@project OXXO
@name Help Desk
@description Inicialización de la Aplicación con Firebase
@date 14/11/23 16:15
*/
import {initializeApp} from 'firebase/app';
import {initializeAppCheck} from 'firebase/app-check';
import {ReCaptchaV3Provider} from 'firebase/app-check';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {initializeFirestore,persistentLocalCache,persistentMultipleTabManager} from 'firebase/firestore';
import {doc,collection,getDocFromCache,getDocFromServer} from 'firebase/firestore';
import {initialObjectApplication,initialObjectAuthentication,defineUserInformationObject} from '../util/callback';
import type {FirebaseOptions} from 'firebase/app';
import type Service from '../type/service';

/** Objeto con la Configuración Inicial para Firebase */
const configuration: FirebaseOptions = {
    apiKey: import.meta.env.SGlobAppParamFirestoreAPIKey,
    appId: import.meta.env.SGlobAppParamFirestoreAppID,
    projectId: import.meta.env.SGlobAppParamFirestoreProjectID,
    authDomain: import.meta.env.SGlobAppParamFirestoreAuthDomain,
    storageBucket: import.meta.env.SGlobAppParamFirestoreStorageDomain,
    messagingSenderId: import.meta.env.SGlobAppParamFirestoreMessagingSenderID,
    databaseURL: import.meta.env.SGlobAppParamRealTimeDatabaseDomain
};

/** Funcionalidad Inicial para la Definición del Objeto Global para la Aplicación */
const Initial = async(): Promise<Service> => {
    const {app} = (initializeAppCheck(initializeApp(configuration),{
        provider: (new ReCaptchaV3Provider(import.meta.env.SGlobAppParamFirestoreAppCheckerReCaptchaV3Key))
    }));
    /** Referencía a la Inicialización de Firestore para la Aplicación */
    const database = initializeFirestore(app,{
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
        })
    });
    /** Instanciar la Autenticación de Firebase para la Aplicación */
    const authentication = getAuth(app);
    authentication["useDeviceLanguage"]();
    /** Contenedor con los Servicios Instanciados de Firebase para la Aplicación */
    let initialState: Service = {
        firebase: {
            storage: getStorage(app),
            realtime: getDatabase(app),
            authentication,
            database
        }
    };
    /** Obtener la Información Inicial de la Aplicación */
    const defineRequestAppInformation = (doc(collection(database,"application"),"configuration"));
    try{
        const getAppInformationFromCache = (await getDocFromCache(defineRequestAppInformation));
        if(getAppInformationFromCache["exists"]()) initialState["application"] = initialObjectApplication(getAppInformationFromCache["data"]());
        else initialState["application"] = initialObjectApplication();
    }catch(_){
        const getAppInformationFromServer = (await getDocFromServer(defineRequestAppInformation));
        if(getAppInformationFromServer["exists"]()) initialState["application"] = initialObjectApplication(getAppInformationFromServer["data"]());
        else initialState["application"] = initialObjectApplication();
    }
    /** Obtener la Información Inicial de la Autenticación */
    const defineRequestAuthenticationInformation = (doc(collection(database,"application"),"authentication"));
    try{
        const getAuthInformationFromCache = (await getDocFromCache(defineRequestAuthenticationInformation));
        if(getAuthInformationFromCache["exists"]()) initialState["authentication"] = initialObjectAuthentication(getAuthInformationFromCache["data"]());
        else initialState["authentication"] = initialObjectAuthentication();
    }catch(_){
        const getAuthInformationFromServer = (await getDocFromServer(defineRequestAuthenticationInformation));
        if(getAuthInformationFromServer["exists"]()) initialState["authentication"] = initialObjectAuthentication(getAuthInformationFromServer["data"]());
        else initialState["authentication"] = initialObjectAuthentication();
    }
    /** Definir el Estado Inicial de la Autenticación de la Aplicación */
    const session = initialState["firebase"]!["authentication"]["currentUser"];
    initialState["auth"] = {
        state: session ? true : false,
        user: session ?? undefined,
        information: session ? (await defineUserInformationObject({},initialState["firebase"]!["database"],session!["uid"])) : undefined
    };
    return initialState;
};

export default Initial;