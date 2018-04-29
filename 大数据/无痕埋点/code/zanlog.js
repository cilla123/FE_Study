! function (e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var o = n[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
  }
  var n = {};
  t.m = e, t.c = n, t.d = function (e, n, i) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: i
    })
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return t.d(n, "a", n), n
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = "", t(t.s = 8)
}([function (e, t, n) {
  "use strict";
  var i = "undefined" != typeof window ? window : void 0,
    o = document,
    r = navigator,
    a = r && r.userAgent && r.userAgent.toString(),
    l = location,
    s = {
      win: i,
      doc: o,
      nav: r,
      loc: l,
      ua: a,
      ref: o && o.referrer,
      domain: o && o.domain
    };
  e.exports = s
}, function (e, t, n) {
  "use strict";

  function i() {
    var e = {};
    if (s && s.cookie && "" !== s.cookie)
      for (var t = s.cookie && s.cookie.split(";"), n = 0; n < t.length; n++) {
        var i = t[n].split("=");
        i[0] = i[0].replace(/^ /, ""), e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
      }
    return e
  }

  function o(e, t, n) {
    var i;
    if (n) {
      var o = new Date;
      o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + o.toGMTString()
    } else i = "";
    s.cookie = e + "=" + t + i + "; path=/;domain=youzan.com"
  }

  function r(e) {
    for (var t = e + "=", n = s && s.cookie && s.cookie.split(";") || "", i = 0; i < n.length; i++) {
      for (var o = n[i];
        " " == o.charAt(0);) o = o.substring(1);
      if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
    }
    return ""
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getCookie = t.setCookie = t.getCookiesArray = void 0;
  var a = n(0),
    l = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(a),
    s = l.default.doc;
  t.getCookiesArray = i, t.setCookie = o, t.getCookie = r
}, function (e, t, n) {
  "use strict";

  function i(e) {
    e || (e = window.location.href || "");
    for (var t = {}, n = e.substring(e.indexOf("?") + 1).split("&"), i = 0; i < n.length; i++)
      if (n[i]) {
        var o = n[i].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
      }
    return t
  }

  function o(e) {
    for (var t = (u.getElementsByTagName("*"), []); e && 1 == e.nodeType; e = e.parentNode) {
      for (var n = 1, i = e.previousSibling; i; i = i.previousSibling) i.localName == e.localName && n++;
      1 == n ? e.nextElementSibling ? e.nextElementSibling.localName != e.localName ? t.unshift(e.localName.toLowerCase()) : t.unshift(e.localName.toLowerCase() + "[" + n + "]") : t.unshift(e.localName.toLowerCase()) : t.unshift(e.localName.toLowerCase() + "[" + n + "]")
    }
    return t.length ? "/" + t.join("/") : null
  }

  function r(e) {
    try {
      return (new XPathEvaluator).evaluate(e, u.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || ""
    } catch (e) {
      return ""
    }
  }

  function a() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return e.length > 30 && (e = e.slice(0, 15) + "..." + e.slice(e.length - 15)), e
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.sliceTitle = t.getElem = t.getXPath = t.urlToArray = void 0;
  var l = n(0),
    s = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(l),
    u = s.default.doc;
  t.urlToArray = i, t.getXPath = o, t.getElem = r, t.sliceTitle = a
}, function (e, t, n) {
  (function (e, i) {
    var o;
    (function () {
      "use strict";

      function r(e) {
        return e = String(e), e.charAt(0).toUpperCase() + e.slice(1)
      }

      function a(e, t, n) {
        var i = {
          "10.0": "10",
          6.4: "10 Technical Preview",
          6.3: "8.1",
          6.2: "8",
          6.1: "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          5.2: "Server 2003 / XP 64-bit",
          5.1: "XP",
          5.01: "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (i = i[/[\d.]+$/.exec(e)]) && (e = "Windows " + i), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = s(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
      }

      function l(e, t) {
        var n = -1,
          i = e ? e.length : 0;
        if ("number" == typeof i && i > -1 && i <= O)
          for (; ++n < i;) t(e[n], n, e);
        else u(e, t)
      }

      function s(e) {
        return e = b(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : r(e)
      }

      function u(e, t) {
        for (var n in e) C.call(e, n) && t(e[n], n, e)
      }

      function c(e) {
        return null == e ? r(e) : E.call(e).slice(8, -1)
      }

      function f(e, t) {
        var n = null != e ? typeof e[t] : "number";
        return !(/^(?:boolean|number|string|undefined)$/.test(n) || "object" == n && !e[t])
      }

      function p(e) {
        return String(e).replace(/([ -])(?!$)/g, "$1?")
      }

      function d(e, t) {
        var n = null;
        return l(e, function (i, o) {
          n = t(n, i, o, e)
        }), n
      }

      function b(e) {
        return String(e).replace(/^ +| +$/g, "")
      }

      function h(e) {
        function t(t) {
          return d(t, function (t, n) {
            var i = n.pattern || p(n);
            return !t && (t = RegExp("\\b" + i + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + i + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + i + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(i, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = s(t[0].replace(RegExp(i, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), t
          })
        }

        function n() {
          return this.description || ""
        }
        var i = g,
          o = e && "object" == typeof e && "String" != c(e);
        o && (i = e, e = null);
        var r = i.navigator || {},
          l = r.userAgent || "";
        e || (e = l);
        var v, m, S = o || _ == y,
          x = o ? !!r.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(E.toString()),
          O = o ? "Object" : "ScriptBridgingProxyObject",
          w = o ? "Object" : "Environment",
          C = o && i.java ? "JavaPackage" : c(i.java),
          P = o ? "Object" : "RuntimeObject",
          M = /\bJava/.test(C) && i.java,
          T = M && c(i.environment) == w,
          A = M ? "a" : "伪",
          j = M ? "b" : "尾",
          I = i.document || {},
          R = i.operamini || i.opera,
          z = k.test(z = o && R ? R["[[Class]]"] : c(R)) ? z : R = null,
          N = e,
          B = [],
          W = null,
          F = e == l,
          L = F && R && "function" == typeof R.version && R.version(),
          D = function (t) {
            return d(t, function (t, n) {
              return t || RegExp("\\b" + (n.pattern || p(n)) + "\\b", "i").exec(e) && (n.label || n)
            })
          }([{
            label: "EdgeHTML",
            pattern: "Edge"
          }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
          }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
          G = function (t) {
            return d(t, function (t, n) {
              return t || RegExp("\\b" + (n.pattern || p(n)) + "\\b", "i").exec(e) && (n.label || n)
            })
          }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
            label: "Microsoft Edge",
            pattern: "Edge"
          }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
            label: "Samsung Internet",
            pattern: "SamsungBrowser"
          }, "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
          }, "Sleipnir", "SlimBrowser", {
            label: "SRWare Iron",
            pattern: "Iron"
          }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
            label: "Opera Mini",
            pattern: "OPiOS"
          }, "Opera", {
            label: "Opera",
            pattern: "OPR"
          }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
          }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
          }, {
            label: "Firefox for iOS",
            pattern: "FxiOS"
          }, {
            label: "IE",
            pattern: "IEMobile"
          }, {
            label: "IE",
            pattern: "MSIE"
          }, "Safari"]),
          U = t([{
            label: "BlackBerry",
            pattern: "BB10"
          }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
          }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
          }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
          }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
          }, {
            label: "Galaxy S5",
            pattern: "SM-G900"
          }, {
            label: "Galaxy S6",
            pattern: "SM-G920"
          }, {
            label: "Galaxy S6 Edge",
            pattern: "SM-G925"
          }, {
            label: "Galaxy S7",
            pattern: "SM-G930"
          }, {
            label: "Galaxy S7 Edge",
            pattern: "SM-G935"
          }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
          }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
          }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
          }, "Xoom"]),
          $ = function (t) {
            return d(t, function (t, n, i) {
              return t || (n[U] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(U)] || RegExp("\\b" + p(i) + "(?:\\b|\\w*\\d)", "i").exec(e)) && i
            })
          }({
            Apple: {
              iPad: 1,
              iPhone: 1,
              iPod: 1
            },
            Archos: {},
            Amazon: {
              Kindle: 1,
              "Kindle Fire": 1
            },
            Asus: {
              Transformer: 1
            },
            "Barnes & Noble": {
              Nook: 1
            },
            BlackBerry: {
              PlayBook: 1
            },
            Google: {
              "Google TV": 1,
              Nexus: 1
            },
            HP: {
              TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
              Xbox: 1,
              "Xbox One": 1
            },
            Motorola: {
              Xoom: 1
            },
            Nintendo: {
              "Wii U": 1,
              Wii: 1
            },
            Nokia: {
              Lumia: 1
            },
            Samsung: {
              "Galaxy S": 1,
              "Galaxy S2": 1,
              "Galaxy S3": 1,
              "Galaxy S4": 1
            },
            Sony: {
              PlayStation: 1,
              "PlayStation Vita": 1
            }
          }),
          X = function (t) {
            return d(t, function (t, n) {
              var i = n.pattern || p(n);
              return !t && (t = RegExp("\\b" + i + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = a(t, i, n.label || n)), t
            })
          }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
          }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (D && (D = [D]), $ && !U && (U = t([$])), (v = /\bGoogle TV\b/.exec(U)) && (U = v[0]), /\bSimulator\b/i.test(e) && (U = (U ? U + " " : "") + "Simulator"), "Opera Mini" == G && /\bOPiOS\b/.test(e) && B.push("running in Turbo/Uncompressed mode"), "IE" == G && /\blike iPhone OS\b/.test(e) ? (v = h(e.replace(/like iPhone OS/, "")), $ = v.manufacturer, U = v.product) : /^iP/.test(U) ? (G || (G = "Safari"), X = "iOS" + ((v = / OS ([\d_]+)/i.exec(e)) ? " " + v[1].replace(/_/g, ".") : "")) : "Konqueror" != G || /buntu/i.test(X) ? $ && "Google" != $ && (/Chrome/.test(G) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(U)) || /\bAndroid\b/.test(X) && /^Chrome/.test(G) && /\bVersion\//i.test(e) ? (G = "Android Browser", X = /\bAndroid\b/.test(X) ? X : "Android") : "Silk" == G ? (/\bMobi/i.test(e) || (X = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && B.unshift("accelerated")) : "PaleMoon" == G && (v = /\bFirefox\/([\d.]+)\b/.exec(e)) ? B.push("identifying as Firefox " + v[1]) : "Firefox" == G && (v = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (X || (X = "Firefox OS"), U || (U = v[1])) : !G || (v = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(G)) ? (G && !U && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(v + "/") + 8)) && (G = null), (v = U || $ || X) && (U || $ || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X)) && (G = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X) ? X : v) + " Browser")) : "Electron" == G && (v = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && B.push("Chromium " + v) : X = "Kubuntu", L || (L = function (t) {
            return d(t, function (t, n) {
              return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
            })
          }(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", p(G), "(?:Firefox|Minefield|NetFront)"])), (v = "iCab" == D && parseFloat(L) > 3 && "WebKit" || /\bOpera\b/.test(G) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(D) && "WebKit" || !D && /\bMSIE\b/i.test(e) && ("Mac OS" == X ? "Tasman" : "Trident") || "WebKit" == D && /\bPlayStation\b(?! Vita\b)/i.test(G) && "NetFront") && (D = [v]), "IE" == G && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (G += " Mobile", X = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (G = "IE Mobile", X = "Windows Phone 8.x", B.unshift("desktop mode"), L || (L = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != G && "Trident" == D && (v = /\brv:([\d.]+)/.exec(e)) && (G && B.push("identifying as " + G + (L ? " " + L : "")), G = "IE", L = v[1]), F) {
          if (f(i, "global"))
            if (M && (v = M.lang.System, N = v.getProperty("os.arch"), X = X || v.getProperty("os.name") + " " + v.getProperty("os.version")), S && f(i, "system") && (v = [i.system])[0]) {
              X || (X = v[0].os || null);
              try {
                v[1] = i.require("ringo/engine").version, L = v[1].join("."), G = "RingoJS"
              } catch (e) {
                v[0].global.system == i.system && (G = "Narwhal")
              }
            } else "object" == typeof i.process && !i.process.browser && (v = i.process) ? "object" == typeof v.versions ? "string" == typeof v.versions.electron ? (B.push("Node " + v.versions.node), G = "Electron", L = v.versions.electron) : "string" == typeof v.versions.nw && (B.push("Chromium " + L, "Node " + v.versions.node), G = "NW.js", L = v.versions.nw) : (G = "Node.js", N = v.arch, X = v.platform, L = /[\d.]+/.exec(v.version), L = L ? L[0] : "unknown") : T && (G = "Rhino");
          else c(v = i.runtime) == O ? (G = "Adobe AIR", X = v.flash.system.Capabilities.os) : c(v = i.phantom) == P ? (G = "PhantomJS", L = (v = v.version || null) && v.major + "." + v.minor + "." + v.patch) : "number" == typeof I.documentMode && (v = /\bTrident\/(\d+)/i.exec(e)) ? (L = [L, I.documentMode], (v = +v[1] + 4) != L[1] && (B.push("IE " + L[1] + " mode"), D && (D[1] = ""), L[1] = v), L = "IE" == G ? String(L[1].toFixed(1)) : L[0]) : "number" == typeof I.documentMode && /^(?:Chrome|Firefox)\b/.test(G) && (B.push("masking as " + G + " " + L), G = "IE", L = "11.0", D = ["Trident"], X = "Windows");
          X = X && s(X)
        }
        if (L && (v = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(L) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (F && r.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (W = /b/i.test(v) ? "beta" : "alpha", L = L.replace(RegExp(v + "\\+?$"), "") + ("beta" == W ? j : A) + (/\d+\+?/.exec(v) || "")), "Fennec" == G || "Firefox" == G && /\b(?:Android|Firefox OS)\b/.test(X)) G = "Firefox Mobile";
        else if ("Maxthon" == G && L) L = L.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(U)) "Xbox 360" == U && (X = null), "Xbox 360" == U && /\bIEMobile\b/.test(e) && B.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(G) && (!G || U || /Browser|Mobi/.test(G)) || "Windows CE" != X && !/Mobi/i.test(e))
          if ("IE" == G && F) try {
            null === i.external && B.unshift("platform preview")
          } catch (e) {
            B.unshift("embedded")
          } else(/\bBlackBerry\b/.test(U) || /\bBB10\b/.test(e)) && (v = (RegExp(U.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || L) ? (v = [v, /BB10/.test(e)], X = (v[1] ? (U = null, $ = "BlackBerry") : "Device Software") + " " + v[0], L = null) : this != u && "Wii" != U && (F && R || /Opera/.test(G) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == G && /\bOS X (?:\d+\.){2,}/.test(X) || "IE" == G && (X && !/^Win/.test(X) && L > 5.5 || /\bWindows XP\b/.test(X) && L > 8 || 8 == L && !/\bTrident\b/.test(e))) && !k.test(v = h.call(u, e.replace(k, "") + ";")) && v.name && (v = "ing as " + v.name + ((v = v.version) ? " " + v : ""), k.test(G) ? (/\bIE\b/.test(v) && "Mac OS" == X && (X = null), v = "identify" + v) : (v = "mask" + v, G = z ? s(z.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(v) && (X = null), F || (L = null)), D = ["Presto"], B.push(v));
          else G += " Mobile";
        (v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (v = [parseFloat(v.replace(/\.(\d)$/, ".0$1")), v], "Safari" == G && "+" == v[1].slice(-1) ? (G = "WebKit Nightly", W = "alpha", L = v[1].slice(0, -1)) : L != v[1] && L != (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (L = null), v[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == v[0] && 537.36 == v[2] && parseFloat(v[1]) >= 28 && "WebKit" == D && (D = ["Blink"]), F && (x || v[1]) ? (D && (D[1] = "like Chrome"), v = v[1] || (v = v[0], v < 530 ? 1 : v < 532 ? 2 : v < 532.05 ? 3 : v < 533 ? 4 : v < 534.03 ? 5 : v < 534.07 ? 6 : v < 534.1 ? 7 : v < 534.13 ? 8 : v < 534.16 ? 9 : v < 534.24 ? 10 : v < 534.3 ? 11 : v < 535.01 ? 12 : v < 535.02 ? "13+" : v < 535.07 ? 15 : v < 535.11 ? 16 : v < 535.19 ? 17 : v < 536.05 ? 18 : v < 536.1 ? 19 : v < 537.01 ? 20 : v < 537.11 ? "21+" : v < 537.13 ? 23 : v < 537.18 ? 24 : v < 537.24 ? 25 : v < 537.36 ? 26 : "Blink" != D ? "27" : "28")) : (D && (D[1] = "like Safari"), v = v[0], v = v < 400 ? 1 : v < 500 ? 2 : v < 526 ? 3 : v < 533 ? 4 : v < 534 ? "4+" : v < 535 ? 5 : v < 537 ? 6 : v < 538 ? 7 : v < 601 ? 8 : "8"), D && (D[1] += " " + (v += "number" == typeof v ? ".x" : /[.+]/.test(v) ? "" : "+")), "Safari" == G && (!L || parseInt(L) > 45) && (L = v)), "Opera" == G && (v = /\bzbov|zvav$/.exec(X)) ? (G += " ", B.unshift("desktop mode"), "zvav" == v ? (G += "Mini", L = null) : G += "Mobile", X = X.replace(RegExp(" *" + v + "$"), "")) : "Safari" == G && /\bChrome\b/.exec(D && D[1]) && (B.unshift("desktop mode"), G = "Chrome Mobile", L = null, /\bOS X\b/.test(X) ? ($ = "Apple", X = "iOS 4.3+") : X = null), L && 0 == L.indexOf(v = /[\d.]+$/.exec(X)) && e.indexOf("/" + v + "-") > -1 && (X = b(X.replace(v, ""))), D && !/\b(?:Avant|Nook)\b/.test(G) && (/Browser|Lunascape|Maxthon/.test(G) || "Safari" != G && /^iOS/.test(X) && /\bSafari\b/.test(D[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(G) && D[1]) && (v = D[D.length - 1]) && B.push(v), B.length && (B = ["(" + B.join("; ") + ")"]), $ && U && U.indexOf($) < 0 && B.push("on " + $), U && B.push((/^on /.test(B[B.length - 1]) ? "" : "on ") + U), X && (v = / ([\d.+]+)$/.exec(X), m = v && "/" == X.charAt(X.length - v[0].length - 1), X = {
          architecture: 32,
          family: v && !m ? X.replace(v[0], "") : X,
          version: v ? v[1] : null,
          toString: function () {
            var e = this.version;
            return this.family + (e && !m ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
          }
        }), (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(N)) && !/\bi686\b/i.test(N) ? (X && (X.architecture = 64, X.family = X.family.replace(RegExp(" *" + v), "")), G && (/\bWOW64\b/i.test(e) || F && /\w(?:86|32)$/.test(r.cpuClass || r.platform) && !/\bWin64; x64\b/i.test(e)) && B.unshift("32-bit")) : X && /^OS X/.test(X.family) && "Chrome" == G && parseFloat(L) >= 39 && (X.architecture = 64), e || (e = null);
        var q = {};
        return q.description = e, q.layout = D && D[0], q.manufacturer = $, q.name = G, q.prerelease = W, q.product = U, q.ua = e, q.version = G && L, q.os = X || {
          architecture: null,
          family: null,
          version: null,
          toString: function () {
            return "null"
          }
        }, q.parse = h, q.toString = n, q.version && B.unshift(L), q.name && B.unshift(G), X && G && (X != String(X).split(" ")[0] || X != G.split(" ")[0] && !U) && B.push(U ? "(" + X + ")" : "on " + X), B.length && (q.description = B.join(" ")), q
      }
      var v = {
          function: !0,
          object: !0
        },
        g = v[typeof window] && window || this,
        y = g,
        m = v[typeof t] && t,
        S = v[typeof e] && e && !e.nodeType && e,
        x = m && S && "object" == typeof i && i;
      !x || x.global !== x && x.window !== x && x.self !== x || (g = x);
      var O = Math.pow(2, 53) - 1,
        k = /\bOpera/,
        _ = this,
        w = Object.prototype,
        C = w.hasOwnProperty,
        E = w.toString,
        P = h();
      g.platform = P, void 0 !== (o = function () {
        return P
      }.call(t, n, t, e)) && (e.exports = o)
    }).call(this)
  }).call(t, n(10)(e), n(11))
}, function (e, t, n) {
  "use strict";

  function i(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e
  }

  function o(e) {
    return 0 === Object.keys(e).length && e.constructor === Object
  }

  function r(e) {
    return e && "object" === (void 0 === e ? "undefined" : s(e)) && !Array.isArray(e)
  }

  function a(e) {
    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
    if (!n.length) return e;
    var l = n.shift();
    if (r(e) && r(l))
      for (var s in l) r(l[s]) ? (e[s] || u(e, i({}, s, {})), a(e[s], l[s])) : u(e, i({}, s, l[s]));
    return a.apply(void 0, [e].concat(n))
  }

  function l(e) {
    return JSON.parse(JSON.stringify(e))
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    u = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
    };
  t.isEmpty = o, t.mergeDeep = a, t.deepCopy = l
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = n(0),
    o = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(i),
    r = n(1),
    a = "yz_log_seqn",
    l = o.default.win,
    s = {
      init: function () {
        var e = (new Date).getTime();
        (0, r.getCookie)("yz_log_seqb") || (0, r.getCookie)(a) || ((0, r.setCookie)("yz_log_seqb", e), (0, r.setCookie)(a, 1))
      },
      get: function () {
        var e = {},
          t = (0, r.getCookie)("yz_log_seqb"),
          n = (new Date).getTime(),
          i = l && l.parseInt && l.parseInt((0, r.getCookie)(a));
        return t && i ? (e.seqb = t, e.seqn = i, (0, r.setCookie)(a, ++i)) : (e.seqb = n, e.seqn = 1, (0, r.setCookie)(a, 1)), e
      }
    };
  t.default = s
}, function (e, t, n) {
  "use strict";

  function i() {
    var e = {};
    return s && (e = s._global || {}), e.spm = e.spm || {}, e.spm.logType + e.spm.logId || "fake" + e.kdt_id
  }

  function o() {
    var e = (0, r.urlToArray)() || {},
      t = e.spm || "";
    if ("" !== t) {
      var n = t.split("_");
      n.length > 2 && (t = n[0] + "_" + n[n.length - 1]), t += "_" + i()
    } else t = i();
    return t
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getSpm = void 0;
  var r = n(2),
    a = n(0),
    l = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(a),
    s = l.default.win;
  t.getSpm = o
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  t.yztj = "yz_tj_", t.yzep = "yz_ep_", t.yznode = "yz_node_", t.yzReactNode = "data-yz_node_", t.yzctn = "yz_ctn_", t.yzReactCtn = "data-yz_ctn_"
}, function (e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var o = n(9),
    r = i(o),
    a = n(0),
    l = i(a),
    s = l.default.win;
  s && (s.YzLog = r.default), t.default = r.default
}, function (e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function o(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function r(e, t) {
    return e.substring(0, t.length) === t
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var a = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
    },
    l = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    s = n(3),
    u = i(s),
    c = n(12),
    f = i(c),
    p = n(0),
    d = i(p),
    b = n(13),
    h = i(b),
    v = n(14),
    g = i(v),
    y = n(2),
    m = n(4),
    S = n(5),
    x = i(S),
    O = n(1),
    k = n(6),
    _ = n(16),
    w = n(18),
    C = i(w),
    E = n(7),
    P = d.default.win,
    M = d.default.doc,
    T = d.default.ref,
    A = function () {
      function e(t) {
        o(this, e), this._doAutoClickLog = this._doAutoClickLog.bind(this), this.options = (0, m.mergeDeep)(this.defaultOptions, t), this.rurl = "", this.enterTime = "", this.leaveTime = "", this.eventFireTime = "", this.pageEvent = {}, this.onceEvent = {}, this.appUser = this.options.user, this.appEnv = this.options.env, this.appContext = this.options.context, this.appPlat = this.options.plat, this.reporter = new g.default, this._init()
      }
      return l(e, [{
        key: "_init",
        value: function () {
          this._install(), x.default.init(), this.options.autoDisplay && (this.enterpage(), this.onLeavepage()), this.options.autoClick && this._clickEventCollection(), this.spaCollect()
        }
      }, {
        key: "_install",
        value: function () {
          this.appUser = (0, _.installUser)(this.appUser), this.appContext = (0, _.installContext)(this.appContext), this.appEnv = (0, _.installEnv)(this.appEnv), this.pageEvent = (0, m.deepCopy)(this.options.event)
        }
      }, {
        key: "enterpage",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.enterTime = (new Date).getTime(), this.rurl = e.rurl || T || "", this.log({
            et: "display",
            ei: "enterpage",
            en: this.options.pageTitle,
            ts: this.enterTime || "",
            params: {
              rurl: this.rurl
            }
          })
        }
      }, {
        key: "onLeavepage",
        value: function () {
          var e = this;
          h.default.on(P, "beforeunload", function () {
            e.leavepage()
          }), "iOS" === u.default.os.family && h.default.on(P, "pagehide", function () {
            e.leavepage()
          })
        }
      }, {
        key: "leavepage",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.leaveTime = (new Date).getTime();
          var t = {
            et: "display",
            ei: "leavepage",
            en: this.options.pageTitle,
            ts: this.leaveTime,
            params: {
              rurl: this.rurl,
              enter_time: this.enterTime,
              leave_time: this.leaveTime
            }
          };
          e.durl && (t.durl = e.durl), this.log(t)
        }
      }, {
        key: "_clickEventCollection",
        value: function () {
          h.default.on(M.body, "click", this._doAutoClickLog)
        }
      }, {
        key: "_doAutoClickLog",
        value: function (e) {
          this.eventFireTime = (new Date).getTime();
          for (var t = e.target || e.srcElement, n = t.nodeName.toLocaleLowerCase() || "", i = t, o = t.innerText || t.value, l = (0, y.getXPath)(t) || "", s = "", u = {}, c = {}, f = "";
            "BODY" !== f;) ! function (e) {
            if (e.hasAttributes)
              for (var t = e.attributes, n = t.length - 1; n >= 0; n--) {
                var i = t[n].name,
                  o = t[n].value;
                if (r(i, E.yzReactNode)) {
                  var a = i.substr(E.yzReactNode.length);
                  u[a] = o
                }
                if (r(i, E.yznode)) {
                  var l = i.substr(E.yznode.length);
                  u[l] = o
                }
                if (r(i, E.yzReactCtn)) {
                  var s = i.substr(E.yzReactCtn.length);
                  c[s] = o
                }
                if (r(i, E.yzctn)) {
                  var f = i.substr(E.yzctn.length);
                  c[f] = o
                }
              }
          }(i), i = i.parentNode, f = null === i ? "BODY" : i.tagName;
          if ("body" !== n && "html" !== n && "" !== n) {
            "function" == typeof t.getAttribute && (s = t.getAttribute("yz_event_name") || t.getAttribute("name") || "");
            var p = a({}, c, u, {
              title: (0, y.sliceTitle)(o),
              item_type: n,
              rurl: this.rurl
            });
            "a" === n && (p.url = t.href), this.log({
              et: "click",
              ei: l,
              ts: this.eventFireTime,
              en: s,
              params: p
            })
          }
        }
      }, {
        key: "spaCollect",
        value: function () {
          this._hashCollect(), this._browserCollect()
        }
      }, {
        key: "_browserCollect",
        value: function () {
          var e = this;
          P.onpopstate = function (t) {
            "" === t.target.location.hash && e.options.autoHistoryDisplay && (e.leavepage({
              durl: t.oldURL || ""
            }), e.enterpage({
              rurl: t.oldURL || ""
            }))
          };
          var t = P.history.pushState;
          P.history.pushState = function (n, i, o) {
            t.apply(history, [n, i, o]), e.options.autoHistoryDisplay && (e.leavepage(), e.enterpage())
          }
        }
      }, {
        key: "_hashCollect",
        value: function () {
          var e = this;
          P.onhashchange = function (t) {
            e.options.autoHashDisplay && (e.leavepage({
              durl: t.oldURL || ""
            }), e.enterpage({
              rurl: t.oldURL || ""
            }))
          }
        }
      }, {
        key: "log",
        value: function (e, t) {
          var n = this.options.isAutoSpm;
          this.onceEvent = (0, _.installEvent)(e, this.pageEvent, n);
          var i = {
            plat: this.appPlat,
            user: this.appUser,
            context: this.appContext,
            event: this.onceEvent,
            env: this.appEnv
          };
          "leavepage" === this.onceEvent.ei && (this.pageEvent = {}), this.onceEvent = {}, this.options.debug && console.log(JSON.stringify(i)), this._doLog(i, t)
        }
      }, {
        key: "getSpm",
        value: function () {
          return (0, k.getSpm)()
        }
      }, {
        key: "setAutoCollectClick",
        value: function (e) {
          e ? this._clickEventCollection() : h.default.off(M.body, "click", this._doAutoClickLog)
        }
      }, {
        key: "setHashAutoCollectDisplay",
        value: function (e) {
          this.options.autoHashDisplay = e
        }
      }, {
        key: "setHistoryAutoCollectDisplay",
        value: function (e) {
          this.options.autoHistoryDisplay = e
        }
      }, {
        key: "setYouzanAppId",
        value: function (e) {
          this.appPlat = (0, _.installPlat)(this.appPlat, {
            yai: e
          })
        }
      }, {
        key: "setLoginSign",
        value: function (e) {
          this.appUser = (0, _.installUser)(this.appUser, {
            li: e
          })
        }
      }, {
        key: "setMoblie",
        value: function (e) {
          this.appUser = (0, _.installUser)(this.appUser, {
            m: e
          })
        }
      }, {
        key: "addSessionParams",
        value: function (e) {
          for (var t in e) {
            var n = "" + E.yztj + t;
            (0, O.setCookie)(n, e[t])
          }
        }
      }, {
        key: "setShopId",
        value: function (e) {
          this.pageEvent.si = e
        }
      }, {
        key: "setPageName",
        value: function (e) {
          this.pageEvent.en = e
        }
      }, {
        key: "setPageType",
        value: function (e) {
          this.pageEvent.pt = e
        }
      }, {
        key: "setPageParams",
        value: function (e) {
          this.pageEvent.params = e
        }
      }, {
        key: "_doLog",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = (arguments[1], this.defaultOptions.baseUrl);
          return (0, f.default)({
            url: t,
            method: "POST",
            data: e,
            withCredentials: !0
          })
        }
      }, {
        key: "defaultOptions",
        get: function () {
          return C.default
        }
      }]), e
    }();
  t.default = A
}, function (e, t) {
  e.exports = function (e) {
    return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
      enumerable: !0,
      get: function () {
        return e.l
      }
    }), Object.defineProperty(e, "id", {
      enumerable: !0,
      get: function () {
        return e.i
      }
    }), e.webpackPolyfill = 1), e
  }
}, function (e, t) {
  var n;
  n = function () {
    return this
  }();
  try {
    n = n || Function("return this")() || (0, eval)("this")
  } catch (e) {
    "object" == typeof window && (n = window)
  }
  e.exports = n
}, function (e, t, n) {
  "use strict";

  function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = arguments[1],
      n = e.url,
      i = JSON.stringify(e.data),
      o = /MSIE (\d)/.exec(navigator.userAgent);
    if (!o || "8" !== o[1] && "9" !== o[1]) {
      var r = new XMLHttpRequest;
      r.open("POST", n, !0), r.setRequestHeader("Content-type", "text/plain; charset=UTF-8"), r.timeout = 15e3, r.withCredentials = !0, r.onreadystatechange = function () {
        if (4 === r.readyState && 200 === r.status && 4 === r.readyState) {
          r.status;
          r.onreadystatechange = null
        }
      }, r.onerror = function () {
        r.abort()
      }, r.send(i)
    } else {
      var a = new XDomainRequest;
      a.timeout = 15e3, a.ontimeout = function () {
        a.abort()
      }, a.open("post", n), a.onload = function () {
        t("success")
      }, a.onprogress = function () {}, a.onerror = function () {
        a.abort()
      }, setTimeout(function () {
        a.send(i)
      }, 0)
    }
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = {
    on: function (e, t, n) {
      e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, function (t) {
        return n.call(e, t)
      }, !1)
    },
    off: function (e, t, n) {
      e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, function (t) {
        return n.call(e, t)
      }, !1)
    }
  };
  t.default = i
}, function (e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    r = n(15),
    a = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(r),
    l = function () {
      function e(t) {
        i(this, e), this.uniqueId = 1, this.storageId = "", this.frequency = 2e3, this.startTime = 500
      }
      return o(e, [{
        key: "init",
        value: function () {}
      }, {
        key: "save",
        value: function (e) {
          this.storageId = "st_" + this.uniqueId++ + "_" + (new Date).getTime(), a.default.set(this.storageId, e)
        }
      }, {
        key: "send",
        value: function () {
          var e = a.default.getAll();
          for (var t in e) console.log(t)
        }
      }]), e
    }();
  t.default = l
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = n(0),
    o = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(i),
    r = {},
    a = "localStorage",
    l = o.default.win,
    s = {};
  r.version = "0.0.1", r.set = function (e, t) {}, r.get = function (e, t) {}, r.has = function (e) {}, r.remove = function (e) {}, r.clear = function () {}, r.getAll = function () {}, r.serialize = function (e) {
    return JSON.stringify(e)
  }, r.deserialize = function (e) {
    if ("string" == typeof e) try {
      return JSON.parse(e)
    } catch (t) {
      return e || void 0
    }
  }, ! function () {
    try {
      return a in l && l[a]
    } catch (e) {
      return !1
    }
  }() ? console.log("not support storaget") : (s = l[a], r.set = function (e, t) {
    return void 0 === t ? r.remove(e) : (s.setItem(e, r.serialize(t)), t)
  }, r.get = function (e, t) {
    var n = r.deserialize(s.getItem(e));
    return void 0 === n ? t : n
  }, r.clear = function () {
    s.clear()
  }, r.getAll = function () {
    var e = {};
    return r.forEach(function (t, n) {
      e[t] = n
    }), e
  }, r.forEach = function (e) {
    for (var t = 0; t < s.length; t++) {
      var n = s.key(t);
      e(n, r.get(n))
    }
  }), t.default = r
}, function (e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return (0, v.isEmpty)(t) || (e = c({}, e, t)), e
  }

  function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = (0, h.default)(),
      i = n.uuid,
      o = n.ftime;
    return e.uuid = i, e.ftime = o, (0, v.isEmpty)(t) || (e = c({}, e, t)), e
  }

  function a() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = _.match(/MicroMessenger\/([\d\.]+)/i),
      n = _.match(/NetType\/([\w\.]+)/i);
    return e.os = p.default.os.family + " " + p.default.os.version || "", e.bn = p.default.name || "", e.bv = p.default.version || "", e.bl = p.default.layout || "", e.bd = p.default.description || "", t && (e.mmv = t[1] || "", e.net = n[1] || ""), e
  }

  function l(e) {
    var t = (0, g.getCookiesArray)() || {},
      n = (0, d.urlToArray)() || {},
      i = {};
    for (var o in t) o.substr(0, e.length) === e && (i[o] = t[o]);
    for (var r in sessionStorage) r.substr(0, e.length) === e && (i[r] = sessionStorage.getItem(r));
    for (var a in localStorage) a.substr(0, e.length) === e && (i[a] = localStorage.getItem(a));
    for (var l in n) l.substr(0, e.length) === e && (i[l] = n[l]);
    return i
  }

  function s() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = l(m.yztj);
    for (var n in t) {
      var i = n.substr(m.yztj.length);
      (0, g.setCookie)(n, t[n]), e[i] = t[n]
    }
    return e
  }

  function u(e, t, n) {
    var i = {
        params: {}
      },
      o = l(m.yzep),
      r = x.default.get(),
      a = (new Date).getTime();
    i = (0, v.mergeDeep)(i, t, e), n && (i.params.spm = (0, y.getSpm)()), i.durl = e.durl || w.href, i.en = (0, d.sliceTitle)(e.en) || "", void 0 === i.ts && (i.ts = a);
    for (var s in o) {
      var u = s.substr(m.yzep.length);
      u && (i.params[u] = o[s])
    }
    return i.seqb = r.seqb, i.seqn = r.seqn, i
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.installEvent = t.installContext = t.installEnv = t.installUser = t.installPlat = void 0;
  var c = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
    },
    f = n(3),
    p = i(f),
    d = n(2),
    b = n(17),
    h = i(b),
    v = n(4),
    g = n(1),
    y = n(6),
    m = n(7),
    S = n(5),
    x = i(S),
    O = n(0),
    k = i(O),
    _ = k.default.ua,
    w = k.default.loc;
  t.installPlat = o, t.installUser = r, t.installEnv = a, t.installContext = s, t.installEvent = u
}, function (e, t, n) {
  "use strict";

  function i() {
    function e() {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
  }

  function o() {
    var e = {},
      t = void 0,
      n = void 0,
      o = (0, r.getCookie)(s) || "",
      c = (0, r.getCookie)(u) || "";
    return o && c ? (t = o, n = c) : (t = i(), n = (new Date).getTime(), (0, r.setCookie)(u, n, l), (0, r.setCookie)(s, t, a)), e.uuid = t, e.ftime = n, e
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(1),
    a = 36500,
    l = 36500,
    s = "yz_log_uuid",
    u = "yz_log_ftime";
  t.default = o
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = n(0),
    o = function (e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(i),
    r = o.default.doc || {},
    a = o.default.win || {},
    l = a._global && a._global.title || r.title;
  t.default = {
    rate: .1,
    baseUrl: "https://tj.youzanyun.com/v3/js/log",
    debug: !1,
    autoClick: !0,
    autoDisplay: !0,
    autoHashDisplay: !1,
    autoHistoryDisplay: !1,
    pageTitle: l,
    autoSpm: !1,
    plat: {
      st: "js",
      sv: "0.3.3"
    },
    user: {},
    env: {},
    context: {},
    event: {}
  }
}]);