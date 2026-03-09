const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Error: Please provide a SANITY_API_WRITE_TOKEN in your .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-09',
  token,
  useCdn: false
});

async function cleanup() {
  console.log('🗑️ Fetching all products to delete...');
  // We fetch all products and delete them to reset the state
  const products = await client.fetch(`*[_type == "product"]{_id}`);
  
  if (products.length === 0) {
    console.log('No products found to delete.');
    return;
  }

  console.log(`Deleting ${products.length} products...`);
  
  for (const product of products) {
    try {
      await client.delete(product._id);
      console.log(`✅ Deleted ${product._id}`);
    } catch (e) {
      console.error(`❌ Failed to delete ${product._id}`, e.message);
    }
  }

  console.log('🎉 Cleanup complete!');
}

cleanup().catch(console.error);
