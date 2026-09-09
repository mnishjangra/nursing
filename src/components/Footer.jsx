import { Link } from 'react-router-dom'
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { useContent } from '../context/useContent'
import logoOfficialDark from '../assets/logo_official_d.png'

const socialIconMap = {
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  instagram: FaInstagram,
}

const quickLinks = [
  { to: '/admission', label: 'Admissions' },
  { to: '/updates', label: 'Updates' },
  { to: '/social', label: 'Social' },
  { to: '/about', label: 'About' },
]

export function Footer() {
  const { content } = useContent()
  const site = content.site || {}
  const socialChannels = content.socialChannels || []

  return (
    <footer id="contact" className="bg-[#071b36] text-slate-200">
      <div className="nc-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logoOfficialDark}
            width={112}
            height={112}
            alt={site.name || 'Nursing Culture'}
            className="h-24 w-24 object-contain sm:h-28 sm:w-28"
          />
          <p className="mt-4 text-sm font-medium tracking-wide text-white">Learn • Grow • Succeed</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            {quickLinks.map((item) => (
              <Link key={item.to} className="text-slate-300 transition hover:text-white" to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Important</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Always verify dates, fees, and eligibility from official government or university notifications
            before applying.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Get in Touch</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {socialChannels.map((ch) => {
              const Icon = socialIconMap[ch.icon] ?? FaTelegram
              return (
                <a
                  key={ch.id}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ch.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#4da3ff] text-white transition hover:bg-[#1d6fe9]"
                >
                  <Icon className="text-base" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="nc-container py-5 text-center text-[11px] leading-relaxed text-slate-400 xs:text-xs">
          © {new Date().getFullYear()} {site.name || 'Nursing Culture'}. All rights reserved.
          <span className="hidden xs:inline"> | Best viewed on modern browsers</span>
        </p>
      </div>
    </footer>
  )
}
