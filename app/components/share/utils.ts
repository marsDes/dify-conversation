import { CONVERSATION_ID_INFO } from '../constants'
import { fetchAccessToken } from '@/app/actions/dify'

export const getAppCode = () => {
  return globalThis.location?.pathname.split('/').slice(-1)[0] || `${process.env.NEXT_PUBLIC_APP_ID}`
}

export const checkOrSetAccessToken = async () => {
    const sharedToken = getAppCode()
    const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
    let accessTokenJson = { [sharedToken]: '' }
    try {
        accessTokenJson = JSON.parse(accessToken)
    }
    catch (e) {

    }
    if (!accessTokenJson[sharedToken]) {
        const res = await fetchAccessToken(sharedToken)
        accessTokenJson[sharedToken] = res.access_token
        localStorage.setItem('token', JSON.stringify(accessTokenJson))
    }
}

export const setAccessToken = async (sharedToken: string, token: string) => {
    const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
    let accessTokenJson = { [sharedToken]: '' }
    try {
        accessTokenJson = JSON.parse(accessToken)
    }
    catch (e) {

    }

    localStorage.removeItem(CONVERSATION_ID_INFO)

    accessTokenJson[sharedToken] = token
    localStorage.setItem('token', JSON.stringify(accessTokenJson))
}

export const removeAccessToken = () => {
    const sharedToken = globalThis.location.pathname.split('/').slice(-1)[0]

    const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
    let accessTokenJson = { [sharedToken]: '' }
    try {
        accessTokenJson = JSON.parse(accessToken)
    }
    catch (e) {

    }

    localStorage.removeItem(CONVERSATION_ID_INFO)

    delete accessTokenJson[sharedToken]
    localStorage.setItem('token', JSON.stringify(accessTokenJson))
}

export const getAccessToken = (sharedToken: string): string => {
    const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
    let accessTokenJson = { [sharedToken]: '' }
    try {
        accessTokenJson = JSON.parse(accessToken)
    }
    catch (e) {
        return ''
    }
    return accessTokenJson[sharedToken] || ''
}
