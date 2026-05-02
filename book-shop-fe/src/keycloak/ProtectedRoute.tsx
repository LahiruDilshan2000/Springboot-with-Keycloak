import { useKeycloak } from "@react-keycloak/web";
import KeycloakService from "./keycloakService.ts";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { keycloak, initialized } = useKeycloak();
    const keyCloakService = KeycloakService.getInstance();

    if (!initialized) {
        return <div>Loading...</div>;
    }
    if (keyCloakService.getKeycloak()?.isTokenExpired()) {
        keycloak.login();
        return null;
    }


    if (!keycloak.authenticated) {
        keycloak.login();
        return null;
    }
    return children;
};

export default ProtectedRoute;
