import React, { useState, useEffect } from "react";

// Define the type for each blog post
type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date?: string;
  authors?: string[] | string;
  tags?: string[] | string;
};

// Define props with correct type
interface BlogSearchProps {
  posts: BlogPost[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      posts.filter((post) => {
        // Title and description
        const matchesTitle = post.title?.toLowerCase().includes(q);
        const matchesDescription = post.description?.toLowerCase().includes(q);

        // Authors: supports array or string
        let authorsArr: string[] = [];
        if (Array.isArray(post.authors)) {
          authorsArr = post.authors;
        } else if (typeof post.authors === "string") {
          authorsArr = [post.authors];
        }
        const matchesAuthor = authorsArr.some((author) =>
          author.toLowerCase().includes(q)
        );

        // Tags: supports array or string
        let tagsArr: string[] = [];
        if (Array.isArray(post.tags)) {
          tagsArr = post.tags;
        } else if (typeof post.tags === "string") {
          tagsArr = [post.tags];
        }
        const matchesTag = tagsArr.some(
          (tag) =>
            tag.toLowerCase().includes(q) ||
            ("#" + tag.toLowerCase()).includes(q)
        );

        return matchesTitle || matchesDescription || matchesAuthor || matchesTag;
      })
    );
  }, [query, posts]);

  return (
    <section className="my-8 p-6 border rounded-xl bg-secondary/30">
      <h2 className="text-xl font-semibold mb-4">🔎 Search Blog Posts</h2>
      <input
        type="text"
        className="w-full border rounded-md px-3 py-2 mb-4"
        placeholder="Search blog posts by title, description, author, or tag..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="space-y-2">
        {query && results.length === 0 && <li>No results found.</li>}
        {results.map((post) => (
          <li key={post.slug} className="border-b pb-2 mb-2">
            <a href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">
              {post.title}
            </a>
            <div className="text-xs text-muted-foreground">{post.description}</div>
            {post.authors && (
              <div className="text-xs">
                <span className="font-semibold">Authors:</span>{" "}
                {Array.isArray(post.authors) ? post.authors.join(", ") : post.authors}
              </div>
            )}
            {post.tags && (
              <div className="text-xs">
                <span className="font-semibold">Tags:</span>{" "}
                {Array.isArray(post.tags)
                  ? post.tags.map((t) => `#${t}`).join(" ")
                  : `#${post.tags}`}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}