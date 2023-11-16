/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Contexto Global para la Obtención de los Servicios de Firebase
@date 14/11/23 20:30
*/
import * as React from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import type {FirebaseServices} from '../type/firestore';
import type {Global} from '../type/context';
import type Application from '../type/application';
import InitApplication from '../util/application';

/** Referencía al Contexto para el Ambito Global de la Aplicación */
export const Context = React["createContext"]<Global>({});

/** Componente para Obtener el Contexto Global para los Hijos de la Aplicación */
export default function({children,firebase}:{
    /** Referencía al Componente Hijo para su Renderización */
    children: React.ReactNode,
    /** Contenedor con los Servicios de Firebase */
    firebase: FirebaseServices
}){
    const [initialApplication,updateInitialApplication] = React["useState"]<{} | null>(null);
    React["useEffect"](() => {
        !initialApplication && InitApplication(updateInitialApplication,firebase["database"]);
        initialApplication && onAuthStateChanged(firebase["authentication"],async context => {
            if(context) updateInitialApplication(older => ({...older,application:{authentic:true}}));
            else updateInitialApplication(older => ({...older,user:{},application:{authentic:false}}));
        });
    });
    return initialApplication && (
        <Context.Provider value={{
            firebase,
            application: (initialApplication as Application)
        }}>
            {children}
        </Context.Provider>
    );
};