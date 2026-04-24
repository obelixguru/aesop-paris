"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "loading" | "confirmed" | "already" | "error"
  >("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/newsletter?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "confirmed") setStatus("confirmed");
        else if (data.status === "already_confirmed") setStatus("already");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="max-w-md text-center">
      {status === "loading" && (
        <>
          <div className="w-8 h-8 border-2 border-aesop-amber border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-aesop-earth/60">Confirmation en cours...</p>
        </>
      )}

      {status === "confirmed" && (
        <>
          <svg
            className="w-12 h-12 text-aesop-amber mx-auto mb-6"
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
          <h1 className="text-2xl font-light text-aesop-earth mb-4">
            Inscription confirmée
          </h1>
          <p className="text-aesop-earth/70 mb-8 leading-relaxed">
            Vous recevrez nos routines et conseils de soins directement dans
            votre boîte de réception.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-aesop-earth text-aesop-cream text-sm font-medium hover:bg-aesop-dark transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </>
      )}

      {status === "already" && (
        <>
          <h1 className="text-2xl font-light text-aesop-earth mb-4">
            Déjà confirmé
          </h1>
          <p className="text-aesop-earth/70 mb-8 leading-relaxed">
            Votre adresse est déjà inscrite à notre newsletter.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-aesop-earth text-aesop-cream text-sm font-medium hover:bg-aesop-dark transition-colors"
          >
            Lire le Journal
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-light text-aesop-earth mb-4">
            Lien invalide
          </h1>
          <p className="text-aesop-earth/70 mb-8 leading-relaxed">
            Ce lien de confirmation est expiré ou invalide. Veuillez vous
            inscrire à nouveau.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-aesop-earth text-aesop-cream text-sm font-medium hover:bg-aesop-dark transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </>
      )}
    </div>
  );
}

export default function ConfirmNewsletter() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <Suspense
        fallback={
          <div className="max-w-md text-center">
            <div className="w-8 h-8 border-2 border-aesop-amber border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-aesop-earth/60">Chargement...</p>
          </div>
        }
      >
        <ConfirmContent />
      </Suspense>
    </main>
  );
}
