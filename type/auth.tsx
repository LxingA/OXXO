/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Prototipo para el Objeto con la Autenticación
@date 16/11/23 23:00
*/
import {Dispatch} from 'react';
import type {User} from 'firebase/auth';
import type Input from '../type/reducer';

/** Definición del Objeto Inicial para la Autenticación de la Aplicación */
export type Authentication = {
    /** Contenedor con los Parámetros Esenciales para las Contraseñas */
    password: {
        /** Mínimo */
        min: number,
        /** Máximo */
        max: number
    },
    /** Permitir el Registro de Nuevas Cuentas en la Aplicación */
    register: boolean,
    /** Contenedor con los Parámetros Esenciales para los Nombres de Usuarios */
    user: {
        /** Mínimo */
        min: number,
        /** Máximo */
        max: number
    },
    /** Tiempo en Milisegundos para Establecer el Tiempo de Inactividad de un Usuario */
    idle: number
};

/** Definición del Prototipo para los Roles de la Aplicación */
type Role = "codeink" | "xink" | "oxxo";

/** Definición del Prototipo con la Información General de un Usuario */
export type UserFromDatabaseInformation = {
    /** Establecer el Usuario con Permisos de Administración */
    administrator?: boolean,
    /** Establecer un Rol Inicial al Usuario */
    role?: Role,
    /** Rol Asignado al Usuario pero Titulado */
    title?: string,
    /** Nombre Completo del Usuario en la Aplicación */
    name?: string,
    /** Correo Electrónico del Usuario en la Aplicación */
    email?: string,
    /** Ruta Absoluta HTTP del Foto de Perfil del Usuario en la Aplicación */
    photo?: string
};

/** Definción del Prototipo para el Objeto de la Autentición */
type Auth = {
    /** Indicar si existe una Sesión Actual en el Contexto */
    state: boolean,
    /** Referencía a la Instancía para realizar el Callback en la Mutación del Objeto */
    dispatcher?: Dispatch<Input>,
    /** Contenedor con la Información General de un Usuario */
    user?: User | null,
    /** Contenedor con la Información Adicional del Usuario */
    information?: UserFromDatabaseInformation
};

export type RoleGroup = Role[];

export default Auth;