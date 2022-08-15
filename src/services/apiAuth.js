import apiDefault from "./apiDefault";

export default {
    async login({ email = '', password = '', fcm_token = '' } = {}) {
        const url = `auth/login`;
        return await apiDefault.post({ url,request: {email, password, fcm_token}, withToken: false  })
    },
    async register({ names = '', last_name = '', mother_last_name = '', email = '', password = '', birthdate = '', linkedin = ''} = {}) {
        const url = `auth/register`;
        return await apiDefault.post({ url,request: {names, last_name, mother_last_name, email, password, birthdate, linkedin} , withToken:false })
    },
    async forget({ email = '' } = {}) {
        const url = `auth/forget`;
        return await apiDefault.post({ url,request: {email}, withToken:false  })
    },
    async resetPassword({ code = '', password = '' } = {}) {
        const url = `auth/reset-password`;
        return await apiDefault.post({ url,request: {code, password} , withToken:false })
    },
};
