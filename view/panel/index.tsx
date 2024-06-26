/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla Predeterminada para el Panel de Control de la Aplicación
@date 18/11/23 00:30
*/
import {useEffect,useContext,Fragment} from 'react';
import {useLocation,Outlet} from 'react-router-dom';
import {Context as Service} from '../../context/service';
import {useTranslation} from 'react-i18next';
import {ContainerService,ContainerContextual} from './addon/box';
import ComponentMenu from './component/menu';
import ComponentNavbar from './component/navbar';
import $ from 'jquery';

/** Plantilla Predeterminada para el Panel de Control de la Aplicación */
const Index = () => {
    const {pathname} = useLocation();
    const {application} = useContext(Service);
    const {t} = useTranslation();
    useEffect(() => {
        const name = `${application?.client} ${application?.name}`;
        switch(pathname["split"]("/")[1]){
            case "order_view":
                document["title"] = `${t("SLangAppTranslationViewPanelPageViewTitle")} - ${name}`;
            break;
            case "order_incident":
                document["title"] = `${t("SLangAppTranslationViewPanelPageIncidentTitle")} - ${name}`;
            break;
            case "account":
                document["title"] = `${t("SLangAppTranslationViewPanelPageAccountTitle")} - ${name}`;
            break;
            case "tool":
                document["title"] = `${t("SLangAppTranslationViewPanelPageToolTitle")} - ${name}`;
            break;
            default:
                if(pathname == "/") document["title"] = `${t("SLangAppTranslationViewPanelPageIndexTitle")} - ${name}`;
                else document["title"] = `${t("SLangAppTranslationViewErrorPageGlobalTitle")} - ${name}`;
            break;
        }
    });
    const ServicesTitle = t("SLangAppTranslationViewLoginSliderTitle")["split"]("|");
    const ServicesMessage = t("SLangAppTranslationViewLoginSliderMessage")["split"]("|");
    return (
        <div className="MainContentPanelOxxo">
            <button className="BtnMenuM" onClick={_ => $(".navPanelPrimary")["toggleClass"]("active")}>
                <i className="uil uil-bars"></i>
            </button>
            <div className="navPanelPrimary">
                <ComponentMenu />
            </div>
            <div className="maincontent">
                <ComponentNavbar />
                <div className="ctnMainPatern">
                    {(pathname != "/") ? (
                        <Outlet />
                    ) : (
                        <Fragment>
                            <h3 className="CenterTxt">
                                {t("SLangAppTranslationViewPanelPageIndexContainerServiceTitle")}
                            </h3>
                            <div className="containerFlexie">
                                <ContainerService path="/order_view" icon="file-search-alt" title={ServicesTitle[0]} description={ServicesMessage[0]}/>
                                <ContainerService path="/order_incident" icon="analysis" title={ServicesTitle[1]} description={ServicesMessage[1]}/>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
            <ContainerContextual />
        </div>
    );
};

export default Index;