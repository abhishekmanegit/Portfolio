import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const size = 46
  const stroke = 3
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dashOffset = useTransform(progress, [0, 1], [c, 0])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          whileHover={{ y: -3 }}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void/80 backdrop-blur-md shadow-lg"
        >
          <svg width={size} height={size} className="absolute inset-0 -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,139,190,0.15)" strokeWidth={stroke} />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#scrollGrad)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              style={{ strokeDashoffset: dashOffset }}
            />
            <defs>
              <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-cyan)" />
              </linearGradient>
            </defs>
          </svg>
          <span aria-hidden className="relative z-10 translate-y-px text-ink">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}