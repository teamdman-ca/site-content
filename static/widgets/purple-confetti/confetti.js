/* confettijs.org MIT */
(function asd() {

const Confetti = (() => {
	"use strict";
	const e = 10;
	let t,
		o,
		n = 75,
		i = 25,
		r = 1,
		s = !1,
		l = !0,
		a = [],
		d = new Date().getTime();
	function p(e) {
		if (
			((t = document.createElement("canvas")),
			(o = t.getContext("2d")),
			(t.width = 2 * window.innerWidth),
			(t.height = 2 * window.innerHeight),
			(t.style.position = "fixed"),
			(t.style.top = 0),
			(t.style.left = 0),
			(t.style.width = "calc(100%)"),
			(t.style.height = "calc(100%)"),
			(t.style.margin = 0),
			(t.style.padding = 0),
			(t.style.zIndex = 999999999),
			(t.style.pointerEvents = "none"),
			document.body.appendChild(t),
			null != e)
		) {
			let t = document.getElementById(e);
			null != t &&
				t.addEventListener("click", (e) => {
					!(function (e, t) {
						if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
							let o = [];
							for (let i = 0; i < n; i++) o.push(c(e, t));
							a.push({ particles: o });
						}
					})(2 * e.clientX, 2 * e.clientY),
						l && (e.target.style.visibility = "hidden");
				});
		}
		window.addEventListener("resize", () => {
			(t.width = 2 * window.innerWidth), (t.height = 2 * window.innerHeight);
		});
	}
	function y(e) {
		return e.pos.y - 2 * e.size.x > 2 * window.innerHeight;
	}
	function c(e, t) {
		let o = (16 * Math.random() + 4) * r,
			n = (4 * Math.random() + 4) * r;
		return {
			pos: { x: e - o / 2, y: t - n / 2 },
			vel: h(),
			size: { x: o, y: n },
			rotation: 360 * Math.random(),
			rotation_speed: 10 * (Math.random() - 0.5),
			hue: 360 * Math.random(),
			opacity: 100,
			lifetime: Math.random() + 0.25,
		};
	}
	function h() {
		let e = Math.random() - 0.5,
			t = Math.random() - 0.7,
			o = Math.sqrt(e * e + t * t);
		return (t /= o), { x: (e /= o) * (Math.random() * i), y: t * (Math.random() * i) };
	}
	return (
		(p.prototype.setCount = (e) => {
			"number" == typeof e
				? (n = e)
				: console.error("[ERROR] Confetti.setCount() - Input needs to be of type 'number'");
		}),
		(p.prototype.setPower = (e) => {
			"number" == typeof e
				? (i = e)
				: console.error("[ERROR] Confetti.setPower() - Input needs to be of type 'number'");
		}),
		(p.prototype.setSize = (e) => {
			"number" == typeof e
				? (r = e)
				: console.error("[ERROR] Confetti.setSize() - Input needs to be of type 'number'");
		}),
		(p.prototype.setFade = (e) => {
			"boolean" == typeof e
				? (s = e)
				: console.error("[ERROR] Confetti.setFade() - Input needs to be of type 'boolean'");
		}),
		(p.prototype.destroyTarget = (e) => {
			"boolean" == typeof e
				? (l = e)
				: console.error("[ERROR] Confetti.destroyTarget() - Input needs to be of type 'boolean'");
		}),
		window.requestAnimationFrame(function t(n) {
			let i = (n - d) / 1e3;
			d = n;
			for (let t = a.length - 1; t >= 0; t--) {
				let o = a[t];
				for (let t = o.particles.length - 1; t >= 0; t--) {
					let n = o.particles[t];
					(n.vel.y += e * (n.size.y / (10 * r)) * i),
						(n.vel.x += 25 * (Math.random() - 0.5) * i),
						(n.vel.x *= 0.98),
						(n.vel.y *= 0.98),
						(n.pos.x += n.vel.x),
						(n.pos.y += n.vel.y),
						(n.rotation += n.rotation_speed),
						s && (n.opacity -= n.lifetime),
						y(n) && o.particles.splice(t, 1);
				}
				0 == o.particles.length && a.splice(t, 1);
			}
			!(function () {
				o.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
				for (const d of a)
					for (const a of d.particles)
						(e = a.pos.x),
							(t = a.pos.y),
							(n = a.size.x),
							(i = a.size.y),
							(r = a.rotation),
							(s = a.hue),
							(l = a.opacity),
							o.save(),
							o.beginPath(),
							o.translate(e + n / 2, t + i / 2),
							o.rotate((r * Math.PI) / 180),
							o.rect(-n / 2, -i / 2, n, i),
							(o.fillStyle = `hsla(275deg, ${s}%, ${s / 3.6}%, ${l}%)`),
							o.fill(),
							o.restore();
				var e, t, n, i, r, s, l;
			})(),
				window.requestAnimationFrame(t);
		}),
		p
	);
})();
const c = new Confetti("purple");
c.destroyTarget(false);

})();