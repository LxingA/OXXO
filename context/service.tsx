/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Contexto de Servicio para la Aplicación
@date 16/11/23 21:30
*/
import {createContext,useReducer,ReactNode,useLayoutEffect,useEffect} from 'react';
import Animate from 'aos';
import DOM from '../util/element';
import type Input from '../type/reducer';
import type ServicePrototype from '../type/service';

/** Definir el Contexto en la Aplicación */
export const Context = createContext<ServicePrototype>({});

/**
 * Definir el Reducedor para el Contexto de Servicio para la Mutación del Estado
 * @param state Referencía al Estado de los Servicios
 * @param action Contenedor con las Acciones a Accionar en la Mutación
 */
const Reducer = (state:ServicePrototype,action:Input) => {
    const {payload,type} = action;
    switch(type){
        /** Cambiar el Aspecto del Tema */
        case "ddslypipjkis":
            document["body"]["setAttribute"]("class",((payload as boolean) ? "dark" : "light"));
            let savedReferenceParentApplication = state["application"]!;
            savedReferenceParentApplication["dark"] = (payload as boolean);
            return {...state,application:savedReferenceParentApplication};
    }
};

/** Definición del Componente para Inyectar en el DOM de la Aplicación */
export default function({children,service}:{
    /** Referencía al DOM del Hijo para la Inyección */
    children: ReactNode,
    /** Referencía al Objeto con los Servicios de la Aplicación */
    service: ServicePrototype
}){
    useLayoutEffect(() => {
        DOM({
            rel: "icon",
            href: service["asset"]?.icon?.normal,
            type: "image/x-icon",
            id: "favicon"
        },document);
    });
    useEffect(() => {
        Animate["init"]();
    });
    const [state,dispatcher] = useReducer(Reducer,service);
    return (
        <Context.Provider value={{...state,dispatcher}}>
            {children}
        </Context.Provider>
    );
}