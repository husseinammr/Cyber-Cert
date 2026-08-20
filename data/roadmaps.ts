import { Roadmap, RoadmapRow } from "@/lib/types";

// Flatten a flow (which may contain parallel branch arrays) into a single
// ordered step list — used for simple localStorage progress tracking.
function flatten(flow: RoadmapRow[]) {
  return flow.flatMap((row) => (Array.isArray(row) ? row : [row]));
}

const redTeamFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework before continuing.", descriptionAr: "أكمل إطار عمل الأساسيات قبل المتابعة." },
  [
    { title: "Networking Deep Dive", titleAr: "التعمق في الشبكات", description: "Advanced protocol analysis and traffic reading.", descriptionAr: "تحليل متقدم للبروتوكولات وقراءة حركة المرور." },
    { title: "Linux Mastery", titleAr: "إتقان لينكس", description: "Comfortable scripting and navigating Linux under pressure.", descriptionAr: "الراحة في البرمجة النصية والتنقل في لينكس تحت الضغط." },
    { title: "Web Fundamentals", titleAr: "أساسيات الويب", description: "HTTP, web architecture, and the OWASP Top 10.", descriptionAr: "HTTP، بنية الويب، وقائمة OWASP Top 10." },
  ],
  { title: "Enumeration", titleAr: "الاستطلاع", description: "Systematically discover hosts, services, and attack surface.", descriptionAr: "اكتشاف الأجهزة والخدمات وسطح الهجوم بشكل منهجي.", why: "You can't exploit what you haven't found.", whyAr: "لا يمكنك استغلال ما لم تكتشفه." },
  { title: "Exploitation Basics", titleAr: "أساسيات الاستغلال", description: "Practice on guided beginner boxes (TryHackMe/HackTheBox).", descriptionAr: "تدرب على أجهزة موجهة للمبتدئين." },
  { title: "Privilege Escalation", titleAr: "تصعيد الصلاحيات", description: "Move from limited access to full system control.", descriptionAr: "الانتقال من الوصول المحدود إلى التحكم الكامل بالنظام." },
  { title: "Active Directory Attacks", titleAr: "هجمات Active Directory", description: "Enumerate and attack enterprise AD environments with BloodHound.", descriptionAr: "استكشاف ومهاجمة بيئات AD المؤسسية باستخدام BloodHound." },
  { title: "Structured Pentesting", titleAr: "اختبار اختراق منظم", description: "Formal methodology, scoping, and reporting.", descriptionAr: "منهجية رسمية وتحديد نطاق وكتابة تقارير.", resources: ["comptia-pentest-plus", "ceh"] },
  { title: "Certification", titleAr: "الشهادة", description: "Validate real-world exploitation ability.", descriptionAr: "إثبات القدرة على الاستغلال الواقعي.", resources: ["oscp"] },
  { title: "Advanced Specialization", titleAr: "التخصص المتقدم", description: "Move into exploit development, AppSec, or Red Team operations.", descriptionAr: "الانتقال إلى تطوير الاستغلالات أو أمن التطبيقات أو عمليات الفريق الأحمر.", resources: ["gxpn", "oswe"] },
];

const blueTeamFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework before continuing.", descriptionAr: "أكمل إطار عمل الأساسيات قبل المتابعة." },
  [
    { title: "Networking for Defense", titleAr: "الشبكات للدفاع", description: "Read and baseline normal network behavior.", descriptionAr: "قراءة وتحديد خط الأساس لسلوك الشبكة الطبيعي." },
    { title: "Windows & Linux Logs", titleAr: "سجلات Windows وLinux", description: "Know where evidence lives on both operating systems.", descriptionAr: "اعرف أين توجد الأدلة على كلا النظامين." },
  ],
  { title: "SIEM & Log Analysis", titleAr: "SIEM وتحليل السجلات", description: "Learn to search, correlate, and build alerts.", descriptionAr: "تعلّم البحث والربط وبناء التنبيهات.", resources: ["splunk-core-user"] },
  { title: "SOC Simulation Practice", titleAr: "محاكاة SOC", description: "Triage realistic alerts on LetsDefend/CyberDefenders.", descriptionAr: "فرز تنبيهات واقعية." },
  { title: "Threat Detection", titleAr: "كشف التهديدات", description: "Move from reactive alerting to proactive detection engineering.", descriptionAr: "الانتقال من التنبيه التفاعلي إلى هندسة الكشف الاستباقية.", resources: ["comptia-cysa-plus"] },
  { title: "Incident Handling", titleAr: "التعامل مع الحوادث", description: "Contain, eradicate, and recover from real incidents.", descriptionAr: "احتواء الحوادث الحقيقية والقضاء عليها والتعافي منها.", resources: ["gcih"] },
  { title: "Specialization", titleAr: "التخصص", description: "Branch into threat hunting, detection engineering, or DFIR.", descriptionAr: "التفرع إلى صيد التهديدات أو هندسة الكشف أو DFIR." },
];

const socFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework.", descriptionAr: "أكمل إطار عمل الأساسيات." },
  { title: "Security Fundamentals", titleAr: "أساسيات الأمن", description: "Certify your baseline knowledge.", descriptionAr: "أثبت معرفتك الأساسية.", resources: ["comptia-security-plus"] },
  { title: "SIEM Tool Familiarity", titleAr: "إتقان أدوات SIEM", description: "Get hands-on with a real SIEM platform.", descriptionAr: "احصل على خبرة عملية مع منصة SIEM حقيقية.", resources: ["splunk-core-user"] },
  { title: "Alert Triage Practice", titleAr: "التدرب على فرز التنبيهات", description: "Simulate real SOC shifts on free platforms.", descriptionAr: "محاكاة نوبات SOC حقيقية على منصات مجانية." },
  { title: "Apply as Tier 1 Analyst", titleAr: "التقدم كمحلل من المستوى الأول", description: "Start working real alerts and build speed.", descriptionAr: "ابدأ العمل على تنبيهات حقيقية وابنِ سرعتك." },
  { title: "Grow into Tier 2 / Threat Hunting", titleAr: "التطور إلى المستوى الثاني / صيد التهديدات", description: "Take on more complex investigations.", descriptionAr: "تولَّ تحقيقات أكثر تعقيدًا.", resources: ["comptia-cysa-plus"] },
];

const cloudFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework.", descriptionAr: "أكمل إطار عمل الأساسيات." },
  { title: "Choose a Primary Cloud Provider", titleAr: "اختر مزود سحابة رئيسيًا", description: "Focus on AWS, Azure, or GCP based on your target market.", descriptionAr: "ركّز على AWS أو Azure أو GCP حسب سوق العمل المستهدف." },
  [
    { title: "Cloud Fundamentals Cert", titleAr: "شهادة أساسيات السحابة", description: "Get the foundational cert for your chosen provider." },
    { title: "Vendor-Neutral Foundation", titleAr: "أساس محايد للمزود", description: "Study the free CSA guidance and pursue CCSK.", resources: ["ccsk"] },
  ],
  { title: "Vendor-Specific Security Cert", titleAr: "شهادة أمن خاصة بالمزود", description: "Pursue AWS Security Specialty or Azure Security Engineer.", descriptionAr: "احصل على AWS Security Specialty أو Azure Security Engineer.", resources: ["aws-security-specialty", "azure-security-engineer"] },
  { title: "Advanced Vendor-Neutral Credential", titleAr: "شهادة متقدمة محايدة للمزود", description: "Pursue CCSP once you have qualifying experience.", descriptionAr: "احصل على CCSP بعد اكتساب الخبرة المؤهلة.", resources: ["ccsp"] },
  { title: "Professional Level", titleAr: "المستوى الاحترافي", description: "Cloud Security Architect track.", descriptionAr: "مسار مهندس معماري أمن سحابة." },
];

const dfirFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework.", descriptionAr: "أكمل إطار عمل الأساسيات." },
  { title: "Incident Response Foundations", titleAr: "أساسيات الاستجابة للحوادث", description: "Learn the incident handling lifecycle.", descriptionAr: "تعلّم دورة حياة التعامل مع الحوادث.", resources: ["gcih"] },
  [
    { title: "Windows Forensics", titleAr: "التحقيق الجنائي لـ Windows", description: "File system, registry, and browser forensics.", resources: ["gcfe"] },
    { title: "Forensic CTF Practice", titleAr: "التدرب على تحديات CTF الجنائية", description: "Hands-on practice on CyberDefenders." },
  ],
  { title: "Advanced / Memory Forensics", titleAr: "التحقيق المتقدم / تحليل الذاكرة", description: "Memory forensics and anti-forensic techniques.", descriptionAr: "تحليل الذاكرة وتقنيات مكافحة التحقيق الجنائي.", resources: ["gcfa"] },
  { title: "Specialization", titleAr: "التخصص", description: "Malware analysis, threat intelligence, or DFIR leadership.", descriptionAr: "تحليل البرمجيات الخبيثة أو استخبارات التهديدات أو قيادة DFIR." },
];

const appsecFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework.", descriptionAr: "أكمل إطار عمل الأساسيات." },
  { title: "Web Fundamentals & a Language", titleAr: "أساسيات الويب ولغة برمجة", description: "Understand HTTP, web architecture, and code basics.", descriptionAr: "افهم HTTP وبنية الويب وأساسيات البرمجة." },
  { title: "Master OWASP Top 10", titleAr: "إتقان OWASP Top 10", description: "Work through PortSwigger Web Security Academy labs.", descriptionAr: "أكمل مختبرات PortSwigger Web Security Academy.", resources: [] },
  { title: "Manual Testing Practice", titleAr: "التدرب على الاختبار اليدوي", description: "Practice on intentionally vulnerable apps.", descriptionAr: "تدرب على تطبيقات مصممة للثغرات." },
  { title: "Hands-on Certification", titleAr: "شهادة عملية", description: "Validate web app testing skills.", descriptionAr: "أثبت مهارات اختبار تطبيقات الويب.", resources: ["owasp-wstg-practitioner"] },
  { title: "Advanced Exploitation", titleAr: "استغلال متقدم", description: "White-box source code review and exploit chains.", descriptionAr: "مراجعة الشيفرة المصدرية وسلاسل الاستغلال.", resources: ["oswe"] },
];

const grcFlow: RoadmapRow[] = [
  { title: "Foundation", titleAr: "الأساس", description: "Complete the Cybersecurity Foundation Framework.", descriptionAr: "أكمل إطار عمل الأساسيات." },
  { title: "Security Fundamentals", titleAr: "أساسيات الأمن", description: "Build a base understanding of security concepts.", descriptionAr: "ابنِ فهمًا أساسيًا للمفاهيم الأمنية.", resources: ["comptia-security-plus"] },
  { title: "Learn Major Frameworks", titleAr: "تعلّم الأطر الرئيسية", description: "ISO 27001, NIST CSF, and SOC 2 conceptually.", descriptionAr: "ISO 27001 وNIST CSF وSOC 2 بشكل مفاهيمي." },
  [
    { title: "Risk Management Track", titleAr: "مسار إدارة المخاطر", description: "Specialize in IT risk.", resources: ["crisc"] },
    { title: "Management Track", titleAr: "المسار الإداري", description: "Move into security management.", resources: ["cism"] },
  ],
  { title: "Executive Track", titleAr: "المسار التنفيذي", description: "CISSP and eventually a CISO-track credential.", descriptionAr: "CISSP وصولاً إلى شهادة على مسار كبير مسؤولي أمن المعلومات.", resources: ["cissp"] },
];

const beginnerFlow: RoadmapRow[] = [
  { title: "Computer Fundamentals", titleAr: "أساسيات الحاسوب", description: "Hardware, OS, file systems, and basic troubleshooting." },
  { title: "Networking Basics", titleAr: "أساسيات الشبكات", description: "TCP/IP, OSI, subnetting, DNS, HTTP/S." },
  { title: "Operating Systems", titleAr: "أنظمة التشغيل", description: "Windows and Linux administration." },
  { title: "Linux Deep Dive", titleAr: "التعمق في لينكس", description: "File system, permissions, package management, shell scripting." },
  { title: "Security Fundamentals", titleAr: "أساسيات الأمن السيبراني", description: "CIA triad, threats, cryptography basics, controls." },
  { title: "Pick a Specialization", titleAr: "اختر تخصصًا", description: "Explore SOC/Blue Team, Red Team, Cloud, GRC, or AppSec." },
  { title: "Foundational Certification", titleAr: "شهادة تأسيسية", description: "Validate with a beginner certification.", resources: ["comptia-security-plus"] },
];

export const roadmaps: Roadmap[] = [
  { slug: "beginner", name: "Cybersecurity Beginner Roadmap", nameAr: "خارطة طريق المبتدئين", category: "general", flow: beginnerFlow, steps: flatten(beginnerFlow) },
  { slug: "red-team", name: "Red Team Roadmap", nameAr: "خارطة طريق الفريق الأحمر", category: "red-team", flow: redTeamFlow, steps: flatten(redTeamFlow) },
  { slug: "blue-team", name: "Blue Team Roadmap", nameAr: "خارطة طريق الفريق الأزرق", category: "blue-team", flow: blueTeamFlow, steps: flatten(blueTeamFlow) },
  { slug: "soc", name: "SOC Analyst Roadmap", nameAr: "خارطة طريق محلل SOC", category: "soc", flow: socFlow, steps: flatten(socFlow) },
  { slug: "cloud-security", name: "Cloud Security Roadmap", nameAr: "خارطة طريق أمن السحابة", category: "cloud", flow: cloudFlow, steps: flatten(cloudFlow) },
  { slug: "dfir", name: "DFIR Roadmap", nameAr: "خارطة طريق DFIR", category: "dfir", flow: dfirFlow, steps: flatten(dfirFlow) },
  { slug: "appsec", name: "AppSec Roadmap", nameAr: "خارطة طريق أمن التطبيقات", category: "appsec", flow: appsecFlow, steps: flatten(appsecFlow) },
  { slug: "grc", name: "GRC Roadmap", nameAr: "خارطة طريق GRC", category: "grc", flow: grcFlow, steps: flatten(grcFlow) },
];

export const roadmapBySlug = (slug: string) => roadmaps.find((r) => r.slug === slug);
