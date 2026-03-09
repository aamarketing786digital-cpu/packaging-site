const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// This script expects a WRITE token in your .env.local file:
// SANITY_API_WRITE_TOKEN="your-secret-write-token"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.error("Error: Please provide a SANITY_API_WRITE_TOKEN in your .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-09',
  token,
  useCdn: false
})

const categories = [
  { _id: 'cat-films-wraps', name: 'Films & Wraps', slug: { _type: 'slug', current: 'films-wraps' }, order: 10 },
  { _id: 'cat-boxes-cartons', name: 'Boxes & Cartons', slug: { _type: 'slug', current: 'boxes-cartons' }, order: 20 },
  { _id: 'cat-tapes', name: 'Tapes', slug: { _type: 'slug', current: 'tapes' }, order: 30 },
  { _id: 'cat-straps-accessories', name: 'Straps & Accessories', slug: { _type: 'slug', current: 'straps-accessories' }, order: 40 },
  { _id: 'cat-foams-boards', name: 'Foams & Boards', slug: { _type: 'slug', current: 'foams-boards' }, order: 50 },
  { _id: 'cat-pouches-bags', name: 'Pouches & Bags', slug: { _type: 'slug', current: 'pouches-bags' }, order: 60 },
  { _id: 'cat-labels', name: 'Labels', slug: { _type: 'slug', current: 'labels' }, order: 70 },
  { _id: 'cat-safety-gloves', name: 'Safety & Gloves', slug: { _type: 'slug', current: 'safety-gloves' }, order: 80 },
]

