import {a3 as t, a4 as e, a5 as r, H as n, a6 as o, N as i, s as a, X as s} from "./index-1_3ha8Vv.js";
function u(t) {
    return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
}
function c(t, e) {
    return t & e
}
function p(t, e) {
    return t | e
}
function f(t, e) {
    return t ^ e
}
function l(t, e) {
    return t & ~e
}
function y(t) {
    if (0 == t)
        return -1;
    var e = 0;
    return 65535 & t || (t >>= 16,
    e += 16),
    255 & t || (t >>= 8,
    e += 8),
    15 & t || (t >>= 4,
    e += 4),
    3 & t || (t >>= 2,
    e += 2),
    1 & t || ++e,
    e
}
function h(t) {
    for (var e = 0; 0 != t; )
        t &= t - 1,
        ++e;
    return e
}
var d, g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function m(t) {
    var e, r, n = "";
    for (e = 0; e + 3 <= t.length; e += 3)
        r = parseInt(t.substring(e, e + 3), 16),
        n += g.charAt(r >> 6) + g.charAt(63 & r);
    for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16),
    n += g.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16),
    n += g.charAt(r >> 2) + g.charAt((3 & r) << 4)); (3 & n.length) > 0; )
        n += "=";
    return n
}
var b, v = function(t) {
    var e;
    if (void 0 === d) {
        var r = "0123456789ABCDEF"
          , n = " \f\n\r\t \u2028\u2029";
        for (d = {},
        e = 0; e < 16; ++e)
            d[r.charAt(e)] = e;
        for (r = r.toLowerCase(),
        e = 10; e < 16; ++e)
            d[r.charAt(e)] = e;
        for (e = 0; e < 8; ++e)
            d[n.charAt(e)] = -1
    }
    var o = []
      , i = 0
      , a = 0;
    for (e = 0; e < t.length; ++e) {
        var s = t.charAt(e);
        if ("=" == s)
            break;
        if (-1 != (s = d[s])) {
            if (void 0 === s)
                throw new Error("Illegal character at offset " + e);
            i |= s,
            ++a >= 2 ? (o[o.length] = i,
            i = 0,
            a = 0) : i <<= 4
        }
    }
    if (a)
        throw new Error("Hex encoding incomplete: 4 bits missing");
    return o
}, S = {
    decode: function(t) {
        var e;
        if (void 0 === b) {
            var r = "= \f\n\r\t \u2028\u2029";
            for (b = Object.create(null),
            e = 0; e < 64; ++e)
                b["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
            for (b["-"] = 62,
            b._ = 63,
            e = 0; e < 9; ++e)
                b[r.charAt(e)] = -1
        }
        var n = []
          , o = 0
          , i = 0;
        for (e = 0; e < t.length; ++e) {
            var a = t.charAt(e);
            if ("=" == a)
                break;
            if (-1 != (a = b[a])) {
                if (void 0 === a)
                    throw new Error("Illegal character at offset " + e);
                o |= a,
                ++i >= 4 ? (n[n.length] = o >> 16,
                n[n.length] = o >> 8 & 255,
                n[n.length] = 255 & o,
                o = 0,
                i = 0) : o <<= 6
            }
        }
        switch (i) {
        case 1:
            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
            n[n.length] = o >> 10;
            break;
        case 3:
            n[n.length] = o >> 16,
            n[n.length] = o >> 8 & 255
        }
        return n
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(t) {
        var e = S.re.exec(t);
        if (e)
            if (e[1])
                t = e[1];
            else {
                if (!e[2])
                    throw new Error("RegExp out of sync");
                t = e[2]
            }
        return S.decode(t)
    }
}, w = 1e13, E = function() {
    function t(t) {
        this.buf = [+t || 0]
    }
    return t.prototype.mulAdd = function(t, e) {
        var r, n, o = this.buf, i = o.length;
        for (r = 0; r < i; ++r)
            (n = o[r] * t + e) < w ? e = 0 : n -= (e = 0 | n / w) * w,
            o[r] = n;
        e > 0 && (o[r] = e)
    }
    ,
    t.prototype.sub = function(t) {
        var e, r, n = this.buf, o = n.length;
        for (e = 0; e < o; ++e)
            (r = n[e] - t) < 0 ? (r += w,
            t = 1) : t = 0,
            n[e] = r;
        for (; 0 === n[n.length - 1]; )
            n.pop()
    }
    ,
    t.prototype.toString = function(t) {
        if (10 != (t || 10))
            throw new Error("only base 10 is supported");
        for (var e = this.buf, r = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n)
            r += (w + e[n]).toString().substring(1);
        return r
    }
    ,
    t.prototype.valueOf = function() {
        for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r)
            e = e * w + t[r];
        return e
    }
    ,
    t.prototype.simplify = function() {
        var t = this.buf;
        return 1 == t.length ? t[0] : this
    }
    ,
    t
}(), A = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, O = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function T(t, e) {
    return t.length > e && (t = t.substring(0, e) + "…"),
    t
}
var j, P = function() {
    function t(e, r) {
        this.hexDigits = "0123456789ABCDEF",
        e instanceof t ? (this.enc = e.enc,
        this.pos = e.pos) : (this.enc = e,
        this.pos = r)
    }
    return t.prototype.get = function(t) {
        if (void 0 === t && (t = this.pos++),
        t >= this.enc.length)
            throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
        return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
    }
    ,
    t.prototype.hexByte = function(t) {
        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
    }
    ,
    t.prototype.hexDump = function(t, e, r) {
        for (var n = "", o = t; o < e; ++o)
            if (n += this.hexByte(this.get(o)),
            !0 !== r)
                switch (15 & o) {
                case 7:
                    n += "  ";
                    break;
                case 15:
                    n += "\n";
                    break;
                default:
                    n += " "
                }
        return n
    }
    ,
    t.prototype.isASCII = function(t, e) {
        for (var r = t; r < e; ++r) {
            var n = this.get(r);
            if (n < 32 || n > 176)
                return !1
        }
        return !0
    }
    ,
    t.prototype.parseStringISO = function(t, e) {
        for (var r = "", n = t; n < e; ++n)
            r += String.fromCharCode(this.get(n));
        return r
    }
    ,
    t.prototype.parseStringUTF = function(t, e) {
        for (var r = "", n = t; n < e; ) {
            var o = this.get(n++);
            r += o < 128 ? String.fromCharCode(o) : o > 191 && o < 224 ? String.fromCharCode((31 & o) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & o) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
        }
        return r
    }
    ,
    t.prototype.parseStringBMP = function(t, e) {
        for (var r, n, o = "", i = t; i < e; )
            r = this.get(i++),
            n = this.get(i++),
            o += String.fromCharCode(r << 8 | n);
        return o
    }
    ,
    t.prototype.parseTime = function(t, e, r) {
        var n = this.parseStringISO(t, e)
          , o = (r ? A : O).exec(n);
        return o ? (r && (o[1] = +o[1],
        o[1] += +o[1] < 70 ? 2e3 : 1900),
        n = o[1] + "-" + o[2] + "-" + o[3] + " " + o[4],
        o[5] && (n += ":" + o[5],
        o[6] && (n += ":" + o[6],
        o[7] && (n += "." + o[7]))),
        o[8] && (n += " UTC",
        "Z" != o[8] && (n += o[8],
        o[9] && (n += ":" + o[9]))),
        n) : "Unrecognized time: " + n
    }
    ,
    t.prototype.parseInteger = function(t, e) {
        for (var r, n = this.get(t), o = n > 127, i = o ? 255 : 0, a = ""; n == i && ++t < e; )
            n = this.get(t);
        if (0 === (r = e - t))
            return o ? -1 : 0;
        if (r > 4) {
            for (a = n,
            r <<= 3; !(128 & (+a ^ i)); )
                a = +a << 1,
                --r;
            a = "(" + r + " bit)\n"
        }
        o && (n -= 256);
        for (var s = new E(n), u = t + 1; u < e; ++u)
            s.mulAdd(256, this.get(u));
        return a + s.toString()
    }
    ,
    t.prototype.parseBitString = function(t, e, r) {
        for (var n = this.get(t), o = "(" + ((e - t - 1 << 3) - n) + " bit)\n", i = "", a = t + 1; a < e; ++a) {
            for (var s = this.get(a), u = a == e - 1 ? n : 0, c = 7; c >= u; --c)
                i += s >> c & 1 ? "1" : "0";
            if (i.length > r)
                return o + T(i, r)
        }
        return o + i
    }
    ,
    t.prototype.parseOctetString = function(t, e, r) {
        if (this.isASCII(t, e))
            return T(this.parseStringISO(t, e), r);
        var n = e - t
          , o = "(" + n + " byte)\n";
        n > (r /= 2) && (e = t + r);
        for (var i = t; i < e; ++i)
            o += this.hexByte(this.get(i));
        return n > r && (o += "…"),
        o
    }
    ,
    t.prototype.parseOID = function(t, e, r) {
        for (var n = "", o = new E, i = 0, a = t; a < e; ++a) {
            var s = this.get(a);
            if (o.mulAdd(128, 127 & s),
            i += 7,
            !(128 & s)) {
                if ("" === n)
                    if ((o = o.simplify())instanceof E)
                        o.sub(80),
                        n = "2." + o.toString();
                    else {
                        var u = o < 80 ? o < 40 ? 0 : 1 : 2;
                        n = u + "." + (o - 40 * u)
                    }
                else
                    n += "." + o.toString();
                if (n.length > r)
                    return T(n, r);
                o = new E,
                i = 0
            }
        }
        return i > 0 && (n += ".incomplete"),
        n
    }
    ,
    t
}(), I = function() {
    function t(t, e, r, n, o) {
        if (!(n instanceof x))
            throw new Error("Invalid tag value.");
        this.stream = t,
        this.header = e,
        this.length = r,
        this.tag = n,
        this.sub = o
    }
    return t.prototype.typeName = function() {
        switch (this.tag.tagClass) {
        case 0:
            switch (this.tag.tagNumber) {
            case 0:
                return "EOC";
            case 1:
                return "BOOLEAN";
            case 2:
                return "INTEGER";
            case 3:
                return "BIT_STRING";
            case 4:
                return "OCTET_STRING";
            case 5:
                return "NULL";
            case 6:
                return "OBJECT_IDENTIFIER";
            case 7:
                return "ObjectDescriptor";
            case 8:
                return "EXTERNAL";
            case 9:
                return "REAL";
            case 10:
                return "ENUMERATED";
            case 11:
                return "EMBEDDED_PDV";
            case 12:
                return "UTF8String";
            case 16:
                return "SEQUENCE";
            case 17:
                return "SET";
            case 18:
                return "NumericString";
            case 19:
                return "PrintableString";
            case 20:
                return "TeletexString";
            case 21:
                return "VideotexString";
            case 22:
                return "IA5String";
            case 23:
                return "UTCTime";
            case 24:
                return "GeneralizedTime";
            case 25:
                return "GraphicString";
            case 26:
                return "VisibleString";
            case 27:
                return "GeneralString";
            case 28:
                return "UniversalString";
            case 30:
                return "BMPString"
            }
            return "Universal_" + this.tag.tagNumber.toString();
        case 1:
            return "Application_" + this.tag.tagNumber.toString();
        case 2:
            return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
            return "Private_" + this.tag.tagNumber.toString()
        }
    }
    ,
    t.prototype.content = function(t) {
        if (void 0 === this.tag)
            return null;
        void 0 === t && (t = 1 / 0);
        var e = this.posContent()
          , r = Math.abs(this.length);
        if (!this.tag.isUniversal())
            return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
        switch (this.tag.tagNumber) {
        case 1:
            return 0 === this.stream.get(e) ? "false" : "true";
        case 2:
            return this.stream.parseInteger(e, e + r);
        case 3:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
        case 4:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
        case 6:
            return this.stream.parseOID(e, e + r, t);
        case 16:
        case 17:
            return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
            return T(this.stream.parseStringUTF(e, e + r), t);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
            return T(this.stream.parseStringISO(e, e + r), t);
        case 30:
            return T(this.stream.parseStringBMP(e, e + r), t);
        case 23:
        case 24:
            return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
        }
        return null
    }
    ,
    t.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
    }
    ,
    t.prototype.toPrettyString = function(t) {
        void 0 === t && (t = "");
        var e = t + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0 && (e += "+"),
        e += this.length,
        this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
        e += "\n",
        null !== this.sub) {
            t += "  ";
            for (var r = 0, n = this.sub.length; r < n; ++r)
                e += this.sub[r].toPrettyString(t)
        }
        return e
    }
    ,
    t.prototype.posStart = function() {
        return this.stream.pos
    }
    ,
    t.prototype.posContent = function() {
        return this.stream.pos + this.header
    }
    ,
    t.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length)
    }
    ,
    t.prototype.toHexString = function() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    }
    ,
    t.decodeLength = function(t) {
        var e = t.get()
          , r = 127 & e;
        if (r == e)
            return r;
        if (r > 6)
            throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
        if (0 === r)
            return null;
        e = 0;
        for (var n = 0; n < r; ++n)
            e = 256 * e + t.get();
        return e
    }
    ,
    t.prototype.getHexStringValue = function() {
        var t = this.toHexString()
          , e = 2 * this.header
          , r = 2 * this.length;
        return t.substr(e, r)
    }
    ,
    t.decode = function(e) {
        var r;
        r = e instanceof P ? e : new P(e,0);
        var n = new P(r)
          , o = new x(r)
          , i = t.decodeLength(r)
          , a = r.pos
          , s = a - n.pos
          , u = null
          , c = function() {
            var e = [];
            if (null !== i) {
                for (var n = a + i; r.pos < n; )
                    e[e.length] = t.decode(r);
                if (r.pos != n)
                    throw new Error("Content size is not correct for container starting at offset " + a)
            } else
                try {
                    for (; ; ) {
                        var o = t.decode(r);
                        if (o.tag.isEOC())
                            break;
                        e[e.length] = o
                    }
                    i = a - r.pos
                } catch (s) {
                    throw new Error("Exception while decoding undefined length content: " + s)
                }
            return e
        };
        if (o.tagConstructed)
            u = c();
        else if (o.isUniversal() && (3 == o.tagNumber || 4 == o.tagNumber))
            try {
                if (3 == o.tagNumber && 0 != r.get())
                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                u = c();
                for (var p = 0; p < u.length; ++p)
                    if (u[p].tag.isEOC())
                        throw new Error("EOC is not supposed to be actual content.")
            } catch (f) {
                u = null
            }
        if (null === u) {
            if (null === i)
                throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
            r.pos = a + Math.abs(i)
        }
        return new t(n,s,i,o,u)
    }
    ,
    t
}(), x = function() {
    function t(t) {
        var e = t.get();
        if (this.tagClass = e >> 6,
        this.tagConstructed = !!(32 & e),
        this.tagNumber = 31 & e,
        31 == this.tagNumber) {
            var r = new E;
            do {
                e = t.get(),
                r.mulAdd(128, 127 & e)
            } while (128 & e);
            this.tagNumber = r.simplify()
        }
    }
    return t.prototype.isUniversal = function() {
        return 0 === this.tagClass
    }
    ,
    t.prototype.isEOC = function() {
        return 0 === this.tagClass && 0 === this.tagNumber
    }
    ,
    t
}(), R = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], D = (1 << 26) / R[R.length - 1], _ = function() {
    function t(t, e, r) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    return t.prototype.toString = function(t) {
        if (this.s < 0)
            return "-" + this.negate().toString(t);
        var e;
        if (16 == t)
            e = 4;
        else if (8 == t)
            e = 3;
        else if (2 == t)
            e = 1;
        else if (32 == t)
            e = 5;
        else {
            if (4 != t)
                return this.toRadix(t);
            e = 2
        }
        var r, n = (1 << e) - 1, o = !1, i = "", a = this.t, s = this.DB - a * this.DB % e;
        if (a-- > 0)
            for (s < this.DB && (r = this[a] >> s) > 0 && (o = !0,
            i = u(r)); a >= 0; )
                s < e ? (r = (this[a] & (1 << s) - 1) << e - s,
                r |= this[--a] >> (s += this.DB - e)) : (r = this[a] >> (s -= e) & n,
                s <= 0 && (s += this.DB,
                --a)),
                r > 0 && (o = !0),
                o && (i += u(r));
        return o ? i : "0"
    }
    ,
    t.prototype.negate = function() {
        var e = V();
        return t.ZERO.subTo(this, e),
        e
    }
    ,
    t.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this
    }
    ,
    t.prototype.compareTo = function(t) {
        var e = this.s - t.s;
        if (0 != e)
            return e;
        var r = this.t;
        if (0 != (e = r - t.t))
            return this.s < 0 ? -e : e;
        for (; --r >= 0; )
            if (0 != (e = this[r] - t[r]))
                return e;
        return 0
    }
    ,
    t.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + $(this[this.t - 1] ^ this.s & this.DM)
    }
    ,
    t.prototype.mod = function(e) {
        var r = V();
        return this.abs().divRemTo(e, null, r),
        this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
        r
    }
    ,
    t.prototype.modPowInt = function(t, e) {
        var r;
        return r = t < 256 || e.isEven() ? new N(e) : new M(e),
        this.exp(t, r)
    }
    ,
    t.prototype.clone = function() {
        var t = V();
        return this.copyTo(t),
        t
    }
    ,
    t.prototype.intValue = function() {
        if (this.s < 0) {
            if (1 == this.t)
                return this[0] - this.DV;
            if (0 == this.t)
                return -1
        } else {
            if (1 == this.t)
                return this[0];
            if (0 == this.t)
                return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }
    ,
    t.prototype.byteValue = function() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24
    }
    ,
    t.prototype.shortValue = function() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16
    }
    ,
    t.prototype.signum = function() {
        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
    }
    ,
    t.prototype.toByteArray = function() {
        var t = this.t
          , e = [];
        e[0] = this.s;
        var r, n = this.DB - t * this.DB % 8, o = 0;
        if (t-- > 0)
            for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[o++] = r | this.s << this.DB - n); t >= 0; )
                n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                n <= 0 && (n += this.DB,
                --t)),
                128 & r && (r |= -256),
                0 == o && (128 & this.s) != (128 & r) && ++o,
                (o > 0 || r != this.s) && (e[o++] = r);
        return e
    }
    ,
    t.prototype.equals = function(t) {
        return 0 == this.compareTo(t)
    }
    ,
    t.prototype.min = function(t) {
        return this.compareTo(t) < 0 ? this : t
    }
    ,
    t.prototype.max = function(t) {
        return this.compareTo(t) > 0 ? this : t
    }
    ,
    t.prototype.and = function(t) {
        var e = V();
        return this.bitwiseTo(t, c, e),
        e
    }
    ,
    t.prototype.or = function(t) {
        var e = V();
        return this.bitwiseTo(t, p, e),
        e
    }
    ,
    t.prototype.xor = function(t) {
        var e = V();
        return this.bitwiseTo(t, f, e),
        e
    }
    ,
    t.prototype.andNot = function(t) {
        var e = V();
        return this.bitwiseTo(t, l, e),
        e
    }
    ,
    t.prototype.not = function() {
        for (var t = V(), e = 0; e < this.t; ++e)
            t[e] = this.DM & ~this[e];
        return t.t = this.t,
        t.s = ~this.s,
        t
    }
    ,
    t.prototype.shiftLeft = function(t) {
        var e = V();
        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
        e
    }
    ,
    t.prototype.shiftRight = function(t) {
        var e = V();
        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
        e
    }
    ,
    t.prototype.getLowestSetBit = function() {
        for (var t = 0; t < this.t; ++t)
            if (0 != this[t])
                return t * this.DB + y(this[t]);
        return this.s < 0 ? this.t * this.DB : -1
    }
    ,
    t.prototype.bitCount = function() {
        for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
            t += h(this[r] ^ e);
        return t
    }
    ,
    t.prototype.testBit = function(t) {
        var e = Math.floor(t / this.DB);
        return e >= this.t ? 0 != this.s : !!(this[e] & 1 << t % this.DB)
    }
    ,
    t.prototype.setBit = function(t) {
        return this.changeBit(t, p)
    }
    ,
    t.prototype.clearBit = function(t) {
        return this.changeBit(t, l)
    }
    ,
    t.prototype.flipBit = function(t) {
        return this.changeBit(t, f)
    }
    ,
    t.prototype.add = function(t) {
        var e = V();
        return this.addTo(t, e),
        e
    }
    ,
    t.prototype.subtract = function(t) {
        var e = V();
        return this.subTo(t, e),
        e
    }
    ,
    t.prototype.multiply = function(t) {
        var e = V();
        return this.multiplyTo(t, e),
        e
    }
    ,
    t.prototype.divide = function(t) {
        var e = V();
        return this.divRemTo(t, e, null),
        e
    }
    ,
    t.prototype.remainder = function(t) {
        var e = V();
        return this.divRemTo(t, null, e),
        e
    }
    ,
    t.prototype.divideAndRemainder = function(t) {
        var e = V()
          , r = V();
        return this.divRemTo(t, e, r),
        [e, r]
    }
    ,
    t.prototype.modPow = function(t, e) {
        var r, n, o = t.bitLength(), i = H(1);
        if (o <= 0)
            return i;
        r = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
        n = o < 8 ? new N(e) : e.isEven() ? new F(e) : new M(e);
        var a = []
          , s = 3
          , u = r - 1
          , c = (1 << r) - 1;
        if (a[1] = n.convert(this),
        r > 1) {
            var p = V();
            for (n.sqrTo(a[1], p); s <= c; )
                a[s] = V(),
                n.mulTo(p, a[s - 2], a[s]),
                s += 2
        }
        var f, l, y = t.t - 1, h = !0, d = V();
        for (o = $(t[y]) - 1; y >= 0; ) {
            for (o >= u ? f = t[y] >> o - u & c : (f = (t[y] & (1 << o + 1) - 1) << u - o,
            y > 0 && (f |= t[y - 1] >> this.DB + o - u)),
            s = r; !(1 & f); )
                f >>= 1,
                --s;
            if ((o -= s) < 0 && (o += this.DB,
            --y),
            h)
                a[f].copyTo(i),
                h = !1;
            else {
                for (; s > 1; )
                    n.sqrTo(i, d),
                    n.sqrTo(d, i),
                    s -= 2;
                s > 0 ? n.sqrTo(i, d) : (l = i,
                i = d,
                d = l),
                n.mulTo(d, a[f], i)
            }
            for (; y >= 0 && !(t[y] & 1 << o); )
                n.sqrTo(i, d),
                l = i,
                i = d,
                d = l,
                --o < 0 && (o = this.DB - 1,
                --y)
        }
        return n.revert(i)
    }
    ,
    t.prototype.modInverse = function(e) {
        var r = e.isEven();
        if (this.isEven() && r || 0 == e.signum())
            return t.ZERO;
        for (var n = e.clone(), o = this.clone(), i = H(1), a = H(0), s = H(0), u = H(1); 0 != n.signum(); ) {
            for (; n.isEven(); )
                n.rShiftTo(1, n),
                r ? (i.isEven() && a.isEven() || (i.addTo(this, i),
                a.subTo(e, a)),
                i.rShiftTo(1, i)) : a.isEven() || a.subTo(e, a),
                a.rShiftTo(1, a);
            for (; o.isEven(); )
                o.rShiftTo(1, o),
                r ? (s.isEven() && u.isEven() || (s.addTo(this, s),
                u.subTo(e, u)),
                s.rShiftTo(1, s)) : u.isEven() || u.subTo(e, u),
                u.rShiftTo(1, u);
            n.compareTo(o) >= 0 ? (n.subTo(o, n),
            r && i.subTo(s, i),
            a.subTo(u, a)) : (o.subTo(n, o),
            r && s.subTo(i, s),
            u.subTo(a, u))
        }
        return 0 != o.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
        u.signum() < 0 ? u.add(e) : u) : u
    }
    ,
    t.prototype.pow = function(t) {
        return this.exp(t, new B)
    }
    ,
    t.prototype.gcd = function(t) {
        var e = this.s < 0 ? this.negate() : this.clone()
          , r = t.s < 0 ? t.negate() : t.clone();
        if (e.compareTo(r) < 0) {
            var n = e;
            e = r,
            r = n
        }
        var o = e.getLowestSetBit()
          , i = r.getLowestSetBit();
        if (i < 0)
            return e;
        for (o < i && (i = o),
        i > 0 && (e.rShiftTo(i, e),
        r.rShiftTo(i, r)); e.signum() > 0; )
            (o = e.getLowestSetBit()) > 0 && e.rShiftTo(o, e),
            (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
            e.compareTo(r) >= 0 ? (e.subTo(r, e),
            e.rShiftTo(1, e)) : (r.subTo(e, r),
            r.rShiftTo(1, r));
        return i > 0 && r.lShiftTo(i, r),
        r
    }
    ,
    t.prototype.isProbablePrime = function(t) {
        var e, r = this.abs();
        if (1 == r.t && r[0] <= R[R.length - 1]) {
            for (e = 0; e < R.length; ++e)
                if (r[0] == R[e])
                    return !0;
            return !1
        }
        if (r.isEven())
            return !1;
        for (e = 1; e < R.length; ) {
            for (var n = R[e], o = e + 1; o < R.length && n < D; )
                n *= R[o++];
            for (n = r.modInt(n); e < o; )
                if (n % R[e++] == 0)
                    return !1
        }
        return r.millerRabin(t)
    }
    ,
    t.prototype.copyTo = function(t) {
        for (var e = this.t - 1; e >= 0; --e)
            t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    ,
    t.prototype.fromInt = function(t) {
        this.t = 1,
        this.s = t < 0 ? -1 : 0,
        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
    }
    ,
    t.prototype.fromString = function(e, r) {
        var n;
        if (16 == r)
            n = 4;
        else if (8 == r)
            n = 3;
        else if (256 == r)
            n = 8;
        else if (2 == r)
            n = 1;
        else if (32 == r)
            n = 5;
        else {
            if (4 != r)
                return void this.fromRadix(e, r);
            n = 2
        }
        this.t = 0,
        this.s = 0;
        for (var o = e.length, i = !1, a = 0; --o >= 0; ) {
            var s = 8 == n ? 255 & +e[o] : W(e, o);
            s < 0 ? "-" == e.charAt(o) && (i = !0) : (i = !1,
            0 == a ? this[this.t++] = s : a + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
            this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
            (a += n) >= this.DB && (a -= this.DB))
        }
        8 == n && 128 & +e[0] && (this.s = -1,
        a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
        this.clamp(),
        i && t.ZERO.subTo(this, this)
    }
    ,
    t.prototype.clamp = function() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
            --this.t
    }
    ,
    t.prototype.dlShiftTo = function(t, e) {
        var r;
        for (r = this.t - 1; r >= 0; --r)
            e[r + t] = this[r];
        for (r = t - 1; r >= 0; --r)
            e[r] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    ,
    t.prototype.drShiftTo = function(t, e) {
        for (var r = t; r < this.t; ++r)
            e[r - t] = this[r];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    ,
    t.prototype.lShiftTo = function(t, e) {
        for (var r = t % this.DB, n = this.DB - r, o = (1 << n) - 1, i = Math.floor(t / this.DB), a = this.s << r & this.DM, s = this.t - 1; s >= 0; --s)
            e[s + i + 1] = this[s] >> n | a,
            a = (this[s] & o) << r;
        for (s = i - 1; s >= 0; --s)
            e[s] = 0;
        e[i] = a,
        e.t = this.t + i + 1,
        e.s = this.s,
        e.clamp()
    }
    ,
    t.prototype.rShiftTo = function(t, e) {
        e.s = this.s;
        var r = Math.floor(t / this.DB);
        if (r >= this.t)
            e.t = 0;
        else {
            var n = t % this.DB
              , o = this.DB - n
              , i = (1 << n) - 1;
            e[0] = this[r] >> n;
            for (var a = r + 1; a < this.t; ++a)
                e[a - r - 1] |= (this[a] & i) << o,
                e[a - r] = this[a] >> n;
            n > 0 && (e[this.t - r - 1] |= (this.s & i) << o),
            e.t = this.t - r,
            e.clamp()
        }
    }
    ,
    t.prototype.subTo = function(t, e) {
        for (var r = 0, n = 0, o = Math.min(t.t, this.t); r < o; )
            n += this[r] - t[r],
            e[r++] = n & this.DM,
            n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; r < this.t; )
                n += this[r],
                e[r++] = n & this.DM,
                n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; r < t.t; )
                n -= t[r],
                e[r++] = n & this.DM,
                n >>= this.DB;
            n -= t.s
        }
        e.s = n < 0 ? -1 : 0,
        n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
        e.t = r,
        e.clamp()
    }
    ,
    t.prototype.multiplyTo = function(e, r) {
        var n = this.abs()
          , o = e.abs()
          , i = n.t;
        for (r.t = i + o.t; --i >= 0; )
            r[i] = 0;
        for (i = 0; i < o.t; ++i)
            r[i + n.t] = n.am(0, o[i], r, i, 0, n.t);
        r.s = 0,
        r.clamp(),
        this.s != e.s && t.ZERO.subTo(r, r)
    }
    ,
    t.prototype.squareTo = function(t) {
        for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0; )
            t[r] = 0;
        for (r = 0; r < e.t - 1; ++r) {
            var n = e.am(r, e[r], t, 2 * r, 0, 1);
            (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
            t[r + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    ,
    t.prototype.divRemTo = function(e, r, n) {
        var o = e.abs();
        if (!(o.t <= 0)) {
            var i = this.abs();
            if (i.t < o.t)
                return null != r && r.fromInt(0),
                void (null != n && this.copyTo(n));
            null == n && (n = V());
            var a = V()
              , s = this.s
              , u = e.s
              , c = this.DB - $(o[o.t - 1]);
            c > 0 ? (o.lShiftTo(c, a),
            i.lShiftTo(c, n)) : (o.copyTo(a),
            i.copyTo(n));
            var p = a.t
              , f = a[p - 1];
            if (0 != f) {
                var l = f * (1 << this.F1) + (p > 1 ? a[p - 2] >> this.F2 : 0)
                  , y = this.FV / l
                  , h = (1 << this.F1) / l
                  , d = 1 << this.F2
                  , g = n.t
                  , m = g - p
                  , b = null == r ? V() : r;
                for (a.dlShiftTo(m, b),
                n.compareTo(b) >= 0 && (n[n.t++] = 1,
                n.subTo(b, n)),
                t.ONE.dlShiftTo(p, b),
                b.subTo(a, a); a.t < p; )
                    a[a.t++] = 0;
                for (; --m >= 0; ) {
                    var v = n[--g] == f ? this.DM : Math.floor(n[g] * y + (n[g - 1] + d) * h);
                    if ((n[g] += a.am(0, v, n, m, 0, p)) < v)
                        for (a.dlShiftTo(m, b),
                        n.subTo(b, n); n[g] < --v; )
                            n.subTo(b, n)
                }
                null != r && (n.drShiftTo(p, r),
                s != u && t.ZERO.subTo(r, r)),
                n.t = p,
                n.clamp(),
                c > 0 && n.rShiftTo(c, n),
                s < 0 && t.ZERO.subTo(n, n)
            }
        }
    }
    ,
    t.prototype.invDigit = function() {
        if (this.t < 1)
            return 0;
        var t = this[0];
        if (!(1 & t))
            return 0;
        var e = 3 & t;
        return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
    }
    ,
    t.prototype.isEven = function() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    ,
    t.prototype.exp = function(e, r) {
        if (e > 4294967295 || e < 1)
            return t.ONE;
        var n = V()
          , o = V()
          , i = r.convert(this)
          , a = $(e) - 1;
        for (i.copyTo(n); --a >= 0; )
            if (r.sqrTo(n, o),
            (e & 1 << a) > 0)
                r.mulTo(o, i, n);
            else {
                var s = n;
                n = o,
                o = s
            }
        return r.revert(n)
    }
    ,
    t.prototype.chunkSize = function(t) {
        return Math.floor(Math.LN2 * this.DB / Math.log(t))
    }
    ,
    t.prototype.toRadix = function(t) {
        if (null == t && (t = 10),
        0 == this.signum() || t < 2 || t > 36)
            return "0";
        var e = this.chunkSize(t)
          , r = Math.pow(t, e)
          , n = H(r)
          , o = V()
          , i = V()
          , a = "";
        for (this.divRemTo(n, o, i); o.signum() > 0; )
            a = (r + i.intValue()).toString(t).substr(1) + a,
            o.divRemTo(n, o, i);
        return i.intValue().toString(t) + a
    }
    ,
    t.prototype.fromRadix = function(e, r) {
        this.fromInt(0),
        null == r && (r = 10);
        for (var n = this.chunkSize(r), o = Math.pow(r, n), i = !1, a = 0, s = 0, u = 0; u < e.length; ++u) {
            var c = W(e, u);
            c < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (i = !0) : (s = r * s + c,
            ++a >= n && (this.dMultiply(o),
            this.dAddOffset(s, 0),
            a = 0,
            s = 0))
        }
        a > 0 && (this.dMultiply(Math.pow(r, a)),
        this.dAddOffset(s, 0)),
        i && t.ZERO.subTo(this, this)
    }
    ,
    t.prototype.fromNumber = function(e, r, n) {
        if ("number" == typeof r)
            if (e < 2)
                this.fromInt(1);
            else
                for (this.fromNumber(e, n),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), p, this),
                this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r); )
                    this.dAddOffset(2, 0),
                    this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
        else {
            var o = []
              , i = 7 & e;
            o.length = 1 + (e >> 3),
            r.nextBytes(o),
            i > 0 ? o[0] &= (1 << i) - 1 : o[0] = 0,
            this.fromString(o, 256)
        }
    }
    ,
    t.prototype.bitwiseTo = function(t, e, r) {
        var n, o, i = Math.min(t.t, this.t);
        for (n = 0; n < i; ++n)
            r[n] = e(this[n], t[n]);
        if (t.t < this.t) {
            for (o = t.s & this.DM,
            n = i; n < this.t; ++n)
                r[n] = e(this[n], o);
            r.t = this.t
        } else {
            for (o = this.s & this.DM,
            n = i; n < t.t; ++n)
                r[n] = e(o, t[n]);
            r.t = t.t
        }
        r.s = e(this.s, t.s),
        r.clamp()
    }
    ,
    t.prototype.changeBit = function(e, r) {
        var n = t.ONE.shiftLeft(e);
        return this.bitwiseTo(n, r, n),
        n
    }
    ,
    t.prototype.addTo = function(t, e) {
        for (var r = 0, n = 0, o = Math.min(t.t, this.t); r < o; )
            n += this[r] + t[r],
            e[r++] = n & this.DM,
            n >>= this.DB;
        if (t.t < this.t) {
            for (n += t.s; r < this.t; )
                n += this[r],
                e[r++] = n & this.DM,
                n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; r < t.t; )
                n += t[r],
                e[r++] = n & this.DM,
                n >>= this.DB;
            n += t.s
        }
        e.s = n < 0 ? -1 : 0,
        n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
        e.t = r,
        e.clamp()
    }
    ,
    t.prototype.dMultiply = function(t) {
        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
        ++this.t,
        this.clamp()
    }
    ,
    t.prototype.dAddOffset = function(t, e) {
        if (0 != t) {
            for (; this.t <= e; )
                this[this.t++] = 0;
            for (this[e] += t; this[e] >= this.DV; )
                this[e] -= this.DV,
                ++e >= this.t && (this[this.t++] = 0),
                ++this[e]
        }
    }
    ,
    t.prototype.multiplyLowerTo = function(t, e, r) {
        var n = Math.min(this.t + t.t, e);
        for (r.s = 0,
        r.t = n; n > 0; )
            r[--n] = 0;
        for (var o = r.t - this.t; n < o; ++n)
            r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
        for (o = Math.min(t.t, e); n < o; ++n)
            this.am(0, t[n], r, n, 0, e - n);
        r.clamp()
    }
    ,
    t.prototype.multiplyUpperTo = function(t, e, r) {
        --e;
        var n = r.t = this.t + t.t - e;
        for (r.s = 0; --n >= 0; )
            r[n] = 0;
        for (n = Math.max(e - this.t, 0); n < t.t; ++n)
            r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
        r.clamp(),
        r.drShiftTo(1, r)
    }
    ,
    t.prototype.modInt = function(t) {
        if (t <= 0)
            return 0;
        var e = this.DV % t
          , r = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
            if (0 == e)
                r = this[0] % t;
            else
                for (var n = this.t - 1; n >= 0; --n)
                    r = (e * r + this[n]) % t;
        return r
    }
    ,
    t.prototype.millerRabin = function(e) {
        var r = this.subtract(t.ONE)
          , n = r.getLowestSetBit();
        if (n <= 0)
            return !1;
        var o = r.shiftRight(n);
        (e = e + 1 >> 1) > R.length && (e = R.length);
        for (var i = V(), a = 0; a < e; ++a) {
            i.fromInt(R[Math.floor(Math.random() * R.length)]);
            var s = i.modPow(o, this);
            if (0 != s.compareTo(t.ONE) && 0 != s.compareTo(r)) {
                for (var u = 1; u++ < n && 0 != s.compareTo(r); )
                    if (0 == (s = s.modPowInt(2, this)).compareTo(t.ONE))
                        return !1;
                if (0 != s.compareTo(r))
                    return !1
            }
        }
        return !0
    }
    ,
    t.prototype.square = function() {
        var t = V();
        return this.squareTo(t),
        t
    }
    ,
    t.prototype.gcda = function(t, e) {
        var r = this.s < 0 ? this.negate() : this.clone()
          , n = t.s < 0 ? t.negate() : t.clone();
        if (r.compareTo(n) < 0) {
            var o = r;
            r = n,
            n = o
        }
        var i = r.getLowestSetBit()
          , a = n.getLowestSetBit();
        if (a < 0)
            e(r);
        else {
            i < a && (a = i),
            a > 0 && (r.rShiftTo(a, r),
            n.rShiftTo(a, n));
            var s = function() {
                (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
                r.compareTo(n) >= 0 ? (r.subTo(n, r),
                r.rShiftTo(1, r)) : (n.subTo(r, n),
                n.rShiftTo(1, n)),
                r.signum() > 0 ? setTimeout(s, 0) : (a > 0 && n.lShiftTo(a, n),
                setTimeout((function() {
                    e(n)
                }
                ), 0))
            };
            setTimeout(s, 10)
        }
    }
    ,
    t.prototype.fromNumberAsync = function(e, r, n, o) {
        if ("number" == typeof r)
            if (e < 2)
                this.fromInt(1);
            else {
                this.fromNumber(e, n),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), p, this),
                this.isEven() && this.dAddOffset(1, 0);
                var i = this
                  , a = function() {
                    i.dAddOffset(2, 0),
                    i.bitLength() > e && i.subTo(t.ONE.shiftLeft(e - 1), i),
                    i.isProbablePrime(r) ? setTimeout((function() {
                        o()
                    }
                    ), 0) : setTimeout(a, 0)
                };
                setTimeout(a, 0)
            }
        else {
            var s = []
              , u = 7 & e;
            s.length = 1 + (e >> 3),
            r.nextBytes(s),
            u > 0 ? s[0] &= (1 << u) - 1 : s[0] = 0,
            this.fromString(s, 256)
        }
    }
    ,
    t
}(), B = function() {
    function t() {}
    return t.prototype.convert = function(t) {
        return t
    }
    ,
    t.prototype.revert = function(t) {
        return t
    }
    ,
    t.prototype.mulTo = function(t, e, r) {
        t.multiplyTo(e, r)
    }
    ,
    t.prototype.sqrTo = function(t, e) {
        t.squareTo(e)
    }
    ,
    t
}(), N = function() {
    function t(t) {
        this.m = t
    }
    return t.prototype.convert = function(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    ,
    t.prototype.revert = function(t) {
        return t
    }
    ,
    t.prototype.reduce = function(t) {
        t.divRemTo(this.m, null, t)
    }
    ,
    t.prototype.mulTo = function(t, e, r) {
        t.multiplyTo(e, r),
        this.reduce(r)
    }
    ,
    t.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    ,
    t
}(), M = function() {
    function t(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    return t.prototype.convert = function(t) {
        var e = V();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(_.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    ,
    t.prototype.revert = function(t) {
        var e = V();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    ,
    t.prototype.reduce = function(t) {
        for (; t.t <= this.mt2; )
            t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var r = 32767 & t[e]
              , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV; )
                t[r] -= t.DV,
                t[++r]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    ,
    t.prototype.mulTo = function(t, e, r) {
        t.multiplyTo(e, r),
        this.reduce(r)
    }
    ,
    t.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    ,
    t
}(), F = function() {
    function t(t) {
        this.m = t,
        this.r2 = V(),
        this.q3 = V(),
        _.ONE.dlShiftTo(2 * t.t, this.r2),
        this.mu = this.r2.divide(t)
    }
    return t.prototype.convert = function(t) {
        if (t.s < 0 || t.t > 2 * this.m.t)
            return t.mod(this.m);
        if (t.compareTo(this.m) < 0)
            return t;
        var e = V();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    ,
    t.prototype.revert = function(t) {
        return t
    }
    ,
    t.prototype.reduce = function(t) {
        for (t.drShiftTo(this.m.t - 1, this.r2),
        t.t > this.m.t + 1 && (t.t = this.m.t + 1,
        t.clamp()),
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
            t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
            t.subTo(this.m, t)
    }
    ,
    t.prototype.mulTo = function(t, e, r) {
        t.multiplyTo(e, r),
        this.reduce(r)
    }
    ,
    t.prototype.sqrTo = function(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    ,
    t
}();
function V() {
    return new _(null)
}
function U(t, e) {
    return new _(t,e)
}
var k = "undefined" != typeof navigator;
k && "Microsoft Internet Explorer" == navigator.appName ? (_.prototype.am = function(t, e, r, n, o, i) {
    for (var a = 32767 & e, s = e >> 15; --i >= 0; ) {
        var u = 32767 & this[t]
          , c = this[t++] >> 15
          , p = s * u + c * a;
        o = ((u = a * u + ((32767 & p) << 15) + r[n] + (1073741823 & o)) >>> 30) + (p >>> 15) + s * c + (o >>> 30),
        r[n++] = 1073741823 & u
    }
    return o
}
,
j = 30) : k && "Netscape" != navigator.appName ? (_.prototype.am = function(t, e, r, n, o, i) {
    for (; --i >= 0; ) {
        var a = e * this[t++] + r[n] + o;
        o = Math.floor(a / 67108864),
        r[n++] = 67108863 & a
    }
    return o
}
,
j = 26) : (_.prototype.am = function(t, e, r, n, o, i) {
    for (var a = 16383 & e, s = e >> 14; --i >= 0; ) {
        var u = 16383 & this[t]
          , c = this[t++] >> 14
          , p = s * u + c * a;
        o = ((u = a * u + ((16383 & p) << 14) + r[n] + o) >> 28) + (p >> 14) + s * c,
        r[n++] = 268435455 & u
    }
    return o
}
,
j = 28),
_.prototype.DB = j,
_.prototype.DM = (1 << j) - 1,
_.prototype.DV = 1 << j;
_.prototype.FV = Math.pow(2, 52),
_.prototype.F1 = 52 - j,
_.prototype.F2 = 2 * j - 52;
var C, L, q = [];
for (C = "0".charCodeAt(0),
L = 0; L <= 9; ++L)
    q[C++] = L;
for (C = "a".charCodeAt(0),
L = 10; L < 36; ++L)
    q[C++] = L;
for (C = "A".charCodeAt(0),
L = 10; L < 36; ++L)
    q[C++] = L;
function W(t, e) {
    var r = q[t.charCodeAt(e)];
    return null == r ? -1 : r
}
function H(t) {
    var e = V();
    return e.fromInt(t),
    e
}
function $(t) {
    var e, r = 1;
    return 0 != (e = t >>> 16) && (t = e,
    r += 16),
    0 != (e = t >> 8) && (t = e,
    r += 8),
    0 != (e = t >> 4) && (t = e,
    r += 4),
    0 != (e = t >> 2) && (t = e,
    r += 2),
    0 != (e = t >> 1) && (t = e,
    r += 1),
    r
}
_.ZERO = H(0),
_.ONE = H(1);
var G = function() {
    function t() {
        this.i = 0,
        this.j = 0,
        this.S = []
    }
    return t.prototype.init = function(t) {
        var e, r, n;
        for (e = 0; e < 256; ++e)
            this.S[e] = e;
        for (r = 0,
        e = 0; e < 256; ++e)
            r = r + this.S[e] + t[e % t.length] & 255,
            n = this.S[e],
            this.S[e] = this.S[r],
            this.S[r] = n;
        this.i = 0,
        this.j = 0
    }
    ,
    t.prototype.next = function() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    ,
    t
}();
var z, K, J = null;
if (null == J) {
    J = [],
    K = 0;
    var Z = void 0;
    if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) {
        var Q = new Uint32Array(256);
        for (window.crypto.getRandomValues(Q),
        Z = 0; Z < Q.length; ++Z)
            J[K++] = 255 & Q[Z]
    }
    var Y = 0
      , X = function(t) {
        if ((Y = Y || 0) >= 256 || K >= 256)
            window.removeEventListener ? window.removeEventListener("mousemove", X, !1) : window.detachEvent && window.detachEvent("onmousemove", X);
        else
            try {
                var e = t.x + t.y;
                J[K++] = 255 & e,
                Y += 1
            } catch (r) {}
    };
    "undefined" != typeof window && (window.addEventListener ? window.addEventListener("mousemove", X, !1) : window.attachEvent && window.attachEvent("onmousemove", X))
}
function tt() {
    if (null == z) {
        for (z = new G; K < 256; ) {
            var t = Math.floor(65536 * Math.random());
            J[K++] = 255 & t
        }
        for (z.init(J),
        K = 0; K < J.length; ++K)
            J[K] = 0;
        K = 0
    }
    return z.next()
}
var et = function() {
    function t() {}
    return t.prototype.nextBytes = function(t) {
        for (var e = 0; e < t.length; ++e)
            t[e] = tt()
    }
    ,
    t
}();
var rt = function() {
    function t() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    return t.prototype.doPublic = function(t) {
        return t.modPowInt(this.e, this.n)
    }
    ,
    t.prototype.doPrivate = function(t) {
        if (null == this.p || null == this.q)
            return t.modPow(this.d, this.n);
        for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0; )
            e = e.add(this.p);
        return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
    }
    ,
    t.prototype.setPublic = function(t, e) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = U(t, 16),
        this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
    }
    ,
    t.prototype.encrypt = function(t) {
        var e = this.n.bitLength() + 7 >> 3
          , r = function(t, e) {
            if (e < t.length + 11)
                return console.error("Message too long for RSA"),
                null;
            for (var r = [], n = t.length - 1; n >= 0 && e > 0; ) {
                var o = t.charCodeAt(n--);
                o < 128 ? r[--e] = o : o > 127 && o < 2048 ? (r[--e] = 63 & o | 128,
                r[--e] = o >> 6 | 192) : (r[--e] = 63 & o | 128,
                r[--e] = o >> 6 & 63 | 128,
                r[--e] = o >> 12 | 224)
            }
            r[--e] = 0;
            for (var i = new et, a = []; e > 2; ) {
                for (a[0] = 0; 0 == a[0]; )
                    i.nextBytes(a);
                r[--e] = a[0]
            }
            return r[--e] = 2,
            r[--e] = 0,
            new _(r)
        }(t, e);
        if (null == r)
            return null;
        var n = this.doPublic(r);
        if (null == n)
            return null;
        for (var o = n.toString(16), i = o.length, a = 0; a < 2 * e - i; a++)
            o = "0" + o;
        return o
    }
    ,
    t.prototype.setPrivate = function(t, e, r) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = U(t, 16),
        this.e = parseInt(e, 16),
        this.d = U(r, 16)) : console.error("Invalid RSA private key")
    }
    ,
    t.prototype.setPrivateEx = function(t, e, r, n, o, i, a, s) {
        null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = U(t, 16),
        this.e = parseInt(e, 16),
        this.d = U(r, 16),
        this.p = U(n, 16),
        this.q = U(o, 16),
        this.dmp1 = U(i, 16),
        this.dmq1 = U(a, 16),
        this.coeff = U(s, 16)) : console.error("Invalid RSA private key")
    }
    ,
    t.prototype.generate = function(t, e) {
        var r = new et
          , n = t >> 1;
        this.e = parseInt(e, 16);
        for (var o = new _(e,16); ; ) {
            for (; this.p = new _(t - n,1,r),
            0 != this.p.subtract(_.ONE).gcd(o).compareTo(_.ONE) || !this.p.isProbablePrime(10); )
                ;
            for (; this.q = new _(n,1,r),
            0 != this.q.subtract(_.ONE).gcd(o).compareTo(_.ONE) || !this.q.isProbablePrime(10); )
                ;
            if (this.p.compareTo(this.q) <= 0) {
                var i = this.p;
                this.p = this.q,
                this.q = i
            }
            var a = this.p.subtract(_.ONE)
              , s = this.q.subtract(_.ONE)
              , u = a.multiply(s);
            if (0 == u.gcd(o).compareTo(_.ONE)) {
                this.n = this.p.multiply(this.q),
                this.d = o.modInverse(u),
                this.dmp1 = this.d.mod(a),
                this.dmq1 = this.d.mod(s),
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    }
    ,
    t.prototype.decrypt = function(t) {
        var e = U(t, 16)
          , r = this.doPrivate(e);
        return null == r ? null : function(t, e) {
            var r = t.toByteArray()
              , n = 0;
            for (; n < r.length && 0 == r[n]; )
                ++n;
            if (r.length - n != e - 1 || 2 != r[n])
                return null;
            ++n;
            for (; 0 != r[n]; )
                if (++n >= r.length)
                    return null;
            var o = "";
            for (; ++n < r.length; ) {
                var i = 255 & r[n];
                i < 128 ? o += String.fromCharCode(i) : i > 191 && i < 224 ? (o += String.fromCharCode((31 & i) << 6 | 63 & r[n + 1]),
                ++n) : (o += String.fromCharCode((15 & i) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]),
                n += 2)
            }
            return o
        }(r, this.n.bitLength() + 7 >> 3)
    }
    ,
    t.prototype.generateAsync = function(t, e, r) {
        var n = new et
          , o = t >> 1;
        this.e = parseInt(e, 16);
        var i = new _(e,16)
          , a = this
          , s = function() {
            var e = function() {
                if (a.p.compareTo(a.q) <= 0) {
                    var t = a.p;
                    a.p = a.q,
                    a.q = t
                }
                var e = a.p.subtract(_.ONE)
                  , n = a.q.subtract(_.ONE)
                  , o = e.multiply(n);
                0 == o.gcd(i).compareTo(_.ONE) ? (a.n = a.p.multiply(a.q),
                a.d = i.modInverse(o),
                a.dmp1 = a.d.mod(e),
                a.dmq1 = a.d.mod(n),
                a.coeff = a.q.modInverse(a.p),
                setTimeout((function() {
                    r()
                }
                ), 0)) : setTimeout(s, 0)
            }
              , u = function() {
                a.q = V(),
                a.q.fromNumberAsync(o, 1, n, (function() {
                    a.q.subtract(_.ONE).gcda(i, (function(t) {
                        0 == t.compareTo(_.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(u, 0)
                    }
                    ))
                }
                ))
            }
              , c = function() {
                a.p = V(),
                a.p.fromNumberAsync(t - o, 1, n, (function() {
                    a.p.subtract(_.ONE).gcda(i, (function(t) {
                        0 == t.compareTo(_.ONE) && a.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(c, 0)
                    }
                    ))
                }
                ))
            };
            setTimeout(c, 0)
        };
        setTimeout(s, 0)
    }
    ,
    t.prototype.sign = function(t, e, r) {
        var n = function(t, e) {
            if (e < t.length + 22)
                return console.error("Message too long for RSA"),
                null;
            for (var r = e - t.length - 6, n = "", o = 0; o < r; o += 2)
                n += "ff";
            return U("0001" + n + "00" + t, 16)
        }((nt[r] || "") + e(t).toString(), this.n.bitLength() / 4);
        if (null == n)
            return null;
        var o = this.doPrivate(n);
        if (null == o)
            return null;
        var i = o.toString(16);
        return 1 & i.length ? "0" + i : i
    }
    ,
    t.prototype.verify = function(t, e, r) {
        var n = U(e, 16)
          , o = this.doPublic(n);
        return null == o ? null : function(t) {
            for (var e in nt)
                if (nt.hasOwnProperty(e)) {
                    var r = nt[e]
                      , n = r.length;
                    if (t.substr(0, n) == r)
                        return t.substr(n)
                }
            return t
        }/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
        (o.toString(16).replace(/^1f+00/, "")) == r(t).toString()
    }
    ,
    t
}();
var nt = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
};
var ot = {};
ot.lang = {
    extend: function(t, e, r) {
        if (!e || !t)
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        var n = function() {};
        if (n.prototype = e.prototype,
        t.prototype = new n,
        t.prototype.constructor = t,
        t.superclass = e.prototype,
        e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
        r) {
            var o;
            for (o in r)
                t.prototype[o] = r[o];
            var i = function() {}
              , a = ["toString", "valueOf"];
            try {
                /MSIE/.test(navigator.userAgent) && (i = function(t, e) {
                    for (o = 0; o < a.length; o += 1) {
                        var r = a[o]
                          , n = e[r];
                        "function" == typeof n && n != Object.prototype[r] && (t[r] = n)
                    }
                }
                )
            } catch (s) {}
            i(t.prototype, r)
        }
    }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var it = {};
void 0 !== it.asn1 && it.asn1 || (it.asn1 = {}),
it.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(t) {
        var e = t.toString(16);
        return e.length % 2 == 1 && (e = "0" + e),
        e
    }
    ,
    this.bigIntToMinTwosComplementsHex = function(t) {
        var e = t.toString(16);
        if ("-" != e.substr(0, 1))
            e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
        else {
            var r = e.substr(1).length;
            r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
            for (var n = "", o = 0; o < r; o++)
                n += "f";
            e = new _(n,16).xor(t).add(_.ONE).toString(16).replace(/^-/, "")
        }
        return e
    }
    ,
    this.getPEMStringFromHex = function(t, e) {
        return hextopem(t, e)
    }
    ,
    this.newObject = function(t) {
        var e = it.asn1
          , r = e.DERBoolean
          , n = e.DERInteger
          , o = e.DERBitString
          , i = e.DEROctetString
          , a = e.DERNull
          , s = e.DERObjectIdentifier
          , u = e.DEREnumerated
          , c = e.DERUTF8String
          , p = e.DERNumericString
          , f = e.DERPrintableString
          , l = e.DERTeletexString
          , y = e.DERIA5String
          , h = e.DERUTCTime
          , d = e.DERGeneralizedTime
          , g = e.DERSequence
          , m = e.DERSet
          , b = e.DERTaggedObject
          , v = e.ASN1Util.newObject
          , S = Object.keys(t);
        if (1 != S.length)
            throw "key of param shall be only one.";
        var w = S[0];
        if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + w + ":"))
            throw "undefined key: " + w;
        if ("bool" == w)
            return new r(t[w]);
        if ("int" == w)
            return new n(t[w]);
        if ("bitstr" == w)
            return new o(t[w]);
        if ("octstr" == w)
            return new i(t[w]);
        if ("null" == w)
            return new a(t[w]);
        if ("oid" == w)
            return new s(t[w]);
        if ("enum" == w)
            return new u(t[w]);
        if ("utf8str" == w)
            return new c(t[w]);
        if ("numstr" == w)
            return new p(t[w]);
        if ("prnstr" == w)
            return new f(t[w]);
        if ("telstr" == w)
            return new l(t[w]);
        if ("ia5str" == w)
            return new y(t[w]);
        if ("utctime" == w)
            return new h(t[w]);
        if ("gentime" == w)
            return new d(t[w]);
        if ("seq" == w) {
            for (var E = t[w], A = [], O = 0; O < E.length; O++) {
                var T = v(E[O]);
                A.push(T)
            }
            return new g({
                array: A
            })
        }
        if ("set" == w) {
            for (E = t[w],
            A = [],
            O = 0; O < E.length; O++) {
                T = v(E[O]);
                A.push(T)
            }
            return new m({
                array: A
            })
        }
        if ("tag" == w) {
            var j = t[w];
            if ("[object Array]" === Object.prototype.toString.call(j) && 3 == j.length) {
                var P = v(j[2]);
                return new b({
                    tag: j[0],
                    explicit: j[1],
                    obj: P
                })
            }
            var I = {};
            if (void 0 !== j.explicit && (I.explicit = j.explicit),
            void 0 !== j.tag && (I.tag = j.tag),
            void 0 === j.obj)
                throw "obj shall be specified for 'tag'.";
            return I.obj = v(j.obj),
            new b(I)
        }
    }
    ,
    this.jsonToASN1HEX = function(t) {
        return this.newObject(t).getEncodedHex()
    }
}
,
it.asn1.ASN1Util.oidHexToInt = function(t) {
    for (var e = "", r = parseInt(t.substr(0, 2), 16), n = (e = Math.floor(r / 40) + "." + r % 40,
    ""), o = 2; o < t.length; o += 2) {
        var i = ("00000000" + parseInt(t.substr(o, 2), 16).toString(2)).slice(-8);
        if (n += i.substr(1, 7),
        "0" == i.substr(0, 1))
            e = e + "." + new _(n,2).toString(10),
            n = ""
    }
    return e
}
,
it.asn1.ASN1Util.oidIntToHex = function(t) {
    var e = function(t) {
        var e = t.toString(16);
        return 1 == e.length && (e = "0" + e),
        e
    }
      , r = function(t) {
        var r = ""
          , n = new _(t,10).toString(2)
          , o = 7 - n.length % 7;
        7 == o && (o = 0);
        for (var i = "", a = 0; a < o; a++)
            i += "0";
        n = i + n;
        for (a = 0; a < n.length - 1; a += 7) {
            var s = n.substr(a, 7);
            a != n.length - 7 && (s = "1" + s),
            r += e(parseInt(s, 2))
        }
        return r
    };
    if (!t.match(/^[0-9.]+$/))
        throw "malformed oid string: " + t;
    var n = ""
      , o = t.split(".")
      , i = 40 * parseInt(o[0]) + parseInt(o[1]);
    n += e(i),
    o.splice(0, 2);
    for (var a = 0; a < o.length; a++)
        n += r(o[a]);
    return n
}
,
it.asn1.ASN1Object = function() {
    this.getLengthHexFromValue = function() {
        if (void 0 === this.hV || null == this.hV)
            throw "this.hV is null or undefined.";
        if (this.hV.length % 2 == 1)
            throw "value hex must be even length: n=0,v=" + this.hV;
        var t = this.hV.length / 2
          , e = t.toString(16);
        if (e.length % 2 == 1 && (e = "0" + e),
        t < 128)
            return e;
        var r = e.length / 2;
        if (r > 15)
            throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
        return (128 + r).toString(16) + e
    }
    ,
    this.getEncodedHex = function() {
        return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
        this.hL = this.getLengthHexFromValue(),
        this.hTLV = this.hT + this.hL + this.hV,
        this.isModified = !1),
        this.hTLV
    }
    ,
    this.getValueHex = function() {
        return this.getEncodedHex(),
        this.hV
    }
    ,
    this.getFreshValueHex = function() {
        return ""
    }
}
,
it.asn1.DERAbstractString = function(t) {
    it.asn1.DERAbstractString.superclass.constructor.call(this),
    this.getString = function() {
        return this.s
    }
    ,
    this.setString = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.s = t,
        this.hV = stohex(this.s)
    }
    ,
    this.setStringHex = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.s = null,
        this.hV = t
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
}
,
ot.lang.extend(it.asn1.DERAbstractString, it.asn1.ASN1Object),
it.asn1.DERAbstractTime = function(t) {
    it.asn1.DERAbstractTime.superclass.constructor.call(this),
    this.localDateToUTC = function(t) {
        return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
        new Date(utc)
    }
    ,
    this.formatDate = function(t, e, r) {
        var n = this.zeroPadding
          , o = this.localDateToUTC(t)
          , i = String(o.getFullYear());
        "utc" == e && (i = i.substr(2, 2));
        var a = i + n(String(o.getMonth() + 1), 2) + n(String(o.getDate()), 2) + n(String(o.getHours()), 2) + n(String(o.getMinutes()), 2) + n(String(o.getSeconds()), 2);
        if (!0 === r) {
            var s = o.getMilliseconds();
            if (0 != s) {
                var u = n(String(s), 3);
                a = a + "." + (u = u.replace(/[0]+$/, ""))
            }
        }
        return a + "Z"
    }
    ,
    this.zeroPadding = function(t, e) {
        return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
    }
    ,
    this.getString = function() {
        return this.s
    }
    ,
    this.setString = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.s = t,
        this.hV = stohex(t)
    }
    ,
    this.setByDateValue = function(t, e, r, n, o, i) {
        var a = new Date(Date.UTC(t, e - 1, r, n, o, i, 0));
        this.setByDate(a)
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
}
,
ot.lang.extend(it.asn1.DERAbstractTime, it.asn1.ASN1Object),
it.asn1.DERAbstractStructured = function(t) {
    it.asn1.DERAbstractString.superclass.constructor.call(this),
    this.setByASN1ObjectArray = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.asn1Array = t
    }
    ,
    this.appendASN1Object = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.asn1Array.push(t)
    }
    ,
    this.asn1Array = new Array,
    void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
}
,
ot.lang.extend(it.asn1.DERAbstractStructured, it.asn1.ASN1Object),
it.asn1.DERBoolean = function() {
    it.asn1.DERBoolean.superclass.constructor.call(this),
    this.hT = "01",
    this.hTLV = "0101ff"
}
,
ot.lang.extend(it.asn1.DERBoolean, it.asn1.ASN1Object),
it.asn1.DERInteger = function(t) {
    it.asn1.DERInteger.superclass.constructor.call(this),
    this.hT = "02",
    this.setByBigInteger = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.hV = it.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
    }
    ,
    this.setByInteger = function(t) {
        var e = new _(String(t),10);
        this.setByBigInteger(e)
    }
    ,
    this.setValueHex = function(t) {
        this.hV = t
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
}
,
ot.lang.extend(it.asn1.DERInteger, it.asn1.ASN1Object),
it.asn1.DERBitString = function(t) {
    if (void 0 !== t && void 0 !== t.obj) {
        var e = it.asn1.ASN1Util.newObject(t.obj);
        t.hex = "00" + e.getEncodedHex()
    }
    it.asn1.DERBitString.superclass.constructor.call(this),
    this.hT = "03",
    this.setHexValueIncludingUnusedBits = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.hV = t
    }
    ,
    this.setUnusedBitsAndHexValue = function(t, e) {
        if (t < 0 || 7 < t)
            throw "unused bits shall be from 0 to 7: u = " + t;
        var r = "0" + t;
        this.hTLV = null,
        this.isModified = !0,
        this.hV = r + e
    }
    ,
    this.setByBinaryString = function(t) {
        var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
        8 == e && (e = 0);
        for (var r = 0; r <= e; r++)
            t += "0";
        var n = "";
        for (r = 0; r < t.length - 1; r += 8) {
            var o = t.substr(r, 8)
              , i = parseInt(o, 2).toString(16);
            1 == i.length && (i = "0" + i),
            n += i
        }
        this.hTLV = null,
        this.isModified = !0,
        this.hV = "0" + e + n
    }
    ,
    this.setByBooleanArray = function(t) {
        for (var e = "", r = 0; r < t.length; r++)
            1 == t[r] ? e += "1" : e += "0";
        this.setByBinaryString(e)
    }
    ,
    this.newFalseArray = function(t) {
        for (var e = new Array(t), r = 0; r < t; r++)
            e[r] = !1;
        return e
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
}
,
ot.lang.extend(it.asn1.DERBitString, it.asn1.ASN1Object),
it.asn1.DEROctetString = function(t) {
    if (void 0 !== t && void 0 !== t.obj) {
        var e = it.asn1.ASN1Util.newObject(t.obj);
        t.hex = e.getEncodedHex()
    }
    it.asn1.DEROctetString.superclass.constructor.call(this, t),
    this.hT = "04"
}
,
ot.lang.extend(it.asn1.DEROctetString, it.asn1.DERAbstractString),
it.asn1.DERNull = function() {
    it.asn1.DERNull.superclass.constructor.call(this),
    this.hT = "05",
    this.hTLV = "0500"
}
,
ot.lang.extend(it.asn1.DERNull, it.asn1.ASN1Object),
it.asn1.DERObjectIdentifier = function(t) {
    var e = function(t) {
        var e = t.toString(16);
        return 1 == e.length && (e = "0" + e),
        e
    }
      , r = function(t) {
        var r = ""
          , n = new _(t,10).toString(2)
          , o = 7 - n.length % 7;
        7 == o && (o = 0);
        for (var i = "", a = 0; a < o; a++)
            i += "0";
        n = i + n;
        for (a = 0; a < n.length - 1; a += 7) {
            var s = n.substr(a, 7);
            a != n.length - 7 && (s = "1" + s),
            r += e(parseInt(s, 2))
        }
        return r
    };
    it.asn1.DERObjectIdentifier.superclass.constructor.call(this),
    this.hT = "06",
    this.setValueHex = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.s = null,
        this.hV = t
    }
    ,
    this.setValueOidString = function(t) {
        if (!t.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t;
        var n = ""
          , o = t.split(".")
          , i = 40 * parseInt(o[0]) + parseInt(o[1]);
        n += e(i),
        o.splice(0, 2);
        for (var a = 0; a < o.length; a++)
            n += r(o[a]);
        this.hTLV = null,
        this.isModified = !0,
        this.s = null,
        this.hV = n
    }
    ,
    this.setValueName = function(t) {
        var e = it.asn1.x509.OID.name2oid(t);
        if ("" === e)
            throw "DERObjectIdentifier oidName undefined: " + t;
        this.setValueOidString(e)
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
}
,
ot.lang.extend(it.asn1.DERObjectIdentifier, it.asn1.ASN1Object),
it.asn1.DEREnumerated = function(t) {
    it.asn1.DEREnumerated.superclass.constructor.call(this),
    this.hT = "0a",
    this.setByBigInteger = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.hV = it.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
    }
    ,
    this.setByInteger = function(t) {
        var e = new _(String(t),10);
        this.setByBigInteger(e)
    }
    ,
    this.setValueHex = function(t) {
        this.hV = t
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
}
,
ot.lang.extend(it.asn1.DEREnumerated, it.asn1.ASN1Object),
it.asn1.DERUTF8String = function(t) {
    it.asn1.DERUTF8String.superclass.constructor.call(this, t),
    this.hT = "0c"
}
,
ot.lang.extend(it.asn1.DERUTF8String, it.asn1.DERAbstractString),
it.asn1.DERNumericString = function(t) {
    it.asn1.DERNumericString.superclass.constructor.call(this, t),
    this.hT = "12"
}
,
ot.lang.extend(it.asn1.DERNumericString, it.asn1.DERAbstractString),
it.asn1.DERPrintableString = function(t) {
    it.asn1.DERPrintableString.superclass.constructor.call(this, t),
    this.hT = "13"
}
,
ot.lang.extend(it.asn1.DERPrintableString, it.asn1.DERAbstractString),
it.asn1.DERTeletexString = function(t) {
    it.asn1.DERTeletexString.superclass.constructor.call(this, t),
    this.hT = "14"
}
,
ot.lang.extend(it.asn1.DERTeletexString, it.asn1.DERAbstractString),
it.asn1.DERIA5String = function(t) {
    it.asn1.DERIA5String.superclass.constructor.call(this, t),
    this.hT = "16"
}
,
ot.lang.extend(it.asn1.DERIA5String, it.asn1.DERAbstractString),
it.asn1.DERUTCTime = function(t) {
    it.asn1.DERUTCTime.superclass.constructor.call(this, t),
    this.hT = "17",
    this.setByDate = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.date = t,
        this.s = this.formatDate(this.date, "utc"),
        this.hV = stohex(this.s)
    }
    ,
    this.getFreshValueHex = function() {
        return void 0 === this.date && void 0 === this.s && (this.date = new Date,
        this.s = this.formatDate(this.date, "utc"),
        this.hV = stohex(this.s)),
        this.hV
    }
    ,
    void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
}
,
ot.lang.extend(it.asn1.DERUTCTime, it.asn1.DERAbstractTime),
it.asn1.DERGeneralizedTime = function(t) {
    it.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
    this.hT = "18",
    this.withMillis = !1,
    this.setByDate = function(t) {
        this.hTLV = null,
        this.isModified = !0,
        this.date = t,
        this.s = this.formatDate(this.date, "gen", this.withMillis),
        this.hV = stohex(this.s)
    }
    ,
    this.getFreshValueHex = function() {
        return void 0 === this.date && void 0 === this.s && (this.date = new Date,
        this.s = this.formatDate(this.date, "gen", this.withMillis),
        this.hV = stohex(this.s)),
        this.hV
    }
    ,
    void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
    !0 === t.millis && (this.withMillis = !0))
}
,
ot.lang.extend(it.asn1.DERGeneralizedTime, it.asn1.DERAbstractTime),
it.asn1.DERSequence = function(t) {
    it.asn1.DERSequence.superclass.constructor.call(this, t),
    this.hT = "30",
    this.getFreshValueHex = function() {
        for (var t = "", e = 0; e < this.asn1Array.length; e++) {
            t += this.asn1Array[e].getEncodedHex()
        }
        return this.hV = t,
        this.hV
    }
}
,
ot.lang.extend(it.asn1.DERSequence, it.asn1.DERAbstractStructured),
it.asn1.DERSet = function(t) {
    it.asn1.DERSet.superclass.constructor.call(this, t),
    this.hT = "31",
    this.sortFlag = !0,
    this.getFreshValueHex = function() {
        for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
            var r = this.asn1Array[e];
            t.push(r.getEncodedHex())
        }
        return 1 == this.sortFlag && t.sort(),
        this.hV = t.join(""),
        this.hV
    }
    ,
    void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
}
,
ot.lang.extend(it.asn1.DERSet, it.asn1.DERAbstractStructured),
it.asn1.DERTaggedObject = function(t) {
    it.asn1.DERTaggedObject.superclass.constructor.call(this),
    this.hT = "a0",
    this.hV = "",
    this.isExplicit = !0,
    this.asn1Object = null,
    this.setASN1Object = function(t, e, r) {
        this.hT = e,
        this.isExplicit = t,
        this.asn1Object = r,
        this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
        this.hTLV = null,
        this.isModified = !0) : (this.hV = null,
        this.hTLV = r.getEncodedHex(),
        this.hTLV = this.hTLV.replace(/^../, e),
        this.isModified = !1)
    }
    ,
    this.getFreshValueHex = function() {
        return this.hV
    }
    ,
    void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
    void 0 !== t.explicit && (this.isExplicit = t.explicit),
    void 0 !== t.obj && (this.asn1Object = t.obj,
    this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
}
,
ot.lang.extend(it.asn1.DERTaggedObject, it.asn1.ASN1Object);
var at = function() {
    var t = function(e, r) {
        return (t = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
        }
        )(e, r)
    };
    return function(e, r) {
        if ("function" != typeof r && null !== r)
            throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        function n() {
            this.constructor = e
        }
        t(e, r),
        e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
        new n)
    }
}();
!function(t) {
    function e(r) {
        var n = t.call(this) || this;
        return r && ("string" == typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
        n
    }
    at(e, t),
    e.prototype.parseKey = function(t) {
        try {
            var e = 0
              , r = 0
              , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? v(t) : S.unarmor(t)
              , o = I.decode(n);
            if (3 === o.sub.length && (o = o.sub[2].sub[0]),
            9 === o.sub.length) {
                e = o.sub[1].getHexStringValue(),
                this.n = U(e, 16),
                r = o.sub[2].getHexStringValue(),
                this.e = parseInt(r, 16);
                var i = o.sub[3].getHexStringValue();
                this.d = U(i, 16);
                var a = o.sub[4].getHexStringValue();
                this.p = U(a, 16);
                var s = o.sub[5].getHexStringValue();
                this.q = U(s, 16);
                var u = o.sub[6].getHexStringValue();
                this.dmp1 = U(u, 16);
                var c = o.sub[7].getHexStringValue();
                this.dmq1 = U(c, 16);
                var p = o.sub[8].getHexStringValue();
                this.coeff = U(p, 16)
            } else {
                if (2 !== o.sub.length)
                    return !1;
                if (o.sub[0].sub) {
                    var f = o.sub[1].sub[0];
                    e = f.sub[0].getHexStringValue(),
                    this.n = U(e, 16),
                    r = f.sub[1].getHexStringValue(),
                    this.e = parseInt(r, 16)
                } else
                    e = o.sub[0].getHexStringValue(),
                    this.n = U(e, 16),
                    r = o.sub[1].getHexStringValue(),
                    this.e = parseInt(r, 16)
            }
            return !0
        } catch (l) {
            return !1
        }
    }
    ,
    e.prototype.getPrivateBaseKey = function() {
        var t = {
            array: [new it.asn1.DERInteger({
                int: 0
            }), new it.asn1.DERInteger({
                bigint: this.n
            }), new it.asn1.DERInteger({
                int: this.e
            }), new it.asn1.DERInteger({
                bigint: this.d
            }), new it.asn1.DERInteger({
                bigint: this.p
            }), new it.asn1.DERInteger({
                bigint: this.q
            }), new it.asn1.DERInteger({
                bigint: this.dmp1
            }), new it.asn1.DERInteger({
                bigint: this.dmq1
            }), new it.asn1.DERInteger({
                bigint: this.coeff
            })]
        };
        return new it.asn1.DERSequence(t).getEncodedHex()
    }
    ,
    e.prototype.getPrivateBaseKeyB64 = function() {
        return m(this.getPrivateBaseKey())
    }
    ,
    e.prototype.getPublicBaseKey = function() {
        var t = new it.asn1.DERSequence({
            array: [new it.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new it.asn1.DERNull]
        })
          , e = new it.asn1.DERSequence({
            array: [new it.asn1.DERInteger({
                bigint: this.n
            }), new it.asn1.DERInteger({
                int: this.e
            })]
        })
          , r = new it.asn1.DERBitString({
            hex: "00" + e.getEncodedHex()
        });
        return new it.asn1.DERSequence({
            array: [t, r]
        }).getEncodedHex()
    }
    ,
    e.prototype.getPublicBaseKeyB64 = function() {
        return m(this.getPublicBaseKey())
    }
    ,
    e.wordwrap = function(t, e) {
        if (!t)
            return t;
        var r = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
        return t.match(RegExp(r, "g")).join("\n")
    }
    ,
    e.prototype.getPrivateKey = function() {
        var t = "-----BEGIN RSA PRIVATE KEY-----\n";
        return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
        t += "-----END RSA PRIVATE KEY-----"
    }
    ,
    e.prototype.getPublicKey = function() {
        var t = "-----BEGIN PUBLIC KEY-----\n";
        return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
        t += "-----END PUBLIC KEY-----"
    }
    ,
    e.hasPublicKeyProperty = function(t) {
        return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
    }
    ,
    e.hasPrivateKeyProperty = function(t) {
        return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
    }
    ,
    e.prototype.parsePropertiesFrom = function(t) {
        this.n = t.n,
        this.e = t.e,
        t.hasOwnProperty("d") && (this.d = t.d,
        this.p = t.p,
        this.q = t.q,
        this.dmp1 = t.dmp1,
        this.dmq1 = t.dmq1,
        this.coeff = t.coeff)
    }
}(rt);
const st = t => /^1[3-9]\d{9}$/.test(t);
function ut(t) {
    let e = (new TextEncoder).encode(t)
      , r = [];
    for (let n of e)
        32 === n ? r.push("+") : n >= 48 && n <= 57 || n >= 65 && n <= 90 || n >= 97 && n <= 122 || 45 === n || 46 === n || 95 === n || 42 === n ? r.push(String.fromCharCode(n)) : r.push("%" + n.toString(16).toUpperCase().padStart(2, "0"));
    return r.join("")
}
var ct = {
    exports: {}
};
const pt = t(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: {}
}, Symbol.toStringTag, {
    value: "Module"
})));
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.8.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2023
 * @license MIT
 */
