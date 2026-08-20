"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { careerPathBySlug } from "@/data/career-paths";
import { certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";

export default function CareerPathDetail() {
  const params = useParams<{ slug: string }>();
  const path = careerPathBySlug(params.slug);
  const { locale } = useApp();

  if (!path) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Path not found</h1>
        <Link href="/career-paths" className="text-cyber-cyan hover:underline">← Back</Link>
      </div>
    );
  }

  const certs = certifications.filter((c) => path.certifications.includes(c.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-3">{path.name}</h1>
      <p className="text-slate-400 mb-10 max-w-2xl">{path.summary}</p>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "المهارات" : "Skills"}</h2>
          <div className="flex flex-wrap gap-2">
            {path.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-cyber-border text-slate-300">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "الأدوات" : "Tools"}</h2>
          <div className="flex flex-wrap gap-2">
            {path.tools.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-cyber-border text-slate-300">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "ترتيب التعلم" : "Learning Order"}</h2>
        <ol className="space-y-2">
          {path.learningOrder.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-slate-300">
              <span className="shrink-0 w-6 h-6 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center justify-center text-xs">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {certs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "الشهادات" : "Certifications"}</h2>
          <div className="flex flex-wrap gap-2">
            {certs.map((c) => (
              <Link key={c.slug} href={`/certifications/${c.slug}`} className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "التقدم الوظيفي" : "Career Progression"}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {path.progression.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-sm glass border border-cyber-border">{p}</span>
              {i < path.progression.length - 1 && <span className="text-slate-600">→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
