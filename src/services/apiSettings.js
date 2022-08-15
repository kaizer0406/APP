import apiDefault from "./apiDefault";

export default {
    async getProfile({ } = {}) {
        const url = `settings/profile`;
        return await apiDefault.get({ url })
    },
    async updateProfile({ names = '', last_name = '', mother_last_name = '', email = '', password = '', birthdate = '', linkedin = '' } = {}) {
        const url = `settings/profile`;
        return await apiDefault.put({ url, request: {names, last_name, mother_last_name, email, password, birthdate, linkedin} })
    },
};
