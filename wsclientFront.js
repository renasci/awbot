let socket = startSocket();

function startSocket() {
  let ws = new WebSocket("ws://127.0.0.1:3333");

  ws.onopen = function() {
    socket.send("setCount 20");
    socket.send("startMining");
  };
  
  ws.onmessage = function(event) {
    try {
      console.log(`[message] Данные получены с сервера: ${event.data}`);
      //alert(`4444`)
      if(event.data.includes(`calculateHash`)) {
        let [, account, difficulty, transaction] = event.data.split(` `);
        console.log(`{account, difficulty, transaction}`, {account, difficulty, transaction})
        doWorkWorker({account: account, difficulty: difficulty, transaction: transaction}).then(
          (mine_work) => {
            console.log(`end wo work`, mine_work)
            socket.send(`solution ${mine_work.solution} ${transaction}`);
          }, (e) => console.log(`doWorkWorker Error`, e)
        );
      }
    } catch(e) {
      console.log(`ws.onmessage ERROR`, e)
    }

  };
  
  ws.onclose = async function() {
    await sleep(5000)
      socket = startSocket()

  };

  return ws
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function worker_function() {
    (() => {

        var t = {
                8893: t => {
                    var e = new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/);
    
                    function r(t) {
                        return e.test(t)
                    }
    
                    function i(t) {
                        return t >= "a".charCodeAt(0) && t <= "z".charCodeAt(0) ? t - "a".charCodeAt(0) + 6 : t >= "1".charCodeAt(0) && t <= "5".charCodeAt(0) ? t - "1".charCodeAt(0) + 1 : 0
                    }
                    var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
                    t.exports = {
                        fromHex: function(t) {
                            for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));
                            return e
                        },
                        toHex: function(t) {
                            for (var e = "", r = 0; r < t.length; r++) {
                                var i = t[r];
                                e += n[i >>> 4 & 15], e += n[15 & i]
                            }
                            return e
                        },
                        randomBytes: function(t) {
                            for (var e = [], r = 0; r < t; r++) e.push(Math.floor(256 * Math.random()));
                            return e
                        },
                        isEosName: r,
                        serializeEosName: function(t) {
                            if ("string" != typeof t) throw new Error("Expected string containing EOS name");
                            if (!r(t)) throw new Error("Not an EOS name");
                            for (var e = new Uint8Array(8), n = 63, s = 0; s < t.length; ++s) {
                                var a = i(t.charCodeAt(s));
                                n < 5 && (a <<= 1);
                                for (var h = 4; h >= 0; --h) n >= 0 && (e[Math.floor(n / 8)] |= (a >> h & 1) << n % 8, --n)
                            }
                            return e
                        },
                        deserializeEosName: function(t) {
                            for (var e = "", r = 63; r >= 0;) {
                                for (var i = 0, n = 0; n < 5; ++n) r >= 0 && (i = i << 1 | t[Math.floor(r / 8)] >> r % 8 & 1, --r);
                                e += i >= 6 ? String.fromCharCode(i + "a".charCodeAt(0) - 6) : i >= 1 ? String.fromCharCode(i + "1".charCodeAt(0) - 1) : "."
                            }
                            for (; e.endsWith(".");) e = e.substr(0, e.length - 1);
                            return e
                        }
                    }
                },
                2425: (t, e, r) => {
                    //console.log(`arg`, t, e, r);
                    var {
                        Hash: i
                    } = r(9133), {
                        fromHex: n,
                        toHex: s,
                        serializeEosName: a,
                        randomBytes: h
                    } = r(8893);
    
                    function o(t, e, r) {
                        for (var i = e; i < r && 255 == t[i]++; i++);
                    }
    
                    function f(t, e, r) {
                        return t ? 0 === r[0] && 0 === r[1] && r[2] >> 4 <= e : 0 === r[0] && 0 === r[1] && 0 === r[2] && r[3] >> 4 <= e
                    }
                    t.exports = {
                        doWork: function(t) {
                            var {
                                account: e,
                                difficulty: r,
                                transaction: u,
                                seed: d,
                                length: c = Number.MAX_SAFE_INTEGER
                            } = t;
                            if (!e) throw new Error("Last transaction id is required");
                            if (r < -1 || r > 15) throw new Error("Illegal difficulty setting");
                            if (!u) throw new Error("Last transaction id is required");
                            for (var p = e.endsWith(".wam"), g = function(t, e, r) {
                                    var i = new Uint8Array(24);
                                    i.set(a(t), 0), i.set(n(e.substr(0, 16)), 8);
                                    var s = null == r ? h(8) : r;
                                    return i.set(s, 16), i
                                }(e, u, d), l = new i, v = new Uint8Array(32), b = 1; b <= c; b++) {
                                if (l.reset(), l.update(g), l.finish(v), f(p, r, v)) return {
                                    solution: s(g.slice(16, 24)),
                                    iterations: b
                                };
                                o(g, 16, 24)
                            }
                            return {
                                iterations: c
                            }
                        }
                    }
                },
                9133: function(t, e, r) {
                    var i;
                    ! function(e, n) {
                        var s = {};
                        ! function(t) {
                            "use strict";
                            t.__esModule = !0, t.digestLength = 32, t.blockSize = 64;
                            var e = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
    
                            function r(t, r, i, n, s) {
                                for (var a, h, o, f, u, d, c, p, g, l, v, b, y; s >= 64;) {
                                    for (a = r[0], h = r[1], o = r[2], f = r[3], u = r[4], d = r[5], c = r[6], p = r[7], l = 0; l < 16; l++) v = n + 4 * l, t[l] = (255 & i[v]) << 24 | (255 & i[v + 1]) << 16 | (255 & i[v + 2]) << 8 | 255 & i[v + 3];
                                    for (l = 16; l < 64; l++) b = ((g = t[l - 2]) >>> 17 | g << 15) ^ (g >>> 19 | g << 13) ^ g >>> 10, y = ((g = t[l - 15]) >>> 7 | g << 25) ^ (g >>> 18 | g << 14) ^ g >>> 3, t[l] = (b + t[l - 7] | 0) + (y + t[l - 16] | 0);
                                    for (l = 0; l < 64; l++) b = (((u >>> 6 | u << 26) ^ (u >>> 11 | u << 21) ^ (u >>> 25 | u << 7)) + (u & d ^ ~u & c) | 0) + (p + (e[l] + t[l] | 0) | 0) | 0, y = ((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10)) + (a & h ^ a & o ^ h & o) | 0, p = c, c = d, d = u, u = f + b | 0, f = o, o = h, h = a, a = b + y | 0;
                                    r[0] += a, r[1] += h, r[2] += o, r[3] += f, r[4] += u, r[5] += d, r[6] += c, r[7] += p, n += 64, s -= 64
                                }
                                return n
                            }
                            var i = function() {
                                function e() {
                                    this.digestLength = t.digestLength, this.blockSize = t.blockSize, this.state = new Int32Array(8), this.temp = new Int32Array(64), this.buffer = new Uint8Array(128), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1, this.reset()
                                }
                                return e.prototype.reset = function() {
                                    return this.state[0] = 1779033703, this.state[1] = 3144134277, this.state[2] = 1013904242, this.state[3] = 2773480762, this.state[4] = 1359893119, this.state[5] = 2600822924, this.state[6] = 528734635, this.state[7] = 1541459225, this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1, this
                                }, e.prototype.clean = function() {
                                    for (var t = 0; t < this.buffer.length; t++) this.buffer[t] = 0;
                                    for (t = 0; t < this.temp.length; t++) this.temp[t] = 0;
                                    this.reset()
                                }, e.prototype.update = function(t, e) {
                                    if (void 0 === e && (e = t.length), this.finished) throw new Error("SHA256: can't update because hash was finished.");
                                    var i = 0;
                                    if (this.bytesHashed += e, this.bufferLength > 0) {
                                        for (; this.bufferLength < 64 && e > 0;) this.buffer[this.bufferLength++] = t[i++], e--;
                                        64 === this.bufferLength && (r(this.temp, this.state, this.buffer, 0, 64), this.bufferLength = 0)
                                    }
                                    for (e >= 64 && (i = r(this.temp, this.state, t, i, e), e %= 64); e > 0;) this.buffer[this.bufferLength++] = t[i++], e--;
                                    return this
                                }, e.prototype.finish = function(t) {
                                    if (!this.finished) {
                                        var e = this.bytesHashed,
                                            i = this.bufferLength,
                                            n = e / 536870912 | 0,
                                            s = e << 3,
                                            a = e % 64 < 56 ? 64 : 128;
                                        this.buffer[i] = 128;
                                        for (var h = i + 1; h < a - 8; h++) this.buffer[h] = 0;
                                        this.buffer[a - 8] = n >>> 24 & 255, this.buffer[a - 7] = n >>> 16 & 255, this.buffer[a - 6] = n >>> 8 & 255, this.buffer[a - 5] = n >>> 0 & 255, this.buffer[a - 4] = s >>> 24 & 255, this.buffer[a - 3] = s >>> 16 & 255, this.buffer[a - 2] = s >>> 8 & 255, this.buffer[a - 1] = s >>> 0 & 255, r(this.temp, this.state, this.buffer, 0, a), this.finished = !0
                                    }
                                    for (h = 0; h < 8; h++) t[4 * h + 0] = this.state[h] >>> 24 & 255, t[4 * h + 1] = this.state[h] >>> 16 & 255, t[4 * h + 2] = this.state[h] >>> 8 & 255, t[4 * h + 3] = this.state[h] >>> 0 & 255;
                                    return this
                                }, e.prototype.digest = function() {
                                    var t = new Uint8Array(this.digestLength);
                                    return this.finish(t), t
                                }, e.prototype._saveState = function(t) {
                                    for (var e = 0; e < this.state.length; e++) t[e] = this.state[e]
                                }, e.prototype._restoreState = function(t, e) {
                                    for (var r = 0; r < this.state.length; r++) this.state[r] = t[r];
                                    this.bytesHashed = e, this.finished = !1, this.bufferLength = 0
                                }, e
                            }();
                            t.Hash = i;
                            var n = function() {
                                function t(t) {
                                    this.inner = new i, this.outer = new i, this.blockSize = this.inner.blockSize, this.digestLength = this.inner.digestLength;
                                    var e = new Uint8Array(this.blockSize);
                                    if (t.length > this.blockSize)(new i).update(t).finish(e).clean();
                                    else
                                        for (var r = 0; r < t.length; r++) e[r] = t[r];
                                    for (r = 0; r < e.length; r++) e[r] ^= 54;
                                    for (this.inner.update(e), r = 0; r < e.length; r++) e[r] ^= 106;
                                    for (this.outer.update(e), this.istate = new Uint32Array(8), this.ostate = new Uint32Array(8), this.inner._saveState(this.istate), this.outer._saveState(this.ostate), r = 0; r < e.length; r++) e[r] = 0
                                }
                                return t.prototype.reset = function() {
                                    return this.inner._restoreState(this.istate, this.inner.blockSize), this.outer._restoreState(this.ostate, this.outer.blockSize), this
                                }, t.prototype.clean = function() {
                                    for (var t = 0; t < this.istate.length; t++) this.ostate[t] = this.istate[t] = 0;
                                    this.inner.clean(), this.outer.clean()
                                }, t.prototype.update = function(t) {
                                    return this.inner.update(t), this
                                }, t.prototype.finish = function(t) {
                                    return this.outer.finished ? this.outer.finish(t) : (this.inner.finish(t), this.outer.update(t, this.digestLength).finish(t)), this
                                }, t.prototype.digest = function() {
                                    var t = new Uint8Array(this.digestLength);
                                    return this.finish(t), t
                                }, t
                            }();
    
                            function s(t) {
                                var e = (new i).update(t),
                                    r = e.digest();
                                return e.clean(), r
                            }
    
                            function a(t, e) {
                                var r = new n(t).update(e),
                                    i = r.digest();
                                return r.clean(), i
                            }
    
                            function h(t, e, r, i) {
                                var n = i[0];
                                if (0 === n) throw new Error("hkdf: cannot expand more");
                                e.reset(), n > 1 && e.update(t), r && e.update(r), e.update(i), e.finish(t), i[0]++
                            }
                            t.HMAC = n, t.hash = s, t.default = s, t.hmac = a;
                            var o = new Uint8Array(t.digestLength);
                            t.hkdf = function(t, e, r, i) {
                                void 0 === e && (e = o), void 0 === i && (i = 32);
                                for (var s = new Uint8Array([1]), f = a(e, t), u = new n(f), d = new Uint8Array(u.digestLength), c = d.length, p = new Uint8Array(i), g = 0; g < i; g++) c === d.length && (h(d, u, r, s), c = 0), p[g] = d[c++];
                                return u.clean(), d.fill(0), s.fill(0), p
                            }, t.pbkdf2 = function(t, e, r, i) {
                                for (var s = new n(t), a = s.digestLength, h = new Uint8Array(4), o = new Uint8Array(a), f = new Uint8Array(a), u = new Uint8Array(i), d = 0; d * a < i; d++) {
                                    var c = d + 1;
                                    h[0] = c >>> 24 & 255, h[1] = c >>> 16 & 255, h[2] = c >>> 8 & 255, h[3] = c >>> 0 & 255, s.reset(), s.update(e), s.update(h), s.finish(f);
                                    for (var p = 0; p < a; p++) o[p] = f[p];
                                    for (p = 2; p <= r; p++) {
                                        s.reset(), s.update(f).finish(f);
                                        for (var g = 0; g < a; g++) o[g] ^= f[g]
                                    }
                                    for (p = 0; p < a && d * a + p < i; p++) u[d * a + p] = o[p]
                                }
                                for (d = 0; d < a; d++) o[d] = f[d] = 0;
                                for (d = 0; d < 4; d++) h[d] = 0;
                                return s.clean(), u
                            }
                        }(s);
                        var a = s.default;
                        for (var h in s) a[h] = s[h];
                        "object" == typeof t.exports ? t.exports = a : void 0 === (i = function() {
                            return a
                        }.call(s, r, s, t)) || (t.exports = i)
                    }()
                }
            },
            e = {};
    
        function r(i) {
            var n = e[i];
            if (void 0 !== n) return n.exports;
            var s = e[i] = {
                exports: {}
            };
            //console.log(`ZDES`, s.exports, s, s.exports, r);//////////////////////////////////
            return t[i].call(s.exports, s, s.exports, r), s.exports
        }
        (() => {
            var {
                doWork: t
            } = r(2425);
            onmessage = function(e) {
                if ("message" === e.type && "hash-solver" === e.data.target) try {
                    var r = e.data.payload,
                        i = t(r);
                    postMessage(i)
                } catch (t) {
                    postMessage({
                        error: t.message
                    })
                }
            }
        })()
    })()
}

