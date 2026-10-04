import { usePrefersReducedMotion } from "../../hooks/useMotion"

export default function BackgroundFX({ fixed = false }: { fixed?: boolean }) {
  const reduce = usePrefersReducedMotion()

  return (
    <div
      aria-hidden
      className={`${fixed ? "pointer-events-none fixed inset-0 -z-10 overflow-hidden" : "pointer-events-none absolute inset-0 -z-10 overflow-hidden"}`}
    >
      {/* Aurora blobs */}
      <div
        className={`absolute -top-40 left-1/2 h-[42rem] w-[52rem] -translate-x-1/2 rounded-full blur-3xl ${
          reduce ? "" : "animate-aurora"
        }`}
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,92,255,0.28), transparent 70%)",
        }}
      />
      <div
        className={`absolute top-44 -right-40 h-[36rem] w-[40rem] rounded-full blur-3xl ${
          reduce ? "" : "animate-aurora"
        }`}
        style={{
          animationDelay: "-6s",
          background: "radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 70%)",
        }}
      />
      <div
        className={`absolute bottom-0 -left-40 h-[34rem] w-[38rem] rounded-full blur-3xl ${
          reduce ? "" : "animate-aurora"
        }`}
        style={{
          animationDelay: "-12s",
          background: "radial-gradient(closest-side, rgba(243,94,158,0.16), transparent 70%)",
        }}
      />

      {/* Perspective grid near top */}
      <div className="bg-grid absolute inset-x-0 top-0 h-[60vh]" />
    </div>
  )
}