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

  function render() {
    appEl.classList.toggle("light", state.light);
    const p = path();
    view.innerHTML = route(p);
    bind(p);
    if (state.toast) {
      setTimeout(() => {
        state.toast = null;
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
          ${cartBtn()}
        </div>
        <div class="pad">
          <button class="btn btn-primary" data-go="#/solicitar/evento" style="margin-top:4px">${ic.plus} Solicitar profissionais</button>
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
          <button class="icon-btn" aria-label="Notificações">${ic.bell}</button>
        </div>
        <div class="pad">
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
          .map(
            (t) => `<div class="tx">
            ${avatar(t)}
            <div class="mid"><b>${t.name}</b><span class="help">${t.role} • ${stars(t.stars)}</span></div>
          </div>`
          )
          .join("")}
        <p class="help" style="margin-top:8px">${ev.status === "confirmado" ? `${evTotalPeople(ev)} colaboradores confirmados` : "Aguardando mais aceites"}</p>
        ${
          isCompany()
            ? `<button class="btn btn-primary" style="margin-top:16px" data-payresto="${ev.id}">Pagar equipe no app • ${brl(total)}</button>
               <p class="help" style="text-align:center;margin-top:8px">O pagamento é feito de uma vez, para as contas Asael de toda a equipe.</p>`
            : ""
        }
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
    const ev = EVENTS[0];
    const total = evCompanyTotal(ev);
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:6px">Pagamentos</h1>
        <p class="muted small" style="margin-bottom:14px">Um único pagamento cobre toda a equipe do evento, só pelas contas Asael.</p>
        ${benefits([
          { icon: ic.lock, t: "Tudo no app, com comprovante", d: "Pague a equipe de uma vez e tenha o registro pronto para a contabilidade." },
          { icon: ic.card, t: "Sem pagamento por fora", d: "Quem pagar fora do aplicativo é banido." },
        ])}
        <div class="balance">
          <div class="lbl">Próximo pagamento • ${ev.title}</div>
          <div class="val" style="font-size:28px">${brl(total)}</div>
          <button class="btn btn-primary" data-payresto="expoville">Pagar equipe no app</button>
        </div>
        <div class="card" style="margin-top:14px">
          ${ev.functions
            .map((f) => `<div class="summary-row"><span class="k">${catBy(f.cat).short} • ${f.qty} × ${brlH(f.rate)}</span><span class="v">${brl(f.rate * ev.hours * ev.days * f.qty)}</span></div>`)
            .join("")}
          <div class="summary-row total"><span class="k">Total</span><span class="v">${brl(total)}</span></div>
        </div>
        <div class="card" style="margin-top:12px">
          <div class="tx">
            <div class="ico">${ic.check}</div>
            <div class="mid"><b>Pagamento • Black Friday Mueller</b><span class="help">20 nov • ${brl(16 * 12 * 8)}</span></div>
          </div>
        </div>
      </div>
      ${tabbar("pagamentos")}
      ${toastEl()}
    </section>`;
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
    if (p.name === "evento" || p.name === "pagamentos") bindPay();
    if (p.name === "vaga" || p.name === "carteira") bindSim();
    if (p.name === "segmentos") bindSegmentos();
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
        state.toast = "Função adicionada ao evento.";
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
        state.toast = "Pedido do evento enviado.";
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
        state.toast = "Plantão aceito. No dia, faça o check-in no local.";
        go(`#/vaga/${id}`, { replace: true, dir: "none" });
      });
    }
    const cancel = view.querySelector("[data-cancel]");
    if (cancel) {
      cancel.addEventListener("click", () => {
        const id = cancel.getAttribute("data-cancel");
        delete state.accepted[id];
        state.toast = "Aceite cancelado.";
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
          state.toast = "Check-out registrado. Valor liberado na carteira Asael.";
          go(`#/avaliar/${id}`);
        } else {
          state.checkins[id] = "in";
          state.checkinPhoto = null;
          state.toast = "Check-in confirmado. Bom plantão!";
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
        state.toast = "Saque simulado. No app real, cai em até 1 dia útil.";
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
        state.toast = "Avaliação enviada. Obrigado!";
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
          state.toast = "Anexe os documentos deste segmento para enviar.";
          render();
          return;
        }
        state.segments[id] = "em-analise";
        state.toast = "Cadastro enviado. Este segmento entra em análise.";
        render();
      });
    });
  }

  function bindPay() {
    view.querySelectorAll("[data-payresto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.toast = "Pagamento da equipe simulado pelas contas Asael.";
        render();
      });
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
