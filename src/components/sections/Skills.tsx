import { motion } from "framer-motion"
import { skillGroups } from "../../data/content"
import { Reveal, Stagger, itemVariants } from "../motion/Reveal"

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]">
                <span className="h-px w-6 bg-accent" />
                <span className="text-accent-bright">Skills</span>
                <span aria-hidden className="inline-block h-3.5 w-[2px] animate-pulse rounded-full bg-accent-bright" />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The tools I reach for — and <span className="text-gradient">where they fit</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md font-mono text-xs leading-relaxed text-ink-muted">
              {
                "// no arbitrary percentages — each area is where the work actually happens"
              }
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-line glass p-6 transition-colors hover:border-accent/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: `var(--color-accent)` }}
              />
              <div className="relative flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {group.label}
                </h3>
                <span className="flex items-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="h-1 w-4 rounded-full"
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + i * 0.15 }}
                      style={{ background: "var(--color-accent)" }}
                    />
                  ))}
                </span>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 font-mono text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent-bright hover:shadow-[0_4px_20px_-6px_rgba(124,92,255,0.5)]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-ink-muted">{group.note}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}