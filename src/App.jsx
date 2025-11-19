import { useState } from 'react'
import { motion } from 'framer-motion'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } })
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

function App() {
  const [status, setStatus] = useState({ state: 'idle' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    org_name: '',
    org_size: '1-5',
    budget_range: '250k-500k',
    top_goal: '',
    tier: 'core',
    billing: 'monthly',
    scholarship: false,
    notes: '',
    source: 'website'
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading' })
    try {
      const res = await fetch(`${backend}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setStatus({ state: 'success', id: data.id })
      setForm({
        name: '', email: '', org_name: '', org_size: '1-5', budget_range: '250k-500k', top_goal: '',
        tier: 'core', billing: 'monthly', scholarship: false, notes: '', source: 'website'
      })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const impactLogos = [
    {
      src: 'https://images.squarespace-cdn.com/content/v1/58a71e5b9de4bb34adca46e6/1702957161144-GE9YTLXV2NAUG2L90TIH/logo_secondary_01.jpg',
      alt: 'Logo 1'
    },
    {
      src: 'https://anamcara.com/wp-content/uploads/2023/08/ac_logo_x2.png',
      alt: 'Anam Cara'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJt1o0yxQ2pZjCo5pylb3sMMOp3fNG9yDsLA&s',
      alt: 'Partner 3'
    },
    {
      src: 'https://cdn.prod.website-files.com/60fb35fbd77b9d17584cbb41/62aa35c381b0080ccdd7096d_SRM%20Primary%20Color%20Block.png',
      alt: 'SRM'
    },
    {
      src: 'https://cdn.prod.website-files.com/5f6b9a421d5a61e1d0cd9e3d/5f8e6e7a4f8f2d093d459e72_59ef51429ed48b0001c2e4ed_Church_Community_Builder_Secondary_Logo_print.png',
      alt: 'CCB'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      alt: 'Placeholder'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C]">
      {/* Subtle animated grid background */}
      <motion.div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <header className="relative">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded bg-[#EADCC8]" />
              <span className="font-semibold tracking-tight">Donor U</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#program" className="hover:text-[#7DA08A]">Program</a>
              <a href="#impact" className="hover:text-[#7DA08A]">Impact</a>
              <a href="#proof" className="hover:text-[#7DA08A]">Authority</a>
              <a href="#video" className="hover:text-[#7DA08A]">Video</a>
              <a href="#plans" className="hover:text-[#7DA08A]">Plans</a>
              <a href="/test" className="hover:text-[#7DA08A]">System</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero with photography */}
        <section className="mx-auto max-w-6xl px-6 pt-4 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView={(i) => fadeUp.show(0)}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Build your recurring donor engine—together.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Weekly, human-centered guidance for nonprofits. Drop into the Guide Session, use the playbooks, and grow your monthly donors with clarity and consistency.
              </p>
              <div className="mt-6 flex gap-4">
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95">Apply in 30 seconds</button>
                <a href="#video" className="inline-flex items-center rounded-md px-5 py-3 border border-gray-200 bg-white hover:bg-gray-50">Watch overview</a>
              </div>
              <p className="mt-3 text-sm text-gray-500">Founding rates: Core $199/mo • Premium $299/mo</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                className="aspect-video overflow-hidden rounded-xl border border-gray-200"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1520975922203-b6f8ca3ae5a0?q=80&w=1600&auto=format&fit=crop"
                  alt="Nonprofit team collaborating"
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <a href="#video" className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm shadow hover:bg-white">
                <span className="inline-block h-2 w-2 rounded-full bg-[#7DA08A]"></span>
                Watch the 90‑second tour
              </a>
            </motion.div>
          </div>
        </section>

        {/* Impact logos */}
        <section id="impact" className="mx-auto max-w-6xl px-6 pb-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white/70 p-5"
          >
            <div className="text-xs uppercase tracking-wider text-gray-500 text-center">Trusted by teams focused on monthly giving</div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
              {impactLogos.map((logo, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="flex items-center justify-center rounded-md bg-gray-50 px-3 py-2 border border-gray-100">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 sm:h-10 w-auto object-contain filter grayscale contrast-125 brightness-90 opacity-80"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Program */}
        <section id="program" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Guide Session',
                desc: 'Half-day weekly office hours to implement live with support.'
              },
              {
                title: 'Weekly Playbooks',
                desc: 'Scripts, sequences, and assets focused on one action per week.'
              },
              {
                title: 'Accountability',
                desc: 'Light check-ins and a simple progress tracker so you keep moving.'
              }
            ].map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView={(i) => fadeUp.show(i)}
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-gray-600">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Authority / Testimonials */}
        <section id="proof" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold">What leaders say</h2>
            <p className="mt-2 text-gray-600">Real teams doing real donor work — and seeing momentum.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'We added 42 new monthly donors in eight weeks. The weekly cadence kept us shipping.',
                name: 'Jordan C.',
                role: 'Development Director, Arts Org',
                img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
              },
              {
                quote: 'The playbooks are gold — practical scripts we could use the same day.',
                name: 'Amara T.',
                role: 'Executive Director, Youth Services',
                img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop'
              },
              {
                quote: 'Office hours felt like having a coach on our team. We finally have a plan we trust.',
                name: 'Luis R.',
                role: 'Founder, Community Kitchen',
                img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop'
              }
            ].map((t, i) => (
              <motion.div
                key={t.name}
                className="rounded-2xl border border-gray-200 bg-white p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">“{t.quote}”</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Video section */}
        <section id="video" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView={(i) => fadeUp.show(0)}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h2 className="text-3xl font-semibold">See how Donor U works</h2>
              <p className="mt-3 text-gray-600">A quick tour of the weekly rhythm, the playbooks, and how Premium adds 1:1 strategy each month.</p>
              <div className="mt-6">
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95">Get started</button>
              </div>
            </motion.div>
            <motion.div
              className="aspect-video overflow-hidden rounded-xl border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Donor U Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">Choose your plan</h2>
            <p className="mt-2 text-gray-600">Founding launch pricing. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Core */}
            <motion.div
              className="rounded-2xl border border-gray-200 bg-white p-8"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="text-sm font-medium text-[#7DA08A]">Core</div>
              <div className="mt-2 text-4xl font-semibold">$199<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500">Regular $329</div>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Weekly Guide Session access</li>
                <li>• Weekly playbooks and templates</li>
                <li>• Replays + community Q&A</li>
                <li>• Progress tracker</li>
              </ul>
              <button onClick={() => { setForm(f => ({ ...f, tier: 'core' })); setIsModalOpen(true) }} className="mt-6 w-full rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95">Apply for Core</button>
            </motion.div>
            {/* Premium */}
            <motion.div
              className="rounded-2xl border-2 border-[#7DA08A] bg-white p-8 shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="text-sm font-medium text-[#7DA08A]">Premium</div>
              <div className="mt-2 text-4xl font-semibold">$299<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500">Regular $499</div>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Everything in Core</li>
                <li>• Monthly 60-min 1:1 strategy session</li>
                <li>• Priority Q&A in sessions</li>
                <li>• Personalized quarterly plan</li>
              </ul>
              <button onClick={() => { setForm(f => ({ ...f, tier: 'premium' })); setIsModalOpen(true) }} className="mt-6 w-full rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95">Apply for Premium</button>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'How much time should I plan each week?',
                a: 'Plan 1–3 hours. Drop into the weekly Guide Session as needed and ship the weekly playbook action.'
              },
              {
                q: 'When do we start?',
                a: 'Rolling admission with monthly onboarding. New playbooks release Mondays; Guide Session runs on a fixed weekday half-day.'
              },
              {
                q: 'Can I cancel any time?',
                a: 'Yes. Monthly plans can cancel any time; annual plans are discounted for commitment and non-refundable after 14 days.'
              },
              {
                q: 'Is there a scholarship?',
                a: 'Yes for orgs under $500k annual budget. Check the box in the extended form after applying and we’ll follow up.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.q}
                className="rounded-xl border border-gray-200 bg-white p-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <div className="font-medium">{item.q}</div>
                <div className="mt-2 text-gray-600">{item.a}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Resources Footer */}
      <footer id="resources" className="border-t border-gray-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-10 flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-[#EADCC8]" />
              <div>
                <div className="font-semibold">Donor U</div>
                <p className="text-sm text-gray-600 max-w-sm">Resources to help nonprofits build durable recurring donor programs with clarity, cadence, and care.</p>
              </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="hidden md:inline-flex items-center rounded-md bg-[#7DA08A] px-4 py-2 text-white text-sm font-medium shadow-sm hover:brightness-95">Apply now</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Guides</div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">Monthly Donor Fundamentals</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Email Sequences That Convert</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Year-Round Stewardship</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">One-Time → Recurring Upgrade Plays</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Board Buy-In for MRR</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Playbooks</div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">30-Day Launch Sprint</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">6-Email Winback Sequence</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Landing Page Optimization</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Community Ambassador Kit</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Recurring Donor KPIs</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Case Studies</div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">Arts Org: 42 New MRR in 8 Weeks</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Youth Services: Upgrades at Scale</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Community Kitchen: From Chaos to Cadence</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Animal Rescue: Stewardship That Sticks</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Webinars & Replays</div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">How to Start a Monthly Program</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Upgrading One-Time Donors</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Copy Clinic: Donation Pages</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Quarterly Planning Workshop</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Templates & Downloads</div>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">Donor Journey Map (PDF)</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Monthly Giving Calculator (Sheet)</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Email Sequence Scripts (Doc)</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Board Slides (PPT)</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Policy Templates (DOC)</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <div className="text-sm font-medium">Subscribe for weekly playbooks</div>
              <p className="mt-1 text-sm text-gray-600">One focused action each week to grow recurring donors.</p>
              <form onSubmit={(e)=>e.preventDefault()} className="mt-3 flex gap-2">
                <input type="email" placeholder="you@org.org" className="w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
                <button className="shrink-0 rounded-md bg-[#7DA08A] px-4 py-2 text-white text-sm font-medium hover:brightness-95">Join</button>
              </form>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <div className="text-sm font-medium">Featured long-form</div>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li><a className="hover:text-[#7DA08A]" href="#">The Monthly Giving Operating System</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Designing a Stewardship Rhythm Your Team Can Keep</a></li>
                <li><a className="hover:text-[#7DA08A]" href="#">Copy Tactics That Move Donors Without Manipulation</a></li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <div className="text-sm font-medium">Download: Starter Kit</div>
              <p className="mt-1 text-sm text-gray-600">A bundle of scripts, templates, and a dashboard to kickstart your program.</p>
              <a href="#" className="mt-3 inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50">Get the ZIP</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Donor U</span>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-[#7DA08A]">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:text-[#7DA08A]">Terms</a>
              <span>·</span>
              <a href="#" className="hover:text-[#7DA08A]">Contact</a>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="text-[#7DA08A]">Apply now</button>
          </div>
        </div>
      </footer>

      {/* Modal: streamlined capture form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setIsModalOpen(false); setStatus({ state: 'idle' }) }}></div>
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Apply to join Donor U</h3>
                <p className="mt-1 text-sm text-gray-600">Short form — we’ll follow up with next steps and scheduling.</p>
              </div>
              <button onClick={() => { setIsModalOpen(false); setStatus({ state: 'idle' }) }} className="-mr-2 rounded p-2 text-gray-500 hover:bg-gray-50">✕</button>
            </div>

            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input name="org_name" value={form.org_name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan</label>
                  <select name="tier" value={form.tier} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]">
                    <option value="core">Core — $199/mo</option>
                    <option value="premium">Premium — $299/mo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Billing</label>
                  <select name="billing" value={form.billing} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]">
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Top donor goal (optional)</label>
                <input name="top_goal" value={form.top_goal} onChange={handleChange} placeholder="e.g., Add 25 new monthly donors" className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <button disabled={status.state==='loading'} className="w-full inline-flex items-center justify-center rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95 disabled:opacity-60">
                {status.state==='loading' ? 'Submitting…' : 'Submit application'}
              </button>
              {status.state==='success' && (
                <div className="rounded-md bg-[#ECEFF3] p-3 text-sm">Thanks! Your application was received. Ref: {status.id}</div>
              )}
              {status.state==='error' && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">Something went wrong: {status.message}</div>
              )}
              <p className="text-xs text-gray-500">Need scholarship consideration? Mention it in your follow-up and we’ll apply the policy for orgs under $500k.</p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default App
