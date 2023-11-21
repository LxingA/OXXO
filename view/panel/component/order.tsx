/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de las Ordenes de la Aplicación
@date 20/11/23 14:30
*/
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSearchParams} from 'react-router-dom';
import type {ChangeEvent,MouseEvent} from 'react';
import type {ValidityInput} from '../../login/type/form';

/** Vista para Inicializar la Obtención de Información de los Pedidos */
export const TrackInput = () => {
    const initialState = {value:undefined};
    const {t} = useTranslation();
    const [value,setValue] = useState<ValidityInput>(initialState);
    const [,setQuery] = useSearchParams();
    const buttonLabel = t("SLangAppTranslationViewPanelPageViewButtonLabel")["split"]("|");
    const ChangedHandler = (event:ChangeEvent<HTMLInputElement>) => {
        event["preventDefault"]();
        const definedValueOnArray = event["target"]["value"]["split"](",")["map"](order => {
            if(!isNaN(Number(order))) return parseInt(order);
            else return 0;
        })["filter"](order => order !== 0);
        setValue(state => {
            let current = state;
            if(definedValueOnArray["length"] === 0) current = initialState;
            else{
                if(definedValueOnArray["length"] >= 10) current["check"] = "invalid";
                else{
                    current["check"] = "valid";
                    current["value"] = JSON["stringify"](definedValueOnArray);
                }
            }return {...current};
        });
    };
    const SubmitHandler = (event:MouseEvent<HTMLButtonElement>) => {
        event["preventDefault"]();
        const values = JSON["parse"](value["value"]!) as number[];
        let definedQueryOrders: string = "";
        values["forEach"]((order,iterator) => {
            if(iterator == 0) definedQueryOrders = String(order);
            else if(iterator >= 1 && (iterator <= (values["length"] - 2))) definedQueryOrders += `:${String(order)}`;
            else if(iterator == (values["length"] - 1)) definedQueryOrders += `:${String(order)}`;
        });setQuery({o:definedQueryOrders});
    };
    return (
        <div className="MainCaja">
            <div className="ctnm">
                <i className="uil uil-file-search-alt MainiconH3"></i>
                <h3>
                    {t("SLangAppTranslationViewPanelPageViewTitle")}
                </h3>
                <p>
                    {t("SLangAppTranslationViewLoginSliderMessage")["split"]("|")[0]}
                </p>
                <div className="searchbox2">
                    <input type="search" placeholder="77680, 99100, 100041 (Max. 10)" onChange={ChangedHandler}/>
                    <button className="full" onClick={SubmitHandler} disabled={((value["check"] == "invalid") || !value["value"])}>
                        {buttonLabel[0]}
                    </button>
                </div>
            </div>
        </div>
    );
};

/** Vista para Mostrar los Resultados de la Busqueda de los Pedidos */
export const TrackResult = () => {
    return (
        <div className="panelCtn UnaCaja">

        </div>
    );
};