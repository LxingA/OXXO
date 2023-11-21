/*
@author LxingA
@project OXXO
@name Help Desk
@description Configuración Inicial de la Aplicación
@date 14/11/23 16:15
*/
import 'aos/dist/aos.css';
import {Suspense,StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {I18nextProvider} from 'react-i18next';
import {QueryClientProvider} from 'react-query';
import Application from './app';
import DOM from './util/element';
import Domain from './util/domain';
import Firebase from './library/service';
import Language from './library/i18n';
import ServiceProvider from './context/service';
import AuthProvider from './context/auth';
import Query from './library/query';
import $ from 'jquery';

/** Inicializar la Aplicación OXXO Help Desk */
Firebase()["then"](service => {
    DOM({rel:"stylesheet",href:Domain("style.css"),type:"text/css",id:"style"},document);
    document["$"], document["jQuery"] = $;
    document["getElementById"]("style")!["onload"] = () => createRoot(document["getElementById"]("root") as HTMLElement)["render"](
        <StrictMode>
            <I18nextProvider i18n={Language}>
                <QueryClientProvider client={Query}>
                    <Suspense>
                        <ServiceProvider service={service}>
                            <AuthProvider initialState={service["auth"]!} client={{database:service["firebase"]!["database"],authentication:service["firebase"]!["authentication"]}}>
                                <Application />
                            </AuthProvider>
                        </ServiceProvider>
                    </Suspense>
                </QueryClientProvider>
            </I18nextProvider>
        </StrictMode>
    );
});