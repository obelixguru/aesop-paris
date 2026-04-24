import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-aesop-dark text-aesop-cream/80 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-aesop-amber mb-6">
              Explorer
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/produits" className="text-sm hover:text-aesop-cream transition-colors">
                Soins
              </Link>
              <Link href="/a-propos" className="text-sm hover:text-aesop-cream transition-colors">
                Notre histoire
              </Link>
              <Link href="/blog" className="text-sm hover:text-aesop-cream transition-colors">
                Le Journal
              </Link>
              <Link href="/contact" className="text-sm hover:text-aesop-cream transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-aesop-amber mb-6">
              Boutique Paris
            </h3>
            <address className="not-italic text-sm leading-relaxed">
              Le Bon Marché Rive Gauche
              <br />
              24 Rue de Sèvres, Ground Floor
              <br />
              75007 Paris, France
            </address>
            <a
              href="tel:+33142220000"
              className="inline-block mt-4 text-sm hover:text-aesop-cream transition-colors"
            >
              +33 1 42 22 00 00
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-aesop-amber mb-6">
              Rester informé
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              Recevez nos routines et conseils de soins.
            </p>
            <NewsletterForm source="footer" variant="dark" />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-aesop-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-aesop-cream/50">
            &copy; {new Date().getFullYear()} Aesop. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-aesop-cream/50">
            <Link href="/mentions-legales" className="hover:text-aesop-cream/80 transition-colors">
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-aesop-cream/80 transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
