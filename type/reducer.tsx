/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipo para la Definción del Objeto de Entrada para el Reducedor de la Aplicación
@date 15/11/23 22:00
*/

/** Objeto Inicial para los Callback de los Reducedores */
type Input = {
    /** Valor a Mutar en el Estado */
    payload: any,
    /** Tipo de Ejecución en el Contexto del Reducedor */
    type: string
};

export default Input;