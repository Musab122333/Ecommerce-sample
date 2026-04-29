import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Aura Wireless Headphones',
        slug: 'aura-headphones',
        description: 'Studio-grade noise cancellation wrapped in pearl and rose gold. 40-hour battery, spatial audio.',
        price: 349,
        originalPrice: 399,
        image: '/product-headphones.jpg',
        images: [],
        category: 'Audio',
        badge: 'Bestseller',
        rating: 4.9,
        quantity: 50,
      },
      {
        name: 'Halo Iridescent Smartwatch',
        slug: 'halo-watch',
        description: 'Holographic strap, always-on AMOLED, 7-day battery. Health tracking that feels like jewelry.',
        price: 459,
        originalPrice: 499,
        image: '/product-watch.jpg',
        images: [],
        category: 'Wearables',
        badge: 'New',
        rating: 4.8,
        quantity: 30,
      },
      {
        name: 'Rose Quartz Eau de Parfum',
        slug: 'rose-perfume',
        description: 'Pink pepper, Bulgarian rose, and warm amber. A signature scent in frosted glass.',
        price: 129,
        image: '/product-perfume.jpg',
        images: [],
        category: 'Beauty',
        rating: 4.7,
        quantity: 100,
      },
      {
        name: 'Pearl Lilac Sneakers',
        slug: 'pearl-sneakers',
        description: 'Premium leather with iridescent finish. Cloud-soft sole, all-day comfort.',
        price: 219,
        image: '/product-sneaker.jpg',
        images: [],
        category: 'Footwear',
        rating: 4.6,
        quantity: 40,
      },
      {
        name: 'Lilac Lounge Chair',
        slug: 'lilac-chair',
        description: 'Mid-century modern design with sumptuous velvet. As comfortable as it looks.',
        price: 1249,
        originalPrice: 1499,
        image: '/product-chair.jpg',
        images: [],
        category: 'Home',
        rating: 4.9,
        quantity: 15,
      },
      {
        name: 'Iridescent Canvas Bag',
        slug: 'iridescent-bag',
        description: 'Handwoven with color-shifting finish. Carries 25L with Italian leather accents.',
        price: 189,
        image: '/product-bag.jpg',
        images: [],
        category: 'Bags',
        rating: 4.8,
        quantity: 25,
      },
    ],
  });

  console.log(`✅ Created ${products.count} products`);

  console.log('🌱 Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
