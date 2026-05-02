import React from "react";
import './App.css'

import Header from "./components/layout/header.tsx";
import Footer from "./components/layout/footer.tsx";
import Home from "./views/home";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Editor from "./views/editor.tsx";
import MyArticle from "./views/my-article.tsx";
import Article from "./views/article.tsx";
import ProtectedRoute from "./keycloak/ProtectedRoute.tsx";
import Logout from "./views/logout.tsx";
import Login from "./views/login.tsx";
import KeycloakService from "./keycloak/keycloakService.ts";

const getAuthToken = (): string | undefined => {
    return KeycloakService.getInstance().getToken() || undefined;
};

const RootRedirect = (): JSX.Element => {
    return getAuthToken() ? <Navigate to={"/home"} replace/> : <Navigate to={"/login"} replace/>;
};

interface Props{
}
interface States{
    count:number;
}
class App extends React.Component<Props, States>{
    render():React.ReactElement<any, string>{
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<RootRedirect/>}/>
                        <Route path={'/home'} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        {/*<Route path={'/signup'} element={<Signup/>}/>*/}
                        <Route path={'/editor'} element={<ProtectedRoute><Editor/></ProtectedRoute>}/>
                        <Route path={'/my-article'} element={<ProtectedRoute><MyArticle/></ProtectedRoute>}/>
                        <Route path={'/article'} element={<ProtectedRoute><Article/></ProtectedRoute>}/>
                        <Route path={'/logout'} element={<Logout/>}/>
                        <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App
