const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  try {
    const res = await fetch('https://www.alnajahpacking.com/products');
    const html = await res.text();
    const $ = cheerio.load(html);
    
    const imageMap = {};
    
    // Attempting to find products and their images based on common patterns
    // We look for links pointing to product slugs.
    $('a[href*="/products/"]').each((i, el) => {
      const href = $(el).attr('href');
      const slugMatch = href.match(/\/products\/([a-z0-9-]+)$/);
      if (!slugMatch) return;
      
      const slug = slugMatch[1];
      
      // Look for an image inside this link, or near it
      let imgSrc = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
      
      // If no image inside the link, look at the parent/sibling structure
      if (!imgSrc) {
        const parentImg = $(el).closest('.product, .item, li, div').find('img').attr('src');
        if (parentImg) imgSrc = parentImg;
      }
      
      if (imgSrc && !imageMap[slug]) {
        // Handle relative URLs
        if (imgSrc.startsWith('/')) {
            imgSrc = 'https://www.alnajahpacking.com' + imgSrc;
        } else if (!imgSrc.startsWith('http')) {
            // E.g. some obscure relative path
            imgSrc = 'https://www.alnajahpacking.com/' + imgSrc;
        }
        imageMap[slug] = imgSrc;
      }
    });

    fs.writeFileSync('scripts/scraped_images.json', JSON.stringify(imageMap, null, 2));
    console.log('✅ Successfully extracted ' + Object.keys(imageMap).length + ' image mappings.');
  } catch (err) {
    console.error('Error scraping:', err);
  }
}

scrape();
