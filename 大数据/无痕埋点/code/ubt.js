/**
 * Ctrip JavaScript Code
 * http://www.ctrip.com/
 * Copyright(C) 2008 - 2017, Ctrip All rights reserved
 * @version v2.6.3
 */
!
function(window, undefined) {
    function get_top_domain() {
        var i, h, weird_cookie = "_bfp=cookie",
        hostname = _doc.location.hostname.split(".");
        for (i = hostname.length - 1; i >= 0; i--) if (h = "." + hostname.slice(i).join("."), _doc.cookie = weird_cookie + ";domain=" + h + ";", _doc.cookie.indexOf(weird_cookie) > -1) return _doc.cookie = weird_cookie.split("=")[0] + "=;domain=" + h + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;",
        h
    }
    function clean_bf_cookie(d) {
        if ("string" != typeof d) return 0;
        var h = document.location.hostname,
        s = h.substring(0, h.indexOf(d));
        if (s) for (var arr = s.split("."), i = arr.length - 1; i > 0; i--) d = "." + arr[i] + d,
        document.cookie = "_bfa=;domain=" + d + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;",
        document.cookie = "_bfi=;domain=" + d + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;",
        document.cookie = "_bfs=;domain=" + d + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
    // 格式化数字，如果是个位数的时候，自动往前面补0，例如：1 => 01
    function pad(v, len) {
        for (v = String(v), len = len || 2; v.length < len;) v = "0" + v;
        return v
    }
    function fetchTokenFp(fn) {
        var callback_name = "$_bf_uniq_" + Y.now();
        window[callback_name] = function(ret) {
            if (ret.data) {
                var token = ret.data.token;
                if (fetchTokenFpScript[ret.data.scriptUrl]) tokenFPCall(token, fn);
                else {
                    var _path = ret.data.scriptUrl;
                    Y.isIE && (_path = "/code/ubt/fp-em-ie.js"),
                    Y.loadScript(Y.RESOURCE_URL + _path, {
                        onScriptLoad: function() {
                            tokenFPCall(token, fn),
                            fetchTokenFpScript[ret.data.scriptUrl] = !0
                        }
                    })
                }
                window[callback_name] = null
            }
        },
        Y.loadScript("//m.ctrip.com/restapi/soa2/11470/getToken.json?callback=" + callback_name, {})
    }
    function tokenFPCall(token, fn) {
        var mix = "",
        mixvid = "";
        if ("undefined" != typeof _bfp && Y.isFunction(_bfp)) {
            var module = {};
            module.canvas = document.createElement("canvas"),
            module.doNotCaptureKeyboard = 1,
            module = _bfp(module);
            var mixfp = module.cwrap("mixfp", "string", ["string"]),
            authEncrypt = module.cwrap("authEncrypt", "string", ["string"]),
            mix = Y.encode(mixfp(token)),
            mixvid = Y.encode(authEncrypt(ubt.get_("vid")));
            ubt.track("fp", {
                vid: mixvid,
                key: "securefp",
                val: mix,
                duid: "",
                env: "online"
            })
        }
        fn && Y.isFunction(fn) && fn(Y.JSON.stringify({
            vid: mixvid,
            securefp: mix
        }))
    }
    function check_tags(tag) {
        var keys = Y.keys(tag),
        len = keys.length;
        if (len > 8) return 8;
        for (var i = 0; i < len; i++) {
            var v = tag[keys[i]];
            if ("string" == typeof v) tag[keys[i]] = v.substring(0, 200);
            else if ("number" != typeof v) return 110
        }
        return 1
    }
    /**
     * 主要代码部分
     */
    try {
        // 1.判断UBT.js是否加载完成
        if (window.$_bf && window.$_bf.loaded === !0) return;
        // 2.生成$_bf全局属性对象
        var _win = window;
        _win.$_bf = _win.$_bf || {},
        _win.$_bf.version = "2.6.3",
        _win.$_bf.loaded = !0;  // !0等于true，这里这样写是为了得出UBT.js加载已经完成的标记
        // 3.获取document对象
        var _doc = _win.document,
        _loc = _doc.location,
        // 4.生成UBT.js的一个最重要的对象，用做追踪数据，动作等的埋点处理
        Y = Y || {};
        Y.RESOURCE_URL = "//webresource.c-ctrip.com",
        Y.PROTOCOL = _loc.protocol.indexOf("file:") != -1 ? "http:": _loc.protocol,
        Y.ENV = _win.$_bf.env || "online",
        Y.ishttps = "https:" == Y.PROTOCOL,
        Y.CFG = {
            domain: _loc.hostname.split(".").slice( - 2).join(".") || "ctrip.com",
            referrer: !1,
            cv1: !1,
            orderID: "",
            cookiePath: "/",
            surl: Y.PROTOCOL + "//s.c-ctrip.com/",
            href: _loc.href,
            dCollect: {},
            delay: 0,
            debug: !1,
            third_modules: [{
                shouldLoad: function() {
                    return ! 0
                },
                src: Y.RESOURCE_URL + "/resaresonline/risk/ubtrms/latest/default/rms.js",
                option: {
                    mask: "yyyymmdd",
                    delay: 300
                }
            }]
        };
        var toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        // 空方法
        NOOP = function() {},
        // 定义基本类型
        TYPES = {
            undefined: "undefined",
            number: "number",
            boolean: "boolean",
            string: "string",
            "[object Function]": "function",
            "[object RegExp]": "regexp",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object Error]": "error",
            "[object Object]": "object"
        },
        // 事件列表 
        EVENT_LIST = {};
        // 获取当前时间
        Y.now = Date.now ||
        function() {
            return (new Date).getTime()
        },
        // 获取属性类型
        Y.type = function(o) {
            return TYPES[typeof o] || TYPES[toString.call(o)] || (o ? "object": "null")
        },
        // 判断是否是数组
        Y.isArray = function(o) {
            return "array" === Y.type(o)
        },
        //  判断是否是方法
        Y.isFunction = function(o) {
            return "function" === Y.type(o)
        },
        // 判断是否是数字
        Y.isNumber = function(o) {
            return "number" == typeof o && isFinite(o)
        },
        // 判断是否是空对象
        Y.isEmpty = function(o) {
            return void 0 === o || "-" == o || "" == o
        },
        // 获取8位随机数
        Y.getRand = function() {
            return ("" + Math.random()).slice( - 8)
        },
        // 获取对象的属性名称，简单来说获取map的键名
        Y.keys = function(obj) {
            if (Object.keys) return Object.keys(obj);
            var keys = [];
            for (var key in obj) hasOwn.call(obj, key) && keys.push(key);
            return keys
        },
        // 拷贝对象
        Y.extend = function() {
            var copy, name, options, target = arguments[0] || {},
            i = 1,
            length = arguments.length;
            for ("boolean" == typeof target && (target, target = arguments[i] || {},
            i++), "object" == typeof target || Y.isFunction(target) || (target = {}), i === length && (target = this, i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) target[name],
            copy = options[name],
            target !== copy && void 0 !== copy && (target[name] = copy);
            return target
        },
        // 获取hash值
        Y.hash = function(str) {
            var idx, hash = 1,
            charCode = 0;
            if (!Y.isEmpty(str)) for (hash = 0, idx = str.length - 1; idx >= 0; idx--) charCode = str.charCodeAt(idx),
            hash = (hash << 6 & 268435455) + charCode + (charCode << 14),
            charCode = 266338304 & hash,
            hash = 0 != charCode ? hash ^ charCode >> 21 : hash;
            return hash
        },
        // 获取以id查询的dom对象
        Y.$ = function(id) {
            return _doc.getElementById(id)
        },
        // 获取以id查询的dom对象的值
        Y.$v = function(id) {
            var targ = Y.$(id);
            return targ && targ.value || ""
        },
        // url加密
        Y.encode = function(v) {
            return encodeURIComponent(v)
        },
        // url解密
        Y.decode = function(v) {
            return decodeURIComponent(v)
        },
        // 字符串是否包含某字符
        Y.contains = function(str, sub) {
            return str.indexOf(sub) > -1
        },
        // 获取cookie
        Y.getCookie = function(key, d_value, n_decode) {
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
            arr = _doc.cookie.match(reg);
            return arr ? n_decode ? Y.decode(arr[2]) : arr[2] : d_value || ""
        },
        // 获取cookie对象的值
        Y.getCookieObj = function(key, n_decode) {
            var p, ret = {
                __k: key
            },
            a = [],
            v = Y.getCookie(key, "", n_decode);
            if (v) {
                a = v.split("&") || [];
                for (var i = 0; i < a.length; i++) p = a[i].split("="),
                p.length > 1 && (ret[p[0]] = p[1])
            }
            return ret
        },
        // 设置cookie
        Y.setCookie = function(key, value, opt_maxAge) {
            var domainStr = Y.CFG.domain ? ";domain=" + Y.CFG.domain: "",
            expiresStr = "";
            if (opt_maxAge >= 0) {
                expiresStr = ";expires=" + new Date(Y.now() + opt_maxAge).toUTCString()
            }
            _doc.cookie = key + "=" + Y.encode(value) + domainStr + ";path=/" + expiresStr
        },
        // 获取值
        Y.get = function(name, options) {
            var v, o = {};
            switch (options = options || {},
            o.v = options.v || "", o.w = options.w || "default", o.l = options.l || 0, o.t = options.t || "string", o.w) {
            case "input":
                v = Y.$v(name);
                break;
            case "cookie":
                v = Y.getCookie(name, o.v);
                break;
            case "function":
                v = Y.isFunction(o.v) ? o.v() : "";
                break;
            case "object":
                break;
            default:
                v = o.v
            }
            switch (o.t) {
            case "number":
                return parseInt(o.v, 10) || 0;
            case "boolean":
                return !! v;
            default:
                return o.l ? String(v).substring(0, o.l) : v
            }
        },
        // 获取元素的XPath
        Y.getXpath = function(obj) {
            for (var arr = [], iTemp = 0; obj && (arr[iTemp++] = obj.nodeName +
            function(tag) {
                var begin = 0;
                if (!tag.parentNode) return "";
                for (var fChild = tag.parentNode.firstChild; fChild;) {
                    if (fChild == tag) return 0 == begin ? "": "[" + (begin + 1) + "]";
                    1 == fChild.nodeType && fChild.tagName == tag.tagName && begin++,
                    fChild = fChild.nextSibling
                }
                return ""
            } (obj), "HTML" != obj.tagName.toUpperCase());) obj = obj.parentNode;
            return arr = arr.reverse(),
            arr.join("/")
        },
        // 黑科技，利用请求一个1*1像素的图片，来提交数据
        Y.send = function(param, callback) {
            if (Y.CFG.debug) var url = "http://localhost/bf.gif";
            else var url = Y.CFG.surl + "bf.gif";
            url += "?" + param + "&mt=" + Y.now() + "&jv=2.6.3",
            Y.isFunction(callback) || (callback = NOOP);
            var img_ = new Image;
            img_.width = 1,
            img_.height = 1,
            img_.onload = img_.onreadystatechange = function(e) {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (callback(1), this.onload = this.onreadystatechange = null)
            },
            img_.onerror = function() {
                img_ = img_.onerror = img_.onload = null,
                callback(0)
            },
            img_.src = url
        },
        // 绑定元素事件
        Y.on = function() {
            return _doc.addEventListener ?
            function(elem, type, fn, flug) {
                elem.addEventListener(type, fn, flug || !1)
            }: _doc.attachEvent ?
            function(elem, type, fn) {
                elem.attachEvent("on" + type, fn)
            }: NOOP
        } (),
        // 解绑元素事件
        Y.off = function() {
            return _doc.addEventListener ?
            function(elem, type, fn, flug) {
                elem.removeEventListener(type, fn, flug || !1)
            }: _doc.attachEvent ?
            function(elem, type, fn) {
                elem.detachEvent("on" + type, fn)
            }: NOOP
        } (),
        // 判断是否支持localstorage
        Y.isSupportStorage = function() {
            var localStorageWork = !1;
            if ("undefined" != typeof Storage) try {
                window.localStorage.setItem("_tmptest", "tmpval"),
                localStorageWork = !0,
                window.localStorage.removeItem("_tmptest")
            } catch(e) {}
            return !! localStorageWork
        } (),
        // 是否支持Cookie
        Y.isSupportCookie = !0;
        // 获取格式化后的日期
        Y.getDateVer = function(mask) {
            var date = new Date,
            y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate(),
            o = {
                d: d,
                dd: pad(d, 2),
                m: m + 1,
                mm: pad(m + 1),
                yy: date.getYear(),
                yyyy: y
            };
            return mask.replace(/d{1,4}|m{1,2}|yy(?:yy)?/g,
            function($0) {
                return o[$0] || $0
            })
        },
        // 添加脚本
        // 例如添加以下脚本到html的head上
        // <script type="text/javascript" id="rmsd__script" async="" src="http://webresource.c-ctrip.com/resaresonline/risk/ubtrms/d.min.08de7828.js"></script>
        // <script type="text/javascript" charset="utf-8" async="" src="//webresource.c-ctrip.com/resaresonline/risk/ubtrms/latest/default/rms.js?v=20180427"></script>
        Y.loadScript = function(url, context) { (context = context || {}) && context.mask && (url += "?v=" + Y.getDateVer(context.mask));
            try {
                var done = !1,
                s = document.createElement("script");
                s.type = "text/javascript",
                s.charset = "utf-8",
                s.async = !0,
                s.onload = s.onreadystatechange = function(e) {
                    done || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (this.onload = this.onreadystatechange = null, done = !0, Y.isFunction(context.onScriptLoad) && context.onScriptLoad())
                },
                s.src = url;
                var p = document.getElementsByTagName("script")[0];
                p.parentNode.insertBefore(s, p)
            } catch(e) {}
        };
        var _doc = _win.document,
        _loc = _doc.location;
        // 整理提交数据的格式的工具对象
        Y.CLI = function() {
            var _s = _win.screen,
            _n = _win.navigator,
            colorDepth = _s ? _s.colorDepth + "-bit": "",
            lang = (_n && _n.language ? _n.language: _n && _n.browserLanguage ? _n.browserLanguage: "").toLowerCase(),
            javaEnable = _n && _n.javaEnabled() ? 1 : 0;
            return {
                s: _s,
                c: colorDepth,
                l: lang,
                j: javaEnable,
                getRefer: function() {
                    if (Y.CFG.referrer) return Y.CFG.referrer;
                    var ref = "";
                    try {
                        ref = _doc && _doc.referrer
                    } catch(e) {}
                    if (!ref) try {
                        _win.opener && (ref = _win.opener.location && _win.opener.location.href)
                    } catch(e) {}
                    return Y.CFG.referrer = String(ref).substring(0, 500),
                    Y.CFG.referrer
                },
                getHash: function() {
                    for (var his_len = _win.history.length,
                    navs_ = [_n.appName, _n.appVersion, lang, _n.platform, _n.userAgent, javaEnable, _s.width + _s.height, colorDepth, _doc.cookie ? _doc.cookie: "", _doc.referrer ? _doc.referrer: ""].join(""), len = navs_.length; his_len > 0;) navs_ += his_len--^len++;
                    return Y.hash(navs_)
                }
            }
        } (),

        // 一些常用的算法
        function(_) {
            // 字符串编码UTF8
            function UTF8(s) {
                var p = 0,
                bs = [],
                left = 0;
                this.n = function() {
                    if (0 == left) {
                        if (p >= s.length) return null;
                        var c = s.charCodeAt(p++);
                        return c <= 127 ? c: c <= 2047 ? (bs[1] = 128 | 63 & c, left = 1, 192 | c >> 6 & 31) : c >= 55296 && c <= 57343 ? null: (bs[0] = 128 | c >> 6 & 63, bs[1] = 128 | 63 & c, left = 2, 224 | c >> 12 & 15)
                    }
                    return bs[bs.length - left--]
                }
            }
            // 压缩算法
            function LZ77(s) {
                function Compressor(s) {
                    function hash(bs, pos) {
                        for (var h = 0,
                        i = 0; i < MinMatches; i++) h = 131 * h + bs[pos + i];
                        return h
                    }
                    function winPut(b) {
                        if (winBytes.push(b), winBytes.length > WinSize && (winBytes.shift(), winHashes.shift()), winBytes.length >= MinMatches) {
                            var i = winBytes.length - MinMatches;
                            winHashes[i] = hash(winBytes, i)
                        }
                    }
                    for (var b, woff, len, winBytes = [], winHashes = [], bs = [], pos = 0; null != (b = s.n());) bs.push(b);
                    this.n = function() {
                        if (pos < bs.length - MinMatches + 1) {
                            var h = hash(bs, pos);
                            woff = 0,
                            len = 0;
                            for (var wpos = 0; wpos < winHashes.length; wpos++) if (h == winHashes[wpos]) {
                                var i, j;
                                for (i = wpos, j = pos; i < winBytes.length && j < bs.length && !(winBytes[i] != bs[j] || j - pos >= MaxMatches); i++, j++);
                                i - wpos >= len && i - wpos >= MinMatches && (len = i - wpos, woff = wpos)
                            }
                            if (0 == len) {
                                var t = [0, bs[pos]];
                                return winPut(bs[pos++]),
                                t
                            }
                            return pos += len,
                            [len, winBytes.length - (woff + len)]
                        }
                        return pos < bs.length ? [0, bs[pos++]] : null
                    }
                }
                // 序列化
                function Serializer(s) {
                    for (var t, bs = [], pos = -1; null != (t = s.n());) if (0 == t[0]) pos != -1 && 255 != bs[pos] || (bs.push(128), pos = bs.length - 1),
                    bs.push(t[1]),
                    bs[pos]++;
                    else {
                        pos = -1,
                        bs.push(t[0]);
                        var b = t[1];
                        if (b <= 127) bs.push(b);
                        else {
                            for (var tmp = []; b > 0;) tmp.push(127 & b),
                            b >>= 7;
                            for (var i = tmp.length - 1; i >= 0; i--) bs.push(128 | tmp[i]);
                            bs[bs.length - 1] &= 127
                        }
                    }
                    pos = 0,
                    this.n = function() {
                        return pos >= bs.length ? null: bs[pos++]
                    }
                }
                var ser = new Serializer(new Compressor(s));
                this.n = function() {
                    return ser.n()
                }
            }
            // 产生base64
            function B64(s) {
                var buf = [],
                left = 0;
                this.n = function() {
                    if (left > 0) return buf[4 - left--];
                    var bs = [s.n(), s.n(), s.n()];
                    return null == bs[0] ? null: (buf[0] = b64ch(bs[0] >> 2), buf[1] = b64ch(null == bs[1] ? bs[0] << 4 & 63 : 63 & (bs[0] << 4 | bs[1] >> 4)), buf[2] = null == bs[1] ? "~": b64ch(null == bs[2] ? bs[1] << 2 & 63 : 63 & (bs[1] << 2 | bs[2] >> 6)), buf[3] = null == bs[2] ? "~": b64ch(63 & bs[2]), left = 3, buf[0])
                }
            }
            // base64整合并压缩
            function b64ch(i) {
                return B64Chars.charAt(i)
            }
            var WinSize = 1024,
            MaxMatches = 63,
            MinMatches = 3,
            B64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
            _.compress = function(s) {
                for (var c, u = new UTF8(s), l = new LZ77(u), b = new B64(l), o = []; null != (c = b.n());) o[o.length] = c;
                return o.join("")
            }
        } (Y),

        // 字符串处理
        function() {
            "use strict";
            // 格式化数字，如果是个位数的时候，自动往前面补0，例如：1 => 01
            function f(n) {
                return n < 10 ? "0" + n: n
            }
            // 字符串处理
            function quote(string) {
                return escapable.lastIndex = 0,
                escapable.test(string) ? '"' + string.replace(escapable,
                function(a) {
                    var c = meta[a];
                    return "string" == typeof c ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
                }) + '"': '"' + string + '"'
            }
            // 转字符串
            function str(key, holder) {
                var i, k, v, length, partial, mind = gap,
                value = holder[key];
                switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) return "null";
                    if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
                        for (length = value.length, i = 0; i < length; i += 1) partial[i] = str(i, value) || "null";
                        return v = 0 === partial.length ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]",
                        gap = mind,
                        v
                    }
                    if (rep && "object" == typeof rep) for (length = rep.length, i = 0; i < length; i += 1)"string" == typeof rep[i] && (k = rep[i], (v = str(k, value)) && partial.push(quote(k) + (gap ? ": ": ":") + v));
                    else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value)) && partial.push(quote(k) + (gap ? ": ": ":") + v);
                    return v = 0 === partial.length ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}",
                    gap = mind,
                    v
                }
            }
            if ("object" == typeof JSON && "function" == typeof JSON.stringify) return Y.JSON = {
                stringify: JSON.stringify
            },
            !0;
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
            },
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                return this.valueOf()
            });
            var gap, indent, rep, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
            Y.JSON = {},
            // 对象转字符串处理
            Y.JSON.stringify = function(value, replacer, space) {
                var i;
                if (gap = "", indent = "", "number" == typeof space) for (i = 0; i < space; i += 1) indent += " ";
                else "string" == typeof space && (indent = space);
                if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
                return str("", {
                    "": value
                })
            }
        } (),

        /**
         * 派发和合成事件
         */
        function() {
            "use strict";
            if (! (document.visibilityState || document.webkitVisibilityState || document.mozVisibilityState)) {
                document.hidden = !1,
                document.visibilityState = "visible";
                var event = null,
                fireEvent = function() {
                    document.createEvent ? (event || (event = document.createEvent("HTMLEvents"), event.initEvent("visibilitychange", !0, !0)), document.dispatchEvent(event)) : "object" == typeof Visibility && Visibility._onChange.call(Visibility, {})
                },
                onfocus = function() {
                    document.hidden = !1,
                    document.visibilityState = "visible",
                    fireEvent()
                },
                onblur = function() {
                    document.hidden = !0,
                    document.visibilityState = "hidden",
                    fireEvent()
                };
                document.addEventListener ? (window.addEventListener("focus", onfocus, !0), window.addEventListener("blur", onblur, !0)) : (document.attachEvent("onfocusin", onfocus), document.attachEvent("onfocusout", onblur))
            }
        } (),

        function(undefined) {
            "use strict";
            var defined = function(variable) {
                return void 0 != variable
            },
            self = window.Visibility = {
                onVisible: function(callback) {
                    if (!self.isSupported() || !self.hidden()) return callback(),
                    self.isSupported();
                    var listener = self.change(function(e, state) {
                        self.hidden() || (self.unbind(listener), callback())
                    });
                    return listener
                },
                change: function(callback) {
                    if (!self.isSupported()) return ! 1;
                    self._lastCallback += 1;
                    var number = self._lastCallback;
                    return self._callbacks[number] = callback,
                    self._setListener(),
                    number
                },
                unbind: function(id) {
                    delete self._callbacks[id]
                },
                afterPrerendering: function(callback) {
                    if (!self.isSupported() || "prerender" != self.state()) return callback(),
                    self.isSupported();
                    var listener = self.change(function(e, state) {
                        "prerender" != state && (self.unbind(listener), callback())
                    });
                    return listener
                },
                hidden: function() {
                    return self._prop("hidden", !1)
                },
                state: function() {
                    return self._prop("visibilityState", "visible")
                },
                isSupported: function() {
                    return defined(self._prefix())
                },
                _doc: window.document,
                _prefixes: ["webkit", "moz"],
                _chechedPrefix: null,
                _listening: !1,
                _lastCallback: -1,
                _callbacks: {},
                _hiddenBefore: !1,
                _init: function() {
                    self._hiddenBefore = self.hidden()
                },
                _prefix: function() {
                    if (null !== self._chechedPrefix) return self._chechedPrefix;
                    if (defined(self._doc.visibilityState)) return self._chechedPrefix = "";
                    for (var name, i = 0; i < self._prefixes.length; i++) if (name = self._prefixes[i] + "VisibilityState", defined(self._doc[name])) return self._chechedPrefix = self._prefixes[i]
                },
                _name: function(name) {
                    var prefix = self._prefix();
                    return "" == prefix ? name: prefix + name.substr(0, 1).toUpperCase() + name.substr(1)
                },
                _prop: function(name, unsupported) {
                    return self.isSupported() ? self._doc[self._name(name)] : unsupported
                },
                _onChange: function(event) {
                    var state = self.state();
                    for (var i in self._callbacks) self._callbacks[i].call(self._doc, event, state);
                    self._hiddenBefore = self.hidden()
                },
                _setListener: function() {
                    if (!self._listening) {
                        var event = self._prefix() + "visibilitychange",
                        listener = function() {
                            self._onChange.apply(Visibility, arguments)
                        };
                        self._doc.addEventListener ? self._doc.addEventListener(event, listener, !1) : self._doc.attachEvent(event, listener),
                        self._listening = !0,
                        self._hiddenBefore = self.hidden()
                    }
                }
            };
            self._init()
        } (),

        // 是否是IE
        Y.isIE = /msie/i.test(navigator.userAgent),
        // 数据采集
        Y.fingerprintGen = function() {
            "use strict";
            var isIE = Y.isIE;
            return {
                debug: !1,
                version: "1.1.0",
                /**
                 * 一致性哈希算法
                 * 利用节点来存储数据，生成多个虚拟节点，均匀分布，来保证数据高速存储和快速查到到
                 * 例子：描述http://xinklabi.iteye.com/blog/2195092
                 */
                murmur_hash: function(key, seed) {
                    var remainder, bytes, h1, h1b, c1, c2, k1, i;
                    for (remainder = 3 & key.length, bytes = key.length - remainder, h1 = seed || 31, c1 = 3432918353, c2 = 461845907, i = 0; i < bytes;) k1 = 255 & key.charCodeAt(i) | (255 & key.charCodeAt(++i)) << 8 | (255 & key.charCodeAt(++i)) << 16 | (255 & key.charCodeAt(++i)) << 24,
                    ++i,
                    k1 = (65535 & k1) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295,
                    k1 = k1 << 15 | k1 >>> 17,
                    k1 = (65535 & k1) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295,
                    h1 ^= k1,
                    h1 = h1 << 13 | h1 >>> 19,
                    h1b = 5 * (65535 & h1) + ((5 * (h1 >>> 16) & 65535) << 16) & 4294967295,
                    h1 = 27492 + (65535 & h1b) + ((58964 + (h1b >>> 16) & 65535) << 16);
                    switch (k1 = 0, remainder) {
                    case 3:
                        k1 ^= (255 & key.charCodeAt(i + 2)) << 16;
                    case 2:
                        k1 ^= (255 & key.charCodeAt(i + 1)) << 8;
                    case 1:
                        k1 ^= 255 & key.charCodeAt(i),
                        k1 = (65535 & k1) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295,
                        k1 = k1 << 15 | k1 >>> 17,
                        k1 = (65535 & k1) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295,
                        h1 ^= k1
                    }
                    return h1 ^= key.length,
                    h1 ^= h1 >>> 16,
                    h1 = 2246822507 * (65535 & h1) + ((2246822507 * (h1 >>> 16) & 65535) << 16) & 4294967295,
                    h1 ^= h1 >>> 13,
                    h1 = 3266489909 * (65535 & h1) + ((3266489909 * (h1 >>> 16) & 65535) << 16) & 4294967295,
                    h1 ^= h1 >>> 16,
                    (h1 >>> 0).toString(36)
                },
                trimVersion: function(value) {
                    return (value || "").replace(/([0-9.\s]+)/g, "")
                },
                trythese: function() {
                    for (var ret, i = 0,
                    l = arguments.length; i < l; i++) {
                        var lambda = arguments[i];
                        try {
                            ret = lambda();
                            break
                        } catch(e) {}
                    }
                    return ret
                },
                get: function(obj, name, value) {
                    return obj && obj[name] ? name + "=" + (value ? value: obj[name]) : ""
                },
                display: function(keys) {
                    var s = window.screen;
                    return keys.push(s.width + "x" + s.height + "|" + s.colorDepth),
                    s.availHeight && keys.push("avail" + s.availWidth + "x" + s.availHeight),
                    s.deviceYDPI && keys.push("DPI" + s.deviceXDPI + "x" + s.deviceYDPI),
                    s.bufferDepth && keys.push("bufferDepth" + s.bufferDepth),
                    s.offscreenBuffering && keys.push("offscreenBuffering" + s.offscreenBuffering),
                    s.logicalXDPI && keys.push("logicalDPI" + s.logicalXDPI + "x" + s.logicalYDPI),
                    s.systemXDPI && keys.push("systemDPI" + s.systemXDPI + "x" + s.systemYDPI),
                    keys.push(this.get(s, "orientation", 1)),
                    keys.push(this.get(s, "pixelDepth")),
                    keys.push(this.get(s, "updateInterval")),
                    keys.push(this.get(s, "fontSmoothingEnabled", 1)),
                    keys
                },
                timezone: function(keys) {
                    return keys.push("timezone" + (new Date).getTimezoneOffset()),
                    keys
                },
                connection: function(keys) {
                    return keys.push(this.get(window, "maxConnectionsPerServer")),
                    keys.push(this.get(navigator, "hardwareConcurrency")),
                    navigator.connection && navigator.connection.type && keys.push("conntype" + navigator.connection.type),
                    keys
                },
                language: function(keys) {
                    keys.push(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "")
                },
                storage: function(keys) {
                    for (var arr = ["sessionStorage", "localStorage", "indexedDB", "openDatabase"], i = 0, l = arr.length; i < l; i++) keys.push(this.get(window, arr[i], 1));
                    return keys
                },
                // 获取IE中的插件！！！，别想太多，直接拷贝吧，都是公共东西来的，经研究后
                getIEPlugins: function(keys) {
                    var clientCaps = function() {
                        var t = document.createElement("span");
                        return t.id = "clientCaps",
                        t.style.behavior = "url('#default#clientcaps')",
                        document.body.appendChild(t),
                        t
                    } ();
                    if (clientCaps && clientCaps.isComponentInstalled) {
                        var components = {
                            DS: "{44BBA848-CC51-11CF-AAFA-00AA00B6015C}",
                            DHDB: "{9381D8F2-0288-11D0-9501-00AA00B911A5}",
                            DHDBFJ: "{4F216970-C90C-11D1-B5C7-0000F8051515}",
                            ICW: "{5A8D6EE0-3E18-11D0-821E-444553540000}",
                            IE: "{89820200-ECBD-11CF-8B85-00AA005B4383}",
                            IECFJ: "{08B0E5C0-4FCB-11CF-AAA5-00401C608555}",
                            WMP: "{22D6F312-B0F6-11D0-94AB-0080C74C7E95}",
                            NN: "{44BBA842-CC51-11CF-AAFA-00AA00B6015B}",
                            OBP: "{3AF36230-A269-11D1-B5BF-0000F8051515}",
                            OE: "{44BBA840-CC51-11CF-AAFA-00AA00B6015C}",
                            TS: "{CC2A9BA0-3BDD-11D0-821E-444553540000}",
                            MVM: "{08B0E5C0-4FCB-11CF-AAA5-00401C608500}",
                            DDE: "{44BBA855-CC51-11CF-AAFA-00AA00B6015F}",
                            DOTNET: "{6FAB99D0-BAB8-11D1-994A-00C04F98BBC9}",
                            YHOO: "{E5D12C4E-7B4F-11D3-B5C9-0050045C3C96}",
                            SWDNEW: "{166B1BCA-3F9C-11CF-8075-444553540000}",
                            DOTNETFM: "{89B4C1CD-B018-4511-B0A1-5476DBF70820}",
                            MDFH: "{8EFA4753-7169-4CC3-A28B-0A1643B8A39B}",
                            FLH: "{D27CDB6E-AE6D-11CF-96B8-444553540000}",
                            SW: "{2A202491-F00D-11CF-87CC-0020AFEECF20}",
                            SWD: "{233C1507-6A77-46A4-9443-F871F945D258}",
                            RP: "{CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA}",
                            QT: "{DE4AF3B0-F4D4-11D3-B41A-0050DA2E6C21}",
                            IEHE: "{DE5AED00-A4BF-11D1-9948-00C04F98BBC9}"
                        };
                        for (var name in components) if (components.hasOwnProperty(name)) {
                            var id = components[name];
                            if (clientCaps.isComponentInstalled(id, "componentid")) {
                                var ver = clientCaps.getComponentVersion(id, "componentid");
                                keys.push(name + ":" + ver)
                            }
                        }
                        for (var progs = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "{D27CDB6E-AE6D-11CF-96B8-444553540000}"], i = 0; i < progs.length; i++) try {
                            new ActiveXObject(progs[i]),
                            keys.push(progs[i])
                        } catch(e) {}
                    }
                },
                agent: function(keys) {
                    if (keys.push(navigator.userAgent), isIE) this.getIEPlugins(keys),
                    keys.push(this.get(window, "__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE", 1));
                    else {
                        for (var pls = navigator.plugins,
                        p = "pls",
                        j = 0; j < pls.length; j++) {
                            var op = pls[j];
                            if (p += op.filename || op.name || j, j > 30) break
                        }
                        keys.push(p)
                    }
                    return keys.push(this.get(navigator, "platform")),
                    void 0 !== navigator.doNotTrack && keys.push(navigator.doNotTrack || 0),
                    keys
                },
                canvas: function(keys) {
                    var canvas = document.createElement("canvas");
                    if (void 0 === canvas.getContext) keys.push("UNSUPPORTED_CANVAS");
                    else {
                        canvas.width = 780,
                        canvas.height = 150;
                        var strText = "English中文Հայերենا繁體輸入لعربيةҚазақша`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?😃",
                        ctx = canvas.getContext("2d");
                        ctx.save(),
                        ctx.rect(0, 0, 10, 10),
                        ctx.rect(2, 2, 6, 6),
                        keys.push(ctx.isPointInPath(5, 5, "evenodd") === !1 ? "yes": "no"),
                        ctx.restore(),
                        ctx.save();
                        var gr = ctx.createLinearGradient(0, 0, 200, 0);
                        gr.addColorStop(0, "rgb(200,0,0)"),
                        gr.addColorStop(.5, "rgb(0,200,0)"),
                        gr.addColorStop(1, "rgb(200,0,0)"),
                        ctx.fillStyle = gr,
                        ctx.fillRect(0, 0, 200, 150),
                        ctx.restore(),
                        ctx.save(),
                        ctx.translate(250, 0),
                        ctx.globalCompositeOperation = "multiply",
                        ctx.fillStyle = "rgb(255,0,255)",
                        ctx.beginPath(),
                        ctx.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                        ctx.closePath(),
                        ctx.fill(),
                        ctx.fillStyle = "rgb(0,255,255)",
                        ctx.beginPath(),
                        ctx.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                        ctx.closePath(),
                        ctx.fill(),
                        ctx.fillStyle = "rgb(255,255,0)",
                        ctx.beginPath(),
                        ctx.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                        ctx.closePath(),
                        ctx.fill(),
                        ctx.fillStyle = "rgb(255,0,255)",
                        ctx.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                        ctx.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                        ctx.fill("evenodd"),
                        ctx.restore(),
                        ctx.save(),
                        ctx.fillStyle = "#360",
                        ctx.font = "13px 'sans'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 18),
                        ctx.fillStyle = "#360",
                        ctx.font = "14px 'Microsoft Yahei'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 31),
                        ctx.fillStyle = "#360",
                        ctx.font = "15px 'Consolas'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 44),
                        ctx.fillStyle = "#360",
                        ctx.font = "9px 'Arial'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 56),
                        ctx.fillStyle = "#360",
                        ctx.font = "10px 'Verdana'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 69),
                        ctx.fillStyle = "#360",
                        ctx.font = "11px 'Webdings'",
                        ctx.textBaseLine = "top",
                        ctx.fillText(strText, 5, 80),
                        ctx.restore(),
                        ctx.save(),
                        ctx.beginPath(),
                        ctx.strokeStyle = "blue",
                        ctx.lineWidth = 5,
                        ctx.shadowOffsetX = 2,
                        ctx.shadowOffsetY = 2,
                        ctx.shadowColor = "rgb(85,85,85)",
                        ctx.shadowBlur = 3,
                        ctx.arc(500, 15, 10, 0, 2 * Math.PI, !0),
                        ctx.stroke(),
                        ctx.closePath(),
                        ctx.restore(),
                        keys.push(canvas.toDataURL())
                    }
                    return keys
                },
                getCpuClass: function(keys) {
                    return keys.push(navigator.cpuClass || ""),
                    keys
                },
                run: function() {
                    var result = [],
                    fp_system = [],
                    fp_agent = [],
                    fp_devise = [];
                    try {
                        this.display(fp_system),
                        this.timezone(fp_system),
                        this.connection(fp_system),
                        this.language(fp_system)
                    } catch(e) {}
                    try {
                        this.storage(fp_agent),
                        this.agent(fp_agent)
                    } catch(e) {}
                    try {
                        this.canvas(fp_devise),
                        this.getCpuClass(fp_devise)
                    } catch(e) {}
                    return result.push(this.murmur_hash(fp_system.join(""))),
                    result.push(this.murmur_hash(fp_agent.join(""))),
                    result.push(this.murmur_hash(fp_devise.join(""))),
                    result.join("-")
                }
            }.run()
        };


        var ubt, fetchTokenFpScript = {},
        RG = {
            _env: /((test[a-z]?|dev|uat|ui|local)\.sh\.(ctrip|huixuan)travel)|(qa\.nt\.ctripcorp)/i,
            _bfa: /^\d.+(\.\d+){2,}$/,
            _bfs: /^\d+\.\d+$/,
            _var: /\$\{(\w+)\}/g
        },
        Y_UBT_ = function(options) {
            this.isPVSend = !1,
            this.isPSSend = !1,
            this.isEventInit = !1,
            this.enterTime = Y.now(),
            this.commonData = [],
            this.pid = 0,
            this.eSkip = 0,
            this.options = options || {},
            this.envInit_(),
            this.init()
        };
        Y_UBT_.prototype = {
            constructor: Y_UBT_,
            _QUEUE: [],
            init: function() {
                this.isPVSend = !1,
                this.bfa = null,
                this.bfs = null,
                this.bfi = null,
                this._isNewVisitor = 0,
                this._isNewSession = 0,
                this.isLogin = 0,
                this.readBfa(),
                this.sessRead(),
                this.readBfi(),
                clean_bf_cookie(Y.CFG.domain)
            },
            envInit_: function() {
                var hname = _loc.hostname;
                "test" == Y.ENV || RG._env.test(hname) ? Y.CFG.surl = Y.PROTOCOL + "//ubt.uat.qa.nt.ctripcorp.com/": "offline" == Y.ENV && (Y.CFG.surl = Y.PROTOCOL + "//ubt.sh.ctriptravel.com/");
                var _domain = this.domainInit(hname);
                _domain && (Y.CFG.domain = _domain)
            },
            inputInit: function() {
                try {
                    var fo = {},
                    that = this;
                    if (document.body.innerHTML.replace(/\bbf_ubt_([^ '"]*)/gi,
                    function(a, id) {
                        var v = Y.$v(a);
                        if (v) {
                            var k = id.split("_");
                            k[0] && "tl" == k[0] ? ("offline" == Y.ENV ? "callid" == k[1] && that.sendData({
                                k: "pvctm",
                                v: '{"callid":"' + v + '"}'
                            }) : that._setPVCustom(k[1], v), fo[k[1]] = v) : (fo[k[0]] = v, that.set_(k[0].toLowerCase(), v))
                        }
                    }), "offline" == Y.ENV && fo.eid) {
                        var options = {
                            k: "offline_order",
                            v: '{"uid":"' + (fo.uid || "") + '","orderid":"' + (fo.orderid || "") + '","callid":"' + fo.callid + '","eid":"' + fo.eid + '","pid":${page_id},"order_type":"' + (fo.ordertype || "") + '"}'
                        };
                        that.sendData(options)
                    }
                } catch(e) {}
            },
            domainInit: function(hn) {
                return get_top_domain()
            },
            uniqueId_: function() {
                return Y.getRand() ^ 2147483647 & Y.CLI.getHash()
            },
            plus_: function(n) {
                return parseInt(n, 10) + 1
            },
            setItem: function(key, value, timeout) {
                if (!Y.isSupportCookie) return ! 1;
                Y.setCookie(key, value, timeout)
            },
            getItem: function(key, defaultValue, decodeflag) {
                return Y.isSupportCookie ? Y.getCookie(key, defaultValue, !0) : ""
            },
            readBfa: function() {
                var v = this.getItem("_bfa", "", !0);
                if (v && RG._bfa.test(v)) {
                    var a = v.split(".");
                    a.length > 6 && (this.bfa = a)
                }
                if (!this.bfa) {
                    var t = this.enterTime;
                    this.bfa = [1, t, this.uniqueId_().toString(36), 1, t, t, 0, 0],
                    this._isNewVisitor = 1
                }
            },
            sessRead: function() {
                var s = this.getItem("_bfs", "", !0); ! this._isNewVisitor && s && RG._bfs.test(s) ? (this.bfs = s.split("."), this.bfs[1] = this.plus_(this.bfs[1]), this.bfa[7] = this.plus_(this.bfa[7])) : (this._isNewSession = 1, this.bfs = [1, 1], this.bfa[4] = this.bfa[5], this.bfa[5] = this.enterTime, this.bfa[6] = this.plus_(this.bfa[6]), this.bfa[7] = this.plus_(this.bfa[7])),
                this.sessWrite()
            },
            sessWrite: function() {
                this.setItem("_bfa", this.bfa.join("."), 63072e6),
                this.setItem("_bfs", this.bfs.join("."), 18e5)
            },
            readBfi: function() {
                var a, v, p, o = {};
                if (v = this.getItem("_bfi", "", !0)) {
                    a = v.split("&") || [];
                    for (var i = 0; i < a.length; i++) p = a[i].split("="),
                    p.length > 1 && (o[p[0]] = p[1])
                }
                this.ppi = o && o.p1 ? o.p1: 0,
                this.ppv = o && o.v1 ? o.v1: 0,
                this.bfi = o
            },
            updateBfi: function() {
                if (this.isPVSend) {
                    var pv = this.get_("pvid"),
                    v = "p1=" + this.pid + "&p2=" + this.ppi + "&v1=" + pv + "&v2=" + this.ppv;
                    this.setItem("_bfi", v)
                }
            },
            _set: function(name, value, fn) {
                switch (fn = fn || NOOP, name) {
                case "uid":
                    this.options.duid = value;
                    break;
                case "loginName":
                    this.options.login_uid = value;
                    break;
                default:
                    return fn(0)
                }
                return fn(value)
            },
            get_: function(key) {
                if (this.bfa) {
                    var a = this.bfa;
                    switch (key) {
                    case "vid":
                        return a[1] + "." + a[2];
                    case "sid":
                        return parseInt(a[6], 10) || 0;
                    case "pvid":
                        return parseInt(a[7], 10) || 0;
                    case "fullpv":
                        return a[1] + "." + a[2] + "." + a[6] + "." + a[7];
                    default:
                        return ""
                    }
                }
            },
            set_: function(key, value) {
                switch (key) {
                case "domain":
                    this._setDomain(value);
                    break;
                case "clickv1":
                    this._setClickV1(value);
                    break;
                case "collect":
                    this._delCollect(value);
                    break;
                case "referrer":
                    this._setReferrer(value);
                    break;
                case "orderid":
                    this._setOrderID(value)
                }
            },
            getPid: function(refresh) {
                return this.pid && !refresh || (this.pid = parseInt(Y.$v("page_id"), 10) || 0),
                this.pid
            },
            formatABtestValue: function(v) {
                return /;$/.test(v) || (v += ";"),
                v
            },
            getABtest: function() {
                if (this.d_abtest) return this.d_abtest;
                for (var targ = Y.$("ab_testing_tracker"), c = [], v = ""; targ;) v += this.formatABtestValue(targ.value),
                c.push(targ),
                targ.removeAttribute("id"),
                targ.removeAttribute("name"),
                targ = Y.$("ab_testing_tracker");
                for (var i = 0; i < c.length; i++) c[i].setAttribute("id", "ab_testing_tracker");
                try {
                    var _hash = ""; (_hash = document.location.hash) && _hash.indexOf("abtest=") !== -1 && (v += this.formatABtestValue(decodeURIComponent(_hash.replace(/.*(abtest=)/i, "").replace(/#.*/i, ""))))
                } catch(e) {}
                return this.d_abtest = v.substring(0, 280),
                this.d_abtest
            },
            getPVparams: function() {
                var S = Y.getCookieObj("Session"),
                cui = Y.getCookieObj("CtripUserInfo"),
                spkg = Y.getCookieObj("StartCity_Pkg"),
                union = Y.getCookieObj("Union"),
                params = {
                    engine: S && S.SmartLinkCode ? S.SmartLinkCode: "",
                    keyword: S && S.SmartLinkQuary ? S.SmartLinkQuary: "",
                    start_city: spkg && spkg.PkgStartCity ? spkg.PkgStartCity: "",
                    alliance_id: union && union.AllianceID ? union.AllianceID: "",
                    alliance_sid: union && union.SID ? union.SID: "",
                    alliance_ouid: union && union.OUID ? union.OUID: "",
                    user_grade: cui && cui.VipGrade ? cui.VipGrade: "",
                    duid: cui && cui.U ? cui.U: "",
                    zdata: Y.get("zdatactrip", {
                        w: "cookie",
                        v: ""
                    }),
                    callid: Y.get("bf_ubt_tl_callid", {
                        w: "input",
                        v: ""
                    })
                };
                "string" == typeof this.options.duid && (params.duid = "custom:" + this.options.duid.substring(0, 50)),
                "string" == typeof this.options.login_uid && (params.login_uid = this.options.login_uid.substring(0, 50));
                try {
                    if (!params.alliance_id && !params.alliance_sid && Y.isSupportStorage && (union = localStorage.getItem("UNION"))) {
                        var u = JSON.parse(union);
                        if ((union = u.data) && (u.st || u.timeout)) {
                            var _t = 0;
                            _t = u.st ? new Date(u.st) : new Date(u.timeout.replace(/-/g, "/")),
                            _t && _t >= Y.now() && (params.alliance_id = union.AllianceID || union.ALLIANCEID || "", params.alliance_sid = union.SID || "", params.alliance_ouid = union.OUID || "")
                        }
                    }
                } catch(e) {}
                return params.duid && (this.isLogin = 1),
                this.d_pvparams = params,
                params
            },
            getCommon: function(refresh) {
                return (refresh || this.commonData.length < 4) && (this.commonData = [this.getPid(), this.get_("vid"), this.get_("sid"), this.get_("pvid"), Y.get("CorrelationId", {
                    w: "input",
                    v: ""
                }), this.getABtest() || "", Y.get("bf_ubt_offline_mid", {
                    w: "input",
                    v: ""
                }), "2.6.3", Y.fingerprint]),
                this.commonData
            },
            getOinfo: function() {
                var dev_tools_open = !1;
                return window.outerHeight - window.innerHeight > 160 && (dev_tools_open = !0),
                window.outerWidth - window.innerWidth > 160 && (dev_tools_open = !0),
                Y.JSON.stringify({
                    tz: -(new Date).getTimezoneOffset(),
                    dt: dev_tools_open,
                    rg: Y.get("_RSG", {
                        w: "cookie",
                        v: "",
                        l: 32
                    })
                })
            },
            getUinfo: function() {
                var _param = this.getPVparams(),
                info = [],
                cinfo = "";
                try {
                    cinfo += "cl=" + document.cookie.length,
                    cinfo += ",ckl=" + (document.cookie.match(/[^=]+=[^;]*;?/g) || []).length
                } catch(e) {}
                return info[0] = 12,
                info[1] = parseInt(this.ppi, 10) || 0,
                info[2] = parseInt(this.ppv, 10) || 0,
                info[3] = String(Y.CFG.href).substring(0, 600),
                info[4] = Y.CLI.s.width,
                info[5] = Y.CLI.s.height,
                info[6] = cinfo,
                info[7] = Y.CLI.l,
                info[8] = _param.engine,
                info[9] = _param.keyword,
                info[10] = Y.CLI.getRefer(),
                info[11] = this.getABtest(),
                info[12] = this._isNewVisitor,
                info[13] = this.isLogin,
                info[14] = _param.login_uid || Y.get("login_uid", {
                    w: "cookie",
                    v: ""
                }),
                info[15] = _param.user_grade,
                info[16] = Y.get("corpid", {
                    w: "cookie",
                    v: ""
                }),
                info[17] = _param.start_city,
                info[18] = _param.alliance_id,
                info[19] = _param.alliance_sid,
                info[20] = _param.alliance_ouid,
                info[21] = Y.CFG.orderID,
                info[22] = _param.duid,
                info[23] = _param.zdata,
                info[24] = _param.callid,
                info[25] = Y.get("bid", {
                    w: "cookie",
                    v: ""
                }),
                info[26] = "",
                info[27] = "",
                info[28] = "",
                info[29] = "online",
                info[30] = window.devicePixelRatio || 1,
                info[31] = this._isNewSession,
                info[32] = this.getOinfo(),
                info[33] = Y.get("bf_ubt_product", {
                    w: "input",
                    v: "",
                    l: 30
                }),
                info
            },
            replaceParam: function(str) {
                var _param = this.getPVparams(),
                d = {
                    duid: _param.duid,
                    page_id: this.getPid(),
                    is_login: this.isLogin
                };
                return str.replace(RG._var,
                function(a, c) {
                    return c in d ? d[c] : a
                })
            },
            dataHandler: function(data) {
                if ("string" == typeof data) return data;
                if ("object" == typeof data) {
                    if (data.c && data.d) {
                        var d = {
                            c: this.getCommon(),
                            d: data.d
                        };
                        return "ac=g&d=" + Y.encode(Y.JSON.stringify(d))
                    }
                    if (data.k && data.v) {
                        var _param = this.getPVparams(),
                        v = Y.encode(this.replaceParam(data.v));
                        return "ac=tl&pi=" + this.getPid() + "&key=" + data.k + "&val=" + v + "&pv=" + this.get_("fullpv") + "&duid=" + _param.duid + "&env=online&v=6"
                    }
                }
                return ! 1
            },
            sendData: function(options) {
                if (this.isPVSend) {
                    var param = this.dataHandler(options);
                    param && Y.send(param, options.callback || NOOP)
                } else this._QUEUE.push(options)
            },
            sendPV: function(callback) {
                var that = this;
                if (this.isPVSend) return ! 0;
                try {
                    var d = {
                        c: this.getCommon(!0),
                        d: {
                            uinfo: this.getUinfo()
                        }
                    },
                    param = "ac=g&d=" + Y.encode(Y.JSON.stringify(d));
                    Y.send(param,
                    function(state) {
                        state && (that.isPVSend = !0, that.queueSend_()),
                        Y.isFunction(callback) && callback(state)
                    })
                } catch(e) {
                    e.message || e.description || "&line:" + name.lineNumber || name.line
                }
            },
            queueSend_: function() {
                this.updateBfi();
                var q = this._QUEUE,
                l = q.length;
                if (l) {
                    for (var i = 0; i < l; i++) {
                        var d = q[i],
                        param = this.dataHandler(d);
                        param && Y.send(param, d.callback || NOOP)
                    }
                    this._QUEUE = []
                }
                return Y.PVCTM && this.sendData({
                    k: "pvctm",
                    v: Y.JSON.stringify(Y.PVCTM)
                }),
                !0
            },
            getPS: function() {
                for (var strarr = ["navigationStart", "redirectStart", "unloadEventStart", "unloadEventEnd", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], timing = _win.performance.timing, urlarr = [6], i = 0; i < strarr.length; i++) urlarr.push(timing[strarr[i]]);
                return urlarr.push(_win.performance.navigation.type || 0),
                urlarr.push(_win.performance.navigation.redirectCount || 0),
                urlarr
            },
            sendPS: function() {
                if (! (Y.CFG.dCollect.performance || !_win.performance || this.getPid() < 0)) {
                    var times = 0,
                    oThis = this; !
                    function() {
                        if (_win.performance.timing.loadEventEnd && !this.isPSSend) {
                            var d = {
                                c: oThis.getCommon(),
                                d: {
                                    ps: oThis.getPS()
                                }
                            },
                            param = "ac=g&d=" + Y.encode(Y.JSON.stringify(d));
                            Y.send(param),
                            oThis.isPSSend = !0
                        } else times < 300 && (times++, setTimeout(arguments.callee, 300))
                    } ()
                }
            },
            bindSend: function(callback) {
                var oThis = this;
                if (this.isEventInit) return ! 0;
                if (this.isEventInit = !0, this.inputInit(), this.sendPV(callback), Visibility.change(function(e, state) {
                    "visible" == state && oThis.updateBfi()
                }), this.sendPS(), Y.isArray(EVENT_LIST.pid)) for (var i = 0; i < EVENT_LIST.pid.length; i++) EVENT_LIST.pid[i](!1, this.getPid())
            },
            getCommonObj: function() {
                var c = this.getCommon();
                return {
                    pid: c[0],
                    vid: c[1],
                    sid: c[2],
                    pvid: c[3],
                    ver: "2.6.3",
                    ifr: 0
                }
            },
            pack: function(data, etype) {
                if ("restiming" !== etype) return ! 1;
                var data = [[1, "ctrip"], this.getCommonObj(), [[["ubt", etype, 1], data]]],
                s = "a=z&d=" + Y.compress(Y.JSON.stringify(data)) + "&t=" + Y.now();
                Y.send(s)
            },
            _asynRefresh: function(options, callback) {
                if ("object" == typeof options) {
                    if (void 0 !== options.page_id && (this.pid = parseInt(options.page_id, 10) || 0), void 0 !== options.url && Y.contains(options.url, "http") && (Y.CFG.href = options.url), void 0 !== options.orderid) this._setOrderID(options.orderid, !0);
                    else {
                        var orderid = Y.$v("bf_ubt_orderid");
                        orderid && this._setOrderID(orderid, !0)
                    }
                    options.refer && this._setReferrer(options.refer),
                    "string" == typeof options.uid && (this.options.duid = options.uid),
                    "string" == typeof options.loginName && (this.options.login_uid = options.loginName)
                }
                this.isEventInit ? (this.init(), this.sendPV(callback)) : this.bindSend(callback)
            },
            _setEnv: function(value) {
                Y.ENV = value || "online",
                this.envInit_()
            },
            _setDebug: function(value) {
                Y.CFG.debug = !!value
            },
            _setDomain: function(value) {
                Y.CFG.domain = value
            },
            _setClickV1: function(value) {
                Y.CFG.cv1 = value || ""
            },
            _delCollect: function(value) {},
            _setReferrer: function(str) {
                Y.CFG.referrer = str
            },
            _setOrderID: function(str, flag) { ! str || Y.CFG.orderID && !flag || (Y.CFG.orderID = str)
            },
            _setPVCustom: function(key, value) {
                Y.PVCTM ? Y.PVCTM[key] = value: (Y.PVCTM = {},
                Y.PVCTM[key] = value)
            },
            _getFullPV: function(fn) {
                var v = this.get_("fullpv");
                return fn && Y.isFunction(fn) && fn(v),
                v
            },
            _getStatus: function(fn) {
                var v = {
                    vid: this.get_("vid"),
                    sid: this.get_("sid"),
                    pvid: this.get_("pvid"),
                    pid: this.getPid(),
                    abtest: this.getABtest(),
                    pv: this.isPVSend,
                    ps: this.isPSSend
                };
                return fn && Y.isFunction(fn) && fn(v),
                v
            },
            _getFP: function(fn, token) {
                return fn && Y.isFunction(fn) ? (token ? fetchTokenFp(fn) : fn(Y.fingerprint), 1) : 0
            },
            _getPageid: function(fn) {
                this.isEventInit ? fn(!1, this.getPid()) : (EVENT_LIST.pid || (EVENT_LIST.pid = []), EVENT_LIST.pid.push(fn))
            },
            _tracklog: function(key, value, callback) {
                if ("string" != typeof value || value.length < 1) return callback("value must be a string."),
                !1;
                this.sendData({
                    k: key,
                    v: value,
                    callback: callback || !1
                })
            },
            _trackError: function(options, callback) {
                if ("object" != Y.type(options)) return ! 1;
                if (this.eSkip && void 0 === options.skip) return this.eSkip = !1,
                !1;
                options.skip === !0 && (this.eSkip = !0);
                for (var keys = ["version", "message", "line", "file", "category", "framework", "time", "repeat", "islogin", "name", "column"], data = [7, "", 0, "", "", "", Y.now() - this.enterTime, 1, this.isLogin, "", 0], i = 1, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    if (options[key]) {
                        var _v = options[key] + "";
                        switch (key) {
                        case "message":
                        case "file":
                            _v = _v.substring(0, 500);
                            break;
                        case "category":
                        case "framework":
                        case "name":
                            _v = _v.substring(0, 100);
                            break;
                        case "time":
                            _v = parseInt(_v, 10);
                            break;
                        case "column":
                            _v = parseInt(_v, 10);
                            break;
                        default:
                            _v = parseInt(_v, 10) || 0
                        }
                        data[i] = _v
                    }
                }
                var stack = "";
                options.stack ? stack = options.stack: "undefined" != typeof cQuery && Y.isFunction(cQuery.trace) && (stack = cQuery.trace(), Y.isArray(stack) && (stack = stack.join(""))),
                stack = stack.slice(data.join("").length - 2e3),
                data.push(stack),
                this.sendData({
                    c: !0,
                    d: {
                        error: data
                    },
                    callback: callback || !1
                })
            },
            _trackUserBlock: function(param, callback) {
                if ("object" != typeof param) return ! 1;
                var data = [];
                data[0] = 6,
                data[1] = this.isLogin,
                data[2] = String(param.message || "").substring(0, 300),
                data[3] = String(param.value || "").substring(0, 300),
                data[4] = String(param.type || "").substring(0, 50),
                data[5] = String(param.dom || "").substring(0, 100),
                data[6] = String(param.form || "").substring(0, 100),
                data[7] = parseInt(param.count || 0, 10) || 0,
                this.sendData({
                    c: !0,
                    d: {
                        ub: data
                    },
                    callback: callback || !1
                })
            },
            _trackMatrix: function(name, tag, value, ts, fn) {
                var ts = "number" == typeof ts ? ts: Y.now(),
                result = 0;
                if ("string" == typeof name && "object" == typeof tag && "number" == typeof value && 1 == (result = check_tags(tag))) {
                    var item = {
                        name: name,
                        tags: tag,
                        value: value,
                        ts: ts
                    },
                    data = [[1, "matrix"], this.getCommon(), [item]],
                    _param = "ac=a&d=" + Y.compress(Y.JSON.stringify(data));
                    Y.send(_param),
                    result = 1
                }
                Y.isFunction(fn) && fn(result)
            },
            _trackMetric: function(options) {
                var result = 0;
                if ("object" == typeof options) {
                    var param = Y.extend({
                        name: "",
                        tag: !1,
                        value: 0,
                        callback: NOOP,
                        sample: 100
                    },
                    options),
                    vid = ubt.get_("vid");
                    if (vid && !(Y.hash(vid) % 100 > 1 * param.sample) && "string" == typeof param.name && "object" == typeof param.tag && "number" == typeof param.value) {
                        if (1 == (result = check_tags(param.tag))) {
                            var item = {
                                name: param.name,
                                tags: param.tag,
                                value: param.value,
                                ts: Y.now() || 0
                            },
                            data = [[1, "matrix"], this.getCommon(), [item]],
                            _param = "ac=a&d=" + Y.compress(Y.JSON.stringify(data));
                            Y.send(_param),
                            result = 1
                        }
                        Y.isFunction(param.callback) && param.callback(result)
                    }
                }
            },
            _trackKeyboard: function(elem, fn, filter) {
                Y.keyCollector(elem, fn, filter)
            },
            track: function(type, data) {
                var common = this.getCommon(),
                data = {
                    c: {
                        pid: common[0],
                        vid: common[1],
                        sid: common[2],
                        pvid: common[3],
                        tid: common[4],
                        abtest: common[5],
                        offline_mid: common[6],
                        UBT_version: common[7],
                        bf: common[8],
                        agent: ""
                    },
                    dataType: type,
                    priority: 0,
                    d: [data]
                },
                _param = "ac=f&d=" + Y.encode(Y.JSON.stringify(data));
                Y.send(_param)
            }
        },
        Y.renderAPI = function() {
            function _checkReady() {
                if (!_isReady) {
                    if (Y._union_) {
                        if ("wait" != Y.$v("page_id")) {
                            if (0 != ubt.getPid()) return _isReady = !0,
                            ubt.bindSend();
                            if ("complete" === document.readyState) return _isReady = !0,
                            ubt.bindSend();
                            var top = !1;
                            try {
                                top = null == window.frameElement && document.documentElement
                            } catch(e) {}
                            if (top && top.doScroll) try {
                                return top.doScroll("left"),
                                _isReady = !0,
                                ubt.bindSend()
                            } catch(e) {}
                        }
                        readyWait = 1
                    }
                    if (readyWait > 5 && (Y._union_ = !0), readyWait > 40) return ubt.bindSend();
                    readyWait++,
                    setTimeout(_checkReady, 500)
                }
            }
            var Y_API = function() {
                this.push = function(commonArr) {
                    for (var args = arguments,
                    err = 0,
                    len = args.length,
                    i = 0; i < len; i++) try {
                        if ("function" == typeof args[i]) args[i]();
                        else {
                            var func = args[i][0];
                            if ("_" == func.substring(0, 1)) return ubt[func].apply(ubt, args[i].slice(1)),
                            1
                        }
                    } catch(e) {
                        err++
                    }
                    return err
                }
            },
            u_api = new Y_API,
            _alert = alert,
            _alert_count = 0; !
            function() {
                try {
                    _win.alert = function(msg) {
                        _alert_count++,
                        u_api.push(["_trackUserBlock", {
                            message: msg,
                            value: "alert",
                            type: "function.alert",
                            dom: "",
                            form: "",
                            count: _alert_count
                        }]),
                        _alert(msg)
                    }
                } catch(e) {}
            } ();
            var bfi_ = _win.__bfi;
            if (bfi_ && Y.isArray(bfi_)) for (var l = _win.__bfi.length,
            i = 0; i < l; i++) u_api.push(_win.__bfi[i]);
            else _win.__bfi = [];
            _win.__bfi.push = u_api.push,
            _win.$_bf._getFullPV = function() {
                return ubt.get_("fullpv")
            },
            _win.$_bf.tracklog = function(key, value, callback) {
                ubt._tracklog(key, value, callback)
            },
            _win.$_bf.trackError = function(options, callback) {
                ubt._trackError(options, callback)
            },
            _win.$_bf._getStatus = function() {
                return ubt._getStatus()
            },
            _win.$_bf.asynRefresh = function(options, callback) {
                ubt._asynRefresh(options, callback)
            };
            var readyWait = 1,
            _isReady = !1;
            if (_checkReady(), Y.on(_win, "beforeunload",
            function() {
                ubt.bindSend()
            }), "null" == Y.type(window.onerror)) {
                var _ErrorsStorage = {};
                window.onerror = function() {
                    if ("undefined" != typeof cQuery && cQuery.config && cQuery.config("allowDebug"));
                    else try {
                        var args = arguments,
                        obj = {
                            message: "" + args[0],
                            file: "" + args[1],
                            line: args[2],
                            category: "inner-error",
                            framework: "normal",
                            time: Y.now() - ubt.enterTime,
                            repeat: 1
                        },
                        key = obj.message + obj.file + obj.line;
                        _ErrorsStorage[key] || (ubt._trackError(obj), _ErrorsStorage[key] = !0)
                    } catch(e) {}
                }
            }
        },
        function() {
            function evtHandler(e) {
                e = e || window.event;
                var filter, elem = e.target || e.srcElement,
                key = elem.id || elem.name,
                keyCode = e.keyCode; (filter = evtList[key].filter) && (keyCode = filter(e));
                var arr = [keyTypeHash[e.type] || 9, keyCode, Y.now() - evtList[key].ts];
                evtList[key].data.push(arr.join(","))
            }
            function bind(elem) {
                evtList[key].ts = Y.now(),
                Y.on(elem, "keydown", evtHandler, !0),
                Y.on(elem, "keyup", evtHandler, !0)
            }
            function unbind(elem) {
                Y.off(elem, "keydown", evtHandler, !0),
                Y.off(elem, "keyup", evtHandler, !0)
            }
            var evtList = {},
            keyTypeHash = {
                keydown: 1,
                keyup: 2,
                keypress: 3
            },
            collectionDefine = {
                text: !0,
                password: !0
            },
            keyCollector = function(elem, fn, filter) { (elem = "string" == typeof elem ? document.getElementById(elem) : elem) && 1 == elem.nodeType && collectionDefine[elem.type] && (key = elem.id || elem.name, key && (evtList[key] = {
                    ts: 0,
                    info: [1, 0, 0, 1, key],
                    data: [],
                    fn: fn || Y.noop,
                    filter: filter
                },
                Y.on(elem, "focus",
                function(e) {
                    bind(elem, key)
                }), Y.on(elem, "blur",
                function() {
                    unbind(elem, key),
                    keyCollector.send(key)
                })))
            };
            keyCollector.send = function(key) {
                evtList[key].info[1] = evtList[key].ts;
                var data = evtList[key].info.join(",") + "|" + evtList[key].data.join("|");
                __bfi.push(["_tracklog", "ubt_tl_keycollect", data]),
                evtList[key].fn(data),
                evtList[key].data = []
            },
            Y.keyCollector = keyCollector
        } (),
        Y.userAction = function() {
            function debounce(fn, delay) {
                var timer = null;
                return function() {
                    var context = this,
                    args = arguments;
                    clearTimeout(timer),
                    timer = setTimeout(function() {
                        fn.apply(context, args)
                    },
                    delay)
                }
            }
            function UserAction() {
                this._queue = [],
                this._init()
            }
            if (!Y.ishttps && "undefined" != typeof JSON && "function" == typeof JSON.stringify && window.performance && window.top == window.self) {
                var vid = ubt.get_("vid");
                if (!vid || Y.hash(vid) % 100 > 10) return ! 1;
                var docElem = document.documentElement;
                UserAction.prototype = {
                    constructor: UserAction,
                    _init: function() {
                        var oThis = this;
                        Y.on(window, "resize", debounce(function(e) {
                            oThis.collectViewport(e)
                        },
                        500)),
                        Y.on(document, "click",
                        function(e) {
                            oThis.collectClick(e)
                        },
                        !0),
                        this.collectViewport()
                    },
                    _sendData: function(param) {
                        if (Y.CFG.debug) var url = "http://localhost/bf.gif?ac=a&d=";
                        else var url = Y.CFG.surl + "bf.gif?ac=a&d=";
                        url += Y.compress(param) + "&jv=1.0.0";
                        var _img = new Image;
                        _img.onload = function() {
                            _img = _img.onload = null
                        },
                        _img.src = url
                    },
                    _getTagIndex: function(elem) {
                        var begin = 0;
                        if (elem.parentNode) for (var fchild = elem.parentNode.firstChild; fchild && fchild != elem;) 1 == fchild.nodeType && fchild.tagName == elem.tagName && begin++,
                        fchild = fchild.nextSibling;
                        return begin > 0 ? "[" + ++begin + "]": ""
                    },
                    _getXpath: function(elem) {
                        for (var b, arr = [], i = 0; elem && 9 != elem.nodeType;) {
                            var x = elem.nodeName + this._getTagIndex(elem) + (elem.id ? "[@id='" + elem.id + "']": ""); (b = elem.getAttribute("block")) && (x += "[@block='" + b + "']"),
                            arr[i++] = x,
                            elem = elem.parentNode
                        }
                        return arr.reverse().join("/")
                    },
                    _push: function(type, xpath, ts) {
                        var obj = {
                            action: type,
                            xpath: xpath,
                            ts: ts || +new Date
                        };
                        this._queue.push(obj),
                        this._checkSend()
                    },
                    _checkSend: function(last) {
                        if (last || this._queue.length > 5) {
                            var data = [[1, "useraction"], [ubt.pid, ubt.get_("vid"), ubt.get_("sid"), ubt.get_("pvid")], this._queue];
                            this._sendData(JSON.stringify(data)),
                            this._queue = []
                        }
                    },
                    _getFocus: function() {
                        var elem = document.activeElement;
                        return elem && (elem.type || elem.href || ~elem.tabIndex) ? elem: null
                    },
                    collectViewport: function(e) {
                        var w = docElem.clientWidth || document.body.clientWidth,
                        h = docElem.clientHeight || document.body.clientHeight,
                        attr = "[@w='" + w + "'][h='" + h + "']";
                        this._push("viewport", "HTML/BODY" + attr)
                    },
                    collectScroll: function(e) {
                        var _l = Math.max(docElem.scrollLeft, document.body.scrollLeft),
                        _t = Math.max(docElem.scrollTop, document.body.scrollTop),
                        attr = "[@x='" + _l + "'][@y='" + _t + "']";
                        this._push("scroll", "HTML/BODY" + attr)
                    },
                    collectClick: function(e) {
                        var elem = e.target || e.srcElement,
                        _nodename = elem.nodeName.toUpperCase();
                        if (elem.getBoundingClientRect) {
                            var rect = elem.getBoundingClientRect(),
                            attr = "",
                            sx = Math.max(docElem.scrollLeft, document.body.scrollLeft) || 0,
                            sy = Math.max(docElem.scrollTop, document.body.scrollTop) || 0,
                            x = e.pageX || e.clientX + sx || 0,
                            y = e.pageY || e.clientY + sy || 0,
                            bx = parseInt((docElem.clientWidth || document.body.clientWidth) / 2, 10) || 0,
                            rx = 0,
                            ry = 0;
                            "SELECT" == _nodename && y - rect.top - sy < 0 ? (rx = x, ry = y - sy, attr += "[@x='" + parseInt(x + rect.left + sx - bx, 10) + "'][@y='" + parseInt(y + rect.top, 10) + "']", attr += "[@rx='" + rx + "']", attr += "[@ry='" + ry + "']") : (rx = parseInt(x - rect.left - sx, 10), ry = parseInt(y - rect.top - sy, 10), attr += "[@x='" + (x - bx) + "'][@y='" + y + "']", attr += "[@rx='" + rx + "']", attr += "[@ry='" + ry + "']"),
                            rx > 0 && ry > 0 && this._push("click", this._getXpath(elem) + attr)
                        }
                    }
                };
                var u = new UserAction;
                Y.on(_win, "beforeunload",
                function() {
                    u._checkSend(!0)
                })
            }
        },
        Y.restiming = function() {
            function parseHost(str) {
                if ("string" != typeof str) return "";
                for (var m = rg_url.exec(str), uri = {},
                i = 14; i--;) m[i] && (uri[url_key[i]] = m[i]);
                return uri
            }
            function checkPassData(o) {
                return 0 == o.connectStart || o.connectEnd - o.connectStart < 6 || o.responseEnd - o.responseStart < 6 || o.domainLookupStart == o.domainLookupEnd && o.domainLookupEnd == o.fetchStart && o.fetchStart == o.connectStart && o.fetchStart == o.connectEnd
            }
            var vid = ubt.get_("vid");
            if (vid && !(Y.hash(vid) % 100 < 90 && (new Date).getTimezoneOffset() == -480)) try {
                if ("performance" in window && "getEntriesByType" in window.performance && window.performance.getEntriesByType("resource") instanceof Array) {
                    var allowedDomains = {
                        "download.ctrip.com": !0,
                        "images4.c-ctrip.com": !0,
                        "webresource.c-ctrip.com": !0,
                        "dimg04.c-ctrip.com": !0,
                        "dimg02.c-ctrip.com": !0,
                        "youresource.c-ctrip.com": !0,
                        "ubt2.test.sh.ctriptravel.com": !0
                    },
                    rg_url = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    url_key = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
                    Y.on(window, "load",
                    function() {
                        for (var resources = window.performance.getEntriesByType("resource"), l = resources.length, arr = [], i = 0; i < l; i++) {
                            var o = resources[i],
                            uri = parseHost(o.name);
                            if ("string" == typeof uri.host && allowedDomains[uri.host] && !checkPassData(o)) {
                                var _domain = o.name;
                                if (arr.push({
                                    entryType: o.entryType || "",
                                    initiatorType: o.initiatorType || "",
                                    name: _domain,
                                    nextHopProtocol: "",
                                    startTime: o.startTime || 0,
                                    redirectStart: o.redirectStart || 0,
                                    redirectEnd: o.redirectEnd || 0,
                                    fetchStart: o.fetchStart || 0,
                                    domainLookupStart: o.domainLookupStart || 0,
                                    domainLookupEnd: o.domainLookupEnd || 0,
                                    connectStart: o.connectStart || 0,
                                    connectEnd: o.connectEnd || 0,
                                    secureConnectionStart: o.secureConnectionStart || 0,
                                    requestStart: o.requestStart || 0,
                                    responseStart: o.responseStart || 0,
                                    responseEnd: o.responseEnd || 0,
                                    transferSize: o.transferSize || 0,
                                    encodedBodySize: o.encodedBodySize || 0,
                                    decodedBodySize: o.decodedBodySize || 0
                                }), arr.length > 2) break
                            }
                        }
                        arr.length > 0 && ubt.pack(arr, "restiming")
                    })
                }
            } catch(e) {}
        };
        var document_body_ready_wait = 1,
        ready_wait_st_id = null,
        init = function() {
            if (!document.body && document_body_ready_wait < 10 && (document_body_ready_wait += 1, ready_wait_st_id = setTimeout(init, 50)), null !== ready_wait_st_id && clearTimeout(ready_wait_st_id), Y.fingerprint = Y.fingerprintGen(), ubt = new Y_UBT_, Y.restiming(), Y.userAction(), Y.renderAPI(), Y.CFG.third_modules && Y.CFG.third_modules.length) for (var module, i = 0,
            l = Y.CFG.third_modules.length; i < l; i++) module = Y.CFG.third_modules[i],
            module.shouldLoad() && Y.loadScript(module.src, module.option)
        };
        init()
    } catch(e) {}
} (window);

