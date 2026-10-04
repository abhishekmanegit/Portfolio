import { useState } from "react"
import { secondaryProjects, type Project } from "../../data/content"
import ProjectCard from "../ProjectCard"
import ProjectDetail from "../ProjectDetail"
import { Stagger, itemVariants } from "../motion/Reveal"
import { motion } from "framer-motion"

export default function SecondaryProjects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section className="relative scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]"
            >
              <span className="h-px w-6 bg-accent" />
              <span className="text-accent-bright">Further work</span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Shipped web, ML decisions, and open source.
            </motion.h2>
          </div>
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {secondaryProjects.map((project, i) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} onOpen={setActive} variant="secondary" index={i} />
            </motion.div>
          ))}
        </Stagger>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  )
}