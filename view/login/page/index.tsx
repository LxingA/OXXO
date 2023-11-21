/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para la Vista de la Autenticación
@date 17/11/23 11:50
*/
import {useContext,Fragment,useState,useEffect} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Context as Service} from '../../../context/service';
import {Input,Suggest,Dialog} from '../addon/form';
import {useTranslation} from 'react-i18next';
import type {MouseEvent} from 'react';
import type {ValidityInput} from '../type/form';

/** Vista Predeterminada para la Autenticación de la Aplicación */
const Home = () => {
    const {firebase,authentication} = useContext(Service);
    const {t} = useTranslation();
    const initialState = {
        value: {
            osoxxo_input_login_user: {
                value: undefined
            },
            osoxxo_input_login_pass: {
                value: undefined
            }
        }
    };
    const [value,setValue] = useState<Record<string,ValidityInput>>(initialState["value"]);
    const [error,setError] = useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const labelButton = t("SLangAppTranslationViewLoginFormButtonSubmitLabel")["split"]("|");
    /** Definición del Callback para Accionar la Creación de la Sesión */
    const SetSession = async(event?:MouseEvent<HTMLButtonElement>): Promise<void> => {
        event && event["preventDefault"]();
        setLoading(true);
        setError(null);
        try{
            (await signInWithEmailAndPassword(firebase!["authentication"],value["osoxxo_input_login_user"]["value"]!,value["osoxxo_input_login_pass"]["value"]!));
        }catch(code){
            setLoading(false);
            switch((code as {})["code"]){
                case "auth/invalid-login-credentials":
                    setError(t("SLangAppTranslationViewLoginFormSubmitCodeError_INVALID_LOGIN_CREDENTIALS"));
                break;
                default:
                    setError(t("SLangAppTranslationViewLoginFormSubmitCodeError_UNKNOWN_ERROR"));
                break;
            }
        }
    };
    useEffect(() => {
        const callback = (k => (k["code"] === "Enter" && (value["osoxxo_input_login_user"]["value"] && value["osoxxo_input_login_pass"]["value"])) && SetSession());
        window["addEventListener"]("keydown",callback,true);
        return () => window["removeEventListener"]("keydown",callback,true);
    });
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewLoginAuthTitle")}
            </h3>
            <Input checker={value["osoxxo_input_login_user"]["check"]} title={t("SLangAppTranslationViewLoginFormInputUserLabel")} icon="envelope-alt" options={{
                type: "email",
                placeholder: t("SLangAppTranslationViewLoginFormInputUserHolder"),
                name: "osoxxo_input_login_user",
                onChange: event => setValue(state => {
                    if(event["target"]["value"]["length"] === 0){
                        setError(null);
                        return initialState["value"];
                    }else{
                        let current = state["osoxxo_input_login_user"];
                        if(event["target"]["value"]["length"] <= authentication!["user"]["min"]) current["check"] = "invalid";
                        else if(event["target"]["value"]["length"] >= authentication!["user"]["max"]) current["check"] = "invalid";
                        else if(!(/^([A-Za-z0-9\.\-]+)\@([A-Za-z]+)\.([a-zA-Z]+){2,4}(\.([A-Za-z]+){2,4})?$/["test"](event["target"]["value"]))) current["check"] = "invalid";
                        else {
                            current["check"] = "valid";
                            current["value"] = event["target"]["value"];
                        };return {...state,osoxxo_input_login_user:current};
                    }
                }),
                disabled: loading
            }}/>
            <Input checker={value["osoxxo_input_login_pass"]["check"]} title={t("SLangAppTranslationViewLoginFormInputPassLabel")} icon="key-skeleton" options={{
                type: "password",
                placeholder: t("SLangAppTranslationViewLoginFormInputPassHolder"),
                name: "osoxxo_input_login_pass",
                disabled: ((value["osoxxo_input_login_user"]["check"] && (value["osoxxo_input_login_user"]["check"] == "invalid")) || (typeof value["osoxxo_input_login_user"]["value"] === "undefined")) || loading,
                onChange: event => setValue(state => {
                    if(event["target"]["value"]["length"] === 0) return {...state,osoxxo_input_login_pass:initialState["value"]["osoxxo_input_login_pass"]};
                    else{
                        let current = state["osoxxo_input_login_pass"];
                        if(event["target"]["value"]["length"] <= authentication!["password"]["min"]) current["check"] = "invalid";
                        else if(event["target"]["value"]["length"] >= authentication!["password"]["max"]) current["check"] = "invalid";
                        else{
                            current["check"] = "valid";
                            current["value"] = event["target"]["value"];
                        };return {...state,osoxxo_input_login_pass:current};
                    };
                })
            }}/>
            <Suggest major={false} message={t("SLangAppTranslationViewLoginFormSuggestResetMessage")} path="/auth/recovery" text={t("SLangAppTranslationViewLoginFormSuggestResetAlt")}/>
            {error && (
                <Dialog message={error}/>
            )}
            <button className="full" onClick={event => SetSession(event)} disabled={((typeof value["osoxxo_input_login_user"]["value"] == "undefined" || value["osoxxo_input_login_user"]["check"] == "invalid") || (typeof value["osoxxo_input_login_pass"]["value"] == "undefined" || value["osoxxo_input_login_pass"]["check"] == "invalid")) || loading}>
                {loading ? labelButton[1] : labelButton[0]}
            </button>
            {authentication!["register"] && (
                <Suggest major message={t("SLangAppTranslationViewLoginFormSuggestRegisterMessage")} path="/auth/register" text={t("SLangAppTranslationViewLoginFormSuggestRegisterAlt")}/>
            )}
        </Fragment>
    );
};

export default Home;