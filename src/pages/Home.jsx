import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiBell,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiClipboard,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiHome,
  FiMonitor,
  FiPlay,
  FiShield,
  FiUsers,
} from 'react-icons/fi'
import { ExternalLink } from '../components/ExternalLink'
import { QuickLinksMarquee } from '../components/QuickLinksMarquee'
// import girlImage from '../assets/girlimage.png'
import nurseHero from '../assets/nurse-hero.png'
import youtubeLiveImage from '../assets/youtubelive.jpeg'
import heroBg from '../assets/hero-bg.jpg'
import { useContent } from '../context/useContent'

const officialIconMap = {
  'official-uhsr': FiHome,
  'official-doh-hr': FiActivity,
  'official-nhm-hr': FiUsers,
  'official-dmer': FiClipboard,
  'official-hnc': FiShield,
}

const classBenefits = [
  'Expert faculty & live sessions',
  'Doubt clearing & interactive learning',
  'Access to study material',
  '100% free for all nursing students',
]

// const howToSteps = [
//   {
//     n: '01',
//     title: 'Check admission',
//     text: 'Start from course-wise admission pages and confirm eligibility.',
//   },
//   {
//     n: '02',
//     title: 'Review academics',
//     text: 'Use papers and practical resources to plan your own study schedule.',
//   },
//   {
//     n: '03',
//     title: 'Track results',
//     text: 'Open course result links and confirm announcements on official portals.',
//   },
//   {
//     n: '04',
//     title: 'Apply for jobs',
//     text: 'Follow the jobs section and apply only on official recruitment websites.',
//   },
// ]

// const whyFeatures = [
//   {
//     icon: FiUsers,
//     title: 'Official links',
//     text: 'Direct access to university, government, and NHM resources for faster information.',
//   },
//   {
//     icon: FiBookOpen,
//     title: 'Course-focused navigation',
//     text: 'Find the right course, admission details and important notices with ease.',
//   },
//   {
//     icon: FiClipboard,
//     title: 'Clear section-wise browsing',
//     text: 'Well-organized sections for quick and simple access to all resources.',
//   },
// ]

const browseTips = [
  {
    icon: FiMonitor,
    title: 'Start with Official pages',
    text: 'Find direct links to all university and government portals.',
  },
  {
    icon: FiBookOpen,
    title: 'Use academics as reference',
    text: 'Access subject-wise exams, syllabus and important study material.',
  },
  {
    icon: FiCheckCircle,
    title: 'Verify before action',
    text: 'Always check official sources and verify information to avoid mistakes.',
  },
  {
    icon: FiBell,
    title: 'Stay updated',
    text: 'Get all latest news, updates and job alerts in real time.',
  },
]

function Wave({ className = '', light = '#ffffff', dark = '#07111f' }) {
  return (
    <>
      <svg
        className={`pointer-events-none absolute left-0 w-full dark:hidden ${className}`}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        height="80"
        aria-hidden
      >
        <path fill={light} d="M0,70 C240,10 480,110 720,60 C960,10 1200,90 1440,40 L1440,90 L0,90 Z" />
      </svg>
      <svg
        className={`pointer-events-none absolute left-0 hidden w-full dark:block ${className}`}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        height="80"
        aria-hidden
      >
        <path fill={dark} d="M0,70 C240,10 480,110 720,60 C960,10 1200,90 1440,40 L1440,90 L0,90 Z" />
      </svg>
    </>
  )
}

function ListLink({ href, to, children }) {
  const className =
    'flex items-start gap-2 py-1.5 text-[0.9rem] leading-snug text-slate-600 transition hover:text-[#1d6fe9] dark:text-zinc-300 dark:hover:text-cyan-300'
  const inner = (
    <>
      <FiCheck className="mt-0.5 shrink-0 text-[#1d6fe9]" aria-hidden />
      <span className="min-w-0 break-words">{children}</span>
    </>
  )
  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    )
  }
  return (
    <ExternalLink href={href} className={className}>
      {inner}
    </ExternalLink>
  )
}

