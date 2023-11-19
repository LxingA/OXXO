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
import {getStorage,listAll,ref,getDownloadURL} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {initializeFirestore,persistentLocalCache,persistentMultipleTabManager} from 'firebase/firestore';
import {doc,collection,getDocFromCache,getDocFromServer} from 'firebase/firestore';
import {initialObjectApplication,initialObjectAuthentication} from '../util/callback';
import type {FirebaseOptions} from 'firebase/app';
import type Service from '../type/service';

/** Objeto con la Configuración Inicial para Firebase */
const configuration: FirebaseOptions = {
    apiKey: import.meta.env.SGlobAppParamFirestoreAPIKey,
    appId: import.meta.env.SGlobAppParamFirestoreAppID,
    projectId: import.meta.env.SGlobAppParamFirestoreProjectID,
    authDomain: import.meta.env.SGlobAppParamFirestoreAuthDomain,
    storageBucket: import.meta.env.SGlobAppParamFirestoreStorageDomain,
    messagingSenderId: import.meta.env.SGlobAppParamFirestoreMessagingSenderID
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
    /** Contenedor con los Servicios Instanciados de Firebase para la Aplicación */
    let initialState: Service = {
        firebase: {
            storage: getStorage(app),
            authentication: getAuth(app),
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
    /** Obtener y Definir el Objeto de los Recursos de la Aplicación */
    let files = {};
    (await Promise["all"](
        (await listAll(ref(initialState["firebase"]?.storage!,"a")))["items"]["map"](async ({name,fullPath,storage}) => {
            files[name] = (await getDownloadURL(ref(storage,fullPath)));
        })
    ));
    initialState["asset"] = {
        logo: {
            dark: files["3c589326-d2c5-4e74-8810-76d5a3e04670-d.webp"],
            color: files["3c589326-d2c5-4e74-8810-76d5a3e04670-c.webp"],
            light: files["3c589326-d2c5-4e74-8810-76d5a3e04670-w.webp"]
        },
        style: files["70d2e425-0015-406b-b749-67276b5ca454.css"],
        icon: {
            normal: files["70c83cc8-6e33-438b-880b-8601499d7876.ico"],
            apple: files["f8b64516-9254-4022-a8c0-54a18eac2770.png"]
        },
        user: files["1bc0f6e2-cbb5-4890-9af5-e5838f1d34da.webp"],
        slider: {
            0: files["d349bca7-e609-4a94-8c21-6324d3479e52.webp"],
            1: files["2c5d4938-2fca-4b5d-b7ef-2755759c3550.webp"],
            2: files["ee960156-596d-4880-8d59-e174285384ab.webp"]
        },
        home: {
            cover: files["e18f1fa3-e864-473b-b1b5-15207db517f8-a.webp"],
            background: files["e18f1fa3-e864-473b-b1b5-15207db517f8-b.webp"]
        }
    };
    return initialState;
};

export default Initial;