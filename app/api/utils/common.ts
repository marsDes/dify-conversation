import { type NextRequest } from 'next/server'
import { ChatClient } from 'dify-client-plus'
import { v4 } from 'uuid'
import { API_KEY, API_URL } from '@/config'

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const appCode = request.headers.get('X-App-Code')
  const user = `user_${appCode}:${sessionId}`

  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
