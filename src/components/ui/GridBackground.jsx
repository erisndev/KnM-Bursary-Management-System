/**
 * A subtle animated grid + floating particles background.
 * Renders via CSS only — no heavy canvas/JS.
 */
export default function GridBackground({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow top-left */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-violet-500/25 dark:bg-violet-500/8 rounded-full blur-3xl" />

      {/* Radial glow bottom-right */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-500/25 dark:bg-indigo-500/8 rounded-full blur-3xl" />

      {/* Floating dots */}
      <div className="absolute top-[15%] left-[10%] w-2.5 h-2.5 bg-violet-400/60 dark:bg-violet-400/20 rounded-full animate-float-slow" />
      <div className="absolute top-[45%] right-[15%] w-2 h-2 bg-cyan-400/55 dark:bg-cyan-400/20 rounded-full animate-float-medium" />
      <div className="absolute bottom-[20%] left-[25%] w-3 h-3 bg-indigo-400/50 dark:bg-indigo-400/15 rounded-full animate-float-fast" />
      <div className="absolute top-[70%] right-[30%] w-2 h-2 bg-fuchsia-400/55 dark:bg-fuchsia-400/20 rounded-full animate-float-slow" />
      <div className="absolute top-[30%] left-[60%] w-2.5 h-2.5 bg-emerald-400/50 dark:bg-emerald-400/15 rounded-full animate-float-medium" />
      <div className="absolute bottom-[40%] right-[55%] w-1.5 h-1.5 bg-amber-400/55 dark:bg-amber-400/20 rounded-full animate-float-fast" />
    </div>
  );
}
