import apiDefault from "./apiDefault";

export default {
    async getContacts({ name= '', page = 1, limit= 1000 } = {}) {
        const url = `contacts?name=${name}&page=${page}&limit=${limit}`;
        return await apiDefault.get({ url})
    },
    async getChatSession({ id = '' } = {}) {
        const url = `contacts/${id}/chats-session`;
        return await apiDefault.get({ url})
    },
    async getAllChats({ id = 0, limit = 1000, page = 1} = {}) {
        const url = `contacts/${id}/chats?page=${page}&limit=${limit}`;
        return await apiDefault.get({ url })
    },
    async addChat({  message = '', id = '' } = {}) {
        const url = `contacts/${id}/chats`;
        return await apiDefault.post({ url,request: {message}})
    },
    async deleteChat({ id=0, chatId = 0 } = {}) {
        const url = `contacts/${id}/chats/${chatId}`;
        return await apiDefault.delete({ url })
    },
};
