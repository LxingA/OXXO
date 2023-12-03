/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para Mostrar los Errores Globales del Panel de Control
@date 20/11/23 16:30
*/
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Domain from '../../../util/domain';
import $ from 'jquery';

/** Definición de la Plantilla Predeterminada para los Errores del Panel de Control */
const Error = () => {
    const {t} = useTranslation();
    useEffect(() => {
        $(".ctnMainPatern")["addClass"]("ErrorPanel");
        return () => {
            $(".ctnMainPatern")["removeClass"]("ErrorPanel")
        };
    },[]);
    return (
        <div className="Annoucement">
            <div className="imgBox">
                <img src={Domain("error/panel.webp")}/>
            </div>
            <h3>
                {t("SLangAppTranslationViewErrorPageGlobalTitle")}
            </h3>
            <p>
                {t("SLangAppTranslationViewErrorPageGlobalMessage")}
            </p>
            <Link className="full" to="/">
                {t("SLangAppTranslationViewPanelPageIndexTitle")}
            </Link>
        </div>
    );
};

export default Error;