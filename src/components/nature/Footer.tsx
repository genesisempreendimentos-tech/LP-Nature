import { ArrowRight } from "lucide-react"
import NatureLogo from "./NatureLogo"
import { siteData } from "../../data/nature"

const navLinks = [
  { href: "#nature", label: "O Nature" },
  { href: "#plantas", label: "Plantas" },
  { href: "#lazer", label: "Lazer" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.65 1.65 0 1 0 5.1 7.3 1.65 1.65 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.5-.6-2.5-2-2.5-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1.9V20h-2.8s.1-8.8 0-9.7h2.8v1.6c.5-.8 1.5-1.9 3.6-1.9 2.5 0 4.3 1.6 4.3 5.1V20z" />
    </svg>
  )
}

export function Footer() {
  const { footer, contact } = siteData
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              className="brand-link"
              href="#inicio"
              aria-label="Nature Residencial — início"
            >
              <NatureLogo light />
            </a>
            <p>{footer.blurb}</p>
          </div>

          <nav className="footer-col" aria-label="Navegação do rodapé">
            <p className="footer-label">Navegação</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <p className="footer-label">Atendimento</p>
            <ul className="footer-contact">
              <li>
                <span>Telefone</span>
                <a href={`tel:${footer.phone.replace(/\D/g, "")}`}>{footer.phone}</a>
              </li>
              <li>
                <span>WhatsApp</span>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.whatsappLabel}
                </a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${footer.email}`}>{footer.email}</a>
              </li>
              <li>
                <span>Endereço</span>
                <p>{footer.address}</p>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-social">
            <p className="footer-label">Social</p>
            <div className="footer-social-icons">
              <a
                href={footer.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Gênesis Empreendimentos"
              >
                <InstagramIcon />
              </a>
              <a
                href={footer.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Gênesis Empreendimentos"
              >
                <FacebookIcon />
              </a>
              <a
                href={footer.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Gênesis Empreendimentos"
              >
                <LinkedInIcon />
              </a>
            </div>
            <p className="footer-handle">{footer.instagramHandle}</p>
            <a
              className="footer-social-cta"
              href={footer.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Seguir no Instagram <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <a href={footer.privacyHref}>Política de Privacidade</a>
            <span aria-hidden="true"> | </span>
            © {year} desenvolvido por Gênesis Empreendimentos
          </p>
          <p className="footer-disclaimer">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
