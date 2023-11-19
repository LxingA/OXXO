/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para la Información General de la Aplicación
@date 16/11/23 19:30
*/

/** Prototipo para la Definición del Objeto con la Información de la Aplicación */
type Application = {
    /** Nombre de la Aplicación */
    name: string,
    /** Indicar sí se Inicialicé con el Modo Obscuro */
    dark: boolean,
    /** Establecer el Idioma Predeterminado */
    language: "es" | "en",
    /** Correo Electrónico de Contacto */
    mail: string,
    /** Nombre del Cliente */
    client: string
};

export default Application;