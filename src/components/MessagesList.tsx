export function MessagesList({ messages }: { messages: { name: string }[] }) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message.name}</li>
      ))}
    </ul>
  )
}
