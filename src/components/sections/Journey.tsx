import { motion } from "framer-motion"
import { journey, learningPath } from "../../data/content"
import SectionHeading from "../SectionHeading"
import { Reveal } from "../motion/Reveal"

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title={<>A path of <span className="text-gradient">steady building</span>.</>}
          description="From the SSC boards to a B.Tech — and from writing my first programs to designing distributed systems."
          glow
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Timeline */}
          <ol className="relative space-y-10 border-l border-line pl-8">
            <motion.span
              aria-hidden
              className="absolute left-[-1px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-cyan"
            />
            {journey.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[33px] top-1 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-accent bg-void" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-bright">
                  {item.period}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
              </motion.li>
            ))}
          </ol>

          {/* Learning progression */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted">
                Learning trajectory
              </p>
            </Reveal>

            <div className="mt-8 space-y-0">
              {learningPath.map((step, i) => {
                const last = i === learningPath.length - 1
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex flex-col items-center self-stretch">
                      <motion.span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-mono ${
                          last
                            ? "border-accent bg-accent text-white"
                            : "border-line bg-void text-ink-soft"
                        }`}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        {i + 1}
                      </motion.span>
                      {!last && (
                        <span className="w-px flex-1 bg-gradient-to-b from-line to-transparent" />
                      )}
                    </div>
                    <span className={last ? "pb-2 pt-1 font-display text-lg font-semibold text-ink" : "pb-2 pt-1 text-ink-soft"}>
                      {step}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            <Reveal delay={0.2} className="mt-6 pl-10">
              <p className="text-sm leading-relaxed text-ink-muted">
                Each stage built on the last — reading data led to APIs, APIs led to
                full-stack apps, and distributed systems asked new questions I'm still
                exploring.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}