import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  glow?: boolean
}

export default function SectionHeading({ eyebrow, title, description, align = "left", glow }: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.p
        {...anim(0)}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]"
      >
        <span className="h-px w-6 bg-accent" />
        <span className="text-accent-bright">{eyebrow}</span>
        <span aria-hidden className="inline-block h-3.5 w-[2px] animate-pulse rounded-full bg-accent-bright" />
      </motion.p>
      <motion.h2 {...anim(0.05)} className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </motion.h2>
      {description && (
        <motion.p {...anim(0.12)} className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
          {description}
        </motion.p>
      )}
      {glow && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 block h-px w-24 bg-gradient-to-r from-accent to-cyan origin-left"
        />
      )}
    </div>
  )
}