/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para Definir unas Cajas Generales del Panel de Control
@date 19/11/23 12:50
*/
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Context as Service} from '../../../context/service';

/** Complemento para Mostrar la Información de un Servicio en un Contenedor */
export const ContainerService = ({icon,title,description,path}:{
    /** Nombre del Icono para Mostrar (Unicons) */
    icon: string,
    /** Titulo a Mostrar en el Contenedor */
    title: string,
    /** Descripción Corta respecto al Servicio para Mostrar en el Contenedor */
    description: string,
    /** Ruta Relativa al Servicio para Mostrar en el Enlace */
    path?: string
}) => {
    const {t} = useTranslation();
    return (
        <div className="boxmed">
            <div className="ctn">
                <i className={`uil uil-${icon}`}></i>
                <h3>
                    {title}
                </h3>
                <p>
                    {description}
                </p>
                <Link to={{pathname:(path ?? "/")}} className="full">
                    {t("SLangAppTranslationViewPanelPanelIndexContainerServiceButtonLabel")}
                </Link>
            </div>
        </div>
    );
};

/** Contenedor con Menú Contextual de las Opciones del Panel de Control */
export const ContainerContextual = () => {
    const {t,i18n:{changeLanguage,language}} = useTranslation();
    const {application,dispatcher} = useContext(Service);
    const darkModeLabel = t("SLangAppTranslationViewPanelContainerOptionsContextualDarkModeActive")["split"]("|");
    return (
        <div className="MenuContextual">
            <h3 className="MainH3">
                <i className="uil uil-setting"></i>
                <span>
                    {t("SLangAppTranslationViewPanelContainerOptionsContextualTitle")}
                </span>
            </h3>
            <div className="ctnOptionMenu" onClick={() => dispatcher!({
                type: "ddslypipjkis",
                payload: !(application?.dark)
            })}>
                <div className="IconMain">
                    <i className="uil uil-moon"></i>
                </div>
                <div className="infocfg">
                    <h3>
                        {t("SLangAppTranslationViewPanelContainerOptionsContextualDarkModeLabel")}
                    </h3>
                    <p>
                        {(application?.dark) ? darkModeLabel[0] : darkModeLabel[1]}
                    </p>
                </div>
                <div className={(application?.dark) ? "checkbox active" : "checkbox"}>
                    <div className="CircleDiv"></div>
                </div>
            </div>
            <div className="ctnOptionMenu">
                <div className="IconMain">
                    <i className="uil uil-english-to-chinese"></i>
                </div>
                <div className="infocfg">
                    <h3>
                        {t("SLangAppTranslationViewPanelContainerOptionsContextualLanguageLabel")}
                    </h3>
                </div>
                <select value={language} onChange={event => changeLanguage(event["target"]["value"])}>
                    <option value="es">
                        {t("SLangAppTranslationLanguageLabelES")}
                    </option>
                    <option value="en">
                        {t("SLangAppTranslationLanguageLabelEN")}
                    </option>
                </select>
            </div>
            <div className="credtismini">
                <p>
                    &copy; {(new Date()).getFullYear()} - {t("SLangAppTranslationViewPanelContainerOptionsCredits")}
                </p>
            </div>
        </div>
    );
};