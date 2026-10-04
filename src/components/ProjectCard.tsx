import { motion } from "framer-motion"
import type { Project } from "../data/content"
import TiltCard from "./motion/TiltCard"
import { Stagger, itemVariants } from "./motion/Reveal"

type ProjectCardProps = {
  project: Project
  onOpen: (project: Project) => void
  variant?: "featured" | "secondary"
  index?: number
}

export default function ProjectCard({ project, onOpen, variant = "featured", index = 0 }: ProjectCardProps) {
  const featured = variant === "featured"

  return (
    <Stagger>
      <motion.article variants={itemVariants} className="group relative">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.title} project details`}
          className={[
            "relative block w-full overflow-hidden text-left transition-all duration-300",
            featured ? "rounded-3xl p-7 sm:p-9" : "rounded-2xl p-6",
          ].join(" ")}
        >
          <TiltCard
            className={`relative h-full border border-line glass p-6 transition-colors hover:border-accent/40 ${featured ? "rounded-3xl sm:p-8" : "rounded-2xl"}`}
            intensity={featured ? 5 : 4}
          >
            {/* shine sweep */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            >
              <span className="absolute inset-0 -skew-x-12 animate-shine bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </motion.span>

            {/* hover glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120% 120% at 50% 0%, ${project.accent}1c, transparent 60%)`,
                boxShadow: featured ? `0 24px 70px -30px ${project.accent}aa` : undefined,
              }}
            />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-ink-muted">
                  <span className="text-accent-bright">{project.index}</span>
                  <span className="mx-2 text-line">/</span>
                  {project.category}
                </p>
                <h3
                  className={
                    featured
                      ? "mt-4 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                      : "mt-3 font-display text-xl font-semibold tracking-tight text-balance"
                  }
                >
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

            <p className="mt-4 text-pretty leading-relaxed text-ink-soft">
              {project.oneLiner}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.slice(0, featured ? 6 : 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-ink-soft"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > (featured ? 6 : 5) && (
                <span className="rounded-full px-2.5 py-1 text-xs text-ink-muted">
                  +{project.stack.length - (featured ? 6 : 5)}
                </span>
              )}
            </div>
          </TiltCard>
        </button>
      </motion.article>
    </Stagger>
  )
}