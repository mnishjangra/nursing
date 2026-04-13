import { motion } from 'framer-motion'
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { SectionHeading } from '../components/SectionHeading'
import { ExternalLink } from '../components/ExternalLink'
import { socialChannels } from '../data/links'

const socialIcons = {
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  instagram: FaInstagram,
}

export default function Social() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Community"
        title="Social channels — all outbound"
        description="Telegram, WhatsApp, YouTube, and Instagram — each button opens the official channel in a new tab."
      />

      <div className="mt-2 grid gap-4 md:grid-cols-2">
        {socialChannels.map((channel, index) => {
          const Icon = socialIcons[channel.icon] ?? FaTelegram
          return (
            <motion.article
              key={channel.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="premium-card premium-glow-hover relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-30 blur-[1px] bg-gradient-to-br ${channel.accent}`}
              />
              <div className="relative flex flex-col gap-3">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl text-slate-900 shadow-md dark:bg-zinc-950/90 dark:text-white">
                  <Icon aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">
                    {channel.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                    {channel.description}
                  </p>
                </div>
                <ExternalLink
                  href={channel.url}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:brightness-110 hover:shadow-[0_0_22px_rgba(59,130,246,0.35)] ${channel.accent}`}
                >
                  Visit channel
                  <FiExternalLink aria-hidden />
                </ExternalLink>
              </div>
            </motion.article>
          )
        })}
      </div>
    </main>
  )
}
