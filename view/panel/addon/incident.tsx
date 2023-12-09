/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente de las Incidencias de la Aplicación
@date 28/11/23 22:20
*/
import {useEffect,useState,useContext, Fragment} from 'react';
import {ref,listAll,getDownloadURL,getMetadata,deleteObject} from 'firebase/storage';
import {doc,deleteDoc,updateDoc,Timestamp, getDoc} from 'firebase/firestore';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {upperStringFirst} from '../../../util/extra';
import type {Evidence,BoxProcessor,BoxMedia,History} from '../type/incident';
import type {UserFromDatabaseInformation} from '../../../type/auth';
import type {MouseEvent,SetStateAction,Dispatch} from 'react';
import type {ValidityInput} from '../../login/type/form';
import Domain from "../../../util/domain";
import Loader from '../../loader';
import Timer from 'moment';

/** Complemento con los Botones de Acción de la Vista Listadora de las Incidencias */
export const AddonComponentIncidentButtonsListView = ({id,uniqKey,box,status}:{
    /** Identificador Único del Documento Asociada a la Incidencia */
    id: string,
    /** Identificador Único de la Incidencia */
    uniqKey: string,
    /** Referencía a la Callback para Mostrar la Caja del Procesor */
    box: Dispatch<SetStateAction<BoxProcessor | undefined>>,
    /** Estatus Actual de la Incidencia */
    status: number
}) => {
    const {t} = useTranslation();
    const {user} = useContext(Authentication);
    const {firebase} = useContext(Service);
    const [exec,setExec] = useState<boolean>(false);
    const navigator = useNavigate();
    const handler = async($event:MouseEvent<HTMLButtonElement>) => {
        $event["preventDefault"]();
        setExec(true);
        box({
            title: t("SLangAppTranslationViewPanelPageIncidentBoxProcessorDeleteTitle"),
            message: t("SLangAppTranslationViewPanelPageIncidentBoxProcessorDeleteMessage"),
            id: uniqKey
        });
        (await Promise["all"](
            (await listAll(ref(firebase!["storage"],`i/${user!["uid"]}/${uniqKey}`)))["items"]["map"](async({storage,fullPath}) => await deleteObject(ref(storage,fullPath)))
        ));
        (await deleteDoc(doc(firebase!["database"],"incident",id)));
        setExec(false);
    };return (
        <div className="boxing actions">
            <div className="accioneslist">
                {!(([1,2] as number[])["includes"](status)) && (
                    <button onClick={handler} disabled={exec}>
                        <i className="uil uil-trash-alt"></i>
                    </button>
                )}
                <button className="streng" disabled={exec} onClick={() => navigator(`/order_incident/view?key=${uniqKey}`,{replace:true})}>
                    <i className="uil uil-file-search-alt"></i>
                </button>
            </div>
        </div>
    );
};

/** Complemento con las Evidencias de una Incidencia */
export const AddonComponentIncidentEvidenceListView = ({id,user,box}:{
    /** ID Único de la Incidencia a Obtener los Recursos */
    id: string,
    /** ID Único del Usuario de la Incidencia */
    user: string,
    /** Referencía al Callback para Mostrar la Caja con la Información del Medio */
    box: Dispatch<SetStateAction<BoxMedia | undefined>>
}) => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const [data,setData] = useState<Evidence[]>();
    const handler = async() => {
        const evidences: Evidence[] = [];
        (await Promise["all"](
            (await listAll(ref(firebase!["storage"],`i/${user}/${id}`)))["items"]["map"](async({storage,fullPath}) => {
                const meta = (await getMetadata(ref(storage,fullPath)))["customMetadata"]!;
                const url = (await getDownloadURL(ref(storage,fullPath)));
                evidences["push"]({
                    name: meta["name"],
                    mime: meta["mime"],
                    url
                } as Evidence);
            })
        ));
        setData(evidences);
    };useEffect(() => {
        !data && handler();
    },[]);
    return data ? (
        <div className="imgList">
            {data["length"] === 0 ? (
                <p>
                    {t("SLangAppTranslationViewPanelPageIncidentEvidenceContainerListEmptyLabel")}
                </p>
            ) : data["map"](({name,url,mime},iterator) => {
                const pdf = mime["split"]("/")[1]["toLowerCase"]() == "pdf";
                return (
                    <div className={pdf ? "ImgDiv PDFFile" : "ImgDiv"} key={iterator} title={name} onClick={() => box({
                        name,
                        type: pdf ? "pdf" : "image",
                        callback: box,
                        url,
                        mime
                    })}>
                        <img src={pdf ? Domain("type/pdf.webp") : url}/>
                    </div>
                )
            })}
        </div>
    ) : (
        <div className="imgList">
            <Loader />
        </div>
    );
};

/** Componente para Mostrar la Información del Usuario que Creó la Incidencia */
export const AddonComponentIncidentListViewUserInfoBox = ({name,role,photo}:{
    /** Nombre Completo del Usuario de la Incidencia */
    name: string,
    /** Rango del Usuario de la Incidencia */
    role: string,
    /** Ruta Absoluta HTTP de la Foto de Perfil del Usuario de la Incidencia */
    photo: string
}) => {
    return (
        <div className="incidenciaResponsable">
            <div className="iconUser">
                <img src={photo}/>
            </div>
            <div className="userdts">
                <strong>
                    {name}
                </strong>
                <p className="Rango designWeb">
                    {role["split"]("-")[0]}
                </p>
            </div>
        </div>
    );
};

