/*
@author LxingA
@project OXXO
@name Help Desk
@description Página para Mostrar la Vista de Información de una Incidencia
@date 05/12/23 22:00
*/
import {useEffect,Fragment} from 'react';
import {useOutletContext} from 'react-router-dom';
import {AddonComponentIncidentEvidenceListView,AddonComponentIncidentPageInformationHistoryContent} from '../addon/incident';
import {useTranslation} from 'react-i18next';
import type Incident from '../type/incident';
import Domain from '../../../util/domain';
import $ from 'jquery';

/** Vista para la Visualización de una Incidencia de la Aplicación */
const View = () => {
    const {t} = useTranslation();
    const context = useOutletContext()!;
    const information = (context["incident"] as Incident);
    useEffect(() => {
        $(".ctnMainPatern")["addClass"]("Reporte");
        return () => {
            $(".ctnMainPatern")["removeClass"]("Reporte");
        };
    },[]);
    return (
        <Fragment>
            <div className="flexie right reportessdiv">
                <div className="incidenciaResponsable">
                    <div className="iconUser">
                        <img src={information["information"]["photo"]}/>
                    </div>
                    <div className="userdts">
                        <strong>
                            {information["information"]["name"] ?? information["information"]["email"]}
                        </strong>
                        <p className="Rango designWeb">
                            {t(information["information"]["title"]!)}
                        </p>
                    </div>
                </div>
                <p className="statusp pending">
                    {t(`SLangAppTranslationIncidentStatus${information["status"]}Label`)}
                </p>
                <h3>
                    <i className="uil uil-file-info-alt"></i>
                    {t("SLangAppTranslationViewPanelPageIncidentViewInformationReportLabel")["replace"]("$ID$",information["id"])}
                </h3>
            </div>
            <div className="ctnReporte">
                <div className="column1">
                    <h3 className="Main">
                        {t("SLangAppTranslationViewPanelPageIncidentViewInformationGeneralLabel")}
                    </h3>
                    <div className="infoCtn">
                        <h2>
                            {t("SLangAppTranslationViewPanelPageIncidentBoxListTitleLabel")}
                        </h2>
                        <p>
                            {information["title"]}
                        </p>
                    </div>
                    <div className="infoCtn">
                        <h2>
                            {t("SLangAppTranslationViewPanelPageIncidentBoxListMessageLabel")}
                        </h2>
                        <p>
                            {information["message"]}
                        </p>
                    </div>
                    {information["order"] && (
                        <div className="infoCtn">
                            <h2>
                                {t("SLangAppTranslationViewPanelPageIncidentViewCreateInputOrdersLabel")}
                            </h2>
                            <div className="idpedidos">
                                {information["order"]["split"](",")["filter"]($ => $ != "")["map"](($txt,$key) => (
                                    <span key={$key}>
                                        {$txt}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="infoCtn Documentos">
                        <h2>
                            {t("SLangAppTranslationViewPanelPageIncidentViewInformationEvidenceLabel")}
                        </h2>
                        <AddonComponentIncidentEvidenceListView box={context["handlers"]["setBoxMedia"]} id={information["id"]} user={information["user"]}/>
                    </div>
                </div>
                <div className="column2">
                    <h3 className="Main">
                        {t("SLangAppTranslationViewPanelPageIncidentViewInformationHistoryLabel")}
                    </h3>
                    <div className="ctn">
                        {information["log"]["length"] > 0 ? information["log"]["map"](($data,$iterator) => (
                            <div className="infoCtn Historial">
                                <AddonComponentIncidentPageInformationHistoryContent key={$iterator} {...$data}/>
                            </div>
                        )) : (
                            <div className="infoCtn Historial">
                                <div className="Annoucement">
                                    <div className="imgBox">
                                        <img src={Domain("empty/incident.webp")}/>
                                    </div>
                                    <h3>
                                        {t("SLangAppTranslationViewPanelPageIncidentViewInformationHistoryEmptyTitle")}
                                    </h3>
                                    <p>
                                        {t("SLangAppTranslationViewPanelPageIncidentViewInformationHistoryEmptyMessage")}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default View;