import apiDefault from "./apiDefault";

export default {
    async getAll({ page = 1, limit= 1000 } = {}) {
        const url = `success-case?page=${page}&limit=${limit}`;
        return await apiDefault.get({url})
    },
};
