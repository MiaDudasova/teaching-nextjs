import { createDB } from '../lib/db'
import { MessagesList } from './MessagesList'

async function getMessages() {
  const db = createDB()
  const products = await db.selectFrom('products').select('name').execute()
  return products
}

export async function StaticMessages() {
  const products = await getMessages()

  return <MessagesList messages={products} />
}
