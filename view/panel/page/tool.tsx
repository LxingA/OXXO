/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para la Zona de Herramientas de Xink
@date 09/12/23 18:00
*/
import {Fragment,useContext} from 'react';
import {NavLink,useLocation,Outlet} from 'react-router-dom';
import {Context as Authentication} from '../../../context/auth';
import {useTranslation} from 'react-i18next';
import type {RoleGroup} from '../../../type/auth';
import Domain from '../../../util/domain';

/** Vista Predeterminada para la Zona de Herramientas XINK */
const Tool = () => {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const {information} = useContext(Authentication);
    return (["xink"] as RoleGroup)["includes"](information!["role"]!) ? (
        <Fragment>
            <div className="CtnEnlaces">
                <NavLink to="./order" relative="path">
                    <i className="uil uil-file-copy-alt"></i>
                    <span>
                        {t("SLangAppTranslationViewPanelPageToolNavLinkOrderLabel")}
                    </span>
                </NavLink>
                <NavLink to="./address" relative="path">
                    <i className="uil uil-map-marker"></i>
                    <span>
                        {t("SLangAppTranslationViewPanelPageToolNavLinkAddressLabel")}
                    </span>
                </NavLink>
            </div>
            {pathname == "/tool" ? (
                <div className="Annoucement">
                    <div className="imgBox">
                        <img src={Domain("empty/tool.webp")}/>
                        <h3>
                            {t("SLangAppTranslationViewPanelPageToolTitle")}
                        </h3>
                        <p>
                            {t("SLangAppTranslationViewPanelPageToolDescription")}
                        </p>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </Fragment>
    ) : (
        <div className="Annoucement">
            <div className="imgBox">
                <img src={Domain("empty/tool.webp")}/>
                <h3>
                    {t("SLangAppTranslationViewPanelPageIncidentRestrictViewTitle")}
                </h3>
                <p>
                    {t("SLangAppTranslationViewPanelPageIncidentRestrictViewMessage")}
                </p>
            </div>
        </div>
    );
};

export default Tool;