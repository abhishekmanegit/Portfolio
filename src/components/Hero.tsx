import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { profile } from "../data/content"
import { SplitWords } from "./motion/Reveal"
import Magnetic from "./motion/Magnetic"
import BackgroundFX from "./motion/BackgroundFX"
import Typewriter from "./motion/Typewriter"

function Packet({ delay, color = "bg-accent-bright" }: { delay: number; color?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full blur-[1px] ${color}`}
      initial={{ left: "0%" }}
      animate={{ left: "100%" }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: "linear", repeatDelay: 0.3 }}
    />
  )
}

function FlowDiagram() {
  const reduced = useReducedMotion()

  const nodes = [
    { label: "order-service", tag: "POST /orders", broker: false },
    { label: "kafka · order-events", tag: "async broker", broker: true },
    { label: "inventory-service", tag: "reserve stock", broker: false },
    { label: "kafka · inventory-events", tag: "async broker", broker: true },
    { label: "notification-service", tag: "consumes both", broker: false },
  ]

  return (
    <div
      role="img"
      aria-label="Animated diagram of an event-driven order system using Kafka and the SAGA pattern"
      className="relative mx-auto w-full max-w-md"
    >
      <div className="glass-strong relative overflow-hidden rounded-3xl border border-line p-5 font-mono text-[13px] leading-relaxed sm:p-6">
        {/* animated border sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
        />
        {/* ambient corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/20 blur-3xl"
        />

        {/* terminal header */}
        <div className="relative mb-5 flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-status/70" />
            </span>
            <span className="ml-2 text-ink-muted">event-driven · saga</span>
          </div>
          <span className="flex items-center gap-2 text-status">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
            </span>
            live
          </span>
        </div>

        {/* flow */}
        <div className="relative space-y-0.5">
          {nodes.map((node, i) => {
            const isBroker = node.broker
            const last = i === nodes.length - 1
            return (
              <div key={node.label}>
                {isBroker ? (
                  // broker pill with track + travelling packets
                  <div className="relative my-2.5 flex max-w-[88%] items-center justify-center gap-4">
                    <span className="relative h-px flex-1 overflow-visible bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40">
                      {!reduced && <Packet delay={i * 0.75} color="bg-accent-bright" />}
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-cyan">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 10v4M20 10v4M2 12h20M6 9l-2 3 2 3M18 9l2 3-2 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-semibold tracking-tight">{node.label}</span>
                    </span>
                    <span className="relative h-px flex-1 overflow-visible bg-gradient-to-r from-accent/40 to-accent/60">
                      {!reduced && <Packet delay={i * 0.75 + 0.4} color="bg-cyan" />}
                    </span>
                  </div>
                ) : (
                  // service node
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -14 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="relative flex items-center justify-between rounded-xl border border-line bg-white/[0.03] px-4 py-2.5"
                  >
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-semibold text-ink">{node.label}</span>
                    </span>
                    <span className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <span className={reduced ? "" : "animate-pulse"}>{node.tag}</span>
                      <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px]">
                        :{i % 2 === 0 ? 8081 + Math.floor(i / 2) : 9092}
                      </span>
                    </span>
                  </motion.div>
                )}

                {/* down-connector between nodes */}
                {!last && !reduced && (
                  <div className="relative mx-auto h-6 w-px">
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent/30 to-transparent" />
                  </div>
                )}
                {!last && reduced && <div className="mx-auto h-5 w-px bg-line" />}
              </div>
            )
          })}
        </div>

        {/* footer status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-xs text-ink-muted"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>
            saga state machine · <span className="text-accent-bright">retry → DLQ</span> on failure
          </span>
        </motion.div>
      </div>

      {/* floating accent particles */}
      {!reduced && (
        <>
          <motion.span
            aria-hidden
            className="absolute -left-6 top-16 h-2 w-2 rounded-full bg-cyan opacity-70"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute -right-4 top-40 h-2.5 w-2.5 rounded-full bg-accent-bright opacity-70"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute -left-3 bottom-8 h-1.5 w-1.5 rounded-full bg-magenta opacity-70"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])
  const yDiagram = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8">
      <BackgroundFX fixed />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <motion.div style={{ opacity, y: yContent }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
            </span>
            Open to building real things
          </motion.p>

          <h1 className="mt-7 font-display font-bold leading-[0.9] tracking-tight">
            <SplitWords
              as="span"
              text={profile.name.split(" ")[0]}
              className="block text-gradient text-[clamp(3.5rem,15vw,8.5rem)]"
              delay={0.1}
              playOnMount
            />
            <SplitWords
              as="span"
              text={profile.name.split(" ").slice(1).join(" ")}
              className="block text-ink text-[clamp(3.5rem,15vw,8.5rem)]"
              delay={0.18}
              playOnMount
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.3em] text-ink-soft sm:text-base"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
            <Typewriter words={["backend systems", "REST APIs", "distributed systems", "AI applications", "just a tech"]} prefix="/dev/" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink-soft md:text-lg"
          >
            I'm {profile.name} — a Computer Science &amp; Engineering student who builds
            backend systems, full-stack products, and AI-powered applications with Java,
            Spring Boot, React, Python, and SQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(124,92,255,0.4),0_10px_40px_-10px_rgba(124,92,255,0.95)] transition-all hover:scale-[1.03] hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(167,139,250,0.5),0_14px_55px_-12px_rgba(124,92,255,1)]"
              >
                View Projects
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
              >
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-3.5 text-sm font-medium text-ink-soft underline-offset-4 hover:text-accent-bright hover:underline"
              >
                Resume <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yDiagram }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:block"
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  )
}