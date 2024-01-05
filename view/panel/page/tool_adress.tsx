/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista para la Visualización de las Tiendas con sus Direcciones para su Modificación
@date 03/01/24 13:40
*/
import {useEffect,useState,useContext,useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {Footer,NavBar} from '../component/tool';
import {getDocs,query,collection,doc,updateDoc,where,limit, Timestamp} from 'firebase/firestore';
import {search as SearchHandler,random} from '../../../util/extra';
import type {QueryConstraint} from 'firebase/firestore';
import type {Address as AddressPrototype} from '../type/tool';
import type {ReactNode} from 'react';
import Fetcher from '../../../util/fetch';
import Loader from '../../loader';
import Timer from 'moment';

/** Vista para las Direcciones de la Tienda */
const Address = () => {
    const {firebase} = useContext(Service);
    const {user} = useContext(Authentication);
    const {t} = useTranslation();
    const [item,setItem] = useState<AddressPrototype[][]>();
    const [page,setPage] = useState<number>(1);
    const [total,setTotal] = useState<number>(0);
    const [search,setSearch] = useState<string>();
    const [input,setInput] = useState<string>();
    const [sender,setSender] = useState<string>();
    const __init__ = async() => {
        const _definedBucketItems_: AddressPrototype[] = [];
        const _definedQueryContraints_: QueryConstraint[] = []; 
        (await Promise["all"](
            (await getDocs(query(collection(firebase!["database"],"address"),..._definedQueryContraints_)))["docs"]["map"]($item => {
                if(!$item["exists"]()) return;
                else _definedBucketItems_["push"]($item["data"]() as AddressPrototype);
            })
        ));
        setTotal(_definedBucketItems_["length"]);
        const _definedPaginationOnItems_: AddressPrototype[][] = [];
        for(let $x = 0; $x < _definedBucketItems_["length"]; $x += 10) _definedPaginationOnItems_["push"](_definedBucketItems_["slice"]($x,($x + 10)));
        setItem(_definedPaginationOnItems_);
    };
    useEffect(() => {
        !item && __init__();
    },[]);
    const Editable = ({name,children,dbKey,uniqKey,keys}:{
        /** Nombre de la Entrada para Definir */
        name: string,
        /** Referencia al Valor Actual */
        children: ReactNode,
        /** Nombre de la Llave que está en la Base de Datos */
        dbKey: string,
        /** ID del Documento a Actualizar en la Base de Datos */
        uniqKey: string,
        /** Contenedor con las Referencias Actuales del Objeto en el Contenedor Global */
        keys: number[]
    }) => {
        const __input__ = () => {
            const initialInputDOM = useRef<HTMLInputElement>(null);
            const __handler__ = async ev => {
                if(ev["code"] == "Enter" && String(children)["length"] > 0){
                    if(initialInputDOM["current"] && initialInputDOM["current"]["value"] != String(children)){
                        const __referenceIDDoc__ = (await getDocs(query(collection(firebase!["database"],"address"),where("cr","==",uniqKey),limit(1))));
                        let __definedObjectUpdatedData__ = {date:{...__referenceIDDoc__["docs"][0]["data"]()["date"]}};
                        __definedObjectUpdatedData__[dbKey] = String(initialInputDOM["current"]["value"])["toLocaleUpperCase"]();
                        __definedObjectUpdatedData__["date"]["modified"] = Timestamp["fromDate"](new Date());
                        if(!__referenceIDDoc__["empty"]) updateDoc(doc(firebase!["database"],`address/${__referenceIDDoc__["docs"][0]["id"]}`),__definedObjectUpdatedData__);
                        let savedReferenceCurrentItems = item!;
                        savedReferenceCurrentItems[keys[0]][keys[1]][dbKey] = String(initialInputDOM["current"]["value"])["toLocaleUpperCase"]();
                        setItem(savedReferenceCurrentItems);
                        setInput(undefined);
                    }else setInput(undefined);
                }else if(ev["code"] == "Escape") setInput(undefined);
            };
            useEffect(() => {
                document["addEventListener"]("keydown",__handler__,true);
                return () => document["removeEventListener"]("keydown",__handler__,true);
            },[]);
            return (
                <input ref={initialInputDOM} type="text" placeholder={children as string} defaultValue={children as string | number}/>
            );
        };
        return (input && input == name) ? (
            <__input__ />
        ) : (
            <span onClick={$event => {
                $event["preventDefault"]();
                setInput(name);
            }}>
                {children}
            </span>
        )
    };
    return !item ? <Loader /> : (
        <div className="ctnTable Direcciones">
            <NavBar disabled={typeof item == "undefined" || item["length"] == 0} loading={typeof item == "undefined"} searching={setSearch} button={false}/>
            <div className="overflowauto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCR")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelDate")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelName")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCorX")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelPostal")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelStreet")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelRef")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelExt")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCly")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCty")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelTwn")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelState")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelMessage")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelGeo")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelForm")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelButtons")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(item && item["length"] >= 1) && ((search ? SearchHandler({item,seachFor:"cr",keyboard:search}) : item[page - 1]) as AddressPrototype[])["map"](({cr,date,name,position:{lat,lng},postal,street,ref,exterior,state,town,city,message,uniqKey,colony,geo},index) => {
                            const ckNameClickEvent = `cktr_${cr["toLowerCase"]()}_%type%`;
                            const definedParamsDefault = {keys:[(page - 1),index],uniqKey:cr};
                            return (
                                <tr key={index}>
                                    <td>
                                        {cr}
                                    </td>
                                    <td title={("modified" in date) ? Timer(date["modified"]!["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss") : "Sin Modificación"}>
                                        {Timer(date["created"]["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss")}
                                    </td>
                                    <td>
                                        {name}
                                    </td>
                                    <td>
                                        <a href={`https://www.google.com/maps/place/${lat}+${lng}`} target="_blank">
                                            {lat} {lng}
                                        </a>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="postal" name={ckNameClickEvent["replace"]("%type%","cp")}>
                                            {postal}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="street" name={ckNameClickEvent["replace"]("%type%","stt")}>
                                            {street}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="ref" name={ckNameClickEvent["replace"]("%type%","ref")}>
                                            {ref}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="exterior" name={ckNameClickEvent["replace"]("%type%","ext")}>
                                            {exterior}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="colony" name={ckNameClickEvent["replace"]("%type%","cly")}>
                                            {colony}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="city" name={ckNameClickEvent["replace"]("%type%","cty")}>
                                            {city}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="town" name={ckNameClickEvent["replace"]("%type%","twn")}>
                                            {town}
                                        </Editable>
                                    </td>
                                    <td>
                                        <Editable {...definedParamsDefault} dbKey="state" name={ckNameClickEvent["replace"]("%type%","ste")}>
                                            {state}
                                        </Editable>
                                    </td>
                                    <td>
                                        <strong className="status">
                                            <Editable {...definedParamsDefault} dbKey="message" name={ckNameClickEvent["replace"]("%type%","msg")}>
                                                {message ?? "NINGÚNA"}
                                            </Editable>
                                        </strong>
                                    </td>
                                    <td>
                                        <input onChange={$event => getDocs(query(collection(firebase!["database"],"address"),where("cr","==",cr),limit(1)))["then"]($response => {
                                            if($response["empty"]) return;
                                            else updateDoc(doc(firebase!["database"],`address/${$response["docs"][0]["id"]}`),{geo:$event["target"]["checked"]});
                                        })} style={{display:"none"}} type="checkbox" defaultChecked={geo} id={`chkbx_${cr["toLowerCase"]()}`}/>
                                        <label className="minicircle" htmlFor={`chkbx_${cr["toLowerCase"]()}`}></label>
                                    </td>
                                    <td>
                                        <strong className="status">
                                            {uniqKey ?? "No Envíado"}
                                        </strong>
                                    </td>
                                    <td>
                                        <div className="accioneslist">
                                            <button disabled={sender == ckNameClickEvent["replace"]("%type%","button")} className="complete" onClick={async $event => {
                                                $event["preventDefault"]();
                                                setSender(ckNameClickEvent["replace"]("%type%","button"));
                                                const $savedReferenceDBSheetKeys: Record<string,{token:string,key:string}> = JSON["parse"](import.meta.env.SGlobAppParamSheetDBKeys);
                                                const $savedReferenceCurrentObject = item[page - 1][index];
                                                const $savedGeneratedUniqKeyForSender: string = random(32);
                                                const $requestedCurrentDocumentID = (await getDocs(query(collection(firebase!["database"],"address"),where("cr","==",cr),limit(1))));
                                                let $definedSavedObjectInstanceOnSheet = {
                                                    "IDENTIFICADOR": $savedGeneratedUniqKeyForSender,
                                                    "TIENDA": $savedReferenceCurrentObject["cr"],
                                                    "FECHA": "DATETIME",
                                                    "SOLICITA": user!["displayName"],
                                                    "GEOLOCALIZACIÓN": $savedReferenceCurrentObject["geo"] ? "Sí" : "No",
                                                    "CÓDIGO POSTAL": $savedReferenceCurrentObject["postal"],
                                                    "CALLE PRINCIPAL": $savedReferenceCurrentObject["street"],
                                                    "REFERENCIAS": $savedReferenceCurrentObject["ref"],
                                                    "NÚMERO EXTERIOR": $savedReferenceCurrentObject["exterior"],
                                                    "COLONIA": $savedReferenceCurrentObject["colony"],
                                                    "CIUDAD": $savedReferenceCurrentObject["city"],
                                                    "MUNICIPIO": $savedReferenceCurrentObject["town"],
                                                    "OBSERVACIONES": $savedReferenceCurrentObject["message"] ?? "Ninguna"
                                                };
                                                (await Fetcher(2,$savedReferenceDBSheetKeys["direcciones"]["key"],{data:[$definedSavedObjectInstanceOnSheet]},undefined,"post",{authorization:`Basic ${$savedReferenceDBSheetKeys["direcciones"]["token"]}`,"Content-Type":"application/json"}));
                                                updateDoc(doc(firebase!["database"],`address/${$requestedCurrentDocumentID["docs"][0]["id"]}`),{uniqKey:$savedGeneratedUniqKeyForSender});
                                                let $savedReferenceCurrentItemContainer = item;
                                                $savedReferenceCurrentItemContainer[page - 1][index]["uniqKey"] = $savedGeneratedUniqKeyForSender;
                                                setSender(undefined);
                                            }}>
                                                <i className="uil uil-message"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Footer searching={search} disabled={typeof item == "undefined" || item["length"] == 0} total={total} currentPage={page} limitPerPage={10} orders={item} callback={setPage}/>
        </div>
    )
};

export default Address;