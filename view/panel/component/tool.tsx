/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de las Herramientas Xink de la Aplicación
@date 10/12/23 17:20
*/
import {Dispatch,SetStateAction,useState,useContext,useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ComponentIncidentCreateBox} from '../component/incident';
import {collection,addDoc,Timestamp,deleteDoc,doc,updateDoc} from 'firebase/firestore';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import type {MouseEvent} from 'react';
import type {Order} from '../type/tool';
import Timer from 'moment';
import $ from 'jquery';

/** Componente para Mostrar la Navegación de la Tabla de los Pedidos en Herramientas */
export const NavBar = ({disabled,perPage,loading,box,searching}:{
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
    box: Dispatch<SetStateAction<boolean>>,
    /** Callback para Consultar un Pedido en el Buscador */
    searching: Dispatch<SetStateAction<string | undefined>>
}) => {
    const {t} = useTranslation();
    const showingMessage = t("SLangAppTranslationViewPanelPageToolNavBarShowingLabel")["split"]("|");
    const referenceSearch = useRef<HTMLInputElement>(null);
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
                    <input ref={referenceSearch} onChange={$event => searching($event["target"]["value"] ?? undefined)} type="search" placeholder={t("SLangAppTranslationViewPanelPageToolNavBarInputSearchLabel")} disabled={disabled}/>
                    <button onClick={$event => {
                        $event["preventDefault"]();
                        referenceSearch!["current"]!["value"] = "";
                        searching(undefined);
                    }}>
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
    const {information} = useContext(Authentication);
    const {firebase} = useContext(Service);
    const handler = {
        delete: async($event:MouseEvent<HTMLButtonElement>,$key:string) => {
            $event["preventDefault"]();
            (await deleteDoc(doc(firebase!["database"],`order/${$key}`)));
        },
        complete: async($event:MouseEvent<HTMLButtonElement>,$key:string,$value:boolean,$user:string[]) => {
            $event["preventDefault"]();
            $user["push"](information!["name"]?.split(" ")[0] ?? information!["email"]!["split"]("@")[0]);
            (await updateDoc(doc(firebase!["database"],`order/${$key}`),{
                complete: $value,
                dateAtFinish: Timestamp["fromDate"](new Date()),
                user: $user
            }));
        }
    };
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
                    {orders["map"](({tienda,uniqKey,dateAtCreate,dateAtFinish,reason,id,complete,user},iterator) => (
                        <tr key={iterator}>
                            <td>
                                {uniqKey}
                            </td>
                            <td>
                                {tienda}
                            </td>
                            <td>
                                {t("SLangAppTranslationViewPanelPageToolDateFormatLabel")["replace"]("%date%",Timer(dateAtCreate["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss"))["replace"]("%user%",user[0])}
                            </td>
                            <td>
                                {dateAtFinish ? t("SLangAppTranslationViewPanelPageToolDateFormatLabel")["replace"]("%date%",Timer(dateAtFinish["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss"))["replace"]("%user%",user[1]) : t("SLangAppTranslationViewPanelPageToolTableColumnDateFinishNotEndeedMessage")}
                            </td>
                            <td>
                                <strong className="status">
                                    {t(`SLangAppTranslationViewPanelPageToolTabelReason${reason}Label`)}
                                </strong>
                            </td>
                            <td>
                                <div className="accioneslist">
                                    <button onClick={$event => handler["delete"]($event,id)}>
                                        <i className="uil uil-trash-alt"></i>
                                    </button>
                                    <button onClick={$event => handler["complete"]($event,id,!complete,user)} className={complete ? "complete" : undefined} disabled={complete}>
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
export const Footer = ({disabled,total,currentPage,limitPerPage,orders,callback}:{
    /** Desahibilitar las acciones en el Píe de Página */
    disabled: boolean,
    /** Número Total de los Pedidos en Incidencia */
    total: number,
    /** Número de Página Actual en el Contexto */
    currentPage: number,
    /** Número Limitante de Pedidos a Mostrar por Página */
    limitPerPage: number,
    /** Referencía al Contenedor con Todos los Pedidos en Incidencia */
    orders?: Order[][],
    /** Referencía al Callback para la Mutación de la Página Actual */
    callback: Dispatch<SetStateAction<number>>
}) => {
    const {t} = useTranslation();
    const totalPages = (Math["ceil"](total / limitPerPage));
    return (
        <div className="finalTable">
            <div className="col1">
                <span>
                    {disabled ? t("SLangAppTranslationViewPanelPageToolFooterPaginationEmptyLabel") : t("SLangAppTranslationViewPanelPageToolFooterPaginationLabel")["replace"]("%ITEM%",(currentPage == totalPages ? total["toString"]() : (limitPerPage * currentPage)["toString"]()))["replace"]("%TOTAL%",total["toString"]())}
                </span>
            </div>
            {(orders && orders["length"] > 1) && (
                <div className="containerPgTion">
                    <div className="pagination">
                        <button onClick={() => callback(1)} className="previous" disabled={disabled || currentPage <= 1}>
                            <i className="uil uil-angle-double-left"></i>
                        </button>
                        <button onClick={() => callback(currentPage - 1)} className="nmbr" disabled={disabled || currentPage == 1}>
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <button onClick={() => callback(currentPage + 1)} className="nmbr" disabled={disabled || totalPages == currentPage}>
                            <i className="uil uil-arrow-right"></i>
                        </button>
                        <button onClick={() => callback(totalPages)} className="previous" disabled={disabled || currentPage >= totalPages}>
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
    const {information} = useContext(Authentication);
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
            complete: false,
            user: [information!["name"]?.split(" ")[0] ?? information!["email"]!["split"]("@")[0]]
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