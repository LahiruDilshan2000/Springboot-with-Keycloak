import {JSX} from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import KeycloakService from "./keycloakService.ts";

const CustomKeyCloakProvider = ({children}: { children: JSX.Element }): JSX.Element => {

    const keycloakService = KeycloakService.getInstance();
    const keycloak = keycloakService.getKeycloak();

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: "login-required",
                checkLoginIframe: false,
            }}
            onEvent={async (event) => {
                if (event === "onAuthSuccess" || event === "onAuthRefreshSuccess") {
                    await keycloakService.syncUserProfile();
                }
            }}
            onTokens={() => {
                const currentProfile = keycloakService.userProfile();
                if (currentProfile) {
                    currentProfile.token = keycloakService.getToken();
                }
            }}>
            {children}
        </ReactKeycloakProvider>
    );
}
export default CustomKeyCloakProvider;
