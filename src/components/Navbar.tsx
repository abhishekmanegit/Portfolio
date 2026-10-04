import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { nav, profile } from "../data/content"
import { cn } from "../lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    nav.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-void/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <a href="#home" className="group font-display text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-gradient">{profile.firstName}</span>
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  active === item.id ? "text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-white/5 shadow-[0_0_20px_-6px_rgba(124,92,255,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* gradient underline that slides in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-cyan to-accent transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent-bright transition-colors hover:bg-accent hover:text-white"
          >
            Resume
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
        >
          <div className="relative h-3.5 w-5">
            <span className={cn("absolute left-0 top-0 h-px w-5 bg-ink transition-all duration-300", open && "top-1.5 rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-px w-5 bg-ink transition-all duration-300", open && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-px w-5 bg-ink transition-all duration-300", open && "top-1.5 -rotate-45")} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-b border-line bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base text-ink-soft hover:bg-white/5 hover:text-ink"
                  >
                    {item.label}
                    <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-full border border-accent/40 px-3 py-2.5 text-center text-sm font-medium text-accent-bright"
                >
                  Download Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}