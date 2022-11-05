"use strict";
!(function () {
  (window.jdgm = window.jdgm || {}),
    (window.judgeme = jdgm),
    (jdgm.CDN_HOST = jdgm.CDN_HOST || "https://cdn.judge.me/");
  var e = ".jdgm-all-reviews-page, .jdgm-all-reviews-widget",
    d = {
      "widget/arp.js": e,
      "widget/others.js":
        ".jdgm-carousel, .jdgm-revs-tab, .jdgm-all-reviews-rating, .jdgm-medals, .jdgm-all-reviews-text__text, .jdgm-ugc-media",
      "widget/main.js":
        ".jdgm-review-widget, #judgeme_product_reviews, .jdgm-preview-badge, .judgeme-preview-badge",
    },
    t = Object.assign({}, d, {
      "widget/media.js":
        ".jdgm-revs-tab, .jdgm-medal__image, .jdgm-review-widget, #judgeme_product_reviews, .jdgm-ugc-media, " +
        e,
    }),
    i = {
      "main.css": {
        selector:
          ".jdgm-review-widget, #judgeme_product_reviews, .jdgm-revs-tab, .jdgm-ugc-media, " +
          e,
        callback: function () {
          var e = document.createEvent("Event");
          e.initEvent("jdgm.doneLoadingCss", !0, !0), document.dispatchEvent(e);
        },
      },
    },
    o = { "media.css": ".jdgm-ugc-media" },
    n = [
      "judgeme_token",
      "judgeme_review_uuid",
      "judgeme_dynamic_form",
      "judgeme_follow_up_token",
      "judgeme_upload_pictures",
    ],
    c = jdgm.CDN_HOST + "widget/base.js",
    g = jdgm.CDN_HOST + "widget/common.js",
    m = !1,
    r = !1,
    a = [];
  (jdgm.prefetchResource = function (e, d) {
    var t = document.createElement("link");
    (t.rel = "prefetch"),
      d && (t.as = d),
      (t.href = e),
      document.body.appendChild(t);
  }),
    (jdgm.loadScript = function (e, d, t) {
      if (t || !(jdgm.loadScript.requestedUrls.indexOf(e) >= 0))
        if (
          (jdgm.loadScript.requestedUrls.push(e),
          jdgm.$ && jdgm.$.ajax && !jdgm.forceCreateScript)
        )
          jdgm.$.ajax({ dataType: "script", cache: !0, url: e }).done(d);
        else {
          var i = document.createElement("script");
          (i.type = "text/javascript"),
            (i.src = e),
            (i.async = !0),
            d && (i.onload = d),
            document.body.appendChild(i);
        }
    }),
    (jdgm.loadScript.requestedUrls = []),
    (jdgm.loadCSS = function (e, d, t) {
      if (t || !(jdgm.loadCSS.requestedUrls.indexOf(e) >= 0)) {
        jdgm.loadCSS.requestedUrls.push(e);
        var i = document.createElement("link");
        (i.rel = "stylesheet"),
          (i["class"] = "jdgm-stylesheet"),
          (i.media = "nope!"),
          (i.href = e),
          (i.onload = function () {
            (this.media = "all"), d && setTimeout(d);
          }),
          document.body.appendChild(i);
      }
    }),
    (jdgm.loadCSS.requestedUrls = []),
    (jdgm.docReady = function (e) {
      (
        document.attachEvent
          ? "complete" === document.readyState
          : "loading" !== document.readyState
      )
        ? setTimeout(e, 0)
        : document.addEventListener("DOMContentLoaded", e);
    });
  var s = function () {
      return document.querySelectorAll(Object.values(d).join(", ")).length > 0;
    },
    j = function () {
      (r = !0),
        a.forEach(function (e) {
          e();
        }),
        setTimeout(function () {
          jdgm.triggerVanillaEvent("finishLoadingCore");
        }, 0);
    },
    u = function (e) {
      m ||
        ((m = !0),
        jdgm.loadScript(c, function () {
          jdgm.loadScript(g, j);
        }),
        jdgm.prefetchResource(g, "script")),
        r ? e() : a.push(e);
    },
    l = function () {
      var e = window.location,
        d = "#judgeme" == e.hash || "#judgeme_product_reviews" == e.hash;
      return (
        n.forEach(function (t) {
          d = d || e.search.indexOf(t) >= 0;
        }),
        d
      );
    },
    f = function () {
      u(function () {
        Object.keys(d).forEach(function (e) {
          document.querySelectorAll(d[e]).length > 0 &&
            jdgm.loadScript(jdgm.CDN_HOST + e);
        });
      }),
        Object.keys(t).forEach(function (e) {
          document.querySelectorAll(t[e]).length > 0 &&
            jdgm.prefetchResource(jdgm.CDN_HOST + e, "script");
        }),
        l() &&
          (jdgm.prefetchResource(jdgm.CDN_HOST + "widget/form.js", "script"),
          jdgm.prefetchResource(jdgm.widgetPath("form.css"), "style"));
    },
    p = function () {
      jdgm.loadCSS(jdgm.widgetPath("base.css")),
        Object.keys(i).forEach(function (e) {
          if (document.querySelectorAll(i[e].selector).length > 0) {
            var d = jdgm.widgetPath(e);
            jdgm.loadCSS(d, i[e].callback);
          }
        }),
        Object.keys(o).forEach(function (e) {
          document.querySelectorAll(o[e]).length > 0 &&
            jdgm.prefetchResource(jdgm.widgetPath(e), "stylesheet");
        });
    };
  jdgm.docReady(function () {
    (jdgm.isVersion3 = parseFloat(jdgmSettings.widget_version) >= 3),
      (jdgm.widgetPath = function (e) {
        var d = jdgm.isVersion3 ? "widget_v3/" : "widget/";
        return jdgm.CDN_HOST + d + e;
      });
  }),
    jdgm.docReady(function () {
      if (window.jdgmLoadCSS || s()) {
        var e = jdgm.CDN_HOST + "shopify_v2.css";
        document.querySelector("link[rel='stylesheet'][href='" + e + "']") ||
          (jdgmSettings.widget_load_with_code_splitting
            ? p()
            : jdgm.loadCSS(e));
      }
    }),
    jdgm.docReady(function () {
      (window.jdgmLoadJS || s()) &&
        (jdgmSettings.widget_load_with_code_splitting
          ? f()
          : jdgm.loadScript(jdgm.CDN_HOST + "shopify_v2.js", j));
    });
})();
