import { reactive } from 'vue'
import { directus } from '../API'

const store = reactive({
    authenticated: false,
    tokenInfo: {},
    user: {},

    async isAuthenticated() {
        try {
            // Intenta obtener el token desde localStorage si no está en el store
            const storedToken = localStorage.getItem('tokenInfo');
            if (storedToken) {
                this.tokenInfo = JSON.parse(storedToken);
                this.authenticated = true;
            }

            if (!this.tokenInfo.refresh_token) {
                throw new Error('No refresh token found.');
            }

            const response = await directus.auth.refresh({ refresh_token: this.tokenInfo.refresh_token });

            if (!response) {
                throw new Error('Token refresh failed, response is empty.');
            }

            this.processToken(response);
            return true;
        } catch (error) {
            console.error('Authentication failed:', error.message);
            this.resetTokenInfo();
            return false;
        }
    },

    async login(email, password) {
        try {
            const response = await directus.auth.login({ email, password });
            this.processToken(response);
            return response;
        } catch (error) {
            console.log(error);
            this.resetTokenInfo();
            return false;
        }
    },

    async logout() {
        const response = await directus.auth.logout();
        this.resetTokenInfo();
        return response;
    },

    async getUserInfo() {
        return await directus.users.me.read();
    },

    async processToken(response) {
        this.storeTokenInfo(response);
        const user = await this.getUserInfo();
        this.storeUserInfo(user);
    },

    storeUserInfo(user) {
        this.user = user;
    },

    storeTokenInfo(payload) {
        const { access_token, refresh_token, expires } = payload;
        if (!access_token || !expires || !refresh_token) {
            console.error('Cannot store token information: invalid payload.');
            return;
        }
        this.authenticated = true;
        this.tokenInfo = { access_token, refresh_token, expires };
        // Almacenar el token en localStorage
        localStorage.setItem('tokenInfo', JSON.stringify(this.tokenInfo));
    },

    resetTokenInfo() {
        this.authenticated = false;
        this.tokenInfo = {};
        // Eliminar el token de localStorage
        localStorage.removeItem('tokenInfo');
    }
})

export { store as default }
