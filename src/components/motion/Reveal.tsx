import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type SplitWordsProps = {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
  playOnMount?: boolean
}

export function SplitWords({ text, className, delay = 0, as: Tag = "span", playOnMount }: SplitWordsProps) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  return (
    <Tag className={className} style={{ perspective: "800px" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <motion.span
            className="inline-block"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: "1.1em", rotateX: -70, transformOrigin: "50% 100%" }
            }
            {...(playOnMount
              ? { animate: { opacity: 1, y: 0, rotateX: 0 } }
              : {
                  whileInView: { opacity: 1, y: 0, rotateX: 0 },
                  viewport: { once: true, margin: "-40px" },
                })}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  )
}

type StaggerContainerProps = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export function Stagger({ children, className, delay = 0, stagger = 0.08 }: StaggerContainerProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}