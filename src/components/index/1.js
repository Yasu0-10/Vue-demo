const A = class {
	say(name) {
		return name;
	}
};
function create(ClassX) {
	return new ClassX();
}
const c = create(A);

export { c, A };
