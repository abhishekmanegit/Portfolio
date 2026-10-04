import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Ripple = { id: number; x: number; y: number }

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 40 })
  const springY = useSpring(y, { stiffness: 400, damping: 40 })
  const ringX = useSpring(x, { stiffness: 140, damping: 18 })
  const ringY = useSpring(y, { stiffness: 140, damping: 18 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add("has-custom-cursor")

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest("a, button, [data-cursor]"))
    }
    const down = (e: MouseEvent) => {
      setRipples((r) => [...r, { id: ++idRef.current, x: e.clientX, y: e.clientY }])
    }

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mousedown", down)
    return () => {
      document.body.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* main accent dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 12,
            height: hovering ? 56 : 12,
            opacity: hovering ? 0.55 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: hovering
              ? "rgba(124,92,255,0.18)"
              : "var(--color-accent)",
            boxShadow: "0 0 24px 2px rgba(124,92,255,0.55)",
          }}
        />
      </motion.div>

      {/* fast center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          animate={{ scale: hovering ? 0.4 : 1, opacity: hovering ? 0 : 1 }}
          className="block h-1 w-1 rounded-full bg-white"
        />
      </motion.div>

      {/* trailing outline ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[105] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 34 : 26,
            height: hovering ? 34 : 26,
            borderColor: hovering
              ? "rgba(34,211,238,0.9)"
              : "rgba(167,139,250,0.55)",
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
        />
      </motion.div>

      {/* click ripple */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[105] hidden rounded-full border border-accent-bright/70 md:block"
          initial={{ x: ripple.x, y: ripple.y, translateX: "-50%", translateY: "-50%", scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() =>
            setRipples((r) => r.filter((item) => item.id !== ripple.id))
          }
          style={{ width: 18, height: 18 }}
        />
      ))}
    </>
  )
}