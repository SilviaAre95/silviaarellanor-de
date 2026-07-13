// Fetches the Medium RSS feed at build time and writes src/data/articles.json.
// On any failure it exits 0 without touching the file, so the committed
// snapshot ships instead of failing the build.
import { writeFileSync } from "fs";

const FEED = "https://medium.com/feed/@silvia.datadev";
const OUT = new URL("../src/data/articles.json", import.meta.url);

const stripHtml = (s) =>
  s
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/[\p{Extended_Pictographic}️]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const excerptOf = (html, max = 160) => {
  const text = stripHtml(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

const readTimeOf = (html) => {
  const words = stripHtml(html).split(" ").length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

try {
  const res = await fetch(FEED, {
    headers: { "user-agent": "Mozilla/5.0 (site build; silviadata.dev)" },
  });
  if (!res.ok) throw new Error(`feed returned ${res.status}`);
  const xml = await res.text();

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const pick = (tag) =>
      (item.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`)) || [])[1] || "";
    const content = pick("content:encoded") || pick("description");
    const pub = new Date(pick("pubDate"));
    const title = stripHtml(pick("title"));
    // Medium posts usually open with their own title as a heading; drop it
    // (and any leading separators) so the excerpt starts at the real text.
    let body = stripHtml(content);
    if (title && body.startsWith(title)) body = body.slice(title.length).replace(/^[\s:.,-]+/, "");
    return {
      title,
      excerpt: excerptOf(body),
      date: pub.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: readTimeOf(content),
      link: pick("link").trim().split("?")[0],
    };
  });

  if (items.length === 0) throw new Error("feed parsed to zero items");
  writeFileSync(OUT, JSON.stringify(items, null, 2) + "\n");
  console.log(`fetch-blog: wrote ${items.length} articles from Medium feed`);
} catch (err) {
  console.warn(`fetch-blog: ${err.message} — keeping committed articles.json`);
}