const products = [
  // Films & Wraps
  { title: "Stretch Films", slug: "stretch-films", category: "cat-films-wraps", desc: "Hand Grade & Machine Grade Stretch Films" },
  { title: "Air Bubble Rolls", slug: "air-bubble-rolls", category: "cat-films-wraps", desc: "Air Bubble Rolls | Bubble Wrap" },
  { title: "Black Stretch Film Wrap", slug: "black-stretch-film-wrap", category: "cat-films-wraps", desc: "Black Stretch Film Wrap Suppliers & Manufacturers" },

  // Boxes & Cartons
  { title: "Carton Boxes", slug: "carton-boxes", category: "cat-boxes-cartons", desc: "All Types Carton Boxes" },
  { title: "Corrugated Box", slug: "corrugated-box", category: "cat-boxes-cartons", desc: "Corrugated Sheet Roll | Cardboard Box" },
  { title: "Heavy Duty Boxes", slug: "heavy-duty-boxes", category: "cat-boxes-cartons", desc: "Heavy Duty Carton Box Suppliers & Manufactures" },
  { title: "Die Cut Boxes", slug: "die-cut-boxes", category: "cat-boxes-cartons", desc: "Custom Die Cut Box Manufacturers & Suppliers" },
  { title: "Shipping Boxes", slug: "shipping-boxes", category: "cat-boxes-cartons", desc: "Custom Corrugated Shipping Manufactures and Suppliers" },
  { title: "Corrugated E-Commerce Boxes", slug: "corrugated-e-commerce-boxes", category: "cat-boxes-cartons", desc: "Custom E-Commerce Packaging Box" },
  { title: "RSC Box", slug: "rsc-box", category: "cat-boxes-cartons", desc: "Corrugated RSC Box Manufactures and Suppliers" },
  { title: "Fruit Packaging Box", slug: "fruit-packaging-box", category: "cat-boxes-cartons", desc: "Durable Corrugated Fruit Cartons Dubai" },

  // Tapes
  { title: "Bopp Tapes", slug: "bopp-tapes", category: "cat-tapes", desc: "Bopp Tape Manufacturers & Suppliers" },
  { title: "Masking Tapes", slug: "masking-tapes", category: "cat-tapes", desc: "Masking Tapes Manufacturers & Suppliers" },
  { title: "Duct Tape", slug: "duct-tape", category: "cat-tapes", desc: "High-Quality Duct Tape for Industrial & Household" },
  { title: "Aluminum Tape", slug: "aluminum-tape", category: "cat-tapes", desc: "Aluminum adhesive tape suppliers in Dubai" },
  { title: "Double Sided Tape", slug: "double-sided-tape", category: "cat-tapes", desc: "Double Sided Adhesive Tape Suppliers UAE" },
  { title: "Protection Tape", slug: "protection-tape", category: "cat-tapes", desc: "Surface Protection Tapes" },

  // Straps & Accessories
  { title: "PP Straps", slug: "pp-straps", category: "cat-straps-accessories", desc: "PP Straps Suppliers" },
  { title: "Clips and Buckles", slug: "clips-and-buckles", category: "cat-straps-accessories", desc: "Straping Clips & Buckles" },
  { title: "Pet Strap", slug: "pet-strap", category: "cat-straps-accessories", desc: "Pet Straps Manufacturers & Suppliers" },
  { title: "Cord Strap", slug: "cord-strap", category: "cat-straps-accessories", desc: "Polyester Cord Strap Suppliers" },
  { title: "Corner Edge", slug: "corner-edge", category: "cat-straps-accessories", desc: "L Corners or Edge Protectors" },
  { title: "U Channel Edge Protectors", slug: "u-channel-edge-protectors", category: "cat-straps-accessories", desc: "U-Shaped Edge Protectors Suppliers In UAE" },
  { title: "V Shaped Foam Edge Protector", slug: "v-shaped-foam-edge-protector", category: "cat-straps-accessories", desc: "V-Profile Foam Edge Protectors UAE" },

  // Foams & Boards
  { title: "Poly Sheets", slug: "poly-sheets", category: "cat-foams-boards", desc: "PE Sheets /Polythene Sheet Suppliers UAE" },
  { title: "EPS, XPS, PU, Styrofoam", slug: "eps-xps-pu-styrofoam", category: "cat-foams-boards", desc: "Foam Materials for Packaging, Insulation & Construction" },
  { title: "PE Foam Backup Rods", slug: "pe-foam-backup-rods", category: "cat-foams-boards", desc: "Backup and Backer Rods" },
  { title: "PE Foam Pipes", slug: "pe-foam-pipes", category: "cat-foams-boards", desc: "PE Foam Tubes, Foam Pipe" },
  { title: "PE Foam Profiles", slug: "pe-foam-profiles", category: "cat-foams-boards", desc: "PE Foam Profiles Manufacturers & Suppliers" },
  { title: "PE Foam Sheets", slug: "pe-foam-sheets", category: "cat-foams-boards", desc: "PE Foam Sheets & Rolls Manufacturers & Suppliers" },
  { title: "Polyethylene Foam", slug: "polyethylene-foam", category: "cat-foams-boards", desc: "Foam Sheets, Rolls, Strips" },
  { title: "Polystyrene Board (Extruded)", slug: "polystyrene-board-extruded", category: "cat-foams-boards", desc: "Extruded Polystyrene" },
  { title: "PE Foam Custom Design", slug: "pe-foam-custom-design", category: "cat-foams-boards", desc: "PE Foam Custom Cut Sheets Suppliers" },
  { title: "Thermocol Sheet", slug: "thermocol-sheet", category: "cat-foams-boards", desc: "EPS, XPS, PU, Styrofoam Sheets" },
  { title: "Honeycomb Sheet", slug: "honeycomb-sheet", category: "cat-foams-boards", desc: "Paper Honeycomb Box, Sheet & Core" },
  { title: "EVA Foam Sheet", slug: "eva-foam-sheet", category: "cat-foams-boards", desc: "EVA Foam Sheets Manufactures and Suppliers UAE" },
  { title: "EPE Foam Net", slug: "epe-foam-net", category: "cat-foams-boards", desc: "PE Foam Fruit & Bottle Net Suppliers" },
  { title: "PE Foam Roll", slug: "pe-foam-roll", category: "cat-foams-boards", desc: "PE Foam Roll Supplier & Manufacturer UAE" },
  { title: "Nylon Plastic Roll", slug: "nylon-plastic-roll", category: "cat-foams-boards", desc: "High-Quality Nylon Roll & Nylon Plastic Roll in UAE" },

  // Pouches & Bags
  { title: "Thermal Bubble Bags", slug: "thermal-bubble-bags", category: "cat-pouches-bags", desc: "Thermal Bubble Pouches Suppliers UAE" },
  { title: "Air bubble pouches", slug: "air-bubble-pouches", category: "cat-pouches-bags", desc: "Custom Air Bubble Pouches Dubai" },
  { title: "PE Foam Pouches", slug: "pe-foam-pouches", category: "cat-pouches-bags", desc: "Custom PE Foam Pouches" },
  { title: "Insulated Foam Pouches", slug: "insulated-foam-pouches", category: "cat-pouches-bags", desc: "Custom Size Insulated & Thermal Foam Pouch Suppliers" },
  { title: "Courier Bags", slug: "courier-bags", category: "cat-pouches-bags", desc: "Courier Bags & Self-Adhesive Courier Bags Suppliers" },
  { title: "Zip Lock Bags", slug: "zip-lock-bags", category: "cat-pouches-bags", desc: "Zip Lock Plastic Bag Suppliers" },
  { title: "Resealable Poly Bags", slug: "resealable-poly-bags", category: "cat-pouches-bags", desc: "Custom Resealable Plastic Bags UAE" },
  { title: "Packing List Envelopes", slug: "packing-list-envelopes", category: "cat-pouches-bags", desc: "Packing List Envelopes/ Enclosed Envelopes" },
  { title: "Garbage Bag", slug: "garbage-bag", category: "cat-pouches-bags", desc: "HDPE and LDPE Garbage Bags" },

  // Labels
  { title: "Pre-Printed Labels", slug: "pre-printed-labels", category: "cat-labels", desc: "Pre-Printed Labels/Printed Labels Suppliers" },
  { title: "Rack Labels", slug: "rack-labels", category: "cat-labels", desc: "Rack Labels /Warehouse Labeling Solutions UAE" },
  { title: "Plain Labels", slug: "plain-labels", category: "cat-labels", desc: "Plain Labels/Adhesive Plain Labels Suppliers" },
  { title: "Direct Thermal Labels", slug: "direct-thermal-labels", category: "cat-labels", desc: "Custom & Printable Direct Thermal Labels in UAE" },

  // Safety Gloves
  { title: "Cotton Gloves", slug: "cotton-gloves", category: "cat-safety-gloves", desc: "Cotton Cloth Gloves Suppliers UAE" },
  { title: "Leather Gloves", slug: "leather-gloves", category: "cat-safety-gloves", desc: "Durable Industrial & Safety Leather Gloves Suppliers" },
  { title: "Nitrile Gloves", slug: "nitrile-gloves", category: "cat-safety-gloves", desc: "Disposable & Industrial Nitrile Gloves Supplier" },
  { title: "Chemical Resistant Gloves", slug: "chemical-resistant-gloves", category: "cat-safety-gloves", desc: "Industrial Rubber Chemical Resistant Gloves Supliers" },
  { title: "Knitted Gloves", slug: "knitted-gloves", category: "cat-safety-gloves", desc: "Cotton Knitted Gloves Suppliers UAE" },
  { title: "Latex Gloves", slug: "latex-gloves", category: "cat-safety-gloves", desc: "Disposable Latex Gloves Suppliers In UAE" },
]

