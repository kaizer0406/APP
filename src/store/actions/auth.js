import { SIGN_IN, SIGN_OUT, PROFILE } from '../types';

export const signIn = (token) => ({
    type: SIGN_IN,
    token: token,
})

export const signOut = () => ({
    type: SIGN_OUT,
    data: ''
})

export const profile = () => ({
    type: PROFILE,
    data: data
})