import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CustomKeyCloakProvider from "./keycloak/CustomKeyCloakProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CustomKeyCloakProvider>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </CustomKeyCloakProvider>
)
