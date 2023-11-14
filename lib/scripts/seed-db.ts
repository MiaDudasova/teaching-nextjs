import { createDB } from '../../src/lib/db'
import { faker } from '@faker-js/faker'

async function seedDB() {
  console.log('Seeding database...')

  const db = createDB()

  await db.deleteFrom('productsReviews').execute()
  await db.deleteFrom('products').execute()

  const products = []

  for (let i = 0; i < 100; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    })
  }

  // const createdProducts = await db.insertInto('products').values(products).returning('id').execute()
  await db.insertInto('products').values(products).execute()
  const createdProducts = await db.selectFrom('products').select('id').execute()

  const reviews = []

  for (const createdProduct of createdProducts) {
    console.log(createdProduct.id)

    const nReviews = faker.number.int({ min: 0, max: 5 })

    for (let i = 0; i < nReviews; i++) {
      reviews.push({
        productId: createdProduct.id,
        rating: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.sentences({ min: 1, max: 5 }),
        username: faker.internet.userName(),
      })
    }
  }

  if (reviews.length > 0) {
    await db.insertInto('productsReviews').values(reviews).execute()
  }

  console.log('Done')
}

seedDB()
