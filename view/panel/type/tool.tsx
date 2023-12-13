/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipos para la Definición de los Objetos con la Información Esencial para las Herramientas de Xink
@date 10/12/23 23:30
*/
import type {Timestamp} from 'firebase/firestore';

/** Definición del Objeto para los Pedidos en Incidencia */
export type Order = {
    /** ID de la Tienda [CR] Asociada al Pedido */
    tienda: string,
    /** Número de Pedido */
    uniqKey: string,
    /** Fecha de Creación del Pedido */
    dateAtCreate: Timestamp,
    /** Fecha de Finalización del Pedido */
    dateAtFinish?: Timestamp,
    /** Identificador Único del Motivo del Pedido */
    reason: string,
    /** Indicar si la Orden se Encuentra Concluida */
    complete: boolean,
    /** ID Única del Documento Asociada al Pedido */
    id: string,
    /** Contenedor con los Nombres de los Miembros que Creó y Finalizó el Pedido */
    user: string[]
};