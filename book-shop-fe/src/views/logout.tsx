import {useKeycloak} from "@react-keycloak/web";

function Logout (): JSX.Element{

    const { keycloak } = useKeycloak();

    return (
        <div>
            <h1>My App</h1>
            {keycloak.authenticated && (
                <button onClick={() => keycloak.logout()}>
                    Logout
                </button>
            )}
        </div>
    );
}

export default Logout;
