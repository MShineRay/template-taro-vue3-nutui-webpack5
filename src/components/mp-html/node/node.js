'use strict';
function t(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e &&
      (i = i.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      r.push.apply(r, i);
  }
  return r;
}
function e(e) {
  for (var i = 1; i < arguments.length; i++) {
    var o = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? t(Object(o), !0).forEach(function (t) {
          r(e, t, o[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : t(Object(o)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
          });
  }
  return e;
}
function r(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = r),
    t
  );
}
Component({
  data: { ctrl: {}, isiOS: wx.getSystemInfoSync().system.includes('iOS') },
  properties: { childs: Array, opts: Array },
  options: { addGlobalClass: !0 },
  attached: function () {
    this.triggerEvent('add', this, { bubbles: !0, composed: !0 });
  },
  methods: {
    noop: function () {},
    getNode: function (t) {
      try {
        for (var e = t.split('_'), r = this.data.childs[e[0]], i = 1; i < e.length; i++)
          r = r.children[e[i]];
        return r;
      } catch (t) {
        return { text: '', attrs: {}, children: [] };
      }
    },
    play: function (t) {
      var r = t.target.dataset.i,
        i = this.getNode(r);
      if (
        (this.root.triggerEvent('play', {
          source: i.name,
          attrs: e(e({}, i.attrs), {}, { src: i.src[this.data.ctrl[r] || 0] }),
        }),
        this.root.data.pauseVideo)
      ) {
        for (var o = !1, s = t.target.id, a = this.root._videos.length; a--; )
          this.root._videos[a].id === s ? (o = !0) : this.root._videos[a].pause();
        if (!o) {
          var n = wx.createVideoContext(s, this);
          (n.id = s),
            this.root.playbackRate && n.playbackRate(this.root.playbackRate),
            this.root._videos.push(n);
        }
      }
    },
    imgTap: function (t) {
      var e = this.getNode(t.target.dataset.i);
      if (e.a) return this.linkTap(e.a);
      if (
        !e.attrs.ignore &&
        (this.root.triggerEvent('imgtap', e.attrs), this.root.data.previewImg)
      ) {
        var r = this.root.imgList[e.i];
        wx.previewImage({
          showmenu: this.root.data.showImgMenu,
          current: r,
          urls: this.root.imgList,
        });
      }
    },
    imgLoad: function (t) {
      var e,
        i = t.target.dataset.i,
        o = this.getNode(i);
      o.w
        ? ((this.data.opts[1] && !this.data.ctrl[i]) || -1 === this.data.ctrl[i]) && (e = 1)
        : (e = t.detail.width),
        e && this.setData(r({}, 'ctrl.' + i, e)),
        this.checkReady();
    },
    checkReady: function () {
      var t = this;
      this.root.data.lazyLoad ||
        ((this.root.imgList._unloadimgs -= 1),
        this.root.imgList._unloadimgs ||
          setTimeout(function () {
            t.root
              .getRect()
              .then(function (e) {
                t.root.triggerEvent('ready', e);
              })
              .catch(function () {
                t.root.triggerEvent('ready', {});
              });
          }, 350));
    },
    linkTap: function (t) {
      var e = t.currentTarget ? this.getNode(t.currentTarget.dataset.i) : {},
        r = e.attrs || t,
        i = r.href;
      this.root.triggerEvent(
        'linktap',
        Object.assign({ innerText: this.root.getText(e.children || []) }, r)
      ),
        i &&
          ('#' === i[0]
            ? this.root.navigateTo(i.substring(1)).catch(function () {})
            : i.split('?')[0].includes('://')
              ? this.root.data.copyLink &&
                wx.setClipboardData({
                  data: i,
                  success: function () {
                    return wx.showToast({ title: '链接已复制' });
                  },
                })
              : wx.navigateTo({
                  url: i,
                  fail: function () {
                    wx.switchTab({ url: i, fail: function () {} });
                  },
                }));
    },
    mediaError: function (t) {
      var e = t.target.dataset.i,
        i = this.getNode(e);
      if ('video' === i.name || 'audio' === i.name) {
        var o = (this.data.ctrl[e] || 0) + 1;
        if ((o > i.src.length && (o = 0), o < i.src.length))
          return this.setData(r({}, 'ctrl.' + e, o));
      } else
        'img' === i.name &&
          (this.data.opts[2] && this.setData(r({}, 'ctrl.' + e, -1)), this.checkReady());
      this.root &&
        this.root.triggerEvent('error', {
          source: i.name,
          attrs: i.attrs,
          errMsg: t.detail.errMsg,
        });
    },
  },
});
