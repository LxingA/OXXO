/*
@author LxingA
@project OXXO
@name Help Desk
@description Página para Realizar la Recuperación de la Contraseña para un Usuario
@date 18/11/23 17:30
*/
import {Fragment,useState,useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Input,Suggest,Dialog} from '../addon/form';
import {sendPasswordResetEmail} from 'firebase/auth';
import {Context as Service} from '../../../context/service';
import type {ValidityInput} from '../type/form';
import type {ChangeEvent,MouseEvent} from 'react';

/** Página Predeterminada para la Recuperación de Contraseña de un Usuario */
const Recovery = () => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const [loading,setLoading] = useState<boolean>(false);
    const [value,setValue] = useState<ValidityInput>({value:undefined});
    const [message,setMessage] = useState<string | null>(null);
    const [complete,setComplete] = useState<boolean>(false);
    const buttonLabel = t("SLangAppTranslationViewLoginRecoveryButtonLabel")["split"]("|");
    const handler = {
        change: (event:ChangeEvent<HTMLInputElement>) => setValue(state => {
            let current = state;
            if(event["target"]["value"]["length"] === 0) current = {value:undefined};
            else{
                if(event["target"]["value"]["length"] <= 4) current["check"] = "invalid";
                else if(event["target"]["value"]["length"] >= 50) current["check"] = "invalid";
                else if(!(/^([a-zA-Z\_\-0-9]+)\@([a-z]+)\.([a-z]){2,4}(\.([a-z]){2,4})?$/["test"](event["target"]["value"]))) current["check"] = "invalid";
                else{
                    current["check"] = "valid";
                    current["value"] = event["target"]["value"];
                }
            }return {...current};
        }),
        click: async(event:MouseEvent<HTMLButtonElement>) => {
            event["preventDefault"]();
            setLoading(true);
            try{
                (await sendPasswordResetEmail(firebase!["authentication"],value["value"]!));
                setMessage(t("SLangAppTranslationViewLoginRecoverySuccessMessage")["replace"]("%MAIL%",value["value"]!));
                setLoading(false);
                setComplete(true);
            }catch(error){
                setLoading(false);
                switch((error as {})["code"]){
                    case "auth/user-not-found":
                        setMessage(t("SLangAppTranslationViewLoginRecoveryErrorUserNotFoundMessage"));
                    break;
                    default:
                        setMessage(t("SLangAppTranslationViewLoginRecoveryErrorUnknownMessage"));
                    break;
                }
            }
        }
    };return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewLoginRecoveryTitle")}
            </h3>
            <Input checker={value["check"]} title={t("SLangAppTranslationViewLoginFormInputUserLabel")} icon="envelope-alt" options={{
                type: "email",
                placeholder: t("SLangAppTranslationViewLoginFormInputUserHolder"),
                name: "osoxxo_input_recovery_mail",
                onChange: handler["change"],
                disabled: loading || (complete == true)
            }}/>
            {message && (
                <Dialog message={message}/>
            )}
            <button className="full" onClick={handler["click"]} disabled={loading || (value["check"] === "invalid" || typeof value["value"] == "undefined") || (complete == true)}>
                {loading ? buttonLabel[1] : (complete ? t("SLangAppTranslationViewLoginRecoveryButtonSuccessLabel") : buttonLabel[0])}
            </button>
            <Suggest major path="/auth/login" message={t("SLangAppTranslationViewLoginRecoveryAuthenticMessage")} text={t("SLangAppTranslationViewLoginRecoveryAuthenticAlt")}/>
        </Fragment>
    );
};

export default Recovery;