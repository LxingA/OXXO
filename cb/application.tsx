/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Objecto con la Información de la Aplicación desde Firebase
@date 14/11/23 20:30
*/
import * as React from 'react';
import {getDoc,doc} from 'firebase/firestore';
import type {Firestore} from 'firebase/firestore';

/**
 * Inicialización del Objeto con la Información de la Aplicación
 * @param state Referencía a la Función de useState para la Alteración del Estado
 * @param client Referencía al Instancía del Cliente Firestore de Firebase
 */
export default async function(state:React.Dispatch<React.SetStateAction<{} | null>>,client:Firestore): Promise<void> {
    const reference = {
        /** Obtención de la Información  */
        general: (await getDoc(doc(client,"application","general")))
    };
    const application = {};
    if(reference["exists"]()){
        const general = (reference["general"]["data"]()!);
        application["name"] = general["appName"];
        state(application);
    };
};