var ft;
ft = ct,
function() {
    var t = "input is invalid type"
      , r = "object" == typeof window
      , n = r ? window : {};
    n.JS_MD5_NO_WINDOW && (r = !1);
    var o = !r && "object" == typeof self
      , i = !n.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
    i ? n = e : o && (n = self);
    var a, s = !n.JS_MD5_NO_COMMON_JS && ft.exports, u = !n.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, c = "0123456789abcdef".split(""), p = [128, 32768, 8388608, -2147483648], f = [0, 8, 16, 24], l = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), h = [];
    if (u) {
        var d = new ArrayBuffer(68);
        a = new Uint8Array(d),
        h = new Uint32Array(d)
    }
    var g = Array.isArray;
    !n.JS_MD5_NO_NODE_JS && g || (g = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    );
    var m = ArrayBuffer.isView;
    !u || !n.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && m || (m = function(t) {
        return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
    }
    );
    var b = function(e) {
        var r = typeof e;
        if ("string" === r)
            return [e, !0];
        if ("object" !== r || null === e)
            throw new Error(t);
        if (u && e.constructor === ArrayBuffer)
            return [new Uint8Array(e), !1];
        if (!g(e) && !m(e))
            throw new Error(t);
        return [e, !1]
    }
      , v = function(t) {
        return function(e) {
            return new E(!0).update(e)[t]()
        }
    }
      , S = function(e) {
        var r, o = pt, i = pt.Buffer;
        return r = i.from && !n.JS_MD5_NO_BUFFER_FROM ? i.from : function(t) {
            return new i(t)
        }
        ,
        function(n) {
            if ("string" == typeof n)
                return o.createHash("md5").update(n, "utf8").digest("hex");
            if (null == n)
                throw new Error(t);
            return n.constructor === ArrayBuffer && (n = new Uint8Array(n)),
            g(n) || m(n) || n.constructor === i ? o.createHash("md5").update(r(n)).digest("hex") : e(n)
        }
    }
      , w = function(t) {
        return function(e, r) {
            return new A(e,!0).update(r)[t]()
        }
    };
    function E(t) {
        if (t)
            h[0] = h[16] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = 0,
            this.blocks = h,
            this.buffer8 = a;
        else if (u) {
            var e = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(e),
            this.blocks = new Uint32Array(e)
        } else
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0,
        this.finalized = this.hashed = !1,
        this.first = !0
    }
    function A(t, e) {
        var r, n = b(t);
        if (t = n[0],
        n[1]) {
            var o, i = [], a = t.length, s = 0;
            for (r = 0; r < a; ++r)
                (o = t.charCodeAt(r)) < 128 ? i[s++] = o : o < 2048 ? (i[s++] = 192 | o >>> 6,
                i[s++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (i[s++] = 224 | o >>> 12,
                i[s++] = 128 | o >>> 6 & 63,
                i[s++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(++r)),
                i[s++] = 240 | o >>> 18,
                i[s++] = 128 | o >>> 12 & 63,
                i[s++] = 128 | o >>> 6 & 63,
                i[s++] = 128 | 63 & o);
            t = i
        }
        t.length > 64 && (t = new E(!0).update(t).array());
        var u = []
          , c = [];
        for (r = 0; r < 64; ++r) {
            var p = t[r] || 0;
            u[r] = 92 ^ p,
            c[r] = 54 ^ p
        }
        E.call(this, e),
        this.update(c),
        this.oKeyPad = u,
        this.inner = !0,
        this.sharedMemory = e
    }
    E.prototype.update = function(t) {
        if (this.finalized)
            throw new Error("finalize already called");
        var e = b(t);
        t = e[0];
        for (var r, n, o = e[1], i = 0, a = t.length, s = this.blocks, c = this.buffer8; i < a; ) {
            if (this.hashed && (this.hashed = !1,
            s[0] = s[16],
            s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0),
            o)
                if (u)
                    for (n = this.start; i < a && n < 64; ++i)
                        (r = t.charCodeAt(i)) < 128 ? c[n++] = r : r < 2048 ? (c[n++] = 192 | r >>> 6,
                        c[n++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (c[n++] = 224 | r >>> 12,
                        c[n++] = 128 | r >>> 6 & 63,
                        c[n++] = 128 | 63 & r) : (r = 65536 + ((1023 & r) << 10 | 1023 & t.charCodeAt(++i)),
                        c[n++] = 240 | r >>> 18,
                        c[n++] = 128 | r >>> 12 & 63,
                        c[n++] = 128 | r >>> 6 & 63,
                        c[n++] = 128 | 63 & r);
                else
                    for (n = this.start; i < a && n < 64; ++i)
                        (r = t.charCodeAt(i)) < 128 ? s[n >>> 2] |= r << f[3 & n++] : r < 2048 ? (s[n >>> 2] |= (192 | r >>> 6) << f[3 & n++],
                        s[n >>> 2] |= (128 | 63 & r) << f[3 & n++]) : r < 55296 || r >= 57344 ? (s[n >>> 2] |= (224 | r >>> 12) << f[3 & n++],
                        s[n >>> 2] |= (128 | r >>> 6 & 63) << f[3 & n++],
                        s[n >>> 2] |= (128 | 63 & r) << f[3 & n++]) : (r = 65536 + ((1023 & r) << 10 | 1023 & t.charCodeAt(++i)),
                        s[n >>> 2] |= (240 | r >>> 18) << f[3 & n++],
                        s[n >>> 2] |= (128 | r >>> 12 & 63) << f[3 & n++],
                        s[n >>> 2] |= (128 | r >>> 6 & 63) << f[3 & n++],
                        s[n >>> 2] |= (128 | 63 & r) << f[3 & n++]);
            else if (u)
                for (n = this.start; i < a && n < 64; ++i)
                    c[n++] = t[i];
            else
                for (n = this.start; i < a && n < 64; ++i)
                    s[n >>> 2] |= t[i] << f[3 & n++];
            this.lastByteIndex = n,
            this.bytes += n - this.start,
            n >= 64 ? (this.start = n - 64,
            this.hash(),
            this.hashed = !0) : this.start = n
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 | 0,
        this.bytes = this.bytes % 4294967296),
        this
    }
    ,
    E.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks
              , e = this.lastByteIndex;
            t[e >>> 2] |= p[3 & e],
            e >= 56 && (this.hashed || this.hash(),
            t[0] = t[16],
            t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0),
            t[14] = this.bytes << 3,
            t[15] = this.hBytes << 3 | this.bytes >>> 29,
            this.hash()
        }
    }
    ,
    E.prototype.hash = function() {
        var t, e, r, n, o, i, a = this.blocks;
        this.first ? e = ((e = ((t = ((t = a[0] - 680876937) << 7 | t >>> 25) - 271733879 | 0) ^ (r = ((r = (-271733879 ^ (n = ((n = (-1732584194 ^ 2004318071 & t) + a[1] - 117830708) << 12 | n >>> 20) + t | 0) & (-271733879 ^ t)) + a[2] - 1126478375) << 17 | r >>> 15) + n | 0) & (n ^ t)) + a[3] - 1316259209) << 22 | e >>> 10) + r | 0 : (t = this.h0,
        e = this.h1,
        r = this.h2,
        e = ((e += ((t = ((t += ((n = this.h3) ^ e & (r ^ n)) + a[0] - 680876936) << 7 | t >>> 25) + e | 0) ^ (r = ((r += (e ^ (n = ((n += (r ^ t & (e ^ r)) + a[1] - 389564586) << 12 | n >>> 20) + t | 0) & (t ^ e)) + a[2] + 606105819) << 17 | r >>> 15) + n | 0) & (n ^ t)) + a[3] - 1044525330) << 22 | e >>> 10) + r | 0),
        e = ((e += ((t = ((t += (n ^ e & (r ^ n)) + a[4] - 176418897) << 7 | t >>> 25) + e | 0) ^ (r = ((r += (e ^ (n = ((n += (r ^ t & (e ^ r)) + a[5] + 1200080426) << 12 | n >>> 20) + t | 0) & (t ^ e)) + a[6] - 1473231341) << 17 | r >>> 15) + n | 0) & (n ^ t)) + a[7] - 45705983) << 22 | e >>> 10) + r | 0,
        e = ((e += ((t = ((t += (n ^ e & (r ^ n)) + a[8] + 1770035416) << 7 | t >>> 25) + e | 0) ^ (r = ((r += (e ^ (n = ((n += (r ^ t & (e ^ r)) + a[9] - 1958414417) << 12 | n >>> 20) + t | 0) & (t ^ e)) + a[10] - 42063) << 17 | r >>> 15) + n | 0) & (n ^ t)) + a[11] - 1990404162) << 22 | e >>> 10) + r | 0,
        e = ((e += ((t = ((t += (n ^ e & (r ^ n)) + a[12] + 1804603682) << 7 | t >>> 25) + e | 0) ^ (r = ((r += (e ^ (n = ((n += (r ^ t & (e ^ r)) + a[13] - 40341101) << 12 | n >>> 20) + t | 0) & (t ^ e)) + a[14] - 1502002290) << 17 | r >>> 15) + n | 0) & (n ^ t)) + a[15] + 1236535329) << 22 | e >>> 10) + r | 0,
        e = ((e += ((n = ((n += (e ^ r & ((t = ((t += (r ^ n & (e ^ r)) + a[1] - 165796510) << 5 | t >>> 27) + e | 0) ^ e)) + a[6] - 1069501632) << 9 | n >>> 23) + t | 0) ^ t & ((r = ((r += (t ^ e & (n ^ t)) + a[11] + 643717713) << 14 | r >>> 18) + n | 0) ^ n)) + a[0] - 373897302) << 20 | e >>> 12) + r | 0,
        e = ((e += ((n = ((n += (e ^ r & ((t = ((t += (r ^ n & (e ^ r)) + a[5] - 701558691) << 5 | t >>> 27) + e | 0) ^ e)) + a[10] + 38016083) << 9 | n >>> 23) + t | 0) ^ t & ((r = ((r += (t ^ e & (n ^ t)) + a[15] - 660478335) << 14 | r >>> 18) + n | 0) ^ n)) + a[4] - 405537848) << 20 | e >>> 12) + r | 0,
        e = ((e += ((n = ((n += (e ^ r & ((t = ((t += (r ^ n & (e ^ r)) + a[9] + 568446438) << 5 | t >>> 27) + e | 0) ^ e)) + a[14] - 1019803690) << 9 | n >>> 23) + t | 0) ^ t & ((r = ((r += (t ^ e & (n ^ t)) + a[3] - 187363961) << 14 | r >>> 18) + n | 0) ^ n)) + a[8] + 1163531501) << 20 | e >>> 12) + r | 0,
        e = ((e += ((n = ((n += (e ^ r & ((t = ((t += (r ^ n & (e ^ r)) + a[13] - 1444681467) << 5 | t >>> 27) + e | 0) ^ e)) + a[2] - 51403784) << 9 | n >>> 23) + t | 0) ^ t & ((r = ((r += (t ^ e & (n ^ t)) + a[7] + 1735328473) << 14 | r >>> 18) + n | 0) ^ n)) + a[12] - 1926607734) << 20 | e >>> 12) + r | 0,
        e = ((e += ((i = (n = ((n += ((o = e ^ r) ^ (t = ((t += (o ^ n) + a[5] - 378558) << 4 | t >>> 28) + e | 0)) + a[8] - 2022574463) << 11 | n >>> 21) + t | 0) ^ t) ^ (r = ((r += (i ^ e) + a[11] + 1839030562) << 16 | r >>> 16) + n | 0)) + a[14] - 35309556) << 23 | e >>> 9) + r | 0,
        e = ((e += ((i = (n = ((n += ((o = e ^ r) ^ (t = ((t += (o ^ n) + a[1] - 1530992060) << 4 | t >>> 28) + e | 0)) + a[4] + 1272893353) << 11 | n >>> 21) + t | 0) ^ t) ^ (r = ((r += (i ^ e) + a[7] - 155497632) << 16 | r >>> 16) + n | 0)) + a[10] - 1094730640) << 23 | e >>> 9) + r | 0,
        e = ((e += ((i = (n = ((n += ((o = e ^ r) ^ (t = ((t += (o ^ n) + a[13] + 681279174) << 4 | t >>> 28) + e | 0)) + a[0] - 358537222) << 11 | n >>> 21) + t | 0) ^ t) ^ (r = ((r += (i ^ e) + a[3] - 722521979) << 16 | r >>> 16) + n | 0)) + a[6] + 76029189) << 23 | e >>> 9) + r | 0,
        e = ((e += ((i = (n = ((n += ((o = e ^ r) ^ (t = ((t += (o ^ n) + a[9] - 640364487) << 4 | t >>> 28) + e | 0)) + a[12] - 421815835) << 11 | n >>> 21) + t | 0) ^ t) ^ (r = ((r += (i ^ e) + a[15] + 530742520) << 16 | r >>> 16) + n | 0)) + a[2] - 995338651) << 23 | e >>> 9) + r | 0,
        e = ((e += ((n = ((n += (e ^ ((t = ((t += (r ^ (e | ~n)) + a[0] - 198630844) << 6 | t >>> 26) + e | 0) | ~r)) + a[7] + 1126891415) << 10 | n >>> 22) + t | 0) ^ ((r = ((r += (t ^ (n | ~e)) + a[14] - 1416354905) << 15 | r >>> 17) + n | 0) | ~t)) + a[5] - 57434055) << 21 | e >>> 11) + r | 0,
        e = ((e += ((n = ((n += (e ^ ((t = ((t += (r ^ (e | ~n)) + a[12] + 1700485571) << 6 | t >>> 26) + e | 0) | ~r)) + a[3] - 1894986606) << 10 | n >>> 22) + t | 0) ^ ((r = ((r += (t ^ (n | ~e)) + a[10] - 1051523) << 15 | r >>> 17) + n | 0) | ~t)) + a[1] - 2054922799) << 21 | e >>> 11) + r | 0,
        e = ((e += ((n = ((n += (e ^ ((t = ((t += (r ^ (e | ~n)) + a[8] + 1873313359) << 6 | t >>> 26) + e | 0) | ~r)) + a[15] - 30611744) << 10 | n >>> 22) + t | 0) ^ ((r = ((r += (t ^ (n | ~e)) + a[6] - 1560198380) << 15 | r >>> 17) + n | 0) | ~t)) + a[13] + 1309151649) << 21 | e >>> 11) + r | 0,
        e = ((e += ((n = ((n += (e ^ ((t = ((t += (r ^ (e | ~n)) + a[4] - 145523070) << 6 | t >>> 26) + e | 0) | ~r)) + a[11] - 1120210379) << 10 | n >>> 22) + t | 0) ^ ((r = ((r += (t ^ (n | ~e)) + a[2] + 718787259) << 15 | r >>> 17) + n | 0) | ~t)) + a[9] - 343485551) << 21 | e >>> 11) + r | 0,
        this.first ? (this.h0 = t + 1732584193 | 0,
        this.h1 = e - 271733879 | 0,
        this.h2 = r - 1732584194 | 0,
        this.h3 = n + 271733878 | 0,
        this.first = !1) : (this.h0 = this.h0 + t | 0,
        this.h1 = this.h1 + e | 0,
        this.h2 = this.h2 + r | 0,
        this.h3 = this.h3 + n | 0)
    }
    ,
    E.prototype.hex = function() {
        this.finalize();
        var t = this.h0
          , e = this.h1
          , r = this.h2
          , n = this.h3;
        return c[t >>> 4 & 15] + c[15 & t] + c[t >>> 12 & 15] + c[t >>> 8 & 15] + c[t >>> 20 & 15] + c[t >>> 16 & 15] + c[t >>> 28 & 15] + c[t >>> 24 & 15] + c[e >>> 4 & 15] + c[15 & e] + c[e >>> 12 & 15] + c[e >>> 8 & 15] + c[e >>> 20 & 15] + c[e >>> 16 & 15] + c[e >>> 28 & 15] + c[e >>> 24 & 15] + c[r >>> 4 & 15] + c[15 & r] + c[r >>> 12 & 15] + c[r >>> 8 & 15] + c[r >>> 20 & 15] + c[r >>> 16 & 15] + c[r >>> 28 & 15] + c[r >>> 24 & 15] + c[n >>> 4 & 15] + c[15 & n] + c[n >>> 12 & 15] + c[n >>> 8 & 15] + c[n >>> 20 & 15] + c[n >>> 16 & 15] + c[n >>> 28 & 15] + c[n >>> 24 & 15]
    }
    ,
    E.prototype.toString = E.prototype.hex,
    E.prototype.digest = function() {
        this.finalize();
        var t = this.h0
          , e = this.h1
          , r = this.h2
          , n = this.h3;
        return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255, 255 & r, r >>> 8 & 255, r >>> 16 & 255, r >>> 24 & 255, 255 & n, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255]
    }
    ,
    E.prototype.array = E.prototype.digest,
    E.prototype.arrayBuffer = function() {
        this.finalize();
        var t = new ArrayBuffer(16)
          , e = new Uint32Array(t);
        return e[0] = this.h0,
        e[1] = this.h1,
        e[2] = this.h2,
        e[3] = this.h3,
        t
    }
    ,
    E.prototype.buffer = E.prototype.arrayBuffer,
    E.prototype.base64 = function() {
        for (var t, e, r, n = "", o = this.array(), i = 0; i < 15; )
            t = o[i++],
            e = o[i++],
            r = o[i++],
            n += y[t >>> 2] + y[63 & (t << 4 | e >>> 4)] + y[63 & (e << 2 | r >>> 6)] + y[63 & r];
        return t = o[i],
        n += y[t >>> 2] + y[t << 4 & 63] + "=="
    }
    ,
    A.prototype = new E,
    A.prototype.finalize = function() {
        if (E.prototype.finalize.call(this),
        this.inner) {
            this.inner = !1;
            var t = this.array();
            E.call(this, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(t),
            E.prototype.finalize.call(this)
        }
    }
    ;
    var O = function() {
        var t = v("hex");
        i && (t = S(t)),
        t.create = function() {
            return new E
        }
        ,
        t.update = function(e) {
            return t.create().update(e)
        }
        ;
        for (var e = 0; e < l.length; ++e) {
            var r = l[e];
            t[r] = v(r)
        }
        return t
    }();
    O.md5 = O,
    O.md5.hmac = function() {
        var t = w("hex");
        t.create = function(t) {
            return new A(t)
        }
        ,
        t.update = function(e, r) {
            return t.create(e).update(r)
        }
        ;
        for (var e = 0; e < l.length; ++e) {
            var r = l[e];
            t[r] = w(r)
        }
        return t
    }(),
    s ? ft.exports = O : n.md5 = O
}();
const lt = r(ct.exports);
var yt = TypeError
  , ht = "function" == typeof Map && Map.prototype
  , dt = Object.getOwnPropertyDescriptor && ht ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null
  , gt = ht && dt && "function" == typeof dt.get ? dt.get : null
  , mt = ht && Map.prototype.forEach
  , bt = "function" == typeof Set && Set.prototype
  , vt = Object.getOwnPropertyDescriptor && bt ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null
  , St = bt && vt && "function" == typeof vt.get ? vt.get : null
  , wt = bt && Set.prototype.forEach
  , Et = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null
  , At = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null
  , Ot = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null
  , Tt = Boolean.prototype.valueOf
  , jt = Object.prototype.toString
  , Pt = Function.prototype.toString
  , It = String.prototype.match
  , xt = String.prototype.slice
  , Rt = String.prototype.replace
  , Dt = String.prototype.toUpperCase
  , _t = String.prototype.toLowerCase
  , Bt = RegExp.prototype.test
  , Nt = Array.prototype.concat
  , Mt = Array.prototype.join
  , Ft = Array.prototype.slice
  , Vt = Math.floor
  , Ut = "function" == typeof BigInt ? BigInt.prototype.valueOf : null
  , kt = Object.getOwnPropertySymbols
  , Ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null
  , Lt = "function" == typeof Symbol && "object" == typeof Symbol.iterator
  , qt = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === Lt || "symbol") ? Symbol.toStringTag : null
  , Wt = Object.prototype.propertyIsEnumerable
  , Ht = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
    return t.__proto__
}
: null);
function $t(t, e) {
    if (t === 1 / 0 || t === -1 / 0 || t != t || t && t > -1e3 && t < 1e3 || Bt.call(/e/, e))
        return e;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if ("number" == typeof t) {
        var n = t < 0 ? -Vt(-t) : Vt(t);
        if (n !== t) {
            var o = String(n)
              , i = xt.call(e, o.length + 1);
            return Rt.call(o, r, "$&_") + "." + Rt.call(Rt.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
        }
    }
    return Rt.call(e, r, "$&_")
}
var Gt = pt
  , zt = Gt.custom
  , Kt = ee(zt) ? zt : null
  , Jt = {
    __proto__: null,
    double: '"',
    single: "'"
}
  , Zt = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
};
function Qt(t, e, r) {
    var n = r.quoteStyle || e
      , o = Jt[n];
    return o + t + o
}
function Yt(t) {
    return Rt.call(String(t), /"/g, "&quot;")
}
function Xt(t) {
    return !("[object Array]" !== oe(t) || qt && "object" == typeof t && qt in t)
}
function te(t) {
    return !("[object RegExp]" !== oe(t) || qt && "object" == typeof t && qt in t)
}
function ee(t) {
    if (Lt)
        return t && "object" == typeof t && t instanceof Symbol;
    if ("symbol" == typeof t)
        return !0;
    if (!t || "object" != typeof t || !Ct)
        return !1;
    try {
        return Ct.call(t),
        !0
    } catch (e) {}
    return !1
}
var re = Object.prototype.hasOwnProperty || function(t) {
    return t in this
}
;
function ne(t, e) {
    return re.call(t, e)
}
function oe(t) {
    return jt.call(t)
}
function ie(t, e) {
    if (t.indexOf)
        return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
        if (t[r] === e)
            return r;
    return -1
}
function ae(t, e) {
    if (t.length > e.maxStringLength) {
        var r = t.length - e.maxStringLength
          , n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return ae(xt.call(t, 0, e.maxStringLength), e) + n
    }
    var o = Zt[e.quoteStyle || "single"];
    return o.lastIndex = 0,
    Qt(Rt.call(Rt.call(t, o, "\\$1"), /[\x00-\x1f]/g, se), "single", e)
}
function se(t) {
    var e = t.charCodeAt(0)
      , r = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
    }[e];
    return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Dt.call(e.toString(16))
}
function ue(t) {
    return "Object(" + t + ")"
}
function ce(t) {
    return t + " { ? }"
}
function pe(t, e, r, n) {
    return t + " (" + e + ") {" + (n ? fe(r, n) : Mt.call(r, ", ")) + "}"
}
function fe(t, e) {
    if (0 === t.length)
        return "";
    var r = "\n" + e.prev + e.base;
    return r + Mt.call(t, "," + r) + "\n" + e.prev
}
function le(t, e) {
    var r = Xt(t)
      , n = [];
    if (r) {
        n.length = t.length;
        for (var o = 0; o < t.length; o++)
            n[o] = ne(t, o) ? e(t[o], t) : ""
    }
    var i, a = "function" == typeof kt ? kt(t) : [];
    if (Lt) {
        i = {};
        for (var s = 0; s < a.length; s++)
            i["$" + a[s]] = a[s]
    }
    for (var u in t)
        ne(t, u) && (r && String(Number(u)) === u && u < t.length || Lt && i["$" + u]instanceof Symbol || (Bt.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
    if ("function" == typeof kt)
        for (var c = 0; c < a.length; c++)
            Wt.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
    return n
}
var ye = "function" == typeof Map && Map.prototype
  , he = Object.getOwnPropertyDescriptor && ye ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null
  , de = ye && he && "function" == typeof he.get ? he.get : null
  , ge = ye && Map.prototype.forEach
  , me = "function" == typeof Set && Set.prototype
  , be = Object.getOwnPropertyDescriptor && me ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null
  , ve = me && be && "function" == typeof be.get ? be.get : null
  , Se = me && Set.prototype.forEach
  , we = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null
  , Ee = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null
  , Ae = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null
  , Oe = Boolean.prototype.valueOf
  , Te = Object.prototype.toString
  , je = Function.prototype.toString
  , Pe = String.prototype.match
  , Ie = String.prototype.slice
  , xe = String.prototype.replace
  , Re = String.prototype.toUpperCase
  , De = String.prototype.toLowerCase
  , _e = RegExp.prototype.test
  , Be = Array.prototype.concat
  , Ne = Array.prototype.join
  , Me = Array.prototype.slice
  , Fe = Math.floor
  , Ve = "function" == typeof BigInt ? BigInt.prototype.valueOf : null
  , Ue = Object.getOwnPropertySymbols
  , ke = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null
  , Ce = "function" == typeof Symbol && "object" == typeof Symbol.iterator
  , Le = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === Ce || "symbol") ? Symbol.toStringTag : null
  , qe = Object.prototype.propertyIsEnumerable
  , We = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
    return t.__proto__
}
: null);
function He(t, e) {
    if (t === 1 / 0 || t === -1 / 0 || t != t || t && t > -1e3 && t < 1e3 || _e.call(/e/, e))
        return e;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if ("number" == typeof t) {
        var n = t < 0 ? -Fe(-t) : Fe(t);
        if (n !== t) {
            var o = String(n)
              , i = Ie.call(e, o.length + 1);
            return xe.call(o, r, "$&_") + "." + xe.call(xe.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
        }
    }
    return xe.call(e, r, "$&_")
}
var $e = pt
  , Ge = $e.custom
  , ze = tr(Ge) ? Ge : null
  , Ke = {
    __proto__: null,
    double: '"',
    single: "'"
}
  , Je = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
};
function Ze(t, e, r) {
    var n = r.quoteStyle || e
      , o = Ke[n];
    return o + t + o
}
function Qe(t) {
    return xe.call(String(t), /"/g, "&quot;")
}
function Ye(t) {
    return !("[object Array]" !== nr(t) || Le && "object" == typeof t && Le in t)
}
function Xe(t) {
    return !("[object RegExp]" !== nr(t) || Le && "object" == typeof t && Le in t)
}
function tr(t) {
    if (Ce)
        return t && "object" == typeof t && t instanceof Symbol;
    if ("symbol" == typeof t)
        return !0;
    if (!t || "object" != typeof t || !ke)
        return !1;
    try {
        return ke.call(t),
        !0
    } catch (e) {}
    return !1
}
var er = Object.prototype.hasOwnProperty || function(t) {
    return t in this
}
;
function rr(t, e) {
    return er.call(t, e)
}
function nr(t) {
    return Te.call(t)
}
function or(t, e) {
    if (t.indexOf)
        return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
        if (t[r] === e)
            return r;
    return -1
}
function ir(t, e) {
    if (t.length > e.maxStringLength) {
        var r = t.length - e.maxStringLength
          , n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return ir(Ie.call(t, 0, e.maxStringLength), e) + n
    }
    var o = Je[e.quoteStyle || "single"];
    return o.lastIndex = 0,
    Ze(xe.call(xe.call(t, o, "\\$1"), /[\x00-\x1f]/g, ar), "single", e)
}
function ar(t) {
    var e = t.charCodeAt(0)
      , r = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
    }[e];
    return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Re.call(e.toString(16))
}
function sr(t) {
    return "Object(" + t + ")"
}
function ur(t) {
    return t + " { ? }"
}
function cr(t, e, r, n) {
    return t + " (" + e + ") {" + (n ? pr(r, n) : Ne.call(r, ", ")) + "}"
}
function pr(t, e) {
    if (0 === t.length)
        return "";
    var r = "\n" + e.prev + e.base;
    return r + Ne.call(t, "," + r) + "\n" + e.prev
}
function fr(t, e) {
    var r = Ye(t)
      , n = [];
    if (r) {
        n.length = t.length;
        for (var o = 0; o < t.length; o++)
            n[o] = rr(t, o) ? e(t[o], t) : ""
    }
    var i, a = "function" == typeof Ue ? Ue(t) : [];
    if (Ce) {
        i = {};
        for (var s = 0; s < a.length; s++)
            i["$" + a[s]] = a[s]
    }
    for (var u in t)
        rr(t, u) && (r && String(Number(u)) === u && u < t.length || Ce && i["$" + u]instanceof Symbol || (_e.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
    if ("function" == typeof Ue)
        for (var c = 0; c < a.length; c++)
            qe.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
    return n
}
var lr = TypeError
  , yr = function t(r, n, o, i) {
    var a = n || {};
    if (rr(a, "quoteStyle") && !rr(Ke, a.quoteStyle))
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (rr(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var s = !rr(a, "customInspect") || a.customInspect;
    if ("boolean" != typeof s && "symbol" !== s)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (rr(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (rr(a, "numericSeparator") && "boolean" != typeof a.numericSeparator)
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var u = a.numericSeparator;
    if (void 0 === r)
        return "undefined";
    if (null === r)
        return "null";
    if ("boolean" == typeof r)
        return r ? "true" : "false";
    if ("string" == typeof r)
        return ir(r, a);
    if ("number" == typeof r) {
        if (0 === r)
            return 1 / 0 / r > 0 ? "0" : "-0";
        var c = String(r);
        return u ? He(r, c) : c
    }
    if ("bigint" == typeof r) {
        var p = String(r) + "n";
        return u ? He(r, p) : p
    }
    var f = void 0 === a.depth ? 5 : a.depth;
    if (void 0 === o && (o = 0),
    o >= f && f > 0 && "object" == typeof r)
        return Ye(r) ? "[Array]" : "[Object]";
    var l = function(t, e) {
        var r;
        if ("\t" === t.indent)
            r = "\t";
        else {
            if (!("number" == typeof t.indent && t.indent > 0))
                return null;
            r = Ne.call(Array(t.indent + 1), " ")
        }
        return {
            base: r,
            prev: Ne.call(Array(e + 1), r)
        }
    }(a, o);
    if (void 0 === i)
        i = [];
    else if (or(i, r) >= 0)
        return "[Circular]";
    function y(e, r, n) {
        if (r && (i = Me.call(i)).push(r),
        n) {
            var s = {
                depth: a.depth
            };
            return rr(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle),
            t(e, s, o + 1, i)
        }
        return t(e, a, o + 1, i)
    }
    if ("function" == typeof r && !Xe(r)) {
        var h = function(t) {
            if (t.name)
                return t.name;
            var e = Pe.call(je.call(t), /^function\s*([\w$]+)/);
            if (e)
                return e[1];
            return null
        }(r)
          , d = fr(r, y);
        return "[Function" + (h ? ": " + h : " (anonymous)") + "]" + (d.length > 0 ? " { " + Ne.call(d, ", ") + " }" : "")
    }
    if (tr(r)) {
        var g = Ce ? xe.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : ke.call(r);
        return "object" != typeof r || Ce ? g : sr(g)
    }
    if (function(t) {
        if (!t || "object" != typeof t)
            return !1;
        if ("undefined" != typeof HTMLElement && t instanceof HTMLElement)
            return !0;
        return "string" == typeof t.nodeName && "function" == typeof t.getAttribute
    }(r)) {
        for (var m = "<" + De.call(String(r.nodeName)), b = r.attributes || [], v = 0; v < b.length; v++)
            m += " " + b[v].name + "=" + Ze(Qe(b[v].value), "double", a);
        return m += ">",
        r.childNodes && r.childNodes.length && (m += "..."),
        m += "</" + De.call(String(r.nodeName)) + ">"
    }
    if (Ye(r)) {
        if (0 === r.length)
            return "[]";
        var S = fr(r, y);
        return l && !function(t) {
            for (var e = 0; e < t.length; e++)
                if (or(t[e], "\n") >= 0)
                    return !1;
            return !0
        }(S) ? "[" + pr(S, l) + "]" : "[ " + Ne.call(S, ", ") + " ]"
    }
    if (function(t) {
        return !("[object Error]" !== nr(t) || Le && "object" == typeof t && Le in t)
    }(r)) {
        var w = fr(r, y);
        return "cause"in Error.prototype || !("cause"in r) || qe.call(r, "cause") ? 0 === w.length ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + Ne.call(w, ", ") + " }" : "{ [" + String(r) + "] " + Ne.call(Be.call("[cause]: " + y(r.cause), w), ", ") + " }"
    }
    if ("object" == typeof r && s) {
        if (ze && "function" == typeof r[ze] && $e)
            return $e(r, {
                depth: f - o
            });
        if ("symbol" !== s && "function" == typeof r.inspect)
            return r.inspect()
    }
    if (function(t) {
        if (!de || !t || "object" != typeof t)
            return !1;
        try {
            de.call(t);
            try {
                ve.call(t)
            } catch (m) {
                return !0
            }
            return t instanceof Map
        } catch (e) {}
        return !1
    }(r)) {
        var E = [];
        return ge && ge.call(r, (function(t, e) {
            E.push(y(e, r, !0) + " => " + y(t, r))
        }
        )),
        cr("Map", de.call(r), E, l)
    }
    if (function(t) {
        if (!ve || !t || "object" != typeof t)
            return !1;
        try {
            ve.call(t);
            try {
                de.call(t)
            } catch (e) {
                return !0
            }
            return t instanceof Set
        } catch (r) {}
        return !1
    }(r)) {
        var A = [];
        return Se && Se.call(r, (function(t) {
            A.push(y(t, r))
        }
        )),
        cr("Set", ve.call(r), A, l)
    }
    if (function(t) {
        if (!we || !t || "object" != typeof t)
            return !1;
        try {
            we.call(t, we);
            try {
                Ee.call(t, Ee)
            } catch (m) {
                return !0
            }
            return t instanceof WeakMap
        } catch (e) {}
        return !1
    }(r))
        return ur("WeakMap");
    if (function(t) {
        if (!Ee || !t || "object" != typeof t)
            return !1;
        try {
            Ee.call(t, Ee);
            try {
                we.call(t, we)
            } catch (m) {
                return !0
            }
            return t instanceof WeakSet
        } catch (e) {}
        return !1
    }(r))
        return ur("WeakSet");
    if (function(t) {
        if (!Ae || !t || "object" != typeof t)
            return !1;
        try {
            return Ae.call(t),
            !0
        } catch (e) {}
        return !1
    }(r))
        return ur("WeakRef");
    if (function(t) {
        return !("[object Number]" !== nr(t) || Le && "object" == typeof t && Le in t)
    }(r))
        return sr(y(Number(r)));
    if (function(t) {
        if (!t || "object" != typeof t || !Ve)
            return !1;
        try {
            return Ve.call(t),
            !0
        } catch (e) {}
        return !1
    }(r))
        return sr(y(Ve.call(r)));
    if (function(t) {
        return !("[object Boolean]" !== nr(t) || Le && "object" == typeof t && Le in t)
    }(r))
        return sr(Oe.call(r));
    if (function(t) {
        return !("[object String]" !== nr(t) || Le && "object" == typeof t && Le in t)
    }(r))
        return sr(y(String(r)));
    if ("undefined" != typeof window && r === window)
        return "{ [object Window] }";
    if ("undefined" != typeof globalThis && r === globalThis || void 0 !== e && r === e)
        return "{ [object globalThis] }";
    if (!function(t) {
        return !("[object Date]" !== nr(t) || Le && "object" == typeof t && Le in t)
    }(r) && !Xe(r)) {
        var O = fr(r, y)
          , T = We ? We(r) === Object.prototype : r instanceof Object || r.constructor === Object
          , j = r instanceof Object ? "" : "null prototype"
          , P = !T && Le && Object(r) === r && Le in r ? Ie.call(nr(r), 8, -1) : j ? "Object" : ""
          , I = (T || "function" != typeof r.constructor ? "" : r.constructor.name ? r.constructor.name + " " : "") + (P || j ? "[" + Ne.call(Be.call([], P || [], j || []), ": ") + "] " : "");
        return 0 === O.length ? I + "{}" : l ? I + "{" + pr(O, l) + "}" : I + "{ " + Ne.call(O, ", ") + " }"
    }
    return String(r)
}
  , hr = lr
  , dr = function(t, e, r) {
    for (var n, o = t; null != (n = o.next); o = n)
        if (n.key === e)
            return o.next = n.next,
            r || (n.next = t.next,
            t.next = n),
            n
}
  , gr = Object
  , mr = Error
  , br = EvalError
  , vr = RangeError
  , Sr = ReferenceError
  , wr = SyntaxError
  , Er = TypeError
  , Ar = URIError
  , Or = Math.abs
  , Tr = Math.floor
  , jr = Math.max
  , Pr = Math.min
  , Ir = Math.pow
  , xr = Math.round
  , Rr = Number.isNaN || function(t) {
    return t != t
}
  , Dr = function(t) {
    return Rr(t) || 0 === t ? t : t < 0 ? -1 : 1
}
  , _r = Object.getOwnPropertyDescriptor;
if (_r)
    try {
        _r([], "length")
    } catch (np) {
        _r = null
    }
var Br = _r
  , Nr = Object.defineProperty || !1;
if (Nr)
    try {
        Nr({}, "a", {
            value: 1
        })
    } catch (np) {
        Nr = !1
    }
var Mr, Fr, Vr, Ur, kr, Cr, Lr, qr, Wr = Nr;
function Hr() {
    return Cr ? kr : (Cr = 1,
    kr = "undefined" != typeof Reflect && Reflect.getPrototypeOf || null)
}
function $r() {
    return qr ? Lr : (qr = 1,
    Lr = gr.getPrototypeOf || null)
}
var Gr, zr, Kr, Jr, Zr = Object.prototype.toString, Qr = Math.max, Yr = function(t, e) {
    for (var r = [], n = 0; n < t.length; n += 1)
        r[n] = t[n];
    for (var o = 0; o < e.length; o += 1)
        r[o + t.length] = e[o];
    return r
}, Xr = function(t) {
    var e = this;
    if ("function" != typeof e || "[object Function]" !== Zr.apply(e))
        throw new TypeError("Function.prototype.bind called on incompatible " + e);
    for (var r, n = function(t, e) {
        for (var r = [], n = e, o = 0; n < t.length; n += 1,
        o += 1)
            r[o] = t[n];
        return r
    }(arguments, 1), o = Qr(0, e.length - n.length), i = [], a = 0; a < o; a++)
        i[a] = "$" + a;
    if (r = Function("binder", "return function (" + function(t, e) {
        for (var r = "", n = 0; n < t.length; n += 1)
            r += t[n],
            n + 1 < t.length && (r += e);
        return r
    }(i, ",") + "){ return binder.apply(this,arguments); }")((function() {
        if (this instanceof r) {
            var o = e.apply(this, Yr(n, arguments));
            return Object(o) === o ? o : this
        }
        return e.apply(t, Yr(n, arguments))
    }
    )),
    e.prototype) {
        var s = function() {};
        s.prototype = e.prototype,
        r.prototype = new s,
        s.prototype = null
    }
    return r
}, tn = Function.prototype.bind || Xr, en = TypeError;
function rn() {
    return zr ? Gr : (zr = 1,
    Gr = Function.prototype.call)
}
function nn() {
    return Jr ? Kr : (Jr = 1,
    Kr = Function.prototype.apply)
}
var on, an, sn, un, cn, pn, fn, ln, yn, hn, dn, gn, mn, bn, vn, Sn = "undefined" != typeof Reflect && Reflect && Reflect.apply, wn = tn, En = nn(), An = rn(), On = Sn || wn.call(An, En), Tn = tn, jn = en, Pn = rn(), In = On, xn = function(t) {
    if (t.length < 1 || "function" != typeof t[0])
        throw new jn("a function is required");
    return In(Tn, Pn, t)
};
function Rn() {
    if (un)
        return sn;
    un = 1;
    var t = an ? on : (an = 1,
    on = Object.getOwnPropertyDescriptor);
    if (t)
        try {
            t([], "length")
        } catch (np) {
            t = null
        }
    return sn = t
}
function Dn() {
    if (ln)
        return fn;
    ln = 1;
    var t = Hr()
      , e = $r()
      , r = function() {
        if (pn)
            return cn;
        pn = 1;
        var t, e = xn, r = Rn();
        try {
            t = [].__proto__ === Array.prototype
        } catch (np) {
            if (!np || "object" != typeof np || !("code"in np) || "ERR_PROTO_ACCESS" !== np.code)
                throw np
        }
        var n = !!t && r && r(Object.prototype, "__proto__")
          , o = Object
          , i = o.getPrototypeOf;
        return cn = n && "function" == typeof n.get ? e([n.get]) : "function" == typeof i && function(t) {
            return i(null == t ? t : o(t))
        }
    }();
    return fn = t ? function(e) {
        return t(e)
    }
    : e ? function(t) {
        if (!t || "object" != typeof t && "function" != typeof t)
            throw new TypeError("getProto: not an object");
        return e(t)
    }
    : r ? function(t) {
        return r(t)
    }
    : null
}
function _n() {
    if (gn)
        return dn;
    gn = 1;
    var t = function() {
        if (hn)
            return yn;
        hn = 1;
        var t = Object.prototype.toString
          , e = Math.max
          , r = function(t, e) {
            for (var r = [], n = 0; n < t.length; n += 1)
                r[n] = t[n];
            for (var o = 0; o < e.length; o += 1)
                r[o + t.length] = e[o];
            return r
        };
        return yn = function(n) {
            var o = this;
            if ("function" != typeof o || "[object Function]" !== t.apply(o))
                throw new TypeError("Function.prototype.bind called on incompatible " + o);
            for (var i, a = function(t) {
                for (var e = [], r = 1, n = 0; r < t.length; r += 1,
                n += 1)
                    e[n] = t[r];
                return e
            }(arguments), s = e(0, o.length - a.length), u = [], c = 0; c < s; c++)
                u[c] = "$" + c;
            if (i = Function("binder", "return function (" + function(t, e) {
                for (var r = "", n = 0; n < t.length; n += 1)
                    r += t[n],
                    n + 1 < t.length && (r += e);
                return r
            }(u, ",") + "){ return binder.apply(this,arguments); }")((function() {
                if (this instanceof i) {
                    var t = o.apply(this, r(a, arguments));
                    return Object(t) === t ? t : this
                }
                return o.apply(n, r(a, arguments))
            }
            )),
            o.prototype) {
                var p = function() {};
                p.prototype = o.prototype,
                i.prototype = new p,
                p.prototype = null
            }
            return i
        }
        ,
        yn
    }();
    return dn = Function.prototype.bind || t
}
var Bn = gr
  , Nn = mr
  , Mn = br
  , Fn = vr
  , Vn = Sr
  , Un = wr
  , kn = Er
  , Cn = Ar
  , Ln = Or
  , qn = Tr
  , Wn = jr
  , Hn = Pr
  , $n = Ir
  , Gn = xr
  , zn = Dr
  , Kn = Function
  , Jn = function(t) {
    try {
        return Kn('"use strict"; return (' + t + ").constructor;")()
    } catch (np) {}
}
  , Zn = Br
  , Qn = Wr
  , Yn = function() {
    throw new kn
}
  , Xn = Zn ? function() {
    try {
        return Yn
    } catch (t) {
        try {
            return Zn(arguments, "callee").get
        } catch (e) {
            return Yn
        }
    }
}() : Yn
  , to = function() {
    if (Ur)
        return Vr;
    Ur = 1;
    var t = "undefined" != typeof Symbol && Symbol
      , e = Fr ? Mr : (Fr = 1,
    Mr = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1;
        if ("symbol" == typeof Symbol.iterator)
            return !0;
        var t = {}
          , e = Symbol("test")
          , r = Object(e);
        if ("string" == typeof e)
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(e))
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1;
        for (var n in t[e] = 42,
        t)
            return !1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(t).length)
            return !1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length)
            return !1;
        var o = Object.getOwnPropertySymbols(t);
        if (1 !== o.length || o[0] !== e)
            return !1;
        if (!Object.prototype.propertyIsEnumerable.call(t, e))
            return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (42 !== i.value || !0 !== i.enumerable)
                return !1
        }
        return !0
    }
    );
    return Vr = function() {
        return "function" == typeof t && ("function" == typeof Symbol && ("symbol" == typeof t("foo") && ("symbol" == typeof Symbol("bar") && e())))
    }
}()()
  , eo = Dn()
  , ro = $r()
  , no = Hr()
  , oo = nn()
  , io = rn()
  , ao = {}
  , so = "undefined" != typeof Uint8Array && eo ? eo(Uint8Array) : vn
  , uo = {
    __proto__: null,
    "%AggregateError%": "undefined" == typeof AggregateError ? vn : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? vn : ArrayBuffer,
    "%ArrayIteratorPrototype%": to && eo ? eo([][Symbol.iterator]()) : vn,
    "%AsyncFromSyncIteratorPrototype%": vn,
    "%AsyncFunction%": ao,
    "%AsyncGenerator%": ao,
    "%AsyncGeneratorFunction%": ao,
    "%AsyncIteratorPrototype%": ao,
    "%Atomics%": "undefined" == typeof Atomics ? vn : Atomics,
    "%BigInt%": "undefined" == typeof BigInt ? vn : BigInt,
    "%BigInt64Array%": "undefined" == typeof BigInt64Array ? vn : BigInt64Array,
    "%BigUint64Array%": "undefined" == typeof BigUint64Array ? vn : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": "undefined" == typeof DataView ? vn : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Nn,
    "%eval%": eval,
    "%EvalError%": Mn,
    "%Float32Array%": "undefined" == typeof Float32Array ? vn : Float32Array,
    "%Float64Array%": "undefined" == typeof Float64Array ? vn : Float64Array,
    "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? vn : FinalizationRegistry,
    "%Function%": Kn,
    "%GeneratorFunction%": ao,
    "%Int8Array%": "undefined" == typeof Int8Array ? vn : Int8Array,
    "%Int16Array%": "undefined" == typeof Int16Array ? vn : Int16Array,
    "%Int32Array%": "undefined" == typeof Int32Array ? vn : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": to && eo ? eo(eo([][Symbol.iterator]())) : vn,
    "%JSON%": "object" == typeof JSON ? JSON : vn,
    "%Map%": "undefined" == typeof Map ? vn : Map,
    "%MapIteratorPrototype%": "undefined" != typeof Map && to && eo ? eo((new Map)[Symbol.iterator]()) : vn,
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Bn,
    "%Object.getOwnPropertyDescriptor%": Zn,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": "undefined" == typeof Promise ? vn : Promise,
    "%Proxy%": "undefined" == typeof Proxy ? vn : Proxy,
    "%RangeError%": Fn,
    "%ReferenceError%": Vn,
    "%Reflect%": "undefined" == typeof Reflect ? vn : Reflect,
    "%RegExp%": RegExp,
    "%Set%": "undefined" == typeof Set ? vn : Set,
    "%SetIteratorPrototype%": "undefined" != typeof Set && to && eo ? eo((new Set)[Symbol.iterator]()) : vn,
    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? vn : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": to && eo ? eo(""[Symbol.iterator]()) : vn,
    "%Symbol%": to ? Symbol : vn,
    "%SyntaxError%": Un,
    "%ThrowTypeError%": Xn,
    "%TypedArray%": so,
    "%TypeError%": kn,
    "%Uint8Array%": "undefined" == typeof Uint8Array ? vn : Uint8Array,
    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? vn : Uint8ClampedArray,
    "%Uint16Array%": "undefined" == typeof Uint16Array ? vn : Uint16Array,
    "%Uint32Array%": "undefined" == typeof Uint32Array ? vn : Uint32Array,
    "%URIError%": Cn,
    "%WeakMap%": "undefined" == typeof WeakMap ? vn : WeakMap,
    "%WeakRef%": "undefined" == typeof WeakRef ? vn : WeakRef,
    "%WeakSet%": "undefined" == typeof WeakSet ? vn : WeakSet,
    "%Function.prototype.call%": io,
    "%Function.prototype.apply%": oo,
    "%Object.defineProperty%": Qn,
    "%Object.getPrototypeOf%": ro,
    "%Math.abs%": Ln,
    "%Math.floor%": qn,
    "%Math.max%": Wn,
    "%Math.min%": Hn,
    "%Math.pow%": $n,
    "%Math.round%": Gn,
    "%Math.sign%": zn,
    "%Reflect.getPrototypeOf%": no
};
if (eo)
    try {
        null.error
    } catch (np) {
        var co = eo(eo(np));
        uo["%Error.prototype%"] = co
    }
var po = function t(e) {
    var r;
    if ("%AsyncFunction%" === e)
        r = Jn("async function () {}");
    else if ("%GeneratorFunction%" === e)
        r = Jn("function* () {}");
    else if ("%AsyncGeneratorFunction%" === e)
        r = Jn("async function* () {}");
    else if ("%AsyncGenerator%" === e) {
        var n = t("%AsyncGeneratorFunction%");
        n && (r = n.prototype)
    } else if ("%AsyncIteratorPrototype%" === e) {
        var o = t("%AsyncGenerator%");
        o && eo && (r = eo(o.prototype))
    }
    return uo[e] = r,
    r
}
  , fo = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
}
  , lo = _n()
  , yo = function() {
    if (bn)
        return mn;
    bn = 1;
    var t = Function.prototype.call
      , e = Object.prototype.hasOwnProperty
      , r = _n();
    return mn = r.call(t, e)
}()
  , ho = lo.call(io, Array.prototype.concat)
  , go = lo.call(oo, Array.prototype.splice)
  , mo = lo.call(io, String.prototype.replace)
  , bo = lo.call(io, String.prototype.slice)
  , vo = lo.call(io, RegExp.prototype.exec)
  , So = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
  , wo = /\\(\\)?/g
  , Eo = function(t, e) {
    var r, n = t;
    if (yo(fo, n) && (n = "%" + (r = fo[n])[0] + "%"),
    yo(uo, n)) {
        var o = uo[n];
        if (o === ao && (o = po(n)),
        void 0 === o && !e)
            throw new kn("intrinsic " + t + " exists, but is not available. Please file an issue!");
        return {
            alias: r,
            name: n,
            value: o
        }
    }
    throw new Un("intrinsic " + t + " does not exist!")
}
  , Ao = Error
  , Oo = EvalError
  , To = RangeError
  , jo = ReferenceError
  , Po = SyntaxError
  , Io = TypeError
  , xo = URIError
  , Ro = Object.getOwnPropertyDescriptor;
