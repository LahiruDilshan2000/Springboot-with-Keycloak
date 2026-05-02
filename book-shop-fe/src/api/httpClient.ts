import axios, { InternalAxiosRequestConfig } from "axios";
import KeycloakService from "../keycloak/keycloakService.ts";

const httpClient = axios.create();

httpClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const keycloak = KeycloakService.getInstance().getKeycloak();

        if (keycloak.authenticated) {
            try {
                await keycloak.updateToken(30);
            } catch (error) {
                console.error("Failed to refresh Keycloak token", error);
            }
        }

        const token = KeycloakService.getInstance().getToken();

        if (token) {
            // config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default httpClient;