/** Componente para Mostrar el Formulario para el Seguimiento de la Incidencia */
export const AddonComponentIncidentBoxUpdateIncidence = ({callback,id,status,history}:{
    /** Referencía al Callback para Mostrar la Caja Actual */
    callback: Dispatch<SetStateAction<boolean>>,
    /** Identificador Único del Documento Asociado a la Incidencia */
    id: string,
    /** Valor Actual del Estatus de la Incidencia */
    status: number,
    /** Contenedor con el Historial de la Incidencia */
    history: History[]
}) => {
    const {t} = useTranslation();
    const {user} = useContext(Authentication);
    const {firebase} = useContext(Service);
    const [loading,setLoading] = useState<boolean>(false);
    const [message,setMessage] = useState<ValidityInput>({value:undefined});
    const [statusNew,setStatus] = useState<number>(status);
    const buttonLabel = t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceButtonLabel")["split"]("|");
    const handler = async($event:MouseEvent<HTMLButtonElement>) => {
        $event["preventDefault"]();
        setLoading(true);
        const $history = history;
        $history["unshift"]({
            message: message["value"],
            status: statusNew,
            date: Timestamp["fromDate"](new Date()),
            user: user!["uid"]
        } as History);
        (await updateDoc(doc(firebase!["database"],"incident",id),{
            log: $history,
            status: statusNew
        }));
        callback(false);
    };return (
        <div className="containerTxTStatus">
            <div className="contextualStatus">
                <button className="closeuo" onClick={() => callback(false)}>
                    <i className="uil uil-times"></i>
                </button>
                <h3>
                    {t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceTitle")}
                </h3>
                <textarea placeholder={t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceMessageText")} onChange={$event => setMessage($state => {
                    let $current = $state;
                    if($event["target"]["value"]["length"] === 0) $current = {value:undefined};
                    else{
                        if($event["target"]["value"]["length"] <= 8) $current["check"] = "invalid";
                        else if($event["target"]["value"]["length"] >= 200) $current["check"] = "invalid";
                        else{
                            $current["check"] = "valid";
                            $current["value"] = $event["target"]["value"];
                        }
                    }return {...$current};
                })}/>
                <select defaultValue={status} onChange={$event => setStatus(Number($event["target"]["value"]))}>
                    <option value="0">
                        {t("SLangAppTranslationIncidentStatus0Label")}
                    </option>
                    <option value="1">
                        {t("SLangAppTranslationIncidentStatus1Label")}
                    </option>
                    <option value="2">
                        {t("SLangAppTranslationIncidentStatus2Label")}
                    </option>
                    <option value="3">
                        {t("SLangAppTranslationIncidentStatus3Label")}
                    </option>
                </select>
                <button className="full" onClick={handler} disabled={loading || (message["check"] == "invalid" || typeof message["value"] == "undefined")}>
                    {loading ? buttonLabel[1] : buttonLabel[0]}
                </button>
            </div>
        </div>
    );
};

/** Componente para Mostrar los Archivos PDF y las Imágenes de las Evidencias de la Incidencia */
export const AddonComponentIncidentBoxMediaShowContent = ({name,type,callback,mime,url}:BoxMedia) => {
    const {t} = useTranslation();
    return (
        <div className="ViewDocument-File">
            <div className="viewFile">
                <button className="closeuo" onClick={() => callback(undefined)}>
                    <i className="uil uil-times"></i>
                </button>
                <div className="container">
                    <h3 dangerouslySetInnerHTML={{__html:t("SLangAppTranslationViewPanelPageIncidentBoxMediaContentTitle")["replace"]("%FILE_NAME%",name)}}></h3>
                    <div className="contenedorFile">
                        {type == "image" ? (
                            <img src={url}/>
                        ) : (
                            <object type={mime} data={url}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/** Componente para Mostrar el Historial de las Incidencias */
export const AddonComponentIncidentPageInformationHistoryContent = ({status,date,message,user}:History) => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const [userInfo,setUserInfo] = useState<UserFromDatabaseInformation>();
    const handler = async() => {
        const __initialUser__ = (await getDoc(doc(firebase!["database"],`user/${user}`)));
        if(__initialUser__["exists"]()) setUserInfo(__initialUser__["data"]());
    };useEffect(() => {
        !userInfo && handler();
    },[]);
    return (
        <Fragment>
            <div className="incidenciaResponsable">
                {userInfo ? (
                    <Fragment>
                        <div className="iconUser">
                            <img src={userInfo["photo"] ?? Domain("user/default.webp")}/>
                        </div>
                        <div className="userdts">
                            <strong>
                                {userInfo["name"] ? userInfo["name"]!["split"](" ")[0] : userInfo["email"]}
                            </strong>
                            <p className="Rango designWeb">
                                {upperStringFirst(userInfo["role"]!)}
                            </p>
                        </div>
                    </Fragment>
                ) : <Loader />}
            </div>
            <div className="col2">
                <div className="titleinc2">
                    <h2>
                        {t(`SLangAppTranslationIncidentStatus${status}Label`)}
                    </h2>
                    <p>
                        {Timer(date["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm")}
                    </p>
                </div>
                <p>
                    {message}
                </p>
            </div>
        </Fragment>
    );
};