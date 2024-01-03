/// <reference types="vite/client" />
interface ImportMetaEnv {
    /** Clave API para el Acceso al Servicio de Firebase */
    SGlobAppParamFirestoreAPIKey: string,
    /** Ruta Absoluta HTTP del Punto Final de Firebase para la Autenticación */
    SGlobAppParamFirestoreAuthDomain: string,
    /** Identificador Único del Proyecto Asociada a Firebase */
    SGlobAppParamFirestoreProjectID: string,
    /** Ruta Absoluta HTTP del Punto Final de Firebase para el Almacenamiento */
    SGlobAppParamFirestoreStorageDomain: string,
    /** Identificador Único del SMS Asociada a Firebase */
    SGlobAppParamFirestoreMessagingSenderID: string,
    /** Identificador Único de la Aplicación de Firebase */
    SGlobAppParamFirestoreAppID: string,
    /** Clave de Acceso a Recaptcha V3 para la Autenticación con Firebase */
    SGlobAppParamFirestoreAppCheckerReCaptchaV3Key: string,
    /** Ruta Absoluta HTTP para el Punto Final de los Recursos en la CDN del Proyecto */
    SGlobAppParamCDNDomain: string,
    /** Ruta Absoluta HTTP del Punto Final de la Base de Datos en Tiempo Real de Firebase */
    SGlobAppParamRealTimeDatabaseDomain: string,
    /** Definición de los Puntos Finales de las API (separadas por comas) */
    SGlobAppParamDefinedEndPointAPI: string,
    /** Clave de Autenticación Básica a la API del WC (key:secret) */
    SGlobAppParamWCAuthToken: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}