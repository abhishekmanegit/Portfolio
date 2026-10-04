import SectionHeading from "./SectionHeading"
import { Reveal, Stagger, itemVariants } from "./motion/Reveal"
import CountUp from "./motion/CountUp"
import { motion, useReducedMotion } from "framer-motion"

const interests = [
  "backend development",
  "REST APIs",
  "distributed systems",
  "AI / GenAI",
  "full-stack development",
  "SQL & data",
  "system design",
  "problem solving",
]

const stats = [
  { to: 6, suffix: "+", label: "projects shipped" },
  { to: 10, suffix: "+", label: "tech tools used" },
  { to: 3, suffix: "+", label: "years coding" },
  { to: 500, suffix: "+", label: "problems solved" },
]

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:px-8 md:py-28">
      {/* floating neon orbs */}
      {!reduce && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-24 h-52 w-52 rounded-full bg-cyan/10 blur-3xl animate-float"
            style={{ animationDelay: "1.4s" }}
          />
        </>
      )}

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Curious how systems actually work."
            glow
            description="I'm a CSE student who likes building practical software and understanding how the pieces fit together — the service behind the API, the event that keeps two systems in sync, the decision the data suggests."
          />

          <div className="mt-8 space-y-4 text-pretty text-base leading-relaxed text-ink-soft">
            <Reveal delay={0.1}>
              <p>
                My projects span a Kafka-based microservices order system, an AI chatbot
                deployed for real students, a full-stack collaboration platform, a shipped
                customer website, and a machine-learning project that ends in a business
                decision rather than just an accuracy score.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                I'm drawn to the backend — the part you can't screenshot but can trust.
                I'm honest about what I know and deliberate about what I build next.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.08}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-line glass px-4 py-4 text-center"
              >
                <p className="font-display text-3xl font-semibold text-gradient">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-ink-muted">{stat.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal delay={0.05}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted">
              I care about
            </p>
          </Reveal>
          <Stagger className="mt-5 flex flex-wrap gap-2.5">
            {interests.map((item) => (
              <motion.span
                key={item}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.05, borderColor: "var(--color-accent)" }}
                className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink-soft transition-colors hover:text-accent-bright"
              >
                {item}
              </motion.span>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}