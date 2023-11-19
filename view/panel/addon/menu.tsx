/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con el Menú Principal del Panel de Control
@date 18/11/23 13:00
*/
import {signOut} from 'firebase/auth';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import type {Auth} from 'firebase/auth';

/** Complemento con el bóton para Cerrar la Sesión de la Aplicación */
export const ButtonSignOut = ({firebaseAuth}:{
    /** Referencía a la Instancía de Firebase Auth With Identity Platform */
    firebaseAuth: Auth
}) => {
    return (
        <button className="deconexion" onClick={() => signOut(firebaseAuth)}>
            <i className="uil uil-signout"></i>
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
    return (
        <div className="ctnUserMini">
            <div className="iconUser">
                <img src={userPhoto ?? userDefault}/>
            </div>
            <div className="CircleStatusConexion"></div>
        </div>
    );
};

/** Complemento con el Contenedor de las Páginas del Panel de Control */
export const Navbar = () => {
    const {t} = useTranslation();
    return (
        <div className="menupanelctn">
            <NavLink to="/">
                <i className="uil uil-estate"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageIndexTitle")}
                </span>
            </NavLink>
            <NavLink to="/track">
                <i className="uil uil-clipboard-notes"></i>
                <span>
                    {t("SLangAppTranslationViewPanelPageTrackTitle")}
                </span>
            </NavLink>
        </div>
    );
};