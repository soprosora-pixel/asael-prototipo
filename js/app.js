(() => {
  const view = document.getElementById("view");
  const appEl = document.getElementById("app");

  const svg = (d, box = "0 0 24 24") =>
    `<svg viewBox="${box}" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const ic = {
    back: svg(`<path d="M15 18l-6-6 6-6"/>`),
    bell: svg(`<path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/>`),
    home: svg(`<path d="M3 11l9-8 9 8v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>`),
    calendar: svg(`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>`),
    wallet: svg(`<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="15" r="1.4" fill="currentColor" stroke="none"/>`),
    user: svg(`<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>`),
    shield: svg(`<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>`),
    door: svg(`<path d="M14 3H6a1 1 0 00-1 1v16h10V4a1 1 0 00-1-1z"/><path d="M15 21V8h4v13"/><path d="M10 12h.01"/>`),
    flame: svg(`<path d="M12 3s4 5 4 9a4 4 0 11-8 0c0-2 1.5-5 4-9z"/><path d="M12 16a2 2 0 002-2c0-1-2-3-2-3s-2 2-2 3a2 2 0 002 2z"/>`),
    spark: svg(`<path d="M5 12h3l2-7 2 14 2-7h3"/>`),
    plus: svg(`<path d="M12 5v14M5 12h14"/>`),
    pin: svg(`<path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/>`),
    clock: svg(`<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>`),
    camera: svg(`<path d="M4 8h3l2-2h6l2 2h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>`),
    check: svg(`<path d="M5 13l4 4L19 7"/>`),
    chevron: svg(`<path d="M9 6l6 6-6 6"/>`),
    brief: svg(`<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>`),
    people: svg(`<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0"/><circle cx="17" cy="9" r="2.3"/><path d="M17 13a5 5 0 014 7"/>`),
    star: svg(`<path d="M12 3l2.4 5.7L21 9.5l-4.5 4 1.2 6.5L12 17.3 6.3 20l1.2-6.5L3 9.5l6.6-.8z"/>`),
    alert: svg(`<path d="M12 8v5M12 16.5h.01"/><path d="M10.3 4.2L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.2a2 2 0 00-3.4 0z"/>`),
    close: svg(`<path d="M6 6l12 12M18 6L6 18"/>`),
    logout: svg(`<path d="M9 6H5v12h4M10 12h9M15 8l4 4-4 4"/>`),
    card: svg(`<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`),
    file: svg(`<path d="M13 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M13 3v5h5"/>`),
    info: svg(`<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7.5h.01"/>`),
    lock: svg(`<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>`),
    nurse: svg(`<circle cx="12" cy="8" r="3.2"/><path d="M4.5 20a7.5 7.5 0 0115 0"/><path d="M12 13v3M10.5 14.5h3"/>`),
    bag: svg(`<path d="M6 8h12l-1 13H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>`),
    trash: svg(`<path d="M4 7h16M9 7V5h6v2M8 7l1 13h6l1-13"/>`),
    search: svg(`<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>`),
    chat: svg(`<path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>`),
    send: svg(`<path d="M4 12l16-8-6 16-2-6-8-2z"/>`),
  };

  const CATS = [
    {
      id: "vigilancia", name: "Vigilante", short: "Vigilante",
      min: 20, rec: 20.5, cut: 2, legal: "vigilancia",
      docs: [
        { id: "cnv", title: "CNV (Carteira Nacional de Vigilante)", sub: "Dentro da validade" },
        { id: "rec-vig", title: "Certificado de reciclagem", sub: "Em dia, conforme a validade" },
        { id: "ant-vig", title: "Certidão de antecedentes criminais", sub: "Emitida recentemente" },
      ],
    },
    {
      id: "portaria", name: "Segurança e controle de acesso", short: "Controle de acesso",
      min: 14, rec: 16, cut: 2,
      docs: [
        { id: "rg-port", title: "RG e CPF", sub: "Documento oficial com foto" },
        { id: "ant-port", title: "Certidão de antecedentes criminais", sub: "Emitida recentemente" },
      ],
    },
    {
      id: "bombeiro", name: "Bombeiro civil", short: "Bombeiro civil",
      min: 18, rec: 18.5, cut: 2,
      docs: [
        { id: "nbr", title: "Certificado de formação — NBR 14608", sub: "Curso de bombeiro civil" },
        { id: "rec-bomb", title: "Certificado de reciclagem", sub: "Em dia" },
      ],
    },
    {
      id: "brigadista", name: "Brigadista", short: "Brigadista",
      min: 14, rec: 15, cut: 2,
      docs: [
        { id: "brig", title: "Certificado de brigada de incêndio", sub: "Conforme NBR 14276" },
      ],
    },
    {
      id: "limpeza", name: "Limpeza", short: "Limpeza",
      min: 13, rec: 14, cut: 2,
      docs: [
        { id: "rg-limp", title: "RG e CPF", sub: "Documento oficial com foto" },
        { id: "cv-limp", title: "Currículo ou experiência", sub: "Arquivo ou declaração" },
      ],
    },
    {
      id: "enfermagem", name: "Técnico de enfermagem", short: "Enfermagem",
      min: 18, rec: 22, cut: 2,
      docs: [
        { id: "coren", title: "COREN", sub: "Carteira profissional dentro da validade" },
        { id: "form-enf", title: "Diploma ou certificado de formação", sub: "Técnico ou superior em enfermagem" },
      ],
    },
  ];
  const catBy = (id) => CATS.find((c) => c.id === id);

  const CAT_ICON = {
    vigilancia: ic.shield,
    portaria: ic.door,
    bombeiro: ic.flame,
    brigadista: ic.alert,
    limpeza: ic.spark,
    enfermagem: ic.nurse,
  };

  const STATUS_LABEL = {
    aprovado: "Aprovado",
    "em-analise": "Em análise",
    pendente: "Pendente",
  };

  const USERS = {
    contratante: { name: "Eventos Aurora", roleLabel: "Contratante", city: "Joinville, SC", initials: "EA" },
    terceirizada: { name: "Sul Seguranças", roleLabel: "Empresa Terceirizada", city: "Joinville, SC", initials: "SS" },
    colaborador: { name: "Carlos Mendes", roleLabel: "Colaborador", city: "Joinville, SC", initials: "CM", avatar: "assets/avatars/avatar-carlos.webp", stars: 4.9 },
  };

  const TEAM = [
    { name: "Carlos Mendes", role: "Vigilante", stars: 4.9, avatar: "assets/avatars/avatar-carlos.webp", initials: "CM" },
    { name: "Ana Paula Souza", role: "Controle de acesso", stars: 4.8, avatar: "assets/avatars/avatar-ana.webp", initials: "AP" },
    { name: "Rafael Lima", role: "Bombeiro civil", stars: 5.0, avatar: "assets/avatars/avatar-rafael.webp", initials: "RL" },
    { name: "Lucas Ferreira", role: "Vigilante", stars: 4.7, avatar: "assets/avatars/avatar-lucas.webp", initials: "LF" },
    { name: "Juliana Costa", role: "Enfermagem", stars: 4.9, initials: "JC" },
    { name: "Bruno Alves", role: "Limpeza", stars: 4.6, initials: "BA" },
  ];

  const EVENTS = [
    {
      id: "expoville",
      title: "Show no Expoville",
      place: "Expoville",
      address: "Rua XV de Novembro, 4315 — América, Joinville, SC",
      when: "12 dez • 18h–06h",
      date: "12 de dezembro de 2026",
      dateISO: "2026-12-12",
      start: "18:00",
      end: "06:00",
      hours: 12,
      days: 1,
      photo: "assets/photos/noite.webp",
      status: "confirmado",
      functions: [
        { cat: "vigilancia", qty: 10, rate: 20.5 },
        { cat: "bombeiro", qty: 4, rate: 18.5 },
        { cat: "enfermagem", qty: 2, rate: 22 },
        { cat: "limpeza", qty: 6, rate: 14 },
      ],
    },
    {
      id: "mueller",
      title: "Black Friday no Shopping Mueller",
      place: "Shopping Mueller",
      address: "Rua Princesa Isabel, 438 — Centro, Joinville, SC",
      when: "27 nov • 10h–22h",
      date: "27 de novembro de 2026",
      dateISO: "2026-11-27",
      start: "10:00",
      end: "22:00",
      hours: 12,
      days: 1,
      photo: "assets/photos/portaria.webp",
      status: "aberto",
      functions: [{ cat: "portaria", qty: 8, rate: 16 }],
    },
    {
      id: "centreventos",
      title: "Congresso no Centreventos",
      place: "Centreventos Cau Hansen",
      address: "Av. José Vieira, 315 — América, Joinville, SC",
      when: "05 dez • 08h–20h",
      date: "5 de dezembro de 2026",
      dateISO: "2026-12-05",
      start: "08:00",
      end: "20:00",
      hours: 12,
      days: 2,
      photo: "assets/photos/conferencia.webp",
      status: "aberto",
      functions: [{ cat: "bombeiro", qty: 12, rate: 18.5 }],
    },
    {
      id: "atlantico",
      title: "Controle de acesso no Club Atlântico",
      place: "Club Atlântico",
      address: "Rua Visconde de Taunay, 890 — Bucarein, Joinville, SC",
      when: "28 nov • 22h–10h",
      date: "28 de novembro de 2026",
      dateISO: "2026-11-28",
      start: "22:00",
      end: "10:00",
      hours: 12,
      days: 1,
      photo: "assets/photos/balada.webp",
      status: "aberto",
      functions: [{ cat: "portaria", qty: 6, rate: 16 }],
    },
  ];

  const evFn = (ev, catId) => (ev.functions || []).find((f) => f.cat === catId) || ev.functions[0];
  const evTotalPeople = (ev) => (ev.functions || []).reduce((n, f) => n + f.qty, 0);
  const evCompanyTotal = (ev) =>
    (ev.functions || []).reduce((n, f) => n + f.rate * ev.hours * ev.days * f.qty, 0);

  const SHIFTS = [
    { id: "s1", event: "expoville", cat: "vigilancia", spots: 4, distance: "3,2 km" },
    { id: "s2", event: "mueller", cat: "portaria", spots: 3, distance: "1,8 km" },
    { id: "s3", event: "centreventos", cat: "bombeiro", spots: 5, distance: "2,4 km" },
    { id: "s4", event: "atlantico", cat: "portaria", spots: 2, distance: "4,1 km" },
    { id: "s5", event: "expoville", cat: "bombeiro", spots: 2, distance: "3,2 km" },
    { id: "s6", event: "expoville", cat: "limpeza", spots: 3, distance: "3,2 km" },
  ];

  const TX = [
    { title: "Plantão Expoville", date: "8 nov 2026", value: 216, type: "in" },
    { title: "Plantão Centreventos", date: "1 nov 2026", value: 198, type: "in" },
    { title: "Saque Pix", date: "2 nov 2026", value: -400, type: "out" },
    { title: "Plantão Shopping Mueller", date: "25 out 2026", value: 168, type: "in" },
  ];

  const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

  const COMPANIES_DIR = [
    { id: "sul", name: "Sul Seguranças", type: "terceirizada", city: "Joinville", uf: "SC", km: 2.1, vagas: 2, note: "Autorizada pela Polícia Federal" },
    { id: "aurora", name: "Eventos Aurora", type: "contratante", city: "Joinville", uf: "SC", km: 3.4, vagas: 1, note: "Eventos e produções" },
    { id: "porto", name: "Porto Seguro Eventos (demo)", type: "contratante", city: "Itajaí", uf: "SC", km: 42, vagas: 1, note: "Perfil demonstrativo" },
    { id: "serra", name: "Serra Guardiãs (demo)", type: "terceirizada", city: "Blumenau", uf: "SC", km: 55, vagas: 2, note: "Perfil demonstrativo" },
    { id: "capital", name: "Capital Eventos (demo)", type: "contratante", city: "Florianópolis", uf: "SC", km: 180, vagas: 1, note: "Perfil demonstrativo" },
    { id: "paulista", name: "Paulista Produções (demo)", type: "contratante", city: "São Paulo", uf: "SP", km: 530, vagas: 3, note: "Perfil demonstrativo" },
    { id: "litoral", name: "Litoral Festas (demo)", type: "contratante", city: "Curitiba", uf: "PR", km: 130, vagas: 1, note: "Perfil demonstrativo" },
  ];

  const COLABS_DIR = [
    { id: "carlos", name: "Carlos Mendes", initials: "CM", avatar: "assets/avatars/avatar-carlos.webp", segs: ["vigilancia","portaria"], stars: 4.9, city: "Joinville", uf: "SC", km: 3.2, avail: "disponivel" },
    { id: "ana", name: "Ana Paula Souza", initials: "AP", avatar: "assets/avatars/avatar-ana.webp", segs: ["portaria"], stars: 4.8, city: "Joinville", uf: "SC", km: 1.8, avail: "disponivel" },
    { id: "rafael", name: "Rafael Lima", initials: "RL", avatar: "assets/avatars/avatar-rafael.webp", segs: ["bombeiro"], stars: 5.0, city: "Joinville", uf: "SC", km: 4.1, avail: "plantao" },
    { id: "lucas", name: "Lucas Ferreira", initials: "LF", avatar: "assets/avatars/avatar-lucas.webp", segs: ["vigilancia"], stars: 4.7, city: "Joinville", uf: "SC", km: 5.6, avail: "disponivel" },
    { id: "juliana", name: "Juliana Costa", initials: "JC", segs: ["enfermagem"], stars: 4.9, city: "São José", uf: "SC", km: 175, avail: "disponivel" },
    { id: "bruno", name: "Bruno Alves", initials: "BA", segs: ["limpeza"], stars: 4.6, city: "Joinville", uf: "SC", km: 6.2, avail: "disponivel" },
    { id: "marina", name: "Marina Duarte (demo)", initials: "MD", segs: ["vigilancia","portaria"], stars: 4.5, city: "Blumenau", uf: "SC", km: 55, avail: "disponivel" },
    { id: "pedro", name: "Pedro Nunes (demo)", initials: "PN", segs: ["bombeiro","brigadista"], stars: 4.8, city: "Florianópolis", uf: "SC", km: 180, avail: "plantao" },
    { id: "camila", name: "Camila Rocha (demo)", initials: "CR", segs: ["portaria"], stars: 4.4, city: "Curitiba", uf: "PR", km: 130, avail: "disponivel" },
    { id: "thiago", name: "Thiago Lopes (demo)", initials: "TL", segs: ["vigilancia"], stars: 4.7, city: "São Paulo", uf: "SP", km: 530, avail: "disponivel" },
    { id: "fernanda", name: "Fernanda Dias (demo)", initials: "FD", segs: ["limpeza"], stars: 4.6, city: "Itajaí", uf: "SC", km: 42, avail: "disponivel" },
  ];

  const THREADS = [
    { id: "expoville-carlos", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "carlos", colabName: "Carlos Mendes", colabRole: "Vigilante", colabAvatar: "assets/avatars/avatar-carlos.webp", colabInitials: "CM" },
    { id: "expoville-ana", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "ana", colabName: "Ana Paula Souza", colabRole: "Controle de acesso", colabAvatar: "assets/avatars/avatar-ana.webp", colabInitials: "AP" },
    { id: "expoville-rafael", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "rafael", colabName: "Rafael Lima", colabRole: "Bombeiro civil", colabAvatar: "assets/avatars/avatar-rafael.webp", colabInitials: "RL" },
    { id: "mueller-carlos", eventId: "mueller", companyId: "aurora", companyName: "Eventos Aurora", companyType: "contratante", companyInitials: "EA", colabId: "carlos", colabName: "Carlos Mendes", colabRole: "Controle de acesso", colabAvatar: "assets/avatars/avatar-carlos.webp", colabInitials: "CM" },
    { id: "mueller-ana", eventId: "mueller", companyId: "aurora", companyName: "Eventos Aurora", companyType: "contratante", companyInitials: "EA", colabId: "ana", colabName: "Ana Paula Souza", colabRole: "Controle de acesso", colabAvatar: "assets/avatars/avatar-ana.webp", colabInitials: "AP" },
    { id: "expoville-lucas", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "lucas", colabName: "Lucas Ferreira", colabRole: "Vigilante", colabAvatar: "assets/avatars/avatar-lucas.webp", colabInitials: "LF" },
    { id: "expoville-juliana", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "juliana", colabName: "Juliana Costa", colabRole: "Enfermagem", colabInitials: "JC" },
    { id: "expoville-bruno", eventId: "expoville", companyId: "sul", companyName: "Sul Seguranças", companyType: "terceirizada", companyInitials: "SS", colabId: "bruno", colabName: "Bruno Alves", colabRole: "Limpeza", colabInitials: "BA" },
  ];

  const SEED_MSGS = {
    "expoville-carlos": [
      { from: "company", text: "Olá, Carlos. Confirmamos seu plantão no Expoville no dia 12 de dezembro, às 18h. O ponto de encontro é a entrada B.", time: "10:12" },
      { from: "colab", text: "Combinado. Chego às 17h40 com o uniforme.", time: "10:14" },
      { from: "company", text: "Perfeito. Qualquer ajuste, fale por aqui no app.", time: "10:15" },
    ],
    "expoville-ana": [
      { from: "company", text: "Ana, sua função no Expoville é controle de acesso na entrada principal.", time: "11:02" },
      { from: "colab", text: "Recebido. Estarei no horário.", time: "11:06" },
    ],
    "expoville-rafael": [
      { from: "company", text: "Rafael, você fica no posto de prevenção junto à palco B.", time: "09:40" },
    ],
    "mueller-carlos": [
      { from: "company", text: "Carlos, o plantão da Black Friday no Mueller começa às 10h, na porta da praça de alimentação.", time: "16:20" },
    ],
    "mueller-ana": [
      { from: "company", text: "Ana, confirmamos você no controle de acesso do Shopping Mueller.", time: "16:22" },
      { from: "colab", text: "Obrigada, estarei lá.", time: "16:30" },
    ],
    "expoville-lucas": [
      { from: "company", text: "Lucas, seu posto no Expoville é o estacionamento sul.", time: "11:20" },
    ],
    "expoville-juliana": [
      { from: "company", text: "Juliana, a tenda de enfermagem fica atrás do palco A.", time: "11:28" },
    ],
    "expoville-bruno": [
      { from: "company", text: "Bruno, a equipe de limpeza se reúne no apoio 2, às 17h30.", time: "11:31" },
    ],
  };

  function emptyEvent() {
    return {
      title: "Show no Expoville",
      address: "Rua XV de Novembro, 4315 — América, Joinville, SC",
      date: "2026-12-12",
      days: 1,
      hours: 12,
      start: "18:00",
      end: "06:00",
      place: "Expoville",
    };
  }

  function demoSegments() {
    return {
      vigilancia: "aprovado",
      portaria: "aprovado",
      bombeiro: "em-analise",
      brigadista: "pendente",
      limpeza: "pendente",
      enfermagem: "pendente",
    };
  }

  const state = {
    role: null,
    light: false,
    accountType: null,
    event: emptyEvent(),
    item: { cat: "vigilancia", qty: 10, rate: 20.5, acceptLow: false, start: "18:00", end: "06:00", hours: 12, days: 1, date: "2026-12-12" },
    cart: [],
    confirmed: [],
    segments: demoSegments(),
    signupSegs: ["vigilancia"],
    accepted: {},
    checkins: {},
    checkinPhoto: null,
    uploads: {},
    rating: 0,
    lastEvent: null,
    toast: null,
    simHours: 12,
    simDays: 1,
    shiftFilter: "all",
    paidEvents: {},
    messages: {},
    search: { mode: "perto", located: false, uf: "SC", q: "", seg: "all", avail: "all", minStars: 0 },
  };

  const brl = (n) =>
    (Number(n) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const brlH = (n) => `${brl(n)}/h`;
  function formatISO(iso) {
    const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || "";
  }
  const isColab = () => state.role === "colaborador";
  const isCompany = () => state.role === "contratante" || state.role === "terceirizada";
  const approvedSegs = () => CATS.filter((c) => state.segments[c.id] === "aprovado").map((c) => c.id);
  const cartPeople = () => state.cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = () => state.cart.reduce((n, i) => n + i.rate * i.hours * i.days * i.qty, 0);
  const isPaid = (eventId) => !!state.paidEvents[eventId];
  function myThreads() {
    if (isColab()) return THREADS.filter((th) => th.colabId === "carlos");
    if (state.role === "terceirizada") return THREADS.filter((th) => th.companyId === "sul");
    if (state.role === "contratante") return THREADS.filter((th) => th.companyId === "aurora");
    return [];
  }
  function threadById(id) {
    return THREADS.find((th) => th.id === id);
  }
  function threadMessages(id) {
    return state.messages[id] || [];
  }
  function seedChat(id) {
    if (!state.messages[id] || !state.messages[id].length) {
      state.messages[id] = (SEED_MSGS[id] || []).map((m) => ({ ...m }));
    }
  }
  function seedChatsForEvent(eventId) {
    THREADS.filter((th) => th.eventId === eventId).forEach((th) => seedChat(th.id));
  }
  function nowTime() {
    return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }
  function availLabel(a) {
    return a === "plantao" ? "Em plantão" : "Disponível";
  }
  function otherName(th) {
    return isColab() ? th.companyName : th.colabName;
  }
  function otherAvatar(th) {
    if (isColab()) return { initials: th.companyInitials, name: th.companyName };
    return { initials: th.colabInitials, avatar: th.colabAvatar, name: th.colabName };
  }
  function threadFor(eventId, colabName) {
    return THREADS.find((th) => th.eventId === eventId && th.colabName === colabName);
  }
  function eventById(id) {
    return EVENTS.find((e) => e.id === id);
  }
  function segsLabel(ids) {
    return (ids || []).map((id) => (catBy(id) || {}).short || id).join(" · ");
  }
  function typeLabel(type) {
    return type === "terceirizada" ? "Empresa terceirizada" : "Contratante";
  }
  function payableEvents() {
    const ids = [...new Set(myThreads().map((th) => th.eventId))];
    return EVENTS.filter((e) => ids.includes(e.id));
  }
  function markPaid(eventId) {
    if (!eventId) return;
    state.paidEvents[eventId] = true;
    seedChatsForEvent(eventId);
  }

  function stars(n) {
    const full = Math.round(n);
    return `<span class="stars" aria-label="${n.toFixed(1)} estrelas">${"★".repeat(full)}${"☆".repeat(5 - full)} ${n.toFixed(1)}</span>`;
  }

  function avatar(p, cls = "") {
    if (p.avatar) return `<img class="avatar ${cls}" src="${p.avatar}" alt="${p.name || ""}" />`;
    return `<div class="avatar ${cls}" aria-hidden="true">${p.initials || "?"}</div>`;
  }

  function parseRate(s) {
    if (typeof s === "number") return s;
    const t = String(s || "").trim().replace(/\s/g, "").replace("R$", "").replace(/\./g, "").replace(",", ".");
    const n = Number(t);
    return Number.isFinite(n) ? n : NaN;
  }

  function formatRateInput(n) {
    if (!Number.isFinite(n)) return "";
    return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function lineTotal(i) {
    return i.rate * i.hours * i.days * i.qty;
  }

  function rateLevel(cat, rate) {
    const c = typeof cat === "string" ? catBy(cat) : cat;
    if (rate < c.min) return "block";
    if (rate < c.rec) return "warn";
    return "ok";
  }

  function warningCopy(c, rate) {
    const rec = brlH(c.rec);
    const min = brlH(c.min);
    const level = rateLevel(c, rate);
    if (level === "block") {
      return `O valor está abaixo do mínimo de ${min} para ${c.short.toLowerCase()}. Ajuste o valor para continuar.`;
    }
    if (c.id === "vigilancia") {
      return `O valor está abaixo do recomendado de ${rec}. Valores mais baixos dificultam o preenchimento da vaga, podem gerar avaliações ruins dos colaboradores e chamam a atenção do sindicato da categoria. Deseja mesmo assim continuar?`;
    }
    return `O valor está abaixo do recomendado de ${rec}. Plantões com valor menor costumam demorar mais para preencher e podem gerar avaliações ruins. Deseja mesmo assim continuar?`;
  }

  function shiftPay(s) {
    const ev = EVENTS.find((e) => e.id === s.event);
    const c = catBy(s.cat);
    const fn = evFn(ev, s.cat);
    const rate = fn.rate;
    const netHour = Math.max(0, rate - c.cut);
    return { ev, c, rate, cut: c.cut, netHour, hours: ev.hours, days: ev.days, gross: rate * ev.hours, fee: c.cut * ev.hours, net: netHour * ev.hours };
  }

  /* ------------ router ------------ */
  let navDir = "left";
  function path() {
    const h = (location.hash || "#/splash").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean);
    return { parts, name: parts[0] || "splash", id: parts[1] };
  }

  function go(to, { replace = false, dir = "left" } = {}) {
    navDir = dir;
    const hash = to.startsWith("#") ? to : `#${to}`;
    if (replace) history.replaceState({ dir }, "", hash);
    else {
      if (location.hash === hash) {
        render();
        return;
      }
      history.pushState({ dir }, "", hash);
    }
    render();
  }

  window.addEventListener("popstate", () => {
    navDir = "right";
    render();
  });
  window.addEventListener("hashchange", () => {
    navDir = "left";
    render();
  });

  let toastTimer = null;
  function flashToast(msg) {
    state.toast = msg;
    state.keepToast = true;
  }

  function render() {
    appEl.classList.toggle("light", state.light);
    const p = path();
    if (!state.keepToast) state.toast = null;
    state.keepToast = false;
    view.innerHTML = route(p);
    bind(p);
    if (state.toast) {
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        state.toast = null;
        const el = view.querySelector(".toast");
        if (el) el.remove();
      }, 2400);
    }
  }

  function route(p) {
    switch (p.name) {
      case "splash": return renderSplash();
      case "onboarding": return renderOnboard();
      case "welcome": return renderWelcome();
      case "login": return renderLogin();
      case "tipo": return renderTipo();
      case "cadastro": return renderCadastro(p.id);
      case "verificacao": return renderVerificacao();
      case "demo": return renderDemo();
      case "home": return renderHome();
      case "solicitar": return renderSolicitar(p.id || "evento");
      case "evento": return renderEvento(p.id);
      case "vaga": return renderVaga(p.id);
      case "checkin": return renderCheckin(p.id);
      case "plantoes": return renderPlantoes();
      case "carteira": return renderCarteira();
      case "pagamentos": return renderPagamentos();
      case "avaliar": return renderAvaliar(p.id);
      case "perfil": return renderPerfil();
      case "segmentos": return renderSegmentos();
      case "busca": return renderBusca();
      case "conversas": return renderConversas();
      case "chat": return renderChat(p.id);
      default: return renderSplash();
    }
  }

  const anim = () => (navDir === "right" ? "slide-right" : navDir === "none" ? "" : "slide-left");

  function cartBtn() {
    if (!isCompany()) return `<span style="width:40px"></span>`;
    const n = state.cart.length;
    return `<button class="icon-btn cart-btn" data-go="#/solicitar/carrinho" aria-label="Carrinho do evento">${ic.bag}${n ? `<span class="cart-badge">${n}</span>` : ""}</button>`;
  }

  function topbar(title, backTo, withCart = false) {
    return `<header class="topbar">
      ${backTo ? `<button class="icon-btn" data-go="${backTo}" data-dir="right" aria-label="Voltar">${ic.back}</button>` : `<span style="width:40px"></span>`}
      <div class="head-title">${title}</div>
      ${withCart ? cartBtn() : `<span style="width:40px"></span>`}
    </header>`;
  }

  function protoBtn() {
    if (!state.role) return "";
    return `<button class="proto-bar" data-go="#/demo" type="button">Protótipo · trocar perfil</button>`;
  }

  function headerActions() {
    const locked = myThreads().filter((th) => !isPaid(th.eventId)).length;
    const unlocked = myThreads().filter((th) => isPaid(th.eventId)).length;
    const badgeN = unlocked || locked;
    const badge = badgeN ? `<span class="cart-badge">${badgeN}</span>` : "";
    return `<div class="header-actions">
      <button class="icon-btn" data-go="#/busca" aria-label="Buscar">${ic.search}</button>
      <button class="icon-btn cart-btn" data-go="#/conversas" aria-label="Conversas">${ic.chat}${badge}</button>
      ${isCompany() ? cartBtn() : `<button class="icon-btn" aria-label="Notificações">${ic.bell}</button>`}
    </div>`;
  }

  function searchEntry() {
    const ph = isColab() ? "Buscar empresas e vagas..." : "Buscar colaboradores disponíveis...";
    return `<button class="search-entry" data-go="#/busca" type="button">${ic.search} ${ph}</button>`;
  }

  function tabbar(active) {
    const items = isColab()
      ? [
          ["home", "Início", ic.home, "#/home"],
          ["plantoes", "Plantões", ic.calendar, "#/plantoes"],
          ["carteira", "Carteira", ic.wallet, "#/carteira"],
          ["perfil", "Perfil", ic.user, "#/perfil"],
        ]
      : [
          ["home", "Início", ic.home, "#/home"],
          ["plantoes", "Plantões", ic.calendar, "#/plantoes"],
          ["pagamentos", "Pagamentos", ic.card, "#/pagamentos"],
          ["perfil", "Perfil", ic.user, "#/perfil"],
        ];
    return `<nav class="tabbar">${items
      .map(
        ([id, label, icon, href]) =>
          `<button class="${active === id ? "active" : ""}" data-go="${href}" data-dir="none">${icon}<span>${label}</span></button>`
      )
      .join("")}</nav>`;
  }

  function toastEl() {
    return state.toast ? `<div class="toast">${state.toast}</div>` : "";
  }

  function benefits(items) {
    return `<div class="benefits">${items
      .map(
        (b) => `<div class="benefit"><div class="ico">${b.icon}</div><div><b>${b.t}</b><p>${b.d}</p></div></div>`
      )
      .join("")}</div>`;
  }

  function statusBadge(st) {
    const cls = st === "aprovado" ? "badge-ok" : st === "em-analise" ? "badge-warn" : "badge-muted";
    return `<span class="badge ${cls}">${STATUS_LABEL[st] || "Pendente"}</span>`;
  }

  /* ------------ screens: intro ------------ */
  function renderSplash() {
    return `<section class="screen splash">
      <img src="assets/logos/logo.webp" alt="Asael" />
      <p>CONECTANDO EMPRESAS E PROFISSIONAIS</p>
    </section>`;
  }

  function renderOnboard() {
    const slides = [
      {
        img: "assets/photos/onboard-1.webp",
        k: "Como funciona",
        t: "Colaboradores verificados, na hora que você precisa",
        d: "A contratante monta a equipe, os colaboradores aceitam no app e o check-in é feito com foto e GPS. Tudo no mesmo lugar.",
      },
      {
        img: "assets/photos/onboard-2.webp",
        k: "Para contratantes e empresas terceirizadas",
        t: "Monte a equipe completa do evento em minutos",
        d: "Adicione vigilantes, bombeiros, enfermagem e limpeza no mesmo pedido, com um único pagamento pelo app.",
      },
      {
        img: "assets/photos/onboard-3.webp",
        k: "Para o colaborador",
        t: "Mais segmentos, mais oportunidades",
        d: "Habilite as funções para as quais você tem curso, veja o valor líquido antes de aceitar e receba na conta Asael.",
      },
      {
        img: "assets/photos/onboard-4.webp",
        k: "Pagamento seguro",
        t: "Só existe pagamento dentro do app",
        d: "O Pix vai para a chave Asael do colaborador. Quem pagar ou receber por fora é banido — dos dois lados.",
      },
    ];
    return `<section class="screen onboard">
      <button class="skip" data-go="#/welcome">Pular</button>
      <img class="brand-mark" src="assets/logos/icon.webp" alt="" />
      <div class="onboard-track" id="track">
        ${slides
          .map(
            (s) => `<article class="slide">
            <img src="${s.img}" alt="" />
            <div class="shade"></div>
            <div class="copy">
              <div class="kicker">${s.k}</div>
              <h2>${s.t}</h2>
              <p>${s.d}</p>
            </div>
          </article>`
          )
          .join("")}
      </div>
      <div class="onboard-footer">
        <div class="dots" id="dots">${slides.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("")}</div>
        <button class="btn btn-primary" id="nextSlide">Continuar</button>
      </div>
    </section>`;
  }

  function renderWelcome() {
    return `<section class="screen ${anim()}">
      <div class="scroll" style="display:flex;flex-direction:column">
        <div style="padding: calc(28px + var(--safe-t)) 24px 0; text-align:center">
          <img class="logo-hero" src="assets/logos/logo.webp" alt="Asael" />
          <h1 style="font-size:26px;margin:8px 0 8px">Colaboradores verificados, na hora que você precisa</h1>
          <p class="muted" style="font-size:15px;line-height:1.45">Conectamos contratantes, empresas terceirizadas e colaboradores em Santa Catarina, com pagamento seguro dentro do app.</p>
        </div>
        <div style="flex:1;min-height:16px"></div>
        <div style="padding: 0 20px calc(24px + var(--safe-b))">
          <div class="btn-row">
            <button class="btn btn-primary" data-go="#/tipo">Criar conta</button>
            <button class="btn btn-secondary" data-go="#/login">Entrar</button>
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderLogin() {
    return `<section class="screen ${anim()}">
      ${topbar("Entrar", "#/welcome")}
      <div class="scroll pad">
        <p class="muted small" style="margin-bottom:18px">Este é um protótipo. Qualquer e-mail e senha abrem o app.</p>
        <div class="field"><label>E-mail</label><input type="email" value="abel@eventosaurora.com.br" autocomplete="username" /></div>
        <div class="field"><label>Senha</label><input type="password" value="••••••••" autocomplete="current-password" /></div>
        <button class="btn btn-primary" data-go="#/demo" style="margin-top:8px">Entrar</button>
        <button class="btn btn-ghost" data-go="#/tipo">Criar uma conta</button>
      </div>
    </section>`;
  }

  function renderTipo() {
    const types = [
      { id: "colaborador", icon: ic.people, t: "Colaborador", d: "Vigilante, bombeiro civil, segurança e controle de acesso, brigadista, limpeza ou enfermagem. Dá para habilitar mais de um segmento." },
      { id: "terceirizada", icon: ic.shield, t: "Empresa Terceirizada", d: "Empresa de segurança autorizada pela Polícia Federal. Publica vagas de vigilância e completa a equipe do evento." },
      { id: "contratante", icon: ic.brief, t: "Contratante", d: "Eventos, mercados, baladas e comércios que precisam montar uma equipe pelo app." },
    ];
    const sel = state.accountType;
    return `<section class="screen ${anim()}">
      ${topbar("Criar conta", "#/welcome")}
      <div class="scroll pad">
        <h1 style="font-size:26px;margin-bottom:6px">Como você vai usar o Asael?</h1>
        <p class="muted" style="margin-bottom:20px">Escolha o tipo de conta para começar.</p>
        ${types
          .map(
            (t) => `<button class="account-card ${sel === t.id ? "selected" : ""}" data-type="${t.id}">
            <div class="ico">${t.icon}</div>
            <div><h3>${t.t}</h3><p>${t.d}</p></div>
          </button>`
          )
          .join("")}
      </div>
      <div style="padding:12px 20px calc(20px + var(--safe-b))">
        <button class="btn btn-primary" id="tipoContinuar" ${sel ? "" : "disabled"}>Continuar</button>
      </div>
    </section>`;
  }

  function renderCadastro(step) {
    const t = state.accountType || "colaborador";
    if (t === "colaborador") return renderCadastroColab(step);
    const titles = {
      terceirizada: "Cadastro da Empresa Terceirizada",
      contratante: "Cadastro da Contratante",
    };
    const fields = `
      <div class="field"><label>Razão social</label><input id="f-nome" value="${t === "terceirizada" ? "Sul Seguranças Ltda" : "Eventos Aurora Ltda"}" /></div>
      <div class="field"><label>CNPJ</label><input id="f-cnpj" inputmode="numeric" value="${t === "terceirizada" ? "14.208.773/0001-61" : "38.441.902/0001-05"}" /></div>
      <div class="field"><label>Cidade</label><input value="Joinville, SC" /></div>
      <div class="field"><label>Telefone</label><input inputmode="tel" value="(47) 3433-1100" /></div>
      <div class="field"><label>E-mail corporativo</label><input type="email" value="${t === "terceirizada" ? "contato@sulsegurancas.com.br" : "abel@eventosaurora.com.br"}" /></div>
      ${
        t === "terceirizada"
          ? `${uploadBtn("pf", "Autorização da Polícia Federal", "Obrigatória para publicar vagas de vigilância")}
             ${uploadBtn("contrato", "Contrato social", "")}`
          : `${uploadBtn("contrato", "Contrato social ou CCMEI", "")}`
      }
    `;
    return `<section class="screen ${anim()}">
      ${topbar(titles[t], "#/tipo")}
      <div class="scroll pad">
        ${fields}
        <label class="check" style="margin: 8px 0 20px">
          <input type="checkbox" id="aceite" />
          <span>Li e aceito os Termos de Uso. Pagamentos fora do aplicativo, por qualquer conta que não seja a conta Asael, resultam no banimento da empresa e do colaborador.</span>
        </label>
        <button class="btn btn-primary" id="enviarCadastro" disabled>Enviar cadastro</button>
        <p class="help" style="text-align:center;margin-top:10px">Protótipo: os arquivos não são enviados a nenhum servidor.</p>
      </div>
    </section>`;
  }

  function renderCadastroColab(step) {
    const segs = state.signupSegs;
    if (step === "docs") {
      const selected = CATS.filter((c) => segs.includes(c.id));
      return `<section class="screen ${anim()}">
        ${topbar("Documentos por segmento", "#/cadastro")}
        <div class="scroll pad">
          <p class="muted small" style="margin-bottom:14px">Cada segmento tem a documentação própria. Quanto mais segmentos você habilitar, mais oportunidades de plantão.</p>
          ${selected
            .map(
              (c) => `<div style="margin-bottom:16px">
              <div class="tiny" style="margin-bottom:8px">${c.name}</div>
              ${c.docs.map((d) => uploadBtn(d.id, d.title, d.sub)).join("")}
            </div>`
            )
            .join("")}
          ${uploadBtn("selfie", "Selfie para conferência", "O rosto deve aparecer nítido, como no documento")}
          <label class="check" style="margin: 8px 0 20px">
            <input type="checkbox" id="aceite" />
            <span>Li e aceito os Termos de Uso. Receber o plantão fora da conta Asael resulta no banimento.</span>
          </label>
          <button class="btn btn-primary" id="enviarCadastro" disabled>Enviar cadastro</button>
        </div>
      </section>`;
    }
    return `<section class="screen ${anim()}">
      ${topbar("Cadastro do colaborador", "#/tipo")}
      <div class="scroll pad">
        <div class="field"><label>Nome completo</label><input id="f-nome" value="Carlos Mendes" /></div>
        <div class="field"><label>CPF</label><input id="f-cpf" inputmode="numeric" value="084.512.369-20" /></div>
        <div class="field"><label>Telefone</label><input id="f-tel" inputmode="tel" value="(47) 98821-3044" /></div>
        <div class="field"><label>E-mail</label><input id="f-email" type="email" value="carlos.mendes@email.com" /></div>
        <h2 style="font-size:18px;margin:8px 0 6px">Em quais segmentos você atua?</h2>
        <p class="muted small" style="margin-bottom:12px">Selecione todos os que tiver curso ou experiência. Mais segmentos, mais oportunidades de emprego — desde que o cadastro de cada um seja concluído.</p>
        ${CATS.map((c) => {
          const on = segs.includes(c.id);
          return `<button class="seg-card ${on ? "on" : ""}" type="button" data-toggleseg="${c.id}">
            <div class="box">${on ? ic.check : ""}</div>
            <div style="flex:1">
              <b style="font-size:14px">${c.name}</b>
              <p class="help">${c.docs.map((d) => d.title.split("—")[0].split("(")[0].trim()).join(" • ")}</p>
            </div>
            <div class="ico" style="width:36px;height:36px;border-radius:10px;background:var(--elevated);display:grid;place-items:center;color:var(--cta);flex-shrink:0">${CAT_ICON[c.id]}</div>
          </button>`;
        }).join("")}
        <button class="btn btn-primary" id="segNext" style="margin:12px 0 20px" ${segs.length ? "" : "disabled"}>Continuar para os documentos</button>
      </div>
    </section>`;
  }

  function uploadBtn(id, title, sub) {
    const done = state.uploads[id];
    return `<button class="upload ${done ? "done" : ""}" type="button" data-upload="${id}" style="margin-bottom:8px">
      <div class="ico">${done ? ic.check : ic.file}</div>
      <div style="flex:1">
        <b style="font-size:14px;display:block">${title}</b>
        <span class="help">${done ? done : sub || "Toque para anexar (simulado)"}</span>
      </div>
    </button>`;
  }

  function renderVerificacao() {
    const t = state.accountType || "colaborador";
    const msg = {
      colaborador: "Vamos conferir seus documentos em cada segmento cadastrado. Isso costuma levar até 24 horas por função.",
      terceirizada: "Vamos conferir o CNPJ e a autorização da Polícia Federal. Isso costuma levar até 24 horas.",
      contratante: "Vamos conferir o CNPJ da contratante. Isso costuma levar até 24 horas.",
    };
    return `<section class="screen ${anim()}">
      <div class="scroll pad" style="text-align:center;padding-top:calc(48px + var(--safe-t))">
        <div class="success-mark" style="background:rgba(0,212,255,0.12);color:var(--cta)">
          <span class="spinner" style="width:36px;height:36px;border-width:3px"></span>
        </div>
        <h1 style="font-size:26px;margin-bottom:8px">Cadastro em verificação</h1>
        <p class="muted" style="line-height:1.5">${msg[t]}</p>
        <div class="notice" style="text-align:left;margin:24px 0">Enquanto isso, você pode explorar o protótipo e ver como fica o aplicativo para cada tipo de conta — com dados fictícios de Joinville.</div>
        <button class="btn btn-primary" data-go="#/demo">Explorar o protótipo</button>
      </div>
    </section>`;
  }

  function renderDemo() {
    const cards = [
      { id: "contratante", t: "Contratante", d: "Eventos Aurora — montar a equipe completa do evento, com carrinho de funções e pagamento pelo app.", icon: ic.brief },
      { id: "terceirizada", t: "Empresa Terceirizada", d: "Sul Seguranças — publicar vigilância com autorização da PF e completar a equipe.", icon: ic.shield },
      { id: "colaborador", t: "Colaborador", d: "Carlos Mendes — segmentos, plantões, check-in com foto e simulador de ganhos na carteira Asael.", icon: ic.people },
    ];
    return `<section class="screen ${anim()}">
      ${topbar("Ver o app", "#/welcome")}
      <div class="scroll pad">
        <h1 style="font-size:24px;margin-bottom:6px">Escolha um perfil para explorar</h1>
        <p class="muted" style="margin-bottom:18px">Tudo aqui é demonstração, com dados fictícios. Você pode trocar de perfil a qualquer momento.</p>
        ${cards
          .map(
            (c) => `<button class="demo-card" data-role="${c.id}">
            <div class="ico" style="width:48px;height:48px;border-radius:14px;background:var(--elevated);display:grid;place-items:center;color:var(--cta);flex-shrink:0">${c.icon}</div>
            <div><h3>${c.t}</h3><p>${c.d}</p></div>
          </button>`
          )
          .join("")}
      </div>
    </section>`;
  }

  function renderHome() {
    if (isColab()) return renderHomeColab();
    return renderHomeEmpresa();
  }

  function companyBenefits() {
    const terc = state.role === "terceirizada";
    return benefits(
      terc
        ? [
            { icon: ic.shield, t: "Vigilância com autorização da PF", d: "Publique vagas de vigilante e complete a equipe com as demais funções no mesmo evento." },
            { icon: ic.bag, t: "Um pedido, várias funções", d: "Adicione vigilantes, bombeiros, enfermagem e limpeza ao carrinho e confirme de uma vez." },
            { icon: ic.lock, t: "Pagamento só no app", d: "Um único Pix cobre toda a equipe, com comprovante pronto para a contabilidade." },
          ]
        : [
            { icon: ic.people, t: "Equipe completa em um só pedido", d: "No mesmo evento, solicite vigilantes, bombeiros, enfermagem e limpeza pelo carrinho." },
            { icon: ic.lock, t: "Você paga o valor da hora. Só isso.", d: "Defina o valor por função, veja o total do evento e pague pelo app, com comprovante." },
            { icon: ic.camera, t: "Check-in com foto e GPS", d: "Acompanhe a presença da equipe no local, com histórico e avaliação de duas vias." },
          ]
    );
  }

  function renderHomeEmpresa() {
    const u = USERS[state.role] || USERS.contratante;
    const ev = EVENTS[0];
    const isTerc = state.role === "terceirizada";
    const people = evTotalPeople(ev);
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav">
        <div class="greet under-proto">
          ${avatar(u, "")}
          <div class="who">
            <div class="hi">${u.roleLabel}</div>
            <h1>${u.name}</h1>
          </div>
          ${headerActions()}
        </div>
        <div class="pad">
          ${searchEntry()}
          <button class="btn btn-primary" data-go="#/solicitar/evento">${ic.plus} Solicitar profissionais</button>
          ${
            state.cart.length
              ? `<button class="cart-mini" data-go="#/solicitar/carrinho">
                  <div><b>Evento em montagem</b><span class="help">${state.event.title} • ${state.cart.length} função(ões) • ${cartPeople()} colaboradores</span></div>
                  <span class="price">${brl(cartTotal())}</span>
                </button>`
              : ""
          }
          ${
            isTerc
              ? `<p class="help" style="margin:8px 0 14px;text-align:center">Sua empresa pode publicar vagas de vigilância e das demais categorias.</p>`
              : `<p class="help" style="margin:8px 0 14px;text-align:center">Vagas de vigilância são atendidas por empresa autorizada pela Polícia Federal.</p>`
          }
          ${companyBenefits()}
          <div class="section-h"><h2>Categorias</h2></div>
          <div class="cats">
            ${CATS.map(
              (c) => `<button class="cat" data-go="#/solicitar/evento" data-setcat="${c.id}">
                ${CAT_ICON[c.id]}<span>${c.short}</span>
              </button>`
            ).join("")}
          </div>
          <div class="section-h"><h2>Próximo evento</h2><button data-go="#/evento/expoville">Ver detalhes</button></div>
          <button class="event-card" data-go="#/evento/expoville">
            <img src="${ev.photo}" alt="" />
            <div class="body">
              <div class="row" style="display:flex;justify-content:space-between;align-items:flex-start">
                <div>
                  <h3 style="font-size:16px">${ev.title}</h3>
                  <div class="shift-meta" style="margin-top:4px"><span>${ic.clock} ${ev.when}</span></div>
                </div>
                <span class="badge badge-ok">Equipe confirmada</span>
              </div>
              <div class="small muted" style="margin:6px 0">${people} colaboradores • ${ev.functions.length} funções</div>
              <div class="chips" style="margin-bottom:8px">
                ${ev.functions.map((f) => `<span class="chip">${catBy(f.cat).short} · ${f.qty}</span>`).join("")}
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <div class="avatar-stack">
                  ${TEAM.slice(0, 4).map((p) => avatar(p)).join("")}
                  <div class="avatar">+${Math.max(0, people - 4)}</div>
                </div>
                ${stars(4.9)}
              </div>
            </div>
          </button>
        </div>
      </div>
      ${tabbar("home")}
      ${toastEl()}
    </section>`;
  }

  function colabBenefits() {
    return benefits([
      { icon: ic.wallet, t: "Veja o valor líquido antes de aceitar", d: "A empresa paga o valor da hora. A Asael desconta automaticamente a taxa de conexão." },
      { icon: ic.people, t: "Mais segmentos, mais plantões", d: "Habilite vigilante, bombeiro, controle de acesso e outras funções com o cadastro de cada uma." },
      { icon: ic.lock, t: "Receba só na conta Asael", d: "O Pix entra na sua chave exclusiva. Receber por fora leva ao banimento." },
    ]);
  }

  function earningsSim(rate, cut, hours, days) {
    const h = hours * days;
    const gross = rate * h;
    const fee = cut * h;
    const net = gross - fee;
    return `<div class="card sim">
      <p class="small" style="margin-bottom:10px">A empresa paga ${brlH(rate)} e a Asael cobra ${brlH(cut)} pela conexão. O desconto é feito automaticamente.</p>
      <div class="sim-controls">
        <div class="field"><label>Horas do plantão</label>
          <div class="qty" data-sim="simHours"><button type="button" data-delta="-1">−</button><div class="n">${state.simHours}</div><button type="button" data-delta="1">+</button></div>
        </div>
        <div class="field"><label>Dias</label>
          <div class="qty" data-sim="simDays"><button type="button" data-delta="-1">−</button><div class="n">${state.simDays}</div><button type="button" data-delta="1">+</button></div>
        </div>
      </div>
      <div class="summary-row"><span class="k">Valor bruto (${h}h)</span><span class="v">${brl(gross)}</span></div>
      <div class="summary-row"><span class="k">Desconto Asael</span><span class="v">− ${brl(fee)}</span></div>
      <div class="summary-row total"><span class="k">Você recebe</span><span class="v">${brl(net)}</span></div>
    </div>`;
  }

  function renderHomeColab() {
    const u = USERS.colaborador;
    const list = visibleShifts(state.shiftFilter);
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav">
        <div class="greet under-proto">
          ${avatar(u)}
          <div class="who">
            <div class="hi">Olá, Carlos</div>
            <h1>Plantões pra você</h1>
          </div>
          ${headerActions()}
        </div>
        <div class="pad">
          ${searchEntry()}
          <div class="balance" style="padding:16px 18px;margin-bottom:14px">
            <div class="lbl">Disponível na conta Asael</div>
            <div class="val" style="font-size:28px;margin-bottom:0">${brl(1760)}</div>
            <button class="btn btn-primary btn-sm" data-go="#/carteira" style="margin-top:12px;width:auto">Ver carteira</button>
          </div>
          ${colabBenefits()}
          <div class="section-h"><h2>Seus segmentos</h2><button data-go="#/segmentos">Gerenciar</button></div>
          <div class="chips" style="margin-bottom:8px">
            ${CATS.map((c) => `<button class="chip" data-go="#/segmentos">${c.short} · ${STATUS_LABEL[state.segments[c.id]]}</button>`).join("")}
          </div>
          <p class="help" style="margin-bottom:14px">As vagas abaixo são das funções já aprovadas. Complete o cadastro dos outros segmentos para ampliar as oportunidades.</p>
          <div class="chips" id="filterCats">
            <button class="chip ${state.shiftFilter === "all" ? "on" : ""}" data-filter="all">Aprovadas</button>
            ${CATS.map((c) => `<button class="chip ${state.shiftFilter === c.id ? "on" : ""}" data-filter="${c.id}">${c.short}</button>`).join("")}
          </div>
          <div class="section-h"><h2>Vagas abertas em Joinville</h2></div>
          <div id="shiftList" style="display:grid;gap:10px">
            ${shiftListHtml(list, state.shiftFilter)}
          </div>
        </div>
      </div>
      ${tabbar("home")}
      ${toastEl()}
    </section>`;
  }

  function visibleShifts(filter) {
    const approved = approvedSegs();
    return SHIFTS.filter((s) => {
      if (filter === "all") return approved.includes(s.cat);
      return s.cat === filter;
    });
  }

  function shiftListHtml(list, filter) {
    if (filter !== "all" && state.segments[filter] !== "aprovado") {
      const st = state.segments[filter];
      const c = catBy(filter);
      if (st === "em-analise") {
        return `<div class="card muted">O segmento de ${c.name.toLowerCase()} ainda está em análise. Quando for aprovado, as vagas aparecem aqui.</div>`;
      }
      return `<div class="card"><p class="muted small" style="margin-bottom:10px">Complete o cadastro de ${c.name.toLowerCase()} para ver as vagas e ampliar suas oportunidades.</p><button class="btn btn-primary btn-sm" data-go="#/segmentos">Cadastrar segmento</button></div>`;
    }
    if (!list.length) return `<div class="card muted">Nenhuma vaga nesta função no momento.</div>`;
    return list.map((s) => shiftCard(s)).join("");
  }

  function shiftCard(s) {
    const pay = shiftPay(s);
    const ev = pay.ev;
    const accepted = state.accepted[s.id];
    const cin = state.checkins[s.id];
    let badge = `<span class="badge badge-info">${s.spots} vagas</span>`;
    if (cin === "in" || cin === "done") badge = `<span class="badge badge-ok">Check-in feito</span>`;
    else if (accepted) badge = `<span class="badge badge-ok">Aceito</span>`;
    return `<button class="shift-card" data-go="#/vaga/${s.id}">
      <div class="row">
        <div>
          <div class="tiny" style="margin-bottom:2px">${pay.c.short}</div>
          <h3>${ev.title}</h3>
        </div>
        ${badge}
      </div>
      <div class="shift-meta">
        <span>${ic.pin} ${ev.place}</span>
        <span>${ic.clock} ${ev.when}</span>
        <span>${s.distance}</span>
      </div>
      <div class="price">${brlH(pay.netHour)} <span class="muted" style="font-size:12px;font-weight:500">líquido</span></div>
    </button>`;
  }

  function renderVaga(id) {
    const s = SHIFTS.find((x) => x.id === id) || SHIFTS[0];
    const pay = shiftPay(s);
    const ev = pay.ev;
    const c = pay.c;
    const accepted = state.accepted[s.id];
    const cin = state.checkins[s.id];
    let cta = `<button class="btn btn-primary" data-accept="${s.id}">Aceitar plantão</button>`;
    if (cin === "done") cta = `<button class="btn btn-primary" data-go="#/avaliar/${s.id}">Avaliar o plantão</button>`;
    else if (cin === "in") cta = `<button class="btn btn-primary" data-go="#/checkin/${s.id}">Fazer check-out</button>`;
    else if (accepted) cta = `<button class="btn btn-primary" data-go="#/checkin/${s.id}">Fazer check-in</button>`;
    return `<section class="screen ${anim()}">
      ${topbar("Detalhe do plantão", "#/home")}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <div class="event-card" style="margin-bottom:16px">
          <img src="${ev.photo}" alt="" />
          <div class="body">
            <span class="badge badge-info">${c.name}</span>
            <h2 style="font-size:20px">${ev.title}</h2>
            <div class="shift-meta">
              <span>${ic.pin} ${ev.address}</span>
            </div>
            <div class="shift-meta">
              <span>${ic.clock} ${formatISO(ev.date)} • ${ev.start} às ${ev.end} (${ev.hours}h)</span>
            </div>
          </div>
        </div>
        <p class="small" style="margin-bottom:10px">A empresa paga ${brlH(pay.rate)} e a Asael cobra ${brlH(pay.cut)} pela conexão. O desconto é automático.</p>
        <div class="card">
          <div class="summary-row"><span class="k">Valor bruto do plantão (${ev.hours}h)</span><span class="v">${brl(pay.gross)}</span></div>
          <div class="summary-row"><span class="k">Desconto Asael</span><span class="v">− ${brl(pay.fee)}</span></div>
          <div class="summary-row total"><span class="k">Você recebe</span><span class="v">${brl(pay.net)}</span></div>
        </div>
        <div class="section-h"><h2>Simular outro período</h2></div>
        ${earningsSim(pay.rate, pay.cut, state.simHours, state.simDays)}
        <div class="notice" style="margin-top:12px">${ic.lock} O pagamento entra só na sua conta Asael, dentro do app. Receber por outra chave ou conta leva ao banimento.</div>
        ${vagaChatBlock(s)}
        <div style="margin-top:18px">${cta}</div>
        ${accepted && !cin ? `<button class="btn btn-ghost" data-cancel="${s.id}">Cancelar aceite</button>` : ""}
      </div>
    </section>`;
  }

  function renderCheckin(id) {
    const s = SHIFTS.find((x) => x.id === id) || SHIFTS[0];
    const ev = EVENTS.find((e) => e.id === s.event);
    const isOut = state.checkins[s.id] === "in";
    const photo = state.checkinPhoto;
    return `<section class="screen ${anim()}">
      ${topbar(isOut ? "Check-out" : "Check-in", `#/vaga/${s.id}`)}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <p class="muted small" style="margin-bottom:12px">${ev.title} • ${ev.place}</p>
        <div class="map">
          <div class="pin"><div class="dot"></div></div>
          <div class="map-label">
            <b>${ev.place}</b><br/>
            GPS simulado • precisão 12 m<br/>
            <span class="muted">${ev.address}</span>
          </div>
        </div>
        <div class="ok-box" style="margin-top:12px">Você está no local do plantão. Tire uma foto para confirmar o ${isOut ? "check-out" : "check-in"}.</div>
        ${
          photo
            ? `<img class="photo-preview" style="margin-top:12px" src="${photo}" alt="Foto do check-in" />`
            : `<div class="card" style="margin-top:12px;text-align:center;color:var(--muted)">Nenhuma foto ainda</div>`
        }
        <input type="file" accept="image/*" capture="environment" id="fotoCheckin" hidden />
        <button class="btn btn-secondary" id="tirarFoto" style="margin-top:14px">${ic.camera} ${photo ? "Tirar outra foto" : "Tirar foto"}</button>
        <button class="btn btn-primary" id="confirmarCheck" style="margin-top:10px" ${photo ? "" : "disabled"}>${isOut ? "Confirmar check-out" : "Confirmar check-in"}</button>
        <p class="help" style="text-align:center;margin-top:10px">No protótipo o mapa é ilustrativo. No app real usamos o GPS do celular.</p>
      </div>
    </section>`;
  }

  function renderSolicitar(step) {
    const steps = ["evento", "cat", "item", "carrinho", "ok"];
    if (step === "ok") return renderSolicitarOk();
    const idx = Math.max(0, steps.indexOf(step));
    const back =
      step === "evento" ? "#/home" :
      step === "cat" ? "#/solicitar/evento" :
      step === "item" ? "#/solicitar/cat" :
      "#/solicitar/item";
    return `<section class="screen ${anim()}">
      ${topbar(step === "carrinho" ? "Carrinho do evento" : "Solicitar profissionais", back, true)}
      ${step !== "carrinho" ? `<div class="steps">${["evento", "cat", "item", "carrinho"].map((_, i) => `<i class="${i <= idx ? "on" : ""}"></i>`).join("")}</div>` : ""}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        ${step === "evento" || !step ? solicitarEvento() : ""}
        ${step === "cat" ? solicitarCat() : ""}
        ${step === "item" ? solicitarItem() : ""}
        ${step === "carrinho" ? solicitarCarrinho() : ""}
      </div>
    </section>`;
  }

  function solicitarEvento() {
    const r = state.event;
    return `
      <h1 style="font-size:22px;margin-bottom:6px">Dados do evento</h1>
      <p class="muted small" style="margin-bottom:16px">Primeiro informe o evento. Depois você adiciona as funções ao carrinho — vigilantes, bombeiros, enfermagem, limpeza e outras.</p>
      <div class="field"><label>Nome do evento ou local</label><input id="ev-title" value="${r.title}" /></div>
      <div class="field"><label>Endereço em Joinville</label><input id="ev-address" value="${r.address}" /></div>
      <div class="field"><label>Data de início</label><input id="ev-date" type="date" value="${r.date}" /></div>
      <div class="field"><label>Quantidade de dias</label>
        <div class="qty" data-ev="days"><button type="button" data-delta="-1">−</button><div class="n">${r.days}</div><button type="button" data-delta="1">+</button></div>
      </div>
      <div class="field"><label>Turno padrão (12h)</label>
        <select id="ev-shift">
          <option value="18:00-06:00" ${r.start === "18:00" ? "selected" : ""}>Noturno 12h — 18h às 06h</option>
          <option value="08:00-20:00" ${r.start === "08:00" ? "selected" : ""}>Diurno 12h — 08h às 20h</option>
          <option value="10:00-22:00" ${r.start === "10:00" ? "selected" : ""}>Comércio 12h — 10h às 22h</option>
          <option value="22:00-10:00" ${r.start === "22:00" ? "selected" : ""}>Balada 12h — 22h às 10h</option>
        </select>
      </div>
      <p class="notice">O plantão padrão do Asael é de 12 horas. Você poderá ajustar turno e valor em cada função do carrinho.</p>
      <button class="btn btn-primary" id="eventoNext" style="margin-top:16px">Escolher funções</button>
    `;
  }

  function solicitarCat() {
    const r = state.item;
    const isTerc = state.role === "terceirizada";
    const inCart = (id) => state.cart.some((i) => i.cat === id);
    return `
      <h1 style="font-size:22px;margin-bottom:6px">Qual função você precisa?</h1>
      <p class="muted small" style="margin-bottom:16px">Adicione uma função por vez ao mesmo evento. O valor sugerido é o que a contratante paga por hora.</p>
      ${CATS.map((c) => {
        const note = !isTerc && c.legal === "vigilancia" ? "Atendida por empresa autorizada pela Polícia Federal, parceira do Asael." : "";
        return `<button class="account-card ${r.cat === c.id ? "selected" : ""}" data-setcat="${c.id}">
          <div class="ico">${CAT_ICON[c.id]}</div>
          <div>
            <h3>${c.name}${inCart(c.id) ? " · no carrinho" : ""}</h3>
            <p>Valor sugerido ${brlH(c.rec)}</p>
            ${note ? `<p style="margin-top:4px;color:var(--cta)">${note}</p>` : ""}
          </div>
        </button>`;
      }).join("")}
      <button class="btn btn-primary" data-go="#/solicitar/item" style="margin-top:8px">Continuar</button>
      ${state.cart.length ? `<button class="btn btn-ghost" data-go="#/solicitar/carrinho">Ir ao carrinho (${state.cart.length})</button>` : ""}
    `;
  }

  function solicitarItem() {
    const it = state.item;
    const c = catBy(it.cat);
    const level = rateLevel(c, it.rate);
    const sub = lineTotal(it);
    let box = "";
    if (level === "block") box = `<div class="err-box">${ic.alert} ${warningCopy(c, it.rate)}</div>`;
    else if (level === "warn")
      box = `<div class="warn-box">${ic.alert} ${warningCopy(c, it.rate)}
        <label class="check" style="margin-top:10px;color:inherit">
          <input type="checkbox" id="aceiteBaixo" ${it.acceptLow ? "checked" : ""} />
          <span>Sim, desejo continuar com este valor.</span>
        </label>
      </div>`;
    else box = `<div class="ok-box">Valor dentro do recomendado de ${brlH(c.rec)}.</div>`;
    const canAdd = level === "ok" || (level === "warn" && it.acceptLow);
    return `
      <h1 style="font-size:22px;margin-bottom:6px">${c.name}</h1>
      <p class="muted small" style="margin-bottom:16px">Mínimo ${brlH(c.min)} • recomendado ${brlH(c.rec)}. Informe quantidade, turno e o valor por hora.</p>
      <div class="field"><label>Quantidade de colaboradores</label>
        <div class="qty" data-item="qty"><button type="button" data-delta="-1">−</button><div class="n">${it.qty}</div><button type="button" data-delta="1">+</button></div>
      </div>
      <div class="field"><label>Dias desta função</label>
        <div class="qty" data-item="days"><button type="button" data-delta="-1">−</button><div class="n">${it.days}</div><button type="button" data-delta="1">+</button></div>
      </div>
      <div class="field"><label>Turno</label>
        <select id="it-shift">
          <option value="18:00-06:00" ${it.start === "18:00" ? "selected" : ""}>Noturno 12h — 18h às 06h</option>
          <option value="08:00-20:00" ${it.start === "08:00" ? "selected" : ""}>Diurno 12h — 08h às 20h</option>
          <option value="10:00-22:00" ${it.start === "10:00" ? "selected" : ""}>Comércio 12h — 10h às 22h</option>
          <option value="22:00-10:00" ${it.start === "22:00" ? "selected" : ""}>Balada 12h — 22h às 10h</option>
        </select>
      </div>
      <div class="field"><label>Valor por hora</label>
        <div class="rate-box">
          <span class="prefix">R$</span>
          <input class="rate-input ${level === "block" ? "invalid" : level === "warn" ? "warn" : ""}" id="rq-rate" inputmode="decimal" value="${formatRateInput(it.rate)}" />
        </div>
      </div>
      ${box}
      <div class="card" style="margin-top:16px">
        <div class="summary-row"><span class="k">${it.qty} × ${it.hours}h × ${it.days} dia(s)</span><span class="v">${brlH(it.rate)}</span></div>
        <div class="summary-row total"><span class="k">Subtotal desta função</span><span class="v">${brl(sub)}</span></div>
      </div>
      <button class="btn btn-primary" id="addCart" style="margin-top:16px" ${canAdd ? "" : "disabled"}>Adicionar ao evento</button>
    `;
  }

  function solicitarCarrinho() {
    const ev = state.event;
    if (!state.cart.length) {
      return `
        <h1 style="font-size:22px;margin-bottom:8px">Carrinho vazio</h1>
        <p class="muted small" style="margin-bottom:16px">Adicione pelo menos uma função para ${ev.title}.</p>
        <button class="btn btn-primary" data-go="#/solicitar/cat">Adicionar função</button>
      `;
    }
    return `
      <p class="tiny">Evento</p>
      <h1 style="font-size:22px;margin-bottom:4px">${ev.title}</h1>
      <p class="muted small" style="margin-bottom:16px">${ev.address}<br/>${formatISO(ev.date)} • ${ev.start} às ${ev.end}</p>
      ${state.cart
        .map((i) => {
          const c = catBy(i.cat);
          return `<div class="cart-line">
            <div class="top">
              <div>
                <h3>${c.name}</h3>
                <div class="shift-meta" style="margin-top:4px">
                  <span>${i.qty} colaborador(es)</span>
                  <span>${i.start}–${i.end}</span>
                  <span>${i.days} dia(s)</span>
                </div>
              </div>
              <button class="icon-btn" data-removecart="${i.id}" aria-label="Remover">${ic.trash}</button>
            </div>
            <div class="summary-row" style="margin-top:8px;border-bottom:0;padding-bottom:0">
              <span class="k">${brlH(i.rate)}</span>
              <span class="v">${brl(lineTotal(i))}</span>
            </div>
          </div>`;
        })
        .join("")}
      <button class="btn btn-secondary" data-go="#/solicitar/cat" style="margin-bottom:16px">${ic.plus} Adicionar outra função</button>
      <div class="card">
        <div class="summary-row"><span class="k">Funções</span><span class="v">${state.cart.length}</span></div>
        <div class="summary-row"><span class="k">Colaboradores</span><span class="v">${cartPeople()}</span></div>
        <div class="summary-row total"><span class="k">Total do evento</span><span class="v">${brl(cartTotal())}</span></div>
      </div>
      <div class="notice" style="margin-top:12px">O pagamento da equipe é feito apenas dentro do app. Pagamento por fora resulta no banimento da empresa e do colaborador.</div>
      <button class="btn btn-primary" id="confirmarPedido" style="margin-top:16px">Confirmar evento • ${brl(cartTotal())}</button>
      <p class="help" style="text-align:center;margin-top:10px">Protótipo: nenhum pagamento real é feito.</p>
    `;
  }

  function renderSolicitarOk() {
    const ev = state.lastEvent || state.event;
    const n = ev.functions ? ev.functions.reduce((s, f) => s + f.qty, 0) : cartPeople();
    const total = ev.total != null ? ev.total : cartTotal();
    return `<section class="screen ${anim()}">
      <div class="scroll pad" style="text-align:center;padding-top:calc(40px + var(--safe-t))">
        <div class="success-mark">${ic.check}</div>
        <h1 style="font-size:26px;margin-bottom:8px">Pedido enviado</h1>
        <p class="muted" style="line-height:1.5">Reservamos ${n} colaborador(es) em ${ev.functions ? ev.functions.length : 0} função(ões) para ${ev.title}. Total simulado: ${brl(total)}.</p>
        <div class="notice" style="text-align:left;margin:20px 0">Os colaboradores vão aparecer no plantão conforme aceitarem a vaga. O pagamento da equipe é feito no app, no término do evento.</div>
        <button class="btn btn-primary" data-go="#/home">Ir para o início</button>
        <button class="btn btn-ghost" data-go="#/plantoes">Ver plantões</button>
      </div>
    </section>`;
  }

  function renderPlantoes() {
    if (isColab()) {
      const mine = SHIFTS.filter((s) => (state.accepted[s.id] || state.checkins[s.id]) && approvedSegs().includes(s.cat));
      return `<section class="screen ${anim()}">
        ${protoBtn()}
        <div class="scroll has-nav pad" style="padding-top:16px">
          <h1 style="font-size:24px;margin-bottom:6px">Meus plantões</h1>
          <p class="muted small" style="margin-bottom:16px">Aceitos, em andamento e concluídos, nas funções que você já tem aprovadas.</p>
          ${colabBenefits()}
          ${
            mine.length
              ? `<div style="display:grid;gap:10px">${mine.map((s) => shiftCard(s)).join("")}</div>`
              : `<div class="card muted">Você ainda não aceitou nenhum plantão. Veja as vagas abertas no início.</div>`
          }
        </div>
        ${tabbar("plantoes")}
      </section>`;
    }
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:6px">Plantões</h1>
        <p class="muted small" style="margin-bottom:14px">Acompanhe a equipe de cada evento em um só lugar, com todas as funções juntas.</p>
        <div style="display:grid;gap:12px">
          ${EVENTS.map((ev) => {
            const st = ev.status === "confirmado" ? `<span class="badge badge-ok">Equipe confirmada</span>` : `<span class="badge badge-info">Aberto</span>`;
            return `<button class="shift-card" data-go="#/evento/${ev.id}">
              <div class="row"><div><h3>${ev.title}</h3></div>${st}</div>
              <div class="shift-meta"><span>${ic.pin} ${ev.place}</span><span>${ic.clock} ${ev.when}</span><span>${ic.people} ${evTotalPeople(ev)}</span></div>
              <div class="small muted">${ev.functions.map((f) => `${catBy(f.cat).short} · ${f.qty}`).join("  •  ")}</div>
              <div class="price">${brl(evCompanyTotal(ev))}</div>
            </button>`;
          }).join("")}
        </div>
      </div>
      ${tabbar("plantoes")}
    </section>`;
  }

  function renderEvento(id) {
    const ev = EVENTS.find((e) => e.id === id) || EVENTS[0];
    const total = evCompanyTotal(ev);
    return `<section class="screen ${anim()}">
      ${topbar("Plantão", "#/plantoes")}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <div class="event-card" style="margin-bottom:16px">
          <img src="${ev.photo}" alt="" />
          <div class="body">
            <span class="badge ${ev.status === "confirmado" ? "badge-ok" : "badge-info"}">${ev.status === "confirmado" ? "Equipe confirmada" : "Aberto"}</span>
            <h2 style="font-size:20px">${ev.title}</h2>
            <div class="shift-meta"><span>${ic.pin} ${ev.address}</span></div>
            <div class="shift-meta"><span>${ic.clock} ${ev.date} • ${ev.start} às ${ev.end}</span></div>
          </div>
        </div>
        <div class="card" style="margin-bottom:12px">
          ${ev.functions
            .map((f) => {
              const c = catBy(f.cat);
              const sub = f.rate * ev.hours * ev.days * f.qty;
              return `<div class="summary-row"><span class="k">${c.short} • ${f.qty} × ${brlH(f.rate)}</span><span class="v">${brl(sub)}</span></div>`;
            })
            .join("")}
          <div class="summary-row total"><span class="k">Total do evento</span><span class="v">${brl(total)}</span></div>
        </div>
        <div class="section-h"><h2>Equipe</h2></div>
        ${TEAM.slice(0, ev.status === "confirmado" ? 6 : 3)
          .map((t) => {
            const th = threadFor(ev.id, t.name);
            const chatBtn = th
              ? `<button class="chat-mini ${isPaid(ev.id) ? "" : "locked"}" data-go="#/chat/${th.id}" aria-label="Conversar com ${t.name}">${isPaid(ev.id) ? ic.chat : ic.lock}</button>`
              : "";
            return `<div class="tx">
            ${avatar(t)}
            <div class="mid"><b>${t.name}</b><span class="help">${t.role} • ${stars(t.stars)}</span></div>
            ${chatBtn}
          </div>`;
          })
          .join("")}
        <p class="help" style="margin-top:8px">${ev.status === "confirmado" ? `${evTotalPeople(ev)} colaboradores confirmados` : "Aguardando mais aceites"}</p>
        ${eventPayAndChat(ev, total)}
      </div>
      ${toastEl()}
    </section>`;
  }

  function renderCarteira() {
    const vig = catBy("vigilancia");
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:8px">Carteira Asael</h1>
        <p class="muted small" style="margin-bottom:14px">Seu rendimento líquido, com a taxa de conexão já descontada automaticamente.</p>
        <div class="balance">
          <div class="lbl">Saldo disponível</div>
          <div class="val">${brl(1760)}</div>
          <button class="btn btn-primary" id="sacarPix">Sacar via Pix</button>
        </div>
        <div class="card" style="margin-top:12px">
          <div class="summary-row"><span class="k">A receber (plantões em aberto)</span><span class="v">${brl(216)}</span></div>
          <div class="summary-row"><span class="k">Chave Pix Asael</span><span class="v">carlos.mendes@asael.app</span></div>
        </div>
        <div class="section-h"><h2>Simulador de ganhos</h2></div>
        ${earningsSim(vig.min, vig.cut, state.simHours, state.simDays)}
        <div class="notice" style="margin-top:12px">Esta chave é exclusiva do Asael. Receber o plantão em outra conta leva ao banimento.</div>
        <div class="section-h"><h2>Movimentações</h2></div>
        <div class="card">
          ${TX.map(
            (t) => `<div class="tx">
              <div class="ico" style="color:${t.type === "in" ? "var(--success)" : "var(--muted)"}">${t.type === "in" ? ic.check : ic.wallet}</div>
              <div class="mid"><b>${t.title}</b><span class="help">${t.date}</span></div>
              <div class="amt" style="color:${t.value > 0 ? "var(--success)" : "var(--text)"}">${t.value > 0 ? "+" : ""}${brl(t.value)}</div>
            </div>`
          ).join("")}
        </div>
      </div>
      ${tabbar("carteira")}
      ${toastEl()}
    </section>`;
  }

  function renderPagamentos() {
    const list = payableEvents();
    const events = list.length ? list : [EVENTS[0]];
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:6px">Pagamentos</h1>
        <p class="muted small" style="margin-bottom:14px">Um único pagamento cobre toda a equipe do evento, só pelas contas Asael. Depois do pagamento, o chat com os colaboradores é liberado.</p>
        ${benefits([
          { icon: ic.lock, t: "Tudo no app, com comprovante", d: "Pague a equipe de uma vez e tenha o registro pronto para a contabilidade." },
          { icon: ic.card, t: "Sem pagamento por fora", d: "Quem pagar fora do aplicativo é banido." },
          { icon: ic.chat, t: "Chat liberado após o pagamento", d: "A conversa com a equipe abre só quando o pagamento é confirmado no app." },
        ])}
        ${events.map((ev) => paymentEventCard(ev)).join("")}
        ${
          state.role === "contratante" && isPaid("mueller")
            ? ""
            : `<div class="card" style="margin-top:12px">
          <div class="tx">
            <div class="ico">${ic.check}</div>
            <div class="mid"><b>Pagamento • plantão anterior (demo)</b><span class="help">20 nov • ${brl(16 * 12 * 8)}</span></div>
          </div>
        </div>`
        }
      </div>
      ${tabbar("pagamentos")}
      ${toastEl()}
    </section>`;
  }

  function paymentEventCard(ev) {
    const total = evCompanyTotal(ev);
    const paid = isPaid(ev.id);
    return `<div class="balance" style="margin-bottom:12px">
      <div class="lbl">${paid ? "Pago" : "Próximo pagamento"} • ${ev.title}</div>
      <div class="val" style="font-size:28px">${brl(total)}</div>
      ${
        paid
          ? `<button class="btn btn-primary" data-go="#/conversas">Abrir conversas da equipe</button>`
          : `<button class="btn btn-primary" data-payresto="${ev.id}">Pagar equipe no app</button>`
      }
      <div class="card" style="margin-top:14px;background:rgba(5,10,24,0.35)">
        ${ev.functions
          .map((f) => `<div class="summary-row"><span class="k">${catBy(f.cat).short} • ${f.qty} × ${brlH(f.rate)}</span><span class="v">${brl(f.rate * ev.hours * ev.days * f.qty)}</span></div>`)
          .join("")}
        <div class="summary-row total"><span class="k">Total</span><span class="v">${brl(total)}</span></div>
      </div>
    </div>`;
  }

  function eventPayAndChat(ev, total) {
    if (!isCompany()) return "";
    if (isPaid(ev.id)) {
      return `<button class="btn btn-primary" style="margin-top:16px" data-go="#/conversas">${ic.chat} Conversas da equipe</button>
        <p class="help" style="text-align:center;margin-top:8px">Pagamento confirmado. O chat com os colaboradores já está liberado.</p>`;
    }
    return `<button class="btn btn-primary" style="margin-top:16px" data-payresto="${ev.id}">Pagar equipe no app • ${brl(total)}</button>
      <p class="help" style="text-align:center;margin-top:8px">O pagamento é feito de uma vez, para as contas Asael de toda a equipe. O chat libera depois do pagamento.</p>`;
  }

  function vagaChatBlock(s) {
    const th = THREADS.find((x) => x.eventId === s.event && x.colabId === "carlos");
    if (!th) return "";
    const paid = isPaid(s.event);
    const ev = eventById(s.event);
    const who = th.companyName;
    if (paid) {
      return `<button class="btn btn-ghost" style="margin-top:12px" data-go="#/chat/${th.id}">${ic.chat} Conversar com ${who}</button>`;
    }
    return `<div class="notice" style="margin-top:12px">${ic.lock} O chat com ${who} libera após o pagamento do evento${ev ? ` “${ev.title}”` : ""}. Contatos pessoais ficam ocultos. Combinar pagamento fora do app leva ao banimento.</div>
      <button class="btn btn-ghost" style="margin-top:10px" data-go="#/chat/${th.id}">${ic.lock} Ver conversa (bloqueada)</button>`;
  }

  function renderAvaliar(id) {
    const s = SHIFTS.find((x) => x.id === id) || SHIFTS[0];
    const ev = EVENTS.find((e) => e.id === s.event);
    const n = state.rating;
    return `<section class="screen ${anim()}">
      ${topbar("Avaliação", isColab() ? `#/vaga/${s.id}` : "#/evento/" + ev.id)}
      <div class="scroll pad" style="text-align:center;padding-bottom:calc(24px + var(--safe-b))">
        <p class="kicker" style="margin-top:8px">Avaliação de duas vias</p>
        <h1 style="font-size:22px;margin-bottom:8px">${isColab() ? "Como foi a empresa neste plantão?" : "Como foi a equipe?"}</h1>
        <p class="muted small" style="margin-bottom:20px">${ev.title} • ${ev.place}</p>
        <div class="star-pick" id="starPick">
          ${[1, 2, 3, 4, 5].map((i) => `<button type="button" data-star="${i}" class="${i <= n ? "on" : ""}">★</button>`).join("")}
        </div>
        <div class="field" style="text-align:left;margin-top:20px">
          <label>Comentário (opcional)</label>
          <textarea placeholder="Conte como foi o plantão..."></textarea>
        </div>
        <button class="btn btn-primary" id="enviarAval" ${n ? "" : "disabled"}>Enviar avaliação</button>
      </div>
    </section>`;
  }

  function renderPerfil() {
    const u = USERS[state.role] || USERS.contratante;
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav" style="padding-top:16px;text-align:center">
        <div class="pad">
          ${avatar(u, "lg")}
          <h1 style="font-size:22px;margin:10px 0 2px">${u.name}</h1>
          <p class="muted small">${u.roleLabel} • ${u.city}</p>
          ${isColab() ? `<div style="margin-top:6px">${stars(u.stars)}</div>` : ""}
        </div>
        <div class="pad" style="text-align:left;margin-top:8px">
          ${
            isColab()
              ? colabBenefits()
              : companyBenefits()
          }
        </div>
        <div class="pad profile-list" style="text-align:left;margin-top:8px">
          ${isColab() ? `<button type="button" data-go="#/segmentos"><span>Meus segmentos</span>${ic.chevron}</button>` : ""}
          <button type="button" data-go="#/demo"><span>Trocar perfil do protótipo</span>${ic.chevron}</button>
          <button type="button" id="toggleLight"><span>Modo claro (melhor no sol)</span><span class="switch ${state.light ? "on" : ""}"><i></i></span></button>
          <button type="button"><span>Termos de uso</span>${ic.chevron}</button>
          <button type="button"><span>Ajuda</span>${ic.chevron}</button>
          <button type="button" data-go="#/welcome" style="color:var(--error)"><span>Sair</span>${ic.logout}</button>
        </div>
        <p class="help" style="padding:16px 20px 8px">Protótipo visual do Asael — sem backend e sem pagamentos reais. Dados fictícios de Joinville / SC.</p>
      </div>
      ${tabbar("perfil")}
      ${toastEl()}
    </section>`;
  }

  function renderSegmentos() {
    return `<section class="screen ${anim()}">
      ${topbar("Meus segmentos", "#/perfil")}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <h1 style="font-size:22px;margin-bottom:6px">Habilite mais funções</h1>
        <p class="muted small" style="margin-bottom:16px">O mesmo colaborador pode atuar em vários segmentos, desde que faça o cadastro de cada um. Mais segmentos, mais oportunidades.</p>
        ${CATS.map((c) => {
          const st = state.segments[c.id];
          return `<div class="cart-line">
            <div class="top">
              <div style="display:flex;gap:10px;align-items:center">
                <div class="ico" style="width:40px;height:40px;border-radius:12px;background:var(--elevated);display:grid;place-items:center;color:var(--cta)">${CAT_ICON[c.id]}</div>
                <div>
                  <h3>${c.name}</h3>
                  <div style="margin-top:4px">${statusBadge(st)}</div>
                </div>
              </div>
            </div>
            ${
              st === "aprovado"
                ? `<p class="help" style="margin-top:8px">Você já pode aceitar plantões desta função.</p>`
                : st === "em-analise"
                ? `<p class="help" style="margin-top:8px">Documentos em conferência. Isso costuma levar até 24 horas.</p>`
                : `<div style="margin-top:10px">${c.docs.map((d) => uploadBtn(d.id, d.title, d.sub)).join("")}
                   <button class="btn btn-primary btn-sm" data-sendseg="${c.id}" style="margin-top:6px;width:100%">Enviar cadastro deste segmento</button></div>`
            }
          </div>`;
        }).join("")}
      </div>
    </section>`;
  }

  /* ------------ events ------------ */

  function renderBusca() {
    const s = state.search;
    const colab = isColab();
    const title = colab ? "Buscar empresas e vagas" : "Buscar colaboradores";
    const back = "#/home";
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      ${topbar(title, back)}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <div class="mode-tabs">
          <button type="button" class="${s.mode === "perto" ? "on" : ""}" data-mode="perto">Perto de mim</button>
          <button type="button" class="${s.mode === "estado" ? "on" : ""}" data-mode="estado">Buscar por estado</button>
        </div>
        ${
          s.mode === "perto"
            ? `<button type="button" class="loc-btn ${s.located ? "on" : ""}" id="useLoc">${ic.pin} ${s.located ? "Localização simulada: Joinville, SC" : "Usar minha localização"}</button>`
            : `<div class="filter-row">
                <div class="field"><label>Estado</label>
                  <select id="ufSel">${UFS.map((uf) => `<option value="${uf}" ${s.uf === uf ? "selected" : ""}>${uf}</option>`).join("")}</select>
                </div>
                <div class="field"><label>Cidade ou nome</label>
                  <input id="qCity" type="search" placeholder="Ex.: Joinville" value="${s.q || ""}" />
                </div>
              </div>`
        }
        ${
          colab
            ? ""
            : `<div class="filter-row-3">
                <div class="field"><label>Segmento</label>
                  <select id="segSel">
                    <option value="all" ${s.seg === "all" ? "selected" : ""}>Todos</option>
                    ${CATS.map((c) => `<option value="${c.id}" ${s.seg === c.id ? "selected" : ""}>${c.short}</option>`).join("")}
                  </select>
                </div>
                <div class="field"><label>Disponibilidade</label>
                  <select id="availSel">
                    <option value="all" ${s.avail === "all" ? "selected" : ""}>Todas</option>
                    <option value="disponivel" ${s.avail === "disponivel" ? "selected" : ""}>Disponível</option>
                    <option value="plantao" ${s.avail === "plantao" ? "selected" : ""}>Em plantão</option>
                  </select>
                </div>
                <div class="field"><label>Avaliação</label>
                  <select id="starSel">
                    <option value="0" ${Number(s.minStars) === 0 ? "selected" : ""}>Todas</option>
                    <option value="4" ${Number(s.minStars) === 4 ? "selected" : ""}>4,0 ★ ou mais</option>
                    <option value="4.5" ${Number(s.minStars) === 4.5 ? "selected" : ""}>4,5 ★ ou mais</option>
                    <option value="4.8" ${Number(s.minStars) === 4.8 ? "selected" : ""}>4,8 ★ ou mais</option>
                  </select>
                </div>
              </div>`
        }
        <p class="help" style="margin-bottom:12px">Os resultados abaixo são perfis demonstrativos, criados só para este protótipo.</p>
        <div id="searchResults">${searchResultsHtml()}</div>
      </div>
      ${toastEl()}
    </section>`;
  }

  function filteredCompanies() {
    const s = state.search;
    let list = COMPANIES_DIR.slice();
    if (s.mode === "perto") {
      if (!s.located) return { needLoc: true, list: [] };
      list = list.filter((c) => c.uf === "SC" && c.km <= 80).sort((a, b) => a.km - b.km);
    } else {
      list = list.filter((c) => c.uf === s.uf);
      const q = (s.q || "").trim().toLowerCase();
      if (q) list = list.filter((c) => `${c.name} ${c.city}`.toLowerCase().includes(q));
    }
    return { needLoc: false, list };
  }

  function filteredColabs() {
    const s = state.search;
    let list = COLABS_DIR.slice();
    if (s.mode === "perto") {
      if (!s.located) return { needLoc: true, list: [] };
      list = list.filter((c) => c.uf === "SC" && c.km <= 80).sort((a, b) => a.km - b.km);
    } else {
      list = list.filter((c) => c.uf === s.uf);
      const q = (s.q || "").trim().toLowerCase();
      if (q) list = list.filter((c) => `${c.name} ${c.city}`.toLowerCase().includes(q));
    }
    if (s.seg && s.seg !== "all") list = list.filter((c) => c.segs.includes(s.seg));
    if (s.avail && s.avail !== "all") list = list.filter((c) => c.avail === s.avail);
    if (Number(s.minStars) > 0) list = list.filter((c) => c.stars >= Number(s.minStars));
    return { needLoc: false, list };
  }

  function searchResultsHtml() {
    if (isColab()) return companyResultsHtml();
    return colabResultsHtml();
  }

  function companyResultsHtml() {
    const { needLoc, list } = filteredCompanies();
    if (needLoc) {
      return `<div class="card muted">Ative “Usar minha localização” para ver empresas e vagas perto de você. A localização deste protótipo é simulada em Joinville, SC.</div>`;
    }
    if (!list.length) return `<div class="card muted">Nenhuma empresa encontrada com esses filtros.</div>`;
    return list
      .map((c) => {
        const evs = (c.events || companyEventIds(c.id)).map((id) => eventById(id)).filter(Boolean);
        const vagaTxt = evs.length
          ? evs.map((e) => `${e.title} • ${e.when}`).join(" · ")
          : `${c.vagas} vaga${c.vagas === 1 ? "" : "s"} demonstrativa${c.vagas === 1 ? "" : "s"}`;
        const km = state.search.mode === "perto" && state.search.located ? `<span>${c.km.toString().replace(".", ",")} km</span>` : "";
        return `<div class="result-card">
          <div class="avatar">${initialsOf(c.name)}</div>
          <div class="body">
            <div class="demo-tag">Perfil demonstrativo</div>
            <h3>${c.name}</h3>
            <div class="result-meta">
              <span>${typeLabel(c.type)}</span>
              <span>${ic.pin} ${c.city}, ${c.uf}</span>
              ${km}
            </div>
            <p class="help" style="margin-top:6px">${c.note}</p>
            <p class="small" style="margin-top:6px">${vagaTxt}</p>
            ${
              evs[0]
                ? `<button class="btn btn-ghost btn-sm" style="margin-top:10px;width:auto" data-go="#/vaga/${shiftForEvent(evs[0].id)}">Ver vaga</button>`
                : `<p class="help" style="margin-top:8px">Cadastro demonstrativo — sem vaga clicável neste protótipo.</p>`
            }
          </div>
        </div>`;
      })
      .join("");
  }

  function colabResultsHtml() {
    const { needLoc, list } = filteredColabs();
    if (needLoc) {
      return `<div class="card muted">Ative “Usar minha localização” para ver colaboradores disponíveis perto de você. A localização deste protótipo é simulada em Joinville, SC.</div>`;
    }
    if (!list.length) return `<div class="card muted">Nenhum colaborador encontrado com esses filtros.</div>`;
    return list
      .map((c) => {
        const km = state.search.mode === "perto" && state.search.located ? `<span>${c.km.toString().replace(".", ",")} km</span>` : "";
        return `<div class="result-card">
          ${avatar(c)}
          <div class="body">
            <div class="demo-tag">Perfil demonstrativo</div>
            <h3>${c.name}</h3>
            <div class="result-meta">
              <span>${segsLabel(c.segs)}</span>
              <span>${availLabel(c.avail)}</span>
              <span>${ic.pin} ${c.city}, ${c.uf}</span>
              ${km}
            </div>
            <div style="margin-top:6px">${stars(c.stars)}</div>
          </div>
        </div>`;
      })
      .join("");
  }

  function companyEventIds(id) {
    if (id === "sul") return ["expoville"];
    if (id === "aurora") return ["mueller"];
    return [];
  }

  function shiftForEvent(eventId) {
    const s = SHIFTS.find((x) => x.event === eventId);
    return s ? s.id : "s1";
  }

  function initialsOf(name) {
    return name
      .split(" ")
      .filter((w) => w[0] && w[0] === w[0].toUpperCase() && !w.startsWith("("))
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
  }

  function renderConversas() {
    const list = myThreads();
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      ${topbar("Conversas", "#/home")}
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        <p class="muted small" style="margin-bottom:14px">O chat com a outra parte libera depois do pagamento no app. Contatos pessoais ficam ocultos. Combinar pagamento fora do aplicativo leva ao banimento.</p>
        ${
          list.length
            ? list.map((th) => threadRow(th)).join("")
            : `<div class="card muted">Nenhuma conversa neste perfil de demonstração.</div>`
        }
      </div>
      ${toastEl()}
    </section>`;
  }

  function threadRow(th) {
    const paid = isPaid(th.eventId);
    const ev = eventById(th.eventId);
    const msgs = threadMessages(th.id);
    const last = msgs[msgs.length - 1];
    const preview = paid
      ? last
        ? last.text
        : "Conversa liberada. Envie a primeira mensagem."
      : "O chat libera após o pagamento";
    const who = otherAvatar(th);
    const sub = ev ? ev.title : th.eventId;
    const status = paid
      ? `<span class="thread-status open">${ic.check} Liberada</span>`
      : `<span class="thread-status locked">${ic.lock} Bloqueada</span>`;
    return `<button class="chat-thread" data-go="#/chat/${th.id}">
      ${avatar(who)}
      <div class="mid">
        <b>${otherName(th)}</b>
        <div class="preview">${preview}</div>
        <span class="help">${sub}${isColab() ? "" : ` • ${th.colabRole}`}</span>
      </div>
      ${status}
    </button>`;
  }

  function renderChat(id) {
    const th = threadById(id);
    if (!th) {
      return `<section class="screen ${anim()}">
        ${topbar("Conversa", "#/conversas")}
        <div class="pad"><div class="card muted">Conversa não encontrada neste protótipo.</div></div>
      </section>`;
    }
    const paid = isPaid(th.eventId);
    const ev = eventById(th.eventId);
    const title = otherName(th);
    if (!paid) return renderLockedChat(th, ev);
    seedChat(th.id);
    const msgs = threadMessages(th.id);
    return `<section class="screen chat-screen ${anim()}">
      ${topbar(title, "#/conversas")}
      <div class="notice chat-banner">${ic.lock} Contatos pessoais ficam ocultos. Combinar pagamento fora do aplicativo leva ao banimento dos dois lados.${ev ? ` Evento: ${ev.title}.` : ""}</div>
      <div class="msgs" id="msgs">${msgs.map((m) => bubbleHtml(m)).join("")}</div>
      <form class="composer" id="composer">
        <input id="chatInput" type="text" placeholder="Mensagem" autocomplete="off" maxlength="400" />
        <button class="send" type="submit" aria-label="Enviar">${ic.send}</button>
      </form>
      ${toastEl()}
    </section>`;
  }

  function bubbleHtml(m) {
    const mine = isColab() ? m.from === "colab" : m.from === "company";
    return `<div class="bubble ${mine ? "me" : "them"}">${escapeHtml(m.text)}<span class="t">${m.time}</span></div>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderLockedChat(th, ev) {
    const who = otherName(th);
    const evTitle = ev ? ev.title : "este evento";
    const companyView = isCompany();
    const total = ev ? evCompanyTotal(ev) : 0;
    return `<section class="screen chat-screen ${anim()}">
      ${topbar(who, "#/conversas")}
      <div class="chat-locked">
        <div class="lock-ico">${ic.lock}</div>
        <h2 style="font-size:20px;margin-bottom:8px">O chat libera após o pagamento</h2>
        <p class="muted small" style="max-width:320px;margin-bottom:14px">
          ${
            companyView
              ? `Pague a equipe no app para conversar com ${th.colabName} sobre ${evTitle}. Contatos pessoais ficam ocultos.`
              : `${th.companyName} ainda não concluiu o pagamento de ${evTitle} no app. Quando o pagamento for confirmado, a conversa abre por aqui. Contatos pessoais ficam ocultos.`
          }
        </p>
        <div class="notice" style="text-align:left;max-width:320px">${ic.lock} Combinar pagamento fora do aplicativo leva ao banimento dos dois lados.</div>
        ${
          companyView && ev
            ? `<button class="btn btn-primary" style="margin-top:18px;width:100%;max-width:320px" data-payresto="${ev.id}">Pagar equipe no app • ${brl(total)}</button>`
            : `<button class="btn btn-ghost" style="margin-top:18px;width:100%;max-width:320px" data-simpay="${th.eventId}">Protótipo · simular pagamento da empresa</button>`
        }
      </div>
      ${toastEl()}
    </section>`;
  }

  function bind(p) {
    view.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const dir = el.getAttribute("data-dir") || "left";
        const cat = el.getAttribute("data-setcat");
        if (cat) {
          state.item.cat = cat;
          const c = catBy(cat);
          state.item.rate = c.rec;
          state.item.acceptLow = false;
          state.item.days = state.event.days;
          state.item.start = state.event.start;
          state.item.end = state.event.end;
          state.item.hours = state.event.hours;
        }
        go(el.getAttribute("data-go"), { dir });
      });
    });

    if (p.name === "onboarding") bindOnboard();
    if (p.name === "tipo") bindTipo();
    if (p.name === "cadastro") bindCadastro(p.id);
    if (p.name === "demo") bindDemo();
    if (p.name === "solicitar") bindSolicitar(p.id || "evento");
    if (p.name === "vaga") bindVaga();
    if (p.name === "checkin") bindCheckin(p.id);
    if (p.name === "home" && isColab()) bindHomeColab();
    if (p.name === "carteira") bindCarteira();
    if (p.name === "avaliar") bindAvaliar();
    if (p.name === "perfil") bindPerfil();
    if (p.name === "evento" || p.name === "pagamentos" || p.name === "chat") bindPay();
    if (p.name === "vaga" || p.name === "carteira") bindSim();
    if (p.name === "segmentos") bindSegmentos();
    if (p.name === "busca") bindBusca();
    if (p.name === "chat") bindChat(p.id);
    if (p.name === "splash") {
      clearTimeout(window.__asaelSplash);
      window.__asaelSplash = setTimeout(() => {
        if (path().name === "splash") go("#/onboarding", { replace: true, dir: "none" });
      }, 1600);
    }
  }

  function bindOnboard() {
    const track = document.getElementById("track");
    const dots = document.getElementById("dots");
    const btn = document.getElementById("nextSlide");
    if (!track) return;
    const total = track.children.length;
    const update = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      [...dots.children].forEach((d, idx) => d.classList.toggle("on", idx === i));
      btn.textContent = i >= total - 1 ? "Começar" : "Continuar";
    };
    track.addEventListener("scroll", () => update(), { passive: true });
    btn.addEventListener("click", () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i >= total - 1) go("#/welcome");
      else track.scrollTo({ left: (i + 1) * track.clientWidth, behavior: "smooth" });
    });
  }

  function bindTipo() {
    view.querySelectorAll("[data-type]").forEach((el) => {
      el.addEventListener("click", () => {
        state.accountType = el.getAttribute("data-type");
        render();
      });
    });
    const btn = document.getElementById("tipoContinuar");
    if (btn) btn.addEventListener("click", () => go("#/cadastro"));
  }

  function bindCadastro(step) {
    view.querySelectorAll("[data-toggleseg]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-toggleseg");
        if (state.signupSegs.includes(id)) state.signupSegs = state.signupSegs.filter((s) => s !== id);
        else state.signupSegs = [...state.signupSegs, id];
        render();
      });
    });
    const segNext = document.getElementById("segNext");
    if (segNext) segNext.addEventListener("click", () => go("#/cadastro/docs"));

    const aceite = document.getElementById("aceite");
    const btn = document.getElementById("enviarCadastro");
    const sync = () => {
      if (btn) btn.disabled = !(aceite && aceite.checked);
    };
    if (aceite) aceite.addEventListener("change", sync);
    sync();
    view.querySelectorAll("[data-upload]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-upload");
        state.uploads[id] = "arquivo_enviado.pdf";
        render();
      });
    });
    if (btn)
      btn.addEventListener("click", () => {
        if (state.accountType) state.role = state.accountType;
        if (state.accountType === "colaborador") {
          const next = { ...demoSegments() };
          CATS.forEach((c) => {
            if (state.signupSegs.includes(c.id)) next[c.id] = "em-analise";
            else next[c.id] = "pendente";
          });
          state.segments = next;
        }
        go("#/verificacao");
      });
  }

  function bindDemo() {
    view.querySelectorAll("[data-role]").forEach((el) => {
      el.addEventListener("click", () => {
        state.role = el.getAttribute("data-role");
        state.toast = null;
        state.search = { mode: "perto", located: false, uf: "SC", q: "", seg: "all", avail: "all", minStars: 0 };
        if (state.role === "colaborador") state.segments = demoSegments();
        go("#/home");
      });
    });
  }

  function saveEventFields() {
    const title = document.getElementById("ev-title");
    const address = document.getElementById("ev-address");
    const date = document.getElementById("ev-date");
    const shift = document.getElementById("ev-shift");
    if (title) state.event.title = title.value;
    if (address) state.event.address = address.value;
    if (date) state.event.date = date.value;
    if (shift) {
      const [a, b] = shift.value.split("-");
      state.event.start = a;
      state.event.end = b;
      state.item.start = a;
      state.item.end = b;
    }
    state.item.days = state.event.days;
    state.item.hours = state.event.hours;
    state.item.date = state.event.date;
  }

  function bindSolicitar(step) {
    view.querySelectorAll("[data-setcat]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-setcat");
        state.item.cat = id;
        const c = catBy(id);
        state.item.rate = c.rec;
        state.item.acceptLow = false;
        render();
      });
    });
    view.querySelectorAll(".qty[data-ev]").forEach((box) => {
      const key = box.getAttribute("data-ev");
      box.querySelectorAll("[data-delta]").forEach((b) => {
        b.addEventListener("click", () => {
          saveEventFields();
          const d = Number(b.getAttribute("data-delta"));
          state.event[key] = Math.min(30, Math.max(1, (state.event[key] || 1) + d));
          render();
        });
      });
    });
    view.querySelectorAll(".qty[data-item]").forEach((box) => {
      const key = box.getAttribute("data-item");
      box.querySelectorAll("[data-delta]").forEach((b) => {
        b.addEventListener("click", () => {
          const sh = document.getElementById("it-shift");
          if (sh) {
            const [a, b2] = sh.value.split("-");
            state.item.start = a;
            state.item.end = b2;
          }
          const d = Number(b.getAttribute("data-delta"));
          const min = 1;
          const max = key === "qty" ? 200 : 30;
          state.item[key] = Math.min(max, Math.max(min, (state.item[key] || 1) + d));
          render();
        });
      });
    });
    const evNext = document.getElementById("eventoNext");
    if (evNext) {
      evNext.addEventListener("click", () => {
        saveEventFields();
        go("#/solicitar/cat");
      });
    }
    const rate = document.getElementById("rq-rate");
    if (rate) {
      rate.addEventListener("change", () => applyRate(rate.value));
      rate.addEventListener("blur", () => applyRate(rate.value));
    }
    const aceita = document.getElementById("aceiteBaixo");
    if (aceita) {
      aceita.addEventListener("change", () => {
        state.item.acceptLow = aceita.checked;
        render();
      });
    }
    const add = document.getElementById("addCart");
    if (add) {
      add.addEventListener("click", () => {
        const sh = document.getElementById("it-shift");
        if (sh) {
          const [a, b] = sh.value.split("-");
          state.item.start = a;
          state.item.end = b;
        }
        const it = state.item;
        const existing = state.cart.find((x) => x.cat === it.cat && x.start === it.start);
        if (existing) {
          existing.qty = it.qty;
          existing.rate = it.rate;
          existing.days = it.days;
          existing.hours = it.hours;
        } else {
          state.cart.push({
            id: "c" + Date.now(),
            cat: it.cat,
            qty: it.qty,
            rate: it.rate,
            days: it.days,
            hours: it.hours,
            start: it.start,
            end: it.end,
            date: it.date || state.event.date,
          });
        }
        flashToast("Função adicionada ao evento.");
        go("#/solicitar/carrinho");
      });
    }
    view.querySelectorAll("[data-removecart]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = el.getAttribute("data-removecart");
        state.cart = state.cart.filter((i) => i.id !== id);
        render();
      });
    });
    const conf = document.getElementById("confirmarPedido");
    if (conf) {
      conf.addEventListener("click", () => {
        state.lastEvent = {
          title: state.event.title,
          functions: state.cart.map((i) => ({ cat: i.cat, qty: i.qty, rate: i.rate })),
          total: cartTotal(),
        };
        state.confirmed.push(state.lastEvent);
        state.cart = [];
        flashToast("Pedido do evento enviado.");
        go("#/solicitar/ok");
      });
    }
  }

  function applyRate(val) {
    const n = parseRate(val);
    if (!Number.isFinite(n)) return;
    state.item.rate = n;
    state.item.acceptLow = false;
    render();
    const input = document.getElementById("rq-rate");
    if (input) {
      input.value = formatRateInput(n);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  function bindVaga() {
    bindSim();
    const acc = view.querySelector("[data-accept]");
    if (acc) {
      acc.addEventListener("click", () => {
        const id = acc.getAttribute("data-accept");
        state.accepted[id] = true;
        flashToast("Plantão aceito. No dia, faça o check-in no local.");
        go(`#/vaga/${id}`, { replace: true, dir: "none" });
      });
    }
    const cancel = view.querySelector("[data-cancel]");
    if (cancel) {
      cancel.addEventListener("click", () => {
        const id = cancel.getAttribute("data-cancel");
        delete state.accepted[id];
        flashToast("Aceite cancelado.");
        go(`#/vaga/${id}`, { replace: true, dir: "none" });
      });
    }
  }

  function bindSim() {
    view.querySelectorAll(".qty[data-sim]").forEach((box) => {
      const key = box.getAttribute("data-sim");
      box.querySelectorAll("[data-delta]").forEach((b) => {
        b.addEventListener("click", () => {
          const d = Number(b.getAttribute("data-delta"));
          const min = 1;
          const max = key === "simHours" ? 24 : 30;
          state[key] = Math.min(max, Math.max(min, (state[key] || 1) + d));
          render();
        });
      });
    });
  }

  function bindCheckin(id) {
    const file = document.getElementById("fotoCheckin");
    const btn = document.getElementById("tirarFoto");
    const conf = document.getElementById("confirmarCheck");
    if (btn && file) {
      btn.addEventListener("click", () => file.click());
      file.addEventListener("change", () => {
        const f = file.files && file.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.checkinPhoto = reader.result;
          render();
        };
        reader.readAsDataURL(f);
      });
    }
    if (conf) {
      conf.addEventListener("click", () => {
        const current = state.checkins[id];
        if (current === "in") {
          state.checkins[id] = "done";
          state.checkinPhoto = null;
          flashToast("Check-out registrado. Valor liberado na carteira Asael.");
          go(`#/avaliar/${id}`);
        } else {
          state.checkins[id] = "in";
          state.checkinPhoto = null;
          flashToast("Check-in confirmado. Bom plantão!");
          go(`#/vaga/${id}`);
        }
      });
    }
  }

  function bindHomeColab() {
    const chips = view.querySelectorAll("#filterCats .chip");
    chips.forEach((ch) => {
      ch.addEventListener("click", () => {
        state.shiftFilter = ch.getAttribute("data-filter");
        render();
      });
    });
  }

  function bindCarteira() {
    bindSim();
    const btn = document.getElementById("sacarPix");
    if (!btn) return;
    btn.addEventListener("click", () => openSheet(`
      <div class="handle"></div>
      <h2 style="font-size:20px;margin-bottom:6px">Sacar via Pix</h2>
      <p class="muted small" style="margin-bottom:14px">O valor sai da sua conta Asael para uma chave Pix cadastrada. Neste protótipo o saque é só visual.</p>
      <div class="field"><label>Valor</label><input value="1.760,00" /></div>
      <div class="field"><label>Chave de destino</label><input value="carlos.mendes@email.com" /></div>
      <button class="btn btn-primary" id="confirmarSaque">Confirmar saque de ${brl(1760)}</button>
    `, (sheet) => {
      sheet.querySelector("#confirmarSaque").addEventListener("click", () => {
        closeSheet();
        flashToast("Saque simulado. No app real, cai em até 1 dia útil.");
        render();
      });
    }));
  }

  function bindAvaliar() {
    view.querySelectorAll("[data-star]").forEach((b) => {
      b.addEventListener("click", () => {
        state.rating = Number(b.getAttribute("data-star"));
        render();
      });
    });
    const btn = document.getElementById("enviarAval");
    if (btn)
      btn.addEventListener("click", () => {
        flashToast("Avaliação enviada. Obrigado!");
        state.rating = 0;
        go(isColab() ? "#/plantoes" : "#/home");
      });
  }

  function bindPerfil() {
    const t = document.getElementById("toggleLight");
    if (t)
      t.addEventListener("click", () => {
        state.light = !state.light;
        render();
      });
  }

  function bindSegmentos() {
    view.querySelectorAll("[data-upload]").forEach((el) => {
      el.addEventListener("click", () => {
        state.uploads[el.getAttribute("data-upload")] = "arquivo_enviado.pdf";
        render();
      });
    });
    view.querySelectorAll("[data-sendseg]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-sendseg");
        const c = catBy(id);
        const ok = c.docs.every((d) => state.uploads[d.id]);
        if (!ok) {
          flashToast("Anexe os documentos deste segmento para enviar.");
          render();
          return;
        }
        state.segments[id] = "em-analise";
        flashToast("Cadastro enviado. Este segmento entra em análise.");
        render();
      });
    });
  }

  function bindPay() {
    view.querySelectorAll("[data-payresto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-payresto");
        markPaid(id);
        flashToast("Pagamento da equipe simulado. As conversas foram liberadas.");
        const p = path();
        if (p.name === "chat") go(`#/chat/${p.id}`, { dir: "none", replace: true });
        else render();
      });
    });
    view.querySelectorAll("[data-simpay]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-simpay");
        markPaid(id);
        flashToast("Pagamento da empresa simulado. A conversa foi liberada.");
        const p = path();
        if (p.name === "chat") go(`#/chat/${p.id}`, { dir: "none", replace: true });
        else render();
      });
    });
  }

  function bindBusca() {
    view.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.search.mode = btn.getAttribute("data-mode");
        render();
      });
    });
    const loc = view.querySelector("#useLoc");
    if (loc) {
      loc.addEventListener("click", () => {
        state.search.located = true;
        state.search.mode = "perto";
        state.search.uf = "SC";
        flashToast("Localização simulada: Joinville, SC.");
        render();
      });
    }
    const uf = view.querySelector("#ufSel");
    if (uf) {
      uf.addEventListener("change", () => {
        state.search.uf = uf.value;
        refreshSearchResults();
      });
    }
    const q = view.querySelector("#qCity");
    if (q) {
      q.addEventListener("input", () => {
        state.search.q = q.value;
        refreshSearchResults();
      });
    }
    const seg = view.querySelector("#segSel");
    if (seg) {
      seg.addEventListener("change", () => {
        state.search.seg = seg.value;
        refreshSearchResults();
      });
    }
    const avail = view.querySelector("#availSel");
    if (avail) {
      avail.addEventListener("change", () => {
        state.search.avail = avail.value;
        refreshSearchResults();
      });
    }
    const star = view.querySelector("#starSel");
    if (star) {
      star.addEventListener("change", () => {
        state.search.minStars = Number(star.value);
        refreshSearchResults();
      });
    }
  }

  function refreshSearchResults() {
    const box = view.querySelector("#searchResults");
    if (box) box.innerHTML = searchResultsHtml();
  }

  function bindChat(id) {
    const form = view.querySelector("#composer");
    const input = view.querySelector("#chatInput");
    const box = view.querySelector("#msgs");
    if (box) box.scrollTop = box.scrollHeight;
    if (!form || !input) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      seedChat(id);
      state.messages[id].push({
        from: isColab() ? "colab" : "company",
        text,
        time: nowTime(),
      });
      input.value = "";
      box.innerHTML = threadMessages(id).map((m) => bubbleHtml(m)).join("");
      box.scrollTop = box.scrollHeight;
    });
  }

  function openSheet(html, bindFn) {
    closeSheet();
    const wrap = document.createElement("div");
    wrap.className = "overlay";
    wrap.id = "sheet";
    wrap.innerHTML = `<div class="sheet">${html}</div>`;
    wrap.addEventListener("click", (e) => {
      if (e.target === wrap) closeSheet();
    });
    appEl.appendChild(wrap);
    if (bindFn) bindFn(wrap);
  }
  function closeSheet() {
    const s = document.getElementById("sheet");
    if (s) s.remove();
  }

  if (!location.hash || location.hash === "#" || location.hash === "#/") {
    history.replaceState({ dir: "none" }, "", "#/splash");
  }
  render();
})();
