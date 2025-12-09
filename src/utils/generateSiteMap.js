import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath to convert URL to path
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJson = (fileName) => {
  const filePath = path.join(__dirname, "../../public/api", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

// Static routes (no dynamic slugs)
const staticRoutes = ["/", "/bio", "/contact", "/blog", "/works"];

// Function to generate the sitemap XML
const generateSitemap = async () => {
  const posts = loadJson("posts.json");
  const works = loadJson("works.json");

  const postSlugs = posts
    .map((item) => item?.general?.slug)
    .filter(Boolean);
  const workSlugs = works
    .map((item) => item?.general?.slug)
    .filter(Boolean);

  const baseUrl = process.env.BASE_URL || "";

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticRoutes.forEach((route) => {
    sitemap += `  <url>\n    <loc>${baseUrl}${route}</loc>\n  </url>\n`;
  });

  postSlugs.forEach((slug) => {
    sitemap += `  <url>\n    <loc>${baseUrl}/${slug}</loc>\n  </url>\n`;
  });

  workSlugs.forEach((slug) => {
    sitemap += `  <url>\n    <loc>${baseUrl}/works/${slug}</loc>\n  </url>\n`;
  });

  sitemap += "</urlset>\n";

  fs.writeFileSync(
    path.join(__dirname, "../../", "public", "sitemap.xml"),
    sitemap
  );
  console.log("Sitemap generated: " + "public/sitemap.xml");
};

// Call the function to generate the sitemap
generateSitemap();
