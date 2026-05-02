import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import KeycloakService from "../keycloak/keycloakService.ts";

/*interface State{
    email:string;
    password:string;
    errorMsg:string;
}*/

function Login (): JSX.Element{
    const navigate = useNavigate();
    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
        const syncAndRedirect = async () => {
            if (!initialized) {
                return;
            }

            if (keycloak.authenticated) {
                await KeycloakService.getInstance().syncUserProfile();
                navigate("/home", {replace: true});
                return;
            }

            await keycloak.login();
        };

        syncAndRedirect();
    }, [initialized, keycloak, navigate]);

        return (

            <section className={'flex justify-center items-center'}>
                <div className={'flex flex-col items-center justify-center w-[400px] h-[520px]  border-[1px] border-gray-200 m-5 px-10'}>
                    <img src={'http://logodix.com/logo/1597040.png'} title={'logo'} alt={'logo'}
                         className={'w-[100px]'}/>

                    <h2 className={"text-xl text-gray-700 mt-6"}>Redirecting to Keycloak login...</h2>

                </div>
            </section>
        );

}

export default Login;