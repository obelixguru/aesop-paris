import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  imageCredit: string;
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? "Routine",
        image: data.image ?? "",
        imageCredit: data.imageCredit ?? "",
        readingTime: stats.text.replace("min read", "min"),
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ["Toutes", ...Array.from(cats)];
}
