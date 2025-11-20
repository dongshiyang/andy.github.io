import{_ as n,c as a,o as p,a5 as e}from"./chunks/framework.BlKpNptw.js";const _=JSON.parse('{"title":"🔧 RSS订阅乱码","description":"订阅链接在浏览器上打开后显示乱码","frontmatter":{"description":"订阅链接在浏览器上打开后显示乱码","title":"🔧 RSS订阅乱码","readingTime":false,"tag":["配置"],"recommend":5},"headers":[],"relativePath":"sop/5-rssError.md","filePath":"sop/5-rssError.md","lastUpdated":1761547943000}'),t={name:"sop/5-rssError.md"};function l(i,s,r,c,o,d){return p(),a("div",{"data-pagefind-body":!0,"data-pagefind-meta":"date:1761547943000"},s[0]||(s[0]=[e(`<h1 id="rss订阅乱码" tabindex="-1">RSS订阅乱码 <a class="header-anchor" href="#rss订阅乱码" aria-label="Permalink to &quot;RSS订阅乱码&quot;">​</a></h1><p>主题在做RSS订阅时，发现了订阅链接在浏览器上打开后显示乱码。经过查找文档, 在网上寻找答案, 最终解决。</p><p>因为xml作为rss的信息载体，需要通过专用RSS订阅器解析后才能被用户所阅读。当就这个方面讲，讨论RSS在浏览器上打开乱码是无意义的。</p><p>所以本文要探讨的是，为什么XML这么成熟的文本格式，在浏览器上打开有可能乱码？</p><p>RSS一种信息聚合协议，可以让用户高效的订阅特定信息。RSS和html一样都是通过http进行传输，不一样的是，头部信息Content-Type的内容不同。</p><h3 id="而对于rss-主流有三种content-type" tabindex="-1">而对于RSS，主流有三种Content-Type： <a class="header-anchor" href="#而对于rss-主流有三种content-type" aria-label="Permalink to &quot;而对于RSS，主流有三种Content-Type：&quot;">​</a></h3><pre><code>1. application/rss+xml
2. application/atom+xml
3. application/xml
</code></pre><p>我的问题不是出在xml上，而是响应头Content-Type内容少了charset编码</p><p>我部署在nginx 上面, 通过添加charset编码可以解决</p><div class="language-config vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">config</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# SSL configuration</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	listen 443 ssl;</span></span>
<span class="line"><span>	listen [::]:443 ssl;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	server_name #主机名;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	root 文件地址;</span></span>
<span class="line"><span>	index index.html index.htm index.nginx-debian.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	ssl_certificate SSL文件.cer;</span></span>
<span class="line"><span>	ssl_certificate_key SSL文件.key;</span></span>
<span class="line"><span>	ssl_session_timeout 5m;</span></span>
<span class="line"><span>	ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span>	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; </span></span>
<span class="line"><span>	ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	add_header Strict-Transport-Security &quot;max-age=31536000; includeSubDomains&quot; always;</span></span>
<span class="line"><span>	add_header X-Content-Type-Options nosniff;</span></span>
<span class="line"><span>	add_header X-Frame-Options DENY;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# 设置字符集</span></span>
<span class="line"><span>	charset utf-8;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	location / {</span></span>
<span class="line"><span>		try_files $uri $uri/ =404;</span></span>
<span class="line"><span>        # 设置字符集</span></span>
<span class="line"><span>		charset utf-8;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10)]))}const h=n(t,[["render",l]]);export{_ as __pageData,h as default};