function n(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }
        ))),
        r.push.apply(r, n)
    }
    return r
}

function o(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r,
    t
}

function i(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2 ? n(Object(r), !0).forEach((function(e) {
            o(t, e, r[e])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
        }
        ))
    }
    return t
}

function h() {
    var t = 2;
    return "undefined" != typeof navigator && (t = navigator.hardwareConcurrency || 2),
    t
}

function doWorkWorker(t) {
    var {workers: e, limit: r=Number.MAX_SAFE_INTEGER} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    e || (e = h()),
    console.log("Working locally with ".concat(e, " threads"));
    var n = []
      , o = 1e5
      , a = 0
      , s = 0;
    function u(e) {
        e.postMessage({
            target: "hash-solver",
            payload: i(i({}, t), {}, {
                seed: null,
                length: o
            })
        })
    }
    return new Promise(((t,l)=>{
        for (var f = function(c) {
            var f = c.data;
            f.error && l(new Error(f.error)),
            s++,
            f.solution ? (a += f.iterations * e,
            n.forEach((t=>t.terminate())),
            t(i(i({}, f), {}, {
                iterations: a
            }))) : (a += o,
            s >= r ? (c.target.terminate(),
            (n = n.filter((t=>t === c.target))).length || t({
                iterations: a
            })) : u(c.target))
        }, h = 0; h < e; h++) {
            var p = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
            p.onmessage = f,
            p.onerror = l,
            n.push(p),
            u(p)
        }
    }
    ))
}
