/*
@author LxingA
@project OXXO
@name Help Desk
@description Inicialización de la Aplicación en el DOM
@date 14/11/23 20:30
*/
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider as Provider} from 'react-router-dom';
import ViewAuth from './view/auth';

/** Renderización de la Aplicación en el DOM */
const App = () => {
    return <Provider router={createBrowserRouter(createRoutesFromElements([
        <Route>
            <Route path="/" element={
                <ViewAuth>
                    <p>Hola Mundo</p>
                </ViewAuth>
            }/>
        </Route>
    ]))}/>
};

export default App;