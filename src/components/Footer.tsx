import { profile } from "../data/content"

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            <span className="text-gradient">{profile.name}</span>
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-ink-muted">Computer Science &amp; Engineering · {profile.location}</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "GitHub", href: profile.links.github },
            { label: "LinkedIn", href: profile.links.linkedin },
            { label: "LeetCode", href: profile.links.leetcode },
            { label: "Email", href: `mailto:${profile.email}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent-bright hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between border-t border-line pt-5">
        <p className="text-xs text-ink-muted">© 2026 {profile.name}. Built with React.</p>
        <a
          href="#home"
          className="text-xs text-ink-muted transition-colors hover:text-accent-bright"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  )
}