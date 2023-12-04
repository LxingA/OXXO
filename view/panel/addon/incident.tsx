/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente de las Incidencias de la Aplicación
@date 28/11/23 22:20
*/
import {useEffect,useState,useContext} from 'react';
import {ref,listAll,getDownloadURL,getMetadata,deleteObject} from 'firebase/storage';
import {doc,deleteDoc} from 'firebase/firestore';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {useTranslation} from 'react-i18next';
import type {Evidence,BoxProcessor,BoxMedia} from '../type/incident';
import type {MouseEvent,SetStateAction,Dispatch} from 'react';
import Domain from "../../../util/domain";
import Loader from '../../loader';

/** Complemento con los Botones de Acción de la Vista Listadora de las Incidencias */
export const AddonComponentIncidentButtonsListView = ({id,uniqKey,box}:{
    /** Identificador Único del Documento Asociada a la Incidencia */
    id: string,
    /** Identificador Único de la Incidencia */
    uniqKey: string,
    /** Referencía a la Callback para Mostrar la Caja del Procesor */
    box: Dispatch<SetStateAction<BoxProcessor | undefined>>
}) => {
    const {t} = useTranslation();
    const {user} = useContext(Authentication);
    const {firebase} = useContext(Service);
    const [exec,setExec] = useState<boolean>(false);
    const handler = async($event:MouseEvent<HTMLButtonElement>) => {
        $event["preventDefault"]();
        setExec(true);
        box({
            title: t("SLangAppTranslationViewPanelPageIncidentBoxProcessorDeleteTitle"),
            message: t("SLangAppTranslationViewPanelPageIncidentBoxProcessorDeleteMessage")
        });
        (await Promise["all"](
            (await listAll(ref(firebase!["storage"],`i/${user!["uid"]}/${uniqKey}`)))["items"]["map"](async({storage,fullPath}) => await deleteObject(ref(storage,fullPath)))
        ));
        (await deleteDoc(doc(firebase!["database"],"incident",id)));
    };return (
        <div className="boxing actions">
            <div className="accioneslist">
                <button onClick={handler} disabled={exec}>
                    <i className="uil uil-trash-alt"></i>
                </button>
                <button className="streng" disabled={exec}>
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
export const AddonComponentIncidentBoxUpdateIncidence = ({callback}:{
    /** Referencía al Callback para Mostrar la Caja Actual */
    callback: Dispatch<SetStateAction<boolean>>
}) => {
    const {t} = useTranslation();
    const buttonLabel = t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceButtonLabel")["split"]("|");
    return (
        <div className="containerTxTStatus">
            <div className="contextualStatus">
                <button className="closeuo" onClick={() => callback(false)}>
                    <i className="uil uil-times"></i>
                </button>
                <h3>
                    {t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceTitle")}
                </h3>
                <textarea placeholder={t("SLangAppTranslationViewPanelPageIncidentBoxUpdateIncidenceMessageText")}/>
                <select>
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
                <button className="full">
                    {buttonLabel[0]}
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