/*!
 * Tiny Commercial License Key Manager
 *
 * Copyright (c) 2025 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 8.3.0-112
 */
/*!
 * This resource uses the code from the following libraries:
 *
 * jose
 *  Copyright (c) Filip Skokan.
 *  https://github.com/panva/jose
 *
 * x509
 *  Copyright (c) Peculiar Ventures.
 *  https://github.com/PeculiarVentures/x509
 *
 * protobuf
 *  Copyright 2021-2024 Buf Technologies, Inc.
 *  https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf
 *
 */
(function () {
	"use strict";

	function e(e, t, r, n) {
		var i;
		var o = arguments.length;
		var s =
			o < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, r)) : n;
		if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
			s = Reflect.decorate(e, t, r, n);
		} else {
			for (var a = e.length - 1; a >= 0; a--) {
				if ((i = e[a])) {
					s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s;
				}
			}
		}
		if (o > 3 && s) {
			Object.defineProperty(t, r, s);
		}
		return s;
	}
	if (typeof SuppressedError == "function") {
		SuppressedError;
	}
	const t = (e) => (t) =>
		((e) => {
			const t = typeof e;
			if (e === null) {
				return "null";
			} else if (t === "object" && Array.isArray(e)) {
				return "array";
			} else if (
				t === "object" &&
				((r = n = e),
				(i = String).prototype.isPrototypeOf(r) ||
					n.constructor?.name === i.name)
			) {
				return "string";
			} else {
				return t;
			}
			var r;
			var n;
			var i;
		})(t) === e;
	const r = t("string");
	const n = t("object");
	const i = (e) => !((e) => e == null)(e);
	const o = () => {};
	const s = (e) => () => e;
	const a = (e) => e;
	const c = (e) => e();
	const l = s(false);
	const u = s(true);
	class p {
		tag;
		value;
		static singletonNone = new p(false);
		constructor(e, t) {
			this.tag = e;
			this.value = t;
		}
		static some(e) {
			return new p(true, e);
		}
		static none() {
			return p.singletonNone;
		}
		fold(e, t) {
			if (this.tag) {
				return t(this.value);
			} else {
				return e();
			}
		}
		isSome() {
			return this.tag;
		}
		isNone() {
			return !this.tag;
		}
		map(e) {
			if (this.tag) {
				return p.some(e(this.value));
			} else {
				return p.none();
			}
		}
		bind(e) {
			if (this.tag) {
				return e(this.value);
			} else {
				return p.none();
			}
		}
		exists(e) {
			return this.tag && e(this.value);
		}
		forall(e) {
			return !this.tag || e(this.value);
		}
		filter(e) {
			if (!this.tag || e(this.value)) {
				return this;
			} else {
				return p.none();
			}
		}
		getOr(e) {
			if (this.tag) {
				return this.value;
			} else {
				return e;
			}
		}
		or(e) {
			if (this.tag) {
				return this;
			} else {
				return e;
			}
		}
		getOrThunk(e) {
			if (this.tag) {
				return this.value;
			} else {
				return e();
			}
		}
		orThunk(e) {
			if (this.tag) {
				return this;
			} else {
				return e();
			}
		}
		getOrDie(e) {
			if (this.tag) {
				return this.value;
			}
			throw new Error(e ?? "Called getOrDie on None");
		}
		static from(e) {
			if (i(e)) {
				return p.some(e);
			} else {
				return p.none();
			}
		}
		getOrNull() {
			if (this.tag) {
				return this.value;
			} else {
				return null;
			}
		}
		getOrUndefined() {
			return this.value;
		}
		each(e) {
			if (this.tag) {
				e(this.value);
			}
		}
		toArray() {
			if (this.tag) {
				return [this.value];
			} else {
				return [];
			}
		}
		toString() {
			if (this.tag) {
				return `some(${this.value})`;
			} else {
				return "none()";
			}
		}
	}
	const h = Array.prototype.indexOf;
	const f = (e, t) => {
		for (let r = 0, n = e.length; r < n; r++) {
			if (t(e[r], r)) {
				return true;
			}
		}
		return false;
	};
	const d = (e, t) => {
		const r = e.length;
		const n = new Array(r);
		for (let i = 0; i < r; i++) {
			const r = e[i];
			n[i] = t(r, i);
		}
		return n;
	};
	const y = Object.hasOwnProperty;
	const m = (e) => {
		const t = (t) => t(e);
		const r = s(e);
		const n = () => i;
		const i = {
			tag: true,
			inner: e,
			fold: (t, r) => r(e),
			isValue: u,
			isError: l,
			map: (t) => v.value(t(e)),
			mapError: n,
			bind: t,
			exists: t,
			forall: t,
			getOr: r,
			or: n,
			getOrThunk: r,
			orThunk: n,
			getOrDie: r,
			each: (t) => {
				t(e);
			},
			toOptional: () => p.some(e),
		};
		return i;
	};
	const g = (e) => {
		const t = () => r;
		const r = {
			tag: false,
			inner: e,
			fold: (t, r) => t(e),
			isValue: l,
			isError: u,
			map: t,
			mapError: (t) => v.error(t(e)),
			bind: t,
			exists: l,
			forall: u,
			getOr: a,
			or: a,
			getOrThunk: c,
			orThunk: c,
			getOrDie:
				((n = String(e)),
				() => {
					throw new Error(n);
				}),
			each: o,
			toOptional: p.none,
		};
		var n;
		return r;
	};
	const v = {
		value: m,
		error: g,
		fromOption: (e, t) => e.fold(() => g(t), m),
	};
	const b = (e, t) => (e ? p.some(t) : p.none());
	const E = (e) => {
		let t;
		let r = false;
		return (...n) => {
			if (!r) {
				r = true;
				t = e.apply(null, n);
			}
			return t;
		};
	};
	const w = (e, t) => {
		const { type: r, message: n } = t;
		e.notificationManager.open({
			type: r,
			text: n,
		});
	};
	const S = (e) => {
		((e) => {
			switch (e) {
				case "error":
					return console.error;
				case "info":
					return console.info;
				case "warn":
					return console.warn;
				default:
					return console.log;
			}
		})(e.type)(e.message);
	};
	const A = (e, t) => {
		const { console: r, editor: n } = t;
		if (i(n)) {
			if (e._skinLoaded) {
				w(e, n);
			} else {
				e.on("SkinLoaded", () => {
					w(e, n);
				});
			}
		}
		if (i(r)) {
			S(r);
		}
	};
	const N = (e) => parseInt(e, 10);
	const T = (e, t) => {
		const r = e - t;
		if (r === 0) {
			return 0;
		} else if (r > 0) {
			return 1;
		} else {
			return -1;
		}
	};
	const O = (e, t, r) => ({
		major: e,
		minor: t,
		patch: r,
	});
	const I = (e) => {
		const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
		if (t) {
			return O(N(t[1]), N(t[2]), N(t[3]));
		} else {
			return O(0, 0, 0);
		}
	};
	const k = (e, t) => {
		const r = T(e.major, t.major);
		if (r !== 0) {
			return r;
		}
		const n = T(e.minor, t.minor);
		if (n !== 0) {
			return n;
		}
		const i = T(e.patch, t.patch);
		if (i !== 0) {
			return i;
		} else {
			return 0;
		}
	};
	x = [0];
	const B = (e, t) => {
		const r = k(e, t);
		n = x;
		i = r;
		return h.call(n, i) > -1;
		var n;
		var i;
	};
	var x;
	const _0x2c56ee = (_0x3d8ae1) =>
		I(
			((_0x3c881a) =>
				[_0x3c881a.majorVersion, _0x3c881a.minorVersion]
					.join(".")
					.split(".")
					.slice(0, 3)
					.join("."))(_0x3d8ae1),
		);
	const _0x3040cd = (_0x17658a, _0x3a071b) =>
		!!_0x17658a && k(_0x2c56ee(_0x17658a), I(_0x3a071b)) === -1;
	const _0x5f0b94 = I("8.3.0");
	const _0x3c7e1e = `${_0x5f0b94.major}.${_0x5f0b94.minor}.0`;
	const _0x4736ec = `${_0x5f0b94.major + 1}.0.0`;
	const _0x2a81b9 = (_0x2586f6, _0x5aa42e) => {
		try {
			return v.value(_0x2586f6());
		} catch (_0x507be6) {
			return v.error(_0x5aa42e(_0x507be6));
		}
	};
	const _0x14826e = (_0x6830b3) => (_0x2a334b) =>
		_0x2a334b instanceof Error ? _0x2a334b : new Error(_0x6830b3);
	new window.TextEncoder();
	new window.TextDecoder();
	const _0x3f9df1 = (_0x164af9) =>
		_0x2a81b9(
			() =>
				((_0x9e149c) => {
					const _0x441d2f = window.atob(_0x9e149c);
					return Uint8Array.from(_0x441d2f, (_0x417aae) =>
						_0x417aae.charCodeAt(0),
					);
				})(_0x164af9.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")),
			_0x14826e("Unable to decode base64 url"),
		);
	var _0x28ac07;
	(function (_0x10ae82) {
		_0x10ae82.FormatInvalid = "jws_format_invalid";
		_0x10ae82.DecodeFailure = "jws_decode_failure";
	})((_0x28ac07 ||= {}));
	function F(e, t) {
		return (
			e !== null &&
			typeof e == "object" &&
			!!("$typeName" in e) &&
			typeof e.$typeName == "string" &&
			(t === undefined || t.typeName === e.$typeName)
		);
	}
	var M;
	function H() {
		let e = 0;
		let t = 0;
		for (let r = 0; r < 28; r += 7) {
			let n = this.buf[this.pos++];
			e |= (n & 127) << r;
			if (!(n & 128)) {
				this.assertBounds();
				return [e, t];
			}
		}
		let r = this.buf[this.pos++];
		e |= (r & 15) << 28;
		t = (r & 112) >> 4;
		if (!(r & 128)) {
			this.assertBounds();
			return [e, t];
		}
		for (let r = 3; r <= 31; r += 7) {
			let n = this.buf[this.pos++];
			t |= (n & 127) << r;
			if (!(n & 128)) {
				this.assertBounds();
				return [e, t];
			}
		}
		throw new Error("invalid varint");
	}
	(function (e) {
		e[(e.DOUBLE = 1)] = "DOUBLE";
		e[(e.FLOAT = 2)] = "FLOAT";
		e[(e.INT64 = 3)] = "INT64";
		e[(e.UINT64 = 4)] = "UINT64";
		e[(e.INT32 = 5)] = "INT32";
		e[(e.FIXED64 = 6)] = "FIXED64";
		e[(e.FIXED32 = 7)] = "FIXED32";
		e[(e.BOOL = 8)] = "BOOL";
		e[(e.STRING = 9)] = "STRING";
		e[(e.BYTES = 12)] = "BYTES";
		e[(e.UINT32 = 13)] = "UINT32";
		e[(e.SFIXED32 = 15)] = "SFIXED32";
		e[(e.SFIXED64 = 16)] = "SFIXED64";
		e[(e.SINT32 = 17)] = "SINT32";
		e[(e.SINT64 = 18)] = "SINT64";
	})((M ||= {}));
	const K = 4294967296;
	function $(e) {
		const t = e[0] === "-";
		if (t) {
			e = e.slice(1);
		}
		const r = 1000000;
		let n = 0;
		let i = 0;
		function o(t, o) {
			const s = Number(e.slice(t, o));
			i *= r;
			n = n * r + s;
			if (n >= K) {
				i += (n / K) | 0;
				n %= K;
			}
		}
		o(-24, -18);
		o(-18, -12);
		o(-12, -6);
		o(-6);
		if (t) {
			return Y(n, i);
		} else {
			return W(n, i);
		}
	}
	function G(e, t) {
		({ lo: e, hi: t } = (function (e, t) {
			return {
				lo: e >>> 0,
				hi: t >>> 0,
			};
		})(e, t));
		if (t <= 2097151) {
			return String(K * t + e);
		}
		const r = ((e >>> 24) | (t << 8)) & 16777215;
		const n = (t >> 16) & 65535;
		let i = (e & 16777215) + r * 6777216 + n * 6710656;
		let o = r + n * 8147497;
		let s = n * 2;
		const a = 10000000;
		if (i >= a) {
			o += Math.floor(i / a);
			i %= a;
		}
		if (o >= a) {
			s += Math.floor(o / a);
			o %= a;
		}
		return s.toString() + J(o) + J(i);
	}
	function W(e, t) {
		return {
			lo: e | 0,
			hi: t | 0,
		};
	}
	function Y(e, t) {
		t = ~t;
		if (e) {
			e = 1 + ~e;
		} else {
			t += 1;
		}
		return W(e, t);
	}
	const J = (e) => {
		const t = String(e);
		return "0000000".slice(t.length) + t;
	};
	function z() {
		let e = this.buf[this.pos++];
		let t = e & 127;
		if (!(e & 128)) {
			this.assertBounds();
			return t;
		}
		e = this.buf[this.pos++];
		t |= (e & 127) << 7;
		if (!(e & 128)) {
			this.assertBounds();
			return t;
		}
		e = this.buf[this.pos++];
		t |= (e & 127) << 14;
		if (!(e & 128)) {
			this.assertBounds();
			return t;
		}
		e = this.buf[this.pos++];
		t |= (e & 127) << 21;
		if (!(e & 128)) {
			this.assertBounds();
			return t;
		}
		e = this.buf[this.pos++];
		t |= (e & 15) << 28;
		for (let t = 5; e & 128 && t < 10; t++) {
			e = this.buf[this.pos++];
		}
		if (e & 128) {
			throw new Error("invalid varint");
		}
		this.assertBounds();
		return t >>> 0;
	}
	const X = q();
	function q() {
		const e = new DataView(new ArrayBuffer(8));
		if (
			typeof BigInt == "function" &&
			typeof e.getBigInt64 == "function" &&
			typeof e.getBigUint64 == "function" &&
			typeof e.setBigInt64 == "function" &&
			typeof e.setBigUint64 == "function" &&
			(typeof process != "object" ||
				typeof process.env != "object" ||
				process.env.BUF_BIGINT_DISABLE !== "1")
		) {
			const t = BigInt("-9223372036854775808");
			const r = BigInt("9223372036854775807");
			const n = BigInt("0");
			const i = BigInt("18446744073709551615");
			return {
				zero: BigInt(0),
				supported: true,
				parse(e) {
					const n = typeof e == "bigint" ? e : BigInt(e);
					if (n > r || n < t) {
						throw new Error(`invalid int64: ${e}`);
					}
					return n;
				},
				uParse(e) {
					const t = typeof e == "bigint" ? e : BigInt(e);
					if (t > i || t < n) {
						throw new Error(`invalid uint64: ${e}`);
					}
					return t;
				},
				enc(t) {
					e.setBigInt64(0, this.parse(t), true);
					return {
						lo: e.getInt32(0, true),
						hi: e.getInt32(4, true),
					};
				},
				uEnc(t) {
					e.setBigInt64(0, this.uParse(t), true);
					return {
						lo: e.getInt32(0, true),
						hi: e.getInt32(4, true),
					};
				},
				dec: (t, r) => {
					e.setInt32(0, t, true);
					e.setInt32(4, r, true);
					return e.getBigInt64(0, true);
				},
				uDec: (t, r) => {
					e.setInt32(0, t, true);
					e.setInt32(4, r, true);
					return e.getBigUint64(0, true);
				},
			};
		}
		return {
			zero: "0",
			supported: false,
			parse: (e) => {
				if (typeof e != "string") {
					e = e.toString();
				}
				Q(e);
				return e;
			},
			uParse: (e) => {
				if (typeof e != "string") {
					e = e.toString();
				}
				Z(e);
				return e;
			},
			enc: (e) => {
				if (typeof e != "string") {
					e = e.toString();
				}
				Q(e);
				return $(e);
			},
			uEnc: (e) => {
				if (typeof e != "string") {
					e = e.toString();
				}
				Z(e);
				return $(e);
			},
			dec: (e, t) =>
				(function (e, t) {
					let r = W(e, t);
					const n = r.hi & 2147483648;
					if (n) {
						r = Y(r.lo, r.hi);
					}
					const i = G(r.lo, r.hi);
					if (n) {
						return "-" + i;
					} else {
						return i;
					}
				})(e, t),
			uDec: (e, t) => G(e, t),
		};
	}
	function Q(e) {
		if (!/^-?[0-9]+$/.test(e)) {
			throw new Error("invalid int64: " + e);
		}
	}
	function Z(e) {
		if (!/^[0-9]+$/.test(e)) {
			throw new Error("invalid uint64: " + e);
		}
	}
	function ee(e, t) {
		switch (e) {
			case M.STRING:
				return "";
			case M.BOOL:
				return false;
			case M.DOUBLE:
			case M.FLOAT:
				return 0;
			case M.INT64:
			case M.UINT64:
			case M.SFIXED64:
			case M.FIXED64:
			case M.SINT64:
				if (t) {
					return "0";
				} else {
					return X.zero;
				}
			case M.BYTES:
				return new Uint8Array(0);
			default:
				return 0;
		}
	}
	const te = Symbol.for("reflect unsafe local");
	function re(e, t) {
		const r = e[t.localName].case;
		if (r === undefined) {
			return r;
		} else {
			return t.fields.find((e) => e.localName === r);
		}
	}
	function ne(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== undefined;
	}
	function ie(e, t) {
		if (t.oneof) {
			const r = e[t.oneof.localName];
			if (r.case === t.localName) {
				return r.value;
			} else {
				return undefined;
			}
		}
		return e[t.localName];
	}
	function oe(e, t, r) {
		if (t.oneof) {
			e[t.oneof.localName] = {
				case: t.localName,
				value: r,
			};
		} else {
			e[t.localName] = r;
		}
	}
	function se(e) {
		return e !== null && typeof e == "object" && !Array.isArray(e);
	}
	function ae(e, t) {
		if (
			se(e) &&
			te in e &&
			"add" in e &&
			"field" in e &&
			typeof e.field == "function"
		) {
			if (t !== undefined) {
				const s = t;
				const a = e.field();
				return (
					s.listKind == a.listKind &&
					s.scalar === a.scalar &&
					s.message?.typeName === a.message?.typeName &&
					s.enum?.typeName === a.enum?.typeName
				);
			}
			return true;
		}
		return false;
	}
	function ce(e, t) {
		if (
			se(e) &&
			te in e &&
			"has" in e &&
			"field" in e &&
			typeof e.field == "function"
		) {
			if (t !== undefined) {
				const s = t;
				const a = e.field();
				return (
					s.mapKey === a.mapKey &&
					s.mapKind == a.mapKind &&
					s.scalar === a.scalar &&
					s.message?.typeName === a.message?.typeName &&
					s.enum?.typeName === a.enum?.typeName
				);
			}
			return true;
		}
		return false;
	}
	function le(e, t) {
		return (
			se(e) &&
			te in e &&
			"desc" in e &&
			se(e.desc) &&
			e.desc.kind === "message" &&
			(t === undefined || e.desc.typeName == t.typeName)
		);
	}
	function ue(e) {
		const t = e.fields[0];
		return (
			pe(e.typeName) &&
			t !== undefined &&
			t.fieldKind == "scalar" &&
			t.name == "value" &&
			t.number == 1
		);
	}
	function pe(e) {
		return (
			e.startsWith("google.protobuf.") &&
			[
				"DoubleValue",
				"FloatValue",
				"Int64Value",
				"UInt64Value",
				"Int32Value",
				"UInt32Value",
				"BoolValue",
				"StringValue",
				"BytesValue",
			].includes(e.substring(16))
		);
	}
	function he(e, t) {
		if (F(t, e)) {
			return t;
		}
		const r = (function (e) {
			let t;
			if (
				(function (e) {
					switch (e.file.edition) {
						case 999:
							return false;
						case 998:
							return true;
						default:
							return e.fields.some(
								(e) => e.presence != 2 && e.fieldKind != "message" && !e.oneof,
							);
					}
				})(e)
			) {
				const r = Ee.get(e);
				let n;
				let i;
				if (r) {
					({ prototype: n, members: i } = r);
				} else {
					n = {};
					i = new Set();
					for (const t of e.members) {
						if (t.kind != "oneof") {
							if (t.fieldKind == "scalar" || t.fieldKind == "enum") {
								if (t.presence != 2) {
									i.add(t);
									n[t.localName] = we(t);
								}
							}
						}
					}
					Ee.set(e, {
						prototype: n,
						members: i,
					});
				}
				t = Object.create(n);
				t.$typeName = e.typeName;
				for (const r of e.members) {
					if (!i.has(r)) {
						if (r.kind == "field") {
							if (r.fieldKind == "message") {
								continue;
							}
							if (
								(r.fieldKind == "scalar" || r.fieldKind == "enum") &&
								r.presence != 2
							) {
								continue;
							}
						}
						t[r.localName] = we(r);
					}
				}
			} else {
				t = {
					$typeName: e.typeName,
				};
				for (const r of e.members) {
					if (r.kind == "oneof" || r.presence == 2) {
						t[r.localName] = we(r);
					}
				}
			}
			return t;
		})(e);
		if (t !== undefined) {
			(function (e, t, r) {
				for (const n of e.members) {
					let e;
					let i = r[n.localName];
					if (i != null) {
						if (n.kind == "oneof") {
							const t = re(r, n);
							if (!t) {
								continue;
							}
							e = t;
							i = ie(r, t);
						} else {
							e = n;
						}
						switch (e.fieldKind) {
							case "message":
								i = me(e, i);
								break;
							case "scalar":
								i = fe(e, i);
								break;
							case "list":
								i = ye(e, i);
								break;
							case "map":
								i = de(e, i);
						}
						oe(t, e, i);
					}
				}
			})(e, r, t);
		}
		return r;
	}
	function fe(e, t) {
		if (e.scalar == M.BYTES) {
			return ge(t);
		} else {
			return t;
		}
	}
	function de(e, t) {
		if (se(t)) {
			if (e.scalar == M.BYTES) {
				return ve(t, ge);
			}
			if (e.mapKind == "message") {
				return ve(t, (t) => me(e, t));
			}
		}
		return t;
	}
	function ye(e, t) {
		if (Array.isArray(t)) {
			if (e.scalar == M.BYTES) {
				return t.map(ge);
			}
			if (e.listKind == "message") {
				return t.map((t) => me(e, t));
			}
		}
		return t;
	}
	function me(e, t) {
		if (e.fieldKind == "message" && !e.oneof && ue(e.message)) {
			return fe(e.message.fields[0], t);
		}
		if (se(t)) {
			if (
				e.message.typeName == "google.protobuf.Struct" &&
				e.parent.typeName !== "google.protobuf.Value"
			) {
				return t;
			}
			if (!F(t, e.message)) {
				return he(e.message, t);
			}
		}
		return t;
	}
	function ge(e) {
		if (Array.isArray(e)) {
			return new Uint8Array(e);
		} else {
			return e;
		}
	}
	function ve(e, t) {
		const r = {};
		for (const n of Object.entries(e)) {
			r[n[0]] = t(n[1]);
		}
		return r;
	}
	const be = Symbol();
	const Ee = new WeakMap();
	function we(e) {
		if (e.kind == "oneof") {
			return {
				case: undefined,
			};
		}
		if (e.fieldKind == "list") {
			return [];
		}
		if (e.fieldKind == "map") {
			return {};
		}
		if (e.fieldKind == "message") {
			return be;
		}
		const t = e.getDefaultValue();
		if (t !== undefined) {
			if (e.fieldKind == "scalar" && e.longAsString) {
				return t.toString();
			} else {
				return t;
			}
		} else if (e.fieldKind == "scalar") {
			return ee(e.scalar, e.longAsString);
		} else {
			return e.enum.values[0].number;
		}
	}
	class Se extends Error {
		constructor(e, t, r = "FieldValueInvalidError") {
			super(t);
			this.name = r;
			this.field = () => e;
		}
	}
	const Ae = Symbol.for("@bufbuild/protobuf/text-encoding");
	function Ne() {
		if (globalThis[Ae] == null) {
			const e = new globalThis.TextEncoder();
			const t = new globalThis.TextDecoder();
			globalThis[Ae] = {
				encodeUtf8: (t) => e.encode(t),
				decodeUtf8: (e) => t.decode(e),
				checkUtf8(e) {
					try {
						encodeURIComponent(e);
						return true;
					} catch (e) {
						return false;
					}
				},
			};
		}
		return globalThis[Ae];
	}
	var Te;
	(function (e) {
		e[(e.Varint = 0)] = "Varint";
		e[(e.Bit64 = 1)] = "Bit64";
		e[(e.LengthDelimited = 2)] = "LengthDelimited";
		e[(e.StartGroup = 3)] = "StartGroup";
		e[(e.EndGroup = 4)] = "EndGroup";
		e[(e.Bit32 = 5)] = "Bit32";
	})((Te ||= {}));
	class Oe {
		constructor(e, t = Ne().decodeUtf8) {
			this.decodeUtf8 = t;
			this.varint64 = H;
			this.uint32 = z;
			this.buf = e;
			this.len = e.length;
			this.pos = 0;
			this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
		}
		tag() {
			let e = this.uint32();
			let t = e >>> 3;
			let r = e & 7;
			if (t <= 0 || r < 0 || r > 5) {
				throw new Error("illegal tag: field no " + t + " wire type " + r);
			}
			return [t, r];
		}
		skip(e, t) {
			let r = this.pos;
			switch (e) {
				case Te.Varint:
					while (this.buf[this.pos++] & 128);
					break;
				case Te.Bit64:
					this.pos += 4;
				case Te.Bit32:
					this.pos += 4;
					break;
				case Te.LengthDelimited:
					let r = this.uint32();
					this.pos += r;
					break;
				case Te.StartGroup:
					while (true) {
						const [e, r] = this.tag();
						if (r === Te.EndGroup) {
							if (t !== undefined && e !== t) {
								throw new Error("invalid end group tag");
							}
							break;
						}
						this.skip(r, e);
					}
					break;
				default:
					throw new Error("cant skip wire type " + e);
			}
			this.assertBounds();
			return this.buf.subarray(r, this.pos);
		}
		assertBounds() {
			if (this.pos > this.len) {
				throw new RangeError("premature EOF");
			}
		}
		int32() {
			return this.uint32() | 0;
		}
		sint32() {
			let e = this.uint32();
			return (e >>> 1) ^ -(e & 1);
		}
		int64() {
			return X.dec(...this.varint64());
		}
		uint64() {
			return X.uDec(...this.varint64());
		}
		sint64() {
			let [e, t] = this.varint64();
			let r = -(e & 1);
			e = ((e >>> 1) | ((t & 1) << 31)) ^ r;
			t = (t >>> 1) ^ r;
			return X.dec(e, t);
		}
		bool() {
			let [e, t] = this.varint64();
			return e !== 0 || t !== 0;
		}
		fixed32() {
			return this.view.getUint32((this.pos += 4) - 4, true);
		}
		sfixed32() {
			return this.view.getInt32((this.pos += 4) - 4, true);
		}
		fixed64() {
			return X.uDec(this.sfixed32(), this.sfixed32());
		}
		sfixed64() {
			return X.dec(this.sfixed32(), this.sfixed32());
		}
		float() {
			return this.view.getFloat32((this.pos += 4) - 4, true);
		}
		double() {
			return this.view.getFloat64((this.pos += 8) - 8, true);
		}
		bytes() {
			let e = this.uint32();
			let t = this.pos;
			this.pos += e;
			this.assertBounds();
			return this.buf.subarray(t, t + e);
		}
		string() {
			return this.decodeUtf8(this.bytes());
		}
	}
	function Ie(e, t, r) {
		const n = ke(e, r);
		if (n !== true) {
			return new Se(e, `list item #${t + 1}: ${xe(e, r, n)}`);
		}
	}
	function ke(e, t) {
		if (e.scalar !== undefined) {
			return Be(t, e.scalar);
		} else if (e.enum !== undefined) {
			if (e.enum.open) {
				return Number.isInteger(t);
			} else {
				return e.enum.values.some((e) => e.number === t);
			}
		} else {
			return le(t, e.message);
		}
	}
	function Be(e, t) {
		switch (t) {
			case M.DOUBLE:
				return typeof e == "number";
			case M.FLOAT:
				return (
					typeof e == "number" &&
					(!!Number.isNaN(e) ||
						!Number.isFinite(e) ||
						(!(e > 3.4028234663852886e38) && !(e < -3.4028234663852886e38)) ||
						`${e.toFixed()} out of range`)
				);
			case M.INT32:
			case M.SFIXED32:
			case M.SINT32:
				return (
					typeof e == "number" &&
					!!Number.isInteger(e) &&
					((!(e > 2147483647) && !(e < -2147483648)) ||
						`${e.toFixed()} out of range`)
				);
			case M.FIXED32:
			case M.UINT32:
				return (
					typeof e == "number" &&
					!!Number.isInteger(e) &&
					((!(e > 4294967295) && !(e < 0)) || `${e.toFixed()} out of range`)
				);
			case M.BOOL:
				return typeof e == "boolean";
			case M.STRING:
				return typeof e == "string" && (Ne().checkUtf8(e) || "invalid UTF8");
			case M.BYTES:
				return e instanceof Uint8Array;
			case M.INT64:
			case M.SFIXED64:
			case M.SINT64:
				if (
					typeof e == "bigint" ||
					typeof e == "number" ||
					(typeof e == "string" && e.length > 0)
				) {
					try {
						X.parse(e);
						return true;
					} catch (t) {
						return `${e} out of range`;
					}
				}
				return false;
			case M.FIXED64:
			case M.UINT64:
				if (
					typeof e == "bigint" ||
					typeof e == "number" ||
					(typeof e == "string" && e.length > 0)
				) {
					try {
						X.uParse(e);
						return true;
					} catch (t) {
						return `${e} out of range`;
					}
				}
				return false;
		}
	}
	function xe(e, t, r) {
		r = typeof r == "string" ? `: ${r}` : `, got ${Ce(t)}`;
		if (e.scalar !== undefined) {
			return `expected ${(function (e) {
				switch (e) {
					case M.STRING:
						return "string";
					case M.BOOL:
						return "boolean";
					case M.INT64:
					case M.SINT64:
					case M.SFIXED64:
						return "bigint (int64)";
					case M.UINT64:
					case M.FIXED64:
						return "bigint (uint64)";
					case M.BYTES:
						return "Uint8Array";
					case M.DOUBLE:
						return "number (float64)";
					case M.FLOAT:
						return "number (float32)";
					case M.FIXED32:
					case M.UINT32:
						return "number (uint32)";
					case M.INT32:
					case M.SFIXED32:
					case M.SINT32:
						return "number (int32)";
				}
			})(e.scalar)}${r}`;
		} else if (e.enum !== undefined) {
			return `expected ${e.enum.toString()}${r}`;
		} else {
			return `expected ${Re(e.message)}${r}`;
		}
	}
	function Ce(e) {
		switch (typeof e) {
			case "object":
				if (e === null) {
					return "null";
				} else if (e instanceof Uint8Array) {
					return `Uint8Array(${e.length})`;
				} else if (Array.isArray(e)) {
					return `Array(${e.length})`;
				} else if (ae(e)) {
					return _e(e.field());
				} else if (ce(e)) {
					return Ue(e.field());
				} else if (le(e)) {
					return Re(e.desc);
				} else if (F(e)) {
					return `message ${e.$typeName}`;
				} else {
					return "object";
				}
			case "string":
				if (e.length > 30) {
					return "string";
				} else {
					return `"${e.split('"').join('\\"')}"`;
				}
			case "boolean":
			case "number":
				return String(e);
			case "bigint":
				return String(e) + "n";
			default:
				return typeof e;
		}
	}
	function Re(e) {
		return `ReflectMessage (${e.typeName})`;
	}
	function _e(e) {
		switch (e.listKind) {
			case "message":
				return `ReflectList (${e.message.toString()})`;
			case "enum":
				return `ReflectList (${e.enum.toString()})`;
			case "scalar":
				return `ReflectList (${M[e.scalar]})`;
		}
	}
	function Ue(e) {
		switch (e.mapKind) {
			case "message":
				return `ReflectMap (${M[e.mapKey]}, ${e.message.toString()})`;
			case "enum":
				return `ReflectMap (${M[e.mapKey]}, ${e.enum.toString()})`;
			case "scalar":
				return `ReflectMap (${M[e.mapKey]}, ${M[e.scalar]})`;
		}
	}
	function De(e, t, r = true) {
		return new Pe(e, t, r);
	}
	class Pe {
		get sortedFields() {
			return (this._sortedFields ??= this.desc.fields
				.concat()
				.sort((e, t) => e.number - t.number));
		}
		constructor(e, t, r = true) {
			this.lists = new Map();
			this.maps = new Map();
			this.check = r;
			this.desc = e;
			this.message = this[te] = t ?? he(e);
			this.fields = e.fields;
			this.oneofs = e.oneofs;
			this.members = e.members;
		}
		findNumber(e) {
			this._fieldsByNumber ||= new Map(
				this.desc.fields.map((e) => [e.number, e]),
			);
			return this._fieldsByNumber.get(e);
		}
		oneofCase(e) {
			Ve(this.message, e);
			return re(this.message, e);
		}
		isSet(e) {
			Ve(this.message, e);
			return (function (e, t) {
				const r = t.localName;
				if (t.oneof) {
					return e[t.oneof.localName].case === r;
				}
				if (t.presence != 2) {
					return (
						e[r] !== undefined && Object.prototype.hasOwnProperty.call(e, r)
					);
				}
				switch (t.fieldKind) {
					case "list":
						return e[r].length > 0;
					case "map":
						return Object.keys(e[r]).length > 0;
					case "scalar":
						return !(function (e, t) {
							switch (e) {
								case M.BOOL:
									return t === false;
								case M.STRING:
									return t === "";
								case M.BYTES:
									return t instanceof Uint8Array && !t.byteLength;
								default:
									return t == 0;
							}
						})(t.scalar, e[r]);
					case "enum":
						return e[r] !== t.enum.values[0].number;
				}
				throw new Error("message field with implicit presence");
			})(this.message, e);
		}
		clear(e) {
			Ve(this.message, e);
			(function (e, t) {
				const r = t.localName;
				if (t.oneof) {
					const n = t.oneof.localName;
					if (e[n].case === r) {
						e[n] = {
							case: undefined,
						};
					}
				} else if (t.presence != 2) {
					delete e[r];
				} else {
					switch (t.fieldKind) {
						case "map":
							e[r] = {};
							break;
						case "list":
							e[r] = [];
							break;
						case "enum":
							e[r] = t.enum.values[0].number;
							break;
						case "scalar":
							e[r] = ee(t.scalar, t.longAsString);
					}
				}
			})(this.message, e);
		}
		get(e) {
			Ve(this.message, e);
			const t = ie(this.message, e);
			switch (e.fieldKind) {
				case "list":
					let r = this.lists.get(e);
					if (!r || r[te] !== t) {
						this.lists.set(e, (r = new je(e, t, this.check)));
					}
					return r;
				case "map":
					let n = this.maps.get(e);
					if (!n || n[te] !== t) {
						this.maps.set(e, (n = new Le(e, t, this.check)));
					}
					return n;
				case "message":
					return Me(e, t, this.check);
				case "scalar":
					if (t === undefined) {
						return ee(e.scalar, false);
					} else {
						return Ye(e, t);
					}
				case "enum":
					return t ?? e.enum.values[0].number;
			}
		}
		set(e, t) {
			Ve(this.message, e);
			if (this.check) {
				const r = (function (e, t) {
					const r =
						e.fieldKind == "list"
							? ae(t, e)
							: e.fieldKind == "map"
								? ce(t, e)
								: ke(e, t);
					if (r === true) {
						return;
					}
					let n;
					switch (e.fieldKind) {
						case "list":
							n = `expected ${_e(e)}, got ${Ce(t)}`;
							break;
						case "map":
							n = `expected ${Ue(e)}, got ${Ce(t)}`;
							break;
						default:
							n = xe(e, t, r);
					}
					return new Se(e, n);
				})(e, t);
				if (r) {
					throw r;
				}
			}
			let r;
			r =
				e.fieldKind == "message" ? Fe(e, t) : ce(t) || ae(t) ? t[te] : Je(e, t);
			oe(this.message, e, r);
		}
		getUnknown() {
			return this.message.$unknown;
		}
		setUnknown(e) {
			this.message.$unknown = e;
		}
	}
	function Ve(e, t) {
		if (t.parent.typeName !== e.$typeName) {
			throw new Se(
				t,
				`cannot use ${t.toString()} with message ${e.$typeName}`,
				"ForeignFieldError",
			);
		}
	}
	class je {
		field() {
			return this._field;
		}
		get size() {
			return this._arr.length;
		}
		constructor(e, t, r) {
			this._field = e;
			this._arr = this[te] = t;
			this.check = r;
		}
		get(e) {
			const t = this._arr[e];
			if (t === undefined) {
				return undefined;
			} else {
				return Ke(this._field, t, this.check);
			}
		}
		set(e, t) {
			if (e < 0 || e >= this._arr.length) {
				throw new Se(this._field, `list item #${e + 1}: out of range`);
			}
			if (this.check) {
				const r = Ie(this._field, e, t);
				if (r) {
					throw r;
				}
			}
			this._arr[e] = He(this._field, t);
		}
		add(e) {
			if (this.check) {
				const t = Ie(this._field, this._arr.length, e);
				if (t) {
					throw t;
				}
			}
			this._arr.push(He(this._field, e));
		}
		clear() {
			this._arr.splice(0, this._arr.length);
		}
		[Symbol.iterator]() {
			return this.values();
		}
		keys() {
			return this._arr.keys();
		}
		*values() {
			for (const e of this._arr) {
				yield Ke(this._field, e, this.check);
			}
		}
		*entries() {
			for (let e = 0; e < this._arr.length; e++) {
				yield [e, Ke(this._field, this._arr[e], this.check)];
			}
		}
	}
	class Le {
		constructor(e, t, r = true) {
			this.obj = this[te] = t ?? {};
			this.check = r;
			this._field = e;
		}
		field() {
			return this._field;
		}
		set(e, t) {
			if (this.check) {
				const r = (function (e, t, r) {
					const n = Be(t, e.mapKey);
					if (n !== true) {
						return new Se(
							e,
							`invalid map key: ${xe(
								{
									scalar: e.mapKey,
								},
								t,
								n,
							)}`,
						);
					}
					const i = ke(e, r);
					if (i !== true) {
						return new Se(e, `map entry ${Ce(t)}: ${xe(e, r, i)}`);
					} else {
						return undefined;
					}
				})(this._field, e, t);
				if (r) {
					throw r;
				}
			}
			this.obj[Ge(e)] = (function (e, t) {
				if (e.mapKind == "message") {
					return Fe(e, t);
				} else {
					return Je(e, t);
				}
			})(this._field, t);
			return this;
		}
		delete(e) {
			const t = Ge(e);
			const r = Object.prototype.hasOwnProperty.call(this.obj, t);
			if (r) {
				delete this.obj[t];
			}
			return r;
		}
		clear() {
			for (const e of Object.keys(this.obj)) {
				delete this.obj[e];
			}
		}
		get(e) {
			let t = this.obj[Ge(e)];
			if (t !== undefined) {
				t = $e(this._field, t, this.check);
			}
			return t;
		}
		has(e) {
			return Object.prototype.hasOwnProperty.call(this.obj, Ge(e));
		}
		*keys() {
			for (const e of Object.keys(this.obj)) {
				yield We(e, this._field.mapKey);
			}
		}
		*entries() {
			for (const e of Object.entries(this.obj)) {
				yield [We(e[0], this._field.mapKey), $e(this._field, e[1], this.check)];
			}
		}
		[Symbol.iterator]() {
			return this.entries();
		}
		get size() {
			return Object.keys(this.obj).length;
		}
		*values() {
			for (const e of Object.values(this.obj)) {
				yield $e(this._field, e, this.check);
			}
		}
		forEach(e, t) {
			for (const r of this.entries()) {
				e.call(t, r[1], r[0], this);
			}
		}
	}
	function Fe(e, t) {
		if (le(t)) {
			if (pe(t.message.$typeName) && !e.oneof && e.fieldKind == "message") {
				return t.message.value;
			} else if (
				t.desc.typeName == "google.protobuf.Struct" &&
				e.parent.typeName != "google.protobuf.Value"
			) {
				return Xe(t.message);
			} else {
				return t.message;
			}
		} else {
			return t;
		}
	}
	function Me(e, t, r) {
		if (t !== undefined) {
			if (ue(e.message) && !e.oneof && e.fieldKind == "message") {
				t = {
					$typeName: e.message.typeName,
					value: Ye(e.message.fields[0], t),
				};
			} else if (
				e.message.typeName == "google.protobuf.Struct" &&
				e.parent.typeName != "google.protobuf.Value" &&
				se(t)
			) {
				t = ze(t);
			}
		}
		return new Pe(e.message, t, r);
	}
	function He(e, t) {
		if (e.listKind == "message") {
			return Fe(e, t);
		} else {
			return Je(e, t);
		}
	}
	function Ke(e, t, r) {
		if (e.listKind == "message") {
			return Me(e, t, r);
		} else {
			return Ye(e, t);
		}
	}
	function $e(e, t, r) {
		if (e.mapKind == "message") {
			return Me(e, t, r);
		} else {
			return t;
		}
	}
	function Ge(e) {
		if (typeof e == "string" || typeof e == "number") {
			return e;
		} else {
			return String(e);
		}
	}
	function We(e, t) {
		switch (t) {
			case M.STRING:
				return e;
			case M.INT32:
			case M.FIXED32:
			case M.UINT32:
			case M.SFIXED32:
			case M.SINT32: {
				const t = Number.parseInt(e);
				if (Number.isFinite(t)) {
					return t;
				}
				break;
			}
			case M.BOOL:
				switch (e) {
					case "true":
						return true;
					case "false":
						return false;
				}
				break;
			case M.UINT64:
			case M.FIXED64:
				try {
					return X.uParse(e);
				} catch (e) {}
				break;
			default:
				try {
					return X.parse(e);
				} catch (e) {}
		}
		return e;
	}
	function Ye(e, t) {
		switch (e.scalar) {
			case M.INT64:
			case M.SFIXED64:
			case M.SINT64:
				if ("longAsString" in e && e.longAsString && typeof t == "string") {
					t = X.parse(t);
				}
				break;
			case M.FIXED64:
			case M.UINT64:
				if ("longAsString" in e && e.longAsString && typeof t == "string") {
					t = X.uParse(t);
				}
		}
		return t;
	}
	function Je(e, t) {
		switch (e.scalar) {
			case M.INT64:
			case M.SFIXED64:
			case M.SINT64:
				if ("longAsString" in e && e.longAsString) {
					t = String(t);
				} else if (typeof t == "string" || typeof t == "number") {
					t = X.parse(t);
				}
				break;
			case M.FIXED64:
			case M.UINT64:
				if ("longAsString" in e && e.longAsString) {
					t = String(t);
				} else if (typeof t == "string" || typeof t == "number") {
					t = X.uParse(t);
				}
		}
		return t;
	}
	function ze(e) {
		const t = {
			$typeName: "google.protobuf.Struct",
			fields: {},
		};
		if (se(e)) {
			for (const [r, n] of Object.entries(e)) {
				t.fields[r] = Qe(n);
			}
		}
		return t;
	}
	function Xe(e) {
		const t = {};
		for (const [r, n] of Object.entries(e.fields)) {
			t[r] = qe(n);
		}
		return t;
	}
	function qe(e) {
		switch (e.kind.case) {
			case "structValue":
				return Xe(e.kind.value);
			case "listValue":
				return e.kind.value.values.map(qe);
			case "nullValue":
			case undefined:
				return null;
			default:
				return e.kind.value;
		}
	}
	function Qe(e) {
		const t = {
			$typeName: "google.protobuf.Value",
			kind: {
				case: undefined,
			},
		};
		switch (typeof e) {
			case "number":
				t.kind = {
					case: "numberValue",
					value: e,
				};
				break;
			case "string":
				t.kind = {
					case: "stringValue",
					value: e,
				};
				break;
			case "boolean":
				t.kind = {
					case: "boolValue",
					value: e,
				};
				break;
			case "object":
				if (e === null) {
					const e = 0;
					t.kind = {
						case: "nullValue",
						value: e,
					};
				} else if (Array.isArray(e)) {
					const r = {
						$typeName: "google.protobuf.ListValue",
						values: [],
					};
					if (Array.isArray(e)) {
						for (const t of e) {
							r.values.push(Qe(t));
						}
					}
					t.kind = {
						case: "listValue",
						value: r,
					};
				} else {
					t.kind = {
						case: "structValue",
						value: ze(e),
					};
				}
		}
		return t;
	}
	let Ze;
	let et;
	function tt(e) {
		let t = false;
		const r = [];
		for (let n = 0; n < e.length; n++) {
			let i = e.charAt(n);
			switch (i) {
				case "_":
					t = true;
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					r.push(i);
					t = false;
					break;
				default:
					if (t) {
						t = false;
						i = i.toUpperCase();
					}
					r.push(i);
			}
		}
		return r.join("");
	}
	const rt = new Set(["constructor", "toString", "toJSON", "valueOf"]);
	function nt(e) {
		if (rt.has(e)) {
			return e + "$";
		} else {
			return e;
		}
	}
	function it(e) {
		for (const t of e.field) {
			if (!ne(t, "jsonName")) {
				t.jsonName = tt(t.name);
			}
		}
		e.nestedType.forEach(it);
	}
	function* ot(e) {
		switch (e.kind) {
			case "file":
				for (const t of e.messages) {
					yield t;
					yield* ot(t);
				}
				yield* e.enums;
				yield* e.services;
				yield* e.extensions;
				break;
			case "message":
				for (const t of e.nestedMessages) {
					yield t;
					yield* ot(t);
				}
				yield* e.nestedEnums;
				yield* e.nestedExtensions;
		}
	}
	function st(...e) {
		const t = (function () {
			const e = new Map();
			const t = new Map();
			const r = new Map();
			return {
				kind: "registry",
				types: e,
				extendees: t,
				[Symbol.iterator]: () => e.values(),
				get files() {
					return r.values();
				},
				addFile(e, t, n) {
					r.set(e.proto.name, e);
					if (!t) {
						for (const t of ot(e)) {
							this.add(t);
						}
					}
					if (n) {
						for (const r of e.dependencies) {
							this.addFile(r, t, n);
						}
					}
				},
				add(r) {
					if (r.kind == "extension") {
						let e = t.get(r.extendee.typeName);
						if (!e) {
							t.set(r.extendee.typeName, (e = new Map()));
						}
						e.set(r.number, r);
					}
					e.set(r.typeName, r);
				},
				get: (t) => e.get(t),
				getFile: (e) => r.get(e),
				getMessage(t) {
					const r = e.get(t);
					if ((r == null ? undefined : r.kind) == "message") {
						return r;
					} else {
						return undefined;
					}
				},
				getEnum(t) {
					const r = e.get(t);
					if ((r == null ? undefined : r.kind) == "enum") {
						return r;
					} else {
						return undefined;
					}
				},
				getExtension(t) {
					const r = e.get(t);
					if ((r == null ? undefined : r.kind) == "extension") {
						return r;
					} else {
						return undefined;
					}
				},
				getExtensionFor(e, r) {
					var n;
					if ((n = t.get(e.typeName)) === null || n === undefined) {
						return undefined;
					} else {
						return n.get(r);
					}
				},
				getService(t) {
					const r = e.get(t);
					if ((r == null ? undefined : r.kind) == "service") {
						return r;
					} else {
						return undefined;
					}
				},
			};
		})();
		if (!e.length) {
			return t;
		}
		if (
			"$typeName" in e[0] &&
			e[0].$typeName == "google.protobuf.FileDescriptorSet"
		) {
			for (const r of e[0].file) {
				Tt(r, t);
			}
			return t;
		}
		if ("$typeName" in e[0]) {
			const n = e[0];
			const i = e[1];
			const o = new Set();
			function s(e) {
				const r = [];
				for (const n of e.dependency) {
					if (t.getFile(n) != null) {
						continue;
					}
					if (o.has(n)) {
						continue;
					}
					const s = i(n);
					if (!s) {
						throw new Error(`Unable to resolve ${n}, imported by ${e.name}`);
					}
					if ("kind" in s) {
						t.addFile(s, false, true);
					} else {
						o.add(s.name);
						r.push(s);
					}
				}
				return r.concat(...r.map(s));
			}
			for (const a of [n, ...s(n)].reverse()) {
				Tt(a, t);
			}
		} else {
			for (const c of e) {
				for (const l of c.files) {
					t.addFile(l);
				}
			}
		}
		return t;
	}
	const at = 998;
	const ct = 999;
	const lt = 9;
	const ut = 10;
	const pt = 11;
	const ht = 12;
	const ft = 14;
	const dt = 3;
	const yt = 2;
	const mt = 1;
	const gt = 0;
	const vt = 1;
	const bt = 2;
	const Et = 3;
	const wt = 1;
	const St = 2;
	const At = 1;
	const Nt = {
		998: {
			fieldPresence: 1,
			enumType: 2,
			repeatedFieldEncoding: 2,
			utf8Validation: 3,
			messageEncoding: 1,
			jsonFormat: 2,
			enforceNamingStyle: 2,
		},
		999: {
			fieldPresence: 2,
			enumType: 1,
			repeatedFieldEncoding: 1,
			utf8Validation: 2,
			messageEncoding: 1,
			jsonFormat: 1,
			enforceNamingStyle: 2,
		},
		1000: {
			fieldPresence: 1,
			enumType: 1,
			repeatedFieldEncoding: 1,
			utf8Validation: 2,
			messageEncoding: 1,
			jsonFormat: 1,
			enforceNamingStyle: 2,
		},
	};
	function Tt(e, t) {
		var n;
		const i = {
			kind: "file",
			proto: e,
			deprecated: (n = e.options?.deprecated) !== null && n !== undefined && n,
			edition: _t(e),
			name: e.name.replace(/\.proto$/, ""),
			dependencies: Ut(e, t),
			enums: [],
			messages: [],
			extensions: [],
			services: [],
			toString: () => `file ${e.name}`,
		};
		const o = new Map();
		const s = {
			get: (e) => o.get(e),
			add(e) {
				Mt(e.proto.options?.mapEntry === true);
				o.set(e.typeName, e);
			},
		};
		for (const r of e.enumType) {
			kt(r, i, undefined, t);
		}
		for (const r of e.messageType) {
			Bt(r, i, undefined, t, s);
		}
		for (const r of e.service) {
			xt(r, i, t);
		}
		Ot(i, t);
		for (const e of o.values()) {
			It(e, t, s);
		}
		for (const e of i.messages) {
			It(e, t, s);
			Ot(e, t);
		}
		t.addFile(i, true);
	}
	function Ot(e, t) {
		switch (e.kind) {
			case "file":
				for (const r of e.proto.extension) {
					const n = Rt(r, e, t);
					e.extensions.push(n);
					t.add(n);
				}
				break;
			case "message":
				for (const r of e.proto.extension) {
					const n = Rt(r, e, t);
					e.nestedExtensions.push(n);
					t.add(n);
				}
				for (const r of e.nestedMessages) {
					Ot(r, t);
				}
		}
	}
	function It(e, t, r) {
		const n = e.proto.oneofDecl.map((t) =>
			(function (e, t) {
				return {
					kind: "oneof",
					proto: e,
					deprecated: false,
					parent: t,
					fields: [],
					name: e.name,
					localName: nt(tt(e.name)),
					toString() {
						return `oneof ${t.typeName}.${this.name}`;
					},
				};
			})(t, e),
		);
		const i = new Set();
		for (const o of e.proto.field) {
			const s = Vt(o, n);
			const a = Rt(o, e, t, s, r);
			e.fields.push(a);
			e.field[a.localName] = a;
			if (s === undefined) {
				e.members.push(a);
			} else {
				s.fields.push(a);
				if (!i.has(s)) {
					i.add(s);
					e.members.push(s);
				}
			}
		}
		for (const t of n.filter((e) => i.has(e))) {
			e.oneofs.push(t);
		}
		for (const n of e.nestedMessages) {
			It(n, t, r);
		}
	}
	function kt(e, t, r, n) {
		var o;
		var a;
		const l = (function (e, t) {
			const r =
				(
					(n = e).substring(0, 1) +
					n.substring(1).replace(/[A-Z]/g, (e) => "_" + e)
				).toLowerCase() + "_";
			var n;
			for (const e of t) {
				if (!e.name.toLowerCase().startsWith(r)) {
					return;
				}
				const t = e.name.substring(r.length);
				if (t.length == 0) {
					return;
				}
				if (/^\d/.test(t)) {
					return;
				}
			}
			return r;
		})(e.name, e.value);
		const u = {
			kind: "enum",
			proto: e,
			deprecated: (o = e.options?.deprecated) !== null && o !== undefined && o,
			file: t,
			parent: r,
			open: true,
			name: e.name,
			typeName: Dt(e, r, t),
			value: {},
			values: [],
			sharedPrefix: l,
			toString() {
				return `enum ${this.typeName}`;
			},
		};
		u.open = (function (e) {
			return (
				At ==
				Ft("enumType", {
					proto: e.proto,
					parent: e.parent ?? e.file,
				})
			);
		})(u);
		n.add(u);
		for (const t of e.value) {
			const e = t.name;
			u.values.push(
				(u.value[t.number] = {
					kind: "enum_value",
					proto: t,
					deprecated:
						(a = t.options?.deprecated) !== null && a !== undefined && a,
					parent: u,
					name: e,
					localName: nt(l == null ? e : e.substring(l.length)),
					number: t.number,
					toString: () => `enum value ${u.typeName}.${e}`,
				}),
			);
		}
		((r == null ? undefined : r.nestedEnums) ?? t.enums).push(u);
	}
	function Bt(e, t, r, n, i) {
		var s;
		const l = {
			kind: "message",
			proto: e,
			deprecated: (s = e.options?.deprecated) !== null && s !== undefined && s,
			file: t,
			parent: r,
			name: e.name,
			typeName: Dt(e, r, t),
			fields: [],
			field: {},
			oneofs: [],
			members: [],
			nestedEnums: [],
			nestedMessages: [],
			nestedExtensions: [],
			toString() {
				return `message ${this.typeName}`;
			},
		};
		if (e.options?.mapEntry === true) {
			i.add(l);
		} else {
			((r == null ? undefined : r.nestedMessages) ?? t.messages).push(l);
			n.add(l);
		}
		for (const r of e.enumType) {
			kt(r, t, l, n);
		}
		for (const r of e.nestedType) {
			Bt(r, t, l, n, i);
		}
	}
	function xt(e, t, r) {
		var i;
		const o = {
			kind: "service",
			proto: e,
			deprecated: (i = e.options?.deprecated) !== null && i !== undefined && i,
			file: t,
			name: e.name,
			typeName: Dt(e, undefined, t),
			methods: [],
			method: {},
			toString() {
				return `service ${this.typeName}`;
			},
		};
		t.services.push(o);
		r.add(o);
		for (const t of e.method) {
			const e = Ct(t, o, r);
			o.methods.push(e);
			o.method[e.localName] = e;
		}
	}
	function Ct(e, t, r) {
		var i;
		let a;
		a =
			e.clientStreaming && e.serverStreaming
				? "bidi_streaming"
				: e.clientStreaming
					? "client_streaming"
					: e.serverStreaming
						? "server_streaming"
						: "unary";
		const c = r.getMessage(Pt(e.inputType));
		const l = r.getMessage(Pt(e.outputType));
		Mt(c, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`);
		Mt(
			l,
			`invalid MethodDescriptorProto: output_type ${e.inputType} not found`,
		);
		const u = e.name;
		return {
			kind: "rpc",
			proto: e,
			deprecated: (i = e.options?.deprecated) !== null && i !== undefined && i,
			parent: t,
			name: u,
			localName: nt(u.length ? nt(u[0].toLowerCase() + u.substring(1)) : u),
			methodKind: a,
			input: c,
			output: l,
			idempotency: e.options?.idempotencyLevel ?? gt,
			toString: () => `rpc ${t.typeName}.${u}`,
		};
	}
	function Rt(e, t, r, n, i) {
		var s;
		const c = i === undefined;
		const l = {
			kind: "field",
			proto: e,
			deprecated: (s = e.options?.deprecated) !== null && s !== undefined && s,
			name: e.name,
			number: e.number,
			scalar: undefined,
			message: undefined,
			enum: undefined,
			presence: jt(e, n, c, t),
			listKind: undefined,
			mapKind: undefined,
			mapKey: undefined,
			delimitedEncoding: undefined,
			packed: undefined,
			longAsString: false,
			getDefaultValue: undefined,
		};
		if (c) {
			const n = t.kind == "file" ? t : t.file;
			const i = t.kind == "file" ? undefined : t;
			const o = Dt(e, i, n);
			l.kind = "extension";
			l.file = n;
			l.parent = i;
			l.oneof = undefined;
			l.typeName = o;
			l.jsonName = `[${o}]`;
			l.toString = () => `extension ${o}`;
			const s = r.getMessage(Pt(e.extendee));
			Mt(s, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`);
			l.extendee = s;
		} else {
			const r = t;
			Mt(r.kind == "message");
			l.parent = r;
			l.oneof = n;
			l.localName = n ? tt(e.name) : nt(tt(e.name));
			l.jsonName = e.jsonName;
			l.toString = () => `field ${r.typeName}.${e.name}`;
		}
		const u = e.label;
		const p = e.type;
		const h = e.options?.jstype;
		if (u === dt) {
			const n =
				p == pt ? (i == null ? undefined : i.get(Pt(e.typeName))) : undefined;
			if (n) {
				l.fieldKind = "map";
				const { key: e, value: t } = (function (e) {
					const t = e.fields.find((e) => e.number === 1);
					const r = e.fields.find((e) => e.number === 2);
					Mt(
						t &&
							t.fieldKind == "scalar" &&
							t.scalar != M.BYTES &&
							t.scalar != M.FLOAT &&
							t.scalar != M.DOUBLE &&
							r &&
							r.fieldKind != "list" &&
							r.fieldKind != "map",
					);
					return {
						key: t,
						value: r,
					};
				})(n);
				l.mapKey = e.scalar;
				l.mapKind = t.fieldKind;
				l.message = t.message;
				l.delimitedEncoding = false;
				l.enum = t.enum;
				l.scalar = t.scalar;
				return l;
			}
			l.fieldKind = "list";
			switch (p) {
				case pt:
				case ut:
					l.listKind = "message";
					l.message = r.getMessage(Pt(e.typeName));
					Mt(l.message);
					l.delimitedEncoding = Lt(e, t);
					break;
				case ft:
					l.listKind = "enum";
					l.enum = r.getEnum(Pt(e.typeName));
					Mt(l.enum);
					break;
				default:
					l.listKind = "scalar";
					l.scalar = p;
					l.longAsString = h == mt;
			}
			l.packed = (function (e, t) {
				if (e.label != dt) {
					return false;
				}
				switch (e.type) {
					case lt:
					case ht:
					case ut:
					case pt:
						return false;
				}
				const r = e.options;
				if (r && ne(r, "packed")) {
					return r.packed;
				} else {
					return (
						wt ==
						Ft("repeatedFieldEncoding", {
							proto: e,
							parent: t,
						})
					);
				}
			})(e, t);
			return l;
		}
		switch (p) {
			case pt:
			case ut:
				l.fieldKind = "message";
				l.message = r.getMessage(Pt(e.typeName));
				Mt(
					l.message,
					`invalid FieldDescriptorProto: type_name ${e.typeName} not found`,
				);
				l.delimitedEncoding = Lt(e, t);
				l.getDefaultValue = () => {};
				break;
			case ft: {
				const t = r.getEnum(Pt(e.typeName));
				Mt(
					t !== undefined,
					`invalid FieldDescriptorProto: type_name ${e.typeName} not found`,
				);
				l.fieldKind = "enum";
				l.enum = r.getEnum(Pt(e.typeName));
				l.getDefaultValue = () =>
					ne(e, "defaultValue")
						? (function (e, t) {
								const r = e.values.find((e) => e.name === t);
								if (!r) {
									throw new Error(`cannot parse ${e} default value: ${t}`);
								}
								return r.number;
							})(t, e.defaultValue)
						: undefined;
				break;
			}
			default:
				l.fieldKind = "scalar";
				l.scalar = p;
				l.longAsString = h == mt;
				l.getDefaultValue = () =>
					ne(e, "defaultValue")
						? (function (e, t) {
								switch (e) {
									case M.STRING:
										return t;
									case M.BYTES: {
										const r = (function (e) {
											const t = [];
											const r = {
												tail: e,
												c: "",
												next() {
													return (
														this.tail.length != 0 &&
														((this.c = this.tail[0]),
														(this.tail = this.tail.substring(1)),
														true)
													);
												},
												take(e) {
													if (this.tail.length >= e) {
														const t = this.tail.substring(0, e);
														this.tail = this.tail.substring(e);
														return t;
													}
													return false;
												},
											};
											while (r.next()) {
												if (r.c === "\\") {
													if (r.next()) {
														switch (r.c) {
															case "\\":
																t.push(r.c.charCodeAt(0));
																break;
															case "b":
																t.push(8);
																break;
															case "f":
																t.push(12);
																break;
															case "n":
																t.push(10);
																break;
															case "r":
																t.push(13);
																break;
															case "t":
																t.push(9);
																break;
															case "v":
																t.push(11);
																break;
															case "0":
															case "1":
															case "2":
															case "3":
															case "4":
															case "5":
															case "6":
															case "7": {
																const e = r.c;
																const n = r.take(2);
																if (n === false) {
																	return false;
																}
																const i = parseInt(e + n, 8);
																if (Number.isNaN(i)) {
																	return false;
																}
																t.push(i);
																break;
															}
															case "x": {
																const e = r.c;
																const n = r.take(2);
																if (n === false) {
																	return false;
																}
																const i = parseInt(e + n, 16);
																if (Number.isNaN(i)) {
																	return false;
																}
																t.push(i);
																break;
															}
															case "u": {
																const e = r.c;
																const n = r.take(4);
																if (n === false) {
																	return false;
																}
																const i = parseInt(e + n, 16);
																if (Number.isNaN(i)) {
																	return false;
																}
																const o = new Uint8Array(4);
																new DataView(o.buffer).setInt32(0, i, true);
																t.push(o[0], o[1], o[2], o[3]);
																break;
															}
															case "U": {
																const e = r.c;
																const n = r.take(8);
																if (n === false) {
																	return false;
																}
																const i = X.uEnc(e + n);
																const o = new Uint8Array(8);
																const s = new DataView(o.buffer);
																s.setInt32(0, i.lo, true);
																s.setInt32(4, i.hi, true);
																t.push(
																	o[0],
																	o[1],
																	o[2],
																	o[3],
																	o[4],
																	o[5],
																	o[6],
																	o[7],
																);
																break;
															}
														}
													}
												} else {
													t.push(r.c.charCodeAt(0));
												}
											}
											return new Uint8Array(t);
										})(t);
										if (r === false) {
											throw new Error(
												`cannot parse ${M[e]} default value: ${t}`,
											);
										}
										return r;
									}
									case M.INT64:
									case M.SFIXED64:
									case M.SINT64:
										return X.parse(t);
									case M.UINT64:
									case M.FIXED64:
										return X.uParse(t);
									case M.DOUBLE:
									case M.FLOAT:
										switch (t) {
											case "inf":
												return Number.POSITIVE_INFINITY;
											case "-inf":
												return Number.NEGATIVE_INFINITY;
											case "nan":
												return Number.NaN;
											default:
												return parseFloat(t);
										}
									case M.BOOL:
										return t === "true";
									case M.INT32:
									case M.UINT32:
									case M.SINT32:
									case M.FIXED32:
									case M.SFIXED32:
										return parseInt(t, 10);
								}
							})(p, e.defaultValue)
						: undefined;
		}
		return l;
	}
	function _t(e) {
		switch (e.syntax) {
			case "":
			case "proto2":
				return at;
			case "proto3":
				return ct;
			case "editions":
				if (e.edition in Nt) {
					return e.edition;
				}
				throw new Error(`${e.name}: unsupported edition`);
			default:
				throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
		}
	}
	function Ut(e, t) {
		return e.dependency.map((r) => {
			const n = t.getFile(r);
			if (!n) {
				throw new Error(`Cannot find ${r}, imported by ${e.name}`);
			}
			return n;
		});
	}
	function Dt(e, t, r) {
		let n;
		n = t
			? `${t.typeName}.${e.name}`
			: r.proto.package.length > 0
				? `${r.proto.package}.${e.name}`
				: `${e.name}`;
		return n;
	}
	function Pt(e) {
		if (e.startsWith(".")) {
			return e.substring(1);
		} else {
			return e;
		}
	}
	function Vt(e, t) {
		if (!ne(e, "oneofIndex")) {
			return;
		}
		if (e.proto3Optional) {
			return;
		}
		const r = t[e.oneofIndex];
		Mt(
			r,
			`invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`,
		);
		return r;
	}
	function jt(e, t, r, n) {
		if (e.label == yt) {
			return Et;
		}
		if (e.label == dt) {
			return bt;
		}
		if (t || e.proto3Optional) {
			return vt;
		}
		if (r) {
			return vt;
		}
		const i = Ft("fieldPresence", {
			proto: e,
			parent: n,
		});
		if (i != bt || (e.type != pt && e.type != ut)) {
			return i;
		} else {
			return vt;
		}
	}
	function Lt(e, t) {
		return (
			e.type == ut ||
			St ==
				Ft("messageEncoding", {
					proto: e,
					parent: t,
				})
		);
	}
	function Ft(e, t) {
		const i = t.proto.options?.features;
		if (i) {
			const t = i[e];
			if (t != 0) {
				return t;
			}
		}
		if ("kind" in t) {
			if (t.kind == "message") {
				return Ft(e, t.parent ?? t.file);
			}
			const r = Nt[t.edition];
			if (!r) {
				throw new Error(`feature default for edition ${t.edition} not found`);
			}
			return r[e];
		}
		return Ft(e, t.parent);
	}
	function Mt(e, t) {
		if (!e) {
			throw new Error(t);
		}
	}
	function Ht(e) {
		const t = (function (e) {
			const t = Object.create({
				syntax: "",
				edition: 0,
			});
			return Object.assign(
				t,
				Object.assign(
					Object.assign(
						{
							$typeName: "google.protobuf.FileDescriptorProto",
							dependency: [],
							publicDependency: [],
							weakDependency: [],
							service: [],
							extension: [],
						},
						e,
					),
					{
						messageType: e.messageType.map(Kt),
						enumType: e.enumType.map(Wt),
					},
				),
			);
		})(e);
		t.messageType.forEach(it);
		return st(t, () => {}).getFile(t.name);
	}
	function Kt(e) {
		var t;
		var n;
		var o;
		var a;
		return {
			$typeName: "google.protobuf.DescriptorProto",
			name: e.name,
			field:
				((t = e.field) === null || t === undefined ? undefined : t.map($t)) ??
				[],
			extension: [],
			nestedType:
				((n = e.nestedType) === null || n === undefined
					? undefined
					: n.map(Kt)) ?? [],
			enumType:
				((o = e.enumType) === null || o === undefined
					? undefined
					: o.map(Wt)) ?? [],
			extensionRange:
				((a = e.extensionRange) === null || a === undefined
					? undefined
					: a.map((e) =>
							Object.assign(
								{
									$typeName: "google.protobuf.DescriptorProto.ExtensionRange",
								},
								e,
							),
						)) ?? [],
			oneofDecl: [],
			reservedRange: [],
			reservedName: [],
		};
	}
	function $t(e) {
		const t = Object.create({
			label: 1,
			typeName: "",
			extendee: "",
			defaultValue: "",
			oneofIndex: 0,
			jsonName: "",
			proto3Optional: false,
		});
		return Object.assign(
			t,
			Object.assign(
				Object.assign(
					{
						$typeName: "google.protobuf.FieldDescriptorProto",
					},
					e,
				),
				{
					options: e.options ? Gt(e.options) : undefined,
				},
			),
		);
	}
	function Gt(e) {
		var r;
		const i = Object.create({
			ctype: 0,
			packed: false,
			jstype: 0,
			lazy: false,
			unverifiedLazy: false,
			deprecated: false,
			weak: false,
			debugRedact: false,
			retention: 0,
		});
		return Object.assign(
			i,
			Object.assign(
				Object.assign(
					{
						$typeName: "google.protobuf.FieldOptions",
					},
					e,
				),
				{
					targets: e.targets ?? [],
					editionDefaults:
						((r = e.editionDefaults) === null || r === undefined
							? undefined
							: r.map((e) =>
									Object.assign(
										{
											$typeName: "google.protobuf.FieldOptions.EditionDefault",
										},
										e,
									),
								)) ?? [],
					uninterpretedOption: [],
				},
			),
		);
	}
	function Wt(e) {
		return {
			$typeName: "google.protobuf.EnumDescriptorProto",
			name: e.name,
			reservedName: [],
			reservedRange: [],
			value: e.value.map((e) =>
				Object.assign(
					{
						$typeName: "google.protobuf.EnumValueDescriptorProto",
					},
					e,
				),
			),
		};
	}
	function Yt(e, t, ...r) {
		return r.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
	}
	const Jt = Yt(
		Ht({
			name: "google/protobuf/descriptor.proto",
			package: "google.protobuf",
			messageType: [
				{
					name: "FileDescriptorSet",
					field: [
						{
							name: "file",
							number: 1,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.FileDescriptorProto",
						},
					],
					extensionRange: [
						{
							start: 536000000,
							end: 536000001,
						},
					],
				},
				{
					name: "FileDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "package",
							number: 2,
							type: 9,
							label: 1,
						},
						{
							name: "dependency",
							number: 3,
							type: 9,
							label: 3,
						},
						{
							name: "public_dependency",
							number: 10,
							type: 5,
							label: 3,
						},
						{
							name: "weak_dependency",
							number: 11,
							type: 5,
							label: 3,
						},
						{
							name: "message_type",
							number: 4,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.DescriptorProto",
						},
						{
							name: "enum_type",
							number: 5,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.EnumDescriptorProto",
						},
						{
							name: "service",
							number: 6,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.ServiceDescriptorProto",
						},
						{
							name: "extension",
							number: 7,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.FieldDescriptorProto",
						},
						{
							name: "options",
							number: 8,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FileOptions",
						},
						{
							name: "source_code_info",
							number: 9,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.SourceCodeInfo",
						},
						{
							name: "syntax",
							number: 12,
							type: 9,
							label: 1,
						},
						{
							name: "edition",
							number: 14,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.Edition",
						},
					],
				},
				{
					name: "DescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "field",
							number: 2,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.FieldDescriptorProto",
						},
						{
							name: "extension",
							number: 6,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.FieldDescriptorProto",
						},
						{
							name: "nested_type",
							number: 3,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.DescriptorProto",
						},
						{
							name: "enum_type",
							number: 4,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.EnumDescriptorProto",
						},
						{
							name: "extension_range",
							number: 5,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.DescriptorProto.ExtensionRange",
						},
						{
							name: "oneof_decl",
							number: 8,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.OneofDescriptorProto",
						},
						{
							name: "options",
							number: 7,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.MessageOptions",
						},
						{
							name: "reserved_range",
							number: 9,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.DescriptorProto.ReservedRange",
						},
						{
							name: "reserved_name",
							number: 10,
							type: 9,
							label: 3,
						},
					],
					nestedType: [
						{
							name: "ExtensionRange",
							field: [
								{
									name: "start",
									number: 1,
									type: 5,
									label: 1,
								},
								{
									name: "end",
									number: 2,
									type: 5,
									label: 1,
								},
								{
									name: "options",
									number: 3,
									type: 11,
									label: 1,
									typeName: ".google.protobuf.ExtensionRangeOptions",
								},
							],
						},
						{
							name: "ReservedRange",
							field: [
								{
									name: "start",
									number: 1,
									type: 5,
									label: 1,
								},
								{
									name: "end",
									number: 2,
									type: 5,
									label: 1,
								},
							],
						},
					],
				},
				{
					name: "ExtensionRangeOptions",
					field: [
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
						{
							name: "declaration",
							number: 2,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.ExtensionRangeOptions.Declaration",
							options: {
								retention: 2,
							},
						},
						{
							name: "features",
							number: 50,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "verification",
							number: 3,
							type: 14,
							label: 1,
							typeName:
								".google.protobuf.ExtensionRangeOptions.VerificationState",
							defaultValue: "UNVERIFIED",
							options: {
								retention: 2,
							},
						},
					],
					nestedType: [
						{
							name: "Declaration",
							field: [
								{
									name: "number",
									number: 1,
									type: 5,
									label: 1,
								},
								{
									name: "full_name",
									number: 2,
									type: 9,
									label: 1,
								},
								{
									name: "type",
									number: 3,
									type: 9,
									label: 1,
								},
								{
									name: "reserved",
									number: 5,
									type: 8,
									label: 1,
								},
								{
									name: "repeated",
									number: 6,
									type: 8,
									label: 1,
								},
							],
						},
					],
					enumType: [
						{
							name: "VerificationState",
							value: [
								{
									name: "DECLARATION",
									number: 0,
								},
								{
									name: "UNVERIFIED",
									number: 1,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "FieldDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "number",
							number: 3,
							type: 5,
							label: 1,
						},
						{
							name: "label",
							number: 4,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FieldDescriptorProto.Label",
						},
						{
							name: "type",
							number: 5,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FieldDescriptorProto.Type",
						},
						{
							name: "type_name",
							number: 6,
							type: 9,
							label: 1,
						},
						{
							name: "extendee",
							number: 2,
							type: 9,
							label: 1,
						},
						{
							name: "default_value",
							number: 7,
							type: 9,
							label: 1,
						},
						{
							name: "oneof_index",
							number: 9,
							type: 5,
							label: 1,
						},
						{
							name: "json_name",
							number: 10,
							type: 9,
							label: 1,
						},
						{
							name: "options",
							number: 8,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FieldOptions",
						},
						{
							name: "proto3_optional",
							number: 17,
							type: 8,
							label: 1,
						},
					],
					enumType: [
						{
							name: "Type",
							value: [
								{
									name: "TYPE_DOUBLE",
									number: 1,
								},
								{
									name: "TYPE_FLOAT",
									number: 2,
								},
								{
									name: "TYPE_INT64",
									number: 3,
								},
								{
									name: "TYPE_UINT64",
									number: 4,
								},
								{
									name: "TYPE_INT32",
									number: 5,
								},
								{
									name: "TYPE_FIXED64",
									number: 6,
								},
								{
									name: "TYPE_FIXED32",
									number: 7,
								},
								{
									name: "TYPE_BOOL",
									number: 8,
								},
								{
									name: "TYPE_STRING",
									number: 9,
								},
								{
									name: "TYPE_GROUP",
									number: 10,
								},
								{
									name: "TYPE_MESSAGE",
									number: 11,
								},
								{
									name: "TYPE_BYTES",
									number: 12,
								},
								{
									name: "TYPE_UINT32",
									number: 13,
								},
								{
									name: "TYPE_ENUM",
									number: 14,
								},
								{
									name: "TYPE_SFIXED32",
									number: 15,
								},
								{
									name: "TYPE_SFIXED64",
									number: 16,
								},
								{
									name: "TYPE_SINT32",
									number: 17,
								},
								{
									name: "TYPE_SINT64",
									number: 18,
								},
							],
						},
						{
							name: "Label",
							value: [
								{
									name: "LABEL_OPTIONAL",
									number: 1,
								},
								{
									name: "LABEL_REPEATED",
									number: 3,
								},
								{
									name: "LABEL_REQUIRED",
									number: 2,
								},
							],
						},
					],
				},
				{
					name: "OneofDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "options",
							number: 2,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.OneofOptions",
						},
					],
				},
				{
					name: "EnumDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "value",
							number: 2,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.EnumValueDescriptorProto",
						},
						{
							name: "options",
							number: 3,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.EnumOptions",
						},
						{
							name: "reserved_range",
							number: 4,
							type: 11,
							label: 3,
							typeName:
								".google.protobuf.EnumDescriptorProto.EnumReservedRange",
						},
						{
							name: "reserved_name",
							number: 5,
							type: 9,
							label: 3,
						},
					],
					nestedType: [
						{
							name: "EnumReservedRange",
							field: [
								{
									name: "start",
									number: 1,
									type: 5,
									label: 1,
								},
								{
									name: "end",
									number: 2,
									type: 5,
									label: 1,
								},
							],
						},
					],
				},
				{
					name: "EnumValueDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "number",
							number: 2,
							type: 5,
							label: 1,
						},
						{
							name: "options",
							number: 3,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.EnumValueOptions",
						},
					],
				},
				{
					name: "ServiceDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "method",
							number: 2,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.MethodDescriptorProto",
						},
						{
							name: "options",
							number: 3,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.ServiceOptions",
						},
					],
				},
				{
					name: "MethodDescriptorProto",
					field: [
						{
							name: "name",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "input_type",
							number: 2,
							type: 9,
							label: 1,
						},
						{
							name: "output_type",
							number: 3,
							type: 9,
							label: 1,
						},
						{
							name: "options",
							number: 4,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.MethodOptions",
						},
						{
							name: "client_streaming",
							number: 5,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "server_streaming",
							number: 6,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
					],
				},
				{
					name: "FileOptions",
					field: [
						{
							name: "java_package",
							number: 1,
							type: 9,
							label: 1,
						},
						{
							name: "java_outer_classname",
							number: 8,
							type: 9,
							label: 1,
						},
						{
							name: "java_multiple_files",
							number: 10,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "java_generate_equals_and_hash",
							number: 20,
							type: 8,
							label: 1,
							options: {
								deprecated: true,
							},
						},
						{
							name: "java_string_check_utf8",
							number: 27,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "optimize_for",
							number: 9,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FileOptions.OptimizeMode",
							defaultValue: "SPEED",
						},
						{
							name: "go_package",
							number: 11,
							type: 9,
							label: 1,
						},
						{
							name: "cc_generic_services",
							number: 16,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "java_generic_services",
							number: 17,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "py_generic_services",
							number: 18,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "deprecated",
							number: 23,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "cc_enable_arenas",
							number: 31,
							type: 8,
							label: 1,
							defaultValue: "true",
						},
						{
							name: "objc_class_prefix",
							number: 36,
							type: 9,
							label: 1,
						},
						{
							name: "csharp_namespace",
							number: 37,
							type: 9,
							label: 1,
						},
						{
							name: "swift_prefix",
							number: 39,
							type: 9,
							label: 1,
						},
						{
							name: "php_class_prefix",
							number: 40,
							type: 9,
							label: 1,
						},
						{
							name: "php_namespace",
							number: 41,
							type: 9,
							label: 1,
						},
						{
							name: "php_metadata_namespace",
							number: 44,
							type: 9,
							label: 1,
						},
						{
							name: "ruby_package",
							number: 45,
							type: 9,
							label: 1,
						},
						{
							name: "features",
							number: 50,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					enumType: [
						{
							name: "OptimizeMode",
							value: [
								{
									name: "SPEED",
									number: 1,
								},
								{
									name: "CODE_SIZE",
									number: 2,
								},
								{
									name: "LITE_RUNTIME",
									number: 3,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "MessageOptions",
					field: [
						{
							name: "message_set_wire_format",
							number: 1,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "no_standard_descriptor_accessor",
							number: 2,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "deprecated",
							number: 3,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "map_entry",
							number: 7,
							type: 8,
							label: 1,
						},
						{
							name: "deprecated_legacy_json_field_conflicts",
							number: 11,
							type: 8,
							label: 1,
							options: {
								deprecated: true,
							},
						},
						{
							name: "features",
							number: 12,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "FieldOptions",
					field: [
						{
							name: "ctype",
							number: 1,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FieldOptions.CType",
							defaultValue: "STRING",
						},
						{
							name: "packed",
							number: 2,
							type: 8,
							label: 1,
						},
						{
							name: "jstype",
							number: 6,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FieldOptions.JSType",
							defaultValue: "JS_NORMAL",
						},
						{
							name: "lazy",
							number: 5,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "unverified_lazy",
							number: 15,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "deprecated",
							number: 3,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "weak",
							number: 10,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "debug_redact",
							number: 16,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "retention",
							number: 17,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FieldOptions.OptionRetention",
						},
						{
							name: "targets",
							number: 19,
							type: 14,
							label: 3,
							typeName: ".google.protobuf.FieldOptions.OptionTargetType",
						},
						{
							name: "edition_defaults",
							number: 20,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.FieldOptions.EditionDefault",
						},
						{
							name: "features",
							number: 21,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "feature_support",
							number: 22,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FieldOptions.FeatureSupport",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					nestedType: [
						{
							name: "EditionDefault",
							field: [
								{
									name: "edition",
									number: 3,
									type: 14,
									label: 1,
									typeName: ".google.protobuf.Edition",
								},
								{
									name: "value",
									number: 2,
									type: 9,
									label: 1,
								},
							],
						},
						{
							name: "FeatureSupport",
							field: [
								{
									name: "edition_introduced",
									number: 1,
									type: 14,
									label: 1,
									typeName: ".google.protobuf.Edition",
								},
								{
									name: "edition_deprecated",
									number: 2,
									type: 14,
									label: 1,
									typeName: ".google.protobuf.Edition",
								},
								{
									name: "deprecation_warning",
									number: 3,
									type: 9,
									label: 1,
								},
								{
									name: "edition_removed",
									number: 4,
									type: 14,
									label: 1,
									typeName: ".google.protobuf.Edition",
								},
							],
						},
					],
					enumType: [
						{
							name: "CType",
							value: [
								{
									name: "STRING",
									number: 0,
								},
								{
									name: "CORD",
									number: 1,
								},
								{
									name: "STRING_PIECE",
									number: 2,
								},
							],
						},
						{
							name: "JSType",
							value: [
								{
									name: "JS_NORMAL",
									number: 0,
								},
								{
									name: "JS_STRING",
									number: 1,
								},
								{
									name: "JS_NUMBER",
									number: 2,
								},
							],
						},
						{
							name: "OptionRetention",
							value: [
								{
									name: "RETENTION_UNKNOWN",
									number: 0,
								},
								{
									name: "RETENTION_RUNTIME",
									number: 1,
								},
								{
									name: "RETENTION_SOURCE",
									number: 2,
								},
							],
						},
						{
							name: "OptionTargetType",
							value: [
								{
									name: "TARGET_TYPE_UNKNOWN",
									number: 0,
								},
								{
									name: "TARGET_TYPE_FILE",
									number: 1,
								},
								{
									name: "TARGET_TYPE_EXTENSION_RANGE",
									number: 2,
								},
								{
									name: "TARGET_TYPE_MESSAGE",
									number: 3,
								},
								{
									name: "TARGET_TYPE_FIELD",
									number: 4,
								},
								{
									name: "TARGET_TYPE_ONEOF",
									number: 5,
								},
								{
									name: "TARGET_TYPE_ENUM",
									number: 6,
								},
								{
									name: "TARGET_TYPE_ENUM_ENTRY",
									number: 7,
								},
								{
									name: "TARGET_TYPE_SERVICE",
									number: 8,
								},
								{
									name: "TARGET_TYPE_METHOD",
									number: 9,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "OneofOptions",
					field: [
						{
							name: "features",
							number: 1,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "EnumOptions",
					field: [
						{
							name: "allow_alias",
							number: 2,
							type: 8,
							label: 1,
						},
						{
							name: "deprecated",
							number: 3,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "deprecated_legacy_json_field_conflicts",
							number: 6,
							type: 8,
							label: 1,
							options: {
								deprecated: true,
							},
						},
						{
							name: "features",
							number: 7,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "EnumValueOptions",
					field: [
						{
							name: "deprecated",
							number: 1,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "features",
							number: 2,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "debug_redact",
							number: 3,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "feature_support",
							number: 4,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FieldOptions.FeatureSupport",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "ServiceOptions",
					field: [
						{
							name: "features",
							number: 34,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "deprecated",
							number: 33,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "MethodOptions",
					field: [
						{
							name: "deprecated",
							number: 33,
							type: 8,
							label: 1,
							defaultValue: "false",
						},
						{
							name: "idempotency_level",
							number: 34,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.MethodOptions.IdempotencyLevel",
							defaultValue: "IDEMPOTENCY_UNKNOWN",
						},
						{
							name: "features",
							number: 35,
							type: 11,
							label: 1,
							typeName: ".google.protobuf.FeatureSet",
						},
						{
							name: "uninterpreted_option",
							number: 999,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption",
						},
					],
					enumType: [
						{
							name: "IdempotencyLevel",
							value: [
								{
									name: "IDEMPOTENCY_UNKNOWN",
									number: 0,
								},
								{
									name: "NO_SIDE_EFFECTS",
									number: 1,
								},
								{
									name: "IDEMPOTENT",
									number: 2,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 536870912,
						},
					],
				},
				{
					name: "UninterpretedOption",
					field: [
						{
							name: "name",
							number: 2,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.UninterpretedOption.NamePart",
						},
						{
							name: "identifier_value",
							number: 3,
							type: 9,
							label: 1,
						},
						{
							name: "positive_int_value",
							number: 4,
							type: 4,
							label: 1,
						},
						{
							name: "negative_int_value",
							number: 5,
							type: 3,
							label: 1,
						},
						{
							name: "double_value",
							number: 6,
							type: 1,
							label: 1,
						},
						{
							name: "string_value",
							number: 7,
							type: 12,
							label: 1,
						},
						{
							name: "aggregate_value",
							number: 8,
							type: 9,
							label: 1,
						},
					],
					nestedType: [
						{
							name: "NamePart",
							field: [
								{
									name: "name_part",
									number: 1,
									type: 9,
									label: 2,
								},
								{
									name: "is_extension",
									number: 2,
									type: 8,
									label: 2,
								},
							],
						},
					],
				},
				{
					name: "FeatureSet",
					field: [
						{
							name: "field_presence",
							number: 1,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.FieldPresence",
							options: {
								retention: 1,
								targets: [4, 1],
								editionDefaults: [
									{
										value: "EXPLICIT",
										edition: 900,
									},
									{
										value: "IMPLICIT",
										edition: 999,
									},
									{
										value: "EXPLICIT",
										edition: 1000,
									},
								],
							},
						},
						{
							name: "enum_type",
							number: 2,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.EnumType",
							options: {
								retention: 1,
								targets: [6, 1],
								editionDefaults: [
									{
										value: "CLOSED",
										edition: 900,
									},
									{
										value: "OPEN",
										edition: 999,
									},
								],
							},
						},
						{
							name: "repeated_field_encoding",
							number: 3,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
							options: {
								retention: 1,
								targets: [4, 1],
								editionDefaults: [
									{
										value: "EXPANDED",
										edition: 900,
									},
									{
										value: "PACKED",
										edition: 999,
									},
								],
							},
						},
						{
							name: "utf8_validation",
							number: 4,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.Utf8Validation",
							options: {
								retention: 1,
								targets: [4, 1],
								editionDefaults: [
									{
										value: "NONE",
										edition: 900,
									},
									{
										value: "VERIFY",
										edition: 999,
									},
								],
							},
						},
						{
							name: "message_encoding",
							number: 5,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.MessageEncoding",
							options: {
								retention: 1,
								targets: [4, 1],
								editionDefaults: [
									{
										value: "LENGTH_PREFIXED",
										edition: 900,
									},
								],
							},
						},
						{
							name: "json_format",
							number: 6,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.JsonFormat",
							options: {
								retention: 1,
								targets: [3, 6, 1],
								editionDefaults: [
									{
										value: "LEGACY_BEST_EFFORT",
										edition: 900,
									},
									{
										value: "ALLOW",
										edition: 999,
									},
								],
							},
						},
						{
							name: "enforce_naming_style",
							number: 7,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle",
							options: {
								retention: 2,
								targets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
								editionDefaults: [
									{
										value: "STYLE_LEGACY",
										edition: 900,
									},
									{
										value: "STYLE2024",
										edition: 1001,
									},
								],
							},
						},
					],
					enumType: [
						{
							name: "FieldPresence",
							value: [
								{
									name: "FIELD_PRESENCE_UNKNOWN",
									number: 0,
								},
								{
									name: "EXPLICIT",
									number: 1,
								},
								{
									name: "IMPLICIT",
									number: 2,
								},
								{
									name: "LEGACY_REQUIRED",
									number: 3,
								},
							],
						},
						{
							name: "EnumType",
							value: [
								{
									name: "ENUM_TYPE_UNKNOWN",
									number: 0,
								},
								{
									name: "OPEN",
									number: 1,
								},
								{
									name: "CLOSED",
									number: 2,
								},
							],
						},
						{
							name: "RepeatedFieldEncoding",
							value: [
								{
									name: "REPEATED_FIELD_ENCODING_UNKNOWN",
									number: 0,
								},
								{
									name: "PACKED",
									number: 1,
								},
								{
									name: "EXPANDED",
									number: 2,
								},
							],
						},
						{
							name: "Utf8Validation",
							value: [
								{
									name: "UTF8_VALIDATION_UNKNOWN",
									number: 0,
								},
								{
									name: "VERIFY",
									number: 2,
								},
								{
									name: "NONE",
									number: 3,
								},
							],
						},
						{
							name: "MessageEncoding",
							value: [
								{
									name: "MESSAGE_ENCODING_UNKNOWN",
									number: 0,
								},
								{
									name: "LENGTH_PREFIXED",
									number: 1,
								},
								{
									name: "DELIMITED",
									number: 2,
								},
							],
						},
						{
							name: "JsonFormat",
							value: [
								{
									name: "JSON_FORMAT_UNKNOWN",
									number: 0,
								},
								{
									name: "ALLOW",
									number: 1,
								},
								{
									name: "LEGACY_BEST_EFFORT",
									number: 2,
								},
							],
						},
						{
							name: "EnforceNamingStyle",
							value: [
								{
									name: "ENFORCE_NAMING_STYLE_UNKNOWN",
									number: 0,
								},
								{
									name: "STYLE2024",
									number: 1,
								},
								{
									name: "STYLE_LEGACY",
									number: 2,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 1000,
							end: 9995,
						},
						{
							start: 9995,
							end: 10000,
						},
						{
							start: 10000,
							end: 10001,
						},
					],
				},
				{
					name: "FeatureSetDefaults",
					field: [
						{
							name: "defaults",
							number: 1,
							type: 11,
							label: 3,
							typeName:
								".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault",
						},
						{
							name: "minimum_edition",
							number: 4,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.Edition",
						},
						{
							name: "maximum_edition",
							number: 5,
							type: 14,
							label: 1,
							typeName: ".google.protobuf.Edition",
						},
					],
					nestedType: [
						{
							name: "FeatureSetEditionDefault",
							field: [
								{
									name: "edition",
									number: 3,
									type: 14,
									label: 1,
									typeName: ".google.protobuf.Edition",
								},
								{
									name: "overridable_features",
									number: 4,
									type: 11,
									label: 1,
									typeName: ".google.protobuf.FeatureSet",
								},
								{
									name: "fixed_features",
									number: 5,
									type: 11,
									label: 1,
									typeName: ".google.protobuf.FeatureSet",
								},
							],
						},
					],
				},
				{
					name: "SourceCodeInfo",
					field: [
						{
							name: "location",
							number: 1,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.SourceCodeInfo.Location",
						},
					],
					nestedType: [
						{
							name: "Location",
							field: [
								{
									name: "path",
									number: 1,
									type: 5,
									label: 3,
									options: {
										packed: true,
									},
								},
								{
									name: "span",
									number: 2,
									type: 5,
									label: 3,
									options: {
										packed: true,
									},
								},
								{
									name: "leading_comments",
									number: 3,
									type: 9,
									label: 1,
								},
								{
									name: "trailing_comments",
									number: 4,
									type: 9,
									label: 1,
								},
								{
									name: "leading_detached_comments",
									number: 6,
									type: 9,
									label: 3,
								},
							],
						},
					],
					extensionRange: [
						{
							start: 536000000,
							end: 536000001,
						},
					],
				},
				{
					name: "GeneratedCodeInfo",
					field: [
						{
							name: "annotation",
							number: 1,
							type: 11,
							label: 3,
							typeName: ".google.protobuf.GeneratedCodeInfo.Annotation",
						},
					],
					nestedType: [
						{
							name: "Annotation",
							field: [
								{
									name: "path",
									number: 1,
									type: 5,
									label: 3,
									options: {
										packed: true,
									},
								},
								{
									name: "source_file",
									number: 2,
									type: 9,
									label: 1,
								},
								{
									name: "begin",
									number: 3,
									type: 5,
									label: 1,
								},
								{
									name: "end",
									number: 4,
									type: 5,
									label: 1,
								},
								{
									name: "semantic",
									number: 5,
									type: 14,
									label: 1,
									typeName:
										".google.protobuf.GeneratedCodeInfo.Annotation.Semantic",
								},
							],
							enumType: [
								{
									name: "Semantic",
									value: [
										{
											name: "NONE",
											number: 0,
										},
										{
											name: "SET",
											number: 1,
										},
										{
											name: "ALIAS",
											number: 2,
										},
									],
								},
							],
						},
					],
				},
			],
			enumType: [
				{
					name: "Edition",
					value: [
						{
							name: "EDITION_UNKNOWN",
							number: 0,
						},
						{
							name: "EDITION_LEGACY",
							number: 900,
						},
						{
							name: "EDITION_PROTO2",
							number: 998,
						},
						{
							name: "EDITION_PROTO3",
							number: 999,
						},
						{
							name: "EDITION_2023",
							number: 1000,
						},
						{
							name: "EDITION_2024",
							number: 1001,
						},
						{
							name: "EDITION_1_TEST_ONLY",
							number: 1,
						},
						{
							name: "EDITION_2_TEST_ONLY",
							number: 2,
						},
						{
							name: "EDITION_99997_TEST_ONLY",
							number: 99997,
						},
						{
							name: "EDITION_99998_TEST_ONLY",
							number: 99998,
						},
						{
							name: "EDITION_99999_TEST_ONLY",
							number: 99999,
						},
						{
							name: "EDITION_MAX",
							number: 2147483647,
						},
					],
				},
			],
		}),
		1,
	);
	var zt;
	var Xt;
	var qt;
	var Qt;
	var Zt;
	var er;
	var tr;
	var rr;
	var nr;
	var ir;
	var or;
	var sr;
	var ar;
	var cr;
	var lr;
	var ur;
	var pr;
	var hr;
	(function (e) {
		e[(e.DECLARATION = 0)] = "DECLARATION";
		e[(e.UNVERIFIED = 1)] = "UNVERIFIED";
	})((zt ||= {}));
	(function (e) {
		e[(e.DOUBLE = 1)] = "DOUBLE";
		e[(e.FLOAT = 2)] = "FLOAT";
		e[(e.INT64 = 3)] = "INT64";
		e[(e.UINT64 = 4)] = "UINT64";
		e[(e.INT32 = 5)] = "INT32";
		e[(e.FIXED64 = 6)] = "FIXED64";
		e[(e.FIXED32 = 7)] = "FIXED32";
		e[(e.BOOL = 8)] = "BOOL";
		e[(e.STRING = 9)] = "STRING";
		e[(e.GROUP = 10)] = "GROUP";
		e[(e.MESSAGE = 11)] = "MESSAGE";
		e[(e.BYTES = 12)] = "BYTES";
		e[(e.UINT32 = 13)] = "UINT32";
		e[(e.ENUM = 14)] = "ENUM";
		e[(e.SFIXED32 = 15)] = "SFIXED32";
		e[(e.SFIXED64 = 16)] = "SFIXED64";
		e[(e.SINT32 = 17)] = "SINT32";
		e[(e.SINT64 = 18)] = "SINT64";
	})((Xt ||= {}));
	(function (e) {
		e[(e.OPTIONAL = 1)] = "OPTIONAL";
		e[(e.REPEATED = 3)] = "REPEATED";
		e[(e.REQUIRED = 2)] = "REQUIRED";
	})((qt ||= {}));
	(function (e) {
		e[(e.SPEED = 1)] = "SPEED";
		e[(e.CODE_SIZE = 2)] = "CODE_SIZE";
		e[(e.LITE_RUNTIME = 3)] = "LITE_RUNTIME";
	})((Qt ||= {}));
	(function (e) {
		e[(e.STRING = 0)] = "STRING";
		e[(e.CORD = 1)] = "CORD";
		e[(e.STRING_PIECE = 2)] = "STRING_PIECE";
	})((Zt ||= {}));
	(function (e) {
		e[(e.JS_NORMAL = 0)] = "JS_NORMAL";
		e[(e.JS_STRING = 1)] = "JS_STRING";
		e[(e.JS_NUMBER = 2)] = "JS_NUMBER";
	})((er ||= {}));
	(function (e) {
		e[(e.RETENTION_UNKNOWN = 0)] = "RETENTION_UNKNOWN";
		e[(e.RETENTION_RUNTIME = 1)] = "RETENTION_RUNTIME";
		e[(e.RETENTION_SOURCE = 2)] = "RETENTION_SOURCE";
	})((tr ||= {}));
	(function (e) {
		e[(e.TARGET_TYPE_UNKNOWN = 0)] = "TARGET_TYPE_UNKNOWN";
		e[(e.TARGET_TYPE_FILE = 1)] = "TARGET_TYPE_FILE";
		e[(e.TARGET_TYPE_EXTENSION_RANGE = 2)] = "TARGET_TYPE_EXTENSION_RANGE";
		e[(e.TARGET_TYPE_MESSAGE = 3)] = "TARGET_TYPE_MESSAGE";
		e[(e.TARGET_TYPE_FIELD = 4)] = "TARGET_TYPE_FIELD";
		e[(e.TARGET_TYPE_ONEOF = 5)] = "TARGET_TYPE_ONEOF";
		e[(e.TARGET_TYPE_ENUM = 6)] = "TARGET_TYPE_ENUM";
		e[(e.TARGET_TYPE_ENUM_ENTRY = 7)] = "TARGET_TYPE_ENUM_ENTRY";
		e[(e.TARGET_TYPE_SERVICE = 8)] = "TARGET_TYPE_SERVICE";
		e[(e.TARGET_TYPE_METHOD = 9)] = "TARGET_TYPE_METHOD";
	})((rr ||= {}));
	(function (e) {
		e[(e.IDEMPOTENCY_UNKNOWN = 0)] = "IDEMPOTENCY_UNKNOWN";
		e[(e.NO_SIDE_EFFECTS = 1)] = "NO_SIDE_EFFECTS";
		e[(e.IDEMPOTENT = 2)] = "IDEMPOTENT";
	})((nr ||= {}));
	(function (e) {
		e[(e.FIELD_PRESENCE_UNKNOWN = 0)] = "FIELD_PRESENCE_UNKNOWN";
		e[(e.EXPLICIT = 1)] = "EXPLICIT";
		e[(e.IMPLICIT = 2)] = "IMPLICIT";
		e[(e.LEGACY_REQUIRED = 3)] = "LEGACY_REQUIRED";
	})((ir ||= {}));
	(function (e) {
		e[(e.ENUM_TYPE_UNKNOWN = 0)] = "ENUM_TYPE_UNKNOWN";
		e[(e.OPEN = 1)] = "OPEN";
		e[(e.CLOSED = 2)] = "CLOSED";
	})((or ||= {}));
	(function (e) {
		e[(e.REPEATED_FIELD_ENCODING_UNKNOWN = 0)] =
			"REPEATED_FIELD_ENCODING_UNKNOWN";
		e[(e.PACKED = 1)] = "PACKED";
		e[(e.EXPANDED = 2)] = "EXPANDED";
	})((sr ||= {}));
	(function (e) {
		e[(e.UTF8_VALIDATION_UNKNOWN = 0)] = "UTF8_VALIDATION_UNKNOWN";
		e[(e.VERIFY = 2)] = "VERIFY";
		e[(e.NONE = 3)] = "NONE";
	})((ar ||= {}));
	(function (e) {
		e[(e.MESSAGE_ENCODING_UNKNOWN = 0)] = "MESSAGE_ENCODING_UNKNOWN";
		e[(e.LENGTH_PREFIXED = 1)] = "LENGTH_PREFIXED";
		e[(e.DELIMITED = 2)] = "DELIMITED";
	})((cr ||= {}));
	(function (e) {
		e[(e.JSON_FORMAT_UNKNOWN = 0)] = "JSON_FORMAT_UNKNOWN";
		e[(e.ALLOW = 1)] = "ALLOW";
		e[(e.LEGACY_BEST_EFFORT = 2)] = "LEGACY_BEST_EFFORT";
	})((lr ||= {}));
	(function (e) {
		e[(e.ENFORCE_NAMING_STYLE_UNKNOWN = 0)] = "ENFORCE_NAMING_STYLE_UNKNOWN";
		e[(e.STYLE2024 = 1)] = "STYLE2024";
		e[(e.STYLE_LEGACY = 2)] = "STYLE_LEGACY";
	})((ur ||= {}));
	(function (e) {
		e[(e.NONE = 0)] = "NONE";
		e[(e.SET = 1)] = "SET";
		e[(e.ALIAS = 2)] = "ALIAS";
	})((pr ||= {}));
	(function (e) {
		e[(e.EDITION_UNKNOWN = 0)] = "EDITION_UNKNOWN";
		e[(e.EDITION_LEGACY = 900)] = "EDITION_LEGACY";
		e[(e.EDITION_PROTO2 = 998)] = "EDITION_PROTO2";
		e[(e.EDITION_PROTO3 = 999)] = "EDITION_PROTO3";
		e[(e.EDITION_2023 = 1000)] = "EDITION_2023";
		e[(e.EDITION_2024 = 1001)] = "EDITION_2024";
		e[(e.EDITION_1_TEST_ONLY = 1)] = "EDITION_1_TEST_ONLY";
		e[(e.EDITION_2_TEST_ONLY = 2)] = "EDITION_2_TEST_ONLY";
		e[(e.EDITION_99997_TEST_ONLY = 99997)] = "EDITION_99997_TEST_ONLY";
		e[(e.EDITION_99998_TEST_ONLY = 99998)] = "EDITION_99998_TEST_ONLY";
		e[(e.EDITION_99999_TEST_ONLY = 99999)] = "EDITION_99999_TEST_ONLY";
		e[(e.EDITION_MAX = 2147483647)] = "EDITION_MAX";
	})((hr ||= {}));
	const fr = {
		readUnknownFields: true,
	};
	function dr(e, t, r) {
		const n = De(e, undefined, false);
		yr(
			n,
			new Oe(t),
			(function (e) {
				if (e) {
					return Object.assign(Object.assign({}, fr), e);
				} else {
					return fr;
				}
			})(r),
			false,
			t.byteLength,
		);
		return n.message;
	}
	function yr(e, t, r, n, i) {
		const s = n ? t.len : t.pos + i;
		let a;
		let c;
		const l = e.getUnknown() ?? [];
		while (t.pos < s && (([a, c] = t.tag()), !n || c != Te.EndGroup)) {
			const n = e.findNumber(a);
			if (n) {
				mr(e, t, n, c, r);
			} else {
				const e = t.skip(c, a);
				if (r.readUnknownFields) {
					l.push({
						no: a,
						wireType: c,
						data: e,
					});
				}
			}
		}
		if (n && (c != Te.EndGroup || a !== i)) {
			throw new Error("invalid end group tag");
		}
		if (l.length > 0) {
			e.setUnknown(l);
		}
	}
	function mr(e, t, r, n, i) {
		switch (r.fieldKind) {
			case "scalar":
				e.set(r, vr(t, r.scalar));
				break;
			case "enum":
				e.set(r, vr(t, M.INT32));
				break;
			case "message":
				e.set(r, gr(t, i, r, e.get(r)));
				break;
			case "list":
				(function (e, t, r, n) {
					const o = r.field();
					if (o.listKind === "message") {
						r.add(gr(e, n, o));
						return;
					}
					const s = o.scalar ?? M.INT32;
					if (t != Te.LengthDelimited || s == M.STRING || s == M.BYTES) {
						r.add(vr(e, s));
						return;
					}
					const a = e.uint32() + e.pos;
					while (e.pos < a) {
						r.add(vr(e, s));
					}
				})(t, n, e.get(r), i);
				break;
			case "map":
				(function (e, t, r) {
					const n = t.field();
					let i;
					let o;
					const s = e.pos + e.uint32();
					while (e.pos < s) {
						const [t] = e.tag();
						switch (t) {
							case 1:
								i = vr(e, n.mapKey);
								break;
							case 2:
								switch (n.mapKind) {
									case "scalar":
										o = vr(e, n.scalar);
										break;
									case "enum":
										o = e.int32();
										break;
									case "message":
										o = gr(e, r, n);
								}
						}
					}
					if (i === undefined) {
						i = ee(n.mapKey, false);
					}
					if (o === undefined) {
						switch (n.mapKind) {
							case "scalar":
								o = ee(n.scalar, false);
								break;
							case "enum":
								o = n.enum.values[0].number;
								break;
							case "message":
								o = De(n.message, undefined, false);
						}
					}
					t.set(i, o);
				})(t, e.get(r), i);
		}
	}
	function gr(e, t, r, n) {
		const i = r.delimitedEncoding;
		const o = n ?? De(r.message, undefined, false);
		yr(o, e, t, i, i ? r.number : e.uint32());
		return o;
	}
	function vr(e, t) {
		switch (t) {
			case M.STRING:
				return e.string();
			case M.BOOL:
				return e.bool();
			case M.DOUBLE:
				return e.double();
			case M.FLOAT:
				return e.float();
			case M.INT32:
				return e.int32();
			case M.INT64:
				return e.int64();
			case M.UINT64:
				return e.uint64();
			case M.FIXED64:
				return e.fixed64();
			case M.BYTES:
				return e.bytes();
			case M.FIXED32:
				return e.fixed32();
			case M.SFIXED32:
				return e.sfixed32();
			case M.SFIXED64:
				return e.sfixed64();
			case M.SINT64:
				return e.sint64();
			case M.UINT32:
				return e.uint32();
			case M.SINT32:
				return e.sint32();
		}
	}
	function br(e, t) {
		const n = dr(
			Jt,
			(function (e) {
				const t = (function () {
					if (!et) {
						et = [];
						if (!Ze) {
							Ze =
								"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
									"",
								);
							Ze.slice(0, -2).concat("-", "_");
						}
						const e = Ze;
						for (let t = 0; t < e.length; t++) {
							et[e[t].charCodeAt(0)] = t;
						}
						et["-".charCodeAt(0)] = e.indexOf("+");
						et["_".charCodeAt(0)] = e.indexOf("/");
					}
					return et;
				})();
				let r = (e.length * 3) / 4;
				if (e[e.length - 2] == "=") {
					r -= 2;
				} else if (e[e.length - 1] == "=") {
					r -= 1;
				}
				let n;
				let i = new Uint8Array(r);
				let o = 0;
				let s = 0;
				let a = 0;
				for (let r = 0; r < e.length; r++) {
					n = t[e.charCodeAt(r)];
					if (n === undefined) {
						switch (e[r]) {
							case "=":
								s = 0;
							case "\n":
							case "\r":
							case "\t":
							case " ":
								continue;
							default:
								throw Error("invalid base64 string");
						}
					}
					switch (s) {
						case 0:
							a = n;
							s = 1;
							break;
						case 1:
							i[o++] = (a << 2) | ((n & 48) >> 4);
							a = n;
							s = 2;
							break;
						case 2:
							i[o++] = ((a & 15) << 4) | ((n & 60) >> 2);
							a = n;
							s = 3;
							break;
						case 3:
							i[o++] = ((a & 3) << 6) | n;
							s = 0;
					}
				}
				if (s == 1) {
					throw Error("invalid base64 string");
				}
				return i.subarray(0, o);
			})(e),
		);
		n.messageType.forEach(it);
		n.dependency = (t == null ? undefined : t.map((e) => e.proto.name)) ?? [];
		return st(n, (e) =>
			t == null ? undefined : t.find((t) => t.proto.name === e),
		).getFile(n.name);
	}
	const Er = br(
		"Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM",
	);
	const wr = Yt(Er, 0);
	const Sr = Yt(
		br(
			"CiBsaWNlbnNlX2tleS92MS9saWNlbnNlX2tleS5wcm90bxIObGljZW5zZV9rZXkudjEiQwoNT3JpZ2luTWF0Y2hlchIPCgVleGFjdBgBIAEoCUgAEhAKBnJlZ2V4cBgCIAEoCUgAQg8KDW1hdGNoX3BhdHRlcm4iYQoKRXhwaXJhdGlvbhIpCgVzdGFydBgBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASKAoFZ3JhY2UYAiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb24iKAoXTWlub3JWZXJzaW9uUmVzdHJpY3Rpb24SDQoFbWlub3IYASABKA0iNwoXUGF0Y2hWZXJzaW9uUmVzdHJpY3Rpb24SDQoFbWlub3IYASABKA0SDQoFcGF0Y2gYAiABKA0iqwEKDlZlcnNpb25NYXRjaGVyEkAKDW1pbm9yX3ZlcnNpb24YASABKAsyJy5saWNlbnNlX2tleS52MS5NaW5vclZlcnNpb25SZXN0cmljdGlvbkgAEkAKDXBhdGNoX3ZlcnNpb24YAiABKAsyJy5saWNlbnNlX2tleS52MS5QYXRjaFZlcnNpb25SZXN0cmljdGlvbkgAQhUKE3ZlcnNpb25fcmVzdHJpY3Rpb24i2gIKDkxpY2Vuc2VQYXlsb2FkEgoKAmlkGAEgASgJEg0KBXRyaWFsGAogASgIEhMKC2RldmVsb3BtZW50GBQgASgIEhIKCmVkaXRvcl9ncGwYHiABKAgSLgoKZXhwaXJhdGlvbhgoIAEoCzIaLmxpY2Vuc2Vfa2V5LnYxLkV4cGlyYXRpb24SEgoKZWRpdG9yX3VpZBgyIAEoCRIQCghwYWdlX3VpZBg8IAEoCRIcChRlZGl0b3JfbWFqb3JfdmVyc2lvbhhGIAEoDRI3Cg9lZGl0b3JfdmVyc2lvbnMYUCADKAsyHi5saWNlbnNlX2tleS52MS5WZXJzaW9uTWF0Y2hlchInCgdwbHVnaW5zGFogAygOMhYubGljZW5zZV9rZXkudjEuUGx1Z2luEi4KB29yaWdpbnMYZCADKAsyHS5saWNlbnNlX2tleS52MS5PcmlnaW5NYXRjaGVyKr8GCgZQbHVnaW4SFgoSUExVR0lOX1VOU1BFQ0lGSUVEEAASDgoKUExVR0lOX0FMTBABEhYKElBMVUdJTl9BMTFZQ0hFQ0tFUhACEhIKDlBMVUdJTl9BRFZDT0RFEAMSEwoPUExVR0lOX0FEVlRBQkxFEAQSFgoSUExVR0lOX0FEVlRFTVBMQVRFEAUSDQoJUExVR0lOX0FJEAYSFgoSUExVR0lOX0FVVE9DT1JSRUNUEAcSFQoRUExVR0lOX0NBU0VDSEFOR0UQCBIUChBQTFVHSU5fQ0hFQ0tMSVNUEAkSFAoQUExVR0lOX0VESVRJTUFHRRAKEhEKDVBMVUdJTl9FWFBPUlQQCxIUChBQTFVHSU5fRVhQT1JUUERGEAwSFQoRUExVR0lOX0VYUE9SVFdPUkQQDRIUChBQTFVHSU5fRk9PVE5PVEVTEA4SGAoUUExVR0lOX0ZPUk1BVFBBSU5URVIQDxIVChFQTFVHSU5fSU1QT1JUV09SRBAQEhQKEFBMVUdJTl9JTkxJTkVDU1MQERIWChJQTFVHSU5fTElOS0NIRUNLRVIQEhIPCgtQTFVHSU5fTUFUSBATEhMKD1BMVUdJTl9NQVJLRE9XThAUEhUKEVBMVUdJTl9NRURJQUVNQkVEEBUSEwoPUExVR0lOX01FTlRJT05TEBYSFAoQUExVR0lOX01FUkdFVEFHUxAXEhQKEFBMVUdJTl9QQUdFRU1CRUQQGBIXChNQTFVHSU5fUEVSTUFORU5UUEVOEBkSFQoRUExVR0lOX1BPV0VSUEFTVEUQGhIaChZQTFVHSU5fUkVWSVNJT05ISVNUT1JZEBsSGgoWUExVR0lOX1RBQkxFT0ZDT05URU5UUxAcEhcKE1BMVUdJTl9USU5ZQ09NTUVOVFMQHRIUChBQTFVHSU5fVElOWURSSVZFEB4SHgoaUExVR0lOX1RJTllNQ0VTUEVMTENIRUNLRVIQHxIVChFQTFVHSU5fVFlQT0dSQVBIWRAgEhUKEVBMVUdJTl9VUExPQURDQVJFECESGQoVUExVR0lOX1NVR0dFU1RFREVESVRTECISFwoTUExVR0lOX0ZVTExQQUdFSFRNTBAjQnoKEmNvbS5saWNlbnNlX2tleS52MUIPTGljZW5zZUtleVByb3RvUAGiAgNMWFiqAg1MaWNlbnNlS2V5LlYxygINTGljZW5zZUtleVxWMeICGUxpY2Vuc2VLZXlcVjFcR1BCTWV0YWRhdGHqAg5MaWNlbnNlS2V5OjpWMWIGcHJvdG8z",
			[
				br(
					"Ch5nb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIqCghEdXJhdGlvbhIPCgdzZWNvbmRzGAEgASgDEg0KBW5hbm9zGAIgASgFQoMBChNjb20uZ29vZ2xlLnByb3RvYnVmQg1EdXJhdGlvblByb3RvUAFaMWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2R1cmF0aW9ucGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw",
				),
				Er,
			],
		),
		5,
	);
	var _0x369b1b;
	(function (_0x556a83) {
		_0x556a83[(_0x556a83.UNSPECIFIED = 0)] = "UNSPECIFIED";
		_0x556a83[(_0x556a83.ALL = 1)] = "ALL";
		_0x556a83[(_0x556a83.A11YCHECKER = 2)] = "A11YCHECKER";
		_0x556a83[(_0x556a83.ADVCODE = 3)] = "ADVCODE";
		_0x556a83[(_0x556a83.ADVTABLE = 4)] = "ADVTABLE";
		_0x556a83[(_0x556a83.ADVTEMPLATE = 5)] = "ADVTEMPLATE";
		_0x556a83[(_0x556a83.AI = 6)] = "AI";
		_0x556a83[(_0x556a83.AUTOCORRECT = 7)] = "AUTOCORRECT";
		_0x556a83[(_0x556a83.CASECHANGE = 8)] = "CASECHANGE";
		_0x556a83[(_0x556a83.CHECKLIST = 9)] = "CHECKLIST";
		_0x556a83[(_0x556a83.EDITIMAGE = 10)] = "EDITIMAGE";
		_0x556a83[(_0x556a83.EXPORT = 11)] = "EXPORT";
		_0x556a83[(_0x556a83.EXPORTPDF = 12)] = "EXPORTPDF";
		_0x556a83[(_0x556a83.EXPORTWORD = 13)] = "EXPORTWORD";
		_0x556a83[(_0x556a83.FOOTNOTES = 14)] = "FOOTNOTES";
		_0x556a83[(_0x556a83.FORMATPAINTER = 15)] = "FORMATPAINTER";
		_0x556a83[(_0x556a83.IMPORTWORD = 16)] = "IMPORTWORD";
		_0x556a83[(_0x556a83.INLINECSS = 17)] = "INLINECSS";
		_0x556a83[(_0x556a83.LINKCHECKER = 18)] = "LINKCHECKER";
		_0x556a83[(_0x556a83.MATH = 19)] = "MATH";
		_0x556a83[(_0x556a83.MARKDOWN = 20)] = "MARKDOWN";
		_0x556a83[(_0x556a83.MEDIAEMBED = 21)] = "MEDIAEMBED";
		_0x556a83[(_0x556a83.MENTIONS = 22)] = "MENTIONS";
		_0x556a83[(_0x556a83.MERGETAGS = 23)] = "MERGETAGS";
		_0x556a83[(_0x556a83.PAGEEMBED = 24)] = "PAGEEMBED";
		_0x556a83[(_0x556a83.PERMANENTPEN = 25)] = "PERMANENTPEN";
		_0x556a83[(_0x556a83.POWERPASTE = 26)] = "POWERPASTE";
		_0x556a83[(_0x556a83.REVISIONHISTORY = 27)] = "REVISIONHISTORY";
		_0x556a83[(_0x556a83.TABLEOFCONTENTS = 28)] = "TABLEOFCONTENTS";
		_0x556a83[(_0x556a83.TINYCOMMENTS = 29)] = "TINYCOMMENTS";
		_0x556a83[(_0x556a83.TINYDRIVE = 30)] = "TINYDRIVE";
		_0x556a83[(_0x556a83.TINYMCESPELLCHECKER = 31)] = "TINYMCESPELLCHECKER";
		_0x556a83[(_0x556a83.TYPOGRAPHY = 32)] = "TYPOGRAPHY";
		_0x556a83[(_0x556a83.UPLOADCARE = 33)] = "UPLOADCARE";
		_0x556a83[(_0x556a83.SUGGESTEDEDITS = 34)] = "SUGGESTEDEDITS";
		_0x556a83[(_0x556a83.FULLPAGEHTML = 35)] = "FULLPAGEHTML";
	})((_0x369b1b ||= {}));
	const _0x449265 = (_0x5ae8b7) =>
		(function (_0x2f5dbd) {
			return new Date(
				(function (_0x3d2a13) {
					return (
						Number(_0x3d2a13.seconds) * 1000 +
						Math.ceil(_0x3d2a13.nanos / 1000000)
					);
				})(_0x2f5dbd),
			);
		})(he(wr, _0x5ae8b7));
	const _0x56babb = (_0x59303b) => {
		return Number(_0x59303b.seconds ?? 0) * 1000;
	};
	const _0x3a8ac5 = (_0x1f9041) => {
		const _0x664fb6 = p.from(_0x1f9041.grace).getOr(0);
		return p
			.from(_0x1f9041.start)
			.map((_0x432a34) => new Date(_0x432a34.getTime() + _0x664fb6));
	};
	const _0x350c42 = (_0x35ccf1) => ({
		$typeName: "license_key.v1.Expiration",
		start: p.from(_0x35ccf1.start).map(_0x449265).getOrUndefined(),
		grace: p.from(_0x35ccf1.grace).map(_0x56babb).getOrUndefined(),
	});
	Object.keys(_0x369b1b).filter((_0x27f8c7) => Number.isNaN(+_0x27f8c7));
	const _0xf6e815 = (_0x5a801b) => _0x369b1b[_0x5a801b];
	var _0x4108c4;
	(function (_0x2e8cf6) {
		_0x2e8cf6.FormatInvalid = "decode_format_invalid";
		_0x2e8cf6.PayloadFailture = "decode_payload_failure";
		_0x2e8cf6.ParseFailure = "decode_parse_failure";
	})((_0x4108c4 ||= {}));
	const _0x387dcf =
		/^(GPL\+)?T(\d+)LK:([a-zA-Z0-9_-]+\.([a-zA-Z0-9_-]+)\.[a-zA-Z0-9_-]+)$/;
	const _0x56e779 = (_0x15fa54) =>
		((_0x4b68e3) =>
			v
				.fromOption(p.from(_0x387dcf.exec(_0x4b68e3)), {
					type: _0x4108c4.FormatInvalid,
					message: "License key is an incorrect format.",
				})
				.bind((_0x557250) => {
					const _0x3d84f0 = i(_0x557250[1]);
					const _0x24310a = ((_0x199269, _0x32a7be = 10) => {
						const _0x2cbbc3 = parseInt(_0x199269, _0x32a7be);
						if (isNaN(_0x2cbbc3)) {
							return p.none();
						} else {
							return p.some(_0x2cbbc3);
						}
					})(_0x557250[2]);
					_0x4156dc = p.from(_0x557250[3]);
					_0x2ec4ee = (_0xf4de3b, _0x4b1c67) => ({
						hasGplTag: _0x3d84f0,
						version: _0xf4de3b,
						jws: _0x4b1c67,
					});
					const _0x4ff4b8 =
						(_0x6b7d28 = _0x24310a).isSome() && _0x4156dc.isSome()
							? p.some(_0x2ec4ee(_0x6b7d28.getOrDie(), _0x4156dc.getOrDie()))
							: p.none();
					var _0x6b7d28;
					var _0x4156dc;
					var _0x2ec4ee;
					return v.fromOption(_0x4ff4b8, {
						type: _0x4108c4.FormatInvalid,
						message: "License key is an incorrect format.",
					});
				}))(_0x15fa54).bind((_0xb52f9b) =>
			((_0x166c76) => {
				const _0x47707c = _0x166c76.split(".");
				if (_0x47707c.length !== 3) {
					return v.error(_0x28ac07.FormatInvalid);
				}
				const [_0x4a6f37, _0x296369, _0x502785] = _0x47707c;
				const _0x54f981 = new window.TextDecoder();
				const _0x1a6a33 = _0x3f9df1(_0x4a6f37)
					.bind((_0xe55f1e) =>
						_0x2a81b9(
							() => JSON.parse(_0x54f981.decode(_0xe55f1e)),
							_0x14826e("Unable to parse protected header"),
						),
					)
					.toOptional();
				_0x9fa609 = _0x3f9df1(_0x296369).toOptional();
				_0x4db416 = _0x3f9df1(_0x502785).toOptional();
				_0x7052f2 = (_0x55b5f9, _0x1468cb, _0x3ba699) => ({
					protectedHeader: _0x55b5f9,
					payload: _0x1468cb,
					signature: _0x3ba699,
				});
				const _0xe498e1 =
					(_0xabe6e9 = _0x1a6a33).isSome() &&
					_0x9fa609.isSome() &&
					_0x4db416.isSome()
						? p.some(
								_0x7052f2(
									_0xabe6e9.getOrDie(),
									_0x9fa609.getOrDie(),
									_0x4db416.getOrDie(),
								),
							)
						: p.none();
				var _0xabe6e9;
				var _0x9fa609;
				var _0x4db416;
				var _0x7052f2;
				return v.fromOption(_0xe498e1, _0x28ac07.DecodeFailure);
			})(_0xb52f9b.jws)
				.mapError(() => ({
					type: _0x4108c4.ParseFailure,
					message: "License key is an incorrect format.",
				}))
				.bind((_0x1679eb) => {
					return ((_0x45598d = _0x1679eb.payload),
					((_0x4e6a35) =>
						((_0x9bf1fa) => {
							try {
								const _0x3b90c9 = dr(Sr, _0x9bf1fa, {
									readUnknownFields: false,
								});
								return v.value(_0x3b90c9);
							} catch (_0xd28be2) {
								const _0x35a05f =
									_0xd28be2 instanceof Error
										? _0xd28be2
										: new Error("Unable to decode payload");
								return v.error(_0x35a05f);
							}
						})(_0x4e6a35).map((_0x404594) => {
							const _0x12ed12 = _0x404594.expiration;
							const _0x530a25 = p
								.from(_0x12ed12)
								.map(_0x350c42)
								.getOrUndefined();
							return {
								..._0x404594,
								expiration: _0x530a25,
							};
						}))(_0x45598d).mapError(() => ({
						type: _0x4108c4.PayloadFailture,
						message: "License key payload is invalid.",
					}))).map((_0x2c5102) => ({
						..._0xb52f9b,
						..._0x1679eb,
						payload: _0x2c5102,
					}));
					var _0x45598d;
				}),
		);
	var Rr;
	(function (e) {
		(function () {
			var t =
				typeof globalThis == "object"
					? globalThis
					: typeof global == "object"
						? global
						: typeof self == "object"
							? self
							: typeof this == "object"
								? this
								: (function () {
										try {
											return Function("return this;")();
										} catch (e) {}
									})() ||
									(function () {
										try {
											return (0, eval)("(function() { return this; })()");
										} catch (e) {}
									})();
			var r = n(e);
			function n(e, t) {
				return function (r, n) {
					Object.defineProperty(e, r, {
						configurable: true,
						writable: true,
						value: n,
					});
					if (t) {
						t(r, n);
					}
				};
			}
			if (t.Reflect !== undefined) {
				r = n(t.Reflect, r);
			}
			(function (e, t) {
				var r = Object.prototype.hasOwnProperty;
				var n = typeof Symbol == "function";
				var i =
					n && Symbol.toPrimitive !== undefined
						? Symbol.toPrimitive
						: "@@toPrimitive";
				var o =
					n && Symbol.iterator !== undefined ? Symbol.iterator : "@@iterator";
				var s = typeof Object.create == "function";
				var a =
					{
						__proto__: [],
					} instanceof Array;
				var c = !s && !a;
				var l = {
					create: s
						? function () {
								return H(Object.create(null));
							}
						: a
							? function () {
									return H({
										__proto__: null,
									});
								}
							: function () {
									return H({});
								},
					has: c
						? function (e, t) {
								return r.call(e, t);
							}
						: function (e, t) {
								return t in e;
							},
					get: c
						? function (e, t) {
								if (r.call(e, t)) {
									return e[t];
								} else {
									return undefined;
								}
							}
						: function (e, t) {
								return e[t];
							},
				};
				var u = Object.getPrototypeOf(Function);
				var p =
					typeof Map == "function" && typeof Map.prototype.entries == "function"
						? Map
						: (function () {
								var e = {};
								var t = [];
								var r = (function () {
									function e(e, t, r) {
										this._index = 0;
										this._keys = e;
										this._values = t;
										this._selector = r;
									}
									e.prototype["@@iterator"] = function () {
										return this;
									};
									e.prototype[o] = function () {
										return this;
									};
									e.prototype.next = function () {
										var e = this._index;
										if (e >= 0 && e < this._keys.length) {
											var r = this._selector(this._keys[e], this._values[e]);
											if (e + 1 >= this._keys.length) {
												this._index = -1;
												this._keys = t;
												this._values = t;
											} else {
												this._index++;
											}
											return {
												value: r,
												done: false,
											};
										}
										return {
											value: undefined,
											done: true,
										};
									};
									e.prototype.throw = function (e) {
										if (this._index >= 0) {
											this._index = -1;
											this._keys = t;
											this._values = t;
										}
										throw e;
									};
									e.prototype.return = function (e) {
										if (this._index >= 0) {
											this._index = -1;
											this._keys = t;
											this._values = t;
										}
										return {
											value: e,
											done: true,
										};
									};
									return e;
								})();
								var n = (function () {
									function t() {
										this._keys = [];
										this._values = [];
										this._cacheKey = e;
										this._cacheIndex = -2;
									}
									Object.defineProperty(t.prototype, "size", {
										get: function () {
											return this._keys.length;
										},
										enumerable: true,
										configurable: true,
									});
									t.prototype.has = function (e) {
										return this._find(e, false) >= 0;
									};
									t.prototype.get = function (e) {
										var t = this._find(e, false);
										if (t >= 0) {
											return this._values[t];
										} else {
											return undefined;
										}
									};
									t.prototype.set = function (e, t) {
										var r = this._find(e, true);
										this._values[r] = t;
										return this;
									};
									t.prototype.delete = function (t) {
										var r = this._find(t, false);
										if (r >= 0) {
											for (var n = this._keys.length, i = r + 1; i < n; i++) {
												this._keys[i - 1] = this._keys[i];
												this._values[i - 1] = this._values[i];
											}
											this._keys.length--;
											this._values.length--;
											if (U(t, this._cacheKey)) {
												this._cacheKey = e;
												this._cacheIndex = -2;
											}
											return true;
										}
										return false;
									};
									t.prototype.clear = function () {
										this._keys.length = 0;
										this._values.length = 0;
										this._cacheKey = e;
										this._cacheIndex = -2;
									};
									t.prototype.keys = function () {
										return new r(this._keys, this._values, i);
									};
									t.prototype.values = function () {
										return new r(this._keys, this._values, s);
									};
									t.prototype.entries = function () {
										return new r(this._keys, this._values, a);
									};
									t.prototype["@@iterator"] = function () {
										return this.entries();
									};
									t.prototype[o] = function () {
										return this.entries();
									};
									t.prototype._find = function (e, t) {
										if (!U(this._cacheKey, e)) {
											this._cacheIndex = -1;
											for (var r = 0; r < this._keys.length; r++) {
												if (U(this._keys[r], e)) {
													this._cacheIndex = r;
													break;
												}
											}
										}
										if (this._cacheIndex < 0 && t) {
											this._cacheIndex = this._keys.length;
											this._keys.push(e);
											this._values.push(undefined);
										}
										return this._cacheIndex;
									};
									return t;
								})();
								return n;
								function i(e, t) {
									return e;
								}
								function s(e, t) {
									return t;
								}
								function a(e, t) {
									return [e, t];
								}
							})();
				var h =
					typeof Set == "function" && typeof Set.prototype.entries == "function"
						? Set
						: (function () {
								var e = (function () {
									function e() {
										this._map = new p();
									}
									Object.defineProperty(e.prototype, "size", {
										get: function () {
											return this._map.size;
										},
										enumerable: true,
										configurable: true,
									});
									e.prototype.has = function (e) {
										return this._map.has(e);
									};
									e.prototype.add = function (e) {
										this._map.set(e, e);
										return this;
									};
									e.prototype.delete = function (e) {
										return this._map.delete(e);
									};
									e.prototype.clear = function () {
										this._map.clear();
									};
									e.prototype.keys = function () {
										return this._map.keys();
									};
									e.prototype.values = function () {
										return this._map.keys();
									};
									e.prototype.entries = function () {
										return this._map.entries();
									};
									e.prototype["@@iterator"] = function () {
										return this.keys();
									};
									e.prototype[o] = function () {
										return this.keys();
									};
									return e;
								})();
								return e;
							})();
				var f =
					typeof WeakMap == "function"
						? WeakMap
						: (function () {
								var e = l.create();
								var t = n();
								return (function () {
									function e() {
										this._key = n();
									}
									e.prototype.has = function (e) {
										var t = i(e, false);
										return t !== undefined && l.has(t, this._key);
									};
									e.prototype.get = function (e) {
										var t = i(e, false);
										if (t !== undefined) {
											return l.get(t, this._key);
										} else {
											return undefined;
										}
									};
									e.prototype.set = function (e, t) {
										i(e, true)[this._key] = t;
										return this;
									};
									e.prototype.delete = function (e) {
										var t = i(e, false);
										return t !== undefined && delete t[this._key];
									};
									e.prototype.clear = function () {
										this._key = n();
									};
									return e;
								})();
								function n() {
									var t;
									do {
										t = "@@WeakMap@@" + s();
									} while (l.has(e, t));
									e[t] = true;
									return t;
								}
								function i(e, n) {
									if (!r.call(e, t)) {
										if (!n) {
											return;
										}
										Object.defineProperty(e, t, {
											value: l.create(),
										});
									}
									return e[t];
								}
								function o(e, t) {
									for (var r = 0; r < t; ++r) {
										e[r] = (Math.random() * 255) | 0;
									}
									return e;
								}
								function s() {
									var e = (function (e) {
										if (typeof Uint8Array == "function") {
											var t = new Uint8Array(e);
											if (typeof crypto != "undefined") {
												crypto.getRandomValues(t);
											} else if (typeof msCrypto != "undefined") {
												msCrypto.getRandomValues(t);
											} else {
												o(t, e);
											}
											return t;
										}
										return o(new Array(e), e);
									})(16);
									e[6] = (e[6] & 79) | 64;
									e[8] = (e[8] & 191) | 128;
									var t = "";
									for (var r = 0; r < 16; ++r) {
										var n = e[r];
										if (r === 4 || r === 6 || r === 8) {
											t += "-";
										}
										if (n < 16) {
											t += "0";
										}
										t += n.toString(16).toLowerCase();
									}
									return t;
								}
							})();
				var d = n ? Symbol.for("@reflect-metadata:registry") : undefined;
				var y = (function () {
					var e;
					if (!T(d) && I(t.Reflect) && Object.isExtensible(t.Reflect)) {
						e = t.Reflect[d];
					}
					if (T(e)) {
						e = (function () {
							var e;
							var r;
							var n;
							var i;
							if (
								!T(d) &&
								t.Reflect !== undefined &&
								!(d in t.Reflect) &&
								typeof t.Reflect.defineMetadata == "function"
							) {
								e = (function (e) {
									var t = e.defineMetadata;
									var r = e.hasOwnMetadata;
									var n = e.getOwnMetadata;
									var i = e.getOwnMetadataKeys;
									var o = e.deleteMetadata;
									var s = new f();
									return {
										isProviderFor: function (e, t) {
											var r = s.get(e);
											return (
												(!T(r) && !!r.has(t)) ||
												(!!i(e, t).length &&
													(T(r) && ((r = new h()), s.set(e, r)),
													r.add(t),
													true))
											);
										},
										OrdinaryDefineOwnMetadata: t,
										OrdinaryHasOwnMetadata: r,
										OrdinaryGetOwnMetadata: n,
										OrdinaryOwnMetadataKeys: i,
										OrdinaryDeleteMetadata: o,
									};
								})(t.Reflect);
							}
							var o = new f();
							var s = {
								registerProvider: a,
								getProvider: l,
								setProvider: y,
							};
							return s;
							function a(t) {
								if (!Object.isExtensible(s)) {
									throw new Error("Cannot add provider to a frozen registry.");
								}
								switch (true) {
									case e === t:
										break;
									case T(r):
										r = t;
										break;
									case r === t:
										break;
									case T(n):
										n = t;
										break;
									case n === t:
										break;
									default:
										if (i === undefined) {
											i = new h();
										}
										i.add(t);
								}
							}
							function c(t, o) {
								if (!T(r)) {
									if (r.isProviderFor(t, o)) {
										return r;
									}
									if (!T(n)) {
										if (n.isProviderFor(t, o)) {
											return r;
										}
										if (!T(i)) {
											var s = P(i);
											while (true) {
												var a = j(s);
												if (!a) {
													return;
												}
												var c = V(a);
												if (c.isProviderFor(t, o)) {
													L(s);
													return c;
												}
											}
										}
									}
								}
								if (!T(e) && e.isProviderFor(t, o)) {
									return e;
								}
							}
							function l(e, t) {
								var r;
								var n = o.get(e);
								if (!T(n)) {
									r = n.get(t);
								}
								if (T(r)) {
									if (!T((r = c(e, t)))) {
										if (T(n)) {
											n = new p();
											o.set(e, n);
										}
										n.set(t, r);
									}
									return r;
								} else {
									return r;
								}
							}
							function u(e) {
								if (T(e)) {
									throw new TypeError();
								}
								return r === e || n === e || (!T(i) && i.has(e));
							}
							function y(e, t, r) {
								if (!u(r)) {
									throw new Error("Metadata provider not registered.");
								}
								var n = l(e, t);
								if (n !== r) {
									if (!T(n)) {
										return false;
									}
									var i = o.get(e);
									if (T(i)) {
										i = new p();
										o.set(e, i);
									}
									i.set(t, r);
								}
								return true;
							}
						})();
					}
					if (!T(d) && I(t.Reflect) && Object.isExtensible(t.Reflect)) {
						Object.defineProperty(t.Reflect, d, {
							enumerable: false,
							configurable: false,
							writable: false,
							value: e,
						});
					}
					return e;
				})();
				var m = (function (e) {
					var t = new f();
					var r = {
						isProviderFor: function (e, r) {
							var n = t.get(e);
							return !T(n) && n.has(r);
						},
						OrdinaryDefineOwnMetadata: function (e, t, r, i) {
							n(r, i, true).set(e, t);
						},
						OrdinaryHasOwnMetadata: function (e, t, r) {
							var i = n(t, r, false);
							return !T(i) && B(i.has(e));
						},
						OrdinaryGetOwnMetadata: function (e, t, r) {
							var i = n(t, r, false);
							if (!T(i)) {
								return i.get(e);
							}
						},
						OrdinaryOwnMetadataKeys: function (e, t) {
							var r = [];
							var i = n(e, t, false);
							if (T(i)) {
								return r;
							}
							var o = P(i.keys());
							var s = 0;
							while (true) {
								var a = j(o);
								if (!a) {
									r.length = s;
									return r;
								}
								var c = V(a);
								try {
									r[s] = c;
								} catch (e) {
									try {
										L(o);
									} finally {
										throw e;
									}
								}
								s++;
							}
						},
						OrdinaryDeleteMetadata: function (e, r, i) {
							var o = n(r, i, false);
							if (T(o)) {
								return false;
							}
							if (!o.delete(e)) {
								return false;
							}
							if (o.size === 0) {
								var s = t.get(r);
								if (!T(s)) {
									s.delete(i);
									if (s.size === 0) {
										t.delete(s);
									}
								}
							}
							return true;
						},
					};
					y.registerProvider(r);
					return r;
					function n(n, i, o) {
						var s = t.get(n);
						var a = false;
						if (T(s)) {
							if (!o) {
								return;
							}
							s = new p();
							t.set(n, s);
							a = true;
						}
						var c = s.get(i);
						if (T(c)) {
							if (!o) {
								return;
							}
							c = new p();
							s.set(i, c);
							if (!e.setProvider(n, i, r)) {
								s.delete(i);
								if (a) {
									t.delete(n);
								}
								throw new Error("Wrong provider for target.");
							}
						}
						return c;
					}
				})(y);
				function g(e, t, r) {
					if (v(e, t, r)) {
						return true;
					}
					var n = F(t);
					return !O(n) && g(e, n, r);
				}
				function v(e, t, r) {
					var n = M(t, r, false);
					return !T(n) && B(n.OrdinaryHasOwnMetadata(e, t, r));
				}
				function b(e, t, r) {
					if (v(e, t, r)) {
						return E(e, t, r);
					}
					var n = F(t);
					if (O(n)) {
						return undefined;
					} else {
						return b(e, n, r);
					}
				}
				function E(e, t, r) {
					var n = M(t, r, false);
					if (!T(n)) {
						return n.OrdinaryGetOwnMetadata(e, t, r);
					}
				}
				function w(e, t, r, n) {
					M(r, n, true).OrdinaryDefineOwnMetadata(e, t, r, n);
				}
				function S(e, t) {
					var r = A(e, t);
					var n = F(e);
					if (n === null) {
						return r;
					}
					var i = S(n, t);
					if (i.length <= 0) {
						return r;
					}
					if (r.length <= 0) {
						return i;
					}
					var o = new h();
					var s = [];
					for (var a = 0, c = r; a < c.length; a++) {
						var l = c[a];
						if (!o.has(l)) {
							o.add(l);
							s.push(l);
						}
					}
					for (var u = 0, p = i; u < p.length; u++) {
						l = p[u];
						if (!o.has(l)) {
							o.add(l);
							s.push(l);
						}
					}
					return s;
				}
				function A(e, t) {
					var r = M(e, t, false);
					if (r) {
						return r.OrdinaryOwnMetadataKeys(e, t);
					} else {
						return [];
					}
				}
				function N(e) {
					if (e === null) {
						return 1;
					}
					switch (typeof e) {
						case "undefined":
							return 0;
						case "boolean":
							return 2;
						case "string":
							return 3;
						case "symbol":
							return 4;
						case "number":
							return 5;
						case "object":
							if (e === null) {
								return 1;
							} else {
								return 6;
							}
						default:
							return 6;
					}
				}
				function T(e) {
					return e === undefined;
				}
				function O(e) {
					return e === null;
				}
				function I(e) {
					if (typeof e == "object") {
						return e !== null;
					} else {
						return typeof e == "function";
					}
				}
				function k(e, t) {
					switch (N(e)) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
							return e;
					}
					var r = D(e, i);
					if (r !== undefined) {
						var n = r.call(e, "string");
						if (I(n)) {
							throw new TypeError();
						}
						return n;
					}
					return (function (e) {
						var t;
						var r;
						var n = e.toString;
						if (R(n) && !I((r = n.call(e)))) {
							return r;
						}
						if (R((t = e.valueOf)) && !I((r = t.call(e)))) {
							return r;
						}
						throw new TypeError();
					})(e);
				}
				function B(e) {
					return !!e;
				}
				function x(e) {
					var t = k(e);
					if (typeof t == "symbol") {
						return t;
					} else {
						return (function (e) {
							return "" + e;
						})(t);
					}
				}
				function C(e) {
					if (Array.isArray) {
						return Array.isArray(e);
					} else if (e instanceof Object) {
						return e instanceof Array;
					} else {
						return Object.prototype.toString.call(e) === "[object Array]";
					}
				}
				function R(e) {
					return typeof e == "function";
				}
				function _(e) {
					return typeof e == "function";
				}
				function U(e, t) {
					return e === t || (e != e && t != t);
				}
				function D(e, t) {
					var r = e[t];
					if (r != null) {
						if (!R(r)) {
							throw new TypeError();
						}
						return r;
					}
				}
				function P(e) {
					var t = D(e, o);
					if (!R(t)) {
						throw new TypeError();
					}
					var r = t.call(e);
					if (!I(r)) {
						throw new TypeError();
					}
					return r;
				}
				function V(e) {
					return e.value;
				}
				function j(e) {
					var t = e.next();
					return !t.done && t;
				}
				function L(e) {
					var t = e.return;
					if (t) {
						t.call(e);
					}
				}
				function F(e) {
					var t = Object.getPrototypeOf(e);
					if (typeof e != "function" || e === u) {
						return t;
					}
					if (t !== u) {
						return t;
					}
					var r = e.prototype;
					var n = r && Object.getPrototypeOf(r);
					if (n == null || n === Object.prototype) {
						return t;
					}
					var i = n.constructor;
					if (typeof i != "function" || i === e) {
						return t;
					} else {
						return i;
					}
				}
				function M(e, t, r) {
					var n = y.getProvider(e, t);
					if (!T(n)) {
						return n;
					}
					if (r) {
						if (y.setProvider(e, t, m)) {
							return m;
						}
						throw new Error("Illegal state.");
					}
				}
				function H(e) {
					e.__ = undefined;
					delete e.__;
					return e;
				}
				e("decorate", function (e, t, r, n) {
					if (T(r)) {
						if (!C(e)) {
							throw new TypeError();
						}
						if (!_(t)) {
							throw new TypeError();
						}
						return (function (e, t) {
							for (var r = e.length - 1; r >= 0; --r) {
								var n = (0, e[r])(t);
								if (!T(n) && !O(n)) {
									if (!_(n)) {
										throw new TypeError();
									}
									t = n;
								}
							}
							return t;
						})(e, t);
					}
					if (!C(e)) {
						throw new TypeError();
					}
					if (!I(t)) {
						throw new TypeError();
					}
					if (!I(n) && !T(n) && !O(n)) {
						throw new TypeError();
					}
					if (O(n)) {
						n = undefined;
					}
					return (function (e, t, r, n) {
						for (var i = e.length - 1; i >= 0; --i) {
							var o = (0, e[i])(t, r, n);
							if (!T(o) && !O(o)) {
								if (!I(o)) {
									throw new TypeError();
								}
								n = o;
							}
						}
						return n;
					})(e, t, (r = x(r)), n);
				});
				e("metadata", function (e, t) {
					return function (r, n) {
						if (!I(r)) {
							throw new TypeError();
						}
						if (
							!T(n) &&
							!(function (e) {
								switch (N(e)) {
									case 3:
									case 4:
										return true;
									default:
										return false;
								}
							})(n)
						) {
							throw new TypeError();
						}
						w(e, t, r, n);
					};
				});
				e("defineMetadata", function (e, t, r, n) {
					if (!I(r)) {
						throw new TypeError();
					}
					if (!T(n)) {
						n = x(n);
					}
					return w(e, t, r, n);
				});
				e("hasMetadata", function (e, t, r) {
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					return g(e, t, r);
				});
				e("hasOwnMetadata", function (e, t, r) {
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					return v(e, t, r);
				});
				e("getMetadata", function (e, t, r) {
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					return b(e, t, r);
				});
				e("getOwnMetadata", function (e, t, r) {
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					return E(e, t, r);
				});
				e("getMetadataKeys", function (e, t) {
					if (!I(e)) {
						throw new TypeError();
					}
					if (!T(t)) {
						t = x(t);
					}
					return S(e, t);
				});
				e("getOwnMetadataKeys", function (e, t) {
					if (!I(e)) {
						throw new TypeError();
					}
					if (!T(t)) {
						t = x(t);
					}
					return A(e, t);
				});
				e("deleteMetadata", function (e, t, r) {
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					if (!I(t)) {
						throw new TypeError();
					}
					if (!T(r)) {
						r = x(r);
					}
					var n = M(t, r, false);
					return !T(n) && n.OrdinaryDeleteMetadata(e, t, r);
				});
			})(r, t);
			if (t.Reflect === undefined) {
				t.Reflect = e;
			}
		})();
	})((Rr ||= {}));
	class _r {
		static isArrayBuffer(e) {
			return Object.prototype.toString.call(e) === "[object ArrayBuffer]";
		}
		static toArrayBuffer(e) {
			if (this.isArrayBuffer(e)) {
				return e;
			} else if (
				e.byteLength === e.buffer.byteLength ||
				(e.byteOffset === 0 && e.byteLength === e.buffer.byteLength)
			) {
				return e.buffer;
			} else {
				return this.toUint8Array(e.buffer).slice(
					e.byteOffset,
					e.byteOffset + e.byteLength,
				).buffer;
			}
		}
		static toUint8Array(e) {
			return this.toView(e, Uint8Array);
		}
		static toView(e, t) {
			if (e.constructor === t) {
				return e;
			}
			if (this.isArrayBuffer(e)) {
				return new t(e);
			}
			if (this.isArrayBufferView(e)) {
				return new t(e.buffer, e.byteOffset, e.byteLength);
			}
			throw new TypeError(
				"The provided value is not of type '(ArrayBuffer or ArrayBufferView)'",
			);
		}
		static isBufferSource(e) {
			return this.isArrayBufferView(e) || this.isArrayBuffer(e);
		}
		static isArrayBufferView(e) {
			return ArrayBuffer.isView(e) || (e && this.isArrayBuffer(e.buffer));
		}
		static isEqual(e, t) {
			const r = _r.toUint8Array(e);
			const n = _r.toUint8Array(t);
			if (r.length !== n.byteLength) {
				return false;
			}
			for (let e = 0; e < r.length; e++) {
				if (r[e] !== n[e]) {
					return false;
				}
			}
			return true;
		}
		static concat(...e) {
			let t;
			t =
				!Array.isArray(e[0]) || e[1] instanceof Function
					? Array.isArray(e[0]) && e[1] instanceof Function
						? e[0]
						: e[e.length - 1] instanceof Function
							? e.slice(0, e.length - 1)
							: e
					: e[0];
			let r = 0;
			for (const e of t) {
				r += e.byteLength;
			}
			const n = new Uint8Array(r);
			let i = 0;
			for (const e of t) {
				const t = this.toUint8Array(e);
				n.set(t, i);
				i += t.length;
			}
			if (e[e.length - 1] instanceof Function) {
				return this.toView(n, e[e.length - 1]);
			} else {
				return n.buffer;
			}
		}
	}
	const Ur = "string";
	const Dr = /^[0-9a-f\s]+$/i;
	const Pr = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
	const Vr = /^[a-zA-Z0-9-_]+$/;
	class jr {
		static fromString(e) {
			const t = unescape(encodeURIComponent(e));
			const r = new Uint8Array(t.length);
			for (let e = 0; e < t.length; e++) {
				r[e] = t.charCodeAt(e);
			}
			return r.buffer;
		}
		static toString(e) {
			const t = _r.toUint8Array(e);
			let r = "";
			for (let e = 0; e < t.length; e++) {
				r += String.fromCharCode(t[e]);
			}
			return decodeURIComponent(escape(r));
		}
	}
	class Lr {
		static toString(e, t = false) {
			const r = _r.toArrayBuffer(e);
			const n = new DataView(r);
			let i = "";
			for (let e = 0; e < r.byteLength; e += 2) {
				const r = n.getUint16(e, t);
				i += String.fromCharCode(r);
			}
			return i;
		}
		static fromString(e, t = false) {
			const r = new ArrayBuffer(e.length * 2);
			const n = new DataView(r);
			for (let r = 0; r < e.length; r++) {
				n.setUint16(r * 2, e.charCodeAt(r), t);
			}
			return r;
		}
	}
	class Fr {
		static isHex(e) {
			return typeof e === Ur && Dr.test(e);
		}
		static isBase64(e) {
			return typeof e === Ur && Pr.test(e);
		}
		static isBase64Url(e) {
			return typeof e === Ur && Vr.test(e);
		}
		static ToString(e, t = "utf8") {
			const r = _r.toUint8Array(e);
			switch (t.toLowerCase()) {
				case "utf8":
					return this.ToUtf8String(r);
				case "binary":
					return this.ToBinary(r);
				case "hex":
					return this.ToHex(r);
				case "base64":
					return this.ToBase64(r);
				case "base64url":
					return this.ToBase64Url(r);
				case "utf16le":
					return Lr.toString(r, true);
				case "utf16":
				case "utf16be":
					return Lr.toString(r);
				default:
					throw new Error(`Unknown type of encoding '${t}'`);
			}
		}
		static FromString(e, t = "utf8") {
			if (!e) {
				return new ArrayBuffer(0);
			}
			switch (t.toLowerCase()) {
				case "utf8":
					return this.FromUtf8String(e);
				case "binary":
					return this.FromBinary(e);
				case "hex":
					return this.FromHex(e);
				case "base64":
					return this.FromBase64(e);
				case "base64url":
					return this.FromBase64Url(e);
				case "utf16le":
					return Lr.fromString(e, true);
				case "utf16":
				case "utf16be":
					return Lr.fromString(e);
				default:
					throw new Error(`Unknown type of encoding '${t}'`);
			}
		}
		static ToBase64(e) {
			const t = _r.toUint8Array(e);
			if (typeof btoa != "undefined") {
				const e = this.ToString(t, "binary");
				return btoa(e);
			}
			return Buffer.from(t).toString("base64");
		}
		static FromBase64(e) {
			const t = this.formatString(e);
			if (!t) {
				return new ArrayBuffer(0);
			}
			if (!Fr.isBase64(t)) {
				throw new TypeError("Argument 'base64Text' is not Base64 encoded");
			}
			if (typeof atob != "undefined") {
				return this.FromBinary(atob(t));
			} else {
				return new Uint8Array(Buffer.from(t, "base64")).buffer;
			}
		}
		static FromBase64Url(e) {
			const t = this.formatString(e);
			if (!t) {
				return new ArrayBuffer(0);
			}
			if (!Fr.isBase64Url(t)) {
				throw new TypeError("Argument 'base64url' is not Base64Url encoded");
			}
			return this.FromBase64(
				this.Base64Padding(t.replace(/\-/g, "+").replace(/\_/g, "/")),
			);
		}
		static ToBase64Url(e) {
			return this.ToBase64(e)
				.replace(/\+/g, "-")
				.replace(/\//g, "_")
				.replace(/\=/g, "");
		}
		static FromUtf8String(e, t = Fr.DEFAULT_UTF8_ENCODING) {
			switch (t) {
				case "ascii":
					return this.FromBinary(e);
				case "utf8":
					return jr.fromString(e);
				case "utf16":
				case "utf16be":
					return Lr.fromString(e);
				case "utf16le":
				case "usc2":
					return Lr.fromString(e, true);
				default:
					throw new Error(`Unknown type of encoding '${t}'`);
			}
		}
		static ToUtf8String(e, t = Fr.DEFAULT_UTF8_ENCODING) {
			switch (t) {
				case "ascii":
					return this.ToBinary(e);
				case "utf8":
					return jr.toString(e);
				case "utf16":
				case "utf16be":
					return Lr.toString(e);
				case "utf16le":
				case "usc2":
					return Lr.toString(e, true);
				default:
					throw new Error(`Unknown type of encoding '${t}'`);
			}
		}
		static FromBinary(e) {
			const t = e.length;
			const r = new Uint8Array(t);
			for (let n = 0; n < t; n++) {
				r[n] = e.charCodeAt(n);
			}
			return r.buffer;
		}
		static ToBinary(e) {
			const t = _r.toUint8Array(e);
			let r = "";
			for (let e = 0; e < t.length; e++) {
				r += String.fromCharCode(t[e]);
			}
			return r;
		}
		static ToHex(e) {
			const t = _r.toUint8Array(e);
			let r = "";
			const n = t.length;
			for (let e = 0; e < n; e++) {
				const n = t[e];
				if (n < 16) {
					r += "0";
				}
				r += n.toString(16);
			}
			return r;
		}
		static FromHex(e) {
			let t = this.formatString(e);
			if (!t) {
				return new ArrayBuffer(0);
			}
			if (!Fr.isHex(t)) {
				throw new TypeError("Argument 'hexString' is not HEX encoded");
			}
			if (t.length % 2) {
				t = `0${t}`;
			}
			const r = new Uint8Array(t.length / 2);
			for (let e = 0; e < t.length; e += 2) {
				const n = t.slice(e, e + 2);
				r[e / 2] = parseInt(n, 16);
			}
			return r.buffer;
		}
		static ToUtf16String(e, t = false) {
			return Lr.toString(e, t);
		}
		static FromUtf16String(e, t = false) {
			return Lr.fromString(e, t);
		}
		static Base64Padding(e) {
			const t = 4 - (e.length % 4);
			if (t < 4) {
				for (let r = 0; r < t; r++) {
					e += "=";
				}
			}
			return e;
		}
		static formatString(e) {
			return (e == null ? undefined : e.replace(/[\n\r\t ]/g, "")) || "";
		}
	}
	function Mr(e, t) {
		if (!e || !t) {
			return false;
		}
		if (e.byteLength !== t.byteLength) {
			return false;
		}
		const r = new Uint8Array(e);
		const n = new Uint8Array(t);
		for (let t = 0; t < e.byteLength; t++) {
			if (r[t] !== n[t]) {
				return false;
			}
		}
		return true;
	}
	function Hr(e, t) {
		let r = 0;
		if (e.length === 1) {
			return e[0];
		}
		for (let n = e.length - 1; n >= 0; n--) {
			r += e[e.length - 1 - n] * Math.pow(2, t * n);
		}
		return r;
	}
	function Kr(e, t, r = -1) {
		const n = r;
		let i = e;
		let o = 0;
		let s = Math.pow(2, t);
		for (let r = 1; r < 8; r++) {
			if (e < s) {
				let e;
				if (n < 0) {
					e = new ArrayBuffer(r);
					o = r;
				} else {
					if (n < r) {
						return new ArrayBuffer(0);
					}
					e = new ArrayBuffer(n);
					o = n;
				}
				const s = new Uint8Array(e);
				for (let e = r - 1; e >= 0; e--) {
					const r = Math.pow(2, e * t);
					s[o - e - 1] = Math.floor(i / r);
					i -= s[o - e - 1] * r;
				}
				return e;
			}
			s *= Math.pow(2, t);
		}
		return new ArrayBuffer(0);
	}
	function $r(...e) {
		let t = 0;
		let r = 0;
		for (const r of e) {
			t += r.length;
		}
		const n = new ArrayBuffer(t);
		const i = new Uint8Array(n);
		for (const t of e) {
			i.set(t, r);
			r += t.length;
		}
		return i;
	}
	function Gr() {
		const e = new Uint8Array(this.valueHex);
		if (this.valueHex.byteLength >= 2) {
			const t = e[0] === 255 && e[1] & 128;
			const r = e[0] === 0 && !(e[1] & 128);
			if (t || r) {
				this.warnings.push("Needlessly long format");
			}
		}
		const t = new ArrayBuffer(this.valueHex.byteLength);
		const r = new Uint8Array(t);
		for (let e = 0; e < this.valueHex.byteLength; e++) {
			r[e] = 0;
		}
		r[0] = e[0] & 128;
		const n = Hr(r, 8);
		const i = new ArrayBuffer(this.valueHex.byteLength);
		const o = new Uint8Array(i);
		for (let t = 0; t < this.valueHex.byteLength; t++) {
			o[t] = e[t];
		}
		o[0] &= 127;
		return Hr(o, 8) - n;
	}
	function Wr(e, t) {
		const r = e.toString(10);
		if (t < r.length) {
			return "";
		}
		const n = t - r.length;
		const i = new Array(n);
		for (let e = 0; e < n; e++) {
			i[e] = "0";
		}
		return i.join("").concat(r);
	}
	function Yr() {
		if (typeof BigInt == "undefined") {
			throw new Error(
				"BigInt is not defined. Your environment doesn't implement BigInt.",
			);
		}
	}
	function Jr(e) {
		let t = 0;
		let r = 0;
		for (let r = 0; r < e.length; r++) {
			t += e[r].byteLength;
		}
		const n = new Uint8Array(t);
		for (let t = 0; t < e.length; t++) {
			const i = e[t];
			n.set(new Uint8Array(i), r);
			r += i.byteLength;
		}
		return n.buffer;
	}
	function zr(e, t, r, n) {
		if (t instanceof Uint8Array) {
			if (t.byteLength) {
				if (r < 0) {
					e.error = "Wrong parameter: inputOffset less than zero";
					return false;
				} else if (n < 0) {
					e.error = "Wrong parameter: inputLength less than zero";
					return false;
				} else {
					return (
						!(t.byteLength - r - n < 0) ||
						!((e.error =
							"End of input reached before message was fully decoded (inconsistent offset and length values)"),
						1)
					);
				}
			} else {
				e.error = "Wrong parameter: inputBuffer has zero length";
				return false;
			}
		} else {
			e.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
			return false;
		}
	}
	Fr.DEFAULT_UTF8_ENCODING = "utf8";
	class Xr {
		constructor() {
			this.items = [];
		}
		write(e) {
			this.items.push(e);
		}
		final() {
			return Jr(this.items);
		}
	}
	const qr = [new Uint8Array([1])];
	const Qr = "0123456789";
	const Zr = "name";
	const en = "valueHexView";
	const tn = "";
	const rn = new ArrayBuffer(0);
	const nn = new Uint8Array(0);
	const on = "EndOfContent";
	const sn = "OCTET STRING";
	const an = "BIT STRING";
	function cn(e) {
		var t;
		t = class extends e {
			get valueHex() {
				return this.valueHexView.slice().buffer;
			}
			set valueHex(e) {
				this.valueHexView = new Uint8Array(e);
			}
			constructor(...e) {
				var t;
				super(...e);
				const r = e[0] || {};
				this.isHexOnly = (t = r.isHexOnly) !== null && t !== undefined && t;
				this.valueHexView = r.valueHex ? _r.toUint8Array(r.valueHex) : nn;
			}
			fromBER(e, t, r) {
				const n = e instanceof ArrayBuffer ? new Uint8Array(e) : e;
				if (!zr(this, n, t, r)) {
					return -1;
				}
				const i = t + r;
				this.valueHexView = n.subarray(t, i);
				if (this.valueHexView.length) {
					this.blockLength = r;
					return i;
				} else {
					this.warnings.push("Zero buffer length");
					return t;
				}
			}
			toBER(e = false) {
				if (this.isHexOnly) {
					if (e) {
						return new ArrayBuffer(this.valueHexView.byteLength);
					} else if (
						this.valueHexView.byteLength === this.valueHexView.buffer.byteLength
					) {
						return this.valueHexView.buffer;
					} else {
						return this.valueHexView.slice().buffer;
					}
				} else {
					this.error = "Flag 'isHexOnly' is not set, abort";
					return rn;
				}
			}
			toJSON() {
				return {
					...super.toJSON(),
					isHexOnly: this.isHexOnly,
					valueHex: Fr.ToHex(this.valueHexView),
				};
			}
		};
		t.NAME = "hexBlock";
		return t;
	}
	class ln {
		static blockName() {
			return this.NAME;
		}
		get valueBeforeDecode() {
			return this.valueBeforeDecodeView.slice().buffer;
		}
		set valueBeforeDecode(e) {
			this.valueBeforeDecodeView = new Uint8Array(e);
		}
		constructor({
			blockLength: e = 0,
			error: t = "",
			warnings: r = [],
			valueBeforeDecode: n = nn,
		} = {}) {
			this.blockLength = e;
			this.error = t;
			this.warnings = r;
			this.valueBeforeDecodeView = _r.toUint8Array(n);
		}
		toJSON() {
			return {
				blockName: this.constructor.NAME,
				blockLength: this.blockLength,
				error: this.error,
				warnings: this.warnings,
				valueBeforeDecode: Fr.ToHex(this.valueBeforeDecodeView),
			};
		}
	}
	ln.NAME = "baseBlock";
	class un extends ln {
		fromBER(e, t, r) {
			throw TypeError(
				"User need to make a specific function in a class which extends 'ValueBlock'",
			);
		}
		toBER(e, t) {
			throw TypeError(
				"User need to make a specific function in a class which extends 'ValueBlock'",
			);
		}
	}
	un.NAME = "valueBlock";
	class pn extends cn(ln) {
		constructor({ idBlock: e = {} } = {}) {
			var t;
			var i;
			super();
			if (e) {
				this.isHexOnly = (t = e.isHexOnly) !== null && t !== undefined && t;
				this.valueHexView = e.valueHex ? _r.toUint8Array(e.valueHex) : nn;
				this.tagClass = e.tagClass ?? -1;
				this.tagNumber = e.tagNumber ?? -1;
				this.isConstructed =
					(i = e.isConstructed) !== null && i !== undefined && i;
			} else {
				this.tagClass = -1;
				this.tagNumber = -1;
				this.isConstructed = false;
			}
		}
		toBER(e = false) {
			let t = 0;
			switch (this.tagClass) {
				case 1:
					t |= 0;
					break;
				case 2:
					t |= 64;
					break;
				case 3:
					t |= 128;
					break;
				case 4:
					t |= 192;
					break;
				default:
					this.error = "Unknown tag class";
					return rn;
			}
			if (this.isConstructed) {
				t |= 32;
			}
			if (this.tagNumber < 31 && !this.isHexOnly) {
				const r = new Uint8Array(1);
				if (!e) {
					let e = this.tagNumber;
					e &= 31;
					t |= e;
					r[0] = t;
				}
				return r.buffer;
			}
			if (!this.isHexOnly) {
				const r = Kr(this.tagNumber, 7);
				const n = new Uint8Array(r);
				const i = r.byteLength;
				const o = new Uint8Array(i + 1);
				o[0] = t | 31;
				if (!e) {
					for (let e = 0; e < i - 1; e++) {
						o[e + 1] = n[e] | 128;
					}
					o[i] = n[i - 1];
				}
				return o.buffer;
			}
			const r = new Uint8Array(this.valueHexView.byteLength + 1);
			r[0] = t | 31;
			if (!e) {
				const e = this.valueHexView;
				for (let t = 0; t < e.length - 1; t++) {
					r[t + 1] = e[t] | 128;
				}
				r[this.valueHexView.byteLength] = e[e.length - 1];
			}
			return r.buffer;
		}
		fromBER(e, t, r) {
			const n = _r.toUint8Array(e);
			if (!zr(this, n, t, r)) {
				return -1;
			}
			const i = n.subarray(t, t + r);
			if (i.length === 0) {
				this.error = "Zero buffer length";
				return -1;
			}
			switch (i[0] & 192) {
				case 0:
					this.tagClass = 1;
					break;
				case 64:
					this.tagClass = 2;
					break;
				case 128:
					this.tagClass = 3;
					break;
				case 192:
					this.tagClass = 4;
					break;
				default:
					this.error = "Unknown tag class";
					return -1;
			}
			this.isConstructed = !(~i[0] & 32);
			this.isHexOnly = false;
			const o = i[0] & 31;
			if (o !== 31) {
				this.tagNumber = o;
				this.blockLength = 1;
			} else {
				let e = 1;
				let t = (this.valueHexView = new Uint8Array(255));
				let r = 255;
				while (i[e] & 128) {
					t[e - 1] = i[e] & 127;
					e++;
					if (e >= i.length) {
						this.error =
							"End of input reached before message was fully decoded";
						return -1;
					}
					if (e === r) {
						r += 255;
						const e = new Uint8Array(r);
						for (let r = 0; r < t.length; r++) {
							e[r] = t[r];
						}
						t = this.valueHexView = new Uint8Array(r);
					}
				}
				this.blockLength = e + 1;
				t[e - 1] = i[e] & 127;
				const n = new Uint8Array(e);
				for (let r = 0; r < e; r++) {
					n[r] = t[r];
				}
				t = this.valueHexView = new Uint8Array(e);
				t.set(n);
				if (this.blockLength <= 9) {
					this.tagNumber = Hr(t, 7);
				} else {
					this.isHexOnly = true;
					this.warnings.push("Tag too long, represented as hex-coded");
				}
			}
			if (this.tagClass === 1 && this.isConstructed) {
				switch (this.tagNumber) {
					case 1:
					case 2:
					case 5:
					case 6:
					case 9:
					case 13:
					case 14:
					case 23:
					case 24:
					case 31:
					case 32:
					case 33:
					case 34:
						this.error = "Constructed encoding used for primitive type";
						return -1;
				}
			}
			return t + this.blockLength;
		}
		toJSON() {
			return {
				...super.toJSON(),
				tagClass: this.tagClass,
				tagNumber: this.tagNumber,
				isConstructed: this.isConstructed,
			};
		}
	}
	pn.NAME = "identificationBlock";
	class hn extends ln {
		constructor({ lenBlock: e = {} } = {}) {
			var t;
			var r;
			super();
			this.isIndefiniteForm =
				(t = e.isIndefiniteForm) !== null && t !== undefined && t;
			this.longFormUsed = (r = e.longFormUsed) !== null && r !== undefined && r;
			this.length = e.length ?? 0;
		}
		fromBER(e, t, r) {
			const n = _r.toUint8Array(e);
			if (!zr(this, n, t, r)) {
				return -1;
			}
			const i = n.subarray(t, t + r);
			if (i.length === 0) {
				this.error = "Zero buffer length";
				return -1;
			}
			if (i[0] === 255) {
				this.error = "Length block 0xFF is reserved by standard";
				return -1;
			}
			this.isIndefiniteForm = i[0] === 128;
			if (this.isIndefiniteForm) {
				this.blockLength = 1;
				return t + this.blockLength;
			}
			this.longFormUsed = !!(i[0] & 128);
			if (this.longFormUsed === false) {
				this.length = i[0];
				this.blockLength = 1;
				return t + this.blockLength;
			}
			const o = i[0] & 127;
			if (o > 8) {
				this.error = "Too big integer";
				return -1;
			}
			if (o + 1 > i.length) {
				this.error = "End of input reached before message was fully decoded";
				return -1;
			}
			const s = t + 1;
			const a = n.subarray(s, s + o);
			if (a[o - 1] === 0) {
				this.warnings.push("Needlessly long encoded length");
			}
			this.length = Hr(a, 8);
			if (this.longFormUsed && this.length <= 127) {
				this.warnings.push("Unnecessary usage of long length form");
			}
			this.blockLength = o + 1;
			return t + this.blockLength;
		}
		toBER(e = false) {
			let t;
			let r;
			if (this.length > 127) {
				this.longFormUsed = true;
			}
			if (this.isIndefiniteForm) {
				t = new ArrayBuffer(1);
				if (e === false) {
					r = new Uint8Array(t);
					r[0] = 128;
				}
				return t;
			}
			if (this.longFormUsed) {
				const n = Kr(this.length, 8);
				if (n.byteLength > 127) {
					this.error = "Too big length";
					return rn;
				}
				t = new ArrayBuffer(n.byteLength + 1);
				if (e) {
					return t;
				}
				const i = new Uint8Array(n);
				r = new Uint8Array(t);
				r[0] = n.byteLength | 128;
				for (let e = 0; e < n.byteLength; e++) {
					r[e + 1] = i[e];
				}
				return t;
			}
			t = new ArrayBuffer(1);
			if (e === false) {
				r = new Uint8Array(t);
				r[0] = this.length;
			}
			return t;
		}
		toJSON() {
			return {
				...super.toJSON(),
				isIndefiniteForm: this.isIndefiniteForm,
				longFormUsed: this.longFormUsed,
				length: this.length,
			};
		}
	}
	hn.NAME = "lengthBlock";
	const fn = {};
	class dn extends ln {
		constructor(
			{ name: e = "", optional: t = false, primitiveSchema: r, ...n } = {},
			i,
		) {
			super(n);
			this.name = e;
			this.optional = t;
			if (r) {
				this.primitiveSchema = r;
			}
			this.idBlock = new pn(n);
			this.lenBlock = new hn(n);
			this.valueBlock = i ? new i(n) : new un(n);
		}
		fromBER(e, t, r) {
			const n = this.valueBlock.fromBER(
				e,
				t,
				this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length,
			);
			if (n === -1) {
				this.error = this.valueBlock.error;
				return n;
			} else {
				if (!this.idBlock.error.length) {
					this.blockLength += this.idBlock.blockLength;
				}
				if (!this.lenBlock.error.length) {
					this.blockLength += this.lenBlock.blockLength;
				}
				if (!this.valueBlock.error.length) {
					this.blockLength += this.valueBlock.blockLength;
				}
				return n;
			}
		}
		toBER(e, t) {
			const r = t || new Xr();
			if (!t) {
				yn(this);
			}
			const n = this.idBlock.toBER(e);
			r.write(n);
			if (this.lenBlock.isIndefiniteForm) {
				r.write(new Uint8Array([128]).buffer);
				this.valueBlock.toBER(e, r);
				r.write(new ArrayBuffer(2));
			} else {
				const t = this.valueBlock.toBER(e);
				this.lenBlock.length = t.byteLength;
				const n = this.lenBlock.toBER(e);
				r.write(n);
				r.write(t);
			}
			if (t) {
				return rn;
			} else {
				return r.final();
			}
		}
		toJSON() {
			const e = {
				...super.toJSON(),
				idBlock: this.idBlock.toJSON(),
				lenBlock: this.lenBlock.toJSON(),
				valueBlock: this.valueBlock.toJSON(),
				name: this.name,
				optional: this.optional,
			};
			if (this.primitiveSchema) {
				e.primitiveSchema = this.primitiveSchema.toJSON();
			}
			return e;
		}
		toString(e = "ascii") {
			if (e === "ascii") {
				return this.onAsciiEncoding();
			} else {
				return Fr.ToHex(this.toBER());
			}
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${Fr.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
		}
		isEqual(e) {
			return (
				this === e ||
				(e instanceof this.constructor &&
					(function (e, t) {
						if (e.byteLength !== t.byteLength) {
							return false;
						}
						const r = new Uint8Array(e);
						const n = new Uint8Array(t);
						for (let e = 0; e < r.length; e++) {
							if (r[e] !== n[e]) {
								return false;
							}
						}
						return true;
					})(this.toBER(), e.toBER()))
			);
		}
	}
	function yn(e) {
		if (e instanceof fn.Constructed) {
			for (const t of e.valueBlock.value) {
				if (yn(t)) {
					e.lenBlock.isIndefiniteForm = true;
				}
			}
		}
		return !!e.lenBlock?.isIndefiniteForm;
	}
	dn.NAME = "BaseBlock";
	class mn extends dn {
		getValue() {
			return this.valueBlock.value;
		}
		setValue(e) {
			this.valueBlock.value = e;
		}
		constructor({ value: e = "", ...t } = {}, r) {
			super(t, r);
			if (e) {
				this.fromString(e);
			}
		}
		fromBER(e, t, r) {
			const n = this.valueBlock.fromBER(
				e,
				t,
				this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length,
			);
			if (n === -1) {
				this.error = this.valueBlock.error;
				return n;
			} else {
				this.fromBuffer(this.valueBlock.valueHexView);
				if (!this.idBlock.error.length) {
					this.blockLength += this.idBlock.blockLength;
				}
				if (!this.lenBlock.error.length) {
					this.blockLength += this.lenBlock.blockLength;
				}
				if (!this.valueBlock.error.length) {
					this.blockLength += this.valueBlock.blockLength;
				}
				return n;
			}
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
		}
	}
	mn.NAME = "BaseStringBlock";
	class gn extends cn(un) {
		constructor({ isHexOnly: e = true, ...t } = {}) {
			super(t);
			this.isHexOnly = e;
		}
	}
	var vn;
	var bn;
	var En;
	var wn;
	var Sn;
	gn.NAME = "PrimitiveValueBlock";
	class An extends dn {
		constructor(e = {}) {
			super(e, gn);
			this.idBlock.isConstructed = false;
		}
	}
	function Nn(e, t = 0, r = e.length) {
		const n = t;
		let i = new dn({}, un);
		const o = new ln();
		if (!zr(o, e, t, r)) {
			i.error = o.error;
			return {
				offset: -1,
				result: i,
			};
		}
		if (!e.subarray(t, t + r).length) {
			i.error = "Zero buffer length";
			return {
				offset: -1,
				result: i,
			};
		}
		let s = i.idBlock.fromBER(e, t, r);
		if (i.idBlock.warnings.length) {
			i.warnings.concat(i.idBlock.warnings);
		}
		if (s === -1) {
			i.error = i.idBlock.error;
			return {
				offset: -1,
				result: i,
			};
		}
		t = s;
		r -= i.idBlock.blockLength;
		s = i.lenBlock.fromBER(e, t, r);
		if (i.lenBlock.warnings.length) {
			i.warnings.concat(i.lenBlock.warnings);
		}
		if (s === -1) {
			i.error = i.lenBlock.error;
			return {
				offset: -1,
				result: i,
			};
		}
		t = s;
		r -= i.lenBlock.blockLength;
		if (!i.idBlock.isConstructed && i.lenBlock.isIndefiniteForm) {
			i.error = "Indefinite length form used for primitive encoding form";
			return {
				offset: -1,
				result: i,
			};
		}
		let a = dn;
		if (i.idBlock.tagClass === 1) {
			if (i.idBlock.tagNumber >= 37 && i.idBlock.isHexOnly === false) {
				i.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
				return {
					offset: -1,
					result: i,
				};
			}
			switch (i.idBlock.tagNumber) {
				case 0:
					if (i.idBlock.isConstructed && i.lenBlock.length > 0) {
						i.error = "Type [UNIVERSAL 0] is reserved";
						return {
							offset: -1,
							result: i,
						};
					}
					a = fn.EndOfContent;
					break;
				case 1:
					a = fn.Boolean;
					break;
				case 2:
					a = fn.Integer;
					break;
				case 3:
					a = fn.BitString;
					break;
				case 4:
					a = fn.OctetString;
					break;
				case 5:
					a = fn.Null;
					break;
				case 6:
					a = fn.ObjectIdentifier;
					break;
				case 10:
					a = fn.Enumerated;
					break;
				case 12:
					a = fn.Utf8String;
					break;
				case 13:
					a = fn.RelativeObjectIdentifier;
					break;
				case 14:
					a = fn.TIME;
					break;
				case 15:
					i.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
					return {
						offset: -1,
						result: i,
					};
				case 16:
					a = fn.Sequence;
					break;
				case 17:
					a = fn.Set;
					break;
				case 18:
					a = fn.NumericString;
					break;
				case 19:
					a = fn.PrintableString;
					break;
				case 20:
					a = fn.TeletexString;
					break;
				case 21:
					a = fn.VideotexString;
					break;
				case 22:
					a = fn.IA5String;
					break;
				case 23:
					a = fn.UTCTime;
					break;
				case 24:
					a = fn.GeneralizedTime;
					break;
				case 25:
					a = fn.GraphicString;
					break;
				case 26:
					a = fn.VisibleString;
					break;
				case 27:
					a = fn.GeneralString;
					break;
				case 28:
					a = fn.UniversalString;
					break;
				case 29:
					a = fn.CharacterString;
					break;
				case 30:
					a = fn.BmpString;
					break;
				case 31:
					a = fn.DATE;
					break;
				case 32:
					a = fn.TimeOfDay;
					break;
				case 33:
					a = fn.DateTime;
					break;
				case 34:
					a = fn.Duration;
					break;
				default: {
					const e = i.idBlock.isConstructed
						? new fn.Constructed()
						: new fn.Primitive();
					e.idBlock = i.idBlock;
					e.lenBlock = i.lenBlock;
					e.warnings = i.warnings;
					i = e;
				}
			}
		} else {
			a = i.idBlock.isConstructed ? fn.Constructed : fn.Primitive;
		}
		i = (function (e, t) {
			if (e instanceof t) {
				return e;
			}
			const r = new t();
			r.idBlock = e.idBlock;
			r.lenBlock = e.lenBlock;
			r.warnings = e.warnings;
			r.valueBeforeDecodeView = e.valueBeforeDecodeView;
			return r;
		})(i, a);
		s = i.fromBER(e, t, i.lenBlock.isIndefiniteForm ? r : i.lenBlock.length);
		i.valueBeforeDecodeView = e.subarray(n, n + i.blockLength);
		return {
			offset: s,
			result: i,
		};
	}
	function Tn(e) {
		if (!e.byteLength) {
			const e = new dn({}, un);
			e.error = "Input buffer has zero length";
			return {
				offset: -1,
				result: e,
			};
		}
		return Nn(_r.toUint8Array(e).slice(), 0, e.byteLength);
	}
	vn = An;
	fn.Primitive = vn;
	An.NAME = "PRIMITIVE";
	class On extends un {
		constructor({ value: e = [], isIndefiniteForm: t = false, ...r } = {}) {
			super(r);
			this.value = e;
			this.isIndefiniteForm = t;
		}
		fromBER(e, t, r) {
			const n = _r.toUint8Array(e);
			if (!zr(this, n, t, r)) {
				return -1;
			}
			this.valueBeforeDecodeView = n.subarray(t, t + r);
			if (this.valueBeforeDecodeView.length === 0) {
				this.warnings.push("Zero buffer length");
				return t;
			}
			let i = t;
			while ((this.isIndefiniteForm ? 1 : r) > 0) {
				const e = Nn(n, i, r);
				if (e.offset === -1) {
					this.error = e.result.error;
					this.warnings.concat(e.result.warnings);
					return -1;
				}
				i = e.offset;
				this.blockLength += e.result.blockLength;
				r -= e.result.blockLength;
				this.value.push(e.result);
				if (this.isIndefiniteForm && e.result.constructor.NAME === on) {
					break;
				}
			}
			if (this.isIndefiniteForm) {
				if (this.value[this.value.length - 1].constructor.NAME === on) {
					this.value.pop();
				} else {
					this.warnings.push("No EndOfContent block encoded");
				}
			}
			return i;
		}
		toBER(e, t) {
			const r = t || new Xr();
			for (let t = 0; t < this.value.length; t++) {
				this.value[t].toBER(e, r);
			}
			if (t) {
				return rn;
			} else {
				return r.final();
			}
		}
		toJSON() {
			const e = {
				...super.toJSON(),
				isIndefiniteForm: this.isIndefiniteForm,
				value: [],
			};
			for (const t of this.value) {
				e.value.push(t.toJSON());
			}
			return e;
		}
	}
	On.NAME = "ConstructedValueBlock";
	class In extends dn {
		constructor(e = {}) {
			super(e, On);
			this.idBlock.isConstructed = true;
		}
		fromBER(e, t, r) {
			this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
			const n = this.valueBlock.fromBER(
				e,
				t,
				this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length,
			);
			if (n === -1) {
				this.error = this.valueBlock.error;
				return n;
			} else {
				if (!this.idBlock.error.length) {
					this.blockLength += this.idBlock.blockLength;
				}
				if (!this.lenBlock.error.length) {
					this.blockLength += this.lenBlock.blockLength;
				}
				if (!this.valueBlock.error.length) {
					this.blockLength += this.valueBlock.blockLength;
				}
				return n;
			}
		}
		onAsciiEncoding() {
			const e = [];
			for (const t of this.valueBlock.value) {
				e.push(
					t
						.toString("ascii")
						.split("\n")
						.map((e) => `  ${e}`)
						.join("\n"),
				);
			}
			const t =
				this.idBlock.tagClass === 3
					? `[${this.idBlock.tagNumber}]`
					: this.constructor.NAME;
			if (e.length) {
				return `${t} :\n${e.join("\n")}`;
			} else {
				return `${t} :`;
			}
		}
	}
	bn = In;
	fn.Constructed = bn;
	In.NAME = "CONSTRUCTED";
	class kn extends un {
		fromBER(e, t, r) {
			return t;
		}
		toBER(e) {
			return rn;
		}
	}
	kn.override = "EndOfContentValueBlock";
	class Bn extends dn {
		constructor(e = {}) {
			super(e, kn);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 0;
		}
	}
	En = Bn;
	fn.EndOfContent = En;
	Bn.NAME = on;
	class xn extends dn {
		constructor(e = {}) {
			super(e, un);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 5;
		}
		fromBER(e, t, r) {
			if (this.lenBlock.length > 0) {
				this.warnings.push("Non-zero length of value block for Null type");
			}
			if (!this.idBlock.error.length) {
				this.blockLength += this.idBlock.blockLength;
			}
			if (!this.lenBlock.error.length) {
				this.blockLength += this.lenBlock.blockLength;
			}
			this.blockLength += r;
			if (t + r > e.byteLength) {
				this.error =
					"End of input reached before message was fully decoded (inconsistent offset and length values)";
				return -1;
			} else {
				return t + r;
			}
		}
		toBER(e, t) {
			const r = new ArrayBuffer(2);
			if (!e) {
				const e = new Uint8Array(r);
				e[0] = 5;
				e[1] = 0;
			}
			if (t) {
				t.write(r);
			}
			return r;
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME}`;
		}
	}
	wn = xn;
	fn.Null = wn;
	xn.NAME = "NULL";
	class Cn extends cn(un) {
		get value() {
			for (const e of this.valueHexView) {
				if (e > 0) {
					return true;
				}
			}
			return false;
		}
		set value(e) {
			this.valueHexView[0] = e ? 255 : 0;
		}
		constructor({ value: e, ...t } = {}) {
			super(t);
			if (t.valueHex) {
				this.valueHexView = _r.toUint8Array(t.valueHex);
			} else {
				this.valueHexView = new Uint8Array(1);
			}
			if (e) {
				this.value = e;
			}
		}
		fromBER(e, t, r) {
			const n = _r.toUint8Array(e);
			if (zr(this, n, t, r)) {
				this.valueHexView = n.subarray(t, t + r);
				if (r > 1) {
					this.warnings.push("Boolean value encoded in more then 1 octet");
				}
				this.isHexOnly = true;
				Gr.call(this);
				this.blockLength = r;
				return t + r;
			} else {
				return -1;
			}
		}
		toBER() {
			return this.valueHexView.slice();
		}
		toJSON() {
			return {
				...super.toJSON(),
				value: this.value,
			};
		}
	}
	Cn.NAME = "BooleanValueBlock";
	let Rn = class extends dn {
		getValue() {
			return this.valueBlock.value;
		}
		setValue(e) {
			this.valueBlock.value = e;
		}
		constructor(e = {}) {
			super(e, Cn);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 1;
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${this.getValue}`;
		}
	};
	Sn = Rn;
	fn.Boolean = Sn;
	Rn.NAME = "BOOLEAN";
	class _n extends cn(On) {
		constructor({ isConstructed: e = false, ...t } = {}) {
			super(t);
			this.isConstructed = e;
		}
		fromBER(e, t, r) {
			let n = 0;
			if (this.isConstructed) {
				this.isHexOnly = false;
				n = On.prototype.fromBER.call(this, e, t, r);
				if (n === -1) {
					return n;
				}
				for (let e = 0; e < this.value.length; e++) {
					const t = this.value[e].constructor.NAME;
					if (t === on) {
						if (this.isIndefiniteForm) {
							break;
						}
						this.error =
							"EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
						return -1;
					}
					if (t !== sn) {
						this.error = "OCTET STRING may consists of OCTET STRINGs only";
						return -1;
					}
				}
			} else {
				this.isHexOnly = true;
				n = super.fromBER(e, t, r);
				this.blockLength = r;
			}
			return n;
		}
		toBER(e, t) {
			if (this.isConstructed) {
				return On.prototype.toBER.call(this, e, t);
			} else if (e) {
				return new ArrayBuffer(this.valueHexView.byteLength);
			} else {
				return this.valueHexView.slice().buffer;
			}
		}
		toJSON() {
			return {
				...super.toJSON(),
				isConstructed: this.isConstructed,
			};
		}
	}
	var Un;
	_n.NAME = "OctetStringValueBlock";
	let Dn = class extends dn {
		constructor({ idBlock: e = {}, lenBlock: t = {}, ...r } = {}) {
			var n;
			if ((n = r.isConstructed) === null || n === undefined) {
				r.isConstructed = !!r.value?.length;
			}
			super(
				{
					idBlock: {
						isConstructed: r.isConstructed,
						...e,
					},
					lenBlock: {
						...t,
						isIndefiniteForm: !!r.isIndefiniteForm,
					},
					...r,
				},
				_n,
			);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 4;
		}
		fromBER(e, t, r) {
			this.valueBlock.isConstructed = this.idBlock.isConstructed;
			this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
			if (r === 0) {
				if (this.idBlock.error.length === 0) {
					this.blockLength += this.idBlock.blockLength;
				}
				if (this.lenBlock.error.length === 0) {
					this.blockLength += this.lenBlock.blockLength;
				}
				return t;
			}
			if (!this.valueBlock.isConstructed) {
				const n = (e instanceof ArrayBuffer ? new Uint8Array(e) : e).subarray(
					t,
					t + r,
				);
				try {
					if (n.byteLength) {
						const e = Nn(n, 0, n.byteLength);
						if (e.offset !== -1 && e.offset === r) {
							this.valueBlock.value = [e.result];
						}
					}
				} catch {}
			}
			return super.fromBER(e, t, r);
		}
		onAsciiEncoding() {
			if (
				this.valueBlock.isConstructed ||
				(this.valueBlock.value && this.valueBlock.value.length)
			) {
				return In.prototype.onAsciiEncoding.call(this);
			} else {
				return `${this.constructor.NAME} : ${Fr.ToHex(this.valueBlock.valueHexView)}`;
			}
		}
		getValue() {
			if (!this.idBlock.isConstructed) {
				return this.valueBlock.valueHexView.slice().buffer;
			}
			const e = [];
			for (const t of this.valueBlock.value) {
				if (t instanceof Un) {
					e.push(t.valueBlock.valueHexView);
				}
			}
			return _r.concat(e);
		}
	};
	Un = Dn;
	fn.OctetString = Un;
	Dn.NAME = sn;
	class Pn extends cn(On) {
		constructor({ unusedBits: e = 0, isConstructed: t = false, ...r } = {}) {
			super(r);
			this.unusedBits = e;
			this.isConstructed = t;
			this.blockLength = this.valueHexView.byteLength;
		}
		fromBER(e, t, r) {
			if (!r) {
				return t;
			}
			let n = -1;
			if (this.isConstructed) {
				n = On.prototype.fromBER.call(this, e, t, r);
				if (n === -1) {
					return n;
				}
				for (const e of this.value) {
					const t = e.constructor.NAME;
					if (t === on) {
						if (this.isIndefiniteForm) {
							break;
						}
						this.error =
							"EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
						return -1;
					}
					if (t !== an) {
						this.error = "BIT STRING may consists of BIT STRINGs only";
						return -1;
					}
					const r = e.valueBlock;
					if (this.unusedBits > 0 && r.unusedBits > 0) {
						this.error =
							'Using of "unused bits" inside constructive BIT STRING allowed for least one only';
						return -1;
					}
					this.unusedBits = r.unusedBits;
				}
				return n;
			}
			const i = _r.toUint8Array(e);
			if (!zr(this, i, t, r)) {
				return -1;
			}
			const o = i.subarray(t, t + r);
			this.unusedBits = o[0];
			if (this.unusedBits > 7) {
				this.error = "Unused bits for BitString must be in range 0-7";
				return -1;
			}
			if (!this.unusedBits) {
				const e = o.subarray(1);
				try {
					if (e.byteLength) {
						const t = Nn(e, 0, e.byteLength);
						if (t.offset !== -1 && t.offset === r - 1) {
							this.value = [t.result];
						}
					}
				} catch {}
			}
			this.valueHexView = o.subarray(1);
			this.blockLength = o.length;
			return t + r;
		}
		toBER(e, t) {
			if (this.isConstructed) {
				return On.prototype.toBER.call(this, e, t);
			}
			if (e) {
				return new ArrayBuffer(this.valueHexView.byteLength + 1);
			}
			if (!this.valueHexView.byteLength) {
				return rn;
			}
			const r = new Uint8Array(this.valueHexView.length + 1);
			r[0] = this.unusedBits;
			r.set(this.valueHexView, 1);
			return r.buffer;
		}
		toJSON() {
			return {
				...super.toJSON(),
				unusedBits: this.unusedBits,
				isConstructed: this.isConstructed,
			};
		}
	}
	var Vn;
	Pn.NAME = "BitStringValueBlock";
	let jn = class extends dn {
		constructor({ idBlock: e = {}, lenBlock: t = {}, ...r } = {}) {
			var n;
			if ((n = r.isConstructed) === null || n === undefined) {
				r.isConstructed = !!r.value?.length;
			}
			super(
				{
					idBlock: {
						isConstructed: r.isConstructed,
						...e,
					},
					lenBlock: {
						...t,
						isIndefiniteForm: !!r.isIndefiniteForm,
					},
					...r,
				},
				Pn,
			);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 3;
		}
		fromBER(e, t, r) {
			this.valueBlock.isConstructed = this.idBlock.isConstructed;
			this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
			return super.fromBER(e, t, r);
		}
		onAsciiEncoding() {
			if (
				this.valueBlock.isConstructed ||
				(this.valueBlock.value && this.valueBlock.value.length)
			) {
				return In.prototype.onAsciiEncoding.call(this);
			}
			{
				const e = [];
				const t = this.valueBlock.valueHexView;
				for (const r of t) {
					e.push(r.toString(2).padStart(8, "0"));
				}
				const r = e.join("");
				return `${this.constructor.NAME} : ${r.substring(0, r.length - this.valueBlock.unusedBits)}`;
			}
		}
	};
	var Ln;
	var Fn;
	var Mn;
	var Hn;
	var Kn;
	var $n;
	var Gn;
	function Wn(e, t) {
		const r = new Uint8Array([0]);
		const n = new Uint8Array(e);
		const i = new Uint8Array(t);
		let o = n.slice(0);
		const s = o.length - 1;
		const a = i.slice(0);
		const c = a.length - 1;
		let l = 0;
		let u = 0;
		for (let e = c < s ? s : c; e >= 0; e--, u++) {
			l = u < a.length == 1 ? o[s - u] + a[c - u] + r[0] : o[s - u] + r[0];
			r[0] = l / 10;
			if (u >= o.length == 1) {
				o = $r(new Uint8Array([l % 10]), o);
			} else {
				o[s - u] = l % 10;
			}
		}
		if (r[0] > 0) {
			o = $r(r, o);
		}
		return o;
	}
	function Yn(e) {
		if (e >= qr.length) {
			for (let t = qr.length; t <= e; t++) {
				const e = new Uint8Array([0]);
				let r = qr[t - 1].slice(0);
				for (let t = r.length - 1; t >= 0; t--) {
					const n = new Uint8Array([(r[t] << 1) + e[0]]);
					e[0] = n[0] / 10;
					r[t] = n[0] % 10;
				}
				if (e[0] > 0) {
					r = $r(e, r);
				}
				qr.push(r);
			}
		}
		return qr[e];
	}
	function Jn(e, t) {
		let r = 0;
		const n = new Uint8Array(e);
		const i = new Uint8Array(t);
		const o = n.slice(0);
		const s = o.length - 1;
		const a = i.slice(0);
		const c = a.length - 1;
		let l;
		let u = 0;
		for (let e = c; e >= 0; e--, u++) {
			l = o[s - u] - a[c - u] - r;
			if (l < 0 == 1) {
				r = 1;
				o[s - u] = l + 10;
			} else {
				r = 0;
				o[s - u] = l;
			}
		}
		if (r > 0) {
			for (let e = s - c + 1; e >= 0; e--, u++) {
				l = o[s - u] - r;
				if (!(l < 0)) {
					r = 0;
					o[s - u] = l;
					break;
				}
				r = 1;
				o[s - u] = l + 10;
			}
		}
		return o.slice();
	}
	Vn = jn;
	fn.BitString = Vn;
	jn.NAME = an;
	class zn extends cn(un) {
		setValueHex() {
			if (this.valueHexView.length >= 4) {
				this.warnings.push("Too big Integer for decoding, hex only");
				this.isHexOnly = true;
				this._valueDec = 0;
			} else {
				this.isHexOnly = false;
				if (this.valueHexView.length > 0) {
					this._valueDec = Gr.call(this);
				}
			}
		}
		constructor({ value: e, ...t } = {}) {
			super(t);
			this._valueDec = 0;
			if (t.valueHex) {
				this.setValueHex();
			}
			if (e !== undefined) {
				this.valueDec = e;
			}
		}
		set valueDec(e) {
			this._valueDec = e;
			this.isHexOnly = false;
			this.valueHexView = new Uint8Array(
				(function (e) {
					const t = e < 0 ? e * -1 : e;
					let r = 128;
					for (let n = 1; n < 8; n++) {
						if (t <= r) {
							if (e < 0) {
								const e = Kr(r - t, 8, n);
								new Uint8Array(e)[0] |= 128;
								return e;
							}
							let i = Kr(t, 8, n);
							let o = new Uint8Array(i);
							if (o[0] & 128) {
								const e = i.slice(0);
								const t = new Uint8Array(e);
								i = new ArrayBuffer(i.byteLength + 1);
								o = new Uint8Array(i);
								for (let r = 0; r < e.byteLength; r++) {
									o[r + 1] = t[r];
								}
								o[0] = 0;
							}
							return i;
						}
						r *= Math.pow(2, 8);
					}
					return new ArrayBuffer(0);
				})(e),
			);
		}
		get valueDec() {
			return this._valueDec;
		}
		fromDER(e, t, r, n = 0) {
			const i = this.fromBER(e, t, r);
			if (i === -1) {
				return i;
			}
			const o = this.valueHexView;
			if (o[0] === 0 && o[1] & 128) {
				this.valueHexView = o.subarray(1);
			} else if (n !== 0 && o.length < n) {
				if (n - o.length > 1) {
					n = o.length + 1;
				}
				this.valueHexView = o.subarray(n - o.length);
			}
			return i;
		}
		toDER(e = false) {
			const t = this.valueHexView;
			switch (true) {
				case !!(t[0] & 128):
					{
						const e = new Uint8Array(this.valueHexView.length + 1);
						e[0] = 0;
						e.set(t, 1);
						this.valueHexView = e;
					}
					break;
				case t[0] === 0 && !(t[1] & 128):
					this.valueHexView = this.valueHexView.subarray(1);
			}
			return this.toBER(e);
		}
		fromBER(e, t, r) {
			const n = super.fromBER(e, t, r);
			if (n !== -1) {
				this.setValueHex();
			}
			return n;
		}
		toBER(e) {
			if (e) {
				return new ArrayBuffer(this.valueHexView.length);
			} else {
				return this.valueHexView.slice().buffer;
			}
		}
		toJSON() {
			return {
				...super.toJSON(),
				valueDec: this.valueDec,
			};
		}
		toString() {
			const e = this.valueHexView.length * 8 - 1;
			let t;
			let r = new Uint8Array((this.valueHexView.length * 8) / 3);
			let n = 0;
			const i = this.valueHexView;
			let o = "";
			let s = false;
			for (let s = i.byteLength - 1; s >= 0; s--) {
				t = i[s];
				for (let i = 0; i < 8; i++) {
					if (!(~t & 1)) {
						if (n === e) {
							r = Jn(Yn(n), r);
							o = "-";
						} else {
							r = Wn(r, Yn(n));
						}
					}
					n++;
					t >>= 1;
				}
			}
			for (let e = 0; e < r.length; e++) {
				if (r[e]) {
					s = true;
				}
				if (s) {
					o += Qr.charAt(r[e]);
				}
			}
			if (s === false) {
				o += Qr.charAt(0);
			}
			return o;
		}
	}
	Ln = zn;
	zn.NAME = "IntegerValueBlock";
	Object.defineProperty(Ln.prototype, "valueHex", {
		set: function (e) {
			this.valueHexView = new Uint8Array(e);
			this.setValueHex();
		},
		get: function () {
			return this.valueHexView.slice().buffer;
		},
	});
	class Xn extends dn {
		constructor(e = {}) {
			super(e, zn);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 2;
		}
		toBigInt() {
			Yr();
			return BigInt(this.valueBlock.toString());
		}
		static fromBigInt(e) {
			Yr();
			const t = BigInt(e);
			const r = new Xr();
			const n = t.toString(16).replace(/^-/, "");
			const i = new Uint8Array(Fr.FromHex(n));
			if (t < 0) {
				const e = new Uint8Array(i.length + (i[0] & 128 ? 1 : 0));
				e[0] |= 128;
				const n = BigInt(`0x${Fr.ToHex(e)}`) + t;
				const o = _r.toUint8Array(Fr.FromHex(n.toString(16)));
				o[0] |= 128;
				r.write(o);
			} else {
				if (i[0] & 128) {
					r.write(new Uint8Array([0]));
				}
				r.write(i);
			}
			return new Fn({
				valueHex: r.final(),
			});
		}
		convertToDER() {
			const e = new Fn({
				valueHex: this.valueBlock.valueHexView,
			});
			e.valueBlock.toDER();
			return e;
		}
		convertFromDER() {
			return new Fn({
				valueHex:
					this.valueBlock.valueHexView[0] === 0
						? this.valueBlock.valueHexView.subarray(1)
						: this.valueBlock.valueHexView,
			});
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
		}
	}
	Fn = Xn;
	fn.Integer = Fn;
	Xn.NAME = "INTEGER";
	class qn extends Xn {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 10;
		}
	}
	Mn = qn;
	fn.Enumerated = Mn;
	qn.NAME = "ENUMERATED";
	class Qn extends cn(un) {
		constructor({ valueDec: e = -1, isFirstSid: t = false, ...r } = {}) {
			super(r);
			this.valueDec = e;
			this.isFirstSid = t;
		}
		fromBER(e, t, r) {
			if (!r) {
				return t;
			}
			const n = _r.toUint8Array(e);
			if (!zr(this, n, t, r)) {
				return -1;
			}
			const i = n.subarray(t, t + r);
			this.valueHexView = new Uint8Array(r);
			for (
				let e = 0;
				e < r &&
				((this.valueHexView[e] = i[e] & 127), this.blockLength++, i[e] & 128);
				e++
			);
			const o = new Uint8Array(this.blockLength);
			for (let e = 0; e < this.blockLength; e++) {
				o[e] = this.valueHexView[e];
			}
			this.valueHexView = o;
			if (i[this.blockLength - 1] & 128) {
				this.error = "End of input reached before message was fully decoded";
				return -1;
			} else {
				if (this.valueHexView[0] === 0) {
					this.warnings.push("Needlessly long format of SID encoding");
				}
				if (this.blockLength <= 8) {
					this.valueDec = Hr(this.valueHexView, 7);
				} else {
					this.isHexOnly = true;
					this.warnings.push("Too big SID for decoding, hex only");
				}
				return t + this.blockLength;
			}
		}
		set valueBigInt(e) {
			Yr();
			let t = BigInt(e).toString(2);
			while (t.length % 7) {
				t = "0" + t;
			}
			const r = new Uint8Array(t.length / 7);
			for (let e = 0; e < r.length; e++) {
				r[e] =
					parseInt(t.slice(e * 7, e * 7 + 7), 2) + (e + 1 < r.length ? 128 : 0);
			}
			this.fromBER(r.buffer, 0, r.length);
		}
		toBER(e) {
			if (this.isHexOnly) {
				if (e) {
					return new ArrayBuffer(this.valueHexView.byteLength);
				}
				const t = this.valueHexView;
				const r = new Uint8Array(this.blockLength);
				for (let e = 0; e < this.blockLength - 1; e++) {
					r[e] = t[e] | 128;
				}
				r[this.blockLength - 1] = t[this.blockLength - 1];
				return r.buffer;
			}
			const t = Kr(this.valueDec, 7);
			if (t.byteLength === 0) {
				this.error = "Error during encoding SID value";
				return rn;
			}
			const r = new Uint8Array(t.byteLength);
			if (!e) {
				const e = new Uint8Array(t);
				const n = t.byteLength - 1;
				for (let t = 0; t < n; t++) {
					r[t] = e[t] | 128;
				}
				r[n] = e[n];
			}
			return r;
		}
		toString() {
			let e = "";
			if (this.isHexOnly) {
				e = Fr.ToHex(this.valueHexView);
			} else if (this.isFirstSid) {
				let t = this.valueDec;
				if (this.valueDec <= 39) {
					e = "0.";
				} else if (this.valueDec <= 79) {
					e = "1.";
					t -= 40;
				} else {
					e = "2.";
					t -= 80;
				}
				e += t.toString();
			} else {
				e = this.valueDec.toString();
			}
			return e;
		}
		toJSON() {
			return {
				...super.toJSON(),
				valueDec: this.valueDec,
				isFirstSid: this.isFirstSid,
			};
		}
	}
	Qn.NAME = "sidBlock";
	class Zn extends un {
		constructor({ value: e = "", ...t } = {}) {
			super(t);
			this.value = [];
			if (e) {
				this.fromString(e);
			}
		}
		fromBER(e, t, r) {
			let n = t;
			while (r > 0) {
				const t = new Qn();
				n = t.fromBER(e, n, r);
				if (n === -1) {
					this.blockLength = 0;
					this.error = t.error;
					return n;
				}
				if (this.value.length === 0) {
					t.isFirstSid = true;
				}
				this.blockLength += t.blockLength;
				r -= t.blockLength;
				this.value.push(t);
			}
			return n;
		}
		toBER(e) {
			const t = [];
			for (let r = 0; r < this.value.length; r++) {
				const n = this.value[r].toBER(e);
				if (n.byteLength === 0) {
					this.error = this.value[r].error;
					return rn;
				}
				t.push(n);
			}
			return Jr(t);
		}
		fromString(e) {
			this.value = [];
			let t = 0;
			let r = 0;
			let n = "";
			let i = false;
			do {
				r = e.indexOf(".", t);
				n = r === -1 ? e.substring(t) : e.substring(t, r);
				t = r + 1;
				if (i) {
					const e = this.value[0];
					let t = 0;
					switch (e.valueDec) {
						case 0:
							break;
						case 1:
							t = 40;
							break;
						case 2:
							t = 80;
							break;
						default:
							this.value = [];
							return;
					}
					const r = parseInt(n, 10);
					if (isNaN(r)) {
						return;
					}
					e.valueDec = r + t;
					i = false;
				} else {
					const e = new Qn();
					if (n > Number.MAX_SAFE_INTEGER) {
						Yr();
						const t = BigInt(n);
						e.valueBigInt = t;
					} else {
						e.valueDec = parseInt(n, 10);
						if (isNaN(e.valueDec)) {
							return;
						}
					}
					if (!this.value.length) {
						e.isFirstSid = true;
						i = true;
					}
					this.value.push(e);
				}
			} while (r !== -1);
		}
		toString() {
			let e = "";
			let t = false;
			for (let r = 0; r < this.value.length; r++) {
				t = this.value[r].isHexOnly;
				let n = this.value[r].toString();
				if (r !== 0) {
					e = `${e}.`;
				}
				if (t) {
					n = `{${n}}`;
					if (this.value[r].isFirstSid) {
						e = `2.{${n} - 80}`;
					} else {
						e += n;
					}
				} else {
					e += n;
				}
			}
			return e;
		}
		toJSON() {
			const e = {
				...super.toJSON(),
				value: this.toString(),
				sidArray: [],
			};
			for (let t = 0; t < this.value.length; t++) {
				e.sidArray.push(this.value[t].toJSON());
			}
			return e;
		}
	}
	Zn.NAME = "ObjectIdentifierValueBlock";
	class ei extends dn {
		getValue() {
			return this.valueBlock.toString();
		}
		setValue(e) {
			this.valueBlock.fromString(e);
		}
		constructor(e = {}) {
			super(e, Zn);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 6;
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
		}
		toJSON() {
			return {
				...super.toJSON(),
				value: this.getValue(),
			};
		}
	}
	Hn = ei;
	fn.ObjectIdentifier = Hn;
	ei.NAME = "OBJECT IDENTIFIER";
	class ti extends cn(ln) {
		constructor({ valueDec: e = 0, ...t } = {}) {
			super(t);
			this.valueDec = e;
		}
		fromBER(e, t, r) {
			if (r === 0) {
				return t;
			}
			const n = _r.toUint8Array(e);
			if (!zr(this, n, t, r)) {
				return -1;
			}
			const i = n.subarray(t, t + r);
			this.valueHexView = new Uint8Array(r);
			for (
				let e = 0;
				e < r &&
				((this.valueHexView[e] = i[e] & 127), this.blockLength++, i[e] & 128);
				e++
			);
			const o = new Uint8Array(this.blockLength);
			for (let e = 0; e < this.blockLength; e++) {
				o[e] = this.valueHexView[e];
			}
			this.valueHexView = o;
			if (i[this.blockLength - 1] & 128) {
				this.error = "End of input reached before message was fully decoded";
				return -1;
			} else {
				if (this.valueHexView[0] === 0) {
					this.warnings.push("Needlessly long format of SID encoding");
				}
				if (this.blockLength <= 8) {
					this.valueDec = Hr(this.valueHexView, 7);
				} else {
					this.isHexOnly = true;
					this.warnings.push("Too big SID for decoding, hex only");
				}
				return t + this.blockLength;
			}
		}
		toBER(e) {
			if (this.isHexOnly) {
				if (e) {
					return new ArrayBuffer(this.valueHexView.byteLength);
				}
				const t = this.valueHexView;
				const r = new Uint8Array(this.blockLength);
				for (let e = 0; e < this.blockLength - 1; e++) {
					r[e] = t[e] | 128;
				}
				r[this.blockLength - 1] = t[this.blockLength - 1];
				return r.buffer;
			}
			const t = Kr(this.valueDec, 7);
			if (t.byteLength === 0) {
				this.error = "Error during encoding SID value";
				return rn;
			}
			const r = new Uint8Array(t.byteLength);
			if (!e) {
				const e = new Uint8Array(t);
				const n = t.byteLength - 1;
				for (let t = 0; t < n; t++) {
					r[t] = e[t] | 128;
				}
				r[n] = e[n];
			}
			return r.buffer;
		}
		toString() {
			let e = "";
			e = this.isHexOnly
				? Fr.ToHex(this.valueHexView)
				: this.valueDec.toString();
			return e;
		}
		toJSON() {
			return {
				...super.toJSON(),
				valueDec: this.valueDec,
			};
		}
	}
	ti.NAME = "relativeSidBlock";
	class ri extends un {
		constructor({ value: e = "", ...t } = {}) {
			super(t);
			this.value = [];
			if (e) {
				this.fromString(e);
			}
		}
		fromBER(e, t, r) {
			let n = t;
			while (r > 0) {
				const t = new ti();
				n = t.fromBER(e, n, r);
				if (n === -1) {
					this.blockLength = 0;
					this.error = t.error;
					return n;
				}
				this.blockLength += t.blockLength;
				r -= t.blockLength;
				this.value.push(t);
			}
			return n;
		}
		toBER(e, t) {
			const r = [];
			for (let t = 0; t < this.value.length; t++) {
				const n = this.value[t].toBER(e);
				if (n.byteLength === 0) {
					this.error = this.value[t].error;
					return rn;
				}
				r.push(n);
			}
			return Jr(r);
		}
		fromString(e) {
			this.value = [];
			let t = 0;
			let r = 0;
			let n = "";
			do {
				r = e.indexOf(".", t);
				n = r === -1 ? e.substring(t) : e.substring(t, r);
				t = r + 1;
				const i = new ti();
				i.valueDec = parseInt(n, 10);
				if (isNaN(i.valueDec)) {
					return true;
				}
				this.value.push(i);
			} while (r !== -1);
			return true;
		}
		toString() {
			let e = "";
			let t = false;
			for (let r = 0; r < this.value.length; r++) {
				t = this.value[r].isHexOnly;
				let n = this.value[r].toString();
				if (r !== 0) {
					e = `${e}.`;
				}
				if (t) {
					n = `{${n}}`;
					e += n;
				} else {
					e += n;
				}
			}
			return e;
		}
		toJSON() {
			const e = {
				...super.toJSON(),
				value: this.toString(),
				sidArray: [],
			};
			for (let t = 0; t < this.value.length; t++) {
				e.sidArray.push(this.value[t].toJSON());
			}
			return e;
		}
	}
	ri.NAME = "RelativeObjectIdentifierValueBlock";
	class ni extends dn {
		getValue() {
			return this.valueBlock.toString();
		}
		setValue(e) {
			this.valueBlock.fromString(e);
		}
		constructor(e = {}) {
			super(e, ri);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 13;
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
		}
		toJSON() {
			return {
				...super.toJSON(),
				value: this.getValue(),
			};
		}
	}
	Kn = ni;
	fn.RelativeObjectIdentifier = Kn;
	ni.NAME = "RelativeObjectIdentifier";
	class ii extends In {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 16;
		}
	}
	$n = ii;
	fn.Sequence = $n;
	ii.NAME = "SEQUENCE";
	let oi = class extends In {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 17;
		}
	};
	Gn = oi;
	fn.Set = Gn;
	oi.NAME = "SET";
	class si extends cn(un) {
		constructor({ ...e } = {}) {
			super(e);
			this.isHexOnly = true;
			this.value = tn;
		}
		toJSON() {
			return {
				...super.toJSON(),
				value: this.value,
			};
		}
	}
	si.NAME = "StringValueBlock";
	class ai extends si {}
	ai.NAME = "SimpleStringValueBlock";
	class ci extends mn {
		constructor({ ...e } = {}) {
			super(e, ai);
		}
		fromBuffer(e) {
			this.valueBlock.value = String.fromCharCode.apply(
				null,
				_r.toUint8Array(e),
			);
		}
		fromString(e) {
			const t = e.length;
			const r = (this.valueBlock.valueHexView = new Uint8Array(t));
			for (let n = 0; n < t; n++) {
				r[n] = e.charCodeAt(n);
			}
			this.valueBlock.value = e;
		}
	}
	ci.NAME = "SIMPLE STRING";
	class li extends ci {
		fromBuffer(e) {
			this.valueBlock.valueHexView = _r.toUint8Array(e);
			try {
				this.valueBlock.value = Fr.ToUtf8String(e);
			} catch (t) {
				this.warnings.push(
					`Error during "decodeURIComponent": ${t}, using raw string`,
				);
				this.valueBlock.value = Fr.ToBinary(e);
			}
		}
		fromString(e) {
			this.valueBlock.valueHexView = new Uint8Array(Fr.FromUtf8String(e));
			this.valueBlock.value = e;
		}
	}
	var ui;
	var pi;
	var hi;
	var fi;
	var di;
	var yi;
	var mi;
	var gi;
	var vi;
	var bi;
	var Ei;
	var wi;
	var Si;
	var Ai;
	var Ni;
	var Ti;
	var Oi;
	var Ii;
	var ki;
	li.NAME = "Utf8StringValueBlock";
	class Bi extends li {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 12;
		}
	}
	ui = Bi;
	fn.Utf8String = ui;
	Bi.NAME = "UTF8String";
	class xi extends ci {
		fromBuffer(e) {
			this.valueBlock.value = Fr.ToUtf16String(e);
			this.valueBlock.valueHexView = _r.toUint8Array(e);
		}
		fromString(e) {
			this.valueBlock.value = e;
			this.valueBlock.valueHexView = new Uint8Array(Fr.FromUtf16String(e));
		}
	}
	xi.NAME = "BmpStringValueBlock";
	class Ci extends xi {
		constructor({ ...e } = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 30;
		}
	}
	pi = Ci;
	fn.BmpString = pi;
	Ci.NAME = "BMPString";
	class Ri extends ci {
		fromBuffer(e) {
			const t = ArrayBuffer.isView(e) ? e.slice().buffer : e.slice(0);
			const r = new Uint8Array(t);
			for (let e = 0; e < r.length; e += 4) {
				r[e] = r[e + 3];
				r[e + 1] = r[e + 2];
				r[e + 2] = 0;
				r[e + 3] = 0;
			}
			this.valueBlock.value = String.fromCharCode.apply(
				null,
				new Uint32Array(t),
			);
		}
		fromString(e) {
			const t = e.length;
			const r = (this.valueBlock.valueHexView = new Uint8Array(t * 4));
			for (let n = 0; n < t; n++) {
				const t = Kr(e.charCodeAt(n), 8);
				const i = new Uint8Array(t);
				if (i.length > 4) {
					continue;
				}
				const o = 4 - i.length;
				for (let e = i.length - 1; e >= 0; e--) {
					r[n * 4 + e + o] = i[e];
				}
			}
			this.valueBlock.value = e;
		}
	}
	Ri.NAME = "UniversalStringValueBlock";
	class _i extends Ri {
		constructor({ ...e } = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 28;
		}
	}
	hi = _i;
	fn.UniversalString = hi;
	_i.NAME = "UniversalString";
	class Ui extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 18;
		}
	}
	fi = Ui;
	fn.NumericString = fi;
	Ui.NAME = "NumericString";
	class Di extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 19;
		}
	}
	di = Di;
	fn.PrintableString = di;
	Di.NAME = "PrintableString";
	class Pi extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 20;
		}
	}
	yi = Pi;
	fn.TeletexString = yi;
	Pi.NAME = "TeletexString";
	class Vi extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 21;
		}
	}
	mi = Vi;
	fn.VideotexString = mi;
	Vi.NAME = "VideotexString";
	class ji extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 22;
		}
	}
	gi = ji;
	fn.IA5String = gi;
	ji.NAME = "IA5String";
	class Li extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 25;
		}
	}
	vi = Li;
	fn.GraphicString = vi;
	Li.NAME = "GraphicString";
	class Fi extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 26;
		}
	}
	bi = Fi;
	fn.VisibleString = bi;
	Fi.NAME = "VisibleString";
	class Mi extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 27;
		}
	}
	Ei = Mi;
	fn.GeneralString = Ei;
	Mi.NAME = "GeneralString";
	class Hi extends ci {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 29;
		}
	}
	wi = Hi;
	fn.CharacterString = wi;
	Hi.NAME = "CharacterString";
	class Ki extends Fi {
		constructor({ value: e, valueDate: t, ...r } = {}) {
			super(r);
			this.year = 0;
			this.month = 0;
			this.day = 0;
			this.hour = 0;
			this.minute = 0;
			this.second = 0;
			if (e) {
				this.fromString(e);
				this.valueBlock.valueHexView = new Uint8Array(e.length);
				for (let t = 0; t < e.length; t++) {
					this.valueBlock.valueHexView[t] = e.charCodeAt(t);
				}
			}
			if (t) {
				this.fromDate(t);
				this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
			}
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 23;
		}
		fromBuffer(e) {
			this.fromString(String.fromCharCode.apply(null, _r.toUint8Array(e)));
		}
		toBuffer() {
			const e = this.toString();
			const t = new ArrayBuffer(e.length);
			const r = new Uint8Array(t);
			for (let t = 0; t < e.length; t++) {
				r[t] = e.charCodeAt(t);
			}
			return t;
		}
		fromDate(e) {
			this.year = e.getUTCFullYear();
			this.month = e.getUTCMonth() + 1;
			this.day = e.getUTCDate();
			this.hour = e.getUTCHours();
			this.minute = e.getUTCMinutes();
			this.second = e.getUTCSeconds();
		}
		toDate() {
			return new Date(
				Date.UTC(
					this.year,
					this.month - 1,
					this.day,
					this.hour,
					this.minute,
					this.second,
				),
			);
		}
		fromString(e) {
			const t = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(e);
			if (t === null) {
				this.error = "Wrong input string for conversion";
				return;
			}
			const r = parseInt(t[1], 10);
			this.year = r >= 50 ? 1900 + r : 2000 + r;
			this.month = parseInt(t[2], 10);
			this.day = parseInt(t[3], 10);
			this.hour = parseInt(t[4], 10);
			this.minute = parseInt(t[5], 10);
			this.second = parseInt(t[6], 10);
		}
		toString(e = "iso") {
			if (e === "iso") {
				const e = new Array(7);
				e[0] = Wr(this.year < 2000 ? this.year - 1900 : this.year - 2000, 2);
				e[1] = Wr(this.month, 2);
				e[2] = Wr(this.day, 2);
				e[3] = Wr(this.hour, 2);
				e[4] = Wr(this.minute, 2);
				e[5] = Wr(this.second, 2);
				e[6] = "Z";
				return e.join("");
			}
			return super.toString(e);
		}
		onAsciiEncoding() {
			return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
		}
		toJSON() {
			return {
				...super.toJSON(),
				year: this.year,
				month: this.month,
				day: this.day,
				hour: this.hour,
				minute: this.minute,
				second: this.second,
			};
		}
	}
	Si = Ki;
	fn.UTCTime = Si;
	Ki.NAME = "UTCTime";
	class $i extends Ki {
		constructor(e = {}) {
			var t;
			super(e);
			if ((t = this.millisecond) === null || t === undefined) {
				this.millisecond = 0;
			}
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 24;
		}
		fromDate(e) {
			super.fromDate(e);
			this.millisecond = e.getUTCMilliseconds();
		}
		toDate() {
			const e = Date.UTC(
				this.year,
				this.month - 1,
				this.day,
				this.hour,
				this.minute,
				this.second,
				this.millisecond,
			);
			return new Date(e);
		}
		fromString(e) {
			let t;
			let r = false;
			let n = "";
			let i = "";
			let o = 0;
			let s = 0;
			let a = 0;
			if (e[e.length - 1] === "Z") {
				n = e.substring(0, e.length - 1);
				r = true;
			} else {
				const t = new Number(e[e.length - 1]);
				if (isNaN(t.valueOf())) {
					throw new Error("Wrong input string for conversion");
				}
				n = e;
			}
			if (r) {
				if (n.indexOf("+") !== -1) {
					throw new Error("Wrong input string for conversion");
				}
				if (n.indexOf("-") !== -1) {
					throw new Error("Wrong input string for conversion");
				}
			} else {
				let e = 1;
				let t = n.indexOf("+");
				let r = "";
				if (t === -1) {
					t = n.indexOf("-");
					e = -1;
				}
				if (t !== -1) {
					r = n.substring(t + 1);
					n = n.substring(0, t);
					if (r.length !== 2 && r.length !== 4) {
						throw new Error("Wrong input string for conversion");
					}
					let i = parseInt(r.substring(0, 2), 10);
					if (isNaN(i.valueOf())) {
						throw new Error("Wrong input string for conversion");
					}
					s = e * i;
					if (r.length === 4) {
						i = parseInt(r.substring(2, 4), 10);
						if (isNaN(i.valueOf())) {
							throw new Error("Wrong input string for conversion");
						}
						a = e * i;
					}
				}
			}
			let c = n.indexOf(".");
			if (c === -1) {
				c = n.indexOf(",");
			}
			if (c !== -1) {
				const e = new Number(`0${n.substring(c)}`);
				if (isNaN(e.valueOf())) {
					throw new Error("Wrong input string for conversion");
				}
				o = e.valueOf();
				i = n.substring(0, c);
			} else {
				i = n;
			}
			switch (true) {
				case i.length === 8:
					t = /(\d{4})(\d{2})(\d{2})/gi;
					if (c !== -1) {
						throw new Error("Wrong input string for conversion");
					}
					break;
				case i.length === 10:
					t = /(\d{4})(\d{2})(\d{2})(\d{2})/gi;
					if (c !== -1) {
						let e = o * 60;
						this.minute = Math.floor(e);
						e = (e - this.minute) * 60;
						this.second = Math.floor(e);
						e = (e - this.second) * 1000;
						this.millisecond = Math.floor(e);
					}
					break;
				case i.length === 12:
					t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi;
					if (c !== -1) {
						let e = o * 60;
						this.second = Math.floor(e);
						e = (e - this.second) * 1000;
						this.millisecond = Math.floor(e);
					}
					break;
				case i.length === 14:
					t = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi;
					if (c !== -1) {
						const e = o * 1000;
						this.millisecond = Math.floor(e);
					}
					break;
				default:
					throw new Error("Wrong input string for conversion");
			}
			const l = t.exec(i);
			if (l === null) {
				throw new Error("Wrong input string for conversion");
			}
			for (let e = 1; e < l.length; e++) {
				switch (e) {
					case 1:
						this.year = parseInt(l[e], 10);
						break;
					case 2:
						this.month = parseInt(l[e], 10);
						break;
					case 3:
						this.day = parseInt(l[e], 10);
						break;
					case 4:
						this.hour = parseInt(l[e], 10) + s;
						break;
					case 5:
						this.minute = parseInt(l[e], 10) + a;
						break;
					case 6:
						this.second = parseInt(l[e], 10);
						break;
					default:
						throw new Error("Wrong input string for conversion");
				}
			}
			if (r === false) {
				const e = new Date(
					this.year,
					this.month,
					this.day,
					this.hour,
					this.minute,
					this.second,
					this.millisecond,
				);
				this.year = e.getUTCFullYear();
				this.month = e.getUTCMonth();
				this.day = e.getUTCDay();
				this.hour = e.getUTCHours();
				this.minute = e.getUTCMinutes();
				this.second = e.getUTCSeconds();
				this.millisecond = e.getUTCMilliseconds();
			}
		}
		toString(e = "iso") {
			if (e === "iso") {
				const e = [];
				e.push(Wr(this.year, 4));
				e.push(Wr(this.month, 2));
				e.push(Wr(this.day, 2));
				e.push(Wr(this.hour, 2));
				e.push(Wr(this.minute, 2));
				e.push(Wr(this.second, 2));
				if (this.millisecond !== 0) {
					e.push(".");
					e.push(Wr(this.millisecond, 3));
				}
				e.push("Z");
				return e.join("");
			}
			return super.toString(e);
		}
		toJSON() {
			return {
				...super.toJSON(),
				millisecond: this.millisecond,
			};
		}
	}
	Ai = $i;
	fn.GeneralizedTime = Ai;
	$i.NAME = "GeneralizedTime";
	class Gi extends Bi {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 31;
		}
	}
	Ni = Gi;
	fn.DATE = Ni;
	Gi.NAME = "DATE";
	class Wi extends Bi {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 32;
		}
	}
	Ti = Wi;
	fn.TimeOfDay = Ti;
	Wi.NAME = "TimeOfDay";
	class Yi extends Bi {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 33;
		}
	}
	Oi = Yi;
	fn.DateTime = Oi;
	Yi.NAME = "DateTime";
	class Ji extends Bi {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 34;
		}
	}
	Ii = Ji;
	fn.Duration = Ii;
	Ji.NAME = "Duration";
	class zi extends Bi {
		constructor(e = {}) {
			super(e);
			this.idBlock.tagClass = 1;
			this.idBlock.tagNumber = 14;
		}
	}
	ki = zi;
	fn.TIME = ki;
	zi.NAME = "TIME";
	class Xi {
		constructor({ name: e = "", optional: t = false } = {}) {
			this.name = e;
			this.optional = t;
		}
	}
	class qi extends Xi {
		constructor({ value: e = [], ...t } = {}) {
			super(t);
			this.value = e;
		}
	}
	class Qi extends Xi {
		constructor({ value: e = new Xi(), local: t = false, ...r } = {}) {
			super(r);
			this.value = e;
			this.local = t;
		}
	}
	function Zi(e, t, r) {
		return {
			verified: true,
			result: e,
		};
	}
	var eo;
	var to;
	var ro = Object.freeze({
		__proto__: null,
		Any: Xi,
		BaseBlock: dn,
		BaseStringBlock: mn,
		BitString: jn,
		BmpString: Ci,
		Boolean: Rn,
		CharacterString: Hi,
		Choice: qi,
		Constructed: In,
		DATE: Gi,
		DateTime: Yi,
		Duration: Ji,
		EndOfContent: Bn,
		Enumerated: qn,
		GeneralString: Mi,
		GeneralizedTime: $i,
		GraphicString: Li,
		HexBlock: cn,
		IA5String: ji,
		Integer: Xn,
		Null: xn,
		NumericString: Ui,
		ObjectIdentifier: ei,
		OctetString: Dn,
		Primitive: An,
		PrintableString: Di,
		RawData: class {
			get data() {
				return this.dataView.slice().buffer;
			}
			set data(e) {
				this.dataView = _r.toUint8Array(e);
			}
			constructor({ data: e = nn } = {}) {
				this.dataView = _r.toUint8Array(e);
			}
			fromBER(e, t, r) {
				const n = t + r;
				this.dataView = _r.toUint8Array(e).subarray(t, n);
				return n;
			}
			toBER(e) {
				return this.dataView.slice().buffer;
			}
		},
		RelativeObjectIdentifier: ni,
		Repeated: Qi,
		Sequence: ii,
		Set: oi,
		TIME: zi,
		TeletexString: Pi,
		TimeOfDay: Wi,
		UTCTime: Ki,
		UniversalString: _i,
		Utf8String: Bi,
		ValueBlock: un,
		VideotexString: Vi,
		ViewWriter: Xr,
		VisibleString: Fi,
		compareSchema: Zi,
		fromBER: Tn,
		verifySchema: function (e, t) {
			if (t instanceof Object == 0) {
				return {
					verified: false,
					result: {
						error: "Wrong ASN.1 schema type",
					},
				};
			}
			const r = Nn(_r.toUint8Array(e));
			if (r.offset === -1) {
				return {
					verified: false,
					result: r.result,
				};
			} else {
				return Zi(r.result, r.result, t);
			}
		},
	});
	(function (e) {
		e[(e.Sequence = 0)] = "Sequence";
		e[(e.Set = 1)] = "Set";
		e[(e.Choice = 2)] = "Choice";
	})((eo ||= {}));
	(function (e) {
		e[(e.Any = 1)] = "Any";
		e[(e.Boolean = 2)] = "Boolean";
		e[(e.OctetString = 3)] = "OctetString";
		e[(e.BitString = 4)] = "BitString";
		e[(e.Integer = 5)] = "Integer";
		e[(e.Enumerated = 6)] = "Enumerated";
		e[(e.ObjectIdentifier = 7)] = "ObjectIdentifier";
		e[(e.Utf8String = 8)] = "Utf8String";
		e[(e.BmpString = 9)] = "BmpString";
		e[(e.UniversalString = 10)] = "UniversalString";
		e[(e.NumericString = 11)] = "NumericString";
		e[(e.PrintableString = 12)] = "PrintableString";
		e[(e.TeletexString = 13)] = "TeletexString";
		e[(e.VideotexString = 14)] = "VideotexString";
		e[(e.IA5String = 15)] = "IA5String";
		e[(e.GraphicString = 16)] = "GraphicString";
		e[(e.VisibleString = 17)] = "VisibleString";
		e[(e.GeneralString = 18)] = "GeneralString";
		e[(e.CharacterString = 19)] = "CharacterString";
		e[(e.UTCTime = 20)] = "UTCTime";
		e[(e.GeneralizedTime = 21)] = "GeneralizedTime";
		e[(e.DATE = 22)] = "DATE";
		e[(e.TimeOfDay = 23)] = "TimeOfDay";
		e[(e.DateTime = 24)] = "DateTime";
		e[(e.Duration = 25)] = "Duration";
		e[(e.TIME = 26)] = "TIME";
		e[(e.Null = 27)] = "Null";
	})((to ||= {}));
	class no {
		constructor(e, t = 0) {
			this.unusedBits = 0;
			this.value = new ArrayBuffer(0);
			if (e) {
				if (typeof e == "number") {
					this.fromNumber(e);
				} else {
					if (!_r.isBufferSource(e)) {
						throw TypeError(
							"Unsupported type of 'params' argument for BitString",
						);
					}
					this.unusedBits = t;
					this.value = _r.toArrayBuffer(e);
				}
			}
		}
		fromASN(e) {
			if (!(e instanceof jn)) {
				throw new TypeError(
					"Argument 'asn' is not instance of ASN.1 BitString",
				);
			}
			this.unusedBits = e.valueBlock.unusedBits;
			this.value = e.valueBlock.valueHex;
			return this;
		}
		toASN() {
			return new jn({
				unusedBits: this.unusedBits,
				valueHex: this.value,
			});
		}
		toSchema(e) {
			return new jn({
				name: e,
			});
		}
		toNumber() {
			let e = "";
			const t = new Uint8Array(this.value);
			for (const r of t) {
				e += r.toString(2).padStart(8, "0");
			}
			e = e.split("").reverse().join("");
			if (this.unusedBits) {
				e = e.slice(this.unusedBits).padStart(this.unusedBits, "0");
			}
			return parseInt(e, 2);
		}
		fromNumber(e) {
			let t = e.toString(2);
			const r = (t.length + 7) >> 3;
			this.unusedBits = (r << 3) - t.length;
			const n = new Uint8Array(r);
			t = t
				.padStart(r << 3, "0")
				.split("")
				.reverse()
				.join("");
			let i = 0;
			while (i < r) {
				n[i] = parseInt(t.slice(i << 3, 8 + (i << 3)), 2);
				i++;
			}
			this.value = n.buffer;
		}
	}
	class io {
		get byteLength() {
			return this.buffer.byteLength;
		}
		get byteOffset() {
			return 0;
		}
		constructor(e) {
			if (typeof e == "number") {
				this.buffer = new ArrayBuffer(e);
			} else if (_r.isBufferSource(e)) {
				this.buffer = _r.toArrayBuffer(e);
			} else if (Array.isArray(e)) {
				this.buffer = new Uint8Array(e);
			} else {
				this.buffer = new ArrayBuffer(0);
			}
		}
		fromASN(e) {
			if (!(e instanceof Dn)) {
				throw new TypeError(
					"Argument 'asn' is not instance of ASN.1 OctetString",
				);
			}
			this.buffer = e.valueBlock.valueHex;
			return this;
		}
		toASN() {
			return new Dn({
				valueHex: this.buffer,
			});
		}
		toSchema(e) {
			return new Dn({
				name: e,
			});
		}
	}
	const oo = {
		fromASN: (e) => (e instanceof xn ? null : e.valueBeforeDecodeView),
		toASN: (e) => {
			if (e === null) {
				return new xn();
			}
			const t = Tn(e);
			if (t.result.error) {
				throw new Error(t.result.error);
			}
			return t.result;
		},
	};
	const so = {
		fromASN: (e) =>
			e.valueBlock.valueHexView.byteLength >= 4
				? e.valueBlock.toString()
				: e.valueBlock.valueDec,
		toASN: (e) =>
			new Xn({
				value: +e,
			}),
	};
	const ao = {
		fromASN: (e) => e.valueBlock.valueDec,
		toASN: (e) =>
			new qn({
				value: e,
			}),
	};
	const co = {
		fromASN: (e) => e.valueBlock.valueHexView,
		toASN: (e) =>
			new Xn({
				valueHex: e,
			}),
	};
	const lo = {
		fromASN: (e) => e.valueBlock.valueHexView,
		toASN: (e) =>
			new jn({
				valueHex: e,
			}),
	};
	const uo = {
		fromASN: (e) => e.valueBlock.toString(),
		toASN: (e) =>
			new ei({
				value: e,
			}),
	};
	const po = {
		fromASN: (e) => e.valueBlock.value,
		toASN: (e) =>
			new Rn({
				value: e,
			}),
	};
	const ho = {
		fromASN: (e) => e.valueBlock.valueHexView,
		toASN: (e) =>
			new Dn({
				valueHex: e,
			}),
	};
	const fo = {
		fromASN: (e) => new io(e.getValue()),
		toASN: (e) => e.toASN(),
	};
	function yo(e) {
		return {
			fromASN: (e) => e.valueBlock.value,
			toASN: (t) =>
				new e({
					value: t,
				}),
		};
	}
	const mo = yo(Bi);
	const go = yo(Ci);
	const vo = yo(_i);
	const bo = yo(Ui);
	const Eo = yo(Di);
	const wo = yo(Pi);
	const So = yo(Vi);
	const Ao = yo(ji);
	const No = yo(Li);
	const To = yo(Fi);
	const Oo = yo(Mi);
	const Io = yo(Hi);
	const ko = {
		fromASN: (e) => e.toDate(),
		toASN: (e) =>
			new Ki({
				valueDate: e,
			}),
	};
	const Bo = {
		fromASN: (e) => e.toDate(),
		toASN: (e) =>
			new $i({
				valueDate: e,
			}),
	};
	const xo = {
		fromASN: () => null,
		toASN: () => new xn(),
	};
	function Co(e) {
		switch (e) {
			case to.Any:
				return oo;
			case to.BitString:
				return lo;
			case to.BmpString:
				return go;
			case to.Boolean:
				return po;
			case to.CharacterString:
				return Io;
			case to.Enumerated:
				return ao;
			case to.GeneralString:
				return Oo;
			case to.GeneralizedTime:
				return Bo;
			case to.GraphicString:
				return No;
			case to.IA5String:
				return Ao;
			case to.Integer:
				return so;
			case to.Null:
				return xo;
			case to.NumericString:
				return bo;
			case to.ObjectIdentifier:
				return uo;
			case to.OctetString:
				return ho;
			case to.PrintableString:
				return Eo;
			case to.TeletexString:
				return wo;
			case to.UTCTime:
				return ko;
			case to.UniversalString:
				return vo;
			case to.Utf8String:
				return mo;
			case to.VideotexString:
				return So;
			case to.VisibleString:
				return To;
			default:
				return null;
		}
	}
	function Ro(e) {
		if (typeof e == "function" && e.prototype) {
			return (!!e.prototype.toASN && !!e.prototype.fromASN) || Ro(e.prototype);
		} else {
			return (
				!!e && typeof e == "object" && !!("toASN" in e) && !!("fromASN" in e)
			);
		}
	}
	function _o(e) {
		if (e) {
			const r = Object.getPrototypeOf(e);
			return (
				(r == null ? undefined : r.prototype)?.constructor === Array || _o(r)
			);
		}
		return false;
	}
	function Uo(e, t) {
		if (!e || !t) {
			return false;
		}
		if (e.byteLength !== t.byteLength) {
			return false;
		}
		const r = new Uint8Array(e);
		const n = new Uint8Array(t);
		for (let t = 0; t < e.byteLength; t++) {
			if (r[t] !== n[t]) {
				return false;
			}
		}
		return true;
	}
	const Do = new (class {
		constructor() {
			this.items = new WeakMap();
		}
		has(e) {
			return this.items.has(e);
		}
		get(e, t = false) {
			const r = this.items.get(e);
			if (!r) {
				throw new Error(
					`Cannot get schema for '${e.prototype.constructor.name}' target`,
				);
			}
			if (t && !r.schema) {
				throw new Error(
					`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`,
				);
			}
			return r;
		}
		cache(e) {
			const t = this.get(e);
			t.schema ||= this.create(e, true);
		}
		createDefault(e) {
			const t = {
				type: eo.Sequence,
				items: {},
			};
			const r = this.findParentSchema(e);
			if (r) {
				Object.assign(t, r);
				t.items = Object.assign({}, t.items, r.items);
			}
			return t;
		}
		create(e, t) {
			const r = this.items.get(e) || this.createDefault(e);
			const n = [];
			for (const e in r.items) {
				const i = r.items[e];
				const o = t ? e : "";
				let s;
				if (typeof i.type == "number") {
					const e = to[i.type];
					const t = ro[e];
					if (!t) {
						throw new Error(`Cannot get ASN1 class by name '${e}'`);
					}
					s = new t({
						name: o,
					});
				} else if (Ro(i.type)) {
					s = new i.type().toSchema(o);
				} else if (i.optional) {
					if (this.get(i.type).type === eo.Choice) {
						s = new Xi({
							name: o,
						});
					} else {
						s = this.create(i.type, false);
						s.name = o;
					}
				} else {
					s = new Xi({
						name: o,
					});
				}
				const a = !!i.optional || i.defaultValue !== undefined;
				if (i.repeated) {
					s.name = "";
					s = new (i.repeated === "set" ? oi : ii)({
						name: "",
						value: [
							new Qi({
								name: o,
								value: s,
							}),
						],
					});
				}
				if (i.context !== null && i.context !== undefined) {
					if (i.implicit) {
						if (typeof i.type == "number" || Ro(i.type)) {
							const e = i.repeated ? In : An;
							n.push(
								new e({
									name: o,
									optional: a,
									idBlock: {
										tagClass: 3,
										tagNumber: i.context,
									},
								}),
							);
						} else {
							this.cache(i.type);
							const e = !!i.repeated;
							let t = e ? s : this.get(i.type, true).schema;
							t = "valueBlock" in t ? t.valueBlock.value : t.value;
							n.push(
								new In({
									name: e ? "" : o,
									optional: a,
									idBlock: {
										tagClass: 3,
										tagNumber: i.context,
									},
									value: t,
								}),
							);
						}
					} else {
						n.push(
							new In({
								optional: a,
								idBlock: {
									tagClass: 3,
									tagNumber: i.context,
								},
								value: [s],
							}),
						);
					}
				} else {
					s.optional = a;
					n.push(s);
				}
			}
			switch (r.type) {
				case eo.Sequence:
					return new ii({
						value: n,
						name: "",
					});
				case eo.Set:
					return new oi({
						value: n,
						name: "",
					});
				case eo.Choice:
					return new qi({
						value: n,
						name: "",
					});
				default:
					throw new Error("Unsupported ASN1 type in use");
			}
		}
		set(e, t) {
			this.items.set(e, t);
			return this;
		}
		findParentSchema(e) {
			const t = Object.getPrototypeOf(e);
			if (t) {
				return this.items.get(t) || this.findParentSchema(t);
			} else {
				return null;
			}
		}
	})();
	const Po = (e) => (t) => {
		let r;
		if (Do.has(t)) {
			r = Do.get(t);
		} else {
			r = Do.createDefault(t);
			Do.set(t, r);
		}
		Object.assign(r, e);
	};
	const Vo = (e) => (t, r) => {
		let n;
		if (Do.has(t.constructor)) {
			n = Do.get(t.constructor);
		} else {
			n = Do.createDefault(t.constructor);
			Do.set(t.constructor, n);
		}
		const i = Object.assign({}, e);
		if (typeof i.type == "number" && !i.converter) {
			const n = Co(e.type);
			if (!n) {
				throw new Error(
					`Cannot get default converter for property '${r}' of ${t.constructor.name}`,
				);
			}
			i.converter = n;
		}
		n.items[r] = i;
	};
	class jo extends Error {
		constructor() {
			super(...arguments);
			this.schemas = [];
		}
	}
	class Lo {
		static parse(e, t) {
			const r = Tn(e);
			if (r.result.error) {
				throw new Error(r.result.error);
			}
			return this.fromASN(r.result, t);
		}
		static fromASN(e, t) {
			try {
				if (Ro(t)) {
					return new t().fromASN(e);
				}
				const n = Do.get(t);
				Do.cache(t);
				let i = n.schema;
				if (e.constructor === In && n.type !== eo.Choice) {
					i = new In({
						idBlock: {
							tagClass: 3,
							tagNumber: e.idBlock.tagNumber,
						},
						value: n.schema.valueBlock.value,
					});
					for (const t in n.items) {
						delete e[t];
					}
				}
				const o = Zi({}, e, i);
				if (!o.verified) {
					throw new jo(
						`Data does not match to ${t.name} ASN1 schema. ${o.result.error}`,
					);
				}
				const s = new t();
				if (_o(t)) {
					if (
						!("value" in e.valueBlock) ||
						!Array.isArray(e.valueBlock.value)
					) {
						throw new Error(
							"Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.",
						);
					}
					const r = n.itemType;
					if (typeof r == "number") {
						const n = Co(r);
						if (!n) {
							throw new Error(
								`Cannot get default converter for array item of ${t.name} ASN1 schema`,
							);
						}
						return t.from(e.valueBlock.value, (e) => n.fromASN(e));
					}
					return t.from(e.valueBlock.value, (e) => this.fromASN(e, r));
				}
				for (const e in n.items) {
					const t = o.result[e];
					if (!t) {
						continue;
					}
					const i = n.items[e];
					const a = i.type;
					if (typeof a == "number" || Ro(a)) {
						const n = i.converter ?? (Ro(a) ? new a() : null);
						if (!n) {
							throw new Error("Converter is empty");
						}
						if (i.repeated) {
							if (i.implicit) {
								const r = new (i.repeated === "sequence" ? ii : oi)();
								r.valueBlock = t.valueBlock;
								const o = Tn(r.toBER(false));
								if (o.offset === -1) {
									throw new Error(
										`Cannot parse the child item. ${o.result.error}`,
									);
								}
								if (
									!("value" in o.result.valueBlock) ||
									!Array.isArray(o.result.valueBlock.value)
								) {
									throw new Error(
										"Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.",
									);
								}
								const a = o.result.valueBlock.value;
								s[e] = Array.from(a, (e) => n.fromASN(e));
							} else {
								s[e] = Array.from(t, (e) => n.fromASN(e));
							}
						} else {
							let r = t;
							if (i.implicit) {
								let e;
								if (Ro(a)) {
									e = new a().toSchema("");
								} else {
									const t = to[a];
									const r = ro[t];
									if (!r) {
										throw new Error(
											`Cannot get '${t}' class from asn1js module`,
										);
									}
									e = new r();
								}
								e.valueBlock = r.valueBlock;
								r = Tn(e.toBER(false)).result;
							}
							s[e] = n.fromASN(r);
						}
					} else if (i.repeated) {
						if (!Array.isArray(t)) {
							throw new Error(
								"Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.",
							);
						}
						s[e] = Array.from(t, (e) => this.fromASN(e, a));
					} else {
						s[e] = this.fromASN(t, a);
					}
				}
				return s;
			} catch (e) {
				if (e instanceof jo) {
					e.schemas.push(t.name);
				}
				throw e;
			}
		}
	}
	class Fo {
		static serialize(e) {
			if (e instanceof dn) {
				return e.toBER(false);
			} else {
				return this.toASN(e).toBER(false);
			}
		}
		static toASN(e) {
			if (e && typeof e == "object" && Ro(e)) {
				return e.toASN();
			}
			if (!e || typeof e != "object") {
				throw new TypeError("Parameter 1 should be type of Object.");
			}
			const t = e.constructor;
			const r = Do.get(t);
			Do.cache(t);
			let n;
			let i = [];
			if (r.itemType) {
				if (!Array.isArray(e)) {
					throw new TypeError("Parameter 1 should be type of Array.");
				}
				if (typeof r.itemType == "number") {
					const n = Co(r.itemType);
					if (!n) {
						throw new Error(
							`Cannot get default converter for array item of ${t.name} ASN1 schema`,
						);
					}
					i = e.map((e) => n.toASN(e));
				} else {
					i = e.map((e) =>
						this.toAsnItem(
							{
								type: r.itemType,
							},
							"[]",
							t,
							e,
						),
					);
				}
			} else {
				for (const n in r.items) {
					const o = r.items[n];
					const s = e[n];
					if (
						s === undefined ||
						o.defaultValue === s ||
						(typeof o.defaultValue == "object" &&
							typeof s == "object" &&
							Uo(this.serialize(o.defaultValue), this.serialize(s)))
					) {
						continue;
					}
					const a = Fo.toAsnItem(o, n, t, s);
					if (typeof o.context == "number") {
						if (o.implicit) {
							if (o.repeated || (typeof o.type != "number" && !Ro(o.type))) {
								i.push(
									new In({
										optional: o.optional,
										idBlock: {
											tagClass: 3,
											tagNumber: o.context,
										},
										value: a.valueBlock.value,
									}),
								);
							} else {
								const e = {};
								e.valueHex =
									a instanceof xn
										? a.valueBeforeDecodeView
										: a.valueBlock.toBER();
								i.push(
									new An({
										optional: o.optional,
										idBlock: {
											tagClass: 3,
											tagNumber: o.context,
										},
										...e,
									}),
								);
							}
						} else {
							i.push(
								new In({
									optional: o.optional,
									idBlock: {
										tagClass: 3,
										tagNumber: o.context,
									},
									value: [a],
								}),
							);
						}
					} else if (o.repeated) {
						i = i.concat(a);
					} else {
						i.push(a);
					}
				}
			}
			switch (r.type) {
				case eo.Sequence:
					n = new ii({
						value: i,
					});
					break;
				case eo.Set:
					n = new oi({
						value: i,
					});
					break;
				case eo.Choice:
					if (!i[0]) {
						throw new Error(
							`Schema '${t.name}' has wrong data. Choice cannot be empty.`,
						);
					}
					n = i[0];
			}
			return n;
		}
		static toAsnItem(e, t, r, n) {
			let i;
			if (typeof e.type == "number") {
				const o = e.converter;
				if (!o) {
					throw new Error(
						`Property '${t}' doesn't have converter for type ${to[e.type]} in schema '${r.name}'`,
					);
				}
				if (e.repeated) {
					if (!Array.isArray(n)) {
						throw new TypeError("Parameter 'objProp' should be type of Array.");
					}
					const t = Array.from(n, (e) => o.toASN(e));
					i = new (e.repeated === "sequence" ? ii : oi)({
						value: t,
					});
				} else {
					i = o.toASN(n);
				}
			} else if (e.repeated) {
				if (!Array.isArray(n)) {
					throw new TypeError("Parameter 'objProp' should be type of Array.");
				}
				const t = Array.from(n, (e) => this.toASN(e));
				i = new (e.repeated === "sequence" ? ii : oi)({
					value: t,
				});
			} else {
				i = this.toASN(n);
			}
			return i;
		}
	}
	class Mo extends Array {
		constructor(e = []) {
			if (typeof e == "number") {
				super(e);
			} else {
				super();
				for (const t of e) {
					this.push(t);
				}
			}
		}
	}
	class Ho {
		static serialize(e) {
			return Fo.serialize(e);
		}
		static parse(e, t) {
			return Lo.parse(e, t);
		}
		static toString(e) {
			const t = Tn(
				_r.isBufferSource(e) ? _r.toArrayBuffer(e) : Ho.serialize(e),
			);
			if (t.offset === -1) {
				throw new Error(`Cannot decode ASN.1 data. ${t.result.error}`);
			}
			return t.result.toString();
		}
	}
	class Ko {
		static isIPv4(e) {
			return /^(\d{1,3}\.){3}\d{1,3}$/.test(e);
		}
		static parseIPv4(e) {
			const t = e.split(".");
			if (t.length !== 4) {
				throw new Error("Invalid IPv4 address");
			}
			return t.map((e) => {
				const t = parseInt(e, 10);
				if (isNaN(t) || t < 0 || t > 255) {
					throw new Error("Invalid IPv4 address part");
				}
				return t;
			});
		}
		static parseIPv6(e) {
			const t = this.expandIPv6(e).split(":");
			if (t.length !== 8) {
				throw new Error("Invalid IPv6 address");
			}
			return t.reduce((e, t) => {
				const r = parseInt(t, 16);
				if (isNaN(r) || r < 0 || r > 65535) {
					throw new Error("Invalid IPv6 address part");
				}
				e.push((r >> 8) & 255);
				e.push(r & 255);
				return e;
			}, []);
		}
		static expandIPv6(e) {
			if (!e.includes("::")) {
				return e;
			}
			const t = e.split("::");
			if (t.length > 2) {
				throw new Error("Invalid IPv6 address");
			}
			const r = t[0] ? t[0].split(":") : [];
			const n = t[1] ? t[1].split(":") : [];
			const i = 8 - (r.length + n.length);
			if (i < 0) {
				throw new Error("Invalid IPv6 address");
			}
			return [...r, ...Array(i).fill("0"), ...n].join(":");
		}
		static formatIPv6(e) {
			const t = [];
			for (let r = 0; r < 16; r += 2) {
				t.push(((e[r] << 8) | e[r + 1]).toString(16));
			}
			return this.compressIPv6(t.join(":"));
		}
		static compressIPv6(e) {
			const t = e.split(":");
			let r = -1;
			let n = 0;
			let i = -1;
			let o = 0;
			for (let e = 0; e < t.length; e++) {
				if (t[e] === "0") {
					if (i === -1) {
						i = e;
					}
					o++;
				} else {
					if (o > n) {
						r = i;
						n = o;
					}
					i = -1;
					o = 0;
				}
			}
			if (o > n) {
				r = i;
				n = o;
			}
			if (n > 1) {
				return `${t.slice(0, r).join(":")}::${t.slice(r + n).join(":")}`;
			} else {
				return e;
			}
		}
		static parseCIDR(e) {
			const [t, r] = e.split("/");
			const n = parseInt(r, 10);
			if (this.isIPv4(t)) {
				if (n < 0 || n > 32) {
					throw new Error("Invalid IPv4 prefix length");
				}
				return [this.parseIPv4(t), n];
			}
			if (n < 0 || n > 128) {
				throw new Error("Invalid IPv6 prefix length");
			}
			return [this.parseIPv6(t), n];
		}
		static decodeIP(e) {
			if (e.length === 64 && parseInt(e, 16) === 0) {
				return "::/0";
			}
			if (e.length !== 16) {
				return e;
			}
			const t = parseInt(e.slice(8), 16)
				.toString(2)
				.split("")
				.reduce((e, t) => e + +t, 0);
			let r = e.slice(0, 8).replace(/(.{2})/g, (e) => `${parseInt(e, 16)}.`);
			r = r.slice(0, -1);
			return `${r}/${t}`;
		}
		static toString(e) {
			const t = new Uint8Array(e);
			if (t.length === 4) {
				return Array.from(t).join(".");
			}
			if (t.length === 16) {
				return this.formatIPv6(t);
			}
			if (t.length === 8 || t.length === 32) {
				const e = t.length / 2;
				const r = t.slice(0, e);
				const n = t.slice(e);
				if (t.every((e) => e === 0)) {
					if (t.length === 8) {
						return "0.0.0.0/0";
					} else {
						return "::/0";
					}
				}
				const i = n.reduce(
					(e, t) => e + (t.toString(2).match(/1/g) || []).length,
					0,
				);
				if (t.length === 8) {
					return `${Array.from(r).join(".")}/${i}`;
				} else {
					return `${this.formatIPv6(r)}/${i}`;
				}
			}
			return this.decodeIP(Fr.ToHex(e));
		}
		static fromString(e) {
			if (e.includes("/")) {
				const [t, r] = this.parseCIDR(e);
				const n = new Uint8Array(t.length);
				let i = r;
				for (let e = 0; e < n.length; e++) {
					if (i >= 8) {
						n[e] = 255;
						i -= 8;
					} else if (i > 0) {
						n[e] = 255 << (8 - i);
						i = 0;
					}
				}
				const o = new Uint8Array(t.length * 2);
				o.set(t, 0);
				o.set(n, t.length);
				return o.buffer;
			}
			const t = this.isIPv4(e) ? this.parseIPv4(e) : this.parseIPv6(e);
			return new Uint8Array(t).buffer;
		}
	}
	var $o;
	var Go;
	var Wo;
	let Yo = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
		toString() {
			return (
				this.bmpString ||
				this.printableString ||
				this.teletexString ||
				this.universalString ||
				this.utf8String ||
				""
			);
		}
	};
	e(
		[
			Vo({
				type: to.TeletexString,
			}),
		],
		Yo.prototype,
		"teletexString",
		undefined,
	);
	e(
		[
			Vo({
				type: to.PrintableString,
			}),
		],
		Yo.prototype,
		"printableString",
		undefined,
	);
	e(
		[
			Vo({
				type: to.UniversalString,
			}),
		],
		Yo.prototype,
		"universalString",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Utf8String,
			}),
		],
		Yo.prototype,
		"utf8String",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BmpString,
			}),
		],
		Yo.prototype,
		"bmpString",
		undefined,
	);
	Yo = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Yo,
	);
	let Jo = class extends Yo {
		constructor(e = {}) {
			super(e);
			Object.assign(this, e);
		}
		toString() {
			return (
				this.ia5String ||
				(this.anyValue ? Fr.ToHex(this.anyValue) : super.toString())
			);
		}
	};
	e(
		[
			Vo({
				type: to.IA5String,
			}),
		],
		Jo.prototype,
		"ia5String",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		Jo.prototype,
		"anyValue",
		undefined,
	);
	Jo = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Jo,
	);
	class zo {
		constructor(e = {}) {
			this.type = "";
			this.value = new Jo();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		zo.prototype,
		"type",
		undefined,
	);
	e(
		[
			Vo({
				type: Jo,
			}),
		],
		zo.prototype,
		"value",
		undefined,
	);
	let Xo = ($o = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, $o.prototype);
		}
	});
	Xo = $o = e(
		[
			Po({
				type: eo.Set,
				itemType: zo,
			}),
		],
		Xo,
	);
	let qo = (Go = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Go.prototype);
		}
	});
	qo = Go = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Xo,
			}),
		],
		qo,
	);
	let Qo = (Wo = class extends qo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Wo.prototype);
		}
	});
	Qo = Wo = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Qo,
	);
	const Zo = {
		fromASN: (e) => Ko.toString(ho.fromASN(e)),
		toASN: (e) => ho.toASN(Ko.fromString(e)),
	};
	class es {
		constructor(e = {}) {
			this.typeId = "";
			this.value = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		es.prototype,
		"typeId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		es.prototype,
		"value",
		undefined,
	);
	class ts {
		constructor(e = {}) {
			this.partyName = new Yo();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Yo,
				optional: true,
				context: 0,
				implicit: true,
			}),
		],
		ts.prototype,
		"nameAssigner",
		undefined,
	);
	e(
		[
			Vo({
				type: Yo,
				context: 1,
				implicit: true,
			}),
		],
		ts.prototype,
		"partyName",
		undefined,
	);
	let rs = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: es,
				context: 0,
				implicit: true,
			}),
		],
		rs.prototype,
		"otherName",
		undefined,
	);
	e(
		[
			Vo({
				type: to.IA5String,
				context: 1,
				implicit: true,
			}),
		],
		rs.prototype,
		"rfc822Name",
		undefined,
	);
	e(
		[
			Vo({
				type: to.IA5String,
				context: 2,
				implicit: true,
			}),
		],
		rs.prototype,
		"dNSName",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 3,
				implicit: true,
			}),
		],
		rs.prototype,
		"x400Address",
		undefined,
	);
	e(
		[
			Vo({
				type: Qo,
				context: 4,
				implicit: false,
			}),
		],
		rs.prototype,
		"directoryName",
		undefined,
	);
	e(
		[
			Vo({
				type: ts,
				context: 5,
			}),
		],
		rs.prototype,
		"ediPartyName",
		undefined,
	);
	e(
		[
			Vo({
				type: to.IA5String,
				context: 6,
				implicit: true,
			}),
		],
		rs.prototype,
		"uniformResourceIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: to.OctetString,
				context: 7,
				implicit: true,
				converter: Zo,
			}),
		],
		rs.prototype,
		"iPAddress",
		undefined,
	);
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
				context: 8,
				implicit: true,
			}),
		],
		rs.prototype,
		"registeredID",
		undefined,
	);
	rs = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		rs,
	);
	const ns = "1.3.6.1.5.5.7";
	const is = `${ns}.3`;
	const os = `${ns}.48`;
	const ss = `${os}.1`;
	const as = `${os}.2`;
	const cs = `${os}.3`;
	const ls = `${os}.5`;
	const us = "2.5.29";
	var ps;
	const hs = `${ns}.1.1`;
	class fs {
		constructor(e = {}) {
			this.accessMethod = "";
			this.accessLocation = new rs();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		fs.prototype,
		"accessMethod",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
			}),
		],
		fs.prototype,
		"accessLocation",
		undefined,
	);
	let ds = (ps = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, ps.prototype);
		}
	});
	ds = ps = e(
		[
			Po({
				type: eo.Sequence,
				itemType: fs,
			}),
		],
		ds,
	);
	const ys = `${us}.35`;
	class ms extends io {}
	class gs {
		constructor(e = {}) {
			if (e) {
				Object.assign(this, e);
			}
		}
	}
	e(
		[
			Vo({
				type: ms,
				context: 0,
				optional: true,
				implicit: true,
			}),
		],
		gs.prototype,
		"keyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
				context: 1,
				optional: true,
				implicit: true,
				repeated: "sequence",
			}),
		],
		gs.prototype,
		"authorityCertIssuer",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 2,
				optional: true,
				implicit: true,
				converter: co,
			}),
		],
		gs.prototype,
		"authorityCertSerialNumber",
		undefined,
	);
	const vs = `${us}.19`;
	class bs {
		constructor(e = {}) {
			this.cA = false;
			Object.assign(this, e);
		}
	}
	var Es;
	e(
		[
			Vo({
				type: to.Boolean,
				defaultValue: false,
			}),
		],
		bs.prototype,
		"cA",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				optional: true,
			}),
		],
		bs.prototype,
		"pathLenConstraint",
		undefined,
	);
	let ws = (Es = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Es.prototype);
		}
	});
	var Ss;
	ws = Es = e(
		[
			Po({
				type: eo.Sequence,
				itemType: rs,
			}),
		],
		ws,
	);
	let As = (Ss = class extends ws {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Ss.prototype);
		}
	});
	var Ns;
	As = Ss = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		As,
	);
	const Ts = `${us}.32`;
	let Os = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
		toString() {
			return (
				this.ia5String ||
				this.visibleString ||
				this.bmpString ||
				this.utf8String ||
				""
			);
		}
	};
	e(
		[
			Vo({
				type: to.IA5String,
			}),
		],
		Os.prototype,
		"ia5String",
		undefined,
	);
	e(
		[
			Vo({
				type: to.VisibleString,
			}),
		],
		Os.prototype,
		"visibleString",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BmpString,
			}),
		],
		Os.prototype,
		"bmpString",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Utf8String,
			}),
		],
		Os.prototype,
		"utf8String",
		undefined,
	);
	Os = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Os,
	);
	class Is {
		constructor(e = {}) {
			this.organization = new Os();
			this.noticeNumbers = [];
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Os,
			}),
		],
		Is.prototype,
		"organization",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				repeated: "sequence",
			}),
		],
		Is.prototype,
		"noticeNumbers",
		undefined,
	);
	class ks {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Is,
				optional: true,
			}),
		],
		ks.prototype,
		"noticeRef",
		undefined,
	);
	e(
		[
			Vo({
				type: Os,
				optional: true,
			}),
		],
		ks.prototype,
		"explicitText",
		undefined,
	);
	let Bs = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: to.IA5String,
			}),
		],
		Bs.prototype,
		"cPSuri",
		undefined,
	);
	e(
		[
			Vo({
				type: ks,
			}),
		],
		Bs.prototype,
		"userNotice",
		undefined,
	);
	Bs = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Bs,
	);
	class xs {
		constructor(e = {}) {
			this.policyQualifierId = "";
			this.qualifier = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		xs.prototype,
		"policyQualifierId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		xs.prototype,
		"qualifier",
		undefined,
	);
	class Cs {
		constructor(e = {}) {
			this.policyIdentifier = "";
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Cs.prototype,
		"policyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: xs,
				repeated: "sequence",
				optional: true,
			}),
		],
		Cs.prototype,
		"policyQualifiers",
		undefined,
	);
	let Rs = (Ns = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Ns.prototype);
		}
	});
	Rs = Ns = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Cs,
			}),
		],
		Rs,
	);
	let _s = class {
		constructor(e = 0) {
			this.value = e;
		}
	};
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		_s.prototype,
		"value",
		undefined,
	);
	_s = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		_s,
	);
	let Us = class extends _s {};
	var Ds;
	Us = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Us,
	);
	const Ps = `${us}.31`;
	var Vs;
	(function (e) {
		e[(e.unused = 1)] = "unused";
		e[(e.keyCompromise = 2)] = "keyCompromise";
		e[(e.cACompromise = 4)] = "cACompromise";
		e[(e.affiliationChanged = 8)] = "affiliationChanged";
		e[(e.superseded = 16)] = "superseded";
		e[(e.cessationOfOperation = 32)] = "cessationOfOperation";
		e[(e.certificateHold = 64)] = "certificateHold";
		e[(e.privilegeWithdrawn = 128)] = "privilegeWithdrawn";
		e[(e.aACompromise = 256)] = "aACompromise";
	})((Vs ||= {}));
	class js extends no {
		toJSON() {
			const e = [];
			const t = this.toNumber();
			if (t & Vs.aACompromise) {
				e.push("aACompromise");
			}
			if (t & Vs.affiliationChanged) {
				e.push("affiliationChanged");
			}
			if (t & Vs.cACompromise) {
				e.push("cACompromise");
			}
			if (t & Vs.certificateHold) {
				e.push("certificateHold");
			}
			if (t & Vs.cessationOfOperation) {
				e.push("cessationOfOperation");
			}
			if (t & Vs.keyCompromise) {
				e.push("keyCompromise");
			}
			if (t & Vs.privilegeWithdrawn) {
				e.push("privilegeWithdrawn");
			}
			if (t & Vs.superseded) {
				e.push("superseded");
			}
			if (t & Vs.unused) {
				e.push("unused");
			}
			return e;
		}
		toString() {
			return `[${this.toJSON().join(", ")}]`;
		}
	}
	let Ls = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: rs,
				context: 0,
				repeated: "sequence",
				implicit: true,
			}),
		],
		Ls.prototype,
		"fullName",
		undefined,
	);
	e(
		[
			Vo({
				type: Xo,
				context: 1,
				implicit: true,
			}),
		],
		Ls.prototype,
		"nameRelativeToCRLIssuer",
		undefined,
	);
	Ls = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ls,
	);
	class Fs {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ls,
				context: 0,
				optional: true,
			}),
		],
		Fs.prototype,
		"distributionPoint",
		undefined,
	);
	e(
		[
			Vo({
				type: js,
				context: 1,
				optional: true,
				implicit: true,
			}),
		],
		Fs.prototype,
		"reasons",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
				context: 2,
				optional: true,
				repeated: "sequence",
				implicit: true,
			}),
		],
		Fs.prototype,
		"cRLIssuer",
		undefined,
	);
	let Ms = (Ds = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Ds.prototype);
		}
	});
	var Hs;
	Ms = Ds = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Fs,
			}),
		],
		Ms,
	);
	let Ks = (Hs = class extends Ms {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Hs.prototype);
		}
	});
	Ks = Hs = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Fs,
			}),
		],
		Ks,
	);
	class $s {
		constructor(e = {}) {
			this.onlyContainsUserCerts = $s.ONLY;
			this.onlyContainsCACerts = $s.ONLY;
			this.indirectCRL = $s.ONLY;
			this.onlyContainsAttributeCerts = $s.ONLY;
			Object.assign(this, e);
		}
	}
	var Gs;
	$s.ONLY = false;
	e(
		[
			Vo({
				type: Ls,
				context: 0,
				optional: true,
			}),
		],
		$s.prototype,
		"distributionPoint",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				context: 1,
				defaultValue: $s.ONLY,
				implicit: true,
			}),
		],
		$s.prototype,
		"onlyContainsUserCerts",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				context: 2,
				defaultValue: $s.ONLY,
				implicit: true,
			}),
		],
		$s.prototype,
		"onlyContainsCACerts",
		undefined,
	);
	e(
		[
			Vo({
				type: js,
				context: 3,
				optional: true,
				implicit: true,
			}),
		],
		$s.prototype,
		"onlySomeReasons",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				context: 4,
				defaultValue: $s.ONLY,
				implicit: true,
			}),
		],
		$s.prototype,
		"indirectCRL",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				context: 5,
				defaultValue: $s.ONLY,
				implicit: true,
			}),
		],
		$s.prototype,
		"onlyContainsAttributeCerts",
		undefined,
	);
	(function (e) {
		e[(e.unspecified = 0)] = "unspecified";
		e[(e.keyCompromise = 1)] = "keyCompromise";
		e[(e.cACompromise = 2)] = "cACompromise";
		e[(e.affiliationChanged = 3)] = "affiliationChanged";
		e[(e.superseded = 4)] = "superseded";
		e[(e.cessationOfOperation = 5)] = "cessationOfOperation";
		e[(e.certificateHold = 6)] = "certificateHold";
		e[(e.removeFromCRL = 8)] = "removeFromCRL";
		e[(e.privilegeWithdrawn = 9)] = "privilegeWithdrawn";
		e[(e.aACompromise = 10)] = "aACompromise";
	})((Gs ||= {}));
	let Ws = class {
		constructor(e = Gs.unspecified) {
			this.reason = Gs.unspecified;
			this.reason = e;
		}
		toJSON() {
			return Gs[this.reason];
		}
		toString() {
			return this.toJSON();
		}
	};
	var Ys;
	e(
		[
			Vo({
				type: to.Enumerated,
			}),
		],
		Ws.prototype,
		"reason",
		undefined,
	);
	Ws = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ws,
	);
	const Js = `${us}.37`;
	let zs = (Ys = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Ys.prototype);
		}
	});
	zs = Ys = e(
		[
			Po({
				type: eo.Sequence,
				itemType: to.ObjectIdentifier,
			}),
		],
		zs,
	);
	const Xs = `${is}.1`;
	const qs = `${is}.2`;
	const Qs = `${is}.3`;
	const Zs = `${is}.4`;
	const ea = `${is}.8`;
	const ta = `${is}.9`;
	let ra = class {
		constructor(e = new ArrayBuffer(0)) {
			this.value = e;
		}
	};
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		ra.prototype,
		"value",
		undefined,
	);
	ra = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		ra,
	);
	let na = class {
		constructor(e) {
			this.value = new Date();
			if (e) {
				this.value = e;
			}
		}
	};
	var ia;
	e(
		[
			Vo({
				type: to.GeneralizedTime,
			}),
		],
		na.prototype,
		"value",
		undefined,
	);
	na = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		na,
	);
	let oa = (ia = class extends ws {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, ia.prototype);
		}
	});
	oa = ia = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		oa,
	);
	const sa = `${us}.15`;
	var aa;
	var ca;
	(function (e) {
		e[(e.digitalSignature = 1)] = "digitalSignature";
		e[(e.nonRepudiation = 2)] = "nonRepudiation";
		e[(e.keyEncipherment = 4)] = "keyEncipherment";
		e[(e.dataEncipherment = 8)] = "dataEncipherment";
		e[(e.keyAgreement = 16)] = "keyAgreement";
		e[(e.keyCertSign = 32)] = "keyCertSign";
		e[(e.cRLSign = 64)] = "cRLSign";
		e[(e.encipherOnly = 128)] = "encipherOnly";
		e[(e.decipherOnly = 256)] = "decipherOnly";
	})((aa ||= {}));
	class la extends no {
		toJSON() {
			const e = this.toNumber();
			const t = [];
			if (e & aa.cRLSign) {
				t.push("crlSign");
			}
			if (e & aa.dataEncipherment) {
				t.push("dataEncipherment");
			}
			if (e & aa.decipherOnly) {
				t.push("decipherOnly");
			}
			if (e & aa.digitalSignature) {
				t.push("digitalSignature");
			}
			if (e & aa.encipherOnly) {
				t.push("encipherOnly");
			}
			if (e & aa.keyAgreement) {
				t.push("keyAgreement");
			}
			if (e & aa.keyCertSign) {
				t.push("keyCertSign");
			}
			if (e & aa.keyEncipherment) {
				t.push("keyEncipherment");
			}
			if (e & aa.nonRepudiation) {
				t.push("nonRepudiation");
			}
			return t;
		}
		toString() {
			return `[${this.toJSON().join(", ")}]`;
		}
	}
	class ua {
		constructor(e = {}) {
			this.base = new rs();
			this.minimum = 0;
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: rs,
			}),
		],
		ua.prototype,
		"base",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 0,
				defaultValue: 0,
				implicit: true,
			}),
		],
		ua.prototype,
		"minimum",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 1,
				optional: true,
				implicit: true,
			}),
		],
		ua.prototype,
		"maximum",
		undefined,
	);
	let pa = (ca = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, ca.prototype);
		}
	});
	pa = ca = e(
		[
			Po({
				type: eo.Sequence,
				itemType: ua,
			}),
		],
		pa,
	);
	class ha {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: pa,
				context: 0,
				optional: true,
				implicit: true,
			}),
		],
		ha.prototype,
		"permittedSubtrees",
		undefined,
	);
	e(
		[
			Vo({
				type: pa,
				context: 1,
				optional: true,
				implicit: true,
			}),
		],
		ha.prototype,
		"excludedSubtrees",
		undefined,
	);
	class fa {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	var da;
	e(
		[
			Vo({
				type: to.Integer,
				context: 0,
				implicit: true,
				optional: true,
				converter: co,
			}),
		],
		fa.prototype,
		"requireExplicitPolicy",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 1,
				implicit: true,
				optional: true,
				converter: co,
			}),
		],
		fa.prototype,
		"inhibitPolicyMapping",
		undefined,
	);
	class ya {
		constructor(e = {}) {
			this.issuerDomainPolicy = "";
			this.subjectDomainPolicy = "";
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		ya.prototype,
		"issuerDomainPolicy",
		undefined,
	);
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		ya.prototype,
		"subjectDomainPolicy",
		undefined,
	);
	let ma = (da = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, da.prototype);
		}
	});
	var ga;
	ma = da = e(
		[
			Po({
				type: eo.Sequence,
				itemType: ya,
			}),
		],
		ma,
	);
	const va = `${us}.17`;
	let ba = (ga = class extends ws {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, ga.prototype);
		}
	});
	ba = ga = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		ba,
	);
	let Ea = class {
		constructor(e = {}) {
			this.type = "";
			this.values = [];
			Object.assign(this, e);
		}
	};
	var wa;
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Ea.prototype,
		"type",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				repeated: "set",
			}),
		],
		Ea.prototype,
		"values",
		undefined,
	);
	let Sa = (wa = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, wa.prototype);
		}
	});
	Sa = wa = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Ea,
			}),
		],
		Sa,
	);
	const Aa = `${us}.14`;
	class Na extends ms {}
	class Ta {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	var Oa;
	var Ia;
	e(
		[
			Vo({
				type: to.GeneralizedTime,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		Ta.prototype,
		"notBefore",
		undefined,
	);
	e(
		[
			Vo({
				type: to.GeneralizedTime,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		Ta.prototype,
		"notAfter",
		undefined,
	);
	(function (e) {
		e[(e.keyUpdateAllowed = 1)] = "keyUpdateAllowed";
		e[(e.newExtensions = 2)] = "newExtensions";
		e[(e.pKIXCertificate = 4)] = "pKIXCertificate";
	})((Oa ||= {}));
	class ka extends no {
		toJSON() {
			const e = [];
			const t = this.toNumber();
			if (t & Oa.pKIXCertificate) {
				e.push("pKIXCertificate");
			}
			if (t & Oa.newExtensions) {
				e.push("newExtensions");
			}
			if (t & Oa.keyUpdateAllowed) {
				e.push("keyUpdateAllowed");
			}
			return e;
		}
		toString() {
			return `[${this.toJSON().join(", ")}]`;
		}
	}
	class Ba {
		constructor(e = {}) {
			this.entrustVers = "";
			this.entrustInfoFlags = new ka();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.GeneralString,
			}),
		],
		Ba.prototype,
		"entrustVers",
		undefined,
	);
	e(
		[
			Vo({
				type: ka,
			}),
		],
		Ba.prototype,
		"entrustInfoFlags",
		undefined,
	);
	let xa = (Ia = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Ia.prototype);
		}
	});
	xa = Ia = e(
		[
			Po({
				type: eo.Sequence,
				itemType: fs,
			}),
		],
		xa,
	);
	class Ca {
		constructor(e = {}) {
			this.algorithm = "";
			Object.assign(this, e);
		}
		isEqual(e) {
			return (
				e instanceof Ca &&
				e.algorithm == this.algorithm &&
				((e.parameters &&
					this.parameters &&
					Mr(e.parameters, this.parameters)) ||
					e.parameters === this.parameters)
			);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Ca.prototype,
		"algorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				optional: true,
			}),
		],
		Ca.prototype,
		"parameters",
		undefined,
	);
	class Ra {
		constructor(e = {}) {
			this.algorithm = new Ca();
			this.subjectPublicKey = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Ra.prototype,
		"algorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Ra.prototype,
		"subjectPublicKey",
		undefined,
	);
	let _a = class {
		constructor(e) {
			if (e) {
				if (typeof e == "string" || typeof e == "number" || e instanceof Date) {
					const t = new Date(e);
					if (t.getUTCFullYear() > 2049) {
						this.generalTime = t;
					} else {
						this.utcTime = t;
					}
				} else {
					Object.assign(this, e);
				}
			}
		}
		getTime() {
			const e = this.utcTime || this.generalTime;
			if (!e) {
				throw new Error("Cannot get time from CHOICE object");
			}
			return e;
		}
	};
	e(
		[
			Vo({
				type: to.UTCTime,
			}),
		],
		_a.prototype,
		"utcTime",
		undefined,
	);
	e(
		[
			Vo({
				type: to.GeneralizedTime,
			}),
		],
		_a.prototype,
		"generalTime",
		undefined,
	);
	_a = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		_a,
	);
	class Ua {
		constructor(e) {
			this.notBefore = new _a(new Date());
			this.notAfter = new _a(new Date());
			if (e) {
				this.notBefore = new _a(e.notBefore);
				this.notAfter = new _a(e.notAfter);
			}
		}
	}
	var Da;
	e(
		[
			Vo({
				type: _a,
			}),
		],
		Ua.prototype,
		"notBefore",
		undefined,
	);
	e(
		[
			Vo({
				type: _a,
			}),
		],
		Ua.prototype,
		"notAfter",
		undefined,
	);
	let Pa = class e {
		constructor(t = {}) {
			this.extnID = "";
			this.critical = e.CRITICAL;
			this.extnValue = new io();
			Object.assign(this, t);
		}
	};
	Pa.CRITICAL = false;
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Pa.prototype,
		"extnID",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				defaultValue: Pa.CRITICAL,
			}),
		],
		Pa.prototype,
		"critical",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		Pa.prototype,
		"extnValue",
		undefined,
	);
	let Va = (Da = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Da.prototype);
		}
	});
	var ja;
	Va = Da = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Pa,
			}),
		],
		Va,
	);
	(function (e) {
		e[(e.v1 = 0)] = "v1";
		e[(e.v2 = 1)] = "v2";
		e[(e.v3 = 2)] = "v3";
	})((ja ||= {}));
	class La {
		constructor(e = {}) {
			this.version = ja.v1;
			this.serialNumber = new ArrayBuffer(0);
			this.signature = new Ca();
			this.issuer = new Qo();
			this.validity = new Ua();
			this.subject = new Qo();
			this.subjectPublicKeyInfo = new Ra();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				context: 0,
				defaultValue: ja.v1,
			}),
		],
		La.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		La.prototype,
		"serialNumber",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		La.prototype,
		"signature",
		undefined,
	);
	e(
		[
			Vo({
				type: Qo,
			}),
		],
		La.prototype,
		"issuer",
		undefined,
	);
	e(
		[
			Vo({
				type: Ua,
			}),
		],
		La.prototype,
		"validity",
		undefined,
	);
	e(
		[
			Vo({
				type: Qo,
			}),
		],
		La.prototype,
		"subject",
		undefined,
	);
	e(
		[
			Vo({
				type: Ra,
			}),
		],
		La.prototype,
		"subjectPublicKeyInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		La.prototype,
		"issuerUniqueID",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				context: 2,
				implicit: true,
				optional: true,
			}),
		],
		La.prototype,
		"subjectUniqueID",
		undefined,
	);
	e(
		[
			Vo({
				type: Va,
				context: 3,
				optional: true,
			}),
		],
		La.prototype,
		"extensions",
		undefined,
	);
	class Fa {
		constructor(e = {}) {
			this.tbsCertificate = new La();
			this.signatureAlgorithm = new Ca();
			this.signatureValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: La,
			}),
		],
		Fa.prototype,
		"tbsCertificate",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Fa.prototype,
		"signatureAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Fa.prototype,
		"signatureValue",
		undefined,
	);
	class Ma {
		constructor(e = {}) {
			this.userCertificate = new ArrayBuffer(0);
			this.revocationDate = new _a();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		Ma.prototype,
		"userCertificate",
		undefined,
	);
	e(
		[
			Vo({
				type: _a,
			}),
		],
		Ma.prototype,
		"revocationDate",
		undefined,
	);
	e(
		[
			Vo({
				type: Pa,
				optional: true,
				repeated: "sequence",
			}),
		],
		Ma.prototype,
		"crlEntryExtensions",
		undefined,
	);
	class Ha {
		constructor(e = {}) {
			this.signature = new Ca();
			this.issuer = new Qo();
			this.thisUpdate = new _a();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				optional: true,
			}),
		],
		Ha.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Ha.prototype,
		"signature",
		undefined,
	);
	e(
		[
			Vo({
				type: Qo,
			}),
		],
		Ha.prototype,
		"issuer",
		undefined,
	);
	e(
		[
			Vo({
				type: _a,
			}),
		],
		Ha.prototype,
		"thisUpdate",
		undefined,
	);
	e(
		[
			Vo({
				type: _a,
				optional: true,
			}),
		],
		Ha.prototype,
		"nextUpdate",
		undefined,
	);
	e(
		[
			Vo({
				type: Ma,
				repeated: "sequence",
				optional: true,
			}),
		],
		Ha.prototype,
		"revokedCertificates",
		undefined,
	);
	e(
		[
			Vo({
				type: Pa,
				optional: true,
				context: 0,
				repeated: "sequence",
			}),
		],
		Ha.prototype,
		"crlExtensions",
		undefined,
	);
	class Ka {
		constructor(e = {}) {
			this.tbsCertList = new Ha();
			this.signatureAlgorithm = new Ca();
			this.signature = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ha,
			}),
		],
		Ka.prototype,
		"tbsCertList",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Ka.prototype,
		"signatureAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Ka.prototype,
		"signature",
		undefined,
	);
	class $a {
		constructor(e = {}) {
			this.issuer = new Qo();
			this.serialNumber = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Qo,
			}),
		],
		$a.prototype,
		"issuer",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		$a.prototype,
		"serialNumber",
		undefined,
	);
	let Ga = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	var Wa;
	e(
		[
			Vo({
				type: Na,
				context: 0,
				implicit: true,
			}),
		],
		Ga.prototype,
		"subjectKeyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: $a,
			}),
		],
		Ga.prototype,
		"issuerAndSerialNumber",
		undefined,
	);
	Ga = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ga,
	);
	(function (e) {
		e[(e.v0 = 0)] = "v0";
		e[(e.v1 = 1)] = "v1";
		e[(e.v2 = 2)] = "v2";
		e[(e.v3 = 3)] = "v3";
		e[(e.v4 = 4)] = "v4";
		e[(e.v5 = 5)] = "v5";
	})((Wa ||= {}));
	let Ya = class extends Ca {};
	Ya = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Ya,
	);
	let Ja = class extends Ca {};
	Ja = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Ja,
	);
	let za = class extends Ca {};
	za = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		za,
	);
	let Xa = class extends Ca {};
	Xa = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Xa,
	);
	let qa = class extends Ca {};
	qa = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		qa,
	);
	let Qa = class extends Ca {};
	Qa = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Qa,
	);
	let Za = class {
		constructor(e = {}) {
			this.attrType = "";
			this.attrValues = [];
			Object.assign(this, e);
		}
	};
	var ec;
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Za.prototype,
		"attrType",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				repeated: "set",
			}),
		],
		Za.prototype,
		"attrValues",
		undefined,
	);
	class tc {
		constructor(e = {}) {
			this.version = Wa.v0;
			this.sid = new Ga();
			this.digestAlgorithm = new Ya();
			this.signatureAlgorithm = new Ja();
			this.signature = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		tc.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Ga,
			}),
		],
		tc.prototype,
		"sid",
		undefined,
	);
	e(
		[
			Vo({
				type: Ya,
			}),
		],
		tc.prototype,
		"digestAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Za,
				repeated: "set",
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		tc.prototype,
		"signedAttrs",
		undefined,
	);
	e(
		[
			Vo({
				type: Ja,
			}),
		],
		tc.prototype,
		"signatureAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		tc.prototype,
		"signature",
		undefined,
	);
	e(
		[
			Vo({
				type: Za,
				repeated: "set",
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		tc.prototype,
		"unsignedAttrs",
		undefined,
	);
	let rc = (ec = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, ec.prototype);
		}
	});
	rc = ec = e(
		[
			Po({
				type: eo.Set,
				itemType: tc,
			}),
		],
		rc,
	);
	let nc = class extends _a {};
	nc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		nc,
	);
	let ic = class extends tc {};
	ic = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		ic,
	);
	class oc {
		constructor(e = {}) {
			this.acIssuer = new rs();
			this.acSerial = 0;
			this.attrs = [];
			Object.assign(this, e);
		}
	}
	var sc;
	e(
		[
			Vo({
				type: rs,
			}),
		],
		oc.prototype,
		"acIssuer",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		oc.prototype,
		"acSerial",
		undefined,
	);
	e(
		[
			Vo({
				type: Ea,
				repeated: "sequence",
			}),
		],
		oc.prototype,
		"attrs",
		undefined,
	);
	let ac = (sc = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, sc.prototype);
		}
	});
	ac = sc = e(
		[
			Po({
				type: eo.Sequence,
				itemType: to.ObjectIdentifier,
			}),
		],
		ac,
	);
	class cc {
		constructor(e = {}) {
			this.permitUnSpecified = true;
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				optional: true,
			}),
		],
		cc.prototype,
		"pathLenConstraint",
		undefined,
	);
	e(
		[
			Vo({
				type: ac,
				implicit: true,
				context: 0,
				optional: true,
			}),
		],
		cc.prototype,
		"permittedAttrs",
		undefined,
	);
	e(
		[
			Vo({
				type: ac,
				implicit: true,
				context: 1,
				optional: true,
			}),
		],
		cc.prototype,
		"excludedAttrs",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Boolean,
				defaultValue: true,
			}),
		],
		cc.prototype,
		"permitUnSpecified",
		undefined,
	);
	class lc {
		constructor(e = {}) {
			this.issuer = new ws();
			this.serial = new ArrayBuffer(0);
			this.issuerUID = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	var uc;
	e(
		[
			Vo({
				type: ws,
			}),
		],
		lc.prototype,
		"issuer",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		lc.prototype,
		"serial",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				optional: true,
			}),
		],
		lc.prototype,
		"issuerUID",
		undefined,
	);
	(function (e) {
		e[(e.publicKey = 0)] = "publicKey";
		e[(e.publicKeyCert = 1)] = "publicKeyCert";
		e[(e.otherObjectTypes = 2)] = "otherObjectTypes";
	})((uc ||= {}));
	class pc {
		constructor(e = {}) {
			this.digestedObjectType = uc.publicKey;
			this.digestAlgorithm = new Ca();
			this.objectDigest = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Enumerated,
			}),
		],
		pc.prototype,
		"digestedObjectType",
		undefined,
	);
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
				optional: true,
			}),
		],
		pc.prototype,
		"otherObjectTypeID",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		pc.prototype,
		"digestAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		pc.prototype,
		"objectDigest",
		undefined,
	);
	class hc {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: ws,
				optional: true,
			}),
		],
		hc.prototype,
		"issuerName",
		undefined,
	);
	e(
		[
			Vo({
				type: lc,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		hc.prototype,
		"baseCertificateID",
		undefined,
	);
	e(
		[
			Vo({
				type: pc,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		hc.prototype,
		"objectDigestInfo",
		undefined,
	);
	let fc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: rs,
				repeated: "sequence",
			}),
		],
		fc.prototype,
		"v1Form",
		undefined,
	);
	e(
		[
			Vo({
				type: hc,
				context: 0,
				implicit: true,
			}),
		],
		fc.prototype,
		"v2Form",
		undefined,
	);
	fc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		fc,
	);
	class dc {
		constructor(e = {}) {
			this.notBeforeTime = new Date();
			this.notAfterTime = new Date();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.GeneralizedTime,
			}),
		],
		dc.prototype,
		"notBeforeTime",
		undefined,
	);
	e(
		[
			Vo({
				type: to.GeneralizedTime,
			}),
		],
		dc.prototype,
		"notAfterTime",
		undefined,
	);
	class yc {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	var mc;
	var gc;
	var vc;
	e(
		[
			Vo({
				type: lc,
				implicit: true,
				context: 0,
				optional: true,
			}),
		],
		yc.prototype,
		"baseCertificateID",
		undefined,
	);
	e(
		[
			Vo({
				type: ws,
				implicit: true,
				context: 1,
				optional: true,
			}),
		],
		yc.prototype,
		"entityName",
		undefined,
	);
	e(
		[
			Vo({
				type: pc,
				implicit: true,
				context: 2,
				optional: true,
			}),
		],
		yc.prototype,
		"objectDigestInfo",
		undefined,
	);
	(function (e) {
		e[(e.v2 = 1)] = "v2";
	})((mc ||= {}));
	class bc {
		constructor(e = {}) {
			this.version = mc.v2;
			this.holder = new yc();
			this.issuer = new fc();
			this.signature = new Ca();
			this.serialNumber = new ArrayBuffer(0);
			this.attrCertValidityPeriod = new dc();
			this.attributes = [];
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		bc.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: yc,
			}),
		],
		bc.prototype,
		"holder",
		undefined,
	);
	e(
		[
			Vo({
				type: fc,
			}),
		],
		bc.prototype,
		"issuer",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		bc.prototype,
		"signature",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		bc.prototype,
		"serialNumber",
		undefined,
	);
	e(
		[
			Vo({
				type: dc,
			}),
		],
		bc.prototype,
		"attrCertValidityPeriod",
		undefined,
	);
	e(
		[
			Vo({
				type: Ea,
				repeated: "sequence",
			}),
		],
		bc.prototype,
		"attributes",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				optional: true,
			}),
		],
		bc.prototype,
		"issuerUniqueID",
		undefined,
	);
	e(
		[
			Vo({
				type: Va,
				optional: true,
			}),
		],
		bc.prototype,
		"extensions",
		undefined,
	);
	class Ec {
		constructor(e = {}) {
			this.acinfo = new bc();
			this.signatureAlgorithm = new Ca();
			this.signatureValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: bc,
			}),
		],
		Ec.prototype,
		"acinfo",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Ec.prototype,
		"signatureAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Ec.prototype,
		"signatureValue",
		undefined,
	);
	(function (e) {
		e[(e.unmarked = 1)] = "unmarked";
		e[(e.unclassified = 2)] = "unclassified";
		e[(e.restricted = 4)] = "restricted";
		e[(e.confidential = 8)] = "confidential";
		e[(e.secret = 16)] = "secret";
		e[(e.topSecret = 32)] = "topSecret";
	})((gc ||= {}));
	class wc extends no {}
	class Sc {
		constructor(e = {}) {
			this.type = "";
			this.value = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
				implicit: true,
				context: 0,
			}),
		],
		Sc.prototype,
		"type",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				implicit: true,
				context: 1,
			}),
		],
		Sc.prototype,
		"value",
		undefined,
	);
	class Ac {
		constructor(e = {}) {
			this.policyId = "";
			this.classList = new wc(gc.unclassified);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Ac.prototype,
		"policyId",
		undefined,
	);
	e(
		[
			Vo({
				type: wc,
				defaultValue: new wc(gc.unclassified),
			}),
		],
		Ac.prototype,
		"classList",
		undefined,
	);
	e(
		[
			Vo({
				type: Sc,
				repeated: "set",
			}),
		],
		Ac.prototype,
		"securityCategories",
		undefined,
	);
	class Nc {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: io,
			}),
		],
		Nc.prototype,
		"cotets",
		undefined,
	);
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Nc.prototype,
		"oid",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Utf8String,
			}),
		],
		Nc.prototype,
		"string",
		undefined,
	);
	class Tc {
		constructor(e = {}) {
			this.values = [];
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: ws,
				implicit: true,
				context: 0,
				optional: true,
			}),
		],
		Tc.prototype,
		"policyAuthority",
		undefined,
	);
	e(
		[
			Vo({
				type: Nc,
				repeated: "sequence",
			}),
		],
		Tc.prototype,
		"values",
		undefined,
	);
	class Oc {
		constructor(e = {}) {
			this.targetCertificate = new lc();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: lc,
			}),
		],
		Oc.prototype,
		"targetCertificate",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
				optional: true,
			}),
		],
		Oc.prototype,
		"targetName",
		undefined,
	);
	e(
		[
			Vo({
				type: pc,
				optional: true,
			}),
		],
		Oc.prototype,
		"certDigestInfo",
		undefined,
	);
	let Ic = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: rs,
				context: 0,
				implicit: true,
			}),
		],
		Ic.prototype,
		"targetName",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
				context: 1,
				implicit: true,
			}),
		],
		Ic.prototype,
		"targetGroup",
		undefined,
	);
	e(
		[
			Vo({
				type: Oc,
				context: 2,
				implicit: true,
			}),
		],
		Ic.prototype,
		"targetCert",
		undefined,
	);
	Ic = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ic,
	);
	let kc = (vc = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, vc.prototype);
		}
	});
	var Bc;
	kc = vc = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Ic,
			}),
		],
		kc,
	);
	let xc = (Bc = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Bc.prototype);
		}
	});
	xc = Bc = e(
		[
			Po({
				type: eo.Sequence,
				itemType: kc,
			}),
		],
		xc,
	);
	class Cc {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: ws,
				implicit: true,
				context: 0,
				optional: true,
			}),
		],
		Cc.prototype,
		"roleAuthority",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
				implicit: true,
				context: 1,
			}),
		],
		Cc.prototype,
		"roleName",
		undefined,
	);
	class Rc {
		constructor(e = {}) {
			this.service = new rs();
			this.ident = new rs();
			Object.assign(this, e);
		}
	}
	var _c;
	e(
		[
			Vo({
				type: rs,
			}),
		],
		Rc.prototype,
		"service",
		undefined,
	);
	e(
		[
			Vo({
				type: rs,
			}),
		],
		Rc.prototype,
		"ident",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
				optional: true,
			}),
		],
		Rc.prototype,
		"authInfo",
		undefined,
	);
	class Uc {
		constructor(e = {}) {
			this.otherCertFormat = "";
			this.otherCert = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Uc.prototype,
		"otherCertFormat",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		Uc.prototype,
		"otherCert",
		undefined,
	);
	let Dc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: Fa,
			}),
		],
		Dc.prototype,
		"certificate",
		undefined,
	);
	e(
		[
			Vo({
				type: Ec,
				context: 2,
				implicit: true,
			}),
		],
		Dc.prototype,
		"v2AttrCert",
		undefined,
	);
	e(
		[
			Vo({
				type: Uc,
				context: 3,
				implicit: true,
			}),
		],
		Dc.prototype,
		"other",
		undefined,
	);
	Dc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Dc,
	);
	let Pc = (_c = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, _c.prototype);
		}
	});
	Pc = _c = e(
		[
			Po({
				type: eo.Set,
				itemType: Dc,
			}),
		],
		Pc,
	);
	class Vc {
		constructor(e = {}) {
			this.contentType = "";
			this.content = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Vc.prototype,
		"contentType",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		Vc.prototype,
		"content",
		undefined,
	);
	let jc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: io,
			}),
		],
		jc.prototype,
		"single",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		jc.prototype,
		"any",
		undefined,
	);
	jc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		jc,
	);
	class Lc {
		constructor(e = {}) {
			this.eContentType = "";
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Lc.prototype,
		"eContentType",
		undefined,
	);
	e(
		[
			Vo({
				type: jc,
				context: 0,
				optional: true,
			}),
		],
		Lc.prototype,
		"eContent",
		undefined,
	);
	let Fc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: io,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		Fc.prototype,
		"value",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
				converter: fo,
				context: 0,
				implicit: true,
				optional: true,
				repeated: "sequence",
			}),
		],
		Fc.prototype,
		"constructedValue",
		undefined,
	);
	Fc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Fc,
	);
	class Mc {
		constructor(e = {}) {
			this.contentType = "";
			this.contentEncryptionAlgorithm = new Xa();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Mc.prototype,
		"contentType",
		undefined,
	);
	e(
		[
			Vo({
				type: Xa,
			}),
		],
		Mc.prototype,
		"contentEncryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Fc,
				optional: true,
			}),
		],
		Mc.prototype,
		"encryptedContent",
		undefined,
	);
	class Hc {
		constructor(e = {}) {
			this.keyAttrId = "";
			Object.assign(this, e);
		}
	}
	var Kc;
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Hc.prototype,
		"keyAttrId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				optional: true,
			}),
		],
		Hc.prototype,
		"keyAttr",
		undefined,
	);
	class $c {
		constructor(e = {}) {
			this.subjectKeyIdentifier = new Na();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Na,
			}),
		],
		$c.prototype,
		"subjectKeyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: to.GeneralizedTime,
				optional: true,
			}),
		],
		$c.prototype,
		"date",
		undefined,
	);
	e(
		[
			Vo({
				type: Hc,
				optional: true,
			}),
		],
		$c.prototype,
		"other",
		undefined,
	);
	let Gc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: $c,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		Gc.prototype,
		"rKeyId",
		undefined,
	);
	e(
		[
			Vo({
				type: $a,
				optional: true,
			}),
		],
		Gc.prototype,
		"issuerAndSerialNumber",
		undefined,
	);
	Gc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Gc,
	);
	class Wc {
		constructor(e = {}) {
			this.rid = new Gc();
			this.encryptedKey = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Gc,
			}),
		],
		Wc.prototype,
		"rid",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		Wc.prototype,
		"encryptedKey",
		undefined,
	);
	let Yc = (Kc = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Kc.prototype);
		}
	});
	Yc = Kc = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Wc,
			}),
		],
		Yc,
	);
	class Jc {
		constructor(e = {}) {
			this.algorithm = new Ca();
			this.publicKey = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Jc.prototype,
		"algorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Jc.prototype,
		"publicKey",
		undefined,
	);
	let zc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: Na,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		zc.prototype,
		"subjectKeyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: Jc,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		zc.prototype,
		"originatorKey",
		undefined,
	);
	e(
		[
			Vo({
				type: $a,
				optional: true,
			}),
		],
		zc.prototype,
		"issuerAndSerialNumber",
		undefined,
	);
	zc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		zc,
	);
	class Xc {
		constructor(e = {}) {
			this.version = Wa.v3;
			this.originator = new zc();
			this.keyEncryptionAlgorithm = new za();
			this.recipientEncryptedKeys = new Yc();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		Xc.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: zc,
				context: 0,
			}),
		],
		Xc.prototype,
		"originator",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
				context: 1,
				optional: true,
			}),
		],
		Xc.prototype,
		"ukm",
		undefined,
	);
	e(
		[
			Vo({
				type: za,
			}),
		],
		Xc.prototype,
		"keyEncryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Yc,
			}),
		],
		Xc.prototype,
		"recipientEncryptedKeys",
		undefined,
	);
	let qc = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: Na,
				context: 0,
				implicit: true,
			}),
		],
		qc.prototype,
		"subjectKeyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: $a,
			}),
		],
		qc.prototype,
		"issuerAndSerialNumber",
		undefined,
	);
	qc = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		qc,
	);
	class Qc {
		constructor(e = {}) {
			this.version = Wa.v0;
			this.rid = new qc();
			this.keyEncryptionAlgorithm = new za();
			this.encryptedKey = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		Qc.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: qc,
			}),
		],
		Qc.prototype,
		"rid",
		undefined,
	);
	e(
		[
			Vo({
				type: za,
			}),
		],
		Qc.prototype,
		"keyEncryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		Qc.prototype,
		"encryptedKey",
		undefined,
	);
	class Zc {
		constructor(e = {}) {
			this.keyIdentifier = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: io,
			}),
		],
		Zc.prototype,
		"keyIdentifier",
		undefined,
	);
	e(
		[
			Vo({
				type: to.GeneralizedTime,
				optional: true,
			}),
		],
		Zc.prototype,
		"date",
		undefined,
	);
	e(
		[
			Vo({
				type: Hc,
				optional: true,
			}),
		],
		Zc.prototype,
		"other",
		undefined,
	);
	class el {
		constructor(e = {}) {
			this.version = Wa.v4;
			this.kekid = new Zc();
			this.keyEncryptionAlgorithm = new za();
			this.encryptedKey = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		el.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Zc,
			}),
		],
		el.prototype,
		"kekid",
		undefined,
	);
	e(
		[
			Vo({
				type: za,
			}),
		],
		el.prototype,
		"keyEncryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		el.prototype,
		"encryptedKey",
		undefined,
	);
	class tl {
		constructor(e = {}) {
			this.version = Wa.v0;
			this.keyEncryptionAlgorithm = new za();
			this.encryptedKey = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		tl.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Qa,
				context: 0,
				optional: true,
			}),
		],
		tl.prototype,
		"keyDerivationAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: za,
			}),
		],
		tl.prototype,
		"keyEncryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		tl.prototype,
		"encryptedKey",
		undefined,
	);
	class rl {
		constructor(e = {}) {
			this.oriType = "";
			this.oriValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		rl.prototype,
		"oriType",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		rl.prototype,
		"oriValue",
		undefined,
	);
	let nl = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	var il;
	e(
		[
			Vo({
				type: Qc,
				optional: true,
			}),
		],
		nl.prototype,
		"ktri",
		undefined,
	);
	e(
		[
			Vo({
				type: Xc,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		nl.prototype,
		"kari",
		undefined,
	);
	e(
		[
			Vo({
				type: el,
				context: 2,
				implicit: true,
				optional: true,
			}),
		],
		nl.prototype,
		"kekri",
		undefined,
	);
	e(
		[
			Vo({
				type: tl,
				context: 3,
				implicit: true,
				optional: true,
			}),
		],
		nl.prototype,
		"pwri",
		undefined,
	);
	e(
		[
			Vo({
				type: rl,
				context: 4,
				implicit: true,
				optional: true,
			}),
		],
		nl.prototype,
		"ori",
		undefined,
	);
	nl = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		nl,
	);
	let ol = (il = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, il.prototype);
		}
	});
	var sl;
	ol = il = e(
		[
			Po({
				type: eo.Set,
				itemType: nl,
			}),
		],
		ol,
	);
	class al {
		constructor(e = {}) {
			this.otherRevInfoFormat = "";
			this.otherRevInfo = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		al.prototype,
		"otherRevInfoFormat",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		al.prototype,
		"otherRevInfo",
		undefined,
	);
	let cl = class {
		constructor(e = {}) {
			this.other = new al();
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: al,
				context: 1,
				implicit: true,
			}),
		],
		cl.prototype,
		"other",
		undefined,
	);
	cl = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		cl,
	);
	let ll = (sl = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, sl.prototype);
		}
	});
	ll = sl = e(
		[
			Po({
				type: eo.Set,
				itemType: cl,
			}),
		],
		ll,
	);
	class ul {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	}
	var pl;
	e(
		[
			Vo({
				type: Pc,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		ul.prototype,
		"certs",
		undefined,
	);
	e(
		[
			Vo({
				type: ll,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		ul.prototype,
		"crls",
		undefined,
	);
	let hl = (pl = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, pl.prototype);
		}
	});
	hl = pl = e(
		[
			Po({
				type: eo.Set,
				itemType: Za,
			}),
		],
		hl,
	);
	class fl {
		constructor(e = {}) {
			this.version = Wa.v0;
			this.recipientInfos = new ol();
			this.encryptedContentInfo = new Mc();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		fl.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: ul,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		fl.prototype,
		"originatorInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: ol,
			}),
		],
		fl.prototype,
		"recipientInfos",
		undefined,
	);
	e(
		[
			Vo({
				type: Mc,
			}),
		],
		fl.prototype,
		"encryptedContentInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: hl,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		fl.prototype,
		"unprotectedAttrs",
		undefined,
	);
	const dl = "1.2.840.113549.1.7.2";
	var yl;
	let ml = (yl = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, yl.prototype);
		}
	});
	ml = yl = e(
		[
			Po({
				type: eo.Set,
				itemType: Ya,
			}),
		],
		ml,
	);
	class gl {
		constructor(e = {}) {
			this.version = Wa.v0;
			this.digestAlgorithms = new ml();
			this.encapContentInfo = new Lc();
			this.signerInfos = new rc();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		gl.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: ml,
			}),
		],
		gl.prototype,
		"digestAlgorithms",
		undefined,
	);
	e(
		[
			Vo({
				type: Lc,
			}),
		],
		gl.prototype,
		"encapContentInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: Pc,
				context: 0,
				implicit: true,
				optional: true,
			}),
		],
		gl.prototype,
		"certificates",
		undefined,
	);
	e(
		[
			Vo({
				type: ll,
				context: 1,
				implicit: true,
				optional: true,
			}),
		],
		gl.prototype,
		"crls",
		undefined,
	);
	e(
		[
			Vo({
				type: rc,
			}),
		],
		gl.prototype,
		"signerInfos",
		undefined,
	);
	const vl = "1.2.840.10045.2.1";
	const bl = "1.2.840.10045.4.1";
	const El = "1.2.840.10045.4.3.1";
	const wl = "1.2.840.10045.4.3.2";
	const Sl = "1.2.840.10045.4.3.3";
	const Al = "1.2.840.10045.4.3.4";
	const Nl = "1.2.840.10045.3.1.7";
	const Tl = "1.3.132.0.34";
	const Ol = "1.3.132.0.35";
	function Il(e) {
		return new Ca({
			algorithm: e,
		});
	}
	const kl = Il(bl);
	Il(El);
	const Bl = Il(wl);
	const xl = Il(Sl);
	const Cl = Il(Al);
	let Rl = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Rl.prototype,
		"fieldType",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
			}),
		],
		Rl.prototype,
		"parameters",
		undefined,
	);
	Rl = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Rl,
	);
	let _l = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	var Ul;
	e(
		[
			Vo({
				type: to.OctetString,
			}),
		],
		_l.prototype,
		"a",
		undefined,
	);
	e(
		[
			Vo({
				type: to.OctetString,
			}),
		],
		_l.prototype,
		"b",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				optional: true,
			}),
		],
		_l.prototype,
		"seed",
		undefined,
	);
	_l = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		_l,
	);
	(function (e) {
		e[(e.ecpVer1 = 1)] = "ecpVer1";
	})((Ul ||= {}));
	let Dl = class {
		constructor(e = {}) {
			this.version = Ul.ecpVer1;
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		Dl.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Rl,
			}),
		],
		Dl.prototype,
		"fieldID",
		undefined,
	);
	e(
		[
			Vo({
				type: _l,
			}),
		],
		Dl.prototype,
		"curve",
		undefined,
	);
	e(
		[
			Vo({
				type: class extends io {},
			}),
		],
		Dl.prototype,
		"base",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		Dl.prototype,
		"order",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				optional: true,
			}),
		],
		Dl.prototype,
		"cofactor",
		undefined,
	);
	Dl = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Dl,
	);
	let Pl = class {
		constructor(e = {}) {
			Object.assign(this, e);
		}
	};
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Pl.prototype,
		"namedCurve",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Null,
			}),
		],
		Pl.prototype,
		"implicitCurve",
		undefined,
	);
	e(
		[
			Vo({
				type: Dl,
			}),
		],
		Pl.prototype,
		"specifiedCurve",
		undefined,
	);
	Pl = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Pl,
	);
	class Vl {
		constructor(e = {}) {
			this.version = 1;
			this.privateKey = new io();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		Vl.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		Vl.prototype,
		"privateKey",
		undefined,
	);
	e(
		[
			Vo({
				type: Pl,
				context: 0,
				optional: true,
			}),
		],
		Vl.prototype,
		"parameters",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
				context: 1,
				optional: true,
			}),
		],
		Vl.prototype,
		"publicKey",
		undefined,
	);
	class jl {
		constructor(e = {}) {
			this.r = new ArrayBuffer(0);
			this.s = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		jl.prototype,
		"r",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		jl.prototype,
		"s",
		undefined,
	);
	const Ll = "1.2.840.113549.1.1";
	const Fl = `${Ll}.1`;
	const Ml = `${Ll}.7`;
	const Hl = `${Ll}.9`;
	const Kl = `${Ll}.10`;
	const $l = `${Ll}.2`;
	const Gl = `${Ll}.4`;
	const Wl = `${Ll}.5`;
	const Yl = `${Ll}.14`;
	const Jl = `${Ll}.11`;
	const zl = `${Ll}.12`;
	const Xl = `${Ll}.13`;
	const ql = `${Ll}.15`;
	const Ql = `${Ll}.16`;
	const Zl = "1.3.14.3.2.26";
	const eu = "2.16.840.1.101.3.4.2.4";
	const tu = "2.16.840.1.101.3.4.2.1";
	const ru = "2.16.840.1.101.3.4.2.2";
	const nu = "2.16.840.1.101.3.4.2.3";
	const iu = `${Ll}.8`;
	function ou(e) {
		return new Ca({
			algorithm: e,
			parameters: null,
		});
	}
	ou("1.2.840.113549.2.2");
	ou("1.2.840.113549.2.5");
	const su = ou(Zl);
	ou(eu);
	ou(tu);
	ou(ru);
	ou(nu);
	ou("2.16.840.1.101.3.4.2.5");
	ou("2.16.840.1.101.3.4.2.6");
	const au = new Ca({
		algorithm: iu,
		parameters: Ho.serialize(su),
	});
	const cu = new Ca({
		algorithm: Hl,
		parameters: Ho.serialize(
			ho.toASN(
				new Uint8Array([
					218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24,
					144, 175, 216, 7, 9,
				]).buffer,
			),
		),
	});
	ou(Fl);
	ou($l);
	ou(Gl);
	ou(Wl);
	ou(ql);
	ou(Ql);
	ou(zl);
	ou(Xl);
	ou(ql);
	ou(Ql);
	class lu {
		constructor(e = {}) {
			this.hashAlgorithm = new Ca(su);
			this.maskGenAlgorithm = new Ca({
				algorithm: iu,
				parameters: Ho.serialize(su),
			});
			this.pSourceAlgorithm = new Ca(cu);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ca,
				context: 0,
				defaultValue: su,
			}),
		],
		lu.prototype,
		"hashAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
				context: 1,
				defaultValue: au,
			}),
		],
		lu.prototype,
		"maskGenAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
				context: 2,
				defaultValue: cu,
			}),
		],
		lu.prototype,
		"pSourceAlgorithm",
		undefined,
	);
	new Ca({
		algorithm: Ml,
		parameters: Ho.serialize(new lu()),
	});
	class uu {
		constructor(e = {}) {
			this.hashAlgorithm = new Ca(su);
			this.maskGenAlgorithm = new Ca({
				algorithm: iu,
				parameters: Ho.serialize(su),
			});
			this.saltLength = 20;
			this.trailerField = 1;
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Ca,
				context: 0,
				defaultValue: su,
			}),
		],
		uu.prototype,
		"hashAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
				context: 1,
				defaultValue: au,
			}),
		],
		uu.prototype,
		"maskGenAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 2,
				defaultValue: 20,
			}),
		],
		uu.prototype,
		"saltLength",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				context: 3,
				defaultValue: 1,
			}),
		],
		uu.prototype,
		"trailerField",
		undefined,
	);
	new Ca({
		algorithm: Kl,
		parameters: Ho.serialize(new uu()),
	});
	class pu {
		constructor(e = {}) {
			this.digestAlgorithm = new Ca();
			this.digest = new io();
			Object.assign(this, e);
		}
	}
	var hu;
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		pu.prototype,
		"digestAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		pu.prototype,
		"digest",
		undefined,
	);
	class fu {
		constructor(e = {}) {
			this.prime = new ArrayBuffer(0);
			this.exponent = new ArrayBuffer(0);
			this.coefficient = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		fu.prototype,
		"prime",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		fu.prototype,
		"exponent",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		fu.prototype,
		"coefficient",
		undefined,
	);
	let du = (hu = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, hu.prototype);
		}
	});
	du = hu = e(
		[
			Po({
				type: eo.Sequence,
				itemType: fu,
			}),
		],
		du,
	);
	class yu {
		constructor(e = {}) {
			this.version = 0;
			this.modulus = new ArrayBuffer(0);
			this.publicExponent = new ArrayBuffer(0);
			this.privateExponent = new ArrayBuffer(0);
			this.prime1 = new ArrayBuffer(0);
			this.prime2 = new ArrayBuffer(0);
			this.exponent1 = new ArrayBuffer(0);
			this.exponent2 = new ArrayBuffer(0);
			this.coefficient = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		yu.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"modulus",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"publicExponent",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"privateExponent",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"prime1",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"prime2",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"exponent1",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"exponent2",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		yu.prototype,
		"coefficient",
		undefined,
	);
	e(
		[
			Vo({
				type: du,
				optional: true,
			}),
		],
		yu.prototype,
		"otherPrimeInfos",
		undefined,
	);
	class mu {
		constructor(e = {}) {
			this.modulus = new ArrayBuffer(0);
			this.publicExponent = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	var gu;
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		mu.prototype,
		"modulus",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				converter: co,
			}),
		],
		mu.prototype,
		"publicExponent",
		undefined,
	);
	(function (e) {
		e[(e.Transient = 0)] = "Transient";
		e[(e.Singleton = 1)] = "Singleton";
		e[(e.ResolutionScoped = 2)] = "ResolutionScoped";
		e[(e.ContainerScoped = 3)] = "ContainerScoped";
	})((gu ||= {}));
	var vu = gu;
	function bu(e, t) {
		bu =
			Object.setPrototypeOf ||
			({
				__proto__: [],
			} instanceof Array &&
				function (e, t) {
					e.__proto__ = t;
				}) ||
			function (e, t) {
				for (var r in t) {
					if (t.hasOwnProperty(r)) {
						e[r] = t[r];
					}
				}
			};
		return bu(e, t);
	}
	function Eu(e, t) {
		function r() {
			this.constructor = e;
		}
		bu(e, t);
		e.prototype =
			t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
	}
	function wu(e) {
		var t = typeof Symbol == "function" && Symbol.iterator;
		var r = t && e[t];
		var n = 0;
		if (r) {
			return r.call(e);
		}
		if (e && typeof e.length == "number") {
			return {
				next: function () {
					if (e && n >= e.length) {
						e = undefined;
					}
					return {
						value: e && e[n++],
						done: !e,
					};
				},
			};
		}
		throw new TypeError(
			t ? "Object is not iterable." : "Symbol.iterator is not defined.",
		);
	}
	function Su(e, t) {
		var r = typeof Symbol == "function" && e[Symbol.iterator];
		if (!r) {
			return e;
		}
		var n;
		var i;
		var o = r.call(e);
		var s = [];
		try {
			while ((t === undefined || t-- > 0) && !(n = o.next()).done) {
				s.push(n.value);
			}
		} catch (e) {
			i = {
				error: e,
			};
		} finally {
			try {
				if (n && !n.done && (r = o.return)) {
					r.call(o);
				}
			} finally {
				if (i) {
					throw i.error;
				}
			}
		}
		return s;
	}
	function Au() {
		var e = [];
		for (var t = 0; t < arguments.length; t++) {
			e = e.concat(Su(arguments[t]));
		}
		return e;
	}
	function Nu(e) {
		return !!e.useClass;
	}
	function Tu(e) {
		return !!e.useFactory;
	}
	var Ou = (function () {
		function e(e) {
			this.wrap = e;
			this.reflectMethods = [
				"get",
				"getPrototypeOf",
				"setPrototypeOf",
				"getOwnPropertyDescriptor",
				"defineProperty",
				"has",
				"set",
				"deleteProperty",
				"apply",
				"construct",
				"ownKeys",
			];
		}
		e.prototype.createProxy = function (e) {
			var t;
			var r = this;
			var n = false;
			return new Proxy(
				{},
				this.createHandler(function () {
					if (!n) {
						t = e(r.wrap());
						n = true;
					}
					return t;
				}),
			);
		};
		e.prototype.createHandler = function (e) {
			var t = {};
			this.reflectMethods.forEach(function (r) {
				t[r] = function () {
					var t = [];
					for (var n = 0; n < arguments.length; n++) {
						t[n] = arguments[n];
					}
					t[0] = e();
					return Reflect[r].apply(undefined, Au(t));
				};
			});
			return t;
		};
		return e;
	})();
	function Iu(e) {
		return typeof e == "string" || typeof e == "symbol";
	}
	function ku(e) {
		return typeof e == "object" && "token" in e && "transform" in e;
	}
	function Bu(e) {
		return !!e.useToken;
	}
	function xu(e) {
		return e.useValue != null;
	}
	var Cu = (function () {
		function e() {
			this._registryMap = new Map();
		}
		e.prototype.entries = function () {
			return this._registryMap.entries();
		};
		e.prototype.getAll = function (e) {
			this.ensure(e);
			return this._registryMap.get(e);
		};
		e.prototype.get = function (e) {
			this.ensure(e);
			var t = this._registryMap.get(e);
			return t[t.length - 1] || null;
		};
		e.prototype.set = function (e, t) {
			this.ensure(e);
			this._registryMap.get(e).push(t);
		};
		e.prototype.setAll = function (e, t) {
			this._registryMap.set(e, t);
		};
		e.prototype.has = function (e) {
			this.ensure(e);
			return this._registryMap.get(e).length > 0;
		};
		e.prototype.clear = function () {
			this._registryMap.clear();
		};
		e.prototype.ensure = function (e) {
			if (!this._registryMap.has(e)) {
				this._registryMap.set(e, []);
			}
		};
		return e;
	})();
	var Ru = (function (e) {
		function t() {
			return (e !== null && e.apply(this, arguments)) || this;
		}
		Eu(t, e);
		return t;
	})(Cu);
	function _u() {
		this.scopedResolutions = new Map();
	}
	var Uu;
	var Du = (function (e) {
		function t() {
			return (e !== null && e.apply(this, arguments)) || this;
		}
		Eu(t, e);
		return t;
	})(Cu);
	var Pu = (function (e) {
		function t() {
			return (e !== null && e.apply(this, arguments)) || this;
		}
		Eu(t, e);
		return t;
	})(Cu);
	function Vu() {
		this.preResolution = new Du();
		this.postResolution = new Pu();
	}
	var ju = new Map();
	var Lu = (function () {
		function e(e) {
			this.parent = e;
			this._registry = new Ru();
			this.interceptors = new Vu();
			this.disposed = false;
			this.disposables = new Set();
		}
		e.prototype.register = function (e, t, r) {
			var n;
			if (r === undefined) {
				r = {
					lifecycle: vu.Transient,
				};
			}
			this.ensureNotDisposed();
			n = (function (e) {
				return Nu(e) || xu(e) || Bu(e) || Tu(e);
			})(t)
				? t
				: {
						useClass: t,
					};
			if (Bu(n)) {
				var i = [e];
				for (var o = n; o != null; ) {
					var s = o.useToken;
					if (i.includes(s)) {
						throw new Error(
							"Token registration cycle detected! " + Au(i, [s]).join(" -> "),
						);
					}
					i.push(s);
					var a = this._registry.get(s);
					o = a && Bu(a.provider) ? a.provider : null;
				}
			}
			if (
				(r.lifecycle === vu.Singleton ||
					r.lifecycle == vu.ContainerScoped ||
					r.lifecycle == vu.ResolutionScoped) &&
				(xu(n) || Tu(n))
			) {
				throw new Error(
					'Cannot use lifecycle "' +
						vu[r.lifecycle] +
						'" with ValueProviders or FactoryProviders',
				);
			}
			this._registry.set(e, {
				provider: n,
				options: r,
			});
			return this;
		};
		e.prototype.registerType = function (e, t) {
			this.ensureNotDisposed();
			if (Iu(t)) {
				return this.register(e, {
					useToken: t,
				});
			} else {
				return this.register(e, {
					useClass: t,
				});
			}
		};
		e.prototype.registerInstance = function (e, t) {
			this.ensureNotDisposed();
			return this.register(e, {
				useValue: t,
			});
		};
		e.prototype.registerSingleton = function (e, t) {
			this.ensureNotDisposed();
			if (Iu(e)) {
				if (Iu(t)) {
					return this.register(
						e,
						{
							useToken: t,
						},
						{
							lifecycle: vu.Singleton,
						},
					);
				}
				if (t) {
					return this.register(
						e,
						{
							useClass: t,
						},
						{
							lifecycle: vu.Singleton,
						},
					);
				}
				throw new Error(
					'Cannot register a type name as a singleton without a "to" token',
				);
			}
			var r = e;
			if (t && !Iu(t)) {
				r = t;
			}
			return this.register(
				e,
				{
					useClass: r,
				},
				{
					lifecycle: vu.Singleton,
				},
			);
		};
		e.prototype.resolve = function (e, t = new _u(), r = false) {
			this.ensureNotDisposed();
			var n = this.getRegistration(e);
			if (!n && Iu(e)) {
				if (r) {
					return;
				}
				throw new Error(
					'Attempted to resolve unregistered dependency token: "' +
						e.toString() +
						'"',
				);
			}
			this.executePreResolutionInterceptor(e, "Single");
			if (n) {
				var i = this.resolveRegistration(n, t);
				this.executePostResolutionInterceptor(e, i, "Single");
				return i;
			}
			if (
				(function (e) {
					return typeof e == "function" || e instanceof Ou;
				})(e)
			) {
				i = this.construct(e, t);
				this.executePostResolutionInterceptor(e, i, "Single");
				return i;
			}
			throw new Error(
				"Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.",
			);
		};
		e.prototype.executePreResolutionInterceptor = function (e, t) {
			var r;
			var n;
			if (this.interceptors.preResolution.has(e)) {
				var i = [];
				try {
					for (
						var o = wu(this.interceptors.preResolution.getAll(e)), s = o.next();
						!s.done;
						s = o.next()
					) {
						var a = s.value;
						if (a.options.frequency != "Once") {
							i.push(a);
						}
						a.callback(e, t);
					}
				} catch (e) {
					r = {
						error: e,
					};
				} finally {
					try {
						if (s && !s.done && (n = o.return)) {
							n.call(o);
						}
					} finally {
						if (r) {
							throw r.error;
						}
					}
				}
				this.interceptors.preResolution.setAll(e, i);
			}
		};
		e.prototype.executePostResolutionInterceptor = function (e, t, r) {
			var n;
			var i;
			if (this.interceptors.postResolution.has(e)) {
				var o = [];
				try {
					for (
						var s = wu(this.interceptors.postResolution.getAll(e)),
							a = s.next();
						!a.done;
						a = s.next()
					) {
						var c = a.value;
						if (c.options.frequency != "Once") {
							o.push(c);
						}
						c.callback(e, t, r);
					}
				} catch (e) {
					n = {
						error: e,
					};
				} finally {
					try {
						if (a && !a.done && (i = s.return)) {
							i.call(s);
						}
					} finally {
						if (n) {
							throw n.error;
						}
					}
				}
				this.interceptors.postResolution.setAll(e, o);
			}
		};
		e.prototype.resolveRegistration = function (e, t) {
			this.ensureNotDisposed();
			if (
				e.options.lifecycle === vu.ResolutionScoped &&
				t.scopedResolutions.has(e)
			) {
				return t.scopedResolutions.get(e);
			}
			var r;
			var n = e.options.lifecycle === vu.Singleton;
			var i = e.options.lifecycle === vu.ContainerScoped;
			var o = n || i;
			r = xu(e.provider)
				? e.provider.useValue
				: Bu(e.provider)
					? o
						? (e.instance ||= this.resolve(e.provider.useToken, t))
						: this.resolve(e.provider.useToken, t)
					: Nu(e.provider)
						? o
							? (e.instance ||= this.construct(e.provider.useClass, t))
							: this.construct(e.provider.useClass, t)
						: Tu(e.provider)
							? e.provider.useFactory(this)
							: this.construct(e.provider, t);
			if (e.options.lifecycle === vu.ResolutionScoped) {
				t.scopedResolutions.set(e, r);
			}
			return r;
		};
		e.prototype.resolveAll = function (e, t, r) {
			var n = this;
			if (t === undefined) {
				t = new _u();
			}
			if (r === undefined) {
				r = false;
			}
			this.ensureNotDisposed();
			var i = this.getAllRegistrations(e);
			if (!i && Iu(e)) {
				if (r) {
					return [];
				}
				throw new Error(
					'Attempted to resolve unregistered dependency token: "' +
						e.toString() +
						'"',
				);
			}
			this.executePreResolutionInterceptor(e, "All");
			if (i) {
				var o = i.map(function (e) {
					return n.resolveRegistration(e, t);
				});
				this.executePostResolutionInterceptor(e, o, "All");
				return o;
			}
			var s = [this.construct(e, t)];
			this.executePostResolutionInterceptor(e, s, "All");
			return s;
		};
		e.prototype.isRegistered = function (e, t = false) {
			this.ensureNotDisposed();
			return (
				this._registry.has(e) ||
				(t && (this.parent || false) && this.parent.isRegistered(e, true))
			);
		};
		e.prototype.reset = function () {
			this.ensureNotDisposed();
			this._registry.clear();
			this.interceptors.preResolution.clear();
			this.interceptors.postResolution.clear();
		};
		e.prototype.clearInstances = function () {
			var e;
			var t;
			this.ensureNotDisposed();
			try {
				for (
					var r = wu(this._registry.entries()), n = r.next();
					!n.done;
					n = r.next()
				) {
					var i = Su(n.value, 2);
					var o = i[0];
					var s = i[1];
					this._registry.setAll(
						o,
						s
							.filter(function (e) {
								return !xu(e.provider);
							})
							.map(function (e) {
								e.instance = undefined;
								return e;
							}),
					);
				}
			} catch (t) {
				e = {
					error: t,
				};
			} finally {
				try {
					if (n && !n.done && (t = r.return)) {
						t.call(r);
					}
				} finally {
					if (e) {
						throw e.error;
					}
				}
			}
		};
		e.prototype.createChildContainer = function () {
			var t;
			var r;
			this.ensureNotDisposed();
			var n = new e(this);
			try {
				for (
					var i = wu(this._registry.entries()), o = i.next();
					!o.done;
					o = i.next()
				) {
					var s = Su(o.value, 2);
					var a = s[0];
					var c = s[1];
					if (
						c.some(function (e) {
							return e.options.lifecycle === vu.ContainerScoped;
						})
					) {
						n._registry.setAll(
							a,
							c.map(function (e) {
								if (e.options.lifecycle === vu.ContainerScoped) {
									return {
										provider: e.provider,
										options: e.options,
									};
								} else {
									return e;
								}
							}),
						);
					}
				}
			} catch (e) {
				t = {
					error: e,
				};
			} finally {
				try {
					if (o && !o.done && (r = i.return)) {
						r.call(i);
					}
				} finally {
					if (t) {
						throw t.error;
					}
				}
			}
			return n;
		};
		e.prototype.beforeResolution = function (
			e,
			t,
			r = {
				frequency: "Always",
			},
		) {
			this.interceptors.preResolution.set(e, {
				callback: t,
				options: r,
			});
		};
		e.prototype.afterResolution = function (
			e,
			t,
			r = {
				frequency: "Always",
			},
		) {
			this.interceptors.postResolution.set(e, {
				callback: t,
				options: r,
			});
		};
		e.prototype.dispose = function () {
			e = this;
			r = function () {
				var e;
				return (function (e, t) {
					var r;
					var n;
					var i;
					var o;
					var s = {
						label: 0,
						sent: function () {
							if (i[0] & 1) {
								throw i[1];
							}
							return i[1];
						},
						trys: [],
						ops: [],
					};
					o = {
						next: a(0),
						throw: a(1),
						return: a(2),
					};
					if (typeof Symbol == "function") {
						o[Symbol.iterator] = function () {
							return this;
						};
					}
					return o;
					function a(o) {
						return function (a) {
							return (function (o) {
								if (r) {
									throw new TypeError("Generator is already executing.");
								}
								while (s) {
									try {
										r = 1;
										if (
											n &&
											(i =
												o[0] & 2
													? n.return
													: o[0]
														? n.throw || ((i = n.return) && i.call(n), 0)
														: n.next) &&
											!(i = i.call(n, o[1])).done
										) {
											return i;
										}
										n = 0;
										if (i) {
											o = [o[0] & 2, i.value];
										}
										switch (o[0]) {
											case 0:
											case 1:
												i = o;
												break;
											case 4:
												s.label++;
												return {
													value: o[1],
													done: false,
												};
											case 5:
												s.label++;
												n = o[1];
												o = [0];
												continue;
											case 7:
												o = s.ops.pop();
												s.trys.pop();
												continue;
											default:
												if (
													!(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
													(o[0] === 6 || o[0] === 2)
												) {
													s = 0;
													continue;
												}
												if (
													o[0] === 3 &&
													(!i || (o[1] > i[0] && o[1] < i[3]))
												) {
													s.label = o[1];
													break;
												}
												if (o[0] === 6 && s.label < i[1]) {
													s.label = i[1];
													i = o;
													break;
												}
												if (i && s.label < i[2]) {
													s.label = i[2];
													s.ops.push(o);
													break;
												}
												if (i[2]) {
													s.ops.pop();
												}
												s.trys.pop();
												continue;
										}
										o = t.call(e, s);
									} catch (e) {
										o = [6, e];
										n = 0;
									} finally {
										r = i = 0;
									}
								}
								if (o[0] & 5) {
									throw o[1];
								}
								return {
									value: o[0] ? o[1] : undefined,
									done: true,
								};
							})([o, a]);
						};
					}
				})(this, function (t) {
					switch (t.label) {
						case 0:
							this.disposed = true;
							e = [];
							this.disposables.forEach(function (t) {
								var r = t.dispose();
								if (r) {
									e.push(r);
								}
							});
							return [4, Promise.all(e)];
						case 1:
							t.sent();
							return [2];
					}
				});
			};
			return new ((t = undefined) || (t = Promise))(function (n, i) {
				function o(e) {
					try {
						a(r.next(e));
					} catch (e) {
						i(e);
					}
				}
				function s(e) {
					try {
						a(r.throw(e));
					} catch (e) {
						i(e);
					}
				}
				function a(e) {
					if (e.done) {
						n(e.value);
					} else {
						(function (e) {
							if (e instanceof t) {
								return e;
							} else {
								return new t(function (t) {
									t(e);
								});
							}
						})(e.value).then(o, s);
					}
				}
				a((r = r.apply(e, [])).next());
			});
			var e;
			var t;
			var r;
		};
		e.prototype.getRegistration = function (e) {
			if (this.isRegistered(e)) {
				return this._registry.get(e);
			} else if (this.parent) {
				return this.parent.getRegistration(e);
			} else {
				return null;
			}
		};
		e.prototype.getAllRegistrations = function (e) {
			if (this.isRegistered(e)) {
				return this._registry.getAll(e);
			} else if (this.parent) {
				return this.parent.getAllRegistrations(e);
			} else {
				return null;
			}
		};
		e.prototype.construct = function (e, t) {
			var r = this;
			if (e instanceof Ou) {
				return e.createProxy(function (e) {
					return r.resolve(e, t);
				});
			}
			var n = (function () {
				var n = ju.get(e);
				if (!n || n.length === 0) {
					if (e.length === 0) {
						return new e();
					}
					throw new Error('TypeInfo not known for "' + e.name + '"');
				}
				var i = n.map(r.resolveParams(t, e));
				return new (e.bind.apply(e, Au([undefined], i)))();
			})();
			if (
				(function (e) {
					return typeof e.dispose == "function" && !(e.dispose.length > 0);
				})(n)
			) {
				this.disposables.add(n);
			}
			return n;
		};
		e.prototype.resolveParams = function (e, t) {
			var r = this;
			return function (n, i) {
				var o;
				var s;
				var a;
				var c;
				try {
					if (typeof (c = n) == "object" && "token" in c && "multiple" in c) {
						if (ku(n)) {
							if (n.multiple) {
								return (o = r.resolve(n.transform)).transform.apply(
									o,
									Au(
										[r.resolveAll(n.token, new _u(), n.isOptional)],
										n.transformArgs,
									),
								);
							} else {
								return (s = r.resolve(n.transform)).transform.apply(
									s,
									Au([r.resolve(n.token, e, n.isOptional)], n.transformArgs),
								);
							}
						} else if (n.multiple) {
							return r.resolveAll(n.token, new _u(), n.isOptional);
						} else {
							return r.resolve(n.token, e, n.isOptional);
						}
					} else if (ku(n)) {
						return (a = r.resolve(n.transform, e)).transform.apply(
							a,
							Au([r.resolve(n.token, e)], n.transformArgs),
						);
					} else {
						return r.resolve(n, e);
					}
				} catch (e) {
					throw new Error(
						(function (e, t, r) {
							var n;
							var i;
							var o;
							var s;
							var a = Su(
								e.toString().match(/constructor\(([\w, ]+)\)/) || [],
								2,
							)[1];
							n =
								"Cannot inject the dependency " +
								((s = t),
								((o = a === undefined ? null : a) === null
									? "at position #" + s
									: '"' + o.split(",")[s].trim() + '" at position #' + s) +
									' of "') +
								e.name +
								'" constructor. Reason:';
							if (i === undefined) {
								i = "    ";
							}
							return Au(
								[n],
								r.message.split("\n").map(function (e) {
									return i + e;
								}),
							).join("\n");
						})(t, i, e),
					);
				}
			};
		};
		e.prototype.ensureNotDisposed = function () {
			if (this.disposed) {
				throw new Error(
					"This container has been disposed, you cannot interact with a disposed container",
				);
			}
		};
		return e;
	})();
	var Fu = new Lu();
	function Mu(e) {
		return function (e) {
			ju.set(
				e,
				(function (e) {
					var t = Reflect.getMetadata("design:paramtypes", e) || [];
					var r = Reflect.getOwnMetadata("injectionTokens", e) || {};
					Object.keys(r).forEach(function (e) {
						t[+e] = r[e];
					});
					return t;
				})(e),
			);
		};
	}
	if (typeof Reflect == "undefined" || !Reflect.getMetadata) {
		throw new Error(
			"tsyringe requires a reflect polyfill. Please add 'import \"reflect-metadata\"' to the top of your entry point.",
		);
	}
	class Hu {
		constructor(e = {}) {
			this.attrId = "";
			this.attrValues = [];
			Object.assign(e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Hu.prototype,
		"attrId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				repeated: "set",
			}),
		],
		Hu.prototype,
		"attrValues",
		undefined,
	);
	let Ku = (Uu = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Uu.prototype);
		}
	});
	var $u;
	Ku = Uu = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Hu,
			}),
		],
		Ku,
	);
	let Gu = ($u = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, $u.prototype);
		}
	});
	Gu = $u = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Vc,
			}),
		],
		Gu,
	);
	class Wu {
		constructor(e = {}) {
			this.certId = "";
			this.certValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Wu.prototype,
		"certId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		Wu.prototype,
		"certValue",
		undefined,
	);
	class Yu {
		constructor(e = {}) {
			this.crlId = "";
			this.crltValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		Yu.prototype,
		"crlId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		Yu.prototype,
		"crltValue",
		undefined,
	);
	class Ju extends io {}
	let zu = class {
		constructor(e = {}) {
			this.encryptionAlgorithm = new Ca();
			this.encryptedData = new Ju();
			Object.assign(this, e);
		}
	};
	var Xu;
	var qu;
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		zu.prototype,
		"encryptionAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Ju,
			}),
		],
		zu.prototype,
		"encryptedData",
		undefined,
	);
	(function (e) {
		e[(e.v1 = 0)] = "v1";
	})((qu ||= {}));
	class Qu extends io {}
	let Zu = (Xu = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, Xu.prototype);
		}
	});
	Zu = Xu = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Ea,
			}),
		],
		Zu,
	);
	class ep {
		constructor(e = {}) {
			this.version = qu.v1;
			this.privateKeyAlgorithm = new Ca();
			this.privateKey = new Qu();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		ep.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		ep.prototype,
		"privateKeyAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: Qu,
			}),
		],
		ep.prototype,
		"privateKey",
		undefined,
	);
	e(
		[
			Vo({
				type: Zu,
				implicit: true,
				context: 0,
				optional: true,
			}),
		],
		ep.prototype,
		"attributes",
		undefined,
	);
	let tp = class extends ep {};
	tp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		tp,
	);
	let rp = class extends zu {};
	rp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		rp,
	);
	class np {
		constructor(e = {}) {
			this.secretTypeId = "";
			this.secretValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		np.prototype,
		"secretTypeId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		np.prototype,
		"secretValue",
		undefined,
	);
	class ip {
		constructor(e = {}) {
			this.mac = new pu();
			this.macSalt = new io();
			this.iterations = 1;
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: pu,
			}),
		],
		ip.prototype,
		"mac",
		undefined,
	);
	e(
		[
			Vo({
				type: io,
			}),
		],
		ip.prototype,
		"macSalt",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Integer,
				defaultValue: 1,
			}),
		],
		ip.prototype,
		"iterations",
		undefined,
	);
	class op {
		constructor(e = {}) {
			this.version = 3;
			this.authSafe = new Vc();
			this.macData = new ip();
			Object.assign(this, e);
		}
	}
	var sp;
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		op.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Vc,
			}),
		],
		op.prototype,
		"authSafe",
		undefined,
	);
	e(
		[
			Vo({
				type: ip,
				optional: true,
			}),
		],
		op.prototype,
		"macData",
		undefined,
	);
	class ap {
		constructor(e = {}) {
			this.bagId = "";
			this.bagValue = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		ap.prototype,
		"bagId",
		undefined,
	);
	e(
		[
			Vo({
				type: to.Any,
				context: 0,
			}),
		],
		ap.prototype,
		"bagValue",
		undefined,
	);
	e(
		[
			Vo({
				type: Hu,
				repeated: "set",
				optional: true,
			}),
		],
		ap.prototype,
		"bagAttributes",
		undefined,
	);
	let cp = (sp = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, sp.prototype);
		}
	});
	var lp;
	var up;
	var pp;
	cp = sp = e(
		[
			Po({
				type: eo.Sequence,
				itemType: ap,
			}),
		],
		cp,
	);
	const hp = "1.2.840.113549.1.9";
	const fp = `${hp}.7`;
	const dp = `${hp}.14`;
	let yp = class extends Yo {
		constructor(e = {}) {
			super(e);
		}
		toString() {
			return this.ia5String || super.toString();
		}
	};
	e(
		[
			Vo({
				type: to.IA5String,
			}),
		],
		yp.prototype,
		"ia5String",
		undefined,
	);
	yp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		yp,
	);
	let mp = class extends Vc {};
	mp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		mp,
	);
	let gp = class extends op {};
	gp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		gp,
	);
	let vp = class extends zu {};
	vp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		vp,
	);
	let bp = class {
		constructor(e = "") {
			this.value = e;
		}
		toString() {
			return this.value;
		}
	};
	e(
		[
			Vo({
				type: to.IA5String,
			}),
		],
		bp.prototype,
		"value",
		undefined,
	);
	bp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		bp,
	);
	let Ep = class extends yp {};
	Ep = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ep,
	);
	let wp = class extends Yo {};
	wp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		wp,
	);
	let Sp = class {
		constructor(e = new Date()) {
			this.value = e;
		}
	};
	e(
		[
			Vo({
				type: to.GeneralizedTime,
			}),
		],
		Sp.prototype,
		"value",
		undefined,
	);
	Sp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Sp,
	);
	let Ap = class extends Yo {};
	Ap = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ap,
	);
	let Np = class {
		constructor(e = "M") {
			this.value = e;
		}
		toString() {
			return this.value;
		}
	};
	e(
		[
			Vo({
				type: to.PrintableString,
			}),
		],
		Np.prototype,
		"value",
		undefined,
	);
	Np = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Np,
	);
	let Tp = class {
		constructor(e = "") {
			this.value = e;
		}
		toString() {
			return this.value;
		}
	};
	e(
		[
			Vo({
				type: to.PrintableString,
			}),
		],
		Tp.prototype,
		"value",
		undefined,
	);
	Tp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Tp,
	);
	let Op = class extends Tp {};
	Op = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Op,
	);
	let Ip = class extends Yo {};
	Ip = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Ip,
	);
	let kp = class {
		constructor(e = "") {
			this.value = e;
		}
		toString() {
			return this.value;
		}
	};
	e(
		[
			Vo({
				type: to.ObjectIdentifier,
			}),
		],
		kp.prototype,
		"value",
		undefined,
	);
	kp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		kp,
	);
	let Bp = class extends _a {};
	Bp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Bp,
	);
	let xp = class {
		constructor(e = 0) {
			this.value = e;
		}
		toString() {
			return this.value.toString();
		}
	};
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		xp.prototype,
		"value",
		undefined,
	);
	xp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		xp,
	);
	let Cp = class extends tc {};
	Cp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Cp,
	);
	let Rp = class extends Yo {};
	Rp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Rp,
	);
	let _p = (lp = class extends Va {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, lp.prototype);
		}
	});
	_p = lp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		_p,
	);
	let Up = (up = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, up.prototype);
		}
	});
	Up = up = e(
		[
			Po({
				type: eo.Set,
				itemType: Za,
			}),
		],
		Up,
	);
	let Dp = class {
		constructor(e = "") {
			this.value = e;
		}
		toString() {
			return this.value;
		}
	};
	e(
		[
			Vo({
				type: to.BmpString,
			}),
		],
		Dp.prototype,
		"value",
		undefined,
	);
	Dp = e(
		[
			Po({
				type: eo.Choice,
			}),
		],
		Dp,
	);
	let Pp = class extends Ca {};
	Pp = e(
		[
			Po({
				type: eo.Sequence,
			}),
		],
		Pp,
	);
	let Vp = (pp = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, pp.prototype);
		}
	});
	var jp;
	Vp = pp = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Pp,
			}),
		],
		Vp,
	);
	let Lp = (jp = class extends Mo {
		constructor(e) {
			super(e);
			Object.setPrototypeOf(this, jp.prototype);
		}
	});
	Lp = jp = e(
		[
			Po({
				type: eo.Sequence,
				itemType: Ea,
			}),
		],
		Lp,
	);
	class Fp {
		constructor(e = {}) {
			this.version = 0;
			this.subject = new Qo();
			this.subjectPKInfo = new Ra();
			this.attributes = new Lp();
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: to.Integer,
			}),
		],
		Fp.prototype,
		"version",
		undefined,
	);
	e(
		[
			Vo({
				type: Qo,
			}),
		],
		Fp.prototype,
		"subject",
		undefined,
	);
	e(
		[
			Vo({
				type: Ra,
			}),
		],
		Fp.prototype,
		"subjectPKInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: Lp,
				implicit: true,
				context: 0,
			}),
		],
		Fp.prototype,
		"attributes",
		undefined,
	);
	class Mp {
		constructor(e = {}) {
			this.certificationRequestInfo = new Fp();
			this.signatureAlgorithm = new Ca();
			this.signature = new ArrayBuffer(0);
			Object.assign(this, e);
		}
	}
	e(
		[
			Vo({
				type: Fp,
			}),
		],
		Mp.prototype,
		"certificationRequestInfo",
		undefined,
	);
	e(
		[
			Vo({
				type: Ca,
			}),
		],
		Mp.prototype,
		"signatureAlgorithm",
		undefined,
	);
	e(
		[
			Vo({
				type: to.BitString,
			}),
		],
		Mp.prototype,
		"signature",
		undefined,
	);
	const Hp = "crypto.algorithm";
	const Kp = "crypto.algorithmProvider";
	var $p;
	Fu.registerSingleton(
		Kp,
		class {
			getAlgorithms() {
				return Fu.resolveAll(Hp);
			}
			toAsnAlgorithm(e) {
				for (const t of this.getAlgorithms()) {
					const r = t.toAsnAlgorithm(e);
					if (r) {
						return r;
					}
				}
				if (/^[0-9.]+$/.test(e.name)) {
					const t = new Ca({
						algorithm: e.name,
					});
					if ("parameters" in e) {
						const r = e;
						t.parameters = r.parameters;
					}
					return t;
				}
				throw new Error(
					"Cannot convert WebCrypto algorithm to ASN.1 algorithm",
				);
			}
			toWebAlgorithm(e) {
				for (const t of this.getAlgorithms()) {
					const r = t.toWebAlgorithm(e);
					if (r) {
						return r;
					}
				}
				return {
					name: e.algorithm,
					parameters: e.parameters,
				};
			}
		},
	);
	const Gp = "1.3.36.3.3.2.8.1.1";
	const Wp = `${Gp}.1`;
	const Yp = `${Gp}.2`;
	const Jp = `${Gp}.3`;
	const zp = `${Gp}.4`;
	const Xp = `${Gp}.5`;
	const qp = `${Gp}.6`;
	const Qp = `${Gp}.7`;
	const Zp = `${Gp}.8`;
	const eh = `${Gp}.9`;
	const th = `${Gp}.10`;
	const rh = `${Gp}.11`;
	const nh = `${Gp}.12`;
	const ih = `${Gp}.13`;
	const oh = `${Gp}.14`;
	const sh = "brainpoolP160r1";
	const ah = "brainpoolP160t1";
	const ch = "brainpoolP192r1";
	const lh = "brainpoolP192t1";
	const uh = "brainpoolP224r1";
	const ph = "brainpoolP224t1";
	const hh = "brainpoolP256r1";
	const fh = "brainpoolP256t1";
	const dh = "brainpoolP320r1";
	const yh = "brainpoolP320t1";
	const mh = "brainpoolP384r1";
	const gh = "brainpoolP384t1";
	const vh = "brainpoolP512r1";
	const bh = "brainpoolP512t1";
	const Eh = "ECDSA";
	let wh = ($p = class {
		toAsnAlgorithm(e) {
			if (e.name.toLowerCase() === Eh.toLowerCase()) {
				if ("hash" in e) {
					switch (
						(typeof e.hash == "string" ? e.hash : e.hash.name).toLowerCase()
					) {
						case "sha-1":
							return kl;
						case "sha-256":
							return Bl;
						case "sha-384":
							return xl;
						case "sha-512":
							return Cl;
					}
				} else if ("namedCurve" in e) {
					let t = "";
					switch (e.namedCurve) {
						case "P-256":
							t = Nl;
							break;
						case "K-256":
							t = $p.SECP256K1;
							break;
						case "P-384":
							t = Tl;
							break;
						case "P-521":
							t = Ol;
							break;
						case sh:
							t = Wp;
							break;
						case ah:
							t = Yp;
							break;
						case ch:
							t = Jp;
							break;
						case lh:
							t = zp;
							break;
						case uh:
							t = Xp;
							break;
						case ph:
							t = qp;
							break;
						case hh:
							t = Qp;
							break;
						case fh:
							t = Zp;
							break;
						case dh:
							t = eh;
							break;
						case yh:
							t = th;
							break;
						case mh:
							t = rh;
							break;
						case gh:
							t = nh;
							break;
						case vh:
							t = ih;
							break;
						case bh:
							t = oh;
					}
					if (t) {
						return new Ca({
							algorithm: vl,
							parameters: Ho.serialize(
								new Pl({
									namedCurve: t,
								}),
							),
						});
					}
				}
			}
			return null;
		}
		toWebAlgorithm(e) {
			switch (e.algorithm) {
				case bl:
					return {
						name: Eh,
						hash: {
							name: "SHA-1",
						},
					};
				case wl:
					return {
						name: Eh,
						hash: {
							name: "SHA-256",
						},
					};
				case Sl:
					return {
						name: Eh,
						hash: {
							name: "SHA-384",
						},
					};
				case Al:
					return {
						name: Eh,
						hash: {
							name: "SHA-512",
						},
					};
				case vl:
					if (!e.parameters) {
						throw new TypeError(
							"Cannot get required parameters from EC algorithm",
						);
					}
					switch (Ho.parse(e.parameters, Pl).namedCurve) {
						case Nl:
							return {
								name: Eh,
								namedCurve: "P-256",
							};
						case $p.SECP256K1:
							return {
								name: Eh,
								namedCurve: "K-256",
							};
						case Tl:
							return {
								name: Eh,
								namedCurve: "P-384",
							};
						case Ol:
							return {
								name: Eh,
								namedCurve: "P-521",
							};
						case Wp:
							return {
								name: Eh,
								namedCurve: sh,
							};
						case Yp:
							return {
								name: Eh,
								namedCurve: ah,
							};
						case Jp:
							return {
								name: Eh,
								namedCurve: ch,
							};
						case zp:
							return {
								name: Eh,
								namedCurve: lh,
							};
						case Xp:
							return {
								name: Eh,
								namedCurve: uh,
							};
						case qp:
							return {
								name: Eh,
								namedCurve: ph,
							};
						case Qp:
							return {
								name: Eh,
								namedCurve: hh,
							};
						case Zp:
							return {
								name: Eh,
								namedCurve: fh,
							};
						case eh:
							return {
								name: Eh,
								namedCurve: dh,
							};
						case th:
							return {
								name: Eh,
								namedCurve: yh,
							};
						case rh:
							return {
								name: Eh,
								namedCurve: mh,
							};
						case nh:
							return {
								name: Eh,
								namedCurve: gh,
							};
						case ih:
							return {
								name: Eh,
								namedCurve: vh,
							};
						case oh:
							return {
								name: Eh,
								namedCurve: bh,
							};
					}
			}
			return null;
		}
	});
	wh.SECP256K1 = "1.3.132.0.10";
	wh = $p = e([Mu()], wh);
	Fu.registerSingleton(Hp, wh);
	const Sh = Symbol("name");
	const Ah = Symbol("value");
	class Nh {
		constructor(e, t = {}, r = "") {
			this[Sh] = e;
			this[Ah] = r;
			for (const e in t) {
				this[e] = t[e];
			}
		}
	}
	Nh.NAME = Sh;
	Nh.VALUE = Ah;
	class Th {
		static toString(e) {
			return this.items[e] || e;
		}
	}
	Th.items = {
		[Zl]: "sha1",
		[eu]: "sha224",
		[tu]: "sha256",
		[ru]: "sha384",
		[nu]: "sha512",
		[Fl]: "rsaEncryption",
		[Wl]: "sha1WithRSAEncryption",
		[Yl]: "sha224WithRSAEncryption",
		[Jl]: "sha256WithRSAEncryption",
		[zl]: "sha384WithRSAEncryption",
		[Xl]: "sha512WithRSAEncryption",
		[vl]: "ecPublicKey",
		[bl]: "ecdsaWithSHA1",
		[El]: "ecdsaWithSHA224",
		[wl]: "ecdsaWithSHA256",
		[Sl]: "ecdsaWithSHA384",
		[Al]: "ecdsaWithSHA512",
		[Xs]: "TLS WWW server authentication",
		[qs]: "TLS WWW client authentication",
		[Qs]: "Code Signing",
		[Zs]: "E-mail Protection",
		[ea]: "Time Stamping",
		[ta]: "OCSP Signing",
		[dl]: "Signed Data",
	};
	class Oh {
		static serialize(e) {
			return this.serializeObj(e).join("\n");
		}
		static pad(e = 0) {
			return "".padStart(e * 2, " ");
		}
		static serializeObj(e, t = 0) {
			const r = [];
			let n = this.pad(t++);
			let i = "";
			const o = e[Nh.VALUE];
			if (o) {
				i = ` ${o}`;
			}
			r.push(`${n}${e[Nh.NAME]}:${i}`);
			n = this.pad(t);
			for (const i in e) {
				if (typeof i == "symbol") {
					continue;
				}
				const o = e[i];
				const s = i ? `${i}: ` : "";
				if (
					typeof o == "string" ||
					typeof o == "number" ||
					typeof o == "boolean"
				) {
					r.push(`${n}${s}${o}`);
				} else if (o instanceof Date) {
					r.push(`${n}${s}${o.toUTCString()}`);
				} else if (Array.isArray(o)) {
					for (const e of o) {
						e[Nh.NAME] = i;
						r.push(...this.serializeObj(e, t));
					}
				} else if (o instanceof Nh) {
					o[Nh.NAME] = i;
					r.push(...this.serializeObj(o, t));
				} else if (_r.isBufferSource(o)) {
					if (i) {
						r.push(`${n}${s}`);
						r.push(...this.serializeBufferSource(o, t + 1));
					} else {
						r.push(...this.serializeBufferSource(o, t));
					}
				} else {
					if (!("toTextObject" in o)) {
						throw new TypeError(
							"Cannot serialize data in text format. Unsupported type.",
						);
					}
					{
						const e = o.toTextObject();
						e[Nh.NAME] = i;
						r.push(...this.serializeObj(e, t));
					}
				}
			}
			return r;
		}
		static serializeBufferSource(e, t = 0) {
			const r = this.pad(t);
			const n = _r.toUint8Array(e);
			const i = [];
			for (let e = 0; e < n.length; ) {
				const t = [];
				for (let r = 0; r < 16 && e < n.length; r++) {
					if (r === 8) {
						t.push("");
					}
					const i = n[e++].toString(16).padStart(2, "0");
					t.push(i);
				}
				i.push(`${r}${t.join(" ")}`);
			}
			return i;
		}
		static serializeAlgorithm(e) {
			return this.algorithmSerializer.toTextObject(e);
		}
	}
	Oh.oidSerializer = Th;
	Oh.algorithmSerializer = class {
		static toTextObject(e) {
			const t = new Nh("Algorithm Identifier", {}, Th.toString(e.algorithm));
			if (e.parameters) {
				switch (e.algorithm) {
					case vl: {
						const r = new wh().toWebAlgorithm(e);
						if (r && "namedCurve" in r) {
							t["Named Curve"] = r.namedCurve;
						} else {
							t.Parameters = e.parameters;
						}
						break;
					}
					default:
						t.Parameters = e.parameters;
				}
			}
			return t;
		}
	};
	class Ih {
		constructor(...e) {
			if (e.length === 1) {
				const t = e[0];
				this.rawData = Ho.serialize(t);
				this.onInit(t);
			} else {
				const t = Ho.parse(e[0], e[1]);
				this.rawData = _r.toArrayBuffer(e[0]);
				this.onInit(t);
			}
		}
		equal(e) {
			return e instanceof Ih && Mr(e.rawData, this.rawData);
		}
		toString(e = "text") {
			switch (e) {
				case "asn":
					return Ho.toString(this.rawData);
				case "text":
					return Oh.serialize(this.toTextObject());
				case "hex":
					return Fr.ToHex(this.rawData);
				case "base64":
					return Fr.ToBase64(this.rawData);
				case "base64url":
					return Fr.ToBase64Url(this.rawData);
				default:
					throw TypeError("Argument 'format' is unsupported value");
			}
		}
		getTextName() {
			return this.constructor.NAME;
		}
		toTextObject() {
			const e = this.toTextObjectEmpty();
			e[""] = this.rawData;
			return e;
		}
		toTextObjectEmpty(e) {
			return new Nh(this.getTextName(), {}, e);
		}
	}
	Ih.NAME = "ASN";
	class kh extends Ih {
		constructor(...e) {
			let t;
			t = _r.isBufferSource(e[0])
				? _r.toArrayBuffer(e[0])
				: Ho.serialize(
						new Pa({
							extnID: e[0],
							critical: e[1],
							extnValue: new io(_r.toArrayBuffer(e[2])),
						}),
					);
			super(t, Pa);
		}
		onInit(e) {
			this.type = e.extnID;
			this.critical = e.critical;
			this.value = e.extnValue.buffer;
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e[""] = this.value;
			return e;
		}
		toTextObjectWithoutValue() {
			const e = this.toTextObjectEmpty(this.critical ? "critical" : undefined);
			if (e[Nh.NAME] === kh.NAME) {
				e[Nh.NAME] = Th.toString(this.type);
			}
			return e;
		}
	}
	var Bh;
	class xh {
		static isCryptoKeyPair(e) {
			return e && e.privateKey && e.publicKey;
		}
		static isCryptoKey(e) {
			return (
				e && e.usages && e.type && e.algorithm && e.extractable !== undefined
			);
		}
		constructor() {
			this.items = new Map();
			this[Bh] = "CryptoProvider";
			if (typeof self != "undefined" && typeof crypto != "undefined") {
				this.set(xh.DEFAULT, crypto);
			} else if (
				typeof global != "undefined" &&
				global.crypto &&
				global.crypto.subtle
			) {
				this.set(xh.DEFAULT, global.crypto);
			}
		}
		clear() {
			this.items.clear();
		}
		delete(e) {
			return this.items.delete(e);
		}
		forEach(e, t) {
			return this.items.forEach(e, t);
		}
		has(e) {
			return this.items.has(e);
		}
		get size() {
			return this.items.size;
		}
		entries() {
			return this.items.entries();
		}
		keys() {
			return this.items.keys();
		}
		values() {
			return this.items.values();
		}
		[Symbol.iterator]() {
			return this.items[Symbol.iterator]();
		}
		get(e = xh.DEFAULT) {
			const t = this.items.get(e.toLowerCase());
			if (!t) {
				throw new Error(`Cannot get Crypto by name '${e}'`);
			}
			return t;
		}
		set(e, t) {
			if (typeof e == "string") {
				if (!t) {
					throw new TypeError("Argument 'value' is required");
				}
				this.items.set(e.toLowerCase(), t);
			} else {
				this.items.set(xh.DEFAULT, e);
			}
			return this;
		}
	}
	Bh = Symbol.toStringTag;
	xh.DEFAULT = "default";
	const Ch = new xh();
	const Rh = /^[0-2](?:\.[1-9][0-9]*)+$/;
	class _h {
		constructor(e = {}) {
			this.items = {};
			for (const t in e) {
				this.register(t, e[t]);
			}
		}
		get(e) {
			return this.items[e] || null;
		}
		findId(e) {
			t = e;
			if (new RegExp(Rh).test(t)) {
				return e;
			} else {
				return this.get(e);
			}
			var t;
		}
		register(e, t) {
			this.items[e] = t;
			this.items[t] = e;
		}
	}
	const Uh = new _h();
	function Dh(e, t) {
		return `\\${Fr.ToHex(Fr.FromUtf8String(t)).toUpperCase()}`;
	}
	Uh.register("CN", "2.5.4.3");
	Uh.register("L", "2.5.4.7");
	Uh.register("ST", "2.5.4.8");
	Uh.register("O", "2.5.4.10");
	Uh.register("OU", "2.5.4.11");
	Uh.register("C", "2.5.4.6");
	Uh.register("DC", "0.9.2342.19200300.100.1.25");
	Uh.register("E", "1.2.840.113549.1.9.1");
	Uh.register("G", "2.5.4.42");
	Uh.register("I", "2.5.4.43");
	Uh.register("SN", "2.5.4.4");
	Uh.register("T", "2.5.4.12");
	class Ph {
		static isASCII(e) {
			for (let t = 0; t < e.length; t++) {
				if (e.charCodeAt(t) > 255) {
					return false;
				}
			}
			return true;
		}
		static isPrintableString(e) {
			return /^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e);
		}
		constructor(e, t = {}) {
			this.extraNames = new _h();
			this.asn = new Qo();
			for (const e in t) {
				if (Object.prototype.hasOwnProperty.call(t, e)) {
					const r = t[e];
					this.extraNames.register(e, r);
				}
			}
			if (typeof e == "string") {
				this.asn = this.fromString(e);
			} else if (e instanceof Qo) {
				this.asn = e;
			} else if (_r.isBufferSource(e)) {
				this.asn = Ho.parse(e, Qo);
			} else {
				this.asn = this.fromJSON(e);
			}
		}
		getField(e) {
			const t = this.extraNames.findId(e) || Uh.findId(e);
			const r = [];
			for (const e of this.asn) {
				for (const n of e) {
					if (n.type === t) {
						r.push(n.value.toString());
					}
				}
			}
			return r;
		}
		getName(e) {
			return this.extraNames.get(e) || Uh.get(e);
		}
		toString() {
			return this.asn
				.map((e) =>
					e
						.map(
							(e) =>
								`${this.getName(e.type) || e.type}=${
									e.value.anyValue
										? `#${Fr.ToHex(e.value.anyValue)}`
										: e.value
												.toString()
												.replace(/([,+"\\<>;])/g, "\\$1")
												.replace(/^([ #])/, "\\$1")
												.replace(/([ ]$)/, "\\$1")
												.replace(/([\r\n\t])/, Dh)
								}`,
						)
						.join("+"),
				)
				.join(", ");
		}
		toJSON() {
			var e;
			const t = [];
			for (const r of this.asn) {
				const n = {};
				for (const t of r) {
					const r = this.getName(t.type) || t.type;
					if ((e = n[r]) === null || e === undefined) {
						n[r] = [];
					}
					n[r].push(
						t.value.anyValue
							? `#${Fr.ToHex(t.value.anyValue)}`
							: t.value.toString(),
					);
				}
				t.push(n);
			}
			return t;
		}
		fromString(e) {
			const t = new Qo();
			const r =
				/(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g;
			let n = null;
			let i = ",";
			while ((n = r.exec(`${e},`))) {
				let [, e, r] = n;
				const o = r[r.length - 1];
				if (o === "," || o === "+") {
					r = r.slice(0, r.length - 1);
					n[3] = o;
				}
				const s = n[3];
				e = this.getTypeOid(e);
				const a = this.createAttribute(e, r);
				if (i === "+") {
					t[t.length - 1].push(a);
				} else {
					t.push(new Xo([a]));
				}
				i = s;
			}
			return t;
		}
		fromJSON(e) {
			const t = new Qo();
			for (const r of e) {
				const e = new Xo();
				for (const t in r) {
					const n = this.getTypeOid(t);
					const i = r[t];
					for (const t of i) {
						const r = this.createAttribute(n, t);
						e.push(r);
					}
				}
				t.push(e);
			}
			return t;
		}
		getTypeOid(e) {
			if (!/[\d.]+/.test(e)) {
				e = this.getName(e) || "";
			}
			if (!e) {
				throw new Error(`Cannot get OID for name type '${e}'`);
			}
			return e;
		}
		createAttribute(e, t) {
			const r = new zo({
				type: e,
			});
			if (typeof t == "object") {
				for (const e in t) {
					switch (e) {
						case "ia5String":
							r.value.ia5String = t[e];
							break;
						case "utf8String":
							r.value.utf8String = t[e];
							break;
						case "universalString":
							r.value.universalString = t[e];
							break;
						case "bmpString":
							r.value.bmpString = t[e];
							break;
						case "printableString":
							r.value.printableString = t[e];
					}
				}
			} else if (t[0] === "#") {
				r.value.anyValue = Fr.FromHex(t.slice(1));
			} else {
				const n = this.processStringValue(t);
				if (e === this.getName("E") || e === this.getName("DC")) {
					r.value.ia5String = n;
				} else if (Ph.isPrintableString(n)) {
					r.value.printableString = n;
				} else {
					r.value.utf8String = n;
				}
			}
			return r;
		}
		processStringValue(e) {
			const t = /"(.*?[^\\])?"/.exec(e);
			if (t) {
				e = t[1];
			}
			return e
				.replace(/\\0a/gi, "\n")
				.replace(/\\0d/gi, "\r")
				.replace(/\\0g/gi, "\t")
				.replace(/\\(.)/g, "$1");
		}
		toArrayBuffer() {
			return Ho.serialize(this.asn);
		}
		async getThumbprint(...e) {
			let r;
			let n = "SHA-1";
			if (e.length >= 1 && !e[0]?.subtle) {
				n = e[0] || n;
				r = e[1] || Ch.get();
			} else {
				r = e[0] || Ch.get();
			}
			return await r.subtle.digest(n, this.toArrayBuffer());
		}
	}
	const Vh = "Cannot initialize GeneralName from ASN.1 data.";
	const jh = `${Vh} Unsupported string format in use.`;
	const Lh = `${Vh} Value doesn't match to GUID regular expression.`;
	const Fh =
		/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i;
	const Mh = "1.3.6.1.4.1.311.25.1";
	const Hh = "1.3.6.1.4.1.311.20.2.3";
	const Kh = "dns";
	const $h = "dn";
	const Gh = "email";
	const Wh = "ip";
	const Yh = "url";
	const Jh = "guid";
	const zh = "upn";
	const Xh = "id";
	class qh extends Ih {
		constructor(...e) {
			let t;
			if (e.length === 2) {
				switch (e[0]) {
					case $h: {
						const r = new Ph(e[1]).toArrayBuffer();
						const n = Ho.parse(r, Qo);
						t = new rs({
							directoryName: n,
						});
						break;
					}
					case Kh:
						t = new rs({
							dNSName: e[1],
						});
						break;
					case Gh:
						t = new rs({
							rfc822Name: e[1],
						});
						break;
					case Jh: {
						const r = new RegExp(Fh, "i").exec(e[1]);
						if (!r) {
							throw new Error(
								"Cannot parse GUID value. Value doesn't match to regular expression",
							);
						}
						const n = r
							.slice(1)
							.map((e, t) =>
								t < 3 ? Fr.ToHex(new Uint8Array(Fr.FromHex(e)).reverse()) : e,
							)
							.join("");
						t = new rs({
							otherName: new es({
								typeId: Mh,
								value: Ho.serialize(new io(Fr.FromHex(n))),
							}),
						});
						break;
					}
					case Wh:
						t = new rs({
							iPAddress: e[1],
						});
						break;
					case Xh:
						t = new rs({
							registeredID: e[1],
						});
						break;
					case zh:
						t = new rs({
							otherName: new es({
								typeId: Hh,
								value: Ho.serialize(mo.toASN(e[1])),
							}),
						});
						break;
					case Yh:
						t = new rs({
							uniformResourceIdentifier: e[1],
						});
						break;
					default:
						throw new Error(
							"Cannot create GeneralName. Unsupported type of the name",
						);
				}
			} else {
				t = _r.isBufferSource(e[0]) ? Ho.parse(e[0], rs) : e[0];
			}
			super(t);
		}
		onInit(e) {
			if (e.dNSName != null) {
				this.type = Kh;
				this.value = e.dNSName;
			} else if (e.rfc822Name != null) {
				this.type = Gh;
				this.value = e.rfc822Name;
			} else if (e.iPAddress != null) {
				this.type = Wh;
				this.value = e.iPAddress;
			} else if (e.uniformResourceIdentifier != null) {
				this.type = Yh;
				this.value = e.uniformResourceIdentifier;
			} else if (e.registeredID != null) {
				this.type = Xh;
				this.value = e.registeredID;
			} else if (e.directoryName != null) {
				this.type = $h;
				this.value = new Ph(e.directoryName).toString();
			} else {
				if (e.otherName == null) {
					throw new Error(jh);
				}
				if (e.otherName.typeId === Mh) {
					this.type = Jh;
					const t = Ho.parse(e.otherName.value, io);
					const r = new RegExp(Fh, "i").exec(Fr.ToHex(t));
					if (!r) {
						throw new Error(Lh);
					}
					this.value = r
						.slice(1)
						.map((e, t) =>
							t < 3 ? Fr.ToHex(new Uint8Array(Fr.FromHex(e)).reverse()) : e,
						)
						.join("-");
				} else {
					if (e.otherName.typeId !== Hh) {
						throw new Error(jh);
					}
					this.type = zh;
					this.value = Ho.parse(e.otherName.value, Yo).toString();
				}
			}
		}
		toJSON() {
			return {
				type: this.type,
				value: this.value,
			};
		}
		toTextObject() {
			let e;
			switch (this.type) {
				case $h:
				case Kh:
				case Jh:
				case Wh:
				case Xh:
				case zh:
				case Yh:
					e = this.type.toUpperCase();
					break;
				case Gh:
					e = "Email";
					break;
				default:
					throw new Error("Unsupported GeneralName type");
			}
			let t = this.value;
			if (this.type === Xh) {
				t = Th.toString(t);
			}
			return new Nh(e, undefined, t);
		}
	}
	class Qh extends Ih {
		constructor(e) {
			let t;
			if (e instanceof ws) {
				t = e;
			} else if (Array.isArray(e)) {
				const r = [];
				for (const t of e) {
					if (t instanceof rs) {
						r.push(t);
					} else {
						const e = Ho.parse(new qh(t.type, t.value).rawData, rs);
						r.push(e);
					}
				}
				t = new ws(r);
			} else {
				if (!_r.isBufferSource(e)) {
					throw new Error(
						"Cannot initialize GeneralNames. Incorrect incoming arguments",
					);
				}
				t = Ho.parse(e, ws);
			}
			super(t);
		}
		onInit(e) {
			const t = [];
			for (const r of e) {
				let e = null;
				try {
					e = new qh(r);
				} catch {
					continue;
				}
				t.push(e);
			}
			this.items = t;
		}
		toJSON() {
			return this.items.map((e) => e.toJSON());
		}
		toTextObject() {
			const e = super.toTextObjectEmpty();
			for (const t of this.items) {
				const r = t.toTextObject();
				let n = e[r[Nh.NAME]];
				if (!Array.isArray(n)) {
					n = [];
					e[r[Nh.NAME]] = n;
				}
				n.push(r);
			}
			return e;
		}
	}
	Qh.NAME = "GeneralNames";
	const Zh = "-{5}";
	const ef = "\\n";
	const tf = "\\n";
	const rf = `${Zh}BEGIN ([^${ef}]+(?=${Zh}))${Zh}${tf}(?:((?:[^:${ef}]+: (?:[^${ef}]+${tf}(?: +[^${ef}]+${tf})*))+))?${tf}?((?:[a-zA-Z0-9=+/]+${tf})+)${Zh}END \\1${Zh}`;
	class nf {
		static isPem(e) {
			return (
				typeof e == "string" && new RegExp(rf, "g").test(e.replace(/\r/g, ""))
			);
		}
		static decodeWithHeaders(e) {
			e = e.replace(/\r/g, "");
			const t = new RegExp(rf, "g");
			const r = [];
			let n = null;
			while ((n = t.exec(e))) {
				const e = n[3].replace(new RegExp(`[${ef}]+`, "g"), "");
				const t = {
					type: n[1],
					headers: [],
					rawData: Fr.FromBase64(e),
				};
				const i = n[2];
				if (i) {
					const e = i.split(new RegExp(tf, "g"));
					let r = null;
					for (const n of e) {
						const [e, i] = n.split(/:(.*)/);
						if (i === undefined) {
							if (!r) {
								throw new Error(
									"Cannot parse PEM string. Incorrect header value",
								);
							}
							r.value += e.trim();
						} else {
							if (r) {
								t.headers.push(r);
							}
							r = {
								key: e,
								value: i.trim(),
							};
						}
					}
					if (r) {
						t.headers.push(r);
					}
				}
				r.push(t);
			}
			return r;
		}
		static decode(e) {
			return this.decodeWithHeaders(e).map((e) => e.rawData);
		}
		static decodeFirst(e) {
			const t = this.decode(e);
			if (!t.length) {
				throw new RangeError("PEM string doesn't contain any objects");
			}
			return t[0];
		}
		static encode(e, t) {
			if (Array.isArray(e)) {
				const r = new Array();
				if (t) {
					e.forEach((e) => {
						if (!_r.isBufferSource(e)) {
							throw new TypeError(
								"Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource",
							);
						}
						r.push(
							this.encodeStruct({
								type: t,
								rawData: _r.toArrayBuffer(e),
							}),
						);
					});
				} else {
					e.forEach((e) => {
						if (!("type" in e)) {
							throw new TypeError(
								"Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut",
							);
						}
						r.push(this.encodeStruct(e));
					});
				}
				return r.join("\n");
			}
			if (!t) {
				throw new Error("Required argument 'tag' is missed");
			}
			return this.encodeStruct({
				type: t,
				rawData: _r.toArrayBuffer(e),
			});
		}
		static encodeStruct(e) {
			const r = e.type.toLocaleUpperCase();
			const n = [];
			n.push(`-----BEGIN ${r}-----`);
			if (e.headers?.length) {
				for (const t of e.headers) {
					n.push(`${t.key}: ${t.value}`);
				}
				n.push("");
			}
			const i = Fr.ToBase64(e.rawData);
			let o;
			let s = 0;
			const a = Array();
			while (
				s < i.length &&
				(i.length - s < 64
					? (o = i.substring(s))
					: ((o = i.substring(s, s + 64)), (s += 64)),
				o.length !== 0) &&
				(a.push(o), !(o.length < 64))
			);
			n.push(...a);
			n.push(`-----END ${r}-----`);
			return n.join("\n");
		}
	}
	nf.CertificateTag = "CERTIFICATE";
	nf.CrlTag = "CRL";
	nf.CertificateRequestTag = "CERTIFICATE REQUEST";
	nf.PublicKeyTag = "PUBLIC KEY";
	nf.PrivateKeyTag = "PRIVATE KEY";
	class of extends Ih {
		static isAsnEncoded(e) {
			return _r.isBufferSource(e) || typeof e == "string";
		}
		static toArrayBuffer(e) {
			if (typeof e == "string") {
				if (nf.isPem(e)) {
					return nf.decode(e)[0];
				}
				if (Fr.isHex(e)) {
					return Fr.FromHex(e);
				}
				if (Fr.isBase64(e)) {
					return Fr.FromBase64(e);
				}
				if (Fr.isBase64Url(e)) {
					return Fr.FromBase64Url(e);
				}
				throw new TypeError(
					"Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url",
				);
			}
			{
				const t = Fr.ToBinary(e);
				if (nf.isPem(t)) {
					return nf.decode(t)[0];
				} else if (Fr.isHex(t)) {
					return Fr.FromHex(t);
				} else if (Fr.isBase64(t)) {
					return Fr.FromBase64(t);
				} else if (Fr.isBase64Url(t)) {
					return Fr.FromBase64Url(t);
				} else {
					return _r.toArrayBuffer(e);
				}
			}
		}
		constructor(...e) {
			if (of.isAsnEncoded(e[0])) {
				super(of.toArrayBuffer(e[0]), e[1]);
			} else {
				super(e[0]);
			}
		}
		toString(e = "pem") {
			if (e === "pem") {
				return nf.encode(this.rawData, this.tag);
			} else {
				return super.toString(e);
			}
		}
	}
	class sf extends of {
		static async create(e, t = Ch.get()) {
			if (e instanceof sf) {
				return e;
			}
			if (xh.isCryptoKey(e)) {
				if (e.type !== "public") {
					throw new TypeError("Public key is required");
				}
				const r = await t.subtle.exportKey("spki", e);
				return new sf(r);
			}
			if (e.publicKey) {
				return e.publicKey;
			}
			if (_r.isBufferSource(e)) {
				return new sf(e);
			}
			throw new TypeError("Unsupported PublicKeyType");
		}
		constructor(e) {
			if (of.isAsnEncoded(e)) {
				super(e, Ra);
			} else {
				super(e);
			}
			this.tag = nf.PublicKeyTag;
		}
		async export(...e) {
			let t;
			let r = ["verify"];
			let n = {
				hash: "SHA-256",
				...this.algorithm,
			};
			if (e.length > 1) {
				n = e[0] || n;
				r = e[1] || r;
				t = e[2] || Ch.get();
			} else {
				t = e[0] || Ch.get();
			}
			let i = this.rawData;
			const o = Ho.parse(this.rawData, Ra);
			if (o.algorithm.algorithm === Kl) {
				i = (function (e) {
					e.algorithm = new Ca({
						algorithm: Fl,
						parameters: null,
					});
					return Ho.serialize(e);
				})(o);
			}
			return t.subtle.importKey("spki", i, n, true, r);
		}
		onInit(e) {
			const t = Fu.resolve(Kp);
			const r = (this.algorithm = t.toWebAlgorithm(e.algorithm));
			switch (e.algorithm.algorithm) {
				case Fl: {
					const t = Ho.parse(e.subjectPublicKey, mu);
					const n = _r.toUint8Array(t.modulus);
					r.publicExponent = _r.toUint8Array(t.publicExponent);
					r.modulusLength = (n[0] ? n : n.slice(1)).byteLength << 3;
					break;
				}
			}
		}
		async getThumbprint(...e) {
			let r;
			let n = "SHA-1";
			if (e.length >= 1 && !e[0]?.subtle) {
				n = e[0] || n;
				r = e[1] || Ch.get();
			} else {
				r = e[0] || Ch.get();
			}
			return await r.subtle.digest(n, this.rawData);
		}
		async getKeyIdentifier(...e) {
			let t;
			let r = "SHA-1";
			if (e.length === 1) {
				if (typeof e[0] == "string") {
					r = e[0];
					t = Ch.get();
				} else {
					t = e[0];
				}
			} else if (e.length === 2) {
				r = e[0];
				t = e[1];
			} else {
				t = Ch.get();
			}
			const n = Ho.parse(this.rawData, Ra);
			return await t.subtle.digest(r, n.subjectPublicKey);
		}
		toTextObject() {
			const e = this.toTextObjectEmpty();
			const t = Ho.parse(this.rawData, Ra);
			e.Algorithm = Oh.serializeAlgorithm(t.algorithm);
			if (t.algorithm.algorithm === vl) {
				e["EC Point"] = t.subjectPublicKey;
			} else {
				e["Raw Data"] = t.subjectPublicKey;
			}
			return e;
		}
	}
	class af extends kh {
		static async create(e, t = false, r = Ch.get()) {
			if ("name" in e && "serialNumber" in e) {
				return new af(e, t);
			}
			const n = await sf.create(e, r);
			const i = await n.getKeyIdentifier(r);
			return new af(Fr.ToHex(i), t);
		}
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else if (typeof e[0] == "string") {
				const t = new gs({
					keyIdentifier: new ms(Fr.FromHex(e[0])),
				});
				super(ys, e[1], Ho.serialize(t));
			} else {
				const t = e[0];
				const r = t.name instanceof Qh ? Ho.parse(t.name.rawData, ws) : t.name;
				const n = new gs({
					authorityCertIssuer: r,
					authorityCertSerialNumber: Fr.FromHex(t.serialNumber),
				});
				super(ys, e[1], Ho.serialize(n));
			}
		}
		onInit(e) {
			super.onInit(e);
			const t = Ho.parse(e.extnValue, gs);
			if (t.keyIdentifier) {
				this.keyId = Fr.ToHex(t.keyIdentifier);
			}
			if (t.authorityCertIssuer || t.authorityCertSerialNumber) {
				this.certId = {
					name: t.authorityCertIssuer || [],
					serialNumber: t.authorityCertSerialNumber
						? Fr.ToHex(t.authorityCertSerialNumber)
						: "",
				};
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			const t = Ho.parse(this.value, gs);
			if (t.authorityCertIssuer) {
				e["Authority Issuer"] = new Qh(t.authorityCertIssuer).toTextObject();
			}
			if (t.authorityCertSerialNumber) {
				e["Authority Serial Number"] = t.authorityCertSerialNumber;
			}
			if (t.keyIdentifier) {
				e[""] = t.keyIdentifier;
			}
			return e;
		}
	}
	af.NAME = "Authority Key Identifier";
	class cf extends kh {
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
				const t = Ho.parse(this.value, bs);
				this.ca = t.cA;
				this.pathLength = t.pathLenConstraint;
			} else {
				const t = new bs({
					cA: e[0],
					pathLenConstraint: e[1],
				});
				super(vs, e[2], Ho.serialize(t));
				this.ca = e[0];
				this.pathLength = e[1];
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			if (this.ca) {
				e.CA = this.ca;
			}
			if (this.pathLength !== undefined) {
				e["Path Length"] = this.pathLength;
			}
			return e;
		}
	}
	var lf;
	var uf;
	cf.NAME = "Basic Constraints";
	(function (e) {
		e.serverAuth = "1.3.6.1.5.5.7.3.1";
		e.clientAuth = "1.3.6.1.5.5.7.3.2";
		e.codeSigning = "1.3.6.1.5.5.7.3.3";
		e.emailProtection = "1.3.6.1.5.5.7.3.4";
		e.timeStamping = "1.3.6.1.5.5.7.3.8";
		e.ocspSigning = "1.3.6.1.5.5.7.3.9";
	})((lf ||= {}));
	class pf extends kh {
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
				const t = Ho.parse(this.value, zs);
				this.usages = t.map((e) => e);
			} else {
				const t = new zs(e[0]);
				super(Js, e[1], Ho.serialize(t));
				this.usages = e[0];
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e[""] = this.usages.map((e) => Th.toString(e)).join(", ");
			return e;
		}
	}
	pf.NAME = "Extended Key Usages";
	(function (e) {
		e[(e.digitalSignature = 1)] = "digitalSignature";
		e[(e.nonRepudiation = 2)] = "nonRepudiation";
		e[(e.keyEncipherment = 4)] = "keyEncipherment";
		e[(e.dataEncipherment = 8)] = "dataEncipherment";
		e[(e.keyAgreement = 16)] = "keyAgreement";
		e[(e.keyCertSign = 32)] = "keyCertSign";
		e[(e.cRLSign = 64)] = "cRLSign";
		e[(e.encipherOnly = 128)] = "encipherOnly";
		e[(e.decipherOnly = 256)] = "decipherOnly";
	})((uf ||= {}));
	class hf extends kh {
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
				const t = Ho.parse(this.value, la);
				this.usages = t.toNumber();
			} else {
				const t = new la(e[0]);
				super(sa, e[1], Ho.serialize(t));
				this.usages = e[0];
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			const t = Ho.parse(this.value, la);
			e[""] = t.toJSON().join(", ");
			return e;
		}
	}
	hf.NAME = "Key Usages";
	class ff extends kh {
		static async create(e, t = false, r = Ch.get()) {
			const n = await sf.create(e, r);
			const i = await n.getKeyIdentifier(r);
			return new ff(Fr.ToHex(i), t);
		}
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
				const t = Ho.parse(this.value, Na);
				this.keyId = Fr.ToHex(t);
			} else {
				const t = typeof e[0] == "string" ? Fr.FromHex(e[0]) : e[0];
				const r = new Na(t);
				super(Aa, e[1], Ho.serialize(r));
				this.keyId = Fr.ToHex(t);
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			const t = Ho.parse(this.value, Na);
			e[""] = t;
			return e;
		}
	}
	ff.NAME = "Subject Key Identifier";
	class df extends kh {
		constructor(...e) {
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else {
				super(va, e[1], new Qh(e[0] || []).rawData);
			}
		}
		onInit(e) {
			super.onInit(e);
			const t = Ho.parse(e.extnValue, ba);
			this.names = new Qh(t);
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			const t = this.names.toTextObject();
			for (const r in t) {
				e[r] = t[r];
			}
			return e;
		}
	}
	df.NAME = "Subject Alternative Name";
	class yf {
		static register(e, t) {
			this.items.set(e, t);
		}
		static create(e) {
			const t = new kh(e);
			const r = this.items.get(t.type);
			if (r) {
				return new r(e);
			} else {
				return t;
			}
		}
	}
	yf.items = new Map();
	class mf extends kh {
		constructor(...e) {
			var t;
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
				const t = Ho.parse(this.value, Rs);
				this.policies = t.map((e) => e.policyIdentifier);
			} else {
				const r = e[0];
				const n = (t = e[1]) !== null && t !== undefined && t;
				const i = new Rs(
					r.map(
						(e) =>
							new Cs({
								policyIdentifier: e,
							}),
					),
				);
				super(Ts, n, Ho.serialize(i));
				this.policies = r;
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e.Policy = this.policies.map((e) => new Nh("", {}, Th.toString(e)));
			return e;
		}
	}
	mf.NAME = "Certificate Policies";
	yf.register(Ts, mf);
	class gf extends kh {
		constructor(...e) {
			var t;
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else if (Array.isArray(e[0]) && typeof e[0][0] == "string") {
				const t = e[0].map(
					(e) =>
						new Fs({
							distributionPoint: new Ls({
								fullName: [
									new rs({
										uniformResourceIdentifier: e,
									}),
								],
							}),
						}),
				);
				const r = new Ms(t);
				super(Ps, e[1], Ho.serialize(r));
			} else {
				const t = new Ms(e[0]);
				super(Ps, e[1], Ho.serialize(t));
			}
			if ((t = this.distributionPoints) === null || t === undefined) {
				this.distributionPoints = [];
			}
		}
		onInit(e) {
			super.onInit(e);
			const t = Ho.parse(e.extnValue, Ms);
			this.distributionPoints = t;
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e["Distribution Point"] = this.distributionPoints.map((e) => {
				var t;
				const r = {};
				if (e.distributionPoint) {
					r[""] =
						(t = e.distributionPoint.fullName) === null || t === undefined
							? undefined
							: t.map((e) => new qh(e).toString()).join(", ");
				}
				if (e.reasons) {
					r.Reasons = e.reasons.toString();
				}
				if (e.cRLIssuer) {
					r["CRL Issuer"] = e.cRLIssuer.map((e) => e.toString()).join(", ");
				}
				return r;
			});
			return e;
		}
	}
	gf.NAME = "CRL Distribution Points";
	class vf extends kh {
		constructor(...e) {
			var t;
			var r;
			var n;
			var i;
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else if (e[0] instanceof ds) {
				const t = new ds(e[0]);
				super(hs, e[1], Ho.serialize(t));
			} else {
				const t = e[0];
				const r = new ds();
				Ef(r, t, ss, "ocsp");
				Ef(r, t, as, "caIssuers");
				Ef(r, t, cs, "timeStamping");
				Ef(r, t, ls, "caRepository");
				super(hs, e[1], Ho.serialize(r));
			}
			if ((t = this.ocsp) === null || t === undefined) {
				this.ocsp = [];
			}
			if ((r = this.caIssuers) === null || r === undefined) {
				this.caIssuers = [];
			}
			if ((n = this.timeStamping) === null || n === undefined) {
				this.timeStamping = [];
			}
			if ((i = this.caRepository) === null || i === undefined) {
				this.caRepository = [];
			}
		}
		onInit(e) {
			super.onInit(e);
			this.ocsp = [];
			this.caIssuers = [];
			this.timeStamping = [];
			this.caRepository = [];
			Ho.parse(e.extnValue, ds).forEach((e) => {
				switch (e.accessMethod) {
					case ss:
						this.ocsp.push(new qh(e.accessLocation));
						break;
					case as:
						this.caIssuers.push(new qh(e.accessLocation));
						break;
					case cs:
						this.timeStamping.push(new qh(e.accessLocation));
						break;
					case ls:
						this.caRepository.push(new qh(e.accessLocation));
				}
			});
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			if (this.ocsp.length) {
				bf(e, "OCSP", this.ocsp);
			}
			if (this.caIssuers.length) {
				bf(e, "CA Issuers", this.caIssuers);
			}
			if (this.timeStamping.length) {
				bf(e, "Time Stamping", this.timeStamping);
			}
			if (this.caRepository.length) {
				bf(e, "CA Repository", this.caRepository);
			}
			return e;
		}
	}
	function bf(e, t, r) {
		if (r.length === 1) {
			e[t] = r[0].toTextObject();
		} else {
			const n = new Nh("");
			r.forEach((e, t) => {
				const r = e.toTextObject();
				const i = `${r[Nh.NAME]} ${t + 1}`;
				let o = n[i];
				if (!Array.isArray(o)) {
					o = [];
					n[i] = o;
				}
				o.push(r);
			});
			e[t] = n;
		}
	}
	function Ef(e, t, r, n) {
		const i = t[n];
		if (i) {
			(Array.isArray(i) ? i : [i]).forEach((t) => {
				if (typeof t == "string") {
					t = new qh("url", t);
				}
				e.push(
					new fs({
						accessMethod: r,
						accessLocation: Ho.parse(t.rawData, rs),
					}),
				);
			});
		}
	}
	vf.NAME = "Authority Info Access";
	class wf extends Ih {
		constructor(...e) {
			let t;
			if (_r.isBufferSource(e[0])) {
				t = _r.toArrayBuffer(e[0]);
			} else {
				const r = e[0];
				const n = Array.isArray(e[1])
					? e[1].map((e) => _r.toArrayBuffer(e))
					: [];
				t = Ho.serialize(
					new Ea({
						type: r,
						values: n,
					}),
				);
			}
			super(t, Ea);
		}
		onInit(e) {
			this.type = e.type;
			this.values = e.values;
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e.Value = this.values.map(
				(e) =>
					new Nh("", {
						"": e,
					}),
			);
			return e;
		}
		toTextObjectWithoutValue() {
			const e = this.toTextObjectEmpty();
			if (e[Nh.NAME] === wf.NAME) {
				e[Nh.NAME] = Th.toString(this.type);
			}
			return e;
		}
	}
	wf.NAME = "Attribute";
	class Sf extends wf {
		constructor(...e) {
			var t;
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else {
				const t = new Rp({
					printableString: e[0],
				});
				super(fp, [Ho.serialize(t)]);
			}
			if ((t = this.password) === null || t === undefined) {
				this.password = "";
			}
		}
		onInit(e) {
			super.onInit(e);
			if (this.values[0]) {
				const e = Ho.parse(this.values[0], Rp);
				this.password = e.toString();
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			e[Nh.VALUE] = this.password;
			return e;
		}
	}
	Sf.NAME = "Challenge Password";
	class Af extends wf {
		constructor(...e) {
			var t;
			if (_r.isBufferSource(e[0])) {
				super(e[0]);
			} else {
				const t = e[0];
				const r = new Va();
				for (const e of t) {
					r.push(Ho.parse(e.rawData, Pa));
				}
				super(dp, [Ho.serialize(r)]);
			}
			if ((t = this.items) === null || t === undefined) {
				this.items = [];
			}
		}
		onInit(e) {
			super.onInit(e);
			if (this.values[0]) {
				const e = Ho.parse(this.values[0], Va);
				this.items = e.map((e) => yf.create(Ho.serialize(e)));
			}
		}
		toTextObject() {
			const e = this.toTextObjectWithoutValue();
			const t = this.items.map((e) => e.toTextObject());
			for (const r of t) {
				e[r[Nh.NAME]] = r;
			}
			return e;
		}
	}
	Af.NAME = "Extensions";
	class Nf {
		static register(e, t) {
			this.items.set(e, t);
		}
		static create(e) {
			const t = new wf(e);
			const r = this.items.get(t.type);
			if (r) {
				return new r(e);
			} else {
				return t;
			}
		}
	}
	Nf.items = new Map();
	const Tf = "crypto.signatureFormatter";
	var Of;
	let If = (Of = class {
		static createPssParams(e, t) {
			const r = Of.getHashAlgorithm(e);
			if (r) {
				return new uu({
					hashAlgorithm: r,
					maskGenAlgorithm: new Ca({
						algorithm: iu,
						parameters: Ho.serialize(r),
					}),
					saltLength: t,
				});
			} else {
				return null;
			}
		}
		static getHashAlgorithm(e) {
			const t = Fu.resolve(Kp);
			if (typeof e == "string") {
				return t.toAsnAlgorithm({
					name: e,
				});
			} else if (typeof e == "object" && e && "name" in e) {
				return t.toAsnAlgorithm(e);
			} else {
				return null;
			}
		}
		toAsnAlgorithm(e) {
			switch (e.name.toLowerCase()) {
				case "rsassa-pkcs1-v1_5":
					if (!("hash" in e)) {
						return new Ca({
							algorithm: Fl,
							parameters: null,
						});
					}
					{
						let t;
						if (typeof e.hash == "string") {
							t = e.hash;
						} else {
							if (
								!e.hash ||
								typeof e.hash != "object" ||
								!("name" in e.hash) ||
								typeof e.hash.name != "string"
							) {
								throw new Error("Cannot get hash algorithm name");
							}
							t = e.hash.name.toUpperCase();
						}
						switch (t.toLowerCase()) {
							case "sha-1":
								return new Ca({
									algorithm: Wl,
									parameters: null,
								});
							case "sha-256":
								return new Ca({
									algorithm: Jl,
									parameters: null,
								});
							case "sha-384":
								return new Ca({
									algorithm: zl,
									parameters: null,
								});
							case "sha-512":
								return new Ca({
									algorithm: Xl,
									parameters: null,
								});
						}
					}
					break;
				case "rsa-pss":
					if ("hash" in e) {
						if (!("saltLength" in e) || typeof e.saltLength != "number") {
							throw new Error("Cannot get 'saltLength' from 'alg' argument");
						}
						const t = Of.createPssParams(e.hash, e.saltLength);
						if (!t) {
							throw new Error("Cannot create PSS parameters");
						}
						return new Ca({
							algorithm: Kl,
							parameters: Ho.serialize(t),
						});
					}
					return new Ca({
						algorithm: Kl,
						parameters: null,
					});
			}
			return null;
		}
		toWebAlgorithm(e) {
			switch (e.algorithm) {
				case Fl:
					return {
						name: "RSASSA-PKCS1-v1_5",
					};
				case Wl:
					return {
						name: "RSASSA-PKCS1-v1_5",
						hash: {
							name: "SHA-1",
						},
					};
				case Jl:
					return {
						name: "RSASSA-PKCS1-v1_5",
						hash: {
							name: "SHA-256",
						},
					};
				case zl:
					return {
						name: "RSASSA-PKCS1-v1_5",
						hash: {
							name: "SHA-384",
						},
					};
				case Xl:
					return {
						name: "RSASSA-PKCS1-v1_5",
						hash: {
							name: "SHA-512",
						},
					};
				case Kl:
					if (e.parameters) {
						const t = Ho.parse(e.parameters, uu);
						return {
							name: "RSA-PSS",
							hash: Fu.resolve(Kp).toWebAlgorithm(t.hashAlgorithm),
							saltLength: t.saltLength,
						};
					}
					return {
						name: "RSA-PSS",
					};
			}
			return null;
		}
	});
	If = Of = e([Mu()], If);
	Fu.registerSingleton(Hp, If);
	let kf = class {
		toAsnAlgorithm(e) {
			switch (e.name.toLowerCase()) {
				case "sha-1":
					return new Ca({
						algorithm: Zl,
					});
				case "sha-256":
					return new Ca({
						algorithm: tu,
					});
				case "sha-384":
					return new Ca({
						algorithm: ru,
					});
				case "sha-512":
					return new Ca({
						algorithm: nu,
					});
			}
			return null;
		}
		toWebAlgorithm(e) {
			switch (e.algorithm) {
				case Zl:
					return {
						name: "SHA-1",
					};
				case tu:
					return {
						name: "SHA-256",
					};
				case ru:
					return {
						name: "SHA-384",
					};
				case nu:
					return {
						name: "SHA-512",
					};
			}
			return null;
		}
	};
	kf = e([Mu()], kf);
	Fu.registerSingleton(Hp, kf);
	class Bf {
		addPadding(e, t) {
			const r = _r.toUint8Array(t);
			const n = new Uint8Array(e);
			n.set(r, e - r.length);
			return n;
		}
		removePadding(e, t = false) {
			let r = _r.toUint8Array(e);
			for (let e = 0; e < r.length; e++) {
				if (r[e]) {
					r = r.slice(e);
					break;
				}
			}
			if (t && r[0] > 127) {
				const e = new Uint8Array(r.length + 1);
				e.set(r, 1);
				return e.buffer;
			}
			return r.buffer;
		}
		toAsnSignature(e, t) {
			if (e.name === "ECDSA") {
				const r = e.namedCurve;
				const n = Bf.namedCurveSize.get(r) || Bf.defaultNamedCurveSize;
				const i = new jl();
				const o = _r.toUint8Array(t);
				i.r = this.removePadding(o.slice(0, n), true);
				i.s = this.removePadding(o.slice(n, n + n), true);
				return Ho.serialize(i);
			}
			return null;
		}
		toWebSignature(e, t) {
			if (e.name === "ECDSA") {
				const r = Ho.parse(t, jl);
				const n = e.namedCurve;
				const i = Bf.namedCurveSize.get(n) || Bf.defaultNamedCurveSize;
				return (function (...e) {
					const t = e.map((e) => e.byteLength).reduce((e, t) => e + t);
					const r = new Uint8Array(t);
					let n = 0;
					e.map((e) => new Uint8Array(e)).forEach((e) => {
						for (const t of e) {
							r[n++] = t;
						}
					});
					return r.buffer;
				})(
					this.addPadding(i, this.removePadding(r.r)),
					this.addPadding(i, this.removePadding(r.s)),
				);
			}
			return null;
		}
	}
	Bf.namedCurveSize = new Map();
	Bf.defaultNamedCurveSize = 32;
	const xf = "1.3.101.110";
	const Cf = "1.3.101.111";
	const Rf = "1.3.101.112";
	const _f = "1.3.101.113";
	let Uf = class {
		toAsnAlgorithm(e) {
			let t = null;
			switch (e.name.toLowerCase()) {
				case "ed25519":
					t = Rf;
					break;
				case "x25519":
					t = xf;
					break;
				case "eddsa":
					switch (e.namedCurve.toLowerCase()) {
						case "ed25519":
							t = Rf;
							break;
						case "ed448":
							t = _f;
					}
					break;
				case "ecdh-es":
					switch (e.namedCurve.toLowerCase()) {
						case "x25519":
							t = xf;
							break;
						case "x448":
							t = Cf;
					}
			}
			if (t) {
				return new Ca({
					algorithm: t,
				});
			} else {
				return null;
			}
		}
		toWebAlgorithm(e) {
			switch (e.algorithm) {
				case Rf:
					return {
						name: "Ed25519",
					};
				case _f:
					return {
						name: "EdDSA",
						namedCurve: "Ed448",
					};
				case xf:
					return {
						name: "X25519",
					};
				case Cf:
					return {
						name: "ECDH-ES",
						namedCurve: "X448",
					};
			}
			return null;
		}
	};
	Uf = e([Mu()], Uf);
	Fu.registerSingleton(Hp, Uf);
	(class extends of {
		constructor(e) {
			if (of.isAsnEncoded(e)) {
				super(e, Mp);
			} else {
				super(e);
			}
			this.tag = nf.CertificateRequestTag;
		}
		onInit(e) {
			this.tbs = Ho.serialize(e.certificationRequestInfo);
			this.publicKey = new sf(e.certificationRequestInfo.subjectPKInfo);
			const t = Fu.resolve(Kp);
			this.signatureAlgorithm = t.toWebAlgorithm(e.signatureAlgorithm);
			this.signature = e.signature;
			this.attributes = e.certificationRequestInfo.attributes.map((e) =>
				Nf.create(Ho.serialize(e)),
			);
			const r = this.getAttribute(dp);
			this.extensions = [];
			if (r instanceof Af) {
				this.extensions = r.items;
			}
			this.subjectName = new Ph(e.certificationRequestInfo.subject);
			this.subject = this.subjectName.toString();
		}
		getAttribute(e) {
			for (const t of this.attributes) {
				if (t.type === e) {
					return t;
				}
			}
			return null;
		}
		getAttributes(e) {
			return this.attributes.filter((t) => t.type === e);
		}
		getExtension(e) {
			for (const t of this.extensions) {
				if (t.type === e) {
					return t;
				}
			}
			return null;
		}
		getExtensions(e) {
			return this.extensions.filter((t) => t.type === e);
		}
		async verify(e = Ch.get()) {
			const t = {
				...this.publicKey.algorithm,
				...this.signatureAlgorithm,
			};
			const r = await this.publicKey.export(t, ["verify"], e);
			const n = Fu.resolveAll(Tf).reverse();
			let i = null;
			for (const e of n) {
				i = e.toWebSignature(t, this.signature);
				if (i) {
					break;
				}
			}
			if (!i) {
				throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
			}
			return await e.subtle.verify(this.signatureAlgorithm, r, i, this.tbs);
		}
		toTextObject() {
			const e = this.toTextObjectEmpty();
			const t = Ho.parse(this.rawData, Mp);
			const r = t.certificationRequestInfo;
			const n = new Nh("", {
				Version: `${ja[r.version]} (${r.version})`,
				Subject: this.subject,
				"Subject Public Key Info": this.publicKey,
			});
			if (this.attributes.length) {
				const e = new Nh("");
				for (const t of this.attributes) {
					const r = t.toTextObject();
					e[r[Nh.NAME]] = r;
				}
				n.Attributes = e;
			}
			e.Data = n;
			e.Signature = new Nh("", {
				Algorithm: Oh.serializeAlgorithm(t.signatureAlgorithm),
				"": t.signature,
			});
			return e;
		}
	}).NAME = "PKCS#10 Certificate Request";
	class Df extends of {
		constructor(e) {
			if (of.isAsnEncoded(e)) {
				super(e, Fa);
			} else {
				super(e);
			}
			this.tag = nf.CertificateTag;
		}
		onInit(e) {
			const t = e.tbsCertificate;
			this.tbs = Ho.serialize(t);
			let r = new Uint8Array(t.serialNumber);
			if (r.length > 1 && r[0] === 0 && r[1] > 127) {
				r = r.slice(1);
			}
			this.serialNumber = Fr.ToHex(r);
			this.subjectName = new Ph(t.subject);
			this.subject = new Ph(t.subject).toString();
			this.issuerName = new Ph(t.issuer);
			this.issuer = this.issuerName.toString();
			const n = Fu.resolve(Kp);
			this.signatureAlgorithm = n.toWebAlgorithm(e.signatureAlgorithm);
			this.signature = e.signatureValue;
			const i =
				t.validity.notBefore.utcTime || t.validity.notBefore.generalTime;
			if (!i) {
				throw new Error("Cannot get 'notBefore' value");
			}
			this.notBefore = i;
			const o = t.validity.notAfter.utcTime || t.validity.notAfter.generalTime;
			if (!o) {
				throw new Error("Cannot get 'notAfter' value");
			}
			this.notAfter = o;
			this.extensions = [];
			if (t.extensions) {
				this.extensions = t.extensions.map((e) => yf.create(Ho.serialize(e)));
			}
			this.publicKey = new sf(t.subjectPublicKeyInfo);
		}
		getExtension(e) {
			for (const t of this.extensions) {
				if (typeof e == "string") {
					if (t.type === e) {
						return t;
					}
				} else if (t instanceof e) {
					return t;
				}
			}
			return null;
		}
		getExtensions(e) {
			return this.extensions.filter((t) =>
				typeof e == "string" ? t.type === e : t instanceof e,
			);
		}
		async verify(e = {}, t = Ch.get()) {
			let r;
			let n;
			const i = e.publicKey;
			try {
				if (i) {
					if ("publicKey" in i) {
						r = {
							...i.publicKey.algorithm,
							...this.signatureAlgorithm,
						};
						n = await i.publicKey.export(r, ["verify"], t);
					} else if (i instanceof sf) {
						r = {
							...i.algorithm,
							...this.signatureAlgorithm,
						};
						n = await i.export(r, ["verify"], t);
					} else if (_r.isBufferSource(i)) {
						const e = new sf(i);
						r = {
							...e.algorithm,
							...this.signatureAlgorithm,
						};
						n = await e.export(r, ["verify"], t);
					} else {
						r = {
							...i.algorithm,
							...this.signatureAlgorithm,
						};
						n = i;
					}
				} else {
					r = {
						...this.publicKey.algorithm,
						...this.signatureAlgorithm,
					};
					n = await this.publicKey.export(r, ["verify"], t);
				}
			} catch (e) {
				return false;
			}
			const o = Fu.resolveAll(Tf).reverse();
			let s = null;
			for (const e of o) {
				s = e.toWebSignature(r, this.signature);
				if (s) {
					break;
				}
			}
			if (!s) {
				throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
			}
			const a = await t.subtle.verify(this.signatureAlgorithm, n, s, this.tbs);
			if (e.signatureOnly) {
				return a;
			}
			{
				const t = (e.date || new Date()).getTime();
				return a && this.notBefore.getTime() < t && t < this.notAfter.getTime();
			}
		}
		async getThumbprint(...e) {
			let t;
			let r = "SHA-1";
			if (e[0]) {
				if (e[0].subtle) {
					t = e[0];
				} else {
					r = e[0] || r;
					t = e[1];
				}
			}
			if (t == null) {
				t = Ch.get();
			}
			return await t.subtle.digest(r, this.rawData);
		}
		async isSelfSigned(e = Ch.get()) {
			return (
				this.subject === this.issuer &&
				(await this.verify(
					{
						signatureOnly: true,
					},
					e,
				))
			);
		}
		toTextObject() {
			const e = this.toTextObjectEmpty();
			const t = Ho.parse(this.rawData, Fa);
			const r = t.tbsCertificate;
			const n = new Nh("", {
				Version: `${ja[r.version]} (${r.version})`,
				"Serial Number": r.serialNumber,
				"Signature Algorithm": Oh.serializeAlgorithm(r.signature),
				Issuer: this.issuer,
				Validity: new Nh("", {
					"Not Before": r.validity.notBefore.getTime(),
					"Not After": r.validity.notAfter.getTime(),
				}),
				Subject: this.subject,
				"Subject Public Key Info": this.publicKey,
			});
			if (r.issuerUniqueID) {
				n["Issuer Unique ID"] = r.issuerUniqueID;
			}
			if (r.subjectUniqueID) {
				n["Subject Unique ID"] = r.subjectUniqueID;
			}
			if (this.extensions.length) {
				const e = new Nh("");
				for (const t of this.extensions) {
					const r = t.toTextObject();
					e[r[Nh.NAME]] = r;
				}
				n.Extensions = e;
			}
			e.Data = n;
			e.Signature = new Nh("", {
				Algorithm: Oh.serializeAlgorithm(t.signatureAlgorithm),
				"": t.signatureValue,
			});
			return e;
		}
	}
	var Pf;
	Df.NAME = "Certificate";
	(function (e) {
		e[(e.unspecified = 0)] = "unspecified";
		e[(e.keyCompromise = 1)] = "keyCompromise";
		e[(e.cACompromise = 2)] = "cACompromise";
		e[(e.affiliationChanged = 3)] = "affiliationChanged";
		e[(e.superseded = 4)] = "superseded";
		e[(e.cessationOfOperation = 5)] = "cessationOfOperation";
		e[(e.certificateHold = 6)] = "certificateHold";
		e[(e.removeFromCRL = 8)] = "removeFromCRL";
		e[(e.privilegeWithdrawn = 9)] = "privilegeWithdrawn";
		e[(e.aACompromise = 10)] = "aACompromise";
	})((Pf ||= {}));
	yf.register(vs, cf);
	yf.register(Js, pf);
	yf.register(sa, hf);
	yf.register(Aa, ff);
	yf.register(ys, af);
	yf.register(va, df);
	yf.register(Ps, gf);
	yf.register(hs, vf);
	Nf.register(fp, Sf);
	Nf.register(dp, Af);
	Fu.registerSingleton(
		Tf,
		class {
			toAsnSignature(e, t) {
				return _r.toArrayBuffer(t);
			}
			toWebSignature(e, t) {
				return _r.toArrayBuffer(t);
			}
		},
	);
	Fu.registerSingleton(Tf, Bf);
	Bf.namedCurveSize.set("P-256", 32);
	Bf.namedCurveSize.set("K-256", 32);
	Bf.namedCurveSize.set("P-384", 48);
	Bf.namedCurveSize.set("P-521", 66);
	const Vf = new TextEncoder();
	const jf = new TextDecoder();
	function Lf(e) {
		if (Uint8Array.fromBase64) {
			return Uint8Array.fromBase64(typeof e == "string" ? e : jf.decode(e), {
				alphabet: "base64url",
			});
		}
		let t = e;
		if (t instanceof Uint8Array) {
			t = jf.decode(t);
		}
		t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
		try {
			return (function (e) {
				if (Uint8Array.fromBase64) {
					return Uint8Array.fromBase64(e);
				}
				const t = atob(e);
				const r = new Uint8Array(t.length);
				for (let e = 0; e < t.length; e++) {
					r[e] = t.charCodeAt(e);
				}
				return r;
			})(t);
		} catch {
			throw new TypeError("The input to be decoded is not correctly encoded.");
		}
	}
	class Ff extends Error {
		static code = "ERR_JOSE_GENERIC";
		code = "ERR_JOSE_GENERIC";
		constructor(e, t) {
			super(e, t);
			this.name = this.constructor.name;
			Error.captureStackTrace?.(this, this.constructor);
		}
	}
	class Mf extends Ff {
		static code = "ERR_JOSE_NOT_SUPPORTED";
		code = "ERR_JOSE_NOT_SUPPORTED";
	}
	class Hf extends Ff {
		static code = "ERR_JWS_INVALID";
		code = "ERR_JWS_INVALID";
	}
	class Kf extends Ff {
		static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
		code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
		constructor(e = "signature verification failed", t) {
			super(e, t);
		}
	}
	function $f(e, t = "algorithm.name") {
		return new TypeError(
			`CryptoKey does not support this operation, its ${t} must be ${e}`,
		);
	}
	function Gf(e, t) {
		return e.name === t;
	}
	function Wf(e) {
		return parseInt(e.name.slice(4), 10);
	}
	function Yf(e, t, ...r) {
		if ((r = r.filter(Boolean)).length > 2) {
			const t = r.pop();
			e += `one of type ${r.join(", ")}, or ${t}.`;
		} else if (r.length === 2) {
			e += `one of type ${r[0]} or ${r[1]}.`;
		} else {
			e += `of type ${r[0]}.`;
		}
		if (t == null) {
			e += ` Received ${t}`;
		} else if (typeof t == "function" && t.name) {
			e += ` Received function ${t.name}`;
		} else if (typeof t == "object" && t != null && t.constructor?.name) {
			e += ` Received an instance of ${t.constructor.name}`;
		}
		return e;
	}
	function Jf(e, t, ...r) {
		return Yf(`Key for the ${e} algorithm must be `, t, ...r);
	}
	function zf(e) {
		return e?.[Symbol.toStringTag] === "CryptoKey";
	}
	function Xf(e) {
		return e?.[Symbol.toStringTag] === "KeyObject";
	}
	var qf = (e) => zf(e) || Xf(e);
	var Qf = (e) => {
		if (
			!(function (e) {
				return typeof e == "object" && e !== null;
			})(e) ||
			Object.prototype.toString.call(e) !== "[object Object]"
		) {
			return false;
		}
		if (Object.getPrototypeOf(e) === null) {
			return true;
		}
		let t = e;
		while (Object.getPrototypeOf(t) !== null) {
			t = Object.getPrototypeOf(t);
		}
		return Object.getPrototypeOf(e) === t;
	};
	function Zf(e) {
		return Qf(e) && typeof e.kty == "string";
	}
	let ed;
	const td = async (e, t, r, n = false) => {
		ed ||= new WeakMap();
		let i = ed.get(e);
		if (i?.[r]) {
			return i[r];
		}
		const o = await (async (e) => {
			if (!e.alg) {
				throw new TypeError(
					'"alg" argument is required when "jwk.alg" is not present',
				);
			}
			const { algorithm: t, keyUsages: r } = (function (e) {
				let t;
				let r;
				switch (e.kty) {
					case "RSA":
						switch (e.alg) {
							case "PS256":
							case "PS384":
							case "PS512":
								t = {
									name: "RSA-PSS",
									hash: `SHA-${e.alg.slice(-3)}`,
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "RS256":
							case "RS384":
							case "RS512":
								t = {
									name: "RSASSA-PKCS1-v1_5",
									hash: `SHA-${e.alg.slice(-3)}`,
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "RSA-OAEP":
							case "RSA-OAEP-256":
							case "RSA-OAEP-384":
							case "RSA-OAEP-512":
								t = {
									name: "RSA-OAEP",
									hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`,
								};
								r = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
								break;
							default:
								throw new Mf(
									'Invalid or unsupported JWK "alg" (Algorithm) Parameter value',
								);
						}
						break;
					case "EC":
						switch (e.alg) {
							case "ES256":
								t = {
									name: "ECDSA",
									namedCurve: "P-256",
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "ES384":
								t = {
									name: "ECDSA",
									namedCurve: "P-384",
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "ES512":
								t = {
									name: "ECDSA",
									namedCurve: "P-521",
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "ECDH-ES":
							case "ECDH-ES+A128KW":
							case "ECDH-ES+A192KW":
							case "ECDH-ES+A256KW":
								t = {
									name: "ECDH",
									namedCurve: e.crv,
								};
								r = e.d ? ["deriveBits"] : [];
								break;
							default:
								throw new Mf(
									'Invalid or unsupported JWK "alg" (Algorithm) Parameter value',
								);
						}
						break;
					case "OKP":
						switch (e.alg) {
							case "Ed25519":
							case "EdDSA":
								t = {
									name: "Ed25519",
								};
								r = e.d ? ["sign"] : ["verify"];
								break;
							case "ECDH-ES":
							case "ECDH-ES+A128KW":
							case "ECDH-ES+A192KW":
							case "ECDH-ES+A256KW":
								t = {
									name: e.crv,
								};
								r = e.d ? ["deriveBits"] : [];
								break;
							default:
								throw new Mf(
									'Invalid or unsupported JWK "alg" (Algorithm) Parameter value',
								);
						}
						break;
					default:
						throw new Mf(
							'Invalid or unsupported JWK "kty" (Key Type) Parameter value',
						);
				}
				return {
					algorithm: t,
					keyUsages: r,
				};
			})(e);
			const n = {
				...e,
			};
			delete n.alg;
			delete n.use;
			return crypto.subtle.importKey(
				"jwk",
				n,
				t,
				e.ext ?? !e.d,
				e.key_ops ?? r,
			);
		})({
			...t,
			alg: r,
		});
		if (n) {
			Object.freeze(e);
		}
		if (i) {
			i[r] = o;
		} else {
			ed.set(e, {
				[r]: o,
			});
		}
		return o;
	};
	const rd = (e) => e?.[Symbol.toStringTag];
	const nd = (e, t, r) => {
		if (t.use !== undefined) {
			let e;
			switch (r) {
				case "sign":
				case "verify":
					e = "sig";
					break;
				case "encrypt":
				case "decrypt":
					e = "enc";
			}
			if (t.use !== e) {
				throw new TypeError(
					`Invalid key for this operation, its "use" must be "${e}" when present`,
				);
			}
		}
		if (t.alg !== undefined && t.alg !== e) {
			throw new TypeError(
				`Invalid key for this operation, its "alg" must be "${e}" when present`,
			);
		}
		if (Array.isArray(t.key_ops)) {
			let n;
			switch (true) {
				case r === "verify":
				case e === "dir":
				case e.includes("CBC-HS"):
					n = r;
					break;
				case e.startsWith("PBES2"):
					n = "deriveBits";
					break;
				case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e):
					n = !e.includes("GCM") && e.endsWith("KW") ? "unwrapKey" : r;
					break;
				case r === "encrypt":
					n = "wrapKey";
					break;
				case r === "decrypt":
					n = e.startsWith("RSA") ? "unwrapKey" : "deriveBits";
			}
			if (n && t.key_ops?.includes?.(n) === false) {
				throw new TypeError(
					`Invalid key for this operation, its "key_ops" must include "${n}" when present`,
				);
			}
		}
		return true;
	};
	var id;
	var od = async (e, t, r) => {
		if (t instanceof Uint8Array) {
			if (!e.startsWith("HS")) {
				throw new TypeError(
					Yf("Key must be ", t, "CryptoKey", "KeyObject", "JSON Web Key"),
				);
			}
			return crypto.subtle.importKey(
				"raw",
				t,
				{
					hash: `SHA-${e.slice(-3)}`,
					name: "HMAC",
				},
				false,
				[r],
			);
		}
		(function (e, t, r) {
			switch (t) {
				case "HS256":
				case "HS384":
				case "HS512": {
					if (!Gf(e.algorithm, "HMAC")) {
						throw $f("HMAC");
					}
					const r = parseInt(t.slice(2), 10);
					if (Wf(e.algorithm.hash) !== r) {
						throw $f(`SHA-${r}`, "algorithm.hash");
					}
					break;
				}
				case "RS256":
				case "RS384":
				case "RS512": {
					if (!Gf(e.algorithm, "RSASSA-PKCS1-v1_5")) {
						throw $f("RSASSA-PKCS1-v1_5");
					}
					const r = parseInt(t.slice(2), 10);
					if (Wf(e.algorithm.hash) !== r) {
						throw $f(`SHA-${r}`, "algorithm.hash");
					}
					break;
				}
				case "PS256":
				case "PS384":
				case "PS512": {
					if (!Gf(e.algorithm, "RSA-PSS")) {
						throw $f("RSA-PSS");
					}
					const r = parseInt(t.slice(2), 10);
					if (Wf(e.algorithm.hash) !== r) {
						throw $f(`SHA-${r}`, "algorithm.hash");
					}
					break;
				}
				case "Ed25519":
				case "EdDSA":
					if (!Gf(e.algorithm, "Ed25519")) {
						throw $f("Ed25519");
					}
					break;
				case "ES256":
				case "ES384":
				case "ES512": {
					if (!Gf(e.algorithm, "ECDSA")) {
						throw $f("ECDSA");
					}
					const r = (function (e) {
						switch (e) {
							case "ES256":
								return "P-256";
							case "ES384":
								return "P-384";
							case "ES512":
								return "P-521";
							default:
								throw new Error("unreachable");
						}
					})(t);
					if (e.algorithm.namedCurve !== r) {
						throw $f(r, "algorithm.namedCurve");
					}
					break;
				}
				default:
					throw new TypeError("CryptoKey does not support this operation");
			}
			(function (e, t) {
				if (!e.usages.includes(t)) {
					throw new TypeError(
						`CryptoKey does not support this operation, its usages must include ${t}.`,
					);
				}
			})(e, r);
		})(t, e, r);
		return t;
	};
	async function sd(e, t, r) {
		if (!Qf(e)) {
			throw new Hf("Flattened JWS must be an object");
		}
		if (e.protected === undefined && e.header === undefined) {
			throw new Hf(
				'Flattened JWS must have either of the "protected" or "header" members',
			);
		}
		if (e.protected !== undefined && typeof e.protected != "string") {
			throw new Hf("JWS Protected Header incorrect type");
		}
		if (e.payload === undefined) {
			throw new Hf("JWS Payload missing");
		}
		if (typeof e.signature != "string") {
			throw new Hf("JWS Signature missing or incorrect type");
		}
		if (e.header !== undefined && !Qf(e.header)) {
			throw new Hf("JWS Unprotected Header incorrect type");
		}
		let n = {};
		if (e.protected) {
			try {
				const t = Lf(e.protected);
				n = JSON.parse(jf.decode(t));
			} catch {
				throw new Hf("JWS Protected Header is invalid");
			}
		}
		if (
			!((...e) => {
				const t = e.filter(Boolean);
				if (t.length === 0 || t.length === 1) {
					return true;
				}
				let r;
				for (const e of t) {
					const t = Object.keys(e);
					if (r && r.size !== 0) {
						for (const e of t) {
							if (r.has(e)) {
								return false;
							}
							r.add(e);
						}
					} else {
						r = new Set(t);
					}
				}
				return true;
			})(n, e.header)
		) {
			throw new Hf(
				"JWS Protected and JWS Unprotected Header Parameter names must be disjoint",
			);
		}
		const i = {
			...n,
			...e.header,
		};
		const o = ((e, t, r, n, i) => {
			if (i.crit !== undefined && n?.crit === undefined) {
				throw new e(
					'"crit" (Critical) Header Parameter MUST be integrity protected',
				);
			}
			if (!n || n.crit === undefined) {
				return new Set();
			}
			if (
				!Array.isArray(n.crit) ||
				n.crit.length === 0 ||
				n.crit.some((e) => typeof e != "string" || e.length === 0)
			) {
				throw new e(
					'"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present',
				);
			}
			let o;
			o = t;
			for (const t of n.crit) {
				if (!o.has(t)) {
					throw new Mf(`Extension Header Parameter "${t}" is not recognized`);
				}
				if (i[t] === undefined) {
					throw new e(`Extension Header Parameter "${t}" is missing`);
				}
				if (o.get(t) && n[t] === undefined) {
					throw new e(
						`Extension Header Parameter "${t}" MUST be integrity protected`,
					);
				}
			}
			return new Set(n.crit);
		})(Hf, new Map([["b64", true]]), 0, n, i);
		let s = true;
		if (o.has("b64") && ((s = n.b64), typeof s != "boolean")) {
			throw new Hf(
				'The "b64" (base64url-encode payload) Header Parameter must be a boolean',
			);
		}
		const { alg: a } = i;
		if (typeof a != "string" || !a) {
			throw new Hf('JWS "alg" (Algorithm) Header Parameter missing or invalid');
		}
		if (s) {
			if (typeof e.payload != "string") {
				throw new Hf("JWS Payload must be a string");
			}
		} else if (
			typeof e.payload != "string" &&
			!(e.payload instanceof Uint8Array)
		) {
			throw new Hf("JWS Payload must be a string or an Uint8Array instance");
		}
		let c = false;
		if (typeof t == "function") {
			t = await t(n, e);
			c = true;
		}
		((e, t, r) => {
			if (
				e.startsWith("HS") ||
				e === "dir" ||
				e.startsWith("PBES2") ||
				/^A(?:128|192|256)(?:GCM)?(?:KW)?$/.test(e) ||
				/^A(?:128|192|256)CBC-HS(?:256|384|512)$/.test(e)
			) {
				((e, t, r) => {
					if (!(t instanceof Uint8Array)) {
						if (Zf(t)) {
							if (
								(function (e) {
									return e.kty === "oct" && typeof e.k == "string";
								})(t) &&
								nd(e, t, r)
							) {
								return;
							}
							throw new TypeError(
								'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present',
							);
						}
						if (!qf(t)) {
							throw new TypeError(
								Jf(
									e,
									t,
									"CryptoKey",
									"KeyObject",
									"JSON Web Key",
									"Uint8Array",
								),
							);
						}
						if (t.type !== "secret") {
							throw new TypeError(
								`${rd(t)} instances for symmetric algorithms must be of type "secret"`,
							);
						}
					}
				})(e, t, r);
			} else {
				((e, t, r) => {
					if (Zf(t)) {
						switch (r) {
							case "decrypt":
							case "sign":
								if (
									(function (e) {
										return e.kty !== "oct" && typeof e.d == "string";
									})(t) &&
									nd(e, t, r)
								) {
									return;
								}
								throw new TypeError(
									"JSON Web Key for this operation be a private JWK",
								);
							case "encrypt":
							case "verify":
								if (
									(function (e) {
										return e.kty !== "oct" && e.d === undefined;
									})(t) &&
									nd(e, t, r)
								) {
									return;
								}
								throw new TypeError(
									"JSON Web Key for this operation be a public JWK",
								);
						}
					}
					if (!qf(t)) {
						throw new TypeError(
							Jf(e, t, "CryptoKey", "KeyObject", "JSON Web Key"),
						);
					}
					if (t.type === "secret") {
						throw new TypeError(
							`${rd(t)} instances for asymmetric algorithms must not be of type "secret"`,
						);
					}
					if (t.type === "public") {
						switch (r) {
							case "sign":
								throw new TypeError(
									`${rd(t)} instances for asymmetric algorithm signing must be of type "private"`,
								);
							case "decrypt":
								throw new TypeError(
									`${rd(t)} instances for asymmetric algorithm decryption must be of type "private"`,
								);
						}
					}
					if (t.type === "private") {
						switch (r) {
							case "verify":
								throw new TypeError(
									`${rd(t)} instances for asymmetric algorithm verifying must be of type "public"`,
								);
							case "encrypt":
								throw new TypeError(
									`${rd(t)} instances for asymmetric algorithm encryption must be of type "public"`,
								);
						}
					}
				})(e, t, r);
			}
		})(a, t, "verify");
		const l = (function (...e) {
			const t = e.reduce((e, { length: t }) => e + t, 0);
			const r = new Uint8Array(t);
			let n = 0;
			for (const t of e) {
				r.set(t, n);
				n += t.length;
			}
			return r;
		})(
			Vf.encode(e.protected ?? ""),
			Vf.encode("."),
			typeof e.payload == "string" ? Vf.encode(e.payload) : e.payload,
		);
		let u;
		try {
			u = Lf(e.signature);
		} catch {
			throw new Hf("Failed to base64url decode the signature");
		}
		const p = await (async (e, t) => {
			if (e instanceof Uint8Array) {
				return e;
			}
			if (zf(e)) {
				return e;
			}
			if (Xf(e)) {
				if (e.type === "secret") {
					return e.export();
				}
				if ("toCryptoKey" in e && typeof e.toCryptoKey == "function") {
					try {
						return ((e, t) => {
							ed ||= new WeakMap();
							let r = ed.get(e);
							if (r?.[t]) {
								return r[t];
							}
							const n = e.type === "public";
							const i = !!n;
							let o;
							if (e.asymmetricKeyType === "x25519") {
								switch (t) {
									case "ECDH-ES":
									case "ECDH-ES+A128KW":
									case "ECDH-ES+A192KW":
									case "ECDH-ES+A256KW":
										break;
									default:
										throw new TypeError(
											"given KeyObject instance cannot be used for this algorithm",
										);
								}
								o = e.toCryptoKey(
									e.asymmetricKeyType,
									i,
									n ? [] : ["deriveBits"],
								);
							}
							if (e.asymmetricKeyType === "ed25519") {
								if (t !== "EdDSA" && t !== "Ed25519") {
									throw new TypeError(
										"given KeyObject instance cannot be used for this algorithm",
									);
								}
								o = e.toCryptoKey(e.asymmetricKeyType, i, [
									n ? "verify" : "sign",
								]);
							}
							if (e.asymmetricKeyType === "rsa") {
								let r;
								switch (t) {
									case "RSA-OAEP":
										r = "SHA-1";
										break;
									case "RS256":
									case "PS256":
									case "RSA-OAEP-256":
										r = "SHA-256";
										break;
									case "RS384":
									case "PS384":
									case "RSA-OAEP-384":
										r = "SHA-384";
										break;
									case "RS512":
									case "PS512":
									case "RSA-OAEP-512":
										r = "SHA-512";
										break;
									default:
										throw new TypeError(
											"given KeyObject instance cannot be used for this algorithm",
										);
								}
								if (t.startsWith("RSA-OAEP")) {
									return e.toCryptoKey(
										{
											name: "RSA-OAEP",
											hash: r,
										},
										i,
										n ? ["encrypt"] : ["decrypt"],
									);
								}
								o = e.toCryptoKey(
									{
										name: t.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
										hash: r,
									},
									i,
									[n ? "verify" : "sign"],
								);
							}
							if (e.asymmetricKeyType === "ec") {
								const r = new Map([
									["prime256v1", "P-256"],
									["secp384r1", "P-384"],
									["secp521r1", "P-521"],
								]).get(e.asymmetricKeyDetails?.namedCurve);
								if (!r) {
									throw new TypeError(
										"given KeyObject instance cannot be used for this algorithm",
									);
								}
								if (t === "ES256" && r === "P-256") {
									o = e.toCryptoKey(
										{
											name: "ECDSA",
											namedCurve: r,
										},
										i,
										[n ? "verify" : "sign"],
									);
								}
								if (t === "ES384" && r === "P-384") {
									o = e.toCryptoKey(
										{
											name: "ECDSA",
											namedCurve: r,
										},
										i,
										[n ? "verify" : "sign"],
									);
								}
								if (t === "ES512" && r === "P-521") {
									o = e.toCryptoKey(
										{
											name: "ECDSA",
											namedCurve: r,
										},
										i,
										[n ? "verify" : "sign"],
									);
								}
								if (t.startsWith("ECDH-ES")) {
									o = e.toCryptoKey(
										{
											name: "ECDH",
											namedCurve: r,
										},
										i,
										n ? [] : ["deriveBits"],
									);
								}
							}
							if (!o) {
								throw new TypeError(
									"given KeyObject instance cannot be used for this algorithm",
								);
							}
							if (r) {
								r[t] = o;
							} else {
								ed.set(e, {
									[t]: o,
								});
							}
							return o;
						})(e, t);
					} catch (e) {
						if (e instanceof TypeError) {
							throw e;
						}
					}
				}
				let r = e.export({
					format: "jwk",
				});
				return td(e, r, t);
			}
			if (Zf(e)) {
				if (e.k) {
					return Lf(e.k);
				} else {
					return td(e, e, t, true);
				}
			}
			throw new Error("unreachable");
		})(t, a);
		if (
			!(await (async (e, t, r, n) => {
				const i = await od(e, t, "verify");
				((e, t) => {
					if (e.startsWith("RS") || e.startsWith("PS")) {
						const { modulusLength: r } = t.algorithm;
						if (typeof r != "number" || r < 2048) {
							throw new TypeError(
								`${e} requires key modulusLength to be 2048 bits or larger`,
							);
						}
					}
				})(e, i);
				const o = ((e, t) => {
					const r = `SHA-${e.slice(-3)}`;
					switch (e) {
						case "HS256":
						case "HS384":
						case "HS512":
							return {
								hash: r,
								name: "HMAC",
							};
						case "PS256":
						case "PS384":
						case "PS512":
							return {
								hash: r,
								name: "RSA-PSS",
								saltLength: parseInt(e.slice(-3), 10) >> 3,
							};
						case "RS256":
						case "RS384":
						case "RS512":
							return {
								hash: r,
								name: "RSASSA-PKCS1-v1_5",
							};
						case "ES256":
						case "ES384":
						case "ES512":
							return {
								hash: r,
								name: "ECDSA",
								namedCurve: t.namedCurve,
							};
						case "Ed25519":
						case "EdDSA":
							return {
								name: "Ed25519",
							};
						default:
							throw new Mf(
								`alg ${e} is not supported either by JOSE or your javascript runtime`,
							);
					}
				})(e, i.algorithm);
				try {
					return await crypto.subtle.verify(o, i, r, n);
				} catch {
					return false;
				}
			})(a, p, u, l))
		) {
			throw new Kf();
		}
		let h;
		if (s) {
			try {
				h = Lf(e.payload);
			} catch {
				throw new Hf("Failed to base64url decode the payload");
			}
		} else {
			h = typeof e.payload == "string" ? Vf.encode(e.payload) : e.payload;
		}
		const f = {
			payload: h,
		};
		if (e.protected !== undefined) {
			f.protectedHeader = n;
		}
		if (e.header !== undefined) {
			f.unprotectedHeader = e.header;
		}
		if (c) {
			return {
				...f,
				key: p,
			};
		} else {
			return f;
		}
	}
	(function (e) {
		e.InsecureContext = "verify_insecure_context";
		e.CertificateChainEmpty = "verify_certificate_chain_empty";
		e.CertificateChainNotTrusted = "verify_certificate_chain_not_trusted";
		e.SignatureInvalid = "verify_signature_invalid";
		e.PrefixMismatch = "verify_prefix_mismatch";
		e.FormatInvalid = "verify_format_invalid";
	})((id ||= {}));
	const ad = async (e) => {
		const t = ((e) => {
			const { hasGplTag: t, version: r, payload: n } = e;
			const { editorGpl: i, editorMajorVersion: o } = n;
			if (i === t && r === o) {
				return {
					verified: true,
				};
			} else {
				return {
					verified: false,
					type: id.PrefixMismatch,
					message: "",
				};
			}
		})(e);
		if (t.verified) {
			return (async (e) => {	
				return {
					verified: true,
				};
			})(e.jws);
		} else {
			return t;
		}
	};
	const _0x45bee1 = (_0x1253b1, _0x4653b6) =>
		!_0x1253b1 || !_0x4653b6 || _0x1253b1 === _0x4653b6;
	const _0x577a62 = (_0x189836, _0x502655) =>
		!i(_0x502655) || _0x189836 < _0x502655;
	var _0x2c1d30;
	var _0x477fec;
	var _0x1e6715;
	(function (_0x3928fb) {
		_0x3928fb.InvalidEditorMajorVersion = "validate_editor_major_version";
		_0x3928fb.InvalidEditorVersion = "validate_editor_version";
		_0x3928fb.InvalidEditorUid = "validate_editor_uid";
		_0x3928fb.InvalidPageUid = "validate_page_uid";
		_0x3928fb.InvalidOrigin = "validate_origin";
	})((_0x2c1d30 ||= {}));
	(function (_0x59eb1b) {
		_0x59eb1b.InvalidSoftExpiration = "validate_soft_expiration";
		_0x59eb1b.InvalidHardExpiration = "validate_hard_expiration";
	})((_0x477fec ||= {}));
	(function (_0x217f7b) {
		_0x217f7b.InvalidPlugin = "validate_plugin";
	})((_0x1e6715 ||= {}));
	const _0x536327 = (_0x393fb8, _0x4dfd99) => {
		const _0x49d8d6 = _0x4dfd99.tinymceVersion;
		const _0x141442 = _0x393fb8.editorMajorVersion;
		if (
			!((_0x8af806, _0x4bd9d3) =>
				_0x8af806 !== 0 && _0x4bd9d3 !== 0 && _0x8af806 === _0x4bd9d3)(
				_0x49d8d6.major,
				_0x141442,
			)
		) {
			return {
				validated: false,
				type: _0x2c1d30.InvalidEditorMajorVersion,
				message: "",
			};
		}
		if (
			!((_0xe6157d, _0x70ddd6, _0x392a25) =>
				(_0x392a25.length === 0 && _0x70ddd6 === _0xe6157d.major) ||
				f(_0x392a25, (_0x2efacb) => {
					const _0x261f06 = _0x2efacb.versionRestriction;
					switch (_0x261f06.case) {
						case "patchVersion": {
							const { minor: _0x1df06c, patch: _0x2d3842 } = _0x261f06.value;
							const _0x32ce0a = O(_0x70ddd6, _0x1df06c, _0x2d3842);
							return B(_0xe6157d, _0x32ce0a);
						}
						case "minorVersion": {
							const { minor: _0x44461d } = _0x261f06.value;
							const _0x5dbe1a = O(_0x70ddd6, _0x44461d, 0);
							const _0x24e08f = O(_0xe6157d.major, _0xe6157d.minor, 0);
							return B(_0x24e08f, _0x5dbe1a);
						}
						default:
							return true;
					}
				}))(_0x49d8d6, _0x141442, _0x393fb8.editorVersions)
		) {
			return {
				validated: false,
				type: _0x2c1d30.InvalidEditorVersion,
				message: "",
			};
		}
		const _0x58e113 = _0x4dfd99.editorUid;
		const _0x28bc4a = _0x393fb8.editorUid;
		if (!_0x45bee1(_0x58e113, _0x28bc4a)) {
			return {
				validated: false,
				type: _0x2c1d30.InvalidEditorUid,
				message: "",
			};
		}
		const _0x568569 = _0x4dfd99.pageUid;
		const _0x1527e4 = _0x393fb8.pageUid;
		if (!_0x45bee1(_0x568569, _0x1527e4)) {
			return {
				validated: false,
				type: _0x2c1d30.InvalidPageUid,
				message: "",
			};
		}
		if (
			((_0x152574, _0x2cb87d) =>
				_0x2cb87d.length === 0 ||
				f(_0x2cb87d, (_0x35f338) => {
					switch (_0x35f338.matchPattern.case) {
						case "exact": {
							const _0x20f36c = _0x35f338.matchPattern.value;
							return _0x152574 === _0x20f36c;
						}
						case "regexp": {
							const _0x3cd571 = _0x35f338.matchPattern.value;
							return _0x2a81b9(
								() =>
									((_0x241df2) => {
										_0x352398 = _0x241df2.split("");
										_0x4fc01b = (_0x2b03ae, _0x35a7fe) => {
											const {
												result: _0x40e8c2,
												inClass: _0x2ea9c9,
												inEscape: _0x22f49f,
											} = _0x2b03ae;
											if (_0x22f49f) {
												return {
													result: _0x40e8c2 + _0x35a7fe,
													inClass: _0x2ea9c9,
													inEscape: false,
												};
											} else if (_0x35a7fe === "\\") {
												return {
													result: _0x40e8c2 + _0x35a7fe,
													inClass: _0x2ea9c9,
													inEscape: true,
												};
											} else if (_0x35a7fe === "[") {
												return {
													result: _0x40e8c2 + _0x35a7fe,
													inClass: true,
													inEscape: _0x22f49f,
												};
											} else if (_0x35a7fe === "]") {
												return {
													result: _0x40e8c2 + _0x35a7fe,
													inClass: false,
													inEscape: _0x22f49f,
												};
											} else if (_0x35a7fe !== "." || _0x2ea9c9) {
												return {
													result: _0x40e8c2 + _0x35a7fe,
													inClass: _0x2ea9c9,
													inEscape: _0x22f49f,
												};
											} else {
												return {
													result: _0x40e8c2 + "[^\\n\\r]",
													inClass: _0x2ea9c9,
													inEscape: _0x22f49f,
												};
											}
										};
										_0x27741f = {
											result: "",
											inClass: false,
											inEscape: false,
										};
										((_0x3808d8, _0x1acf80) => {
											for (
												let _0x24fe34 = 0, _0x12294d = _0x3808d8.length;
												_0x24fe34 < _0x12294d;
												_0x24fe34++
											) {
												_0x1acf80(_0x3808d8[_0x24fe34], _0x24fe34);
											}
										})(_0x352398, (_0x3b8cd0, _0x504618) => {
											_0x27741f = _0x4fc01b(_0x27741f, _0x3b8cd0);
										});
										const _0x5eae00 = _0x27741f;
										var _0x352398;
										var _0x4fc01b;
										var _0x27741f;
										return new RegExp(`^(?:${_0x5eae00.result})$`, "u");
									})(_0x3cd571).test(_0x152574),
								() => new Error("Unable to test regexp origin"),
							).getOr(false);
						}
						default:
							return true;
					}
				}))(_0x4dfd99.originUrl, _0x393fb8.origins)
		) {
			return {
				validated: true,
			};
		} else {
			return {
				validated: false,
				type: _0x2c1d30.InvalidOrigin,
				message: "",
			};
		}
	};
	const _0x18b803 = new WeakMap();
	const _0x291e8e = (_0x5f0ff5) => {
		if (n(_0x5f0ff5)) {
			return ((_0x339240 = _0x5f0ff5),
			(_0x1f822c = "plugin"),
			((_0x46c16c, _0x265457) => y.call(_0x46c16c, _0x265457))(
				_0x339240,
				_0x1f822c,
			)
				? p.from(_0x339240[_0x1f822c])
				: p.none()).filter((_0x3c3cbb) => r(_0x3c3cbb) && _0x3c3cbb.length > 0);
		} else {
			return p.none();
		}
		var _0x339240;
		var _0x1f822c;
	};
	const _0x299767 = (_0x5745ed, _0x1354e4 = true) =>
		`${_0x5745ed}${_0x1354e4 ? " Read more: https://www.tiny.cloud/docs/tinymce/latest/license-key/" : ""}`;
	const _0x2de547 = (_0x31e2bf, _0x782fba) => {
		const _0x1abdb2 =
			"The editor is disabled because the license key provided is invalid";
		A(_0x31e2bf, {
			console: {
				type: "error",
				message: _0x299767(`${_0x1abdb2} [${_0x782fba}].`),
			},
			editor: {
				type: "warning",
				message: `${_0x1abdb2}.`,
			},
		});
	};
	const _0x10f8e0 = async (_0xcb6f8e, _0x321cc6) =>
		(async (_0x56f24e) =>
			_0x56e779(_0x56f24e).fold(
				(_0x110201) => Promise.resolve(v.error(_0x110201)),
				(_0x2541f0) =>
					ad(_0x2541f0).then((_0x51fdee) =>
						_0x51fdee.verified || _0x51fdee.type === id.InsecureContext
							? v.value(_0x2541f0.payload)
							: v.error({
									type: _0x51fdee.type,
									message: _0x51fdee.message,
								}),
					),
			))(_0x321cc6).then((_0x5b2c17) =>
			_0x5b2c17.fold(
				(_0x235424) => {
					_0x2de547(_0xcb6f8e, _0x235424.type);
					return p.none();
				},
				(_0x2770a0) => p.some(_0x2770a0),
			),
		);
	const _0x2e3971 = (_0x5d3079, _0x13605a) => {
		const _0x59017a = ((_0x2b7f33) => {
			const _0x8930e6 = {
				currentDate: new Date(),
			}.currentDate;
			if (
				p
					.from(_0x2b7f33.expiration)
					.bind(_0x3a8ac5)
					.exists((_0x963364) => !_0x577a62(_0x8930e6, _0x963364))
			) {
				return {
					validated: false,
					type: _0x477fec.InvalidHardExpiration,
					message: "",
				};
			} else if (
				p
					.from(_0x2b7f33.expiration?.start)
					.exists((_0x5db6ca) => !_0x577a62(_0x8930e6, _0x5db6ca))
			) {
				return {
					validated: false,
					type: _0x477fec.InvalidSoftExpiration,
					message: "",
				};
			} else {
				return {
					validated: true,
				};
			}
		})(_0x13605a);
		if (_0x59017a.validated) {
			return "not_expired";
		}
		switch (_0x59017a.type) {
			case _0x477fec.InvalidSoftExpiration:
				((_0x185106) => {
					const _0x2c3750 =
						"The editor will be disabled in the near future because the license key has expired.";
					A(_0x185106, {
						console: {
							type: "warn",
							message: _0x299767(_0x2c3750),
						},
						editor: {
							type: "warning",
							message: _0x2c3750,
						},
					});
				})(_0x5d3079);
				return "not_expired";
			case _0x477fec.InvalidHardExpiration:
				((_0xa9dc27) => {
					const _0x34048a =
						"The editor is disabled because the license key has expired and is no longer valid.";
					A(_0xa9dc27, {
						console: {
							type: "error",
							message: _0x299767(_0x34048a),
						},
						editor: {
							type: "warning",
							message: _0x34048a,
						},
					});
				})(_0x5d3079);
				return "expired";
		}
	};
	const _0x49ca4c = (_0x369f2d, _0x53b455) => {
		const _0x32e4e5 = {
			tinymceVersion: _0x2c56ee(tinymce),
			originUrl: window.origin,
			editorUid: _0x369f2d.editorUid,
			pageUid: _0x369f2d.editorManager.pageUid,
		};
		const _0x5694a1 = _0x536327(_0x53b455, _0x32e4e5);
		if (_0x5694a1.validated) {
			return true;
		}
		switch (_0x5694a1.type) {
			case _0x2c1d30.InvalidEditorMajorVersion:
			case _0x2c1d30.InvalidEditorVersion:
				((_0x211012) => {
					const _0x5df8da =
						"The editor is disabled because the license key is not valid with this version of TinyMCE.";
					A(_0x211012, {
						console: {
							type: "error",
							message: _0x299767(_0x5df8da),
						},
						editor: {
							type: "warning",
							message: _0x5df8da,
						},
					});
				})(_0x369f2d);
				break;
			default:
				_0x2de547(_0x369f2d, _0x5694a1.type);
		}
		return false;
	};
	const _0x46a9be = (_0x4c03e5, _0x598e62, _0x433fcd, _0x192d9b) => {
		const _0x461626 = {
			pluginCode: _0x598e62,
		};
		const { validated: _0x4a1e42 } = ((_0xf2e34f, _0x249148) => {
			const _0x536456 = d(_0xf2e34f.plugins, _0xf6e815);
			const _0x4dd691 = ((_0x3d8044, _0x1a2aa6) => {
				const _0xdad5ac = new Set(_0x1a2aa6);
				return !!_0xdad5ac.has("ALL") || _0xdad5ac.has(_0x3d8044.toUpperCase());
			})(_0x249148.pluginCode, _0x536456);
			if (_0x4dd691) {
				return {
					validated: true,
				};
			} else {
				return {
					validated: false,
					type: _0x1e6715.InvalidPlugin,
					message: "",
				};
			}
		})(_0x433fcd, _0x461626);
		if (!_0x4a1e42) {
			((_0xff3731, _0x43ff02, _0x35a532) => {
				A(_0xff3731, {
					console: {
						type: "error",
						message: _0x299767(
							`The "${_0x43ff02}" plugin requires a valid TinyMCE license key.`,
						),
					},
					...(_0x35a532
						? {}
						: {
								editor: {
									type: "warning",
									message:
										"One or more premium plugins are disabled due to license key restrictions.",
								},
							}),
				});
			})(_0x4c03e5, _0x598e62, _0x192d9b.get());
			_0x192d9b.set(true);
		}
		return _0x4a1e42;
	};
	if (
		((_0xfa0676, _0x10d0d3) =>
			_0x3040cd(_0xfa0676, _0x3c7e1e)
				? (console.error(
						`The "${_0x10d0d3}" plugin requires at least version ${_0x3c7e1e} of TinyMCE.`,
					),
					false)
				: !!_0x3040cd(_0xfa0676, _0x4736ec) ||
					(console.error(
						`The "${_0x10d0d3}" plugin requires at least version ${_0x3c7e1e} of TinyMCE but less than ${_0x4736ec}.`,
					),
					false))(tinymce, "licensekeymanager")
	) {
		tinymce.Resource.add("licensekeymanager.6nle0b3ulk", (_0x56d10a) => {
			const _0x4714f2 = E(_0x10f8e0);
			const _0x96b4f6 = E(_0x49ca4c);
			const _0x1d50a6 = E(_0x2e3971);
			const _0x578f82 = (() => {
				let _0x298390 = false;
				return {
					get: () => _0x298390,
					set: (_0x124d64) => {
						_0x298390 = _0x124d64;
					},
				};
			})();
			return {
				validate: async (_0x2611e1, _0x12b763) =>
					_0x4714f2(_0x56d10a, _0x2611e1).then((_0x46ffcf) =>
						_0x46ffcf
							.bind((_0x3503ad) => {
								const _0x5f00bd = _0x1d50a6(_0x56d10a, _0x3503ad);
								return b(_0x5f00bd !== "expired", _0x3503ad);
							})
							.bind((_0x44d23c) => {
								const _0x5c073d = _0x96b4f6(_0x56d10a, _0x44d23c);
								return b(_0x5c073d, _0x44d23c);
							})
							.fold(
								() =>
									((_0xaa1c02) => {
										((_0x4fa474) => {
											if (!_0x18b803.has(_0x4fa474)) {
												_0x18b803.set(_0x4fa474, true);
												if (_0x4fa474.initialized) {
													if (!_0x4fa474.removed) {
														_0x4fa474.mode.set("readonly");
													}
													_0x4fa474.options.set("disabled", true);
												} else {
													_0x4fa474.on("init", () => {
														if (!_0x4fa474.removed) {
															_0x4fa474.mode.set("readonly");
														}
														_0x4fa474.options.set("disabled", true);
													});
												}
												_0x4fa474.on(
													"DisabledStateChange",
													(_0xf94b39) => {
														const { state: _0x5d2403 } = _0xf94b39;
														if (!_0x5d2403) {
															_0xf94b39.preventDefault();
														}
													},
													true,
												);
												_0x4fa474.on("SwitchMode", (_0x533b20) => {
													const { mode: _0x49baa9 } = _0x533b20;
													if (_0x49baa9 !== "readonly") {
														_0x4fa474.mode.set("readonly");
													}
												});
											}
										})(_0xaa1c02);
										return false;
									})(_0x56d10a),
								(_0x8471a4) =>
									_0x291e8e(_0x12b763).forall((_0x3d2440) =>
										_0x46a9be(_0x56d10a, _0x3d2440, _0x8471a4, _0x578f82),
									),
							),
					),
			};
		});
	}
})();
