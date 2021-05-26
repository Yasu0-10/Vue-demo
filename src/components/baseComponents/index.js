import newmodal from './modal/index';
import newbutton from './button';

const list = [
	newmodal,
	newbutton
];

// const testFn = function(Vue) {
// 	list.forEach(item => {
// 		Vue.component(item.name, item);
// 	});
// };

const testFn = {
	install: Vue => {
		list.forEach(item => {
			Vue.component(item.name, item);
		});
		Vue.prototype.$bug = 'lol';
	}
};

export { testFn as baseCom, list };
// export default testFn;
