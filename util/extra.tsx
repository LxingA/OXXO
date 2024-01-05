/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidades Adicionales para Algunas Funciones de la Aplicación
@date 23/11/23 19:50
*/
import type {Address,Order} from '../view/panel/type/tool';
/** Instanciar la Primera Letra de un Texto en Mayúsculas */
export const upperStringFirst = ($text:string) => `${$text[0]["toUpperCase"]()}${$text["substring"](1)}`;

/** Componente para realizar la Lógica para la busqueda de un elemento deseado por lotes */
export const search = ({item,seachFor,keyboard}:{
    /** Referencia al Contenedor con los Items con su Paginador */
    item: (Address | Order)[][],
    /** Término para realizar el Fitro en el Contenedor */
    seachFor: string,
    /** Referencia a la Palabra Escrita en el Buscador */
    keyboard: string
}) => {
    const savedContainerConcated: (Address | Order)[] = [];
    for(let $y = 0; $y <= (item["length"] - 1); $y++) savedContainerConcated["push"](...item[$y]);
    return savedContainerConcated["filter"]($ref => ($ref[seachFor] as string)["includes"](keyboard));
};

/** Función para generar un texto aleatorio */
export const random = ($longitud:number = 8): string => {
    let __init__: string = "";
    const __container__: string[] = ["qazxswedcvfrtgbnhyujmkilopploikujmyhntgbrfvecdwsxqaz","PLOKIMJUNHYBGTVFRCDEXSWZAQQAZWSXEDCRFVTGBYHNUJMIKOLP","09876543211234567890"];
    for(let $y = 0; $y <= ($longitud - 1); $y++){
        let __savedReferenceContainerID__ = __container__[Math["round"](Math["random"]() * (__container__["length"] - 1))];
        __init__ += __savedReferenceContainerID__[Math["round"](Math["random"]() * (__savedReferenceContainerID__["length"] - 1))]
    };return __init__;
};