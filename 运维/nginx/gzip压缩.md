# Gzip压缩

```txt
    # Enable Gzip compressed.
    # http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_http_version
    gzip on;

    # Compression level (1-9).
    #5 is a perfect compromise between size and cpu usage, offering about
    #75% reduction for most ascii files (almost identical to level 9).
    gzip_comp_level    9;

    # Don't compress anything that's already small and unlikely to shrink much
    # if at all (the default is 20 bytes, which is bad as that usually leads to
    # larger files after gzipping).
    gzip_min_length    256;
    gzip_disable "msie6";

    gzip_buffers 32 4k;
    gzip_http_version 1.1;
    # https://www.mail-archive.com/search?l=nginx@nginx.org&q=subject:%22Gzip+issue+with+Safari%22&o=newest&f=1  for safira
    gzip_static on;

    # Compress data even for clients that are connecting to us via proxies,
    # identified by the "Via" header (required for CloudFront).
    gzip_proxied       any;

    # Tell proxies to cache both the gzipped and regular version of a resource
    # whenever the client's Accept-Encoding capabilities header varies;
    # Avoids the issue where a non-gzip capable client (which is extremely rare
    # today) would display gibberish if their proxy gave them the gzipped version.
    gzip_vary          on;

    # Compress all output labeled with one of the following MIME-types.
    gzip_types
        application/atom+xml
        # 这个application/x-javascript还是有区别的
        application/javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rss+xml
        application/vnd.geo+json
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/bmp
        image/svg+xml
        image/x-icon
        text/cache-manifest
        text/css
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        application/octet-stream
        text/x-cross-domain-policy;
    # text/html is always compressed by HttpGzipModule
```

