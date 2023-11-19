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
import PanelPageIndex from './view/panel/page/track';

/** Renderización de la Aplicación en el DOM */
const App = () => {
    return <Provider router={createBrowserRouter(createRoutesFromElements([
        <Route>
            <Route path="/" element={
                <Auth>
                    <PanelTemplate />
                </Auth>
            }>
                <Route path="track" element={<PanelPageIndex />}/>
            </Route>
            <Route path="auth" element={
                <LoginTemplate />
            }>
                <Route path="login" element={<LoginPageIndex />}/>
                <Route path="recovery" element={<LoginPageRecovery />}/>
            </Route>
        </Route>
    ]))}/>;
};

export default App;