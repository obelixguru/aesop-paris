"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-aesop-amber/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-sm text-aesop-dark/80">{question}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={`text-aesop-dark/40 transition-transform shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 5l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-sm text-aesop-dark/60 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

const faqs = [
  {
    question: "Proposez-vous la livraison en France métropolitaine ?",
    answer:
      "Nous livrons dans toute la France métropolitaine sous 3 à 5 jours ouvrés. La livraison est offerte à partir de 75€ d'achat.",
  },
  {
    question: "Quelle est votre politique de retours ?",
    answer:
      "Vous disposez de 30 jours après réception pour retourner un produit non ouvert. Les retours sont gratuits en boutique au Bon Marché.",
  },
  {
    question: "Puis-je réserver une consultation personnalisée ?",
    answer:
      "Nos consultants vous accueillent sans rendez-vous au Bon Marché. Pour une consultation approfondie, contactez-nous via le formulaire ci-dessus ou par WhatsApp.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 md:pt-16 md:pb-12">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-aesop-earth">
            Rencontrons-nous.
          </h1>
          <p className="mt-3 text-sm text-aesop-dark/60 max-w-md leading-relaxed">
            Nos consultants vous reçoivent au Bon Marché Rive Gauche pour une
            prescription sur mesure.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left — Contact info */}
          <div>
            {/* Store details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium tracking-wide text-aesop-earth">
                  Boutique Paris
                </h2>
                <address className="mt-3 not-italic text-sm text-aesop-dark/70 leading-relaxed">
                  Le Bon Marché Rive Gauche
                  <br />
                  24 Rue de Sèvres, Ground Floor
                  <br />
                  75007 Paris, France
                </address>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-wide text-aesop-earth">
                  Horaires d&apos;ouverture
                </h2>
                <div className="mt-3 text-sm text-aesop-dark/70 space-y-1">
                  <p>Lundi — Samedi : 10h00 – 20h00</p>
                  <p>Dimanche : 11h00 – 19h00</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+33142220000"
                  className="inline-flex items-center gap-2 text-sm text-aesop-earth hover:text-aesop-dark transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M6 3l-2-1H2a1 1 0 0 0-1 1c0 6 5 11 11 11a1 1 0 0 0 1-1v-2l-1-2-2 1a8 8 0 0 1-4-4l1-2z" />
                  </svg>
                  +33 1 42 22 00 00
                </a>

                <a
                  href="https://wa.me/33142220000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-aesop-earth hover:text-aesop-dark transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="opacity-70"
                  >
                    <path d="M8 1C4.13 1 1 4.13 1 8c0 1.24.33 2.41.9 3.43L1 15l3.67-.9C5.65 14.67 6.8 15 8 15c3.87 0 7-3.13 7-7s-3.13-7-7-7zm3.47 9.73c-.15.42-.87.8-1.2.85-.33.05-.63.18-2.07-.43s-2.37-1.93-2.44-2.02c-.07-.09-.58-.77-.58-1.47s.37-1.04.5-1.18c.13-.14.28-.18.38-.18h.27c.09 0 .21-.03.33.25.12.28.41.99.44 1.06.04.07.06.16.01.25-.05.1-.07.15-.14.24-.07.08-.15.18-.21.24-.07.07-.14.15-.06.29.08.14.36.6.78 .97.54.48.99.63 1.13.7.14.07.22.06.3-.04.08-.09.35-.41.45-.55.09-.14.18-.12.31-.07.13.05.81.38.95.45.14.07.23.1.27.16.03.06.03.35-.12.77z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Map link */}
              <a
                href="https://maps.google.com/?q=Le+Bon+March%C3%A9+24+Rue+de+S%C3%A8vres+75007+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 border border-aesop-earth text-aesop-earth text-sm tracking-wide hover:bg-aesop-earth hover:text-aesop-cream transition-colors"
              >
                Itinéraire
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-aesop-earth/10 flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-aesop-earth"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-aesop-earth">
                  Message transmis.
                </p>
                <p className="mt-2 text-sm text-aesop-dark/60">
                  Notre comptoir parisien vous répondra sous 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-aesop-earth mb-2"
                  >
                    Votre adresse email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nom@exemple.com"
                    className="w-full border border-aesop-amber/40 bg-transparent px-4 py-3 text-sm text-aesop-dark placeholder:text-aesop-dark/30 focus:outline-none focus:border-aesop-earth transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-aesop-earth mb-2"
                  >
                    Comment pouvons-nous vous aider
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full border border-aesop-amber/40 bg-transparent px-4 py-3 text-sm text-aesop-dark focus:outline-none focus:border-aesop-earth transition-colors appearance-none"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="conseil">Conseil personnalisé</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="presse">Presse et partenariats</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-aesop-earth mb-2"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-aesop-amber/40 bg-transparent px-4 py-3 text-sm text-aesop-dark placeholder:text-aesop-dark/30 focus:outline-none focus:border-aesop-earth transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-aesop-earth text-aesop-cream text-sm tracking-wide hover:bg-aesop-dark transition-colors"
                >
                  Envoyer
                </button>
              </form>
            )}

            {/* Mini FAQ */}
            <div className="mt-12 border-t border-aesop-amber/20 pt-8">
              <h3 className="text-sm font-medium tracking-wide text-aesop-earth mb-4">
                Questions fréquentes
              </h3>
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
