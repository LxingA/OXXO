/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de i18n como Interprete para los Idiomas de la Aplicación
@date 15/11/23 15:00
*/
import {initReactI18next} from 'react-i18next';
import type {InitOptions} from 'i18next';
import i18n from 'i18next';
import Languages from '../language.json';

i18n["use"](initReactI18next)["init"]({
    lng: navigator["language"] ?? "es",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: Languages
} as InitOptions);

export default i18n;