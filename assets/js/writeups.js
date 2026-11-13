/* =========================================================
   文章索引 —— 新文章在数组最前面加一条，列表按 date 倒序排
   ---------------------------------------------------------
   slug / title / category / date(YYYY-MM-DD) / minutes
   tags[] / excerpt / file（相对站点根目录）
   ========================================================= */

window.WRITEUPS = [
  {
    slug: "bugku-easyre",
    title: "Bugku Easy_Re：题目名字已经在提示你了",
    category: "Reverse",
    date: "2026-11-13",
    minutes: 8,
    tags: ["IDA", "Hex View"],
    excerpt:
      "拖进 IDA，F5 之后逻辑简单得可疑 —— 因为这题根本没打算让你算，答案就摆在常量里。",
    file: "writeups/bugku-easyre.html"
  },
  {
    slug: "bugku-reverse1",
    title: "Bugku 入门逆向：第一眼看汇编",
    category: "Reverse",
    date: "2026-11-11",
    minutes: 9,
    tags: ["IDA", "静态分析"],
    excerpt:
      "第一次把程序拖进 IDA，满屏 mov 和 call。其实这题只要认出 66h 6ch 61h 67h 就够了，剩下的都是编译器帮忙生成的东西。",
    file: "writeups/bugku-reverse1.html"
  },
  {
    slug: "bugku-ada",
    title: "Bugku 啊哒：文件末尾多出来的那段",
    category: "Misc",
    date: "2026-11-09",
    minutes: 8,
    tags: ["图片隐写", "文件尾追加"],
    excerpt:
      "图片能正常打开，但文件比预期大了一截。多出来的字节，就是别人不想让你看到的东西。",
    file: "writeups/bugku-ada.html"
  },
  {
    slug: "bugku-stego",
    title: "Bugku 这是一张图片：PNG 的宽高被人改了",
    category: "Misc",
    date: "2026-11-07",
    minutes: 9,
    tags: ["图片隐写", "PNG结构"],
    excerpt:
      "图片打开只看到上半部分，说明它的「画布尺寸」被人写小了 —— 多余的内容其实还在文件里，只是解码器不再画出来。",
    file: "writeups/bugku-stego.html"
  },
  {
    slug: "bugku-radix",
    title: "Bugku 进制转换：先判断它是什么进制",
    category: "Crypto",
    date: "2026-11-06",
    minutes: 7,
    tags: ["进制", "编码转换"],
    excerpt:
      "一串看不懂的字符，先别猜，先数它的字符集。进制判断对了，转换只是一行代码的事；判断错了，怎么试都是乱码。",
    file: "writeups/bugku-radix.html"
  },
  {
    slug: "bugku-morse",
    title: "Bugku /.- ：从摩斯密码开始的第一道密码题",
    category: "Crypto",
    date: "2026-11-04",
    minutes: 7,
    tags: ["摩斯密码", "编码识别"],
    excerpt:
      "一串点和划，还有斜杠。斜杠不是字符，是分隔符。这道题真正想教的不是摩斯表，而是「先分清哪个符号是数据、哪个符号是结构」。",
    file: "writeups/bugku-morse.html"
  },
  {
    slug: "bugku-hash",
    title: "Bugku 散列：把哈希先认出来再说",
    category: "Crypto",
    date: "2026-11-02",
    minutes: 8,
    tags: ["MD5", "哈希识别"],
    excerpt:
      "给你一串 32 位十六进制，先别急着「爆破」。先确认它到底是 MD5、NTLM 还是别的 —— 认错了算法，后面所有努力都是白费。",
    file: "writeups/bugku-hash.html"
  },
  {
    slug: "bugku-getshell",
    title: "Bugku 求getshell：上传绕过的一整套组合拳",
    category: "Web",
    date: "2026-10-31",
    minutes: 10,
    tags: ["文件上传", "解析绕过"],
    excerpt:
      "这题不是「改个后缀」就完事。它同时拦了后缀、类型和内容，只能一层一层试，把它们逐个击破 —— 也第一次让我把上传绕过的套路串成了清单。",
    file: "writeups/bugku-getshell.html"
  },
  {
    slug: "bugku-ae86",
    title: "Bugku 秋名山车神：写脚本跑时间盲注",
    category: "Web",
    date: "2026-10-29",
    minutes: 10,
    tags: ["时间盲注", "Python"],
    excerpt:
      "页面什么也不回显，没有报错，只有响应快慢的区别。这种题手工是做不完的，只能把判断交给脚本 —— 顺便治好了我的急性子。",
    file: "writeups/bugku-ae86.html"
  },
  {
    slug: "bugku-score",
    title: "Bugku 成绩单：union 注入把别人的分数读出来",
    category: "Web",
    date: "2026-10-27",
    minutes: 10,
    tags: ["SQL注入", "union", "information_schema"],
    excerpt:
      "页面只有一个查询框，返回一张成绩表。既然我能控制这条查询，就能让它查我本来不该看到的东西 —— 这次的目标是整张 admin 表。",
    file: "writeups/bugku-score.html"
  },
  {
    slug: "bugku-or1",
    title: "Bugku ' or 1=1：第一句注入",
    category: "Web",
    date: "2026-10-25",
    minutes: 9,
    tags: ["SQL注入", "联合查询"],
    excerpt:
      "这大概是所有人的第一句 SQL 注入。它教的其实不是那串 payload，而是「你输入的东西，是怎么一步步变成 SQL 语句的」。",
    file: "writeups/bugku-or1.html"
  },
  {
    slug: "bugku-speed",
    title: "Bugku 速度要快：抢在倒计时之前提交",
    category: "Web",
    date: "2026-10-24",
    minutes: 8,
    tags: ["时间窗口", "base64"],
    excerpt:
      "页面让我「快一点」，可我每次都慢了一步。后来才发现它只是把答案放在响应里，等我去解码、再立刻发回去 —— 手速根本不是解法，脚本才是。",
    file: "writeups/bugku-speed.html"
  },
  {
    slug: "bugku-exgirlfriend",
    title: "Bugku 前女友：strcmp 的返回值陷阱",
    category: "Web",
    date: "2026-10-22",
    minutes: 7,
    tags: ["strcmp", "数组绕过"],
    excerpt:
      "代码里写着 if(strcmp($a,$b)==0)，看起来密不透风，但 strcmp 在 5.3 之后遇到数组会返回 NULL。",
    file: "writeups/bugku-exgirlfriend.html"
  },
  {
    slug: "bugku-regex",
    title: "Bugku 数字验证正则绕过：preg_match 也有边界",
    category: "Web",
    date: "2026-10-20",
    minutes: 8,
    tags: ["正则绕过", "preg_match"],
    excerpt:
      "题目用正则判断「你必须是纯数字」，而 PHP 的正则，恰好有几个经典边界。这篇把它们一次讲透。",
    file: "writeups/bugku-regex.html"
  },
  {
    slug: "bugku-bypass",
    title: "Bugku 各种绕过：一次试完所有花招",
    category: "Web",
    date: "2026-10-18",
    minutes: 9,
    tags: ["WAF绕过", "编码"],
    excerpt:
      "这题关键词过滤得很凶，但过滤规则永远写不全 —— 把能试的编码都试一遍，是我这次最大的收获。",
    file: "writeups/bugku-bypass.html"
  },
  {
    slug: "bugku-admin",
    title: "Bugku 管理员系统：伪造一个来源 IP",
    category: "Web",
    date: "2026-10-16",
    minutes: 8,
    tags: ["X-Forwarded-For", "HTTP头伪造"],
    excerpt:
      "页面说「只允许管理员从内网访问」。既然它信 HTTP 头，那我就可以是内网，也可以是管理员。",
    file: "writeups/bugku-admin.html"
  },
  {
    slug: "bugku-lfi",
    title: "Bugku 本地包含：include 后面的坑",
    category: "Web",
    date: "2026-10-14",
    minutes: 9,
    tags: ["文件包含", "php://filter"],
    excerpt:
      "页面把文件名拼进 include，而我想要的东西，就在同一台机器上。这篇把「验证包含 → 读源码 → 找真正目标」这条线走一遍。",
    file: "writeups/bugku-lfi.html"
  },
  {
    slug: "bugku-variable1",
    title: "Bugku 变量1：用 $GLOBALS 覆盖变量",
    category: "Web",
    date: "2026-10-12",
    minutes: 8,
    tags: ["变量覆盖", "PHP超全局"],
    excerpt:
      "题目里有个变量挡住了我，那我就从外部把同名变量塞进去。这篇记录我第一次真正弄懂「可变变量」和 $GLOBALS 是怎么一回事。",
    file: "writeups/bugku-variable1.html"
  },
  {
    slug: "bugku-backup",
    title: "Bugku 备份是个好习惯：把 .bak 翻出来",
    category: "Web",
    date: "2026-10-10",
    minutes: 8,
    tags: ["备份文件泄露", "源码审计"],
    excerpt:
      "站长备份文件时忘了删，整份源码就躺在 web 目录里等人下载。这篇记一下常见备份命名、怎么扫出它们，以及拿到源码之后该看哪里。",
    file: "writeups/bugku-backup.html"
  },
  {
    slug: "bugku-upload",
    title: "Bugku 文件上传测试：改掉后缀就好",
    category: "Web",
    date: "2026-10-09",
    minutes: 8,
    tags: ["文件上传", "Burp", "MIME"],
    excerpt:
      "上传 php 被拒，提示「不是图片」。服务端只看后缀和类型，那就让它看到它想看的 —— 这篇记一下怎么确认它到底在校验什么，以及怎么把两处一起骗过去。",
    file: "writeups/bugku-upload.html"
  },
  {
    slug: "bugku-stop",
    title: "Bugku 你必须让他停下：让请求批量地跑",
    category: "Web",
    date: "2026-10-07",
    minutes: 8,
    tags: ["并发", "Burp Intruder"],
    excerpt:
      "页面会无限跳转，手动点不到终点。这类题的关键不是「点得快」，而是「发得多」 —— 把同一个请求重复到某一次命中条件为止。",
    file: "writeups/bugku-stop.html"
  },
  {
    slug: "bugku-first-class",
    title: "Bugku 头等舱：答案在响应头里，不在页面上",
    category: "Web",
    date: "2026-10-05",
    minutes: 6,
    tags: ["HTTP响应头", "Burp"],
    excerpt:
      "页面干干净净什么都没有。但 HTTP 响应不只有 body，还有一堆 header —— 这道题考的就是「你会不会把响应看全」。",
    file: "writeups/bugku-first-class.html"
  },
  {
    slug: "bugku-million-clicks",
    title: "Bugku 点击一百万次：前端计数器的骗局",
    category: "Web",
    date: "2026-10-03",
    minutes: 6,
    tags: ["前端绕过", "JavaScript"],
    excerpt:
      "让你点一百万次，显然不是真让你点。计数逻辑写在前端，就一定有办法跳过去 —— 问题只是找到那个真正参与判断的变量，而不是页面上显示的数字。",
    file: "writeups/bugku-million-clicks.html"
  },
  {
    slug: "bugku-maodun",
    title: "Bugku 矛盾：is_numeric 与弱类型比较",
    category: "Web",
    date: "2026-10-01",
    minutes: 8,
    tags: ["PHP弱类型", "is_numeric"],
    excerpt:
      "题目想让我传个数字，又不让我传数字 —— 这种自相矛盾的条件，通常意味着它在用「弱类型」。这篇笔记从一段两行判断的源码出发，把 is_numeric() 和 == 的两套语义拆开看。",
    file: "writeups/bugku-maodun.html"
  },
  {
    slug: "bugku-domain",
    title: "Bugku 域名解析：改 hosts 骗过浏览器",
    category: "Web",
    date: "2026-09-29",
    minutes: 7,
    tags: ["hosts", "DNS"],
    excerpt:
      "题目要求用某个域名访问，但那域名根本解析不到靶机。那就自己当一次 DNS。",
    file: "writeups/bugku-domain.html"
  },
  {
    slug: "bugku-web3",
    title: "Bugku web3：关不掉的弹窗和一段实体编码",
    category: "Web",
    date: "2026-09-27",
    minutes: 6,
    tags: ["HTML 实体编码", "弹窗"],
    excerpt:
      "页面疯狂弹窗，关一个开一个。正确做法不是和它较劲，而是把 JS 关掉看源码。",
    file: "writeups/bugku-web3.html"
  },
  {
    slug: "bugku-post",
    title: "Bugku web 基础 POST：看不见的参数",
    category: "Web",
    date: "2026-09-26",
    minutes: 6,
    tags: ["POST", "Burp Suite"],
    excerpt:
      "这次参数不在 URL 里，地址栏怎么改都没用 —— 得从请求体里塞进去。",
    file: "writeups/bugku-post.html"
  },
  {
    slug: "bugku-get",
    title: "Bugku web 基础 GET：把参数写进 URL",
    category: "Web",
    date: "2026-09-24",
    minutes: 6,
    tags: ["GET", "传参"],
    excerpt:
      "源码里写着 if($what=='flag')，那我要做的只是让 what 等于 flag。",
    file: "writeups/bugku-get.html"
  },
  {
    slug: "bugku-jisuanqi",
    title: "Bugku 计算器：maxlength 挡不住任何人",
    category: "Web",
    date: "2026-09-22",
    minutes: 6,
    tags: ["前端校验", "F12"],
    excerpt:
      "让输入一个加法结果，但输入框死活只能打一位数。这不是题目难，是前端在拦你。",
    file: "writeups/bugku-jisuanqi.html"
  },
  {
    slug: "bugku-web2",
    title: "Bugku Web2：答案就写在源码注释里",
    category: "Web",
    date: "2026-09-20",
    minutes: 8,
    tags: ["源码审计", "信息收集"],
    excerpt:
      "打开页面是个计算器，怎么算都提示错误。别急着算，先按 F12 —— 答案一直在注释里。",
    file: "writeups/bugku-web2.html"
  }
];
