/* =========================================================
   文章索引 —— 加新文章只需要在数组最前面加一条
   ---------------------------------------------------------
   slug         URL 里用的短名（也是文件名，不含 .html）
   title        标题
   category     Web / Pwn / Reverse / Crypto / Misc / Mobile
   date         发布日期 YYYY-MM-DD（列表按它倒序）
   minutes      大概阅读几分钟
   tags         标签数组（搜索会命中）
   excerpt      摘要，列表和卡片上显示
   file         正文页的路径（相对站点根目录）
   ========================================================= */

window.WRITEUPS = [
  {
    slug: "sqli-blind-ctfshow",
    title: "CTFshow Web 入门：布尔盲注从手搓到脚本",
    category: "Web",
    date: "2026-10-18",
    minutes: 12,
    tags: ["SQL注入", "盲注", "Python", "WAF绕过"],
    excerpt:
      "页面什么也不回显，只有「登录成功」和「用户名不存在」两句话。这篇记录我怎么从 length() 试到 substr()，再把它写成多线程脚本，以及中间被过滤掉的几个函数。",
    file: "writeups/sqli-blind-ctfshow.html",
    sample: true
  },
  {
    slug: "pwn-ret2libc-buuctf",
    title: "BUUCTF PWN：32 位栈溢出与 ret2libc 完整利用链",
    category: "Pwn",
    date: "2026-09-30",
    minutes: 18,
    tags: ["栈溢出", "ret2libc", "pwntools", "ROP"],
    excerpt:
      "checksec 显示 NX 开着、没有 canary，但程序里找不到 system 和 /bin/sh。从泄露 write 的真实地址，到算 libc 基址，再到第二次溢出拿 shell。",
    file: "writeups/pwn-ret2libc-buuctf.html",
    sample: true
  },
  {
    slug: "crypto-rsa-common-modulus",
    title: "NSSCTF Crypto：RSA 共模攻击与低加密指数",
    category: "Crypto",
    date: "2026-09-12",
    minutes: 10,
    tags: ["RSA", "共模攻击", "gmpy2", "数论"],
    excerpt:
      "同一个 n，两把不同的 e 加密了同一条明文。用扩展欧几里得凑出 e1·s1 + e2·s2 = 1，就能直接把 m 解出来 —— 附完整推导和脚本。",
    file: "writeups/crypto-rsa-common-modulus.html",
    sample: true
  },
  {
    slug: "misc-pcap-webshell",
    title: "Misc 流量分析：从 pcap 里捞出 WebShell 的完整过程",
    category: "Misc",
    date: "2026-08-25",
    minutes: 8,
    tags: ["流量分析", "tshark", "WebShell", "应急响应"],
    excerpt:
      "一个 200MB 的抓包，只想知道攻击者传了什么、执行了什么、带走了什么。用 tshark 分层筛 HTTP 流，还原上传的木马和加密流量。",
    file: "writeups/misc-pcap-webshell.html",
    sample: true
  }
];
