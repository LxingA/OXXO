/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidades Adicionales para Algunas Funciones de la Aplicación
@date 23/11/23 19:50
*/

/** Instanciar la Primera Letra de un Texto en Mayúsculas */
export const upperStringFirst = ($text:string) => `${$text[0]["toUpperCase"]()}${$text["substring"](1)}`;