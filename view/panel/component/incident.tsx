/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de Incidencias de la Aplicación
@date 28/11/23 19:30
*/
import {Fragment,useContext,useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AddonComponentIncidentButtonsListView,AddonComponentIncidentListViewUserInfoBox,AddonComponentIncidentEvidenceListView} from '../addon/incident';
import {AddonComponentIncidentBoxUpdateIncidence,AddonComponentIncidentBoxMediaShowContent} from '../addon/incident';
import {Context as Authentication} from '../../../context/auth';
import type {Timestamp} from 'firebase/firestore';
import type {SetStateAction,Dispatch} from 'react';
import type {RoleGroup} from '../../../type/auth';
import type {BoxProcessor,BoxMedia} from '../type/incident';
import Domain from '../../../util/domain';
import Timer from 'moment';

/** Componente con la Caja para el Formulario para la Creación de una Incidencia */
export const ComponentIncidentCreateBox = ({label,content,require}:{
    /** Titulo a Mostrar en el Cuadro */
    label: string,
    /** Contenido en Formato JSX para la Renderización */
    content: JSX.Element,
    /** Indicar en el Titulo sí es Obligatorio la Entrada */
    require: boolean
}) => {
    return (
        <div className="flexie">
            <h3>
                {label}{require && "*"}
            </h3>
            <div className="labelContent">
                {content}
            </div>
        </div>
    );
};

/** Componente para Mostrar la Vista Predeterminada para la Incidencia */
export const ComponentIncidentEmptyView = ({title,message}:{
    /** Definir un Titulo para la Vista */
    title: string,
    /** Definir un Mensaje para la Vista */
    message: string
}) => {
    return (
        <Fragment>
            <div className="imgBox">
                <img src={Domain("empty/incident.webp")}/>
                <h3>
                    {title}
                </h3>
                <p>
                    {message}
                </p>
            </div>
        </Fragment>
    );
};

