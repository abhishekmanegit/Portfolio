import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import type { Project } from "../data/content"

function ArchitectureDiagram({ project }: { project: Project }) {
  if (!project.architecture) return null
  const nodes = project.architecture.nodes

  return (
    <div className="rounded-2xl border border-line glass p-5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="text-ink-muted uppercase tracking-widest">{project.architecture.label}</span>
      </div>
      <div className="pt-4">
        {nodes.map((node, i) => {
          const isMiddle = i > 0 && i < nodes.length - 1
          return (
            <div key={i} className="relative">
              <div
                className={
                  isMiddle
                    ? "mx-auto mb-1 flex max-w-[80%] items-center justify-center gap-3"
                    : "flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-3"
                }
              >
                {isMiddle ? (
                  <>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="text-gradient"
                    >
                      {node.name}
                    </motion.span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-ink">{node.name}</span>
                    {node.detail && (
                      <span className="text-[10px] text-ink-muted">{node.detail}</span>
                    )}
                  </>
                )}
              </div>
              {i < nodes.length - 1 && (
                <div className="flex justify-center py-1 text-accent-bright">
                  <motion.span
                    aria-hidden
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {project.architecture.note && (
        <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-ink-muted">
          {project.architecture.note}
        </p>
      )}
    </div>
  )
}

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-md"
          onClick={onClose}
          aria-hidden
        />
      )}

      {project && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
          className="glass-strong fixed inset-y-0 right-0 z-[70] w-full max-w-2xl overflow-y-auto border-l border-line shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-void/80 px-6 py-4 backdrop-blur-md sm:px-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              <span className="text-accent-bright">{project.index}</span> — {project.category}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <span aria-hidden className="text-base">×</span>
            </button>
          </div>

          <div className="px-6 py-10 sm:px-10">
            <span aria-hidden className="block font-display text-7xl font-bold opacity-10 text-gradient">
              {project.index}
            </span>
            <h2 className="-mt-8 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-ink-soft">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
                >
                  Live Demo <span aria-hidden>↗</span>
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="mt-10 space-y-8">
              <Section title="Problem"><p>{project.problem}</p></Section>

              <Section title="What I built">
                <ul className="space-y-2.5">
                  {project.built.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-3"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </Section>

              <Section title="Technical approach"><p>{project.approach}</p></Section>

              <Section title="Key engineering decisions">
                <ul className="space-y-2.5">
                  {project.decisions.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-muted" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {project.features.length > 0 && (
                <Section title="Highlights">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-ink-soft"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {project.architecture && (
                <Section title="Architecture">
                  <ArchitectureDiagram project={project} />
                </Section>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent-bright">
        <span className="h-3 w-px bg-accent" />
        {title}
      </h3>
      <div className="text-pretty leading-relaxed text-ink-soft">{children}</div>
    </div>
  )
}