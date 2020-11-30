<template>
  <div>
    <button @click="send">发消息</button>
    <div>
      <div v-for="(value, index) in arr" v-html='value' :key='index'></div>
    </div>
  </div>
</template>
<script>
export default {
	name: 'websocket',
	data () {
		return {
			path: 'ws://121.40.165.18:8800',
			socket: '',
			msg: '',
			arr: []
		};
	},
	created () {
		this.init();
	},
	methods: {
		init: function () {
			if (typeof (WebSocket) === 'undefined') {
				alert('您的浏览器不支持socket');
			} else {
				// 实例化socket
				this.socket = new WebSocket(this.path);
				// 监听socket连接
				this.socket.onopen = this.open;
				// 监听socket错误信息
				this.socket.onerror = this.error;
				// 监听socket消息
				this.socket.onmessage = this.getMessage;
			}
		},
		open: function () {
			console.log('socket连接成功');
		},
		error: function () {
			console.log('连接错误');
		},
		// 从后端接收数据
		getMessage: function (msg) {
			this.arr.push(msg.data);
			console.log(this.arr);
		},
		// send是发送参数给后端
		send: function (params) {
			this.socket.send(params);
		},
		close: function () {
			console.log('socket已经关闭');
		}
	}
};
</script>
