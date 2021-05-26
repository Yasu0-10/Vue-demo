import Vue from 'vue';

const DomUtil = {};
const isServer = Vue.prototype.$isServer;

const trim = string => {
	return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

DomUtil.on = (function() {
	if (!isServer && document.addEventListener) {
		return (element, event, handler) => {
			if (element && event && handler) {
				element.addEventListener(event, handler, false);
			}
		};
	} else {
		return (element, event, handler) => {
			if (element && event && handler) {
				element.attachEvent('on' + event, handler);
			}
		};
	}
})();

DomUtil.off = (function() {
	if (!isServer && document.removeEventListener) {
		return (element, event, handler) => {
			if (element && event) {
				element.removeEventListener(event, handler, false);
			}
		};
	} else {
		return (element, event, handler) => {
			if (element && event) {
				element.detachEvent('on' + event, handler);
			}
		};
	}
})();

DomUtil.once = (el, event, fn) => {
	const listener = function() {
		if (fn) {
			fn.apply(this, arguments);
		}
		DomUtil.off(el, event, listener);
	};
	DomUtil.on(el, event, listener);
};

DomUtil.hasClass = (el, cls) => {
	if (!el || !cls) return false;
	if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
};

DomUtil.addClass = (el, cls) => {
	if (!el) return;
	let curClass = el.className;
	const classes = (cls || '').split(' ');

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else if (!DomUtil.hasClass(el, clsName)) {
			curClass += ' ' + clsName;
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
};

DomUtil.removeClass = (el, cls) => {
	if (!el || !cls) return;
	const classes = cls.split(' ');
	let curClass = ' ' + el.className + ' ';

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else if (DomUtil.hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ');
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
};

DomUtil.isFullScreen = () => {
	return document.fullscreenElement !== null;
};

DomUtil.setFullScreen = (el) => {
	el = el || document.body;
	const fullScreen = el.requestFullscreen || el.webkitRequestFullScreen;
	if (fullScreen && typeof fullScreen === 'function') {
		if ((document.fullscreenElement || document.webkitFullscreenElement) === el) {
			return Promise.resolve('元素已经全屏！');
		}
		return Promise.resolve({
			then(resolve, reject) {
				try {
					const p = el[fullScreen.name]();
					if (p instanceof Promise) {
						p.then(resolve).catch(reject);
					} else {
						resolve();
					}
				} catch (e) {
					reject(e);
				}
			}
		});
	} else {
		return Promise.reject(new Error('浏览器不支持全屏！'));
	}
};

DomUtil.cancelFullScreen = () => {
	if (document.fullscreenElement === null && !document.webkitIsFullScreen) {
		return Promise.resolve('未开启全屏！');
	}
	const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
	return Promise.resolve({
		then(resolve, reject) {
			try {
				const p = document[exitFullscreen.name]();
				if (p instanceof Promise) {
					p.then(resolve).catch(reject);
				} else {
					resolve();
				}
			} catch (e) {
				reject(e);
			}
		}
	});
};

export default DomUtil;
