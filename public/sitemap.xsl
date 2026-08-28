<?xml version="1.0" encoding="UTF-8"?>
<!--
  Arkusz stylów dla sitemapy — wyłącznie kosmetyka dla człowieka.
  Crawlery ignorują <?xml-stylesheet?> i czytają surowy XML.

  Powód istnienia: Chrome nie uruchamia swojej wbudowanej przeglądarki XML
  dla dokumentów zawierających elementy w namespace XHTML, a nasze wpisy
  hreflang (xhtml:link) właśnie takie są. Bez tego arkusza sitemapa
  wyświetla się jako sklejony tekst — plik jest poprawny, ale wygląda na
  zepsuty. Jeśli przeglądarki wycofają XSLT, wrócimy do tamtego widoku;
  nic poza wyglądem się nie zmieni.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="pl">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Mapa strony — InOro.ai</title>
        <style>
          :root { --primary:#1AA7E0; --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; }
          *,*::before,*::after { box-sizing:border-box; }
          body { margin:0; background:#f8fafc; color:var(--ink);
                 font-family:Inter,system-ui,-apple-system,sans-serif; line-height:1.6; }
          .wrap { max-width:1100px; margin:0 auto; padding:2.5rem 1.25rem 4rem; }
          h1 { font-size:1.6rem; margin:0 0 .35rem; letter-spacing:-.01em; }
          .sub { color:var(--muted); font-size:.92rem; margin:0 0 1.75rem; }
          .note { background:#E8F5FC; border:1px solid rgba(26,167,224,.3);
                  border-radius:.7rem; padding:.85rem 1.1rem; font-size:.85rem;
                  color:#0E8AC1; margin:0 0 1.75rem; }
          .count { display:inline-block; background:var(--primary); color:#fff;
                   border-radius:999px; padding:.15rem .7rem; font-size:.8rem;
                   font-weight:700; margin-left:.4rem; }
          .tablewrap { overflow-x:auto; background:#fff; border:1px solid var(--line);
                       border-radius:.85rem; }
          table { width:100%; border-collapse:collapse; font-size:.9rem; }
          th { text-align:left; background:#f8fafc; color:var(--muted);
               font-size:.72rem; text-transform:uppercase; letter-spacing:.06em;
               padding:.8rem 1rem; border-bottom:1px solid var(--line); white-space:nowrap; }
          td { padding:.75rem 1rem; border-bottom:1px solid #f1f5f9; vertical-align:top; }
          tr:last-child td { border-bottom:none; }
          tr:nth-child(even) td { background:#fcfdfe; }
          .idx { color:#94a3b8; font-variant-numeric:tabular-nums; width:3rem; }
          a { color:var(--primary); text-decoration:none; word-break:break-word; }
          a:hover { text-decoration:underline; }
          .alt { display:inline-block; border:1px solid var(--line); border-radius:999px;
                 padding:.1rem .5rem; font-size:.72rem; color:var(--muted);
                 margin:0 .25rem .25rem 0; white-space:nowrap; }
          .alt-none { color:#cbd5e1; font-size:.8rem; }
          @media (max-width:640px){ th,td{ padding:.6rem .7rem; } td:first-child{ min-width:2.5rem; } }
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:apply-templates/>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Indeks map -->
  <xsl:template match="sm:sitemapindex">
    <h1>Mapa strony — indeks<span class="count"><xsl:value-of select="count(sm:sitemap)"/></span></h1>
    <p class="sub">Plik zbiorczy. Poniżej mapy szczegółowe z adresami stron.</p>
    <div class="tablewrap">
      <table>
        <tr><th class="idx">#</th><th>Adres mapy</th></tr>
        <xsl:for-each select="sm:sitemap">
          <tr>
            <td class="idx"><xsl:value-of select="position()"/></td>
            <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
          </tr>
        </xsl:for-each>
      </table>
    </div>
  </xsl:template>

  <!-- Właściwa mapa adresów -->
  <xsl:template match="sm:urlset">
    <h1>Mapa strony — adresy<span class="count"><xsl:value-of select="count(sm:url)"/></span></h1>
    <p class="sub">Wszystkie strony zgłaszane wyszukiwarkom, wraz z wersjami językowymi.</p>
    <p class="note">
      To jest widok dla człowieka. Wyszukiwarki czytają surowy XML i pomijają ten arkusz stylów.
    </p>
    <div class="tablewrap">
      <table>
        <tr>
          <th class="idx">#</th>
          <th>Adres</th>
          <th>Wersje językowe (hreflang)</th>
        </tr>
        <xsl:for-each select="sm:url">
          <tr>
            <td class="idx"><xsl:value-of select="position()"/></td>
            <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
            <td>
              <xsl:choose>
                <xsl:when test="xhtml:link">
                  <xsl:for-each select="xhtml:link">
                    <span class="alt"><xsl:value-of select="@hreflang"/></span>
                  </xsl:for-each>
                </xsl:when>
                <xsl:otherwise>
                  <span class="alt-none">— brak odpowiednika</span>
                </xsl:otherwise>
              </xsl:choose>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>