if (Ro)
    try {
        Ro([], "length")
    } catch (np) {
        Ro = null
    }
var Do, _o, Bo, No, Mo, Fo, Vo, Uo, ko, Co, Lo, qo = Ro, Wo = Object.defineProperty || !1;
if (Wo)
    try {
        Wo({}, "a", {
            value: 1
        })
    } catch (np) {
        Wo = !1
    }
function Ho() {
    if (Uo)
        return Vo;
    Uo = 1;
    var t = function() {
        if (Fo)
            return Mo;
        Fo = 1;
        var t = Object.prototype.toString
          , e = Math.max
          , r = function(t, e) {
            for (var r = [], n = 0; n < t.length; n += 1)
                r[n] = t[n];
            for (var o = 0; o < e.length; o += 1)
                r[o + t.length] = e[o];
            return r
        };
        return Mo = function(n) {
            var o = this;
            if ("function" != typeof o || "[object Function]" !== t.apply(o))
                throw new TypeError("Function.prototype.bind called on incompatible " + o);
            for (var i, a = function(t) {
                for (var e = [], r = 1, n = 0; r < t.length; r += 1,
                n += 1)
                    e[n] = t[r];
                return e
            }(arguments), s = e(0, o.length - a.length), u = [], c = 0; c < s; c++)
                u[c] = "$" + c;
            if (i = Function("binder", "return function (" + function(t, e) {
                for (var r = "", n = 0; n < t.length; n += 1)
                    r += t[n],
                    n + 1 < t.length && (r += e);
                return r
            }(u, ",") + "){ return binder.apply(this,arguments); }")((function() {
                if (this instanceof i) {
                    var t = o.apply(this, r(a, arguments));
                    return Object(t) === t ? t : this
                }
                return o.apply(n, r(a, arguments))
            }
            )),
            o.prototype) {
                var p = function() {};
                p.prototype = o.prototype,
                i.prototype = new p,
                p.prototype = null
            }
            return i
        }
        ,
        Mo
    }();
    return Vo = Function.prototype.bind || t
}
var $o = gr
  , Go = Ao
  , zo = Oo
  , Ko = To
  , Jo = jo
  , Zo = Po
  , Qo = Io
  , Yo = xo
  , Xo = Or
  , ti = Tr
  , ei = jr
  , ri = Pr
  , ni = Ir
  , oi = xr
  , ii = Dr
  , ai = Function
  , si = function(t) {
    try {
        return ai('"use strict"; return (' + t + ").constructor;")()
    } catch (np) {}
}
  , ui = qo
  , ci = Wo
  , pi = function() {
    throw new Qo
}
  , fi = ui ? function() {
    try {
        return pi
    } catch (t) {
        try {
            return ui(arguments, "callee").get
        } catch (e) {
            return pi
        }
    }
}() : pi
  , li = function() {
    if (No)
        return Bo;
    No = 1;
    var t = "undefined" != typeof Symbol && Symbol
      , e = _o ? Do : (_o = 1,
    Do = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1;
        if ("symbol" == typeof Symbol.iterator)
            return !0;
        var t = {}
          , e = Symbol("test")
          , r = Object(e);
        if ("string" == typeof e)
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(e))
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1;
        for (var n in t[e] = 42,
        t)
            return !1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(t).length)
            return !1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length)
            return !1;
        var o = Object.getOwnPropertySymbols(t);
        if (1 !== o.length || o[0] !== e)
            return !1;
        if (!Object.prototype.propertyIsEnumerable.call(t, e))
            return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (42 !== i.value || !0 !== i.enumerable)
                return !1
        }
        return !0
    }
    );
    return Bo = function() {
        return "function" == typeof t && ("function" == typeof Symbol && ("symbol" == typeof t("foo") && ("symbol" == typeof Symbol("bar") && e())))
    }
}()()
  , yi = Dn()
  , hi = $r()
  , di = Hr()
  , gi = nn()
  , mi = rn()
  , bi = {}
  , vi = "undefined" != typeof Uint8Array && yi ? yi(Uint8Array) : Lo
  , Si = {
    __proto__: null,
    "%AggregateError%": "undefined" == typeof AggregateError ? Lo : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? Lo : ArrayBuffer,
    "%ArrayIteratorPrototype%": li && yi ? yi([][Symbol.iterator]()) : Lo,
    "%AsyncFromSyncIteratorPrototype%": Lo,
    "%AsyncFunction%": bi,
    "%AsyncGenerator%": bi,
    "%AsyncGeneratorFunction%": bi,
    "%AsyncIteratorPrototype%": bi,
    "%Atomics%": "undefined" == typeof Atomics ? Lo : Atomics,
    "%BigInt%": "undefined" == typeof BigInt ? Lo : BigInt,
    "%BigInt64Array%": "undefined" == typeof BigInt64Array ? Lo : BigInt64Array,
    "%BigUint64Array%": "undefined" == typeof BigUint64Array ? Lo : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": "undefined" == typeof DataView ? Lo : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Go,
    "%eval%": eval,
    "%EvalError%": zo,
    "%Float32Array%": "undefined" == typeof Float32Array ? Lo : Float32Array,
    "%Float64Array%": "undefined" == typeof Float64Array ? Lo : Float64Array,
    "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? Lo : FinalizationRegistry,
    "%Function%": ai,
    "%GeneratorFunction%": bi,
    "%Int8Array%": "undefined" == typeof Int8Array ? Lo : Int8Array,
    "%Int16Array%": "undefined" == typeof Int16Array ? Lo : Int16Array,
    "%Int32Array%": "undefined" == typeof Int32Array ? Lo : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": li && yi ? yi(yi([][Symbol.iterator]())) : Lo,
    "%JSON%": "object" == typeof JSON ? JSON : Lo,
    "%Map%": "undefined" == typeof Map ? Lo : Map,
    "%MapIteratorPrototype%": "undefined" != typeof Map && li && yi ? yi((new Map)[Symbol.iterator]()) : Lo,
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $o,
    "%Object.getOwnPropertyDescriptor%": ui,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": "undefined" == typeof Promise ? Lo : Promise,
    "%Proxy%": "undefined" == typeof Proxy ? Lo : Proxy,
    "%RangeError%": Ko,
    "%ReferenceError%": Jo,
    "%Reflect%": "undefined" == typeof Reflect ? Lo : Reflect,
    "%RegExp%": RegExp,
    "%Set%": "undefined" == typeof Set ? Lo : Set,
    "%SetIteratorPrototype%": "undefined" != typeof Set && li && yi ? yi((new Set)[Symbol.iterator]()) : Lo,
    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? Lo : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": li && yi ? yi(""[Symbol.iterator]()) : Lo,
    "%Symbol%": li ? Symbol : Lo,
    "%SyntaxError%": Zo,
    "%ThrowTypeError%": fi,
    "%TypedArray%": vi,
    "%TypeError%": Qo,
    "%Uint8Array%": "undefined" == typeof Uint8Array ? Lo : Uint8Array,
    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? Lo : Uint8ClampedArray,
    "%Uint16Array%": "undefined" == typeof Uint16Array ? Lo : Uint16Array,
    "%Uint32Array%": "undefined" == typeof Uint32Array ? Lo : Uint32Array,
    "%URIError%": Yo,
    "%WeakMap%": "undefined" == typeof WeakMap ? Lo : WeakMap,
    "%WeakRef%": "undefined" == typeof WeakRef ? Lo : WeakRef,
    "%WeakSet%": "undefined" == typeof WeakSet ? Lo : WeakSet,
    "%Function.prototype.call%": mi,
    "%Function.prototype.apply%": gi,
    "%Object.defineProperty%": ci,
    "%Object.getPrototypeOf%": hi,
    "%Math.abs%": Xo,
    "%Math.floor%": ti,
    "%Math.max%": ei,
    "%Math.min%": ri,
    "%Math.pow%": ni,
    "%Math.round%": oi,
    "%Math.sign%": ii,
    "%Reflect.getPrototypeOf%": di
};
if (yi)
    try {
        null.error
    } catch (np) {
        var wi = yi(yi(np));
        Si["%Error.prototype%"] = wi
    }
