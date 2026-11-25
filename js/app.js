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
    star: svg(`<path d="M12 3l2.4 5.7L21 9.5l-4.5 4 1.2 6.5L12 17.3 6.3 20l1.2-6.5L3 9.5l6.6-.8z"/>`, "0 0 24 24"),
    alert: svg(`<path d="M12 8v5M12 16.5h.01"/><path d="M10.3 4.2L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.2a2 2 0 00-3.4 0z"/>`),
    close: svg(`<path d="M6 6l12 12M18 6L6 18"/>`),
    logout: svg(`<path d="M9 6H5v12h4M10 12h9M15 8l4 4-4 4"/>`),
    card: svg(`<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`),
    file: svg(`<path d="M13 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M13 3v5h5"/>`),
    heart: svg(`<path d="M12 5c1.5-2 5-2.2 6.5 0C20.5 7.2 20 11 12 17 4 11 3.5 7.2 5.5 5 7 2.8 10.5 3 12 5z"/>`),
    info: svg(`<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7.5h.01"/>`),
    lock: svg(`<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>`),
    nurse: svg(`<circle cx="12" cy="8" r="3.2"/><path d="M4.5 20a7.5 7.5 0 0115 0"/><path d="M12 13v3M10.5 14.5h3"/>`),
    skip: svg(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  };

  const CATS = [
    { id: "vigilancia", name: "Vigilância", short: "Vigilância", min: 20, rec: 20.5, fee: 1.5, cut: 2.5, legal: "vigilancia" },
    { id: "portaria", name: "Portaria e controle de acesso", short: "Portaria", min: 14, rec: 16, fee: 1, cut: 2 },
    { id: "bombeiro", name: "Bombeiro civil", short: "Bombeiro civil", min: 18, rec: 18.5, fee: 1.5, cut: 2.5 },
    { id: "brigadista", name: "Brigadista", short: "Brigadista", min: 14, rec: 15, fee: 1, cut: 2 },
    { id: "limpeza", name: "Limpeza", short: "Limpeza", min: 13, rec: 14, fee: 1, cut: 2 },
    { id: "enfermagem", name: "Técnico de enfermagem", short: "Enfermagem", min: 18, rec: 22, fee: 1.5, cut: 2.5 },
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

  const USERS = {
    contratante: { name: "Eventos Aurora", roleLabel: "Empresa contratante", city: "Joinville, SC", initials: "EA" },
    terceirizada: { name: "Sul Seguranças", roleLabel: "Empresa terceirizada", city: "Joinville, SC", initials: "SS" },
    profissional: { name: "Carlos Mendes", roleLabel: "Vigilante", city: "Joinville, SC", initials: "CM", avatar: "assets/avatars/avatar-carlos.webp", stars: 4.9, category: "Vigilante" },
  };

  const TEAM = [
    { name: "Carlos Mendes", role: "Vigilante", stars: 4.9, avatar: "assets/avatars/avatar-carlos.webp", initials: "CM" },
    { name: "Ana Paula Souza", role: "Portaria", stars: 4.8, avatar: "assets/avatars/avatar-ana.webp", initials: "AP" },
    { name: "Rafael Lima", role: "Bombeiro civil", stars: 5.0, avatar: "assets/avatars/avatar-rafael.webp", initials: "RL" },
    { name: "Lucas Ferreira", role: "Vigilante", stars: 4.7, avatar: "assets/avatars/avatar-lucas.webp", initials: "LF" },
    { name: "Juliana Costa", role: "Enfermagem", stars: 4.9, initials: "JC" },
    { name: "Bruno Alves", role: "Brigadista", stars: 4.6, initials: "BA" },
  ];

  const EVENTS = [
    {
      id: "expoville",
      title: "Show no Expoville",
      place: "Expoville",
      address: "Rua XV de Novembro, 4315 — América, Joinville, SC",
      when: "12 dez • 18h–06h",
      date: "12 de dezembro de 2026",
      start: "18:00",
      end: "06:00",
      hours: 12,
      days: 1,
      qty: 24,
      cat: "vigilancia",
      rate: 20.5,
      photo: "assets/photos/noite.webp",
      status: "confirmado",
    },
    {
      id: "mueller",
      title: "Black Friday no Shopping Mueller",
      place: "Shopping Mueller",
      address: "Rua Princesa Isabel, 438 — Centro, Joinville, SC",
      when: "27 nov • 10h–22h",
      date: "27 de novembro de 2026",
      start: "10:00",
      end: "22:00",
      hours: 12,
      days: 1,
      qty: 8,
      cat: "portaria",
      rate: 16,
      photo: "assets/photos/portaria.webp",
      status: "aberto",
    },
    {
      id: "centreventos",
      title: "Congresso no Centreventos",
      place: "Centreventos Cau Hansen",
      address: "Av. José Vieira, 315 — América, Joinville, SC",
      when: "05 dez • 08h–20h",
      date: "5 de dezembro de 2026",
      start: "08:00",
      end: "20:00",
      hours: 12,
      days: 2,
      qty: 12,
      cat: "bombeiro",
      rate: 18.5,
      photo: "assets/photos/conferencia.webp",
      status: "aberto",
    },
    {
      id: "atlantico",
      title: "Portaria no Club Atlântico",
      place: "Club Atlântico",
      address: "Rua Visconde de Taunay, 890 — Bucarein, Joinville, SC",
      when: "28 nov • 22h–10h",
      date: "28 de novembro de 2026",
      start: "22:00",
      end: "10:00",
      hours: 12,
      days: 1,
      qty: 6,
      cat: "portaria",
      rate: 16,
      photo: "assets/photos/balada.webp",
      status: "aberto",
    },
  ];

  const SHIFTS = [
    { id: "s1", event: "expoville", net: 18, spots: 4, distance: "3,2 km" },
    { id: "s2", event: "mueller", net: 14, spots: 3, distance: "1,8 km" },
    { id: "s3", event: "centreventos", net: 16, spots: 5, distance: "2,4 km" },
    { id: "s4", event: "atlantico", net: 14, spots: 2, distance: "4,1 km" },
  ];

  const TX = [
    { title: "Plantão Expoville", date: "8 nov 2026", value: 216, type: "in" },
    { title: "Plantão Centreventos", date: "1 nov 2026", value: 216, type: "in" },
    { title: "Saque Pix", date: "2 nov 2026", value: -400, type: "out" },
    { title: "Plantão Shopping Mueller", date: "25 out 2026", value: 168, type: "in" },
  ];

  const state = {
    role: null,
    light: false,
    onboardIndex: 0,
    accountType: null,
    request: {
      cat: "vigilancia",
      qty: 12,
      days: 1,
      hours: 12,
      start: "18:00",
      end: "06:00",
      date: "2026-12-12",
      place: "Expoville",
      address: "Rua XV de Novembro, 4315 — América, Joinville, SC",
      title: "Show no Expoville",
      rate: 20.5,
      acceptLow: false,
    },
    accepted: {},
    checkins: {},
    checkinPhoto: null,
    uploads: {},
    rating: 0,
    lastRequest: null,
    toast: null,
  };

  const brl = (n) =>
    (Number(n) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const brlH = (n) => `${brl(n)}/h`;

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

  function pricing(cat, rate, qty, hours, days) {
    const c = typeof cat === "string" ? catBy(cat) : cat;
    const r = rate;
    const peopleHours = qty * hours * days;
    const feeHour = c.fee;
    const upfront = feeHour * peopleHours;
    const gross = r * peopleHours;
    const cut = c.cut * peopleHours;
    const netHour = Math.max(0, r - c.cut);
    const net = netHour * peopleHours;
    const rest = Math.max(0, gross - upfront);
    let level = "ok";
    if (r < c.min) level = "block";
    else if (r < c.rec) level = "warn";
    return { c, r, qty, hours, days, peopleHours, feeHour, upfront, gross, cut, netHour, net, rest, level };
  }

  function warningCopy(p) {
    const rec = brlH(p.c.rec);
    const min = brlH(p.c.min);
    if (p.level === "block") {
      return `O valor está abaixo do mínimo de ${min} para ${p.c.short.toLowerCase()}. Ajuste o valor para continuar.`;
    }
    if (p.c.id === "vigilancia") {
      return `O valor está abaixo do recomendado de ${rec}. Valores mais baixos dificultam o preenchimento da vaga, podem gerar avaliações ruins dos profissionais e chamam a atenção do sindicato da categoria. Deseja mesmo assim continuar?`;
    }
    return `O valor está abaixo do recomendado de ${rec}. Plantões com valor menor costumam demorar mais para preencher e podem gerar avaliações ruins. Deseja mesmo assim continuar?`;
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

  window.addEventListener("popstate", (e) => {
    navDir = (e.state && e.state.dir === "left") ? "right" : "right";
    render();
  });

  function render() {
    appEl.classList.toggle("light", state.light);
    const p = path();
    const html = route(p);
    view.innerHTML = html;
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
      case "cadastro": return renderCadastro();
      case "verificacao": return renderVerificacao();
      case "demo": return renderDemo();
      case "home": return renderHome();
      case "solicitar": return renderSolicitar(p.id || "cat");
      case "evento": return renderEvento(p.id);
      case "vaga": return renderVaga(p.id);
      case "checkin": return renderCheckin(p.id);
      case "plantoes": return renderPlantoes();
      case "carteira": return renderCarteira();
      case "pagamentos": return renderPagamentos();
      case "avaliar": return renderAvaliar(p.id);
      case "perfil": return renderPerfil();
      default: return renderSplash();
    }
  }

  const anim = () => (navDir === "right" ? "slide-right" : navDir === "none" ? "" : "slide-left");

  function topbar(title, backTo) {
    return `<header class="topbar">
      ${backTo ? `<button class="icon-btn" data-go="${backTo}" data-dir="right" aria-label="Voltar">${ic.back}</button>` : `<span style="width:40px"></span>`}
      <div class="head-title">${title}</div>
      <span style="width:40px"></span>
    </header>`;
  }

  function protoBtn() {
    if (!state.role) return "";
    return `<button class="proto-bar" data-go="#/demo" type="button">Protótipo · trocar perfil</button>`;
  }

  function tabbar(active) {
    const isPro = state.role === "profissional";
    const items = isPro
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
        t: "Profissionais verificados, na hora que você precisa",
        d: "A empresa publica o plantão, os profissionais aceitam no app e o check-in é feito com foto e GPS. Tudo no mesmo lugar.",
      },
      {
        img: "assets/photos/onboard-2.webp",
        k: "Para empresas",
        t: "Monte a equipe do evento em minutos",
        d: "Solicite pelo app, pague em um único Pix para as contas Asael e tenha comprovante pronto para a contabilidade.",
      },
      {
        img: "assets/photos/onboard-3.webp",
        k: "Para profissionais",
        t: "Escolha o plantão e veja o valor líquido",
        d: "Aceite vagas perto de você, faça o check-in no local e receba na sua conta Asael, com o líquido visível antes de aceitar.",
      },
      {
        img: "assets/photos/onboard-4.webp",
        k: "Pagamento seguro",
        t: "Só existe pagamento dentro do app",
        d: "O Pix vai para a chave Asael do profissional. Quem pagar ou receber por fora é banido — dos dois lados.",
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
          <h1 style="font-size:26px;margin:8px 0 8px">Profissionais verificados, na hora que você precisa</h1>
          <p class="muted" style="font-size:15px;line-height:1.45">Conectamos empresas e profissionais em Santa Catarina, com pagamento seguro dentro do app.</p>
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
      { id: "profissional", icon: ic.people, t: "Profissional", d: "Vigilante, portaria, bombeiro civil, brigadista, limpeza ou enfermagem" },
      { id: "terceirizada", icon: ic.shield, t: "Empresa de Segurança Terceirizada", d: "Empresa autorizada pela Polícia Federal. Pode publicar vagas de vigilância." },
      { id: "contratante", icon: ic.brief, t: "Empresa Contratante", d: "Eventos, mercados, baladas e comércios que precisam montar uma equipe" },
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

  function renderCadastro() {
    const t = state.accountType || "profissional";
    const titles = {
      profissional: "Cadastro do profissional",
      terceirizada: "Cadastro da empresa terceirizada",
      contratante: "Cadastro da empresa contratante",
    };
    let fields = "";
    if (t === "profissional") {
      fields = `
        <div class="field"><label>Nome completo</label><input id="f-nome" value="Carlos Mendes" /></div>
        <div class="field"><label>CPF</label><input id="f-cpf" inputmode="numeric" value="084.512.369-20" /></div>
        <div class="field"><label>Telefone</label><input id="f-tel" inputmode="tel" value="(47) 98821-3044" /></div>
        <div class="field"><label>E-mail</label><input id="f-email" type="email" value="carlos.mendes@email.com" /></div>
        <div class="field"><label>Categoria principal</label>
          <select id="f-cat">
            <option value="vigilancia" selected>Vigilante</option>
            <option value="portaria">Portaria e controle de acesso</option>
            <option value="bombeiro">Bombeiro civil</option>
            <option value="brigadista">Brigadista</option>
            <option value="limpeza">Limpeza</option>
            <option value="enfermagem">Técnico de enfermagem</option>
          </select>
        </div>
        <p class="tiny" style="margin: 8px 0 10px">Documentos</p>
        ${uploadBtn("cnv", "CNV (Carteira Nacional de Vigilante)", "Obrigatória para vagas de vigilância")}
        ${uploadBtn("reciclagem", "Certificado de reciclagem", "Em dia, conforme a validade")}
        ${uploadBtn("antecedentes", "Certidão de antecedentes criminais", "")}
        ${uploadBtn("selfie", "Selfie para conferência", "O rosto deve aparecer nítido, como no documento")}
        <p class="notice" style="margin: 8px 0 14px">A conta Asael para receber os plantões é criada automaticamente no cadastro. O pagamento só entra por essa chave Pix.</p>
      `;
    } else {
      fields = `
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
    }
    return `<section class="screen ${anim()}">
      ${topbar(titles[t], "#/tipo")}
      <div class="scroll pad">
        ${fields}
        <label class="check" style="margin: 8px 0 20px">
          <input type="checkbox" id="aceite" />
          <span>Li e aceito os Termos de Uso. Pagamentos fora do aplicativo, por qualquer conta que não seja a conta Asael, resultam no banimento da empresa e do profissional.</span>
        </label>
        <button class="btn btn-primary" id="enviarCadastro" disabled>Enviar cadastro</button>
        <p class="help" style="text-align:center;margin-top:10px">Protótipo: os arquivos não são enviados a nenhum servidor.</p>
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
    const t = state.accountType || "profissional";
    const msg = {
      profissional: "Vamos conferir seus documentos e a validade da CNV, quando for o caso. Isso costuma levar até 24 horas.",
      terceirizada: "Vamos conferir o CNPJ e a autorização da Polícia Federal. Isso costuma levar até 24 horas.",
      contratante: "Vamos conferir o CNPJ da empresa. Isso costuma levar até 24 horas.",
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
      { id: "contratante", t: "Empresa Contratante", d: "Eventos Aurora — solicitar equipe, ver o próximo evento e pagar pelo app.", icon: ic.brief },
      { id: "terceirizada", t: "Empresa de Segurança Terceirizada", d: "Sul Seguranças — publicar vigilância e gerir a equipe autorizada.", icon: ic.shield },
      { id: "profissional", t: "Profissional", d: "Carlos Mendes, vigilante — vagas, check-in com foto e carteira Asael.", icon: ic.people },
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
    if (state.role === "profissional") return renderHomePro();
    return renderHomeEmpresa();
  }

  function renderHomeEmpresa() {
    const u = USERS[state.role] || USERS.contratante;
    const ev = EVENTS[0];
    const isTerc = state.role === "terceirizada";
    const cats = isTerc ? CATS : CATS; // contratante also can request vigilancia via partner
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav">
        <div class="greet under-proto">
          ${avatar(u, "")}
          <div class="who">
            <div class="hi">Olá</div>
            <h1>${u.name}</h1>
          </div>
          <button class="icon-btn" aria-label="Notificações">${ic.bell}</button>
        </div>
        <div class="pad">
          <button class="btn btn-primary" data-go="#/solicitar/cat" style="margin-top:8px">${ic.plus} Solicitar profissionais</button>
          ${
            !isTerc
              ? `<p class="help" style="margin:8px 0 0;text-align:center">Vagas de vigilância são atendidas por empresa autorizada pela Polícia Federal.</p>`
              : `<p class="help" style="margin:8px 0 0;text-align:center">Sua empresa pode publicar vagas de vigilância e das demais categorias.</p>`
          }
          <div class="section-h"><h2>Categorias</h2></div>
          <div class="cats">
            ${CATS.map(
              (c) => `<button class="cat" data-go="#/solicitar/cat" data-setcat="${c.id}">
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
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
                <div>
                  <div class="small muted" style="margin-bottom:6px">${ev.qty} profissionais confirmados</div>
                  <div class="avatar-stack">
                    ${TEAM.slice(0, 4).map((p) => avatar(p)).join("")}
                    <div class="avatar">+20</div>
                  </div>
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

  function renderHomePro() {
    const u = USERS.profissional;
    const open = SHIFTS.filter((s) => !state.checkins[s.id] || state.checkins[s.id] !== "done");
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
          <div class="balance" style="padding:16px 18px;margin-bottom:18px">
            <div class="lbl">Disponível na conta Asael</div>
            <div class="val" style="font-size:28px;margin-bottom:0">${brl(1760)}</div>
            <button class="btn btn-primary btn-sm" data-go="#/carteira" style="margin-top:12px;width:auto">Ver carteira</button>
          </div>
          <div class="chips" id="filterCats">
            <button class="chip on" data-filter="all">Todas</button>
            ${CATS.map((c) => `<button class="chip" data-filter="${c.id}">${c.short}</button>`).join("")}
          </div>
          <div class="section-h"><h2>Vagas abertas em Joinville</h2></div>
          <div id="shiftList" style="display:grid;gap:10px">
            ${SHIFTS.map((s) => shiftCard(s)).join("")}
          </div>
        </div>
      </div>
      ${tabbar("home")}
      ${toastEl()}
    </section>`;
  }

  function shiftCard(s) {
    const ev = EVENTS.find((e) => e.id === s.event);
    const c = catBy(ev.cat);
    const accepted = state.accepted[s.id];
    const cin = state.checkins[s.id];
    let badge = `<span class="badge badge-info">${s.spots} vagas</span>`;
    if (cin === "in" || cin === "done") badge = `<span class="badge badge-ok">Check-in feito</span>`;
    else if (accepted) badge = `<span class="badge badge-ok">Aceito</span>`;
    return `<button class="shift-card" data-go="#/vaga/${s.id}">
      <div class="row">
        <div>
          <div class="tiny" style="margin-bottom:2px">${c.short}</div>
          <h3>${ev.title}</h3>
        </div>
        ${badge}
      </div>
      <div class="shift-meta">
        <span>${ic.pin} ${ev.place}</span>
        <span>${ic.clock} ${ev.when}</span>
        <span>${s.distance}</span>
      </div>
      <div class="price">${brlH(s.net)} <span class="muted" style="font-size:12px;font-weight:500">líquido</span></div>
    </button>`;
  }

  function renderVaga(id) {
    const s = SHIFTS.find((x) => x.id === id) || SHIFTS[0];
    const ev = EVENTS.find((e) => e.id === s.event);
    const c = catBy(ev.cat);
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
              <span>${ic.clock} ${ev.date} • ${ev.start} às ${ev.end} (${ev.hours}h)</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="summary-row"><span class="k">Valor da hora (empresa)</span><span class="v">${brlH(ev.rate)}</span></div>
          <div class="summary-row"><span class="k">Taxa Asael</span><span class="v">− ${brlH(c.cut)}</span></div>
          <div class="summary-row total"><span class="k">Você recebe</span><span class="v">${brlH(s.net)}</span></div>
          <div class="summary-row"><span class="k">Plantão de ${ev.hours}h</span><span class="v">${brl(s.net * ev.hours)}</span></div>
        </div>
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
    const r = state.request;
    const c = catBy(r.cat);
    const steps = ["cat", "dados", "valor", "resumo", "ok"];
    const idx = Math.max(0, steps.indexOf(step));
    if (step === "ok") return renderSolicitarOk();
    const p = pricing(c, r.rate, r.qty, r.hours, r.days);
    return `<section class="screen ${anim()}">
      ${topbar("Solicitar profissionais", idx === 0 ? "#/home" : `#/solicitar/${steps[idx - 1]}`)}
      <div class="steps">${steps.slice(0, 4).map((_, i) => `<i class="${i <= idx ? "on" : ""}"></i>`).join("")}</div>
      <div class="scroll pad" style="padding-bottom:calc(24px + var(--safe-b))">
        ${idx === 0 ? solicitarCat() : ""}
        ${idx === 1 ? solicitarDados() : ""}
        ${idx === 2 ? solicitarValor(p) : ""}
        ${idx === 3 ? solicitarResumo(p) : ""}
      </div>
    </section>`;
  }

  function solicitarCat() {
    const r = state.request;
    const isTerc = state.role === "terceirizada";
    return `
      <h1 style="font-size:22px;margin-bottom:6px">Qual profissional você precisa?</h1>
      <p class="muted small" style="margin-bottom:16px">Escolha a função. O valor por hora e a taxa de adiantamento mudam conforme a categoria.</p>
      ${CATS.map((c) => {
        const locked = !isTerc && c.legal === "vigilancia";
        const note = locked ? "Atendida por empresa autorizada pela Polícia Federal, parceira do Asael." : "";
        return `<button class="account-card ${r.cat === c.id ? "selected" : ""}" data-setcat="${c.id}">
          <div class="ico">${CAT_ICON[c.id]}</div>
          <div>
            <h3>${c.name}</h3>
            <p>Sugerido ${brlH(c.rec)} • adiantamento ${brlH(c.fee)}</p>
            ${note ? `<p style="margin-top:4px;color:var(--cta)">${note}</p>` : ""}
          </div>
        </button>`;
      }).join("")}
      <button class="btn btn-primary" data-go="#/solicitar/dados" style="margin-top:8px">Continuar</button>
    `;
  }

  function solicitarDados() {
    const r = state.request;
    return `
      <h1 style="font-size:22px;margin-bottom:16px">Dados do plantão</h1>
      <div class="field"><label>Nome do evento ou local</label><input id="rq-title" value="${r.title}" /></div>
      <div class="field"><label>Endereço em Joinville</label><input id="rq-address" value="${r.address}" /></div>
      <div class="field"><label>Data de início</label><input id="rq-date" type="date" value="${r.date}" /></div>
      <div class="field"><label>Quantidade de dias</label>
        <div class="qty" data-qty="days"><button type="button" data-delta="-1">−</button><div class="n">${r.days}</div><button type="button" data-delta="1">+</button></div>
      </div>
      <div class="field"><label>Profissionais</label>
        <div class="qty" data-qty="qty"><button type="button" data-delta="-1">−</button><div class="n">${r.qty}</div><button type="button" data-delta="1">+</button></div>
      </div>
      <div class="field"><label>Turno</label>
        <select id="rq-shift">
          <option value="18:00-06:00" ${r.start === "18:00" ? "selected" : ""}>Noturno 12h — 18h às 06h</option>
          <option value="08:00-20:00" ${r.start === "08:00" ? "selected" : ""}>Diurno 12h — 08h às 20h</option>
          <option value="10:00-22:00" ${r.start === "10:00" ? "selected" : ""}>Comércio 12h — 10h às 22h</option>
          <option value="22:00-10:00" ${r.start === "22:00" ? "selected" : ""}>Balada 12h — 22h às 10h</option>
        </select>
      </div>
      <p class="notice">O plantão padrão do Asael é de 12 horas. O adiantamento é cobrado por hora de cada profissional, conforme o número de dias.</p>
      <button class="btn btn-primary" id="dadosNext" style="margin-top:16px">Continuar</button>
    `;
  }

  function solicitarValor(p) {
    const r = state.request;
    let box = "";
    if (p.level === "block") box = `<div class="err-box">${ic.alert} ${warningCopy(p)}</div>`;
    else if (p.level === "warn")
      box = `<div class="warn-box">${ic.alert} ${warningCopy(p)}
        <label class="check" style="margin-top:10px;color:inherit">
          <input type="checkbox" id="aceiteBaixo" ${r.acceptLow ? "checked" : ""} />
          <span>Sim, desejo continuar com este valor.</span>
        </label>
      </div>`;
    else box = `<div class="ok-box">Valor dentro do recomendado de ${brlH(p.c.rec)}. Os profissionais veem ${brlH(p.netHour)} líquidos.</div>`;
    const canNext = p.level === "ok" || (p.level === "warn" && r.acceptLow);
    return `
      <h1 style="font-size:22px;margin-bottom:6px">Valor por hora</h1>
      <p class="muted small" style="margin-bottom:16px">${p.c.name}. Mínimo ${brlH(p.c.min)} • recomendado ${brlH(p.c.rec)}.</p>
      <div class="rate-box">
        <span class="prefix">R$</span>
        <input class="rate-input ${p.level === "block" ? "invalid" : p.level === "warn" ? "warn" : ""}" id="rq-rate" inputmode="decimal" value="${formatRateInput(r.rate)}" />
      </div>
      ${box}
      <div class="card" style="margin-top:16px">
        <div class="summary-row"><span class="k">Líquido do profissional</span><span class="v">${brlH(p.netHour)}</span></div>
        <div class="summary-row"><span class="k">Taxa Asael (por hora)</span><span class="v">${brlH(p.c.cut)}</span></div>
        <div class="summary-row"><span class="k">Adiantamento para solicitar</span><span class="v">${brlH(p.feeHour)}</span></div>
      </div>
      <button class="btn btn-primary" data-go="#/solicitar/resumo" style="margin-top:16px" ${canNext ? "" : "disabled"} id="valorNext">Continuar</button>
    `;
  }

  function solicitarResumo(p) {
    const r = state.request;
    return `
      <h1 style="font-size:22px;margin-bottom:6px">Confira o pedido</h1>
      <p class="muted small" style="margin-bottom:16px">${r.title} • plantão de ${p.hours}h</p>
      <div class="card">
        <div class="summary-row"><span class="k">Função</span><span class="v">${p.c.name}</span></div>
        <div class="summary-row"><span class="k">Profissionais</span><span class="v">${p.qty}</span></div>
        <div class="summary-row"><span class="k">Dias</span><span class="v">${p.days}</span></div>
        <div class="summary-row"><span class="k">Turno</span><span class="v">${r.start} às ${r.end}</span></div>
        <div class="summary-row"><span class="k">Local</span><span class="v">${r.address}</span></div>
        <div class="summary-row"><span class="k">Valor da hora</span><span class="v ${p.level === "warn" ? "price yellow" : ""}">${brlH(p.r)}</span></div>
        <div class="summary-row"><span class="k">Líquido do profissional</span><span class="v">${brlH(p.netHour)}</span></div>
        <div class="summary-row"><span class="k">Total do evento (${p.peopleHours} horas)</span><span class="v">${brl(p.gross)}</span></div>
        <div class="summary-row total"><span class="k">Adiantamento agora</span><span class="v">${brl(p.upfront)}</span></div>
        <div class="summary-row"><span class="k">Restante no término</span><span class="v">${brl(p.rest)}</span></div>
      </div>
      <div class="notice" style="margin-top:12px">
        O adiantamento de ${brlH(p.feeHour)} por profissional reserva a equipe. O restante é pago só pelas chaves Pix Asael, dentro do app, no término do evento. Pagamento por fora = banimento da empresa e do profissional.
      </div>
      <button class="btn btn-primary" id="confirmarPedido" style="margin-top:16px">Pagar adiantamento de ${brl(p.upfront)}</button>
      <p class="help" style="text-align:center;margin-top:10px">Protótipo: nenhum pagamento real é feito.</p>
    `;
  }

  function renderSolicitarOk() {
    const p = state.lastRequest;
    return `<section class="screen ${anim()}">
      <div class="scroll pad" style="text-align:center;padding-top:calc(40px + var(--safe-t))">
        <div class="success-mark">${ic.check}</div>
        <h1 style="font-size:26px;margin-bottom:8px">Pedido enviado</h1>
        <p class="muted" style="line-height:1.5">${
          p
            ? `Reservamos ${p.qty} profissionais de ${p.c.short.toLowerCase()} para ${state.request.title}. O adiantamento de ${brl(p.upfront)} foi simulado.`
            : "Seu pedido foi registrado neste protótipo."
        }</p>
        <div class="notice" style="text-align:left;margin:20px 0">Os profissionais vão aparecer no plantão conforme aceitarem a vaga. O pagamento do restante entra no app, no término do evento.</div>
        <button class="btn btn-primary" data-go="#/home">Ir para o início</button>
        <button class="btn btn-ghost" data-go="#/plantoes">Ver plantões</button>
      </div>
    </section>`;
  }

  function renderPlantoes() {
    const isPro = state.role === "profissional";
    if (isPro) {
      const mine = SHIFTS.filter((s) => state.accepted[s.id] || state.checkins[s.id]);
      return `<section class="screen ${anim()}">
        ${protoBtn()}
        <div class="scroll has-nav pad" style="padding-top:16px">
          <h1 style="font-size:24px;margin-bottom:6px">Meus plantões</h1>
          <p class="muted small" style="margin-bottom:16px">Aceitos, em andamento e concluídos.</p>
          ${
            mine.length
              ? `<div style="display:grid;gap:10px">${mine.map((s) => shiftCard(s)).join("")}</div>`
              : `<div class="card muted">Você ainda não aceitou nenhum plantão. Veja as vagas abertas no início.</div>`
          }
          <div class="section-h"><h2>Histórico recente</h2></div>
          <div class="card">
            <div class="tx"><div class="ico">${ic.check}</div><div class="mid"><b>Show no Expoville</b><span class="help">8 nov • concluído • ${brl(216)}</span></div></div>
            <div class="tx"><div class="ico">${ic.check}</div><div class="mid"><b>Congresso no Centreventos</b><span class="help">1 nov • concluído • ${brl(216)}</span></div></div>
          </div>
        </div>
        ${tabbar("plantoes")}
      </section>`;
    }
    const list = EVENTS;
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:16px">Plantões</h1>
        <div style="display:grid;gap:12px">
          ${list
            .map((ev) => {
              const c = catBy(ev.cat);
              const st =
                ev.status === "confirmado"
                  ? `<span class="badge badge-ok">Equipe confirmada</span>`
                  : `<span class="badge badge-info">Aberto</span>`;
              return `<button class="shift-card" data-go="#/evento/${ev.id}">
                <div class="row"><div><div class="tiny">${c.short}</div><h3>${ev.title}</h3></div>${st}</div>
                <div class="shift-meta"><span>${ic.pin} ${ev.place}</span><span>${ic.clock} ${ev.when}</span><span>${ic.people} ${ev.qty}</span></div>
                <div class="price">${brlH(ev.rate)}</div>
              </button>`;
            })
            .join("")}
        </div>
      </div>
      ${tabbar("plantoes")}
    </section>`;
  }

  function renderEvento(id) {
    const ev = EVENTS.find((e) => e.id === id) || EVENTS[0];
    const c = catBy(ev.cat);
    const p = pricing(c, ev.rate, ev.qty, ev.hours, ev.days);
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
          <div class="summary-row"><span class="k">Função</span><span class="v">${c.name}</span></div>
          <div class="summary-row"><span class="k">Equipe</span><span class="v">${ev.qty} profissionais</span></div>
          <div class="summary-row"><span class="k">Valor da hora</span><span class="v">${brlH(ev.rate)}</span></div>
          <div class="summary-row"><span class="k">Adiantamento pago</span><span class="v">${brl(p.upfront)}</span></div>
          <div class="summary-row total"><span class="k">Restante no término</span><span class="v">${brl(p.rest)}</span></div>
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
        <p class="help" style="margin-top:8px">${ev.status === "confirmado" ? `+${Math.max(0, ev.qty - 6)} profissionais confirmados` : "Aguardando mais aceites"}</p>
        ${
          state.role !== "profissional"
            ? `<button class="btn btn-primary" style="margin-top:16px" data-payresto="${ev.id}">Pagar restante no app • ${brl(p.rest)}</button>
               <p class="help" style="text-align:center;margin-top:8px">O pagamento é feito de uma vez, para as chaves Asael de toda a equipe.</p>`
            : ""
        }
      </div>
      ${toastEl()}
    </section>`;
  }

  function renderCarteira() {
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:14px">Carteira Asael</h1>
        <div class="balance">
          <div class="lbl">Saldo disponível</div>
          <div class="val">${brl(1760)}</div>
          <button class="btn btn-primary" id="sacarPix">Sacar via Pix</button>
        </div>
        <div class="card" style="margin-top:12px">
          <div class="summary-row"><span class="k">A receber (plantões em aberto)</span><span class="v">${brl(216)}</span></div>
          <div class="summary-row"><span class="k">Chave Pix Asael</span><span class="v">carlos.mendes@asael.app</span></div>
        </div>
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
    const p = pricing(ev.cat, ev.rate, ev.qty, ev.hours, ev.days);
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav pad" style="padding-top:16px">
        <h1 style="font-size:24px;margin-bottom:6px">Pagamentos</h1>
        <p class="muted small" style="margin-bottom:16px">Adiantamentos e restantes, sempre pelas contas Asael.</p>
        <div class="balance">
          <div class="lbl">Próximo pagamento (término do Show no Expoville)</div>
          <div class="val" style="font-size:28px">${brl(p.rest)}</div>
          <button class="btn btn-primary" data-payresto="expoville">Pagar equipe no app</button>
        </div>
        <div class="card" style="margin-top:14px">
          <div class="tx">
            <div class="ico">${ic.check}</div>
            <div class="mid"><b>Adiantamento • Show no Expoville</b><span class="help">Pago em 10 nov • ${brl(p.upfront)}</span></div>
          </div>
          <div class="tx">
            <div class="ico">${ic.check}</div>
            <div class="mid"><b>Adiantamento • Black Friday Mueller</b><span class="help">Pago em 20 nov • ${brl(1 * 8 * 12)}</span></div>
          </div>
        </div>
        <div class="notice" style="margin-top:12px">Um único botão paga todos os profissionais do plantão. Quem pagar por fora é banido do aplicativo.</div>
      </div>
      ${tabbar("pagamentos")}
      ${toastEl()}
    </section>`;
  }

  function renderAvaliar(id) {
    const s = SHIFTS.find((x) => x.id === id) || SHIFTS[0];
    const ev = EVENTS.find((e) => e.id === s.event);
    const n = state.rating;
    const isPro = state.role === "profissional";
    return `<section class="screen ${anim()}">
      ${topbar("Avaliação", isPro ? `#/vaga/${s.id}` : "#/evento/" + ev.id)}
      <div class="scroll pad" style="text-align:center;padding-bottom:calc(24px + var(--safe-b))">
        <p class="kicker" style="margin-top:8px">Avaliação de duas vias</p>
        <h1 style="font-size:22px;margin-bottom:8px">${isPro ? "Como foi a empresa neste plantão?" : "Como foi a equipe?"}</h1>
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
    const isPro = state.role === "profissional";
    return `<section class="screen ${anim()}">
      ${protoBtn()}
      <div class="scroll has-nav" style="padding-top:16px;text-align:center">
        <div class="pad">
          ${avatar(u, "lg")}
          <h1 style="font-size:22px;margin:10px 0 2px">${u.name}</h1>
          <p class="muted small">${u.roleLabel} • ${u.city}</p>
          ${isPro ? `<div style="margin-top:6px">${stars(u.stars)}</div>` : ""}
        </div>
        <div class="pad profile-list" style="text-align:left;margin-top:18px">
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

  /* ------------ events ------------ */
  function bind(p) {
    view.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const dir = el.getAttribute("data-dir") || "left";
        const cat = el.getAttribute("data-setcat");
        if (cat) {
          state.request.cat = cat;
          const c = catBy(cat);
          state.request.rate = c.rec;
          state.request.acceptLow = false;
        }
        go(el.getAttribute("data-go"), { dir });
      });
    });

    if (p.name === "onboarding") bindOnboard();
    if (p.name === "tipo") bindTipo();
    if (p.name === "cadastro") bindCadastro();
    if (p.name === "demo") bindDemo();
    if (p.name === "solicitar") bindSolicitar(p.id || "cat");
    if (p.name === "vaga") bindVaga();
    if (p.name === "checkin") bindCheckin(p.id);
    if (p.name === "home" && state.role === "profissional") bindHomePro();
    if (p.name === "carteira") bindCarteira();
    if (p.name === "avaliar") bindAvaliar();
    if (p.name === "perfil") bindPerfil();
    if (p.name === "evento" || p.name === "pagamentos") bindPay();
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
      state.onboardIndex = i;
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

  function bindCadastro() {
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
        const names = {
          cnv: "CNV_CarlosMendes_2027.pdf",
          reciclagem: "Reciclagem_2026.pdf",
          antecedentes: "Antecedentes_SC.pdf",
          selfie: "selfie_verificacao.jpg",
          pf: "Autorizacao_PF_SulSegurancas.pdf",
          contrato: "Contrato_social.pdf",
        };
        state.uploads[id] = names[id] || "arquivo.pdf";
        render();
      });
    });
    if (btn)
      btn.addEventListener("click", () => {
        if (state.accountType) state.role = state.accountType;
        go("#/verificacao");
      });
  }

  function bindDemo() {
    view.querySelectorAll("[data-role]").forEach((el) => {
      el.addEventListener("click", () => {
        state.role = el.getAttribute("data-role");
        go("#/home");
      });
    });
  }

  function bindSolicitar(step) {
    view.querySelectorAll("[data-setcat]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-setcat");
        state.request.cat = id;
        const c = catBy(id);
        state.request.rate = c.rec;
        state.request.acceptLow = false;
        render();
      });
    });
    view.querySelectorAll(".qty").forEach((box) => {
      const key = box.getAttribute("data-qty");
      box.querySelectorAll("[data-delta]").forEach((b) => {
        b.addEventListener("click", () => {
          const d = Number(b.getAttribute("data-delta"));
          const min = key === "qty" ? 1 : 1;
          const max = key === "qty" ? 200 : 30;
          state.request[key] = Math.min(max, Math.max(min, (state.request[key] || 1) + d));
          render();
        });
      });
    });
    const next = document.getElementById("dadosNext");
    if (next) {
      next.addEventListener("click", () => {
        const title = document.getElementById("rq-title");
        const address = document.getElementById("rq-address");
        const date = document.getElementById("rq-date");
        const shift = document.getElementById("rq-shift");
        if (title) state.request.title = title.value;
        if (address) state.request.address = address.value;
        if (date) state.request.date = date.value;
        if (shift) {
          const [a, b] = shift.value.split("-");
          state.request.start = a;
          state.request.end = b;
        }
        go("#/solicitar/valor");
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
        state.request.acceptLow = aceita.checked;
        render();
      });
    }
    const conf = document.getElementById("confirmarPedido");
    if (conf) {
      conf.addEventListener("click", () => {
        const r = state.request;
        state.lastRequest = pricing(r.cat, r.rate, r.qty, r.hours, r.days);
        state.toast = "Adiantamento simulado com sucesso.";
        go("#/solicitar/ok");
      });
    }
  }

  function applyRate(val) {
    const n = parseRate(val);
    if (!Number.isFinite(n)) return;
    state.request.rate = n;
    state.request.acceptLow = false;
    render();
    const input = document.getElementById("rq-rate");
    if (input) {
      input.value = formatRateInput(n);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  function bindVaga() {
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

  function bindHomePro() {
    const chips = view.querySelectorAll("#filterCats .chip");
    const list = document.getElementById("shiftList");
    chips.forEach((ch) => {
      ch.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("on"));
        ch.classList.add("on");
        const f = ch.getAttribute("data-filter");
        const items = SHIFTS.filter((s) => f === "all" || EVENTS.find((e) => e.id === s.event).cat === f);
        list.innerHTML = items.length ? items.map((s) => shiftCard(s)).join("") : `<div class="card muted">Nenhuma vaga nesta categoria no momento.</div>`;
        list.querySelectorAll("[data-go]").forEach((el) => {
          el.addEventListener("click", () => go(el.getAttribute("data-go")));
        });
      });
    });
  }

  function bindCarteira() {
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
        go(state.role === "profissional" ? "#/plantoes" : "#/home");
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

  function bindPay() {
    view.querySelectorAll("[data-payresto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.toast = "Pagamento da equipe simulado pelas chaves Asael.";
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

  /* ------------ start ------------ */
  if (!location.hash || location.hash === "#" || location.hash === "#/") {
    history.replaceState({ dir: "none" }, "", "#/splash");
  }
  render();
})();
