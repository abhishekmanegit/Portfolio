import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

type TypewriterProps = {
  words: string[]
  prefix?: string
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
  className?: string
  cursorClassName?: string
}

export default function Typewriter({
  words,
  prefix = "",
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1600,
  className,
  cursorClassName,
}: TypewriterProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) {
      setText(words[0] ?? "")
      return
    }
    const current = words[index % words.length]
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce])

  return (
    <span className={className}>
      {prefix}
      {text}
      <span
        className={`inline-block animate-pulse ${cursorClassName ?? "text-accent-bright"}`}
        aria-hidden
      >
        _
      </span>
    </span>
  )
}