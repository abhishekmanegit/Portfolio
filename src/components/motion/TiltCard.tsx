import { useRef } from "react"
import type { ReactNode, MouseEvent } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion"

type TiltCardProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)

  const sX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const sY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(167,139,250,0.16), transparent 62%)`

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * intensity * 2)
    rotateX.set((0.5 - py) * intensity * 2)
    mx.set(px * 100)
    my.set(py * 100)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    mx.set(50)
    my.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: sX,
        rotateY: sY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  )
}