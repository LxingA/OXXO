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
import GlobalProvider from './context/global';
import Firebase from './library/firestore';
import Language from './library/i18n';
import Query from './library/query';
import DOM from './app';

/** Inicializar la Aplicación OXXO Help Desk */
Firebase()["then"](services => createRoot(document["getElementById"]("root") as HTMLElement)["render"](
    <I18nextProvider i18n={Language}>
        <QueryClientProvider client={Query}>
            <GlobalProvider firebase={services}>
                <DOM />
            </GlobalProvider>
        </QueryClientProvider>
    </I18nextProvider>
));