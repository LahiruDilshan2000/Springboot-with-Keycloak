import Keycloak, {KeycloakInstance} from "keycloak-js";

interface UserProfile {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
}

class KeycloakService {
    private static instance: KeycloakService;
    private _keycloak: KeycloakInstance;
    private _profile: UserProfile | undefined;

    private constructor() {
        this._keycloak = new Keycloak({
            url: "http://localhost:9098",
            realm: "book-shop",
            clientId: "bsn"
        });
    }

    public static getInstance(): KeycloakService {
        if (!KeycloakService.instance) {
            KeycloakService.instance = new KeycloakService();
        }
        return KeycloakService.instance;
    }

    async init(){
        const authenticated = await this._keycloak?.init({
           onLoad: "login-required"
        });

        if (authenticated){
            await this.syncUserProfile();
        }
    }

    public login(){
        return this._keycloak?.login();
    }

    public logout(){
        return this._keycloak?.logout();
    }

    public accountManagement(){
        return this._keycloak?.accountManagement();
    }

    public getKeycloak(): KeycloakInstance {
        return this._keycloak;
    }

    public userProfile(): UserProfile | undefined {
        return this._profile;
    }

    public getToken() {
        return this._keycloak.token;
    }

    public async syncUserProfile(): Promise<UserProfile | undefined> {
        if (!this._keycloak.authenticated) {
            this._profile = undefined;
            return undefined;
        }

        const loadedProfile = (await this._keycloak.loadUserProfile()) as UserProfile;
        this._profile = {
            ...loadedProfile,
            token: this._keycloak.token
        };

        return this._profile;
    }
}

export default KeycloakService;
