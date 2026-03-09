import { reactive } from 'vue';
import { directus } from '../API';
import Cookies from 'js-cookie';

const store = reactive({
    authenticated: false,
    tokenInfo: {},
    user: {},

    async isAuthenticated() {
        try {
            const response = await directus.auth.refresh();
            this.processToken(response);
            return response;
        } catch (error) {
            console.log(error);
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
        let me =await directus.users.me.read();
        console.log(me)
        return me
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
        const { access_token, expires } = payload;
        if (!access_token || !expires) {
            console.error('Cannot store access token information: invalid payload.');
            return;
        }

        this.authenticated = true;
        this.tokenInfo = { access_token, expires };

        Cookies.set('access_token', access_token, { expires: expires / 86400, secure: true, sameSite: 'Strict' });
    },

    resetTokenInfo() {
        this.authenticated = false;
        this.tokenInfo = {};

        Cookies.remove('access_token');
    },

    getTokenFromCookie() {
        const token = Cookies.get('access_token');
        if (token) {
            this.authenticated = true;
            this.tokenInfo = { access_token: token };
        }
    }
});

store.getTokenFromCookie();

export { store as default };
