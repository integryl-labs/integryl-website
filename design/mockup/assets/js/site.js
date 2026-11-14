// Integryl website mockup: shared header, footer and review bar.
(function () {
  var page = document.body.getAttribute("data-page") || "";
  var nav = [
    ["advisory.html", "Advisory", "advisory"],
    ["fractional-leadership.html", "Fractional Leadership", "fractional"],
    ["intelligence.html", "Intelligence", "intelligence"],
    ["firm.html", "Firm", "firm"]
  ];

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* storage unavailable: defaults apply */ }
    return null;
  }

  // Header
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap header-inner">' +
      '<a class="brand" href="index.html" aria-label="Integryl home">' +
        '<img class="logo-light" src="assets/img/header-logo-light-background.svg" alt="Integryl">' +
        '<img class="logo-dark" src="assets/img/header-logo-dark-background.svg" alt="Integryl">' +
      '</a>' +
      '<nav class="site-nav" aria-label="Primary">' +
        nav.map(function (n) {
          return '<a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
        }).join("") +
      '</nav>' +
      '<a class="btn btn--sm" href="engage.html">Engage</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false">Menu</button>' +
    '</div>';
  document.body.insertBefore(header, document.body.firstChild);
  var toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Footer
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap">' +
      '<div class="footer-top">' +
        '<div>' +
          '<img src="assets/img/header-logo-dark-background.svg" alt="Integryl">' +
          '<p>Risk advisory for financial institutions.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="label">Advisory</p>' +
          '<a href="advisory.html#ai">Artificial Intelligence</a>' +
          '<a href="advisory.html#cyber">Cybersecurity</a>' +
          '<a href="advisory.html#data">Data Risk</a>' +
          '<a href="advisory.html#technology">Technology Risk</a>' +
          '<a href="advisory.html#grc">Governance, Risk &amp; Compliance</a>' +
          '<a href="advisory.html#resilience">Operational Resilience</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="label">Intelligence</p>' +
          '<a href="intelligence.html#daily-brief">Daily Brief</a>' +
          '<a href="intelligence.html#papers">Deep Dives</a>' +
          '<a href="intelligence.html#subscribe">Subscribe</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="label">Firm</p>' +
          '<a href="firm.html">About Integryl</a>' +
          '<a href="fractional-leadership.html">Fractional Risk &amp; Cybersecurity Leadership</a>' +
          '<a href="engage.html">Engage</a>' +
          '<a href="mailto:hello@integryl.com">hello@integryl.com</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© 2026 Integryl. Hilton Head, South Carolina.</span>' +
        '<span><a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#">Terms</a> &nbsp;·&nbsp; <a href="styleguide.html">Style guide (mockup)</a></span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(footer);

  // Review bar: switch type pairing and highlight placeholder copy
  var root = document.documentElement;
  root.setAttribute("data-type", "a");
  root.setAttribute("data-notes", store("integryl-notes") || "off");

  var bar = document.createElement("div");
  bar.className = "mock-bar";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Mockup controls");
  bar.innerHTML =
    '<span>Mockup</span>' +
    '<button type="button" data-notes title="Highlight placeholder copy that needs your input">Placeholders</button>';
  document.body.appendChild(bar);

  function sync() {
    bar.querySelectorAll("[data-type]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-type") === root.getAttribute("data-type")));
    });
    bar.querySelector("[data-notes]").setAttribute("aria-pressed", String(root.getAttribute("data-notes") === "on"));
  }
  bar.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-type")) {
      root.setAttribute("data-type", b.getAttribute("data-type"));
      store("integryl-type", b.getAttribute("data-type"));
    } else {
      var next = root.getAttribute("data-notes") === "on" ? "off" : "on";
      root.setAttribute("data-notes", next);
      store("integryl-notes", next);
    }
    sync();
  });
  sync();

  // Forms are illustrative only
  document.querySelectorAll("form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = f.querySelector("[data-form-note]");
      if (note) note.textContent = "Mockup only: nothing was sent.";
    });
  });
})();
