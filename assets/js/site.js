/* =========================================================
   站点公共脚本：主题、导航、首页渲染、归档页筛选
   纯原生 JS，没有依赖，file:// 直接打开也能用
   ========================================================= */
(function () {
  "use strict";

  var CATEGORIES = [
    { key: "Web", desc: "注入 / SSRF / 反序列化 / 文件上传" },
    { key: "Pwn", desc: "栈溢出 / 堆利用 / ROP" },
    { key: "Reverse", desc: "静态分析 / 动态调试 / 算法还原" },
    { key: "Crypto", desc: "RSA / 格 / 古典密码" },
    { key: "Misc", desc: "流量分析 / 隐写 / 取证" },
    { key: "Mobile", desc: "Android / iOS 逆向" }
  ];

  var DATA = (window.WRITEUPS || []).slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function catDesc(key) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].key === key) return CATEGORIES[i].desc;
    }
    return "";
  }

  function badge(cat) {
    return '<span class="badge" data-cat="' + esc(cat) + '">' + esc(cat) + "</span>";
  }

  function tagList(tags) {
    return (tags || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; })
      .join("");
  }

  /* ---------- 主题 ---------- */
  function initTheme() {
    var btn = $("#theme-toggle");
    var root = document.documentElement;

    function label(theme) {
      if (!btn) return;
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色主题" : "切换到深色主题"
      );
    }

    function apply(theme) {
      root.dataset.theme = theme;
      label(theme);
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }

    // 第一次访问默认深色（保持安全站的风格），之后跟随用户上次的选择
    label(root.dataset.theme === "light" ? "light" : "dark");

    if (btn) {
      btn.addEventListener("click", function () {
        apply(root.dataset.theme === "light" ? "dark" : "light");
      });
    }
  }

  /* ---------- 移动端导航 ---------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    $$("a", nav).forEach(function (a) { a.addEventListener("click", close); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
    });
  }

  /* ---------- 页脚年份 ---------- */
  function initYear() {
    var el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var stats = {
      posts: DATA.length,
      cats: {},
      tags: {}
    };
    DATA.forEach(function (p) {
      stats.cats[p.category] = (stats.cats[p.category] || 0) + 1;
      (p.tags || []).forEach(function (t) { stats.tags[t] = 1; });
    });

    var nPosts = $("#stat-writeups");
    var nCats = $("#stat-cats");
    var nTags = $("#stat-tags");
    if (nPosts) nPosts.textContent = String(stats.posts);
    if (nCats) nCats.textContent = String(Object.keys(stats.cats).length);
    if (nTags) nTags.textContent = String(Object.keys(stats.tags).length);

    var latest = $("#latest-grid");
    if (latest) {
      if (DATA.length === 0) {
        latest.innerHTML =
          '<div class="empty-card">' +
            "<h3>还没有发布 writeup</h3>" +
            '<p class="muted">复制 <code>writeups/_template.html</code> 写成第一篇，' +
            "再到 <code>assets/js/writeups.js</code> 里登记一条，它就会出现在这里。</p>" +
          "</div>";
      } else {
        latest.innerHTML = DATA.slice(0, 4)
          .map(function (p) {
            return (
              '<article class="card">' +
                '<div class="card-top">' + badge(p.category) +
                  "<time datetime=\"" + esc(p.date) + "\">" + esc(p.date) + "</time>" +
                "</div>" +
                "<h3><a href=\"" + esc(p.file) + "\">" + esc(p.title) + "</a></h3>" +
                "<p>" + esc(p.excerpt) + "</p>" +
                '<div class="card-foot">' + tagList(p.tags) + "</div>" +
              "</article>"
            );
          })
          .join("");
      }
    }

    var catGrid = $("#category-grid");
    if (catGrid) {
      var used = CATEGORIES.filter(function (c) {
        return (stats.cats[c.key] || 0) > 0;
      });

      if (used.length === 0) {
        // 一篇文章都没有时，整块「按方向浏览」没有意义，直接隐藏
        var section = catGrid.closest ? catGrid.closest("section") : null;
        if (section) section.hidden = true;
      } else {
        catGrid.innerHTML = used
          .map(function (c) {
            var count = stats.cats[c.key] || 0;
            return (
              '<a class="cat-card" href="writeups.html?cat=' + encodeURIComponent(c.key) + '">' +
                '<span class="cat-name">' + esc(c.key) + "</span>" +
                '<span class="cat-desc">' + esc(c.desc) + "</span>" +
                '<span class="cat-count">' + count + " 篇</span>" +
              "</a>"
            );
          })
          .join("");
      }
    }
  }

  /* ---------- 归档页 ---------- */
  function renderArchive() {
    var list = $("#writeup-list");
    if (!list) return;

    var search = $("#search");
    var chips = $("#cat-chips");
    var countEl = $("#result-count");
    var empty = $("#empty-state");
    var reset = $("#reset-filter");

    var state = { cat: "全部", q: "" };

    // 支持 writeups.html?cat=Web
    try {
      var params = new URLSearchParams(window.location.search);
      var initial = params.get("cat");
      if (initial) state.cat = initial;
    } catch (e) {}

    var cats = ["全部"].concat(
      CATEGORIES.map(function (c) { return c.key; }).filter(function (k) {
        return DATA.some(function (p) { return p.category === k; });
      })
    );

    if (chips) {
      chips.innerHTML = cats
        .map(function (c) {
          return (
            '<button class="chip" type="button" data-cat="' + esc(c) + '">' +
            (c === "全部" ? "全部" : esc(c)) +
            "</button>"
          );
        })
        .join("");

      $$(".chip", chips).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.cat = btn.dataset.cat;
          syncChips();
          apply();
        });
      });
    }

    function syncChips() {
      if (!chips) return;
      $$(".chip", chips).forEach(function (b) {
        b.classList.toggle("is-active", b.dataset.cat === state.cat);
      });
    }

    function match(p) {
      if (state.cat !== "全部" && p.category !== state.cat) return false;
      if (!state.q) return true;
      var hay = [p.title, p.category, p.excerpt]
        .concat(p.tags || [])
        .join(" ")
        .toLowerCase();
      return hay.indexOf(state.q) !== -1;
    }

    function apply() {
      var rows = DATA.filter(match);

      list.innerHTML = rows
        .map(function (p) {
          return (
            '<article class="entry">' +
              '<div class="entry-side">' +
                badge(p.category) +
                '<time datetime="' + esc(p.date) + '">' + esc(p.date) + "</time>" +
                "<span>约 " + esc(p.minutes || 5) + " 分钟</span>" +
              "</div>" +
              '<div class="entry-main">' +
                '<h2><a href="' + esc(p.file) + '">' + esc(p.title) + "</a></h2>" +
                "<p>" + esc(p.excerpt) + "</p>" +
                '<div class="entry-tags">' + tagList(p.tags) + "</div>" +
              "</div>" +
            "</article>"
          );
        })
        .join("");

      if (countEl) {
        var label = state.cat === "全部" ? "全部方向" : state.cat;
        countEl.textContent =
          "共 " + rows.length + " 篇 · " + label + (state.q ? " · 搜索：" + state.q : "");
      }
      if (empty) {
        empty.hidden = rows.length !== 0;
        if (DATA.length === 0) {
          empty.textContent =
            "站里还没有 writeup。复制 writeups/_template.html 写第一篇，再到 assets/js/writeups.js 登记一条即可。";
        } else {
          empty.textContent = "没有匹配的 writeup，换个关键词试试。";
        }
      }
      if (reset) reset.hidden = state.cat === "全部" && !state.q;
    }

    if (search) {
      var timer = null;
      search.addEventListener("input", function () {
        clearTimeout(timer);
        var v = search.value.trim().toLowerCase();
        timer = setTimeout(function () {
          state.q = v;
          apply();
        }, 90);
      });
    }

    if (reset) {
      reset.addEventListener("click", function () {
        state.cat = "全部";
        state.q = "";
        if (search) search.value = "";
        syncChips();
        apply();
      });
    }

    syncChips();
    apply();
  }

  /* ---------- 启动 ---------- */
  function init() {
    initTheme();
    initNav();
    initYear();
    renderHome();
    renderArchive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
