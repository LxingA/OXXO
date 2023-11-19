/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para los Servicios de Firebase
@date 16/11/23 19:30
*/
import {Firestore} from 'firebase/firestore';
import {FirebaseStorage} from 'firebase/storage';
import {Auth} from 'firebase/auth';

/** Prototipo para la Definición del Objeto con los Servicios de Firebase para la Aplicación */
type Firebase = {
    /** Referencía a la Instancia de Firestore como Base de Datos */
    database: Firestore,
    /** Referencía a la Instancia de Cloud Storage como Almacenamiento */
    storage: FirebaseStorage,
    /** Referencía a la Instancía de Authentication With Identity Platform */
    authentication: Auth
};

export default Firebase;