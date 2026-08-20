"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { Category, Level } from "@/lib/types";

const levelOrder: Record<Level, number> = { beginner: 0, intermediate: 1, advanced: 2 };
const levelLabelsCol = { beginner: "BEGINNER", intermediate: "INTERMEDIATE", advanced: "ADVANCED" };
const levelLabelsColAr = { beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم" };

// Every certification is assigned to exactly one swimlane/track so the map reads as a
// clear grid: rows = track (Red Team / Blue Team / Networking / Other), columns = level.
type Track = "red" | "blue" | "network" | "other";

const trackMeta: Record<Track, { label: string; labelAr: string; color: string; bg: string }> = {
  red: { label: "Red Team", labelAr: "الفريق الأحمر", color: "#f87171", bg: "rgba(248,113,113,0.05)" },
  blue: { label: "Blue Team", labelAr: "الفريق الأزرق", color: "#60a5fa", bg: "rgba(96,165,250,0.05)" },
  network: { label: "Networking", labelAr: "الشبكات", color: "#34d399", bg: "rgba(52,211,153,0.05)" },
  other: { label: "Other Specializations", labelAr: "تخصصات أخرى", color: "#a78bfa", bg: "rgba(167,139,250,0.05)" },
};
const trackOrder: Track[] = ["red", "blue", "network", "other"];

function trackOf(categories: Category[]): Track {
  if (categories.some((c) => c === "red-team" || c === "pentest")) return "red";
  if (categories.some((c) => c === "blue-team" || c === "soc" || c === "dfir" || c === "threat-hunting" || c === "malware")) return "blue";
  if (categories.some((c) => c === "network")) return "network";
  return "other";
}

export default function GraphPage() {
  const { locale, dict } = useApp();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<{ x: number; y: number; startPan: { x: number; y: number }; moved: boolean } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Layout constants scale down on mobile so nodes stay readable without overlap.
  const COL_W = isMobile ? 172 : 300;
  const ROW_H = isMobile ? 52 : 60;
  const NODE_W = isMobile ? 148 : 220;
  const NODE_H = isMobile ? 40 : 40;
  const LANE_LABEL_W = isMobile ? 64 : 140;
  const LANE_GAP = isMobile ? 26 : 34;
  const PAD_TOP = isMobile ? 44 : 56;
  const FONT_SIZE = isMobile ? 10 : 12;

  const { positions, laneBounds, width, height, trackByCertSlug } = useMemo(() => {
    const trackByCertSlug: Record<string, Track> = {};
    certifications.forEach((c) => (trackByCertSlug[c.slug] = trackOf(c.category)));

    // Group certs: track -> level -> certs[]
    const grouped: Record<Track, Record<Level, typeof certifications>> = {
      red: { beginner: [], intermediate: [], advanced: [] },
      blue: { beginner: [], intermediate: [], advanced: [] },
      network: { beginner: [], intermediate: [], advanced: [] },
      other: { beginner: [], intermediate: [], advanced: [] },
    };
    certifications.forEach((c) => {
      grouped[trackByCertSlug[c.slug]][c.level].push(c);
    });
    (Object.keys(grouped) as Track[]).forEach((t) => {
      (Object.keys(grouped[t]) as Level[]).forEach((lvl) => {
        grouped[t][lvl].sort((a, b) => a.name.localeCompare(b.name));
      });
    });

    const positions: Record<string, { x: number; y: number }> = {};
    const laneBounds: { track: Track; y: number; h: number; rows: number }[] = [];
    let cursorY = PAD_TOP;

    trackOrder.forEach((t) => {
      const rowsInLane = Math.max(1, ...(["beginner", "intermediate", "advanced"] as Level[]).map((lvl) => grouped[t][lvl].length));
      const laneH = rowsInLane * ROW_H + 20;

      (["beginner", "intermediate", "advanced"] as Level[]).forEach((lvl) => {
        grouped[t][lvl].forEach((c, i) => {
          positions[c.slug] = {
            x: LANE_LABEL_W + levelOrder[lvl] * COL_W,
            y: cursorY + 14 + i * ROW_H,
          };
        });
      });

      laneBounds.push({ track: t, y: cursorY, h: laneH, rows: rowsInLane });
      cursorY += laneH + LANE_GAP;
    });

    const width = LANE_LABEL_W + COL_W * 3 + NODE_W + 20;
    const height = cursorY;
    return { positions, laneBounds, width, height, trackByCertSlug };
  }, [COL_W, ROW_H, NODE_W, LANE_LABEL_W, LANE_GAP, PAD_TOP]);

  const edges = useMemo(() => {
    const list: { from: string; to: string }[] = [];
    certifications.forEach((c) => {
      c.nextCerts.forEach((n) => {
        if (positions[n]) list.push({ from: c.slug, to: n });
      });
    });
    return list;
  }, [positions]);

  const selectedCert = selected ? certifications.find((c) => c.slug === selected) : null;
  const connectedSlugs = new Set<string>();
  if (selected) {
    connectedSlugs.add(selected);
    edges.forEach((e) => {
      if (e.from === selected) connectedSlugs.add(e.to);
      if (e.to === selected) connectedSlugs.add(e.from);
    });
  }

  // Auto-fit the graph to the container width on load / resize so mobile never
  // starts with a broken, overflowing horizontal layout.
  useEffect(() => {
    const fit = () => {
      const el = containerRef.current;
      if (!el || !width) return;
      const available = el.clientWidth - 16;
      const fitScale = Math.min(1, Math.max(0.32, available / width));
      setScale(fitScale);
      setPan({ x: 0, y: 0 });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, isMobile]);

  const zoom = (delta: number) => setScale((s) => Math.min(1.5, Math.max(0.25, +(s + delta).toFixed(2))));
  const resetView = () => {
    const el = containerRef.current;
    if (el && width) {
      const available = el.clientWidth - 16;
      setScale(Math.min(1, Math.max(0.32, available / width)));
    }
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, startPan: pan, moved: false };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    setPan({ x: dragRef.current.startPan.x + dx, y: dragRef.current.startPan.y + dy });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.graph}</h1>
      <p className="text-slate-400 mb-6 max-w-2xl">
        {locale === "ar"
          ? "الشهادات مقسّمة إلى مسارات واضحة — الفريق الأحمر، الفريق الأزرق، الشبكات، وتخصصات أخرى — ومرتبة أفقيًا من مبتدئ إلى متقدم. اضغط على شهادة لتمييز علاقاتها المباشرة."
          : "Certifications are grouped into clear tracks — Red Team, Blue Team, Networking, and Other Specializations — arranged left-to-right from Beginner to Advanced. Tap a certification to highlight its direct relationships."}
      </p>

      {/* Legend — one entry per track, directly matching the swimlanes below */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
        {trackOrder.map((t) => (
          <span key={t} className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: trackMeta[t].color }} />
            {locale === "ar" ? trackMeta[t].labelAr : trackMeta[t].label}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button onClick={() => zoom(-0.15)} className="w-10 h-10 sm:w-8 sm:h-8 rounded-md border border-cyber-border text-slate-300 hover:border-cyber-cyan text-lg sm:text-base" aria-label="zoom out">
          −
        </button>
        <button onClick={() => zoom(0.15)} className="w-10 h-10 sm:w-8 sm:h-8 rounded-md border border-cyber-border text-slate-300 hover:border-cyber-cyan text-lg sm:text-base" aria-label="zoom in">
          +
        </button>
        <button onClick={resetView} className="px-3 h-10 sm:h-8 rounded-md border border-cyber-border text-xs text-slate-300 hover:border-cyber-cyan">
          {locale === "ar" ? "إعادة الضبط" : "Reset view"}
        </button>
        {selected && (
          <button onClick={() => setSelected(null)} className="px-3 h-10 sm:h-8 rounded-md border border-cyber-cyan text-xs text-cyber-cyan">
            {locale === "ar" ? "مسح التحديد" : "Clear selection"}
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="glass border border-cyber-border rounded-xl overflow-hidden touch-none select-none"
        style={{ height: isMobile ? "60vh" : "72vh", cursor: dragRef.current ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg width="100%" height="100%">
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`} style={{ transformOrigin: "0 0" }}>
            {/* Level column headers */}
            {(["beginner", "intermediate", "advanced"] as Level[]).map((lvl) => (
              <text
                key={lvl}
                x={LANE_LABEL_W + levelOrder[lvl] * COL_W}
                y={PAD_TOP - 22}
                fontSize={FONT_SIZE}
                letterSpacing="1.5"
                fill="#64748b"
                fontWeight={600}
              >
                {locale === "ar" ? levelLabelsColAr[lvl] : levelLabelsCol[lvl]}
              </text>
            ))}

            {/* column divider lines spanning the whole map */}
            {[1, 2].map((i) => (
              <line
                key={i}
                x1={LANE_LABEL_W + i * COL_W - LANE_GAP / 2}
                x2={LANE_LABEL_W + i * COL_W - LANE_GAP / 2}
                y1={PAD_TOP - 30}
                y2={height - 10}
                stroke="#1c2740"
                strokeDasharray="4 4"
              />
            ))}

            {/* Swimlanes: background band + label per track */}
            {laneBounds.map(({ track, y, h }) => (
              <g key={track}>
                <rect x={0} y={y} width={width} height={h} fill={trackMeta[track].bg} />
                <rect x={0} y={y} width={4} height={h} fill={trackMeta[track].color} />
                <text
                  x={10}
                  y={y + h / 2}
                  fontSize={FONT_SIZE}
                  fontWeight={700}
                  fill={trackMeta[track].color}
                  transform={isMobile ? `rotate(-90 10 ${y + h / 2})` : undefined}
                  textAnchor={isMobile ? "middle" : "start"}
                >
                  {isMobile
                    ? (locale === "ar" ? trackMeta[track].labelAr : trackMeta[track].label)
                    : (locale === "ar" ? trackMeta[track].labelAr : trackMeta[track].label).slice(0, 16)}
                </text>
              </g>
            ))}

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
              </marker>
              <marker id="arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
              </marker>
            </defs>

            {/* Orthogonal connectors — routed as simple step-lines to avoid tangles */}
            {edges.map((e, i) => {
              const from = positions[e.from];
              const to = positions[e.to];
              if (!from || !to) return null;
              const active = connectedSlugs.has(e.from) && connectedSlugs.has(e.to);
              const dim = selected && !active;
              const startX = from.x + NODE_W;
              const startY = from.y + NODE_H / 2;
              const endX = to.x;
              const endY = to.y + NODE_H / 2;
              const midX = startX + (endX - startX) / 2;
              const d =
                startY === endY
                  ? `M ${startX} ${startY} L ${endX} ${endY}`
                  : `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={active ? "#22d3ee" : "#1c2740"}
                  strokeWidth={active ? 2 : 1.1}
                  opacity={dim ? 0.2 : 1}
                  markerEnd={active ? "url(#arrow)" : "url(#arrow-dim)"}
                />
              );
            })}

            {/* Nodes */}
            {certifications.map((c) => {
              const pos = positions[c.slug];
              if (!pos) return null;
              const isSelected = selected === c.slug;
              const isConnected = selected && connectedSlugs.has(c.slug) && !isSelected;
              const dim = selected && !connectedSlugs.has(c.slug);
              const color = trackMeta[trackByCertSlug[c.slug]].color;
              const maxChars = isMobile ? 16 : 24;
              return (
                <g
                  key={c.slug}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer"
                  opacity={dim ? 0.28 : 1}
                  onClick={() => {
                    if (dragRef.current?.moved) return;
                    setSelected(isSelected ? null : c.slug);
                  }}
                  onDoubleClick={() => router.push(`/certifications/${c.slug}`)}
                >
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx="8"
                    fill={isSelected ? "rgba(34,211,238,0.18)" : "rgba(14,21,36,0.94)"}
                    stroke={isSelected ? "#22d3ee" : isConnected ? "#22d3ee" : "#1c2740"}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <rect x="0" y="0" width="4" height={NODE_H} rx="2" fill={color} />
                  <text x={isMobile ? 8 : 14} y={NODE_H / 2 + 4} fontSize={FONT_SIZE} fill={isSelected ? "#22d3ee" : "#cbd5e1"}>
                    {c.name.length > maxChars ? c.name.slice(0, maxChars - 2) + "…" : c.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {selectedCert && (
        <div className="glass border border-cyber-cyan/40 rounded-xl p-5 mt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-100">{selectedCert.name}</h2>
              <p className="text-xs text-slate-500">{selectedCert.provider}</p>
            </div>
            <button
              onClick={() => router.push(`/certifications/${selectedCert.slug}`)}
              className="text-xs px-3 py-1.5 rounded-md bg-cyber-cyan text-cyber-bg font-semibold shrink-0"
            >
              {locale === "ar" ? "عرض التفاصيل" : "View Details"}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3 text-xs">
            {selectedCert.relatedCerts.length > 0 && (
              <div>
                <p className="text-slate-500 mb-1">{locale === "ar" ? "شهادات ذات صلة" : "Related"}</p>
                <p className="text-slate-300">
                  {selectedCert.relatedCerts.map((s) => certifications.find((c) => c.slug === s)?.name || s).join(", ")}
                </p>
              </div>
            )}
            {selectedCert.nextCerts.length > 0 && (
              <div>
                <p className="text-slate-500 mb-1">{locale === "ar" ? "الشهادة التالية" : "Next Certifications"}</p>
                <p className="text-slate-300">
                  {selectedCert.nextCerts.map((s) => certifications.find((c) => c.slug === s)?.name || s).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-4">
        {locale === "ar"
          ? "اسحب للتنقل، واستخدم أزرار +/− للتكبير أو التصغير — تعمل باللمس على الجوال."
          : "Drag to pan, use the +/− buttons to zoom — fully touch-friendly on mobile."}
      </p>
    </div>
  );
}
