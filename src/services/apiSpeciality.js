import apiDefault from "./apiDefault";

export default {
    async getAll({ name=  '' } = {}) {
        const url = `specialities?name=${name}`;
        return await apiDefault.get({ url })
    },
    async getById({ id =  '' } = {}) {
        const url = `specialities/${id}`;
        return await apiDefault.get({ url })
    },
};
