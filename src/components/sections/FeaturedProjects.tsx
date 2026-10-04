import { useState } from "react"
import { featuredProjects, type Project } from "../../data/content"
import SectionHeading from "../SectionHeading"
import ProjectCard from "../ProjectCard"
import SignatureCard from "../SignatureCard"
import ProjectDetail from "../ProjectDetail"
import { motion } from "framer-motion"
import { Reveal } from "../motion/Reveal"

export default function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Projects built around <span className="text-gradient">real problems</span>.</>}
          description="Not identical cards — each project is a different kind of problem. The work ranges from a distributed order system to a deployed AI chatbot and a live collaboration platform."
          glow
        />

        <div className="mt-14 space-y-8 md:space-y-12">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? "md:ml-[9%]" : "md:mr-[9%]"}>
              {project.signature && project.architecture ? (
                <SignatureCard project={project} onOpen={setActive} />
              ) : (
                <ProjectCard project={project} onOpen={setActive} index={i} />
              )}
            </div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            <motion.span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-transparent via-line to-transparent"
            />
            More below — a shipped client website, an ML + business-decision pipeline, and open source.
          </p>
        </Reveal>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  )
}