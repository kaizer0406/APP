import apiDefault from "./apiDefault";

export default {
    async matriculatedLevel({   id = '' } = {}) {
        const url = `specialities/levels/${id}/matriculated`;
        return await apiDefault.post({ url })
    },
    async getMatriculatedLevel({ name = '' } = {}) {
        const url = `specialities/levels/matriculated?name=${name}`;
        return await apiDefault.get({ url })
    },
    async getMatriculatedLevelById({ id = '' } = {}) {
        const url = `specialities/levels/${id}/matriculated`;
        return await apiDefault.get({ url })
    },
    async getPartnersByLevel({ id = '' } = {}) {
        const url = `specialities/levels/${id}/partners`;
        return await apiDefault.get({ url })
    },
    async getTrophies() {
        const url = `specialities/levels/trophies`;
        return await apiDefault.get({ url })
    },
};
