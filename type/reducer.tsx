/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para el Objeto de Entrada para los Disparadores de los Reducedores
@date 16/11/23 21:30
*/

/** Prototipo para la Definición del Objeto para la Entrada de los Reducedores */
type ReducerInput = {
    /** Valor a Mutar en el Estado */
    payload?: any,
    /** Nombre del Callback para Realizar la Acción de la Mutación */
    type: string
};

export default ReducerInput;