import { createDB } from '../../src/lib/db'
import fs from "fs/promises"
import { faker } from "@faker-js/faker"

async function seedDB() {
  console.log('Seeding database...')

  const db = createDB()

  await db.deleteFrom('productsReviews').execute()

  await db.deleteFrom('products').execute()

  const products = []

  for (let index = 0; index < 100; index++) {
    const randomName = faker.commerce.productName();
    const randomDesc = faker.commerce.productDescription();
    const randomPrice = Number(faker.commerce.price());

    let product = { name: randomName, description: randomDesc, price: randomPrice };

    products.push(product)
  }

  console.log(products)


  const createdProducts = await db
    .insertInto('products')
    .values(products).returning("id")
    .execute()


  const productReviews = []

  for (const createdProduct of createdProducts) {
    const numberRatings = faker.number.int({ min: 0, max: 3 });

    for (let i = 0; i < numberRatings; i++) {
      const randomRating = faker.number.int({ min: 1, max: 10 });
      const randomContent = faker.lorem.text();

      let productReview = { productId: createdProduct.id, rating: randomRating, content: randomContent };

      productReviews.push(productReview)
    }
  }

  await db
    .insertInto('productsReviews')
    .values(productReviews)
    .execute()

  console.log('Done')
}

seedDB()
