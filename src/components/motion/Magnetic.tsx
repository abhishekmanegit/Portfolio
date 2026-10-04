import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)"
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}