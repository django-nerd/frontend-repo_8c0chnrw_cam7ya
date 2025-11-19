import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [status, setStatus] = useState({ state: 'idle' })
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

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C]">
      {/* Light grid background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <header className="relative">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded bg-[#EADCC8]" />
              <span className="font-semibold tracking-tight">Donor U</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#program" className="hover:text-[#7DA08A]">Program</a>
              <a href="#plans" className="hover:text-[#7DA08A]">Plans</a>
              <a href="#faq" className="hover:text-[#7DA08A]">FAQ</a>
              <a href="/test" className="hover:text-[#7DA08A]">System</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-8 pb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Build your recurring donor engine—together.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Weekly, human-centered guidance for nonprofits. Drop into the Guide Session, use the playbooks, and grow your monthly donors with clarity and consistency.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="#plans" className="inline-flex items-center rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95">Join the founding cohort</a>
                <a href="#program" className="inline-flex items-center rounded-md px-5 py-3 border border-gray-200 bg-white hover:bg-gray-50">See how it works</a>
              </div>
              <p className="mt-3 text-sm text-gray-500">Founding rates: Core $199/mo • Premium $299/mo</p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl bg-[#FAFAFA] border border-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-sm uppercase tracking-wider text-gray-500">Weekly Guide Session</div>
                  <div className="mt-2 text-2xl font-semibold">Half-day open office hours</div>
                  <div className="mt-2 text-gray-600">Drop in for answers, feedback, and momentum.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program */}
        <section id="program" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: 'Guide Session',
              desc: 'Half-day weekly office hours to implement live with support.'
            }, {
              title: 'Weekly Playbooks',
              desc: 'Scripts, sequences, and assets focused on one action per week.'
            }, {
              title: 'Accountability',
              desc: 'Light check-ins and a simple progress tracker so you keep moving.'
            }].map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-gray-600">{b.desc}</p>
              </div>
            ))}
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
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="text-sm font-medium text-[#7DA08A]">Core</div>
              <div className="mt-2 text-4xl font-semibold">$199<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500">Regular $329</div>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Weekly Guide Session access</li>
                <li>• Weekly playbooks and templates</li>
                <li>• Replays + community Q&A</li>
                <li>• Progress tracker</li>
              </ul>
            </div>
            {/* Premium */}
            <div className="rounded-2xl border-2 border-[#7DA08A] bg-white p-8 shadow-sm">
              <div className="text-sm font-medium text-[#7DA08A]">Premium</div>
              <div className="mt-2 text-4xl font-semibold">$299<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500">Regular $499</div>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Everything in Core</li>
                <li>• Monthly 60-min 1:1 strategy session</li>
                <li>• Priority Q&A in sessions</li>
                <li>• Personalized quarterly plan</li>
              </ul>
            </div>
          </div>

          {/* Application form */}
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-2xl font-semibold">Apply to join</h3>
            <p className="mt-2 text-gray-600">Short form — we’ll follow up with next steps and scheduling.</p>

            <form onSubmit={submit} className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input name="org_name" value={form.org_name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Org size</label>
                <select name="org_size" value={form.org_size} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]">
                  {['solo','1-5','6-20','21-50','51-200','200+'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget range</label>
                <select name="budget_range" value={form.budget_range} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]">
                  {["<250k","250k-500k","500k-1m","1m-5m","5m+"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Top donor goal this quarter</label>
                <input name="top_goal" value={form.top_goal} onChange={handleChange} placeholder="e.g., Add 25 new monthly donors" className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
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
              <div className="flex items-center gap-2">
                <input id="scholarship" type="checkbox" name="scholarship" checked={form.scholarship} onChange={handleChange} className="h-4 w-4 text-[#7DA08A] border-gray-300 rounded" />
                <label htmlFor="scholarship" className="text-sm text-gray-700">Apply for scholarship</label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} className="mt-1 w-full rounded-md border-gray-300 focus:border-[#7DA08A] focus:ring-[#7DA08A]" />
              </div>
              <div className="md:col-span-2">
                <button disabled={status.state==='loading'} className="inline-flex items-center rounded-md bg-[#7DA08A] px-5 py-3 text-white font-medium shadow-sm hover:brightness-95 disabled:opacity-60">
                  {status.state==='loading' ? 'Submitting…' : 'Submit application'}
                </button>
              </div>
            </form>

            {status.state==='success' && (
              <div className="mt-4 rounded-md bg-[#ECEFF3] p-4 text-sm">Thanks! Your application was received. Ref: {status.id}</div>
            )}
            {status.state==='error' && (
              <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">Something went wrong: {status.message}</div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[{
              q: 'How much time should I plan each week?',
              a: 'Plan 1–3 hours. Drop into the weekly Guide Session as needed and ship the weekly playbook action.'
            },{
              q: 'When do we start?',
              a: 'Rolling admission with monthly onboarding. New playbooks release Mondays; Guide Session runs on a fixed weekday half-day.'
            },{
              q: 'Can I cancel any time?',
              a: 'Yes. Monthly plans can cancel any time; annual plans are discounted for commitment and non-refundable after 14 days.'
            },{
              q: 'Is there a scholarship?',
              a: 'Yes for orgs under $500k annual budget. Check the box and we’ll follow up.'
            }].map(item => (
              <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="font-medium">{item.q}</div>
                <div className="mt-2 text-gray-600">{item.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Donor U</div>
          <a href="#plans" className="text-[#7DA08A]">Apply now</a>
        </div>
      </footer>
    </div>
  )
}

export default App
