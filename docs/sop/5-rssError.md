---
description: 订阅链接在浏览器上打开后显示乱码
title: 🔧 RSS订阅乱码
readingTime: false
tag:
 - 配置
recommend: 5
---


# RSS订阅乱码

主题在做RSS订阅时，发现了订阅链接在浏览器上打开后显示乱码。经过查找文档, 在网上寻找答案, 最终解决。


因为xml作为rss的信息载体，需要通过专用RSS订阅器解析后才能被用户所阅读。当就这个方面讲，讨论RSS在浏览器上打开乱码是无意义的。

所以本文要探讨的是，为什么XML这么成熟的文本格式，在浏览器上打开有可能乱码？

RSS一种信息聚合协议，可以让用户高效的订阅特定信息。RSS和html一样都是通过http进行传输，不一样的是，头部信息Content-Type的内容不同。

### 而对于RSS，主流有三种Content-Type：
    1. application/rss+xml
    2. application/atom+xml
    3. application/xml



我的问题不是出在xml上，而是响应头Content-Type内容少了charset编码


我部署在nginx 上面, 通过添加charset编码可以解决


```config

server {

	# SSL configuration

	listen 443 ssl;
	listen [::]:443 ssl;
	
	server_name #主机名;

	root 文件地址;
	index index.html index.htm index.nginx-debian.html;

	ssl_certificate SSL文件.cer;
	ssl_certificate_key SSL文件.key;
	ssl_session_timeout 5m;
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
	ssl_prefer_server_ciphers on;

	add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
	add_header X-Content-Type-Options nosniff;
	add_header X-Frame-Options DENY;

	# 设置字符集
	charset utf-8;

	location / {
		try_files $uri $uri/ =404;
        # 设置字符集
		charset utf-8;
	}
}

```