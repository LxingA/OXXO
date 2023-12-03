/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipo para la Definición del Objeto con la Información de las Incidencias de la Aplicación
@date 28/11/23 17:00
*/
import type {Timestamp} from 'firebase/firestore';
import type {UserFromDatabaseInformation} from '../../../type/auth';

/** Prototipo para la Definición del Objeto para las Evidencias de las Incidencias */
export type Evidence = {
    /** Nombre de la Evidencia Original */
    name: string,
    /** Ruta Absoluta HTTP de la Evidencia Original Firmada */
    url: string,
    /** Tipo de MIME de la Evidencia Original */
    mime: string
};

/** Prototipo con la Definición del Objeto con la Información de una Incidencia */
interface Incident {
    /** Definición del Titulo para la Incidencia */
    title: string,
    /** Identificador Único de la Incidencia */
    id: string,
    /** Identificador Único del Usuario de la Incidencia */
    user: string,
    /** Fecha de Creación de la Incidencia */
    date: Timestamp,
    /** Número de Referencía del Estatus Actual de la Incidencia */
    status: number,
    /** Mensaje Descriptivo Acerca de la Incidencia */
    message: string,
    /** Contenedor con la Información Adicional del Usuario de la Incidencia */
    information: UserFromDatabaseInformation,
    /** Pedidos Asociadas a la Incidencia */
    order: string,
    /** Contenedor con las Evidencias de la Incidencia */
    evidence: Evidence[]
};

export default Incident;