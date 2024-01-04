/*
@author LxingA
@project OXXO
@name Help Desk
@description Prototipos para la Definición de los Objetos con la Información Esencial para las Herramientas de Xink
@date 10/12/23 23:30
*/
import type {Timestamp} from 'firebase/firestore';

/** Definición del Objeto con la Información de la Dirección de una Tienda */
export type Address = {
    /** ID de la Tienda */
    cr: string,
    /** Contenedor con las Fecha de Edición de la Tienda */
    date: {
        /** Fecha de Creación en Formato Stamp */
        created: Timestamp,
        /** Fecha de Modificación en Formato Stamp */
        modified?: Timestamp,
        /** Fecha de Envío al Analista en Formato Stamp */
        sended?: Timestamp
    },
    /** Nombre de la Tienda */
    name: string,
    /** Coordenadas de la Tienda en la Geolocalización */
    position: {
        /** Latitud de la Geolocalización */
        lat: number,
        /** Longitud de la Geolocalización */
        lng: number
    },
    /** Código Postal de la Tienda */
    postal: number,
    /** Nombre de la Calle Principal de la Tienda */
    street: string,
    /** Referencías de la Tienda */
    ref: string,
    /** Número Exterior de la Tienda */
    exterior: number,
    /** Colonia de la Tienda */
    colony: string,
    /** Ciudad de la Tienda */
    city: string,
    /** Municipio de la Tienda */
    town: string,
    /** Estado de la Tienda */
    state: string,
    /** Mensaje de Acción al Analista */
    message?: string,
    /** Clave Único Generado al Enviar los Cambios al Analista */
    uniqKey?: string,
    /** Indicar al Analista que se requiere actualizar la Geolocalización de la Tienda */
    geo: boolean
};

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