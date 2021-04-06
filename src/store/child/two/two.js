const store = {
	namespaced: true,
	state: {
		name: '子模块',
		sex: '菜',
		list1: [{
			name: '中国', big: '960', age: 5000
		},
		{
			name: '美国', big: '958', age: 300
		},
		{
			name: '日本w', big: '37', age: 2000
		}]
	},
	getters: {
		name (state) {
			return state.name;
		}
	},
	mutations: {
	},
	actions: {
	}
};
export default store;
