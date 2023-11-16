/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Contexto Global para la Obtención de los Servicios de Firebase
@date 14/11/23 20:30
*/
import {createContext,useEffect,useState,useReducer} from 'react';
import type {FirebaseServices} from '../type/firestore';
import type {Global} from '../type/context';
import type {ReactNode} from 'react';
import type Application from '../type/application';
import type Input from '../type/reducer';
import InitApplication from '../util/application';
import Animate from 'aos';

/** Referencía al Contexto para el Ambito Global de la Aplicación */
export const Context = createContext<Global>({});

/**
 * Referencía al Reducedor para el Ambito Global de la Aplicación
 * @param state Referencía al Objeto Global de la Aplicación
 * @param action Contenedor con las Acciones a Realizar en el Estado
 */
const Reducer = (state:Global,action:Input): Global => {
    const {type,payload} = action;
    switch(type){
        /** Cambiar el Tema Actual de la Aplicación */
        case "hthnozxkocqv":
            document["body"]["setAttribute"]("class",(payload as boolean) ? "dark" : "light");
            state["application"]!.dark = (payload as boolean);
        break;
    }return state;
};

/** Componente para Obtener el Contexto Global para los Hijos de la Aplicación */
export default function({children,firebase}:{
    /** Referencía al Componente Hijo para su Renderización */
    children: ReactNode,
    /** Contenedor con los Servicios de Firebase */
    firebase: FirebaseServices
}){
    const [initialApplication,updateInitialApplication] = useState<{} | null>(null);
    useEffect(() => {
        !initialApplication && InitApplication(updateInitialApplication,{
            storage: firebase["storage"],
            database: firebase["database"]
        });
        Animate["init"]();
    });
    const [state,dispatcher] = useReducer(Reducer,(initialApplication as Global));
    return initialApplication && (
        <Context.Provider value={{...state,application:{...(initialApplication as Application)},firebase,dispatcher}}>
            {children}
        </Context.Provider>
    );
};