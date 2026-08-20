export interface ConceptItem {
  term: string;
  why: string; // en
  whyAr: string;
  relevance: string; // en
  relevanceAr: string;
}

export interface FoundationStage {
  slug: string;
  order: number;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  intro: string;
  introAr: string;
  topics: { group: string; groupAr: string; items: string[] }[];
  concepts: ConceptItem[];
  whyMatters: string;
  whyMattersAr: string;
  readyWhen: string[];
  readyWhenAr: string[];
  freeResources: string[]; // free-resource slugs
  practice: string[];
  practiceAr: string[];
  mistakes: string[];
  mistakesAr: string[];
  nextStageSlug?: string;
}

export const foundationStages: FoundationStage[] = [
  {
    slug: "computer-fundamentals",
    order: 1,
    title: "Computer Fundamentals",
    titleAr: "أساسيات الحاسوب",
    tagline: "How a computer actually works, underneath every app you use.",
    taglineAr: "كيف يعمل الحاسوب فعليًا، تحت كل برنامج تستخدمه.",
    intro:
      "Before touching any security tool, you need a working mental model of what a computer is made of and how it runs software. This stage builds that foundation.",
    introAr:
      "قبل استخدام أي أداة أمنية، تحتاج إلى تصوّر ذهني واضح لمكونات الحاسوب وكيفية تشغيله للبرمجيات. هذه المرحلة تبني هذا الأساس.",
    topics: [
      { group: "Hardware", groupAr: "الأجهزة", items: ["CPU", "RAM", "Storage (HDD/SSD)", "GPU", "Motherboard", "BIOS/UEFI", "Peripherals"] },
      { group: "Software", groupAr: "البرمجيات", items: ["Operating systems", "Applications", "Drivers", "Processes", "Services"] },
      {
        group: "Core Concepts",
        groupAr: "مفاهيم أساسية",
        items: ["Files & directories", "Processes", "Memory", "Users", "Permissions", "Applications", "Virtualization"],
      },
    ],
    concepts: [
      {
        term: "Processes",
        why: "Every running program is a process; understanding them is key to understanding what's happening on a system.",
        whyAr: "كل برنامج قيد التشغيل هو عملية (process)؛ فهمها أساسي لفهم ما يحدث على النظام.",
        relevance: "Malware, backdoors, and legitimate software all show up as processes — this is where detection starts.",
        relevanceAr: "البرمجيات الخبيثة والأبواب الخلفية والبرامج الشرعية تظهر جميعها كعمليات — من هنا يبدأ الكشف.",
      },
      {
        term: "Permissions",
        why: "Who can read, write, or execute a file or resource determines what actions are even possible.",
        whyAr: "من يملك صلاحية القراءة أو الكتابة أو التنفيذ يحدد ما هو ممكن أصلاً على النظام.",
        relevance: "Privilege escalation — a core attack technique — is entirely about abusing permission mistakes.",
        relevanceAr: "تصعيد الصلاحيات (Privilege Escalation) — وهي تقنية هجوم أساسية — تعتمد بالكامل على استغلال أخطاء الصلاحيات.",
      },
      {
        term: "Virtualization",
        why: "Modern IT and security labs run almost entirely on virtual machines and containers.",
        whyAr: "بيئات تقنية المعلومات والمختبرات الأمنية الحديثة تعمل تقريبًا بالكامل على الأجهزة الافتراضية والحاويات.",
        relevance: "You'll build your entire home lab (Kali, target VMs, sandboxes) on virtualization.",
        relevanceAr: "ستبني مختبرك المنزلي بالكامل (Kali، أجهزة افتراضية هدف، بيئات عزل) باستخدام الافتراضية.",
      },
    ],
    whyMatters:
      "Every attack and every defense ultimately touches hardware, an OS, or a process. Skipping this stage means memorizing tool commands without understanding what they actually do.",
    whyMattersAr:
      "كل هجوم وكل دفاع يمسّ في النهاية جهازًا أو نظام تشغيل أو عملية. تجاوز هذه المرحلة يعني حفظ أوامر الأدوات دون فهم ما تفعله فعليًا.",
    readyWhen: [
      "You can explain the difference between RAM and storage",
      "You understand what a process and a service are",
      "You know what file permissions control",
      "You can explain what a virtual machine is",
    ],
    readyWhenAr: [
      "تستطيع شرح الفرق بين الذاكرة العشوائية (RAM) والتخزين",
      "تفهم ما هي العملية (process) والخدمة (service)",
      "تعرف ما الذي تتحكم به صلاحيات الملفات",
      "تستطيع شرح ما هو الجهاز الافتراضي",
    ],
    freeResources: ["sans-cyber-aces", "cisco-skills-for-all"],
    practice: [
      "Install a virtualization tool (VirtualBox or VMware) and create your first VM",
      "Explore Task Manager / Activity Monitor and identify 10 running processes",
      "Create files with different permission levels and observe the effects",
    ],
    practiceAr: [
      "ثبّت أداة افتراضية (VirtualBox أو VMware) وأنشئ أول جهاز افتراضي",
      "استكشف مدير المهام وحدد 10 عمليات قيد التشغيل",
      "أنشئ ملفات بصلاحيات مختلفة ولاحظ التأثير",
    ],
    mistakes: [
      "Jumping straight to hacking tools without understanding what a process is",
      "Ignoring virtualization and trying to practice on a personal main machine",
      "Memorizing terms without ever opening a terminal or task manager",
    ],
    mistakesAr: [
      "القفز مباشرة إلى أدوات الاختراق دون فهم ما هي العملية",
      "تجاهل الافتراضية ومحاولة التدرب على الجهاز الشخصي الرئيسي",
      "حفظ المصطلحات دون فتح الطرفية أو مدير المهام ولو مرة",
    ],
    nextStageSlug: "networking",
  },
  {
    slug: "networking",
    order: 2,
    title: "Networking",
    titleAr: "الشبكات",
    tagline: "How data actually moves between two machines.",
    taglineAr: "كيف تنتقل البيانات فعليًا بين جهازين.",
    intro:
      "Almost every attack and every defensive tool operates on network traffic. This stage covers the concepts you must know before touching Wireshark, Nmap, or any SIEM.",
    introAr:
      "كل هجوم تقريبًا وكل أداة دفاعية تعمل على حركة مرور الشبكة. تغطي هذه المرحلة المفاهيم الواجب معرفتها قبل استخدام Wireshark أو Nmap أو أي SIEM.",
    topics: [
      { group: "Addressing", groupAr: "العنونة", items: ["IP", "MAC", "IPv4", "IPv6", "Subnetting", "NAT"] },
      { group: "Transport & Core Protocols", groupAr: "بروتوكولات النقل الأساسية", items: ["TCP", "UDP", "Ports", "ARP", "ICMP"] },
      { group: "Application Protocols", groupAr: "بروتوكولات التطبيقات", items: ["DNS", "DHCP", "HTTP", "HTTPS"] },
      { group: "Infrastructure", groupAr: "البنية التحتية", items: ["Routing", "Switching", "Firewalls", "OSI Model"] },
    ],
    concepts: [
      {
        term: "TCP",
        why: "Understanding reliable communication and the three-way handshake explains most network behavior you'll observe.",
        whyAr: "فهم الاتصال الموثوق ومصافحة الاتصال الثلاثية (three-way handshake) يفسر معظم سلوك الشبكة الذي ستلاحظه.",
        relevance: "Port scanning, traffic analysis, and many network attacks are built directly on top of TCP behavior.",
        relevanceAr: "فحص المنافذ وتحليل حركة المرور والعديد من هجمات الشبكة تُبنى مباشرة على سلوك TCP.",
      },
      {
        term: "DNS",
        why: "DNS translates human-readable names into IP addresses — it's involved in nearly every connection made.",
        whyAr: "يترجم DNS الأسماء المقروءة إلى عناوين IP — وهو موجود في كل اتصال تقريبًا.",
        relevance: "DNS tunneling, spoofing, and exfiltration via DNS are common attacker and defender focus areas.",
        relevanceAr: "نفق DNS (DNS tunneling)، والانتحال، وتسريب البيانات عبر DNS من أبرز اهتمامات المهاجمين والمدافعين.",
      },
      {
        term: "Firewalls",
        why: "Firewalls control what traffic is allowed in or out of a network based on rules.",
        whyAr: "تتحكم جدران الحماية بحركة المرور المسموح بدخولها أو خروجها بناءً على قواعد محددة.",
        relevance: "Both attackers (evasion) and defenders (rule writing, IDS/IPS tuning) live in this space.",
        relevanceAr: "كل من المهاجمين (التحايل) والمدافعين (كتابة القواعد، ضبط IDS/IPS) يعملون في هذا المجال.",
      },
      {
        term: "OSI Model",
        why: "A 7-layer mental map for where every protocol and every attack technique 'lives'.",
        whyAr: "خريطة ذهنية من 7 طبقات لمعرفة أين يقع كل بروتوكول وكل تقنية هجوم.",
        relevance: "Used constantly to describe and troubleshoot attacks: 'that's a layer 2 attack (ARP spoofing)', etc.",
        relevanceAr: "يُستخدم باستمرار لوصف الهجمات وتشخيصها: 'هذا هجوم على الطبقة الثانية (ARP spoofing)'، إلخ.",
      },
    ],
    whyMatters:
      "You cannot do penetration testing, threat hunting, or SOC analysis without reading network traffic fluently. Networking is the shared language of almost every specialization.",
    whyMattersAr:
      "لا يمكنك القيام باختبار الاختراق أو صيد التهديدات أو تحليل SOC دون القدرة على قراءة حركة مرور الشبكة بطلاقة. الشبكات هي اللغة المشتركة لمعظم التخصصات.",
    readyWhen: [
      "You can explain the difference between TCP and UDP",
      "You can subnet a /24 network by hand",
      "You understand what happens during a DNS lookup",
      "You can describe what a firewall does at a basic level",
    ],
    readyWhenAr: [
      "تستطيع شرح الفرق بين TCP وUDP",
      "تستطيع تقسيم شبكة /24 يدويًا",
      "تفهم ما يحدث أثناء طلب بحث DNS",
      "تستطيع وصف عمل جدار الحماية بشكل أساسي",
    ],
    freeResources: ["cisco-skills-for-all", "sans-cyber-aces"],
    practice: [
      "Capture your own traffic with Wireshark and identify a DNS request",
      "Practice subnetting exercises until they're fast and automatic",
      "Set up a home lab network with two VMs and ping between them",
    ],
    practiceAr: [
      "التقط حركة مرورك الخاصة باستخدام Wireshark وحدد طلب DNS",
      "تدرب على تمارين تقسيم الشبكات حتى تصبح سريعة وتلقائية",
      "أنشئ شبكة مختبر منزلي بجهازين افتراضيين وقم بعمل ping بينهما",
    ],
    mistakes: [
      "Memorizing port numbers without understanding what runs on them",
      "Skipping subnetting practice — it comes up constantly in real work",
      "Treating the OSI model as trivia instead of a diagnostic tool",
    ],
    mistakesAr: [
      "حفظ أرقام المنافذ دون فهم ما يعمل عليها",
      "تجاهل التدرب على تقسيم الشبكات — يظهر باستمرار في العمل الفعلي",
      "التعامل مع نموذج OSI كمعلومة عامة بدلاً من أداة تشخيصية",
    ],
    nextStageSlug: "operating-systems",
  },
  {
    slug: "operating-systems",
    order: 3,
    title: "Operating Systems",
    titleAr: "أنظمة التشغيل",
    tagline: "Windows and Linux administration — the environments you'll defend and attack.",
    taglineAr: "إدارة Windows وLinux — البيئات التي ستدافع عنها وتهاجمها.",
    intro:
      "Nearly every target, server, and analyst workstation runs Windows or Linux. This stage builds real administrative fluency in both before you specialize.",
    introAr:
      "كل هدف وخادم ومحطة عمل محلل تقريبًا تعمل بنظام Windows أو Linux. تبني هذه المرحلة إتقانًا إداريًا حقيقيًا في كليهما قبل التخصص.",
    topics: [
      { group: "Core Concepts", groupAr: "مفاهيم أساسية", items: ["Users", "Permissions", "Processes", "Services", "Filesystems", "Networking"] },
      { group: "Operations", groupAr: "العمليات التشغيلية", items: ["Command line", "Logs", "Security controls", "System administration basics"] },
    ],
    concepts: [
      {
        term: "Users & Permissions",
        why: "Both OSes are built around who can do what — administrators/root vs. standard users.",
        whyAr: "كلا النظامين مبنيان على من يستطيع فعل ماذا — المسؤولون/root مقابل المستخدمين العاديين.",
        relevance: "Privilege escalation on Windows and Linux is one of the most tested skills in offensive certifications.",
        relevanceAr: "تصعيد الصلاحيات على Windows وLinux من أكثر المهارات اختبارًا في الشهادات الهجومية.",
      },
      {
        term: "Logs",
        why: "Systems record what happens — logins, errors, service starts — as a timestamped trail.",
        whyAr: "تسجل الأنظمة ما يحدث — تسجيلات الدخول، الأخطاء، بدء الخدمات — كسجل زمني.",
        relevance: "SOC analysts and DFIR investigators live inside log files (Event Viewer, syslog, auth.log).",
        relevanceAr: "يعيش محللو SOC ومحققو DFIR داخل ملفات السجلات (Event Viewer، syslog، auth.log).",
      },
      {
        term: "Services",
        why: "Background programs (like a web server or SSH daemon) that run without direct user interaction.",
        whyAr: "برامج تعمل في الخلفية (مثل خادم ويب أو SSH) دون تفاعل مباشر من المستخدم.",
        relevance: "Misconfigured or outdated services are one of the most common initial attack vectors.",
        relevanceAr: "الخدمات المُهيأة بشكل خاطئ أو القديمة من أكثر نقاط الهجوم الأولية شيوعًا.",
      },
    ],
    whyMatters:
      "Security work is, in large part, OS administration under adversarial conditions. You can't secure — or break into — a system you don't know how to operate.",
    whyMattersAr:
      "العمل الأمني هو، إلى حد كبير، إدارة أنظمة تشغيل في ظروف عدائية. لا يمكنك تأمين — أو اختراق — نظام لا تعرف كيفية تشغيله.",
    readyWhen: [
      "You can create/manage users and permissions on both Windows and Linux",
      "You know how to check running services and processes on both",
      "You can locate and read basic system logs",
    ],
    readyWhenAr: [
      "تستطيع إنشاء وإدارة المستخدمين والصلاحيات على Windows وLinux",
      "تعرف كيفية فحص الخدمات والعمليات قيد التشغيل على كليهما",
      "تستطيع تحديد وقراءة سجلات النظام الأساسية",
    ],
    freeResources: ["sans-cyber-aces", "cisco-skills-for-all"],
    practice: [
      "Set up a Windows VM and a Linux VM side by side",
      "Create three users with different permission levels on each",
      "Find and read the authentication log on Linux and the Security log in Event Viewer on Windows",
    ],
    practiceAr: [
      "أنشئ جهازًا افتراضيًا بنظام Windows وآخر بنظام Linux جنبًا إلى جنب",
      "أنشئ ثلاثة مستخدمين بصلاحيات مختلفة على كل نظام",
      "ابحث عن سجل المصادقة على Linux وسجل الأمان في Event Viewer على Windows واقرأهما",
    ],
    mistakes: [
      "Only learning Linux and ignoring Windows (most corporate environments are Windows-heavy)",
      "Never looking at logs until forced to in a course",
      "Treating the command line as optional when it's central to both OSes",
    ],
    mistakesAr: [
      "تعلّم Linux فقط وتجاهل Windows (معظم بيئات الشركات تعتمد على Windows بشكل كبير)",
      "عدم النظر إلى السجلات إطلاقًا حتى تُفرض في دورة ما",
      "التعامل مع سطر الأوامر كأمر اختياري رغم أنه أساسي في كلا النظامين",
    ],
    nextStageSlug: "linux-windows-cli",
  },
  {
    slug: "linux-windows-cli",
    order: 4,
    title: "Linux & Windows Command Line",
    titleAr: "سطر أوامر Linux وWindows",
    tagline: "The interface every security professional lives in.",
    taglineAr: "الواجهة التي يعيش فيها كل محترف أمني.",
    intro:
      "The goal here is not to memorize every command — it's to build the baseline comfort with the command line required before entering any specialization.",
    introAr:
      "الهدف هنا ليس حفظ كل أمر — بل بناء الراحة الأساسية مع سطر الأوامر المطلوبة قبل الدخول في أي تخصص.",
    topics: [
      { group: "Linux", groupAr: "لينكس", items: ["Terminal", "Filesystem hierarchy", "Permissions", "Users & groups", "Processes", "Services", "Networking", "Package management", "Logs", "SSH"] },
      { group: "Windows", groupAr: "ويندوز", items: ["CMD", "PowerShell", "Users", "Services", "Processes", "Event Viewer", "Windows networking", "Active Directory (introduction)"] },
    ],
    concepts: [
      {
        term: "SSH",
        why: "The standard secure way to remotely access and administer Linux systems.",
        whyAr: "الطريقة الآمنة القياسية للوصول عن بُعد وإدارة أنظمة Linux.",
        relevance: "SSH key abuse, brute-forcing, and pivoting through SSH are common in both offense and defense.",
        relevanceAr: "استغلال مفاتيح SSH، والقوة الغاشمة، والتنقل عبر SSH شائعة في كل من الهجوم والدفاع.",
      },
      {
        term: "PowerShell",
        why: "A powerful scripting shell built deeply into modern Windows administration.",
        whyAr: "صدفة برمجية قوية مدمجة بعمق في إدارة Windows الحديثة.",
        relevance: "The single most common tool for both Windows automation and post-exploitation ('living off the land').",
        relevanceAr: "الأداة الأكثر استخدامًا لكل من أتمتة Windows والاستغلال اللاحق (living off the land).",
      },
      {
        term: "Active Directory (intro)",
        why: "The directory service most enterprises use to manage users, computers, and permissions centrally.",
        whyAr: "خدمة الدليل التي تستخدمها معظم الشركات لإدارة المستخدمين والأجهزة والصلاحيات مركزيًا.",
        relevance: "AD is the backbone of most red team engagements against enterprise networks.",
        relevanceAr: "AD هو العمود الفقري لمعظم عمليات الفريق الأحمر ضد شبكات الشركات.",
      },
    ],
    whyMatters:
      "Almost every real-world security tool is either a command-line tool itself or is best automated from one. Comfort here compounds into speed later.",
    whyMattersAr:
      "معظم الأدوات الأمنية الحقيقية إما أدوات سطر أوامر أو يُفضّل أتمتتها منه. الراحة هنا تتراكم لتصبح سرعة لاحقًا.",
    readyWhen: [
      "You can navigate, create, move, and permission files from the Linux terminal without a GUI",
      "You can check running processes and services from PowerShell and CMD",
      "You know what Active Directory is used for, even without hands-on AD experience yet",
    ],
    readyWhenAr: [
      "تستطيع التنقل وإنشاء ونقل وضبط صلاحيات الملفات من طرفية Linux دون واجهة رسومية",
      "تستطيع فحص العمليات والخدمات قيد التشغيل من PowerShell وCMD",
      "تعرف الغرض من Active Directory، حتى دون خبرة عملية مباشرة بعد",
    ],
    freeResources: ["kali-linux-docs", "sans-cyber-aces"],
    practice: [
      "Complete a full day using only the Linux terminal (no file manager GUI)",
      "Write a simple PowerShell script that lists running processes",
      "SSH into a lab VM and manage a service from the command line",
    ],
    practiceAr: [
      "اقضِ يومًا كاملاً باستخدام طرفية Linux فقط (دون واجهة رسومية لإدارة الملفات)",
      "اكتب سكربت PowerShell بسيط يعرض العمليات قيد التشغيل",
      "اتصل عبر SSH بجهاز افتراضي في المختبر وأدر خدمة من سطر الأوامر",
    ],
    mistakes: [
      "Avoiding the terminal in favor of GUIs whenever possible",
      "Learning Linux commands but never touching PowerShell",
      "Skipping Active Directory basics — it shows up in almost every red/blue team job",
    ],
    mistakesAr: [
      "تجنّب الطرفية لصالح الواجهات الرسومية كلما أمكن",
      "تعلّم أوامر Linux دون لمس PowerShell إطلاقًا",
      "تجاهل أساسيات Active Directory — تظهر في معظم وظائف الفريق الأحمر والأزرق",
    ],
    nextStageSlug: "cybersecurity-fundamentals",
  },
  {
    slug: "cybersecurity-fundamentals",
    order: 5,
    title: "Cybersecurity Fundamentals",
    titleAr: "أساسيات الأمن السيبراني",
    tagline: "The core concepts every specialization builds on.",
    taglineAr: "المفاهيم الأساسية التي يُبنى عليها كل تخصص.",
    intro:
      "This is the bridge between general IT knowledge and a security specialization. Every certification, every job posting, and every roadmap assumes you know this module.",
    introAr:
      "هذه هي الجسر بين معرفة تقنية المعلومات العامة والتخصص الأمني. كل شهادة وكل إعلان وظيفي وكل خارطة طريق تفترض أنك تعرف هذه الوحدة.",
    topics: [
      {
        group: "Core Security Concepts",
        groupAr: "المفاهيم الأمنية الأساسية",
        items: ["CIA Triad", "Authentication", "Authorization", "Access Control", "Encryption", "Hashing"],
      },
      {
        group: "Threat Landscape",
        groupAr: "بيئة التهديدات",
        items: ["Vulnerabilities", "Threats", "Risk", "Exploits", "Malware", "Social Engineering"],
      },
      {
        group: "Operations",
        groupAr: "العمليات الأمنية",
        items: ["Security Controls", "Logging", "Monitoring", "Incident Response", "Basic defensive concepts", "Basic offensive concepts"],
      },
    ],
    concepts: [
      {
        term: "CIA Triad",
        why: "Confidentiality, Integrity, and Availability are the three goals almost every security control exists to protect.",
        whyAr: "السرية والسلامة والتوافر هي الأهداف الثلاثة التي يوجد من أجلها كل ضابط أمني تقريبًا.",
        relevance: "Every incident, control, and risk assessment gets mapped back to which part of the triad was affected.",
        relevanceAr: "كل حادثة وضابط وتقييم مخاطر يُربط بأي جزء من الثالوث تأثر.",
      },
      {
        term: "Risk",
        why: "Risk = likelihood × impact. Security decisions are ultimately about managing risk, not eliminating it.",
        whyAr: "المخاطرة = الاحتمالية × التأثير. القرارات الأمنية تتعلق في النهاية بإدارة المخاطر لا إزالتها بالكامل.",
        relevance: "GRC roles are built entirely around identifying, assessing, and treating risk.",
        relevanceAr: "أدوار GRC مبنية بالكامل على تحديد المخاطر وتقييمها ومعالجتها.",
      },
      {
        term: "Social Engineering",
        why: "Manipulating people rather than systems is often the easiest way to breach an organization.",
        whyAr: "التلاعب بالأشخاص بدلاً من الأنظمة غالبًا ما يكون الطريقة الأسهل لاختراق المؤسسة.",
        relevance: "Phishing simulations, red team engagements, and security awareness training all center on this.",
        relevanceAr: "محاكاة التصيّد وعمليات الفريق الأحمر وبرامج التوعية الأمنية تتمحور جميعها حول هذا الموضوع.",
      },
      {
        term: "Incident Response",
        why: "A structured process for detecting, containing, and recovering from a security incident.",
        whyAr: "عملية منظمة للكشف عن الحوادث الأمنية واحتوائها والتعافي منها.",
        relevance: "The entire blue-team/DFIR career track is essentially a deep specialization in this one concept.",
        relevanceAr: "مسار الفريق الأزرق وDFIR بأكمله هو في جوهره تخصص عميق في هذا المفهوم الواحد.",
      },
    ],
    whyMatters:
      "This module is the last shared step before every learner's path splits. It's what lets a red teamer and a GRC analyst still understand each other's work.",
    whyMattersAr:
      "هذه الوحدة هي آخر خطوة مشتركة قبل أن ينقسم مسار كل متعلم. وهي ما يسمح لعضو الفريق الأحمر ومحلل GRC بفهم عمل بعضهما البعض.",
    readyWhen: [
      "You can explain the CIA triad with a real example for each letter",
      "You can distinguish a vulnerability from a threat from a risk",
      "You understand the basic incident response lifecycle",
      "You feel ready to choose a specialization",
    ],
    readyWhenAr: [
      "تستطيع شرح ثالوث CIA بمثال حقيقي لكل عنصر",
      "تستطيع التمييز بين الثغرة والتهديد والمخاطرة",
      "تفهم دورة حياة الاستجابة للحوادث الأساسية",
      "تشعر بالاستعداد لاختيار تخصص",
    ],
    freeResources: ["google-cybersecurity-cert", "owasp-top-10"],
    practice: [
      "Write your own one-paragraph explanation of the CIA triad using a real breach example",
      "Research one recent breach and identify the vulnerability, threat actor, and impact",
      "Walk through a sample incident response tabletop scenario",
    ],
    practiceAr: [
      "اكتب شرحًا خاصًا بك من فقرة واحدة لثالوث CIA باستخدام مثال اختراق حقيقي",
      "ابحث عن اختراق حديث وحدد الثغرة والجهة المهاجمة والتأثير",
      "مرّ بسيناريو تمرين طاولة للاستجابة للحوادث",
    ],
    mistakes: [
      "Rushing to a specialization before these concepts are solid",
      "Treating this as pure theory instead of connecting it to real incidents",
      "Skipping social engineering because it 'isn't technical'",
    ],
    mistakesAr: [
      "التسرع في اختيار تخصص قبل ترسيخ هذه المفاهيم",
      "التعامل مع هذا كنظرية بحتة دون ربطها بحوادث حقيقية",
      "تجاهل الهندسة الاجتماعية لأنها 'ليست تقنية بما يكفي'",
    ],
    nextStageSlug: "specialization",
  },
];

export const foundationStageBySlug = (slug: string) => foundationStages.find((s) => s.slug === slug);
