import { motion, useReducedMotion } from "framer-motion"
import type { Project } from "../data/content"
import TiltCard from "./motion/TiltCard"

type SignatureCardProps = {
  project: Project
  onOpen: (project: Project) => void
}

const stateLabels: Record<string, string> = {
  "Order Service": "SAGA · init",
  "Inventory Service": "reserve stock",
  "Notification Service": "consumes both",
}

function Packet({ delay, className = "bg-accent-bright" }: { delay: number; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full blur-[1px] ${className}`}
      initial={{ left: "0%" }}
      animate={{ left: "100%" }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
    />
  )
}

export default function SignatureCard({ project, onOpen }: SignatureCardProps) {
  const reduce = useReducedMotion()
  const accent = project.accent || "#e3541e"

  const isBroker = (label: string) => label.startsWith("Kafka")
  const nodes = project.architecture?.nodes ?? []

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} project details`}
        className="relative block w-full overflow-hidden rounded-3xl text-left"
      >
        <TiltCard
          className="relative overflow-hidden rounded-3xl border border-line glass"
          intensity={3}
        >
          {/* gradient top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
          />

          {/* ambient running glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `linear-gradient(120deg, ${accent}0a, transparent 35%, ${accent}14 100%)`,
            }}
          />
          {/* hover glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 120% at 50% 0%, ${accent}2b, transparent 62%)`,
              boxShadow: `0 30px 80px -34px ${accent}cc`,
            }}
          />

          <div className="relative p-6 sm:p-9">
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-ink-muted">
                  <span className="text-accent-bright">{project.index}</span>
                  <span className="text-line">/</span>
                  <span className="-translate-y-px rounded-md border border-line bg-white/[0.03] px-2 py-0.5">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2 py-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
                    </span>
                    running
                  </span>
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {project.title}
                </h3>
              </div>
              <span
                aria-hidden
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
              >
                →
              </span>
            </div>

            {/* animated flow diagram */}
            <div className="mt-9 rounded-2xl border border-line bg-void/40 p-5 font-mono text-[12px]">
              <div className="flex items-center justify-between border-b border-line pb-3 text-ink-muted">
                <span className="text-[11px] uppercase tracking-[0.2em]">{project.architecture?.label ?? "event flow"}</span>
                <span className="flex items-center gap-1.5 text-status">
                  saga choreography
                </span>
              </div>

              <div className="pt-4">
                {nodes.map((node, i) => {
                  const broker = isBroker(node.name)
                  const last = i === nodes.length - 1
                  const state = stateLabels[node.name]
                  return (
                    <div key={i} className="relative">
                      <div
                        className={
                          broker
                            ? "relative mx-auto my-1 flex max-w-[85%] items-center justify-center gap-4"
                            : "relative flex items-center justify-between rounded-xl border border-line bg-white/[0.02] px-4 py-3"
                        }
                      >
                        {broker ? (
                          <>
                            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                            <span className="flex items-center gap-2 text-cyan">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M4 10v4M20 10v4M2 12h20M6 9l-2 3 2 3M18 9l2 3-2 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="font-semibold tracking-tight">{node.name}</span>
                            </span>
                            <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-2">
                              <motion.span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: accent }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.2, repeat: Infinity }}
                              />
                              <span className="font-semibold text-ink">{node.name}</span>
                            </span>
                            <span className="flex items-center gap-3 text-[11px] text-ink-muted">
                              {state && <span>{state}</span>}
                              <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px]">
                                {nodes[i - 1]?.name?.replace("Service", "").toLowerCase() ||
                                  node.detail?.split("·")[0]
                                    ?.trim() || "init"}
                              </span>
                            </span>
                          </>
                        )}
                      </div>

                      {/* animated packet + connector */}
                      {!last && !reduce && (
                        <div className="relative mx-auto h-8 w-px overflow-visible">
                          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent/40 to-cyan/30" />
                          <Packet delay={i * 0.7} className={broker ? "bg-cyan" : "bg-accent-bright"} />
                        </div>
                      )}
                      {!last && reduce && (
                        <div className="relative mx-auto h-6 w-px bg-line" />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-ink-muted">
                <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                <span>
                  PENDING → APPROVED / REJECTED ·{" "}
                  <span className="text-accent-bright">retry → DLQ</span> on failure
                </span>
              </div>
            </div>

            {/* stack */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-ink-soft"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 6 && (
                <span className="rounded-full px-2.5 py-1 text-xs text-ink-muted">
                  +{project.stack.length - 6}
                </span>
              )}
            </div>
          </div>
        </TiltCard>
      </button>
    </div>
  )
}