function HubCard({ icon: Icon, iconClass, title, children, to }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex min-h-[340px] flex-col rounded-[16px] border border-transparent bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] xs:min-h-[390px] xs:p-5 dark:border-sky-300/15 dark:bg-slate-900/80"
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-white ${iconClass}`}>
        <Icon className="text-xl" aria-hidden />
      </span>
      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <ul className="thin-scrollbar mt-3 h-52 overflow-x-hidden overflow-y-auto pr-1">{children}</ul>
      <Link to={to} className="nc-btn mt-auto w-full">
        View Details
        <FiArrowRight aria-hidden />
      </Link>
    </motion.article>
  )
}

export default function Home() {
  const { content } = useContent()
  const {
    admissionHomeGroups = [],
    academicsHome = { anmGnm: [], otherResults: [] },
    featuredYoutubeVideos = [],
    jobsHome = [],
    officialPrimarySites = [],
    resultsCourses = [],
    site = {},
  } = content

  const admissionCourses = admissionHomeGroups.flatMap((group) => group.courses || [])
  const liveClass = featuredYoutubeVideos.find((v) => v.isLive) || featuredYoutubeVideos[0]
  const liveUrl = liveClass?.url || 'https://www.youtube.com/@nursingculture/live'

  return (
    <>
      <section className="relative overflow-hidden bg-white pt-[68px] xs:pt-[76px] dark:bg-[#071124]">
        <img
          src={heroBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-[center_30%] dark:brightness-[0.38] dark:saturate-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.96)_42%,rgba(255,255,255,0.55)_68%,rgba(255,255,255,0.2)_100%)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#071124_0%,rgba(7,17,36,0.92)_40%,rgba(7,17,36,0.62)_100%)] dark:block" />

        <div className="nc-container relative grid min-w-0 items-center gap-4 pt-4 pb-[12px] lg:grid-cols-2 lg:gap-6 lg:pt-3 lg:pb-[4px]">
          <div className="max-w-xl min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full bg-[#e8f2ff] px-3.5 py-1 text-[12px] font-semibold text-[#1d6fe9] dark:bg-cyan-400/15 dark:text-cyan-200"
            >
              Your Future in Healthcare Begins Here
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-3 text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-[#123769] xs:text-[1.9rem] sm:text-[2.25rem] lg:text-[2.55rem] dark:text-white"
            >
              Learn, Grow, and Succeed with{' '}
              <span className="text-[#1d6fe9] dark:text-cyan-300">{site.name || 'Nursing Culture'}.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-lg text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-6 dark:text-zinc-300"
            >
              {site.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-4 flex flex-col gap-2.5 xs:flex-row xs:items-center"
            >
              <Link to="/#hub" className="nc-btn w-full xs:w-auto xs:px-5 xs:py-2.5">
                Explore Courses
                <FiArrowRight aria-hidden />
              </Link>
              <Link
                to="/social"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1d6fe9] bg-white px-5 py-2.5 text-sm font-semibold text-[#1d6fe9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e8f2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 dark:border-cyan-300 dark:bg-transparent dark:text-cyan-200 dark:hover:bg-cyan-400/10 xs:w-auto"
              >
                <FiUsers aria-hidden />
                Join Our Community
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="relative mx-auto hidden w-full max-w-[280px] sm:max-w-[320px] lg:block lg:max-w-none lg:self-end"
          >
            <p className="font-script pointer-events-none absolute right-0 top-1 z-10 hidden text-right text-[1.45rem] leading-[1.05] text-[#1d6fe9] sm:block lg:right-2 lg:top-2 lg:text-[1.75rem] dark:text-cyan-300">
              Better
              <br />
              Education
              <br />
              Brighter
              <br />
              Future
              <span className="mt-0.5 block text-xl leading-none">♡</span>
            </p>
            <img
              src={nurseHero}
              alt="Nursing professional"
              className="relative z-1 mx-auto h-auto max-h-[17.5rem] w-full object-contain object-bottom xl:max-h-[20rem]"
              loading="eager"
            />
          </motion.div>
        </div>

        <div className="nc-container relative z-10 pt-3 pb-10 lg:pt-1 lg:pb-12">
          <QuickLinksMarquee />
        </div>
        <Wave className="-bottom-px z-[5]" light="#071b36" dark="#071b36" />
      </section>

      <section id="hub" className="relative scroll-mt-24 overflow-hidden bg-[#071b36] py-16 sm:py-20">
        <div className="nc-container relative">
          <div className="mb-10 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200 xs:text-[11px] xs:tracking-[0.22em]">
                Your Career, Our Support
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Admissions, academics, results, and jobs
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-sky-100/80">
                Get complete support from admission to job placement. We guide you at every step with expert
                advice, resources and real-time updates.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 xs:gap-4">
              {[
                { icon: FiUsers, value: '500+', label: 'Admissions Helped' },
                { icon: FiBriefcase, value: '2000+', label: 'Students Placed' },
                { icon: FiHeart, value: '98%', label: 'Success Rate' },
              ].map((item) => (
                <div key={item.label} className="min-w-0 text-center">
                  <span className="mx-auto mb-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-300/20 text-sky-200 xs:mb-2 xs:h-11 xs:w-11">
                    <item.icon className="text-base xs:text-lg" aria-hidden />
                  </span>
                  <p className="text-lg font-extrabold text-white xs:text-xl sm:text-2xl">{item.value}</p>
                  <p className="mt-1 text-[10px] font-medium leading-snug text-sky-100/80 xs:text-[11px] sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HubCard icon={FiAward} iconClass="bg-violet-500" title="Admissions" to="/admission">
              {admissionCourses.map((course) => (
                <li key={`adm-${course.name}`}>
                  <ListLink href={course.url}>{course.name} admission</ListLink>
                </li>
              ))}
            </HubCard>
            <HubCard icon={FiBookOpen} iconClass="bg-teal-500" title="Academics" to="/resources">
              {(academicsHome.anmGnm || []).map((row) => (
                <li key={row.id}>
                  {row.internal && row.path ? (
                    <ListLink to={row.path}>{row.title}</ListLink>
                  ) : (
                    <ListLink href={row.url}>{row.title}</ListLink>
                  )}
                </li>
              ))}
            </HubCard>
            <HubCard icon={FiFileText} iconClass="bg-sky-500" title="Results" to="/updates">
              {resultsCourses.map((course) => (
                <li key={course.id}>
                  <ListLink href={course.url}>{course.name} result</ListLink>
                </li>
              ))}
            </HubCard>
            <HubCard icon={FiBriefcase} iconClass="bg-[#1d6fe9]" title="Jobs" to="/updates">
              {jobsHome.map((job) => (
                <li key={job.id}>
                  <ListLink href={job.url}>{job.name}</ListLink>
                </li>
              ))}
            </HubCard>
          </div>
        </div>
        <Wave className="-bottom-px" light="#ffffff" dark="#07111f" />
      </section>

      <section id="official" className="relative scroll-mt-24 overflow-hidden bg-white py-14 sm:py-16 dark:bg-[#07111f]">
        <div className="nc-container relative">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Quick Access</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#123769] sm:text-3xl dark:text-white">
              Official links
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-zinc-400">
              University, state health department, and NHM Haryana — get every notice in one place with
              access to all official links.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {officialPrimarySites.map((item, i) => {
              const CardIcon = officialIconMap[item.id] ?? FiGlobe
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <ExternalLink
                    href={item.url}
                    aria-label={`Open ${item.title}`}
                    className="nc-card group relative flex min-h-[190px] flex-col bg-white/90 p-5 pb-14 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,40,80,0.1)] dark:border-sky-300/15 dark:bg-slate-900/70"
                  >
                    <span className="nc-icon">
                      <CardIcon className="text-xl" aria-hidden />
                    </span>
                    <h3 className="mt-4 line-clamp-2 text-[1.05rem] font-bold leading-snug text-[#123769] dark:text-zinc-50">
                      {item.title}
                    </h3>
                    {item.subtitle ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                        {item.subtitle}
                      </p>
                    ) : null}
                    <span className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f2ff] text-[#1d6fe9] transition group-hover:bg-[#1d6fe9] group-hover:text-white dark:bg-sky-500/15 dark:text-cyan-300">
                      <FiArrowRight aria-hidden />
                    </span>
                  </ExternalLink>
                </motion.div>
              )
            })}
          </div>
        </div>
        <Wave className="-bottom-px" light="#eef6ff" dark="#0b1733" />
      </section>

      <section id="classes" className="relative scroll-mt-24 overflow-hidden bg-[#eef6ff] py-14 sm:py-16 dark:bg-[#0b1733]">
        <img
          src={heroBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-[center_35%] dark:brightness-[0.4] dark:saturate-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,246,255,0.82)_0%,rgba(244,247,251,0.74)_48%,rgba(238,246,255,0.88)_100%)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(11,23,51,0.88)_0%,rgba(11,23,51,0.82)_100%)] dark:block" />
        <div className="pointer-events-none absolute -left-24 top-6 h-64 w-64 rounded-full bg-[#9ec5ff]/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-white/45 blur-3xl dark:bg-cyan-400/8" />
        <div className="nc-container relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5b8fd9]">Learn Anytime</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#123769] sm:text-3xl dark:text-white">
              Free Nursing Classes
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Join free live classes and build your future with expert{' '}
              <span className="font-semibold text-slate-800 dark:text-zinc-200">guidance</span>, right from your home.
            </p>
            <ul className="mt-6 space-y-3">
              {classBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-zinc-200">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1d6fe9] text-white">
                    <FiCheck className="text-sm" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ExternalLink href={liveUrl} className="nc-btn mt-8 w-full xs:w-auto">
              Watch Live Classes
              <FiArrowRight aria-hidden />
            </ExternalLink>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ExternalLink
              href={liveUrl}
              className="group relative block overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(15,40,80,0.16)]"
            >
              <img
                src={youtubeLiveImage}
                alt={liveClass?.title || 'Free Nursing Classes'}
                className="h-64 w-full object-cover sm:h-80"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Live
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#123769] text-white shadow-lg transition group-hover:scale-105">
                  <FiPlay className="ml-0.5 text-2xl" aria-hidden />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-900/85 to-transparent px-5 pb-4 pt-16 text-white">
                <span className="block text-sm font-bold">Free Nursing Classes</span>
                <span className="text-xs text-white/80">Join Now • Learn • Grow</span>
              </span>
            </ExternalLink>
          </motion.div>
        </div>
        <Wave className="-bottom-px" light="#ffffff" dark="#07111f" />
      </section>

      {/* Why Choose Us
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 dark:bg-[#07111f]">
        <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-[#e8f2ff] blur-3xl dark:bg-cyan-500/10" />
        <div className="nc-container relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md overflow-hidden">
            <div className="overflow-hidden rounded-[28px] bg-[#eaf4ff] p-3 dark:bg-slate-800/80">
              <img
                src={girlImage}
                alt="Nursing Culture mentor"
                className="h-[320px] w-full object-contain object-bottom xs:h-[380px] sm:h-[420px]"
              />
            </div>
            <p className="font-script pointer-events-none absolute right-2 bottom-8 max-w-[44%] rotate-[-8deg] text-[1.35rem] leading-tight text-[#1d6fe9] xs:right-3 xs:text-[1.65rem] sm:right-4 sm:max-w-none sm:text-[2rem] dark:text-cyan-300">
              Support at
              <br />
              every step
              <span className="mt-1 block text-2xl">♡</span>
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1d6fe9]">Why Choose Us</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#123769] sm:text-3xl dark:text-white">
              Built for nursing learners in Haryana
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              A focused and trusted platform for nursing students in Haryana, providing study resources, career
              support and real-time updates — all in one place.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {whyFeatures.map((item) => (
                <article key={item.title} className="nc-card p-4 dark:border-sky-300/15 dark:bg-slate-900/55">
                  <span className="nc-icon">
                    <item.icon className="text-lg" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#123769] dark:text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-zinc-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* How to use this website
      <section className="bg-[#eef6ff] py-16 sm:py-20 dark:bg-[#0b1733]">
        <div className="nc-container grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5b8fd9]">Get Started</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#123769] sm:text-3xl dark:text-white">
              How to use this website
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Follow these simple steps to make the most of our platform and get the help you need, faster.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {howToSteps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-[16px] border border-transparent bg-white p-5 shadow-[0_10px_30px_rgba(15,40,80,0.05)] dark:border-sky-300/15 dark:bg-slate-900/80"
              >
                {i < howToSteps.length - 1 ? (
                  <FiArrowRight className="absolute -right-3 top-8 hidden text-[#1d6fe9] xl:block" aria-hidden />
                ) : null}
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1d6fe9] text-xs font-bold text-white">
                  {step.n}
                </span>
                <h3 className="mt-3 text-base font-bold text-[#123769] dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      */}

      <section className="bg-white py-16 sm:py-20 dark:bg-[#07111f]">
        <div className="nc-container">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5b8fd9]">Reference guide</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#123769] sm:text-3xl dark:text-white">
            Smart way to browse
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-zinc-400">
            Use this site as a quick reference for admissions, academics, results, and jobs.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {browseTips.map((tip, i) => (
              <motion.article
                key={tip.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="nc-card flex items-start gap-3 p-4 dark:border-sky-300/15 dark:bg-slate-900/55"
              >
                <span className="nc-icon h-10 w-10">
                  <tip.icon className="text-lg" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#123769] dark:text-white">{tip.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-zinc-400">{tip.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
