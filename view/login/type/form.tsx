/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Objeto con el Estado Inicial de los Formularios
@date 17/11/23 17:30
*/

/** Definición del Objeto con el Estado Inicial de las Entradas de los Formularios */
export type ValidityInput = {
    /** Valor Actual de la Entrada */
    value: string | undefined,
    /** Indicar sí la Entrada contiene un Valor Valido */
    check?: "valid" | "invalid"
};