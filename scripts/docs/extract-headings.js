const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const files = glob.sync("app/docs/**/*.mdx");
const results = [];
console.log(files);

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const matches = [...content.matchAll(/^(#{1,2})\s+(.*)$/gm)];
  const headings = matches.map(([, hashes, text]) => ({
    text: text.trim(),
    id: slugify(text.trim()),
    level: hashes.length,
  }));
  results.push({
    title:
      (headings.find((h) => h.level === 1) || {}).text ||
      path.basename(file, ".mdx"),
    slug: file
      .replace(/^app/, "")
      .replace(/\\/g, "/")
      .replace(/\.mdx$/, "")
      .replace(/\/page$/, ""),
    headings: headings.filter((h) => h.level <= 2),
  });
}

const outputPath = path.join(process.cwd(), "public/docs-headings.json");
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));