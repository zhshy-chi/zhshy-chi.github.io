/* =========================================================
   文章索引 —— 写新文章时，在数组里加一条（最新的放最前面）
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

window.WRITEUPS = [];

/* ---------------------------------------------------------
   第一篇就这样写：把下面这段取消注释，填好内容后放回上面的
   window.WRITEUPS = [ ... ] 里，注意每条之间的逗号。
   （同一时间只留一处 window.WRITEUPS = ...，不要写两个）

  {
    slug: "my-first-writeup",
    title: "第一篇：某靶机从信息收集到 getshell",
    category: "Web",
    date: "2026-11-20",
    minutes: 10,
    tags: ["信息收集", "文件上传"],
    excerpt: "记录这次打靶的完整思路，以及卡住的几个地方。",
    file: "writeups/my-first-writeup.html"
  }

   然后把 writeups/_template.html 复制成
   writeups/my-first-writeup.html，改标题和正文。
   --------------------------------------------------------- */
