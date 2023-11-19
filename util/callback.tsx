/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidades para Realizar Acciones de Forma Reutilizable
@date 16/11/23 20:00
*/
import type {Authentication} from '../type/auth';
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