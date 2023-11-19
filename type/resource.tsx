/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para los Recursos de la Aplicación
@date 16/11/23 20:30
*/

/** Prototipo para la Definición del Objeto con los Recursos Esenciales de la Aplicación */
type Resource = {
    /** Contenedor con los Logos de la Aplicación en Diferentes Contextos */
    logo: {
        /** Ruta Absoluta HTTP Firmada con el Logo en Modo Luz */
        light: string,
        /** Ruta Absoluta HTTP Firmada con el Logo en Modo Color */
        color: string,
        /** Ruta Absoluta HTTP Firmada con el Logo en Modo Negro */
        dark: string
    },
    /** Ruta Absoluta HTTP Firmada con los Estilos Globales de la Aplicación */
    style: string,
    /** Contenedor con los Iconos de la Aplicación en Diferentes Contextos */
    icon: {
        /** Ruta Absoluta HTTP Firmada con el Icono en Formato Normal (.ico) */
        normal: string,
        /** Ruta Absoluta HTTP Firmada con el Icono en Formato Apple (192x192) */
        apple: string,
    },
    /** Ruta Absoluta HTTP de la Foto de Perfil Predeterminado para un Usuario */
    user: string,
    /** Contenedor con las Portadas del Deslizador de la Página de Autenticación */
    slider: {
        /** Ruta Absoluta HTTP de la Portada 1 */
        0: string,
        /** Ruta Absoluta HTTP de la Portada 2 */
        1: string,
        /** Ruta Absoluta HTTP de la Portada 3 */
        2: string
    },
    /** Contenedor con las Imágenes Principales de la Página Principal de la Aplicación */
    home: {
        /** Ruta Absoluta HTTP de la Portada */
        cover: string,
        /** Ruta Absoluta HTTP del Fondo */
        background: string
    }
};

export default Resource;