async function uploadImageFromUrl(url) {
  try {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const imageAsset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `product-image-${Date.now()}.jpg`
    })
    return imageAsset._id
  } catch (err) {
    console.error(`Failed to upload image from ${url}:`, err.message)
    return null
  }
}

const fs = require('fs');
let imageMap = {};
try {
  imageMap = JSON.parse(fs.readFileSync('scripts/scraped_images.json', 'utf8'));
} catch(e) {
  console.log('No local image map found, falling back to placeholders.');
}

async function run() {
  console.log('🚀 Starting Al Najah Products Upload to Sanity...\n')

  // 1. Create Categories
  console.log('--- Creating Categories ---')
  for (const cat of categories) {
    await client.createIfNotExists({
      _id: cat._id,
      _type: 'category',
      name: cat.name,
      slug: cat.slug,
      order: cat.order
    })
    console.log(`✅ Category: ${cat.name}`)
  }

  // 2. Create Products
  console.log('\n--- Creating Products ---')
  let count = 0;
  for (const prod of products) {
    const sku = `NLP-${prod.slug.substring(0,6).toUpperCase()}-${String(count++).padStart(3, '0')}`
    
    // Get actual scraped image or fallback to placeholder
    let imageUrl = `https://picsum.photos/seed/${prod.slug}/800/600`
    if (imageMap[prod.slug]) {
      imageUrl = imageMap[prod.slug].replace(/\\/g, '/');
    }
    
    console.log(`\nUploading image for: ${prod.title}...`)
    const imageAssetId = await uploadImageFromUrl(imageUrl)

    const newProduct = {
      _type: 'product',
      name: { en: prod.title },
      slug: { _type: 'slug', current: prod.slug },
      sku: sku,
      category: {
        _type: 'reference',
        _ref: prod.category
      },
      description: {
        en: prod.desc
      },
      pricing: {
        showPrice: false,
        moq: 1,
        unit: 'pieces'
      },
      specifications: [
        {
          _key: 'spec1',
          _type: 'spec',
          label: "Brand",
          value: "Next Level Packaging"
        }
      ]
    }

    if (imageAssetId) {
      newProduct.images = [
        {
          _key: `img-${Date.now()}`,
          _type: 'productImage',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          },
          alt: prod.title,
          isPrimary: true
        }
      ]
    }

    // Save product to Sanity
    try {
      await client.create(newProduct)
      console.log(`✅ Created Product: ${prod.title} (SKU: ${sku})`)
    } catch(err) {
      console.error(`❌ Error creating ${prod.title}:`, err.message)
    }
  }

  console.log('\n🎉 Finished uploading all products!')
}

run().catch(console.error)
