'use server'

import { DIFY_API_URL } from '@/config';

export const fetchAccessToken = async (appCode: string) => {
  const headers = new Headers()
  headers.append('X-App-Code', appCode)
  const res = await fetch(`${DIFY_API_URL}/passport`, { headers })
  return await res.json()
}

export const fetchAppInfo = async (accessToken: string) => {
  const headers = new Headers()
  headers.append('Authorization', 'Bearer ' + accessToken)
  const res = await fetch(`${DIFY_API_URL}/site`, { headers })
  return await res.json()
}