/** Componente para Mostrar la Vista de la Incidencia en Modo Listado */
export const ComponentIncidentListView = ({title,uniqKey,statusID,description,createdAt,user,order,id}:{
    /** Definir el Titulo para Mostrar en el Componente */
    title: string,
    /** Definir la ID Única de la Incidencia en el Componente */
    uniqKey: string,
    /** Definir la ID Única Identificadora del Estatus Actual de la Incidencia en el Componente */
    statusID: number,
    /** Definir la Descripción Acerca de la Incidencia en el Componente */
    description: string,
    /** Definir la Fecha de Creación de la Incidencia en el Componente */
    createdAt: Timestamp,
    /** Contenedor con la Información Adicional del Usuario de la Incidencia para el Componente */
    user: {
        /** Nombre Completo o el Correo Electrónico del Usuario */
        name: string,
        /** Rango Actual del Usuario */
        role: string,
        /** Ruta Absoluta HTTP de la Foto de Perfil del Usuario */
        photo: string,
        /** ID Único del Usuario */
        id: string
    },
    /** Contenedor con los Pedidos Asociadas a la Incidencia para el Componente */
    order?: string[],
    /** Identificador Único del Documento Asociada a la Incidencia para el Componente */
    id: string
}) => {
    const {t} = useTranslation();
    const {information} = useContext(Authentication);
    const [boxProcess,setBoxProcess] = useState<BoxProcessor>();
    const [boxFollow,setBoxFollow] = useState<boolean>(false);
    const [boxMedia,setBoxMedia] = useState<BoxMedia>();
    const permission = (['xink'] as RoleGroup)["includes"](information!["role"]!);
    const maxLength = 42;
    return (
        <div className={(["oxxo"] as RoleGroup)["includes"](information!["role"]!) ? "box viewoxxo" : "box"}>
            {boxProcess && (
                <div className="ProcesoDiv">
                    <div className="ctn">
                        <h3>
                            {boxProcess["title"]}
                        </h3>
                        <p>
                            {boxProcess["message"]}
                        </p>
                    </div>
                </div>
            )}
            {boxFollow && (
                <AddonComponentIncidentBoxUpdateIncidence callback={setBoxFollow}/>
            )}
            {boxMedia && (
                <AddonComponentIncidentBoxMediaShowContent {...boxMedia}/>
            )}
            <div className="boxing IDIncd">
                <div className="statusBarra Pendiente"></div>
                {(['xink'] as RoleGroup)["includes"](information!["role"]!) && (
                    <AddonComponentIncidentListViewUserInfoBox role={user["role"]} name={user["name"]} photo={user["photo"]}/>
                )}
                <div className="csad">
                    <div className="ctnn">
                        <strong>
                            {uniqKey}
                        </strong>
                        <p>
                            {t("SLangAppTranslationViewPanelPageIncidentBoxListIDLabel")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="boxing titleinc">
                <div className="ctnn">
                    <strong title={title["length"] >= maxLength ? title : undefined}>
                        {title["substring"](0,maxLength)}{title["length"] >= maxLength && "..."}
                    </strong>
                    <p>
                        {t("SLangAppTranslationViewPanelPageIncidentBoxListTitleLabel")}
                    </p>
                </div>
            </div>
            <div className="boxing descrip">
                <div className="ctnn">
                    <strong title={description["length"] >= maxLength ? description : undefined}>
                        {description["substring"](0,maxLength)}{description["length"] >= maxLength && "..."}
                    </strong>
                    <p>
                        {t("SLangAppTranslationViewPanelPageIncidentBoxListMessageLabel")}
                    </p>
                </div>
            </div>
            {order && (
                <div className="boxing idinc">
                    <div className="ctnn">
                        {order["map"]((id,uniqKey) => (
                            <span key={uniqKey}>
                                {id}
                            </span>
                        ))}
                        <strong>
                            {t("SLangAppTranslationViewPanelPageIncidentBoxListOrderLabel")}
                        </strong>
                    </div>
                </div>
            )}
            <div className="boxing fcha">
                <div className="ctnn">
                    <strong>
                        {Timer(createdAt["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm")}
                    </strong>
                    <p>
                        {t("SLangAppTranslationViewPanelPageIncidentBoxListDateLabel")}
                    </p>
                </div>
            </div>
            <div className="boxing Estatuss">
                <div className="ctnn">
                    <p className="statusp" style={permission ? {cursor:"pointer"} : undefined} onClick={() => permission && setBoxFollow(true)}>
                        {t(`SLangAppTranslationIncidentStatus${statusID["toString"]()}Label`)}
                    </p>
                </div>
            </div>
            {(['oxxo'] as RoleGroup)["includes"](information!["role"]!) && (
                <AddonComponentIncidentButtonsListView id={id} uniqKey={uniqKey} box={setBoxProcess}/>
            )}
            {permission && (
                <AddonComponentIncidentEvidenceListView box={setBoxMedia} id={uniqKey} user={user["id"]}/>
            )}
        </div>
    );
};

/** Componente con la Paginación de la Vista del Listado de las Incidencias */
export const ComponentIncidentListViewPagination = ({currentPage,totalIncidents,pagedHandler}:{
    /** Página Actual de la Vista */
    currentPage: number,
    /** Total de Incidencias Consultadas */
    totalIncidents: number,
    /** Referencía al Callback para la Mutación de la Paginación Actual de la Vista */
    pagedHandler: Dispatch<SetStateAction<number>>
}) => {
    const {t} = useTranslation();
    const totalPages = Math["ceil"](totalIncidents / 4);
    return (
        <div className="containerPgTion">
            <div className="pagination">
                <button className="previous" disabled={currentPage <= 1} onClick={_ => pagedHandler(1)}>
                    <i className="uil uil-angle-double-left"></i>
                </button>
                <button className="nmbr" disabled={currentPage <= 1} onClick={_ => pagedHandler(currentPage - 1)}>
                    <i className="uil uil-arrow-left"></i>
                </button>
                <button className="nmbr" disabled={currentPage == totalPages} onClick={_ => pagedHandler(currentPage + 1)}>
                    <i className="uil uil-arrow-right"></i>
                </button>
                <button className="previous" disabled={currentPage == totalPages} onClick={_ => pagedHandler(totalPages)}>
                    <i className="uil uil-angle-double-right"></i>
                </button>
            </div>
            <p>
                {t("SLangAppTranslationViewPanelPageIncidentPaginationLabel")["replace"]("%current%",((currentPage == totalPages) ? totalIncidents : (4 * currentPage))["toString"]())["replace"]("%total%",totalIncidents["toString"]())}
            </p>
        </div>
    );
};