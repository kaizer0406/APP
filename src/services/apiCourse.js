import apiDefault from "./apiDefault";

export default {
    async saveTimeVideo({   id = '', time = '', isFinish = false } = {}) {
        const url = `specialities/levels/courses/${id}/time-video`;
        return await apiDefault.put({ url, request: {time: time, is_finish: isFinish} })
    },
    async saveCardLesson({   id = '', order = '', isFinish = false } = {}) {
        const url = `specialities/levels/courses/${id}/lesson`;
        return await apiDefault.put({ url, request: {order: order, is_finish: isFinish} })
    },
    async getStatus() {
        const url = `specialities/levels/courses/status`;
        return await apiDefault.get({ url })
    },
};
