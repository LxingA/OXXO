/*
@author LxingA
@project OXXO
@name Help Desk
@description Configuración Inicial de la Aplicación
@date 14/11/23 16:15
*/
import 'aos/dist/aos.css';
import {createRoot} from 'react-dom/client';
import {I18nextProvider} from 'react-i18next';
import {QueryClientProvider} from 'react-query';
import Application from './app';
import DOM from './util/element';
import Firebase from './library/service';
import Language from './library/i18n';
import ServiceProvider from './context/service';
import AuthProvider from './context/auth';
import Query from './library/query';

/** Inicializar la Aplicación OXXO Help Desk */
Firebase()["then"](service => {
    DOM({rel:"stylesheet",href:service["asset"]!["style"],type:"text/css",id:"style"},document);
    document["getElementById"]("style")!["onload"] = () => createRoot(document["getElementById"]("root") as HTMLElement)["render"](
        <I18nextProvider i18n={Language}>
            <QueryClientProvider client={Query}>
                <ServiceProvider service={service}>
                    <AuthProvider client={service["firebase"]!["authentication"]}>
                        <Application />
                    </AuthProvider>
                </ServiceProvider>
            </QueryClientProvider>
        </I18nextProvider>
    );
});