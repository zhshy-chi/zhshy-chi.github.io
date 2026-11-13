# zhshy · 安全笔记站

一个用来放 CTF writeup 和靶机渗透记录的纯静态站点。
**没有构建步骤、没有依赖、没有框架** —— 全部是手写的 HTML / CSS / JavaScript，直接托管在 GitHub Pages 上。

- 站点地址：https://zhshy-chi.github.io
- 仓库：https://github.com/zhshy-chi/zhshy-chi.github.io

---

## 一、先跑起来

### 本地预览（不用装任何东西）

直接双击 `index.html`，浏览器就能打开完整站点 —— 列表、搜索、目录、代码复制全都能用。
所有页面之间都是相对路径，`file://` 打开也正常。

### 部署到 GitHub Pages

```bash
# 在仓库目录里
git add .
git commit -m "feat: 新的站点"
git push origin main
```

然后去仓库 **Settings → Pages**，确认 Source 是 `Deploy from a branch`、分支 `main`、目录 `/ (root)`。
等 1 分钟左右，`https://<你的用户名>.github.io` 就会更新。

> 根目录的 `.nojekyll` 是必须的：它让 GitHub Pages 跳过 Jekyll 处理，原样发布文件。

---

## 二、目录结构

```
.
├── index.html                  首页（最新文章、分类、统计）
├── writeups.html               全部文章（搜索 + 按方向筛选）
├── about.html                  关于页
├── 404.html                    自定义 404
├── sitemap.xml                 给搜索引擎的站点地图
├── robots.txt
├── .nojekyll                   GitHub Pages 配置
├── assets/
│   ├── css/style.css           全站样式（含深色/浅色主题）
│   ├── js/
│   │   ├── writeups.js         ★ 文章索引，加文章改这里
│   │   ├── site.js             主题切换、导航、列表渲染、搜索筛选
│   │   └── article.js          目录、代码复制、阅读进度、上下篇
│   └── favicon.svg             网站图标
├── writeups/
│   ├── _template.html          ★ 新文章模板，复制它开始写
│   └── *.html                  每篇文章一个文件
└── tools/
    └── new-writeup.ps1         一键新建文章（可选，Windows 用）
```

---

## 三、写一篇新文章

### 方式 A：手动复制（最稳，推荐）

1. 复制 `writeups/_template.html`，重命名为 `writeups/你的短名.html`（例如 `htb-pilgrimage.html`）。
2. 打开这个文件，把标题、日期、标签、正文替换掉。文件里有中文注释提示每一处要改哪里。
3. 打开 `assets/js/writeups.js`，在 `window.WRITEUPS = [` 下面加一条：

```js
  {
    slug: "htb-pilgrimage",                 // 和文件名一致
    title: "HackTheBox：Pilgrimage 靶机渗透",
    category: "Web",
    date: "2026-11-20",
    minutes: 15,
    tags: ["文件上传", "ImageMagick", "提权"],
    excerpt: "从信息收集到 get root 的完整过程。",
    file: "writeups/htb-pilgrimage.html"    // 和文件名一致
  },
```

4. 保存、刷新页面，文章就出现在列表里了。

> `slug` 和 `file` 里的文件名必须是同一个短名，否则文章页底部的「上一篇 / 下一篇」会对不上。

### 方式 B：用脚本（Windows PowerShell）

```powershell
powershell -ExecutionPolicy Bypass -File tools\new-writeup.ps1 `
  -Title "HackTheBox：Pilgrimage 靶机渗透" `
  -Category Web `
  -Slug htb-pilgrimage `
  -Tags "文件上传,ImageMagick,提权" `
  -Minutes 15 `
  -Excerpt "从信息收集到 get root 的完整过程。"
```

脚本会自动生成正文页、往 `writeups.js` 登记、并追加到 `sitemap.xml`。
`-Category` 只能是 `Web` / `Pwn` / `Reverse` / `Crypto` / `Misc` / `Mobile`。

---

## 四、正文里能用的排版

模板里已经带好了，直接照着写：

| 想要的效果 | 写法 |
| --- | --- |
| 二级标题（会进右侧目录） | `<h2>信息收集</h2>` |
| 三级标题 | `<h3>子小节</h3>` |
| 代码块（自动带语言标签 + 复制按钮） | `<pre><code class="language-python">...</code></pre>` |
| 行内代码 | `<code>system</code>` |
| 表格 | `<table><tbody><tr><th>平台</th><td>CTFshow</td></tr></tbody></table>` |
| 蓝色提示框 | `<div class="note"><p>内容</p></div>` |
| 红色警告框 | `<div class="warn"><p>内容</p></div>` |
| 引用 | `<blockquote><p>内容</p></blockquote>` |
| 图片 | `<img src="../assets/images/xxx.png" alt="说明">` |

代码块里的 `<`、`>`、`&` 必须写成 `&lt;`、`&gt;`、`&amp;`，否则会被当成标签。
（`language-` 后面的语言名只影响左上角显示的文字，不做语法高亮，所以写 `bash`、`python`、`php`、`text` 都行。）

图片统一放到 `assets/images/` 下，引用写 `../assets/images/文件名`。

---

## 五、把站点改成你自己的

| 想改什么 | 改哪里 |
| --- | --- |
| 站点名字（`zhshy`） | 每个页面里的 `<span class="brand-text">zhshy</span>`，以及 `<title>` |
| 首页大标题和介绍 | `index.html` 里的 `.hero-copy` |
| 头像 | `about.html` 里的 `<img class="avatar" src="...">` |
| 邮箱 / 社交链接 | `about.html` 里的 `.profile-links` |
| GitHub 地址 | 所有页面 `.site-header` 里的 GitHub 图标链接 |
| 分类说明文字 | `assets/js/site.js` 顶部的 `CATEGORIES` 数组 |
| 配色 | `assets/css/style.css` 最上面的 `:root` 变量（`--accent` 是主色） |

全站搜索替换 `zhshy-chi` 就能把链接都换掉（记得保留 `https://github.com/你的名字/你的名字.github.io`）。

### 删掉示例文章

现在有 4 篇示例文章（Web / Pwn / Crypto / Misc），正文顶部都有「这是一篇示例文章」的提示。
换成自己的内容时：

1. 删掉提示段落。
2. 替换标题、日期、正文。
3. 如果整篇不要了：删除 `writeups/xxx.html`，再从 `assets/js/writeups.js` 里删掉对应条目，最后删掉 `sitemap.xml` 里的那条 `<url>`。

---

## 六、几个好习惯

- **每篇文章单独一个 HTML 文件**，别把三篇写进同一个文件 —— 目录、上下篇、分享链接都是按文章走的。
- **提交前双击 `index.html` 看一眼**，本地没有问题再 push。
- **flag 打码**：还在进行的比赛不要把 flag 直接写出来，用 `flag{****}` 代替。
- **免责声明**：站内内容只针对授权环境，文章里保留「仅供学习交流」的声明更稳妥。

---

## 七、常见问题

**改完 push 了，网站没变？**
GitHub Pages 有 30 秒～1 分钟延迟，另外浏览器有缓存，用 `Ctrl + F5` 强制刷新试试。

**文章点进去 404？**
`writeups.js` 里 `file` 字段的路径和实际文件名不一致，注意大小写。

**中文显示乱码？**
所有文件都必须是 UTF-8 编码保存（VS Code 右下角会显示编码）。

**手机上导航打不开？**
宽度小于 720px 时右上角会出现汉堡菜单按钮，这是正常设计。
