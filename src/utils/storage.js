import AsyncStorage from '@react-native-async-storage/async-storage'
import globals from './globals'

const TOKEN = 'TOKEN'
const PROFILE = 'PROFILE'

export default {
    clearData: async () => {
        try{
            await AsyncStorage.clear()
            globals.token = ''
            globals.name = 0
            globals.name = ''
            globals.last_name = ''
            globals.mother_last_name = ''
            globals.email = ''
            globals.id = 0
            return true
        }catch {
            return false
        }
    },
    getToken: async () => {
        try{
            const token =  await AsyncStorage.getItem(TOKEN) ?? ''
            globals.token = token
            return token
        }catch {
            return ''
        }
    },
    getProfile: async () => {
        try{
            const jsonProfile = await AsyncStorage.getItem(PROFILE)
            const profile = jsonProfile != null ? JSON.parse(jsonProfile) : {name: '', last_name: '', email: '', mother_last_name: '', id: 0}
            globals.name = profile.name
            globals.last_name = profile.last_name
            globals.mother_last_name = profile.mother_last_name
            globals.email = profile.email
            globals.id = profile.id
            return profile
        }catch {
            return {name: '', lastName: '', email: ''}
        }
    },
    setToken: async (token) => {
        try{
            globals.token = token
            await AsyncStorage.setItem(TOKEN, token)
            return true
        }catch {
            return false
        }
    },
    setProfile: async (profile) => {
        try{
            const {id, name, last_name, mother_last_name, email} = profile
            globals.id = id
            globals.name = name
            globals.last_name = last_name
            globals.mother_last_name = mother_last_name
            globals.email = email
            const jsonProfile = JSON.stringify(profile)
            await AsyncStorage.setItem(PROFILE, jsonProfile)
            return true
        }catch {
            return false
        }
    },
}