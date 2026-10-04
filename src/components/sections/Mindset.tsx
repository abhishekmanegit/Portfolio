import { motion } from "framer-motion"
import { mindset } from "../../data/content"
import SectionHeading from "../SectionHeading"
import { Stagger, itemVariants } from "../motion/Reveal"

const tags = ["event-driven", "churn · from data", "clean APIs", "design for failure", "right tool", "learn by shipping"]

export default function Mindset() {
  return (
    <section className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How I build"
            title={<>A few <span className="text-gradient">principles</span> I try to honor.</>}
            glow
            description="Not slogans — these are the instincts behind the actual projects: the order system, DevCollab, and the churn analysis."
          />
        </div>

        <Stagger className="space-y-4" stagger={0.08}>
          {mindset.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="group relative overflow-hidden rounded-2xl border border-line glass p-6 transition-colors hover:border-accent/40"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 -translate-x-full bg-gradient-to-b from-accent to-cyan transition-transform duration-300 group-hover:translate-x-0" />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  <span className="mr-3 font-mono text-accent-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-widest text-ink-muted sm:inline">
                  {tags[i]}
                </span>
              </div>
              <p className="mt-3 text-pretty leading-relaxed text-ink-soft">{item.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}