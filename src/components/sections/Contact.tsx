import { motion } from "framer-motion"
import { currentFocus, profile } from "../../data/content"
import Magnetic from "../motion/Magnetic"
import BackgroundFX from "../motion/BackgroundFX"
import TiltCard from "../motion/TiltCard"
import { Reveal, Stagger, itemVariants } from "../motion/Reveal"

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-20 px-5 py-24 sm:px-8 md:py-36">
      <BackgroundFX />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]">
            <span className="h-px w-6 bg-accent" />
            <span className="text-accent-bright">Currently exploring</span>
            <span className="h-px w-6 bg-accent" />
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
            Let&apos;s build something{" "}
            <span className="text-gradient-warm">useful.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-8 flex flex-wrap items-center justify-center gap-2.5" stagger={0.05}>
          {currentFocus.map((focus) => (
            <motion.span
              key={focus}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-sm text-ink-soft transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              {focus}
            </motion.span>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-pretty leading-relaxed text-ink-soft">
            If you're working on something worth building — backend systems, full-stack
            products, or an idea with GenAI — I'd like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <TiltCard intensity={4} className="relative">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_50px_-12px_rgba(124,92,255,0.9)] transition-all hover:bg-accent-bright hover:shadow-[0_10px_60px_-12px_rgba(124,92,255,1)]"
                >
                  {profile.email}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
            </TiltCard>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { label: "GitHub", href: profile.links.github },
              { label: "LinkedIn", href: profile.links.linkedin },
              { label: "LeetCode", href: profile.links.leetcode },
              { label: "Resume", href: profile.resume, external: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external || link.label !== "Resume" ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent-bright"
              >
                <span className="h-px w-4 bg-line transition-all group-hover:w-6 group-hover:bg-accent" />
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}