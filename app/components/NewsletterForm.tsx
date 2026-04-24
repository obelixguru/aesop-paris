"use client";

import { useState } from "react";

type NewsletterSource =
  | "footer"
  | "blog_inline"
  | "contact"
  | "popup_exit"
  | "hero";

interface NewsletterFormProps {
  source: NewsletterSource;
  variant?: "dark" | "light";
  className?: string;
}

export default function NewsletterForm({
  source,
  variant = "dark",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error);
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <div className={`${className}`}>
        <div
          className={`flex items-center gap-3 py-3 ${isDark ? "text-aesop-cream" : "text-aesop-earth"}`}
        >
          <svg
            className="w-5 h-5 text-aesop-amber shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          required
          disabled={status === "loading"}
          className={`flex-1 border px-4 py-2 text-sm focus:outline-none transition-colors ${
            isDark
              ? "bg-transparent border-aesop-cream/30 text-aesop-cream placeholder:text-aesop-cream/40 focus:border-aesop-amber"
              : "bg-white border-aesop-earth/20 text-aesop-earth placeholder:text-aesop-earth/40 focus:border-aesop-amber"
          } ${status === "loading" ? "opacity-50" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            isDark
              ? "bg-aesop-amber text-aesop-dark hover:bg-aesop-cream"
              : "bg-aesop-earth text-aesop-cream hover:bg-aesop-dark"
          } ${status === "loading" ? "opacity-50 cursor-wait" : ""}`}
        >
          {status === "loading" ? "..." : "Envoyer"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">{message}</p>
      )}
    </form>
  );
}
