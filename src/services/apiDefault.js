import { globals } from "../utils";

const ROOT = "https://coach-web-api.herokuapp.com/api/";

export default {
    async get({ url, withToken = true } = {}) {
        console.log('GET => ', url)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Access-Control-Allow-Origin"] = "*"
        headers['Content-Type'] = ['application/json']
        try {
            const result = await fetch(`${ROOT}${url}`, {
                headers: headers,
                method: 'GET'
            });
            const data = await result.json()
            console.log('RES => ', url, data)
            return { ...data, unauthorized: false };
        } catch (error) {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async post({ url = '', request = {}, withToken = true } = {}) {
        console.log('POST => ', url)
        console.log('REQ => ', request)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Access-Control-Allow-Origin"] = "*"
        headers['Content-Type'] = ['application/json']
        try {
            const result = await fetch(`${ROOT}${url}`,{
                method: 'POST',
                headers: headers,
                body: JSON.stringify(request)
            })
            const data = await result.json()
            return { ...data, unauthorized: false };
        }
        catch (error)
        {
            // console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async put({ url = '', request = {} , withToken = true} = {}) {
        console.log('PUT => ', url)
        console.log('REQ => ', request)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Access-Control-Allow-Origin"] = "*"
        headers['Content-Type'] = ['application/json']
        try {
            const result = await fetch(`${ROOT}${url}`,{
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(request)
            })
            const data = await result.json()
            return { ...data, unauthorized: false };
        }
        catch (error)
        {
            console.log('error', error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
    async delete({url = '', withToken = true} = {}) {
        console.log('DELETE => ', url)
        console.log('REQ => ', request)
        let headers = {}
        if (withToken) {
            console.log('TOKEN => ', globals.token)
            headers = { Authorization: `Bearer ${globals.token}` }
        }
        headers["Access-Control-Allow-Origin"] = "*"
        headers['Content-Type'] = ['application/json']
        try {
            const result = await fetch(`${ROOT}${url}`,{
                method: 'DELETE',
                headers: headers,
            })
            const data = await result.json()
            return { ...data, unauthorized: false };
        }
        catch (error)
        {
            console.error(error);
            return { unauthorized: true, error: true, message: 'ERROR SERVICE' }
        }
    },
};
