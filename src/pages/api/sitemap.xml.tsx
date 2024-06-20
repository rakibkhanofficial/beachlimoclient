// pages/api/sitemap.xml.tsx

import { NextApiRequest, NextApiResponse } from 'next';

// Homepage URL
const homepage = 'https://www.beachlimofl.com';

// Function to generate the sitemap
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const sitemapContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${homepage}/login</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/register</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/contact-us</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/under-construction</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/terms-conditions</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/privacy-policy</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/return-policy</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${homepage}/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>
  `;
  return sitemapContent.trim(); // Trim to remove leading/trailing whitespaces
};

// Handler function to generate the sitemap
const sitemapHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sitemapContent = generateSitemap();

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(sitemapContent);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end('Internal Server Error');
  }
};

export default sitemapHandler;