var Ei = function t(e) {
    var r;
    if ("%AsyncFunction%" === e)
        r = si("async function () {}");
    else if ("%GeneratorFunction%" === e)
        r = si("function* () {}");
    else if ("%AsyncGeneratorFunction%" === e)
        r = si("async function* () {}");
    else if ("%AsyncGenerator%" === e) {
        var n = t("%AsyncGeneratorFunction%");
        n && (r = n.prototype)
    } else if ("%AsyncIteratorPrototype%" === e) {
        var o = t("%AsyncGenerator%");
        o && yi && (r = yi(o.prototype))
    }
    return Si[e] = r,
    r
}
  , Ai = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
}
  , Oi = Ho()
  , Ti = function() {
    if (Co)
        return ko;
    Co = 1;
    var t = Function.prototype.call
      , e = Object.prototype.hasOwnProperty
      , r = Ho();
    return ko = r.call(t, e)
}()
  , ji = Oi.call(mi, Array.prototype.concat)
  , Pi = Oi.call(gi, Array.prototype.splice)
  , Ii = Oi.call(mi, String.prototype.replace)
  , xi = Oi.call(mi, String.prototype.slice)
  , Ri = Oi.call(mi, RegExp.prototype.exec)
  , Di = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
  , _i = /\\(\\)?/g
  , Bi = function(t, e) {
    var r, n = t;
    if (Ti(Ai, n) && (n = "%" + (r = Ai[n])[0] + "%"),
    Ti(Si, n)) {
        var o = Si[n];
        if (o === bi && (o = Ei(n)),
        void 0 === o && !e)
            throw new Qo("intrinsic " + t + " exists, but is not available. Please file an issue!");
        return {
            alias: r,
            name: n,
            value: o
        }
    }
    throw new Zo("intrinsic " + t + " does not exist!")
}
  , Ni = function(t, e) {
    if ("string" != typeof t || 0 === t.length)
        throw new Qo("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && "boolean" != typeof e)
        throw new Qo('"allowMissing" argument must be a boolean');
    if (null === Ri(/^%?[^%]*%?$/, t))
        throw new Zo("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var r = function(t) {
        var e = xi(t, 0, 1)
          , r = xi(t, -1);
        if ("%" === e && "%" !== r)
            throw new Zo("invalid intrinsic syntax, expected closing `%`");
        if ("%" === r && "%" !== e)
            throw new Zo("invalid intrinsic syntax, expected opening `%`");
        var n = [];
        return Ii(t, Di, (function(t, e, r, o) {
            n[n.length] = r ? Ii(o, _i, "$1") : e || t
        }
        )),
        n
    }(t)
      , n = r.length > 0 ? r[0] : ""
      , o = Bi("%" + n + "%", e)
      , i = o.name
      , a = o.value
      , s = !1
      , u = o.alias;
    u && (n = u[0],
    Pi(r, ji([0, 1], u)));
    for (var c = 1, p = !0; c < r.length; c += 1) {
        var f = r[c]
          , l = xi(f, 0, 1)
          , y = xi(f, -1);
        if (('"' === l || "'" === l || "`" === l || '"' === y || "'" === y || "`" === y) && l !== y)
            throw new Zo("property names with quotes must have matching quotes");
        if ("constructor" !== f && p || (s = !0),
        Ti(Si, i = "%" + (n += "." + f) + "%"))
            a = Si[i];
        else if (null != a) {
            if (!(f in a)) {
                if (!e)
                    throw new Qo("base intrinsic for " + t + " exists, but the property is not available.");
                return
            }
            if (ui && c + 1 >= r.length) {
                var h = ui(a, f);
                a = (p = !!h) && "get"in h && !("originalValue"in h.get) ? h.get : a[f]
            } else
                p = Ti(a, f),
                a = a[f];
            p && !s && (Si[i] = a)
        }
    }
    return a
}
  , Mi = xn
  , Fi = Mi([Ni("%String.prototype.indexOf%")])
  , Vi = function(t, e) {
    var r = Ni(t, !!e);
    return "function" == typeof r && Fi(t, ".prototype.") > -1 ? Mi([r]) : r
}
  , Ui = "function" == typeof Map && Map.prototype
  , ki = Object.getOwnPropertyDescriptor && Ui ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null
  , Ci = Ui && ki && "function" == typeof ki.get ? ki.get : null
  , Li = Ui && Map.prototype.forEach
  , qi = "function" == typeof Set && Set.prototype
  , Wi = Object.getOwnPropertyDescriptor && qi ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null
  , Hi = qi && Wi && "function" == typeof Wi.get ? Wi.get : null
  , $i = qi && Set.prototype.forEach
  , Gi = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null
  , zi = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null
  , Ki = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null
  , Ji = Boolean.prototype.valueOf
  , Zi = Object.prototype.toString
  , Qi = Function.prototype.toString
  , Yi = String.prototype.match
  , Xi = String.prototype.slice
  , ta = String.prototype.replace
  , ea = String.prototype.toUpperCase
  , ra = String.prototype.toLowerCase
  , na = RegExp.prototype.test
  , oa = Array.prototype.concat
  , ia = Array.prototype.join
  , aa = Array.prototype.slice
  , sa = Math.floor
  , ua = "function" == typeof BigInt ? BigInt.prototype.valueOf : null
  , ca = Object.getOwnPropertySymbols
  , pa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null
  , fa = "function" == typeof Symbol && "object" == typeof Symbol.iterator
  , la = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === fa || "symbol") ? Symbol.toStringTag : null
  , ya = Object.prototype.propertyIsEnumerable
  , ha = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
    return t.__proto__
}
: null);
function da(t, e) {
    if (t === 1 / 0 || t === -1 / 0 || t != t || t && t > -1e3 && t < 1e3 || na.call(/e/, e))
        return e;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if ("number" == typeof t) {
        var n = t < 0 ? -sa(-t) : sa(t);
        if (n !== t) {
            var o = String(n)
              , i = Xi.call(e, o.length + 1);
            return ta.call(o, r, "$&_") + "." + ta.call(ta.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
        }
    }
    return ta.call(e, r, "$&_")
}
var ga = pt
  , ma = ga.custom
  , ba = Ta(ma) ? ma : null
  , va = {
    __proto__: null,
    double: '"',
    single: "'"
}
  , Sa = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
};
function wa(t, e, r) {
    var n = r.quoteStyle || e
      , o = va[n];
    return o + t + o
}
function Ea(t) {
    return ta.call(String(t), /"/g, "&quot;")
}
function Aa(t) {
    return !("[object Array]" !== Ia(t) || la && "object" == typeof t && la in t)
}
function Oa(t) {
    return !("[object RegExp]" !== Ia(t) || la && "object" == typeof t && la in t)
}
function Ta(t) {
    if (fa)
        return t && "object" == typeof t && t instanceof Symbol;
    if ("symbol" == typeof t)
        return !0;
    if (!t || "object" != typeof t || !pa)
        return !1;
    try {
        return pa.call(t),
        !0
    } catch (np) {}
    return !1
}
var ja = Object.prototype.hasOwnProperty || function(t) {
    return t in this
}
;
function Pa(t, e) {
    return ja.call(t, e)
}
function Ia(t) {
    return Zi.call(t)
}
function xa(t, e) {
    if (t.indexOf)
        return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
        if (t[r] === e)
            return r;
    return -1
}
function Ra(t, e) {
    if (t.length > e.maxStringLength) {
        var r = t.length - e.maxStringLength
          , n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return Ra(Xi.call(t, 0, e.maxStringLength), e) + n
    }
    var o = Sa[e.quoteStyle || "single"];
    return o.lastIndex = 0,
    wa(ta.call(ta.call(t, o, "\\$1"), /[\x00-\x1f]/g, Da), "single", e)
}
function Da(t) {
    var e = t.charCodeAt(0)
      , r = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
    }[e];
    return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + ea.call(e.toString(16))
}
function _a(t) {
    return "Object(" + t + ")"
}
function Ba(t) {
    return t + " { ? }"
}
function Na(t, e, r, n) {
    return t + " (" + e + ") {" + (n ? Ma(r, n) : ia.call(r, ", ")) + "}"
}
function Ma(t, e) {
    if (0 === t.length)
        return "";
    var r = "\n" + e.prev + e.base;
    return r + ia.call(t, "," + r) + "\n" + e.prev
}
function Fa(t, e) {
    var r = Aa(t)
      , n = [];
    if (r) {
        n.length = t.length;
        for (var o = 0; o < t.length; o++)
            n[o] = Pa(t, o) ? e(t[o], t) : ""
    }
    var i, a = "function" == typeof ca ? ca(t) : [];
    if (fa) {
        i = {};
        for (var s = 0; s < a.length; s++)
            i["$" + a[s]] = a[s]
    }
    for (var u in t)
        Pa(t, u) && (r && String(Number(u)) === u && u < t.length || fa && i["$" + u]instanceof Symbol || (na.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
    if ("function" == typeof ca)
        for (var c = 0; c < a.length; c++)
            ya.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
    return n
}
var Va = Vi
  , Ua = function t(r, n, o, i) {
    var a = n || {};
    if (Pa(a, "quoteStyle") && !Pa(va, a.quoteStyle))
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (Pa(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var s = !Pa(a, "customInspect") || a.customInspect;
    if ("boolean" != typeof s && "symbol" !== s)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (Pa(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (Pa(a, "numericSeparator") && "boolean" != typeof a.numericSeparator)
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var u = a.numericSeparator;
    if (void 0 === r)
        return "undefined";
    if (null === r)
        return "null";
    if ("boolean" == typeof r)
        return r ? "true" : "false";
    if ("string" == typeof r)
        return Ra(r, a);
    if ("number" == typeof r) {
        if (0 === r)
            return 1 / 0 / r > 0 ? "0" : "-0";
        var c = String(r);
        return u ? da(r, c) : c
    }
    if ("bigint" == typeof r) {
        var p = String(r) + "n";
        return u ? da(r, p) : p
    }
    var f = void 0 === a.depth ? 5 : a.depth;
    if (void 0 === o && (o = 0),
    o >= f && f > 0 && "object" == typeof r)
        return Aa(r) ? "[Array]" : "[Object]";
    var l = function(t, e) {
        var r;
        if ("\t" === t.indent)
            r = "\t";
        else {
            if (!("number" == typeof t.indent && t.indent > 0))
                return null;
            r = ia.call(Array(t.indent + 1), " ")
        }
        return {
            base: r,
            prev: ia.call(Array(e + 1), r)
        }
    }(a, o);
    if (void 0 === i)
        i = [];
    else if (xa(i, r) >= 0)
        return "[Circular]";
    function y(e, r, n) {
        if (r && (i = aa.call(i)).push(r),
        n) {
            var s = {
                depth: a.depth
            };
            return Pa(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle),
            t(e, s, o + 1, i)
        }
        return t(e, a, o + 1, i)
    }
    if ("function" == typeof r && !Oa(r)) {
        var h = function(t) {
            if (t.name)
                return t.name;
            var e = Yi.call(Qi.call(t), /^function\s*([\w$]+)/);
            if (e)
                return e[1];
            return null
        }(r)
          , d = Fa(r, y);
        return "[Function" + (h ? ": " + h : " (anonymous)") + "]" + (d.length > 0 ? " { " + ia.call(d, ", ") + " }" : "")
    }
    if (Ta(r)) {
        var g = fa ? ta.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : pa.call(r);
        return "object" != typeof r || fa ? g : _a(g)
    }
    if (function(t) {
        if (!t || "object" != typeof t)
            return !1;
        if ("undefined" != typeof HTMLElement && t instanceof HTMLElement)
            return !0;
        return "string" == typeof t.nodeName && "function" == typeof t.getAttribute
    }(r)) {
        for (var m = "<" + ra.call(String(r.nodeName)), b = r.attributes || [], v = 0; v < b.length; v++)
            m += " " + b[v].name + "=" + wa(Ea(b[v].value), "double", a);
        return m += ">",
        r.childNodes && r.childNodes.length && (m += "..."),
        m += "</" + ra.call(String(r.nodeName)) + ">"
    }
    if (Aa(r)) {
        if (0 === r.length)
            return "[]";
        var S = Fa(r, y);
        return l && !function(t) {
            for (var e = 0; e < t.length; e++)
                if (xa(t[e], "\n") >= 0)
                    return !1;
            return !0
        }(S) ? "[" + Ma(S, l) + "]" : "[ " + ia.call(S, ", ") + " ]"
    }
    if (function(t) {
        return !("[object Error]" !== Ia(t) || la && "object" == typeof t && la in t)
    }(r)) {
        var w = Fa(r, y);
        return "cause"in Error.prototype || !("cause"in r) || ya.call(r, "cause") ? 0 === w.length ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + ia.call(w, ", ") + " }" : "{ [" + String(r) + "] " + ia.call(oa.call("[cause]: " + y(r.cause), w), ", ") + " }"
    }
    if ("object" == typeof r && s) {
        if (ba && "function" == typeof r[ba] && ga)
            return ga(r, {
                depth: f - o
            });
        if ("symbol" !== s && "function" == typeof r.inspect)
            return r.inspect()
    }
    if (function(t) {
        if (!Ci || !t || "object" != typeof t)
            return !1;
        try {
            Ci.call(t);
            try {
                Hi.call(t)
            } catch (m) {
                return !0
            }
            return t instanceof Map
        } catch (np) {}
        return !1
    }(r)) {
        var E = [];
        return Li && Li.call(r, (function(t, e) {
            E.push(y(e, r, !0) + " => " + y(t, r))
        }
        )),
        Na("Map", Ci.call(r), E, l)
    }
    if (function(t) {
        if (!Hi || !t || "object" != typeof t)
            return !1;
        try {
            Hi.call(t);
            try {
                Ci.call(t)
            } catch (e) {
                return !0
            }
            return t instanceof Set
        } catch (np) {}
        return !1
    }(r)) {
        var A = [];
        return $i && $i.call(r, (function(t) {
            A.push(y(t, r))
        }
        )),
        Na("Set", Hi.call(r), A, l)
    }
    if (function(t) {
        if (!Gi || !t || "object" != typeof t)
            return !1;
        try {
            Gi.call(t, Gi);
            try {
                zi.call(t, zi)
            } catch (m) {
                return !0
            }
            return t instanceof WeakMap
        } catch (np) {}
        return !1
    }(r))
        return Ba("WeakMap");
    if (function(t) {
        if (!zi || !t || "object" != typeof t)
            return !1;
        try {
            zi.call(t, zi);
            try {
                Gi.call(t, Gi)
            } catch (m) {
                return !0
            }
            return t instanceof WeakSet
        } catch (np) {}
        return !1
    }(r))
        return Ba("WeakSet");
    if (function(t) {
        if (!Ki || !t || "object" != typeof t)
            return !1;
        try {
            return Ki.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return Ba("WeakRef");
    if (function(t) {
        return !("[object Number]" !== Ia(t) || la && "object" == typeof t && la in t)
    }(r))
        return _a(y(Number(r)));
    if (function(t) {
        if (!t || "object" != typeof t || !ua)
            return !1;
        try {
            return ua.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return _a(y(ua.call(r)));
    if (function(t) {
        return !("[object Boolean]" !== Ia(t) || la && "object" == typeof t && la in t)
    }(r))
        return _a(Ji.call(r));
    if (function(t) {
        return !("[object String]" !== Ia(t) || la && "object" == typeof t && la in t)
    }(r))
        return _a(y(String(r)));
    if ("undefined" != typeof window && r === window)
        return "{ [object Window] }";
    if ("undefined" != typeof globalThis && r === globalThis || void 0 !== e && r === e)
        return "{ [object globalThis] }";
    if (!function(t) {
        return !("[object Date]" !== Ia(t) || la && "object" == typeof t && la in t)
    }(r) && !Oa(r)) {
        var O = Fa(r, y)
          , T = ha ? ha(r) === Object.prototype : r instanceof Object || r.constructor === Object
          , j = r instanceof Object ? "" : "null prototype"
          , P = !T && la && Object(r) === r && la in r ? Xi.call(Ia(r), 8, -1) : j ? "Object" : ""
          , I = (T || "function" != typeof r.constructor ? "" : r.constructor.name ? r.constructor.name + " " : "") + (P || j ? "[" + ia.call(oa.call([], P || [], j || []), ": ") + "] " : "");
        return 0 === O.length ? I + "{}" : l ? I + "{" + Ma(O, l) + "}" : I + "{ " + ia.call(O, ", ") + " }"
    }
    return String(r)
}
  , ka = Er
  , Ca = function(t, e) {
    if ("string" != typeof t || 0 === t.length)
        throw new kn("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && "boolean" != typeof e)
        throw new kn('"allowMissing" argument must be a boolean');
    if (null === vo(/^%?[^%]*%?$/, t))
        throw new Un("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var r = function(t) {
        var e = bo(t, 0, 1)
          , r = bo(t, -1);
        if ("%" === e && "%" !== r)
            throw new Un("invalid intrinsic syntax, expected closing `%`");
        if ("%" === r && "%" !== e)
            throw new Un("invalid intrinsic syntax, expected opening `%`");
        var n = [];
        return mo(t, So, (function(t, e, r, o) {
            n[n.length] = r ? mo(o, wo, "$1") : e || t
        }
        )),
        n
    }(t)
      , n = r.length > 0 ? r[0] : ""
      , o = Eo("%" + n + "%", e)
      , i = o.name
      , a = o.value
      , s = !1
      , u = o.alias;
    u && (n = u[0],
    go(r, ho([0, 1], u)));
    for (var c = 1, p = !0; c < r.length; c += 1) {
        var f = r[c]
          , l = bo(f, 0, 1)
          , y = bo(f, -1);
        if (('"' === l || "'" === l || "`" === l || '"' === y || "'" === y || "`" === y) && l !== y)
            throw new Un("property names with quotes must have matching quotes");
        if ("constructor" !== f && p || (s = !0),
        yo(uo, i = "%" + (n += "." + f) + "%"))
            a = uo[i];
        else if (null != a) {
            if (!(f in a)) {
                if (!e)
                    throw new kn("base intrinsic for " + t + " exists, but the property is not available.");
                return
            }
            if (Zn && c + 1 >= r.length) {
                var h = Zn(a, f);
                a = (p = !!h) && "get"in h && !("originalValue"in h.get) ? h.get : a[f]
            } else
                p = yo(a, f),
                a = a[f];
            p && !s && (uo[i] = a)
        }
    }
    return a
}("%Map%", !0)
  , La = Va("Map.prototype.get", !0)
  , qa = Va("Map.prototype.set", !0)
  , Wa = Va("Map.prototype.has", !0)
  , Ha = Va("Map.prototype.delete", !0)
  , $a = Va("Map.prototype.size", !0)
  , Ga = !!Ca && function() {
    var t, e = {
        assert: function(t) {
            if (!e.has(t))
                throw new ka("Side channel does not contain " + Ua(t))
        },
        delete: function(e) {
            if (t) {
                var r = Ha(t, e);
                return 0 === $a(t) && (t = void 0),
                r
            }
            return !1
        },
        get: function(e) {
            if (t)
                return La(t, e)
        },
        has: function(e) {
            return !!t && Wa(t, e)
        },
        set: function(e, r) {
            t || (t = new Ca),
            qa(t, e, r)
        }
    };
    return e
}
  , za = Error
  , Ka = EvalError
  , Ja = RangeError
  , Za = ReferenceError
  , Qa = SyntaxError
  , Ya = TypeError
  , Xa = URIError
  , ts = Object.getOwnPropertyDescriptor;
if (ts)
    try {
        ts([], "length")
    } catch (np) {
        ts = null
    }
var es, rs, ns, os, is, as, ss, us, cs, ps, fs, ls = ts, ys = Object.defineProperty || !1;
if (ys)
    try {
        ys({}, "a", {
            value: 1
        })
    } catch (np) {
        ys = !1
    }
function hs() {
    if (us)
        return ss;
    us = 1;
    var t = function() {
        if (as)
            return is;
        as = 1;
        var t = Object.prototype.toString
          , e = Math.max
          , r = function(t, e) {
            for (var r = [], n = 0; n < t.length; n += 1)
                r[n] = t[n];
            for (var o = 0; o < e.length; o += 1)
                r[o + t.length] = e[o];
            return r
        };
        return is = function(n) {
            var o = this;
            if ("function" != typeof o || "[object Function]" !== t.apply(o))
                throw new TypeError("Function.prototype.bind called on incompatible " + o);
            for (var i, a = function(t) {
                for (var e = [], r = 1, n = 0; r < t.length; r += 1,
                n += 1)
                    e[n] = t[r];
                return e
            }(arguments), s = e(0, o.length - a.length), u = [], c = 0; c < s; c++)
                u[c] = "$" + c;
            if (i = Function("binder", "return function (" + function(t, e) {
                for (var r = "", n = 0; n < t.length; n += 1)
                    r += t[n],
                    n + 1 < t.length && (r += e);
                return r
            }(u, ",") + "){ return binder.apply(this,arguments); }")((function() {
                if (this instanceof i) {
                    var t = o.apply(this, r(a, arguments));
                    return Object(t) === t ? t : this
                }
                return o.apply(n, r(a, arguments))
            }
            )),
            o.prototype) {
                var p = function() {};
                p.prototype = o.prototype,
                i.prototype = new p,
                p.prototype = null
            }
            return i
        }
        ,
        is
    }();
    return ss = Function.prototype.bind || t
}
var ds = gr
  , gs = za
  , ms = Ka
  , bs = Ja
  , vs = Za
  , Ss = Qa
  , ws = Ya
  , Es = Xa
  , As = Or
  , Os = Tr
  , Ts = jr
  , js = Pr
  , Ps = Ir
  , Is = xr
  , xs = Dr
  , Rs = Function
  , Ds = function(t) {
    try {
        return Rs('"use strict"; return (' + t + ").constructor;")()
    } catch (np) {}
}
  , _s = ls
  , Bs = ys
  , Ns = function() {
    throw new ws
}
  , Ms = _s ? function() {
    try {
        return Ns
    } catch (t) {
        try {
            return _s(arguments, "callee").get
        } catch (e) {
            return Ns
        }
    }
}() : Ns
  , Fs = function() {
    if (os)
        return ns;
    os = 1;
    var t = "undefined" != typeof Symbol && Symbol
      , e = rs ? es : (rs = 1,
    es = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1;
        if ("symbol" == typeof Symbol.iterator)
            return !0;
        var t = {}
          , e = Symbol("test")
          , r = Object(e);
        if ("string" == typeof e)
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(e))
            return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1;
        for (var n in t[e] = 42,
        t)
            return !1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(t).length)
            return !1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length)
            return !1;
        var o = Object.getOwnPropertySymbols(t);
        if (1 !== o.length || o[0] !== e)
            return !1;
        if (!Object.prototype.propertyIsEnumerable.call(t, e))
            return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (42 !== i.value || !0 !== i.enumerable)
                return !1
        }
        return !0
    }
    );
    return ns = function() {
        return "function" == typeof t && ("function" == typeof Symbol && ("symbol" == typeof t("foo") && ("symbol" == typeof Symbol("bar") && e())))
    }
}()()
  , Vs = Dn()
  , Us = $r()
  , ks = Hr()
  , Cs = nn()
  , Ls = rn()
  , qs = {}
  , Ws = "undefined" != typeof Uint8Array && Vs ? Vs(Uint8Array) : fs
  , Hs = {
    __proto__: null,
    "%AggregateError%": "undefined" == typeof AggregateError ? fs : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? fs : ArrayBuffer,
    "%ArrayIteratorPrototype%": Fs && Vs ? Vs([][Symbol.iterator]()) : fs,
    "%AsyncFromSyncIteratorPrototype%": fs,
    "%AsyncFunction%": qs,
    "%AsyncGenerator%": qs,
    "%AsyncGeneratorFunction%": qs,
    "%AsyncIteratorPrototype%": qs,
    "%Atomics%": "undefined" == typeof Atomics ? fs : Atomics,
    "%BigInt%": "undefined" == typeof BigInt ? fs : BigInt,
    "%BigInt64Array%": "undefined" == typeof BigInt64Array ? fs : BigInt64Array,
    "%BigUint64Array%": "undefined" == typeof BigUint64Array ? fs : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": "undefined" == typeof DataView ? fs : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": gs,
    "%eval%": eval,
    "%EvalError%": ms,
    "%Float32Array%": "undefined" == typeof Float32Array ? fs : Float32Array,
    "%Float64Array%": "undefined" == typeof Float64Array ? fs : Float64Array,
    "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? fs : FinalizationRegistry,
    "%Function%": Rs,
    "%GeneratorFunction%": qs,
    "%Int8Array%": "undefined" == typeof Int8Array ? fs : Int8Array,
    "%Int16Array%": "undefined" == typeof Int16Array ? fs : Int16Array,
    "%Int32Array%": "undefined" == typeof Int32Array ? fs : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": Fs && Vs ? Vs(Vs([][Symbol.iterator]())) : fs,
    "%JSON%": "object" == typeof JSON ? JSON : fs,
    "%Map%": "undefined" == typeof Map ? fs : Map,
    "%MapIteratorPrototype%": "undefined" != typeof Map && Fs && Vs ? Vs((new Map)[Symbol.iterator]()) : fs,
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": ds,
    "%Object.getOwnPropertyDescriptor%": _s,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": "undefined" == typeof Promise ? fs : Promise,
    "%Proxy%": "undefined" == typeof Proxy ? fs : Proxy,
    "%RangeError%": bs,
    "%ReferenceError%": vs,
    "%Reflect%": "undefined" == typeof Reflect ? fs : Reflect,
    "%RegExp%": RegExp,
    "%Set%": "undefined" == typeof Set ? fs : Set,
    "%SetIteratorPrototype%": "undefined" != typeof Set && Fs && Vs ? Vs((new Set)[Symbol.iterator]()) : fs,
    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? fs : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": Fs && Vs ? Vs(""[Symbol.iterator]()) : fs,
    "%Symbol%": Fs ? Symbol : fs,
    "%SyntaxError%": Ss,
    "%ThrowTypeError%": Ms,
    "%TypedArray%": Ws,
    "%TypeError%": ws,
    "%Uint8Array%": "undefined" == typeof Uint8Array ? fs : Uint8Array,
    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? fs : Uint8ClampedArray,
    "%Uint16Array%": "undefined" == typeof Uint16Array ? fs : Uint16Array,
    "%Uint32Array%": "undefined" == typeof Uint32Array ? fs : Uint32Array,
    "%URIError%": Es,
    "%WeakMap%": "undefined" == typeof WeakMap ? fs : WeakMap,
    "%WeakRef%": "undefined" == typeof WeakRef ? fs : WeakRef,
    "%WeakSet%": "undefined" == typeof WeakSet ? fs : WeakSet,
    "%Function.prototype.call%": Ls,
    "%Function.prototype.apply%": Cs,
    "%Object.defineProperty%": Bs,
    "%Object.getPrototypeOf%": Us,
    "%Math.abs%": As,
    "%Math.floor%": Os,
    "%Math.max%": Ts,
    "%Math.min%": js,
    "%Math.pow%": Ps,
    "%Math.round%": Is,
    "%Math.sign%": xs,
    "%Reflect.getPrototypeOf%": ks
};
if (Vs)
    try {
        null.error
    } catch (np) {
        var $s = Vs(Vs(np));
        Hs["%Error.prototype%"] = $s
    }
var Gs = function t(e) {
    var r;
    if ("%AsyncFunction%" === e)
        r = Ds("async function () {}");
    else if ("%GeneratorFunction%" === e)
        r = Ds("function* () {}");
    else if ("%AsyncGeneratorFunction%" === e)
        r = Ds("async function* () {}");
    else if ("%AsyncGenerator%" === e) {
        var n = t("%AsyncGeneratorFunction%");
        n && (r = n.prototype)
    } else if ("%AsyncIteratorPrototype%" === e) {
        var o = t("%AsyncGenerator%");
        o && Vs && (r = Vs(o.prototype))
    }
    return Hs[e] = r,
    r
}
  , zs = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
}
  , Ks = hs()
  , Js = function() {
    if (ps)
        return cs;
    ps = 1;
    var t = Function.prototype.call
      , e = Object.prototype.hasOwnProperty
      , r = hs();
    return cs = r.call(t, e)
}()
  , Zs = Ks.call(Ls, Array.prototype.concat)
  , Qs = Ks.call(Cs, Array.prototype.splice)
  , Ys = Ks.call(Ls, String.prototype.replace)
  , Xs = Ks.call(Ls, String.prototype.slice)
  , tu = Ks.call(Ls, RegExp.prototype.exec)
  , eu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
  , ru = /\\(\\)?/g
  , nu = function(t, e) {
    var r, n = t;
    if (Js(zs, n) && (n = "%" + (r = zs[n])[0] + "%"),
    Js(Hs, n)) {
        var o = Hs[n];
        if (o === qs && (o = Gs(n)),
        void 0 === o && !e)
            throw new ws("intrinsic " + t + " exists, but is not available. Please file an issue!");
        return {
            alias: r,
            name: n,
            value: o
        }
    }
    throw new Ss("intrinsic " + t + " does not exist!")
}
  , ou = "function" == typeof Map && Map.prototype
  , iu = Object.getOwnPropertyDescriptor && ou ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null
  , au = ou && iu && "function" == typeof iu.get ? iu.get : null
  , su = ou && Map.prototype.forEach
  , uu = "function" == typeof Set && Set.prototype
  , cu = Object.getOwnPropertyDescriptor && uu ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null
  , pu = uu && cu && "function" == typeof cu.get ? cu.get : null
  , fu = uu && Set.prototype.forEach
  , lu = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null
  , yu = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null
  , hu = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null
  , du = Boolean.prototype.valueOf
  , gu = Object.prototype.toString
  , mu = Function.prototype.toString
  , bu = String.prototype.match
  , vu = String.prototype.slice
  , Su = String.prototype.replace
  , wu = String.prototype.toUpperCase
  , Eu = String.prototype.toLowerCase
  , Au = RegExp.prototype.test
  , Ou = Array.prototype.concat
  , Tu = Array.prototype.join
  , ju = Array.prototype.slice
  , Pu = Math.floor
  , Iu = "function" == typeof BigInt ? BigInt.prototype.valueOf : null
  , xu = Object.getOwnPropertySymbols
  , Ru = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null
  , Du = "function" == typeof Symbol && "object" == typeof Symbol.iterator
  , _u = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === Du || "symbol") ? Symbol.toStringTag : null
  , Bu = Object.prototype.propertyIsEnumerable
  , Nu = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
    return t.__proto__
}
: null);
function Mu(t, e) {
    if (t === 1 / 0 || t === -1 / 0 || t != t || t && t > -1e3 && t < 1e3 || Au.call(/e/, e))
        return e;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if ("number" == typeof t) {
        var n = t < 0 ? -Pu(-t) : Pu(t);
        if (n !== t) {
            var o = String(n)
              , i = vu.call(e, o.length + 1);
            return Su.call(o, r, "$&_") + "." + Su.call(Su.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
        }
    }
    return Su.call(e, r, "$&_")
}
var Fu = pt
  , Vu = Fu.custom
  , Uu = $u(Vu) ? Vu : null
  , ku = {
    __proto__: null,
    double: '"',
    single: "'"
}
  , Cu = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
};
function Lu(t, e, r) {
    var n = r.quoteStyle || e
      , o = ku[n];
    return o + t + o
}
function qu(t) {
    return Su.call(String(t), /"/g, "&quot;")
}
function Wu(t) {
    return !("[object Array]" !== Ku(t) || _u && "object" == typeof t && _u in t)
}
function Hu(t) {
    return !("[object RegExp]" !== Ku(t) || _u && "object" == typeof t && _u in t)
}
function $u(t) {
    if (Du)
        return t && "object" == typeof t && t instanceof Symbol;
    if ("symbol" == typeof t)
        return !0;
    if (!t || "object" != typeof t || !Ru)
        return !1;
    try {
        return Ru.call(t),
        !0
    } catch (np) {}
    return !1
}
var Gu = Object.prototype.hasOwnProperty || function(t) {
    return t in this
}
;
function zu(t, e) {
    return Gu.call(t, e)
}
function Ku(t) {
    return gu.call(t)
}
function Ju(t, e) {
    if (t.indexOf)
        return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++)
        if (t[r] === e)
            return r;
    return -1
}
function Zu(t, e) {
    if (t.length > e.maxStringLength) {
        var r = t.length - e.maxStringLength
          , n = "... " + r + " more character" + (r > 1 ? "s" : "");
        return Zu(vu.call(t, 0, e.maxStringLength), e) + n
    }
    var o = Cu[e.quoteStyle || "single"];
    return o.lastIndex = 0,
    Lu(Su.call(Su.call(t, o, "\\$1"), /[\x00-\x1f]/g, Qu), "single", e)
}
function Qu(t) {
    var e = t.charCodeAt(0)
      , r = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
    }[e];
    return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + wu.call(e.toString(16))
}
function Yu(t) {
    return "Object(" + t + ")"
}
function Xu(t) {
    return t + " { ? }"
}
function tc(t, e, r, n) {
    return t + " (" + e + ") {" + (n ? ec(r, n) : Tu.call(r, ", ")) + "}"
}
function ec(t, e) {
    if (0 === t.length)
        return "";
    var r = "\n" + e.prev + e.base;
    return r + Tu.call(t, "," + r) + "\n" + e.prev
}
function rc(t, e) {
    var r = Wu(t)
      , n = [];
    if (r) {
        n.length = t.length;
        for (var o = 0; o < t.length; o++)
            n[o] = zu(t, o) ? e(t[o], t) : ""
    }
    var i, a = "function" == typeof xu ? xu(t) : [];
    if (Du) {
        i = {};
        for (var s = 0; s < a.length; s++)
            i["$" + a[s]] = a[s]
    }
    for (var u in t)
        zu(t, u) && (r && String(Number(u)) === u && u < t.length || Du && i["$" + u]instanceof Symbol || (Au.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
    if ("function" == typeof xu)
        for (var c = 0; c < a.length; c++)
            Bu.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
    return n
}
var nc = Vi
  , oc = function t(r, n, o, i) {
    var a = n || {};
    if (zu(a, "quoteStyle") && !zu(ku, a.quoteStyle))
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (zu(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var s = !zu(a, "customInspect") || a.customInspect;
    if ("boolean" != typeof s && "symbol" !== s)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (zu(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (zu(a, "numericSeparator") && "boolean" != typeof a.numericSeparator)
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var u = a.numericSeparator;
    if (void 0 === r)
        return "undefined";
    if (null === r)
        return "null";
    if ("boolean" == typeof r)
        return r ? "true" : "false";
    if ("string" == typeof r)
        return Zu(r, a);
    if ("number" == typeof r) {
        if (0 === r)
            return 1 / 0 / r > 0 ? "0" : "-0";
        var c = String(r);
        return u ? Mu(r, c) : c
    }
    if ("bigint" == typeof r) {
        var p = String(r) + "n";
        return u ? Mu(r, p) : p
    }
    var f = void 0 === a.depth ? 5 : a.depth;
    if (void 0 === o && (o = 0),
    o >= f && f > 0 && "object" == typeof r)
        return Wu(r) ? "[Array]" : "[Object]";
    var l = function(t, e) {
        var r;
        if ("\t" === t.indent)
            r = "\t";
        else {
            if (!("number" == typeof t.indent && t.indent > 0))
                return null;
            r = Tu.call(Array(t.indent + 1), " ")
        }
        return {
            base: r,
            prev: Tu.call(Array(e + 1), r)
        }
    }(a, o);
    if (void 0 === i)
        i = [];
    else if (Ju(i, r) >= 0)
        return "[Circular]";
    function y(e, r, n) {
        if (r && (i = ju.call(i)).push(r),
        n) {
            var s = {
                depth: a.depth
            };
            return zu(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle),
            t(e, s, o + 1, i)
        }
        return t(e, a, o + 1, i)
    }
    if ("function" == typeof r && !Hu(r)) {
        var h = function(t) {
            if (t.name)
                return t.name;
            var e = bu.call(mu.call(t), /^function\s*([\w$]+)/);
            if (e)
                return e[1];
            return null
        }(r)
          , d = rc(r, y);
        return "[Function" + (h ? ": " + h : " (anonymous)") + "]" + (d.length > 0 ? " { " + Tu.call(d, ", ") + " }" : "")
    }
    if ($u(r)) {
        var g = Du ? Su.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : Ru.call(r);
        return "object" != typeof r || Du ? g : Yu(g)
    }
    if (function(t) {
        if (!t || "object" != typeof t)
            return !1;
        if ("undefined" != typeof HTMLElement && t instanceof HTMLElement)
            return !0;
        return "string" == typeof t.nodeName && "function" == typeof t.getAttribute
    }(r)) {
        for (var m = "<" + Eu.call(String(r.nodeName)), b = r.attributes || [], v = 0; v < b.length; v++)
            m += " " + b[v].name + "=" + Lu(qu(b[v].value), "double", a);
        return m += ">",
        r.childNodes && r.childNodes.length && (m += "..."),
        m += "</" + Eu.call(String(r.nodeName)) + ">"
    }
    if (Wu(r)) {
        if (0 === r.length)
            return "[]";
        var S = rc(r, y);
        return l && !function(t) {
            for (var e = 0; e < t.length; e++)
                if (Ju(t[e], "\n") >= 0)
                    return !1;
            return !0
        }(S) ? "[" + ec(S, l) + "]" : "[ " + Tu.call(S, ", ") + " ]"
    }
    if (function(t) {
        return !("[object Error]" !== Ku(t) || _u && "object" == typeof t && _u in t)
    }(r)) {
        var w = rc(r, y);
        return "cause"in Error.prototype || !("cause"in r) || Bu.call(r, "cause") ? 0 === w.length ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + Tu.call(w, ", ") + " }" : "{ [" + String(r) + "] " + Tu.call(Ou.call("[cause]: " + y(r.cause), w), ", ") + " }"
    }
    if ("object" == typeof r && s) {
        if (Uu && "function" == typeof r[Uu] && Fu)
            return Fu(r, {
                depth: f - o
            });
        if ("symbol" !== s && "function" == typeof r.inspect)
            return r.inspect()
    }
    if (function(t) {
        if (!au || !t || "object" != typeof t)
            return !1;
        try {
            au.call(t);
            try {
                pu.call(t)
            } catch (m) {
                return !0
            }
            return t instanceof Map
        } catch (np) {}
        return !1
    }(r)) {
        var E = [];
        return su && su.call(r, (function(t, e) {
            E.push(y(e, r, !0) + " => " + y(t, r))
        }
        )),
        tc("Map", au.call(r), E, l)
    }
    if (function(t) {
        if (!pu || !t || "object" != typeof t)
            return !1;
        try {
            pu.call(t);
            try {
                au.call(t)
            } catch (e) {
                return !0
            }
            return t instanceof Set
        } catch (np) {}
        return !1
    }(r)) {
        var A = [];
        return fu && fu.call(r, (function(t) {
            A.push(y(t, r))
        }
        )),
        tc("Set", pu.call(r), A, l)
    }
    if (function(t) {
        if (!lu || !t || "object" != typeof t)
            return !1;
        try {
            lu.call(t, lu);
            try {
                yu.call(t, yu)
            } catch (m) {
                return !0
            }
            return t instanceof WeakMap
        } catch (np) {}
        return !1
    }(r))
        return Xu("WeakMap");
    if (function(t) {
        if (!yu || !t || "object" != typeof t)
            return !1;
        try {
            yu.call(t, yu);
            try {
                lu.call(t, lu)
            } catch (m) {
                return !0
            }
            return t instanceof WeakSet
        } catch (np) {}
        return !1
    }(r))
        return Xu("WeakSet");
    if (function(t) {
        if (!hu || !t || "object" != typeof t)
            return !1;
        try {
            return hu.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return Xu("WeakRef");
    if (function(t) {
        return !("[object Number]" !== Ku(t) || _u && "object" == typeof t && _u in t)
    }(r))
        return Yu(y(Number(r)));
    if (function(t) {
        if (!t || "object" != typeof t || !Iu)
            return !1;
        try {
            return Iu.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return Yu(y(Iu.call(r)));
    if (function(t) {
        return !("[object Boolean]" !== Ku(t) || _u && "object" == typeof t && _u in t)
    }(r))
        return Yu(du.call(r));
    if (function(t) {
        return !("[object String]" !== Ku(t) || _u && "object" == typeof t && _u in t)
    }(r))
        return Yu(y(String(r)));
    if ("undefined" != typeof window && r === window)
        return "{ [object Window] }";
    if ("undefined" != typeof globalThis && r === globalThis || void 0 !== e && r === e)
        return "{ [object globalThis] }";
    if (!function(t) {
        return !("[object Date]" !== Ku(t) || _u && "object" == typeof t && _u in t)
    }(r) && !Hu(r)) {
        var O = rc(r, y)
          , T = Nu ? Nu(r) === Object.prototype : r instanceof Object || r.constructor === Object
          , j = r instanceof Object ? "" : "null prototype"
          , P = !T && _u && Object(r) === r && _u in r ? vu.call(Ku(r), 8, -1) : j ? "Object" : ""
          , I = (T || "function" != typeof r.constructor ? "" : r.constructor.name ? r.constructor.name + " " : "") + (P || j ? "[" + Tu.call(Ou.call([], P || [], j || []), ": ") + "] " : "");
        return 0 === O.length ? I + "{}" : l ? I + "{" + ec(O, l) + "}" : I + "{ " + Tu.call(O, ", ") + " }"
    }
    return String(r)
}
  , ic = Ga
  , ac = Ya
  , sc = function(t, e) {
    if ("string" != typeof t || 0 === t.length)
        throw new ws("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && "boolean" != typeof e)
        throw new ws('"allowMissing" argument must be a boolean');
    if (null === tu(/^%?[^%]*%?$/, t))
        throw new Ss("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var r = function(t) {
        var e = Xs(t, 0, 1)
          , r = Xs(t, -1);
        if ("%" === e && "%" !== r)
            throw new Ss("invalid intrinsic syntax, expected closing `%`");
        if ("%" === r && "%" !== e)
            throw new Ss("invalid intrinsic syntax, expected opening `%`");
        var n = [];
        return Ys(t, eu, (function(t, e, r, o) {
            n[n.length] = r ? Ys(o, ru, "$1") : e || t
        }
        )),
        n
    }(t)
      , n = r.length > 0 ? r[0] : ""
      , o = nu("%" + n + "%", e)
      , i = o.name
      , a = o.value
      , s = !1
      , u = o.alias;
    u && (n = u[0],
    Qs(r, Zs([0, 1], u)));
    for (var c = 1, p = !0; c < r.length; c += 1) {
        var f = r[c]
          , l = Xs(f, 0, 1)
          , y = Xs(f, -1);
        if (('"' === l || "'" === l || "`" === l || '"' === y || "'" === y || "`" === y) && l !== y)
            throw new Ss("property names with quotes must have matching quotes");
        if ("constructor" !== f && p || (s = !0),
        Js(Hs, i = "%" + (n += "." + f) + "%"))
            a = Hs[i];
        else if (null != a) {
            if (!(f in a)) {
                if (!e)
                    throw new ws("base intrinsic for " + t + " exists, but the property is not available.");
                return
            }
            if (_s && c + 1 >= r.length) {
                var h = _s(a, f);
                a = (p = !!h) && "get"in h && !("originalValue"in h.get) ? h.get : a[f]
            } else
                p = Js(a, f),
                a = a[f];
            p && !s && (Hs[i] = a)
        }
    }
    return a
}("%WeakMap%", !0)
  , uc = nc("WeakMap.prototype.get", !0)
  , cc = nc("WeakMap.prototype.set", !0)
  , pc = nc("WeakMap.prototype.has", !0)
  , fc = nc("WeakMap.prototype.delete", !0)
  , lc = yt
  , yc = function t(r, n, o, i) {
    var a = n || {};
    if (ne(a, "quoteStyle") && !ne(Jt, a.quoteStyle))
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (ne(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength))
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var s = !ne(a, "customInspect") || a.customInspect;
    if ("boolean" != typeof s && "symbol" !== s)
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (ne(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (ne(a, "numericSeparator") && "boolean" != typeof a.numericSeparator)
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var u = a.numericSeparator;
    if (void 0 === r)
        return "undefined";
    if (null === r)
        return "null";
    if ("boolean" == typeof r)
        return r ? "true" : "false";
    if ("string" == typeof r)
        return ae(r, a);
    if ("number" == typeof r) {
        if (0 === r)
            return 1 / 0 / r > 0 ? "0" : "-0";
        var c = String(r);
        return u ? $t(r, c) : c
    }
    if ("bigint" == typeof r) {
        var p = String(r) + "n";
        return u ? $t(r, p) : p
    }
    var f = void 0 === a.depth ? 5 : a.depth;
    if (void 0 === o && (o = 0),
    o >= f && f > 0 && "object" == typeof r)
        return Xt(r) ? "[Array]" : "[Object]";
    var l = function(t, e) {
        var r;
        if ("\t" === t.indent)
            r = "\t";
        else {
            if (!("number" == typeof t.indent && t.indent > 0))
                return null;
            r = Mt.call(Array(t.indent + 1), " ")
        }
        return {
            base: r,
            prev: Mt.call(Array(e + 1), r)
        }
    }(a, o);
    if (void 0 === i)
        i = [];
    else if (ie(i, r) >= 0)
        return "[Circular]";
    function y(e, r, n) {
        if (r && (i = Ft.call(i)).push(r),
        n) {
            var s = {
                depth: a.depth
            };
            return ne(a, "quoteStyle") && (s.quoteStyle = a.quoteStyle),
            t(e, s, o + 1, i)
        }
        return t(e, a, o + 1, i)
    }
    if ("function" == typeof r && !te(r)) {
        var h = function(t) {
            if (t.name)
                return t.name;
            var e = It.call(Pt.call(t), /^function\s*([\w$]+)/);
            if (e)
                return e[1];
            return null
        }(r)
          , d = le(r, y);
        return "[Function" + (h ? ": " + h : " (anonymous)") + "]" + (d.length > 0 ? " { " + Mt.call(d, ", ") + " }" : "")
    }
    if (ee(r)) {
        var g = Lt ? Rt.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : Ct.call(r);
        return "object" != typeof r || Lt ? g : ue(g)
    }
    if (function(t) {
        if (!t || "object" != typeof t)
            return !1;
        if ("undefined" != typeof HTMLElement && t instanceof HTMLElement)
            return !0;
        return "string" == typeof t.nodeName && "function" == typeof t.getAttribute
    }(r)) {
        for (var m = "<" + _t.call(String(r.nodeName)), b = r.attributes || [], v = 0; v < b.length; v++)
            m += " " + b[v].name + "=" + Qt(Yt(b[v].value), "double", a);
        return m += ">",
        r.childNodes && r.childNodes.length && (m += "..."),
        m += "</" + _t.call(String(r.nodeName)) + ">"
    }
    if (Xt(r)) {
        if (0 === r.length)
            return "[]";
        var S = le(r, y);
        return l && !function(t) {
            for (var e = 0; e < t.length; e++)
                if (ie(t[e], "\n") >= 0)
                    return !1;
            return !0
        }(S) ? "[" + fe(S, l) + "]" : "[ " + Mt.call(S, ", ") + " ]"
    }
    if (function(t) {
        return !("[object Error]" !== oe(t) || qt && "object" == typeof t && qt in t)
    }(r)) {
        var w = le(r, y);
        return "cause"in Error.prototype || !("cause"in r) || Wt.call(r, "cause") ? 0 === w.length ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + Mt.call(w, ", ") + " }" : "{ [" + String(r) + "] " + Mt.call(Nt.call("[cause]: " + y(r.cause), w), ", ") + " }"
    }
    if ("object" == typeof r && s) {
        if (Kt && "function" == typeof r[Kt] && Gt)
            return Gt(r, {
                depth: f - o
            });
        if ("symbol" !== s && "function" == typeof r.inspect)
            return r.inspect()
    }
    if (function(t) {
        if (!gt || !t || "object" != typeof t)
            return !1;
        try {
            gt.call(t);
            try {
                St.call(t)
            } catch (m) {
                return !0
            }
            return t instanceof Map
        } catch (np) {}
        return !1
    }(r)) {
        var E = [];
        return mt && mt.call(r, (function(t, e) {
            E.push(y(e, r, !0) + " => " + y(t, r))
        }
        )),
        pe("Map", gt.call(r), E, l)
    }
    if (function(t) {
        if (!St || !t || "object" != typeof t)
            return !1;
        try {
            St.call(t);
            try {
                gt.call(t)
            } catch (e) {
                return !0
            }
            return t instanceof Set
        } catch (np) {}
        return !1
    }(r)) {
        var A = [];
        return wt && wt.call(r, (function(t) {
            A.push(y(t, r))
        }
        )),
        pe("Set", St.call(r), A, l)
    }
    if (function(t) {
        if (!Et || !t || "object" != typeof t)
            return !1;
        try {
            Et.call(t, Et);
            try {
                At.call(t, At)
            } catch (m) {
                return !0
            }
            return t instanceof WeakMap
        } catch (np) {}
        return !1
    }(r))
        return ce("WeakMap");
    if (function(t) {
        if (!At || !t || "object" != typeof t)
            return !1;
        try {
            At.call(t, At);
            try {
                Et.call(t, Et)
            } catch (m) {
                return !0
            }
            return t instanceof WeakSet
        } catch (np) {}
        return !1
    }(r))
        return ce("WeakSet");
    if (function(t) {
        if (!Ot || !t || "object" != typeof t)
            return !1;
        try {
            return Ot.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return ce("WeakRef");
    if (function(t) {
        return !("[object Number]" !== oe(t) || qt && "object" == typeof t && qt in t)
    }(r))
        return ue(y(Number(r)));
    if (function(t) {
        if (!t || "object" != typeof t || !Ut)
            return !1;
        try {
            return Ut.call(t),
            !0
        } catch (np) {}
        return !1
    }(r))
        return ue(y(Ut.call(r)));
    if (function(t) {
        return !("[object Boolean]" !== oe(t) || qt && "object" == typeof t && qt in t)
    }(r))
        return ue(Tt.call(r));
    if (function(t) {
        return !("[object String]" !== oe(t) || qt && "object" == typeof t && qt in t)
    }(r))
        return ue(y(String(r)));
    if ("undefined" != typeof window && r === window)
        return "{ [object Window] }";
    if ("undefined" != typeof globalThis && r === globalThis || void 0 !== e && r === e)
        return "{ [object globalThis] }";
    if (!function(t) {
        return !("[object Date]" !== oe(t) || qt && "object" == typeof t && qt in t)
    }(r) && !te(r)) {
        var O = le(r, y)
          , T = Ht ? Ht(r) === Object.prototype : r instanceof Object || r.constructor === Object
          , j = r instanceof Object ? "" : "null prototype"
          , P = !T && qt && Object(r) === r && qt in r ? xt.call(oe(r), 8, -1) : j ? "Object" : ""
          , I = (T || "function" != typeof r.constructor ? "" : r.constructor.name ? r.constructor.name + " " : "") + (P || j ? "[" + Mt.call(Nt.call([], P || [], j || []), ": ") + "] " : "");
        return 0 === O.length ? I + "{}" : l ? I + "{" + fe(O, l) + "}" : I + "{ " + Mt.call(O, ", ") + " }"
    }
    return String(r)
}
  , hc = (sc ? function() {
    var t, e, r = {
        assert: function(t) {
            if (!r.has(t))
                throw new ac("Side channel does not contain " + oc(t))
        },
        delete: function(r) {
            if (sc && r && ("object" == typeof r || "function" == typeof r)) {
                if (t)
                    return fc(t, r)
            } else if (ic && e)
                return e.delete(r);
            return !1
        },
        get: function(r) {
            return sc && r && ("object" == typeof r || "function" == typeof r) && t ? uc(t, r) : e && e.get(r)
        },
        has: function(r) {
            return sc && r && ("object" == typeof r || "function" == typeof r) && t ? pc(t, r) : !!e && e.has(r)
        },
        set: function(r, n) {
            sc && r && ("object" == typeof r || "function" == typeof r) ? (t || (t = new sc),
            cc(t, r, n)) : ic && (e || (e = ic()),
            e.set(r, n))
        }
    };
    return r
}
: ic) || Ga || function() {
    var t, e = {
        assert: function(t) {
            if (!e.has(t))
                throw new hr("Side channel does not contain " + yr(t))
        },
        delete: function(e) {
            var r = t && t.next
              , n = function(t, e) {
                if (t)
                    return dr(t, e, !0)
            }(t, e);
            return n && r && r === n && (t = void 0),
            !!n
        },
        get: function(e) {
            return function(t, e) {
                if (t) {
                    var r = dr(t, e);
                    return r && r.value
                }
            }(t, e)
        },
        has: function(e) {
            return function(t, e) {
                return !!t && !!dr(t, e)
            }(t, e)
        },
        set: function(e, r) {
            t || (t = {
                next: void 0
            }),
            function(t, e, r) {
                var n = dr(t, e);
                n ? n.value = r : t.next = {
                    key: e,
                    next: t.next,
                    value: r
                }
            }(t, e, r)
        }
    };
    return e
}
  , dc = String.prototype.replace
  , gc = /%20/g
  , mc = "RFC3986"
  , bc = {
    default: mc,
    formatters: {
        RFC1738: function(t) {
            return dc.call(t, gc, "+")
        },
        RFC3986: function(t) {
            return String(t)
        }
    },
    RFC1738: "RFC1738",
    RFC3986: mc
}
  , vc = bc
  , Sc = Object.prototype.hasOwnProperty
  , wc = Array.isArray
  , Ec = function() {
    for (var t = [], e = 0; e < 256; ++e)
        t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    return t
}()
  , Ac = function(t, e) {
    for (var r = e && e.plainObjects ? {
        __proto__: null
    } : {}, n = 0; n < t.length; ++n)
        void 0 !== t[n] && (r[n] = t[n]);
    return r
}
  , Oc = 1024
  , Tc = {
    arrayToObject: Ac,
    assign: function(t, e) {
        return Object.keys(e).reduce((function(t, r) {
            return t[r] = e[r],
            t
        }
        ), t)
    },
    combine: function(t, e) {
        return [].concat(t, e)
    },
    compact: function(t) {
        for (var e = [{
            obj: {
                o: t
            },
            prop: "o"
        }], r = [], n = 0; n < e.length; ++n)
            for (var o = e[n], i = o.obj[o.prop], a = Object.keys(i), s = 0; s < a.length; ++s) {
                var u = a[s]
                  , c = i[u];
                "object" == typeof c && null !== c && -1 === r.indexOf(c) && (e.push({
                    obj: i,
                    prop: u
                }),
                r.push(c))
            }
        return function(t) {
            for (; t.length > 1; ) {
                var e = t.pop()
                  , r = e.obj[e.prop];
                if (wc(r)) {
                    for (var n = [], o = 0; o < r.length; ++o)
                        void 0 !== r[o] && n.push(r[o]);
                    e.obj[e.prop] = n
                }
            }
        }(e),
        t
    },
    decode: function(t, e, r) {
        var n = t.replace(/\+/g, " ");
        if ("iso-8859-1" === r)
            return n.replace(/%[0-9a-f]{2}/gi, unescape);
        try {
            return decodeURIComponent(n)
        } catch (np) {
            return n
        }
    },
    encode: function(t, e, r, n, o) {
        if (0 === t.length)
            return t;
        var i = t;
        if ("symbol" == typeof t ? i = Symbol.prototype.toString.call(t) : "string" != typeof t && (i = String(t)),
        "iso-8859-1" === r)
            return escape(i).replace(/%u[0-9a-f]{4}/gi, (function(t) {
                return "%26%23" + parseInt(t.slice(2), 16) + "%3B"
            }
            ));
        for (var a = "", s = 0; s < i.length; s += Oc) {
            for (var u = i.length >= Oc ? i.slice(s, s + Oc) : i, c = [], p = 0; p < u.length; ++p) {
                var f = u.charCodeAt(p);
                45 === f || 46 === f || 95 === f || 126 === f || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || o === vc.RFC1738 && (40 === f || 41 === f) ? c[c.length] = u.charAt(p) : f < 128 ? c[c.length] = Ec[f] : f < 2048 ? c[c.length] = Ec[192 | f >> 6] + Ec[128 | 63 & f] : f < 55296 || f >= 57344 ? c[c.length] = Ec[224 | f >> 12] + Ec[128 | f >> 6 & 63] + Ec[128 | 63 & f] : (p += 1,
                f = 65536 + ((1023 & f) << 10 | 1023 & u.charCodeAt(p)),
                c[c.length] = Ec[240 | f >> 18] + Ec[128 | f >> 12 & 63] + Ec[128 | f >> 6 & 63] + Ec[128 | 63 & f])
            }
            a += c.join("")
        }
        return a
    },
    isBuffer: function(t) {
        return !(!t || "object" != typeof t) && !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
    },
    isRegExp: function(t) {
        return "[object RegExp]" === Object.prototype.toString.call(t)
    },
    maybeMap: function(t, e) {
        if (wc(t)) {
            for (var r = [], n = 0; n < t.length; n += 1)
                r.push(e(t[n]));
            return r
        }
        return e(t)
    },
    merge: function t(e, r, n) {
        if (!r)
            return e;
        if ("object" != typeof r && "function" != typeof r) {
            if (wc(e))
                e.push(r);
            else {
                if (!e || "object" != typeof e)
                    return [e, r];
                (n && (n.plainObjects || n.allowPrototypes) || !Sc.call(Object.prototype, r)) && (e[r] = !0)
            }
            return e
        }
        if (!e || "object" != typeof e)
            return [e].concat(r);
        var o = e;
        return wc(e) && !wc(r) && (o = Ac(e, n)),
        wc(e) && wc(r) ? (r.forEach((function(r, o) {
            if (Sc.call(e, o)) {
                var i = e[o];
                i && "object" == typeof i && r && "object" == typeof r ? e[o] = t(i, r, n) : e.push(r)
            } else
                e[o] = r
        }
        )),
        e) : Object.keys(r).reduce((function(e, o) {
            var i = r[o];
            return Sc.call(e, o) ? e[o] = t(e[o], i, n) : e[o] = i,
            e
        }
        ), o)
    }
}
  , jc = function() {
    var t, e = {
        assert: function(t) {
            if (!e.has(t))
                throw new lc("Side channel does not contain " + yc(t))
        },
        delete: function(e) {
            return !!t && t.delete(e)
        },
        get: function(e) {
            return t && t.get(e)
        },
        has: function(e) {
            return !!t && t.has(e)
        },
        set: function(e, r) {
            t || (t = hc()),
            t.set(e, r)
        }
    };
    return e
}
  , Pc = Tc
  , Ic = bc
  , xc = Object.prototype.hasOwnProperty
  , Rc = {
    brackets: function(t) {
        return t + "[]"
    },
    comma: "comma",
    indices: function(t, e) {
        return t + "[" + e + "]"
    },
    repeat: function(t) {
        return t
    }
}
  , Dc = Array.isArray
  , _c = Array.prototype.push
  , Bc = function(t, e) {
    _c.apply(t, Dc(e) ? e : [e])
}
  , Nc = Date.prototype.toISOString
  , Mc = Ic.default
  , Fc = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    commaRoundTrip: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: Pc.encode,
    encodeValuesOnly: !1,
    filter: void 0,
    format: Mc,
    formatter: Ic.formatters[Mc],
    indices: !1,
    serializeDate: function(t) {
        return Nc.call(t)
    },
    skipNulls: !1,
    strictNullHandling: !1
}
  , Vc = {}
  , Uc = function t(e, r, n, o, i, a, s, u, c, p, f, l, y, h, d, g, m, b) {
    for (var v, S = e, w = b, E = 0, A = !1; void 0 !== (w = w.get(Vc)) && !A; ) {
        var O = w.get(e);
        if (E += 1,
        void 0 !== O) {
            if (O === E)
                throw new RangeError("Cyclic object value");
            A = !0
        }
        void 0 === w.get(Vc) && (E = 0)
    }
    if ("function" == typeof p ? S = p(r, S) : S instanceof Date ? S = y(S) : "comma" === n && Dc(S) && (S = Pc.maybeMap(S, (function(t) {
        return t instanceof Date ? y(t) : t
    }
    ))),
    null === S) {
        if (a)
            return c && !g ? c(r, Fc.encoder, m, "key", h) : r;
        S = ""
    }
    if ("string" == typeof (v = S) || "number" == typeof v || "boolean" == typeof v || "symbol" == typeof v || "bigint" == typeof v || Pc.isBuffer(S))
        return c ? [d(g ? r : c(r, Fc.encoder, m, "key", h)) + "=" + d(c(S, Fc.encoder, m, "value", h))] : [d(r) + "=" + d(String(S))];
    var T, j = [];
    if (void 0 === S)
        return j;
    if ("comma" === n && Dc(S))
        g && c && (S = Pc.maybeMap(S, c)),
        T = [{
            value: S.length > 0 ? S.join(",") || null : void 0
        }];
    else if (Dc(p))
        T = p;
    else {
        var P = Object.keys(S);
        T = f ? P.sort(f) : P
    }
    var I = u ? String(r).replace(/\./g, "%2E") : String(r)
      , x = o && Dc(S) && 1 === S.length ? I + "[]" : I;
    if (i && Dc(S) && 0 === S.length)
        return x + "[]";
    for (var R = 0; R < T.length; ++R) {
        var D = T[R]
          , _ = "object" == typeof D && D && void 0 !== D.value ? D.value : S[D];
        if (!s || null !== _) {
            var B = l && u ? String(D).replace(/\./g, "%2E") : String(D)
              , N = Dc(S) ? "function" == typeof n ? n(x, B) : x : x + (l ? "." + B : "[" + B + "]");
            b.set(e, E);
            var M = jc();
            M.set(Vc, b),
            Bc(j, t(_, N, n, o, i, a, s, u, "comma" === n && g && Dc(S) ? null : c, p, f, l, y, h, d, g, m, M))
        }
    }
    return j
}
  , kc = Tc
  , Cc = Object.prototype.hasOwnProperty
  , Lc = Array.isArray
  , qc = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: kc.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1,
    throwOnLimitExceeded: !1
}
  , Wc = function(t) {
    return t.replace(/&#(\d+);/g, (function(t, e) {
        return String.fromCharCode(parseInt(e, 10))
    }
    ))
}
  , Hc = function(t, e, r) {
    if (t && "string" == typeof t && e.comma && t.indexOf(",") > -1)
        return t.split(",");
    if (e.throwOnLimitExceeded && r >= e.arrayLimit)
        throw new RangeError("Array limit exceeded. Only " + e.arrayLimit + " element" + (1 === e.arrayLimit ? "" : "s") + " allowed in an array.");
    return t
}
  , $c = function(t, e, r, n) {
    if (t) {
        var o = r.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t
          , i = /(\[[^[\]]*])/g
          , a = r.depth > 0 && /(\[[^[\]]*])/.exec(o)
          , s = a ? o.slice(0, a.index) : o
          , u = [];
        if (s) {
            if (!r.plainObjects && Cc.call(Object.prototype, s) && !r.allowPrototypes)
                return;
            u.push(s)
        }
        for (var c = 0; r.depth > 0 && null !== (a = i.exec(o)) && c < r.depth; ) {
            if (c += 1,
            !r.plainObjects && Cc.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes)
                return;
            u.push(a[1])
        }
        if (a) {
            if (!0 === r.strictDepth)
                throw new RangeError("Input depth exceeded depth option of " + r.depth + " and strictDepth is true");
            u.push("[" + o.slice(a.index) + "]")
        }
        return function(t, e, r, n) {
            var o = 0;
            if (t.length > 0 && "[]" === t[t.length - 1]) {
                var i = t.slice(0, -1).join("");
                o = Array.isArray(e) && e[i] ? e[i].length : 0
            }
            for (var a = n ? e : Hc(e, r, o), s = t.length - 1; s >= 0; --s) {
                var u, c = t[s];
                if ("[]" === c && r.parseArrays)
                    u = r.allowEmptyArrays && ("" === a || r.strictNullHandling && null === a) ? [] : kc.combine([], a);
                else {
                    u = r.plainObjects ? {
                        __proto__: null
                    } : {};
                    var p = "[" === c.charAt(0) && "]" === c.charAt(c.length - 1) ? c.slice(1, -1) : c
                      , f = r.decodeDotInKeys ? p.replace(/%2E/g, ".") : p
                      , l = parseInt(f, 10);
                    r.parseArrays || "" !== f ? !isNaN(l) && c !== f && String(l) === f && l >= 0 && r.parseArrays && l <= r.arrayLimit ? (u = [])[l] = a : "__proto__" !== f && (u[f] = a) : u = {
                        0: a
                    }
                }
                a = u
            }
            return a
        }(u, e, r, n)
    }
};
const Gc = r({
    formats: bc,
    parse: function(t, e) {
        var r = function(t) {
            if (!t)
                return qc;
            if (void 0 !== t.allowEmptyArrays && "boolean" != typeof t.allowEmptyArrays)
                throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
            if (void 0 !== t.decodeDotInKeys && "boolean" != typeof t.decodeDotInKeys)
                throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
            if (null !== t.decoder && void 0 !== t.decoder && "function" != typeof t.decoder)
                throw new TypeError("Decoder has to be a function.");
            if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset)
                throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            if (void 0 !== t.throwOnLimitExceeded && "boolean" != typeof t.throwOnLimitExceeded)
                throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
            var e = void 0 === t.charset ? qc.charset : t.charset
              , r = void 0 === t.duplicates ? qc.duplicates : t.duplicates;
            if ("combine" !== r && "first" !== r && "last" !== r)
                throw new TypeError("The duplicates option must be either combine, first, or last");
            return {
                allowDots: void 0 === t.allowDots ? !0 === t.decodeDotInKeys || qc.allowDots : !!t.allowDots,
                allowEmptyArrays: "boolean" == typeof t.allowEmptyArrays ? !!t.allowEmptyArrays : qc.allowEmptyArrays,
                allowPrototypes: "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : qc.allowPrototypes,
                allowSparse: "boolean" == typeof t.allowSparse ? t.allowSparse : qc.allowSparse,
                arrayLimit: "number" == typeof t.arrayLimit ? t.arrayLimit : qc.arrayLimit,
                charset: e,
                charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : qc.charsetSentinel,
                comma: "boolean" == typeof t.comma ? t.comma : qc.comma,
                decodeDotInKeys: "boolean" == typeof t.decodeDotInKeys ? t.decodeDotInKeys : qc.decodeDotInKeys,
                decoder: "function" == typeof t.decoder ? t.decoder : qc.decoder,
                delimiter: "string" == typeof t.delimiter || kc.isRegExp(t.delimiter) ? t.delimiter : qc.delimiter,
                depth: "number" == typeof t.depth || !1 === t.depth ? +t.depth : qc.depth,
                duplicates: r,
                ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
                interpretNumericEntities: "boolean" == typeof t.interpretNumericEntities ? t.interpretNumericEntities : qc.interpretNumericEntities,
                parameterLimit: "number" == typeof t.parameterLimit ? t.parameterLimit : qc.parameterLimit,
                parseArrays: !1 !== t.parseArrays,
                plainObjects: "boolean" == typeof t.plainObjects ? t.plainObjects : qc.plainObjects,
                strictDepth: "boolean" == typeof t.strictDepth ? !!t.strictDepth : qc.strictDepth,
                strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : qc.strictNullHandling,
                throwOnLimitExceeded: "boolean" == typeof t.throwOnLimitExceeded && t.throwOnLimitExceeded
            }
        }(e);
        if ("" === t || null == t)
            return r.plainObjects ? {
                __proto__: null
            } : {};
        for (var n = "string" == typeof t ? function(t, e) {
            var r = {
                __proto__: null
            }
              , n = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
            n = n.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
            var o = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit
              , i = n.split(e.delimiter, e.throwOnLimitExceeded ? o + 1 : o);
            if (e.throwOnLimitExceeded && i.length > o)
                throw new RangeError("Parameter limit exceeded. Only " + o + " parameter" + (1 === o ? "" : "s") + " allowed.");
            var a, s = -1, u = e.charset;
            if (e.charsetSentinel)
                for (a = 0; a < i.length; ++a)
                    0 === i[a].indexOf("utf8=") && ("utf8=%E2%9C%93" === i[a] ? u = "utf-8" : "utf8=%26%2310003%3B" === i[a] && (u = "iso-8859-1"),
                    s = a,
                    a = i.length);
            for (a = 0; a < i.length; ++a)
                if (a !== s) {
                    var c, p, f = i[a], l = f.indexOf("]="), y = -1 === l ? f.indexOf("=") : l + 1;
                    -1 === y ? (c = e.decoder(f, qc.decoder, u, "key"),
                    p = e.strictNullHandling ? null : "") : (c = e.decoder(f.slice(0, y), qc.decoder, u, "key"),
                    p = kc.maybeMap(Hc(f.slice(y + 1), e, Lc(r[c]) ? r[c].length : 0), (function(t) {
                        return e.decoder(t, qc.decoder, u, "value")
                    }
                    ))),
                    p && e.interpretNumericEntities && "iso-8859-1" === u && (p = Wc(String(p))),
                    f.indexOf("[]=") > -1 && (p = Lc(p) ? [p] : p);
                    var h = Cc.call(r, c);
                    h && "combine" === e.duplicates ? r[c] = kc.combine(r[c], p) : h && "last" !== e.duplicates || (r[c] = p)
                }
            return r
        }(t, r) : t, o = r.plainObjects ? {
            __proto__: null
        } : {}, i = Object.keys(n), a = 0; a < i.length; ++a) {
            var s = i[a]
              , u = $c(s, n[s], r, "string" == typeof t);
            o = kc.merge(o, u, r)
        }
        return !0 === r.allowSparse ? o : kc.compact(o)
    },
    stringify: function(t, e) {
        var r, n = t, o = function(t) {
            if (!t)
                return Fc;
            if (void 0 !== t.allowEmptyArrays && "boolean" != typeof t.allowEmptyArrays)
                throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
            if (void 0 !== t.encodeDotInKeys && "boolean" != typeof t.encodeDotInKeys)
                throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
            if (null !== t.encoder && void 0 !== t.encoder && "function" != typeof t.encoder)
                throw new TypeError("Encoder has to be a function.");
            var e = t.charset || Fc.charset;
            if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset)
                throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var r = Ic.default;
            if (void 0 !== t.format) {
                if (!xc.call(Ic.formatters, t.format))
                    throw new TypeError("Unknown format option provided.");
                r = t.format
            }
            var n, o = Ic.formatters[r], i = Fc.filter;
            if (("function" == typeof t.filter || Dc(t.filter)) && (i = t.filter),
            n = t.arrayFormat in Rc ? t.arrayFormat : "indices"in t ? t.indices ? "indices" : "repeat" : Fc.arrayFormat,
            "commaRoundTrip"in t && "boolean" != typeof t.commaRoundTrip)
                throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
            var a = void 0 === t.allowDots ? !0 === t.encodeDotInKeys || Fc.allowDots : !!t.allowDots;
            return {
                addQueryPrefix: "boolean" == typeof t.addQueryPrefix ? t.addQueryPrefix : Fc.addQueryPrefix,
                allowDots: a,
                allowEmptyArrays: "boolean" == typeof t.allowEmptyArrays ? !!t.allowEmptyArrays : Fc.allowEmptyArrays,
                arrayFormat: n,
                charset: e,
                charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : Fc.charsetSentinel,
                commaRoundTrip: !!t.commaRoundTrip,
                delimiter: void 0 === t.delimiter ? Fc.delimiter : t.delimiter,
                encode: "boolean" == typeof t.encode ? t.encode : Fc.encode,
                encodeDotInKeys: "boolean" == typeof t.encodeDotInKeys ? t.encodeDotInKeys : Fc.encodeDotInKeys,
                encoder: "function" == typeof t.encoder ? t.encoder : Fc.encoder,
                encodeValuesOnly: "boolean" == typeof t.encodeValuesOnly ? t.encodeValuesOnly : Fc.encodeValuesOnly,
                filter: i,
                format: r,
                formatter: o,
                serializeDate: "function" == typeof t.serializeDate ? t.serializeDate : Fc.serializeDate,
                skipNulls: "boolean" == typeof t.skipNulls ? t.skipNulls : Fc.skipNulls,
                sort: "function" == typeof t.sort ? t.sort : null,
                strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : Fc.strictNullHandling
            }
        }(e);
        "function" == typeof o.filter ? n = (0,
        o.filter)("", n) : Dc(o.filter) && (r = o.filter);
        var i = [];
        if ("object" != typeof n || null === n)
            return "";
        var a = Rc[o.arrayFormat]
          , s = "comma" === a && o.commaRoundTrip;
        r || (r = Object.keys(n)),
        o.sort && r.sort(o.sort);
        for (var u = jc(), c = 0; c < r.length; ++c) {
            var p = r[c]
              , f = n[p];
            o.skipNulls && null === f || Bc(i, Uc(f, p, a, s, o.allowEmptyArrays, o.strictNullHandling, o.skipNulls, o.encodeDotInKeys, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset, u))
        }
        var l = i.join(o.delimiter)
          , y = !0 === o.addQueryPrefix ? "?" : "";
        return o.charsetSentinel && ("iso-8859-1" === o.charset ? y += "utf8=%26%2310003%3B&" : y += "utf8=%E2%9C%93&"),
        l.length > 0 ? y + l : ""
    }
});
var zc = {
    VITE_APP_NAME: "Palm_Cloud_Phone",
    VITE_APP_TAG: "掌派",
    VITE_APP_ENG: "palmderive",
    VITE_OFFICIAL: "www.palmderive.com",
    VITE_WEB_BASE_URL: "https://www.palmderive.com",
    VITE_H5_URL: "https://h5.palmderive.com/h5app/#/",
    VITE_CID: "50000",
    VITE_BUY_TEXT: "customize.subscribe",
    VITE_RENEW_TEXT: "customize.continuedTime",
    VITE_KF_TEXT: "online_customer_service",
    VITE_DEFAULT_CHANNEL_CODE: "h5_cphone",
    VITE_REQ_TIMEOUT: "20000",
    VITE_SALT_STR: "Ka*xQ@W7%SrPnYR3P%5*udF=yrpewQQN",
    VITE_HAS_TRANSACTION: "true",
    VITE_HAS_GZH: "true",
    VITE_SELECTED_THEME: "themesDefault",
    VITE_PRIMARY_COLOR: "#3fc281",
    VITE_STATIC_DIR: "palmderive",
    VITE_NUMBER_NAME: "掌派云手机",
    VITE_POSTER_URL: "https://a.palmderive.com/img/PullNew.png",
    VITE_HIDDEN_DISCOVER: "1",
    VITE_BASE_URL: "https://api.palmderive.com",
    VITE_CORE_BASE_URL: "https://c.palmderive.com",
    VITE_PAY_BASE_URL: "https://pay.palmderive.com",
    VITE_SCREENSHOT_BASE_URL: "https://command.palmderive.com",
    VITE_REPORT_BASE_URL: "https://bpoint.palmderive.com",
    VITE_IS_PROD: "true",
    VITE_CJS_IGNORE_WARNING: "true",
    VITE_USER_NODE_ENV: "production",
    VITE_ROOT_DIR: "/data/lampp/h5/git/web-activity-project/laxin",
    BASE_URL: "./",
    MODE: "production",
    DEV: !1,
    PROD: !0,
    SSR: !1
};
const Kc = "https://h5.palmderive.com/h5app/#/";
function Jc(t, e) {
    let r = decodeURIComponent(e);
    r = r.substring(1, r.length);
    let n = r.split("&")
      , o = new Object;
    for (var i = 0; i < n.length; i++) {
        var a = n[i].split("=");
        o[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
    }
    return o[t]
}
const Zc = async t => {
    var e;
    let r = "https://api.palmderive.com"
      , u = {}
      , c = "";
    if (window.Android) {
        let t = window.Android.getUserInfo();
        u = JSON.parse(t),
        c = u.token || ""
    } else
        u.userId = Jc("userId", window.location.href),
        u.userId ? (u.cid = Jc("cid", window.location.href),
        u.cuid = Jc("cuid", window.location.href),
        c = Jc("token", window.location.href)) : (u.userId = n.get("actUserId"),
        u.cid = n.get("actCid"),
        u.cuid = n.get("actCuid"),
        c = n.get("actToken"));
    n.set("actUserId", u.userId),
    n.set("actToken", c),
    n.set("actCid", u.cid),
    n.set("actCuid", u.cuid);
    const p = await async function() {
        return (await s()).deviceId
    }()
      , f = Date.now() + "";
    let l = {
        cuid: u.cuid || p,
        ts: f,
        userId: u.userId || "",
        cid: u.cid || "50000",
        chnl: u.chnl || "h5_cphone",
        cver: u.cver || 1e4
    }
      , y = JSON.parse(JSON.stringify(l));
    const h = zc.VITE_ISMAILBOX
      , d = n.get("language");
    if (1 == h)
        if (d)
            switch (d) {
            case "zh":
                y.locale = "zh-CN";
                break;
            case "en":
                y.locale = "en-US";
                break;
            case "tw":
                y.locale = "zh-TW"
            }
        else
            y.locale = "zh-TW";
    t.isCore && (r = "https://c.palmderive.com"),
    t.isBpoint && (r = "https://bpoint.palmderive.com"),
    t.isDevice && (r = "https://command.palmderive.com"),
    t.isPay && (r = "https://pay.palmderive.com"),
    t.uploadUrl && (r = t.uploadUrl),
    t.isImage && (t.responseType = "arraybuffer"),
    t.data && (y = {
        ...t.data,
        ...y
    });
    let g = ( (t, e) => {
        let r = Object.keys(t).sort(( (t, e) => t.localeCompare(e)));
        e && (r = r.filter((t => "file" !== t)));
        let n = "";
        for (let o = 0; o < r.length; o++) {
            const e = r[o]
              , i = t[e];
            n += ut(e) + "=" + ut(i),
            o < r.length - 1 && (n += "&")
        }
        return n
    }
    )(y, t.isFile);
    let m = {
        "x-signature": lt(g += "Ka*xQ@W7%SrPnYR3P%5*udF=yrpewQQN").slice(4, 20),
        "Content-Type": "application/x-www-form-urlencoded"
    };
    if ("get" === (null == (e = t.method) ? void 0 : e.toLocaleLowerCase()))
        t.data = {
            ...t.data,
            ...y
        };
    else {
        const e = function(t) {
            let e = new FormData;
            if (t) {
                const r = Object.entries(t);
                for (const [t,n] of r)
                    "object" == typeof n && (n instanceof Blob || n instanceof File) ? e.append(t, n) : e.append(`${t}`, `${n}`)
            }
            return e
        }(y)
          , r = Gc.stringify(y);
        t.isFile ? t.data = e : t.data = r
    }
    c && (m.Authorization = `Bearer ${c}`);
    const b = `${r}${t.url}`
      , v = t.method;
    return new Promise(( (e, r) => {
        o({
            url: b,
            data: t.data,
            method: v,
            responseType: t.responseType,
            timeout: "20000",
            header: {
                ...m
            },
            callback: "",
            success: r => {
                if (!r.data)
                    return e(null);
                switch (r.statusCode) {
                case 200:
                    return 0 === r.data.code || t.uploadUrl || t.isImage || 107062 === r.data.code || 101091 === r.data.code || 106002 === r.data.code || 106004 === r.data.code ? e(r.data) : (a({
                        title: r.data.msg,
                        icon: "none",
                        duration: 2e3
                    }),
                    100025 === r.data.code || 100007 === r.data.code ? void (window.Android ? window.Android.login() : (alert("您暂未登录，请先登录"),
                    window.location.href = Kc)) : void 0);
                case 400:
                    return console.error(r.data.msg),
                    e(r.data);
                case 401:
                case 400401:
                default:
                    return e(r.data);
                case 402:
                case 403:
                case 404:
                    return i({
                        url: "/pages/login/empty"
                    }),
                    null
                }
            }
            ,
            fail: t => {
                r(t),
                a({
                    icon: "error",
                    title: "网络错误"
                })
            }
            ,
            complete: t => {
                let e = t.data.code;
                if (t.data.msg,
                404 == e)
                    return i({
                        url: "/pages/login/empty"
                    }),
                    null;
                100019 == e && (window.Android ? window.Android.login() : (alert("您暂未登录，请先登录"),
                window.location.href = Kc))
            }
        })
    }
    ))
}
  , Qc = t => Zc({
    url: "/cpCgw/mkt/act/ranking",
    method: "POST",
    data: t
})
  , Yc = t => Zc({
    url: "/cpCgw/mkt/act/activityInfo",
    method: "GET",
    data: t
})
  , Xc = t => Zc({
    url: "/cpCgw/mkt/act/invitedDetail",
    method: "POST",
    data: t
})
  , tp = t => Zc({
    url: "/cpCgw/mkt/act/invitedInfo",
    method: "POST",
    data: t
})
  , ep = t => Zc({
    url: "/cpCgw/mkt/act/awardInfo",
    method: "POST",
    data: t
})
  , rp = t => Zc({
    url: "/cpCgw/mkt/act/slideData",
    method: "POST",
    data: t
});
export {tp as a, rp as b, Qc as c, Zc as d, Xc as e, ep as g, Yc as r, st as v};
