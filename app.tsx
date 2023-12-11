/*
@author LxingA
@project OXXO
@name Help Desk
@description Inicialización de la Aplicación en el DOM
@date 14/11/23 20:30
*/
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider as Provider} from 'react-router-dom';
import Auth from './view/auth';
import LoginTemplate from './view/login';
import LoginPageIndex from './view/login/page';
import LoginPageRecovery from './view/login/page/recovery';
import PanelTemplate from './view/panel';
import PanelPageView from './view/panel/page/order_view';
import PanelPageReview from './view/panel/page/order_check';
import PanelPageIncident from './view/panel/page/order_incident';
import PanelPageAccount from './view/panel/page/account';
import ErrorPagePanel from './view/panel/page/error';
import ErrorPageAuth from './view/login/page/error';
import ActionTemplate from './view/action';
import PanelPageToolViewIndex from './view/panel/page/tool';
import PanelPageToolViewOrder from './view/panel/page/tool_order';
import PanelPageIncidentViewAdd from './view/panel/page/order_incident_create';
import PanelPageIncidentViewOnly from './view/panel/page/order_incident_view';

/** Renderización de la Aplicación en el DOM */
const App = () => {
    return <Provider router={createBrowserRouter(createRoutesFromElements([
        <Route>
            <Route path="/" element={
                <Auth>
                    <PanelTemplate />
                </Auth>
            }>
                <Route path="order_view" element={<PanelPageView />}/>
                <Route path="order_check" element={<PanelPageReview />}/>
                <Route path="order_incident" element={<PanelPageIncident />}>
                    <Route path="create" element={<PanelPageIncidentViewAdd />}/>
                    <Route path="view" element={<PanelPageIncidentViewOnly />}/>
                </Route>
                <Route path="account" element={<PanelPageAccount />}/>
                <Route path="tool" element={<PanelPageToolViewIndex />}>
                    <Route path="order" element={<PanelPageToolViewOrder />}/>
                </Route>
                <Route path="*" element={<ErrorPagePanel />}/>
            </Route>
            <Route path="do" element={<ActionTemplate />}/>
            <Route path="auth" element={
                <LoginTemplate />
            }>
                <Route path="login" element={<LoginPageIndex />}/>
                <Route path="recovery" element={<LoginPageRecovery />}/>
                <Route path="*" element={<ErrorPageAuth />}/>
            </Route>
        </Route>
    ]))}/>;
};

export default App;