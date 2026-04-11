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
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Community"
        title="Social channels — all outbound"
        description="Telegram, WhatsApp, YouTube, and Instagram — each button opens the official channel in a new tab."
        align="center"
      />

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {socialChannels.map((channel, index) => {
          const Icon = socialIcons[channel.icon] ?? FaTelegram
          return (
            <motion.article
              key={channel.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-br ${channel.accent}`}
              />
              <div className="relative flex flex-col gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl text-slate-900 shadow-md dark:bg-slate-950/80 dark:text-white">
                  <Icon aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                    {channel.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{channel.description}</p>
                </div>
                <ExternalLink
                  href={channel.url}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 ${channel.accent}`}
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
