export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "cyan" | "purple" | "green" | "amber" }) {
  const tones: Record<string, string> = {
    default: "bg-white/5 text-slate-300 border-cyber-border",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
}
