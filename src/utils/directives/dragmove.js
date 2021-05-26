import Vue from 'vue';
Vue.directive('dialogDrag', {
	bind(el, binding, vnode, oldVnode) {
		const dialogHeaderEl = el.querySelector('.header-main');
		const isSmallDialog = binding.modifiers.small;
		const diffWidth = isSmallDialog ? 0 : 300;
		const diffHeight = isSmallDialog ? 0 : 200;
		const bindValue = binding.value;
		if (bindValue === '_none') return;
		let moveDom;
		if (bindValue) {
			moveDom = el.querySelector(bindValue);
		} else {
			moveDom = el;
		}
		moveDom.style.cssText += ';top:0px;';
		const sty = (function() {
			if (document.body.currentStyle) {
				return (dom, attr) => dom.currentStyle[attr];
			} else {
				return (dom, attr) => getComputedStyle(dom, false)[attr];
			}
		})();

		dialogHeaderEl.onmousedown = (e) => {
			const disX = e.clientX - dialogHeaderEl.offsetLeft;
			const disY = e.clientY - dialogHeaderEl.offsetTop;

			const screenWidth = document.body.clientWidth;
			const screenHeight = document.documentElement.clientHeight;

			const moveDomWidth = moveDom.offsetWidth;
			const moveDomheight = moveDom.offsetHeight;

			const minMoveDomLeft = moveDom.offsetLeft;
			const maxMoveDomLeft = screenWidth - minMoveDomLeft - moveDomWidth + diffWidth;

			const minMoveDomTop = moveDom.offsetTop;
			const maxMoveDomTop = screenHeight - minMoveDomTop - moveDomheight + diffHeight;
			let styL = sty(moveDom, 'left');
			if (styL === 'auto') styL = '0px';
			let styT = sty(moveDom, 'top');
			if (styL.includes('%')) {
				styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
				styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
			} else {
				styL = +styL.replace(/px/g, '');
				styT = +styT.replace(/px/g, '');
			}

			document.onmousemove = function(e) {
				let left = e.clientX - disX;
				let top = e.clientY - disY;
				if (-(left) > minMoveDomLeft) {
					left = -(minMoveDomLeft);
				} else if (left > maxMoveDomLeft) {
					left = maxMoveDomLeft;
				}

				if (-(top) > minMoveDomTop) {
					top = -(minMoveDomTop);
				} else if (top > maxMoveDomTop) {
					top = maxMoveDomTop;
				}
				moveDom.style.cssText += `;left:${ left + styL }px;top:${ top + styT }px;`;
			};

			document.onmouseup = function(e) {
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		};
	}
});
