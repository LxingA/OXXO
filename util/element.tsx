/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidad para la Creación de Elementos DOM en el Cuerpo HTML
@date 16/11/23 08:40
*/

/**
 * Utilidad para la Creación de Elementos DOM y Montarlos en el Cuerpo HTML
 * @param attr Contenedor con los Atributos del DOM
 * @param document Referencía al Objeto Padre del Elemento HTML
 * @param type Tipo de Elemento DOM a Crear
 * @param target Destino en Dónde se Montará el DOM Creado
 */
const DOM = (attr:{},document: Document,type:keyof HTMLElementTagNameMap = "link",target: "body" | "head" = "head"): void => {
    if(!document["querySelector"](`#${attr["id"]}`)){
        const element = document["createElement"](type);
        ((Object["keys"](attr))["forEach"]((k,i) => {
            element[k] = (Object["values"](attr)[i]);
        }));
        document[target]["appendChild"](element);
    }
};

export default DOM;