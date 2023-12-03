/*
@author LxingA
@project OXXO
@name Help Desk
@description Página para Mostrar la Vista de Creación de una Incidencia
@date 29/11/23 9:30
*/
import {ComponentIncidentCreateBox} from '../component/incident';
import {useState,Fragment,useContext,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useOutletContext,useNavigate} from 'react-router-dom';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {v4} from 'uuid';
import {Timestamp,addDoc,collection} from 'firebase/firestore';
import {ref,uploadBytes} from 'firebase/storage';
import type {ValidityInput} from '../../login/type/form';
import type {ChangeEvent,MouseEvent} from 'react';

/** Vista para la Creación de una Incidencia en la Aplicación */
const Create = () => {
    const handlers = useOutletContext()!["handlers"];
    const navigator = useNavigate();
    const {t} = useTranslation();
    const {user} = useContext(Authentication);
    const {firebase} = useContext(Service);
    const initialState = {
        osoxxo_input_incident_title: {
            value: undefined
        },
        osoxxo_input_incident_description: {
            value: undefined
        },
        osoxxo_input_incident_orders: {
            value: undefined
        }
    };
    const attributes = {
        osoxxo_input_incident_title: {
            min: 4,
            max: 50
        },
        osoxxo_input_incident_description: {
            min: 6,
            max: 100
        },
        osoxxo_input_incident_orders: {
            min: 1,
            max: 100
        }
    };
    const mimes = "image/png,image/webp,image/jpeg,application/pdf";
    const [resource,setResource] = useState<File[] | null>(null);
    const [values,setValues] = useState<Record<string,ValidityInput>>(initialState);
    const [loading,setLoading] = useState<boolean>(false);
    const $change = ($event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues($state => {
        let $current = $state[$event["target"]["name"]];
        if($event["target"]["value"]["length"] === 0) $current = initialState[$event["target"]["name"]];
        else{
            if($event["target"]["value"]["length"] >= attributes[$event["target"]["name"]]["max"]) $current["check"] = "invalid";
            else if($event["target"]["value"]["length"] <= attributes[$event["target"]["name"]]["min"]) $current["check"] = "invalid";
            else{
                const $success = () => {
                    $current["check"] = "valid";
                    $current["value"] = $event["target"]["value"];
                };if($event["target"]["name"] == "osoxxo_input_incident_orders" && $event["target"]["value"]["length"] > 0){
                    if(!(/^([0-9\,]+)$/["test"]($event["target"]["value"]))) $current["check"] = "invalid";
                    else if($event["target"]["value"]["split"](",")["length"] >= 5) $current["check"] = "invalid";
                    else $success();
                }else $success();
            }
        }$state[$event["target"]["name"]] = $current;
        return {...$state};
    });
    const $handler = async($event:MouseEvent<HTMLButtonElement>) => {
        const savedReferenceUUIDIncident = v4()["split"]("-")[4]["substring"](0,5);
        $event["preventDefault"]();
        setLoading(true);
        const files = async() => (Promise["all"](resource!["map"](async(reference) => (await uploadBytes(ref(firebase!["storage"],`i/${user!["uid"]}/${savedReferenceUUIDIncident}/${v4()}`),reference,{customMetadata:{name:reference["name"],mime:reference["type"]}})))));try{
            let $__definedInitialObject = {
                date: Timestamp["fromDate"](new Date()),
                title: values["osoxxo_input_incident_title"]["value"],
                id: savedReferenceUUIDIncident,
                user: user!["uid"],
                status: 0,
                message: values["osoxxo_input_incident_description"]["value"]
            };
            if(values["osoxxo_input_incident_orders"]["value"]) $__definedInitialObject["order"] = values["osoxxo_input_incident_orders"]["value"];
            (await addDoc(collection(firebase!["database"],"incident"),$__definedInitialObject));
            (resource && resource["length"] <= 4 && resource["length"] >= 1) && await files();
            navigator("/order_incident",{replace:true});
        }catch(_){
            handlers["setError"](t("SLangAppTranslationViewPanelPageIncidentErrorMessage"));
        }
    };
    const buttonLabel = t("SLangAppTranslationViewPanelPageIncidentViewCreateButtonLabel")["split"]("|");
    useEffect(() => {
        const $handler__ESC = $k => $k["code"] == "Escape" && navigator("/order_incident",{replace:true});
        document["addEventListener"]("keydown",$handler__ESC,true);
        return () => {
            document["removeEventListener"]("keydown",$handler__ESC,true);
        }
    },[]);
    return (
        <div className="PopUp CrearIncidencia">
            <div className="contentForm">
                <button className="closeuo" onClick={$event => {
                    $event["preventDefault"]();
                    navigator("/order_incident",{replace:true});
                }}>
                    <i className="uil uil-times"></i>
                </button>
                <h3 className="MainTitle">
                    {t("SLangAppTranslationViewPanelPageIncidentButtonCreateNewIncidentLabel")}
                </h3>
                <div className="ctnf">
                    <ComponentIncidentCreateBox require label={t("SLangAppTranslationViewPanelPageIncidentViewCreateInputTitleLabel")} content={
                        <input disabled={loading} type="text" onChange={$change} name="osoxxo_input_incident_title" placeholder={t("SLangAppTranslationViewPanelPageIncidentViewCreateInputTitleMessage")}/>
                    }/>
                    <ComponentIncidentCreateBox require label={t("SLangAppTranslationViewPanelPageIncidentViewCreateInputDescriptionLabel")} content={
                        <textarea disabled={loading} name="osoxxo_input_incident_description" onChange={$change} placeholder={t("SLangAppTranslationViewPanelPageIncidentViewCreateInputDescriptionMessage")}/>
                    }/>
                    <ComponentIncidentCreateBox require={false} label={t("SLangAppTranslationViewPanelPageIncidentViewCreateInputOrdersLabel")} content={
                        <input disabled={loading} name="osoxxo_input_incident_orders" onChange={$change} type="text" placeholder="97313,56100,31000"/>
                    }/>
                    <ComponentIncidentCreateBox require={false} label="Evidencias" content={
                        <Fragment>
                            <label>
                                <input max={4} onChange={$event => setResource(Object["values"]($event["target"]["files"]!)["filter"]($=>$ instanceof File))} disabled={loading} accept={mimes} multiple name="osoxxo_input_incident_resources" type="file"/>
                                <div className="boxoUpload">
                                    <div className="ctn">
                                        <i className="uil uil-cloud-upload"></i>
                                        <p>
                                            {t("SLangAppTranslationViewPanelPageIncidentViewCreateInputFilesLabel")}
                                        </p>
                                    </div>
                                </div>
                            </label>
                            {resource && (
                                <Fragment>
                                    {resource["map"](({name,type},iterator) => {
                                        return (
                                            <div className="fileSubido" key={iterator}>
                                                <span className="typeFileName">
                                                    {type["split"]("/")[1]["toLocaleUpperCase"]()}
                                                </span>
                                                <p>
                                                    {name}
                                                </p>
                                                <button onClick={$event => {
                                                    $event["preventDefault"]();
                                                    const $newer = resource["filter"]((_,i) => iterator != i);
                                                    setResource($newer);
                                                }}>
                                                    <i className="uil uil-times"></i>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </Fragment>
                            )}
                            </Fragment>
                    }/>
                </div>
                <div className="unlistBUttons">
                    <button onClick={$handler} className="full" disabled={loading || (values["osoxxo_input_incident_orders"]["check"] == "invalid") || (values["osoxxo_input_incident_title"]["check"] == "invalid" || typeof values["osoxxo_input_incident_title"]["value"] == "undefined") || (values["osoxxo_input_incident_description"]["check"] == "invalid" || typeof values["osoxxo_input_incident_description"]["value"] == "undefined")}>
                        {loading ? buttonLabel[1] : buttonLabel[0]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create;