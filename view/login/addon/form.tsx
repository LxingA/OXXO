/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para los Formularios de la Vista de Autenticación
@date 17/11/23 14:00
*/
import {HTMLInputTypeAttribute,ChangeEventHandler} from "react";
import {Link,useLocation} from 'react-router-dom';

/** Definición de una Entrada para la Vista de Autenticación */
export const Input = ({title,options,icon,checker}:{
    /** Definir un Titulo para la Entrada */
    title: string,
    /** Contenedor con Variantes para la Entrada */
    options: {
        /** Tipo de Elemento de Entrada para el DOM */
        type: HTMLInputTypeAttribute,
        /** Mostrar un Mensaje Encima de la Entrada para el DOM */
        placeholder: string,
        /** Definir un Nombre para la Entrada para el DOM */
        name: string,
        /** Instancía del Evento de Detector de Cambios en el DOM */
        onChange?: ChangeEventHandler<HTMLInputElement>,
        /** Indicar sí la Entrada se Deshabilite */
        disabled?: boolean
    },
    /** Nombre del Icono a Aplicar en la Entrada (unicons) */
    icon?: string,
    /** Indicar sí está correcto el Valor de la Entrada */
    checker?: "valid" | "invalid"
}) => {
    return (
        <label>
            <h1>
                {title}
            </h1>
            <input {...options}/>
            <i className={`uil uil-${icon ? icon : "adjust"} IconForm`}></i>
            {checker && (
                <i className={`uil uil-${(checker == "valid") ? "check" : "times"} IconForm MoreIcon ${(checker == "valid") ? "Correct" : "InCorrect"}`}></i>
            )}
        </label>
    );
};

/** Definir un Cuadro de Dialogo al Final de un Formulario para una Interacción en la Vista de la Autenticación */
export const Suggest = ({message,text,path,major}:{
    /** Definir un Mensaje para Mostrar en el Dialogo */
    message: string,
    /** Definir un Texto para Mostrar en el Bóton de Acción */
    text: string,
    /** Definir una Ruta Relativa para la Redirección con el Dialogo */
    path: string,
    /** Cambiar el Formato de Estilo para la Parte Final del Formulario */
    major: boolean
}) => {
    const {search} = useLocation();
    return (
        <div className={major ? "sugerencia" : "misspasword"}>
            <p>
                {message}
            </p>
            <Link to={{pathname:path,search}}>
                {text}
            </Link>
        </div>
    );
};

/** Definir el Dialogo para Mostrar algún mensaje en el Formulario */
export const Dialog = ({message}:{
    /** Definir un Mensaje para Mostrar en el Dialogo */
    message: string
}) => {
    return (
        <div className="errorMini">
            <div className="IconMin animate__rubberBand">
                <i className="uil uil-exclamation-triangle"></i>
            </div>
            <p dangerouslySetInnerHTML={{__html:message}}></p>
        </div>
    );
};