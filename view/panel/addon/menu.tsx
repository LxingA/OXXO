/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con el Menú Principal del Panel de Control
@date 18/11/23 13:00
*/
import {useContext} from 'react';
import {signOut} from 'firebase/auth';
import {NavLink,Link,useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Context as Authentication} from '../../../context/auth';
import type {Auth} from 'firebase/auth';
import $ from 'jquery';

/** Complemento con el bóton para Cerrar la Sesión de la Aplicación */
export const ButtonSignOut = ({firebaseAuth}:{
    /** Referencía a la Instancía de Firebase Auth With Identity Platform */
    firebaseAuth: Auth
}) => {
    const {t} = useTranslation();
    return (
        <button className="deconexion" onClick={() => signOut(firebaseAuth)}>
            <i className="uil uil-signout"></i>
            <span>
                {t("SLangAppTranslationViewMainMenuLoginLogoutLabel")}
            </span>
        </button>
    );
};

/** Complemento con el Contenedor de la Foto de Perfil y Indicar sí el Usuario está Activo */
export const PhotoCircle = ({userDefault,userPhoto}:{
    /** Ruta Absoluta HTTP de la Foto de Perfil Predeterminado */
    userDefault: string,
    /** Ruta Absoluta HTTP de la Foto de Perfil Original */
    userPhoto: string | null
}) => {
    const {pathname} = useLocation();
    return (
        <div className="ctnUserMini">
            <Link to={{pathname:"/account"}}>
                <div className={(pathname == "/account") ? "iconUser active" : "iconUser"}>
                    <img src={userPhoto ?? userDefault}/>
                </div>
            </Link>
        </div>
    );
};

/** Complemento con el Contenedor de las Páginas del Panel de Control */
export const Navbar = () => {
    const {t} = useTranslation();
    const {user,information} = useContext(Authentication);
    const handler = () => window["matchMedia"]("(min-width:250px) and (max-width:1080px)")["matches"] && $(".navPanelPrimary")["toggleClass"]("active");
    return (
        <div className="menupanelctn">
            <NavLink to="/" onClick={handler}>
                <i className="uil uil-estate"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageIndexTitle")}
                </span>
            </NavLink>
            <NavLink to="/order_view" onClick={handler}>
                <i className="uil uil-file-search-alt"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageViewTitle")}
                </span>
            </NavLink>
            <NavLink to="/order_check" onClick={handler}>
                <i className="uil uil-file-check"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageCheckTile")}
                </span>
            </NavLink>
            <NavLink to="/order_incident" onClick={handler}>
                <i className="uil uil-analysis"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageIncidentTitle")}
                </span>
            </NavLink>
            {user && (information!["role"] == "xink" && (
                <NavLink to="/tool" onClick={handler}>
                    <i className="uil uil-wrench"></i>
                    <span>
                        {t("SLangAppTranslationViewPanelPageToolTitle")}
                    </span>
                </NavLink>
            ))}
        </div>
    );
};