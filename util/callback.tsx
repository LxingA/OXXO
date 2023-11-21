/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidades para Realizar Acciones de Forma Reutilizable
@date 16/11/23 20:00
*/
import {getDoc,doc,collection} from 'firebase/firestore';
import type {Authentication} from '../type/auth';
import type {Firestore} from 'firebase/firestore';
import type ApplicationPrototype from '../type/application';

/**
 * Funcionalidad para Definir el Estado Inicial del Objeto con la Información de la Aplicación
 * @param state Objeto de Referencía para Definir el Objeto Final
 */
export const initialObjectApplication = (state?: {}): ApplicationPrototype => {
    return state ? ({...state} as ApplicationPrototype) : ({
        name: "Help Desk",
        dark: false,
        language: "es",
        mail: "contacto@codeink.mx",
        client: "OXXO"
    } as ApplicationPrototype);
};

/**
 * Funcionalidad para Definir el Estado Inicial del Objeto con la Información de la Autenticación
 * @param state Objeto de Referencía para Definir el Objeto Final
 */
export const initialObjectAuthentication = (state?: {}): Authentication => {
    return state ? ({...state} as Authentication) : ({
        password: {
            min: 8,
            max: 50
        },
        register: false,
        user: {
            min: 6,
            max: 50
        }
    } as Authentication);
};

/**
 * Funcionalidad para la Definición del Objeto con la Información Adicional de un Usuario
 * @param object Referencía al Objeto a Mutar para la Definición del Objeto Final
 * @param client Referencía al Instancia de Firebase Firestore
 * @param uuid Identificador Único del Usuario a Consultar
 */
export const defineUserInformationObject = async(object:{},client:Firestore,uuid:string) => {
    const getInformationFromDatabase = (await getDoc(doc(collection(client,"user"),uuid)));
    if(getInformationFromDatabase["exists"]()){
        const savedDataFromQueryDatabase = getInformationFromDatabase["data"]()!;
        object["administrator"] = savedDataFromQueryDatabase["administrator"];
        object["role"] = savedDataFromQueryDatabase["role"];
        object["title"] = savedDataFromQueryDatabase["title"];
        return object;
    }else return object;
};