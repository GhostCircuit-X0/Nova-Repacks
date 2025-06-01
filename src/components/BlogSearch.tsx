import React, { useState, useEffect } from "react";

export default function BlogSearch({ posts }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]); // Show nothing until user types
    } else {
      setResults(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, posts]);

  return (
    <section className="my-8 p-6 border rounded-xl bg-secondary/30">
      <h2 className="text-xl font-semibold mb-4">🔎 Search Blog Posts</h2>
      <input
        type="text"
        className="w-full border rounded-md px-3 py-2 mb-4"
        placeholder="Search blog posts by title or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="space-y-2">
        {query && results.length === 0 && <li>No results found.</li>}
        {results.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="text-primary hover:underline">
              {post.title}
            </a>
            <div className="text-xs text-muted-foreground">{post.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}