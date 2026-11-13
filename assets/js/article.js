/* =========================================================
   文章页脚本：目录、代码复制、阅读进度、上下篇
   ========================================================= */
(function () {
  "use strict";

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

  /* ---------- 给标题分配锚点 ID ---------- */
  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
  }

  function ensureIds(prose) {
    var used = {};
    $$("h2, h3", prose).forEach(function (h, i) {
      var id = h.id;
      if (!id) {
        id = slugify(h.textContent) || "section-" + (i + 1);
      }
      var base = id;
      var n = 2;
      while (used[id]) {
        id = base + "-" + n;
        n++;
      }
      used[id] = true;
      h.id = id;
    });
  }

  /* ---------- 目录 ---------- */
  function buildToc(prose) {
    var tocNav = $("#toc-nav");
    var tocBox = $("#toc");
    if (!tocNav || !tocBox) return;

    var heads = $$("h2, h3", prose);
    if (heads.length < 2) {
      tocBox.hidden = true;
      return;
    }

    tocNav.innerHTML = heads
      .map(function (h) {
        var lvl = h.tagName === "H3" ? " lvl-3" : "";
        return (
          '<a class="' + ("toc-link" + lvl) + '" href="#' + esc(h.id) + '">' +
          esc(h.textContent) +
          "</a>"
        );
      })
      .join("");

    var links = $$("a", tocNav);
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    var current = null;
    function onScroll() {
      var offset = 120;
      var active = null;
      for (var i = 0; i < heads.length; i++) {
        var top = heads[i].getBoundingClientRect().top;
        if (top - offset <= 0) active = heads[i];
        else break;
      }
      if (!active) active = heads[0];
      var link = map[active.id];
      if (link && link !== current) {
        if (current) current.classList.remove("is-active");
        link.classList.add("is-active");
        current = link;
      }
    }

    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
      },
      { passive: true }
    );
    onScroll();
  }

  /* ---------- 代码块：语言标签 + 复制按钮 ---------- */
  function enhanceCode(prose) {
    $$("pre", prose).forEach(function (pre) {
      if (pre.parentNode && pre.parentNode.classList.contains("code-block")) return;

      var code = pre.querySelector("code");
      var lang = "";
      if (code && code.className) {
        var m = /language-([\w+#-]+)/.exec(code.className);
        if (m) lang = m[1];
      }

      // 去掉源码里首尾的空行，否则代码块顶部会空出一行
      if (code) {
        code.textContent = code.textContent.replace(/^\n+/, "").replace(/\s+$/, "");
      }

      var box = document.createElement("div");
      box.className = "code-block";

      var head = document.createElement("div");
      head.className = "code-head";

      var label = document.createElement("span");
      label.className = "code-lang";
      label.textContent = lang || "text";

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "复制";
      btn.setAttribute("aria-label", "复制这段代码");

      btn.addEventListener("click", function () {
        var text = code ? code.textContent : pre.textContent;
        copyText(text, function (ok) {
          btn.textContent = ok ? "已复制" : "复制失败";
          btn.classList.toggle("is-copied", ok);
          setTimeout(function () {
            btn.textContent = "复制";
            btn.classList.remove("is-copied");
          }, 1600);
        });
      });

      head.appendChild(label);
      head.appendChild(btn);

      pre.parentNode.insertBefore(box, pre);
      box.appendChild(head);
      box.appendChild(pre);
    });
  }

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { done(legacyCopy(text)); }
      );
      return;
    }
    done(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------- 阅读进度 ---------- */
  function initProgress() {
    var bar = $("#progress");
    if (!bar) return;
    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var y = window.scrollY || doc.scrollTop || 0;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      bar.style.width = pct + "%";
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          update();
          ticking = false;
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- 上一篇 / 下一篇 ---------- */
  function buildPager() {
    var pager = $("#pager");
    if (!pager || !window.WRITEUPS) return;

    var slug = document.body.dataset.slug;
    var data = window.WRITEUPS.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    var idx = -1;
    data.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx === -1) return;

    var newer = idx > 0 ? data[idx - 1] : null;
    var older = idx < data.length - 1 ? data[idx + 1] : null;
    var html = "";

    if (newer) {
      html +=
        '<a class="prev" href="' + esc(newer.file.replace(/^writeups\//, "")) + '">' +
          '<span class="pager-label">← 上一篇</span>' +
          '<span class="pager-title">' + esc(newer.title) + "</span>" +
        "</a>";
    } else {
      html += "<span></span>";
    }

    if (older) {
      html +=
        '<a class="next" href="' + esc(older.file.replace(/^writeups\//, "")) + '">' +
          '<span class="pager-label">下一篇 →</span>' +
          '<span class="pager-title">' + esc(older.title) + "</span>" +
        "</a>";
    }

    pager.innerHTML = html;
  }

  function init() {
    var prose = $("#prose");
    if (!prose) return;

    ensureIds(prose);
    enhanceCode(prose);
    buildToc(prose);
    buildPager();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
