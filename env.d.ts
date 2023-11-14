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
    SGlobAppParamFirestoreAppCheckerReCaptchaV3Key: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}