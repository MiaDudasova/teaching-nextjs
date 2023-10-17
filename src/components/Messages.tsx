'use client'

import { useEffect, useState } from 'react'
import { MessagesList } from './MessagesList'

export function Messages() {
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setMessages(data))
  }, [])

  if (messages == null) {
    return <div>Loading...</div>
  }

  return <MessagesList messages={messages} />
}
