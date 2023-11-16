/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipo para la Definición del Objeto para la Aplicación
@date 14/11/23 21:30
*/

/** Definición del Objeto para la Información de la Aplicación */
type Application = {
    /** Nombre de la Aplicación */
    name: string,
    /** Indicar sí en la Aplicación existe una Sesión Activa */
    authentic: boolean,
    /** Indicar sí en la Aplicación está en Modo Obscuro */
    dark: boolean,
    /** Contenedor con el Logo Principal y Global en Formato HTTP */
    logo: {
        /** Ruta Absoluta HTTP del Logo en Color */
        color: string,
        /** Ruta Absoluta HTTP del Logo en Negro */
        dark: string,
        /** Ruta Absoluta HTTP del Logo en Blanco */
        white: string
    }
};

export default Application;