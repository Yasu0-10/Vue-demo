let A = class {
	say(name) {
		return name;
	}
	constructor() {
		let a1 = '2';
	};
};
function create(ClassX){
	return new ClassX();
}
let c = create(A);

export {c, A};
