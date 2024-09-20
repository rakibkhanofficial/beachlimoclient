// pages/api/sitemap.xml.tsx
import { getMethod } from '~@/utils/api/getMethod'
import { endPoints } from '~@/utils/api/route'
import type { NextApiRequest, NextApiResponse } from 'next'

type SlugPropsType = {
  strSlug: string
}

const homepage = 'https://www.beachlimofl.com'

const generateSitemap = (Data: SlugPropsType[]) => {
  const sitemapContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/allproducts</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/brands</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/contact-us</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/under-construction</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/terms-conditions</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/privacy-policy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/return-policy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${Data.map((data: SlugPropsType) => `
        <url>
          <loc>${homepage}/${data.strSlug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>`).join('')}
    </urlset>
  `;

  return sitemapContent.trim(); // Trim to remove leading/trailing whitespaces
}

const sitemapHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getMethod(endPoints?.cars.getAllSlugs)
    if (response?.data?.statusCode === 200 && Array.isArray(response?.data?.data)) {
      const sitemap = generateSitemap(response.data.data)
      res.setHeader('Content-Type', 'application/xml')
      res.status(200).send(sitemap)
    } else {
      console.error('No slugs fetched or incorrect data structure')
      res.status(500).end('Internal Server Error')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).end('Internal Server Error')
  }
}

export default sitemapHandler
