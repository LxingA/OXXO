/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Objecto con la Información de la Aplicación desde Firebase
@date 14/11/23 20:30
*/
import {getDoc,doc} from 'firebase/firestore';
import {ref,listAll,getDownloadURL} from 'firebase/storage';
import type {Dispatch,SetStateAction} from 'react';
import type {Firestore} from 'firebase/firestore';
import type {FirebaseStorage} from 'firebase/storage';

/**
 * Inicialización del Objeto con la Información de la Aplicación
 * @param state Referencía a la Función de useState para la Alteración del Estado
 * @param client Contenedor con las Instancías de los Clientes de Firebase
 */
export default async function(state:Dispatch<SetStateAction<{} | null>>,client:{
    /** Referencía a la Instancía de Firestore en Firebase */
    database: Firestore,
    /** Referencía a la Instancía de Cloud Storage en Firebase */
    storage: FirebaseStorage
}): Promise<void> {
    const reference = {
        /** Obtención de la Información  */
        general: (await getDoc(doc(client["database"],"application","general")))
    };
    const application = {
        authentic: false,
        dark: false,
        logo: {}
    };
    if(reference["general"]["exists"]()){
        /** Objeto para la Inicialización de los Recursos de la Aplicación */
        const assets = {};
        const general = (reference["general"]["data"]()!);
        (await Promise["all"](
            (await listAll(ref(client["storage"],"a")))["items"]["map"](async ({storage,fullPath,name}) => {
                assets[name] = (await getDownloadURL(ref(storage,fullPath)));
            })
        ));
        application["name"] = general["appName"];
        application["logo"]["color"] = assets["3c589326-d2c5-4e74-8810-76d5a3e04670-c.webp"];
        application["logo"]["dark"] = assets["3c589326-d2c5-4e74-8810-76d5a3e04670-d.webp"];
        application["logo"]["white"] = assets["3c589326-d2c5-4e74-8810-76d5a3e04670-w.webp"];
        state(application);
    };
};