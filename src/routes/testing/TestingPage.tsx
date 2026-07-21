import React from "react";

/**
 * Standalone marketing landing page used as a test bed for Relevic
 * personalization. Not linked from the site — reachable only at /testing.
 *
 * Key elements carry stable `id`s so the personalization engine can target
 * them reliably (e.g. swap the headline, subhead, or CTA copy per audience).
 */
function TestingPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a id="brand-logo" href="/testing" className="text-lg font-bold tracking-tight">
            Acme<span className="text-indigo-600">.</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#testimonial" className="hover:text-slate-900">Customers</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
          </nav>
          <a
            id="nav-cta"
            href="#cta"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Get started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p
            id="hero-eyebrow"
            className="mb-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600"
          >
            Now in early access
          </p>
          <h1
            id="hero-headline"
            className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
          >
            Turn every visitor into the right experience
          </h1>
          <p
            id="hero-subhead"
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600"
          >
            Deliver personalized messaging, offers, and journeys in real time —
            without waiting on engineering. Launch, test, and learn in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              id="hero-cta-primary"
              href="#cta"
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-500 sm:w-auto"
            >
              Start free trial
            </a>
            <a
              id="hero-cta-secondary"
              href="#features"
              className="w-full rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              See how it works
            </a>
          </div>
          <p id="hero-social-proof" className="mt-6 text-sm text-slate-500">
            Trusted by 2,000+ growth teams · No credit card required
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
          {[
            { stat: "38%", label: "average lift in conversion" },
            { stat: "5 min", label: "to launch your first campaign" },
            { stat: "0", label: "engineering tickets required" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600">{item.stat}</div>
              <div className="mt-2 text-sm font-medium text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-headline" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to personalize at scale
          </h2>
          <p className="mt-4 text-slate-600">
            A complete toolkit to target, test, and optimize every touchpoint.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Audience targeting",
              body: "Build segments from behavior, traits, and real-time signals — no data pipeline required.",
            },
            {
              title: "Visual editor",
              body: "Change any headline, image, or CTA on your live site with a point-and-click editor.",
            },
            {
              title: "A/B experiments",
              body: "Ship variants, split traffic, and let statistical significance pick the winner automatically.",
            },
            {
              title: "Real-time delivery",
              body: "Sub-50ms personalization with anti-flicker so visitors never see a flash of default content.",
            },
            {
              title: "Analytics built in",
              body: "Track lift, conversion, and revenue per variant in one dashboard, updated live.",
            },
            {
              title: "Developer friendly",
              body: "Drop in one script tag, or reach deeper with a fully typed API and webhooks.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <div className="h-5 w-5 rounded-md bg-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="border-y border-slate-100 bg-slate-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <blockquote id="testimonial-quote" className="text-2xl font-medium leading-relaxed sm:text-3xl">
            “We replaced three tools and a quarter of manual work with one script
            tag. Our onboarding conversion jumped 40% in the first month.”
          </blockquote>
          <div className="mt-8 text-sm text-slate-300">
            <span id="testimonial-author" className="font-semibold text-white">Jordan Lee</span>
            {" · "}Head of Growth, Northwind
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-indigo-600 px-8 py-16 text-center text-white">
          <h2 id="cta-headline" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to give every visitor their best experience?
          </h2>
          <p id="cta-subhead" className="mx-auto mt-4 max-w-xl text-indigo-100">
            Start free and launch your first personalized campaign today.
          </p>
          <a
            id="cta-button"
            href="#"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Start your free trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-slate-500 sm:flex-row">
          <span>© 2026 Acme, Inc. All rights reserved.</span>
          <span className="text-xs uppercase tracking-widest text-slate-400">
            Personalization test page
          </span>
        </div>
      </footer>
    </div>
  );
}

export default TestingPage;
