/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con la Cabecera de la Vista de Autenticación
@date 17/11/23 09:00
*/
import {Dispatch} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Input from '../../../type/reducer';

/** Complemento para Mostrar el Logo de la Cabecera */
export const Logo = ({path}:{
    /** Ruta Absoluta HTTP del Logo Principal de la Aplicación */
    path: string
}) => {
    const {search} = useLocation();
    return (
        <div className="col1">
            <Link to={{pathname:"/auth",search}}>
                <img src={path}/>
            </Link>
        </div>
    );
};

/** Complemento para Actualizar el Idioma y el Modo de Tema */
export const Option = ({state,dispatch}:{
    /** Estado Actual del Tema */
    state: boolean,
    /** Callback para la Mutación del Estado de Servicio */
    dispatch: Dispatch<Input>
}) => {
    const {t,i18n:{changeLanguage,language}} = useTranslation();
    return (
        <div className="col2">
            <button className="line" onClick={() => dispatch({
                payload: !state,
                type: "ddslypipjkis"
            })}>
                <i className={`uil uil-${state ? "moon" : "sun"}`}></i>
            </button>
            <select className="line" value={language} onChange={event => changeLanguage(event["target"]["value"])}>
                <option value="es">
                    {t("SLangAppTranslationLanguageLabelES")}
                </option>
                <option value="en">
                    {t("SLangAppTranslationLanguageLabelEN")}
                </option>
            </select>
        </div>
    );
};