<template>
	<div class="image-viewer-wrapper">
		<img class="wrapper-viewer-img-file"
			:src="image"
			:style="`transform: translate(-50%, -50%) scale(${ imgScale }) rotate(${ imgRotate }deg) ;top:${ formatImgPos.posy };left:${ formatImgPos.posx } `"
			@testH="test"
			@mousedown="onMouseDown"
			@mousemove="onMouseMove"
			@mouseup="onMouseUp"
			@mouseleave="onMouseLeave"
			@mousewheel="onViewerMouseWheel">
	</div>
</template>

<script>
	export default {
		name: 'ImageViewer',
		props: { image: String },
		data() {
			return {
				imgScale: 1,
				imgRotate: 0,
				imgPos: {
					posx: 0.5,
					posy: 0.5
				},
				drag: false,
				leaved: false,
				mouseStart: {
					posx: 0,
					posy: 0
				}
			};
		},
		computed: {
			formatImgPos() {
				return {
					posx: (this.imgPos.posx * 100).toFixed(1) + '%',
					posy: (this.imgPos.posy * 100).toFixed(1) + '%'
				};
			/* return {
					posx: this.imgPos.posx + 'px',
					posy: this.imgPos.posy + 'px'
				}; */
			}
		},
		methods: {
			reset() {
				this.imgScale = 1;
				this.imgRotate = 0;
				this.imgPos = {
					posx: 0.5,
					posy: 0.5
				};
				this.drag = false;
				this.leaved = false;
				this.mouseStart = {
					posx: 0,
					posy: 0
				};
			},
			rotate(angle) {
				this.imgScale = 1;
				this.imgPos = {
					posx: 0.5,
					posy: 0.5
				};
				this.drag = false;
				this.leaved = false;
				this.mouseStart = {
					posx: 0,
					posy: 0
				};
				this.imgRotate = this.imgRotate + angle;
			},
			onMouseDown(e) {
				const event = e || window.event;
				event.preventDefault();
				this.drag = true;
				this.leaved = false;
				this.mouseStart = {
					posx: event.clientX,
					posy: event.clientY
				};
			},
			onMouseMove(e) {
				const event = e || window.event;
				event.preventDefault();
				if (this.drag && !this.leaved) {
					const mouseMove = {
						posx: event.clientX,
						posy: event.clientY
					};

					const distance = this.getRelativeDistance(mouseMove, this.mouseStart);

					Object.keys(this.imgPos).forEach(key => {
						this.imgPos[key] += distance[key];
					});
					this.mouseStart = mouseMove;
				}
			},
			onMouseUp(e) {
				const event = e || window.event;
				event.preventDefault();
				this.drag = false;
			},
			onViewerMouseWheel(e) {
				const event = e || window.event;
				const v = event.wheelDelta / 960;
				if (this.imgScale <= 0.125 && v <= 0) return;
				this.imgScale += v;
				event.preventDefault();
			},
			onMouseLeave() {
				this.leaved = true;
			},
			getRelativeDistance({ posx: movex, posy: movey }, { posx: startx, posy: starty }) {
				const { offsetWidth: width, offsetHeight: height } = this.$el;

				const distancex = movex - startx;
				const distancey = movey - starty;
				return {
					posx: distancex / width,
					posy: distancey / height
				};
			}
		}
	};
</script>

<style lang='less' scoped>
.image-viewer-wrapper {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
	.wrapper-viewer-img-file {
		position:absolute;
		width:auto;
		height:80%;
		max-width: 100%;
		display: block;
		cursor: move;
	}
}
</style>
