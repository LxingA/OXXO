/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de las Herramientas Xink de la Aplicación
@date 10/12/23 17:20
*/
import {Dispatch,SetStateAction,useState,useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {ComponentIncidentCreateBox} from '../component/incident';
import {collection,addDoc,Timestamp} from 'firebase/firestore';
import {Context as Service} from '../../../context/service';
import type {MouseEvent} from 'react';
import type {Order} from '../type/tool';
import Timer from 'moment';
import $ from 'jquery';

/** Componente para Mostrar la Navegación de la Tabla de los Pedidos en Herramientas */
export const NavBar = ({disabled,perPage,loading,box}:{
    /** Desahibilitar las acciones en el Píe de Página */
    disabled: boolean,
    /** Contenedor con la Información para la Cantidad de Pedidos a Mostrar */
    perPage: {
        /** Número Actual de Cantidad por Página */
        current: number,
        /** Callback para la Mutación de la Cantidad por Página */
        callback: Dispatch<SetStateAction<number>>
    },
    /** Indicar al Componente que se está Obteniendo la Información de los Pedidos */
    loading: boolean,
    /** Callback para Mostrar el Contenedor para el Registro de nuevos pedidos */
    box: Dispatch<SetStateAction<boolean>>
}) => {
    const {t} = useTranslation();
    const showingMessage = t("SLangAppTranslationViewPanelPageToolNavBarShowingLabel")["split"]("|");
    return (
        <div className="navTable">
            <label>
                {showingMessage[0]}
                <select onChange={$event => perPage["callback"](Number($event["target"]["value"]))} defaultValue={perPage["current"]} disabled={disabled}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                {showingMessage[1]}
            </label>
            <div className="flexright">
                <div className="searchbox">
                    <input type="search" placeholder={t("SLangAppTranslationViewPanelPageToolNavBarInputSearchLabel")} disabled={disabled}/>
                    <button>
                        <i className="uil uil-search"></i>
                    </button>
                </div>
                <button className="full" disabled={loading} onClick={() => box(true)}>
                    <i className="uil uil-plus"></i> {t("SLangAppTranslationViewPanelPageToolNavBarButtonCreateOrderLabel")}
                </button>
            </div>
        </div>
    );
};

/** Componente con la Tabla para Mostrar los Pedidos en la Herramienta Xink */
export const Table = ({orders}:{
    /** Contenedor con Todos los Pedidos en Incidencia */
    orders: Order[]
}) => {
    const {t} = useTranslation();
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnIDLabel")}
                    </th>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnShopLabel")}
                    </th>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnDateCreatedLabel")}
                    </th>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnDateFinishLabel")}
                    </th>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnReasonLabel")}
                    </th>
                    <th>
                        {t("SLangAppTranslationViewPanelPageToolTableColumnActionLabel")}
                    </th>
                </tr>
            </thead>
            {orders["length"] > 0 && (
                <tbody>
                    {orders["map"](({tienda,uniqKey,dateAtCreate,dateAtFinish,reason},iterator) => (
                        <tr key={iterator}>
                            <td>
                                {uniqKey}
                            </td>
                            <td>
                                {tienda}
                            </td>
                            <td>
                                {Timer(dateAtCreate["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm")}
                            </td>
                            <td>
                                {dateAtFinish ? Timer(dateAtFinish["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm") : t("SLangAppTranslationViewPanelPageToolTableColumnDateFinishNotEndeedMessage")}
                            </td>
                            <td>
                                <strong className="status">
                                    {t(`SLangAppTranslationViewPanelPageToolTabelReason${reason}Label`)}
                                </strong>
                            </td>
                            <td>
                                <div className="accioneslist">
                                    <button>
                                        <i className="uil uil-trash-alt"></i>
                                    </button>
                                    <button>
                                        <i className="uil uil-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
};

/** Componente para Mostrar el Píe de Página de la Tabla con los Pedidos de Herramienta Xink */
export const Footer = ({disabled,total,currentPage,limitPerPage}:{
    /** Desahibilitar las acciones en el Píe de Página */
    disabled: boolean,
    /** Número Total de los Pedidos en Incidencia */
    total: number,
    /** Número de Página Actual en el Contexto */
    currentPage: number,
    /** Número Limitante de Pedidos a Mostrar por Página */
    limitPerPage: number
}) => {
    const {t} = useTranslation();
    const totalPages = (Math["ceil"](total / limitPerPage));
    return (
        <div className="finalTable">
            <div className="col1">
                <span>
                    {disabled ? t("SLangAppTranslationViewPanelPageToolFooterPaginationEmptyLabel") : t("SLangAppTranslationViewPanelPageToolFooterPaginationLabel")["replace"]("%ITEM%","5")["replace"]("%TOTAL%","5")}
                </span>
            </div>
            {currentPage >= 2 && (
                <div className="containerPgTion">
                    <div className="pagination">
                        <button className="previous" disabled={disabled || currentPage <= 1}>
                            <i className="uil uil-angle-double-left"></i>
                        </button>
                        <button className="nmbr" disabled={disabled || currentPage == 1}>
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <button className="nmbr" disabled={disabled || (totalPages - 1) == currentPage}>
                            <i className="uil uil-arrow-right"></i>
                        </button>
                        <button className="previous" disabled={disabled || currentPage >= totalPages}>
                            <i className="uil uil-angle-double-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

/** Componente para Mostrar el Formulario para el Registro de Nuevos Pedidos */
export const CardBox = ({callback}:{
    /** Referencía al Callback para Ocultar el Dialogo Actual */
    callback: Dispatch<SetStateAction<boolean>>
}) => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const [input,setInput] = useState<string>();
    const [loading,setLoading] = useState<boolean>(false);
    const buttonRegisterOrderLabel = t("SLangAppTranslationViewPanelPageToolTabelButtonRegisterOrderLabel")["split"]("|");
    const Handler = async($event:MouseEvent<HTMLButtonElement>) => {
        $event["preventDefault"]();
        setLoading(true);
        (await addDoc(collection(firebase!["database"],"order"),{
            tienda: "10CUE50MXN",
            uniqKey: input!,
            dateAtCreate: Timestamp["fromDate"](new Date()),
            reason: $(`select[name="osoxxo_input_order_reason"]`)["val"](),
            complete: false
        } as Order));
        callback(false);
    };return (
        <div className="PopUp CrearIncidencia CrearPedido">
            <div className="contentForm">
                <button className="closeuo" onClick={() => callback(false)}>
                    <i className="uil uil-times"></i>
                </button>
                <h3 className="MainTitle">
                    {t("SLangAppTranslationViewPanelPageToolNavBarButtonCreateOrderLabel")}
                </h3>
                <div className="ctnf">
                    <ComponentIncidentCreateBox require label={t("SLangAppTranslationViewPanelPageToolTableColumnIDLabel")} content={
                        <input type="number" name="osoxxo_input_order_id" onChange={$event => setInput($event["target"]["value"]["length"] == 0 ? undefined : $event["target"]["value"])} disabled={loading}/>
                    }/>
                    <ComponentIncidentCreateBox require={false} label={t("SLangAppTranslationViewPanelPageToolTableColumnReasonLabel")} content={
                        <select defaultValue="JoKyzBgD" name="osoxxo_input_order_reason" disabled={loading}>
                            <option value="JoKyzBgD">
                                {t("SLangAppTranslationViewPanelPageToolTabelReasonJoKyzBgDLabel")}
                            </option>
                            <option value="SPRKhnMV">
                                {t("SLangAppTranslationViewPanelPageToolTabelReasonSPRKhnMVLabel")}
                            </option>
                            <option value="gNuNCpgS">
                                {t("SLangAppTranslationViewPanelPageToolTabelReasongNuNCpgSLabel")}
                            </option>
                            <option value="eQdugVPH">
                                {t("SLangAppTranslationViewPanelPageToolTabelReasoneQdugVPHLabel")}
                            </option>
                            <option value="LMoGkEnh">
                                {t("SLangAppTranslationViewPanelPageToolTabelReasonLMoGkEnhLabel")}
                            </option>
                        </select>
                    }/>
                </div>
                <div className="unlistBUttons">
                    <button className="full" disabled={loading || typeof input == "undefined"} onClick={Handler}>
                        {loading ? buttonRegisterOrderLabel[1] : buttonRegisterOrderLabel[0]}
                    </button>
                </div>
            </div>
        </div>
    );
};