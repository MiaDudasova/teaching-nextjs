import { createDB } from '../lib/db'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductReviews(id: number) {
  const db = createDB()

  const reviews = await db.selectFrom('productsReviews').selectAll().where('productId', '=', id).execute()

  return reviews
}

type ProductDetailProps = {
  id: number
}

export async function ProductDetail({ id }: ProductDetailProps) {
  const product = await getProductDetail(id)
  const reviews = await getProductReviews(id)

  return (
    <div>
      <div>{product.name}</div>
      <div>
        {reviews.map((pr) => (
          <div key={pr.id}>
            User: {pr.username} <br /> {pr.content}
          </div>
        ))}
      </div>
    </div>
  )
}
