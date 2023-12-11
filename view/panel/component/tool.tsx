/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de las Herramientas Xink de la Aplicación
@date 10/12/23 17:20
*/
import {Dispatch,SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import type {Order} from '../type/tool';

/** Componente para Mostrar la Navegación de la Tabla de los Pedidos en Herramientas */
export const NavBar = ({disabled,perPage,loading}:{
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
    loading: boolean
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
                <button className="full" disabled={loading}>
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
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Pedido
                    </th>
                    <th>
                        Tienda
                    </th>
                    <th>
                        Fecha Registro
                    </th>
                    <th>
                        Fecha Finalizado
                    </th>
                    <th>
                        Motivo
                    </th>
                    <th>
                        Acción
                    </th>
                </tr>
            </thead>
            {orders["length"] > 0 && (
                <tbody>
                    <tr>
                        <td>
                            fksdl
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

/** Componente para Mostrar el Píe de Página de la Tabla con los Pedidos de Herramienta Xink */
export const Footer = ({disabled}:{
    /** Desahibilitar las acciones en el Píe de Página */
    disabled: boolean
}) => {
    const {t} = useTranslation();
    return (
        <div className="finalTable">
            <div className="col1">
                <span>
                    {disabled ? t("SLangAppTranslationViewPanelPageToolFooterPaginationEmptyLabel") : t("SLangAppTranslationViewPanelPageToolFooterPaginationLabel")["replace"]("%ITEM%","5")["replace"]("%TOTAL%","5")}
                </span>
            </div>
            <div className="containerPgTion">
                <div className="pagination">
                    <button className="previous" disabled={disabled}>
                        <i className="uil uil-angle-double-left"></i>
                    </button>
                    <button className="nmbr" disabled={disabled}>
                        <i className="uil uil-arrow-left"></i>
                    </button>
                    <button className="nmbr" disabled={disabled}>
                        <i className="uil uil-arrow-right"></i>
                    </button>
                    <button className="previous" disabled={disabled}>
                        <i className="uil uil-angle-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};