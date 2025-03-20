"use client"
import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import ChatWithHistoryWrap from '@/app/components/chat-with-history'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <ChatWithHistoryWrap />
  )
}

export default React.memo(App)
