import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

type CountUpProps = {
  to: number
  duration?: number
  decimal?: number
  suffix?: string
  className?: string
}

export default function CountUp({ to, duration = 1.6, decimal = 0, suffix = "", className }: CountUpProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimal)}
      {suffix}
    </span>
  )
}