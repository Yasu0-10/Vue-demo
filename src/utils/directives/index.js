import Vue from 'vue';
import ClickOutside from './clickoutside.js';

const installDirectives = () => {
	Vue.directive('click-outside', ClickOutside);
};

export default {
	install() {
		installDirectives();
	}
};
