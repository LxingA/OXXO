/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con la Barra de Navegación del Panel de Control
@date 18/11/23 15:30
*/
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import $ from 'jquery';

/** Complemento para Mostrar el Saludo al Usuario */
export const UserGreeting = ({name}:{
    /** Nombre del Usuario o Correo Electrónico */
    name: string
}) => {
    const {t} = useTranslation();
    name = (name["includes"]("@")) ? name : `${name["split"](" ")[0]} ${name["split"](" ")[2] ?? ""}`;
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewPanelNavbarGreetingLabel")}, <strong>{name}</strong>
            </h3>
        </Fragment>
    );
};

/** Contenedor con el Buscador y Opciones para el Panel de Control */
export const Options = ({enableSearch}:{
    /** Activar el Buscador en la Aplicación */
    enableSearch: boolean
}) => {
    const {t} = useTranslation();
    return (
        <Fragment>
            {enableSearch && (
                <div className="searchbox">
                    <input type="search" placeholder={t("SLangAppTranslationViewPanelContainerOptionsSearchInputLabel")}/>
                    <button >
                        <i className="uil uil-search"></i>
                    </button>
                </div>
            )}
            <button className="Mini">
                <i className="uil uil-bell"></i>
            </button>
            <button className="Mini ConfigBtn" onClick={() => $(".MenuContextual")["toggleClass"]("openmnu")}>
                <i className="uil uil-setting"></i>
            </button>
        </Fragment>
    );
};