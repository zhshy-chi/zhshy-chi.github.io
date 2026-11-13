<#
  new-writeup.ps1 —— 新建一篇 writeup（生成正文页 + 自动登记到索引）

  用法（在仓库根目录执行）：
    powershell -ExecutionPolicy Bypass -File tools\new-writeup.ps1 `
        -Title "打靶记录：某电商站 SQL 注入" -Category Web -Slug shop-sqli `
        -Tags "SQL注入,靶机" -Minutes 10 -Excerpt "从报错注入到读文件拿 flag。"

  -Slug 只允许小写字母、数字和连字符，它同时是文件名和 URL。
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][string]$Title,
  [Parameter(Mandatory = $true)][ValidateSet('Web', 'Pwn', 'Reverse', 'Crypto', 'Misc', 'Mobile')][string]$Category,
  [Parameter(Mandatory = $true)][string]$Slug,
  [string]$Tags = "",
  [int]$Minutes = 8,
  [string]$Excerpt = "",
  [string]$Date = (Get-Date -Format 'yyyy-MM-dd')
)

$ErrorActionPreference = 'Stop'

if ($Slug -notmatch '^[a-z0-9][a-z0-9-]*$') {
  throw "Slug 只能包含小写字母、数字和连字符，例如 my-first-writeup"
}
if ($Excerpt -eq "") {
  $Excerpt = $Title
}

$root     = Split-Path -Parent $PSScriptRoot
$template = Join-Path $root 'writeups\_template.html'
$target   = Join-Path $root ("writeups\{0}.html" -f $Slug)
$dataFile = Join-Path $root 'assets\js\writeups.js'
$sitemap  = Join-Path $root 'sitemap.xml'

if (-not (Test-Path $template)) { throw "找不到模板：$template" }
if (Test-Path $target) { throw "文件已存在，换个 Slug：$target" }

$utf8 = New-Object System.Text.UTF8Encoding($false)

# 插入 HTML 前先转义，避免标题里的 & < > " 破坏标签
function ConvertTo-HtmlText([string]$s) {
  return $s.Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;').Replace('"', '&quot;')
}

$TitleHtml   = ConvertTo-HtmlText $Title
$ExcerptHtml = ConvertTo-HtmlText $Excerpt

# ---------- 1. 生成正文页 ----------
$html = [System.IO.File]::ReadAllText($template, [System.Text.Encoding]::UTF8)

$tagSpans = @()
foreach ($t in ($Tags -split ',')) {
  $t = $t.Trim()
  if ($t -ne "") { $tagSpans += ('<span class="tag">' + (ConvertTo-HtmlText $t) + '</span>') }
}
$badgeBlock = '<div class="article-badges">' + "`n" +
              ('      <span class="badge" data-cat="' + $Category + '">' + $Category + '</span>') + "`n"
foreach ($span in $tagSpans) { $badgeBlock += ('      ' + $span + "`n") }
$badgeBlock += '    </div>'

$leadBlock = '<p class="article-lead">' + "`n      " + $ExcerptHtml + "`n    </p>"

$html = $html -replace '(?s)<div class="article-badges">.*?</div>', '@@BADGES@@'
$html = $html -replace '(?s)<p class="article-lead">.*?</p>', '@@LEAD@@'
$html = $html.Replace('@@BADGES@@', $badgeBlock).Replace('@@LEAD@@', $leadBlock)

$map = @{
  'data-slug="替换成slug"'                    = ('data-slug="' + $Slug + '"')
  '<title>文章标题 · zhshy</title>'           = ('<title>' + $TitleHtml + ' · zhshy</title>')
  'content="文章标题"'                        = ('content="' + $TitleHtml + '"')
  'content="一句话摘要，出现在搜索结果里。"'  = ('content="' + $ExcerptHtml + '"')
  'content="一句话摘要。"'                    = ('content="' + $ExcerptHtml + '"')
  'writeups/文件短名.html'                    = ('writeups/' + $Slug + '.html')
  '<h1>文章标题写在这里</h1>'                 = ('<h1>' + $TitleHtml + '</h1>')
  '<span class="badge" data-cat="Web">Web</span>' = ('<span class="badge" data-cat="' + $Category + '">' + $Category + '</span>')
  '<span class="current">Web</span>'          = ('<span class="current">' + $Category + '</span>')
  '<time datetime="2026-01-01">2026-01-01</time>' = ('<time datetime="' + $Date + '">' + $Date + '</time>')
  '<span>约 10 分钟</span>'                   = ('<span>约 ' + $Minutes + ' 分钟</span>')
}
foreach ($k in $map.Keys) { $html = $html.Replace($k, $map[$k]) }

[System.IO.File]::WriteAllText($target, $html, $utf8)
Write-Host "[+] 已生成正文页：writeups\$Slug.html" -ForegroundColor Green

# ---------- 2. 登记到索引 ----------
function ConvertTo-JsString([string]$s) {
  return $s.Replace('\', '\\').Replace('"', '\"').Replace("`r", '').Replace("`n", ' ')
}

$tagJs = (@($Tags -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }) | ForEach-Object { '"' + (ConvertTo-JsString $_) + '"' }) -join ', '

$entry = @"
  {
    slug: "$Slug",
    title: "$(ConvertTo-JsString $Title)",
    category: "$Category",
    date: "$Date",
    minutes: $Minutes,
    tags: [$tagJs],
    excerpt:
      "$(ConvertTo-JsString $Excerpt)",
    file: "writeups/$Slug.html"
  },
"@

$js = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
$marker = 'window.WRITEUPS = ['
if ($js.IndexOf($marker) -lt 0) { throw "在 writeups.js 里找不到 $marker" }
$js = $js.Replace($marker, $marker + "`r`n" + $entry)
[System.IO.File]::WriteAllText($dataFile, $js, $utf8)
Write-Host "[+] 已登记到 assets\js\writeups.js" -ForegroundColor Green

# ---------- 3. 追加到 sitemap ----------
if (Test-Path $sitemap) {
  $xml = [System.IO.File]::ReadAllText($sitemap, [System.Text.Encoding]::UTF8)
  $url = @"
  <url>
    <loc>https://zhshy-chi.github.io/writeups/$Slug.html</loc>
    <lastmod>$Date</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
"@
  if ($xml -notmatch [regex]::Escape("writeups/$Slug.html")) {
    $xml = $xml.Replace('</urlset>', $url)
    [System.IO.File]::WriteAllText($sitemap, $xml, $utf8)
    Write-Host "[+] 已追加到 sitemap.xml" -ForegroundColor Green
  }
}

Write-Host ""
Write-Host "下一步：打开 writeups\$Slug.html，把正文填进去。" -ForegroundColor Cyan
Write-Host "填完后 push，GitHub Pages 会自动更新。" -ForegroundColor Cyan
