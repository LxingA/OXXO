/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente de la Cuenta de un Usuario
@date 19/11/23 18:00
*/
import {useTranslation} from 'react-i18next';
import type {HTMLInputTypeAttribute,ChangeEventHandler,MouseEvent} from "react";
import type {ValidityInput} from '../../login/type/form';

/** Complemento para la Definición de las Entradas para la Mutación de la Información de un Usuario */
export const Input = ({title,message,option,checker,state,loading,callback,error}:{
    /** Nombre para Definirlo como Etiqueta para la Entrada */
    title: string,
    /** Definir un mensaje en la Entrada */
    message: string,
    /** Contenedor con las Opciones Esenciales para la Entrada */
    option: {
        /** Tipo de DOM para Establecer en la Entrada */
        type: HTMLInputTypeAttribute,
        /** Definir un Nombre para la Entrada */
        name: string,
        /** Referencía al Callback para el Evento de Cambios para la Entrada */
        onChange?: ChangeEventHandler<HTMLInputElement>
    },
    /** Establecer la Validación de la Entrada */
    checker?: "valid" | "invalid",
    /** Referencía al Estado de las Entradas */
    state: Record<string,ValidityInput>,
    /** Indicar si la Entrada está en Modo Cargando */
    loading: boolean,
    /** Referencía al Callback de Mutación */
    callback: (name:string,event?:MouseEvent<HTMLButtonElement>) => Promise<void>,
    /** Referencía al Mensaje de Error a Mostrar */
    error: string | null
}) => {
    const {t} = useTranslation();
    const buttonLabel = t("SLangAppTranslationViewPanelPageAccountPersonalButtonActionUpdateLabel")["split"]("|");
    return (
        <div className="infoDt">
            <div className="colm1">
                <label>
                    {title}
                </label>
                <input placeholder={message} {...option} disabled={loading}/>
                {checker && (
                    <i className={`uil uil-${(checker == "valid") ? "check" : "times"} IconForm MoreIcon ${(checker == "valid") ? "Correct" : "InCorrect"}`}></i>
                )}
                {error && (
                    <div className="errorMini">
                        <div className="IconMin animate__rubberBand">
                            <i className="uil uil-exclamation-triangle"></i>
                        </div>
                        <p>
                            {error}
                        </p>
                    </div>
                )}
            </div>
            <button onClick={event => callback(option["name"],event)} className="full" disabled={state[option["name"]]["value"] === message || (typeof state[option["name"]]["value"] == "undefined" || state[option["name"]]["check"] == "invalid") || loading}>
                {loading ? buttonLabel[1] : buttonLabel[0]}
            </button>
        </div>
    );
};