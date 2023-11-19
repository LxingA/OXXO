/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla Predeterminada para el Panel de Control de la Aplicación
@date 18/11/23 00:30
*/
import {useEffect,useContext} from 'react';
import {useLocation,Outlet} from 'react-router-dom';
import {Context as Service} from '../../context/service';
import {useTranslation} from 'react-i18next';
import ComponentMenu from './component/menu';
import ComponentNavbar from './component/navbar';

/** Plantilla Predeterminada para el Panel de Control de la Aplicación */
const Index = () => {
    const {pathname} = useLocation();
    const {application} = useContext(Service);
    const {t} = useTranslation();
    useEffect(() => {
        const name = `${application?.client} ${application?.name}`;
        switch(pathname){
            case "/":
                document["title"] = `${t("SLangAppTranslationViewPanelPageIndexTitle")} - ${name}`;
            break;
            case "/track":
                document["title"] = `${t("SLangAppTranslationViewPanelPageTrackTitle")} - ${name}`;
            break;
        }
    });
    return (
        <div className="MainContentPanelOxxo">
            <div className="navPanelPrimary">
                <ComponentMenu />
            </div>
            <div className="maincontent">
                <ComponentNavbar />
                <div className="ctnMainPatern">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Index;