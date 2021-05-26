import Vue from 'vue';
import DomUtil from './dom-util';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

!Vue.prototype.$isServer && DomUtil.on(document, 'mousedown', e => (startClick = e));

!Vue.prototype.$isServer && DomUtil.on(document, 'mouseup', e => nodeList.forEach(node => node[ctx].documentHandler(e, startClick)));

function createDocumentHandler(el, binding, vnode) {
	return function(mouseup = {}, mousedown = {}) {
		/**
		 * 当节点不存在/点击节点在目标节点内/点击节点就是目标节点/点击节点是目标节点中的弹窗节点/点击节点在目标节点中的弹窗节点内，不触发点击外部事件
		 * 其中弹窗节点是兼容部分 kc 组件的 popper
		 */
		if (
			!vnode
			|| !vnode.context
			|| !mouseup.target
			|| !mousedown.target
			|| el.contains(mouseup.target)
			|| el.contains(mousedown.target)
			|| el === mouseup.target
			|| (vnode.context.popperElm
				&& (vnode.context.popperElm.contains(mouseup.target)
					|| vnode.context.popperElm.contains(mousedown.target)))
		) return;

		if (
			binding.expression
			&& el[ctx].methodName
			&& vnode.context[el[ctx].methodName]
		) {
			vnode.context[el[ctx].methodName](mouseup, mousedown);
		} else {
			el[ctx].bindingFn && el[ctx].bindingFn(mouseup, mousedown);
		}
	};
}

export default {
	bind(el, binding, vnode) {
		nodeList.push(el);
		const id = seed++;
		el[ctx] = {
			id,
			documentHandler: createDocumentHandler(el, binding, vnode),
			methodName: binding.expression,
			bindingFn: binding.value
		};
	},

	update(el, binding, vnode) {
		el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
		el[ctx].methodName = binding.expression;
		el[ctx].bindingFn = binding.value;
	},

	unbind(el) {
		const len = nodeList.length;

		for (let i = 0; i < len; i++) {
			if (nodeList[i][ctx].id === el[ctx].id) {
				nodeList.splice(i, 1);
				break;
			}
		}
		delete el[ctx];
	}
};
