/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición para el Contexto de Autenticación para la Aplicación
@date 16/11/23 23:00
*/
import {createContext,ReactNode,useEffect,useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import type AuthPrototype from '../type/auth';
//import type Input from '../type/reducer';

/** Definir el Contexto en la Aplicación */
export const Context = createContext<AuthPrototype>({state:false});

/**
 * Definir el Reducedor para el Contexto de Servicio para la Mutación del Estado
 * @param state Referencía al Estado de los Servicios
 * @param action Contenedor con las Acciones a Accionar en la Mutación
 */
/*
const Reducer = (state:AuthPrototype,action:Input) => {
    const {payload,type} = action;
    switch(type){

    }return state;
};
*/

/** Definición del Componente para Inyectar en el DOM de la Aplicación */
export default function({children,client}:{
    /** Referencía al DOM del Hijo para la Inyección */
    children: ReactNode,
    /** Referencía a la Instancía de Firebase Auth with Identity Platform */
    client: Auth
}){
    const initialState: AuthPrototype = {
        state: client["currentUser"] ? true : false,
        user: client["currentUser"] ?? undefined
    };
    const [state,setState] = useState<AuthPrototype>(initialState);
    useEffect(() => {
        const authentic = onAuthStateChanged(client,(user => {
            if(user && !state["user"]) setState({state:true,user});
            else if(!user && state["state"]) setState({state:false,user:undefined});
        }));return () => authentic();
    });
    return (
        <Context.Provider value={{...state}}>
            {children}
        </Context.Provider>
    );
};